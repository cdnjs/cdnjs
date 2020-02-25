(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.vegaLite = {}));
}(this, (function (exports) { 'use strict';

    var name = "vega-lite";
    var author = "Dominik Moritz, Kanit \"Ham\" Wongsuphasawat, Arvind Satyanarayan, Jeffrey Heer";
    var version = "4.4.0";
    var collaborators = [
    	"Kanit Wongsuphasawat (http://kanitw.yellowpigz.com)",
    	"Dominik Moritz (https://www.domoritz.de)",
    	"Arvind Satyanarayan (https://arvindsatya.com)",
    	"Jeffrey Heer (https://jheer.org)"
    ];
    var homepage = "https://vega.github.io/vega-lite/";
    var description = "Vega-Lite is a concise high-level language for interactive visualization.";
    var main = "build/vega-lite.js";
    var unpkg = "build/vega-lite.min.js";
    var jsdelivr = "build/vega-lite.min.js";
    var module = "build/src/index";
    var types = "build/src/index.d.ts";
    var bin = {
    	vl2png: "./bin/vl2png",
    	vl2svg: "./bin/vl2svg",
    	vl2vg: "./bin/vl2vg"
    };
    var directories = {
    	test: "test"
    };
    var scripts = {
    	changelog: "conventional-changelog -p angular",
    	build: "yarn build:only",
    	"build:only": "yarn tsc:src && rollup -c",
    	postbuild: "terser build/vega-lite.js -cm --source-map content=build/vega-lite.js.map,filename=build/vega-lite.min.js.map -o build/vega-lite.min.js && yarn schema",
    	"prebuild:examples": "yarn build:only",
    	"build:examples": "yarn data && TZ=America/Los_Angeles scripts/build-examples.sh",
    	"prebuild:examples-full": "yarn build:only",
    	"build:examples-full": "TZ=America/Los_Angeles scripts/build-examples.sh 1",
    	"build:example": "TZ=America/Los_Angeles scripts/build-example.sh",
    	"build:toc": "yarn build:jekyll && scripts/generate-toc",
    	"build:site": "yarn tsc:site && rollup -c site/rollup.config.js",
    	"build:jekyll": "pushd site && bundle exec jekyll build -q && popd",
    	"build:versions": "scripts/update-version.sh",
    	clean: "find build ! -name 'vega-lite-schema.json' -type f -delete && rm -rf site/data/* && rm -f examples/compiled/*.png && find site/examples ! -name 'index.md' ! -name 'data' -type f -delete",
    	"predeploy:site": "yarn presite",
    	"deploy:site": "gh-pages -d site",
    	data: "rsync -r node_modules/vega-datasets/data/* site/data",
    	schema: "mkdir -p build && ts-json-schema-generator -f tsconfig.json -p src/index.ts -t TopLevelSpec --no-type-check --no-ref-encode > build/vega-lite-schema.json && yarn renameschema && cp build/vega-lite-schema.json site/_data/",
    	renameschema: "scripts/rename-schema.sh",
    	presite: "yarn data && yarn schema && yarn build:site && yarn build:versions && scripts/create-example-pages.sh",
    	site: "pushd site && bundle exec jekyll serve -I -l && popd",
    	"tsc:src": "tsc -b src/tsconfig.src.json",
    	"tsc:site": "tsc -b site/tsconfig.site.json",
    	prettierbase: "prettier '**/*.{md,css,yml}'",
    	eslintbase: "eslint --ext .ts .",
    	format: "yarn eslintbase --fix && yarn prettierbase --write",
    	lint: "yarn eslintbase && yarn prettierbase --check",
    	test: "jest test/ && yarn lint && yarn schema && jest examples/ && yarn test:runtime",
    	"test:inspect": "node --inspect-brk ./node_modules/.bin/jest --runInBand test",
    	"test:runtime": "TZ=America/Los_Angeles jest test-runtime/",
    	"test:runtime:generate": "yarn build:only && rm -Rf test-runtime/resources && VL_GENERATE_TESTS=true yarn test:runtime",
    	"watch:build": "yarn build:only && concurrently --kill-others -n Typescript,Rollup 'yarn tsc:src -w' 'rollup -c -w'",
    	"watch:site": "concurrently --kill-others -n Typescript,Rollup 'yarn tsc:site -w' 'rollup -c site/rollup.config.js -w'",
    	"watch:test": "jest --watch"
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
    	"@commitlint/cli": "^8.3.5",
    	"@commitlint/config-conventional": "^8.3.4",
    	"@rollup/plugin-commonjs": "11.0.2",
    	"@rollup/plugin-json": "^4.0.2",
    	"@rollup/plugin-node-resolve": "^7.1.1",
    	"@types/chai": "^4.2.8",
    	"@types/d3": "^5.7.2",
    	"@types/jest": "^25.1.2",
    	"@types/jest-environment-puppeteer": "^4.3.1",
    	"@types/mkdirp": "^1.0.0",
    	"@types/puppeteer": "^2.0.0",
    	"@typescript-eslint/eslint-plugin": "^2.19.0",
    	"@typescript-eslint/parser": "^2.19.0",
    	ajv: "^6.11.0",
    	chai: "^4.2.0",
    	cheerio: "^1.0.0-rc.3",
    	codecov: "^3.6.5",
    	concurrently: "^5.1.0",
    	"conventional-changelog-cli": "^2.0.31",
    	d3: "^5.15.0",
    	eslint: "^6.8.0",
    	"eslint-config-prettier": "^6.10.0",
    	"eslint-plugin-prettier": "^3.1.2",
    	"gh-pages": "^2.2.0",
    	"highlight.js": "^9.18.1",
    	"http-server": "^0.12.1",
    	husky: "^4.2.1",
    	jest: "^25.1.0",
    	"jest-puppeteer": "^4.4.0",
    	"lint-staged": "^10.0.7",
    	mkdirp: "^1.0.3",
    	prettier: "^1.19.1",
    	puppeteer: "^2.1.1",
    	rollup: "^1.31.0",
    	"rollup-plugin-sourcemaps": "^0.5.0",
    	"rollup-plugin-terser": "^5.2.0",
    	"svg2png-many": "^0.0.7",
    	terser: "^4.6.3",
    	"ts-jest": "^25.2.0",
    	"ts-json-schema-generator": "0.60.0",
    	typescript: "~3.7.5",
    	"vega-cli": "^5.9.1",
    	"vega-datasets": "^1.29.0",
    	"vega-embed": "^6.2.2",
    	"vega-tooltip": "^0.20.1",
    	"vega-typings": "~0.12.4",
    	"yaml-front-matter": "^4.1.0"
    };
    var dependencies = {
    	"@types/clone": "~0.1.30",
    	"@types/fast-json-stable-stringify": "^2.0.0",
    	"array-flat-polyfill": "^1.0.1",
    	clone: "~2.1.2",
    	"fast-deep-equal": "~3.1.1",
    	"fast-json-stable-stringify": "~2.1.0",
    	"json-stringify-pretty-compact": "~2.0.0",
    	tslib: "~1.10.0",
    	"vega-event-selector": "~2.0.2",
    	"vega-expression": "~2.6.3",
    	"vega-scale": "^6.0.0",
    	"vega-util": "~1.12.2",
    	yargs: "~15.1.0"
    };
    var peerDependencies = {
    	vega: "^5.9.0"
    };
    var husky = {
    	hooks: {
    		"pre-commit": "lint-staged",
    		"commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    	}
    };
    var jest = {
    	preset: "jest-puppeteer",
    	transform: {
    		"^.+\\.tsx?$": "ts-jest"
    	},
    	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    	moduleFileExtensions: [
    		"ts",
    		"tsx",
    		"js",
    		"jsx",
    		"json",
    		"node"
    	],
    	testPathIgnorePatterns: [
    		"<rootDir>/node_modules",
    		"<rootDir>/build",
    		"<rootDir>/_site",
    		"<rootDir>/src"
    	],
    	coverageDirectory: "./coverage/",
    	collectCoverage: false
    };
    var pkg = {
    	name: name,
    	author: author,
    	version: version,
    	collaborators: collaborators,
    	homepage: homepage,
    	description: description,
    	main: main,
    	unpkg: unpkg,
    	jsdelivr: jsdelivr,
    	module: module,
    	types: types,
    	bin: bin,
    	directories: directories,
    	scripts: scripts,
    	repository: repository,
    	license: license,
    	bugs: bugs,
    	devDependencies: devDependencies,
    	dependencies: dependencies,
    	peerDependencies: peerDependencies,
    	husky: husky,
    	"lint-staged": {
    	"*.ts": [
    		"eslint --fix",
    		"git add"
    	],
    	"*.{md,css,yml}": [
    		"prettier --write",
    		"git add"
    	]
    },
    	jest: jest
    };

    function accessor(fn, fields, name) {
      fn.fields = fields || [];
      fn.fname = name;
      return fn;
    }

    function error(message) {
      throw Error(message);
    }

    function splitAccessPath(p) {
      var path = [],
          q = null,
          b = 0,
          n = p.length,
          s = '',
          i, j, c;

      p = p + '';

      function push() {
        path.push(s + p.substring(i, j));
        s = '';
        i = j + 1;
      }

      for (i=j=0; j<n; ++j) {
        c = p[j];
        if (c === '\\') {
          s += p.substring(i, j);
          s += p.substring(++j, ++j);
          i = j;
        } else if (c === q) {
          push();
          q = null;
          b = -1;
        } else if (q) {
          continue;
        } else if (i === b && c === '"') {
          i = j + 1;
          q = c;
        } else if (i === b && c === "'") {
          i = j + 1;
          q = c;
        } else if (c === '.' && !b) {
          if (j > i) {
            push();
          } else {
            i = j + 1;
          }
        } else if (c === '[') {
          if (j > i) push();
          b = i = j + 1;
        } else if (c === ']') {
          if (!b) error('Access path missing open bracket: ' + p);
          if (b > 0) push();
          b = 0;
          i = j + 1;
        }
      }

      if (b) error('Access path missing closing bracket: ' + p);
      if (q) error('Access path missing closing quote: ' + p);

      if (j > i) {
        j++;
        push();
      }

      return path;
    }

    var isArray = Array.isArray;

    function isObject(_) {
      return _ === Object(_);
    }

    function isString(_) {
      return typeof _ === 'string';
    }

    function $(x) {
      return isArray(x) ? '[' + x.map($) + ']'
        : isObject(x) || isString(x) ?
          // Output valid JSON and JS source strings.
          // See http://timelessrepo.com/json-isnt-a-javascript-subset
          JSON.stringify(x).replace('\u2028','\\u2028').replace('\u2029', '\\u2029')
        : x;
    }

    function field(field, name) {
      var path = splitAccessPath(field),
          code = 'return _[' + path.map($).join('][') + '];';

      return accessor(
        Function('_', code),
        [(field = path.length===1 ? path[0] : field)],
        name || field
      );
    }

    var empty = [];

    var id = field('id');

    var identity = accessor(function(_) { return _; }, empty, 'identity');

    var zero = accessor(function() { return 0; }, empty, 'zero');

    var one = accessor(function() { return 1; }, empty, 'one');

    var truthy = accessor(function() { return true; }, empty, 'true');

    var falsy = accessor(function() { return false; }, empty, 'false');

    function log(method, level, input) {
      var args = [level].concat([].slice.call(input));
      console[method].apply(console, args); // eslint-disable-line no-console
    }

    var None  = 0;
    var Error$1 = 1;
    var Warn  = 2;
    var Info  = 3;
    var Debug = 4;

    function logger(_, method) {
      var level = _ || None;
      return {
        level: function(_) {
          if (arguments.length) {
            level = +_;
            return this;
          } else {
            return level;
          }
        },
        error: function() {
          if (level >= Error$1) log(method || 'error', 'ERROR', arguments);
          return this;
        },
        warn: function() {
          if (level >= Warn) log(method || 'warn', 'WARN', arguments);
          return this;
        },
        info: function() {
          if (level >= Info) log(method || 'log', 'INFO', arguments);
          return this;
        },
        debug: function() {
          if (level >= Debug) log(method || 'log', 'DEBUG', arguments);
          return this;
        }
      }
    }

    function mergeConfig(...configs) {
      return configs.reduce((out, source) => {
        for (var key in source) {
          if (key === 'signals') {
            // for signals, we merge the signals arrays
            // source signals take precedence over
            // existing signals with the same name
            out.signals = mergeNamed(out.signals, source.signals);
          } else {
            // otherwise, merge objects subject to recursion constraints
            // for legend block, recurse for the layout entry only
            // for style block, recurse for all properties
            // otherwise, no recursion: objects overwrite, no merging
            var r = key === 'legend' ? {'layout': 1}
              : key === 'style' ? true
              : null;
            writeConfig(out, key, source[key], r);
          }
        }
        return out;
      }, {});
    }

    function writeConfig(output, key, value, recurse) {
      var k, o;
      if (isObject(value) && !isArray(value)) {
        o = isObject(output[key]) ? output[key] : (output[key] = {});
        for (k in value) {
          if (recurse && (recurse === true || recurse[k])) {
            writeConfig(o, k, value[k]);
          } else {
            o[k] = value[k];
          }
        }
      } else {
        output[key] = value;
      }
    }

    function mergeNamed(a, b) {
      if (a == null) return b;

      const map = {}, out = [];

      function add(_) {
        if (!map[_.name]) {
          map[_.name] = 1;
          out.push(_);
        }
      }

      b.forEach(add);
      a.forEach(add);
      return out;
    }

    function peek(array) {
      return array[array.length - 1];
    }

    function array(_) {
      return _ != null ? (isArray(_) ? _ : [_]) : [];
    }

    function isFunction(_) {
      return typeof _ === 'function';
    }

    const hop = Object.prototype.hasOwnProperty;

    function hasOwnProperty(object, property) {
      return hop.call(object, property);
    }

    function isBoolean(_) {
      return typeof _ === 'boolean';
    }

    function isNumber(_) {
      return typeof _ === 'number';
    }

    function toSet(_) {
      for (var s={}, i=0, n=_.length; i<n; ++i) s[_[i]] = true;
      return s;
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function bandSpace(count, paddingInner, paddingOuter) {
      var space = count - paddingInner + paddingOuter * 2;
      return count ? (space > 0 ? space : 1) : 0;
    }

    const Identity = 'identity';

    const Linear = 'linear';
    const Log = 'log';
    const Pow = 'pow';
    const Sqrt = 'sqrt';
    const Symlog = 'symlog';

    const Time = 'time';
    const UTC = 'utc';

    const Sequential = 'sequential';
    const Diverging = 'diverging';

    const Quantile = 'quantile';
    const Quantize = 'quantize';
    const Threshold = 'threshold';

    const Ordinal = 'ordinal';
    const Point = 'point';
    const Band = 'band';
    const BinOrdinal = 'bin-ordinal';

    // categories
    const Continuous = 'continuous';
    const Discrete = 'discrete';
    const Discretizing = 'discretizing';
    const Interpolating = 'interpolating';
    const Temporal = 'temporal';

    function invertRange(scale) {
      return function(_) {
        var lo = _[0],
            hi = _[1],
            t;

        if (hi < lo) {
          t = lo;
          lo = hi;
          hi = t;
        }

        return [
          scale.invert(lo),
          scale.invert(hi)
        ];
      }
    }

    function invertRangeExtent(scale) {
      return function(_) {
        var range = scale.range(),
            lo = _[0],
            hi = _[1],
            min = -1, max, t, i, n;

        if (hi < lo) {
          t = lo;
          lo = hi;
          hi = t;
        }

        for (i=0, n=range.length; i<n; ++i) {
          if (range[i] >= lo && range[i] <= hi) {
            if (min < 0) min = i;
            max = i;
          }
        }

        if (min < 0) return undefined;

        lo = scale.invertExtent(range[min]);
        hi = scale.invertExtent(range[max]);

        return [
          lo[0] === undefined ? lo[1] : lo[0],
          hi[1] === undefined ? hi[0] : hi[1]
        ];
      }
    }

    function ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    }

    function bisector(compare) {
      if (compare.length === 1) compare = ascendingComparator(compare);
      return {
        left: function(a, x, lo, hi) {
          if (lo == null) lo = 0;
          if (hi == null) hi = a.length;
          while (lo < hi) {
            var mid = lo + hi >>> 1;
            if (compare(a[mid], x) < 0) lo = mid + 1;
            else hi = mid;
          }
          return lo;
        },
        right: function(a, x, lo, hi) {
          if (lo == null) lo = 0;
          if (hi == null) hi = a.length;
          while (lo < hi) {
            var mid = lo + hi >>> 1;
            if (compare(a[mid], x) > 0) hi = mid;
            else lo = mid + 1;
          }
          return lo;
        }
      };
    }

    function ascendingComparator(f) {
      return function(d, x) {
        return ascending(f(d), x);
      };
    }

    var ascendingBisect = bisector(ascending);
    var bisectRight = ascendingBisect.right;

    function sequence(start, stop, step) {
      start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

      var i = -1,
          n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
          range = new Array(n);

      while (++i < n) {
        range[i] = start + i * step;
      }

      return range;
    }

    var e10 = Math.sqrt(50),
        e5 = Math.sqrt(10),
        e2 = Math.sqrt(2);

    function ticks(start, stop, count) {
      var reverse,
          i = -1,
          n,
          ticks,
          step;

      stop = +stop, start = +start, count = +count;
      if (start === stop && count > 0) return [start];
      if (reverse = stop < start) n = start, start = stop, stop = n;
      if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

      if (step > 0) {
        start = Math.ceil(start / step);
        stop = Math.floor(stop / step);
        ticks = new Array(n = Math.ceil(stop - start + 1));
        while (++i < n) ticks[i] = (start + i) * step;
      } else {
        start = Math.floor(start * step);
        stop = Math.ceil(stop * step);
        ticks = new Array(n = Math.ceil(start - stop + 1));
        while (++i < n) ticks[i] = (start - i) / step;
      }

      if (reverse) ticks.reverse();

      return ticks;
    }

    function tickIncrement(start, stop, count) {
      var step = (stop - start) / Math.max(0, count),
          power = Math.floor(Math.log(step) / Math.LN10),
          error = step / Math.pow(10, power);
      return power >= 0
          ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
          : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
    }

    function tickStep(start, stop, count) {
      var step0 = Math.abs(stop - start) / Math.max(0, count),
          step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
          error = step0 / step1;
      if (error >= e10) step1 *= 10;
      else if (error >= e5) step1 *= 5;
      else if (error >= e2) step1 *= 2;
      return stop < start ? -step1 : step1;
    }

    function max(values, valueof) {
      let max;
      if (valueof === undefined) {
        for (const value of values) {
          if (value != null
              && (max < value || (max === undefined && value >= value))) {
            max = value;
          }
        }
      } else {
        let index = -1;
        for (let value of values) {
          if ((value = valueof(value, ++index, values)) != null
              && (max < value || (max === undefined && value >= value))) {
            max = value;
          }
        }
      }
      return max;
    }

    function min(values, valueof) {
      let min;
      if (valueof === undefined) {
        for (const value of values) {
          if (value != null
              && (min > value || (min === undefined && value >= value))) {
            min = value;
          }
        }
      } else {
        let index = -1;
        for (let value of values) {
          if ((value = valueof(value, ++index, values)) != null
              && (min > value || (min === undefined && value >= value))) {
            min = value;
          }
        }
      }
      return min;
    }

    // Based on https://github.com/mourner/quickselect
    // ISC license, Copyright 2018 Vladimir Agafonkin.
    function quickselect(array, k, left = 0, right = array.length - 1, compare = ascending) {
      while (right > left) {
        if (right - left > 600) {
          const n = right - left + 1;
          const m = k - left + 1;
          const z = Math.log(n);
          const s = 0.5 * Math.exp(2 * z / 3);
          const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
          const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
          const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
          quickselect(array, k, newLeft, newRight, compare);
        }

        const t = array[k];
        let i = left;
        let j = right;

        swap(array, left, k);
        if (compare(array[right], t) > 0) swap(array, left, right);

        while (i < j) {
          swap(array, i, j), ++i, --j;
          while (compare(array[i], t) < 0) ++i;
          while (compare(array[j], t) > 0) --j;
        }

        if (compare(array[left], t) === 0) swap(array, left, j);
        else ++j, swap(array, j, right);

        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
      }
      return array;
    }

    function swap(array, i, j) {
      const t = array[i];
      array[i] = array[j];
      array[j] = t;
    }

    function* numbers(values, valueof) {
      if (valueof === undefined) {
        for (let value of values) {
          if (value != null && (value = +value) >= value) {
            yield value;
          }
        }
      } else {
        let index = -1;
        for (let value of values) {
          if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
            yield value;
          }
        }
      }
    }

    function quantile(values, p, valueof) {
      values = Float64Array.from(numbers(values, valueof));
      if (!(n = values.length)) return;
      if ((p = +p) <= 0 || n < 2) return min(values);
      if (p >= 1) return max(values);
      var n,
          i = (n - 1) * p,
          i0 = Math.floor(i),
          value0 = max(quickselect(values, i0).subarray(0, i0 + 1)),
          value1 = min(values.subarray(i0 + 1));
      return value0 + (value1 - value0) * (i - i0);
    }

    function initRange(domain, range) {
      switch (arguments.length) {
        case 0: break;
        case 1: this.range(domain); break;
        default: this.range(range).domain(domain); break;
      }
      return this;
    }

    function initInterpolator(domain, interpolator) {
      switch (arguments.length) {
        case 0: break;
        case 1: {
          if (typeof domain === "function") this.interpolator(domain);
          else this.range(domain);
          break;
        }
        default: {
          this.domain(domain);
          if (typeof interpolator === "function") this.interpolator(interpolator);
          else this.range(interpolator);
          break;
        }
      }
      return this;
    }

    const implicit = Symbol("implicit");

    function ordinal() {
      var index = new Map(),
          domain = [],
          range = [],
          unknown = implicit;

      function scale(d) {
        var key = d + "", i = index.get(key);
        if (!i) {
          if (unknown !== implicit) return unknown;
          index.set(key, i = domain.push(d));
        }
        return range[(i - 1) % range.length];
      }

      scale.domain = function(_) {
        if (!arguments.length) return domain.slice();
        domain = [], index = new Map();
        for (const value of _) {
          const key = value + "";
          if (index.has(key)) continue;
          index.set(key, domain.push(value));
        }
        return scale;
      };

      scale.range = function(_) {
        return arguments.length ? (range = Array.from(_), scale) : range.slice();
      };

      scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
      };

      scale.copy = function() {
        return ordinal(domain, range).unknown(unknown);
      };

      initRange.apply(scale, arguments);

      return scale;
    }

    function define(constructor, factory, prototype) {
      constructor.prototype = factory.prototype = prototype;
      prototype.constructor = constructor;
    }

    function extend(parent, definition) {
      var prototype = Object.create(parent.prototype);
      for (var key in definition) prototype[key] = definition[key];
      return prototype;
    }

    function Color() {}

    var darker = 0.7;
    var brighter = 1 / darker;

    var reI = "\\s*([+-]?\\d+)\\s*",
        reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        reHex = /^#([0-9a-f]{3,8})$/,
        reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
        reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
        reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
        reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
        reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
        reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

    var named = {
      aliceblue: 0xf0f8ff,
      antiquewhite: 0xfaebd7,
      aqua: 0x00ffff,
      aquamarine: 0x7fffd4,
      azure: 0xf0ffff,
      beige: 0xf5f5dc,
      bisque: 0xffe4c4,
      black: 0x000000,
      blanchedalmond: 0xffebcd,
      blue: 0x0000ff,
      blueviolet: 0x8a2be2,
      brown: 0xa52a2a,
      burlywood: 0xdeb887,
      cadetblue: 0x5f9ea0,
      chartreuse: 0x7fff00,
      chocolate: 0xd2691e,
      coral: 0xff7f50,
      cornflowerblue: 0x6495ed,
      cornsilk: 0xfff8dc,
      crimson: 0xdc143c,
      cyan: 0x00ffff,
      darkblue: 0x00008b,
      darkcyan: 0x008b8b,
      darkgoldenrod: 0xb8860b,
      darkgray: 0xa9a9a9,
      darkgreen: 0x006400,
      darkgrey: 0xa9a9a9,
      darkkhaki: 0xbdb76b,
      darkmagenta: 0x8b008b,
      darkolivegreen: 0x556b2f,
      darkorange: 0xff8c00,
      darkorchid: 0x9932cc,
      darkred: 0x8b0000,
      darksalmon: 0xe9967a,
      darkseagreen: 0x8fbc8f,
      darkslateblue: 0x483d8b,
      darkslategray: 0x2f4f4f,
      darkslategrey: 0x2f4f4f,
      darkturquoise: 0x00ced1,
      darkviolet: 0x9400d3,
      deeppink: 0xff1493,
      deepskyblue: 0x00bfff,
      dimgray: 0x696969,
      dimgrey: 0x696969,
      dodgerblue: 0x1e90ff,
      firebrick: 0xb22222,
      floralwhite: 0xfffaf0,
      forestgreen: 0x228b22,
      fuchsia: 0xff00ff,
      gainsboro: 0xdcdcdc,
      ghostwhite: 0xf8f8ff,
      gold: 0xffd700,
      goldenrod: 0xdaa520,
      gray: 0x808080,
      green: 0x008000,
      greenyellow: 0xadff2f,
      grey: 0x808080,
      honeydew: 0xf0fff0,
      hotpink: 0xff69b4,
      indianred: 0xcd5c5c,
      indigo: 0x4b0082,
      ivory: 0xfffff0,
      khaki: 0xf0e68c,
      lavender: 0xe6e6fa,
      lavenderblush: 0xfff0f5,
      lawngreen: 0x7cfc00,
      lemonchiffon: 0xfffacd,
      lightblue: 0xadd8e6,
      lightcoral: 0xf08080,
      lightcyan: 0xe0ffff,
      lightgoldenrodyellow: 0xfafad2,
      lightgray: 0xd3d3d3,
      lightgreen: 0x90ee90,
      lightgrey: 0xd3d3d3,
      lightpink: 0xffb6c1,
      lightsalmon: 0xffa07a,
      lightseagreen: 0x20b2aa,
      lightskyblue: 0x87cefa,
      lightslategray: 0x778899,
      lightslategrey: 0x778899,
      lightsteelblue: 0xb0c4de,
      lightyellow: 0xffffe0,
      lime: 0x00ff00,
      limegreen: 0x32cd32,
      linen: 0xfaf0e6,
      magenta: 0xff00ff,
      maroon: 0x800000,
      mediumaquamarine: 0x66cdaa,
      mediumblue: 0x0000cd,
      mediumorchid: 0xba55d3,
      mediumpurple: 0x9370db,
      mediumseagreen: 0x3cb371,
      mediumslateblue: 0x7b68ee,
      mediumspringgreen: 0x00fa9a,
      mediumturquoise: 0x48d1cc,
      mediumvioletred: 0xc71585,
      midnightblue: 0x191970,
      mintcream: 0xf5fffa,
      mistyrose: 0xffe4e1,
      moccasin: 0xffe4b5,
      navajowhite: 0xffdead,
      navy: 0x000080,
      oldlace: 0xfdf5e6,
      olive: 0x808000,
      olivedrab: 0x6b8e23,
      orange: 0xffa500,
      orangered: 0xff4500,
      orchid: 0xda70d6,
      palegoldenrod: 0xeee8aa,
      palegreen: 0x98fb98,
      paleturquoise: 0xafeeee,
      palevioletred: 0xdb7093,
      papayawhip: 0xffefd5,
      peachpuff: 0xffdab9,
      peru: 0xcd853f,
      pink: 0xffc0cb,
      plum: 0xdda0dd,
      powderblue: 0xb0e0e6,
      purple: 0x800080,
      rebeccapurple: 0x663399,
      red: 0xff0000,
      rosybrown: 0xbc8f8f,
      royalblue: 0x4169e1,
      saddlebrown: 0x8b4513,
      salmon: 0xfa8072,
      sandybrown: 0xf4a460,
      seagreen: 0x2e8b57,
      seashell: 0xfff5ee,
      sienna: 0xa0522d,
      silver: 0xc0c0c0,
      skyblue: 0x87ceeb,
      slateblue: 0x6a5acd,
      slategray: 0x708090,
      slategrey: 0x708090,
      snow: 0xfffafa,
      springgreen: 0x00ff7f,
      steelblue: 0x4682b4,
      tan: 0xd2b48c,
      teal: 0x008080,
      thistle: 0xd8bfd8,
      tomato: 0xff6347,
      turquoise: 0x40e0d0,
      violet: 0xee82ee,
      wheat: 0xf5deb3,
      white: 0xffffff,
      whitesmoke: 0xf5f5f5,
      yellow: 0xffff00,
      yellowgreen: 0x9acd32
    };

    define(Color, color, {
      copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
      },
      displayable: function() {
        return this.rgb().displayable();
      },
      hex: color_formatHex, // Deprecated! Use color.formatHex.
      formatHex: color_formatHex,
      formatHsl: color_formatHsl,
      formatRgb: color_formatRgb,
      toString: color_formatRgb
    });

    function color_formatHex() {
      return this.rgb().formatHex();
    }

    function color_formatHsl() {
      return hslConvert(this).formatHsl();
    }

    function color_formatRgb() {
      return this.rgb().formatRgb();
    }

    function color(format) {
      var m, l;
      format = (format + "").trim().toLowerCase();
      return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
          : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
          : l === 8 ? new Rgb(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
          : l === 4 ? new Rgb((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
          : null) // invalid hex
          : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
          : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
          : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
          : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
          : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
          : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
          : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
          : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
          : null;
    }

    function rgbn(n) {
      return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
    }

    function rgba(r, g, b, a) {
      if (a <= 0) r = g = b = NaN;
      return new Rgb(r, g, b, a);
    }

    function rgbConvert(o) {
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Rgb;
      o = o.rgb();
      return new Rgb(o.r, o.g, o.b, o.opacity);
    }

    function rgb(r, g, b, opacity) {
      return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
    }

    function Rgb(r, g, b, opacity) {
      this.r = +r;
      this.g = +g;
      this.b = +b;
      this.opacity = +opacity;
    }

    define(Rgb, rgb, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb: function() {
        return this;
      },
      displayable: function() {
        return (-0.5 <= this.r && this.r < 255.5)
            && (-0.5 <= this.g && this.g < 255.5)
            && (-0.5 <= this.b && this.b < 255.5)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      hex: rgb_formatHex, // Deprecated! Use color.formatHex.
      formatHex: rgb_formatHex,
      formatRgb: rgb_formatRgb,
      toString: rgb_formatRgb
    }));

    function rgb_formatHex() {
      return "#" + hex(this.r) + hex(this.g) + hex(this.b);
    }

    function rgb_formatRgb() {
      var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "rgb(" : "rgba(")
          + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.b) || 0))
          + (a === 1 ? ")" : ", " + a + ")");
    }

    function hex(value) {
      value = Math.max(0, Math.min(255, Math.round(value) || 0));
      return (value < 16 ? "0" : "") + value.toString(16);
    }

    function hsla(h, s, l, a) {
      if (a <= 0) h = s = l = NaN;
      else if (l <= 0 || l >= 1) h = s = NaN;
      else if (s <= 0) h = NaN;
      return new Hsl(h, s, l, a);
    }

    function hslConvert(o) {
      if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Hsl;
      if (o instanceof Hsl) return o;
      o = o.rgb();
      var r = o.r / 255,
          g = o.g / 255,
          b = o.b / 255,
          min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          h = NaN,
          s = max - min,
          l = (max + min) / 2;
      if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
      } else {
        s = l > 0 && l < 1 ? 0 : h;
      }
      return new Hsl(h, s, l, o.opacity);
    }

    function hsl(h, s, l, opacity) {
      return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
    }

    function Hsl(h, s, l, opacity) {
      this.h = +h;
      this.s = +s;
      this.l = +l;
      this.opacity = +opacity;
    }

    define(Hsl, hsl, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360,
            s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
            l = this.l,
            m2 = l + (l < 0.5 ? l : 1 - l) * s,
            m1 = 2 * l - m2;
        return new Rgb(
          hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
          hsl2rgb(h, m1, m2),
          hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
          this.opacity
        );
      },
      displayable: function() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s))
            && (0 <= this.l && this.l <= 1)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      formatHsl: function() {
        var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? "hsl(" : "hsla(")
            + (this.h || 0) + ", "
            + (this.s || 0) * 100 + "%, "
            + (this.l || 0) * 100 + "%"
            + (a === 1 ? ")" : ", " + a + ")");
      }
    }));

    /* From FvD 13.37, CSS Color Module Level 3 */
    function hsl2rgb(h, m1, m2) {
      return (h < 60 ? m1 + (m2 - m1) * h / 60
          : h < 180 ? m2
          : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
          : m1) * 255;
    }

    var deg2rad = Math.PI / 180;
    var rad2deg = 180 / Math.PI;

    // https://observablehq.com/@mbostock/lab-and-rgb
    var K = 18,
        Xn = 0.96422,
        Yn = 1,
        Zn = 0.82521,
        t0 = 4 / 29,
        t1 = 6 / 29,
        t2 = 3 * t1 * t1,
        t3 = t1 * t1 * t1;

    function labConvert(o) {
      if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
      if (o instanceof Hcl) return hcl2lab(o);
      if (!(o instanceof Rgb)) o = rgbConvert(o);
      var r = rgb2lrgb(o.r),
          g = rgb2lrgb(o.g),
          b = rgb2lrgb(o.b),
          y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
      if (r === g && g === b) x = z = y; else {
        x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
        z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
      }
      return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
    }

    function lab(l, a, b, opacity) {
      return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
    }

    function Lab(l, a, b, opacity) {
      this.l = +l;
      this.a = +a;
      this.b = +b;
      this.opacity = +opacity;
    }

    define(Lab, lab, extend(Color, {
      brighter: function(k) {
        return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
      },
      darker: function(k) {
        return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
      },
      rgb: function() {
        var y = (this.l + 16) / 116,
            x = isNaN(this.a) ? y : y + this.a / 500,
            z = isNaN(this.b) ? y : y - this.b / 200;
        x = Xn * lab2xyz(x);
        y = Yn * lab2xyz(y);
        z = Zn * lab2xyz(z);
        return new Rgb(
          lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
          lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
          lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
          this.opacity
        );
      }
    }));

    function xyz2lab(t) {
      return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
    }

    function lab2xyz(t) {
      return t > t1 ? t * t * t : t2 * (t - t0);
    }

    function lrgb2rgb(x) {
      return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
    }

    function rgb2lrgb(x) {
      return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    }

    function hclConvert(o) {
      if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
      if (!(o instanceof Lab)) o = labConvert(o);
      if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
      var h = Math.atan2(o.b, o.a) * rad2deg;
      return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
    }

    function hcl(h, c, l, opacity) {
      return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
    }

    function Hcl(h, c, l, opacity) {
      this.h = +h;
      this.c = +c;
      this.l = +l;
      this.opacity = +opacity;
    }

    function hcl2lab(o) {
      if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
      var h = o.h * deg2rad;
      return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
    }

    define(Hcl, hcl, extend(Color, {
      brighter: function(k) {
        return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
      },
      darker: function(k) {
        return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
      },
      rgb: function() {
        return hcl2lab(this).rgb();
      }
    }));

    var A = -0.14861,
        B = +1.78277,
        C = -0.29227,
        D = -0.90649,
        E = +1.97294,
        ED = E * D,
        EB = E * B,
        BC_DA = B * C - D * A;

    function cubehelixConvert(o) {
      if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
      if (!(o instanceof Rgb)) o = rgbConvert(o);
      var r = o.r / 255,
          g = o.g / 255,
          b = o.b / 255,
          l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
          bl = b - l,
          k = (E * (g - l) - C * bl) / D,
          s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
          h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
      return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
    }

    function cubehelix(h, s, l, opacity) {
      return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
    }

    function Cubehelix(h, s, l, opacity) {
      this.h = +h;
      this.s = +s;
      this.l = +l;
      this.opacity = +opacity;
    }

    define(Cubehelix, cubehelix, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function() {
        var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
            l = +this.l,
            a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
            cosh = Math.cos(h),
            sinh = Math.sin(h);
        return new Rgb(
          255 * (l + a * (A * cosh + B * sinh)),
          255 * (l + a * (C * cosh + D * sinh)),
          255 * (l + a * (E * cosh)),
          this.opacity
        );
      }
    }));

    function basis(t1, v0, v1, v2, v3) {
      var t2 = t1 * t1, t3 = t2 * t1;
      return ((1 - 3 * t1 + 3 * t2 - t3) * v0
          + (4 - 6 * t2 + 3 * t3) * v1
          + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
          + t3 * v3) / 6;
    }

    function basis$1(values) {
      var n = values.length - 1;
      return function(t) {
        var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
            v1 = values[i],
            v2 = values[i + 1],
            v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
            v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
        return basis((t - i / n) * n, v0, v1, v2, v3);
      };
    }

    function basisClosed(values) {
      var n = values.length;
      return function(t) {
        var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
            v0 = values[(i + n - 1) % n],
            v1 = values[i % n],
            v2 = values[(i + 1) % n],
            v3 = values[(i + 2) % n];
        return basis((t - i / n) * n, v0, v1, v2, v3);
      };
    }

    function constant(x) {
      return function() {
        return x;
      };
    }

    function linear(a, d) {
      return function(t) {
        return a + t * d;
      };
    }

    function exponential(a, b, y) {
      return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
        return Math.pow(a + t * b, y);
      };
    }

    function hue(a, b) {
      var d = b - a;
      return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
    }

    function gamma(y) {
      return (y = +y) === 1 ? nogamma : function(a, b) {
        return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
      };
    }

    function nogamma(a, b) {
      var d = b - a;
      return d ? linear(a, d) : constant(isNaN(a) ? b : a);
    }

    var rgb$1 = (function rgbGamma(y) {
      var color = gamma(y);

      function rgb$1(start, end) {
        var r = color((start = rgb(start)).r, (end = rgb(end)).r),
            g = color(start.g, end.g),
            b = color(start.b, end.b),
            opacity = nogamma(start.opacity, end.opacity);
        return function(t) {
          start.r = r(t);
          start.g = g(t);
          start.b = b(t);
          start.opacity = opacity(t);
          return start + "";
        };
      }

      rgb$1.gamma = rgbGamma;

      return rgb$1;
    })(1);

    function rgbSpline(spline) {
      return function(colors) {
        var n = colors.length,
            r = new Array(n),
            g = new Array(n),
            b = new Array(n),
            i, color;
        for (i = 0; i < n; ++i) {
          color = rgb(colors[i]);
          r[i] = color.r || 0;
          g[i] = color.g || 0;
          b[i] = color.b || 0;
        }
        r = spline(r);
        g = spline(g);
        b = spline(b);
        color.opacity = 1;
        return function(t) {
          color.r = r(t);
          color.g = g(t);
          color.b = b(t);
          return color + "";
        };
      };
    }

    var rgbBasis = rgbSpline(basis$1);
    var rgbBasisClosed = rgbSpline(basisClosed);

    function numberArray(a, b) {
      if (!b) b = [];
      var n = a ? Math.min(b.length, a.length) : 0,
          c = b.slice(),
          i;
      return function(t) {
        for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
        return c;
      };
    }

    function isNumberArray(x) {
      return ArrayBuffer.isView(x) && !(x instanceof DataView);
    }

    function array$1(a, b) {
      return (isNumberArray(b) ? numberArray : genericArray)(a, b);
    }

    function genericArray(a, b) {
      var nb = b ? b.length : 0,
          na = a ? Math.min(nb, a.length) : 0,
          x = new Array(na),
          c = new Array(nb),
          i;

      for (i = 0; i < na; ++i) x[i] = interpolate(a[i], b[i]);
      for (; i < nb; ++i) c[i] = b[i];

      return function(t) {
        for (i = 0; i < na; ++i) c[i] = x[i](t);
        return c;
      };
    }

    function date(a, b) {
      var d = new Date;
      return a = +a, b = +b, function(t) {
        return d.setTime(a * (1 - t) + b * t), d;
      };
    }

    function interpolateNumber(a, b) {
      return a = +a, b = +b, function(t) {
        return a * (1 - t) + b * t;
      };
    }

    function object(a, b) {
      var i = {},
          c = {},
          k;

      if (a === null || typeof a !== "object") a = {};
      if (b === null || typeof b !== "object") b = {};

      for (k in b) {
        if (k in a) {
          i[k] = interpolate(a[k], b[k]);
        } else {
          c[k] = b[k];
        }
      }

      return function(t) {
        for (k in i) c[k] = i[k](t);
        return c;
      };
    }

    var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        reB = new RegExp(reA.source, "g");

    function zero$1(b) {
      return function() {
        return b;
      };
    }

    function one$1(b) {
      return function(t) {
        return b(t) + "";
      };
    }

    function string(a, b) {
      var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
          am, // current match in a
          bm, // current match in b
          bs, // string preceding current number in b, if any
          i = -1, // index in s
          s = [], // string constants and placeholders
          q = []; // number interpolators

      // Coerce inputs to strings.
      a = a + "", b = b + "";

      // Interpolate pairs of numbers in a & b.
      while ((am = reA.exec(a))
          && (bm = reB.exec(b))) {
        if ((bs = bm.index) > bi) { // a string precedes the next number in b
          bs = b.slice(bi, bs);
          if (s[i]) s[i] += bs; // coalesce with previous string
          else s[++i] = bs;
        }
        if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
          if (s[i]) s[i] += bm; // coalesce with previous string
          else s[++i] = bm;
        } else { // interpolate non-matching numbers
          s[++i] = null;
          q.push({i: i, x: interpolateNumber(am, bm)});
        }
        bi = reB.lastIndex;
      }

      // Add remains of b.
      if (bi < b.length) {
        bs = b.slice(bi);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }

      // Special optimization for only a single match.
      // Otherwise, interpolate each of the numbers and rejoin the string.
      return s.length < 2 ? (q[0]
          ? one$1(q[0].x)
          : zero$1(b))
          : (b = q.length, function(t) {
              for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
              return s.join("");
            });
    }

    function interpolate(a, b) {
      var t = typeof b, c;
      return b == null || t === "boolean" ? constant(b)
          : (t === "number" ? interpolateNumber
          : t === "string" ? ((c = color(b)) ? (b = c, rgb$1) : string)
          : b instanceof color ? rgb$1
          : b instanceof Date ? date
          : isNumberArray(b) ? numberArray
          : Array.isArray(b) ? genericArray
          : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
          : interpolateNumber)(a, b);
    }

    function discrete(range) {
      var n = range.length;
      return function(t) {
        return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
      };
    }

    function hue$1(a, b) {
      var i = hue(+a, +b);
      return function(t) {
        var x = i(t);
        return x - 360 * Math.floor(x / 360);
      };
    }

    function interpolateRound(a, b) {
      return a = +a, b = +b, function(t) {
        return Math.round(a * (1 - t) + b * t);
      };
    }

    var degrees = 180 / Math.PI;

    var identity$1 = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1
    };

    function decompose(a, b, c, d, e, f) {
      var scaleX, scaleY, skewX;
      if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
      if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
      if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
      if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
      return {
        translateX: e,
        translateY: f,
        rotate: Math.atan2(b, a) * degrees,
        skewX: Math.atan(skewX) * degrees,
        scaleX: scaleX,
        scaleY: scaleY
      };
    }

    var cssNode,
        cssRoot,
        cssView,
        svgNode;

    function parseCss(value) {
      if (value === "none") return identity$1;
      if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
      cssNode.style.transform = value;
      value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
      cssRoot.removeChild(cssNode);
      value = value.slice(7, -1).split(",");
      return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
    }

    function parseSvg(value) {
      if (value == null) return identity$1;
      if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
      svgNode.setAttribute("transform", value);
      if (!(value = svgNode.transform.baseVal.consolidate())) return identity$1;
      value = value.matrix;
      return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
    }

    function interpolateTransform(parse, pxComma, pxParen, degParen) {

      function pop(s) {
        return s.length ? s.pop() + " " : "";
      }

      function translate(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push("translate(", null, pxComma, null, pxParen);
          q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
        } else if (xb || yb) {
          s.push("translate(" + xb + pxComma + yb + pxParen);
        }
      }

      function rotate(a, b, s, q) {
        if (a !== b) {
          if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
          q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
        } else if (b) {
          s.push(pop(s) + "rotate(" + b + degParen);
        }
      }

      function skewX(a, b, s, q) {
        if (a !== b) {
          q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
        } else if (b) {
          s.push(pop(s) + "skewX(" + b + degParen);
        }
      }

      function scale(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push(pop(s) + "scale(", null, ",", null, ")");
          q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
        } else if (xb !== 1 || yb !== 1) {
          s.push(pop(s) + "scale(" + xb + "," + yb + ")");
        }
      }

      return function(a, b) {
        var s = [], // string constants and placeholders
            q = []; // number interpolators
        a = parse(a), b = parse(b);
        translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
        rotate(a.rotate, b.rotate, s, q);
        skewX(a.skewX, b.skewX, s, q);
        scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
        a = b = null; // gc
        return function(t) {
          var i = -1, n = q.length, o;
          while (++i < n) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        };
      };
    }

    var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
    var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

    var rho = Math.SQRT2,
        rho2 = 2,
        rho4 = 4,
        epsilon2 = 1e-12;

    function cosh(x) {
      return ((x = Math.exp(x)) + 1 / x) / 2;
    }

    function sinh(x) {
      return ((x = Math.exp(x)) - 1 / x) / 2;
    }

    function tanh(x) {
      return ((x = Math.exp(2 * x)) - 1) / (x + 1);
    }

    // p0 = [ux0, uy0, w0]
    // p1 = [ux1, uy1, w1]
    function zoom(p0, p1) {
      var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
          ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
          dx = ux1 - ux0,
          dy = uy1 - uy0,
          d2 = dx * dx + dy * dy,
          i,
          S;

      // Special case for u0 ≅ u1.
      if (d2 < epsilon2) {
        S = Math.log(w1 / w0) / rho;
        i = function(t) {
          return [
            ux0 + t * dx,
            uy0 + t * dy,
            w0 * Math.exp(rho * t * S)
          ];
        };
      }

      // General case.
      else {
        var d1 = Math.sqrt(d2),
            b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
            b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
            r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
            r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
        S = (r1 - r0) / rho;
        i = function(t) {
          var s = t * S,
              coshr0 = cosh(r0),
              u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
          return [
            ux0 + u * dx,
            uy0 + u * dy,
            w0 * coshr0 / cosh(rho * s + r0)
          ];
        };
      }

      i.duration = S * 1000;

      return i;
    }

    function hsl$1(hue) {
      return function(start, end) {
        var h = hue((start = hsl(start)).h, (end = hsl(end)).h),
            s = nogamma(start.s, end.s),
            l = nogamma(start.l, end.l),
            opacity = nogamma(start.opacity, end.opacity);
        return function(t) {
          start.h = h(t);
          start.s = s(t);
          start.l = l(t);
          start.opacity = opacity(t);
          return start + "";
        };
      }
    }

    var hsl$2 = hsl$1(hue);
    var hslLong = hsl$1(nogamma);

    function lab$1(start, end) {
      var l = nogamma((start = lab(start)).l, (end = lab(end)).l),
          a = nogamma(start.a, end.a),
          b = nogamma(start.b, end.b),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.l = l(t);
        start.a = a(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    function hcl$1(hue) {
      return function(start, end) {
        var h = hue((start = hcl(start)).h, (end = hcl(end)).h),
            c = nogamma(start.c, end.c),
            l = nogamma(start.l, end.l),
            opacity = nogamma(start.opacity, end.opacity);
        return function(t) {
          start.h = h(t);
          start.c = c(t);
          start.l = l(t);
          start.opacity = opacity(t);
          return start + "";
        };
      }
    }

    var hcl$2 = hcl$1(hue);
    var hclLong = hcl$1(nogamma);

    function cubehelix$1(hue) {
      return (function cubehelixGamma(y) {
        y = +y;

        function cubehelix$1(start, end) {
          var h = hue((start = cubehelix(start)).h, (end = cubehelix(end)).h),
              s = nogamma(start.s, end.s),
              l = nogamma(start.l, end.l),
              opacity = nogamma(start.opacity, end.opacity);
          return function(t) {
            start.h = h(t);
            start.s = s(t);
            start.l = l(Math.pow(t, y));
            start.opacity = opacity(t);
            return start + "";
          };
        }

        cubehelix$1.gamma = cubehelixGamma;

        return cubehelix$1;
      })(1);
    }

    var cubehelix$2 = cubehelix$1(hue);
    var cubehelixLong = cubehelix$1(nogamma);

    function piecewise(interpolate, values) {
      var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
      while (i < n) I[i] = interpolate(v, v = values[++i]);
      return function(t) {
        var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
        return I[i](t - i);
      };
    }

    function quantize(interpolator, n) {
      var samples = new Array(n);
      for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
      return samples;
    }



    var $$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        interpolate: interpolate,
        interpolateArray: array$1,
        interpolateBasis: basis$1,
        interpolateBasisClosed: basisClosed,
        interpolateDate: date,
        interpolateDiscrete: discrete,
        interpolateHue: hue$1,
        interpolateNumber: interpolateNumber,
        interpolateNumberArray: numberArray,
        interpolateObject: object,
        interpolateRound: interpolateRound,
        interpolateString: string,
        interpolateTransformCss: interpolateTransformCss,
        interpolateTransformSvg: interpolateTransformSvg,
        interpolateZoom: zoom,
        interpolateRgb: rgb$1,
        interpolateRgbBasis: rgbBasis,
        interpolateRgbBasisClosed: rgbBasisClosed,
        interpolateHsl: hsl$2,
        interpolateHslLong: hslLong,
        interpolateLab: lab$1,
        interpolateHcl: hcl$2,
        interpolateHclLong: hclLong,
        interpolateCubehelix: cubehelix$2,
        interpolateCubehelixLong: cubehelixLong,
        piecewise: piecewise,
        quantize: quantize
    });

    function constant$1(x) {
      return function() {
        return x;
      };
    }

    function number(x) {
      return +x;
    }

    var unit = [0, 1];

    function identity$2(x) {
      return x;
    }

    function normalize(a, b) {
      return (b -= (a = +a))
          ? function(x) { return (x - a) / b; }
          : constant$1(isNaN(b) ? NaN : 0.5);
    }

    function clamper(a, b) {
      var t;
      if (a > b) t = a, a = b, b = t;
      return function(x) { return Math.max(a, Math.min(b, x)); };
    }

    // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
    // interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
    function bimap(domain, range, interpolate) {
      var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
      if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
      else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
      return function(x) { return r0(d0(x)); };
    }

    function polymap(domain, range, interpolate) {
      var j = Math.min(domain.length, range.length) - 1,
          d = new Array(j),
          r = new Array(j),
          i = -1;

      // Reverse descending domains.
      if (domain[j] < domain[0]) {
        domain = domain.slice().reverse();
        range = range.slice().reverse();
      }

      while (++i < j) {
        d[i] = normalize(domain[i], domain[i + 1]);
        r[i] = interpolate(range[i], range[i + 1]);
      }

      return function(x) {
        var i = bisectRight(domain, x, 1, j) - 1;
        return r[i](d[i](x));
      };
    }

    function copy(source, target) {
      return target
          .domain(source.domain())
          .range(source.range())
          .interpolate(source.interpolate())
          .clamp(source.clamp())
          .unknown(source.unknown());
    }

    function transformer() {
      var domain = unit,
          range = unit,
          interpolate$1 = interpolate,
          transform,
          untransform,
          unknown,
          clamp = identity$2,
          piecewise,
          output,
          input;

      function rescale() {
        var n = Math.min(domain.length, range.length);
        if (clamp !== identity$2) clamp = clamper(domain[0], domain[n - 1]);
        piecewise = n > 2 ? polymap : bimap;
        output = input = null;
        return scale;
      }

      function scale(x) {
        return isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate$1)))(transform(clamp(x)));
      }

      scale.invert = function(y) {
        return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
      };

      scale.domain = function(_) {
        return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
      };

      scale.range = function(_) {
        return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
      };

      scale.rangeRound = function(_) {
        return range = Array.from(_), interpolate$1 = interpolateRound, rescale();
      };

      scale.clamp = function(_) {
        return arguments.length ? (clamp = _ ? true : identity$2, rescale()) : clamp !== identity$2;
      };

      scale.interpolate = function(_) {
        return arguments.length ? (interpolate$1 = _, rescale()) : interpolate$1;
      };

      scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
      };

      return function(t, u) {
        transform = t, untransform = u;
        return rescale();
      };
    }

    function continuous() {
      return transformer()(identity$2, identity$2);
    }

    // Computes the decimal coefficient and exponent of the specified number x with
    // significant digits p, where x is positive and p is in [1, 21] or undefined.
    // For example, formatDecimal(1.23) returns ["123", 0].
    function formatDecimal(x, p) {
      if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
      var i, coefficient = x.slice(0, i);

      // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
      // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
      return [
        coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
        +x.slice(i + 1)
      ];
    }

    function exponent(x) {
      return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
    }

    function formatGroup(grouping, thousands) {
      return function(value, width) {
        var i = value.length,
            t = [],
            j = 0,
            g = grouping[0],
            length = 0;

        while (i > 0 && g > 0) {
          if (length + g + 1 > width) g = Math.max(1, width - length);
          t.push(value.substring(i -= g, i + g));
          if ((length += g + 1) > width) break;
          g = grouping[j = (j + 1) % grouping.length];
        }

        return t.reverse().join(thousands);
      };
    }

    function formatNumerals(numerals) {
      return function(value) {
        return value.replace(/[0-9]/g, function(i) {
          return numerals[+i];
        });
      };
    }

    // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
    var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

    function formatSpecifier(specifier) {
      if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
      var match;
      return new FormatSpecifier({
        fill: match[1],
        align: match[2],
        sign: match[3],
        symbol: match[4],
        zero: match[5],
        width: match[6],
        comma: match[7],
        precision: match[8] && match[8].slice(1),
        trim: match[9],
        type: match[10]
      });
    }

    formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

    function FormatSpecifier(specifier) {
      this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
      this.align = specifier.align === undefined ? ">" : specifier.align + "";
      this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
      this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
      this.zero = !!specifier.zero;
      this.width = specifier.width === undefined ? undefined : +specifier.width;
      this.comma = !!specifier.comma;
      this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
      this.trim = !!specifier.trim;
      this.type = specifier.type === undefined ? "" : specifier.type + "";
    }

    FormatSpecifier.prototype.toString = function() {
      return this.fill
          + this.align
          + this.sign
          + this.symbol
          + (this.zero ? "0" : "")
          + (this.width === undefined ? "" : Math.max(1, this.width | 0))
          + (this.comma ? "," : "")
          + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
          + (this.trim ? "~" : "")
          + this.type;
    };

    // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
    function formatTrim(s) {
      out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
        switch (s[i]) {
          case ".": i0 = i1 = i; break;
          case "0": if (i0 === 0) i0 = i; i1 = i; break;
          default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
        }
      }
      return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
    }

    var prefixExponent;

    function formatPrefixAuto(x, p) {
      var d = formatDecimal(x, p);
      if (!d) return x + "";
      var coefficient = d[0],
          exponent = d[1],
          i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
          n = coefficient.length;
      return i === n ? coefficient
          : i > n ? coefficient + new Array(i - n + 1).join("0")
          : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
          : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
    }

    function formatRounded(x, p) {
      var d = formatDecimal(x, p);
      if (!d) return x + "";
      var coefficient = d[0],
          exponent = d[1];
      return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
          : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
          : coefficient + new Array(exponent - coefficient.length + 2).join("0");
    }

    var formatTypes = {
      "%": function(x, p) { return (x * 100).toFixed(p); },
      "b": function(x) { return Math.round(x).toString(2); },
      "c": function(x) { return x + ""; },
      "d": function(x) { return Math.round(x).toString(10); },
      "e": function(x, p) { return x.toExponential(p); },
      "f": function(x, p) { return x.toFixed(p); },
      "g": function(x, p) { return x.toPrecision(p); },
      "o": function(x) { return Math.round(x).toString(8); },
      "p": function(x, p) { return formatRounded(x * 100, p); },
      "r": formatRounded,
      "s": formatPrefixAuto,
      "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
      "x": function(x) { return Math.round(x).toString(16); }
    };

    function identity$3(x) {
      return x;
    }

    var map = Array.prototype.map,
        prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

    function formatLocale(locale) {
      var group = locale.grouping === undefined || locale.thousands === undefined ? identity$3 : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
          currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
          currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
          decimal = locale.decimal === undefined ? "." : locale.decimal + "",
          numerals = locale.numerals === undefined ? identity$3 : formatNumerals(map.call(locale.numerals, String)),
          percent = locale.percent === undefined ? "%" : locale.percent + "",
          minus = locale.minus === undefined ? "-" : locale.minus + "",
          nan = locale.nan === undefined ? "NaN" : locale.nan + "";

      function newFormat(specifier) {
        specifier = formatSpecifier(specifier);

        var fill = specifier.fill,
            align = specifier.align,
            sign = specifier.sign,
            symbol = specifier.symbol,
            zero = specifier.zero,
            width = specifier.width,
            comma = specifier.comma,
            precision = specifier.precision,
            trim = specifier.trim,
            type = specifier.type;

        // The "n" type is an alias for ",g".
        if (type === "n") comma = true, type = "g";

        // The "" type, and any invalid type, is an alias for ".12~g".
        else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

        // If zero fill is specified, padding goes after sign and before digits.
        if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

        // Compute the prefix and suffix.
        // For SI-prefix, the suffix is lazily computed.
        var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
            suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

        // What format function should we use?
        // Is this an integer type?
        // Can this type generate exponential notation?
        var formatType = formatTypes[type],
            maybeSuffix = /[defgprs%]/.test(type);

        // Set the default precision if not specified,
        // or clamp the specified precision to the supported range.
        // For significant precision, it must be in [1, 21].
        // For fixed precision, it must be in [0, 20].
        precision = precision === undefined ? 6
            : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
            : Math.max(0, Math.min(20, precision));

        function format(value) {
          var valuePrefix = prefix,
              valueSuffix = suffix,
              i, n, c;

          if (type === "c") {
            valueSuffix = formatType(value) + valueSuffix;
            value = "";
          } else {
            value = +value;

            // Perform the initial formatting.
            var valueNegative = value < 0;
            value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

            // Trim insignificant zeros.
            if (trim) value = formatTrim(value);

            // If a negative value rounds to zero during formatting, treat as positive.
            if (valueNegative && +value === 0) valueNegative = false;

            // Compute the prefix and suffix.
            valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;

            valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

            // Break the formatted value into the integer “value” part that can be
            // grouped, and fractional or exponential “suffix” part that is not.
            if (maybeSuffix) {
              i = -1, n = value.length;
              while (++i < n) {
                if (c = value.charCodeAt(i), 48 > c || c > 57) {
                  valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                  value = value.slice(0, i);
                  break;
                }
              }
            }
          }

          // If the fill character is not "0", grouping is applied before padding.
          if (comma && !zero) value = group(value, Infinity);

          // Compute the padding.
          var length = valuePrefix.length + value.length + valueSuffix.length,
              padding = length < width ? new Array(width - length + 1).join(fill) : "";

          // If the fill character is "0", grouping is applied after padding.
          if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

          // Reconstruct the final output based on the desired alignment.
          switch (align) {
            case "<": value = valuePrefix + value + valueSuffix + padding; break;
            case "=": value = valuePrefix + padding + value + valueSuffix; break;
            case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
            default: value = padding + valuePrefix + value + valueSuffix; break;
          }

          return numerals(value);
        }

        format.toString = function() {
          return specifier + "";
        };

        return format;
      }

      function formatPrefix(specifier, value) {
        var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
            e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
            k = Math.pow(10, -e),
            prefix = prefixes[8 + e / 3];
        return function(value) {
          return f(k * value) + prefix;
        };
      }

      return {
        format: newFormat,
        formatPrefix: formatPrefix
      };
    }

    var locale;
    var format;
    var formatPrefix;

    defaultLocale({
      decimal: ".",
      thousands: ",",
      grouping: [3],
      currency: ["$", ""],
      minus: "-"
    });

    function defaultLocale(definition) {
      locale = formatLocale(definition);
      format = locale.format;
      formatPrefix = locale.formatPrefix;
      return locale;
    }

    function precisionFixed(step) {
      return Math.max(0, -exponent(Math.abs(step)));
    }

    function precisionPrefix(step, value) {
      return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
    }

    function precisionRound(step, max) {
      step = Math.abs(step), max = Math.abs(max) - step;
      return Math.max(0, exponent(max) - exponent(step)) + 1;
    }

    function tickFormat(start, stop, count, specifier) {
      var step = tickStep(start, stop, count),
          precision;
      specifier = formatSpecifier(specifier == null ? ",f" : specifier);
      switch (specifier.type) {
        case "s": {
          var value = Math.max(Math.abs(start), Math.abs(stop));
          if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
          return formatPrefix(specifier, value);
        }
        case "":
        case "e":
        case "g":
        case "p":
        case "r": {
          if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
          break;
        }
        case "f":
        case "%": {
          if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
          break;
        }
      }
      return format(specifier);
    }

    function linearish(scale) {
      var domain = scale.domain;

      scale.ticks = function(count) {
        var d = domain();
        return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
      };

      scale.tickFormat = function(count, specifier) {
        var d = domain();
        return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
      };

      scale.nice = function(count) {
        if (count == null) count = 10;

        var d = domain(),
            i0 = 0,
            i1 = d.length - 1,
            start = d[i0],
            stop = d[i1],
            step;

        if (stop < start) {
          step = start, start = stop, stop = step;
          step = i0, i0 = i1, i1 = step;
        }

        step = tickIncrement(start, stop, count);

        if (step > 0) {
          start = Math.floor(start / step) * step;
          stop = Math.ceil(stop / step) * step;
          step = tickIncrement(start, stop, count);
        } else if (step < 0) {
          start = Math.ceil(start * step) / step;
          stop = Math.floor(stop * step) / step;
          step = tickIncrement(start, stop, count);
        }

        if (step > 0) {
          d[i0] = Math.floor(start / step) * step;
          d[i1] = Math.ceil(stop / step) * step;
          domain(d);
        } else if (step < 0) {
          d[i0] = Math.ceil(start * step) / step;
          d[i1] = Math.floor(stop * step) / step;
          domain(d);
        }

        return scale;
      };

      return scale;
    }

    function linear$1() {
      var scale = continuous();

      scale.copy = function() {
        return copy(scale, linear$1());
      };

      initRange.apply(scale, arguments);

      return linearish(scale);
    }

    function identity$4(domain) {
      var unknown;

      function scale(x) {
        return isNaN(x = +x) ? unknown : x;
      }

      scale.invert = scale;

      scale.domain = scale.range = function(_) {
        return arguments.length ? (domain = Array.from(_, number), scale) : domain.slice();
      };

      scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
      };

      scale.copy = function() {
        return identity$4(domain).unknown(unknown);
      };

      domain = arguments.length ? Array.from(domain, number) : [0, 1];

      return linearish(scale);
    }

    function nice(domain, interval) {
      domain = domain.slice();

      var i0 = 0,
          i1 = domain.length - 1,
          x0 = domain[i0],
          x1 = domain[i1],
          t;

      if (x1 < x0) {
        t = i0, i0 = i1, i1 = t;
        t = x0, x0 = x1, x1 = t;
      }

      domain[i0] = interval.floor(x0);
      domain[i1] = interval.ceil(x1);
      return domain;
    }

    function transformLog(x) {
      return Math.log(x);
    }

    function transformExp(x) {
      return Math.exp(x);
    }

    function transformLogn(x) {
      return -Math.log(-x);
    }

    function transformExpn(x) {
      return -Math.exp(-x);
    }

    function pow10(x) {
      return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
    }

    function powp(base) {
      return base === 10 ? pow10
          : base === Math.E ? Math.exp
          : function(x) { return Math.pow(base, x); };
    }

    function logp(base) {
      return base === Math.E ? Math.log
          : base === 10 && Math.log10
          || base === 2 && Math.log2
          || (base = Math.log(base), function(x) { return Math.log(x) / base; });
    }

    function reflect(f) {
      return function(x) {
        return -f(-x);
      };
    }

    function loggish(transform) {
      var scale = transform(transformLog, transformExp),
          domain = scale.domain,
          base = 10,
          logs,
          pows;

      function rescale() {
        logs = logp(base), pows = powp(base);
        if (domain()[0] < 0) {
          logs = reflect(logs), pows = reflect(pows);
          transform(transformLogn, transformExpn);
        } else {
          transform(transformLog, transformExp);
        }
        return scale;
      }

      scale.base = function(_) {
        return arguments.length ? (base = +_, rescale()) : base;
      };

      scale.domain = function(_) {
        return arguments.length ? (domain(_), rescale()) : domain();
      };

      scale.ticks = function(count) {
        var d = domain(),
            u = d[0],
            v = d[d.length - 1],
            r;

        if (r = v < u) i = u, u = v, v = i;

        var i = logs(u),
            j = logs(v),
            p,
            k,
            t,
            n = count == null ? 10 : +count,
            z = [];

        if (!(base % 1) && j - i < n) {
          i = Math.floor(i), j = Math.ceil(j);
          if (u > 0) for (; i <= j; ++i) {
            for (k = 1, p = pows(i); k < base; ++k) {
              t = p * k;
              if (t < u) continue;
              if (t > v) break;
              z.push(t);
            }
          } else for (; i <= j; ++i) {
            for (k = base - 1, p = pows(i); k >= 1; --k) {
              t = p * k;
              if (t < u) continue;
              if (t > v) break;
              z.push(t);
            }
          }
          if (z.length * 2 < n) z = ticks(u, v, n);
        } else {
          z = ticks(i, j, Math.min(j - i, n)).map(pows);
        }

        return r ? z.reverse() : z;
      };

      scale.tickFormat = function(count, specifier) {
        if (specifier == null) specifier = base === 10 ? ".0e" : ",";
        if (typeof specifier !== "function") specifier = format(specifier);
        if (count === Infinity) return specifier;
        if (count == null) count = 10;
        var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
        return function(d) {
          var i = d / pows(Math.round(logs(d)));
          if (i * base < base - 0.5) i *= base;
          return i <= k ? specifier(d) : "";
        };
      };

      scale.nice = function() {
        return domain(nice(domain(), {
          floor: function(x) { return pows(Math.floor(logs(x))); },
          ceil: function(x) { return pows(Math.ceil(logs(x))); }
        }));
      };

      return scale;
    }

    function log$1() {
      var scale = loggish(transformer()).domain([1, 10]);

      scale.copy = function() {
        return copy(scale, log$1()).base(scale.base());
      };

      initRange.apply(scale, arguments);

      return scale;
    }

    function transformSymlog(c) {
      return function(x) {
        return Math.sign(x) * Math.log1p(Math.abs(x / c));
      };
    }

    function transformSymexp(c) {
      return function(x) {
        return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
      };
    }

    function symlogish(transform) {
      var c = 1, scale = transform(transformSymlog(c), transformSymexp(c));

      scale.constant = function(_) {
        return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
      };

      return linearish(scale);
    }

    function symlog() {
      var scale = symlogish(transformer());

      scale.copy = function() {
        return copy(scale, symlog()).constant(scale.constant());
      };

      return initRange.apply(scale, arguments);
    }

    function transformPow(exponent) {
      return function(x) {
        return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
      };
    }

    function transformSqrt(x) {
      return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
    }

    function transformSquare(x) {
      return x < 0 ? -x * x : x * x;
    }

    function powish(transform) {
      var scale = transform(identity$2, identity$2),
          exponent = 1;

      function rescale() {
        return exponent === 1 ? transform(identity$2, identity$2)
            : exponent === 0.5 ? transform(transformSqrt, transformSquare)
            : transform(transformPow(exponent), transformPow(1 / exponent));
      }

      scale.exponent = function(_) {
        return arguments.length ? (exponent = +_, rescale()) : exponent;
      };

      return linearish(scale);
    }

    function pow() {
      var scale = powish(transformer());

      scale.copy = function() {
        return copy(scale, pow()).exponent(scale.exponent());
      };

      initRange.apply(scale, arguments);

      return scale;
    }

    function sqrt() {
      return pow.apply(null, arguments).exponent(0.5);
    }

    function quantile$1() {
      var domain = [],
          range = [],
          thresholds = [],
          unknown;

      function rescale() {
        var i = 0, n = Math.max(1, range.length);
        thresholds = new Array(n - 1);
        while (++i < n) thresholds[i - 1] = quantile(domain, i / n);
        return scale;
      }

      function scale(x) {
        return isNaN(x = +x) ? unknown : range[bisectRight(thresholds, x)];
      }

      scale.invertExtent = function(y) {
        var i = range.indexOf(y);
        return i < 0 ? [NaN, NaN] : [
          i > 0 ? thresholds[i - 1] : domain[0],
          i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
        ];
      };

      scale.domain = function(_) {
        if (!arguments.length) return domain.slice();
        domain = [];
        for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);
        domain.sort(ascending);
        return rescale();
      };

      scale.range = function(_) {
        return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
      };

      scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
      };

      scale.quantiles = function() {
        return thresholds.slice();
      };

      scale.copy = function() {
        return quantile$1()
            .domain(domain)
            .range(range)
            .unknown(unknown);
      };

      return initRange.apply(scale, arguments);
    }

    function quantize$1() {
      var x0 = 0,
          x1 = 1,
          n = 1,
          domain = [0.5],
          range = [0, 1],
          unknown;

      function scale(x) {
        return x <= x ? range[bisectRight(domain, x, 0, n)] : unknown;
      }

      function rescale() {
        var i = -1;
        domain = new Array(n);
        while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
        return scale;
      }

      scale.domain = function(_) {
        return arguments.length ? ([x0, x1] = _, x0 = +x0, x1 = +x1, rescale()) : [x0, x1];
      };

      scale.range = function(_) {
        return arguments.length ? (n = (range = Array.from(_)).length - 1, rescale()) : range.slice();
      };

      scale.invertExtent = function(y) {
        var i = range.indexOf(y);
        return i < 0 ? [NaN, NaN]
            : i < 1 ? [x0, domain[0]]
            : i >= n ? [domain[n - 1], x1]
            : [domain[i - 1], domain[i]];
      };

      scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : scale;
      };

      scale.thresholds = function() {
        return domain.slice();
      };

      scale.copy = function() {
        return quantize$1()
            .domain([x0, x1])
            .range(range)
            .unknown(unknown);
      };

      return initRange.apply(linearish(scale), arguments);
    }

    function threshold() {
      var domain = [0.5],
          range = [0, 1],
          unknown,
          n = 1;

      function scale(x) {
        return x <= x ? range[bisectRight(domain, x, 0, n)] : unknown;
      }

      scale.domain = function(_) {
        return arguments.length ? (domain = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
      };

      scale.range = function(_) {
        return arguments.length ? (range = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
      };

      scale.invertExtent = function(y) {
        var i = range.indexOf(y);
        return [domain[i - 1], domain[i]];
      };

      scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
      };

      scale.copy = function() {
        return threshold()
            .domain(domain)
            .range(range)
            .unknown(unknown);
      };

      return initRange.apply(scale, arguments);
    }

    var t0$1 = new Date,
        t1$1 = new Date;

    function newInterval(floori, offseti, count, field) {

      function interval(date) {
        return floori(date = arguments.length === 0 ? new Date : new Date(+date)), date;
      }

      interval.floor = function(date) {
        return floori(date = new Date(+date)), date;
      };

      interval.ceil = function(date) {
        return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
      };

      interval.round = function(date) {
        var d0 = interval(date),
            d1 = interval.ceil(date);
        return date - d0 < d1 - date ? d0 : d1;
      };

      interval.offset = function(date, step) {
        return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
      };

      interval.range = function(start, stop, step) {
        var range = [], previous;
        start = interval.ceil(start);
        step = step == null ? 1 : Math.floor(step);
        if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
        do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
        while (previous < start && start < stop);
        return range;
      };

      interval.filter = function(test) {
        return newInterval(function(date) {
          if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
        }, function(date, step) {
          if (date >= date) {
            if (step < 0) while (++step <= 0) {
              while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
            } else while (--step >= 0) {
              while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
            }
          }
        });
      };

      if (count) {
        interval.count = function(start, end) {
          t0$1.setTime(+start), t1$1.setTime(+end);
          floori(t0$1), floori(t1$1);
          return Math.floor(count(t0$1, t1$1));
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
    }

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

    var durationSecond = 1e3;
    var durationMinute = 6e4;
    var durationHour = 36e5;
    var durationDay = 864e5;
    var durationWeek = 6048e5;

    var second = newInterval(function(date) {
      date.setTime(date - date.getMilliseconds());
    }, function(date, step) {
      date.setTime(+date + step * durationSecond);
    }, function(start, end) {
      return (end - start) / durationSecond;
    }, function(date) {
      return date.getUTCSeconds();
    });

    var minute = newInterval(function(date) {
      date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
    }, function(date, step) {
      date.setTime(+date + step * durationMinute);
    }, function(start, end) {
      return (end - start) / durationMinute;
    }, function(date) {
      return date.getMinutes();
    });

    var hour = newInterval(function(date) {
      date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
    }, function(date, step) {
      date.setTime(+date + step * durationHour);
    }, function(start, end) {
      return (end - start) / durationHour;
    }, function(date) {
      return date.getHours();
    });

    var day = newInterval(function(date) {
      date.setHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setDate(date.getDate() + step);
    }, function(start, end) {
      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
    }, function(date) {
      return date.getDate() - 1;
    });

    function weekday(i) {
      return newInterval(function(date) {
        date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
        date.setHours(0, 0, 0, 0);
      }, function(date, step) {
        date.setDate(date.getDate() + step * 7);
      }, function(start, end) {
        return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
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
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setMonth(date.getMonth() + step);
    }, function(start, end) {
      return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
    }, function(date) {
      return date.getMonth();
    });

    var year = newInterval(function(date) {
      date.setMonth(0, 1);
      date.setHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setFullYear(date.getFullYear() + step);
    }, function(start, end) {
      return end.getFullYear() - start.getFullYear();
    }, function(date) {
      return date.getFullYear();
    });

    // An optimized implementation for this simple case.
    year.every = function(k) {
      return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
        date.setFullYear(Math.floor(date.getFullYear() / k) * k);
        date.setMonth(0, 1);
        date.setHours(0, 0, 0, 0);
      }, function(date, step) {
        date.setFullYear(date.getFullYear() + step * k);
      });
    };

    var utcMinute = newInterval(function(date) {
      date.setUTCSeconds(0, 0);
    }, function(date, step) {
      date.setTime(+date + step * durationMinute);
    }, function(start, end) {
      return (end - start) / durationMinute;
    }, function(date) {
      return date.getUTCMinutes();
    });

    var utcHour = newInterval(function(date) {
      date.setUTCMinutes(0, 0, 0);
    }, function(date, step) {
      date.setTime(+date + step * durationHour);
    }, function(start, end) {
      return (end - start) / durationHour;
    }, function(date) {
      return date.getUTCHours();
    });

    var utcDay = newInterval(function(date) {
      date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setUTCDate(date.getUTCDate() + step);
    }, function(start, end) {
      return (end - start) / durationDay;
    }, function(date) {
      return date.getUTCDate() - 1;
    });

    function utcWeekday(i) {
      return newInterval(function(date) {
        date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
        date.setUTCHours(0, 0, 0, 0);
      }, function(date, step) {
        date.setUTCDate(date.getUTCDate() + step * 7);
      }, function(start, end) {
        return (end - start) / durationWeek;
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
      date.setUTCDate(1);
      date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setUTCMonth(date.getUTCMonth() + step);
    }, function(start, end) {
      return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
    }, function(date) {
      return date.getUTCMonth();
    });

    var utcYear = newInterval(function(date) {
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setUTCFullYear(date.getUTCFullYear() + step);
    }, function(start, end) {
      return end.getUTCFullYear() - start.getUTCFullYear();
    }, function(date) {
      return date.getUTCFullYear();
    });

    // An optimized implementation for this simple case.
    utcYear.every = function(k) {
      return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
        date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
        date.setUTCMonth(0, 1);
        date.setUTCHours(0, 0, 0, 0);
      }, function(date, step) {
        date.setUTCFullYear(date.getUTCFullYear() + step * k);
      });
    };

    function localDate(d) {
      if (0 <= d.y && d.y < 100) {
        var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
        date.setFullYear(d.y);
        return date;
      }
      return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
    }

    function utcDate(d) {
      if (0 <= d.y && d.y < 100) {
        var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
        date.setUTCFullYear(d.y);
        return date;
      }
      return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
    }

    function newDate(y, m, d) {
      return {y: y, m: m, d: d, H: 0, M: 0, S: 0, L: 0};
    }

    function formatLocale$1(locale) {
      var locale_dateTime = locale.dateTime,
          locale_date = locale.date,
          locale_time = locale.time,
          locale_periods = locale.periods,
          locale_weekdays = locale.days,
          locale_shortWeekdays = locale.shortDays,
          locale_months = locale.months,
          locale_shortMonths = locale.shortMonths;

      var periodRe = formatRe(locale_periods),
          periodLookup = formatLookup(locale_periods),
          weekdayRe = formatRe(locale_weekdays),
          weekdayLookup = formatLookup(locale_weekdays),
          shortWeekdayRe = formatRe(locale_shortWeekdays),
          shortWeekdayLookup = formatLookup(locale_shortWeekdays),
          monthRe = formatRe(locale_months),
          monthLookup = formatLookup(locale_months),
          shortMonthRe = formatRe(locale_shortMonths),
          shortMonthLookup = formatLookup(locale_shortMonths);

      var formats = {
        "a": formatShortWeekday,
        "A": formatWeekday,
        "b": formatShortMonth,
        "B": formatMonth,
        "c": null,
        "d": formatDayOfMonth,
        "e": formatDayOfMonth,
        "f": formatMicroseconds,
        "H": formatHour24,
        "I": formatHour12,
        "j": formatDayOfYear,
        "L": formatMilliseconds,
        "m": formatMonthNumber,
        "M": formatMinutes,
        "p": formatPeriod,
        "q": formatQuarter,
        "Q": formatUnixTimestamp,
        "s": formatUnixTimestampSeconds,
        "S": formatSeconds,
        "u": formatWeekdayNumberMonday,
        "U": formatWeekNumberSunday,
        "V": formatWeekNumberISO,
        "w": formatWeekdayNumberSunday,
        "W": formatWeekNumberMonday,
        "x": null,
        "X": null,
        "y": formatYear,
        "Y": formatFullYear,
        "Z": formatZone,
        "%": formatLiteralPercent
      };

      var utcFormats = {
        "a": formatUTCShortWeekday,
        "A": formatUTCWeekday,
        "b": formatUTCShortMonth,
        "B": formatUTCMonth,
        "c": null,
        "d": formatUTCDayOfMonth,
        "e": formatUTCDayOfMonth,
        "f": formatUTCMicroseconds,
        "H": formatUTCHour24,
        "I": formatUTCHour12,
        "j": formatUTCDayOfYear,
        "L": formatUTCMilliseconds,
        "m": formatUTCMonthNumber,
        "M": formatUTCMinutes,
        "p": formatUTCPeriod,
        "q": formatUTCQuarter,
        "Q": formatUnixTimestamp,
        "s": formatUnixTimestampSeconds,
        "S": formatUTCSeconds,
        "u": formatUTCWeekdayNumberMonday,
        "U": formatUTCWeekNumberSunday,
        "V": formatUTCWeekNumberISO,
        "w": formatUTCWeekdayNumberSunday,
        "W": formatUTCWeekNumberMonday,
        "x": null,
        "X": null,
        "y": formatUTCYear,
        "Y": formatUTCFullYear,
        "Z": formatUTCZone,
        "%": formatLiteralPercent
      };

      var parses = {
        "a": parseShortWeekday,
        "A": parseWeekday,
        "b": parseShortMonth,
        "B": parseMonth,
        "c": parseLocaleDateTime,
        "d": parseDayOfMonth,
        "e": parseDayOfMonth,
        "f": parseMicroseconds,
        "H": parseHour24,
        "I": parseHour24,
        "j": parseDayOfYear,
        "L": parseMilliseconds,
        "m": parseMonthNumber,
        "M": parseMinutes,
        "p": parsePeriod,
        "q": parseQuarter,
        "Q": parseUnixTimestamp,
        "s": parseUnixTimestampSeconds,
        "S": parseSeconds,
        "u": parseWeekdayNumberMonday,
        "U": parseWeekNumberSunday,
        "V": parseWeekNumberISO,
        "w": parseWeekdayNumberSunday,
        "W": parseWeekNumberMonday,
        "x": parseLocaleDate,
        "X": parseLocaleTime,
        "y": parseYear,
        "Y": parseFullYear,
        "Z": parseZone,
        "%": parseLiteralPercent
      };

      // These recursive directive definitions must be deferred.
      formats.x = newFormat(locale_date, formats);
      formats.X = newFormat(locale_time, formats);
      formats.c = newFormat(locale_dateTime, formats);
      utcFormats.x = newFormat(locale_date, utcFormats);
      utcFormats.X = newFormat(locale_time, utcFormats);
      utcFormats.c = newFormat(locale_dateTime, utcFormats);

      function newFormat(specifier, formats) {
        return function(date) {
          var string = [],
              i = -1,
              j = 0,
              n = specifier.length,
              c,
              pad,
              format;

          if (!(date instanceof Date)) date = new Date(+date);

          while (++i < n) {
            if (specifier.charCodeAt(i) === 37) {
              string.push(specifier.slice(j, i));
              if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
              else pad = c === "e" ? " " : "0";
              if (format = formats[c]) c = format(date, pad);
              string.push(c);
              j = i + 1;
            }
          }

          string.push(specifier.slice(j, i));
          return string.join("");
        };
      }

      function newParse(specifier, Z) {
        return function(string) {
          var d = newDate(1900, undefined, 1),
              i = parseSpecifier(d, specifier, string += "", 0),
              week, day$1;
          if (i != string.length) return null;

          // If a UNIX timestamp is specified, return it.
          if ("Q" in d) return new Date(d.Q);
          if ("s" in d) return new Date(d.s * 1000 + ("L" in d ? d.L : 0));

          // If this is utcParse, never use the local timezone.
          if (Z && !("Z" in d)) d.Z = 0;

          // The am-pm flag is 0 for AM, and 1 for PM.
          if ("p" in d) d.H = d.H % 12 + d.p * 12;

          // If the month was not specified, inherit from the quarter.
          if (d.m === undefined) d.m = "q" in d ? d.q : 0;

          // Convert day-of-week and week-of-year to day-of-year.
          if ("V" in d) {
            if (d.V < 1 || d.V > 53) return null;
            if (!("w" in d)) d.w = 1;
            if ("Z" in d) {
              week = utcDate(newDate(d.y, 0, 1)), day$1 = week.getUTCDay();
              week = day$1 > 4 || day$1 === 0 ? utcMonday.ceil(week) : utcMonday(week);
              week = utcDay.offset(week, (d.V - 1) * 7);
              d.y = week.getUTCFullYear();
              d.m = week.getUTCMonth();
              d.d = week.getUTCDate() + (d.w + 6) % 7;
            } else {
              week = localDate(newDate(d.y, 0, 1)), day$1 = week.getDay();
              week = day$1 > 4 || day$1 === 0 ? monday.ceil(week) : monday(week);
              week = day.offset(week, (d.V - 1) * 7);
              d.y = week.getFullYear();
              d.m = week.getMonth();
              d.d = week.getDate() + (d.w + 6) % 7;
            }
          } else if ("W" in d || "U" in d) {
            if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
            day$1 = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
            d.m = 0;
            d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$1 + 5) % 7 : d.w + d.U * 7 - (day$1 + 6) % 7;
          }

          // If a time zone is specified, all fields are interpreted as UTC and then
          // offset according to the specified time zone.
          if ("Z" in d) {
            d.H += d.Z / 100 | 0;
            d.M += d.Z % 100;
            return utcDate(d);
          }

          // Otherwise, all fields are in local time.
          return localDate(d);
        };
      }

      function parseSpecifier(d, specifier, string, j) {
        var i = 0,
            n = specifier.length,
            m = string.length,
            c,
            parse;

        while (i < n) {
          if (j >= m) return -1;
          c = specifier.charCodeAt(i++);
          if (c === 37) {
            c = specifier.charAt(i++);
            parse = parses[c in pads ? specifier.charAt(i++) : c];
            if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
          } else if (c != string.charCodeAt(j++)) {
            return -1;
          }
        }

        return j;
      }

      function parsePeriod(d, string, i) {
        var n = periodRe.exec(string.slice(i));
        return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
      }

      function parseShortWeekday(d, string, i) {
        var n = shortWeekdayRe.exec(string.slice(i));
        return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
      }

      function parseWeekday(d, string, i) {
        var n = weekdayRe.exec(string.slice(i));
        return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
      }

      function parseShortMonth(d, string, i) {
        var n = shortMonthRe.exec(string.slice(i));
        return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
      }

      function parseMonth(d, string, i) {
        var n = monthRe.exec(string.slice(i));
        return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
      }

      function parseLocaleDateTime(d, string, i) {
        return parseSpecifier(d, locale_dateTime, string, i);
      }

      function parseLocaleDate(d, string, i) {
        return parseSpecifier(d, locale_date, string, i);
      }

      function parseLocaleTime(d, string, i) {
        return parseSpecifier(d, locale_time, string, i);
      }

      function formatShortWeekday(d) {
        return locale_shortWeekdays[d.getDay()];
      }

      function formatWeekday(d) {
        return locale_weekdays[d.getDay()];
      }

      function formatShortMonth(d) {
        return locale_shortMonths[d.getMonth()];
      }

      function formatMonth(d) {
        return locale_months[d.getMonth()];
      }

      function formatPeriod(d) {
        return locale_periods[+(d.getHours() >= 12)];
      }

      function formatQuarter(d) {
        return 1 + ~~(d.getMonth() / 3);
      }

      function formatUTCShortWeekday(d) {
        return locale_shortWeekdays[d.getUTCDay()];
      }

      function formatUTCWeekday(d) {
        return locale_weekdays[d.getUTCDay()];
      }

      function formatUTCShortMonth(d) {
        return locale_shortMonths[d.getUTCMonth()];
      }

      function formatUTCMonth(d) {
        return locale_months[d.getUTCMonth()];
      }

      function formatUTCPeriod(d) {
        return locale_periods[+(d.getUTCHours() >= 12)];
      }

      function formatUTCQuarter(d) {
        return 1 + ~~(d.getUTCMonth() / 3);
      }

      return {
        format: function(specifier) {
          var f = newFormat(specifier += "", formats);
          f.toString = function() { return specifier; };
          return f;
        },
        parse: function(specifier) {
          var p = newParse(specifier += "", false);
          p.toString = function() { return specifier; };
          return p;
        },
        utcFormat: function(specifier) {
          var f = newFormat(specifier += "", utcFormats);
          f.toString = function() { return specifier; };
          return f;
        },
        utcParse: function(specifier) {
          var p = newParse(specifier += "", true);
          p.toString = function() { return specifier; };
          return p;
        }
      };
    }

    var pads = {"-": "", "_": " ", "0": "0"},
        numberRe = /^\s*\d+/, // note: ignores next directive
        percentRe = /^%/,
        requoteRe = /[\\^$*+?|[\]().{}]/g;

    function pad(value, fill, width) {
      var sign = value < 0 ? "-" : "",
          string = (sign ? -value : value) + "",
          length = string.length;
      return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
    }

    function requote(s) {
      return s.replace(requoteRe, "\\$&");
    }

    function formatRe(names) {
      return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
    }

    function formatLookup(names) {
      var map = {}, i = -1, n = names.length;
      while (++i < n) map[names[i].toLowerCase()] = i;
      return map;
    }

    function parseWeekdayNumberSunday(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 1));
      return n ? (d.w = +n[0], i + n[0].length) : -1;
    }

    function parseWeekdayNumberMonday(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 1));
      return n ? (d.u = +n[0], i + n[0].length) : -1;
    }

    function parseWeekNumberSunday(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 2));
      return n ? (d.U = +n[0], i + n[0].length) : -1;
    }

    function parseWeekNumberISO(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 2));
      return n ? (d.V = +n[0], i + n[0].length) : -1;
    }

    function parseWeekNumberMonday(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 2));
      return n ? (d.W = +n[0], i + n[0].length) : -1;
    }

    function parseFullYear(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 4));
      return n ? (d.y = +n[0], i + n[0].length) : -1;
    }

    function parseYear(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 2));
      return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
    }

    function parseZone(d, string, i) {
      var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
      return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
    }

    function parseQuarter(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 1));
      return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
    }

    function parseMonthNumber(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 2));
      return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
    }

    function parseDayOfMonth(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 2));
      return n ? (d.d = +n[0], i + n[0].length) : -1;
    }

    function parseDayOfYear(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 3));
      return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
    }

    function parseHour24(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 2));
      return n ? (d.H = +n[0], i + n[0].length) : -1;
    }

    function parseMinutes(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 2));
      return n ? (d.M = +n[0], i + n[0].length) : -1;
    }

    function parseSeconds(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 2));
      return n ? (d.S = +n[0], i + n[0].length) : -1;
    }

    function parseMilliseconds(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 3));
      return n ? (d.L = +n[0], i + n[0].length) : -1;
    }

    function parseMicroseconds(d, string, i) {
      var n = numberRe.exec(string.slice(i, i + 6));
      return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
    }

    function parseLiteralPercent(d, string, i) {
      var n = percentRe.exec(string.slice(i, i + 1));
      return n ? i + n[0].length : -1;
    }

    function parseUnixTimestamp(d, string, i) {
      var n = numberRe.exec(string.slice(i));
      return n ? (d.Q = +n[0], i + n[0].length) : -1;
    }

    function parseUnixTimestampSeconds(d, string, i) {
      var n = numberRe.exec(string.slice(i));
      return n ? (d.s = +n[0], i + n[0].length) : -1;
    }

    function formatDayOfMonth(d, p) {
      return pad(d.getDate(), p, 2);
    }

    function formatHour24(d, p) {
      return pad(d.getHours(), p, 2);
    }

    function formatHour12(d, p) {
      return pad(d.getHours() % 12 || 12, p, 2);
    }

    function formatDayOfYear(d, p) {
      return pad(1 + day.count(year(d), d), p, 3);
    }

    function formatMilliseconds(d, p) {
      return pad(d.getMilliseconds(), p, 3);
    }

    function formatMicroseconds(d, p) {
      return formatMilliseconds(d, p) + "000";
    }

    function formatMonthNumber(d, p) {
      return pad(d.getMonth() + 1, p, 2);
    }

    function formatMinutes(d, p) {
      return pad(d.getMinutes(), p, 2);
    }

    function formatSeconds(d, p) {
      return pad(d.getSeconds(), p, 2);
    }

    function formatWeekdayNumberMonday(d) {
      var day = d.getDay();
      return day === 0 ? 7 : day;
    }

    function formatWeekNumberSunday(d, p) {
      return pad(sunday.count(year(d) - 1, d), p, 2);
    }

    function formatWeekNumberISO(d, p) {
      var day = d.getDay();
      d = (day >= 4 || day === 0) ? thursday(d) : thursday.ceil(d);
      return pad(thursday.count(year(d), d) + (year(d).getDay() === 4), p, 2);
    }

    function formatWeekdayNumberSunday(d) {
      return d.getDay();
    }

    function formatWeekNumberMonday(d, p) {
      return pad(monday.count(year(d) - 1, d), p, 2);
    }

    function formatYear(d, p) {
      return pad(d.getFullYear() % 100, p, 2);
    }

    function formatFullYear(d, p) {
      return pad(d.getFullYear() % 10000, p, 4);
    }

    function formatZone(d) {
      var z = d.getTimezoneOffset();
      return (z > 0 ? "-" : (z *= -1, "+"))
          + pad(z / 60 | 0, "0", 2)
          + pad(z % 60, "0", 2);
    }

    function formatUTCDayOfMonth(d, p) {
      return pad(d.getUTCDate(), p, 2);
    }

    function formatUTCHour24(d, p) {
      return pad(d.getUTCHours(), p, 2);
    }

    function formatUTCHour12(d, p) {
      return pad(d.getUTCHours() % 12 || 12, p, 2);
    }

    function formatUTCDayOfYear(d, p) {
      return pad(1 + utcDay.count(utcYear(d), d), p, 3);
    }

    function formatUTCMilliseconds(d, p) {
      return pad(d.getUTCMilliseconds(), p, 3);
    }

    function formatUTCMicroseconds(d, p) {
      return formatUTCMilliseconds(d, p) + "000";
    }

    function formatUTCMonthNumber(d, p) {
      return pad(d.getUTCMonth() + 1, p, 2);
    }

    function formatUTCMinutes(d, p) {
      return pad(d.getUTCMinutes(), p, 2);
    }

    function formatUTCSeconds(d, p) {
      return pad(d.getUTCSeconds(), p, 2);
    }

    function formatUTCWeekdayNumberMonday(d) {
      var dow = d.getUTCDay();
      return dow === 0 ? 7 : dow;
    }

    function formatUTCWeekNumberSunday(d, p) {
      return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
    }

    function formatUTCWeekNumberISO(d, p) {
      var day = d.getUTCDay();
      d = (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
      return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
    }

    function formatUTCWeekdayNumberSunday(d) {
      return d.getUTCDay();
    }

    function formatUTCWeekNumberMonday(d, p) {
      return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
    }

    function formatUTCYear(d, p) {
      return pad(d.getUTCFullYear() % 100, p, 2);
    }

    function formatUTCFullYear(d, p) {
      return pad(d.getUTCFullYear() % 10000, p, 4);
    }

    function formatUTCZone() {
      return "+0000";
    }

    function formatLiteralPercent() {
      return "%";
    }

    function formatUnixTimestamp(d) {
      return +d;
    }

    function formatUnixTimestampSeconds(d) {
      return Math.floor(+d / 1000);
    }

    var locale$1;
    var timeFormat;
    var timeParse;
    var utcFormat;
    var utcParse;

    defaultLocale$1({
      dateTime: "%x, %X",
      date: "%-m/%-d/%Y",
      time: "%-I:%M:%S %p",
      periods: ["AM", "PM"],
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });

    function defaultLocale$1(definition) {
      locale$1 = formatLocale$1(definition);
      timeFormat = locale$1.format;
      timeParse = locale$1.parse;
      utcFormat = locale$1.utcFormat;
      utcParse = locale$1.utcParse;
      return locale$1;
    }

    var durationSecond$1 = 1000,
        durationMinute$1 = durationSecond$1 * 60,
        durationHour$1 = durationMinute$1 * 60,
        durationDay$1 = durationHour$1 * 24,
        durationWeek$1 = durationDay$1 * 7,
        durationMonth = durationDay$1 * 30,
        durationYear = durationDay$1 * 365;

    function date$1(t) {
      return new Date(t);
    }

    function number$1(t) {
      return t instanceof Date ? +t : +new Date(+t);
    }

    function calendar(year, month, week, day, hour, minute, second, millisecond, format) {
      var scale = continuous(),
          invert = scale.invert,
          domain = scale.domain;

      var formatMillisecond = format(".%L"),
          formatSecond = format(":%S"),
          formatMinute = format("%I:%M"),
          formatHour = format("%I %p"),
          formatDay = format("%a %d"),
          formatWeek = format("%b %d"),
          formatMonth = format("%B"),
          formatYear = format("%Y");

      var tickIntervals = [
        [second,  1,      durationSecond$1],
        [second,  5,  5 * durationSecond$1],
        [second, 15, 15 * durationSecond$1],
        [second, 30, 30 * durationSecond$1],
        [minute,  1,      durationMinute$1],
        [minute,  5,  5 * durationMinute$1],
        [minute, 15, 15 * durationMinute$1],
        [minute, 30, 30 * durationMinute$1],
        [  hour,  1,      durationHour$1  ],
        [  hour,  3,  3 * durationHour$1  ],
        [  hour,  6,  6 * durationHour$1  ],
        [  hour, 12, 12 * durationHour$1  ],
        [   day,  1,      durationDay$1   ],
        [   day,  2,  2 * durationDay$1   ],
        [  week,  1,      durationWeek$1  ],
        [ month,  1,      durationMonth ],
        [ month,  3,  3 * durationMonth ],
        [  year,  1,      durationYear  ]
      ];

      function tickFormat(date) {
        return (second(date) < date ? formatMillisecond
            : minute(date) < date ? formatSecond
            : hour(date) < date ? formatMinute
            : day(date) < date ? formatHour
            : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
            : year(date) < date ? formatMonth
            : formatYear)(date);
      }

      function tickInterval(interval, start, stop) {
        if (interval == null) interval = 10;

        // If a desired tick count is specified, pick a reasonable tick interval
        // based on the extent of the domain and a rough estimate of tick size.
        // Otherwise, assume interval is already a time interval and use it.
        if (typeof interval === "number") {
          var target = Math.abs(stop - start) / interval,
              i = bisector(function(i) { return i[2]; }).right(tickIntervals, target),
              step;
          if (i === tickIntervals.length) {
            step = tickStep(start / durationYear, stop / durationYear, interval);
            interval = year;
          } else if (i) {
            i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
            step = i[1];
            interval = i[0];
          } else {
            step = Math.max(tickStep(start, stop, interval), 1);
            interval = millisecond;
          }
          return interval.every(step);
        }

        return interval;
      }

      scale.invert = function(y) {
        return new Date(invert(y));
      };

      scale.domain = function(_) {
        return arguments.length ? domain(Array.from(_, number$1)) : domain().map(date$1);
      };

      scale.ticks = function(interval) {
        var d = domain(),
            t0 = d[0],
            t1 = d[d.length - 1],
            r = t1 < t0,
            t;
        if (r) t = t0, t0 = t1, t1 = t;
        t = tickInterval(interval, t0, t1);
        t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
        return r ? t.reverse() : t;
      };

      scale.tickFormat = function(count, specifier) {
        return specifier == null ? tickFormat : format(specifier);
      };

      scale.nice = function(interval) {
        var d = domain();
        return (interval = tickInterval(interval, d[0], d[d.length - 1]))
            ? domain(nice(d, interval))
            : scale;
      };

      scale.copy = function() {
        return copy(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format));
      };

      return scale;
    }

    function time() {
      return initRange.apply(calendar(year, month, sunday, day, hour, minute, second, millisecond, timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
    }

    function utcTime() {
      return initRange.apply(calendar(utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, millisecond, utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
    }

    function transformer$1() {
      var x0 = 0,
          x1 = 1,
          t0,
          t1,
          k10,
          transform,
          interpolator = identity$2,
          clamp = false,
          unknown;

      function scale(x) {
        return isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
      }

      scale.domain = function(_) {
        return arguments.length ? ([x0, x1] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
      };

      scale.clamp = function(_) {
        return arguments.length ? (clamp = !!_, scale) : clamp;
      };

      scale.interpolator = function(_) {
        return arguments.length ? (interpolator = _, scale) : interpolator;
      };

      function range(interpolate) {
        return function(_) {
          var r0, r1;
          return arguments.length ? ([r0, r1] = _, interpolator = interpolate(r0, r1), scale) : [interpolator(0), interpolator(1)];
        };
      }

      scale.range = range(interpolate);

      scale.rangeRound = range(interpolateRound);

      scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
      };

      return function(t) {
        transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
        return scale;
      };
    }

    function copy$1(source, target) {
      return target
          .domain(source.domain())
          .interpolator(source.interpolator())
          .clamp(source.clamp())
          .unknown(source.unknown());
    }

    function sequential() {
      var scale = linearish(transformer$1()(identity$2));

      scale.copy = function() {
        return copy$1(scale, sequential());
      };

      return initInterpolator.apply(scale, arguments);
    }

    function sequentialLog() {
      var scale = loggish(transformer$1()).domain([1, 10]);

      scale.copy = function() {
        return copy$1(scale, sequentialLog()).base(scale.base());
      };

      return initInterpolator.apply(scale, arguments);
    }

    function sequentialSymlog() {
      var scale = symlogish(transformer$1());

      scale.copy = function() {
        return copy$1(scale, sequentialSymlog()).constant(scale.constant());
      };

      return initInterpolator.apply(scale, arguments);
    }

    function sequentialPow() {
      var scale = powish(transformer$1());

      scale.copy = function() {
        return copy$1(scale, sequentialPow()).exponent(scale.exponent());
      };

      return initInterpolator.apply(scale, arguments);
    }

    function sequentialSqrt() {
      return sequentialPow.apply(null, arguments).exponent(0.5);
    }

    function transformer$2() {
      var x0 = 0,
          x1 = 0.5,
          x2 = 1,
          s = 1,
          t0,
          t1,
          t2,
          k10,
          k21,
          interpolator = identity$2,
          transform,
          clamp = false,
          unknown;

      function scale(x) {
        return isNaN(x = +x) ? unknown : (x = 0.5 + ((x = +transform(x)) - t1) * (s * x < s * t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
      }

      scale.domain = function(_) {
        return arguments.length ? ([x0, x1, x2] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), t2 = transform(x2 = +x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1, scale) : [x0, x1, x2];
      };

      scale.clamp = function(_) {
        return arguments.length ? (clamp = !!_, scale) : clamp;
      };

      scale.interpolator = function(_) {
        return arguments.length ? (interpolator = _, scale) : interpolator;
      };

      function range(interpolate) {
        return function(_) {
          var r0, r1, r2;
          return arguments.length ? ([r0, r1, r2] = _, interpolator = piecewise(interpolate, [r0, r1, r2]), scale) : [interpolator(0), interpolator(0.5), interpolator(1)];
        };
      }

      scale.range = range(interpolate);

      scale.rangeRound = range(interpolateRound);

      scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
      };

      return function(t) {
        transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1;
        return scale;
      };
    }

    function diverging() {
      var scale = linearish(transformer$2()(identity$2));

      scale.copy = function() {
        return copy$1(scale, diverging());
      };

      return initInterpolator.apply(scale, arguments);
    }

    function divergingLog() {
      var scale = loggish(transformer$2()).domain([0.1, 1, 10]);

      scale.copy = function() {
        return copy$1(scale, divergingLog()).base(scale.base());
      };

      return initInterpolator.apply(scale, arguments);
    }

    function divergingSymlog() {
      var scale = symlogish(transformer$2());

      scale.copy = function() {
        return copy$1(scale, divergingSymlog()).constant(scale.constant());
      };

      return initInterpolator.apply(scale, arguments);
    }

    function divergingPow() {
      var scale = powish(transformer$2());

      scale.copy = function() {
        return copy$1(scale, divergingPow()).exponent(scale.exponent());
      };

      return initInterpolator.apply(scale, arguments);
    }

    function divergingSqrt() {
      return divergingPow.apply(null, arguments).exponent(0.5);
    }

    function band() {
      var scale = ordinal().unknown(undefined),
          domain = scale.domain,
          ordinalRange = scale.range,
          range = [0, 1],
          step,
          bandwidth,
          round = false,
          paddingInner = 0,
          paddingOuter = 0,
          align = 0.5;

      delete scale.unknown;

      function rescale() {
        var n = domain().length,
            reverse = range[1] < range[0],
            start = range[reverse - 0],
            stop = range[1 - reverse],
            space = bandSpace(n, paddingInner, paddingOuter);

        step = (stop - start) / (space || 1);
        if (round) {
          step = Math.floor(step);
        }
        start += (stop - start - step * (n - paddingInner)) * align;
        bandwidth = step * (1 - paddingInner);
        if (round) {
          start = Math.round(start);
          bandwidth = Math.round(bandwidth);
        }
        var values = sequence(n).map(function(i) { return start + step * i; });
        return ordinalRange(reverse ? values.reverse() : values);
      }

      scale.domain = function(_) {
        if (arguments.length) {
          domain(_);
          return rescale();
        } else {
          return domain();
        }
      };

      scale.range = function(_) {
        if (arguments.length) {
          range = [+_[0], +_[1]];
          return rescale();
        } else {
          return range.slice();
        }
      };

      scale.rangeRound = function(_) {
        range = [+_[0], +_[1]];
        round = true;
        return rescale();
      };

      scale.bandwidth = function() {
        return bandwidth;
      };

      scale.step = function() {
        return step;
      };

      scale.round = function(_) {
        if (arguments.length) {
          round = !!_;
          return rescale();
        } else {
          return round;
        }
      };

      scale.padding = function(_) {
        if (arguments.length) {
          paddingOuter = Math.max(0, Math.min(1, _));
          paddingInner = paddingOuter;
          return rescale();
        } else {
          return paddingInner;
        }
      };

      scale.paddingInner = function(_) {
        if (arguments.length) {
          paddingInner = Math.max(0, Math.min(1, _));
          return rescale();
        } else {
          return paddingInner;
        }
      };

      scale.paddingOuter = function(_) {
        if (arguments.length) {
          paddingOuter = Math.max(0, Math.min(1, _));
          return rescale();
        } else {
          return paddingOuter;
        }
      };

      scale.align = function(_) {
        if (arguments.length) {
          align = Math.max(0, Math.min(1, _));
          return rescale();
        } else {
          return align;
        }
      };

      scale.invertRange = function(_) {
        // bail if range has null or undefined values
        if (_[0] == null || _[1] == null) return;

        var lo = +_[0],
            hi = +_[1],
            reverse = range[1] < range[0],
            values = reverse ? ordinalRange().reverse() : ordinalRange(),
            n = values.length - 1, a, b, t;

        // bail if either range endpoint is invalid
        if (lo !== lo || hi !== hi) return;

        // order range inputs, bail if outside of scale range
        if (hi < lo) {
          t = lo;
          lo = hi;
          hi = t;
        }
        if (hi < values[0] || lo > range[1-reverse]) return;

        // binary search to index into scale range
        a = Math.max(0, bisectRight(values, lo) - 1);
        b = lo===hi ? a : bisectRight(values, hi) - 1;

        // increment index a if lo is within padding gap
        if (lo - values[a] > bandwidth + 1e-10) ++a;

        if (reverse) {
          // map + swap
          t = a;
          a = n - b;
          b = n - t;
        }
        return (a > b) ? undefined : domain().slice(a, b+1);
      };

      scale.invert = function(_) {
        var value = scale.invertRange([_, _]);
        return value ? value[0] : value;
      };

      scale.copy = function() {
        return band()
            .domain(domain())
            .range(range)
            .round(round)
            .paddingInner(paddingInner)
            .paddingOuter(paddingOuter)
            .align(align);
      };

      return rescale();
    }

    function pointish(scale) {
      var copy = scale.copy;

      scale.padding = scale.paddingOuter;
      delete scale.paddingInner;

      scale.copy = function() {
        return pointish(copy());
      };

      return scale;
    }

    function point() {
      return pointish(band().paddingInner(1));
    }

    var map$1 = Array.prototype.map;

    function numbers$1(_) {
      return map$1.call(_, function(x) { return +x; });
    }

    var slice = Array.prototype.slice;

    function scaleBinOrdinal() {
      var domain = [],
          range = [];

      function scale(x) {
        return x == null || x !== x
          ? undefined
          : range[(bisectRight(domain, x) - 1) % range.length];
      }

      scale.domain = function(_) {
        if (arguments.length) {
          domain = numbers$1(_);
          return scale;
        } else {
          return domain.slice();
        }
      };

      scale.range = function(_) {
        if (arguments.length) {
          range = slice.call(_);
          return scale;
        } else {
          return range.slice();
        }
      };

      scale.tickFormat = function(count, specifier) {
        return tickFormat(domain[0], peek(domain), count == null ? 10 : count, specifier);
      };

      scale.copy = function() {
        return scaleBinOrdinal().domain(scale.domain()).range(scale.range());
      };

      return scale;
    }

    // scale registry
    const scales = {};

    /**
     * Augment scales with their type and needed inverse methods.
     */
    function create(type, constructor, metadata) {
      const ctr = function scale() {
        var s = constructor();

        if (!s.invertRange) {
          s.invertRange = s.invert ? invertRange(s)
            : s.invertExtent ? invertRangeExtent(s)
            : undefined;
        }

        s.type = type;
        return s;
      };

      ctr.metadata = toSet(array(metadata));

      return ctr;
    }

    function scale(type, scale, metadata) {
      if (arguments.length > 1) {
        scales[type] = create(type, scale, metadata);
        return this;
      } else {
        return isValidScaleType(type) ? scales[type] : undefined;
      }
    }

    // identity scale
    scale(Identity, identity$4);

    // continuous scales
    scale(Linear, linear$1, Continuous);
    scale(Log, log$1, [Continuous, Log]);
    scale(Pow, pow, Continuous);
    scale(Sqrt, sqrt, Continuous);
    scale(Symlog, symlog, Continuous);
    scale(Time, time, [Continuous, Temporal]);
    scale(UTC, utcTime, [Continuous, Temporal]);

    // sequential scales
    scale(Sequential, sequential, [Continuous, Interpolating]); // backwards compat
    scale(`${Sequential}-${Linear}`, sequential, [Continuous, Interpolating]);
    scale(`${Sequential}-${Log}`, sequentialLog, [Continuous, Interpolating, Log]);
    scale(`${Sequential}-${Pow}`, sequentialPow, [Continuous, Interpolating]);
    scale(`${Sequential}-${Sqrt}`, sequentialSqrt, [Continuous, Interpolating]);
    scale(`${Sequential}-${Symlog}`, sequentialSymlog, [Continuous, Interpolating]);

    // diverging scales
    scale(`${Diverging}-${Linear}`, diverging, [Continuous, Interpolating]);
    scale(`${Diverging}-${Log}`, divergingLog, [Continuous, Interpolating, Log]);
    scale(`${Diverging}-${Pow}`, divergingPow, [Continuous, Interpolating]);
    scale(`${Diverging}-${Sqrt}`, divergingSqrt, [Continuous, Interpolating]);
    scale(`${Diverging}-${Symlog}`, divergingSymlog, [Continuous, Interpolating]);

    // discretizing scales
    scale(Quantile, quantile$1, [Discretizing, Quantile]);
    scale(Quantize, quantize$1, Discretizing);
    scale(Threshold, threshold, Discretizing);

    // discrete scales
    scale(BinOrdinal, scaleBinOrdinal, [Discrete, Discretizing]);
    scale(Ordinal, ordinal, Discrete);
    scale(Band, band, Discrete);
    scale(Point, point, Discrete);

    function isValidScaleType(type) {
      return hasOwnProperty(scales, type);
    }

    function interpolateColors(colors, type, gamma) {
      return piecewise(interpolate$1(type || 'rgb', gamma), colors);
    }

    function interpolate$1(type, gamma) {
      var interp = $$1[method(type)];
      return (gamma != null && interp && interp.gamma)
        ? interp.gamma(gamma)
        : interp;
    }

    function method(type) {
      return 'interpolate' + type.toLowerCase()
        .split('-')
        .map(function(s) { return s[0].toUpperCase() + s.slice(1); })
        .join('');
    }

    const continuous$1 = {
      blues: 'cfe1f2bed8eca8cee58fc1de74b2d75ba3cf4592c63181bd206fb2125ca40a4a90',
      greens: 'd3eecdc0e6baabdda594d3917bc77d60ba6c46ab5e329a512089430e7735036429',
      greys: 'e2e2e2d4d4d4c4c4c4b1b1b19d9d9d8888887575756262624d4d4d3535351e1e1e',
      oranges: 'fdd8b3fdc998fdb87bfda55efc9244f87f2cf06b18e4580bd14904b93d029f3303',
      purples: 'e2e1efd4d4e8c4c5e0b4b3d6a3a0cc928ec3827cb97566ae684ea25c3696501f8c',
      reds: 'fdc9b4fcb49afc9e80fc8767fa7051f6573fec3f2fdc2a25c81b1db21218970b13',

      blueGreen: 'd5efedc1e8e0a7ddd18bd2be70c6a958ba9144ad77319c5d2089460e7736036429',
      bluePurple: 'ccddecbad0e4a8c2dd9ab0d4919cc98d85be8b6db28a55a6873c99822287730f71',
      greenBlue: 'd3eecec5e8c3b1e1bb9bd8bb82cec269c2ca51b2cd3c9fc7288abd1675b10b60a1',
      orangeRed: 'fddcaffdcf9bfdc18afdad77fb9562f67d53ee6545e24932d32d1ebf130da70403',
      purpleBlue: 'dbdaebc8cee4b1c3de97b7d87bacd15b9fc93a90c01e7fb70b70ab056199045281',
      purpleBlueGreen: 'dbd8eac8cee4b0c3de93b7d872acd1549fc83892bb1c88a3097f8702736b016353',
      purpleRed: 'dcc9e2d3b3d7ce9eccd186c0da6bb2e14da0e23189d91e6fc61159ab07498f023a',
      redPurple: 'fccfccfcbec0faa9b8f98faff571a5ec539ddb3695c41b8aa908808d0179700174',
      yellowGreen: 'e4f4acd1eca0b9e2949ed68880c97c62bb6e47aa5e3297502083440e723b036034',
      yellowOrangeBrown: 'feeaa1fedd84fecc63feb746fca031f68921eb7215db5e0bc54c05ab3d038f3204',
      yellowOrangeRed: 'fee087fed16ffebd59fea849fd903efc7335f9522bee3423de1b20ca0b22af0225',

      blueOrange: '134b852f78b35da2cb9dcae1d2e5eff2f0ebfce0bafbbf74e8932fc5690d994a07',
      brownBlueGreen: '704108a0651ac79548e3c78af3e6c6eef1eac9e9e48ed1c74da79e187a72025147',
      purpleGreen: '5b1667834792a67fb6c9aed3e6d6e8eff0efd9efd5aedda971bb75368e490e5e29',
      purpleOrange: '4114696647968f83b7b9b4d6dadbebf3eeeafce0bafbbf74e8932fc5690d994a07',
      redBlue: '8c0d25bf363adf745ef4ae91fbdbc9f2efeed2e5ef9dcae15da2cb2f78b3134b85',
      redGrey: '8c0d25bf363adf745ef4ae91fcdccbfaf4f1e2e2e2c0c0c0969696646464343434',
      yellowGreenBlue: 'eff9bddbf1b4bde5b594d5b969c5be45b4c22c9ec02182b82163aa23479c1c3185',
      redYellowBlue: 'a50026d4322cf16e43fcac64fedd90faf8c1dcf1ecabd6e875abd04a74b4313695',
      redYellowGreen: 'a50026d4322cf16e43fcac63fedd8df9f7aed7ee8ea4d86e64bc6122964f006837',
      pinkYellowGreen: '8e0152c0267edd72adf0b3d6faddedf5f3efe1f2cab6de8780bb474f9125276419',
      spectral: '9e0142d13c4bf0704afcac63fedd8dfbf8b0e0f3a1a9dda269bda94288b55e4fa2',

      viridis: '440154470e61481a6c482575472f7d443a834144873d4e8a39568c35608d31688e2d708e2a788e27818e23888e21918d1f988b1fa08822a8842ab07f35b77943bf7154c56866cc5d7ad1518fd744a5db36bcdf27d2e21be9e51afde725',
      magma: '0000040404130b0924150e3720114b2c11603b0f704a107957157e651a80721f817f24828c29819a2e80a8327db6377ac43c75d1426fde4968e95462f1605df76f5cfa7f5efc8f65fe9f6dfeaf78febf84fece91fddea0fcedaffcfdbf',
      inferno: '0000040403130c0826170c3b240c4f330a5f420a68500d6c5d126e6b176e781c6d86216b932667a12b62ae305cbb3755c73e4cd24644dd513ae65c30ed6925f3771af8850ffb9506fca50afcb519fac62df6d645f2e661f3f484fcffa4',
      plasma: '0d088723069033059742039d5002a25d01a66a00a87801a88405a7900da49c179ea72198b12a90ba3488c33d80cb4779d35171da5a69e16462e76e5bed7953f2834cf68f44fa9a3dfca636fdb32ffec029fcce25f9dc24f5ea27f0f921',

      rainbow: '6e40aa883eb1a43db3bf3cafd83fa4ee4395fe4b83ff576eff6659ff7847ff8c38f3a130e2b72fcfcc36bee044aff05b8ff4576ff65b52f6673af27828ea8d1ddfa319d0b81cbecb23abd82f96e03d82e14c6edb5a5dd0664dbf6e40aa',
      sinebow: 'ff4040fc582af47218e78d0bd5a703bfbf00a7d5038de70b72f41858fc2a40ff402afc5818f4720be78d03d5a700bfbf03a7d50b8de71872f42a58fc4040ff582afc7218f48d0be7a703d5bf00bfd503a7e70b8df41872fc2a58ff4040',

      browns: 'eedbbdecca96e9b97ae4a865dc9856d18954c7784cc0673fb85536ad44339f3632',
      tealBlues: 'bce4d89dd3d181c3cb65b3c245a2b9368fae347da0306a932c5985',
      teals: 'bbdfdfa2d4d58ac9c975bcbb61b0af4da5a43799982b8b8c1e7f7f127273006667',
      warmGreys: 'dcd4d0cec5c1c0b8b4b3aaa7a59c9998908c8b827f7e7673726866665c5a59504e',

      goldGreen: 'f4d166d5ca60b6c35c98bb597cb25760a6564b9c533f8f4f33834a257740146c36',
      goldOrange: 'f4d166f8be5cf8aa4cf5983bf3852aef701be2621fd65322c54923b142239e3a26',
      goldRed: 'f4d166f6be59f9aa51fc964ef6834bee734ae56249db5247cf4244c43141b71d3e',

      lightGreyRed: 'efe9e6e1dad7d5cbc8c8bdb9bbaea9cd967ddc7b43e15f19df4011dc000b',
      lightGreyTeal: 'e4eaead6dcddc8ced2b7c2c7a6b4bc64b0bf22a6c32295c11f85be1876bc',
      lightMulti: 'e0f1f2c4e9d0b0de9fd0e181f6e072f6c053f3993ef77440ef4a3c',
      lightOrange: 'f2e7daf7d5baf9c499fab184fa9c73f68967ef7860e8645bde515bd43d5b',
      lightTealBlue: 'e3e9e0c0dccf9aceca7abfc859afc0389fb9328dad2f7ca0276b95255988',

      darkBlue: '3232322d46681a5c930074af008cbf05a7ce25c0dd38daed50f3faffffff',
      darkGold: '3c3c3c584b37725e348c7631ae8b2bcfa424ecc31ef9de30fff184ffffff',
      darkGreen: '3a3a3a215748006f4d048942489e4276b340a6c63dd2d836ffeb2cffffaa',
      darkMulti: '3737371f5287197d8c29a86995ce3fffe800ffffff',
      darkRed: '3434347036339e3c38cc4037e75d1eec8620eeab29f0ce32ffeb2c'
    };

    const discrete$1 = {
      category10: '1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf',
      category20: '1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5',
      category20b: '393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6',
      category20c: '3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9',
      tableau10: '4c78a8f58518e4575672b7b254a24beeca3bb279a2ff9da69d755dbab0ac',
      tableau20: '4c78a89ecae9f58518ffbf7954a24b88d27ab79a20f2cf5b43989483bcb6e45756ff9d9879706ebab0acd67195fcbfd2b279a2d6a5c99e765fd8b5a5',
      accent: '7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666',
      dark2: '1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666',
      paired: 'a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928',
      pastel1: 'fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2',
      pastel2: 'b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc',
      set1: 'e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999',
      set2: '66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3',
      set3: '8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f'
    };

    function colors(palette) {
      var n = palette.length / 6 | 0, c = new Array(n), i = 0;
      while (i < n) c[i] = '#' + palette.slice(i * 6, ++i * 6);
      return c;
    }

    function apply(_, f) {
      for (let k in _) scheme(k, f(_[k]));
    }

    const schemes = {};
    apply(discrete$1, colors);
    apply(continuous$1, _ => interpolateColors(colors(_)));

    function scheme(name, scheme) {
      name = name && name.toLowerCase();
      if (arguments.length > 1) {
        schemes[name] = scheme;
        return this;
      } else {
        return schemes[name];
      }
    }

    Array.prototype.flat||Object.defineProperty(Array.prototype,"flat",{configurable:!0,value:function r(){var t=isNaN(arguments[0])?1:Number(arguments[0]);return t?Array.prototype.reduce.call(this,function(a,e){return Array.isArray(e)?a.push.apply(a,r.call(e,t-1)):a.push(e),a},[]):Array.prototype.slice.call(this)},writable:!0}),Array.prototype.flatMap||Object.defineProperty(Array.prototype,"flatMap",{configurable:!0,value:function(r){return Array.prototype.map.apply(this,arguments).flat()},writable:!0});

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var clone_1 = createCommonjsModule(function (module) {
    var clone = (function() {

    function _instanceof(obj, type) {
      return type != null && obj instanceof type;
    }

    var nativeMap;
    try {
      nativeMap = Map;
    } catch(_) {
      // maybe a reference error because no `Map`. Give it a dummy value that no
      // value will ever be an instanceof.
      nativeMap = function() {};
    }

    var nativeSet;
    try {
      nativeSet = Set;
    } catch(_) {
      nativeSet = function() {};
    }

    var nativePromise;
    try {
      nativePromise = Promise;
    } catch(_) {
      nativePromise = function() {};
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
      }
      // maintain two arrays for circular references, where corresponding parents
      // and children have the same index
      var allParents = [];
      var allChildren = [];

      var useBuffer = typeof Buffer != 'undefined';

      if (typeof circular == 'undefined')
        circular = true;

      if (typeof depth == 'undefined')
        depth = Infinity;

      // recurse this function so we don't reset allParents and allChildren
      function _clone(parent, depth) {
        // cloning null always returns null
        if (parent === null)
          return null;

        if (depth === 0)
          return parent;

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
            parent.then(function(value) {
              resolve(_clone(value, depth - 1));
            }, function(err) {
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
          }
          else {
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
          parent.forEach(function(value, key) {
            var keyChild = _clone(key, depth - 1);
            var valueChild = _clone(value, depth - 1);
            child.set(keyChild, valueChild);
          });
        }
        if (_instanceof(parent, nativeSet)) {
          parent.forEach(function(value) {
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
      if (parent === null)
        return null;

      var c = function () {};
      c.prototype = parent;
      return new c();
    };

    // private utility functions

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
    })();

    if ( module.exports) {
      module.exports = clone;
    }
    });

    // do not edit .js files directly - edit src/index.jst



    var fastDeepEqual = function equal(a, b) {
      if (a === b) return true;

      if (a && b && typeof a == 'object' && typeof b == 'object') {
        if (a.constructor !== b.constructor) return false;

        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0;)
            if (!equal(a[i], b[i])) return false;
          return true;
        }



        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;

        for (i = length; i-- !== 0;)
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

        for (i = length; i-- !== 0;) {
          var key = keys[i];

          if (!equal(a[key], b[key])) return false;
        }

        return true;
      }

      // true if both NaN, false otherwise
      return a!==a && b!==b;
    };

    var fastJsonStableStringify = function (data, opts) {
        if (!opts) opts = {};
        if (typeof opts === 'function') opts = { cmp: opts };
        var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;

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
        return (function stringify (node) {
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
        })(data);
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
        }
        else if (isLogicalAnd(op)) {
            for (const subop of op.and) {
                forEachLeaf(subop, fn);
            }
        }
        else if (isLogicalOr(op)) {
            for (const subop of op.or) {
                forEachLeaf(subop, fn);
            }
        }
        else {
            fn(op);
        }
    }
    function normalizeLogicalComposition(op, normalizer) {
        if (isLogicalNot(op)) {
            return { not: normalizeLogicalComposition(op.not, normalizer) };
        }
        else if (isLogicalAnd(op)) {
            return { and: op.and.map(o => normalizeLogicalComposition(o, normalizer)) };
        }
        else if (isLogicalOr(op)) {
            return { or: op.or.map(o => normalizeLogicalComposition(o, normalizer)) };
        }
        else {
            return normalizer(op);
        }
    }

    const deepEqual = fastDeepEqual;
    const duplicate = clone_1;
    /**
     * Creates an object composed of the picked object properties.
     *
     * var object = {'a': 1, 'b': '2', 'c': 3};
     * pick(object, ['a', 'c']);
     * // → {'a': 1, 'c': 3}
     */
    function pick(obj, props) {
        const copy = {};
        for (const prop of props) {
            if (hasOwnProperty(obj, prop)) {
                copy[prop] = obj[prop];
            }
        }
        return copy;
    }
    /**
     * The opposite of _.pick; this method creates an object composed of the own
     * and inherited enumerable string keyed properties of object that are not omitted.
     */
    function omit(obj, props) {
        const copy = Object.assign({}, obj);
        for (const prop of props) {
            delete copy[prop];
        }
        return copy;
    }
    /**
     * Monkey patch Set so that `stringify` produces a string representation of sets.
     */
    Set.prototype['toJSON'] = function () {
        return `Set(${[...this].map(x => fastJsonStableStringify(x)).join(',')})`;
    };
    /**
     * Converts any object to a string representation that can be consumed by humans.
     */
    const stringify = fastJsonStableStringify;
    /**
     * Converts any object to a string of limited size, or a number.
     */
    function hash(a) {
        if (isNumber(a)) {
            return a;
        }
        const str = isString(a) ? a : fastJsonStableStringify(a);
        // short strings can be used as hash directly, longer strings are hashed to reduce memory usage
        if (str.length < 250) {
            return str;
        }
        // from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
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
        return array.indexOf(item) > -1;
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
     * recursively merges src into dest
     */
    function mergeDeep(dest, ...src) {
        for (const s of src) {
            deepMerge_(dest, (s !== null && s !== void 0 ? s : {}));
        }
        return dest;
    }
    function deepMerge_(dest, src) {
        for (const property of Object.keys(src)) {
            writeConfig(dest, property, src[property], true);
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
            const splitField = splitAccessPath(x);
            // Wrap every element other than the first in `[]`
            const wrappedWithAccessors = splitField.map((y, i) => (i === 0 ? y : `[${y}]`));
            const computedPrefixes = wrappedWithAccessors.map((_, i) => wrappedWithAccessors.slice(0, i + 1).join(''));
            computedPrefixes.forEach(y => prefixes.add(y));
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
    }
    // This is a stricter version of Object.keys but with better types. See https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
    const keys = Object.keys;
    function vals(x) {
        const _vals = [];
        for (const k in x) {
            if (hasOwnProperty(x, k)) {
                _vals.push(x[k]);
            }
        }
        return _vals;
    }
    function isBoolean$1(b) {
        return b === true || b === false;
    }
    /**
     * Convert a string into a valid variable name
     */
    function varName(s) {
        // Replace non-alphanumeric characters (anything besides a-zA-Z0-9_) with _
        const alphanumericS = s.replace(/\W/g, '_');
        // Add _ if the string has leading numbers.
        return (s.match(/^\d+/) ? '_' : '') + alphanumericS;
    }
    function logicalExpr(op, cb) {
        if (isLogicalNot(op)) {
            return '!(' + logicalExpr(op.not, cb) + ')';
        }
        else if (isLogicalAnd(op)) {
            return '(' + op.and.map((and) => logicalExpr(and, cb)).join(') && (') + ')';
        }
        else if (isLogicalOr(op)) {
            return '(' + op.or.map((or) => logicalExpr(or, cb)).join(') || (') + ')';
        }
        else {
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
        if (deleteNestedProperty(obj[prop], orderedProps)) {
            delete obj[prop];
        }
        return keys(obj).length === 0;
    }
    function titlecase(s) {
        return s.charAt(0).toUpperCase() + s.substr(1);
    }
    function escapePathAccess(string) {
        return string.replace(/(\[|\]|\.)/g, '\\$1');
    }
    /**
     * Converts a path to an access path with datum.
     * @param path The field name.
     * @param datum The string to use for `datum`.
     */
    function accessPathWithDatum(path, datum = 'datum') {
        const pieces = splitAccessPath(path);
        const prefixes = [];
        for (let i = 1; i <= pieces.length; i++) {
            const prefix = `[${pieces
            .slice(0, i)
            .map($)
            .join('][')}]`;
            prefixes.push(`${datum}${prefix}`);
        }
        return prefixes.join(' && ');
    }
    /**
     * Return access with datum to the flattened field.
     *
     * @param path The field name.
     * @param datum The string to use for `datum`.
     */
    function flatAccessWithDatum(path, datum = 'datum') {
        return `${datum}[${$(splitAccessPath(path).join('.'))}]`;
    }
    /**
     * Replaces path accesses with access to non-nested field.
     * For example, `foo["bar"].baz` becomes `foo\\.bar\\.baz`.
     */
    function replacePathInField(path) {
        return `${splitAccessPath(path)
        .map(escapePathAccess)
        .join('\\.')}`;
    }
    /**
     * Replace all ocurrences of a string with another string.
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
        return `${splitAccessPath(path).join('.')}`;
    }
    /**
     * Count the depth of the path. Returns 1 for fields that are not nested.
     */
    function accessPathDepth(path) {
        if (!path) {
            return 0;
        }
        return splitAccessPath(path).length;
    }
    /**
     * This is a replacement for chained || for numeric properties or properties that respect null so that 0 will be included.
     */
    function getFirstDefined(...args) {
        for (const arg of args) {
            if (arg !== undefined) {
                return arg;
            }
        }
        return undefined;
    }
    // variable used to generate id
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
    function internalField(name) {
        return isInternalField(name) ? name : `__${name}`;
    }
    function isInternalField(name) {
        return name.indexOf('__') === 0;
    }
    /**
     * Normalize angle to be within [0,360).
     */
    function normalizeAngle(angle) {
        return ((angle % 360) + 360) % 360;
    }
    /**
     * Returns whether the passed in value is a valid number.
     */
    function isNumeric(value) {
        if (isNumber(value)) {
            return true;
        }
        return !isNaN(value) && !isNaN(parseFloat(value));
    }

    const CONDITIONAL_AXIS_PROP_INDEX = {
        domainColor: {
            part: 'domain',
            vgProp: 'stroke'
        },
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
        labelPadding: null,
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
            vgProp: 'strokeDash'
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
            vgProp: 'strokeDash'
        },
        tickOpacity: {
            part: 'ticks',
            vgProp: 'opacity'
        },
        tickSize: null,
        tickWidth: {
            part: 'ticks',
            vgProp: 'strokeWidth'
        },
        titleColor: {
            part: 'title',
            vgProp: 'fill'
        },
        title: null // title supports signal, let's use it.
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
        gridColor: 'grid',
        gridDash: 'grid',
        gridDashOffset: 'grid',
        gridOpacity: 'grid',
        gridScale: 'grid',
        gridWidth: 'grid',
        orient: 'main',
        bandPosition: 'both',
        domain: 'main',
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
        labelOpacity: 'main',
        labelOverlap: 'main',
        labelPadding: 'main',
        labels: 'main',
        labelSeparation: 'main',
        maxExtent: 'main',
        minExtent: 'main',
        offset: 'both',
        position: 'main',
        tickColor: 'main',
        tickDash: 'main',
        tickDashOffset: 'main',
        tickMinStep: 'main',
        tickOffset: 'both',
        tickOpacity: 'main',
        tickRound: 'main',
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
        bandPosition: 1,
        domain: 1,
        domainColor: 1,
        domainDash: 1,
        domainDashOffset: 1,
        domainOpacity: 1,
        domainWidth: 1,
        format: 1,
        formatType: 1,
        grid: 1,
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
        values: 1,
        translate: 1,
        zindex: 1
    };
    const AXIS_PROPERTIES_INDEX = Object.assign(Object.assign({}, COMMON_AXIS_PROPERTIES_INDEX), { style: 1, labelExpr: 1, labelOffset: 1, encoding: 1 });
    function isAxisProperty(prop) {
        return !!AXIS_PROPERTIES_INDEX[prop];
    }

    const AREA = 'area';
    const BAR = 'bar';
    const IMAGE = 'image';
    const LINE = 'line';
    const POINT = 'point';
    const RECT = 'rect';
    const RULE = 'rule';
    const TEXT = 'text';
    const TICK = 'tick';
    const TRAIL = 'trail';
    const CIRCLE = 'circle';
    const SQUARE = 'square';
    const GEOSHAPE = 'geoshape';
    // Using mapped type to declare index, ensuring we always have all marks when we add more.
    const MARK_INDEX = {
        area: 1,
        bar: 1,
        image: 1,
        line: 1,
        point: 1,
        text: 1,
        tick: 1,
        trail: 1,
        rect: 1,
        geoshape: 1,
        rule: 1,
        circle: 1,
        square: 1
    };
    function isPathMark(m) {
        return contains(['line', 'area', 'trail'], m);
    }
    function isRectBasedMark(m) {
        return contains(['rect', 'bar', 'image'], m);
    }
    const PRIMITIVE_MARKS = keys(MARK_INDEX);
    function isMarkDef(mark) {
        return mark['type'];
    }
    const PRIMITIVE_MARK_INDEX = toSet(PRIMITIVE_MARKS);
    const STROKE_CONFIG = [
        'stroke',
        'strokeWidth',
        'strokeDash',
        'strokeDashOffset',
        'strokeOpacity',
        'strokeJoin',
        'strokeMiterLimit'
    ];
    const FILL_CONFIG = ['fill', 'fillOpacity'];
    const FILL_STROKE_CONFIG = [...STROKE_CONFIG, ...FILL_CONFIG];
    const VL_ONLY_MARK_CONFIG_PROPERTIES = [
        'filled',
        'color',
        'tooltip',
        'invalid',
        'timeUnitBandPosition',
        'timeUnitBand'
    ];
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
        timeUnitBand: 1
    };
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

    function isUnitSpec(spec) {
        return !!spec['mark'];
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

    const AGGREGATE_OP_INDEX = {
        argmax: 1,
        argmin: 1,
        average: 1,
        count: 1,
        distinct: 1,
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
        return isString(a) && !!AGGREGATE_OP_INDEX[a];
    }
    const COUNTING_OPS = ['count', 'valid', 'missing', 'distinct'];
    function isCountingAggregateOp(aggregate) {
        return isString(aggregate) && contains(COUNTING_OPS, aggregate);
    }
    function isMinMaxOp(aggregate) {
        return isString(aggregate) && contains(['min', 'max'], aggregate);
    }
    /** Additive-based aggregation operations. These can be applied to stack. */
    const SUM_OPS = ['count', 'sum', 'distinct', 'valid', 'missing'];
    /**
     * Aggregation operators that always produce values within the range [domainMin, domainMax].
     */
    const SHARED_DOMAIN_OPS = ['mean', 'average', 'median', 'q1', 'q3', 'min', 'max'];
    const SHARED_DOMAIN_OP_INDEX = toSet(SHARED_DOMAIN_OPS);

    /*
     * Constants and utilities for encoding channels (Visual variables)
     * such as 'x', 'y', 'color'.
     */
    // Facet
    const ROW = 'row';
    const COLUMN = 'column';
    const FACET = 'facet';
    // Position
    const X = 'x';
    const Y = 'y';
    const X2 = 'x2';
    const Y2 = 'y2';
    // Geo Position
    const LATITUDE = 'latitude';
    const LONGITUDE = 'longitude';
    const LATITUDE2 = 'latitude2';
    const LONGITUDE2 = 'longitude2';
    // Mark property with scale
    const COLOR = 'color';
    const FILL = 'fill';
    const STROKE = 'stroke';
    const SHAPE = 'shape';
    const SIZE = 'size';
    const OPACITY = 'opacity';
    const FILLOPACITY = 'fillOpacity';
    const STROKEOPACITY = 'strokeOpacity';
    const STROKEWIDTH = 'strokeWidth';
    const STROKEDASH = 'strokeDash';
    // Non-scale channel
    const TEXT$1 = 'text';
    const ORDER = 'order';
    const DETAIL = 'detail';
    const KEY = 'key';
    const TOOLTIP = 'tooltip';
    const HREF = 'href';
    const URL = 'url';
    const POSITION_CHANNEL_INDEX = {
        x: 1,
        y: 1,
        x2: 1,
        y2: 1
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
    const GEOPOSITION_CHANNEL_INDEX = {
        longitude: 1,
        longitude2: 1,
        latitude: 1,
        latitude2: 1
    };
    function isGeoPositionChannel(c) {
        return c in GEOPOSITION_CHANNEL_INDEX;
    }
    const GEOPOSITION_CHANNELS = keys(GEOPOSITION_CHANNEL_INDEX);
    const UNIT_CHANNEL_INDEX = Object.assign(Object.assign(Object.assign({}, POSITION_CHANNEL_INDEX), GEOPOSITION_CHANNEL_INDEX), { 
        // color
        color: 1, fill: 1, stroke: 1, 
        // other non-position with scale
        opacity: 1, fillOpacity: 1, strokeOpacity: 1, strokeWidth: 1, strokeDash: 1, size: 1, shape: 1, 
        // channels without scales
        order: 1, text: 1, detail: 1, key: 1, tooltip: 1, href: 1, url: 1 });
    function isColorChannel(channel) {
        return channel === 'color' || channel === 'fill' || channel === 'stroke';
    }
    const FACET_CHANNEL_INDEX = {
        row: 1,
        column: 1,
        facet: 1
    };
    const FACET_CHANNELS = keys(FACET_CHANNEL_INDEX);
    const CHANNEL_INDEX = Object.assign(Object.assign({}, UNIT_CHANNEL_INDEX), FACET_CHANNEL_INDEX);
    const CHANNELS = keys(CHANNEL_INDEX);
    const SINGLE_DEF_CHANNEL_INDEX = __rest(CHANNEL_INDEX, ["order", "detail", "tooltip"]);
    const SINGLE_DEF_UNIT_CHANNEL_INDEX = __rest(SINGLE_DEF_CHANNEL_INDEX, ["row", "column", "facet"]);
    function isSingleDefUnitChannel(str) {
        return !!SINGLE_DEF_UNIT_CHANNEL_INDEX[str];
    }
    function isChannel(str) {
        return !!CHANNEL_INDEX[str];
    }
    const SECONDARY_RANGE_CHANNEL = ['x2', 'y2', 'latitude2', 'longitude2'];
    function isSecondaryRangeChannel(c) {
        const main = getMainRangeChannel(c);
        return main !== c;
    }
    /**
     * Get the main channel for a range channel. E.g. `x` for `x2`.
     */
    function getMainRangeChannel(channel) {
        switch (channel) {
            case 'x2':
                return 'x';
            case 'y2':
                return 'y';
            case 'latitude2':
                return 'latitude';
            case 'longitude2':
                return 'longitude';
        }
        return channel;
    }
    /**
     * Get the main channel for a range channel. E.g. `x` for `x2`.
     */
    function getSecondaryRangeChannel(channel) {
        switch (channel) {
            case 'x':
                return 'x2';
            case 'y':
                return 'y2';
            case 'latitude':
                return 'latitude2';
            case 'longitude':
                return 'longitude2';
        }
        return undefined;
    }
    // NONPOSITION_CHANNELS = UNIT_CHANNELS without X, Y, X2, Y2;
    const // The rest of unit channels then have scale
    NONPOSITION_CHANNEL_INDEX = __rest(UNIT_CHANNEL_INDEX, ["x", "y", "x2", "y2", "latitude", "longitude", "latitude2", "longitude2"]);
    const NONPOSITION_CHANNELS = keys(NONPOSITION_CHANNEL_INDEX);
    // POSITION_SCALE_CHANNELS = X and Y;
    const POSITION_SCALE_CHANNEL_INDEX = { x: 1, y: 1 };
    const POSITION_SCALE_CHANNELS = keys(POSITION_SCALE_CHANNEL_INDEX);
    function getSizeType(channel) {
        return channel === 'x' ? 'width' : 'height';
    }
    function getPositionScaleChannel(sizeType) {
        return sizeType === 'width' ? 'x' : 'y';
    }
    // NON_POSITION_SCALE_CHANNEL = SCALE_CHANNELS without X, Y
    const NONPOSITION_SCALE_CHANNEL_INDEX = __rest(NONPOSITION_CHANNEL_INDEX, ["text", "tooltip", "href", "url", "detail", "key", "order"]);
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
                return false;
        }
    }
    // Declare SCALE_CHANNEL_INDEX
    const SCALE_CHANNEL_INDEX = Object.assign(Object.assign({}, POSITION_SCALE_CHANNEL_INDEX), NONPOSITION_SCALE_CHANNEL_INDEX);
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
    const ALL_MARKS_EXCEPT_GEOSHAPE = __rest(ALL_MARKS, ["geoshape"]);
    /**
     * Return a dictionary showing whether a channel supports mark type.
     * @param channel
     * @return A dictionary mapping mark types to 'always', 'binned', or undefined
     */
    function getSupportedMark(channel) {
        switch (channel) {
            case COLOR:
            case FILL:
            case STROKE:
            // falls through
            case DETAIL:
            case KEY:
            case TOOLTIP:
            case HREF:
            case ORDER: // TODO: revise (order might not support rect, which is not stackable?)
            case OPACITY:
            case FILLOPACITY:
            case STROKEOPACITY:
            case STROKEWIDTH:
            // falls through
            case FACET:
            case ROW: // falls through
            case COLUMN:
                return ALL_MARKS;
            case X:
            case Y:
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
                return { point: 'always', geoshape: 'always' };
            case TEXT$1:
                return { text: 'always' };
            case URL:
                return { image: 'always' };
        }
    }
    function rangeType(channel) {
        switch (channel) {
            case X:
            case Y:
            case SIZE:
            case STROKEWIDTH:
            case OPACITY:
            case FILLOPACITY:
            case STROKEOPACITY:
            // X2 and Y2 use X and Y scales, so they similarly have continuous range. [falls through]
            case X2:
            case Y2:
                return undefined;
            case FACET:
            case ROW:
            case COLUMN:
            case SHAPE:
            case STROKEDASH:
            // TEXT, TOOLTIP, URL, and HREF have no scale but have discrete output [falls through]
            case TEXT$1:
            case TOOLTIP:
            case HREF:
            case URL:
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

    /**
     * Collection of all Vega-Lite Error Messages
     */
    function invalidSpec(spec) {
        return `Invalid specification ${JSON.stringify(spec)}. Make sure the specification includes at least one of the following properties: "mark", "layer", "facet", "hconcat", "vconcat", "concat", or "repeat".`;
    }
    // FIT
    const FIT_NON_SINGLE = 'Autosize "fit" only works for single views and layered views.';
    function containerSizeNonSingle(name) {
        const uName = name == 'width' ? 'Width' : 'Height';
        return `${uName} "container" only works for single views and layered views.`;
    }
    function containerSizeNotCompatibleWithAutosize(name) {
        const uName = name == 'width' ? 'Width' : 'Height';
        return `${uName} "container" only works well with autosize "fit" or "fit-x".`;
    }
    function droppingFit(channel) {
        return channel
            ? `Dropping "fit-${channel}" because spec has discrete ${getSizeType(channel)}.`
            : `Dropping "fit" because spec has discrete size.`;
    }
    // SELECTION
    function cannotProjectOnChannelWithoutField(channel) {
        return `Cannot project a selection on encoding channel "${channel}", which has no field.`;
    }
    function cannotProjectAggregate(channel, aggregate) {
        return `Cannot project a selection on encoding channel "${channel}" as it uses an aggregate function ("${aggregate}").`;
    }
    function nearestNotSupportForContinuous(mark) {
        return `The "nearest" transform is not supported for ${mark} marks.`;
    }
    function selectionNotSupported(mark) {
        return `Selection not supported for ${mark} yet.`;
    }
    function selectionNotFound(name) {
        return `Cannot find a selection named "${name}".`;
    }
    const SCALE_BINDINGS_CONTINUOUS = 'Scale bindings are currently only supported for scales with unbinned, continuous domains.';
    const LEGEND_BINDINGS_PROJECT_LENGTH = 'Legend bindings are only supported for selections over an individual field or encoding channel.';
    function noSameUnitLookup(name) {
        return (`Cannot define and lookup the "${name}" selection in the same view. ` +
            `Try moving the lookup into a second, layered view?`);
    }
    // REPEAT
    function noSuchRepeatedValue(field) {
        return `Unknown repeated value "${field}".`;
    }
    function columnsNotSupportByRowCol(type) {
        return `The "columns" property cannot be used when "${type}" has nested row/column.`;
    }
    // CONCAT
    const CONCAT_CANNOT_SHARE_AXIS = 'Axes cannot be shared in concatenated views yet (https://github.com/vega/vega-lite/issues/2415).';
    // REPEAT
    const REPEAT_CANNOT_SHARE_AXIS = 'Axes cannot be shared in repeated views yet (https://github.com/vega/vega-lite/issues/2415).';
    // DATA
    function unrecognizedParse(p) {
        return `Unrecognized parse "${p}".`;
    }
    function differentParse(field, local, ancestor) {
        return `An ancestor parsed field "${field}" as ${ancestor} but a child wants to parse the field as ${local}.`;
    }
    // TRANSFORMS
    function invalidTransformIgnored(transform) {
        return `Ignoring an invalid transform: ${stringify(transform)}.`;
    }
    const NO_FIELDS_NEEDS_AS = 'If "from.fields" is not specified, "as" has to be a string that specifies the key to be used for the data from the secondary source.';
    // ENCODING & FACET
    function encodingOverridden(channels) {
        return `Layer's shared ${channels.join(',')} channel ${channels.length === 1 ? 'is' : 'are'} overriden.`;
    }
    function projectionOverridden(opt) {
        const { parentProjection, projection } = opt;
        return `Layer's shared projection ${stringify(parentProjection)} is overridden by a child projection ${stringify(projection)}.`;
    }
    function primitiveChannelDef(channel, type, value) {
        return `Channel ${channel} is a ${type}. Converted to {value: ${stringify(value)}}.`;
    }
    function invalidFieldType(type) {
        return `Invalid field type "${type}".`;
    }
    function nonZeroScaleUsedWithLengthMark(mark, channel, opt) {
        const scaleText = opt.scaleType
            ? `${opt.scaleType} scale`
            : opt.zeroFalse
                ? 'scale with zero=false'
                : 'scale with custom domain that excludes zero';
        return `A ${scaleText} is used to encode ${mark}'s ${channel}. This can be misleading as the ${channel === 'x' ? 'width' : 'height'} of the ${mark} can be arbitrary based on the scale domain. You may want to use point mark instead.`;
    }
    function invalidFieldTypeForCountAggregate(type, aggregate) {
        return `Invalid field type "${type}" for aggregate: "${aggregate}", using "quantitative" instead.`;
    }
    function invalidAggregate(aggregate) {
        return `Invalid aggregation operator "${aggregate}".`;
    }
    function missingFieldType(channel, newType) {
        return `Missing type for channel "${channel}", using "${newType}" instead.`;
    }
    function droppingColor(type, opt) {
        const { fill, stroke } = opt;
        return `Dropping color ${type} as the plot also has ${fill && stroke ? 'fill and stroke' : fill ? 'fill' : 'stroke'}.`;
    }
    function emptyFieldDef(fieldDef, channel) {
        return `Dropping ${stringify(fieldDef)} from channel "${channel}" since it does not contain any data field, value, or signal.`;
    }
    function latLongDeprecated(channel, type, newChannel) {
        return `${channel}-encoding with type ${type} is deprecated. Replacing with ${newChannel}-encoding.`;
    }
    const LINE_WITH_VARYING_SIZE = 'Line marks cannot encode size with a non-groupby field. You may want to use trail marks instead.';
    function incompatibleChannel(channel, markOrFacet, when) {
        return `${channel} dropped as it is incompatible with "${markOrFacet}"${when ? ` when ${when}` : ''}.`;
    }
    function invalidEncodingChannel(channel) {
        return `${channel}-encoding is dropped as ${channel} is not a valid encoding channel.`;
    }
    function facetChannelShouldBeDiscrete(channel) {
        return `${channel} encoding should be discrete (ordinal / nominal / binned).`;
    }
    function facetChannelDropped(channels) {
        return `Facet encoding dropped as ${channels.join(' and ')} ${channels.length > 1 ? 'are' : 'is'} also specified.`;
    }
    function discreteChannelCannotEncode(channel, type) {
        return `Using discrete channel "${channel}" to encode "${type}" field can be misleading as it does not encode ${type === 'ordinal' ? 'order' : 'magnitude'}.`;
    }
    // Mark
    function lineWithRange(hasX2, hasY2) {
        const channels = hasX2 && hasY2 ? 'x2 and y2' : hasX2 ? 'x2' : 'y2';
        return `Line mark is for continuous lines and thus cannot be used with ${channels}. We will use the rule mark (line segments) instead.`;
    }
    function orientOverridden(original, actual) {
        return `Specified orient "${original}" overridden with "${actual}".`;
    }
    // SCALE
    const CANNOT_UNION_CUSTOM_DOMAIN_WITH_FIELD_DOMAIN = 'Custom domain scale cannot be unioned with default field-based domain.';
    const RANGE_STEP_DEPRECATED = `Scale's "rangeStep" is deprecated and will be removed in Vega-Lite 5.0. Please use "width"/"height": {"step": ...} instead. See https://vega.github.io/vega-lite/docs/size.html.`;
    function cannotUseScalePropertyWithNonColor(prop) {
        return `Cannot use the scale property "${prop}" with non-color channel.`;
    }
    function unaggregateDomainHasNoEffectForRawField(fieldDef) {
        return `Using unaggregated domain with raw field has no effect (${stringify(fieldDef)}).`;
    }
    function unaggregateDomainWithNonSharedDomainOp(aggregate) {
        return `Unaggregated domain not applicable for "${aggregate}" since it produces values outside the origin domain of the source data.`;
    }
    function unaggregatedDomainWithLogScale(fieldDef) {
        return `Unaggregated domain is currently unsupported for log scale (${stringify(fieldDef)}).`;
    }
    function cannotApplySizeToNonOrientedMark(mark) {
        return `Cannot apply size to non-oriented mark "${mark}".`;
    }
    function scaleTypeNotWorkWithChannel(channel, scaleType, defaultScaleType) {
        return `Channel "${channel}" does not work with "${scaleType}" scale. We are using "${defaultScaleType}" scale instead.`;
    }
    function scaleTypeNotWorkWithFieldDef(scaleType, defaultScaleType) {
        return `FieldDef does not work with "${scaleType}" scale. We are using "${defaultScaleType}" scale instead.`;
    }
    function scalePropertyNotWorkWithScaleType(scaleType, propName, channel) {
        return `${channel}-scale's "${propName}" is dropped as it does not work with ${scaleType} scale.`;
    }
    function scaleTypeNotWorkWithMark(mark, scaleType) {
        return `Scale type "${scaleType}" does not work with mark "${mark}".`;
    }
    function stepDropped(channel) {
        return `The step for "${channel}" is dropped because the ${channel === 'width' ? 'x' : 'y'} is continuous.`;
    }
    function mergeConflictingProperty(property, propertyOf, v1, v2) {
        return `Conflicting ${propertyOf.toString()} property "${property.toString()}" (${stringify(v1)} and ${stringify(v2)}). Using ${stringify(v1)}.`;
    }
    function mergeConflictingDomainProperty(property, propertyOf, v1, v2) {
        return `Conflicting ${propertyOf.toString()} property "${property.toString()}" (${stringify(v1)} and ${stringify(v2)}). Using the union of the two domains.`;
    }
    function independentScaleMeansIndependentGuide(channel) {
        return `Setting the scale to be independent for "${channel}" means we also have to set the guide (axis or legend) to be independent.`;
    }
    function domainSortDropped(sort) {
        return `Dropping sort property ${stringify(sort)} as unioned domains only support boolean or op "count", "min", and "max".`;
    }
    const UNABLE_TO_MERGE_DOMAINS = 'Unable to merge domains.';
    const MORE_THAN_ONE_SORT = 'Domains that should be unioned has conflicting sort properties. Sort will be set to true.';
    // AXIS
    const INVALID_CHANNEL_FOR_AXIS = 'Invalid channel for axis.';
    // STACK
    function cannotStackRangedMark(channel) {
        return `Cannot stack "${channel}" if there is already "${channel}2".`;
    }
    function cannotStackNonLinearScale(scaleType) {
        return `Cannot stack non-linear scale (${scaleType}).`;
    }
    function stackNonSummativeAggregate(aggregate) {
        return `Stacking is applied even though the aggregate function is non-summative ("${aggregate}").`;
    }
    // TIMEUNIT
    function invalidTimeUnit(unitName, value) {
        return `Invalid ${unitName}: ${stringify(value)}.`;
    }
    function dayReplacedWithDate(fullTimeUnit) {
        return `Time unit "${fullTimeUnit}" is not supported. We are replacing it with ${replaceAll(fullTimeUnit, 'day', 'date')}.`;
    }
    function droppedDay(d) {
        return `Dropping day from datetime ${stringify(d)} as day cannot be combined with other units.`;
    }
    function errorBarCenterAndExtentAreNotNeeded(center, extent) {
        return `${extent ? 'extent ' : ''}${extent && center ? 'and ' : ''}${center ? 'center ' : ''}${extent && center ? 'are ' : 'is '}not needed when data are aggregated.`;
    }
    function errorBarCenterIsUsedWithWrongExtent(center, extent, mark) {
        return `${center} is not usually used with ${extent} for ${mark}.`;
    }
    function errorBarContinuousAxisHasCustomizedAggregate(aggregate, compositeMark) {
        return `Continuous axis should not have customized aggregation function ${aggregate}; ${compositeMark} already agregates the axis.`;
    }
    function errorBarCenterIsNotNeeded(extent, mark) {
        return `Center is not needed to be specified in ${mark} when extent is ${extent}.`;
    }
    function errorBand1DNotSupport(property) {
        return `1D error band does not support ${property}.`;
    }
    // CHANNEL
    function channelRequiredForBinned(channel) {
        return `Channel ${channel} is required for "binned" bin.`;
    }
    function domainRequiredForThresholdScale(channel) {
        return `Domain for ${channel} is required for threshold scale.`;
    }

    var message_ = /*#__PURE__*/Object.freeze({
        __proto__: null,
        invalidSpec: invalidSpec,
        FIT_NON_SINGLE: FIT_NON_SINGLE,
        containerSizeNonSingle: containerSizeNonSingle,
        containerSizeNotCompatibleWithAutosize: containerSizeNotCompatibleWithAutosize,
        droppingFit: droppingFit,
        cannotProjectOnChannelWithoutField: cannotProjectOnChannelWithoutField,
        cannotProjectAggregate: cannotProjectAggregate,
        nearestNotSupportForContinuous: nearestNotSupportForContinuous,
        selectionNotSupported: selectionNotSupported,
        selectionNotFound: selectionNotFound,
        SCALE_BINDINGS_CONTINUOUS: SCALE_BINDINGS_CONTINUOUS,
        LEGEND_BINDINGS_PROJECT_LENGTH: LEGEND_BINDINGS_PROJECT_LENGTH,
        noSameUnitLookup: noSameUnitLookup,
        noSuchRepeatedValue: noSuchRepeatedValue,
        columnsNotSupportByRowCol: columnsNotSupportByRowCol,
        CONCAT_CANNOT_SHARE_AXIS: CONCAT_CANNOT_SHARE_AXIS,
        REPEAT_CANNOT_SHARE_AXIS: REPEAT_CANNOT_SHARE_AXIS,
        unrecognizedParse: unrecognizedParse,
        differentParse: differentParse,
        invalidTransformIgnored: invalidTransformIgnored,
        NO_FIELDS_NEEDS_AS: NO_FIELDS_NEEDS_AS,
        encodingOverridden: encodingOverridden,
        projectionOverridden: projectionOverridden,
        primitiveChannelDef: primitiveChannelDef,
        invalidFieldType: invalidFieldType,
        nonZeroScaleUsedWithLengthMark: nonZeroScaleUsedWithLengthMark,
        invalidFieldTypeForCountAggregate: invalidFieldTypeForCountAggregate,
        invalidAggregate: invalidAggregate,
        missingFieldType: missingFieldType,
        droppingColor: droppingColor,
        emptyFieldDef: emptyFieldDef,
        latLongDeprecated: latLongDeprecated,
        LINE_WITH_VARYING_SIZE: LINE_WITH_VARYING_SIZE,
        incompatibleChannel: incompatibleChannel,
        invalidEncodingChannel: invalidEncodingChannel,
        facetChannelShouldBeDiscrete: facetChannelShouldBeDiscrete,
        facetChannelDropped: facetChannelDropped,
        discreteChannelCannotEncode: discreteChannelCannotEncode,
        lineWithRange: lineWithRange,
        orientOverridden: orientOverridden,
        CANNOT_UNION_CUSTOM_DOMAIN_WITH_FIELD_DOMAIN: CANNOT_UNION_CUSTOM_DOMAIN_WITH_FIELD_DOMAIN,
        RANGE_STEP_DEPRECATED: RANGE_STEP_DEPRECATED,
        cannotUseScalePropertyWithNonColor: cannotUseScalePropertyWithNonColor,
        unaggregateDomainHasNoEffectForRawField: unaggregateDomainHasNoEffectForRawField,
        unaggregateDomainWithNonSharedDomainOp: unaggregateDomainWithNonSharedDomainOp,
        unaggregatedDomainWithLogScale: unaggregatedDomainWithLogScale,
        cannotApplySizeToNonOrientedMark: cannotApplySizeToNonOrientedMark,
        scaleTypeNotWorkWithChannel: scaleTypeNotWorkWithChannel,
        scaleTypeNotWorkWithFieldDef: scaleTypeNotWorkWithFieldDef,
        scalePropertyNotWorkWithScaleType: scalePropertyNotWorkWithScaleType,
        scaleTypeNotWorkWithMark: scaleTypeNotWorkWithMark,
        stepDropped: stepDropped,
        mergeConflictingProperty: mergeConflictingProperty,
        mergeConflictingDomainProperty: mergeConflictingDomainProperty,
        independentScaleMeansIndependentGuide: independentScaleMeansIndependentGuide,
        domainSortDropped: domainSortDropped,
        UNABLE_TO_MERGE_DOMAINS: UNABLE_TO_MERGE_DOMAINS,
        MORE_THAN_ONE_SORT: MORE_THAN_ONE_SORT,
        INVALID_CHANNEL_FOR_AXIS: INVALID_CHANNEL_FOR_AXIS,
        cannotStackRangedMark: cannotStackRangedMark,
        cannotStackNonLinearScale: cannotStackNonLinearScale,
        stackNonSummativeAggregate: stackNonSummativeAggregate,
        invalidTimeUnit: invalidTimeUnit,
        dayReplacedWithDate: dayReplacedWithDate,
        droppedDay: droppedDay,
        errorBarCenterAndExtentAreNotNeeded: errorBarCenterAndExtentAreNotNeeded,
        errorBarCenterIsUsedWithWrongExtent: errorBarCenterIsUsedWithWrongExtent,
        errorBarContinuousAxisHasCustomizedAggregate: errorBarContinuousAxisHasCustomizedAggregate,
        errorBarCenterIsNotNeeded: errorBarCenterIsNotNeeded,
        errorBand1DNotSupport: errorBand1DNotSupport,
        channelRequiredForBinned: channelRequiredForBinned,
        domainRequiredForThresholdScale: domainRequiredForThresholdScale
    });

    /**
     * Vega-Lite's singleton logger utility.
     */
    const message = message_;
    /**
     * Main (default) Vega Logger instance for Vega-Lite.
     */
    const main$1 = logger(Warn);
    let current = main$1;
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
        current = main$1;
        return current;
    }
    function warn(...args) {
        current.warn(...args);
    }
    function debug(...args) {
        current.debug(...args);
    }

    // DateTime definition object
    /*
     * A designated year that starts on Sunday.
     */
    const SUNDAY_YEAR = 2006;
    function isDateTime(o) {
        return (!!o &&
            (!!o.year ||
                !!o.quarter ||
                !!o.month ||
                !!o.date ||
                !!o.day ||
                !!o.hours ||
                !!o.minutes ||
                !!o.seconds ||
                !!o.milliseconds));
    }
    const MONTHS = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ];
    const SHORT_MONTHS = MONTHS.map(m => m.substr(0, 3));
    const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const SHORT_DAYS = DAYS.map(d => d.substr(0, 3));
    function normalizeQuarter(q) {
        if (isNumeric(q)) {
            q = +q;
        }
        if (isNumber(q)) {
            if (q > 4) {
                warn(message.invalidTimeUnit('quarter', q));
            }
            // We accept 1-based quarter, so need to readjust to 0-based quarter
            return q - 1;
        }
        else {
            // Invalid quarter
            throw new Error(message.invalidTimeUnit('quarter', q));
        }
    }
    function normalizeMonth(m) {
        if (isNumeric(m)) {
            m = +m;
        }
        if (isNumber(m)) {
            // We accept 1-based month, so need to readjust to 0-based month
            return m - 1;
        }
        else {
            const lowerM = m.toLowerCase();
            const monthIndex = MONTHS.indexOf(lowerM);
            if (monthIndex !== -1) {
                return monthIndex; // 0 for january, ...
            }
            const shortM = lowerM.substr(0, 3);
            const shortMonthIndex = SHORT_MONTHS.indexOf(shortM);
            if (shortMonthIndex !== -1) {
                return shortMonthIndex;
            }
            // Invalid month
            throw new Error(message.invalidTimeUnit('month', m));
        }
    }
    function normalizeDay(d) {
        if (isNumeric(d)) {
            d = +d;
        }
        if (isNumber(d)) {
            // mod so that this can be both 0-based where 0 = sunday
            // and 1-based where 7=sunday
            return d % 7;
        }
        else {
            const lowerD = d.toLowerCase();
            const dayIndex = DAYS.indexOf(lowerD);
            if (dayIndex !== -1) {
                return dayIndex; // 0 for january, ...
            }
            const shortD = lowerD.substr(0, 3);
            const shortDayIndex = SHORT_DAYS.indexOf(shortD);
            if (shortDayIndex !== -1) {
                return shortDayIndex;
            }
            // Invalid day
            throw new Error(message.invalidTimeUnit('day', d));
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
                warn(message.droppedDay(d));
                d = duplicate(d);
                delete d.day;
            }
        }
        if (d.year !== undefined) {
            parts.push(d.year);
        }
        else if (d.day !== undefined) {
            // Set year to 2006 for working with day since January 1 2006 is a Sunday
            parts.push(SUNDAY_YEAR);
        }
        else {
            parts.push(0);
        }
        if (d.month !== undefined) {
            const month = normalize ? normalizeMonth(d.month) : d.month;
            parts.push(month);
        }
        else if (d.quarter !== undefined) {
            const quarter = normalize ? normalizeQuarter(d.quarter) : d.quarter;
            parts.push(isNumber(quarter) ? quarter * 3 : quarter + '*3');
        }
        else {
            parts.push(0); // months start at zero in JS
        }
        if (d.date !== undefined) {
            parts.push(d.date);
        }
        else if (d.day !== undefined) {
            // HACK: Day only works as a standalone unit
            // This is only correct because we always set year to 2006 for day
            const day = normalize ? normalizeDay(d.day) : d.day;
            parts.push(isNumber(day) ? day + 1 : day + '+1');
        }
        else {
            parts.push(1); // Date starts at 1 in JS
        }
        // Note: can't use TimeUnit enum here as importing it will create
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
            return `utc(${string})`;
        }
        else {
            return `datetime(${string})`;
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
            return `utc(${string})`;
        }
        else {
            return `datetime(${string})`;
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
        }
        else {
            return +new Date(...parts);
        }
    }

    var TimeUnit;
    (function (TimeUnit) {
        TimeUnit.YEAR = 'year';
        TimeUnit.MONTH = 'month';
        TimeUnit.DAY = 'day';
        TimeUnit.DATE = 'date';
        TimeUnit.HOURS = 'hours';
        TimeUnit.MINUTES = 'minutes';
        TimeUnit.SECONDS = 'seconds';
        TimeUnit.MILLISECONDS = 'milliseconds';
        TimeUnit.YEARMONTH = 'yearmonth';
        TimeUnit.YEARMONTHDATE = 'yearmonthdate';
        TimeUnit.YEARMONTHDATEHOURS = 'yearmonthdatehours';
        TimeUnit.YEARMONTHDATEHOURSMINUTES = 'yearmonthdatehoursminutes';
        TimeUnit.YEARMONTHDATEHOURSMINUTESSECONDS = 'yearmonthdatehoursminutesseconds';
        // MONTHDATE and MONTHDATEHOURS always include 29 February since we use year 0th (which is a leap year);
        TimeUnit.MONTHDATE = 'monthdate';
        TimeUnit.MONTHDATEHOURS = 'monthdatehours';
        TimeUnit.HOURSMINUTES = 'hoursminutes';
        TimeUnit.HOURSMINUTESSECONDS = 'hoursminutesseconds';
        TimeUnit.MINUTESSECONDS = 'minutesseconds';
        TimeUnit.SECONDSMILLISECONDS = 'secondsmilliseconds';
        TimeUnit.QUARTER = 'quarter';
        TimeUnit.YEARQUARTER = 'yearquarter';
        TimeUnit.QUARTERMONTH = 'quartermonth';
        TimeUnit.YEARQUARTERMONTH = 'yearquartermonth';
        TimeUnit.UTCYEAR = 'utcyear';
        TimeUnit.UTCMONTH = 'utcmonth';
        TimeUnit.UTCDAY = 'utcday';
        TimeUnit.UTCDATE = 'utcdate';
        TimeUnit.UTCHOURS = 'utchours';
        TimeUnit.UTCMINUTES = 'utcminutes';
        TimeUnit.UTCSECONDS = 'utcseconds';
        TimeUnit.UTCMILLISECONDS = 'utcmilliseconds';
        TimeUnit.UTCYEARMONTH = 'utcyearmonth';
        TimeUnit.UTCYEARMONTHDATE = 'utcyearmonthdate';
        TimeUnit.UTCYEARMONTHDATEHOURS = 'utcyearmonthdatehours';
        TimeUnit.UTCYEARMONTHDATEHOURSMINUTES = 'utcyearmonthdatehoursminutes';
        TimeUnit.UTCYEARMONTHDATEHOURSMINUTESSECONDS = 'utcyearmonthdatehoursminutesseconds';
        // UTCMONTHDATE and UTCMONTHDATEHOURS always include 29 February since we use year 0th (which is a leap year);
        TimeUnit.UTCMONTHDATE = 'utcmonthdate';
        TimeUnit.UTCMONTHDATEHOURS = 'utcmonthdatehours';
        TimeUnit.UTCHOURSMINUTES = 'utchoursminutes';
        TimeUnit.UTCHOURSMINUTESSECONDS = 'utchoursminutesseconds';
        TimeUnit.UTCMINUTESSECONDS = 'utcminutesseconds';
        TimeUnit.UTCSECONDSMILLISECONDS = 'utcsecondsmilliseconds';
        TimeUnit.UTCQUARTER = 'utcquarter';
        TimeUnit.UTCYEARQUARTER = 'utcyearquarter';
        TimeUnit.UTCQUARTERMONTH = 'utcquartermonth';
        TimeUnit.UTCYEARQUARTERMONTH = 'utcyearquartermonth';
    })(TimeUnit || (TimeUnit = {}));
    /** Time Unit that only corresponds to only one part of Date objects. */
    const LOCAL_SINGLE_TIMEUNIT_INDEX = {
        year: 1,
        quarter: 1,
        month: 1,
        day: 1,
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
    const UTC_SINGLE_TIMEUNIT_INDEX = {
        utcyear: 1,
        utcquarter: 1,
        utcmonth: 1,
        utcday: 1,
        utcdate: 1,
        utchours: 1,
        utcminutes: 1,
        utcseconds: 1,
        utcmilliseconds: 1
    };
    const LOCAL_MULTI_TIMEUNIT_INDEX = {
        yearquarter: 1,
        yearquartermonth: 1,
        yearmonth: 1,
        yearmonthdate: 1,
        yearmonthdatehours: 1,
        yearmonthdatehoursminutes: 1,
        yearmonthdatehoursminutesseconds: 1,
        quartermonth: 1,
        monthdate: 1,
        monthdatehours: 1,
        hoursminutes: 1,
        hoursminutesseconds: 1,
        minutesseconds: 1,
        secondsmilliseconds: 1
    };
    const UTC_MULTI_TIMEUNIT_INDEX = {
        utcyearquarter: 1,
        utcyearquartermonth: 1,
        utcyearmonth: 1,
        utcyearmonthdate: 1,
        utcyearmonthdatehours: 1,
        utcyearmonthdatehoursminutes: 1,
        utcyearmonthdatehoursminutesseconds: 1,
        utcquartermonth: 1,
        utcmonthdate: 1,
        utcmonthdatehours: 1,
        utchoursminutes: 1,
        utchoursminutesseconds: 1,
        utcminutesseconds: 1,
        utcsecondsmilliseconds: 1
    };
    const UTC_TIMEUNIT_INDEX = Object.assign(Object.assign({}, UTC_SINGLE_TIMEUNIT_INDEX), UTC_MULTI_TIMEUNIT_INDEX);
    function isUTCTimeUnit(t) {
        return !!UTC_TIMEUNIT_INDEX[t];
    }
    function getLocalTimeUnit(t) {
        return t.substr(3);
    }
    const TIMEUNIT_INDEX = Object.assign(Object.assign(Object.assign(Object.assign({}, LOCAL_SINGLE_TIMEUNIT_INDEX), UTC_SINGLE_TIMEUNIT_INDEX), LOCAL_MULTI_TIMEUNIT_INDEX), UTC_MULTI_TIMEUNIT_INDEX);
    // In order of increasing specificity
    const VEGALITE_TIMEFORMAT = {
        'year-month': '%b %Y ',
        'year-month-date': '%b %d, %Y '
    };
    function getTimeUnitParts(timeUnit) {
        return TIMEUNIT_PARTS.reduce((parts, part) => {
            if (containsTimeUnit(timeUnit, part)) {
                return [...parts, part];
            }
            return parts;
        }, []);
    }
    /** Returns true if fullTimeUnit contains the timeUnit, false otherwise. */
    function containsTimeUnit(fullTimeUnit, timeUnit) {
        const index = fullTimeUnit.indexOf(timeUnit);
        return (index > -1 && (timeUnit !== TimeUnit.SECONDS || index === 0 || fullTimeUnit.charAt(index - 1) !== 'i') // exclude milliseconds
        );
    }
    /**
     * Returns Vega expresssion for a given timeUnit and fieldRef
     */
    function fieldExpr(fullTimeUnit, field, { end } = { end: false }) {
        const fieldRef = accessPathWithDatum(field);
        const utc = isUTCTimeUnit(fullTimeUnit) ? 'utc' : '';
        function func(timeUnit) {
            if (timeUnit === TimeUnit.QUARTER) {
                // quarter starting at 0 (0,3,6,9).
                return `(${utc}quarter(${fieldRef})-1)`;
            }
            else {
                return `${utc}${timeUnit}(${fieldRef})`;
            }
        }
        let lastTimeUnit;
        const d = TIMEUNIT_PARTS.reduce((dateExpr, tu) => {
            if (containsTimeUnit(fullTimeUnit, tu)) {
                dateExpr[tu] = func(tu);
                lastTimeUnit = tu;
            }
            return dateExpr;
        }, {});
        if (end) {
            d[lastTimeUnit] += '+1';
        }
        return dateTimeExprToExpr(d);
    }
    function getTimeUnitSpecifierExpression(timeUnit) {
        if (!timeUnit) {
            return undefined;
        }
        const timeUnitParts = getTimeUnitParts(timeUnit);
        return `timeUnitSpecifier(${fastJsonStableStringify(timeUnitParts)}, ${fastJsonStableStringify(VEGALITE_TIMEFORMAT)})`;
    }
    /**
     * returns the signal expression used for axis labels for a time unit
     */
    function formatExpression(timeUnit, field, isUTCScale) {
        if (!timeUnit) {
            return undefined;
        }
        const timeUnitSpecifierExpr = getTimeUnitSpecifierExpression(timeUnit);
        // We only use utcFormat for utc scale
        // For utc time units, the data is already converted as a part of timeUnit transform.
        // Thus, utc time units should use timeFormat to avoid shifting the time twice.
        if (isUTCScale || isUTCTimeUnit(timeUnit)) {
            return `utcFormat(${field}, ${timeUnitSpecifierExpr})`;
        }
        else {
            return `timeFormat(${field}, ${timeUnitSpecifierExpr})`;
        }
    }
    function normalizeTimeUnit(timeUnit) {
        if (!timeUnit) {
            return undefined;
        }
        let params;
        if (isString(timeUnit)) {
            params = {
                unit: correctTimeUnit(timeUnit)
            };
        }
        else if (isObject(timeUnit)) {
            params = Object.assign(Object.assign({}, timeUnit), (timeUnit.unit ? { unit: correctTimeUnit(timeUnit.unit) } : {}));
        }
        if (isUTCTimeUnit(params.unit)) {
            params.utc = true;
            params.unit = getLocalTimeUnit(params.unit);
        }
        return params;
    }
    function correctTimeUnit(timeUnit) {
        if (timeUnit !== 'day' && timeUnit.indexOf('day') >= 0) {
            warn(message.dayReplacedWithDate(timeUnit));
            return replaceAll(timeUnit, 'day', 'date');
        }
        return timeUnit;
    }
    function timeUnitToString(tu) {
        const _a = normalizeTimeUnit(tu), { utc } = _a, rest = __rest(_a, ["utc"]);
        if (rest.unit) {
            return ((utc ? 'utc' : '') +
                keys(rest)
                    .map(p => varName(`${p === 'unit' ? '' : `_${p}_`}${rest[p]}`))
                    .join(''));
        }
        else {
            // when maxbins is specified instead of units
            return ((utc ? 'utc' : '') +
                'timeunit' +
                keys(rest)
                    .map(p => varName(`_${p}_${rest[p]}`))
                    .join(''));
        }
    }

    function isSelectionPredicate(predicate) {
        var _a;
        return (_a = predicate) === null || _a === void 0 ? void 0 : _a['selection'];
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
        if (predicate && predicate.field) {
            if (isArray(predicate.range) && predicate.range.length === 2) {
                return true;
            }
        }
        return false;
    }
    function isFieldOneOfPredicate(predicate) {
        return (predicate && !!predicate.field && (isArray(predicate.oneOf) || isArray(predicate.in)) // backward compatibility
        );
    }
    function isFieldValidPredicate(predicate) {
        return predicate && !!predicate.field && predicate.valid !== undefined;
    }
    function isFieldPredicate(predicate) {
        return (isFieldOneOfPredicate(predicate) ||
            isFieldEqualPredicate(predicate) ||
            isFieldRangePredicate(predicate) ||
            isFieldLTPredicate(predicate) ||
            isFieldGTPredicate(predicate) ||
            isFieldLTEPredicate(predicate) ||
            isFieldGTEPredicate(predicate));
    }
    function predicateValueExpr(v, timeUnit) {
        return valueExpr(v, { timeUnit, time: true });
    }
    function predicateValuesExpr(vals, timeUnit) {
        return vals.map(v => predicateValueExpr(v, timeUnit));
    }
    // This method is used by Voyager. Do not change its behavior without changing Voyager.
    function fieldFilterExpression(predicate, useInRange = true) {
        var _a;
        const { field } = predicate;
        const timeUnit = (_a = normalizeTimeUnit(predicate.timeUnit)) === null || _a === void 0 ? void 0 : _a.unit;
        const fieldExpr$1 = timeUnit
            ? // For timeUnit, cast into integer with time() so we can use ===, inrange, indexOf to compare values directly.
                // TODO: We calculate timeUnit on the fly here. Consider if we would like to consolidate this with timeUnit pipeline
                // TODO: support utc
                'time(' + fieldExpr(timeUnit, field) + ')'
            : vgField(predicate, { expr: 'datum' });
        if (isFieldEqualPredicate(predicate)) {
            return fieldExpr$1 + '===' + predicateValueExpr(predicate.equal, timeUnit);
        }
        else if (isFieldLTPredicate(predicate)) {
            const upper = predicate.lt;
            return `${fieldExpr$1}<${predicateValueExpr(upper, timeUnit)}`;
        }
        else if (isFieldGTPredicate(predicate)) {
            const lower = predicate.gt;
            return `${fieldExpr$1}>${predicateValueExpr(lower, timeUnit)}`;
        }
        else if (isFieldLTEPredicate(predicate)) {
            const upper = predicate.lte;
            return `${fieldExpr$1}<=${predicateValueExpr(upper, timeUnit)}`;
        }
        else if (isFieldGTEPredicate(predicate)) {
            const lower = predicate.gte;
            return `${fieldExpr$1}>=${predicateValueExpr(lower, timeUnit)}`;
        }
        else if (isFieldOneOfPredicate(predicate)) {
            return `indexof([${predicateValuesExpr(predicate.oneOf, timeUnit).join(',')}], ${fieldExpr$1}) !== -1`;
        }
        else if (isFieldValidPredicate(predicate)) {
            return fieldValidPredicate(fieldExpr$1, predicate.valid);
        }
        else if (isFieldRangePredicate(predicate)) {
            const lower = predicate.range[0];
            const upper = predicate.range[1];
            if (lower !== null && upper !== null && useInRange) {
                return ('inrange(' +
                    fieldExpr$1 +
                    ', [' +
                    predicateValueExpr(lower, timeUnit) +
                    ', ' +
                    predicateValueExpr(upper, timeUnit) +
                    '])');
            }
            const exprs = [];
            if (lower !== null) {
                exprs.push(`${fieldExpr$1} >= ${predicateValueExpr(lower, timeUnit)}`);
            }
            if (upper !== null) {
                exprs.push(`${fieldExpr$1} <= ${predicateValueExpr(upper, timeUnit)}`);
            }
            return exprs.length > 0 ? exprs.join(' && ') : 'true';
        }
        /* istanbul ignore next: it should never reach here */
        throw new Error(`Invalid field predicate: ${JSON.stringify(predicate)}`);
    }
    function fieldValidPredicate(fieldExpr, valid = true) {
        if (valid) {
            return `isValid(${fieldExpr}) && isFinite(+${fieldExpr})`;
        }
        else {
            return `!isValid(${fieldExpr}) || !isFinite(+${fieldExpr})`;
        }
    }
    function normalizePredicate(f) {
        var _a;
        if (isFieldPredicate(f) && f.timeUnit) {
            return Object.assign(Object.assign({}, f), { timeUnit: (_a = normalizeTimeUnit(f.timeUnit)) === null || _a === void 0 ? void 0 : _a.unit });
        }
        return f;
    }

    /** Constants and utilities for data type */
    /** Data type based on level of measurement */
    const TYPE_INDEX = {
        quantitative: 1,
        ordinal: 1,
        temporal: 1,
        nominal: 1,
        geojson: 1
    };
    const QUANTITATIVE = 'quantitative';
    const ORDINAL = 'ordinal';
    const TEMPORAL = 'temporal';
    const NOMINAL = 'nominal';
    const GEOJSON = 'geojson';
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
        }
        // If we get invalid input, return undefined type.
        return undefined;
    }

    var ScaleType;
    (function (ScaleType) {
        // Continuous - Quantitative
        ScaleType.LINEAR = 'linear';
        ScaleType.LOG = 'log';
        ScaleType.POW = 'pow';
        ScaleType.SQRT = 'sqrt';
        ScaleType.SYMLOG = 'symlog';
        ScaleType.IDENTITY = 'identity';
        ScaleType.SEQUENTIAL = 'sequential';
        // Continuous - Time
        ScaleType.TIME = 'time';
        ScaleType.UTC = 'utc';
        // Discretizing scales
        ScaleType.QUANTILE = 'quantile';
        ScaleType.QUANTIZE = 'quantize';
        ScaleType.THRESHOLD = 'threshold';
        ScaleType.BIN_ORDINAL = 'bin-ordinal';
        // Discrete scales
        ScaleType.ORDINAL = 'ordinal';
        ScaleType.POINT = 'point';
        ScaleType.BAND = 'band';
    })(ScaleType || (ScaleType = {}));
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
        point: 'ordinal-position',
        band: 'ordinal-position',
        quantile: 'discretizing',
        quantize: 'discretizing',
        threshold: 'discretizing'
    };
    const SCALE_TYPES = keys(SCALE_CATEGORY_INDEX);
    /**
     * Whether the two given scale types can be merged together.
     */
    function scaleCompatible(scaleType1, scaleType2) {
        const scaleCategory1 = SCALE_CATEGORY_INDEX[scaleType1];
        const scaleCategory2 = SCALE_CATEGORY_INDEX[scaleType2];
        return (scaleCategory1 === scaleCategory2 ||
            (scaleCategory1 === 'ordinal-position' && scaleCategory2 === 'time') ||
            (scaleCategory2 === 'ordinal-position' && scaleCategory1 === 'time'));
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
    const CONTINUOUS_TO_CONTINUOUS_SCALES = ['linear', 'log', 'pow', 'sqrt', 'symlog', 'time', 'utc'];
    const CONTINUOUS_TO_CONTINUOUS_INDEX = toSet(CONTINUOUS_TO_CONTINUOUS_SCALES);
    const QUANTITATIVE_SCALES = ['linear', 'log', 'pow', 'sqrt', 'symlog'];
    const QUANTITATIVE_SCALES_INDEX = toSet(QUANTITATIVE_SCALES);
    function isQuantitative(type) {
        return type in QUANTITATIVE_SCALES_INDEX;
    }
    const CONTINUOUS_TO_DISCRETE_SCALES = ['quantile', 'quantize', 'threshold'];
    const CONTINUOUS_TO_DISCRETE_INDEX = toSet(CONTINUOUS_TO_DISCRETE_SCALES);
    const CONTINUOUS_DOMAIN_SCALES = CONTINUOUS_TO_CONTINUOUS_SCALES.concat([
        'quantile',
        'quantize',
        'threshold',
        'sequential',
        'identity'
    ]);
    const CONTINUOUS_DOMAIN_INDEX = toSet(CONTINUOUS_DOMAIN_SCALES);
    const DISCRETE_DOMAIN_SCALES = ['ordinal', 'bin-ordinal', 'point', 'band'];
    const DISCRETE_DOMAIN_INDEX = toSet(DISCRETE_DOMAIN_SCALES);
    function hasDiscreteDomain(type) {
        return type in DISCRETE_DOMAIN_INDEX;
    }
    function hasContinuousDomain(type) {
        return type in CONTINUOUS_DOMAIN_INDEX;
    }
    function isContinuousToContinuous(type) {
        return type in CONTINUOUS_TO_CONTINUOUS_INDEX;
    }
    function isContinuousToDiscrete(type) {
        return type in CONTINUOUS_TO_DISCRETE_INDEX;
    }
    const defaultScaleConfig = {
        pointPadding: 0.5,
        barBandPaddingInner: 0.1,
        rectBandPaddingInner: 0,
        minBandSize: 2,
        minFontSize: 8,
        maxFontSize: 40,
        minOpacity: 0.3,
        maxOpacity: 0.8,
        // FIXME: revise if these *can* become ratios of width/height step
        minSize: 9,
        minStrokeWidth: 1,
        maxStrokeWidth: 4,
        quantileCount: 4,
        quantizeCount: 4
    };
    function isExtendedScheme(scheme) {
        return !isString(scheme) && !!scheme['name'];
    }
    function isSelectionDomain(domain) {
        var _a;
        return (_a = domain) === null || _a === void 0 ? void 0 : _a['selection'];
    }
    function isDomainUnionWith(domain) {
        return domain && domain['unionWith'];
    }
    const SCALE_PROPERTY_INDEX = {
        type: 1,
        domain: 1,
        domainMid: 1,
        align: 1,
        range: 1,
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
        // band/point
        padding: 1,
        paddingInner: 1,
        paddingOuter: 1
    };
    const NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTY_INDEX = __rest(SCALE_PROPERTY_INDEX, ["type", "domain", "range", "scheme"]);
    const NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES = keys(NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTY_INDEX);
    const SCALE_TYPE_INDEX = generateScaleTypeIndex();
    function scaleTypeSupportProperty(scaleType, propName) {
        switch (propName) {
            case 'type':
            case 'domain':
            case 'reverse':
            case 'range':
                return true;
            case 'scheme':
            case 'interpolate':
                return !contains(['point', 'band', 'identity'], scaleType);
            case 'bins':
                return !contains(['point', 'band', 'identity', 'ordinal'], scaleType);
            case 'round':
                return isContinuousToContinuous(scaleType) || scaleType === 'band' || scaleType === 'point';
            case 'padding':
                return isContinuousToContinuous(scaleType) || contains(['point', 'band'], scaleType);
            case 'paddingOuter':
            case 'align':
                return contains(['point', 'band'], scaleType);
            case 'paddingInner':
                return scaleType === 'band';
            case 'domainMid':
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
                return (hasContinuousDomain(scaleType) &&
                    !contains([
                        'log',
                        'time',
                        'utc',
                        'threshold',
                        'quantile' // quantile depends on distribution so zero does not matter
                    ], scaleType));
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
                    return message.cannotUseScalePropertyWithNonColor(channel);
                }
                return undefined;
            case 'align':
            case 'type':
            case 'bins':
            case 'domain':
            case 'range':
            case 'base':
            case 'exponent':
            case 'constant':
            case 'nice':
            case 'padding':
            case 'paddingInner':
            case 'paddingOuter':
            case 'reverse':
            case 'round':
            case 'clamp':
            case 'zero':
                return undefined; // GOOD!
        }
    }
    function scaleTypeSupportDataType(specifiedType, fieldDefType) {
        if (contains([ORDINAL, NOMINAL], fieldDefType)) {
            return specifiedType === undefined || hasDiscreteDomain(specifiedType);
        }
        else if (fieldDefType === TEMPORAL) {
            return contains([ScaleType.TIME, ScaleType.UTC, undefined], specifiedType);
        }
        else if (fieldDefType === QUANTITATIVE) {
            return contains([
                ScaleType.LOG,
                ScaleType.POW,
                ScaleType.SQRT,
                ScaleType.SYMLOG,
                ScaleType.QUANTILE,
                ScaleType.QUANTIZE,
                ScaleType.THRESHOLD,
                ScaleType.LINEAR,
                undefined
            ], specifiedType);
        }
        return true;
    }
    function channelSupportScaleType(channel, scaleType) {
        switch (channel) {
            case X:
            case Y:
                return isContinuousToContinuous(scaleType) || contains(['band', 'point'], scaleType);
            case SIZE: // TODO: size and opacity can support ordinal with more modification
            case STROKEWIDTH:
            case OPACITY:
            case FILLOPACITY:
            case STROKEOPACITY:
                // Although it generally doesn't make sense to use band with size and opacity,
                // it can also work since we use band: 0.5 to get midpoint.
                return (isContinuousToContinuous(scaleType) ||
                    isContinuousToDiscrete(scaleType) ||
                    contains(['band', 'point'], scaleType));
            case COLOR:
            case FILL:
            case STROKE:
                return scaleType !== 'band'; // band does not make sense with color
            case STROKEDASH:
                return scaleType === 'ordinal' || isContinuousToDiscrete(scaleType);
            case SHAPE:
                return scaleType === 'ordinal'; // shape = lookup only
        }
        /* istanbul ignore next: it should never reach here */
        return false;
    }
    // generates ScaleTypeIndex where keys are encoding channels and values are list of valid ScaleTypes
    function generateScaleTypeIndex() {
        var _a;
        const index = {};
        for (const channel of CHANNELS) {
            for (const fieldDefType of keys(TYPE_INDEX)) {
                for (const scaleType of SCALE_TYPES) {
                    const key = generateScaleTypeIndexKey(channel, fieldDefType);
                    if (channelSupportScaleType(channel, scaleType) && scaleTypeSupportDataType(scaleType, fieldDefType)) {
                        index[key] = (_a = index[key], (_a !== null && _a !== void 0 ? _a : []));
                        index[key].push(scaleType);
                    }
                }
            }
        }
        return index;
    }
    function generateScaleTypeIndexKey(channel, fieldDefType) {
        return channel + '_' + fieldDefType;
    }

    function extractTitleConfig(titleConfig) {
        const { 
        // These are non-mark title config that need to be hardcoded
        anchor, frame, offset, orient, 
        // color needs to be redirect to fill
        color, 
        // subtitle properties
        subtitleColor, subtitleFont, subtitleFontSize, subtitleFontStyle, subtitleFontWeight, subtitleLineHeight, subtitlePadding } = titleConfig, 
        // The rest are mark config.
        titleMarkConfig = __rest(titleConfig, ["anchor", "frame", "offset", "orient", "color", "subtitleColor", "subtitleFont", "subtitleFontSize", "subtitleFontStyle", "subtitleFontWeight", "subtitleLineHeight", "subtitlePadding"]);
        const mark = Object.assign(Object.assign({}, titleMarkConfig), (color ? { fill: color } : {}));
        const nonMark = Object.assign(Object.assign(Object.assign(Object.assign({}, (anchor ? { anchor } : {})), (frame ? { frame } : {})), (offset ? { offset } : {})), (orient ? { orient } : {}));
        const subtitle = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (subtitleColor ? { subtitleColor } : {})), (subtitleFont ? { subtitleFont } : {})), (subtitleFontSize ? { subtitleFontSize } : {})), (subtitleFontStyle ? { subtitleFontStyle } : {})), (subtitleFontWeight ? { subtitleFontWeight } : {})), (subtitleLineHeight ? { subtitleLineHeight } : {})), (subtitlePadding ? { subtitlePadding } : {}));
        return { mark, nonMark, subtitle };
    }
    function isText(v) {
        return isString(v) || (isArray(v) && isString(v[0]));
    }

    function isSignalRef(o) {
        return o && !!o['signal'];
    }
    function isVgRangeStep(range) {
        return !!range['step'];
    }
    function isDataRefUnionedDomain(domain) {
        if (!isArray(domain)) {
            return 'fields' in domain && !('data' in domain);
        }
        return false;
    }
    function isFieldRefUnionDomain(domain) {
        if (!isArray(domain)) {
            return 'fields' in domain && 'data' in domain;
        }
        return false;
    }
    function isDataRefDomain(domain) {
        if (!isArray(domain)) {
            return 'field' in domain && 'data' in domain;
        }
        return false;
    }
    const VG_MARK_CONFIG_INDEX = {
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
        height: 1
        // commented below are vg channel that do not have mark config.
        // x: 1,
        // y: 1,
        // x2: 1,
        // y2: 1,
        // xc'|'yc'
        // clip: 1,
        // endAngle: 1,
        // innerRadius: 1,
        // outerRadius: 1,
        // path: 1,
        // startAngle: 1,
        // url: 1,
    };
    const VG_MARK_CONFIGS = keys(VG_MARK_CONFIG_INDEX);
    // Vega's cornerRadius channels.
    const VG_CORNERRADIUS_CHANNELS = [
        'cornerRadius',
        'cornerRadiusTopLeft',
        'cornerRadiusTopRight',
        'cornerRadiusBottomLeft',
        'cornerRadiusBottomRight'
    ];

    const BIN_RANGE_DELIMITER = ' \u2013 ';
    function signalOrValueRef(value) {
        if (isSignalRef(value)) {
            return value;
        }
        return { value };
    }
    function applyMarkConfig(e, model, propsList) {
        for (const property of propsList) {
            const value = getMarkConfig(property, model.markDef, model.config);
            if (value !== undefined) {
                e[property] = { value: value };
            }
        }
        return e;
    }
    function getStyles(mark) {
        var _a;
        return [].concat(mark.type, (_a = mark.style, (_a !== null && _a !== void 0 ? _a : [])));
    }
    function getMarkPropOrConfig(channel, mark, config) {
        return getFirstDefined(mark[channel], getMarkConfig(channel, mark, config));
    }
    /**
     * Return property value from style or mark specific config property if exists.
     * Otherwise, return general mark specific config.
     */
    function getMarkConfig(channel, mark, config, { vgChannel } = {} // Note: Ham: I use `any` here as it's too hard to make TS knows that MarkConfig[vgChannel] would have the same type as MarkConfig[P]
    ) {
        return getFirstDefined(
        // style config has highest precedence
        vgChannel ? getMarkStyleConfig(channel, mark, config.style) : undefined, getMarkStyleConfig(channel, mark, config.style), 
        // then mark-specific config
        vgChannel ? config[mark.type][vgChannel] : undefined, config[mark.type][channel], 
        // If there is vgChannel, skip vl channel.
        // For example, vl size for text is vg fontSize, but config.mark.size is only for point size.
        vgChannel ? config.mark[vgChannel] : config.mark[channel]);
    }
    function getMarkStyleConfig(prop, mark, styleConfigIndex) {
        return getStyleConfig(prop, getStyles(mark), styleConfigIndex);
    }
    function getStyleConfig(p, styles, styleConfigIndex) {
        styles = array(styles);
        let value;
        for (const style of styles) {
            const styleConfig = styleConfigIndex[style];
            if (styleConfig) {
                value = styleConfig[p];
            }
        }
        return value;
    }
    function formatSignalRef(fieldDef, specifiedFormat, expr, config) {
        var _a;
        if (isTimeFormatFieldDef(fieldDef)) {
            const isUTCScale = isScaleFieldDef(fieldDef) && fieldDef['scale'] && fieldDef['scale'].type === ScaleType.UTC;
            return {
                signal: timeFormatExpression(vgField(fieldDef, {
                    expr
                }), (_a = normalizeTimeUnit(fieldDef.timeUnit)) === null || _a === void 0 ? void 0 : _a.unit, specifiedFormat, config.timeFormat, isUTCScale, true)
            };
        }
        else {
            const format = numberFormat(fieldDef, specifiedFormat, config);
            if (isBinning(fieldDef.bin)) {
                const startField = vgField(fieldDef, { expr });
                const endField = vgField(fieldDef, { expr, binSuffix: 'end' });
                return {
                    signal: binFormatExpression(startField, endField, format, config)
                };
            }
            else if (fieldDef.type === 'quantitative' || format) {
                return {
                    signal: `${formatExpr(vgField(fieldDef, { expr, binSuffix: 'range' }), format)}`
                };
            }
            else {
                return { signal: `''+${vgField(fieldDef, { expr })}` };
            }
        }
    }
    /**
     * Returns number format for a fieldDef
     */
    function numberFormat(fieldDef, specifiedFormat, config) {
        // Specified format in axis/legend has higher precedence than fieldDef.format
        if (specifiedFormat) {
            return specifiedFormat;
        }
        if (fieldDef.type === QUANTITATIVE) {
            // we only apply the default if the field is quantitative
            return config.numberFormat;
        }
        return undefined;
    }
    function formatExpr(field, format) {
        return `format(${field}, "${format || ''}")`;
    }
    function numberFormatExpr(field, specifiedFormat, config) {
        return formatExpr(field, (specifiedFormat !== null && specifiedFormat !== void 0 ? specifiedFormat : config.numberFormat));
    }
    function binFormatExpression(startField, endField, format, config) {
        return `${fieldValidPredicate(startField, false)} ? "null" : ${numberFormatExpr(startField, format, config)} + "${BIN_RANGE_DELIMITER}" + ${numberFormatExpr(endField, format, config)}`;
    }
    /**
     * Returns the time expression used for axis/legend labels or text mark for a temporal field
     */
    function timeFormatExpression(field, timeUnit, format, rawTimeFormat, // should be provided only for actual text and headers, not axis/legend labels
    isUTCScale, alwaysReturn = false) {
        if (!timeUnit || format) {
            // If there is not time unit, or if user explicitly specify format for axis/legend/text.
            format = (format !== null && format !== void 0 ? format : rawTimeFormat); // only use provided timeFormat if there is no timeUnit.
            if (format || alwaysReturn) {
                return `${isUTCScale ? 'utc' : 'time'}Format(${field}, '${format}')`;
            }
            else {
                return undefined;
            }
        }
        else {
            return formatExpression(timeUnit, field, isUTCScale);
        }
    }
    /**
     * Return Vega sort parameters (tuple of field and order).
     */
    function sortParams(orderDef, fieldRefOption) {
        return array(orderDef).reduce((s, orderChannelDef) => {
            var _a;
            s.field.push(vgField(orderChannelDef, fieldRefOption));
            s.order.push((_a = orderChannelDef.sort, (_a !== null && _a !== void 0 ? _a : 'ascending')));
            return s;
        }, { field: [], order: [] });
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
        }
        else if (!title1) {
            // if title1 is falsy
            return title2;
        }
        else {
            return [...array(title1), ...array(title2)].join(', ');
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
        }
        else if (isText(v1Val) && isText(v2Val)) {
            return {
                explicit: v1.explicit,
                value: mergeTitle(v1Val, v2Val)
            };
        }
        else if (!isText(v1Val) && !isText(v2Val)) {
            return {
                explicit: v1.explicit,
                value: mergeTitleFieldDefs(v1Val, v2Val)
            };
        }
        /* istanbul ignore next: Condition should not happen -- only for warning in development. */
        throw new Error('It should never reach here');
    }

    const DEFAULT_SORT_OP = 'mean';
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
        return !!SORT_BY_CHANNEL_INDEX[c];
    }
    function isSortByEncoding(sort) {
        return !!sort && !!sort['encoding'];
    }
    function isSortField(sort) {
        return !!sort && (sort['op'] === 'count' || !!sort['field']);
    }
    function isSortArray(sort) {
        return !!sort && isArray(sort);
    }

    function isFacetMapping(f) {
        return !!f['row'] || !!f['column'];
    }
    function isFacetFieldDef(channelDef) {
        return !!channelDef && !!channelDef['header'];
    }
    function isFacetSpec(spec) {
        return spec['facet'] !== undefined;
    }

    function isConditionalSelection(c) {
        return c['selection'];
    }
    function isRepeatRef(field) {
        return field && !isString(field) && 'repeat' in field;
    }
    function toFieldDefBase(fieldDef) {
        const { field, timeUnit, bin, aggregate } = fieldDef;
        return Object.assign(Object.assign(Object.assign(Object.assign({}, (timeUnit ? { timeUnit } : {})), (bin ? { bin } : {})), (aggregate ? { aggregate } : {})), { field });
    }
    function isSortableFieldDef(fieldDef) {
        return isTypedFieldDef(fieldDef) && !!fieldDef['sort'];
    }
    function getBand(channel, fieldDef, fieldDef2, mark, config, { isMidPoint } = {}) {
        const { timeUnit, bin } = fieldDef;
        if (contains(['x', 'y'], channel)) {
            if (isPositionFieldDef(fieldDef) && fieldDef.band !== undefined) {
                return fieldDef.band;
            }
            else if (timeUnit && !fieldDef2) {
                if (isMidPoint) {
                    return getMarkConfig('timeUnitBandPosition', mark, config);
                }
                else {
                    return isRectBasedMark(mark.type) ? getMarkConfig('timeUnitBand', mark, config) : 0;
                }
            }
            else if (isBinning(bin)) {
                return isRectBasedMark(mark.type) && !isMidPoint ? 1 : 0.5;
            }
        }
        return undefined;
    }
    function hasBand(channel, fieldDef, fieldDef2, mark, config) {
        if (isBinning(fieldDef.bin) || (fieldDef.timeUnit && isTypedFieldDef(fieldDef) && fieldDef.type === 'temporal')) {
            return !!getBand(channel, fieldDef, fieldDef2, mark, config);
        }
        return false;
    }
    function isConditionalDef(channelDef) {
        return !!channelDef && !!channelDef['condition'];
    }
    /**
     * Return if a channelDef is a ConditionalValueDef with ConditionFieldDef
     */
    function hasConditionalFieldDef(channelDef) {
        return !!channelDef && !!channelDef.condition && !isArray(channelDef.condition) && isFieldDef(channelDef.condition);
    }
    function hasConditionalValueDef(channelDef) {
        return !!channelDef && !!channelDef.condition && (isArray(channelDef.condition) || isValueDef(channelDef.condition));
    }
    function isFieldDef(channelDef) {
        return !!channelDef && (!!channelDef['field'] || channelDef['aggregate'] === 'count');
    }
    function isTypedFieldDef(channelDef) {
        return !!channelDef && ((!!channelDef['field'] && !!channelDef['type']) || channelDef['aggregate'] === 'count');
    }
    function isStringFieldDef(channelDef) {
        return isFieldDef(channelDef) && isString(channelDef.field);
    }
    function isValueDef(channelDef) {
        return channelDef && 'value' in channelDef && channelDef['value'] !== undefined;
    }
    function isScaleFieldDef(channelDef) {
        return !!channelDef && (!!channelDef['scale'] || !!channelDef['sort']);
    }
    function isPositionFieldDef(channelDef) {
        return (!!channelDef &&
            (!!channelDef['axis'] || !!channelDef['stack'] || !!channelDef['impute'] || channelDef['band'] !== undefined));
    }
    function isMarkPropFieldDef(channelDef) {
        return !!channelDef && !!channelDef['legend'];
    }
    function isTextFieldDef(channelDef) {
        return !!channelDef && !!channelDef['format'];
    }
    function isOpFieldDef(fieldDef) {
        return !!fieldDef['op'];
    }
    /**
     * Get a Vega field reference from a Vega-Lite field def.
     */
    function vgField(fieldDef, opt = {}) {
        var _a, _b, _c;
        let field = fieldDef.field;
        const prefix = opt.prefix;
        let suffix = opt.suffix;
        let argAccessor = ''; // for accessing argmin/argmax field at the end without getting escaped
        if (isCount(fieldDef)) {
            field = internalField('count');
        }
        else {
            let fn;
            if (!opt.nofn) {
                if (isOpFieldDef(fieldDef)) {
                    fn = fieldDef.op;
                }
                else {
                    const { bin, aggregate, timeUnit } = fieldDef;
                    if (isBinning(bin)) {
                        fn = binToString(bin);
                        suffix = (_a = opt.binSuffix, (_a !== null && _a !== void 0 ? _a : '')) + (_b = opt.suffix, (_b !== null && _b !== void 0 ? _b : ''));
                    }
                    else if (aggregate) {
                        if (isArgmaxDef(aggregate)) {
                            argAccessor = `.${field}`;
                            field = `argmax_${aggregate.argmax}`;
                        }
                        else if (isArgminDef(aggregate)) {
                            argAccessor = `.${field}`;
                            field = `argmin_${aggregate.argmin}`;
                        }
                        else {
                            fn = String(aggregate);
                        }
                    }
                    else if (timeUnit) {
                        fn = timeUnitToString(timeUnit);
                        suffix = ((!contains(['range', 'mid'], opt.binSuffix) && opt.binSuffix) || '') + (_c = opt.suffix, (_c !== null && _c !== void 0 ? _c : ''));
                    }
                }
            }
            if (fn) {
                field = field ? `${fn}_${field}` : fn;
            }
        }
        if (suffix) {
            field = `${field}_${suffix}`;
        }
        if (prefix) {
            field = `${prefix}_${field}`;
        }
        if (opt.forAs) {
            return field;
        }
        else if (opt.expr) {
            // Expression to access flattened field. No need to escape dots.
            return flatAccessWithDatum(field, opt.expr) + argAccessor;
        }
        else {
            // We flattened all fields so paths should have become dot.
            return replacePathInField(field) + argAccessor;
        }
    }
    function isDiscrete(fieldDef) {
        switch (fieldDef.type) {
            case 'nominal':
            case 'ordinal':
            case 'geojson':
                return true;
            case 'quantitative':
                return !!fieldDef.bin;
            case 'temporal':
                return false;
        }
        throw new Error(message.invalidFieldType(fieldDef.type));
    }
    function isContinuous(fieldDef) {
        return !isDiscrete(fieldDef);
    }
    function isCount(fieldDef) {
        return fieldDef.aggregate === 'count';
    }
    function verbalTitleFormatter(fieldDef, config) {
        var _a;
        const { field, bin, timeUnit, aggregate } = fieldDef;
        if (aggregate === 'count') {
            return config.countTitle;
        }
        else if (isBinning(bin)) {
            return `${field} (binned)`;
        }
        else if (timeUnit) {
            const unit = (_a = normalizeTimeUnit(timeUnit)) === null || _a === void 0 ? void 0 : _a.unit;
            if (unit) {
                return `${field} (${getTimeUnitParts(unit).join('-')})`;
            }
        }
        else if (aggregate) {
            if (isArgmaxDef(aggregate)) {
                return `${field} for max ${aggregate.argmax}`;
            }
            else if (isArgminDef(aggregate)) {
                return `${field} for min ${aggregate.argmin}`;
            }
            else {
                return `${titlecase(aggregate)} of ${field}`;
            }
        }
        return field;
    }
    function functionalTitleFormatter(fieldDef) {
        var _a, _b;
        const { aggregate, bin, timeUnit, field } = fieldDef;
        if (isArgmaxDef(aggregate)) {
            return `${field} for argmax(${aggregate.argmax})`;
        }
        else if (isArgminDef(aggregate)) {
            return `${field} for argmin(${aggregate.argmin})`;
        }
        const timeUnitParams = normalizeTimeUnit(timeUnit);
        const fn = aggregate || ((_a = timeUnitParams) === null || _a === void 0 ? void 0 : _a.unit) || (((_b = timeUnitParams) === null || _b === void 0 ? void 0 : _b.maxbins) && 'timeunit') || (isBinning(bin) && 'bin');
        if (fn) {
            return fn.toUpperCase() + '(' + field + ')';
        }
        else {
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
    function title(fieldDef, config, { allowDisabling, includeDefault = true }) {
        var _a, _b;
        const guide = (_a = getGuide(fieldDef), (_a !== null && _a !== void 0 ? _a : {}));
        const guideTitle = guide.title;
        const def = includeDefault ? defaultTitle(fieldDef, config) : undefined;
        if (allowDisabling) {
            return getFirstDefined(guideTitle, fieldDef.title, def);
        }
        else {
            return _b = (guideTitle !== null && guideTitle !== void 0 ? guideTitle : fieldDef.title), (_b !== null && _b !== void 0 ? _b : def);
        }
    }
    function getGuide(fieldDef) {
        if (isPositionFieldDef(fieldDef) && fieldDef.axis) {
            return fieldDef.axis;
        }
        else if (isMarkPropFieldDef(fieldDef) && fieldDef.legend) {
            return fieldDef.legend;
        }
        else if (isFacetFieldDef(fieldDef) && fieldDef.header) {
            return fieldDef.header;
        }
        return undefined;
    }
    function defaultTitle(fieldDef, config) {
        return titleFormatter(fieldDef, config);
    }
    function format$1(fieldDef) {
        var _a;
        if (isTextFieldDef(fieldDef) && fieldDef.format) {
            return fieldDef.format;
        }
        else {
            const guide = (_a = getGuide(fieldDef), (_a !== null && _a !== void 0 ? _a : {}));
            return guide.format;
        }
    }
    function defaultType(fieldDef, channel) {
        if (fieldDef.timeUnit) {
            return 'temporal';
        }
        if (isBinning(fieldDef.bin)) {
            return 'quantitative';
        }
        switch (rangeType(channel)) {
            case 'continuous':
                return 'quantitative';
            case 'discrete':
                return 'nominal';
            case 'flexible': // color
                return 'nominal';
            default:
                return 'quantitative';
        }
    }
    /**
     * Returns the fieldDef -- either from the outer channelDef or from the condition of channelDef.
     * @param channelDef
     */
    function getFieldDef(channelDef) {
        if (isFieldDef(channelDef)) {
            return channelDef;
        }
        else if (hasConditionalFieldDef(channelDef)) {
            return channelDef.condition;
        }
        return undefined;
    }
    function getTypedFieldDef(channelDef) {
        if (isFieldDef(channelDef)) {
            return channelDef;
        }
        else if (hasConditionalFieldDef(channelDef)) {
            return channelDef.condition;
        }
        return undefined;
    }
    /**
     * Convert type to full, lowercase type, or augment the fieldDef with a default type if missing.
     */
    function normalize$1(channelDef, channel) {
        if (isString(channelDef) || isNumber(channelDef) || isBoolean(channelDef)) {
            const primitiveType = isString(channelDef) ? 'string' : isNumber(channelDef) ? 'number' : 'boolean';
            warn(message.primitiveChannelDef(channel, primitiveType, channelDef));
            return { value: channelDef };
        }
        // If a fieldDef contains a field, we need type.
        if (isFieldDef(channelDef)) {
            return normalizeFieldDef(channelDef, channel);
        }
        else if (hasConditionalFieldDef(channelDef)) {
            return Object.assign(Object.assign({}, channelDef), { 
                // Need to cast as normalizeFieldDef normally return FieldDef, but here we know that it is definitely Condition<FieldDef>
                condition: normalizeFieldDef(channelDef.condition, channel) });
        }
        return channelDef;
    }
    function normalizeFieldDef(fd, channel) {
        const { aggregate, timeUnit, bin, field } = fd;
        const fieldDef = Object.assign({}, fd);
        // Drop invalid aggregate
        if (aggregate && !isAggregateOp(aggregate) && !isArgmaxDef(aggregate) && !isArgminDef(aggregate)) {
            warn(message.invalidAggregate(aggregate));
            delete fieldDef.aggregate;
        }
        // Normalize Time Unit
        if (timeUnit) {
            fieldDef.timeUnit = normalizeTimeUnit(timeUnit);
        }
        if (field) {
            fieldDef.field = `${field}`;
        }
        // Normalize bin
        if (isBinning(bin)) {
            fieldDef.bin = normalizeBin(bin, channel);
        }
        if (isBinned(bin) && !contains(POSITION_SCALE_CHANNELS, channel)) {
            warn(`Channel ${channel} should not be used with "binned" bin.`);
        }
        // Normalize Type
        if (isTypedFieldDef(fieldDef)) {
            const { type } = fieldDef;
            const fullType = getFullName(type);
            if (type !== fullType) {
                // convert short type to full type
                fieldDef.type = fullType;
            }
            if (type !== 'quantitative') {
                if (isCountingAggregateOp(aggregate)) {
                    warn(message.invalidFieldTypeForCountAggregate(type, aggregate));
                    fieldDef.type = 'quantitative';
                }
            }
        }
        else if (!isSecondaryRangeChannel(channel)) {
            // If type is empty / invalid, then augment with default type
            const newType = defaultType(fieldDef, channel);
            warn(message.missingFieldType(channel, newType));
            fieldDef['type'] = newType;
        }
        if (isTypedFieldDef(fieldDef)) {
            const { compatible, warning } = channelCompatibility(fieldDef, channel);
            if (!compatible) {
                warn(warning);
            }
        }
        if (isSortableFieldDef(fieldDef) && isString(fieldDef.sort)) {
            const { sort } = fieldDef;
            if (isSortByChannel(sort)) {
                return Object.assign(Object.assign({}, fieldDef), { sort: { encoding: sort } });
            }
            const sub = sort.substr(1);
            if (sort.charAt(0) === '-' && isSortByChannel(sub)) {
                return Object.assign(Object.assign({}, fieldDef), { sort: { encoding: sub, order: 'descending' } });
            }
        }
        return fieldDef;
    }
    function normalizeBin(bin, channel) {
        if (isBoolean(bin)) {
            return { maxbins: autoMaxBins(channel) };
        }
        else if (bin === 'binned') {
            return {
                binned: true
            };
        }
        else if (!bin.maxbins && !bin.step) {
            return Object.assign(Object.assign({}, bin), { maxbins: autoMaxBins(channel) });
        }
        else {
            return bin;
        }
    }
    const COMPATIBLE = { compatible: true };
    function channelCompatibility(fieldDef, channel) {
        const type = fieldDef.type;
        if (type === 'geojson' && channel !== 'shape') {
            return {
                compatible: false,
                warning: `Channel ${channel} should not be used with a geojson data.`
            };
        }
        switch (channel) {
            case 'row':
            case 'column':
            case 'facet':
                if (isContinuous(fieldDef)) {
                    return {
                        compatible: false,
                        warning: message.facetChannelShouldBeDiscrete(channel)
                    };
                }
                return COMPATIBLE;
            case 'x':
            case 'y':
            case 'color':
            case 'fill':
            case 'stroke':
            case 'text':
            case 'detail':
            case 'key':
            case 'tooltip':
            case 'href':
            case 'url':
                return COMPATIBLE;
            case 'longitude':
            case 'longitude2':
            case 'latitude':
            case 'latitude2':
                if (type !== QUANTITATIVE) {
                    return {
                        compatible: false,
                        warning: `Channel ${channel} should be used with a quantitative field only, not ${fieldDef.type} field.`
                    };
                }
                return COMPATIBLE;
            case 'opacity':
            case 'fillOpacity':
            case 'strokeOpacity':
            case 'strokeWidth':
            case 'size':
            case 'x2':
            case 'y2':
                if (type === 'nominal' && !fieldDef['sort']) {
                    return {
                        compatible: false,
                        warning: `Channel ${channel} should not be used with an unsorted discrete field.`
                    };
                }
                return COMPATIBLE;
            case 'strokeDash':
                if (!contains(['ordinal', 'nominal'], fieldDef.type)) {
                    return {
                        compatible: false,
                        warning: 'StrokeDash channel should be used with only discrete data.'
                    };
                }
                return COMPATIBLE;
            case 'shape':
                if (!contains(['ordinal', 'nominal', 'geojson'], fieldDef.type)) {
                    return {
                        compatible: false,
                        warning: 'Shape channel should be used with only either discrete or geojson data.'
                    };
                }
                return COMPATIBLE;
            case 'order':
                if (fieldDef.type === 'nominal' && !('sort' in fieldDef)) {
                    return {
                        compatible: false,
                        warning: `Channel order is inappropriate for nominal field, which has no inherent order.`
                    };
                }
                return COMPATIBLE;
        }
    }
    /**
     * Check if the field def uses a time format or does not use any format but is temporal
     * (this does not cover field defs that are temporal but use a number format).
     */
    function isTimeFormatFieldDef(fieldDef) {
        const guide = getGuide(fieldDef);
        const formatType = (guide && guide.formatType) || (isTextFieldDef(fieldDef) && fieldDef.formatType);
        return formatType === 'time' || (!formatType && isTimeFieldDef(fieldDef));
    }
    /**
     * Check if field def has tye `temporal`. If you want to also cover field defs that use a time format, use `isTimeFormatFieldDef`.
     */
    function isTimeFieldDef(fieldDef) {
        return fieldDef.type === 'temporal' || !!fieldDef.timeUnit;
    }
    /**
     * Getting a value associated with a fielddef.
     * Convert the value to Vega expression if applicable (for datetime object, or string if the field def is temporal or has timeUnit)
     */
    function valueExpr(v, { timeUnit, type, time, undefinedIfExprNotRequired }) {
        var _a;
        const unit = (_a = normalizeTimeUnit(timeUnit)) === null || _a === void 0 ? void 0 : _a.unit;
        let expr;
        if (isSignalRef(v)) {
            expr = v.signal;
        }
        else if (isDateTime(v)) {
            expr = dateTimeToExpr(v);
        }
        else if (isString(v) || isNumber(v)) {
            if (unit || type === 'temporal') {
                if (isLocalSingleTimeUnit(unit)) {
                    expr = dateTimeToExpr({ [unit]: v });
                }
                else {
                    expr = `datetime(${JSON.stringify(v)})`;
                }
            }
        }
        if (expr) {
            return time ? `time(${expr})` : expr;
        }
        // number or boolean or normal string
        return undefinedIfExprNotRequired ? undefined : JSON.stringify(v);
    }
    /**
     * Standardize value array -- convert each value to Vega expression if applicable
     */
    function valueArray(fieldDef, values) {
        var _a;
        const { type } = fieldDef;
        const timeUnit = (_a = normalizeTimeUnit(fieldDef.timeUnit)) === null || _a === void 0 ? void 0 : _a.unit;
        return values.map(v => {
            const expr = valueExpr(v, { timeUnit, type, undefinedIfExprNotRequired: true });
            // return signal for the expression if we need an expression
            if (expr !== undefined) {
                return { signal: expr };
            }
            // otherwise just return the original value
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
        }
        // We need the range only when the user explicitly forces a binned field to be use discrete scale. In this case, bin range is used in axis and legend labels.
        // We could check whether the axis or legend exists (not disabled) but that seems overkill.
        return isScaleChannel(channel) && contains(['ordinal', 'nominal'], fieldDef.type);
    }

    /**
     * Create a key for the bin configuration. Not for prebinned bin.
     */
    function binToString(bin) {
        if (isBoolean(bin)) {
            bin = normalizeBin(bin, undefined);
        }
        return ('bin' +
            keys(bin)
                .map(p => (isSelectionExtent(bin[p]) ? varName(`_${p}_${Object.entries(bin[p])}`) : varName(`_${p}_${bin[p]}`)))
                .join(''));
    }
    /**
     * Vega-Lite should bin the data.
     */
    function isBinning(bin) {
        return bin === true || (isBinParams(bin) && !bin.binned);
    }
    /**
     * The data is already binned and so Vega-Lite should not bin it again.
     */
    function isBinned(bin) {
        return bin === 'binned' || (isBinParams(bin) && bin.binned === true);
    }
    function isBinParams(bin) {
        return isObject(bin);
    }
    function isSelectionExtent(extent) {
        var _a;
        return (_a = extent) === null || _a === void 0 ? void 0 : _a['selection'];
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
            case STROKEOPACITY:
            // Facets and Size shouldn't have too many bins
            // We choose 6 like shape to simplify the rule [falls through]
            case SHAPE:
                return 6; // Vega's "shape" has 6 distinct values
            case STROKEDASH:
                return 4; // We only provide 5 different stroke dash values (but 4 is more effective)
            default:
                return 10;
        }
    }

    function channelHasField(encoding, channel) {
        const channelDef = encoding && encoding[channel];
        if (channelDef) {
            if (isArray(channelDef)) {
                return some(channelDef, fieldDef => !!fieldDef.field);
            }
            else {
                return isFieldDef(channelDef) || hasConditionalFieldDef(channelDef);
            }
        }
        return false;
    }
    function isAggregate(encoding) {
        return some(CHANNELS, channel => {
            if (channelHasField(encoding, channel)) {
                const channelDef = encoding[channel];
                if (isArray(channelDef)) {
                    return some(channelDef, fieldDef => !!fieldDef.aggregate);
                }
                else {
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
                const { field, aggregate: aggOp, bin, timeUnit } = channelDef, remaining = __rest(channelDef, ["field", "aggregate", "bin", "timeUnit"]);
                if (aggOp || timeUnit || bin) {
                    const guide = getGuide(channelDef);
                    const isTitleDefined = guide && guide.title;
                    let newField = vgField(channelDef, { forAs: true });
                    const newFieldDef = Object.assign(Object.assign(Object.assign({}, (isTitleDefined ? [] : { title: title(channelDef, config, { allowDisabling: true }) })), remaining), { 
                        // Always overwrite field
                        field: newField });
                    const isPositionChannel = channel === 'x' || channel === 'y';
                    if (aggOp) {
                        let op;
                        if (isArgmaxDef(aggOp)) {
                            op = 'argmax';
                            newField = vgField({ op: 'argmax', field: aggOp.argmax }, { forAs: true });
                            newFieldDef.field = `${newField}.${field}`;
                        }
                        else if (isArgminDef(aggOp)) {
                            op = 'argmin';
                            newField = vgField({ op: 'argmin', field: aggOp.argmin }, { forAs: true });
                            newFieldDef.field = `${newField}.${field}`;
                        }
                        else if (aggOp !== 'boxplot' && aggOp !== 'errorbar' && aggOp !== 'errorband') {
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
                    }
                    else {
                        groupby.push(newField);
                        if (isTypedFieldDef(channelDef) && isBinning(bin)) {
                            bins.push({ bin, field, as: newField });
                            // Add additional groupbys for range and end of bins
                            groupby.push(vgField(channelDef, { binSuffix: 'end' }));
                            if (binRequiresRange(channelDef, channel)) {
                                groupby.push(vgField(channelDef, { binSuffix: 'range' }));
                            }
                            // Create accompanying 'x2' or 'y2' field if channel is 'x' or 'y' respectively
                            if (isPositionChannel) {
                                const secondaryChannel = {
                                    field: newField + '_end'
                                };
                                encoding[channel + '2'] = secondaryChannel;
                            }
                            newFieldDef.bin = 'binned';
                            if (!isSecondaryRangeChannel(channel)) {
                                newFieldDef['type'] = 'quantitative';
                            }
                        }
                        else if (timeUnit) {
                            timeUnits.push({
                                timeUnit,
                                field,
                                as: newField
                            });
                            // define the format type for later compilation
                            const formatType = isTypedFieldDef(channelDef) && channelDef.type !== TEMPORAL && 'time';
                            if (formatType) {
                                if (channel === 'text' || channel === 'tooltip') {
                                    newFieldDef['formatType'] = formatType;
                                }
                                else if (isNonPositionScaleChannel(channel)) {
                                    newFieldDef['legend'] = Object.assign({ formatType }, newFieldDef['legend']);
                                }
                                else if (isPositionChannel) {
                                    newFieldDef['axis'] = Object.assign({ formatType }, newFieldDef['axis']);
                                }
                            }
                        }
                    }
                    // now the field should refer to post-transformed field instead
                    encoding[channel] = newFieldDef;
                }
                else {
                    groupby.push(field);
                    encoding[channel] = oldEncoding[channel];
                }
            }
            else {
                // For value def, just copy
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
        }
        else if (markSupported === 'binned') {
            const primaryFieldDef = encoding[channel === 'x2' ? 'x' : 'y'];
            // circle, point, square and tick only support x2/y2 when their corresponding x/y fieldDef
            // has "binned" data and thus need x2/y2 to specify the bin-end field.
            if (isFieldDef(primaryFieldDef) && isFieldDef(encoding[channel]) && isBinned(primaryFieldDef.bin)) {
                return true;
            }
            else {
                return false;
            }
        }
        return true;
    }
    function normalizeEncoding(encoding, markDef) {
        const mark = markDef.type;
        return keys(encoding).reduce((normalizedEncoding, channel) => {
            var _a;
            if (!isChannel(channel)) {
                // Drop invalid channel
                warn(message.invalidEncodingChannel(channel));
                return normalizedEncoding;
            }
            if (!markChannelCompatible(encoding, channel, mark)) {
                // Drop unsupported channel
                warn(message.incompatibleChannel(channel, mark));
                return normalizedEncoding;
            }
            // Drop line's size if the field is aggregated.
            if (channel === 'size' && mark === 'line') {
                const fieldDef = getTypedFieldDef(encoding[channel]);
                if ((_a = fieldDef) === null || _a === void 0 ? void 0 : _a.aggregate) {
                    warn(message.LINE_WITH_VARYING_SIZE);
                    return normalizedEncoding;
                }
            }
            // Drop color if either fill or stroke is specified
            if (channel === 'color' && (markDef.filled ? 'fill' in encoding : 'stroke' in encoding)) {
                warn(message.droppingColor('encoding', { fill: 'fill' in encoding, stroke: 'stroke' in encoding }));
                return normalizedEncoding;
            }
            const channelDef = encoding[channel];
            if (channel === 'detail' ||
                (channel === 'order' && !isArray(channelDef) && !isValueDef(channelDef)) ||
                (channel === 'tooltip' && isArray(channelDef))) {
                if (channelDef) {
                    // Array of fieldDefs for detail channel (or production rule)
                    normalizedEncoding[channel] = array(channelDef).reduce((defs, fieldDef) => {
                        if (!isFieldDef(fieldDef)) {
                            warn(message.emptyFieldDef(fieldDef, channel));
                        }
                        else {
                            defs.push(normalizeFieldDef(fieldDef, channel));
                        }
                        return defs;
                    }, []);
                }
            }
            else {
                if (channel === 'tooltip' && channelDef === null) {
                    // Preserve null so we can use it to disable tooltip
                    normalizedEncoding[channel] = null;
                }
                else if (!isFieldDef(channelDef) &&
                    !isValueDef(channelDef) &&
                    !isConditionalDef(channelDef) &&
                    !isSignalRef(channelDef)) {
                    warn(message.emptyFieldDef(channelDef, channel));
                    return normalizedEncoding;
                }
                normalizedEncoding[channel] = normalize$1(channelDef, channel);
            }
            return normalizedEncoding;
        }, {});
    }
    function fieldDefs(encoding) {
        const arr = [];
        for (const channel of keys(encoding)) {
            if (channelHasField(encoding, channel)) {
                const channelDef = encoding[channel];
                const channelDefArray = array(channelDef);
                for (const def of channelDefArray) {
                    if (isFieldDef(def)) {
                        arr.push(def);
                    }
                    else if (hasConditionalFieldDef(def)) {
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
            if (isArray(el)) {
                el.forEach((channelDef) => {
                    f.call(thisArg, channelDef, channel);
                });
            }
            else {
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
            if (isArray(map)) {
                return map.reduce((r1, channelDef) => {
                    return f.call(thisArg, r1, channelDef, channel);
                }, r);
            }
            else {
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
                // x, y, x2, y2, lat, long, lat1, long2, order, tooltip, href, cursor should not cause lines to group
                case 'x':
                case 'y':
                case 'href':
                case 'url':
                case 'x2':
                case 'y2':
                // falls through
                case 'latitude':
                case 'longitude':
                case 'latitude2':
                case 'longitude2':
                // TODO: case 'cursor':
                // text, shape, shouldn't be a part of line/trail/area [falls through]
                case 'text':
                case 'shape':
                // falls through
                // tooltip fields should not be added to group by [falls through]
                case 'tooltip':
                    return details;
                case 'order':
                    // order should not group line / trail
                    if (mark === 'line' || mark === 'trail') {
                        return details;
                    }
                // but order should group area for stacking (falls through)
                case 'detail':
                case 'key': {
                    const channelDef = encoding[channel];
                    if (isArray(channelDef) || isFieldDef(channelDef)) {
                        array(channelDef).forEach(fieldDef => {
                            if (!fieldDef.aggregate) {
                                details.push(vgField(fieldDef, {}));
                            }
                        });
                    }
                    return details;
                }
                case 'size':
                    if (mark === 'trail') {
                        // For trail, size should not group trail lines.
                        return details;
                    }
                // For line, size should group lines.
                // falls through
                case 'color':
                case 'fill':
                case 'stroke':
                case 'opacity':
                case 'fillOpacity':
                case 'strokeOpacity':
                case 'strokeDash':
                case 'strokeWidth': {
                    // TODO strokeDashOffset:
                    // falls through
                    const fieldDef = getTypedFieldDef(encoding[channel]);
                    if (fieldDef && !fieldDef.aggregate) {
                        details.push(vgField(fieldDef, {}));
                    }
                    return details;
                }
            }
        }, []);
    }

    function filterTooltipWithAggregatedField(oldEncoding) {
        const { tooltip } = oldEncoding, filteredEncoding = __rest(oldEncoding, ["tooltip"]);
        if (!tooltip) {
            return { filteredEncoding: oldEncoding };
        }
        let customTooltipWithAggregatedField;
        let customTooltipWithoutAggregatedField;
        if (isArray(tooltip)) {
            tooltip.forEach((t) => {
                if (t.aggregate) {
                    if (!customTooltipWithAggregatedField) {
                        customTooltipWithAggregatedField = [];
                    }
                    customTooltipWithAggregatedField.push(t);
                }
                else {
                    if (!customTooltipWithoutAggregatedField) {
                        customTooltipWithoutAggregatedField = [];
                    }
                    customTooltipWithoutAggregatedField.push(t);
                }
            });
            if (customTooltipWithAggregatedField) {
                filteredEncoding.tooltip = customTooltipWithAggregatedField;
            }
        }
        else {
            if (tooltip['aggregate']) {
                filteredEncoding.tooltip = tooltip;
            }
            else {
                customTooltipWithoutAggregatedField = tooltip;
            }
        }
        if (isArray(customTooltipWithoutAggregatedField) && customTooltipWithoutAggregatedField.length === 1) {
            customTooltipWithoutAggregatedField = customTooltipWithoutAggregatedField[0];
        }
        return { customTooltipWithoutAggregatedField, filteredEncoding };
    }
    function getCompositeMarkTooltip(tooltipSummary, continuousAxisChannelDef, encodingWithoutContinuousAxis, withFieldName = true) {
        if ('tooltip' in encodingWithoutContinuousAxis) {
            return { tooltip: encodingWithoutContinuousAxis.tooltip };
        }
        const fiveSummaryTooltip = tooltipSummary.map(({ fieldPrefix, titlePrefix }) => {
            const mainTitle = withFieldName ? ` of ${continuousAxisChannelDef.field}` : '';
            return {
                field: fieldPrefix + continuousAxisChannelDef.field,
                type: continuousAxisChannelDef.type,
                title: isSignalRef(titlePrefix) ? { signal: titlePrefix + `"${escape(mainTitle)}"` } : titlePrefix + mainTitle
            };
        });
        return {
            tooltip: [
                ...fiveSummaryTooltip,
                // need to cast because TextFieldDef supports fewer types of bin
                ...fieldDefs(encodingWithoutContinuousAxis)
            ]
        };
    }
    function getTitle(continuousAxisChannelDef) {
        const { axis, title, field } = continuousAxisChannelDef;
        return axis && axis.title !== undefined ? undefined : getFirstDefined(title, field);
    }
    function makeCompositeAggregatePartFactory(compositeMarkDef, continuousAxis, continuousAxisChannelDef, sharedEncoding, compositeMarkConfig) {
        const { scale, axis } = continuousAxisChannelDef;
        return ({ partName, mark, positionPrefix, endPositionPrefix = undefined, extraEncoding = {} }) => {
            const title = getTitle(continuousAxisChannelDef);
            return partLayerMixins(compositeMarkDef, partName, compositeMarkConfig, {
                mark,
                encoding: Object.assign(Object.assign(Object.assign({ [continuousAxis]: Object.assign(Object.assign(Object.assign({ field: positionPrefix + '_' + continuousAxisChannelDef.field, type: continuousAxisChannelDef.type }, (title !== undefined ? { title } : {})), (scale !== undefined ? { scale } : {})), (axis !== undefined ? { axis } : {})) }, (isString(endPositionPrefix)
                    ? {
                        [continuousAxis + '2']: {
                            field: endPositionPrefix + '_' + continuousAxisChannelDef.field
                        }
                    }
                    : {})), sharedEncoding), extraEncoding)
            });
        };
    }
    function partLayerMixins(markDef, part, compositeMarkConfig, partBaseSpec) {
        const { clip, color, opacity } = markDef;
        const mark = markDef.type;
        if (markDef[part] || (markDef[part] === undefined && compositeMarkConfig[part])) {
            return [
                Object.assign(Object.assign({}, partBaseSpec), { mark: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, compositeMarkConfig[part]), (clip ? { clip } : {})), (color ? { color } : {})), (opacity ? { opacity } : {})), (isMarkDef(partBaseSpec.mark) ? partBaseSpec.mark : { type: partBaseSpec.mark })), { style: `${mark}-${part}` }), (isBoolean(markDef[part]) ? {} : markDef[part])) })
            ];
        }
        return [];
    }
    function compositeMarkContinuousAxis(spec, orient, compositeMark) {
        const { encoding } = spec;
        const continuousAxis = orient === 'vertical' ? 'y' : 'x';
        const continuousAxisChannelDef = encoding[continuousAxis]; // Safe to cast because if x is not continuous fielddef, the orient would not be horizontal.
        const continuousAxisChannelDef2 = encoding[continuousAxis + '2'];
        const continuousAxisChannelDefError = encoding[continuousAxis + 'Error'];
        const continuousAxisChannelDefError2 = encoding[continuousAxis + 'Error2'];
        return {
            continuousAxisChannelDef: filterAggregateFromChannelDef(continuousAxisChannelDef, compositeMark),
            continuousAxisChannelDef2: filterAggregateFromChannelDef(continuousAxisChannelDef2, compositeMark),
            continuousAxisChannelDefError: filterAggregateFromChannelDef(continuousAxisChannelDefError, compositeMark),
            continuousAxisChannelDefError2: filterAggregateFromChannelDef(continuousAxisChannelDefError2, compositeMark),
            continuousAxis
        };
    }
    function filterAggregateFromChannelDef(continuousAxisChannelDef, compositeMark) {
        if (continuousAxisChannelDef && continuousAxisChannelDef.aggregate) {
            const { aggregate } = continuousAxisChannelDef, continuousAxisWithoutAggregate = __rest(continuousAxisChannelDef, ["aggregate"]);
            if (aggregate !== compositeMark) {
                warn(message.errorBarContinuousAxisHasCustomizedAggregate(aggregate, compositeMark));
            }
            return continuousAxisWithoutAggregate;
        }
        else {
            return continuousAxisChannelDef;
        }
    }
    function compositeMarkOrient(spec, compositeMark) {
        const { mark, encoding } = spec;
        if (isFieldDef(encoding.x) && isContinuous(encoding.x)) {
            // x is continuous
            if (isFieldDef(encoding.y) && isContinuous(encoding.y)) {
                // both x and y are continuous
                if (encoding.x.aggregate === undefined && encoding.y.aggregate === compositeMark) {
                    return 'vertical';
                }
                else if (encoding.y.aggregate === undefined && encoding.x.aggregate === compositeMark) {
                    return 'horizontal';
                }
                else if (encoding.x.aggregate === compositeMark && encoding.y.aggregate === compositeMark) {
                    throw new Error('Both x and y cannot have aggregate');
                }
                else {
                    if (isMarkDef(mark) && mark.orient) {
                        return mark.orient;
                    }
                    // default orientation = vertical
                    return 'vertical';
                }
            }
            // x is continuous but y is not
            return 'horizontal';
        }
        else if (isFieldDef(encoding.y) && isContinuous(encoding.y)) {
            // y is continuous but x is not
            return 'vertical';
        }
        else {
            // Neither x nor y is continuous.
            throw new Error('Need a valid continuous axis for ' + compositeMark + 's');
        }
    }

    const BOXPLOT = 'boxplot';
    const BOXPLOT_PART_INDEX = {
        box: 1,
        median: 1,
        outliers: 1,
        rule: 1,
        ticks: 1
    };
    const BOXPLOT_PARTS = keys(BOXPLOT_PART_INDEX);
    const boxPlotNormalizer = new CompositeMarkNormalizer(BOXPLOT, normalizeBoxPlot);
    function getBoxPlotType(extent) {
        if (isNumber(extent)) {
            return 'tukey';
        }
        // Ham: If we ever want to, we could add another extent syntax `{kIQR: number}` for the original [Q1-k*IQR, Q3+k*IQR] whisker and call this boxPlotType = `kIQR`. However, I'm not exposing this for now.
        return extent;
    }
    function normalizeBoxPlot(spec, { config }) {
        var _a, _b;
        // TODO: use selection
        const { mark, encoding: _encoding, selection, projection: _p } = spec, outerSpec = __rest(spec, ["mark", "encoding", "selection", "projection"]);
        const markDef = isMarkDef(mark) ? mark : { type: mark };
        // TODO(https://github.com/vega/vega-lite/issues/3702): add selection support
        if (selection) {
            warn(message.selectionNotSupported('boxplot'));
        }
        const extent = (_a = markDef.extent, (_a !== null && _a !== void 0 ? _a : config.boxplot.extent));
        const sizeValue = getFirstDefined(markDef.size, config.boxplot.size);
        const boxPlotType = getBoxPlotType(extent);
        const { transform, continuousAxisChannelDef, continuousAxis, groupby, aggregate, encodingWithoutContinuousAxis, ticksOrient, boxOrient, customTooltipWithoutAggregatedField } = boxParams(spec, extent, config);
        const { color, size } = encodingWithoutContinuousAxis, encodingWithoutSizeColorAndContinuousAxis = __rest(encodingWithoutContinuousAxis, ["color", "size"]);
        const makeBoxPlotPart = (sharedEncoding) => {
            return makeCompositeAggregatePartFactory(markDef, continuousAxis, continuousAxisChannelDef, sharedEncoding, config.boxplot);
        };
        const makeBoxPlotExtent = makeBoxPlotPart(encodingWithoutSizeColorAndContinuousAxis);
        const makeBoxPlotBox = makeBoxPlotPart(encodingWithoutContinuousAxis);
        const makeBoxPlotMidTick = makeBoxPlotPart(Object.assign(Object.assign({}, encodingWithoutSizeColorAndContinuousAxis), (size ? { size } : {})));
        const fiveSummaryTooltipEncoding = getCompositeMarkTooltip([
            { fieldPrefix: boxPlotType === 'min-max' ? 'upper_whisker_' : 'max_', titlePrefix: 'Max' },
            { fieldPrefix: 'upper_box_', titlePrefix: 'Q3' },
            { fieldPrefix: 'mid_box_', titlePrefix: 'Median' },
            { fieldPrefix: 'lower_box_', titlePrefix: 'Q1' },
            { fieldPrefix: boxPlotType === 'min-max' ? 'lower_whisker_' : 'min_', titlePrefix: 'Min' }
        ], continuousAxisChannelDef, encodingWithoutContinuousAxis);
        // ## Whisker Layers
        const endTick = { type: 'tick', color: 'black', opacity: 1, orient: ticksOrient, invalid: null };
        const whiskerTooltipEncoding = boxPlotType === 'min-max'
            ? fiveSummaryTooltipEncoding // for min-max, show five-summary tooltip for whisker
            : // for tukey / k-IQR, just show upper/lower-whisker
                getCompositeMarkTooltip([
                    { fieldPrefix: 'upper_whisker_', titlePrefix: 'Upper Whisker' },
                    { fieldPrefix: 'lower_whisker_', titlePrefix: 'Lower Whisker' }
                ], continuousAxisChannelDef, encodingWithoutContinuousAxis);
        const whiskerLayers = [
            ...makeBoxPlotExtent({
                partName: 'rule',
                mark: { type: 'rule', invalid: null },
                positionPrefix: 'lower_whisker',
                endPositionPrefix: 'lower_box',
                extraEncoding: whiskerTooltipEncoding
            }),
            ...makeBoxPlotExtent({
                partName: 'rule',
                mark: { type: 'rule', invalid: null },
                positionPrefix: 'upper_box',
                endPositionPrefix: 'upper_whisker',
                extraEncoding: whiskerTooltipEncoding
            }),
            ...makeBoxPlotExtent({
                partName: 'ticks',
                mark: endTick,
                positionPrefix: 'lower_whisker',
                extraEncoding: whiskerTooltipEncoding
            }),
            ...makeBoxPlotExtent({
                partName: 'ticks',
                mark: endTick,
                positionPrefix: 'upper_whisker',
                extraEncoding: whiskerTooltipEncoding
            })
        ];
        // ## Box Layers
        // TODO: support hiding certain mark parts
        const boxLayers = [
            ...(boxPlotType !== 'tukey' ? whiskerLayers : []),
            ...makeBoxPlotBox({
                partName: 'box',
                mark: Object.assign(Object.assign({ type: 'bar' }, (sizeValue ? { size: sizeValue } : {})), { orient: boxOrient, invalid: null }),
                positionPrefix: 'lower_box',
                endPositionPrefix: 'upper_box',
                extraEncoding: fiveSummaryTooltipEncoding
            }),
            ...makeBoxPlotMidTick({
                partName: 'median',
                mark: Object.assign(Object.assign(Object.assign({ type: 'tick', invalid: null }, (isObject(config.boxplot.median) && config.boxplot.median.color ? { color: config.boxplot.median.color } : {})), (sizeValue ? { size: sizeValue } : {})), { orient: ticksOrient }),
                positionPrefix: 'mid_box',
                extraEncoding: fiveSummaryTooltipEncoding
            })
        ];
        // ## Filtered Layers
        let filteredLayersMixins;
        if (boxPlotType !== 'min-max') {
            const lowerBoxExpr = `datum["lower_box_${continuousAxisChannelDef.field}"]`;
            const upperBoxExpr = `datum["upper_box_${continuousAxisChannelDef.field}"]`;
            const iqrExpr = `(${upperBoxExpr} - ${lowerBoxExpr})`;
            const lowerWhiskerExpr = `${lowerBoxExpr} - ${extent} * ${iqrExpr}`;
            const upperWhiskerExpr = `${upperBoxExpr} + ${extent} * ${iqrExpr}`;
            const fieldExpr = `datum["${continuousAxisChannelDef.field}"]`;
            const joinaggregateTransform = {
                joinaggregate: boxParamsQuartiles(continuousAxisChannelDef.field),
                groupby
            };
            let filteredWhiskerSpec = undefined;
            if (boxPlotType === 'tukey') {
                filteredWhiskerSpec = {
                    transform: [
                        {
                            filter: `(${lowerWhiskerExpr} <= ${fieldExpr}) && (${fieldExpr} <= ${upperWhiskerExpr})`
                        },
                        {
                            aggregate: [
                                {
                                    op: 'min',
                                    field: continuousAxisChannelDef.field,
                                    as: 'lower_whisker_' + continuousAxisChannelDef.field
                                },
                                {
                                    op: 'max',
                                    field: continuousAxisChannelDef.field,
                                    as: 'upper_whisker_' + continuousAxisChannelDef.field
                                },
                                // preserve lower_box / upper_box
                                {
                                    op: 'min',
                                    field: 'lower_box_' + continuousAxisChannelDef.field,
                                    as: 'lower_box_' + continuousAxisChannelDef.field
                                },
                                {
                                    op: 'max',
                                    field: 'upper_box_' + continuousAxisChannelDef.field,
                                    as: 'upper_box_' + continuousAxisChannelDef.field
                                },
                                ...aggregate
                            ],
                            groupby
                        }
                    ],
                    layer: whiskerLayers
                };
            }
            const encodingWithoutSizeColorContinuousAxisAndTooltip = __rest(encodingWithoutSizeColorAndContinuousAxis, ["tooltip"]);
            const { scale, axis } = continuousAxisChannelDef;
            const title = getTitle(continuousAxisChannelDef);
            const outlierLayersMixins = partLayerMixins(markDef, 'outliers', config.boxplot, {
                transform: [{ filter: `(${fieldExpr} < ${lowerWhiskerExpr}) || (${fieldExpr} > ${upperWhiskerExpr})` }],
                mark: 'point',
                encoding: Object.assign(Object.assign({ [continuousAxis]: Object.assign(Object.assign(Object.assign({ field: continuousAxisChannelDef.field, type: continuousAxisChannelDef.type }, (title !== undefined ? { title } : {})), (scale !== undefined ? { scale } : {})), (axis !== undefined ? { axis } : {})) }, encodingWithoutSizeColorContinuousAxisAndTooltip), (customTooltipWithoutAggregatedField ? { tooltip: customTooltipWithoutAggregatedField } : {}))
            })[0];
            if (outlierLayersMixins && filteredWhiskerSpec) {
                filteredLayersMixins = {
                    transform: [joinaggregateTransform],
                    layer: [outlierLayersMixins, filteredWhiskerSpec]
                };
            }
            else if (outlierLayersMixins) {
                filteredLayersMixins = outlierLayersMixins;
                filteredLayersMixins.transform.unshift(joinaggregateTransform);
            }
            else if (filteredWhiskerSpec) {
                filteredLayersMixins = filteredWhiskerSpec;
                filteredLayersMixins.transform.unshift(joinaggregateTransform);
            }
        }
        if (filteredLayersMixins) {
            // tukey box plot with outliers included
            return Object.assign(Object.assign({}, outerSpec), { layer: [
                    filteredLayersMixins,
                    {
                        // boxplot
                        transform,
                        layer: boxLayers
                    }
                ] });
        }
        return Object.assign(Object.assign({}, outerSpec), { transform: (_b = outerSpec.transform, (_b !== null && _b !== void 0 ? _b : [])).concat(transform), layer: boxLayers });
    }
    function boxParamsQuartiles(continousAxisField) {
        return [
            {
                op: 'q1',
                field: continousAxisField,
                as: 'lower_box_' + continousAxisField
            },
            {
                op: 'q3',
                field: continousAxisField,
                as: 'upper_box_' + continousAxisField
            }
        ];
    }
    function boxParams(spec, extent, config) {
        const orient = compositeMarkOrient(spec, BOXPLOT);
        const { continuousAxisChannelDef, continuousAxis } = compositeMarkContinuousAxis(spec, orient, BOXPLOT);
        const continuousFieldName = continuousAxisChannelDef.field;
        const boxPlotType = getBoxPlotType(extent);
        const boxplotSpecificAggregate = [
            ...boxParamsQuartiles(continuousFieldName),
            {
                op: 'median',
                field: continuousFieldName,
                as: 'mid_box_' + continuousFieldName
            },
            {
                op: 'min',
                field: continuousFieldName,
                as: (boxPlotType === 'min-max' ? 'lower_whisker_' : 'min_') + continuousFieldName
            },
            {
                op: 'max',
                field: continuousFieldName,
                as: (boxPlotType === 'min-max' ? 'upper_whisker_' : 'max_') + continuousFieldName
            }
        ];
        const postAggregateCalculates = boxPlotType === 'min-max' || boxPlotType === 'tukey'
            ? []
            : [
                // This is for the  original k-IQR, which we do not expose
                {
                    calculate: `datum["upper_box_${continuousFieldName}"] - datum["lower_box_${continuousFieldName}"]`,
                    as: 'iqr_' + continuousFieldName
                },
                {
                    calculate: `min(datum["upper_box_${continuousFieldName}"] + datum["iqr_${continuousFieldName}"] * ${extent}, datum["max_${continuousFieldName}"])`,
                    as: 'upper_whisker_' + continuousFieldName
                },
                {
                    calculate: `max(datum["lower_box_${continuousFieldName}"] - datum["iqr_${continuousFieldName}"] * ${extent}, datum["min_${continuousFieldName}"])`,
                    as: 'lower_whisker_' + continuousFieldName
                }
            ];
        const _a = spec.encoding, _b = continuousAxis, oldContinuousAxisChannelDef = _a[_b], oldEncodingWithoutContinuousAxis = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
        const { customTooltipWithoutAggregatedField, filteredEncoding } = filterTooltipWithAggregatedField(oldEncodingWithoutContinuousAxis);
        const { bins, timeUnits, aggregate, groupby, encoding: encodingWithoutContinuousAxis } = extractTransformsFromEncoding(filteredEncoding, config);
        const ticksOrient = orient === 'vertical' ? 'horizontal' : 'vertical';
        const boxOrient = orient;
        const transform = [
            ...bins,
            ...timeUnits,
            {
                aggregate: [...aggregate, ...boxplotSpecificAggregate],
                groupby
            },
            ...postAggregateCalculates
        ];
        return {
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
    const ERRORBAR_PART_INDEX = {
        ticks: 1,
        rule: 1
    };
    const ERRORBAR_PARTS = keys(ERRORBAR_PART_INDEX);
    const errorBarNormalizer = new CompositeMarkNormalizer(ERRORBAR, normalizeErrorBar);
    function normalizeErrorBar(spec, { config }) {
        const { transform, continuousAxisChannelDef, continuousAxis, encodingWithoutContinuousAxis, ticksOrient, markDef, outerSpec, tooltipEncoding } = errorBarParams(spec, ERRORBAR, config);
        const makeErrorBarPart = makeCompositeAggregatePartFactory(markDef, continuousAxis, continuousAxisChannelDef, encodingWithoutContinuousAxis, config.errorbar);
        const tick = { type: 'tick', orient: ticksOrient };
        const layer = [
            ...makeErrorBarPart({
                partName: 'ticks',
                mark: tick,
                positionPrefix: 'lower',
                extraEncoding: tooltipEncoding
            }),
            ...makeErrorBarPart({
                partName: 'ticks',
                mark: tick,
                positionPrefix: 'upper',
                extraEncoding: tooltipEncoding
            }),
            ...makeErrorBarPart({
                partName: 'rule',
                mark: 'rule',
                positionPrefix: 'lower',
                endPositionPrefix: 'upper',
                extraEncoding: tooltipEncoding
            })
        ];
        return Object.assign(Object.assign(Object.assign({}, outerSpec), { transform }), (layer.length > 1 ? { layer } : Object.assign({}, layer[0])));
    }
    function errorBarOrientAndInputType(spec, compositeMark) {
        const { encoding } = spec;
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
                throw new Error(`${compositeMark} cannot be both type aggregated-upper-lower and aggregated-error`);
            }
            const x2 = encoding.x2;
            const y2 = encoding.y2;
            if (isFieldDef(x2) && isFieldDef(y2)) {
                // having both x, x2 and y, y2
                throw new Error(`${compositeMark} cannot have both x2 and y2`);
            }
            else if (isFieldDef(x2)) {
                if (isFieldDef(x) && isContinuous(x)) {
                    // having x, x2 quantitative and field y, y2 are not specified
                    return { orient: 'horizontal', inputType: 'aggregated-upper-lower' };
                }
                else {
                    // having x, x2 that are not both quantitative
                    throw new Error(`Both x and x2 have to be quantitative in ${compositeMark}`);
                }
            }
            else if (isFieldDef(y2)) {
                // y2 is a FieldDef
                if (isFieldDef(y) && isContinuous(y)) {
                    // having y, y2 quantitative and field x, x2 are not specified
                    return { orient: 'vertical', inputType: 'aggregated-upper-lower' };
                }
                else {
                    // having y, y2 that are not both quantitative
                    throw new Error(`Both y and y2 have to be quantitative in ${compositeMark}`);
                }
            }
            throw new Error('No ranged axis');
        }
        else {
            // type is aggregated-error
            const xError = encoding.xError;
            const xError2 = encoding.xError2;
            const yError = encoding.yError;
            const yError2 = encoding.yError2;
            if (isFieldDef(xError2) && !isFieldDef(xError)) {
                // having xError2 without xError
                throw new Error(`${compositeMark} cannot have xError2 without xError`);
            }
            if (isFieldDef(yError2) && !isFieldDef(yError)) {
                // having yError2 without yError
                throw new Error(`${compositeMark} cannot have yError2 without yError`);
            }
            if (isFieldDef(xError) && isFieldDef(yError)) {
                // having both xError and yError
                throw new Error(`${compositeMark} cannot have both xError and yError with both are quantiative`);
            }
            else if (isFieldDef(xError)) {
                if (isFieldDef(x) && isContinuous(x)) {
                    // having x and xError that are all quantitative
                    return { orient: 'horizontal', inputType: 'aggregated-error' };
                }
                else {
                    // having x, xError, and xError2 that are not all quantitative
                    throw new Error('All x, xError, and xError2 (if exist) have to be quantitative');
                }
            }
            else if (isFieldDef(yError)) {
                if (isFieldDef(y) && isContinuous(y)) {
                    // having y and yError that are all quantitative
                    return { orient: 'vertical', inputType: 'aggregated-error' };
                }
                else {
                    // having y, yError, and yError2 that are not all quantitative
                    throw new Error('All y, yError, and yError2 (if exist) have to be quantitative');
                }
            }
            throw new Error('No ranged axis');
        }
    }
    function errorBarIsInputTypeRaw(encoding) {
        return ((isFieldDef(encoding.x) || isFieldDef(encoding.y)) &&
            !isFieldDef(encoding.x2) &&
            !isFieldDef(encoding.y2) &&
            !isFieldDef(encoding.xError) &&
            !isFieldDef(encoding.xError2) &&
            !isFieldDef(encoding.yError) &&
            !isFieldDef(encoding.yError2));
    }
    function errorBarIsInputTypeAggregatedUpperLower(encoding) {
        return isFieldDef(encoding.x2) || isFieldDef(encoding.y2);
    }
    function errorBarIsInputTypeAggregatedError(encoding) {
        return (isFieldDef(encoding.xError) ||
            isFieldDef(encoding.xError2) ||
            isFieldDef(encoding.yError) ||
            isFieldDef(encoding.yError2));
    }
    function errorBarParams(spec, compositeMark, config) {
        var _a;
        // TODO: use selection
        const { mark, encoding, selection, projection: _p } = spec, outerSpec = __rest(spec, ["mark", "encoding", "selection", "projection"]);
        const markDef = isMarkDef(mark) ? mark : { type: mark };
        // TODO(https://github.com/vega/vega-lite/issues/3702): add selection support
        if (selection) {
            warn(message.selectionNotSupported(compositeMark));
        }
        const { orient, inputType } = errorBarOrientAndInputType(spec, compositeMark);
        const { continuousAxisChannelDef, continuousAxisChannelDef2, continuousAxisChannelDefError, continuousAxisChannelDefError2, continuousAxis } = compositeMarkContinuousAxis(spec, orient, compositeMark);
        const { errorBarSpecificAggregate, postAggregateCalculates, tooltipSummary, tooltipTitleWithFieldName } = errorBarAggregationAndCalculation(markDef, continuousAxisChannelDef, continuousAxisChannelDef2, continuousAxisChannelDefError, continuousAxisChannelDefError2, inputType, compositeMark, config);
        const _b = continuousAxis, oldContinuousAxisChannelDef = encoding[_b], _c = continuousAxis === 'x' ? 'x2' : 'y2', oldContinuousAxisChannelDef2 = encoding[_c], _d = continuousAxis === 'x' ? 'xError' : 'yError', oldContinuousAxisChannelDefError = encoding[_d], _e = continuousAxis === 'x' ? 'xError2' : 'yError2', oldContinuousAxisChannelDefError2 = encoding[_e], oldEncodingWithoutContinuousAxis = __rest(encoding, [typeof _b === "symbol" ? _b : _b + "", typeof _c === "symbol" ? _c : _c + "", typeof _d === "symbol" ? _d : _d + "", typeof _e === "symbol" ? _e : _e + ""]);
        const { bins, timeUnits, aggregate: oldAggregate, groupby: oldGroupBy, encoding: encodingWithoutContinuousAxis } = extractTransformsFromEncoding(oldEncodingWithoutContinuousAxis, config);
        const aggregate = [...oldAggregate, ...errorBarSpecificAggregate];
        const groupby = inputType !== 'raw' ? [] : oldGroupBy;
        const tooltipEncoding = getCompositeMarkTooltip(tooltipSummary, continuousAxisChannelDef, encodingWithoutContinuousAxis, tooltipTitleWithFieldName);
        return {
            transform: [
                ...(_a = outerSpec.transform, (_a !== null && _a !== void 0 ? _a : [])),
                ...bins,
                ...timeUnits,
                ...(aggregate.length === 0 ? [] : [{ aggregate, groupby }]),
                ...postAggregateCalculates
            ],
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
            const center = markDef.center
                ? markDef.center
                : markDef.extent
                    ? markDef.extent === 'iqr'
                        ? 'median'
                        : 'mean'
                    : config.errorbar.center;
            const extent = markDef.extent ? markDef.extent : center === 'mean' ? 'stderr' : 'iqr';
            if ((center === 'median') !== (extent === 'iqr')) {
                warn(message.errorBarCenterIsUsedWithWrongExtent(center, extent, compositeMark));
            }
            if (extent === 'stderr' || extent === 'stdev') {
                errorBarSpecificAggregate = [
                    { op: extent, field: continuousFieldName, as: 'extent_' + continuousFieldName },
                    { op: center, field: continuousFieldName, as: 'center_' + continuousFieldName }
                ];
                postAggregateCalculates = [
                    {
                        calculate: `datum["center_${continuousFieldName}"] + datum["extent_${continuousFieldName}"]`,
                        as: 'upper_' + continuousFieldName
                    },
                    {
                        calculate: `datum["center_${continuousFieldName}"] - datum["extent_${continuousFieldName}"]`,
                        as: 'lower_' + continuousFieldName
                    }
                ];
                tooltipSummary = [
                    { fieldPrefix: 'center_', titlePrefix: titlecase(center) },
                    { fieldPrefix: 'upper_', titlePrefix: getTitlePrefix(center, extent, '+') },
                    { fieldPrefix: 'lower_', titlePrefix: getTitlePrefix(center, extent, '-') }
                ];
                tooltipTitleWithFieldName = true;
            }
            else {
                if (markDef.center && markDef.extent) {
                    warn(message.errorBarCenterIsNotNeeded(markDef.extent, compositeMark));
                }
                let centerOp;
                let lowerExtentOp;
                let upperExtentOp;
                if (extent === 'ci') {
                    centerOp = 'mean';
                    lowerExtentOp = 'ci0';
                    upperExtentOp = 'ci1';
                }
                else {
                    centerOp = 'median';
                    lowerExtentOp = 'q1';
                    upperExtentOp = 'q3';
                }
                errorBarSpecificAggregate = [
                    { op: lowerExtentOp, field: continuousFieldName, as: 'lower_' + continuousFieldName },
                    { op: upperExtentOp, field: continuousFieldName, as: 'upper_' + continuousFieldName },
                    { op: centerOp, field: continuousFieldName, as: 'center_' + continuousFieldName }
                ];
                tooltipSummary = [
                    {
                        fieldPrefix: 'upper_',
                        titlePrefix: title({ field: continuousFieldName, aggregate: upperExtentOp, type: 'quantitative' }, config, {
                            allowDisabling: false
                        })
                    },
                    {
                        fieldPrefix: 'lower_',
                        titlePrefix: title({ field: continuousFieldName, aggregate: lowerExtentOp, type: 'quantitative' }, config, {
                            allowDisabling: false
                        })
                    },
                    {
                        fieldPrefix: 'center_',
                        titlePrefix: title({ field: continuousFieldName, aggregate: centerOp, type: 'quantitative' }, config, {
                            allowDisabling: false
                        })
                    }
                ];
            }
        }
        else {
            if (markDef.center || markDef.extent) {
                warn(message.errorBarCenterAndExtentAreNotNeeded(markDef.center, markDef.extent));
            }
            if (inputType === 'aggregated-upper-lower') {
                tooltipSummary = [];
                postAggregateCalculates = [
                    { calculate: `datum["${continuousAxisChannelDef2.field}"]`, as: 'upper_' + continuousFieldName },
                    { calculate: `datum["${continuousFieldName}"]`, as: 'lower_' + continuousFieldName }
                ];
            }
            else if (inputType === 'aggregated-error') {
                tooltipSummary = [{ fieldPrefix: '', titlePrefix: continuousFieldName }];
                postAggregateCalculates = [
                    {
                        calculate: `datum["${continuousFieldName}"] + datum["${continuousAxisChannelDefError.field}"]`,
                        as: 'upper_' + continuousFieldName
                    }
                ];
                if (continuousAxisChannelDefError2) {
                    postAggregateCalculates.push({
                        calculate: `datum["${continuousFieldName}"] + datum["${continuousAxisChannelDefError2.field}"]`,
                        as: 'lower_' + continuousFieldName
                    });
                }
                else {
                    postAggregateCalculates.push({
                        calculate: `datum["${continuousFieldName}"] - datum["${continuousAxisChannelDefError.field}"]`,
                        as: 'lower_' + continuousFieldName
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
        return { postAggregateCalculates, errorBarSpecificAggregate, tooltipSummary, tooltipTitleWithFieldName };
    }
    function getTitlePrefix(center, extent, operation) {
        return titlecase(center) + ' ' + operation + ' ' + extent;
    }

    const ERRORBAND = 'errorband';
    const ERRORBAND_PART_INDEX = {
        band: 1,
        borders: 1
    };
    const ERRORBAND_PARTS = keys(ERRORBAND_PART_INDEX);
    const errorBandNormalizer = new CompositeMarkNormalizer(ERRORBAND, normalizeErrorBand);
    function normalizeErrorBand(spec, { config }) {
        const { transform, continuousAxisChannelDef, continuousAxis, encodingWithoutContinuousAxis, markDef, outerSpec, tooltipEncoding } = errorBarParams(spec, ERRORBAND, config);
        const errorBandDef = markDef;
        const makeErrorBandPart = makeCompositeAggregatePartFactory(errorBandDef, continuousAxis, continuousAxisChannelDef, encodingWithoutContinuousAxis, config.errorband);
        const is2D = spec.encoding.x !== undefined && spec.encoding.y !== undefined;
        let bandMark = { type: is2D ? 'area' : 'rect' };
        let bordersMark = { type: is2D ? 'line' : 'rule' };
        const interpolate = Object.assign(Object.assign({}, (errorBandDef.interpolate ? { interpolate: errorBandDef.interpolate } : {})), (errorBandDef.tension && errorBandDef.interpolate ? { interpolate: errorBandDef.tension } : {}));
        if (is2D) {
            bandMark = Object.assign(Object.assign({}, bandMark), interpolate);
            bordersMark = Object.assign(Object.assign({}, bordersMark), interpolate);
        }
        else if (errorBandDef.interpolate) {
            warn(message.errorBand1DNotSupport('interpolate'));
        }
        else if (errorBandDef.tension) {
            warn(message.errorBand1DNotSupport('tension'));
        }
        return Object.assign(Object.assign({}, outerSpec), { transform, layer: [
                ...makeErrorBandPart({
                    partName: 'band',
                    mark: bandMark,
                    positionPrefix: 'lower',
                    endPositionPrefix: 'upper',
                    extraEncoding: tooltipEncoding
                }),
                ...makeErrorBandPart({
                    partName: 'borders',
                    mark: bordersMark,
                    positionPrefix: 'lower',
                    extraEncoding: tooltipEncoding
                }),
                ...makeErrorBandPart({
                    partName: 'borders',
                    mark: bordersMark,
                    positionPrefix: 'upper',
                    extraEncoding: tooltipEncoding
                })
            ] });
    }

    /**
     * Registry index for all composite mark's normalizer
     */
    const compositeMarkRegistry = {};
    function add(mark, run, parts) {
        const normalizer = new CompositeMarkNormalizer(mark, run);
        compositeMarkRegistry[mark] = { normalizer, parts };
    }
    function getAllCompositeMarks() {
        return keys(compositeMarkRegistry);
    }
    add(BOXPLOT, normalizeBoxPlot, BOXPLOT_PARTS);
    add(ERRORBAR, normalizeErrorBar, ERRORBAR_PARTS);
    add(ERRORBAND, normalizeErrorBand, ERRORBAND_PARTS);

    const VL_ONLY_LEGEND_CONFIG = [
        'gradientHorizontalMaxLength',
        'gradientHorizontalMinLength',
        'gradientVerticalMaxLength',
        'gradientVerticalMinLength',
        'unselectedOpacity'
    ];

    const SIGNAL_LEGEND_PROP_INDEX = {
        fillColor: {
            part: 'legend',
            vgProp: 'fill'
        },
        gradientStrokeColor: {
            part: 'gradient',
            vgProp: 'stroke'
        },
        labelColor: {
            part: 'labels',
            vgProp: 'fill'
        },
        strokeColor: {
            part: 'legend',
            vgProp: 'stroke'
        },
        symbolFillColor: {
            part: 'symbols',
            vgProp: 'fill'
        },
        symbolStrokeColor: {
            part: 'symbols',
            vgProp: 'stroke'
        },
        titleColor: {
            part: 'title',
            vgProp: 'fill'
        }
    };
    const defaultLegendConfig = {
        gradientHorizontalMaxLength: 200,
        gradientHorizontalMinLength: 100,
        gradientVerticalMaxLength: 200,
        gradientVerticalMinLength: 64,
        unselectedOpacity: 0.35
    };
    const COMMON_LEGEND_PROPERTY_INDEX = {
        clipHeight: 1,
        columnPadding: 1,
        columns: 1,
        cornerRadius: 1,
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
    const defaultConfig = {
        single: {
            on: 'click',
            fields: [SELECTION_ID],
            resolve: 'global',
            empty: 'all',
            clear: 'dblclick'
        },
        multi: {
            on: 'click',
            fields: [SELECTION_ID],
            toggle: 'event.shiftKey',
            resolve: 'global',
            empty: 'all',
            clear: 'dblclick'
        },
        interval: {
            on: '[mousedown, window:mouseup] > window:mousemove!',
            encodings: ['x', 'y'],
            translate: '[mousedown, window:mouseup] > window:mousemove!',
            zoom: 'wheel!',
            mark: { fill: '#333', fillOpacity: 0.125, stroke: 'white' },
            resolve: 'global',
            clear: 'dblclick'
        }
    };
    function isLegendBinding(bind) {
        return !!bind && (bind === 'legend' || !!bind.legend);
    }
    function isLegendStreamBinding(bind) {
        return isLegendBinding(bind) && isObject(bind);
    }

    function isAnyConcatSpec(spec) {
        return isVConcatSpec(spec) || isHConcatSpec(spec) || isConcatSpec(spec);
    }
    function isConcatSpec(spec) {
        return spec['concat'] !== undefined;
    }
    function isVConcatSpec(spec) {
        return spec['vconcat'] !== undefined;
    }
    function isHConcatSpec(spec) {
        return spec['hconcat'] !== undefined;
    }

    function isRepeatSpec(spec) {
        return spec['repeat'] !== undefined;
    }

    function isStep(size) {
        return isObject(size) && size['step'] !== undefined;
    }
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
        var _a, _b;
        const compositionConfig = config[specType];
        const layout = {};
        // Apply config first
        const { spacing: spacingConfig, columns } = compositionConfig;
        if (spacingConfig !== undefined) {
            layout.spacing = spacingConfig;
        }
        if (columns !== undefined) {
            if ((isFacetSpec(spec) && !isFacetMapping(spec.facet)) ||
                (isRepeatSpec(spec) && isArray(spec.repeat)) ||
                isConcatSpec(spec)) {
                layout.columns = columns;
            }
        }
        // Then copy properties from the spec
        for (const prop of COMPOSITION_LAYOUT_PROPERTIES) {
            if (spec[prop] !== undefined) {
                if (prop === 'spacing') {
                    const spacing = spec[prop];
                    layout[prop] = isNumber(spacing)
                        ? spacing
                        : {
                            row: (_a = spacing.row, (_a !== null && _a !== void 0 ? _a : spacingConfig)),
                            column: (_b = spacing.column, (_b !== null && _b !== void 0 ? _b : spacingConfig))
                        };
                }
                else {
                    layout[prop] = spec[prop];
                }
            }
        }
        return layout;
    }

    function getViewConfigContinuousSize(viewConfig, channel) {
        var _a;
        return _a = viewConfig[channel], (_a !== null && _a !== void 0 ? _a : viewConfig[channel === 'width' ? 'continuousWidth' : 'continuousHeight']); // get width/height for backwards compatibility
    }
    function getViewConfigDiscreteStep(viewConfig, channel) {
        const size = getViewConfigDiscreteSize(viewConfig, channel);
        return isStep(size) ? size.step : DEFAULT_STEP;
    }
    function getViewConfigDiscreteSize(viewConfig, channel) {
        var _a;
        const size = (_a = viewConfig[channel], (_a !== null && _a !== void 0 ? _a : viewConfig[channel === 'width' ? 'discreteWidth' : 'discreteHeight'])); // get width/height for backwards compatibility
        return getFirstDefined(size, { step: viewConfig.step });
    }
    const DEFAULT_STEP = 20;
    const defaultViewConfig = {
        continuousWidth: 200,
        continuousHeight: 200,
        step: DEFAULT_STEP
    };
    const defaultConfig$1 = {
        background: 'white',
        padding: 5,
        timeFormat: '%b %d, %Y',
        countTitle: 'Count of Records',
        view: defaultViewConfig,
        mark: defaultMarkConfig,
        area: {},
        bar: defaultBarConfig,
        circle: {},
        geoshape: {},
        image: {},
        line: {},
        point: {},
        rect: defaultRectConfig,
        rule: { color: 'black' },
        square: {},
        text: { color: 'black' },
        tick: defaultTickConfig,
        trail: {},
        boxplot: {
            size: 14,
            extent: 1.5,
            box: {},
            median: { color: 'white' },
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
        axis: {},
        axisX: {},
        axisY: {},
        axisLeft: {},
        axisRight: {},
        axisTop: {},
        axisBottom: {},
        axisBand: {},
        legend: defaultLegendConfig,
        header: { titlePadding: 10, labelPadding: 10 },
        headerColumn: {},
        headerRow: {},
        headerFacet: {},
        selection: defaultConfig,
        style: {},
        title: {},
        facet: { spacing: DEFAULT_SPACING },
        repeat: { spacing: DEFAULT_SPACING },
        concat: { spacing: DEFAULT_SPACING }
    };
    const tab10 = scheme('tableau10');
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
    function colorSignalConfig(color = {}) {
        return {
            signals: [
                {
                    name: 'color',
                    value: isObject(color) ? Object.assign(Object.assign({}, DEFAULT_COLOR), color) : DEFAULT_COLOR
                }
            ],
            mark: { color: { signal: 'color.blue' } },
            rule: { color: { signal: 'color.gray0' } },
            text: {
                color: { signal: 'color.gray0' }
            },
            style: {
                'guide-label': {
                    fill: { signal: 'color.gray0' }
                },
                'guide-title': {
                    fill: { signal: 'color.gray0' }
                },
                'group-title': {
                    fill: { signal: 'color.gray0' }
                },
                'group-subtitle': {
                    fill: { signal: 'color.gray0' }
                },
                cell: {
                    stroke: { signal: 'color.gray8' }
                }
            },
            axis: {
                domainColor: { signal: 'color.gray13' },
                gridColor: { signal: 'color.gray8' },
                tickColor: { signal: 'color.gray13' }
            },
            range: {
                category: [
                    { signal: 'color.blue' },
                    { signal: 'color.orange' },
                    { signal: 'color.red' },
                    { signal: 'color.teal' },
                    { signal: 'color.green' },
                    { signal: 'color.yellow' },
                    { signal: 'color.purple' },
                    { signal: 'color.pink' },
                    { signal: 'color.brown' },
                    { signal: 'color.grey8' }
                ]
            }
        };
    }
    function fontSizeSignalConfig(fontSize) {
        return {
            signals: [
                {
                    name: 'fontSize',
                    value: isObject(fontSize) ? Object.assign(Object.assign({}, DEFAULT_FONT_SIZE), fontSize) : DEFAULT_FONT_SIZE
                }
            ],
            text: {
                fontSize: { signal: 'fontSize.text' }
            },
            style: {
                'guide-label': {
                    fontSize: { signal: 'fontSize.guideLabel' }
                },
                'guide-title': {
                    fontSize: { signal: 'fontSize.guideTitle' }
                },
                'group-title': {
                    fontSize: { signal: 'fontSize.groupTitle' }
                },
                'group-subtitle': {
                    fontSize: { signal: 'fontSize.groupSubtitle' }
                }
            }
        };
    }
    function fontConfig(font) {
        return {
            text: { font },
            style: {
                'guide-label': { font },
                'guide-title': { font },
                'group-title': { font },
                'group-subtitle': { font }
            }
        };
    }
    function initConfig(config = {}) {
        const { color, font, fontSize } = config, restConfig = __rest(config, ["color", "font", "fontSize"]);
        return mergeConfig({}, defaultConfig$1, font ? fontConfig(font) : {}, color ? colorSignalConfig(color) : {}, fontSize ? fontSizeSignalConfig(fontSize) : {}, restConfig || {});
    }
    const MARK_STYLES = ['view', ...PRIMITIVE_MARKS];
    const VL_ONLY_CONFIG_PROPERTIES = [
        'color',
        'fontSize',
        'background',
        'padding',
        'facet',
        'concat',
        'repeat',
        'numberFormat',
        'timeFormat',
        'countTitle',
        'header',
        'axisQuantitative',
        'axisTemporal',
        'scale',
        'selection',
        'overlay' // FIXME: Redesign and unhide this
    ];
    const VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = Object.assign({ view: ['continuousWidth', 'continuousHeight', 'discreteWidth', 'discreteHeight', 'step'] }, VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX);
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
        }
        // Remove Vega-Lite only generic mark config
        if (config.mark) {
            for (const prop of VL_ONLY_MARK_CONFIG_PROPERTIES) {
                delete config.mark[prop];
            }
        }
        for (const markType of MARK_STYLES) {
            // Remove Vega-Lite-only mark config
            for (const prop of VL_ONLY_MARK_CONFIG_PROPERTIES) {
                delete config[markType][prop];
            }
            // Remove Vega-Lite only mark-specific config
            const vlOnlyMarkSpecificConfigs = VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX[markType];
            if (vlOnlyMarkSpecificConfigs) {
                for (const prop of vlOnlyMarkSpecificConfigs) {
                    delete config[markType][prop];
                }
            }
            // Redirect mark config to config.style so that mark config only affect its own mark type
            // without affecting other marks that share the same underlying Vega marks.
            // For example, config.rect should not affect bar marks.
            redirectConfigToStyleConfig(config, markType);
        }
        for (const m of getAllCompositeMarks()) {
            // Clean up the composite mark config as we don't need them in the output specs anymore
            delete config[m];
        }
        redirectTitleConfig(config);
        // Remove empty config objects.
        for (const prop in config) {
            if (isObject(config[prop]) && keys(config[prop]).length === 0) {
                delete config[prop];
            }
        }
        return keys(config).length > 0 ? config : undefined;
    }
    /**
     *
     * Redirect config.title -- so that title config do not affect header labels,
     * which also uses `title` directive to implement.
     *
     * For subtitle configs in config.title, keep them in config.title as header titles never have subtitles.
     */
    function redirectTitleConfig(config) {
        const { mark: m, subtitle } = extractTitleConfig(config.title);
        const style = Object.assign(Object.assign({}, m), config.style['group-title']);
        // set config.style if it is not an empty object
        if (keys(style).length > 0) {
            config.style['group-title'] = style;
        }
        //
        if (keys(subtitle).length > 0) {
            config.title = subtitle;
        }
        else {
            delete config.title;
        }
    }
    function redirectConfigToStyleConfig(config, prop, // string = composite mark
    toProp, compositeMarkPart) {
        const propConfig = compositeMarkPart ? config[prop][compositeMarkPart] : config[prop];
        if (prop === 'view') {
            toProp = 'cell'; // View's default style is "cell"
        }
        const style = Object.assign(Object.assign({}, propConfig), config.style[(toProp !== null && toProp !== void 0 ? toProp : prop)]);
        // set config.style if it is not an empty object
        if (keys(style).length > 0) {
            config.style[(toProp !== null && toProp !== void 0 ? toProp : prop)] = style;
        }
        if (!compositeMarkPart) {
            // For composite mark, so don't delete the whole config yet as we have to do multiple redirections.
            delete config[prop];
        }
    }

    function isLayerSpec(spec) {
        return spec['layer'] !== undefined;
    }

    class SpecMapper {
        map(spec, params) {
            if (isFacetSpec(spec)) {
                return this.mapFacet(spec, params);
            }
            else if (isRepeatSpec(spec)) {
                return this.mapRepeat(spec, params);
            }
            else if (isHConcatSpec(spec)) {
                return this.mapHConcat(spec, params);
            }
            else if (isVConcatSpec(spec)) {
                return this.mapVConcat(spec, params);
            }
            else if (isConcatSpec(spec)) {
                return this.mapConcat(spec, params);
            }
            else {
                return this.mapLayerOrUnit(spec, params);
            }
        }
        mapLayerOrUnit(spec, params) {
            if (isLayerSpec(spec)) {
                return this.mapLayer(spec, params);
            }
            else if (isUnitSpec(spec)) {
                return this.mapUnit(spec, params);
            }
            throw new Error(message.invalidSpec(spec));
        }
        mapLayer(spec, params) {
            return Object.assign(Object.assign({}, spec), { layer: spec.layer.map(subspec => this.mapLayerOrUnit(subspec, params)) });
        }
        mapHConcat(spec, params) {
            return Object.assign(Object.assign({}, spec), { hconcat: spec.hconcat.map(subspec => this.map(subspec, params)) });
        }
        mapVConcat(spec, params) {
            return Object.assign(Object.assign({}, spec), { vconcat: spec.vconcat.map(subspec => this.map(subspec, params)) });
        }
        mapConcat(spec, params) {
            const { concat } = spec, rest = __rest(spec, ["concat"]);
            return Object.assign(Object.assign({}, rest), { concat: concat.map(subspec => this.map(subspec, params)) });
        }
        mapFacet(spec, params) {
            return Object.assign(Object.assign({}, spec), { 
                // TODO: remove "any" once we support all facet listed in https://github.com/vega/vega-lite/issues/2760
                spec: this.map(spec.spec, params) });
        }
        mapRepeat(spec, params) {
            return Object.assign(Object.assign({}, spec), { spec: this.map(spec.spec, params) });
        }
    }

    const STACK_OFFSET_INDEX = {
        zero: 1,
        center: 1,
        normalize: 1
    };
    function isStackOffset(s) {
        return !!STACK_OFFSET_INDEX[s];
    }
    const STACKABLE_MARKS = [BAR, AREA, RULE, POINT, CIRCLE, SQUARE, LINE, TEXT, TICK];
    const STACK_BY_DEFAULT_MARKS = [BAR, AREA];
    function potentialStackedChannel(encoding) {
        const xDef = encoding.x;
        const yDef = encoding.y;
        if (isFieldDef(xDef) && isFieldDef(yDef)) {
            if (xDef.type === 'quantitative' && yDef.type === 'quantitative') {
                if (xDef.stack) {
                    return 'x';
                }
                else if (yDef.stack) {
                    return 'y';
                }
                // if there is no explicit stacking, only apply stack if there is only one aggregate for x or y
                if (!!xDef.aggregate !== !!yDef.aggregate) {
                    return xDef.aggregate ? 'x' : 'y';
                }
            }
            else if (xDef.type === 'quantitative') {
                return 'x';
            }
            else if (yDef.type === 'quantitative') {
                return 'y';
            }
        }
        else if (isFieldDef(xDef) && xDef.type === 'quantitative') {
            return 'x';
        }
        else if (isFieldDef(yDef) && yDef.type === 'quantitative') {
            return 'y';
        }
        return undefined;
    }
    // Note: CompassQL uses this method and only passes in required properties of each argument object.
    // If required properties change, make sure to update CompassQL.
    function stack(m, encoding, opt = {}) {
        const mark = isMarkDef(m) ? m.type : m;
        // Should have stackable mark
        if (!contains(STACKABLE_MARKS, mark)) {
            return null;
        }
        const fieldChannel = potentialStackedChannel(encoding);
        if (!fieldChannel) {
            return null;
        }
        const stackedFieldDef = encoding[fieldChannel];
        const stackedField = isStringFieldDef(stackedFieldDef) ? vgField(stackedFieldDef, {}) : undefined;
        const dimensionChannel = fieldChannel === 'x' ? 'y' : 'x';
        const dimensionDef = encoding[dimensionChannel];
        const dimensionField = isStringFieldDef(dimensionDef) ? vgField(dimensionDef, {}) : undefined;
        // Should have grouping level of detail that is different from the dimension field
        const stackBy = NONPOSITION_CHANNELS.reduce((sc, channel) => {
            // Ignore tooltip in stackBy (https://github.com/vega/vega-lite/issues/4001)
            if (channel !== 'tooltip' && channelHasField(encoding, channel)) {
                const channelDef = encoding[channel];
                array(channelDef).forEach(cDef => {
                    const fieldDef = getTypedFieldDef(cDef);
                    if (fieldDef.aggregate) {
                        return;
                    }
                    // Check whether the channel's field is identical to x/y's field or if the channel is a repeat
                    const f = isStringFieldDef(fieldDef) ? vgField(fieldDef, {}) : undefined;
                    if (
                    // if fielddef is a repeat, just include it in the stack by
                    !f ||
                        // otherwise, the field must be different from x and y fields.
                        (f !== dimensionField && f !== stackedField)) {
                        sc.push({ channel, fieldDef });
                    }
                });
            }
            return sc;
        }, []);
        // Automatically determine offset
        let offset;
        if (stackedFieldDef.stack !== undefined) {
            if (isBoolean(stackedFieldDef.stack)) {
                offset = stackedFieldDef.stack ? 'zero' : null;
            }
            else {
                offset = stackedFieldDef.stack;
            }
        }
        else if (stackBy.length > 0 && contains(STACK_BY_DEFAULT_MARKS, mark)) {
            // Bar and Area with sum ops are automatically stacked by default
            offset = 'zero';
        }
        if (!offset || !isStackOffset(offset)) {
            return null;
        }
        if (isAggregate(encoding) && stackBy.length === 0) {
            return null;
        }
        // warn when stacking non-linear
        if (stackedFieldDef.scale && stackedFieldDef.scale.type && stackedFieldDef.scale.type !== ScaleType.LINEAR) {
            if (opt.disallowNonLinearStack) {
                return null;
            }
            else {
                warn(message.cannotStackNonLinearScale(stackedFieldDef.scale.type));
            }
        }
        // Check if it is a ranged mark
        if (channelHasField(encoding, fieldChannel === X ? X2 : Y2)) {
            if (stackedFieldDef.stack !== undefined) {
                warn(message.cannotStackRangedMark(fieldChannel));
            }
            return null;
        }
        // Warn if stacking non-summative aggregate
        if (stackedFieldDef.aggregate && !contains(SUM_OPS, stackedFieldDef.aggregate)) {
            warn(message.stackNonSummativeAggregate(stackedFieldDef.aggregate));
        }
        return {
            groupbyChannel: dimensionDef ? dimensionChannel : undefined,
            fieldChannel,
            impute: stackedFieldDef.impute === null ? false : isPathMark(mark),
            stackBy,
            offset
        };
    }

    function dropLineAndPoint(markDef) {
        const mark = __rest(markDef, ["point", "line"]);
        return keys(mark).length > 1 ? mark : mark.type;
    }
    function dropLineAndPointFromConfig(config) {
        for (const mark of ['line', 'area', 'rule', 'trail']) {
            if (config[mark]) {
                config = Object.assign(Object.assign({}, config), { 
                    // TODO: remove as any
                    [mark]: omit(config[mark], ['point', 'line']) });
            }
        }
        return config;
    }
    function getPointOverlay(markDef, markConfig = {}, encoding) {
        if (markDef.point === 'transparent') {
            return { opacity: 0 };
        }
        else if (markDef.point) {
            // truthy : true or object
            return isObject(markDef.point) ? markDef.point : {};
        }
        else if (markDef.point !== undefined) {
            // false or null
            return null;
        }
        else {
            // undefined (not disabled)
            if (markConfig.point || encoding.shape) {
                // enable point overlay if config[mark].point is truthy or if encoding.shape is provided
                return isObject(markConfig.point) ? markConfig.point : {};
            }
            // markDef.point is defined as falsy
            return undefined;
        }
    }
    function getLineOverlay(markDef, markConfig = {}) {
        if (markDef.line) {
            // true or object
            return markDef.line === true ? {} : markDef.line;
        }
        else if (markDef.line !== undefined) {
            // false or null
            return null;
        }
        else {
            // undefined (not disabled)
            if (markConfig.line) {
                // enable line overlay if config[mark].line is truthy
                return markConfig.line === true ? {} : markConfig.line;
            }
            // markDef.point is defined as falsy
            return undefined;
        }
    }
    class PathOverlayNormalizer {
        constructor() {
            this.name = 'path-overlay';
        }
        hasMatchingType(spec, config) {
            if (isUnitSpec(spec)) {
                const { mark, encoding } = spec;
                const markDef = isMarkDef(mark) ? mark : { type: mark };
                switch (markDef.type) {
                    case 'line':
                    case 'rule':
                    case 'trail':
                        return !!getPointOverlay(markDef, config[markDef.type], encoding);
                    case 'area':
                        return (
                        // false / null are also included as we want to remove the properties
                        !!getPointOverlay(markDef, config[markDef.type], encoding) ||
                            !!getLineOverlay(markDef, config[markDef.type]));
                }
            }
            return false;
        }
        run(spec, params, normalize) {
            const { config } = params;
            const { selection, projection, encoding, mark } = spec, outerSpec = __rest(spec, ["selection", "projection", "encoding", "mark"]);
            const markDef = isMarkDef(mark) ? mark : { type: mark };
            const pointOverlay = getPointOverlay(markDef, config[markDef.type], encoding);
            const lineOverlay = markDef.type === 'area' && getLineOverlay(markDef, config[markDef.type]);
            const layer = [
                Object.assign(Object.assign({}, (selection ? { selection } : {})), { 
                    // Do not include point / line overlay in the normalize spec
                    mark: dropLineAndPoint(Object.assign(Object.assign({}, markDef), (markDef.type === 'area' ? { opacity: 0.7 } : {}))), 
                    // drop shape from encoding as this might be used to trigger point overlay
                    encoding: omit(encoding, ['shape']) })
            ];
            // FIXME: determine rules for applying selections.
            // Need to copy stack config to overlayed layer
            const stackProps = stack(markDef, encoding);
            let overlayEncoding = encoding;
            if (stackProps) {
                const { fieldChannel: stackFieldChannel, offset } = stackProps;
                overlayEncoding = Object.assign(Object.assign({}, encoding), { [stackFieldChannel]: Object.assign(Object.assign({}, encoding[stackFieldChannel]), (offset ? { stack: offset } : {})) });
            }
            if (lineOverlay) {
                layer.push(Object.assign(Object.assign({}, (projection ? { projection } : {})), { mark: Object.assign(Object.assign({ type: 'line' }, pick(markDef, ['clip', 'interpolate', 'tension', 'tooltip'])), lineOverlay), encoding: overlayEncoding }));
            }
            if (pointOverlay) {
                layer.push(Object.assign(Object.assign({}, (projection ? { projection } : {})), { mark: Object.assign(Object.assign({ type: 'point', opacity: 1, filled: true }, pick(markDef, ['clip', 'tooltip'])), pointOverlay), encoding: overlayEncoding }));
            }
            return normalize(Object.assign(Object.assign({}, outerSpec), { layer }), Object.assign(Object.assign({}, params), { config: dropLineAndPointFromConfig(config) }));
        }
    }

    class RangeStepNormalizer {
        constructor() {
            this.name = 'RangeStep';
        }
        hasMatchingType(spec) {
            var _a, _b;
            if (isUnitSpec(spec) && spec.encoding) {
                for (const channel of POSITION_SCALE_CHANNELS) {
                    const def = spec.encoding[channel];
                    if (def && isFieldDef(def)) {
                        if ((_b = (_a = def) === null || _a === void 0 ? void 0 : _a.scale) === null || _b === void 0 ? void 0 : _b['rangeStep']) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        run(spec) {
            var _a, _b;
            const sizeMixins = {};
            let encoding = Object.assign({}, spec.encoding);
            for (const channel of POSITION_SCALE_CHANNELS) {
                const sizeType = getSizeType(channel);
                const def = encoding[channel];
                if (def && isFieldDef(def)) {
                    if ((_b = (_a = def) === null || _a === void 0 ? void 0 : _a.scale) === null || _b === void 0 ? void 0 : _b['rangeStep']) {
                        const { scale } = def, defWithoutScale = __rest(def, ["scale"]);
                        const _c = scale, scaleWithoutRangeStep = __rest(_c, ["rangeStep"]);
                        sizeMixins[sizeType] = { step: scale['rangeStep'] };
                        warn(message.RANGE_STEP_DEPRECATED);
                        encoding = Object.assign(Object.assign({}, encoding), { [channel]: Object.assign(Object.assign({}, defWithoutScale), (keys(scaleWithoutRangeStep).length > 0 ? { scale: scaleWithoutRangeStep } : {})) });
                    }
                }
            }
            return Object.assign(Object.assign(Object.assign({}, sizeMixins), spec), { encoding });
        }
    }

    class RuleForRangedLineNormalizer {
        constructor() {
            this.name = 'RuleForRangedLine';
        }
        hasMatchingType(spec) {
            if (isUnitSpec(spec)) {
                const { encoding, mark } = spec;
                if (mark === 'line') {
                    for (const channel of SECONDARY_RANGE_CHANNEL) {
                        const mainChannel = getMainRangeChannel(channel);
                        const mainChannelDef = encoding[mainChannel];
                        if (!!encoding[channel] && isFieldDef(mainChannelDef) && !isBinned(mainChannelDef.bin)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        run(spec, params, normalize) {
            const { encoding } = spec;
            warn(message.lineWithRange(!!encoding.x2, !!encoding.y2));
            return normalize(Object.assign(Object.assign({}, spec), { mark: 'rule' }), params);
        }
    }

    class CoreNormalizer extends SpecMapper {
        constructor() {
            super(...arguments);
            this.nonFacetUnitNormalizers = [
                boxPlotNormalizer,
                errorBarNormalizer,
                errorBandNormalizer,
                new PathOverlayNormalizer(),
                new RuleForRangedLineNormalizer(),
                new RangeStepNormalizer()
            ];
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
        }
        // This is for normalizing non-facet unit
        mapUnit(spec, params) {
            const { parentEncoding, parentProjection } = params;
            if (parentEncoding || parentProjection) {
                return this.mapUnitWithParentEncodingOrProjection(spec, params);
            }
            const normalizeLayerOrUnit = this.mapLayerOrUnit.bind(this);
            for (const unitNormalizer of this.nonFacetUnitNormalizers) {
                if (unitNormalizer.hasMatchingType(spec, params.config)) {
                    return unitNormalizer.run(spec, params, normalizeLayerOrUnit);
                }
            }
            return spec;
        }
        mapRepeat(spec, params) {
            const { repeat } = spec;
            if (!isArray(repeat) && spec.columns) {
                // is repeat with row/column
                spec = omit(spec, ['columns']);
                warn(message.columnsNotSupportByRowCol('repeat'));
            }
            return Object.assign(Object.assign({}, spec), { spec: this.map(spec.spec, params) });
        }
        mapFacet(spec, params) {
            const { facet } = spec;
            if (isFacetMapping(facet) && spec.columns) {
                // is facet with row/column
                spec = omit(spec, ['columns']);
                warn(message.columnsNotSupportByRowCol('facet'));
            }
            return super.mapFacet(spec, params);
        }
        mapUnitWithParentEncodingOrProjection(spec, params) {
            const { encoding, projection } = spec;
            const { parentEncoding, parentProjection, config } = params;
            const mergedProjection = mergeProjection({ parentProjection, projection });
            const mergedEncoding = mergeEncoding({ parentEncoding, encoding });
            return this.mapUnit(Object.assign(Object.assign(Object.assign({}, spec), (mergedProjection ? { projection: mergedProjection } : {})), (mergedEncoding ? { encoding: mergedEncoding } : {})), { config });
        }
        mapFacetedUnit(spec, params) {
            // New encoding in the inside spec should not contain row / column
            // as row/column should be moved to facet
            const _a = spec.encoding, { row, column, facet } = _a, encoding = __rest(_a, ["row", "column", "facet"]);
            // Mark and encoding should be moved into the inner spec
            const { mark, width, projection, height, view, selection, encoding: _ } = spec, outerSpec = __rest(spec, ["mark", "width", "projection", "height", "view", "selection", "encoding"]);
            const { facetMapping, layout } = this.getFacetMappingAndLayout({ row, column, facet });
            return this.mapFacet(Object.assign(Object.assign(Object.assign({}, outerSpec), layout), { 
                // row / column has higher precedence than facet
                facet: facetMapping, spec: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (width ? { width } : {})), (height ? { height } : {})), (view ? { view } : {})), (projection ? { projection } : {})), { mark,
                    encoding }), (selection ? { selection } : {})) }), params);
        }
        getFacetMappingAndLayout(facets) {
            var _a;
            const { row, column, facet } = facets;
            if (row || column) {
                if (facet) {
                    warn(message.facetChannelDropped([...(row ? [ROW] : []), ...(column ? [COLUMN] : [])]));
                }
                const facetMapping = {};
                const layout = {};
                for (const channel of [ROW, COLUMN]) {
                    const def = facets[channel];
                    if (def) {
                        const defWithoutLayout = __rest(def, ["align", "center", "spacing", "columns"]);
                        facetMapping[channel] = defWithoutLayout;
                        for (const prop of ['align', 'center', 'spacing']) {
                            if (def[prop] !== undefined) {
                                layout[prop] = (_a = layout[prop], (_a !== null && _a !== void 0 ? _a : {}));
                                layout[prop][channel] = def[prop];
                            }
                        }
                    }
                }
                return { facetMapping, layout };
            }
            else {
                const { align, center, spacing, columns } = facet, facetMapping = __rest(facet, ["align", "center", "spacing", "columns"]);
                return {
                    facetMapping,
                    layout: Object.assign(Object.assign(Object.assign(Object.assign({}, (align ? { align } : {})), (center ? { center } : {})), (spacing ? { spacing } : {})), (columns ? { columns } : {}))
                };
            }
        }
        mapLayer(spec, _a) {
            // Special handling for extended layer spec
            var { parentEncoding, parentProjection } = _a, otherParams = __rest(_a, ["parentEncoding", "parentProjection"]);
            const { encoding, projection } = spec, rest = __rest(spec, ["encoding", "projection"]);
            const params = Object.assign(Object.assign({}, otherParams), { parentEncoding: mergeEncoding({ parentEncoding, encoding }), parentProjection: mergeProjection({ parentProjection, projection }) });
            return super.mapLayer(rest, params);
        }
    }
    function mergeEncoding(opt) {
        const { parentEncoding, encoding } = opt;
        if (parentEncoding && encoding) {
            const overriden = keys(parentEncoding).reduce((o, key) => {
                if (encoding[key]) {
                    o.push(key);
                }
                return o;
            }, []);
            if (overriden.length > 0) {
                warn(message.encodingOverridden(overriden));
            }
        }
        const merged = Object.assign(Object.assign({}, ((parentEncoding !== null && parentEncoding !== void 0 ? parentEncoding : {}))), ((encoding !== null && encoding !== void 0 ? encoding : {})));
        return keys(merged).length > 0 ? merged : undefined;
    }
    function mergeProjection(opt) {
        const { parentProjection, projection } = opt;
        if (parentProjection && projection) {
            warn(message.projectionOverridden({ parentProjection, projection }));
        }
        return (projection !== null && projection !== void 0 ? projection : parentProjection);
    }

    function normalize$2(spec, config) {
        if (config === undefined) {
            config = initConfig(spec.config);
        }
        const normalizedSpec = normalizeGenericSpec(spec, config);
        const { width, height } = spec;
        const autosize = normalizeAutoSize(normalizedSpec, { width, height, autosize: spec.autosize }, config);
        return Object.assign(Object.assign({}, normalizedSpec), (autosize ? { autosize } : {}));
    }
    const normalizer = new CoreNormalizer();
    /**
     * Decompose extended unit specs into composition of pure unit specs.
     */
    function normalizeGenericSpec(spec, config = {}) {
        return normalizer.map(spec, { config });
    }
    function _normalizeAutoSize(autosize) {
        return isString(autosize) ? { type: autosize } : (autosize !== null && autosize !== void 0 ? autosize : {});
    }
    /**
     * Normalize autosize and deal with width or height == "container".
     */
    function normalizeAutoSize(spec, sizeInfo, config) {
        let { width, height } = sizeInfo;
        const isFitCompatible = isUnitSpec(spec) || isLayerSpec(spec);
        const autosizeDefault = {};
        if (!isFitCompatible) {
            // If spec is not compatible with autosize == "fit", discard width/height == container
            if (width == 'container') {
                warn(message.containerSizeNonSingle('width'));
                width = undefined;
            }
            if (height == 'container') {
                warn(message.containerSizeNonSingle('height'));
                height = undefined;
            }
        }
        else {
            // Default autosize parameters to fit when width/height is "container"
            if (width == 'container' && height == 'container') {
                autosizeDefault.type = 'fit';
                autosizeDefault.contains = 'padding';
            }
            else if (width == 'container') {
                autosizeDefault.type = 'fit-x';
                autosizeDefault.contains = 'padding';
            }
            else if (height == 'container') {
                autosizeDefault.type = 'fit-y';
                autosizeDefault.contains = 'padding';
            }
        }
        const autosize = Object.assign(Object.assign(Object.assign({ type: 'pad' }, autosizeDefault), (config ? _normalizeAutoSize(config.autosize) : {})), _normalizeAutoSize(spec.autosize));
        if (autosize.type === 'fit' && !isFitCompatible) {
            warn(message.FIT_NON_SINGLE);
            autosize.type = 'pad';
        }
        if (width == 'container' && !(autosize.type == 'fit' || autosize.type == 'fit-x')) {
            warn(message.containerSizeNotCompatibleWithAutosize('width'));
        }
        if (height == 'container' && !(autosize.type == 'fit' || autosize.type == 'fit-y')) {
            warn(message.containerSizeNotCompatibleWithAutosize('height'));
        }
        // Delete autosize property if it's Vega's default
        if (deepEqual(autosize, { type: 'pad' })) {
            return undefined;
        }
        return autosize;
    }

    function isFitType(autoSizeType) {
        return autoSizeType === 'fit' || autoSizeType === 'fit-x' || autoSizeType === 'fit-y';
    }
    function getFitType(sizeType) {
        return sizeType ? `fit-${getPositionScaleChannel(sizeType)}` : 'fit';
    }
    const TOP_LEVEL_PROPERTIES = [
        'background',
        'padding'
        // We do not include "autosize" here as it is supported by only unit and layer specs and thus need to be normalized
    ];
    function extractTopLevelProperties(t) {
        return TOP_LEVEL_PROPERTIES.reduce((o, p) => {
            if (t && t[p] !== undefined) {
                o[p] = t[p];
            }
            return o;
        }, {});
    }

    function isUrlData(data) {
        return !!data['url'];
    }
    function isInlineData(data) {
        return !!data['values'];
    }
    function isNamedData(data) {
        return !!data['name'] && !isUrlData(data) && !isInlineData(data) && !isGenerator(data);
    }
    function isGenerator(data) {
        return data && (isSequenceGenerator(data) || isSphereGenerator(data) || isGraticuleGenerator(data));
    }
    function isSequenceGenerator(data) {
        return !!data['sequence'];
    }
    function isSphereGenerator(data) {
        return !!data['sphere'];
    }
    function isGraticuleGenerator(data) {
        return !!data['graticule'];
    }
    const MAIN = 'main';
    const RAW = 'raw';

    function isFilter(t) {
        return t['filter'] !== undefined;
    }
    function isImputeSequence(t) {
        var _a;
        return ((_a = t) === null || _a === void 0 ? void 0 : _a['stop']) !== undefined;
    }
    function isLookup(t) {
        return t['lookup'] !== undefined;
    }
    function isLookupData(from) {
        return from['data'] !== undefined;
    }
    function isLookupSelection(from) {
        return from['selection'] !== undefined;
    }
    function isPivot(t) {
        return t['pivot'] !== undefined;
    }
    function isDensity(t) {
        return t['density'] !== undefined;
    }
    function isQuantile(t) {
        return t['quantile'] !== undefined;
    }
    function isRegression(t) {
        return t['regression'] !== undefined;
    }
    function isLoess(t) {
        return t['loess'] !== undefined;
    }
    function isSample(t) {
        return t['sample'] !== undefined;
    }
    function isWindow(t) {
        return t['window'] !== undefined;
    }
    function isJoinAggregate(t) {
        return t['joinaggregate'] !== undefined;
    }
    function isFlatten(t) {
        return t['flatten'] !== undefined;
    }
    function isCalculate(t) {
        return t['calculate'] !== undefined;
    }
    function isBin(t) {
        return !!t['bin'];
    }
    function isImpute(t) {
        return t['impute'] !== undefined;
    }
    function isTimeUnit(t) {
        return t['timeUnit'] !== undefined;
    }
    function isAggregate$1(t) {
        return t['aggregate'] !== undefined;
    }
    function isStack(t) {
        return t['stack'] !== undefined;
    }
    function isFold(t) {
        return t['fold'] !== undefined;
    }
    function normalizeTransform(transform) {
        return transform.map(t => {
            if (isFilter(t)) {
                return {
                    filter: normalizeLogicalComposition(t.filter, normalizePredicate)
                };
            }
            return t;
        });
    }

    /**
     * Parse an event selector string.
     * Returns an array of event stream definitions.
     */
    function parseSelector(selector, source, marks) {
      DEFAULT_SOURCE = source || VIEW;
      MARKS = marks || DEFAULT_MARKS;
      return parseMerge(selector.trim()).map(parseSelector$1);
    }

    var VIEW    = 'view',
        LBRACK  = '[',
        RBRACK  = ']',
        LBRACE  = '{',
        RBRACE  = '}',
        COLON   = ':',
        COMMA   = ',',
        NAME    = '@',
        GT      = '>',
        ILLEGAL = /[[\]{}]/,
        DEFAULT_SOURCE,
        MARKS,
        DEFAULT_MARKS = {
          '*': 1,
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
        };

    function isMarkType(type) {
      return MARKS[type];
    }

    function find(s, i, endChar, pushChar, popChar) {
      var count = 0,
          n = s.length,
          c;
      for (; i<n; ++i) {
        c = s[i];
        if (!count && c === endChar) return i;
        else if (popChar && popChar.indexOf(c) >= 0) --count;
        else if (pushChar && pushChar.indexOf(c) >= 0) ++count;
      }
      return i;
    }

    function parseMerge(s) {
      var output = [],
          start = 0,
          n = s.length,
          i = 0;

      while (i < n) {
        i = find(s, i, COMMA, LBRACK + LBRACE, RBRACK + RBRACE);
        output.push(s.substring(start, i).trim());
        start = ++i;
      }

      if (output.length === 0) {
        throw 'Empty event selector: ' + s;
      }
      return output;
    }

    function parseSelector$1(s) {
      return s[0] === '['
        ? parseBetween(s)
        : parseStream(s);
    }

    function parseBetween(s) {
      var n = s.length,
          i = 1,
          b, stream;

      i = find(s, i, RBRACK, LBRACK, RBRACK);
      if (i === n) {
        throw 'Empty between selector: ' + s;
      }

      b = parseMerge(s.substring(1, i));
      if (b.length !== 2) {
        throw 'Between selector must have two elements: ' + s;
      }

      s = s.slice(i + 1).trim();
      if (s[0] !== GT) {
        throw 'Expected \'>\' after between selector: ' + s;
      }

      b = b.map(parseSelector$1);

      stream = parseSelector$1(s.slice(1).trim());
      if (stream.between) {
        return {
          between: b,
          stream: stream
        };
      } else {
        stream.between = b;
      }

      return stream;
    }

    function parseStream(s) {
      var stream = {source: DEFAULT_SOURCE},
          source = [],
          throttle = [0, 0],
          markname = 0,
          start = 0,
          n = s.length,
          i = 0, j,
          filter;

      // extract throttle from end
      if (s[n-1] === RBRACE) {
        i = s.lastIndexOf(LBRACE);
        if (i >= 0) {
          try {
            throttle = parseThrottle(s.substring(i+1, n-1));
          } catch (e) {
            throw 'Invalid throttle specification: ' + s;
          }
          s = s.slice(0, i).trim();
          n = s.length;
        } else throw 'Unmatched right brace: ' + s;
        i = 0;
      }

      if (!n) throw s;

      // set name flag based on first char
      if (s[0] === NAME) markname = ++i;

      // extract first part of multi-part stream selector
      j = find(s, i, COLON);
      if (j < n) {
        source.push(s.substring(start, j).trim());
        start = i = ++j;
      }

      // extract remaining part of stream selector
      i = find(s, i, LBRACK);
      if (i === n) {
        source.push(s.substring(start, n).trim());
      } else {
        source.push(s.substring(start, i).trim());
        filter = [];
        start = ++i;
        if (start === n) throw 'Unmatched left bracket: ' + s;
      }

      // extract filters
      while (i < n) {
        i = find(s, i, RBRACK);
        if (i === n) throw 'Unmatched left bracket: ' + s;
        filter.push(s.substring(start, i).trim());
        if (i < n-1 && s[++i] !== LBRACK) throw 'Expected left bracket: ' + s;
        start = ++i;
      }

      // marshall event stream specification
      if (!(n = source.length) || ILLEGAL.test(source[n-1])) {
        throw 'Invalid event selector: ' + s;
      }

      if (n > 1) {
        stream.type = source[1];
        if (markname) {
          stream.markname = source[0].slice(1);
        } else if (isMarkType(source[0])) {
          stream.marktype = source[0];
        } else {
          stream.source = source[0];
        }
      } else {
        stream.type = source[0];
      }
      if (stream.type.slice(-1) === '!') {
        stream.consume = true;
        stream.type = stream.type.slice(0, -1);
      }
      if (filter != null) stream.filter = filter;
      if (throttle[0]) stream.throttle = throttle[0];
      if (throttle[1]) stream.debounce = throttle[1];

      return stream;
    }

    function parseThrottle(s) {
      var a = s.split(COMMA);
      if (!s.length || a.length > 2) throw s;
      return a.map(function(_) {
        var x = +_;
        if (x !== x) throw s;
        return x;
      });
    }

    /**
     * Return a mixin that includes a Vega production rule for a Vega-Lite conditional channel definition.
     * or a simple mixin if channel def has no condition.
     */
    function wrapCondition(model, channelDef, vgChannel, refFn) {
        const condition = channelDef && channelDef.condition;
        const valueRef = refFn(channelDef);
        if (condition) {
            const conditions = array(condition);
            const vgConditions = conditions.map(c => {
                const conditionValueRef = refFn(c);
                const test = isConditionalSelection(c)
                    ? parseSelectionPredicate(model, c.selection) // FIXME: remove casting once TS is no longer dumb about it
                    : expression(model, c.test); // FIXME: remove casting once TS is no longer dumb about it
                return Object.assign({ test }, conditionValueRef);
            });
            return {
                [vgChannel]: [...vgConditions, ...(valueRef !== undefined ? [valueRef] : [])]
            };
        }
        else {
            return valueRef !== undefined ? { [vgChannel]: valueRef } : {};
        }
    }

    function midPointRefWithPositionInvalidTest(params) {
        const { channel, channelDef, markDef, scale } = params;
        const ref = midPoint(params);
        // Wrap to check if the positional value is invalid, if so, plot the point on the min value
        if (
        // Only this for field def without counting aggregate (as count wouldn't be null)
        isFieldDef(channelDef) &&
            !isCountingAggregateOp(channelDef.aggregate) &&
            // and only for continuous scale without zero (otherwise, null / invalid will be interpreted as zero, which doesn't cause layout problem)
            scale &&
            isContinuousToContinuous(scale.get('type')) &&
            scale.get('zero') === false) {
            return wrapPositionInvalidTest({
                fieldDef: channelDef,
                channel,
                markDef,
                ref
            });
        }
        return ref;
    }
    function wrapPositionInvalidTest({ fieldDef, channel, markDef, ref }) {
        if (!isPathMark(markDef.type)) {
            // Only do this for non-path mark (as path marks will already use "defined" to skip points)
            return [fieldInvalidTestValueRef(fieldDef, channel), ref];
        }
        return ref;
    }
    function fieldInvalidTestValueRef(fieldDef, channel) {
        const test = fieldInvalidPredicate(fieldDef, true);
        const mainChannel = getMainRangeChannel(channel);
        const zeroValueRef = mainChannel === 'x' ? { value: 0 } : { field: { group: 'height' } };
        return Object.assign({ test }, zeroValueRef);
    }
    function fieldInvalidPredicate(field, invalid = true) {
        return fieldValidPredicate(isString(field) ? field : vgField(field, { expr: 'datum' }), !invalid);
    }
    function fieldRef(fieldDef, scaleName, opt, encode) {
        const ref = Object.assign(Object.assign({}, (scaleName ? { scale: scaleName } : {})), { field: vgField(fieldDef, opt) });
        if (encode) {
            const { offset, band } = encode;
            return Object.assign(Object.assign(Object.assign({}, ref), (offset ? { offset } : {})), (band ? { band } : {}));
        }
        return ref;
    }
    /**
     * Signal that returns the middle of a bin from start and end field. Should only be used with x and y.
     */
    function interpolatedSignalRef({ scaleName, fieldDef, fieldDef2, offset, startSuffix, band = 0.5 }) {
        const expr = 0 < band && band < 1 ? 'datum' : undefined;
        const start = vgField(fieldDef, { expr, suffix: startSuffix });
        const end = fieldDef2 !== undefined ? vgField(fieldDef2, { expr }) : vgField(fieldDef, { suffix: 'end', expr });
        if (band === 0) {
            return Object.assign({ scale: scaleName, field: start }, (offset ? { offset } : {}));
        }
        else if (band === 1) {
            return Object.assign({ scale: scaleName, field: end }, (offset ? { offset } : {}));
        }
        else {
            const datum = `${band} * ${start} + ${1 - band} * ${end}`;
            return Object.assign({ signal: `scale("${scaleName}", ${datum})` }, (offset ? { offset } : {}));
        }
    }
    /**
     * @returns {VgValueRef} Value Ref for xc / yc or mid point for other channels.
     */
    function midPoint({ channel, channelDef, channel2Def, markDef, config, scaleName, scale, stack, offset, defaultRef }) {
        // TODO: datum support
        if (channelDef) {
            /* istanbul ignore else */
            if (isFieldDef(channelDef)) {
                if (isTypedFieldDef(channelDef)) {
                    const band = getBand(channel, channelDef, channel2Def, markDef, config, { isMidPoint: true });
                    if (isBinning(channelDef.bin) || (band && channelDef.timeUnit)) {
                        // Use middle only for x an y to place marks in the center between start and end of the bin range.
                        // We do not use the mid point for other channels (e.g. size) so that properties of legends and marks match.
                        if (contains([X, Y], channel) && contains([QUANTITATIVE, TEMPORAL], channelDef.type)) {
                            if (stack && stack.impute) {
                                // For stack, we computed bin_mid so we can impute.
                                return fieldRef(channelDef, scaleName, { binSuffix: 'mid' }, { offset });
                            }
                            // For non-stack, we can just calculate bin mid on the fly using signal.
                            return interpolatedSignalRef({ scaleName, fieldDef: channelDef, band, offset });
                        }
                        return fieldRef(channelDef, scaleName, binRequiresRange(channelDef, channel) ? { binSuffix: 'range' } : {}, {
                            offset
                        });
                    }
                    else if (isBinned(channelDef.bin)) {
                        if (isFieldDef(channel2Def)) {
                            return interpolatedSignalRef({ scaleName, fieldDef: channelDef, fieldDef2: channel2Def, band, offset });
                        }
                        else {
                            const channel2 = channel === X ? X2 : Y2;
                            warn(message.channelRequiredForBinned(channel2));
                        }
                    }
                }
                if (scale) {
                    const scaleType = scale.get('type');
                    if (hasDiscreteDomain(scaleType)) {
                        if (scaleType === 'band') {
                            // For band, to get mid point, need to offset by half of the band
                            const band = getFirstDefined(isPositionFieldDef(channelDef) ? channelDef.band : undefined, 0.5);
                            return fieldRef(channelDef, scaleName, { binSuffix: 'range' }, { band, offset });
                        }
                        return fieldRef(channelDef, scaleName, { binSuffix: 'range' }, { offset });
                    }
                }
                return fieldRef(channelDef, scaleName, {}, { offset }); // no need for bin suffix
            }
            else if (isValueDef(channelDef)) {
                const value = channelDef.value;
                const offsetMixins = offset ? { offset } : {};
                return Object.assign(Object.assign({}, widthHeightValueRef(channel, value)), offsetMixins);
            }
            else if (isSignalRef(channelDef)) {
                return channelDef;
            }
            // If channelDef is neither field def or value def, it's a condition-only def.
            // In such case, we will use default ref.
        }
        const ref = isFunction(defaultRef) ? Object.assign(Object.assign({}, defaultRef()), (offset ? { offset } : {})) : defaultRef;
        if (ref) {
            // for non-position, ref could be undefined.
            return Object.assign(Object.assign({}, ref), (offset ? { offset } : {}));
        }
        return ref;
    }
    /**
     * Convert special "width" and "height" values in Vega-Lite into Vega value ref.
     */
    function widthHeightValueRef(channel, value) {
        if (contains(['x', 'x2'], channel) && value === 'width') {
            return { field: { group: 'width' } };
        }
        else if (contains(['y', 'y2'], channel) && value === 'height') {
            return { field: { group: 'height' } };
        }
        return signalOrValueRef(value);
    }

    /**
     * Return encode for non-positional channels with scales. (Text doesn't have scale.)
     */
    function nonPosition(channel, model, opt = {}) {
        const { markDef, encoding, config } = model;
        const { vgChannel = channel } = opt;
        let { defaultRef, defaultValue } = opt;
        if (defaultRef === undefined) {
            // prettier-ignore
            defaultValue = (defaultValue !== null && defaultValue !== void 0 ? defaultValue : (vgChannel === channel
                ? // When vl channel is the same as Vega's, no need to read from config as Vega will apply them correctly
                    markDef[channel]
                : // However, when they are different (e.g, vl's text size is vg fontSize), need to read "size" from configs
                    getFirstDefined(markDef[channel], markDef[vgChannel], getMarkConfig(channel, markDef, config, { vgChannel }))));
            if (defaultValue !== undefined) {
                defaultRef = signalOrValueRef(defaultValue);
            }
        }
        const channelDef = encoding[channel];
        return wrapCondition(model, channelDef, vgChannel, cDef => {
            return midPoint({
                channel,
                channelDef: cDef,
                markDef,
                config,
                scaleName: model.scaleName(channel),
                scale: model.getScaleComponent(channel),
                stack: null,
                defaultRef
            });
        });
    }

    function color$1(model, opt = { filled: undefined }) {
        const { markDef, encoding, config } = model;
        const { type: markType } = markDef;
        // Allow filled to be overridden (for trail's "filled")
        const filled = getFirstDefined(opt.filled, markDef.filled);
        const configValue = {
            fill: getMarkConfig('fill', markDef, config),
            stroke: getMarkConfig('stroke', markDef, config),
            color: getMarkConfig('color', markDef, config)
        };
        const transparentIfNeeded = contains(['bar', 'point', 'circle', 'square', 'geoshape'], markType)
            ? 'transparent'
            : undefined;
        const defaultFill = getFirstDefined(markDef.fill, filled === true ? markDef.color : undefined, configValue.fill, filled === true ? configValue.color : undefined, 
        // If there is no fill, always fill symbols, bar, geoshape
        // with transparent fills https://github.com/vega/vega-lite/issues/1316
        transparentIfNeeded);
        const defaultStroke = getFirstDefined(markDef.stroke, filled === false ? markDef.color : undefined, configValue.stroke, filled === false ? configValue.color : undefined);
        const colorVgChannel = filled ? 'fill' : 'stroke';
        const fillStrokeMarkDefAndConfig = Object.assign(Object.assign({}, (defaultFill ? { fill: signalOrValueRef(defaultFill) } : {})), (defaultStroke ? { stroke: signalOrValueRef(defaultStroke) } : {}));
        if (markDef.color && (filled ? markDef.fill : markDef.stroke)) {
            warn(message.droppingColor('property', { fill: 'fill' in markDef, stroke: 'stroke' in markDef }));
        }
        return Object.assign(Object.assign(Object.assign(Object.assign({}, fillStrokeMarkDefAndConfig), nonPosition('color', model, {
            vgChannel: colorVgChannel,
            defaultValue: filled ? defaultFill : defaultStroke
        })), nonPosition('fill', model, {
            // if there is encoding.fill, include default fill just in case we have conditional-only fill encoding
            defaultValue: encoding.fill ? defaultFill : undefined
        })), nonPosition('stroke', model, {
            // if there is encoding.stroke, include default fill just in case we have conditional-only stroke encoding
            defaultValue: encoding.stroke ? defaultStroke : undefined
        }));
    }

    function text(model, channel = 'text') {
        const channelDef = model.encoding[channel];
        return wrapCondition(model, channelDef, channel, cDef => textRef(cDef, model.config));
    }
    function textRef(channelDef, config, expr = 'datum') {
        // text
        if (channelDef) {
            if (isValueDef(channelDef)) {
                return { value: channelDef.value };
            }
            if (isTypedFieldDef(channelDef)) {
                return formatSignalRef(channelDef, format$1(channelDef), expr, config);
            }
        }
        return undefined;
    }

    function tooltip(model, opt = {}) {
        const { encoding, markDef, config } = model;
        const channelDef = encoding.tooltip;
        if (isArray(channelDef)) {
            return { tooltip: tooltipRefForEncoding({ tooltip: channelDef }, config, opt) };
        }
        else {
            return wrapCondition(model, channelDef, 'tooltip', cDef => {
                // use valueRef based on channelDef first
                const tooltipRefFromChannelDef = textRef(cDef, model.config, opt.reactiveGeom ? 'datum.datum' : 'datum');
                if (tooltipRefFromChannelDef) {
                    return tooltipRefFromChannelDef;
                }
                if (cDef === null) {
                    // Allow using encoding.tooltip = null to disable tooltip
                    return undefined;
                }
                // If tooltipDef does not exist, then use value from markDef or config
                let markTooltip = getFirstDefined(markDef.tooltip, getMarkConfig('tooltip', markDef, config));
                if (markTooltip === true) {
                    markTooltip = { content: 'encoding' };
                }
                if (isString(markTooltip)) {
                    return { value: markTooltip };
                }
                else if (isObject(markTooltip)) {
                    // `tooltip` is `{fields: 'encodings' | 'fields'}`
                    if (markTooltip.content === 'encoding') {
                        return tooltipRefForEncoding(encoding, config, opt);
                    }
                    else {
                        return { signal: 'datum' };
                    }
                }
                return undefined;
            });
        }
    }
    function tooltipRefForEncoding(encoding, config, { reactiveGeom } = {}) {
        const keyValues = [];
        const usedKey = {};
        const toSkip = {};
        const expr = reactiveGeom ? 'datum.datum' : 'datum';
        const tooltipTuples = [];
        function add(fDef, channel) {
            const mainChannel = getMainRangeChannel(channel);
            const fieldDef = isTypedFieldDef(fDef)
                ? fDef
                : Object.assign(Object.assign({}, fDef), { type: encoding[mainChannel].type // for secondary field def, copy type from main channel
                 });
            const key = array(title(fieldDef, config, { allowDisabling: false })).join(', ');
            let value = textRef(fieldDef, config, expr).signal;
            if (channel === 'x' || channel === 'y') {
                const channel2 = channel === 'x' ? 'x2' : 'y2';
                const fieldDef2 = getFieldDef(encoding[channel2]);
                if (isBinned(fieldDef.bin) && fieldDef2) {
                    const startField = vgField(fieldDef, { expr });
                    const endField = vgField(fieldDef2, { expr });
                    value = binFormatExpression(startField, endField, format$1(fieldDef), config);
                    toSkip[channel2] = true;
                }
            }
            tooltipTuples.push({ channel, key, value });
        }
        forEach(encoding, (channelDef, channel) => {
            if (isFieldDef(channelDef)) {
                add(channelDef, channel);
            }
            else if (hasConditionalFieldDef(channelDef)) {
                add(channelDef.condition, channel);
            }
        });
        for (const { channel, key, value } of tooltipTuples) {
            if (!toSkip[channel] && !usedKey[key]) {
                keyValues.push(`${$(key)}: ${value}`);
                usedKey[key] = true;
            }
        }
        return keyValues.length > 0 ? { signal: `{${keyValues.join(', ')}}` } : undefined;
    }

    function getOffset(channel, markDef) {
        const offsetChannel = (channel + 'Offset'); // Need to cast as the type can't be inferred automatically
        // TODO: in the future read from encoding channel too
        const markDefOffsetValue = markDef[offsetChannel];
        if (markDefOffsetValue) {
            return markDefOffsetValue;
        }
        return undefined;
    }

    /**
     * Return encode for point (non-band) position channels.
     */
    function pointPosition(channel, model, { defaultPos, vgChannel }) {
        const { encoding, markDef, config, stack } = model;
        const channelDef = encoding[channel];
        const channel2Def = encoding[channel === X ? X2 : Y2];
        const scaleName = model.scaleName(channel);
        const scale = model.getScaleComponent(channel);
        const offset = getOffset(channel, markDef);
        // Get default position or position from mark def
        const defaultRef = pointPositionDefaultRef({
            model,
            defaultPos,
            channel,
            scaleName,
            scale,
            checkBarAreaWithoutZero: !channel2Def // only check for non-ranged marks
        });
        const valueRef = !channelDef && (encoding.latitude || encoding.longitude)
            ? // use geopoint output if there are lat/long and there is no point position overriding lat/long.
                { field: model.getName(channel) }
            : positionRef({
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
            });
        return {
            [(vgChannel !== null && vgChannel !== void 0 ? vgChannel : channel)]: valueRef
        };
    }
    // TODO: we need to find a way to refactor these so that scaleName is a part of scale
    // but that's complicated. For now, this is a huge step moving forward.
    /**
     * @return Vega ValueRef for normal x- or y-position without projection
     */
    function positionRef(params) {
        const { channel, channelDef, scaleName, stack, offset } = params;
        // This isn't a part of midPoint because we use midPoint for non-position too
        if (isFieldDef(channelDef) && stack && channel === stack.fieldChannel) {
            if (isPositionFieldDef(channelDef) && channelDef.band !== undefined) {
                return interpolatedSignalRef({
                    scaleName,
                    fieldDef: channelDef,
                    startSuffix: 'start',
                    band: channelDef.band,
                    offset: 0
                });
            }
            // x or y use stack_end so that stacked line's point mark use stack_end too.
            return fieldRef(channelDef, scaleName, { suffix: 'end' }, { offset });
        }
        return midPointRefWithPositionInvalidTest(params);
    }
    function pointPositionDefaultRef({ model, defaultPos, channel, scaleName, scale, checkBarAreaWithoutZero: checkBarAreaWithZero }) {
        const { mark, markDef, config } = model;
        return () => {
            const mainChannel = getMainRangeChannel(channel);
            const definedValueOrConfig = getFirstDefined(markDef[channel], getMarkConfig(channel, markDef, config));
            if (definedValueOrConfig !== undefined) {
                return widthHeightValueRef(channel, definedValueOrConfig);
            }
            if (defaultPos === 'zeroOrMin' || defaultPos === 'zeroOrMax') {
                if (scaleName) {
                    const scaleType = scale.get('type');
                    if (contains([ScaleType.LOG, ScaleType.TIME, ScaleType.UTC], scaleType)) {
                        // Log scales cannot have zero.
                        // Zero in time scale is arbitrary, and does not affect ratio.
                        // (Time is an interval level of measurement, not ratio).
                        // See https://en.wikipedia.org/wiki/Level_of_measurement for more info.
                        if (checkBarAreaWithZero && (mark === 'bar' || mark === 'area' || mark === 'rule')) {
                            warn(message.nonZeroScaleUsedWithLengthMark(mark, mainChannel, { scaleType }));
                        }
                    }
                    else {
                        if (scale.domainDefinitelyIncludesZero()) {
                            return {
                                scale: scaleName,
                                value: 0
                            };
                        }
                        if (checkBarAreaWithZero && (mark === 'bar' || mark === 'area')) {
                            warn(message.nonZeroScaleUsedWithLengthMark(mark, mainChannel, { zeroFalse: scale.explicit.zero === false }));
                        }
                    }
                }
                if (defaultPos === 'zeroOrMin') {
                    return mainChannel === 'x' ? { value: 0 } : { field: { group: 'height' } };
                }
                else {
                    // zeroOrMax
                    return mainChannel === 'x' ? { field: { group: 'width' } } : { value: 0 };
                }
            }
            else {
                // mid
                const sizeRef = model[mainChannel === 'x' ? 'width' : 'height'];
                return Object.assign(Object.assign({}, sizeRef), { mult: 0.5 });
            }
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
    function alignedPositionChannel(channel, markDef, config) {
        const alignChannel = channel === 'x' ? 'align' : 'baseline';
        const align = getFirstDefined(markDef[alignChannel], getMarkConfig(alignChannel, markDef, config));
        if (channel === 'x') {
            return ALIGNED_X_CHANNEL[(align !== null && align !== void 0 ? align : 'center')];
        }
        else {
            return BASELINED_Y_CHANNEL[(align !== null && align !== void 0 ? align : 'middle')];
        }
    }

    /**
     * Utility for area/rule position, which can be either point or range. (One of the axes should be point and the other should be range.)
     */
    function pointOrRangePosition(channel, model, { defaultPos, defaultPos2, range }) {
        if (range) {
            return rangePosition(channel, model, { defaultPos, defaultPos2 });
        }
        return pointPosition(channel, model, { defaultPos });
    }
    function rangePosition(channel, model, { defaultPos, defaultPos2 }) {
        const { markDef, config } = model;
        const channel2 = channel === 'x' ? 'x2' : 'y2';
        const sizeChannel = channel === 'x' ? 'width' : 'height';
        const pos2Mixins = pointPosition2(model, defaultPos2, channel2);
        // If there is width/height, we need to position the marks based on the alignment.
        const vgChannel = pos2Mixins[sizeChannel] ? alignedPositionChannel(channel, markDef, config) : channel;
        return Object.assign(Object.assign({}, pointPosition(channel, model, { defaultPos, vgChannel })), pos2Mixins);
    }
    /**
     * Return encode for x2, y2.
     * If channel is not specified, return one channel based on orientation.
     */
    function pointPosition2(model, defaultPos, channel) {
        const { encoding, mark, markDef, stack, config } = model;
        const baseChannel = channel === 'x2' ? 'x' : 'y';
        const sizeChannel = channel === 'x2' ? 'width' : 'height';
        const channelDef = encoding[baseChannel];
        const scaleName = model.scaleName(baseChannel);
        const scale = model.getScaleComponent(baseChannel);
        const offset = getOffset(channel, model.markDef);
        if (!channelDef && (encoding.latitude || encoding.longitude)) {
            // use geopoint output if there are lat2/long2 and there is no point position2 overriding lat2/long2.
            return { [channel]: { field: model.getName(channel) } };
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
            return { [channel]: valueRef };
        }
        const defaultRef = pointPositionDefaultRef({
            model,
            defaultPos,
            channel,
            scaleName,
            scale,
            checkBarAreaWithoutZero: !encoding[channel] // only check for non-ranged marks
        })();
        // TODO: check width/height encoding here once we add them
        // no x2/y2 encoding, then try to read x2/y2 or width/height based on precedence:
        // markDef > config.style > mark-specific config (config[mark]) > general mark config (config.mark)
        return getFirstDefined(position2orSize(channel, markDef), position2orSize(channel, {
            [channel]: getMarkStyleConfig(channel, markDef, config.style),
            [sizeChannel]: getMarkStyleConfig(sizeChannel, markDef, config.style)
        }), position2orSize(channel, config[mark]), position2orSize(channel, config.mark), {
            [channel]: defaultRef
        });
    }
    function position2Ref({ channel, channelDef, channel2Def, markDef, config, scaleName, scale, stack, offset, defaultRef }) {
        if (isFieldDef(channelDef) &&
            stack &&
            // If fieldChannel is X and channel is X2 (or Y and Y2)
            channel.charAt(0) === stack.fieldChannel.charAt(0)) {
            return fieldRef(channelDef, scaleName, { suffix: 'start' }, { offset });
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
        const sizeChannel = channel === 'x2' ? 'width' : 'height';
        if (markDef[channel]) {
            return { [channel]: widthHeightValueRef(channel, markDef[channel]) };
        }
        else if (markDef[sizeChannel]) {
            return { [sizeChannel]: { value: markDef[sizeChannel] } };
        }
        return undefined;
    }

    function rectPosition(model, channel, mark) {
        var _a, _b, _c, _d;
        const { config, encoding, markDef } = model;
        const channel2 = channel === 'x' ? 'x2' : 'y2';
        const sizeChannel = channel === 'x' ? 'width' : 'height';
        const fieldDef = encoding[channel];
        const fieldDef2 = encoding[channel2];
        const scale = model.getScaleComponent(channel);
        const scaleType = scale ? scale.get('type') : undefined;
        const scaleName = model.scaleName(channel);
        const orient = markDef.orient;
        const hasSizeDef = (_d = (_c = (_b = (_a = encoding[sizeChannel], (_a !== null && _a !== void 0 ? _a : encoding.size)), (_b !== null && _b !== void 0 ? _b : markDef[sizeChannel])), (_c !== null && _c !== void 0 ? _c : markDef.size)), (_d !== null && _d !== void 0 ? _d : getMarkConfig('size', markDef, config, { vgChannel: sizeChannel })));
        const isBarBand = channel === 'x' ? orient === 'vertical' : orient === 'horizontal';
        // x, x2, and width -- we must specify two of these in all conditions
        if (isFieldDef(fieldDef) &&
            (isBinning(fieldDef.bin) || isBinned(fieldDef.bin) || (fieldDef.timeUnit && !fieldDef2)) &&
            !hasSizeDef &&
            !hasDiscreteDomain(scaleType)) {
            const band = getBand(channel, fieldDef, undefined, markDef, config);
            return rectBinPosition({
                fieldDef,
                fieldDef2,
                channel,
                markDef,
                scaleName,
                band,
                spacing: getFirstDefined(markDef.binSpacing, config[mark].binSpacing),
                reverse: scale.get('reverse')
            });
        }
        else if (((isFieldDef(fieldDef) && hasDiscreteDomain(scaleType)) || isBarBand) && !fieldDef2) {
            // vertical
            if (isFieldDef(fieldDef) && scaleType === ScaleType.BAND) {
                const band = isPositionFieldDef(fieldDef) ? fieldDef.band : undefined;
                return rectBandPosition(fieldDef, channel, model, defaultSizeRef(mark, markDef, sizeChannel, scaleName, scale, config, band));
            }
            // sized bin, normal point-ordinal axis, quantitative x-axis, or no x
            return centeredPointPositionWithSize(channel, model, defaultSizeRef(mark, markDef, sizeChannel, scaleName, scale, config));
        }
        else {
            return rangePosition(channel, model, { defaultPos: 'zeroOrMax', defaultPos2: 'zeroOrMin' });
        }
    }
    function centeredPointPositionWithSize(channel, model, sizeRef) {
        const centerChannel = channel === 'x' ? 'xc' : 'yc';
        const sizeChannel = channel === 'x' ? 'width' : 'height';
        return Object.assign(Object.assign({}, pointPosition(channel, model, { defaultPos: 'mid', vgChannel: centerChannel })), nonPosition('size', model, { defaultRef: sizeRef, vgChannel: sizeChannel }));
    }
    function defaultSizeRef(mark, markDef, sizeChannel, scaleName, scale, config, band) {
        const markPropOrConfig = getFirstDefined(markDef[sizeChannel], markDef.size, 
        // TODO: deal with sizeChannel config
        getMarkConfig('size', markDef, config, { vgChannel: sizeChannel }));
        if (markPropOrConfig !== undefined) {
            return signalOrValueRef(markPropOrConfig);
        }
        if (scale) {
            const scaleType = scale.get('type');
            if (scaleType === 'point' || scaleType === 'band') {
                if (config[mark].discreteBandSize !== undefined) {
                    return { value: config[mark].discreteBandSize };
                }
                if (scaleType === ScaleType.POINT) {
                    const scaleRange = scale.get('range');
                    if (isVgRangeStep(scaleRange) && isNumber(scaleRange.step)) {
                        return { value: scaleRange.step - 2 };
                    }
                    return { value: DEFAULT_STEP - 2 };
                }
                else {
                    // BAND
                    return bandRef(scaleName, band);
                }
            }
            else {
                // continuous scale
                return { value: config[mark].continuousBandSize };
            }
        }
        // No Scale
        const step = getViewConfigDiscreteStep(config.view, sizeChannel);
        const value = getFirstDefined(
        // No scale is like discrete bar (with one item)
        config[mark].discreteBandSize, step - 2);
        return { value };
    }
    function bandRef(scaleName, band = true) {
        return {
            scale: scaleName,
            band: band
        };
    }
    function rectBandPosition(fieldDef, channel, model, sizeRef) {
        var _a;
        const scaleName = model.scaleName(channel);
        const sizeChannel = channel === 'x' ? 'width' : 'height';
        const { markDef, encoding, config } = model;
        const vgChannel = alignedPositionChannel(channel, markDef, config);
        const offset = getOffset(channel, markDef);
        const centeredBandPositionMixins = {
            [vgChannel]: fieldRef(fieldDef, scaleName, {}, { band: 0.5, offset })
        };
        if (encoding.size || (markDef.size !== null && markDef.size !== undefined)) {
            const orient = markDef.orient;
            if (orient) {
                if (getTypedFieldDef(encoding.size) || isValueDef(encoding.size)) {
                    return Object.assign(Object.assign({}, centeredBandPositionMixins), nonPosition('size', model, { vgChannel: sizeChannel }));
                }
                else if (markDef.size !== undefined) {
                    return Object.assign(Object.assign({}, centeredBandPositionMixins), { [sizeChannel]: { value: markDef.size } });
                }
            }
            else {
                warn(message.cannotApplySizeToNonOrientedMark(markDef.type));
            }
        }
        if (((_a = sizeRef) === null || _a === void 0 ? void 0 : _a.value) !== undefined) {
            return Object.assign(Object.assign({}, centeredBandPositionMixins), { [sizeChannel]: sizeRef });
        }
        const { band = 1 } = fieldDef;
        return {
            [channel]: fieldRef(fieldDef, scaleName, { binSuffix: 'range' }, { band: (1 - band) / 2, offset }),
            [sizeChannel]: (sizeRef !== null && sizeRef !== void 0 ? sizeRef : bandRef(scaleName, band))
        };
    }
    function getBinSpacing(channel, spacing, reverse) {
        if (isSignalRef(reverse)) {
            if (channel === 'x' || channel === 'y2') {
                return { signal: `${reverse.signal} ? ${spacing} : 0` };
            }
            else {
                return { signal: `${reverse.signal} ? 0 : ${spacing}` };
            }
        }
        else {
            const spacingIndex = {
                x: reverse ? spacing : 0,
                x2: reverse ? 0 : spacing,
                y: reverse ? 0 : spacing,
                y2: reverse ? spacing : 0
            };
            return spacingIndex[channel];
        }
    }
    function rectBinPosition({ fieldDef, fieldDef2, channel, band, scaleName, markDef, spacing = 0, reverse }) {
        const channel2 = channel === X ? X2 : Y2;
        if (isBinning(fieldDef.bin) || fieldDef.timeUnit) {
            return {
                [channel2]: rectBinRef({
                    channel,
                    fieldDef,
                    scaleName,
                    markDef,
                    band: (1 - band) / 2,
                    offset: getBinSpacing(channel2, spacing, reverse)
                }),
                [channel]: rectBinRef({
                    channel,
                    fieldDef,
                    scaleName,
                    markDef,
                    band: 1 - (1 - band) / 2,
                    offset: getBinSpacing(channel, spacing, reverse)
                })
            };
        }
        else if (isBinned(fieldDef.bin) && isFieldDef(fieldDef2)) {
            return {
                [channel2]: fieldRef(fieldDef, scaleName, {}, { offset: getBinSpacing(channel2, spacing, reverse) }),
                [channel]: fieldRef(fieldDef2, scaleName, {}, { offset: getBinSpacing(channel, spacing, reverse) })
            };
        }
        else {
            warn(message.channelRequiredForBinned(channel2));
            return undefined;
        }
    }
    /**
     * Value Ref for binned fields
     */
    function rectBinRef({ channel, fieldDef, scaleName, markDef, band, offset }) {
        const r = interpolatedSignalRef({
            scaleName,
            fieldDef,
            band,
            offset
        });
        return wrapPositionInvalidTest({
            fieldDef,
            channel,
            markDef,
            ref: r
        });
    }

    function baseEncodeEntry(model, ignore) {
        const { fill = undefined, stroke = undefined } = ignore.color === 'include' ? color$1(model) : {};
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, markDefProperties(model.markDef, ignore)), wrapAllFieldsInvalid(model, 'fill', fill)), wrapAllFieldsInvalid(model, 'stroke', stroke)), nonPosition('opacity', model)), nonPosition('fillOpacity', model)), nonPosition('strokeOpacity', model)), nonPosition('strokeWidth', model)), nonPosition('strokeDash', model)), tooltip(model)), text(model, 'href'));
    }
    // TODO: mark VgValueRef[] as readonly after https://github.com/vega/vega/pull/1987
    function wrapAllFieldsInvalid(model, channel, valueRef) {
        const { config, mark, markDef } = model;
        const invalid = getMarkPropOrConfig('invalid', markDef, config);
        if (invalid === 'hide' && valueRef && !isPathMark(mark)) {
            // For non-path marks, we have to exclude invalid values (null and NaN) for scales with continuous domains.
            // For path marks, we will use "defined" property and skip these values instead.
            const test = allFieldsInvalidPredicate(model, { invalid: true, channels: SCALE_CHANNELS });
            if (test) {
                return {
                    [channel]: [
                        // prepend the invalid case
                        // TODO: support custom value
                        { test, value: null },
                        ...array(valueRef)
                    ]
                };
            }
        }
        return valueRef ? { [channel]: valueRef } : {};
    }
    function markDefProperties(mark, ignore) {
        return VG_MARK_CONFIGS.reduce((m, prop) => {
            if (mark[prop] !== undefined && ignore[prop] !== 'ignore') {
                m[prop] = { value: mark[prop] };
            }
            return m;
        }, {});
    }
    function allFieldsInvalidPredicate(model, { invalid = false, channels }) {
        const filterIndex = channels.reduce((aggregator, channel) => {
            const scaleComponent = model.getScaleComponent(channel);
            if (scaleComponent) {
                const scaleType = scaleComponent.get('type');
                const field = model.vgField(channel, { expr: 'datum' });
                // While discrete domain scales can handle invalid values, continuous scales can't.
                if (field && hasContinuousDomain(scaleType)) {
                    aggregator[field] = true;
                }
            }
            return aggregator;
        }, {});
        const fields = keys(filterIndex);
        if (fields.length > 0) {
            const op = invalid ? '||' : '&&';
            return fields.map(field => fieldInvalidPredicate(field, invalid)).join(` ${op} `);
        }
        return undefined;
    }

    function defined(model) {
        const { config, markDef } = model;
        const invalid = getMarkPropOrConfig('invalid', markDef, config);
        if (invalid) {
            const signal = allFieldsInvalidPredicate$1(model, { channels: ['x', 'y'] });
            if (signal) {
                return { defined: { signal } };
            }
        }
        return {};
    }
    function allFieldsInvalidPredicate$1(model, { invalid = false, channels }) {
        const filterIndex = channels.reduce((aggregator, channel) => {
            const scaleComponent = model.getScaleComponent(channel);
            if (scaleComponent) {
                const scaleType = scaleComponent.get('type');
                const field = model.vgField(channel, { expr: 'datum' });
                // While discrete domain scales can handle invalid values, continuous scales can't.
                if (field && hasContinuousDomain(scaleType)) {
                    aggregator[field] = true;
                }
            }
            return aggregator;
        }, {});
        const fields = keys(filterIndex);
        if (fields.length > 0) {
            const op = invalid ? '||' : '&&';
            return fields.map(field => fieldInvalidPredicate(field, invalid)).join(` ${op} `);
        }
        return undefined;
    }
    function valueIfDefined(prop, value) {
        if (value !== undefined) {
            return { [prop]: { value: value } };
        }
        return undefined;
    }

    const VORONOI = 'voronoi';
    const nearest = {
        has: selCmpt => {
            return selCmpt.type !== 'interval' && selCmpt.nearest;
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
            const { x, y } = selCmpt.project.hasChannel;
            const markType = model.mark;
            if (isPathMark(markType)) {
                warn(message.nearestNotSupportForContinuous(markType));
                return marks;
            }
            const cellDef = {
                name: model.getName(VORONOI),
                type: 'path',
                interactive: true,
                from: { data: model.getName('marks') },
                encode: {
                    update: Object.assign({ fill: { value: 'transparent' }, strokeWidth: { value: 0.35 }, stroke: { value: 'transparent' }, isVoronoi: { value: true } }, tooltip(model, { reactiveGeom: true }))
                },
                transform: [
                    {
                        type: 'voronoi',
                        x: { expr: x || !y ? 'datum.datum.x || 0' : '0' },
                        y: { expr: y || !x ? 'datum.datum.y || 0' : '0' },
                        size: [model.getSizeSignalRef('width'), model.getSizeSignalRef('height')]
                    }
                ]
            };
            let index = 0;
            let exists = false;
            marks.forEach((mark, i) => {
                var _a;
                const name = (_a = mark.name, (_a !== null && _a !== void 0 ? _a : ''));
                if (name === model.component.mark[0].name) {
                    index = i;
                }
                else if (name.indexOf(VORONOI) >= 0) {
                    exists = true;
                }
            });
            if (!exists) {
                marks.splice(index + 1, 0, cellDef);
            }
            return marks;
        }
    };

    /**
     * A node in the dataflow tree.
     */
    class DataFlowNode {
        constructor(parent, debugName) {
            this.debugName = debugName;
            this._children = [];
            this._parent = null;
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
            if (this._children.indexOf(child) > -1) {
                console.warn('Attempt to add the same child twice.');
                return;
            }
            if (loc !== undefined) {
                this._children.splice(loc, 0, child);
            }
            else {
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
            const newParent = parent.parent;
            // reconnect the children
            for (const child of this._children) {
                child.parent = parent;
            }
            // remove old links
            this._children = []; // equivalent to removing every child link one by one
            parent.removeChild(this);
            parent.parent.removeChild(parent);
            // swap two nodes
            this.parent = newParent;
            parent.parent = this;
        }
    }
    class OutputNode extends DataFlowNode {
        /**
         * @param source The name of the source. Will change in assemble.
         * @param type The type of the output node.
         * @param refCounts A global ref counter map.
         */
        constructor(parent, source, type, refCounts) {
            super(parent, source);
            this.type = type;
            this.refCounts = refCounts;
            this._source = this._name = source;
            if (this.refCounts && !(this._name in this.refCounts)) {
                this.refCounts[this._name] = 0;
            }
        }
        clone() {
            const cloneObj = new this.constructor();
            cloneObj.debugName = 'clone_' + this.debugName;
            cloneObj._source = this._source;
            cloneObj._name = 'clone_' + this._name;
            cloneObj.type = this.type;
            cloneObj.refCounts = this.refCounts;
            cloneObj.refCounts[cloneObj._name] = 0;
            return cloneObj;
        }
        dependentFields() {
            return new Set();
        }
        producedFields() {
            return new Set();
        }
        hash() {
            if (this._hash === undefined) {
                this._hash = `Output ${uniqueId()}`;
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
        constructor(parent, formula) {
            super(parent);
            this.formula = formula;
        }
        clone() {
            return new TimeUnitNode(null, duplicate(this.formula));
        }
        static makeFromEncoding(parent, model) {
            const formula = model.reduceFieldDef((timeUnitComponent, fieldDef, channel) => {
                const { field, timeUnit } = fieldDef;
                const channelDef2 = isUnitModel(model) ? model.encoding[getSecondaryRangeChannel(channel)] : undefined;
                const band = isUnitModel(model) && hasBand(channel, fieldDef, channelDef2, model.markDef, model.config);
                if (timeUnit) {
                    const as = vgField(fieldDef, { forAs: true });
                    timeUnitComponent[hash({
                        as,
                        field,
                        timeUnit
                    })] = Object.assign({ as,
                        field,
                        timeUnit }, (band ? { band: true } : {}));
                }
                return timeUnitComponent;
            }, {});
            if (keys(formula).length === 0) {
                return null;
            }
            return new TimeUnitNode(parent, formula);
        }
        static makeFromTransform(parent, t) {
            const _a = Object.assign({}, t), { timeUnit } = _a, other = __rest(_a, ["timeUnit"]);
            const normalizedTimeUnit = normalizeTimeUnit(timeUnit);
            const component = Object.assign(Object.assign({}, other), { timeUnit: normalizedTimeUnit });
            return new TimeUnitNode(parent, {
                [hash(component)]: component
            });
        }
        /**
         * Merge together TimeUnitNodes assigning the children of `other` to `this`
         * and removing `other`.
         */
        merge(other) {
            this.formula = Object.assign({}, this.formula);
            // if the same hash happen twice, merge "band"
            for (const key in other.formula) {
                if (!this.formula[key] || other.formula[key].band) {
                    // copy if it's not a duplicate or if we need to include copy band over
                    this.formula[key] = other.formula[key];
                }
            }
            for (const child of other.children) {
                other.removeChild(child);
                child.parent = this;
            }
            other.remove();
        }
        producedFields() {
            return new Set(vals(this.formula).map(f => f.as));
        }
        dependentFields() {
            return new Set(vals(this.formula).map(f => f.field));
        }
        hash() {
            return `TimeUnit ${hash(this.formula)}`;
        }
        assemble() {
            const transforms = [];
            for (const f of vals(this.formula)) {
                const { field, as, timeUnit } = f;
                const _a = normalizeTimeUnit(timeUnit), { unit, utc } = _a, params = __rest(_a, ["unit", "utc"]);
                transforms.push(Object.assign(Object.assign(Object.assign(Object.assign({ field, type: 'timeunit' }, (unit ? { units: getTimeUnitParts(unit) } : {})), (utc ? { timezone: 'utc' } : {})), params), { as: [as, `${as}_end`] }));
            }
            return transforms;
        }
    }

    const TUPLE_FIELDS = '_tuple_fields';
    class SelectionProjectionComponent {
        constructor(...items) {
            this.items = items;
            this.hasChannel = {};
            this.hasField = {};
        }
    }
    const project = {
        has: () => {
            return true; // This transform handles its own defaults, so always run parse.
        },
        parse: (model, selCmpt, selDef) => {
            var _a, _b, _c;
            const name = selCmpt.name;
            const proj = (_a = selCmpt.project, (_a !== null && _a !== void 0 ? _a : (selCmpt.project = new SelectionProjectionComponent())));
            const parsed = {};
            const timeUnits = {};
            const signals = new Set();
            const signalName = (p, range) => {
                const suffix = range === 'visual' ? p.channel : p.field;
                let sg = varName(`${name}_${suffix}`);
                for (let counter = 1; signals.has(sg); counter++) {
                    sg = varName(`${name}_${suffix}_${counter}`);
                }
                signals.add(sg);
                return { [range]: sg };
            };
            // If no explicit projection (either fields or encodings) is specified, set some defaults.
            // If an initial value is set, try to infer projections.
            // Otherwise, use the default configuration.
            if (!selDef.fields && !selDef.encodings) {
                const cfg = model.config.selection[selDef.type];
                if (selDef.init) {
                    for (const init of array(selDef.init)) {
                        for (const key of keys(init)) {
                            if (isSingleDefUnitChannel(key)) {
                                (selDef.encodings || (selDef.encodings = [])).push(key);
                            }
                            else {
                                if (selDef.type === 'interval') {
                                    warn('Interval selections should be initialized using "x" and/or "y" keys.');
                                    selDef.encodings = cfg.encodings;
                                }
                                else {
                                    (selDef.fields || (selDef.fields = [])).push(key);
                                }
                            }
                        }
                    }
                }
                else {
                    selDef.encodings = cfg.encodings;
                    selDef.fields = cfg.fields;
                }
            }
            // TODO: find a possible channel mapping for these fields.
            for (const field of (_b = selDef.fields, (_b !== null && _b !== void 0 ? _b : []))) {
                const p = { type: 'E', field };
                p.signals = Object.assign({}, signalName(p, 'data'));
                proj.items.push(p);
                proj.hasField[field] = p;
            }
            for (const channel of (_c = selDef.encodings, (_c !== null && _c !== void 0 ? _c : []))) {
                const fieldDef = model.fieldDef(channel);
                if (fieldDef) {
                    let field = fieldDef.field;
                    if (fieldDef.aggregate) {
                        warn(message.cannotProjectAggregate(channel, fieldDef.aggregate));
                        continue;
                    }
                    else if (!field) {
                        warn(message.cannotProjectOnChannelWithoutField(channel));
                        continue;
                    }
                    if (fieldDef.timeUnit) {
                        field = model.vgField(channel);
                        // Construct TimeUnitComponents which will be combined into a
                        // TimeUnitNode. This node may need to be inserted into the
                        // dataflow if the selection is used across views that do not
                        // have these time units defined.
                        const component = {
                            timeUnit: fieldDef.timeUnit,
                            as: field,
                            field: fieldDef.field
                        };
                        timeUnits[hash(component)] = component;
                    }
                    // Prevent duplicate projections on the same field.
                    // TODO: what if the same field is bound to multiple channels (e.g., SPLOM diag).
                    if (!parsed[field]) {
                        // Determine whether the tuple will store enumerated or ranged values.
                        // Interval selections store ranges for continuous scales, and enumerations otherwise.
                        // Single/multi selections store ranges for binned fields, and enumerations otherwise.
                        let type = 'E';
                        if (selCmpt.type === 'interval') {
                            const scaleType = model.getScaleComponent(channel).get('type');
                            if (hasContinuousDomain(scaleType)) {
                                type = 'R';
                            }
                        }
                        else if (fieldDef.bin) {
                            type = 'R-RE';
                        }
                        const p = { field, channel, type };
                        p.signals = Object.assign(Object.assign({}, signalName(p, 'data')), signalName(p, 'visual'));
                        proj.items.push((parsed[field] = p));
                        proj.hasField[field] = proj.hasChannel[channel] = parsed[field];
                    }
                }
                else {
                    warn(message.cannotProjectOnChannelWithoutField(channel));
                }
            }
            if (selDef.init) {
                const parseInit = (i) => {
                    return proj.items.map(p => (i[p.channel] !== undefined ? i[p.channel] : i[p.field]));
                };
                if (selDef.type === 'interval') {
                    selCmpt.init = parseInit(selDef.init);
                }
                else {
                    const init = array(selDef.init);
                    selCmpt.init = init.map(parseInit);
                }
            }
            if (keys(timeUnits).length > 0) {
                proj.timeUnit = new TimeUnitNode(null, timeUnits);
            }
        },
        signals: (model, selCmpt, allSignals) => {
            const name = selCmpt.name + TUPLE_FIELDS;
            const hasSignal = allSignals.filter(s => s.name === name);
            return hasSignal.length > 0
                ? allSignals
                : allSignals.concat({
                    name,
                    value: selCmpt.project.items.map(proj => {
                        const rest = __rest(proj, ["signals", "hasLegend"]);
                        const p = duplicate(rest);
                        p.field = replacePathInField(p.field);
                        return p;
                    })
                });
        }
    };

    const inputBindings = {
        has: selCmpt => {
            return (selCmpt.type === 'single' &&
                selCmpt.resolve === 'global' &&
                selCmpt.bind &&
                selCmpt.bind !== 'scales' &&
                !isLegendBinding(selCmpt.bind));
        },
        parse: (model, selCmpt, selDef, origDef) => {
            // Binding a selection to input widgets disables default direct manipulation interaction.
            // A user can choose to re-enable it by explicitly specifying triggering input events.
            if (!origDef.on)
                delete selCmpt.events;
            if (!origDef.clear)
                delete selCmpt.clear;
        },
        topLevelSignals: (model, selCmpt, signals) => {
            const name = selCmpt.name;
            const proj = selCmpt.project;
            const bind = selCmpt.bind;
            const init = selCmpt.init && selCmpt.init[0]; // Can only exist on single selections (one initial value).
            const datum = nearest.has(selCmpt) ? '(item().isVoronoi ? datum.datum : datum)' : 'datum';
            proj.items.forEach((p, i) => {
                var _a, _b;
                const sgname = varName(`${name}_${p.field}`);
                const hasSignal = signals.filter(s => s.name === sgname);
                if (!hasSignal.length) {
                    signals.unshift(Object.assign(Object.assign({ name: sgname }, (init ? { init: assembleInit(init[i]) } : { value: null })), { on: selCmpt.events
                            ? [
                                {
                                    events: selCmpt.events,
                                    update: `datum && item().mark.marktype !== 'group' ? ${datum}[${$(p.field)}] : null`
                                }
                            ]
                            : [], bind: (_b = (_a = bind[p.field], (_a !== null && _a !== void 0 ? _a : bind[p.channel])), (_b !== null && _b !== void 0 ? _b : bind)) }));
                }
            });
            return signals;
        },
        signals: (model, selCmpt, signals) => {
            const name = selCmpt.name;
            const proj = selCmpt.project;
            const signal = signals.filter(s => s.name === name + TUPLE)[0];
            const fields = name + TUPLE_FIELDS;
            const values = proj.items.map(p => varName(`${name}_${p.field}`));
            const valid = values.map(v => `${v} !== null`).join(' && ');
            if (values.length) {
                signal.update = `${valid} ? {fields: ${fields}, values: [${values.join(', ')}]} : null`;
            }
            delete signal.value;
            delete signal.on;
            return signals;
        }
    };

    const TOGGLE = '_toggle';
    const toggle = {
        has: selCmpt => {
            return selCmpt.type === 'multi' && !!selCmpt.toggle;
        },
        signals: (model, selCmpt, signals) => {
            return signals.concat({
                name: selCmpt.name + TOGGLE,
                value: false,
                on: [{ events: selCmpt.events, update: selCmpt.toggle }]
            });
        },
        modifyExpr: (model, selCmpt) => {
            const tpl = selCmpt.name + TUPLE;
            const signal = selCmpt.name + TOGGLE;
            return (`${signal} ? null : ${tpl}, ` +
                (selCmpt.resolve === 'global' ? `${signal} ? null : true, ` : `${signal} ? null : {unit: ${unitName(model)}}, `) +
                `${signal} ? ${tpl} : null`);
        }
    };

    const clear = {
        has: selCmpt => {
            return selCmpt.clear !== undefined && selCmpt.clear !== false;
        },
        parse: (model, selCmpt, selDef) => {
            if (selDef.clear) {
                selCmpt.clear = isString(selDef.clear) ? parseSelector(selDef.clear, 'scope') : selDef.clear;
            }
        },
        topLevelSignals: (model, selCmpt, signals) => {
            if (inputBindings.has(selCmpt)) {
                selCmpt.project.items.forEach(proj => {
                    const idx = signals.findIndex(n => n.name === varName(`${selCmpt.name}_${proj.field}`));
                    if (idx !== -1) {
                        signals[idx].on.push({ events: selCmpt.clear, update: 'null' });
                    }
                });
            }
            return signals;
        },
        signals: (model, selCmpt, signals) => {
            function addClear(idx, update) {
                if (idx !== -1 && signals[idx].on) {
                    signals[idx].on.push({ events: selCmpt.clear, update });
                }
            }
            // Be as minimalist as possible when adding clear triggers to minimize dataflow execution.
            if (selCmpt.type === 'interval') {
                selCmpt.project.items.forEach(proj => {
                    const vIdx = signals.findIndex(n => n.name === proj.signals.visual);
                    addClear(vIdx, '[0, 0]');
                    if (vIdx === -1) {
                        const dIdx = signals.findIndex(n => n.name === proj.signals.data);
                        addClear(dIdx, 'null');
                    }
                });
            }
            else {
                let tIdx = signals.findIndex(n => n.name === selCmpt.name + TUPLE);
                addClear(tIdx, 'null');
                if (toggle.has(selCmpt)) {
                    tIdx = signals.findIndex(n => n.name === selCmpt.name + TOGGLE);
                    addClear(tIdx, 'false');
                }
            }
            return signals;
        }
    };

    const scaleBindings = {
        has: selCmpt => {
            return selCmpt.type === 'interval' && selCmpt.resolve === 'global' && selCmpt.bind && selCmpt.bind === 'scales';
        },
        parse: (model, selCmpt) => {
            const bound = (selCmpt.scales = []);
            for (const proj of selCmpt.project.items) {
                const channel = proj.channel;
                if (!isScaleChannel(channel)) {
                    continue;
                }
                const scale = model.getScaleComponent(channel);
                const scaleType = scale ? scale.get('type') : undefined;
                if (!scale || !hasContinuousDomain(scaleType)) {
                    warn(message.SCALE_BINDINGS_CONTINUOUS);
                    continue;
                }
                const extent = { selection: selCmpt.name, field: proj.field };
                scale.set('selectionExtent', extent, true);
                bound.push(proj);
                // Bind both x/y for diag plot of repeated views.
                if (model.repeater && model.repeater.row === model.repeater.column) {
                    const scale2 = model.getScaleComponent(channel === X ? Y : X);
                    scale2.set('selectionExtent', extent, true);
                }
            }
        },
        topLevelSignals: (model, selCmpt, signals) => {
            const bound = selCmpt.scales.filter(proj => signals.filter(s => s.name === proj.signals.data).length === 0);
            // Top-level signals are only needed for multiview displays and if this
            // view's top-level signals haven't already been generated.
            if (!model.parent || isTopLevelLayer(model) || bound.length === 0) {
                return signals;
            }
            // vlSelectionResolve does not account for the behavior of bound scales in
            // multiview displays. Each unit view adds a tuple to the store, but the
            // state of the selection is the unit selection most recently updated. This
            // state is captured by the top-level signals that we insert and "push
            // outer" to from within the units. We need to reassemble this state into
            // the top-level named signal, except no single selCmpt has a global view.
            const namedSg = signals.filter(s => s.name === selCmpt.name)[0];
            let update = namedSg.update;
            if (update.indexOf(VL_SELECTION_RESOLVE) >= 0) {
                namedSg.update = `{${bound.map(proj => `${$(proj.field)}: ${proj.signals.data}`).join(', ')}}`;
            }
            else {
                for (const proj of bound) {
                    const mapping = `${$(proj.field)}: ${proj.signals.data}`;
                    if (update.indexOf(mapping) < 0) {
                        update = `${update.substring(0, update.length - 1)}, ${mapping}}`;
                    }
                }
                namedSg.update = update;
            }
            return signals.concat(bound.map(proj => ({ name: proj.signals.data })));
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
        const scale = $(model.scaleName(channel));
        return `domain(${scale})`;
    }
    function isTopLevelLayer(model) {
        var _a;
        return model.parent && isLayerModel(model.parent) && (_a = !model.parent.parent, (_a !== null && _a !== void 0 ? _a : isTopLevelLayer(model.parent.parent)));
    }

    const legendBindings = {
        has: (selCmpt) => {
            const spec = selCmpt.resolve === 'global' && selCmpt.bind && isLegendBinding(selCmpt.bind);
            const projLen = selCmpt.project.items.length === 1 && selCmpt.project.items[0].field !== SELECTION_ID;
            if (spec && !projLen) {
                warn(message.LEGEND_BINDINGS_PROJECT_LENGTH);
            }
            return spec && projLen;
        },
        parse: (model, selCmpt, selDef, origDef) => {
            var _a;
            // Binding a selection to a legend disables default direct manipulation interaction.
            // A user can choose to re-enable it by explicitly specifying triggering input events.
            if (!origDef.on)
                delete selCmpt.events;
            if (!origDef.clear)
                delete selCmpt.clear;
            if (origDef.on || origDef.clear) {
                const legendFilter = 'event.item && indexof(event.item.mark.role, "legend") < 0';
                for (const evt of selCmpt.events) {
                    evt.filter = array((_a = evt.filter, (_a !== null && _a !== void 0 ? _a : [])));
                    if (evt.filter.indexOf(legendFilter) < 0) {
                        evt.filter.push(legendFilter);
                    }
                }
            }
            const evt = isLegendStreamBinding(selCmpt.bind) ? selCmpt.bind.legend : 'click';
            const stream = isString(evt) ? parseSelector(evt, 'view') : array(evt);
            selCmpt.bind = { legend: { merge: stream } };
        },
        topLevelSignals: (model, selCmpt, signals) => {
            const selName = selCmpt.name;
            const stream = isLegendStreamBinding(selCmpt.bind) && selCmpt.bind.legend;
            const markName = (name) => (s) => {
                const ds = duplicate(s);
                ds.markname = name;
                return ds;
            };
            for (const proj of selCmpt.project.items) {
                if (!proj.hasLegend)
                    continue;
                const prefix = `${varName(proj.field)}_legend`;
                const sgName = `${selName}_${prefix}`;
                const hasSignal = signals.filter(s => s.name === sgName);
                if (hasSignal.length === 0) {
                    const events = stream.merge
                        .map(markName(`${prefix}_symbols`))
                        .concat(stream.merge.map(markName(`${prefix}_labels`)))
                        .concat(stream.merge.map(markName(`${prefix}_entries`)));
                    signals.unshift(Object.assign(Object.assign({ name: sgName }, (!selCmpt.init ? { value: null } : {})), { on: [
                            // Legend entries do not store values, so we need to walk the scenegraph to the symbol datum.
                            { events, update: 'datum.value || item().items[0].items[0].datum.value', force: true },
                            { events: stream.merge, update: `!event.item || !datum ? null : ${sgName}`, force: true }
                        ] }));
                }
            }
            return signals;
        },
        signals: (model, selCmpt, signals) => {
            const name = selCmpt.name;
            const proj = selCmpt.project;
            const tuple = signals.find(s => s.name === name + TUPLE);
            const fields = name + TUPLE_FIELDS;
            const values = proj.items.filter(p => p.hasLegend).map(p => varName(`${name}_${varName(p.field)}_legend`));
            const valid = values.map(v => `${v} !== null`).join(' && ');
            const update = `${valid} ? {fields: ${fields}, values: [${values.join(', ')}]} : null`;
            if (selCmpt.events && values.length > 0) {
                tuple.on.push({
                    events: values.map(signal => ({ signal })),
                    update
                });
            }
            else if (values.length > 0) {
                tuple.update = update;
                delete tuple.value;
                delete tuple.on;
            }
            const toggle = signals.find(s => s.name === name + TOGGLE);
            const events = isLegendStreamBinding(selCmpt.bind) && selCmpt.bind.legend;
            if (toggle) {
                if (!selCmpt.events)
                    toggle.on[0].events = events;
                else
                    toggle.on.push(Object.assign(Object.assign({}, toggle.on[0]), { events }));
            }
            return signals;
        }
    };
    function parseInteractiveLegend(model, channel, legendCmpt) {
        const field = model.fieldDef(channel).field;
        forEachSelection(model, selCmpt => {
            var _a, _b;
            const proj = (_a = selCmpt.project.hasField[field], (_a !== null && _a !== void 0 ? _a : selCmpt.project.hasChannel[channel]));
            if (proj && legendBindings.has(selCmpt)) {
                const legendSelections = (_b = legendCmpt.get('selections'), (_b !== null && _b !== void 0 ? _b : []));
                legendSelections.push(selCmpt.name);
                legendCmpt.set('selections', legendSelections, false);
                proj.hasLegend = true;
            }
        });
    }

    const ANCHOR = '_translate_anchor';
    const DELTA = '_translate_delta';
    const translate = {
        has: selCmpt => {
            return selCmpt.type === 'interval' && selCmpt.translate;
        },
        signals: (model, selCmpt, signals) => {
            const name = selCmpt.name;
            const hasScales = scaleBindings.has(selCmpt);
            const anchor = name + ANCHOR;
            const { x, y } = selCmpt.project.hasChannel;
            let events = parseSelector(selCmpt.translate, 'scope');
            if (!hasScales) {
                events = events.map(e => ((e.between[0].markname = name + BRUSH), e));
            }
            signals.push({
                name: anchor,
                value: {},
                on: [
                    {
                        events: events.map(e => e.between[0]),
                        update: '{x: x(unit), y: y(unit)' +
                            (x !== undefined ? ', extent_x: ' + (hasScales ? domain(model, X) : `slice(${x.signals.visual})`) : '') +
                            (y !== undefined ? ', extent_y: ' + (hasScales ? domain(model, Y) : `slice(${y.signals.visual})`) : '') +
                            '}'
                    }
                ]
            }, {
                name: name + DELTA,
                value: {},
                on: [
                    {
                        events: events,
                        update: `{x: ${anchor}.x - x(unit), y: ${anchor}.y - y(unit)}`
                    }
                ]
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
        var _a;
        const name = selCmpt.name;
        const anchor = name + ANCHOR;
        const delta = name + DELTA;
        const channel = proj.channel;
        const hasScales = scaleBindings.has(selCmpt);
        const signal = signals.filter(s => s.name === proj.signals[hasScales ? 'data' : 'visual'])[0];
        const sizeSg = model.getSizeSignalRef(size).signal;
        const scaleCmpt = model.getScaleComponent(channel);
        const scaleType = scaleCmpt.get('type');
        const sign = hasScales && channel === X ? '-' : ''; // Invert delta when panning x-scales.
        const extent = `${anchor}.extent_${channel}`;
        const offset = `${sign}${delta}.${channel} / ` + (hasScales ? `${sizeSg}` : `span(${extent})`);
        const panFn = !hasScales
            ? 'panLinear'
            : scaleType === 'log'
                ? 'panLog'
                : scaleType === 'pow'
                    ? 'panPow'
                    : 'panLinear';
        const update = `${panFn}(${extent}, ${offset}` +
            (hasScales && scaleType === 'pow' ? `, ${_a = scaleCmpt.get('exponent'), (_a !== null && _a !== void 0 ? _a : 1)}` : '') +
            ')';
        signal.on.push({
            events: { signal: delta },
            update: hasScales ? update : `clampRange(${update}, 0, ${sizeSg})`
        });
    }

    const ANCHOR$1 = '_zoom_anchor';
    const DELTA$1 = '_zoom_delta';
    const zoom$1 = {
        has: selCmpt => {
            return selCmpt.type === 'interval' && selCmpt.zoom;
        },
        signals: (model, selCmpt, signals) => {
            const name = selCmpt.name;
            const hasScales = scaleBindings.has(selCmpt);
            const delta = name + DELTA$1;
            const { x, y } = selCmpt.project.hasChannel;
            const sx = $(model.scaleName(X));
            const sy = $(model.scaleName(Y));
            let events = parseSelector(selCmpt.zoom, 'scope');
            if (!hasScales) {
                events = events.map(e => ((e.markname = name + BRUSH), e));
            }
            signals.push({
                name: name + ANCHOR$1,
                on: [
                    {
                        events: events,
                        update: !hasScales
                            ? `{x: x(unit), y: y(unit)}`
                            : '{' +
                                [sx ? `x: invert(${sx}, x(unit))` : '', sy ? `y: invert(${sy}, y(unit))` : '']
                                    .filter(expr => !!expr)
                                    .join(', ') +
                                '}'
                    }
                ]
            }, {
                name: delta,
                on: [
                    {
                        events: events,
                        force: true,
                        update: 'pow(1.001, event.deltaY * pow(16, event.deltaMode))'
                    }
                ]
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
        var _a;
        const name = selCmpt.name;
        const channel = proj.channel;
        const hasScales = scaleBindings.has(selCmpt);
        const signal = signals.filter(s => s.name === proj.signals[hasScales ? 'data' : 'visual'])[0];
        const sizeSg = model.getSizeSignalRef(size).signal;
        const scaleCmpt = model.getScaleComponent(channel);
        const scaleType = scaleCmpt.get('type');
        const base = hasScales ? domain(model, channel) : signal.name;
        const delta = name + DELTA$1;
        const anchor = `${name}${ANCHOR$1}.${channel}`;
        const zoomFn = !hasScales
            ? 'zoomLinear'
            : scaleType === 'log'
                ? 'zoomLog'
                : scaleType === 'pow'
                    ? 'zoomPow'
                    : 'zoomLinear';
        const update = `${zoomFn}(${base}, ${anchor}, ${delta}` +
            (hasScales && scaleType === 'pow' ? `, ${_a = scaleCmpt.get('exponent'), (_a !== null && _a !== void 0 ? _a : 1)}` : '') +
            ')';
        signal.on.push({
            events: { signal: delta },
            update: hasScales ? update : `clampRange(${update}, 0, ${sizeSg})`
        });
    }

    const compilers = [project, toggle, scaleBindings, legendBindings, translate, zoom$1, inputBindings, nearest, clear];
    function forEachTransform(selCmpt, cb) {
        for (const t of compilers) {
            if (t.has(selCmpt)) {
                cb(t);
            }
        }
    }

    function assembleInit(init, isExpr = true, wrap = identity) {
        if (isArray(init)) {
            const assembled = init.map(v => assembleInit(v, isExpr, wrap));
            return isExpr ? `[${assembled.join(', ')}]` : assembled;
        }
        else if (isDateTime(init)) {
            if (isExpr) {
                return wrap(dateTimeToExpr(init));
            }
            else {
                return wrap(dateTimeToTimestamp(init));
            }
        }
        return isExpr ? wrap(JSON.stringify(init)) : init;
    }
    function assembleUnitSelectionSignals(model, signals) {
        forEachSelection(model, (selCmpt, selCompiler) => {
            const name = selCmpt.name;
            let modifyExpr = selCompiler.modifyExpr(model, selCmpt);
            signals.push(...selCompiler.signals(model, selCmpt));
            forEachTransform(selCmpt, txCompiler => {
                if (txCompiler.signals) {
                    signals = txCompiler.signals(model, selCmpt, signals);
                }
                if (txCompiler.modifyExpr) {
                    modifyExpr = txCompiler.modifyExpr(model, selCmpt, modifyExpr);
                }
            });
            signals.push({
                name: name + MODIFY,
                on: [
                    {
                        events: { signal: selCmpt.name + TUPLE },
                        update: `modify(${$(selCmpt.name + STORE)}, ${modifyExpr})`
                    }
                ]
            });
        });
        return cleanupEmptyOnArray(signals);
    }
    function assembleFacetSignals(model, signals) {
        if (model.component.selection && keys(model.component.selection).length) {
            const name = $(model.getName('cell'));
            signals.unshift({
                name: 'facet',
                value: {},
                on: [
                    {
                        events: parseSelector('mousemove', 'scope'),
                        update: `isTuple(facet) ? facet : group(${name}).datum`
                    }
                ]
            });
        }
        return cleanupEmptyOnArray(signals);
    }
    function assembleTopLevelSignals(model, signals) {
        let hasSelections = false;
        forEachSelection(model, (selCmpt, selCompiler) => {
            const name = selCmpt.name;
            const store = $(name + STORE);
            const hasSg = signals.filter(s => s.name === name);
            if (hasSg.length === 0) {
                const resolve = selCmpt.resolve === 'global' ? 'union' : selCmpt.resolve;
                const isMulti = selCmpt.type === 'multi' ? ', true)' : ')';
                signals.push({
                    name: selCmpt.name,
                    update: `${VL_SELECTION_RESOLVE}(${store}, ${$(resolve)}${isMulti}`
                });
            }
            hasSelections = true;
            if (selCompiler.topLevelSignals) {
                signals = selCompiler.topLevelSignals(model, selCmpt, signals);
            }
            forEachTransform(selCmpt, txCompiler => {
                if (txCompiler.topLevelSignals) {
                    signals = txCompiler.topLevelSignals(model, selCmpt, signals);
                }
            });
        });
        if (hasSelections) {
            const hasUnit = signals.filter(s => s.name === 'unit');
            if (hasUnit.length === 0) {
                signals.unshift({
                    name: 'unit',
                    value: {},
                    on: [{ events: 'mousemove', update: 'isTuple(group()) ? group() : unit' }]
                });
            }
        }
        return cleanupEmptyOnArray(signals);
    }
    function assembleUnitSelectionData(model, data) {
        const dataCopy = [...data];
        forEachSelection(model, selCmpt => {
            const init = { name: selCmpt.name + STORE };
            if (selCmpt.init) {
                const fields = selCmpt.project.items.map(proj => {
                    const rest = __rest(proj, ["signals"]);
                    return rest;
                });
                const insert = selCmpt.init.map(i => assembleInit(i, false));
                init.values =
                    selCmpt.type === 'interval'
                        ? [{ unit: unitName(model, { escape: false }), fields, values: insert }]
                        : insert.map(i => ({ unit: unitName(model, { escape: false }), fields, values: i }));
            }
            const contains = dataCopy.filter(d => d.name === selCmpt.name + STORE);
            if (!contains.length) {
                dataCopy.push(init);
            }
        });
        return dataCopy;
    }
    function assembleUnitSelectionMarks(model, marks) {
        forEachSelection(model, (selCmpt, selCompiler) => {
            marks = selCompiler.marks ? selCompiler.marks(model, selCmpt, marks) : marks;
            forEachTransform(selCmpt, txCompiler => {
                if (txCompiler.marks) {
                    marks = txCompiler.marks(model, selCmpt, marks);
                }
            });
        });
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
    function assembleSelectionScaleDomain(model, extent) {
        const name = extent.selection;
        const selCmpt = model.getSelectionComponent(name, varName(name));
        return { signal: parseSelectionBinExtent(selCmpt, extent) };
    }
    function cleanupEmptyOnArray(signals) {
        return signals.map(s => {
            if (s.on && !s.on.length)
                delete s.on;
            return s;
        });
    }

    const BRUSH = '_brush';
    const SCALE_TRIGGER = '_scale_trigger';
    const interval = {
        signals: (model, selCmpt) => {
            const name = selCmpt.name;
            const fieldsSg = name + TUPLE_FIELDS;
            const hasScales = scaleBindings.has(selCmpt);
            const signals = [];
            const dataSignals = [];
            const scaleTriggers = [];
            if (selCmpt.translate && !hasScales) {
                const filterExpr = `!event.item || event.item.mark.name !== ${$(name + BRUSH)}`;
                events(selCmpt, (on, evt) => {
                    var _a;
                    const filters = array((_a = evt.between[0].filter, (_a !== null && _a !== void 0 ? _a : (evt.between[0].filter = []))));
                    if (filters.indexOf(filterExpr) < 0) {
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
                const init = selCmpt.init ? selCmpt.init[i] : null;
                const cs = channelSignals(model, selCmpt, proj, init);
                const dname = proj.signals.data;
                const vname = proj.signals.visual;
                const scaleName = $(model.scaleName(channel));
                const scaleType = model.getScaleComponent(channel).get('type');
                const toNum = hasContinuousDomain(scaleType) ? '+' : '';
                signals.push(...cs);
                dataSignals.push(dname);
                scaleTriggers.push({
                    scaleName: model.scaleName(channel),
                    expr: `(!isArray(${dname}) || ` +
                        `(${toNum}invert(${scaleName}, ${vname})[0] === ${toNum}${dname}[0] && ` +
                        `${toNum}invert(${scaleName}, ${vname})[1] === ${toNum}${dname}[1]))`
                });
            });
            // Proxy scale reactions to ensure that an infinite loop doesn't occur
            // when an interval selection filter touches the scale.
            if (!hasScales) {
                signals.push({
                    name: name + SCALE_TRIGGER,
                    value: {},
                    on: [
                        {
                            events: scaleTriggers.map(t => ({ scale: t.scaleName })),
                            update: scaleTriggers.map(t => t.expr).join(' && ') + ` ? ${name + SCALE_TRIGGER} : {}`
                        }
                    ]
                });
            }
            // Only add an interval to the store if it has valid data extents. Data extents
            // are set to null if pixel extents are equal to account for intervals over
            // ordinal/nominal domains which, when inverted, will still produce a valid datum.
            const init = selCmpt.init;
            const update = `unit: ${unitName(model)}, fields: ${fieldsSg}, values`;
            return signals.concat(Object.assign(Object.assign({ name: name + TUPLE }, (init ? { init: `{${update}: ${assembleInit(init)}}` } : {})), { on: [
                    {
                        events: [{ signal: dataSignals.join(' || ') }],
                        update: dataSignals.join(' && ') + ` ? {${update}: [${dataSignals}]} : null`
                    }
                ] }));
        },
        modifyExpr: (model, selCmpt) => {
            const tpl = selCmpt.name + TUPLE;
            return tpl + ', ' + (selCmpt.resolve === 'global' ? 'true' : `{unit: ${unitName(model)}}`);
        },
        marks: (model, selCmpt, marks) => {
            const name = selCmpt.name;
            const { x, y } = selCmpt.project.hasChannel;
            const xvname = x && x.signals.visual;
            const yvname = y && y.signals.visual;
            const store = `data(${$(selCmpt.name + STORE)})`;
            // Do not add a brush if we're binding to scales.
            if (scaleBindings.has(selCmpt)) {
                return marks;
            }
            const update = {
                x: x !== undefined ? { signal: `${xvname}[0]` } : { value: 0 },
                y: y !== undefined ? { signal: `${yvname}[0]` } : { value: 0 },
                x2: x !== undefined ? { signal: `${xvname}[1]` } : { field: { group: 'width' } },
                y2: y !== undefined ? { signal: `${yvname}[1]` } : { field: { group: 'height' } }
            };
            // If the selection is resolved to global, only a single interval is in
            // the store. Wrap brush mark's encodings with a production rule to test
            // this based on the `unit` property. Hide the brush mark if it corresponds
            // to a unit different from the one in the store.
            if (selCmpt.resolve === 'global') {
                for (const key of keys(update)) {
                    update[key] = [
                        Object.assign({ test: `${store}.length && ${store}[0].unit === ${unitName(model)}` }, update[key]),
                        { value: 0 }
                    ];
                }
            }
            // Two brush marks ensure that fill colors and other aesthetic choices do
            // not interefere with the core marks, but that the brushed region can still
            // be interacted with (e.g., dragging it around).
            const _a = selCmpt.mark, { fill, fillOpacity, cursor } = _a, stroke = __rest(_a, ["fill", "fillOpacity", "cursor"]);
            const vgStroke = keys(stroke).reduce((def, k) => {
                def[k] = [
                    {
                        test: [x !== undefined && `${xvname}[0] !== ${xvname}[1]`, y !== undefined && `${yvname}[0] !== ${yvname}[1]`]
                            .filter(t => t)
                            .join(' && '),
                        value: stroke[k]
                    },
                    { value: null }
                ];
                return def;
            }, {});
            return [
                {
                    name: name + BRUSH + '_bg',
                    type: 'rect',
                    clip: true,
                    encode: {
                        enter: {
                            fill: { value: fill },
                            fillOpacity: { value: fillOpacity }
                        },
                        update: update
                    }
                },
                ...marks,
                {
                    name: name + BRUSH,
                    type: 'rect',
                    clip: true,
                    encode: {
                        enter: Object.assign(Object.assign({}, (cursor ? { cursor: { value: cursor } } : {})), { fill: { value: 'transparent' } }),
                        update: Object.assign(Object.assign({}, update), vgStroke)
                    }
                }
            ];
        }
    };
    /**
     * Returns the visual and data signals for an interval selection.
     */
    function channelSignals(model, selCmpt, proj, init) {
        const channel = proj.channel;
        const vname = proj.signals.visual;
        const dname = proj.signals.data;
        const hasScales = scaleBindings.has(selCmpt);
        const scaleName = $(model.scaleName(channel));
        const scale = model.getScaleComponent(channel);
        const scaleType = scale ? scale.get('type') : undefined;
        const scaled = (str) => `scale(${scaleName}, ${str})`;
        const size = model.getSizeSignalRef(channel === X ? 'width' : 'height').signal;
        const coord = `${channel}(unit)`;
        const on = events(selCmpt, (def, evt) => {
            return [
                ...def,
                { events: evt.between[0], update: `[${coord}, ${coord}]` },
                { events: evt, update: `[${vname}[0], clamp(${coord}, 0, ${size})]` } // Brush End
            ];
        });
        // React to pan/zooms of continuous scales. Non-continuous scales
        // (band, point) cannot be pan/zoomed and any other changes
        // to their domains (e.g., filtering) should clear the brushes.
        on.push({
            events: { signal: selCmpt.name + SCALE_TRIGGER },
            update: hasContinuousDomain(scaleType) ? `[${scaled(`${dname}[0]`)}, ${scaled(`${dname}[1]`)}]` : `[0, 0]`
        });
        return hasScales
            ? [{ name: dname, on: [] }]
            : [
                Object.assign(Object.assign({ name: vname }, (init ? { init: assembleInit(init, true, scaled) } : { value: [] })), { on: on }),
                Object.assign(Object.assign({ name: dname }, (init ? { init: assembleInit(init) } : {})), { on: [
                        {
                            events: { signal: vname },
                            update: `${vname}[0] === ${vname}[1] ? null : invert(${scaleName}, ${vname})`
                        }
                    ] })
            ];
    }
    function events(selCmpt, cb) {
        return selCmpt.events.reduce((on, evt) => {
            if (!evt.between) {
                warn(`${evt} is not an ordered event stream for interval selections.`);
                return on;
            }
            return cb(on, evt);
        }, []);
    }

    function singleOrMultiSignals(model, selCmpt) {
        const name = selCmpt.name;
        const fieldsSg = name + TUPLE_FIELDS;
        const project = selCmpt.project;
        const datum = '(item().isVoronoi ? datum.datum : datum)';
        const values = project.items
            .map(p => {
            const fieldDef = model.fieldDef(p.channel);
            // Binned fields should capture extents, for a range test against the raw field.
            return fieldDef && fieldDef.bin
                ? `[${datum}[${$(model.vgField(p.channel, {}))}], ` +
                    `${datum}[${$(model.vgField(p.channel, { binSuffix: 'end' }))}]]`
                : `${datum}[${$(p.field)}]`;
        })
            .join(', ');
        // Only add a discrete selection to the store if a datum is present _and_
        // the interaction isn't occurring on a group mark. This guards against
        // polluting interactive state with invalid values in faceted displays
        // as the group marks are also data-driven. We force the update to account
        // for constant null states but varying toggles (e.g., shift-click in
        // whitespace followed by a click in whitespace; the store should only
        // be cleared on the second click).
        const update = `unit: ${unitName(model)}, fields: ${fieldsSg}, values`;
        const events = selCmpt.events;
        return [
            {
                name: name + TUPLE,
                on: events
                    ? [
                        {
                            events,
                            update: `datum && item().mark.marktype !== 'group' ? {${update}: [${values}]} : null`,
                            force: true
                        }
                    ]
                    : []
            }
        ];
    }
    const multi = {
        signals: singleOrMultiSignals,
        modifyExpr: (model, selCmpt) => {
            const tpl = selCmpt.name + TUPLE;
            return tpl + ', ' + (selCmpt.resolve === 'global' ? 'null' : `{unit: ${unitName(model)}}`);
        }
    };

    const single = {
        signals: singleOrMultiSignals,
        modifyExpr: (model, selCmpt) => {
            const tpl = selCmpt.name + TUPLE;
            return tpl + ', ' + (selCmpt.resolve === 'global' ? 'true' : `{unit: ${unitName(model)}}`);
        }
    };

    const STORE = '_store';
    const TUPLE = '_tuple';
    const MODIFY = '_modify';
    const VL_SELECTION_RESOLVE = 'vlSelectionResolve';
    const compilers$1 = { single, multi, interval };
    function forEachSelection(model, cb) {
        const selections = model.component.selection;
        if (selections) {
            for (const name in selections) {
                if (hasOwnProperty(selections, name)) {
                    const sel = selections[name];
                    const success = cb(sel, compilers$1[sel.type]);
                    if (success === true)
                        break;
                }
            }
        }
    }
    function getFacetModel(model) {
        let parent = model.parent;
        while (parent) {
            if (isFacetModel(parent)) {
                break;
            }
            parent = parent.parent;
        }
        return parent;
    }
    function unitName(model, { escape } = { escape: true }) {
        let name = escape ? $(model.name) : model.name;
        const facetModel = getFacetModel(model);
        if (facetModel) {
            const { facet } = facetModel;
            for (const channel of FACET_CHANNELS) {
                if (facet[channel]) {
                    name += ` + '__facet_${channel}_' + (facet[${$(facetModel.vgField(channel))}])`;
                }
            }
        }
        return name;
    }
    function requiresSelectionId(model) {
        let identifier = false;
        forEachSelection(model, selCmpt => {
            identifier = identifier || selCmpt.project.items.some(proj => proj.field === SELECTION_ID);
        });
        return identifier;
    }

    var RawCode = 'RawCode';
    var Literal = 'Literal';
    var Property = 'Property';
    var Identifier = 'Identifier';

    var ArrayExpression = 'ArrayExpression';
    var BinaryExpression = 'BinaryExpression';
    var CallExpression = 'CallExpression';
    var ConditionalExpression = 'ConditionalExpression';
    var LogicalExpression = 'LogicalExpression';
    var MemberExpression = 'MemberExpression';
    var ObjectExpression = 'ObjectExpression';
    var UnaryExpression = 'UnaryExpression';

    function ASTNode(type) {
      this.type = type;
    }

    ASTNode.prototype.visit = function(visitor) {
      var node = this, c, i, n;

      if (visitor(node)) return 1;

      for (c=children(node), i=0, n=c.length; i<n; ++i) {
        if (c[i].visit(visitor)) return 1;
      }
    };

    function children(node) {
      switch (node.type) {
        case ArrayExpression:
          return node.elements;
        case BinaryExpression:
        case LogicalExpression:
          return [node.left, node.right];
        case CallExpression:
          var args = node.arguments.slice();
          args.unshift(node.callee);
          return args;
        case ConditionalExpression:
          return [node.test, node.consequent, node.alternate];
        case MemberExpression:
          return [node.object, node.property];
        case ObjectExpression:
          return node.properties;
        case Property:
          return [node.key, node.value];
        case UnaryExpression:
          return [node.argument];
        case Identifier:
        case Literal:
        case RawCode:
        default:
          return [];
      }
    }

    /*
      The following expression parser is based on Esprima (http://esprima.org/).
      Original header comment and license for Esprima is included here:

      Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>
      Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>
      Copyright (C) 2013 Mathias Bynens <mathias@qiwi.be>
      Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
      Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
      Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
      Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
      Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
      Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
      Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>

      Redistribution and use in source and binary forms, with or without
      modification, are permitted provided that the following conditions are met:

        * Redistributions of source code must retain the above copyright
          notice, this list of conditions and the following disclaimer.
        * Redistributions in binary form must reproduce the above copyright
          notice, this list of conditions and the following disclaimer in the
          documentation and/or other materials provided with the distribution.

      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
      AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
      IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
      ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
      DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
      (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
      LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
      ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
      (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
      THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    */

    var TokenName,
        source,
        index,
        length,
        lookahead;

    var TokenBooleanLiteral = 1,
        TokenEOF = 2,
        TokenIdentifier = 3,
        TokenKeyword = 4,
        TokenNullLiteral = 5,
        TokenNumericLiteral = 6,
        TokenPunctuator = 7,
        TokenStringLiteral = 8,
        TokenRegularExpression = 9;

    TokenName = {};
    TokenName[TokenBooleanLiteral] = 'Boolean';
    TokenName[TokenEOF] = '<end>';
    TokenName[TokenIdentifier] = 'Identifier';
    TokenName[TokenKeyword] = 'Keyword';
    TokenName[TokenNullLiteral] = 'Null';
    TokenName[TokenNumericLiteral] = 'Numeric';
    TokenName[TokenPunctuator] = 'Punctuator';
    TokenName[TokenStringLiteral] = 'String';
    TokenName[TokenRegularExpression] = 'RegularExpression';

    var SyntaxArrayExpression = 'ArrayExpression',
        SyntaxBinaryExpression = 'BinaryExpression',
        SyntaxCallExpression = 'CallExpression',
        SyntaxConditionalExpression = 'ConditionalExpression',
        SyntaxIdentifier = 'Identifier',
        SyntaxLiteral = 'Literal',
        SyntaxLogicalExpression = 'LogicalExpression',
        SyntaxMemberExpression = 'MemberExpression',
        SyntaxObjectExpression = 'ObjectExpression',
        SyntaxProperty = 'Property',
        SyntaxUnaryExpression = 'UnaryExpression';

    // Error messages should be identical to V8.
    var MessageUnexpectedToken = 'Unexpected token %0',
        MessageUnexpectedNumber = 'Unexpected number',
        MessageUnexpectedString = 'Unexpected string',
        MessageUnexpectedIdentifier = 'Unexpected identifier',
        MessageUnexpectedReserved = 'Unexpected reserved word',
        MessageUnexpectedEOS = 'Unexpected end of input',
        MessageInvalidRegExp = 'Invalid regular expression',
        MessageUnterminatedRegExp = 'Invalid regular expression: missing /',
        MessageStrictOctalLiteral = 'Octal literals are not allowed in strict mode.',
        MessageStrictDuplicateProperty = 'Duplicate data property in object literal not allowed in strict mode';

    var ILLEGAL$1 = 'ILLEGAL',
        DISABLED = 'Disabled.';

    // See also tools/generate-unicode-regex.py.
    var RegexNonAsciiIdentifierStart = new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B2\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),
        // eslint-disable-next-line no-misleading-character-class
        RegexNonAsciiIdentifierPart = new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0300-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u0483-\\u0487\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0610-\\u061A\\u0620-\\u0669\\u066E-\\u06D3\\u06D5-\\u06DC\\u06DF-\\u06E8\\u06EA-\\u06FC\\u06FF\\u0710-\\u074A\\u074D-\\u07B1\\u07C0-\\u07F5\\u07FA\\u0800-\\u082D\\u0840-\\u085B\\u08A0-\\u08B2\\u08E4-\\u0963\\u0966-\\u096F\\u0971-\\u0983\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BC-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CE\\u09D7\\u09DC\\u09DD\\u09DF-\\u09E3\\u09E6-\\u09F1\\u0A01-\\u0A03\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A59-\\u0A5C\\u0A5E\\u0A66-\\u0A75\\u0A81-\\u0A83\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABC-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AD0\\u0AE0-\\u0AE3\\u0AE6-\\u0AEF\\u0B01-\\u0B03\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3C-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B5C\\u0B5D\\u0B5F-\\u0B63\\u0B66-\\u0B6F\\u0B71\\u0B82\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD0\\u0BD7\\u0BE6-\\u0BEF\\u0C00-\\u0C03\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C58\\u0C59\\u0C60-\\u0C63\\u0C66-\\u0C6F\\u0C81-\\u0C83\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBC-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CDE\\u0CE0-\\u0CE3\\u0CE6-\\u0CEF\\u0CF1\\u0CF2\\u0D01-\\u0D03\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4E\\u0D57\\u0D60-\\u0D63\\u0D66-\\u0D6F\\u0D7A-\\u0D7F\\u0D82\\u0D83\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DE6-\\u0DEF\\u0DF2\\u0DF3\\u0E01-\\u0E3A\\u0E40-\\u0E4E\\u0E50-\\u0E59\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB9\\u0EBB-\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EC8-\\u0ECD\\u0ED0-\\u0ED9\\u0EDC-\\u0EDF\\u0F00\\u0F18\\u0F19\\u0F20-\\u0F29\\u0F35\\u0F37\\u0F39\\u0F3E-\\u0F47\\u0F49-\\u0F6C\\u0F71-\\u0F84\\u0F86-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u1000-\\u1049\\u1050-\\u109D\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u135D-\\u135F\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1714\\u1720-\\u1734\\u1740-\\u1753\\u1760-\\u176C\\u176E-\\u1770\\u1772\\u1773\\u1780-\\u17D3\\u17D7\\u17DC\\u17DD\\u17E0-\\u17E9\\u180B-\\u180D\\u1810-\\u1819\\u1820-\\u1877\\u1880-\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1920-\\u192B\\u1930-\\u193B\\u1946-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u19D0-\\u19D9\\u1A00-\\u1A1B\\u1A20-\\u1A5E\\u1A60-\\u1A7C\\u1A7F-\\u1A89\\u1A90-\\u1A99\\u1AA7\\u1AB0-\\u1ABD\\u1B00-\\u1B4B\\u1B50-\\u1B59\\u1B6B-\\u1B73\\u1B80-\\u1BF3\\u1C00-\\u1C37\\u1C40-\\u1C49\\u1C4D-\\u1C7D\\u1CD0-\\u1CD2\\u1CD4-\\u1CF6\\u1CF8\\u1CF9\\u1D00-\\u1DF5\\u1DFC-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u200C\\u200D\\u203F\\u2040\\u2054\\u2071\\u207F\\u2090-\\u209C\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D7F-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2DE0-\\u2DFF\\u2E2F\\u3005-\\u3007\\u3021-\\u302F\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u3099\\u309A\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA62B\\uA640-\\uA66F\\uA674-\\uA67D\\uA67F-\\uA69D\\uA69F-\\uA6F1\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA827\\uA840-\\uA873\\uA880-\\uA8C4\\uA8D0-\\uA8D9\\uA8E0-\\uA8F7\\uA8FB\\uA900-\\uA92D\\uA930-\\uA953\\uA960-\\uA97C\\uA980-\\uA9C0\\uA9CF-\\uA9D9\\uA9E0-\\uA9FE\\uAA00-\\uAA36\\uAA40-\\uAA4D\\uAA50-\\uAA59\\uAA60-\\uAA76\\uAA7A-\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEF\\uAAF2-\\uAAF6\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABEA\\uABEC\\uABED\\uABF0-\\uABF9\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE00-\\uFE0F\\uFE20-\\uFE2D\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF10-\\uFF19\\uFF21-\\uFF3A\\uFF3F\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]");

    // Ensure the condition is true, otherwise throw an error.
    // This is only to have a better contract semantic, i.e. another safety net
    // to catch a logic error. The condition shall be fulfilled in normal case.
    // Do NOT use this to enforce a certain condition on any user input.

    function assert(condition, message) {
      /* istanbul ignore next */
      if (!condition) {
        throw new Error('ASSERT: ' + message);
      }
    }

    function isDecimalDigit(ch) {
      return (ch >= 0x30 && ch <= 0x39); // 0..9
    }

    function isHexDigit(ch) {
      return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
    }

    function isOctalDigit(ch) {
      return '01234567'.indexOf(ch) >= 0;
    }

    // 7.2 White Space

    function isWhiteSpace(ch) {
      return (ch === 0x20) || (ch === 0x09) || (ch === 0x0B) || (ch === 0x0C) || (ch === 0xA0) ||
        (ch >= 0x1680 && [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(ch) >= 0);
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
      return (ch === 0x0A) || (ch === 0x0D) || (ch === 0x2028) || (ch === 0x2029);
    }

    // 7.6 Identifier Names and Identifiers

    function isIdentifierStart(ch) {
      return (ch === 0x24) || (ch === 0x5F) || // $ (dollar) and _ (underscore)
        (ch >= 0x41 && ch <= 0x5A) || // A..Z
        (ch >= 0x61 && ch <= 0x7A) || // a..z
        (ch === 0x5C) || // \ (backslash)
        ((ch >= 0x80) && RegexNonAsciiIdentifierStart.test(String.fromCharCode(ch)));
    }

    function isIdentifierPart(ch) {
      return (ch === 0x24) || (ch === 0x5F) || // $ (dollar) and _ (underscore)
        (ch >= 0x41 && ch <= 0x5A) || // A..Z
        (ch >= 0x61 && ch <= 0x7A) || // a..z
        (ch >= 0x30 && ch <= 0x39) || // 0..9
        (ch === 0x5C) || // \ (backslash)
        ((ch >= 0x80) && RegexNonAsciiIdentifierPart.test(String.fromCharCode(ch)));
    }

    // 7.6.1.1 Keywords

    var keywords = {
      'if':1, 'in':1, 'do':1,
      'var':1, 'for':1, 'new':1, 'try':1, 'let':1,
      'this':1, 'else':1, 'case':1, 'void':1, 'with':1, 'enum':1,
      'while':1, 'break':1, 'catch':1, 'throw':1, 'const':1, 'yield':1, 'class':1, 'super':1,
      'return':1, 'typeof':1, 'delete':1, 'switch':1, 'export':1, 'import':1, 'public':1, 'static':1,
      'default':1, 'finally':1, 'extends':1, 'package':1, 'private':1,
      'function':1, 'continue':1, 'debugger':1,
      'interface':1, 'protected':1,
      'instanceof':1, 'implements':1
    };

    function skipComment() {
      var ch;

      while (index < length) {
        ch = source.charCodeAt(index);

        if (isWhiteSpace(ch) || isLineTerminator(ch)) {
          ++index;
        } else {
          break;
        }
      }
    }

    function scanHexEscape(prefix) {
      var i, len, ch, code = 0;

      len = (prefix === 'u') ? 4 : 2;
      for (i = 0; i < len; ++i) {
        if (index < length && isHexDigit(source[index])) {
          ch = source[index++];
          code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
        } else {
          throwError({}, MessageUnexpectedToken, ILLEGAL$1);
        }
      }
      return String.fromCharCode(code);
    }

    function scanUnicodeCodePointEscape() {
      var ch, code, cu1, cu2;

      ch = source[index];
      code = 0;

      // At least, one hex digit is required.
      if (ch === '}') {
        throwError({}, MessageUnexpectedToken, ILLEGAL$1);
      }

      while (index < length) {
        ch = source[index++];
        if (!isHexDigit(ch)) {
          break;
        }
        code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
      }

      if (code > 0x10FFFF || ch !== '}') {
        throwError({}, MessageUnexpectedToken, ILLEGAL$1);
      }

      // UTF-16 Encoding
      if (code <= 0xFFFF) {
        return String.fromCharCode(code);
      }
      cu1 = ((code - 0x10000) >> 10) + 0xD800;
      cu2 = ((code - 0x10000) & 1023) + 0xDC00;
      return String.fromCharCode(cu1, cu2);
    }

    function getEscapedIdentifier() {
      var ch, id;

      ch = source.charCodeAt(index++);
      id = String.fromCharCode(ch);

      // '\u' (U+005C, U+0075) denotes an escaped character.
      if (ch === 0x5C) {
        if (source.charCodeAt(index) !== 0x75) {
          throwError({}, MessageUnexpectedToken, ILLEGAL$1);
        }
        ++index;
        ch = scanHexEscape('u');
        if (!ch || ch === '\\' || !isIdentifierStart(ch.charCodeAt(0))) {
          throwError({}, MessageUnexpectedToken, ILLEGAL$1);
        }
        id = ch;
      }

      while (index < length) {
        ch = source.charCodeAt(index);
        if (!isIdentifierPart(ch)) {
          break;
        }
        ++index;
        id += String.fromCharCode(ch);

        // '\u' (U+005C, U+0075) denotes an escaped character.
        if (ch === 0x5C) {
          id = id.substr(0, id.length - 1);
          if (source.charCodeAt(index) !== 0x75) {
            throwError({}, MessageUnexpectedToken, ILLEGAL$1);
          }
          ++index;
          ch = scanHexEscape('u');
          if (!ch || ch === '\\' || !isIdentifierPart(ch.charCodeAt(0))) {
            throwError({}, MessageUnexpectedToken, ILLEGAL$1);
          }
          id += ch;
        }
      }

      return id;
    }

    function getIdentifier() {
      var start, ch;

      start = index++;
      while (index < length) {
        ch = source.charCodeAt(index);
        if (ch === 0x5C) {
          // Blackslash (U+005C) marks Unicode escape sequence.
          index = start;
          return getEscapedIdentifier();
        }
        if (isIdentifierPart(ch)) {
          ++index;
        } else {
          break;
        }
      }

      return source.slice(start, index);
    }

    function scanIdentifier() {
      var start, id, type;

      start = index;

      // Backslash (U+005C) starts an escaped character.
      id = (source.charCodeAt(index) === 0x5C) ? getEscapedIdentifier() : getIdentifier();

      // There is no keyword or literal with only one character.
      // Thus, it must be an identifier.
      if (id.length === 1) {
        type = TokenIdentifier;
      } else if (keywords.hasOwnProperty(id)) { // eslint-disable-line no-prototype-builtins
        type = TokenKeyword;
      } else if (id === 'null') {
        type = TokenNullLiteral;
      } else if (id === 'true' || id === 'false') {
        type = TokenBooleanLiteral;
      } else {
        type = TokenIdentifier;
      }

      return {
        type: type,
        value: id,
        start: start,
        end: index
      };
    }

    // 7.7 Punctuators

    function scanPunctuator() {
      var start = index,
        code = source.charCodeAt(index),
        code2,
        ch1 = source[index],
        ch2,
        ch3,
        ch4;

      switch (code) {

        // Check for most common single-character punctuators.
        case 0x2E: // . dot
        case 0x28: // ( open bracket
        case 0x29: // ) close bracket
        case 0x3B: // ; semicolon
        case 0x2C: // , comma
        case 0x7B: // { open curly brace
        case 0x7D: // } close curly brace
        case 0x5B: // [
        case 0x5D: // ]
        case 0x3A: // :
        case 0x3F: // ?
        case 0x7E: // ~
          ++index;
          return {
            type: TokenPunctuator,
            value: String.fromCharCode(code),
            start: start,
            end: index
          };

        default:
          code2 = source.charCodeAt(index + 1);

          // '=' (U+003D) marks an assignment or comparison operator.
          if (code2 === 0x3D) {
            switch (code) {
              case 0x2B: // +
              case 0x2D: // -
              case 0x2F: // /
              case 0x3C: // <
              case 0x3E: // >
              case 0x5E: // ^
              case 0x7C: // |
              case 0x25: // %
              case 0x26: // &
              case 0x2A: // *
                index += 2;
                return {
                  type: TokenPunctuator,
                  value: String.fromCharCode(code) + String.fromCharCode(code2),
                  start: start,
                  end: index
                };

              case 0x21: // !
              case 0x3D: // =
                index += 2;

                // !== and ===
                if (source.charCodeAt(index) === 0x3D) {
                  ++index;
                }
                return {
                  type: TokenPunctuator,
                  value: source.slice(start, index),
                  start: start,
                  end: index
                };
            }
          }
      }

      // 4-character punctuator: >>>=

      ch4 = source.substr(index, 4);

      if (ch4 === '>>>=') {
        index += 4;
        return {
          type: TokenPunctuator,
          value: ch4,
          start: start,
          end: index
        };
      }

      // 3-character punctuators: === !== >>> <<= >>=

      ch3 = ch4.substr(0, 3);

      if (ch3 === '>>>' || ch3 === '<<=' || ch3 === '>>=') {
        index += 3;
        return {
          type: TokenPunctuator,
          value: ch3,
          start: start,
          end: index
        };
      }

      // Other 2-character punctuators: ++ -- << >> && ||
      ch2 = ch3.substr(0, 2);

      if ((ch1 === ch2[1] && ('+-<>&|'.indexOf(ch1) >= 0)) || ch2 === '=>') {
        index += 2;
        return {
          type: TokenPunctuator,
          value: ch2,
          start: start,
          end: index
        };
      }

      // 1-character punctuators: < > = ! + - * % & | ^ /

      if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
        ++index;
        return {
          type: TokenPunctuator,
          value: ch1,
          start: start,
          end: index
        };
      }

      throwError({}, MessageUnexpectedToken, ILLEGAL$1);
    }

    // 7.8.3 Numeric Literals

    function scanHexLiteral(start) {
      var number = '';

      while (index < length) {
        if (!isHexDigit(source[index])) {
          break;
        }
        number += source[index++];
      }

      if (number.length === 0) {
        throwError({}, MessageUnexpectedToken, ILLEGAL$1);
      }

      if (isIdentifierStart(source.charCodeAt(index))) {
        throwError({}, MessageUnexpectedToken, ILLEGAL$1);
      }

      return {
        type: TokenNumericLiteral,
        value: parseInt('0x' + number, 16),
        start: start,
        end: index
      };
    }

    function scanOctalLiteral(start) {
      var number = '0' + source[index++];
      while (index < length) {
        if (!isOctalDigit(source[index])) {
          break;
        }
        number += source[index++];
      }

      if (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) {
        throwError({}, MessageUnexpectedToken, ILLEGAL$1);
      }

      return {
        type: TokenNumericLiteral,
        value: parseInt(number, 8),
        octal: true,
        start: start,
        end: index
      };
    }

    function scanNumericLiteral() {
      var number, start, ch;

      ch = source[index];
      assert(isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'),
        'Numeric literal must start with a decimal digit or a decimal point');

      start = index;
      number = '';
      if (ch !== '.') {
        number = source[index++];
        ch = source[index];

        // Hex number starts with '0x'.
        // Octal number starts with '0'.
        if (number === '0') {
          if (ch === 'x' || ch === 'X') {
            ++index;
            return scanHexLiteral(start);
          }
          if (isOctalDigit(ch)) {
            return scanOctalLiteral(start);
          }

          // decimal number starts with '0' such as '09' is illegal.
          if (ch && isDecimalDigit(ch.charCodeAt(0))) {
            throwError({}, MessageUnexpectedToken, ILLEGAL$1);
          }
        }

        while (isDecimalDigit(source.charCodeAt(index))) {
          number += source[index++];
        }
        ch = source[index];
      }

      if (ch === '.') {
        number += source[index++];
        while (isDecimalDigit(source.charCodeAt(index))) {
          number += source[index++];
        }
        ch = source[index];
      }

      if (ch === 'e' || ch === 'E') {
        number += source[index++];

        ch = source[index];
        if (ch === '+' || ch === '-') {
          number += source[index++];
        }
        if (isDecimalDigit(source.charCodeAt(index))) {
          while (isDecimalDigit(source.charCodeAt(index))) {
            number += source[index++];
          }
        } else {
          throwError({}, MessageUnexpectedToken, ILLEGAL$1);
        }
      }

      if (isIdentifierStart(source.charCodeAt(index))) {
        throwError({}, MessageUnexpectedToken, ILLEGAL$1);
      }

      return {
        type: TokenNumericLiteral,
        value: parseFloat(number),
        start: start,
        end: index
      };
    }

    // 7.8.4 String Literals

    function scanStringLiteral() {
      var str = '',
        quote, start, ch, code, octal = false;

      quote = source[index];
      assert((quote === '\'' || quote === '"'),
        'String literal must starts with a quote');

      start = index;
      ++index;

      while (index < length) {
        ch = source[index++];

        if (ch === quote) {
          quote = '';
          break;
        } else if (ch === '\\') {
          ch = source[index++];
          if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
            switch (ch) {
              case 'u':
              case 'x':
                if (source[index] === '{') {
                  ++index;
                  str += scanUnicodeCodePointEscape();
                } else {
                  str += scanHexEscape(ch);
                }
                break;
              case 'n':
                str += '\n';
                break;
              case 'r':
                str += '\r';
                break;
              case 't':
                str += '\t';
                break;
              case 'b':
                str += '\b';
                break;
              case 'f':
                str += '\f';
                break;
              case 'v':
                str += '\x0B';
                break;

              default:
                if (isOctalDigit(ch)) {
                  code = '01234567'.indexOf(ch);

                  // \0 is not octal escape sequence
                  if (code !== 0) {
                    octal = true;
                  }

                  if (index < length && isOctalDigit(source[index])) {
                    octal = true;
                    code = code * 8 + '01234567'.indexOf(source[index++]);

                    // 3 digits are only allowed when string starts
                    // with 0, 1, 2, 3
                    if ('0123'.indexOf(ch) >= 0 &&
                      index < length &&
                      isOctalDigit(source[index])) {
                      code = code * 8 + '01234567'.indexOf(source[index++]);
                    }
                  }
                  str += String.fromCharCode(code);
                } else {
                  str += ch;
                }
                break;
            }
          } else {
            if (ch === '\r' && source[index] === '\n') {
              ++index;
            }
          }
        } else if (isLineTerminator(ch.charCodeAt(0))) {
          break;
        } else {
          str += ch;
        }
      }

      if (quote !== '') {
        throwError({}, MessageUnexpectedToken, ILLEGAL$1);
      }

      return {
        type: TokenStringLiteral,
        value: str,
        octal: octal,
        start: start,
        end: index
      };
    }

    function testRegExp(pattern, flags) {
      var tmp = pattern;

      if (flags.indexOf('u') >= 0) {
        // Replace each astral symbol and every Unicode code point
        // escape sequence with a single ASCII symbol to avoid throwing on
        // regular expressions that are only valid in combination with the
        // `/u` flag.
        // Note: replacing with the ASCII symbol `x` might cause false
        // negatives in unlikely scenarios. For example, `[\u{61}-b]` is a
        // perfectly valid pattern that is equivalent to `[a-b]`, but it
        // would be replaced by `[x-b]` which throws an error.
        tmp = tmp
          .replace(/\\u\{([0-9a-fA-F]+)\}/g, function($0, $1) {
            if (parseInt($1, 16) <= 0x10FFFF) {
              return 'x';
            }
            throwError({}, MessageInvalidRegExp);
          })
          .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, 'x');
      }

      // First, detect invalid regular expressions.
      try {
        new RegExp(tmp);
      } catch (e) {
        throwError({}, MessageInvalidRegExp);
      }

      // Return a regular expression object for this pattern-flag pair, or
      // `null` in case the current environment doesn't support the flags it
      // uses.
      try {
        return new RegExp(pattern, flags);
      } catch (exception) {
        return null;
      }
    }

    function scanRegExpBody() {
      var ch, str, classMarker, terminated, body;

      ch = source[index];
      assert(ch === '/', 'Regular expression literal must start with a slash');
      str = source[index++];

      classMarker = false;
      terminated = false;
      while (index < length) {
        ch = source[index++];
        str += ch;
        if (ch === '\\') {
          ch = source[index++];
          // ECMA-262 7.8.5
          if (isLineTerminator(ch.charCodeAt(0))) {
            throwError({}, MessageUnterminatedRegExp);
          }
          str += ch;
        } else if (isLineTerminator(ch.charCodeAt(0))) {
          throwError({}, MessageUnterminatedRegExp);
        } else if (classMarker) {
          if (ch === ']') {
            classMarker = false;
          }
        } else {
          if (ch === '/') {
            terminated = true;
            break;
          } else if (ch === '[') {
            classMarker = true;
          }
        }
      }

      if (!terminated) {
        throwError({}, MessageUnterminatedRegExp);
      }

      // Exclude leading and trailing slash.
      body = str.substr(1, str.length - 2);
      return {
        value: body,
        literal: str
      };
    }

    function scanRegExpFlags() {
      var ch, str, flags;

      str = '';
      flags = '';
      while (index < length) {
        ch = source[index];
        if (!isIdentifierPart(ch.charCodeAt(0))) {
          break;
        }

        ++index;
        if (ch === '\\' && index < length) {
          throwError({}, MessageUnexpectedToken, ILLEGAL$1);
        } else {
          flags += ch;
          str += ch;
        }
      }

      if (flags.search(/[^gimuy]/g) >= 0) {
        throwError({}, MessageInvalidRegExp, flags);
      }

      return {
        value: flags,
        literal: str
      };
    }

    function scanRegExp() {
      var start, body, flags, value;

      lookahead = null;
      skipComment();
      start = index;

      body = scanRegExpBody();
      flags = scanRegExpFlags();
      value = testRegExp(body.value, flags.value);

      return {
        literal: body.literal + flags.literal,
        value: value,
        regex: {
          pattern: body.value,
          flags: flags.value
        },
        start: start,
        end: index
      };
    }

    function isIdentifierName(token) {
      return token.type === TokenIdentifier ||
        token.type === TokenKeyword ||
        token.type === TokenBooleanLiteral ||
        token.type === TokenNullLiteral;
    }

    function advance() {
      var ch;

      skipComment();

      if (index >= length) {
        return {
          type: TokenEOF,
          start: index,
          end: index
        };
      }

      ch = source.charCodeAt(index);

      if (isIdentifierStart(ch)) {
        return scanIdentifier();
      }

      // Very common: ( and ) and ;
      if (ch === 0x28 || ch === 0x29 || ch === 0x3B) {
        return scanPunctuator();
      }

      // String literal starts with single quote (U+0027) or double quote (U+0022).
      if (ch === 0x27 || ch === 0x22) {
        return scanStringLiteral();
      }


      // Dot (.) U+002E can also start a floating-point number, hence the need
      // to check the next character.
      if (ch === 0x2E) {
        if (isDecimalDigit(source.charCodeAt(index + 1))) {
          return scanNumericLiteral();
        }
        return scanPunctuator();
      }

      if (isDecimalDigit(ch)) {
        return scanNumericLiteral();
      }

      return scanPunctuator();
    }

    function lex() {
      var token;

      token = lookahead;
      index = token.end;

      lookahead = advance();

      index = token.end;

      return token;
    }

    function peek$1() {
      var pos;

      pos = index;

      lookahead = advance();
      index = pos;
    }

    function finishArrayExpression(elements) {
      var node = new ASTNode(SyntaxArrayExpression);
      node.elements = elements;
      return node;
    }

    function finishBinaryExpression(operator, left, right) {
      var node = new ASTNode((operator === '||' || operator === '&&') ? SyntaxLogicalExpression : SyntaxBinaryExpression);
      node.operator = operator;
      node.left = left;
      node.right = right;
      return node;
    }

    function finishCallExpression(callee, args) {
      var node = new ASTNode(SyntaxCallExpression);
      node.callee = callee;
      node.arguments = args;
      return node;
    }

    function finishConditionalExpression(test, consequent, alternate) {
      var node = new ASTNode(SyntaxConditionalExpression);
      node.test = test;
      node.consequent = consequent;
      node.alternate = alternate;
      return node;
    }

    function finishIdentifier(name) {
      var node = new ASTNode(SyntaxIdentifier);
      node.name = name;
      return node;
    }

    function finishLiteral(token) {
      var node = new ASTNode(SyntaxLiteral);
      node.value = token.value;
      node.raw = source.slice(token.start, token.end);
      if (token.regex) {
        if (node.raw === '//') {
          node.raw = '/(?:)/';
        }
        node.regex = token.regex;
      }
      return node;
    }

    function finishMemberExpression(accessor, object, property) {
      var node = new ASTNode(SyntaxMemberExpression);
      node.computed = accessor === '[';
      node.object = object;
      node.property = property;
      if (!node.computed) property.member = true;
      return node;
    }

    function finishObjectExpression(properties) {
      var node = new ASTNode(SyntaxObjectExpression);
      node.properties = properties;
      return node;
    }

    function finishProperty(kind, key, value) {
      var node = new ASTNode(SyntaxProperty);
      node.key = key;
      node.value = value;
      node.kind = kind;
      return node;
    }

    function finishUnaryExpression(operator, argument) {
      var node = new ASTNode(SyntaxUnaryExpression);
      node.operator = operator;
      node.argument = argument;
      node.prefix = true;
      return node;
    }

    // Throw an exception

    function throwError(token, messageFormat) {
      var error,
        args = Array.prototype.slice.call(arguments, 2),
        msg = messageFormat.replace(
          /%(\d)/g,
          function(whole, index) {
            assert(index < args.length, 'Message reference must be in range');
            return args[index];
          }
        );


      error = new Error(msg);
      error.index = index;
      error.description = msg;
      throw error;
    }

    // Throw an exception because of the token.

    function throwUnexpected(token) {
      if (token.type === TokenEOF) {
        throwError(token, MessageUnexpectedEOS);
      }

      if (token.type === TokenNumericLiteral) {
        throwError(token, MessageUnexpectedNumber);
      }

      if (token.type === TokenStringLiteral) {
        throwError(token, MessageUnexpectedString);
      }

      if (token.type === TokenIdentifier) {
        throwError(token, MessageUnexpectedIdentifier);
      }

      if (token.type === TokenKeyword) {
        throwError(token, MessageUnexpectedReserved);
      }

      // BooleanLiteral, NullLiteral, or Punctuator.
      throwError(token, MessageUnexpectedToken, token.value);
    }

    // Expect the next token to match the specified punctuator.
    // If not, an exception will be thrown.

    function expect(value) {
      var token = lex();
      if (token.type !== TokenPunctuator || token.value !== value) {
        throwUnexpected(token);
      }
    }

    // Return true if the next token matches the specified punctuator.

    function match(value) {
      return lookahead.type === TokenPunctuator && lookahead.value === value;
    }

    // Return true if the next token matches the specified keyword

    function matchKeyword(keyword) {
      return lookahead.type === TokenKeyword && lookahead.value === keyword;
    }

    // 11.1.4 Array Initialiser

    function parseArrayInitialiser() {
      var elements = [];

      index = lookahead.start;
      expect('[');

      while (!match(']')) {
        if (match(',')) {
          lex();
          elements.push(null);
        } else {
          elements.push(parseConditionalExpression());

          if (!match(']')) {
            expect(',');
          }
        }
      }

      lex();

      return finishArrayExpression(elements);
    }

    // 11.1.5 Object Initialiser

    function parseObjectPropertyKey() {
      var token;

      index = lookahead.start;
      token = lex();

      // Note: This function is called only from parseObjectProperty(), where
      // EOF and Punctuator tokens are already filtered out.

      if (token.type === TokenStringLiteral || token.type === TokenNumericLiteral) {
        if (token.octal) {
          throwError(token, MessageStrictOctalLiteral);
        }
        return finishLiteral(token);
      }

      return finishIdentifier(token.value);
    }

    function parseObjectProperty() {
      var token, key, id, value;

      index = lookahead.start;
      token = lookahead;

      if (token.type === TokenIdentifier) {
        id = parseObjectPropertyKey();
        expect(':');
        value = parseConditionalExpression();
        return finishProperty('init', id, value);
      }
      if (token.type === TokenEOF || token.type === TokenPunctuator) {
        throwUnexpected(token);
      } else {
        key = parseObjectPropertyKey();
        expect(':');
        value = parseConditionalExpression();
        return finishProperty('init', key, value);
      }
    }

    function parseObjectInitialiser() {
      var properties = [],
        property, name, key, map = {},
        toString = String;

      index = lookahead.start;
      expect('{');

      while (!match('}')) {
        property = parseObjectProperty();

        if (property.key.type === SyntaxIdentifier) {
          name = property.key.name;
        } else {
          name = toString(property.key.value);
        }

        key = '$' + name;
        if (Object.prototype.hasOwnProperty.call(map, key)) {
          throwError({}, MessageStrictDuplicateProperty);
        } else {
          map[key] = true;
        }

        properties.push(property);

        if (!match('}')) {
          expect(',');
        }
      }

      expect('}');

      return finishObjectExpression(properties);
    }

    // 11.1.6 The Grouping Operator

    function parseGroupExpression() {
      var expr;

      expect('(');

      expr = parseExpression();

      expect(')');

      return expr;
    }


    // 11.1 Primary Expressions

    var legalKeywords = {
      "if": 1,
      "this": 1
    };

    function parsePrimaryExpression() {
      var type, token, expr;

      if (match('(')) {
        return parseGroupExpression();
      }

      if (match('[')) {
        return parseArrayInitialiser();
      }

      if (match('{')) {
        return parseObjectInitialiser();
      }

      type = lookahead.type;
      index = lookahead.start;


      if (type === TokenIdentifier || legalKeywords[lookahead.value]) {
        expr = finishIdentifier(lex().value);
      } else if (type === TokenStringLiteral || type === TokenNumericLiteral) {
        if (lookahead.octal) {
          throwError(lookahead, MessageStrictOctalLiteral);
        }
        expr = finishLiteral(lex());
      } else if (type === TokenKeyword) {
        throw new Error(DISABLED);
      } else if (type === TokenBooleanLiteral) {
        token = lex();
        token.value = (token.value === 'true');
        expr = finishLiteral(token);
      } else if (type === TokenNullLiteral) {
        token = lex();
        token.value = null;
        expr = finishLiteral(token);
      } else if (match('/') || match('/=')) {
        expr = finishLiteral(scanRegExp());
        peek$1();
      } else {
        throwUnexpected(lex());
      }

      return expr;
    }

    // 11.2 Left-Hand-Side Expressions

    function parseArguments() {
      var args = [];

      expect('(');

      if (!match(')')) {
        while (index < length) {
          args.push(parseConditionalExpression());
          if (match(')')) {
            break;
          }
          expect(',');
        }
      }

      expect(')');

      return args;
    }

    function parseNonComputedProperty() {
      var token;
      index = lookahead.start;
      token = lex();

      if (!isIdentifierName(token)) {
        throwUnexpected(token);
      }

      return finishIdentifier(token.value);
    }

    function parseNonComputedMember() {
      expect('.');

      return parseNonComputedProperty();
    }

    function parseComputedMember() {
      var expr;

      expect('[');

      expr = parseExpression();

      expect(']');

      return expr;
    }

    function parseLeftHandSideExpressionAllowCall() {
      var expr, args, property;

      expr = parsePrimaryExpression();

      for (;;) {
        if (match('.')) {
          property = parseNonComputedMember();
          expr = finishMemberExpression('.', expr, property);
        } else if (match('(')) {
          args = parseArguments();
          expr = finishCallExpression(expr, args);
        } else if (match('[')) {
          property = parseComputedMember();
          expr = finishMemberExpression('[', expr, property);
        } else {
          break;
        }
      }

      return expr;
    }

    // 11.3 Postfix Expressions

    function parsePostfixExpression() {
      var expr = parseLeftHandSideExpressionAllowCall();

      if (lookahead.type === TokenPunctuator) {
        if ((match('++') || match('--'))) {
          throw new Error(DISABLED);
        }
      }

      return expr;
    }

    // 11.4 Unary Operators

    function parseUnaryExpression() {
      var token, expr;

      if (lookahead.type !== TokenPunctuator && lookahead.type !== TokenKeyword) {
        expr = parsePostfixExpression();
      } else if (match('++') || match('--')) {
        throw new Error(DISABLED);
      } else if (match('+') || match('-') || match('~') || match('!')) {
        token = lex();
        expr = parseUnaryExpression();
        expr = finishUnaryExpression(token.value, expr);
      } else if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
        throw new Error(DISABLED);
      } else {
        expr = parsePostfixExpression();
      }

      return expr;
    }

    function binaryPrecedence(token) {
      var prec = 0;

      if (token.type !== TokenPunctuator && token.type !== TokenKeyword) {
        return 0;
      }

      switch (token.value) {
        case '||':
          prec = 1;
          break;

        case '&&':
          prec = 2;
          break;

        case '|':
          prec = 3;
          break;

        case '^':
          prec = 4;
          break;

        case '&':
          prec = 5;
          break;

        case '==':
        case '!=':
        case '===':
        case '!==':
          prec = 6;
          break;

        case '<':
        case '>':
        case '<=':
        case '>=':
        case 'instanceof':
        case 'in':
          prec = 7;
          break;

        case '<<':
        case '>>':
        case '>>>':
          prec = 8;
          break;

        case '+':
        case '-':
          prec = 9;
          break;

        case '*':
        case '/':
        case '%':
          prec = 11;
          break;
      }

      return prec;
    }

    // 11.5 Multiplicative Operators
    // 11.6 Additive Operators
    // 11.7 Bitwise Shift Operators
    // 11.8 Relational Operators
    // 11.9 Equality Operators
    // 11.10 Binary Bitwise Operators
    // 11.11 Binary Logical Operators

    function parseBinaryExpression() {
      var marker, markers, expr, token, prec, stack, right, operator, left, i;

      marker = lookahead;
      left = parseUnaryExpression();

      token = lookahead;
      prec = binaryPrecedence(token);
      if (prec === 0) {
        return left;
      }
      token.prec = prec;
      lex();

      markers = [marker, lookahead];
      right = parseUnaryExpression();

      stack = [left, token, right];

      while ((prec = binaryPrecedence(lookahead)) > 0) {

        // Reduce: make a binary expression from the three topmost entries.
        while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
          right = stack.pop();
          operator = stack.pop().value;
          left = stack.pop();
          markers.pop();
          expr = finishBinaryExpression(operator, left, right);
          stack.push(expr);
        }

        // Shift.
        token = lex();
        token.prec = prec;
        stack.push(token);
        markers.push(lookahead);
        expr = parseUnaryExpression();
        stack.push(expr);
      }

      // Final reduce to clean-up the stack.
      i = stack.length - 1;
      expr = stack[i];
      markers.pop();
      while (i > 1) {
        markers.pop();
        expr = finishBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
        i -= 2;
      }

      return expr;
    }

    // 11.12 Conditional Operator

    function parseConditionalExpression() {
      var expr, consequent, alternate;

      expr = parseBinaryExpression();

      if (match('?')) {
        lex();
        consequent = parseConditionalExpression();
        expect(':');
        alternate = parseConditionalExpression();

        expr = finishConditionalExpression(expr, consequent, alternate);
      }

      return expr;
    }

    // 11.14 Comma Operator

    function parseExpression() {
      var expr = parseConditionalExpression();

      if (match(',')) {
        throw new Error(DISABLED); // no sequence expressions
      }

      return expr;
    }

    function parse(code) {
      source = code;
      index = 0;
      length = source.length;
      lookahead = null;

      peek$1();

      var expr = parseExpression();

      if (lookahead.type !== TokenEOF) {
        throw new Error("Unexpect token after expression.");
      }
      return expr;
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
        const ast = parse(expression);
        const dependents = new Set();
        ast.visit((node) => {
            if (node.type === 'MemberExpression' && startsWithDatum(node)) {
                dependents.add(getName(node)
                    .slice(1)
                    .join('.'));
            }
        });
        return dependents;
    }

    class FilterNode extends DataFlowNode {
        constructor(parent, model, filter) {
            super(parent);
            this.model = model;
            this.filter = filter;
            // TODO: refactor this to not take a node and
            // then add a static function makeFromOperand and make the constructor take only an expression
            this.expr = expression(this.model, this.filter, this);
            this._dependentFields = getDependentFields(this.expr);
        }
        clone() {
            return new FilterNode(null, this.model, duplicate(this.filter));
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
            return `Filter ${this.expr}`;
        }
    }

    function parseUnitSelection(model, selDefs) {
        var _a;
        const selCmpts = {};
        const selectionConfig = model.config.selection;
        for (const name in selDefs) {
            if (!hasOwnProperty(selDefs, name)) {
                continue;
            }
            const selDef = duplicate(selDefs[name]);
            const _b = selectionConfig[selDef.type], cfg = __rest(_b, ["fields", "encodings"]); // Project transform applies its defaults.
            // Set default values from config if a property hasn't been specified,
            // or if it is true. E.g., "translate": true should use the default
            // event handlers for translate. However, true may be a valid value for
            // a property (e.g., "nearest": true).
            for (const key in cfg) {
                // A selection should contain either `encodings` or `fields`, only use
                // default values for these two values if neither of them is specified.
                if ((key === 'encodings' && selDef.fields) || (key === 'fields' && selDef.encodings)) {
                    continue;
                }
                if (key === 'mark') {
                    selDef[key] = Object.assign(Object.assign({}, cfg[key]), selDef[key]);
                }
                if (selDef[key] === undefined || selDef[key] === true) {
                    selDef[key] = (_a = cfg[key], (_a !== null && _a !== void 0 ? _a : selDef[key]));
                }
            }
            const safeName = varName(name);
            const selCmpt = (selCmpts[safeName] = Object.assign(Object.assign({}, selDef), { name: safeName, events: isString(selDef.on) ? parseSelector(selDef.on, 'scope') : duplicate(selDef.on) }));
            forEachTransform(selCmpt, txCompiler => {
                if (txCompiler.has(selCmpt) && txCompiler.parse) {
                    txCompiler.parse(model, selCmpt, selDef, selDefs[name]);
                }
            });
        }
        return selCmpts;
    }
    function parseSelectionPredicate(model, selections, dfnode, datum = 'datum') {
        const stores = [];
        function expr(name) {
            const vname = varName(name);
            const selCmpt = model.getSelectionComponent(vname, name);
            const store = $(vname + STORE);
            if (selCmpt.project.timeUnit) {
                const child = (dfnode !== null && dfnode !== void 0 ? dfnode : model.component.data.raw);
                const tunode = selCmpt.project.timeUnit.clone();
                if (child.parent) {
                    tunode.insertAsParentOf(child);
                }
                else {
                    child.parent = tunode;
                }
            }
            if (selCmpt.empty !== 'none') {
                stores.push(store);
            }
            return (`vlSelectionTest(${store}, ${datum}` + (selCmpt.resolve === 'global' ? ')' : `, ${$(selCmpt.resolve)})`));
        }
        const predicateStr = logicalExpr(selections, expr);
        return ((stores.length ? '!(' + stores.map(s => `length(data(${s}))`).join(' || ') + ') || ' : '') + `(${predicateStr})`);
    }
    function parseSelectionBinExtent(selCmpt, extent) {
        const encoding = extent['encoding'];
        let field = extent['field'];
        if (!encoding && !field) {
            field = selCmpt.project.items[0].field;
            if (selCmpt.project.items.length > 1) {
                warn('A "field" or "encoding" must be specified when using a selection as a scale domain. ' +
                    `Using "field": ${$(field)}.`);
            }
        }
        else if (encoding && !field) {
            const encodings = selCmpt.project.items.filter(p => p.channel === encoding);
            if (!encodings.length || encodings.length > 1) {
                field = selCmpt.project.items[0].field;
                warn((!encodings.length ? 'No ' : 'Multiple ') +
                    `matching ${$(encoding)} encoding found for selection ${$(extent.selection)}. ` +
                    `Using "field": ${$(field)}.`);
            }
            else {
                field = encodings[0].field;
            }
        }
        return `${selCmpt.name}[${$(field)}]`;
    }
    function materializeSelections(model, main) {
        forEachSelection(model, selCmpt => {
            const selection = selCmpt.name;
            const lookupName = model.getName(`lookup_${selection}`);
            model.component.data.outputNodes[lookupName] = selCmpt.materialized = new OutputNode(new FilterNode(main, model, { selection }), lookupName, 'lookup', model.component.data.outputNodeRefCounts);
        });
    }

    /**
     * Converts a predicate into an expression.
     */
    // model is only used for selection filters.
    function expression(model, filterOp, node) {
        return logicalExpr(filterOp, (predicate) => {
            if (isString(predicate)) {
                return predicate;
            }
            else if (isSelectionPredicate(predicate)) {
                return parseSelectionPredicate(model, predicate.selection, node);
            }
            else {
                // Filter Object
                return fieldFilterExpression(predicate);
            }
        });
    }

    function assembleTitle(title, config) {
        if (!title) {
            return undefined;
        }
        if (!isText(title)) {
            return title.map(fieldDef => defaultTitle(fieldDef, config)).join(', ');
        }
        return title;
    }
    function setAxisEncode(axis, part, vgProp, vgRef) {
        var _a, _b, _c;
        axis.encode = (_a = axis.encode, (_a !== null && _a !== void 0 ? _a : {}));
        axis.encode[part] = (_b = axis.encode[part], (_b !== null && _b !== void 0 ? _b : {}));
        axis.encode[part].update = (_c = axis.encode[part].update, (_c !== null && _c !== void 0 ? _c : {}));
        // TODO: remove as any after https://github.com/prisma/nexus-prisma/issues/291
        axis.encode[part].update[vgProp] = vgRef;
    }
    function assembleAxis(axisCmpt, kind, config, opt = { header: false }) {
        var _a, _b;
        const _c = axisCmpt.combine(), { orient, scale, labelExpr, labelOffset, title, zindex } = _c, axis = __rest(_c, ["orient", "scale", "labelExpr", "labelOffset", "title", "zindex"]);
        for (const prop in axis) {
            const propType = AXIS_PROPERTY_TYPE[prop];
            const propValue = axis[prop];
            if (propType && propType !== kind && propType !== 'both') {
                // Remove properties that are not valid for this kind of axis
                delete axis[prop];
            }
            else if (isConditionalAxisValue(propValue)) {
                // deal with conditional axis value
                const { condition, value } = propValue;
                const conditions = array(condition);
                const propIndex = CONDITIONAL_AXIS_PROP_INDEX[prop];
                if (propIndex) {
                    const { vgProp, part } = propIndex;
                    // If there is a corresponding Vega property for the channel,
                    // use Vega's custom axis encoding and delete the original axis property to avoid conflicts
                    const vgRef = [
                        ...conditions.map(c => {
                            const { value: v, test } = c;
                            return {
                                test: expression(null, test),
                                value: v
                            };
                        }),
                        { value }
                    ];
                    setAxisEncode(axis, part, vgProp, vgRef);
                    delete axis[prop];
                }
                else if (propIndex === null) {
                    // If propIndex is null, this means we support conditional axis property by converting the condition to signal insteed.
                    const signalRef = {
                        signal: conditions
                            .map(c => {
                            const { value: v, test } = c;
                            return `${expression(null, test)} ? ${$(v)} : `;
                        })
                            .join('') + $(value)
                    };
                    axis[prop] = signalRef;
                }
            }
            else if (isSignalRef(propValue)) {
                const propIndex = CONDITIONAL_AXIS_PROP_INDEX[prop];
                if (propIndex) {
                    const { vgProp, part } = propIndex;
                    setAxisEncode(axis, part, vgProp, propValue);
                    delete axis[prop];
                } // else do nothing since the property already supports signal
            }
        }
        if (kind === 'grid') {
            if (!axis.grid) {
                return undefined;
            }
            // Remove unnecessary encode block
            if (axis.encode) {
                // Only need to keep encode block for grid
                const { grid } = axis.encode;
                axis.encode = Object.assign({}, (grid ? { grid } : {}));
                if (keys(axis.encode).length === 0) {
                    delete axis.encode;
                }
            }
            return Object.assign(Object.assign({ scale,
                orient }, axis), { domain: false, labels: false, 
                // Always set min/maxExtent to 0 to ensure that `config.axis*.minExtent` and `config.axis*.maxExtent`
                // would not affect gridAxis
                maxExtent: 0, minExtent: 0, ticks: false, zindex: getFirstDefined(zindex, 0) // put grid behind marks by default
             });
        }
        else {
            // kind === 'main'
            if (!opt.header && axisCmpt.mainExtracted) {
                // if mainExtracted has been extracted to a separate facet
                return undefined;
            }
            if (labelExpr !== undefined) {
                let expr = labelExpr;
                if (((_b = (_a = axis.encode) === null || _a === void 0 ? void 0 : _a.labels) === null || _b === void 0 ? void 0 : _b.update) && isSignalRef(axis.encode.labels.update.text)) {
                    expr = replaceAll(labelExpr, 'datum.label', axis.encode.labels.update.text.signal);
                }
                setAxisEncode(axis, 'labels', 'text', { signal: expr });
            }
            if (labelOffset) {
                setAxisEncode(axis, 'labels', orient === 'bottom' || orient === 'top' ? 'dx' : 'dy', { value: labelOffset });
            }
            // Remove unnecessary encode block
            if (axis.encode) {
                for (const part of AXIS_PARTS) {
                    if (!axisCmpt.hasAxisPart(part)) {
                        delete axis.encode[part];
                    }
                }
                if (keys(axis.encode).length === 0) {
                    delete axis.encode;
                }
            }
            const titleString = assembleTitle(title, config);
            return Object.assign(Object.assign(Object.assign({ scale,
                orient, grid: false }, (titleString ? { title: titleString } : {})), axis), { zindex: getFirstDefined(zindex, 0) // put axis line above marks by default
             });
        }
    }
    /**
     * Add axis signals so grid line works correctly
     * (Fix https://github.com/vega/vega-lite/issues/4226)
     */
    function assembleAxisSignals(model) {
        const { axes } = model.component;
        for (const channel of POSITION_SCALE_CHANNELS) {
            if (axes[channel]) {
                for (const axis of axes[channel]) {
                    if (!axis.get('gridScale')) {
                        // If there is x-axis but no y-scale for gridScale, need to set height/weight so x-axis can draw the grid with the right height. Same for y-axis and width.
                        const sizeType = channel === 'x' ? 'height' : 'width';
                        return [
                            {
                                name: sizeType,
                                update: model.getSizeSignalRef(sizeType).signal
                            }
                        ];
                    }
                }
            }
        }
        return [];
    }
    function assembleAxes(axisComponents, config) {
        const { x = [], y = [] } = axisComponents;
        return [
            ...x.map(a => assembleAxis(a, 'grid', config)),
            ...y.map(a => assembleAxis(a, 'grid', config)),
            ...x.map(a => assembleAxis(a, 'main', config)),
            ...y.map(a => assembleAxis(a, 'main', config))
        ].filter(a => a); // filter undefined
    }

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
        labelColor: 'color',
        labelFont: 'font',
        labelFontSize: 'fontSize',
        labelFontStyle: 'fontStyle',
        labelLimit: 'limit',
        labelOrient: 'orient',
        labelPadding: 'offset'
    };
    const HEADER_TITLE_PROPERTIES = keys(HEADER_TITLE_PROPERTIES_MAP);
    const HEADER_LABEL_PROPERTIES = keys(HEADER_LABEL_PROPERTIES_MAP);

    function getAxisConfig(property, config, channel, orient, scaleType, style) {
        var _a;
        const styleConfig = getStyleConfig(property, style, config.style);
        if (styleConfig !== undefined) {
            return {
                configFrom: 'style',
                configValue: styleConfig
            };
        }
        // configTypes to loop, starting from higher precedence
        const configTypes = [
            ...(scaleType === 'band' ? ['axisBand'] : []),
            ...(isQuantitative(scaleType) ? ['axisQuantitative'] : []),
            ...(scaleType === 'time' || scaleType === 'utc' ? ['axisTemporal'] : []),
            // X/Y
            channel === 'x' ? 'axisX' : 'axisY',
            // axisTop, axisBottom, ...
            ...(orient ? ['axis' + orient.substr(0, 1).toUpperCase() + orient.substr(1)] : []),
            'axis'
        ];
        for (const configType of configTypes) {
            if (((_a = config[configType]) === null || _a === void 0 ? void 0 : _a[property]) !== undefined) {
                return {
                    configFrom: configType,
                    configValue: config[configType][property]
                };
            }
        }
        return {};
    }

    // TODO: we need to refactor this method after we take care of config refactoring
    /**
     * Default rules for whether to show a grid should be shown for a channel.
     * If `grid` is unspecified, the default value is `true` for ordinal scales that are not binned
     */
    function defaultGrid(scaleType, fieldDef) {
        return !hasDiscreteDomain(scaleType) && !isBinning(fieldDef.bin);
    }
    function gridScale(model, channel) {
        const gridChannel = channel === 'x' ? 'y' : 'x';
        if (model.getScaleComponent(gridChannel)) {
            return model.scaleName(gridChannel);
        }
        return undefined;
    }
    function labelAngle(model, specifiedAxis, channel, fieldDef) {
        // try axis value
        if (specifiedAxis.labelAngle !== undefined) {
            return normalizeAngle(specifiedAxis.labelAngle);
        }
        else {
            // try axis config value
            const { configValue: angle } = getAxisConfig('labelAngle', model.config, channel, orient(channel), model.getScaleComponent(channel).get('type'), specifiedAxis.style);
            if (angle !== undefined) {
                return normalizeAngle(angle);
            }
            else {
                // get default value
                if (channel === X && contains([NOMINAL, ORDINAL], fieldDef.type)) {
                    return 270;
                }
                // no default
                return undefined;
            }
        }
    }
    function defaultLabelBaseline(angle, axisOrient) {
        if (angle !== undefined) {
            angle = normalizeAngle(angle);
            if (axisOrient === 'top' || axisOrient === 'bottom') {
                if (angle <= 45 || 315 <= angle) {
                    return axisOrient === 'top' ? 'bottom' : 'top';
                }
                else if (135 <= angle && angle <= 225) {
                    return axisOrient === 'top' ? 'top' : 'bottom';
                }
                else {
                    return 'middle';
                }
            }
            else {
                if (angle <= 45 || 315 <= angle || (135 <= angle && angle <= 225)) {
                    return 'middle';
                }
                else if (45 <= angle && angle <= 135) {
                    return axisOrient === 'left' ? 'top' : 'bottom';
                }
                else {
                    return axisOrient === 'left' ? 'bottom' : 'top';
                }
            }
        }
        return undefined;
    }
    function defaultLabelAlign(angle, axisOrient) {
        if (angle !== undefined) {
            angle = normalizeAngle(angle);
            if (axisOrient === 'top' || axisOrient === 'bottom') {
                if (angle % 180 === 0) {
                    return 'center';
                }
                else if (0 < angle && angle < 180) {
                    return axisOrient === 'top' ? 'right' : 'left';
                }
                else {
                    return axisOrient === 'top' ? 'left' : 'right';
                }
            }
            else {
                if ((angle + 90) % 180 === 0) {
                    return 'center';
                }
                else if (90 <= angle && angle < 270) {
                    return axisOrient === 'left' ? 'left' : 'right';
                }
                else {
                    return axisOrient === 'left' ? 'right' : 'left';
                }
            }
        }
        return undefined;
    }
    function defaultLabelFlush(fieldDef, channel) {
        if (channel === 'x' && contains(['quantitative', 'temporal'], fieldDef.type)) {
            return true;
        }
        return undefined;
    }
    function defaultLabelOverlap(fieldDef, scaleType) {
        // do not prevent overlap for nominal data because there is no way to infer what the missing labels are
        if (fieldDef.type !== 'nominal') {
            if (scaleType === 'log') {
                return 'greedy';
            }
            return true;
        }
        return undefined;
    }
    function orient(channel) {
        switch (channel) {
            case X:
                return 'bottom';
            case Y:
                return 'left';
        }
        /* istanbul ignore next: This should never happen. */
        throw new Error(message.INVALID_CHANNEL_FOR_AXIS);
    }
    function defaultTickCount({ fieldDef, scaleType, size }) {
        var _a;
        if (!hasDiscreteDomain(scaleType) &&
            scaleType !== 'log' &&
            !contains(['month', 'hours', 'day', 'quarter'], (_a = normalizeTimeUnit(fieldDef.timeUnit)) === null || _a === void 0 ? void 0 : _a.unit)) {
            if (isBinning(fieldDef.bin)) {
                // for binned data, we don't want more ticks than maxbins
                return { signal: `ceil(${size.signal}/10)` };
            }
            return { signal: `ceil(${size.signal}/40)` };
        }
        return undefined;
    }
    function values(specifiedAxis, model, fieldDef) {
        const vals = specifiedAxis.values;
        if (isArray(vals)) {
            return valueArray(fieldDef, vals);
        }
        else if (isSignalRef(vals)) {
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
        constructor(parent, transform) {
            super(parent);
            this.transform = transform;
            this._dependentFields = getDependentFields(this.transform.calculate);
        }
        clone() {
            return new CalculateNode(null, duplicate(this.transform));
        }
        static parseAllForSortIndex(parent, model) {
            // get all the encoding with sort fields from model
            model.forEachFieldDef((fieldDef, channel) => {
                if (!isScaleFieldDef(fieldDef)) {
                    return;
                }
                if (isSortArray(fieldDef.sort)) {
                    const { field, timeUnit } = fieldDef;
                    const sort = fieldDef.sort;
                    // generate `datum["a"] === val0 ? 0 : datum["a"] === val1 ? 1 : ... : n` via FieldEqualPredicate
                    const calculate = sort
                        .map((sortValue, i) => {
                        return `${fieldFilterExpression({ field, timeUnit, equal: sortValue })} ? ${i} : `;
                    })
                        .join('') + sort.length;
                    parent = new CalculateNode(parent, {
                        calculate,
                        as: sortArrayIndexField(fieldDef, channel, { forAs: true })
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
            return `Calculate ${hash(this.transform)}`;
        }
    }
    function sortArrayIndexField(fieldDef, channel, opt) {
        return vgField(fieldDef, Object.assign({ prefix: channel, suffix: 'sort_index' }, ((opt !== null && opt !== void 0 ? opt : {}))));
    }

    /**
     * Get header channel, which can be different from facet channel when orient is specified or when the facet channel is facet.
     */
    function getHeaderChannel(channel, orient) {
        if (contains(['top', 'bottom'], orient)) {
            return 'column';
        }
        else if (contains(['left', 'right'], orient)) {
            return 'row';
        }
        return channel === 'row' ? 'row' : 'column';
    }
    function getHeaderProperty(prop, facetFieldDef, config, channel) {
        const headerSpecificConfig = channel === 'row' ? config.headerRow : channel === 'column' ? config.headerColumn : config.headerFacet;
        return getFirstDefined(facetFieldDef && facetFieldDef.header ? facetFieldDef.header[prop] : undefined, headerSpecificConfig[prop], config.header[prop]);
    }
    function getHeaderProperties(properties, facetFieldDef, config, channel) {
        const props = {};
        for (const prop of properties) {
            const value = getHeaderProperty(prop, facetFieldDef, config, channel);
            if (value !== undefined) {
                props[prop] = value;
            }
        }
        return props;
    }

    const HEADER_CHANNELS = ['row', 'column'];
    const HEADER_TYPES = ['header', 'footer'];

    // TODO: rename to assembleHeaderTitleGroup
    function assembleTitleGroup(model, channel) {
        const title = model.component.layoutHeaders[channel].title;
        const config = model.config ? model.config : undefined;
        const facetFieldDef = model.component.layoutHeaders[channel].facetFieldDef
            ? model.component.layoutHeaders[channel].facetFieldDef
            : undefined;
        const { titleAnchor, titleAngle, titleOrient } = getHeaderProperties(['titleAnchor', 'titleAngle', 'titleOrient'], facetFieldDef, config, channel);
        const headerChannel = getHeaderChannel(channel, titleOrient);
        return {
            name: `${channel}-title`,
            type: 'group',
            role: `${headerChannel}-title`,
            title: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ text: title }, (channel === 'row' ? { orient: 'left' } : {})), { style: 'guide-title' }), defaultHeaderGuideBaseline(titleAngle, headerChannel)), defaultHeaderGuideAlign(headerChannel, titleAngle, titleAnchor)), assembleHeaderProperties(config, facetFieldDef, channel, HEADER_TITLE_PROPERTIES, HEADER_TITLE_PROPERTIES_MAP))
        };
    }
    function defaultHeaderGuideAlign(headerChannel, angle, anchor = 'middle') {
        switch (anchor) {
            case 'start':
                return { align: 'left' };
            case 'end':
                return { align: 'right' };
        }
        const align = defaultLabelAlign(angle, headerChannel === 'row' ? 'left' : 'top');
        return align ? { align } : {};
    }
    function defaultHeaderGuideBaseline(angle, channel) {
        const baseline = defaultLabelBaseline(angle, channel === 'row' ? 'left' : 'top');
        return baseline ? { baseline } : {};
    }
    function assembleHeaderGroups(model, channel) {
        const layoutHeader = model.component.layoutHeaders[channel];
        const groups = [];
        for (const headerType of HEADER_TYPES) {
            if (layoutHeader[headerType]) {
                for (const headerCmpt of layoutHeader[headerType]) {
                    groups.push(assembleHeaderGroup(model, channel, headerType, layoutHeader, headerCmpt));
                }
            }
        }
        return groups;
    }
    function getSort(facetFieldDef, channel) {
        var _a;
        const { sort } = facetFieldDef;
        if (isSortField(sort)) {
            return {
                field: vgField(sort, { expr: 'datum' }),
                order: (_a = sort.order, (_a !== null && _a !== void 0 ? _a : 'ascending'))
            };
        }
        else if (isArray(sort)) {
            return {
                field: sortArrayIndexField(facetFieldDef, channel, { expr: 'datum' }),
                order: 'ascending'
            };
        }
        else {
            return {
                field: vgField(facetFieldDef, { expr: 'datum' }),
                order: (sort !== null && sort !== void 0 ? sort : 'ascending')
            };
        }
    }
    function assembleLabelTitle(facetFieldDef, channel, config) {
        const { format, labelAngle, labelAnchor, labelOrient, labelExpr } = getHeaderProperties(['format', 'labelAngle', 'labelAnchor', 'labelOrient', 'labelExpr'], facetFieldDef, config, channel);
        const titleTextExpr = formatSignalRef(facetFieldDef, format, 'parent', config).signal;
        const headerChannel = getHeaderChannel(channel, labelOrient);
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ text: {
                signal: labelExpr
                    ? replaceAll(replaceAll(labelExpr, 'datum.label', titleTextExpr), 'datum.value', vgField(facetFieldDef, { expr: 'parent' }))
                    : titleTextExpr
            } }, (channel === 'row' ? { orient: 'left' } : {})), { style: 'guide-label', frame: 'group' }), defaultHeaderGuideBaseline(labelAngle, headerChannel)), defaultHeaderGuideAlign(headerChannel, labelAngle, labelAnchor)), assembleHeaderProperties(config, facetFieldDef, channel, HEADER_LABEL_PROPERTIES, HEADER_LABEL_PROPERTIES_MAP));
    }
    function assembleHeaderGroup(model, channel, headerType, layoutHeader, headerCmpt) {
        var _a;
        if (headerCmpt) {
            let title = null;
            const { facetFieldDef } = layoutHeader;
            const config = model.config ? model.config : undefined;
            if (facetFieldDef && headerCmpt.labels) {
                const { labelOrient } = getHeaderProperties(['labelOrient'], facetFieldDef, config, channel);
                // Include label title in the header if orient aligns with the channel
                if ((channel === 'row' && !contains(['top', 'bottom'], labelOrient)) ||
                    (channel === 'column' && !contains(['left', 'right'], labelOrient))) {
                    title = assembleLabelTitle(facetFieldDef, channel, config);
                }
            }
            const isFacetWithoutRowCol = isFacetModel(model) && !isFacetMapping(model.facet);
            const axes = headerCmpt.axes;
            const hasAxes = ((_a = axes) === null || _a === void 0 ? void 0 : _a.length) > 0;
            if (title || hasAxes) {
                const sizeChannel = channel === 'row' ? 'height' : 'width';
                return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ name: model.getName(`${channel}_${headerType}`), type: 'group', role: `${channel}-${headerType}` }, (layoutHeader.facetFieldDef
                    ? {
                        from: { data: model.getName(channel + '_domain') },
                        sort: getSort(facetFieldDef, channel)
                    }
                    : {})), (hasAxes && isFacetWithoutRowCol
                    ? {
                        from: { data: model.getName(`facet_domain_${channel}`) }
                    }
                    : {})), (title ? { title } : {})), (headerCmpt.sizeSignal
                    ? {
                        encode: {
                            update: {
                                [sizeChannel]: headerCmpt.sizeSignal
                            }
                        }
                    }
                    : {})), (hasAxes ? { axes } : {}));
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
        var _a;
        const titleBand = {};
        for (const channel of FACET_CHANNELS) {
            const headerComponent = headerComponentIndex[channel];
            if ((_a = headerComponent) === null || _a === void 0 ? void 0 : _a.facetFieldDef) {
                const { titleAnchor, titleOrient } = getHeaderProperties(['titleAnchor', 'titleOrient'], headerComponent.facetFieldDef, config, channel);
                const headerChannel = getHeaderChannel(channel, titleOrient);
                const band = getLayoutTitleBand(titleAnchor, headerChannel);
                if (band !== undefined) {
                    titleBand[headerChannel] = band;
                }
            }
        }
        return keys(titleBand).length > 0 ? titleBand : undefined;
    }
    function assembleHeaderProperties(config, facetFieldDef, channel, properties, propertiesMap) {
        const props = {};
        for (const prop of properties) {
            if (!propertiesMap[prop]) {
                continue;
            }
            const value = getHeaderProperty(prop, facetFieldDef, config, channel);
            if (value !== undefined) {
                props[propertiesMap[prop]] = value;
            }
        }
        return props;
    }

    function assembleLayoutSignals(model) {
        return [...sizeSignals(model, 'width'), ...sizeSignals(model, 'height')];
    }
    function sizeSignals(model, sizeType) {
        const channel = sizeType === 'width' ? 'x' : 'y';
        const size = model.component.layoutSize.get(sizeType);
        if (!size || size === 'merged') {
            return [];
        }
        // Read size signal name from name map, just in case it is the top-level size signal that got renamed.
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
                    return [
                        stepSignal(scaleName, range),
                        {
                            name,
                            update: sizeExpr(scaleName, scaleComponent, `domain('${scaleName}').length`)
                        }
                    ];
                }
            }
            /* istanbul ignore next: Condition should not happen -- only for warning in development. */
            throw new Error('layout size is step although width/height is not step.');
        }
        else if (size == 'container') {
            const isWidth = name.endsWith('width');
            const expr = isWidth ? 'containerSize()[0]' : 'containerSize()[1]';
            const defaultValue = getViewConfigContinuousSize(model.config.view, isWidth ? 'width' : 'height');
            const safeExpr = `isFinite(${expr}) ? ${expr} : ${defaultValue}`;
            return [{ name, init: safeExpr, on: [{ update: safeExpr, events: 'window:resize' }] }];
        }
        else {
            return [
                {
                    name,
                    value: size
                }
            ];
        }
    }
    function stepSignal(scaleName, range) {
        return {
            name: scaleName + '_step',
            value: range.step
        };
    }
    function sizeExpr(scaleName, scaleComponent, cardinality) {
        const type = scaleComponent.get('type');
        const padding = scaleComponent.get('padding');
        const paddingOuter = getFirstDefined(scaleComponent.get('paddingOuter'), padding);
        let paddingInner = scaleComponent.get('paddingInner');
        paddingInner =
            type === 'band'
                ? // only band has real paddingInner
                    paddingInner !== undefined
                        ? paddingInner
                        : padding
                : // For point, as calculated in https://github.com/vega/vega-scale/blob/master/src/band.js#L128,
                    // it's equivalent to have paddingInner = 1 since there is only n-1 steps between n points.
                    1;
        return `bandspace(${cardinality}, ${paddingInner}, ${paddingOuter}) * ${scaleName}_step`;
    }

    function guideEncodeEntry(encoding, model) {
        return keys(encoding).reduce((encode, channel) => {
            const valueDef = encoding[channel];
            return Object.assign(Object.assign({}, encode), wrapCondition(model, valueDef, channel, (x) => (isSignalRef(x) ? x : { value: x.value })));
        }, {});
    }

    function defaultScaleResolve(channel, model) {
        if (isLayerModel(model) || isFacetModel(model)) {
            return 'shared';
        }
        else if (isConcatModel(model) || isRepeatModel(model)) {
            return contains(POSITION_SCALE_CHANNELS, channel) ? 'independent' : 'shared';
        }
        /* istanbul ignore next: should never reach here. */
        throw new Error('invalid model type for resolve');
    }
    function parseGuideResolve(resolve, channel) {
        const channelScaleResolve = resolve.scale[channel];
        const guide = contains(POSITION_SCALE_CHANNELS, channel) ? 'axis' : 'legend';
        if (channelScaleResolve === 'independent') {
            if (resolve[guide][channel] === 'shared') {
                warn(message.independentScaleMeansIndependentGuide(channel));
            }
            return 'independent';
        }
        return resolve[guide][channel] || 'shared';
    }

    /**
     * Generic class for storing properties that are explicitly specified
     * and implicitly determined by the compiler.
     * This is important for scale/axis/legend merging as
     * we want to prioritize properties that users explicitly specified.
     */
    class Split {
        constructor(explicit = {}, implicit = {}) {
            this.explicit = explicit;
            this.implicit = implicit;
        }
        clone() {
            return new Split(duplicate(this.explicit), duplicate(this.implicit));
        }
        combine() {
            // FIXME remove "as any".
            // Add "as any" to avoid an error "Spread types may only be created from object types".
            return Object.assign(Object.assign({}, this.explicit), this.implicit);
        }
        get(key) {
            // Explicit has higher precedence
            return getFirstDefined(this.explicit[key], this.implicit[key]);
        }
        getWithExplicit(key) {
            // Explicit has higher precedence
            if (this.explicit[key] !== undefined) {
                return { explicit: true, value: this.explicit[key] };
            }
            else if (this.implicit[key] !== undefined) {
                return { explicit: false, value: this.implicit[key] };
            }
            return { explicit: false, value: undefined };
        }
        setWithExplicit(key, value) {
            if (value.value !== undefined) {
                this.set(key, value.value, value.explicit);
            }
        }
        set(key, value, explicit) {
            delete this[explicit ? 'implicit' : 'explicit'][key];
            this[explicit ? 'explicit' : 'implicit'][key] = value;
            return this;
        }
        copyKeyFromSplit(key, s) {
            // Explicit has higher precedence
            if (s.explicit[key] !== undefined) {
                this.set(key, s.explicit[key], true);
            }
            else if (s.implicit[key] !== undefined) {
                this.set(key, s.implicit[key], false);
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
            }
            else if (diff < 0) {
                return v2;
            }
            return defaultTieBreaker(v1, v2, property, propertyOf);
        };
    }
    function defaultTieBreaker(v1, v2, property, propertyOf) {
        if (v1.explicit && v2.explicit) {
            warn(message.mergeConflictingProperty(property, propertyOf, v1.value, v2.value));
        }
        // If equal score, prefer v1.
        return v1;
    }
    function mergeValuesWithExplicit(v1, v2, property, propertyOf, tieBreaker = defaultTieBreaker) {
        if (v1 === undefined || v1.value === undefined) {
            // For first run
            return v2;
        }
        if (v1.explicit && !v2.explicit) {
            return v1;
        }
        else if (v2.explicit && !v1.explicit) {
            return v2;
        }
        else if (deepEqual(v1.value, v2.value)) {
            return v1;
        }
        else {
            return tieBreaker(v1, v2, property, propertyOf);
        }
    }

    const LEGEND_COMPONENT_PROPERTY_INDEX = Object.assign(Object.assign({}, COMMON_LEGEND_PROPERTY_INDEX), { labelExpr: 1, selections: 1, 
        // channel scales
        opacity: 1, shape: 1, stroke: 1, fill: 1, size: 1, strokeWidth: 1, strokeDash: 1, 
        // encode
        encode: 1 });
    const LEGEND_COMPONENT_PROPERTIES = keys(LEGEND_COMPONENT_PROPERTY_INDEX);
    class LegendComponent extends Split {
    }

    function values$1(legend, fieldDef) {
        const vals = legend.values;
        if (isArray(vals)) {
            return valueArray(fieldDef, vals);
        }
        else if (isSignalRef(vals)) {
            return vals;
        }
        return undefined;
    }
    function defaultSymbolType(mark, channel, shapeChannelDef, markShape) {
        var _a;
        if (channel !== 'shape') {
            // use the value from the shape encoding or the mark config if they exist
            const shape = (_a = getFirstConditionValue(shapeChannelDef), (_a !== null && _a !== void 0 ? _a : markShape));
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
            case 'point':
            case 'circle':
            case 'tick':
            case 'geoshape':
            case 'area':
            case 'text':
                return 'circle';
        }
    }
    function type(params) {
        const { legend } = params;
        return getFirstDefined(legend.type, defaultType$1(params));
    }
    function defaultType$1({ channel, timeUnit, scaleType, alwaysReturn }) {
        // Following the logic in https://github.com/vega/vega-parser/blob/master/src/parsers/legend.js
        if (isColorChannel(channel)) {
            if (contains(['quarter', 'month', 'day'], timeUnit)) {
                return 'symbol';
            }
            if (isContinuousToContinuous(scaleType)) {
                return alwaysReturn ? 'gradient' : undefined;
            }
        }
        return alwaysReturn ? 'symbol' : undefined;
    }
    function direction({ legend, legendConfig, timeUnit, channel, scaleType }) {
        const orient = getFirstDefined(legend.orient, legendConfig.orient, 'right');
        const legendType = type({ legend, channel, timeUnit, scaleType, alwaysReturn: true });
        return getFirstDefined(legend.direction, legendConfig[legendType ? 'gradientDirection' : 'symbolDirection'], defaultDirection(orient, legendType));
    }
    function defaultDirection(orient, legendType) {
        switch (orient) {
            case 'top':
            case 'bottom':
                return 'horizontal';
            case 'left':
            case 'right':
            case 'none':
            case undefined: // undefined = "right" in Vega
                return undefined; // vertical is Vega's default
            default:
                // top-left / ...
                // For inner legend, uses compact layout like Tableau
                return legendType === 'gradient' ? 'horizontal' : undefined;
        }
    }
    function defaultGradientLength({ legend, legendConfig, model, channel, scaleType }) {
        const { gradientHorizontalMaxLength, gradientHorizontalMinLength, gradientVerticalMaxLength, gradientVerticalMinLength } = legendConfig;
        if (isContinuousToContinuous(scaleType)) {
            const dir = direction({ legend, legendConfig, channel, scaleType });
            if (dir === 'horizontal') {
                const orient = getFirstDefined(legend.orient, legendConfig.orient);
                if (orient === 'top' || orient === 'bottom') {
                    return gradientLengthSignal(model, 'width', gradientHorizontalMinLength, gradientHorizontalMaxLength);
                }
                else {
                    return gradientHorizontalMinLength;
                }
            }
            else {
                // vertical / undefined (Vega uses vertical by default)
                return gradientLengthSignal(model, 'height', gradientVerticalMinLength, gradientVerticalMaxLength);
            }
        }
        return undefined;
    }
    function gradientLengthSignal(model, sizeType, min, max) {
        const sizeSignal = model.getSizeSignalRef(sizeType).signal;
        return { signal: `clamp(${sizeSignal}, ${min}, ${max})` };
    }
    function defaultLabelOverlap$1(scaleType) {
        if (contains(['quantile', 'threshold', 'log'], scaleType)) {
            return 'greedy';
        }
        return undefined;
    }

    function type$1(legendCmp, model, channel) {
        const scaleType = model.getScaleComponent(channel).get('type');
        return getFirstDefined(legendCmp.get('type'), defaultType$1({ channel, scaleType, alwaysReturn: true }));
    }
    function symbols(fieldDef, symbolsSpec, model, channel, legendCmp) {
        var _a, _b, _c, _d, _e;
        if (type$1(legendCmp, model, channel) !== 'symbol') {
            return undefined;
        }
        const { markDef, encoding, config, mark } = model;
        const filled = markDef.filled && mark !== 'trail';
        let out = Object.assign(Object.assign({}, applyMarkConfig({}, model, FILL_STROKE_CONFIG)), color$1(model, { filled })); // FIXME: remove this when VgEncodeEntry is compatible with SymbolEncodeEntry
        const opacity = (_a = getMaxValue(encoding.opacity), (_a !== null && _a !== void 0 ? _a : markDef.opacity));
        const condition = selectedCondition(model, legendCmp, fieldDef);
        if (out.fill) {
            // for fill legend, we don't want any fill in symbol
            if (channel === 'fill' || (filled && channel === COLOR)) {
                delete out.fill;
            }
            else {
                if (out.fill['field']) {
                    // For others, set fill to some opaque value (or nothing if a color is already set)
                    if (legendCmp.get('symbolFillColor')) {
                        delete out.fill;
                    }
                    else {
                        out.fill = signalOrValueRef((_b = config.legend.symbolBaseFillColor, (_b !== null && _b !== void 0 ? _b : 'black')));
                        out.fillOpacity = signalOrValueRef((opacity !== null && opacity !== void 0 ? opacity : 1));
                    }
                }
                else if (isArray(out.fill)) {
                    const fill = (_e = (_d = getFirstConditionValue((_c = encoding.fill, (_c !== null && _c !== void 0 ? _c : encoding.color))), (_d !== null && _d !== void 0 ? _d : markDef.fill)), (_e !== null && _e !== void 0 ? _e : (filled && markDef.color)));
                    if (fill) {
                        out.fill = signalOrValueRef(fill);
                    }
                }
            }
        }
        if (out.stroke) {
            if (channel === 'stroke' || (!filled && channel === COLOR)) {
                delete out.stroke;
            }
            else {
                if (out.stroke['field']) {
                    // For others, remove stroke field
                    delete out.stroke;
                }
                else if (isArray(out.stroke)) {
                    const stroke = getFirstDefined(getFirstConditionValue(encoding.stroke || encoding.color), markDef.stroke, filled ? markDef.color : undefined);
                    if (stroke) {
                        out.stroke = { value: stroke };
                    }
                }
            }
        }
        if (channel !== OPACITY) {
            if (condition) {
                out.opacity = [
                    Object.assign({ test: condition }, signalOrValueRef((opacity !== null && opacity !== void 0 ? opacity : 1))),
                    signalOrValueRef(config.legend.unselectedOpacity)
                ];
            }
            else if (opacity) {
                out.opacity = signalOrValueRef(opacity);
            }
        }
        out = Object.assign(Object.assign({}, out), symbolsSpec);
        return keys(out).length > 0 ? out : undefined;
    }
    function gradient(fieldDef, gradientSpec, model, channel, legendCmp) {
        if (type$1(legendCmp, model, channel) !== 'gradient') {
            return undefined;
        }
        let out = {};
        const opacity = getMaxValue(model.encoding.opacity) || model.markDef.opacity;
        if (opacity) {
            // only apply opacity if it is neither zero or undefined
            out.opacity = signalOrValueRef(opacity);
        }
        out = Object.assign(Object.assign({}, out), gradientSpec);
        return keys(out).length > 0 ? out : undefined;
    }
    function labels(fieldDef, labelsSpec, model, channel, legendCmp) {
        var _a;
        const legend = model.legend(channel);
        const config = model.config;
        const condition = selectedCondition(model, legendCmp, fieldDef);
        let out = {};
        if (isTimeFormatFieldDef(fieldDef)) {
            const isUTCScale = model.getScaleComponent(channel).get('type') === ScaleType.UTC;
            const expr = timeFormatExpression('datum.value', (_a = normalizeTimeUnit(fieldDef.timeUnit)) === null || _a === void 0 ? void 0 : _a.unit, legend.format, config.timeFormat, isUTCScale);
            labelsSpec = Object.assign(Object.assign({}, (expr ? { text: { signal: expr } } : {})), labelsSpec);
        }
        if (condition) {
            labelsSpec.opacity = [{ test: condition, value: 1 }, { value: config.legend.unselectedOpacity }];
        }
        out = Object.assign(Object.assign({}, out), labelsSpec);
        return keys(out).length > 0 ? out : undefined;
    }
    function entries(fieldDef, entriesSpec, model, channel, legendCmp) {
        var _a;
        const selections = legendCmp.get('selections');
        return ((_a = selections) === null || _a === void 0 ? void 0 : _a.length) ? { fill: { value: 'transparent' } } : undefined;
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
            return array(channelDef.condition).reduce(reducer, channelDef.value);
        }
        else if (isValueDef(channelDef)) {
            return channelDef.value;
        }
        return undefined;
    }
    function selectedCondition(model, legendCmp, fieldDef) {
        var _a;
        const selections = legendCmp.get('selections');
        if (!((_a = selections) === null || _a === void 0 ? void 0 : _a.length))
            return undefined;
        const field = $(fieldDef.field);
        return selections
            .map(name => {
            const store = $(varName(name) + STORE);
            return `(!length(data(${store})) || (${name}[${field}] && indexof(${name}[${field}], datum.value) >= 0))`;
        })
            .join(' || ');
    }

    var encode = /*#__PURE__*/Object.freeze({
        __proto__: null,
        symbols: symbols,
        gradient: gradient,
        labels: labels,
        entries: entries,
        getFirstConditionValue: getFirstConditionValue
    });

    function parseLegend(model) {
        if (isUnitModel(model)) {
            model.component.legends = parseUnitLegend(model);
        }
        else {
            model.component.legends = parseNonUnitLegend(model);
        }
    }
    function parseUnitLegend(model) {
        const { encoding } = model;
        return [COLOR, FILL, STROKE, STROKEWIDTH, STROKEDASH, SIZE, SHAPE, OPACITY, FILLOPACITY, STROKEOPACITY].reduce((legendComponent, channel) => {
            const def = encoding[channel];
            if (model.legend(channel) &&
                model.getScaleComponent(channel) &&
                !(isFieldDef(def) && channel === SHAPE && def.type === GEOJSON)) {
                legendComponent[channel] = parseLegendForChannel(model, channel);
            }
            return legendComponent;
        }, {});
    }
    function getLegendDefWithScale(model, channel) {
        const scale = model.scaleName(channel);
        if (model.mark === 'trail') {
            if (channel === 'color') {
                // trail is a filled mark, but its default symbolType ("stroke") should use "stroke"
                return { stroke: scale };
            }
            else if (channel === 'size') {
                return { strokeWidth: scale };
            }
        }
        if (channel === 'color') {
            return model.markDef.filled ? { fill: scale } : { stroke: scale };
        }
        return { [channel]: scale };
    }
    function isExplicit(value, property, legend, fieldDef) {
        switch (property) {
            case 'values':
                // specified legend.values is already respected, but may get transformed.
                return !!legend.values;
            case 'title':
                // title can be explicit if fieldDef.title is set
                if (property === 'title' && value === fieldDef.title) {
                    return true;
                }
        }
        // Otherwise, things are explicit if the returned value matches the specified property
        return value === legend[property];
    }
    function parseLegendForChannel(model, channel) {
        var _a;
        const fieldDef = model.fieldDef(channel);
        const legend = model.legend(channel);
        const legendCmpt = new LegendComponent({}, getLegendDefWithScale(model, channel));
        parseInteractiveLegend(model, channel, legendCmpt);
        for (const property of LEGEND_COMPONENT_PROPERTIES) {
            const value = getProperty(property, legend, channel, model);
            if (value !== undefined) {
                const explicit = isExplicit(value, property, legend, fieldDef);
                if (explicit || model.config.legend[property] === undefined) {
                    legendCmpt.set(property, value, explicit);
                }
            }
        }
        const legendEncoding = (_a = legend.encoding, (_a !== null && _a !== void 0 ? _a : {}));
        const selections = legendCmpt.get('selections');
        const legendEncode = ['labels', 'legend', 'title', 'symbols', 'gradient', 'entries'].reduce((e, part) => {
            var _a, _b, _c;
            const legendEncodingPart = guideEncodeEntry((_a = legendEncoding[part], (_a !== null && _a !== void 0 ? _a : {})), model);
            const value = encode[part]
                ? encode[part](fieldDef, legendEncodingPart, model, channel, legendCmpt) // apply rule
                : legendEncodingPart; // no rule -- just default values
            if (value !== undefined && keys(value).length > 0) {
                e[part] = Object.assign(Object.assign(Object.assign({}, (((_b = selections) === null || _b === void 0 ? void 0 : _b.length) ? { name: `${varName(fieldDef.field)}_legend_${part}` } : {})), (((_c = selections) === null || _c === void 0 ? void 0 : _c.length) ? { interactive: !!selections } : {})), { update: value });
            }
            return e;
        }, {});
        if (keys(legendEncode).length > 0) {
            legendCmpt.set('encode', legendEncode, !!legend.encoding);
        }
        return legendCmpt;
    }
    function getProperty(property, legend, channel, model) {
        var _a;
        const { encoding, mark } = model;
        const fieldDef = getTypedFieldDef(encoding[channel]);
        const legendConfig = model.config.legend;
        const timeUnit = (_a = normalizeTimeUnit(fieldDef.timeUnit)) === null || _a === void 0 ? void 0 : _a.unit;
        const scaleType = model.getScaleComponent(channel).get('type');
        switch (property) {
            // TODO: enable when https://github.com/vega/vega/issues/1351 is fixed
            // case 'clipHeight':
            //   return getFirstDefined(specifiedLegend.clipHeight, properties.clipHeight(properties.type(...)));
            case 'direction':
                return direction({
                    legend,
                    legendConfig,
                    timeUnit,
                    channel,
                    scaleType
                });
            case 'format':
                // We don't include temporal field here as we apply format in encode block
                if (isTimeFormatFieldDef(fieldDef)) {
                    return undefined;
                }
                return numberFormat(fieldDef, legend.format, model.config);
            case 'formatType':
                // As with format, we don't include temporal field here as we apply format in encode block
                if (isTimeFormatFieldDef(fieldDef)) {
                    return undefined;
                }
                return legend.formatType;
            case 'gradientLength':
                return getFirstDefined(
                // do specified gradientLength first
                legend.gradientLength, legendConfig.gradientLength, 
                // Otherwise, use smart default based on plot height
                defaultGradientLength({
                    model,
                    legend,
                    legendConfig,
                    channel,
                    scaleType
                }));
            case 'labelOverlap':
                return getFirstDefined(legend.labelOverlap, defaultLabelOverlap$1(scaleType));
            case 'symbolType':
                return getFirstDefined(legend.symbolType, defaultSymbolType(mark, channel, encoding.shape, model.markDef.shape));
            case 'title':
                return (title(fieldDef, model.config, { allowDisabling: true }) || undefined);
            case 'type':
                return type({ legend, channel, timeUnit, scaleType, alwaysReturn: false });
            case 'values':
                return values$1(legend, fieldDef);
        }
        // Otherwise, return specified property.
        return legend[property];
    }
    function parseNonUnitLegend(model) {
        const { legends, resolve } = model.component;
        for (const child of model.children) {
            parseLegend(child);
            keys(child.component.legends).forEach((channel) => {
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
            });
        }
        keys(legends).forEach((channel) => {
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
        });
        return legends;
    }
    function mergeLegendComponent(mergedLegend, childLegend) {
        var _a, _b, _c, _d, _e, _f;
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
        let typeMerged = false;
        // Otherwise, let's merge
        for (const prop of LEGEND_COMPONENT_PROPERTIES) {
            const mergedValueWithExplicit = mergeValuesWithExplicit(mergedLegend.getWithExplicit(prop), childLegend.getWithExplicit(prop), prop, 'legend', 
            // Tie breaker function
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
            if (_c = (_b = (_a = mergedLegend.implicit) === null || _a === void 0 ? void 0 : _a.encode) === null || _b === void 0 ? void 0 : _b.gradient, (_c !== null && _c !== void 0 ? _c : {})) {
                deleteNestedProperty(mergedLegend.implicit, ['encode', 'gradient']);
            }
            if (_f = (_e = (_d = mergedLegend.explicit) === null || _d === void 0 ? void 0 : _d.encode) === null || _e === void 0 ? void 0 : _e.gradient, (_f !== null && _f !== void 0 ? _f : {})) {
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
        var _a, _b, _c;
        legend.encode = (_a = legend.encode, (_a !== null && _a !== void 0 ? _a : {}));
        legend.encode[part] = (_b = legend.encode[part], (_b !== null && _b !== void 0 ? _b : {}));
        legend.encode[part].update = (_c = legend.encode[part].update, (_c !== null && _c !== void 0 ? _c : {}));
        // TODO: remove as any after https://github.com/prisma/nexus-prisma/issues/291
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
            }
            else {
                legendByDomain[domainHash] = [legendComponentIndex[channel].clone()];
            }
        }
        return vals(legendByDomain)
            .flat()
            .map(assembleLegend);
    }
    function assembleLegend(legendCmpt) {
        var _a, _b, _c, _d;
        const _e = legendCmpt.combine(), { labelExpr, selections } = _e, legend = __rest(_e, ["labelExpr", "selections"]);
        if ((_a = legend.encode) === null || _a === void 0 ? void 0 : _a.symbols) {
            const out = legend.encode.symbols.update;
            if (out.fill && out.fill['value'] !== 'transparent' && !out.stroke && !legend.stroke) {
                // For non color channel's legend, we need to override symbol stroke config from Vega config if stroke channel is not used.
                out.stroke = { value: 'transparent' };
            }
            if (legend.fill) {
                // If top-level fill is defined, for non color channel's legend, we need to remove fill.
                delete out.fill;
            }
        }
        if (labelExpr !== undefined) {
            let expr = labelExpr;
            if (((_d = (_c = (_b = legend.encode) === null || _b === void 0 ? void 0 : _b.labels) === null || _c === void 0 ? void 0 : _c.update) === null || _d === void 0 ? void 0 : _d.text) && isSignalRef(legend.encode.labels.update.text)) {
                expr = replaceAll(labelExpr, 'datum.label', legend.encode.labels.update.text.signal);
            }
            setLegendEncode(legend, 'labels', 'text', { signal: expr });
        }
        for (const prop in legend) {
            const propValue = legend[prop];
            if (isSignalRef(propValue)) {
                const propIndex = SIGNAL_LEGEND_PROP_INDEX[prop];
                if (propIndex) {
                    const { vgProp, part } = propIndex;
                    setLegendEncode(legend, part, vgProp, propValue);
                    delete legend[prop];
                }
            }
        }
        return legend;
    }

    function assembleProjections(model) {
        if (isLayerModel(model) || isConcatModel(model) || isRepeatModel(model)) {
            return assembleProjectionsForModelAndChildren(model);
        }
        else {
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
        const { name } = projection, rest = __rest(projection, ["name"]); // we need to extract name so that it is always present in the output and pass TS type validation
        if (!component.data) {
            // generate custom projection, no automatic fitting
            return [
                Object.assign(Object.assign({ name }, { translate: { signal: '[width / 2, height / 2]' } }), rest)
            ];
        }
        else {
            // generate projection that uses extent fitting
            const size = {
                signal: `[${component.size.map(ref => ref.signal).join(', ')}]`
            };
            const fit = component.data.reduce((sources, data) => {
                const source = isSignalRef(data) ? data.signal : `data('${model.lookupDataSource(data)}')`;
                if (!contains(sources, source)) {
                    // build a unique list of sources
                    sources.push(source);
                }
                return sources;
            }, []);
            if (fit.length <= 0) {
                throw new Error("Projection's fit didn't find any data sources");
            }
            return [
                Object.assign({ name,
                    size, fit: {
                        signal: fit.length > 1 ? `[${fit.join(', ')}]` : fit[0]
                    } }, rest)
            ];
        }
    }

    const PROJECTION_PROPERTIES = [
        'type',
        'clipAngle',
        'clipExtent',
        'center',
        'rotate',
        'precision',
        'reflectX',
        'reflectY',
        'coefficient',
        'distance',
        'fraction',
        'lobes',
        'parallel',
        'radius',
        'ratio',
        'spacing',
        'tilt'
    ];

    class ProjectionComponent extends Split {
        constructor(name, specifiedProjection, size, data) {
            super(Object.assign({}, specifiedProjection), // all explicit properties of projection
            { name } // name as initial implicit property
            );
            this.specifiedProjection = specifiedProjection;
            this.size = size;
            this.data = data;
            this.merged = false;
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
        var _a;
        if (model.hasProjection) {
            const proj = model.specifiedProjection;
            const fit = !(proj && (proj.scale != null || proj.translate != null));
            const size = fit ? [model.getSizeSignalRef('width'), model.getSizeSignalRef('height')] : undefined;
            const data = fit ? gatherFitData(model) : undefined;
            return new ProjectionComponent(model.projectionName(true), Object.assign(Object.assign({}, (_a = model.config.projection, (_a !== null && _a !== void 0 ? _a : {}))), ((proj !== null && proj !== void 0 ? proj : {}))), size, data);
        }
        return undefined;
    }
    function gatherFitData(model) {
        const data = [];
        for (const posssiblePair of [
            [LONGITUDE, LATITUDE],
            [LONGITUDE2, LATITUDE2]
        ]) {
            if (model.channelHasField(posssiblePair[0]) || model.channelHasField(posssiblePair[1])) {
                data.push({
                    signal: model.getName(`geojson_${data.length}`)
                });
            }
        }
        if (model.channelHasField(SHAPE) && model.fieldDef(SHAPE).type === GEOJSON) {
            data.push({
                signal: model.getName(`geojson_${data.length}`)
            });
        }
        if (data.length === 0) {
            // main source is geojson, so we can just use that
            data.push(model.requestDataName(MAIN));
        }
        return data;
    }
    function mergeIfNoConflict(first, second) {
        const allPropertiesShared = every(PROJECTION_PROPERTIES, prop => {
            // neither has the property
            if (!hasOwnProperty(first.explicit, prop) && !hasOwnProperty(second.explicit, prop)) {
                return true;
            }
            // both have property and an equal value for property
            if (hasOwnProperty(first.explicit, prop) &&
                hasOwnProperty(second.explicit, prop) &&
                // some properties might be signals or objects and require hashing for comparison
                stringify(first.get(prop)) === stringify(second.get(prop))) {
                return true;
            }
            return false;
        });
        const size = stringify(first.size) === stringify(second.size);
        if (size) {
            if (allPropertiesShared) {
                return first;
            }
            else if (stringify(first.explicit) === stringify({})) {
                return second;
            }
            else if (stringify(second.explicit) === stringify({})) {
                return first;
            }
        }
        // if all properties don't match, let each unit spec have its own projection
        return null;
    }
    function parseNonUnitProjections(model) {
        if (model.children.length === 0) {
            return undefined;
        }
        let nonUnitProjection;
        // parse all children first
        model.children.forEach(child => parseProjection(child));
        // analyze parsed projections, attempt to merge
        const mergable = every(model.children, child => {
            const projection = child.component.projection;
            if (!projection) {
                // child layer does not use a projection
                return true;
            }
            else if (!nonUnitProjection) {
                // cached 'projection' is null, cache this one
                nonUnitProjection = projection;
                return true;
            }
            else {
                const merge = mergeIfNoConflict(nonUnitProjection, projection);
                if (merge) {
                    nonUnitProjection = merge;
                }
                return !!merge;
            }
        });
        // if cached one and all other children share the same projection,
        if (nonUnitProjection && mergable) {
            // so we can elevate it to the layer level
            const name = model.projectionName(true);
            const modelProjection = new ProjectionComponent(name, nonUnitProjection.specifiedProjection, nonUnitProjection.size, duplicate(nonUnitProjection.data));
            // rename and assign all others as merged
            model.children.forEach(child => {
                const projection = child.component.projection;
                if (projection) {
                    if (projection.isFit) {
                        modelProjection.data.push(...child.component.projection.data);
                    }
                    child.renameProjection(projection.get('name'), name);
                    projection.merged = true;
                }
            });
            return modelProjection;
        }
        return undefined;
    }

    function rangeFormula(model, fieldDef, channel, config) {
        var _a, _b;
        if (binRequiresRange(fieldDef, channel)) {
            // read format from axis or legend, if there is no format then use config.numberFormat
            const guide = isUnitModel(model) ? (_b = (_a = model.axis(channel), (_a !== null && _a !== void 0 ? _a : model.legend(channel))), (_b !== null && _b !== void 0 ? _b : {})) : {};
            const startField = vgField(fieldDef, { expr: 'datum' });
            const endField = vgField(fieldDef, { expr: 'datum', binSuffix: 'end' });
            return {
                formulaAs: vgField(fieldDef, { binSuffix: 'range', forAs: true }),
                formula: binFormatExpression(startField, endField, guide.format, config)
            };
        }
        return {};
    }
    function binKey(bin, field) {
        return `${binToString(bin)}_${field}`;
    }
    function getSignalsFromModel(model, key) {
        return {
            signal: model.getName(`${key}_bins`),
            extentSignal: model.getName(`${key}_extent`)
        };
    }
    function getBinSignalName(model, field, bin) {
        var _a;
        const normalizedBin = (_a = normalizeBin(bin, undefined), (_a !== null && _a !== void 0 ? _a : {}));
        const key = binKey(normalizedBin, field);
        return model.getName(`${key}_bins`);
    }
    function isBinTransform(t) {
        return 'as' in t;
    }
    function createBinComponent(t, bin, model) {
        let as;
        let span;
        if (isBinTransform(t)) {
            as = isString(t.as) ? [t.as, `${t.as}_end`] : [t.as[0], t.as[1]];
        }
        else {
            as = [vgField(t, { forAs: true }), vgField(t, { binSuffix: 'end', forAs: true })];
        }
        const normalizedBin = Object.assign({}, normalizeBin(bin, undefined));
        const key = binKey(normalizedBin, t.field);
        const { signal, extentSignal } = getSignalsFromModel(model, key);
        if (isSelectionExtent(normalizedBin.extent)) {
            const ext = normalizedBin.extent;
            const selName = ext.selection;
            span = parseSelectionBinExtent(model.getSelectionComponent(varName(selName), selName), ext);
            delete normalizedBin.extent; // Vega-Lite selection extent map to Vega's span property.
        }
        const binComponent = Object.assign(Object.assign(Object.assign({ bin: normalizedBin, field: t.field, as: [as] }, (signal ? { signal } : {})), (extentSignal ? { extentSignal } : {})), (span ? { span } : {}));
        return { key, binComponent };
    }
    class BinNode extends DataFlowNode {
        constructor(parent, bins) {
            super(parent);
            this.bins = bins;
        }
        clone() {
            return new BinNode(null, duplicate(this.bins));
        }
        static makeFromEncoding(parent, model) {
            const bins = model.reduceFieldDef((binComponentIndex, fieldDef, channel) => {
                if (isTypedFieldDef(fieldDef) && isBinning(fieldDef.bin)) {
                    const { key, binComponent } = createBinComponent(fieldDef, fieldDef.bin, model);
                    binComponentIndex[key] = Object.assign(Object.assign(Object.assign({}, binComponent), binComponentIndex[key]), rangeFormula(model, fieldDef, channel, model.config));
                }
                return binComponentIndex;
            }, {});
            if (keys(bins).length === 0) {
                return null;
            }
            return new BinNode(parent, bins);
        }
        /**
         * Creates a bin node from BinTransform.
         * The optional parameter should provide
         */
        static makeFromTransform(parent, t, model) {
            const { key, binComponent } = createBinComponent(t, t.bin, model);
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
                    renameSignal(other.bins[key].signal, this.bins[key].signal);
                    // Ensure that we don't have duplicate names for signal pairs
                    this.bins[key].as = unique([...this.bins[key].as, ...other.bins[key].as], hash);
                }
                else {
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
            return new Set(vals(this.bins)
                .map(c => c.as)
                .flat(2));
        }
        dependentFields() {
            return new Set(vals(this.bins).map(c => c.field));
        }
        hash() {
            return `Bin ${hash(this.bins)}`;
        }
        assemble() {
            return vals(this.bins).flatMap(bin => {
                const transform = [];
                const [binAs, ...remainingAs] = bin.as;
                const _a = bin.bin, { extent } = _a, params = __rest(_a, ["extent"]);
                const binTrans = Object.assign(Object.assign(Object.assign({ type: 'bin', field: replacePathInField(bin.field), as: binAs, signal: bin.signal }, (!isSelectionExtent(extent) ? { extent } : { extent: null })), (bin.span ? { span: { signal: `span(${bin.span})` } } : {})), params);
                if (!extent && bin.extentSignal) {
                    transform.push({
                        type: 'extent',
                        field: replacePathInField(bin.field),
                        signal: bin.extentSignal
                    });
                    binTrans.extent = { signal: bin.extentSignal };
                }
                transform.push(binTrans);
                for (const as of remainingAs) {
                    for (let i = 0; i < 2; i++) {
                        transform.push({
                            type: 'formula',
                            expr: vgField({ field: binAs[i] }, { expr: 'datum' }),
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

    class SourceNode extends DataFlowNode {
        constructor(data) {
            super(null); // source cannot have parent
            data = (data !== null && data !== void 0 ? data : { name: 'source' });
            let format;
            if (!isGenerator(data)) {
                format = data.format ? Object.assign({}, omit(data.format, ['parse'])) : {};
            }
            if (isInlineData(data)) {
                this._data = { values: data.values };
            }
            else if (isUrlData(data)) {
                this._data = { url: data.url };
                if (!format.type) {
                    // Extract extension from URL using snippet from
                    // http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript
                    let defaultExtension = /(?:\.([^.]+))?$/.exec(data.url)[1];
                    if (!contains(['json', 'csv', 'tsv', 'dsv', 'topojson'], defaultExtension)) {
                        defaultExtension = 'json';
                    }
                    // defaultExtension has type string but we ensure that it is DataFormatType above
                    format.type = defaultExtension;
                }
            }
            else if (isSphereGenerator(data)) {
                // hardwire GeoJSON sphere data into output specification
                this._data = { values: [{ type: 'Sphere' }] };
            }
            else if (isNamedData(data) || isGenerator(data)) {
                this._data = {};
            }
            // set flag to check if generator
            this._generator = isGenerator(data);
            // any dataset can be named
            if (data.name) {
                this._name = data.name;
            }
            if (format && keys(format).length > 0) {
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
            return Object.assign(Object.assign({ name: this._name }, this._data), { transform: [] });
        }
    }

    /**
     * Iterates over a dataflow graph and checks whether all links are consistent.
     */
    function checkLinks(nodes) {
        for (const node of nodes) {
            for (const child of node.children) {
                if (child.parent !== node) {
                    console.error('Dataflow graph is inconsistent.', node, child);
                    return false;
                }
            }
            if (!checkLinks(node.children)) {
                return false;
            }
        }
        return true;
    }

    class GraticuleNode extends DataFlowNode {
        constructor(parent, params) {
            super(parent);
            this.params = params;
        }
        clone() {
            return new GraticuleNode(null, this.params);
        }
        dependentFields() {
            return new Set();
        }
        producedFields() {
            return undefined; // there should never be a node before graticule
        }
        hash() {
            return `Graticule ${hash(this.params)}`;
        }
        assemble() {
            return Object.assign({ type: 'graticule' }, (this.params === true ? {} : this.params));
        }
    }

    class SequenceNode extends DataFlowNode {
        constructor(parent, params) {
            super(parent);
            this.params = params;
        }
        clone() {
            return new SequenceNode(null, this.params);
        }
        dependentFields() {
            return new Set();
        }
        producedFields() {
            var _a;
            return new Set([(_a = this.params.as, (_a !== null && _a !== void 0 ? _a : 'data'))]);
        }
        hash() {
            return `Hash ${hash(this.params)}`;
        }
        assemble() {
            return Object.assign({ type: 'sequence' }, this.params);
        }
    }

    /**
     * Whether this dataflow node is the source of the dataflow that produces data i.e. a source or a generator.
     */
    function isDataSourceNode(node) {
        return node instanceof SourceNode || node instanceof GraticuleNode || node instanceof SequenceNode;
    }
    /**
     * Abstract base class for BottomUpOptimizer and TopDownOptimizer.
     * Contains only mutation handling logic. Subclasses need to implement iteration logic.
     */
    class OptimizerBase {
        constructor() {
            this._mutated = false;
        }
        // Once true, _mutated is never set to false
        setMutated() {
            this._mutated = true;
        }
        get mutatedFlag() {
            return this._mutated;
        }
    }
    /**
     * Starts from a node and runs the optimization function(the "run" method) upwards to the root,
     * depending on the continueFlag and mutatedFlag values returned by the optimization function.
     */
    class BottomUpOptimizer extends OptimizerBase {
        constructor() {
            super();
            this._continue = false;
        }
        setContinue() {
            this._continue = true;
        }
        get continueFlag() {
            return this._continue;
        }
        get flags() {
            return { continueFlag: this.continueFlag, mutatedFlag: this.mutatedFlag };
        }
        set flags({ continueFlag, mutatedFlag }) {
            if (continueFlag) {
                this.setContinue();
            }
            if (mutatedFlag) {
                this.setMutated();
            }
        }
        /**
         * Reset the state of the optimizer after it has completed a run from the bottom of the tree to the top.
         */
        reset() {
            // do nothing
        }
        optimizeNextFromLeaves(node) {
            if (isDataSourceNode(node)) {
                return false;
            }
            const next = node.parent;
            const { continueFlag } = this.run(node);
            if (continueFlag) {
                this.optimizeNextFromLeaves(next);
            }
            return this.mutatedFlag;
        }
    }
    /**
     * The optimizer function( the "run" method), is invoked on the given node and then continues recursively.
     */
    class TopDownOptimizer extends OptimizerBase {
    }

    function addDimension(dims, channel, fieldDef, model) {
        const channelDef2 = isUnitModel(model) ? model.encoding[getSecondaryRangeChannel(channel)] : undefined;
        if (isTypedFieldDef(fieldDef) &&
            isUnitModel(model) &&
            hasBand(channel, fieldDef, channelDef2, model.markDef, model.config)) {
            dims.add(vgField(fieldDef, {}));
            dims.add(vgField(fieldDef, { suffix: 'end' }));
            if (fieldDef.bin && binRequiresRange(fieldDef, channel)) {
                dims.add(vgField(fieldDef, { binSuffix: 'range' }));
            }
        }
        else if (isGeoPositionChannel(channel)) {
            const posChannel = getPositionChannelFromLatLong(channel);
            dims.add(model.getName(posChannel));
        }
        else {
            dims.add(vgField(fieldDef));
        }
        return dims;
    }
    function mergeMeasures(parentMeasures, childMeasures) {
        var _a;
        for (const field of keys(childMeasures)) {
            // when we merge a measure, we either have to add an aggregation operator or even a new field
            const ops = childMeasures[field];
            for (const op of keys(ops)) {
                if (field in parentMeasures) {
                    // add operator to existing measure field
                    parentMeasures[field][op] = new Set([...(_a = parentMeasures[field][op], (_a !== null && _a !== void 0 ? _a : [])), ...ops[op]]);
                }
                else {
                    parentMeasures[field] = { [op]: ops[op] };
                }
            }
        }
    }
    class AggregateNode extends DataFlowNode {
        /**
         * @param dimensions string set for dimensions
         * @param measures dictionary mapping field name => dict of aggregation functions and names to use
         */
        constructor(parent, dimensions, measures) {
            super(parent);
            this.dimensions = dimensions;
            this.measures = measures;
        }
        clone() {
            return new AggregateNode(null, new Set(this.dimensions), duplicate(this.measures));
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
                var _a, _b, _c, _d;
                const { aggregate, field } = fieldDef;
                if (aggregate) {
                    if (aggregate === 'count') {
                        meas['*'] = (_a = meas['*'], (_a !== null && _a !== void 0 ? _a : {}));
                        meas['*']['count'] = new Set([vgField(fieldDef, { forAs: true })]);
                    }
                    else {
                        if (isArgminDef(aggregate) || isArgmaxDef(aggregate)) {
                            const op = isArgminDef(aggregate) ? 'argmin' : 'argmax';
                            const argField = aggregate[op];
                            meas[argField] = (_b = meas[argField], (_b !== null && _b !== void 0 ? _b : {}));
                            meas[argField][op] = new Set([vgField({ op, field: argField }, { forAs: true })]);
                        }
                        else {
                            meas[field] = (_c = meas[field], (_c !== null && _c !== void 0 ? _c : {}));
                            meas[field][aggregate] = new Set([vgField(fieldDef, { forAs: true })]);
                        }
                        // For scale channel with domain === 'unaggregated', add min/max so we can use their union as unaggregated domain
                        if (isScaleChannel(channel) && model.scaleDomain(channel) === 'unaggregated') {
                            meas[field] = (_d = meas[field], (_d !== null && _d !== void 0 ? _d : {}));
                            meas[field]['min'] = new Set([vgField({ field, aggregate: 'min' }, { forAs: true })]);
                            meas[field]['max'] = new Set([vgField({ field, aggregate: 'max' }, { forAs: true })]);
                        }
                    }
                }
                else {
                    addDimension(dims, channel, fieldDef, model);
                }
            });
            if (dims.size + keys(meas).length === 0) {
                return null;
            }
            return new AggregateNode(parent, dims, meas);
        }
        static makeFromTransform(parent, t) {
            var _a, _b, _c;
            const dims = new Set();
            const meas = {};
            for (const s of t.aggregate) {
                const { op, field, as } = s;
                if (op) {
                    if (op === 'count') {
                        meas['*'] = (_a = meas['*'], (_a !== null && _a !== void 0 ? _a : {}));
                        meas['*']['count'] = new Set([as ? as : vgField(s, { forAs: true })]);
                    }
                    else {
                        meas[field] = (_b = meas[field], (_b !== null && _b !== void 0 ? _b : {}));
                        meas[field][op] = new Set([as ? as : vgField(s, { forAs: true })]);
                    }
                }
            }
            for (const s of (_c = t.groupby, (_c !== null && _c !== void 0 ? _c : []))) {
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
            else {
                debug('different dimensions, cannot merge');
                return false;
            }
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
                        out.add(`${op}_${field}`);
                    }
                    else {
                        m.forEach(out.add, out);
                    }
                }
            }
            return out;
        }
        hash() {
            return `Aggregate ${hash({ dimensions: this.dimensions, measures: this.measures })}`;
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
                groupby: [...this.dimensions],
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
            for (const channel of FACET_CHANNELS) {
                const fieldDef = model.facet[channel];
                if (fieldDef) {
                    const { bin, sort } = fieldDef;
                    this[channel] = Object.assign({ name: model.getName(`${channel}_domain`), fields: [vgField(fieldDef), ...(isBinning(bin) ? [vgField(fieldDef, { binSuffix: 'end' })] : [])] }, (isSortField(sort)
                        ? { sortField: sort }
                        : isArray(sort)
                            ? { sortIndexField: sortArrayIndexField(fieldDef, channel) }
                            : {}));
                }
            }
            this.childModel = model.child;
        }
        hash() {
            let out = `Facet`;
            for (const channel of FACET_CHANNELS) {
                if (this[channel]) {
                    out += ` ${channel.charAt(0)}:${hash(this[channel])}`;
                }
            }
            return out;
        }
        get fields() {
            var _a;
            const f = [];
            for (const channel of FACET_CHANNELS) {
                if ((_a = this[channel]) === null || _a === void 0 ? void 0 : _a.fields) {
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
            for (const channel of ['x', 'y']) {
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
                        }
                        else {
                            warn(`Unknown field for ${channel}. Cannot calculate view size.`);
                        }
                    }
                }
            }
            return childIndependentFieldsWithStep;
        }
        assembleRowColumnHeaderData(channel, crossedDataName, childIndependentFieldsWithStep) {
            const childChannel = { row: 'y', column: 'x' }[channel];
            const fields = [];
            const ops = [];
            const as = [];
            if (childIndependentFieldsWithStep && childIndependentFieldsWithStep[childChannel]) {
                if (crossedDataName) {
                    // If there is a crossed data, calculate max
                    fields.push(`distinct_${childIndependentFieldsWithStep[childChannel]}`);
                    ops.push('max');
                }
                else {
                    // If there is no crossed data, just calculate distinct
                    fields.push(childIndependentFieldsWithStep[childChannel]);
                    ops.push('distinct');
                }
                // Although it is technically a max, just name it distinct so it's easier to refer to it
                as.push(`distinct_${childIndependentFieldsWithStep[childChannel]}`);
            }
            const { sortField, sortIndexField } = this[channel];
            if (sortField) {
                const { op = DEFAULT_SORT_OP, field } = sortField;
                fields.push(field);
                ops.push(op);
                as.push(vgField(sortField, { forAs: true }));
            }
            else if (sortIndexField) {
                fields.push(sortIndexField);
                ops.push('max');
                as.push(sortIndexField);
            }
            return {
                name: this[channel].name,
                // Use data from the crossed one if it exist
                source: (crossedDataName !== null && crossedDataName !== void 0 ? crossedDataName : this.data),
                transform: [
                    Object.assign({ type: 'aggregate', groupby: this[channel].fields }, (fields.length
                        ? {
                            fields,
                            ops,
                            as
                        }
                        : {}))
                ]
            };
        }
        assembleFacetHeaderData(childIndependentFieldsWithStep) {
            var _a, _b;
            const { columns } = this.model.layout;
            const { layoutHeaders } = this.model.component;
            const data = [];
            const hasSharedAxis = {};
            for (const headerChannel of HEADER_CHANNELS) {
                for (const headerType of HEADER_TYPES) {
                    const headers = (_a = (layoutHeaders[headerChannel] && layoutHeaders[headerChannel][headerType]), (_a !== null && _a !== void 0 ? _a : []));
                    for (const header of headers) {
                        if (((_b = header.axes) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                            hasSharedAxis[headerChannel] = true;
                            break;
                        }
                    }
                }
                if (hasSharedAxis[headerChannel]) {
                    const cardinality = `length(data("${this.facet.name}"))`;
                    const stop = headerChannel === 'row'
                        ? columns
                            ? { signal: `ceil(${cardinality} / ${columns})` }
                            : 1
                        : columns
                            ? { signal: `min(${cardinality}, ${columns})` }
                            : { signal: cardinality };
                    data.push({
                        name: `${this.facet.name}_${headerChannel}`,
                        transform: [
                            {
                                type: 'sequence',
                                start: 0,
                                stop
                            }
                        ]
                    });
                }
            }
            const { row, column } = hasSharedAxis;
            if (row || column) {
                data.unshift(this.assembleRowColumnHeaderData('facet', null, childIndependentFieldsWithStep));
            }
            return data;
        }
        assemble() {
            var _a, _b;
            const data = [];
            let crossedDataName = null;
            const childIndependentFieldsWithStep = this.getChildIndependentFieldsWithStep();
            const { column, row, facet } = this;
            if (column && row && (childIndependentFieldsWithStep.x || childIndependentFieldsWithStep.y)) {
                // Need to create a cross dataset to correctly calculate cardinality
                crossedDataName = `cross_${this.column.name}_${this.row.name}`;
                const fields = [].concat((_a = childIndependentFieldsWithStep.x, (_a !== null && _a !== void 0 ? _a : [])), (_b = childIndependentFieldsWithStep.y, (_b !== null && _b !== void 0 ? _b : [])));
                const ops = fields.map(() => 'distinct');
                data.push({
                    name: crossedDataName,
                    source: this.data,
                    transform: [
                        {
                            type: 'aggregate',
                            groupby: this.fields,
                            fields,
                            ops
                        }
                    ]
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
        if ((pattern[0] === "'" && pattern[pattern.length - 1] === "'") ||
            (pattern[0] === '"' && pattern[pattern.length - 1] === '"')) {
            return pattern.slice(1, -1);
        }
        return pattern;
    }
    /**
     * @param field The field.
     * @param parse What to parse the field as.
     */
    function parseExpression$1(field, parse) {
        const f = accessPathWithDatum(field);
        if (parse === 'number') {
            return `toNumber(${f})`;
        }
        else if (parse === 'boolean') {
            return `toBoolean(${f})`;
        }
        else if (parse === 'string') {
            return `toString(${f})`;
        }
        else if (parse === 'date') {
            return `toDate(${f})`;
        }
        else if (parse === 'flatten') {
            return f;
        }
        else if (parse.indexOf('date:') === 0) {
            const specifier = unquote(parse.slice(5, parse.length));
            return `timeParse(${f},'${specifier}')`;
        }
        else if (parse.indexOf('utc:') === 0) {
            const specifier = unquote(parse.slice(4, parse.length));
            return `utcParse(${f},'${specifier}')`;
        }
        else {
            warn(message.unrecognizedParse(parse));
            return null;
        }
    }
    function getImplicitFromFilterTransform(transform) {
        const implicit = {};
        forEachLeaf(transform.filter, filter => {
            var _a;
            if (isFieldPredicate(filter)) {
                // Automatically add a parse node for filters with filter objects
                let val = null;
                // For EqualFilter, just use the equal property.
                // For RangeFilter and OneOfFilter, all array members should have
                // the same type, so we only use the first one.
                if (isFieldEqualPredicate(filter)) {
                    val = filter.equal;
                }
                else if (isFieldRangePredicate(filter)) {
                    val = filter.range[0];
                }
                else if (isFieldOneOfPredicate(filter)) {
                    val = (_a = filter.oneOf, (_a !== null && _a !== void 0 ? _a : filter['in']))[0];
                } // else -- for filter expression, we can't infer anything
                if (val) {
                    if (isDateTime(val)) {
                        implicit[filter.field] = 'date';
                    }
                    else if (isNumber(val)) {
                        implicit[filter.field] = 'number';
                    }
                    else if (isString(val)) {
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
            if (isTimeFormatFieldDef(fieldDef)) {
                implicit[fieldDef.field] = 'date';
            }
            else if (fieldDef.type === 'quantitative' &&
                isMinMaxOp(fieldDef.aggregate) // we need to parse numbers to support correct min and max
            ) {
                implicit[fieldDef.field] = 'number';
            }
            else if (accessPathDepth(fieldDef.field) > 1) {
                // For non-date/non-number (strings and booleans), derive a flattened field for a referenced nested field.
                // (Parsing numbers / dates already flattens numeric and temporal fields.)
                if (!(fieldDef.field in implicit)) {
                    implicit[fieldDef.field] = 'flatten';
                }
            }
            else if (isScaleFieldDef(fieldDef) && isSortField(fieldDef.sort) && accessPathDepth(fieldDef.sort.field) > 1) {
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
                }
                else {
                    const mainChannel = getMainRangeChannel(channel);
                    const mainFieldDef = model.fieldDef(mainChannel);
                    add(Object.assign(Object.assign({}, fieldDef), { type: mainFieldDef.type }));
                }
            });
        }
        // Parse quantitative dimension fields of path marks as numbers so that we sort them correctly.
        if (isUnitModel(model)) {
            const { mark, markDef, encoding } = model;
            if (isPathMark(mark) &&
                // No need to sort by dimension if we have a connected scatterplot (order channel is present)
                !model.encoding.order) {
                const dimensionChannel = markDef.orient === 'horizontal' ? 'y' : 'x';
                const dimensionChannelDef = encoding[dimensionChannel];
                if (isFieldDef(dimensionChannelDef) &&
                    dimensionChannelDef.type === 'quantitative' &&
                    !(dimensionChannelDef.field in implicit)) {
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
        constructor(parent, parse) {
            super(parent);
            this._parse = parse;
        }
        clone() {
            return new ParseNode(null, duplicate(this._parse));
        }
        hash() {
            return `Parse ${hash(this._parse)}`;
        }
        /**
         * Creates a parse node from a data.format.parse and updates ancestorParse.
         */
        static makeExplicit(parent, model, ancestorParse) {
            // Custom parse
            let explicit = {};
            const data = model.data;
            if (!isGenerator(data) && data && data.format && data.format.parse) {
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
                    if (parsedAs.explicit ||
                        parsedAs.value === implicit[field] ||
                        parsedAs.value === 'derived' ||
                        implicit[field] === 'flatten') {
                        delete implicit[field];
                    }
                    else {
                        warn(message.differentParse(field, implicit[field], parsedAs.value));
                    }
                }
            }
            for (const field of keys(explicit)) {
                const parsedAs = ancestorParse.get(field);
                if (parsedAs !== undefined) {
                    // Don't parse a field again if it has been parsed with the same type already.
                    if (parsedAs === explicit[field]) {
                        delete explicit[field];
                    }
                    else {
                        warn(message.differentParse(field, explicit[field], parsedAs));
                    }
                }
            }
            const parse = new Split(explicit, implicit);
            // add the format parse from this model so that children don't parse the same field again
            ancestorParse.copyAll(parse);
            // copy only non-null parses
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
            this._parse = Object.assign(Object.assign({}, this._parse), other.parse);
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
        }
        // format parse depends and produces all fields in its parse
        producedFields() {
            return new Set(keys(this._parse));
        }
        dependentFields() {
            return new Set(keys(this._parse));
        }
        assembleTransforms(onlyNested = false) {
            return keys(this._parse)
                .filter(field => (onlyNested ? accessPathDepth(field) > 1 : true))
                .map(field => {
                const expr = parseExpression$1(field, this._parse[field]);
                if (!expr) {
                    return null;
                }
                const formula = {
                    type: 'formula',
                    expr,
                    as: removePathFromField(field) // Vega output is always flattened
                };
                return formula;
            })
                .filter(t => t !== null);
        }
    }

    /**
     * A class for the join aggregate transform nodes.
     */
    class JoinAggregateTransformNode extends DataFlowNode {
        constructor(parent, transform) {
            super(parent);
            this.transform = transform;
        }
        clone() {
            return new JoinAggregateTransformNode(null, duplicate(this.transform));
        }
        addDimensions(fields) {
            this.transform.groupby = unique(this.transform.groupby.concat(fields), d => d);
        }
        dependentFields() {
            const out = new Set();
            if (this.transform.groupby) {
                this.transform.groupby.forEach(f => out.add(f));
            }
            this.transform.joinaggregate
                .map(w => w.field)
                .filter(f => f !== undefined)
                .forEach(f => out.add(f));
            return out;
        }
        producedFields() {
            return new Set(this.transform.joinaggregate.map(this.getDefaultName));
        }
        getDefaultName(joinAggregateFieldDef) {
            var _a;
            return _a = joinAggregateFieldDef.as, (_a !== null && _a !== void 0 ? _a : vgField(joinAggregateFieldDef));
        }
        hash() {
            return `JoinAggregateTransform ${hash(this.transform)}`;
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
            return Object.assign({ type: 'joinaggregate', as,
                ops,
                fields }, (groupby !== undefined ? { groupby } : {}));
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
        return isArray(as) && as.every(s => isString(s)) && as.length > 1;
    }
    class StackNode extends DataFlowNode {
        constructor(parent, stack) {
            super(parent);
            this._stack = stack;
        }
        clone() {
            return new StackNode(null, duplicate(this._stack));
        }
        static makeFromTransform(parent, stackTransform) {
            const { stack, groupby, as, offset = 'zero' } = stackTransform;
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
            }
            else if (isString(as)) {
                normalizedAs = [as, as + '_end'];
            }
            else {
                normalizedAs = [stackTransform.stack + '_start', stackTransform.stack + '_end'];
            }
            return new StackNode(parent, {
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
            const { encoding } = model;
            if (!stackProperties) {
                return null;
            }
            let dimensionFieldDef;
            if (stackProperties.groupbyChannel) {
                const cDef = encoding[stackProperties.groupbyChannel];
                dimensionFieldDef = getTypedFieldDef(cDef); // Fair to cast as groupByChannel is always either x or y
            }
            const stackby = getStackByFields(model);
            const orderDef = model.encoding.order;
            let sort;
            if (isArray(orderDef) || isFieldDef(orderDef)) {
                sort = sortParams(orderDef);
            }
            else {
                // default = descending by stackFields
                // FIXME is the default here correct for binned fields?
                sort = stackby.reduce((s, field) => {
                    s.field.push(field);
                    s.order.push('descending');
                    return s;
                }, { field: [], order: [] });
            }
            return new StackNode(parent, {
                dimensionFieldDef,
                stackField: model.vgField(stackProperties.fieldChannel),
                facetby: [],
                stackby,
                sort,
                offset: stackProperties.offset,
                impute: stackProperties.impute,
                as: [
                    model.vgField(stackProperties.fieldChannel, { suffix: 'start', forAs: true }),
                    model.vgField(stackProperties.fieldChannel, { suffix: 'end', forAs: true })
                ]
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
            this.getGroupbyFields().forEach(f => out.add(f));
            this._stack.facetby.forEach(f => out.add(f));
            this._stack.sort.field.forEach(f => out.add(f));
            return out;
        }
        producedFields() {
            return new Set(this._stack.as);
        }
        hash() {
            return `Stack ${hash(this._stack)}`;
        }
        getGroupbyFields() {
            const { dimensionFieldDef, impute, groupby } = this._stack;
            if (dimensionFieldDef) {
                if (dimensionFieldDef.bin) {
                    if (impute) {
                        // For binned group by field with impute, we calculate bin_mid
                        // as we cannot impute two fields simultaneously
                        return [vgField(dimensionFieldDef, { binSuffix: 'mid' })];
                    }
                    return [
                        // For binned group by field without impute, we need both bin (start) and bin_end
                        vgField(dimensionFieldDef, {}),
                        vgField(dimensionFieldDef, { binSuffix: 'end' })
                    ];
                }
                return [vgField(dimensionFieldDef)];
            }
            return (groupby !== null && groupby !== void 0 ? groupby : []);
        }
        assemble() {
            const transform = [];
            const { facetby, dimensionFieldDef, stackField: field, stackby, sort, offset, impute, as } = this._stack;
            // Impute
            if (impute && dimensionFieldDef) {
                const { band = 0.5, bin } = dimensionFieldDef;
                if (bin) {
                    // As we can only impute one field at a time, we need to calculate
                    // mid point for a binned field
                    transform.push({
                        type: 'formula',
                        expr: `${band}*` +
                            vgField(dimensionFieldDef, { expr: 'datum' }) +
                            `+${1 - band}*` +
                            vgField(dimensionFieldDef, { expr: 'datum', binSuffix: 'end' }),
                        as: vgField(dimensionFieldDef, { binSuffix: 'mid', forAs: true })
                    });
                }
                transform.push({
                    type: 'impute',
                    field,
                    groupby: [...stackby, ...facetby],
                    key: vgField(dimensionFieldDef, { binSuffix: 'mid' }),
                    method: 'value',
                    value: 0
                });
            }
            // Stack
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
        constructor(parent, transform) {
            super(parent);
            this.transform = transform;
        }
        clone() {
            return new WindowTransformNode(null, duplicate(this.transform));
        }
        addDimensions(fields) {
            this.transform.groupby = unique(this.transform.groupby.concat(fields), d => d);
        }
        dependentFields() {
            var _a, _b;
            const out = new Set();
            (_a = this.transform.groupby, (_a !== null && _a !== void 0 ? _a : [])).forEach(f => out.add(f));
            (_b = this.transform.sort, (_b !== null && _b !== void 0 ? _b : [])).forEach(m => out.add(m.field));
            this.transform.window
                .map(w => w.field)
                .filter(f => f !== undefined)
                .forEach(f => out.add(f));
            return out;
        }
        producedFields() {
            return new Set(this.transform.window.map(this.getDefaultName));
        }
        getDefaultName(windowFieldDef) {
            var _a;
            return _a = windowFieldDef.as, (_a !== null && _a !== void 0 ? _a : vgField(windowFieldDef));
        }
        hash() {
            return `WindowTransform ${hash(this.transform)}`;
        }
        assemble() {
            var _a;
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
                return Object.assign({ type: 'joinaggregate', as, ops: ops, fields }, (groupby !== undefined ? { groupby } : {}));
            }
            const sortFields = [];
            const sortOrder = [];
            if (this.transform.sort !== undefined) {
                for (const sortField of this.transform.sort) {
                    sortFields.push(sortField.field);
                    sortOrder.push((_a = sortField.order, (_a !== null && _a !== void 0 ? _a : 'ascending')));
                }
            }
            const sort = {
                field: sortFields,
                order: sortOrder
            };
            const ignorePeers = this.transform.ignorePeers;
            return Object.assign(Object.assign(Object.assign({ type: 'window', params,
                as,
                ops,
                fields,
                sort }, (ignorePeers !== undefined ? { ignorePeers } : {})), (groupby !== undefined ? { groupby } : {})), (frame !== undefined ? { frame } : {}));
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
            return { type: 'identifier', as: SELECTION_ID };
        }
    }

    /**
     * Move parse nodes up to forks.
     */
    class MoveParseUp extends BottomUpOptimizer {
        run(node) {
            const parent = node.parent;
            // Move parse up by merging or swapping.
            if (node instanceof ParseNode) {
                if (isDataSourceNode(parent)) {
                    return this.flags;
                }
                if (parent.numChildren() > 1) {
                    // Don't move parse further up but continue with parent.
                    this.setContinue();
                    return this.flags;
                }
                if (parent instanceof ParseNode) {
                    this.setMutated();
                    parent.merge(node);
                }
                else {
                    // Don't swap with nodes that produce something that the parse node depends on (e.g. lookup).
                    if (fieldIntersection(parent.producedFields(), node.dependentFields())) {
                        this.setContinue();
                        return this.flags;
                    }
                    this.setMutated();
                    node.swapWithParent();
                }
            }
            this.setContinue();
            return this.flags;
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
                }
                else {
                    buckets[hashes[i]].push(node.children[i]);
                }
            }
            for (const k of keys(buckets)) {
                if (buckets[k].length > 1) {
                    this.setMutated();
                    this.mergeNodes(node, buckets[k]);
                }
            }
            for (const child of node.children) {
                this.run(child);
            }
            return this.mutatedFlag;
        }
    }
    /**
     * Repeatedly remove leaf nodes that are not output or facet nodes.
     * The reason is that we don't need subtrees that don't have any output nodes.
     * Facet nodes are needed for the row or column domains.
     */
    class RemoveUnusedSubtrees extends BottomUpOptimizer {
        run(node) {
            if (node instanceof OutputNode || node.numChildren() > 0 || node instanceof FacetNode) {
                // no need to continue with parent because it is output node or will have children (there was a fork)
                return this.flags;
            }
            else {
                this.setMutated();
                node.remove();
            }
            return this.flags;
        }
    }
    /**
     * Removes duplicate time unit nodes (as determined by the name of the
     * output field) that may be generated due to selections projected over
     * time units.
     *
     * TODO: Try to make this a top down optimizer that keeps only the first
     * insance of a time unit node.
     * TODO: Try to make a generic version of this that only keeps one node per hash.
     */
    class RemoveDuplicateTimeUnits extends BottomUpOptimizer {
        constructor() {
            super(...arguments);
            this.fields = new Set();
            this.prev = null;
        }
        run(node) {
            this.setContinue();
            if (node instanceof TimeUnitNode) {
                const pfields = node.producedFields();
                if (hasIntersection(pfields, this.fields)) {
                    this.setMutated();
                    this.prev.remove();
                }
                else {
                    this.fields = new Set([...this.fields, ...pfields]);
                }
                this.prev = node;
            }
            return this.flags;
        }
        reset() {
            this.fields.clear();
        }
    }
    /**
     * Merge adjacent time unit nodes.
     */
    class MergeTimeUnits extends BottomUpOptimizer {
        run(node) {
            this.setContinue();
            const parent = node.parent;
            const timeUnitChildren = parent.children.filter(x => x instanceof TimeUnitNode);
            const combination = timeUnitChildren.pop();
            for (const timeUnit of timeUnitChildren) {
                this.setMutated();
                combination.merge(timeUnit);
            }
            return this.flags;
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
                }
                else if (copy instanceof AggregateNode ||
                    copy instanceof StackNode ||
                    copy instanceof WindowTransformNode ||
                    copy instanceof JoinAggregateTransformNode) {
                    copy.addDimensions(facet.fields);
                }
                node.children.flatMap(clone).forEach((n) => (n.parent = copy));
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
                if (child instanceof AggregateNode ||
                    child instanceof StackNode ||
                    child instanceof WindowTransformNode ||
                    child instanceof JoinAggregateTransformNode) {
                    child.addDimensions(node.fields);
                }
                child.swapWithParent();
                moveFacetDown(node);
            }
            else {
                // move main to facet
                const facetMain = node.model.component.data.main;
                moveMainDownToFacet(facetMain);
                // replicate the subtree and place it before the facet's main node
                const cloner = cloneSubtree(node);
                const copy = node.children.map(cloner).flat();
                for (const c of copy) {
                    c.parent = facetMain;
                }
            }
        }
        else {
            node.children.map(moveFacetDown);
        }
    }
    function moveMainDownToFacet(node) {
        if (node instanceof OutputNode && node.type === MAIN) {
            if (node.numChildren() === 1) {
                const child = node.children[0];
                if (!(child instanceof FacetNode)) {
                    child.swapWithParent();
                    moveMainDownToFacet(node);
                }
            }
        }
    }
    /**
     * Remove output nodes that are not required. Starting from a root.
     */
    class RemoveUnnecessaryOutputNodes extends TopDownOptimizer {
        constructor() {
            super();
        }
        run(node) {
            if (node instanceof OutputNode && !node.isRequired()) {
                this.setMutated();
                node.remove();
            }
            for (const child of node.children) {
                this.run(child);
            }
            return this.mutatedFlag;
        }
    }
    class RemoveUnnecessaryIdentifierNodes extends TopDownOptimizer {
        constructor(model) {
            super();
            this.requiresSelectionId = model && requiresSelectionId(model);
        }
        run(node) {
            if (node instanceof IdentifierNode) {
                // Only preserve IdentifierNodes if we have default discrete selections
                // in our model tree, and if the nodes come after tuple producing nodes.
                if (!(this.requiresSelectionId &&
                    (isDataSourceNode(node.parent) || node.parent instanceof AggregateNode || node.parent instanceof ParseNode))) {
                    this.setMutated();
                    node.remove();
                }
            }
            for (const child of node.children) {
                this.run(child);
            }
            return this.mutatedFlag;
        }
    }
    /**
     * Inserts an intermediate ParseNode containing all non-conflicting parse fields and removes the empty ParseNodes.
     *
     * We assume that dependent paths that do not have a parse node can be just merged.
     */
    class MergeParse extends BottomUpOptimizer {
        run(node) {
            const parent = node.parent;
            const originalChildren = [...parent.children];
            const parseChildren = parent.children.filter((child) => child instanceof ParseNode);
            if (parent.numChildren() > 1 && parseChildren.length >= 1) {
                const commonParse = {};
                const conflictingParse = new Set();
                for (const parseNode of parseChildren) {
                    const parse = parseNode.parse;
                    for (const k of keys(parse)) {
                        if (!(k in commonParse)) {
                            commonParse[k] = parse[k];
                        }
                        else if (commonParse[k] !== parse[k]) {
                            conflictingParse.add(k);
                        }
                    }
                }
                for (const field of conflictingParse) {
                    delete commonParse[field];
                }
                if (keys(commonParse).length !== 0) {
                    this.setMutated();
                    const mergedParseNode = new ParseNode(parent, commonParse);
                    for (const childNode of originalChildren) {
                        if (childNode instanceof ParseNode) {
                            for (const key of keys(commonParse)) {
                                delete childNode.parse[key];
                            }
                        }
                        parent.removeChild(childNode);
                        childNode.parent = mergedParseNode;
                        // remove empty parse nodes
                        if (childNode instanceof ParseNode && keys(childNode.parse).length === 0) {
                            childNode.remove();
                        }
                    }
                }
            }
            this.setContinue();
            return this.flags;
        }
    }
    class MergeAggregates extends BottomUpOptimizer {
        run(node) {
            const parent = node.parent;
            const aggChildren = parent.children.filter((child) => child instanceof AggregateNode);
            // Object which we'll use to map the fields which an aggregate is grouped by to
            // the set of aggregates with that grouping. This is useful as only aggregates
            // with the same group by can be merged
            const groupedAggregates = {};
            // Build groupedAggregates
            for (const agg of aggChildren) {
                const groupBys = hash(agg.groupBy);
                if (!(groupBys in groupedAggregates)) {
                    groupedAggregates[groupBys] = [];
                }
                groupedAggregates[groupBys].push(agg);
            }
            // Merge aggregateNodes with same key in groupedAggregates
            for (const group of keys(groupedAggregates)) {
                const mergeableAggs = groupedAggregates[group];
                if (mergeableAggs.length > 1) {
                    const mergedAggs = mergeableAggs.pop();
                    for (const agg of mergeableAggs) {
                        if (mergedAggs.merge(agg)) {
                            parent.removeChild(agg);
                            agg.parent = mergedAggs;
                            agg.remove();
                            this.setMutated();
                        }
                    }
                }
            }
            this.setContinue();
            return this.flags;
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
            const parent = node.parent;
            const moveBinsUp = !(isDataSourceNode(parent) ||
                parent instanceof FilterNode ||
                parent instanceof ParseNode ||
                parent instanceof IdentifierNode);
            const promotableBins = [];
            const remainingBins = [];
            for (const child of parent.children) {
                if (child instanceof BinNode) {
                    if (moveBinsUp && !fieldIntersection(parent.producedFields(), child.dependentFields())) {
                        promotableBins.push(child);
                    }
                    else {
                        remainingBins.push(child);
                    }
                }
            }
            if (promotableBins.length > 0) {
                const promotedBin = promotableBins.pop();
                for (const bin of promotableBins) {
                    promotedBin.merge(bin, this.model.renameSignal.bind(this.model));
                }
                this.setMutated();
                if (parent instanceof BinNode) {
                    parent.merge(promotedBin, this.model.renameSignal.bind(this.model));
                }
                else {
                    promotedBin.swapWithParent();
                }
            }
            if (remainingBins.length > 1) {
                const remainingBin = remainingBins.pop();
                for (const bin of remainingBins) {
                    remainingBin.merge(bin, this.model.renameSignal.bind(this.model));
                }
                this.setMutated();
            }
            this.setContinue();
            return this.flags;
        }
    }
    /**
     * This optimizer takes output nodes that are at a fork and moves them before the fork.
     *
     * The algorithm iterates over the children and tries to find the last output node in a cahin of output nodes.
     * It then moves all output nodes before that main output node. All other children (and the children of the output nodes)
     * are inserted after the main output node.
     */
    class MergeOutputs extends BottomUpOptimizer {
        run(node) {
            const parent = node.parent;
            const children = [...parent.children];
            const hasOutputChild = some(children, child => child instanceof OutputNode);
            if (!hasOutputChild || parent.numChildren() <= 1) {
                this.setContinue();
                return this.flags;
            }
            const otherChildren = [];
            // The output node we will connect all other nodes to
            // output nodes will be added before, other nodes after
            let mainOutput;
            for (const child of children) {
                if (child instanceof OutputNode) {
                    let lastOutput = child;
                    while (lastOutput.numChildren() === 1) {
                        const theChild = lastOutput.children[0];
                        if (theChild instanceof OutputNode) {
                            lastOutput = theChild;
                        }
                        else {
                            break;
                        }
                    }
                    otherChildren.push(...lastOutput.children);
                    if (mainOutput) {
                        // Move the output nodes before the mainOutput. We do this by setting
                        // the parent of the first not to the parent of the main output and
                        // the main output's parent to the last output.
                        // note: the child is the first output
                        parent.removeChild(child);
                        child.parent = mainOutput.parent;
                        mainOutput.parent.removeChild(mainOutput);
                        mainOutput.parent = lastOutput;
                        this.setMutated();
                    }
                    else {
                        mainOutput = lastOutput;
                    }
                }
                else {
                    otherChildren.push(child);
                }
            }
            if (otherChildren.length) {
                this.setMutated();
                for (const child of otherChildren) {
                    child.parent.removeChild(child);
                    child.parent = mainOutput;
                }
            }
            this.setContinue();
            return this.flags;
        }
    }

    const FACET_SCALE_PREFIX = 'scale_';
    const MAX_OPTIMIZATION_RUNS = 5;
    /**
     * Return all leaf nodes.
     */
    function getLeaves(roots) {
        const leaves = [];
        function append(node) {
            if (node.numChildren() === 0) {
                leaves.push(node);
            }
            else {
                node.children.forEach(append);
            }
        }
        roots.forEach(append);
        return leaves;
    }
    function isTrue(x) {
        return x;
    }
    /**
     * Run the specified optimizer on the provided nodes.
     *
     * @param optimizer The optimizer instance to run.
     * @param nodes A set of nodes to optimize.
     * @param flag Flag that will be or'ed with return valued from optimization calls to the nodes.
     */
    function runOptimizer(optimizer, nodes) {
        const flags = nodes.map(node => {
            if (optimizer instanceof BottomUpOptimizer) {
                const runFlags = optimizer.optimizeNextFromLeaves(node);
                optimizer.reset();
                return runFlags;
            }
            else {
                return optimizer.run(node);
            }
        });
        return flags.some(isTrue);
    }
    function optimizationDataflowHelper(dataComponent, model) {
        let roots = dataComponent.sources;
        const mutatedFlags = new Set();
        mutatedFlags.add(runOptimizer(new RemoveUnnecessaryOutputNodes(), roots));
        mutatedFlags.add(runOptimizer(new RemoveUnnecessaryIdentifierNodes(model), roots));
        // remove source nodes that don't have any children because they also don't have output nodes
        roots = roots.filter(r => r.numChildren() > 0);
        mutatedFlags.add(runOptimizer(new RemoveUnusedSubtrees(), getLeaves(roots)));
        roots = roots.filter(r => r.numChildren() > 0);
        mutatedFlags.add(runOptimizer(new MoveParseUp(), getLeaves(roots)));
        mutatedFlags.add(runOptimizer(new MergeBins(model), getLeaves(roots)));
        mutatedFlags.add(runOptimizer(new RemoveDuplicateTimeUnits(), getLeaves(roots)));
        mutatedFlags.add(runOptimizer(new MergeParse(), getLeaves(roots)));
        mutatedFlags.add(runOptimizer(new MergeAggregates(), getLeaves(roots)));
        mutatedFlags.add(runOptimizer(new MergeTimeUnits(), getLeaves(roots)));
        mutatedFlags.add(runOptimizer(new MergeIdenticalNodes(), roots));
        mutatedFlags.add(runOptimizer(new MergeOutputs(), getLeaves(roots)));
        dataComponent.sources = roots;
        return mutatedFlags.has(true);
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
            if (!optimizationDataflowHelper(data, model)) {
                break;
            }
            firstPassCounter++;
        }
        // move facets down and make a copy of the subtree so that we can have scales at the top level
        data.sources.map(moveFacetDown);
        for (let i = 0; i < MAX_OPTIMIZATION_RUNS; i++) {
            if (!optimizationDataflowHelper(data, model)) {
                break;
            }
            secondPassCounter++;
        }
        // check after optimizations
        checkLinks(data.sources);
        if (Math.max(firstPassCounter, secondPassCounter) === MAX_OPTIMIZATION_RUNS) {
            warn(`Maximum optimization runs(${MAX_OPTIMIZATION_RUNS}) reached.`);
        }
    }

    /**
     * A class that behaves like a SignalRef but lazily generates the signal.
     * The provided generator function should use `Model.getSignalName` to use the correct signal name.
     */
    class SignalRefWrapper {
        constructor(exprGenerator) {
            Object.defineProperty(this, 'signal', {
                enumerable: true,
                get: exprGenerator
            });
        }
        static fromName(rename, signalName) {
            return new SignalRefWrapper(() => rename(signalName));
        }
    }

    function parseScaleDomain(model) {
        if (isUnitModel(model)) {
            parseUnitScaleDomain(model);
        }
        else {
            parseNonUnitScaleDomain(model);
        }
    }
    function parseUnitScaleDomain(model) {
        const localScaleComponents = model.component.scales;
        keys(localScaleComponents).forEach((channel) => {
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
        });
    }
    function parseNonUnitScaleDomain(model) {
        for (const child of model.children) {
            parseScaleDomain(child);
        }
        const localScaleComponents = model.component.scales;
        keys(localScaleComponents).forEach((channel) => {
            let domains;
            let selectionExtent = null;
            for (const child of model.children) {
                const childComponent = child.component.scales[channel];
                if (childComponent) {
                    if (domains === undefined) {
                        domains = childComponent.getWithExplicit('domains');
                    }
                    else {
                        domains = mergeValuesWithExplicit(domains, childComponent.getWithExplicit('domains'), 'domains', 'scale', domainsTieBreaker);
                    }
                    const se = childComponent.get('selectionExtent');
                    if (selectionExtent && se && selectionExtent.selection !== se.selection) {
                        warn('The same selection must be used to override scale domains in a layered view.');
                    }
                    selectionExtent = se;
                }
            }
            localScaleComponents[channel].setWithExplicit('domains', domains);
            if (selectionExtent) {
                localScaleComponents[channel].set('selectionExtent', selectionExtent, true);
            }
        });
    }
    /**
     * Remove unaggregated domain if it is not applicable
     * Add unaggregated domain if domain is not specified and config.scale.useUnaggregatedDomain is true.
     */
    function normalizeUnaggregatedDomain(domain, fieldDef, scaleType, scaleConfig) {
        if (domain === 'unaggregated') {
            const { valid, reason } = canUseUnaggregatedDomain(fieldDef, scaleType);
            if (!valid) {
                warn(reason);
                return undefined;
            }
        }
        else if (domain === undefined && scaleConfig.useUnaggregatedDomain) {
            // Apply config if domain is not specified.
            const { valid } = canUseUnaggregatedDomain(fieldDef, scaleType);
            if (valid) {
                return 'unaggregated';
            }
        }
        return domain;
    }
    function parseDomainForChannel(model, channel) {
        const scaleType = model.getScaleComponent(channel).get('type');
        const domain = normalizeUnaggregatedDomain(model.scaleDomain(channel), model.fieldDef(channel), scaleType, model.config.scale);
        if (domain !== model.scaleDomain(channel)) {
            model.specifiedScales[channel] = Object.assign(Object.assign({}, model.specifiedScales[channel]), { domain });
        }
        // If channel is either X or Y then union them with X2 & Y2 if they exist
        if (channel === 'x' && model.channelHasField('x2')) {
            if (model.channelHasField('x')) {
                return mergeValuesWithExplicit(parseSingleChannelDomain(scaleType, domain, model, 'x'), parseSingleChannelDomain(scaleType, domain, model, 'x2'), 'domain', 'scale', domainsTieBreaker);
            }
            else {
                return parseSingleChannelDomain(scaleType, domain, model, 'x2');
            }
        }
        else if (channel === 'y' && model.channelHasField('y2')) {
            if (model.channelHasField('y')) {
                return mergeValuesWithExplicit(parseSingleChannelDomain(scaleType, domain, model, 'y'), parseSingleChannelDomain(scaleType, domain, model, 'y2'), 'domain', 'scale', domainsTieBreaker);
            }
            else {
                return parseSingleChannelDomain(scaleType, domain, model, 'y2');
            }
        }
        return parseSingleChannelDomain(scaleType, domain, model, channel);
    }
    function mapDomainToDataSignal(domain, type, timeUnit) {
        return domain.map(v => {
            const data = valueExpr(v, { timeUnit, type });
            return { signal: `{data: ${data}}` };
        });
    }
    function convertDomainIfItIsDateTime(domain, fieldDef) {
        var _a;
        // explicit value
        const { type } = fieldDef;
        const timeUnit = (_a = normalizeTimeUnit(fieldDef.timeUnit)) === null || _a === void 0 ? void 0 : _a.unit;
        if (type === 'temporal' || timeUnit) {
            return mapDomainToDataSignal(domain, type, timeUnit);
        }
        return [domain]; // Date time won't make sense
    }
    function parseSingleChannelDomain(scaleType, domain, model, channel) {
        const fieldDef = model.fieldDef(channel);
        if (isDomainUnionWith(domain)) {
            const defaultDomain = parseSingleChannelDomain(scaleType, undefined, model, channel);
            const unionWith = convertDomainIfItIsDateTime(domain.unionWith, fieldDef);
            return makeExplicit([...defaultDomain.value, ...unionWith]);
        }
        else if (isSignalRef(domain)) {
            return makeExplicit([domain]);
        }
        else if (domain && domain !== 'unaggregated' && !isSelectionDomain(domain)) {
            return makeExplicit(convertDomainIfItIsDateTime(domain, fieldDef));
        }
        const stack = model.stack;
        if (stack && channel === stack.fieldChannel) {
            if (stack.offset === 'normalize') {
                return makeImplicit([[0, 1]]);
            }
            const data = model.requestDataName(MAIN);
            return makeImplicit([
                {
                    data,
                    field: model.vgField(channel, { suffix: 'start' })
                },
                {
                    data,
                    field: model.vgField(channel, { suffix: 'end' })
                }
            ]);
        }
        const sort = isScaleChannel(channel)
            ? domainSort(model, channel, scaleType)
            : undefined;
        if (domain === 'unaggregated') {
            const data = model.requestDataName(MAIN);
            const { field } = fieldDef;
            return makeImplicit([
                {
                    data,
                    field: vgField({ field, aggregate: 'min' })
                },
                {
                    data,
                    field: vgField({ field, aggregate: 'max' })
                }
            ]);
        }
        else if (isBinning(fieldDef.bin)) {
            if (hasDiscreteDomain(scaleType)) {
                if (scaleType === 'bin-ordinal') {
                    // we can omit the domain as it is inferred from the `bins` property
                    return makeImplicit([]);
                }
                // ordinal bin scale takes domain from bin_range, ordered by bin start
                // This is useful for both axis-based scale (x/y) and legend-based scale (other channels).
                return makeImplicit([
                    {
                        // If sort by aggregation of a specified sort field, we need to use RAW table,
                        // so we can aggregate values for the scale independently from the main aggregation.
                        data: isBoolean$1(sort) ? model.requestDataName(MAIN) : model.requestDataName(RAW),
                        // Use range if we added it and the scale does not support computing a range as a signal.
                        field: model.vgField(channel, binRequiresRange(fieldDef, channel) ? { binSuffix: 'range' } : {}),
                        // we have to use a sort object if sort = true to make the sort correct by bin start
                        sort: sort === true || !isObject(sort)
                            ? {
                                field: model.vgField(channel, {}),
                                op: 'min' // min or max doesn't matter since we sort by the start of the bin range
                            }
                            : sort
                    }
                ]);
            }
            else {
                // continuous scales
                const { bin } = fieldDef;
                if (isBinning(bin)) {
                    const binSignal = getBinSignalName(model, fieldDef.field, bin);
                    return makeImplicit([
                        new SignalRefWrapper(() => {
                            const signal = model.getSignalName(binSignal);
                            return `[${signal}.start, ${signal}.stop]`;
                        })
                    ]);
                }
                else {
                    return makeImplicit([
                        {
                            data: model.requestDataName(MAIN),
                            field: model.vgField(channel, {})
                        }
                    ]);
                }
            }
        }
        else if (fieldDef.timeUnit &&
            contains(['time', 'utc'], scaleType) &&
            hasBand(channel, fieldDef, isUnitModel(model) ? model.encoding[getSecondaryRangeChannel(channel)] : undefined, model.markDef, model.config)) {
            const data = model.requestDataName(MAIN);
            return makeImplicit([
                {
                    data,
                    field: model.vgField(channel)
                },
                {
                    data,
                    field: model.vgField(channel, { suffix: 'end' })
                }
            ]);
        }
        else if (sort) {
            return makeImplicit([
                {
                    // If sort by aggregation of a specified sort field, we need to use RAW table,
                    // so we can aggregate values for the scale independently from the main aggregation.
                    data: isBoolean$1(sort) ? model.requestDataName(MAIN) : model.requestDataName(RAW),
                    field: model.vgField(channel),
                    sort: sort
                }
            ]);
        }
        else {
            return makeImplicit([
                {
                    data: model.requestDataName(MAIN),
                    field: model.vgField(channel)
                }
            ]);
        }
    }
    function normalizeSortField(sort, isStacked) {
        const { op, field, order } = sort;
        return Object.assign(Object.assign({ 
            // Apply default op
            op: (op !== null && op !== void 0 ? op : (isStacked ? 'sum' : DEFAULT_SORT_OP)) }, (field ? { field: replacePathInField(field) } : {})), (order ? { order } : {}));
    }
    function parseSelectionDomain(model, channel) {
        const scale = model.component.scales[channel];
        const spec = model.specifiedScales[channel].domain;
        const bin = model.fieldDef(channel).bin;
        const domain = isSelectionDomain(spec) && spec;
        const extent = isBinParams(bin) && isSelectionExtent(bin.extent) && bin.extent;
        if (domain || extent) {
            // As scale parsing occurs before selection parsing, we cannot set
            // domainRaw directly. So instead, we store the selectionExtent on
            // the scale component, and then add domainRaw during scale assembly.
            scale.set('selectionExtent', (domain !== null && domain !== void 0 ? domain : extent), true);
        }
    }
    function domainSort(model, channel, scaleType) {
        if (!hasDiscreteDomain(scaleType)) {
            return undefined;
        }
        // save to cast as the only exception is the geojson type for shape, which would not generate a scale
        const fieldDef = model.fieldDef(channel);
        const sort = fieldDef.sort;
        // if the sort is specified with array, use the derived sort index field
        if (isSortArray(sort)) {
            return {
                op: 'min',
                field: sortArrayIndexField(fieldDef, channel),
                order: 'ascending'
            };
        }
        const isStacked = model.stack !== null;
        // Sorted based on an aggregate calculation over a specified sort field (only for ordinal scale)
        if (isSortField(sort)) {
            return normalizeSortField(sort, isStacked);
        }
        else if (isSortByEncoding(sort)) {
            const { encoding, order } = sort;
            const fieldDefToSortBy = model.fieldDef(encoding);
            const { aggregate, field } = fieldDefToSortBy;
            if (isArgminDef(aggregate) || isArgmaxDef(aggregate)) {
                return normalizeSortField({
                    field: vgField(fieldDefToSortBy),
                    order
                }, isStacked);
            }
            else if (isAggregateOp(aggregate) || !aggregate) {
                return normalizeSortField({
                    op: aggregate,
                    field,
                    order
                }, isStacked);
            }
        }
        else if (sort === 'descending') {
            return {
                op: 'min',
                field: model.vgField(channel),
                order: 'descending'
            };
        }
        else if (contains(['ascending', undefined /* default =ascending*/], sort)) {
            return true;
        }
        // sort == null
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
        const { aggregate, type } = fieldDef;
        if (!aggregate) {
            return {
                valid: false,
                reason: message.unaggregateDomainHasNoEffectForRawField(fieldDef)
            };
        }
        if (isString(aggregate) && !SHARED_DOMAIN_OP_INDEX[aggregate]) {
            return {
                valid: false,
                reason: message.unaggregateDomainWithNonSharedDomainOp(aggregate)
            };
        }
        if (type === 'quantitative') {
            if (scaleType === 'log') {
                return {
                    valid: false,
                    reason: message.unaggregatedDomainWithLogScale(fieldDef)
                };
            }
        }
        return { valid: true };
    }
    /**
     * Tie breaker for mergeValuesWithExplicit for domains. We concat the specified values.
     */
    function domainsTieBreaker(v1, v2, property, propertyOf) {
        if (v1.explicit && v2.explicit) {
            warn(message.mergeConflictingDomainProperty(property, propertyOf, v1.value, v2.value));
        }
        // If equal score, concat the domains so that we union them later.
        return { explicit: v1.explicit, value: [...v1.value, ...v2.value] };
    }
    /**
     * Converts an array of domains to a single Vega scale domain.
     */
    function mergeDomains(domains) {
        const uniqueDomains = unique(domains.map(domain => {
            // ignore sort property when computing the unique domains
            if (isDataRefDomain(domain)) {
                const domainWithoutSort = __rest(domain, ["sort"]);
                return domainWithoutSort;
            }
            return domain;
        }), hash);
        const sorts = unique(domains
            .map(d => {
            if (isDataRefDomain(d)) {
                const s = d.sort;
                if (s !== undefined && !isBoolean$1(s)) {
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
        })
            .filter(s => s !== undefined), hash);
        if (uniqueDomains.length === 0) {
            return undefined;
        }
        else if (uniqueDomains.length === 1) {
            const domain = domains[0];
            if (isDataRefDomain(domain) && sorts.length > 0) {
                let sort = sorts[0];
                if (sorts.length > 1) {
                    warn(message.MORE_THAN_ONE_SORT);
                    sort = true;
                }
                return Object.assign(Object.assign({}, domain), { sort });
            }
            return domain;
        }
        // only keep sort properties that work with unioned domains
        const unionDomainSorts = unique(sorts.map(s => {
            if (isBoolean$1(s) || !('op' in s) || s.op in MULTIDOMAIN_SORT_OP_INDEX) {
                return s;
            }
            warn(message.domainSortDropped(s));
            return true;
        }), hash);
        let sort;
        if (unionDomainSorts.length === 1) {
            sort = unionDomainSorts[0];
        }
        else if (unionDomainSorts.length > 1) {
            warn(message.MORE_THAN_ONE_SORT);
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
            const domain = Object.assign({ data: allData[0], fields: uniqueDomains.map(d => d.field) }, (sort ? { sort } : {}));
            return domain;
        }
        return Object.assign({ fields: uniqueDomains }, (sort ? { sort } : {}));
    }
    /**
     * Return a field if a scale single field.
     * Return `undefined` otherwise.
     *
     */
    function getFieldFromDomain(domain) {
        if (isDataRefDomain(domain) && isString(domain.field)) {
            return domain.field;
        }
        else if (isDataRefUnionedDomain(domain)) {
            let field;
            for (const nonUnionDomain of domain.fields) {
                if (isDataRefDomain(nonUnionDomain) && isString(nonUnionDomain.field)) {
                    if (!field) {
                        field = nonUnionDomain.field;
                    }
                    else if (field !== nonUnionDomain.field) {
                        warn('Detected faceted independent scales that union domain of multiple fields from different data sources. We will use the first field. The result view size may be incorrect.');
                        return field;
                    }
                }
            }
            warn('Detected faceted independent scales that union domain of identical fields from different source detected. We will assume that this is the same field from a different fork of the same data source. However, if this is not case, the result view size maybe incorrect.');
            return field;
        }
        else if (isFieldRefUnionDomain(domain)) {
            warn('Detected faceted independent scales that union domain of multiple fields from the same data source. We will use the first field. The result view size may be incorrect.');
            const field = domain.fields[0];
            return isString(field) ? field : undefined;
        }
        return undefined;
    }
    function assembleDomain(model, channel) {
        const scaleComponent = model.component.scales[channel];
        const domains = scaleComponent.get('domains').map((domain) => {
            // Correct references to data as the original domain's data was determined
            // in parseScale, which happens before parseData. Thus the original data
            // reference can be incorrect.
            if (isDataRefDomain(domain)) {
                domain.data = model.lookupDataSource(domain.data);
            }
            return domain;
        });
        // domains is an array that has to be merged into a single vega domain
        return mergeDomains(domains);
    }

    function assembleScales(model) {
        if (isLayerModel(model) || isConcatModel(model) || isRepeatModel(model)) {
            // For concat / layer / repeat, include scales of children too
            return model.children.reduce((scales, child) => {
                return scales.concat(assembleScales(child));
            }, assembleScalesForModel(model));
        }
        else {
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
            const { name, type, selectionExtent, domains: _d, range: _r, reverse } = scale, otherScaleProps = __rest(scale, ["name", "type", "selectionExtent", "domains", "range", "reverse"]);
            const range = assembleScaleRange(scale.range, name, channel);
            let domainRaw;
            if (selectionExtent) {
                domainRaw = assembleSelectionScaleDomain(model, selectionExtent);
            }
            const domain = assembleDomain(model, channel);
            scales.push(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ name,
                type }, (domain ? { domain } : {})), (domainRaw ? { domainRaw } : {})), { range }), (reverse !== undefined ? { reverse: reverse } : {})), otherScaleProps));
            return scales;
        }, []);
    }
    function assembleScaleRange(scaleRange, scaleName, channel) {
        // add signals to x/y range
        if (channel === 'x' || channel === 'y') {
            if (isVgRangeStep(scaleRange)) {
                // For width/height step, use a signal created in layout assemble instead of a constant step.
                return {
                    step: { signal: scaleName + '_step' }
                };
            }
        }
        return scaleRange;
    }

    class ScaleComponent extends Split {
        constructor(name, typeWithExplicit) {
            super({}, // no initial explicit property
            { name } // name as initial implicit property
            );
            this.merged = false;
            this.setWithExplicit('type', typeWithExplicit);
        }
        /**
         * Whether the scale definitely includes zero in the domain
         */
        domainDefinitelyIncludesZero() {
            if (this.get('zero') !== false) {
                return true;
            }
            return some(this.get('domains'), d => isArray(d) && d.length === 2 && d[0] <= 0 && d[1] >= 0);
        }
    }

    const RANGE_PROPERTIES = ['range', 'scheme'];
    function getSizeType$1(channel) {
        return channel === 'x' ? 'width' : channel === 'y' ? 'height' : undefined;
    }
    function parseUnitScaleRange(model) {
        const localScaleComponents = model.component.scales;
        // use SCALE_CHANNELS instead of scales[channel] to ensure that x, y come first!
        SCALE_CHANNELS.forEach((channel) => {
            const localScaleCmpt = localScaleComponents[channel];
            if (!localScaleCmpt) {
                return;
            }
            const rangeWithExplicit = parseRangeForChannel(channel, model);
            localScaleCmpt.setWithExplicit('range', rangeWithExplicit);
        });
    }
    function getBinStepSignal(model, channel) {
        const fieldDef = model.fieldDef(channel);
        if (fieldDef && fieldDef.bin && isBinning(fieldDef.bin)) {
            const binSignal = getBinSignalName(model, fieldDef.field, fieldDef.bin);
            // TODO: extract this to be range step signal
            const sizeType = getSizeType$1(channel);
            const sizeSignal = model.getName(sizeType);
            return new SignalRefWrapper(() => {
                const updatedName = model.getSignalName(binSignal);
                const binCount = `(${updatedName}.stop - ${updatedName}.start) / ${updatedName}.step`;
                return `${model.getSignalName(sizeSignal)} / (${binCount})`;
            });
        }
        return undefined;
    }
    /**
     * Return mixins that includes one of the Vega range types (explicit range, range.step, range.scheme).
     */
    function parseRangeForChannel(channel, model) {
        const specifiedScale = model.specifiedScales[channel];
        const { size } = model;
        const mergedScaleCmpt = model.getScaleComponent(channel);
        const scaleType = mergedScaleCmpt.get('type');
        // Check if any of the range properties is specified.
        // If so, check if it is compatible and make sure that we only output one of the properties
        for (const property of RANGE_PROPERTIES) {
            if (specifiedScale[property] !== undefined) {
                const supportedByScaleType = scaleTypeSupportProperty(scaleType, property);
                const channelIncompatability = channelScalePropertyIncompatability(channel, property);
                if (!supportedByScaleType) {
                    warn(message.scalePropertyNotWorkWithScaleType(scaleType, property, channel));
                }
                else if (channelIncompatability) {
                    // channel
                    warn(channelIncompatability);
                }
                else {
                    switch (property) {
                        case 'range':
                            return makeExplicit(specifiedScale[property]);
                        case 'scheme':
                            return makeExplicit(parseScheme(specifiedScale[property]));
                    }
                }
            }
        }
        if (channel === X || channel === Y) {
            const sizeChannel = channel === X ? 'width' : 'height';
            const sizeValue = size[sizeChannel];
            if (isStep(sizeValue)) {
                if (hasDiscreteDomain(scaleType)) {
                    return makeExplicit({ step: sizeValue.step });
                }
                else {
                    warn(message.stepDropped(sizeChannel));
                }
            }
        }
        return makeImplicit(defaultRange(channel, model));
    }
    function parseScheme(scheme) {
        if (isExtendedScheme(scheme)) {
            return Object.assign({ scheme: scheme.name }, omit(scheme, ['name']));
        }
        return { scheme: scheme };
    }
    function defaultRange(channel, model) {
        const { size, config, mark } = model;
        const getSignalName = model.getSignalName.bind(model);
        const { type } = model.fieldDef(channel);
        const mergedScaleCmpt = model.getScaleComponent(channel);
        const scaleType = mergedScaleCmpt.get('type');
        const { domain, domainMid } = model.specifiedScales[channel];
        switch (channel) {
            case X:
            case Y: {
                // If there is no explicit width/height for discrete x/y scales
                if (contains(['point', 'band'], scaleType)) {
                    if (channel === X && !size.width) {
                        const w = getViewConfigDiscreteSize(config.view, 'width');
                        if (isStep(w)) {
                            return w;
                        }
                    }
                    else if (channel === Y && !size.height) {
                        const h = getViewConfigDiscreteSize(config.view, 'height');
                        if (isStep(h)) {
                            return h;
                        }
                    }
                }
                // If step is null, use zero to width or height.
                // Note that these range signals are temporary
                // as they can be merged and renamed.
                // (We do not have the right size signal here since parseLayoutSize() happens after parseScale().)
                // We will later replace these temporary names with
                // the final name in assembleScaleRange()
                const sizeType = getSizeType$1(channel);
                const sizeSignal = model.getName(sizeType);
                if (channel === Y && hasContinuousDomain(scaleType)) {
                    // For y continuous scale, we have to start from the height as the bottom part has the max value.
                    return [SignalRefWrapper.fromName(getSignalName, sizeSignal), 0];
                }
                else {
                    return [0, SignalRefWrapper.fromName(getSignalName, sizeSignal)];
                }
            }
            case SIZE: {
                // TODO: support custom rangeMin, rangeMax
                const zero = model.component.scales[channel].get('zero');
                const rangeMin = sizeRangeMin(mark, zero, config);
                const rangeMax = sizeRangeMax(mark, size, model, config);
                if (isContinuousToDiscrete(scaleType)) {
                    return interpolateRange(rangeMin, rangeMax, defaultContinuousToDiscreteCount(scaleType, config, domain, channel));
                }
                else {
                    return [rangeMin, rangeMax];
                }
            }
            case STROKEWIDTH:
                // TODO: support custom rangeMin, rangeMax
                return [config.scale.minStrokeWidth, config.scale.maxStrokeWidth];
            case STROKEDASH:
                return [
                    // TODO: add this to Vega's config.range?
                    [1, 0],
                    [4, 2],
                    [2, 1],
                    [1, 1],
                    [1, 2, 4, 2]
                ];
            case SHAPE:
                return 'symbol';
            case COLOR:
            case FILL:
            case STROKE:
                if (scaleType === 'ordinal') {
                    // Only nominal data uses ordinal scale by default
                    return type === 'nominal' ? 'category' : 'ordinal';
                }
                else {
                    if (domainMid !== undefined) {
                        return 'diverging';
                    }
                    else {
                        return mark === 'rect' || mark === 'geoshape' ? 'heatmap' : 'ramp';
                    }
                }
            case OPACITY:
            case FILLOPACITY:
            case STROKEOPACITY:
                // TODO: support custom rangeMin, rangeMax
                return [config.scale.minOpacity, config.scale.maxOpacity];
        }
        /* istanbul ignore next: should never reach here */
        throw new Error(`Scale range undefined for channel ${channel}`);
    }
    function defaultContinuousToDiscreteCount(scaleType, config, domain, channel) {
        switch (scaleType) {
            case 'quantile':
                return config.scale.quantileCount;
            case 'quantize':
                return config.scale.quantizeCount;
            case 'threshold':
                if (domain !== undefined && isArray(domain)) {
                    return domain.length + 1;
                }
                else {
                    warn(message.domainRequiredForThresholdScale(channel));
                    // default threshold boundaries for threshold scale since domain has cardinality of 2
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
            const rMax = isSignalRef(rangeMax) ? rangeMax.signal : rangeMax;
            const rMin = isSignalRef(rangeMin) ? rangeMin.signal : rangeMin;
            const step = `(${rMax} - ${rMin}) / (${cardinality} - 1)`;
            return `sequence(${rMin}, ${rMax} + ${step}, ${step})`;
        };
        if (isSignalRef(rangeMax)) {
            return new SignalRefWrapper(f);
        }
        else {
            return { signal: f() };
        }
    }
    function sizeRangeMin(mark, zero, config) {
        if (zero) {
            if (isSignalRef(zero)) {
                return { signal: `${zero.signal} ? 0 : ${sizeRangeMin(mark, false, config)}` };
            }
            else {
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
        throw new Error(message.incompatibleChannel('size', mark));
    }
    const MAX_SIZE_RANGE_STEP_RATIO = 0.95;
    function sizeRangeMax(mark, size, model, config) {
        const xyStepSignals = {
            x: getBinStepSignal(model, 'x'),
            y: getBinStepSignal(model, 'y')
        };
        switch (mark) {
            case 'bar':
            case 'tick': {
                if (config.scale.maxBandSize !== undefined) {
                    return config.scale.maxBandSize;
                }
                const min = minXYStep(size, xyStepSignals, config.view);
                if (isNumber(min)) {
                    return min - 1;
                }
                else {
                    return new SignalRefWrapper(() => `${min.signal} - 1`);
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
            case 'circle': {
                if (config.scale.maxSize) {
                    return config.scale.maxSize;
                }
                const pointStep = minXYStep(size, xyStepSignals, config.view);
                if (isNumber(pointStep)) {
                    return Math.pow(MAX_SIZE_RANGE_STEP_RATIO * pointStep, 2);
                }
                else {
                    return new SignalRefWrapper(() => `pow(${MAX_SIZE_RANGE_STEP_RATIO} * ${pointStep.signal}, 2)`);
                }
            }
        }
        /* istanbul ignore next: should never reach here */
        // sizeRangeMax not implemented for the mark
        throw new Error(message.incompatibleChannel('size', mark));
    }
    /**
     * @returns {number} Range step of x or y or minimum between the two if both are ordinal scale.
     */
    function minXYStep(size, xyStepSignals, viewConfig) {
        const widthStep = isStep(size.width) ? size.width.step : getViewConfigDiscreteStep(viewConfig, 'width');
        const heightStep = isStep(size.height) ? size.height.step : getViewConfigDiscreteStep(viewConfig, 'height');
        if (xyStepSignals.x || xyStepSignals.y) {
            return new SignalRefWrapper(() => {
                const exprs = [
                    xyStepSignals.x ? xyStepSignals.x.signal : widthStep,
                    xyStepSignals.y ? xyStepSignals.y.signal : heightStep
                ];
                return `min(${exprs.join(', ')})`;
            });
        }
        return Math.min(widthStep, heightStep);
    }

    function parseScaleProperty(model, property) {
        if (isUnitModel(model)) {
            parseUnitScaleProperty(model, property);
        }
        else {
            parseNonUnitScaleProperty(model, property);
        }
    }
    function parseUnitScaleProperty(model, property) {
        const localScaleComponents = model.component.scales;
        keys(localScaleComponents).forEach((channel) => {
            const specifiedScale = model.specifiedScales[channel];
            const localScaleCmpt = localScaleComponents[channel];
            const mergedScaleCmpt = model.getScaleComponent(channel);
            const fieldDef = model.fieldDef(channel);
            const config = model.config;
            const specifiedValue = specifiedScale[property];
            const sType = mergedScaleCmpt.get('type');
            const supportedByScaleType = scaleTypeSupportProperty(sType, property);
            const channelIncompatability = channelScalePropertyIncompatability(channel, property);
            if (specifiedValue !== undefined) {
                // If there is a specified value, check if it is compatible with scale type and channel
                if (!supportedByScaleType) {
                    warn(message.scalePropertyNotWorkWithScaleType(sType, property, channel));
                }
                else if (channelIncompatability) {
                    // channel
                    warn(channelIncompatability);
                }
            }
            if (supportedByScaleType && channelIncompatability === undefined) {
                if (specifiedValue !== undefined) {
                    // copyKeyFromObject ensures type safety
                    localScaleCmpt.copyKeyFromObject(property, specifiedScale);
                }
                else {
                    const value = getDefaultValue(property, model, channel, fieldDef, mergedScaleCmpt.get('type'), mergedScaleCmpt.get('padding'), mergedScaleCmpt.get('paddingInner'), specifiedScale.domain, model.markDef, config);
                    if (value !== undefined) {
                        localScaleCmpt.set(property, value, false);
                    }
                }
            }
        });
    }
    // Note: This method is used in Voyager.
    function getDefaultValue(property, model, channel, fieldDef, scaleType, scalePadding, scalePaddingInner, specifiedDomain, markDef, config) {
        const scaleConfig = config.scale;
        const { type, sort } = fieldDef;
        // If we have default rule-base, determine default value first
        switch (property) {
            case 'bins':
                return bins(model, fieldDef);
            case 'interpolate':
                return interpolate$2(channel, type);
            case 'nice':
                return nice$1(scaleType, channel, fieldDef);
            case 'padding':
                return padding(channel, scaleType, scaleConfig, fieldDef, markDef, config.bar);
            case 'paddingInner':
                return paddingInner(scalePadding, channel, markDef.type, scaleConfig);
            case 'paddingOuter':
                return paddingOuter(scalePadding, channel, scaleType, markDef.type, scalePaddingInner, scaleConfig);
            case 'reverse':
                return reverse(scaleType, sort);
            case 'zero':
                return zero$2(channel, fieldDef, specifiedDomain, markDef, scaleType);
        }
        // Otherwise, use scale config
        return scaleConfig[property];
    }
    // This method is here rather than in range.ts to avoid circular dependency.
    function parseScaleRange(model) {
        if (isUnitModel(model)) {
            parseUnitScaleRange(model);
        }
        else {
            parseNonUnitScaleProperty(model, 'range');
        }
    }
    function parseNonUnitScaleProperty(model, property) {
        const localScaleComponents = model.component.scales;
        for (const child of model.children) {
            if (property === 'range') {
                parseScaleRange(child);
            }
            else {
                parseScaleProperty(child, property);
            }
        }
        keys(localScaleComponents).forEach((channel) => {
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
        });
    }
    function bins(model, fieldDef) {
        const bin = fieldDef.bin;
        if (isBinning(bin)) {
            const binSignal = getBinSignalName(model, fieldDef.field, bin);
            return new SignalRefWrapper(() => {
                return model.getSignalName(binSignal);
            });
        }
        else if (isBinned(bin) && isBinParams(bin) && bin.step !== undefined) {
            // start and stop will be determined from the scale domain
            return {
                step: bin.step
            };
        }
        return undefined;
    }
    function interpolate$2(channel, type) {
        if (contains([COLOR, FILL, STROKE], channel) && type !== 'nominal') {
            return 'hcl';
        }
        return undefined;
    }
    function nice$1(scaleType, channel, fieldDef) {
        if (fieldDef.bin || contains([ScaleType.TIME, ScaleType.UTC], scaleType)) {
            return undefined;
        }
        return contains([X, Y], channel) ? true : undefined;
    }
    function padding(channel, scaleType, scaleConfig, fieldDef, markDef, barConfig) {
        if (contains([X, Y], channel)) {
            if (isContinuousToContinuous(scaleType)) {
                if (scaleConfig.continuousPadding !== undefined) {
                    return scaleConfig.continuousPadding;
                }
                const { type, orient } = markDef;
                if (type === 'bar' && !fieldDef.bin && !fieldDef.timeUnit) {
                    if ((orient === 'vertical' && channel === 'x') || (orient === 'horizontal' && channel === 'y')) {
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
    function paddingInner(paddingValue, channel, mark, scaleConfig) {
        if (paddingValue !== undefined) {
            // If user has already manually specified "padding", no need to add default paddingInner.
            return undefined;
        }
        if (contains([X, Y], channel)) {
            // Padding is only set for X and Y by default.
            // Basically it doesn't make sense to add padding for color and size.
            // paddingOuter would only be called if it's a band scale, just return the default for bandScale.
            const { bandPaddingInner, barBandPaddingInner, rectBandPaddingInner } = scaleConfig;
            return getFirstDefined(bandPaddingInner, mark === 'bar' ? barBandPaddingInner : rectBandPaddingInner);
        }
        return undefined;
    }
    function paddingOuter(paddingValue, channel, scaleType, mark, paddingInnerValue, scaleConfig) {
        if (paddingValue !== undefined) {
            // If user has already manually specified "padding", no need to add default paddingOuter.
            return undefined;
        }
        if (contains([X, Y], channel)) {
            // Padding is only set for X and Y by default.
            // Basically it doesn't make sense to add padding for color and size.
            if (scaleType === ScaleType.BAND) {
                const { bandPaddingOuter } = scaleConfig;
                return getFirstDefined(bandPaddingOuter, 
                /* By default, paddingOuter is paddingInner / 2. The reason is that
                  size (width/height) = step * (cardinality - paddingInner + 2 * paddingOuter).
                  and we want the width/height to be integer by default.
                  Note that step (by default) and cardinality are integers.) */
                isSignalRef(paddingInnerValue) ? { signal: `${paddingInnerValue.signal}/2` } : paddingInnerValue / 2);
            }
        }
        return undefined;
    }
    function reverse(scaleType, sort) {
        if (hasContinuousDomain(scaleType) && sort === 'descending') {
            // For continuous domain scales, Vega does not support domain sort.
            // Thus, we reverse range instead if sort is descending
            return true;
        }
        return undefined;
    }
    function zero$2(channel, fieldDef, specifiedDomain, markDef, scaleType) {
        // If users explicitly provide a domain range, we should not augment zero as that will be unexpected.
        const hasCustomDomain = !!specifiedDomain && specifiedDomain !== 'unaggregated';
        if (hasCustomDomain) {
            if (hasContinuousDomain(scaleType)) {
                if (isArray(specifiedDomain)) {
                    const first = specifiedDomain[0];
                    const last = specifiedDomain[specifiedDomain.length - 1];
                    if (first <= 0 && last >= 0) {
                        // if the domain includes zero, make zero remains true
                        return true;
                    }
                }
                return false;
            }
        }
        // If there is no custom domain, return true only for the following cases:
        // 1) using quantitative field with size
        // While this can be either ratio or interval fields, our assumption is that
        // ratio are more common. However, if the scaleType is discretizing scale, we want to return
        // false so that range doesn't start at zero
        if (channel === 'size' && fieldDef.type === 'quantitative' && !isContinuousToDiscrete(scaleType)) {
            return true;
        }
        // 2) non-binned, quantitative x-scale or y-scale
        // (For binning, we should not include zero by default because binning are calculated without zero.)
        if (!fieldDef.bin && contains([X, Y], channel)) {
            const { orient, type } = markDef;
            if (contains(['bar', 'area', 'line', 'trail'], type)) {
                if ((orient === 'horizontal' && channel === 'y') || (orient === 'vertical' && channel === 'x')) {
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
        const defaultScaleType = defaultType$2(channel, fieldDef, mark);
        const { type } = specifiedScale;
        if (!isScaleChannel(channel)) {
            // There is no scale for these channels
            return null;
        }
        if (type !== undefined) {
            // Check if explicitly specified scale type is supported by the channel
            if (!channelSupportScaleType(channel, type)) {
                warn(message.scaleTypeNotWorkWithChannel(channel, type, defaultScaleType));
                return defaultScaleType;
            }
            // Check if explicitly specified scale type is supported by the data type
            if (!scaleTypeSupportDataType(type, fieldDef.type)) {
                warn(message.scaleTypeNotWorkWithFieldDef(type, defaultScaleType));
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
    function defaultType$2(channel, fieldDef, mark) {
        switch (fieldDef.type) {
            case 'nominal':
            case 'ordinal':
                if (isColorChannel(channel) || rangeType(channel) === 'discrete') {
                    if (channel === 'shape' && fieldDef.type === 'ordinal') {
                        warn(message.discreteChannelCannotEncode(channel, 'ordinal'));
                    }
                    return 'ordinal';
                }
                if (contains(['x', 'y'], channel)) {
                    if (contains(['rect', 'bar', 'image', 'rule'], mark)) {
                        // The rect/bar mark should fit into a band.
                        // For rule, using band scale to make rule align with axis ticks better https://github.com/vega/vega-lite/issues/3429
                        return 'band';
                    }
                }
                // Otherwise, use ordinal point scale so we can easily get center positions of the marks.
                return 'point';
            case 'temporal':
                if (isColorChannel(channel)) {
                    return 'time';
                }
                else if (rangeType(channel) === 'discrete') {
                    warn(message.discreteChannelCannotEncode(channel, 'temporal'));
                    // TODO: consider using quantize (equivalent to binning) once we have it
                    return 'ordinal';
                }
                else if (fieldDef.timeUnit && normalizeTimeUnit(fieldDef.timeUnit).utc) {
                    return 'utc';
                }
                return 'time';
            case 'quantitative':
                if (isColorChannel(channel)) {
                    if (isBinning(fieldDef.bin)) {
                        return 'bin-ordinal';
                    }
                    return 'linear';
                }
                else if (rangeType(channel) === 'discrete') {
                    warn(message.discreteChannelCannotEncode(channel, 'quantitative'));
                    // TODO: consider using quantize (equivalent to binning) once we have it
                    return 'ordinal';
                }
                return 'linear';
            case 'geojson':
                return undefined;
        }
        /* istanbul ignore next: should never reach this */
        throw new Error(message.invalidFieldType(fieldDef.type));
    }

    function parseScales(model, { ignoreRange } = {}) {
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
        }
        else {
            model.component.scales = parseNonUnitScaleCore(model);
        }
    }
    /**
     * Parse scales for all channels of a model.
     */
    function parseUnitScaleCore(model) {
        const { encoding, mark } = model;
        return SCALE_CHANNELS.reduce((scaleComponents, channel) => {
            let fieldDef;
            let specifiedScale;
            const channelDef = encoding[channel];
            // Don't generate scale for shape of geoshape
            if (isFieldDef(channelDef) && mark === GEOSHAPE && channel === SHAPE && channelDef.type === GEOJSON) {
                return scaleComponents;
            }
            if (isFieldDef(channelDef)) {
                fieldDef = channelDef;
                specifiedScale = channelDef.scale;
            }
            else if (hasConditionalFieldDef(channelDef)) {
                // Need to specify generic for hasConditionalFieldDef as the value type can vary across channels
                fieldDef = channelDef.condition;
                specifiedScale = channelDef.condition['scale']; // We use ['scale'] since we know that channel here has scale for sure
            }
            if (fieldDef && specifiedScale !== null && specifiedScale !== false) {
                specifiedScale = (specifiedScale !== null && specifiedScale !== void 0 ? specifiedScale : {});
                const sType = scaleType(specifiedScale, channel, fieldDef, mark);
                scaleComponents[channel] = new ScaleComponent(model.scaleName(channel + '', true), {
                    value: sType,
                    explicit: specifiedScale.type === sType
                });
            }
            return scaleComponents;
        }, {});
    }
    const scaleTypeTieBreaker = tieBreakByComparing((st1, st2) => scaleTypePrecedence(st1) - scaleTypePrecedence(st2));
    function parseNonUnitScaleCore(model) {
        const scaleComponents = (model.component.scales = {});
        const scaleTypeWithExplicitIndex = {};
        const resolve = model.component.resolve;
        // Parse each child scale and determine if a particular channel can be merged.
        for (const child of model.children) {
            parseScaleCore(child);
            // Instead of always merging right away -- check if it is compatible to merge first!
            keys(child.component.scales).forEach((channel) => {
                var _a;
                // if resolve is undefined, set default first
                resolve.scale[channel] = (_a = resolve.scale[channel], (_a !== null && _a !== void 0 ? _a : defaultScaleResolve(channel, model)));
                if (resolve.scale[channel] === 'shared') {
                    const explicitScaleType = scaleTypeWithExplicitIndex[channel];
                    const childScaleType = child.component.scales[channel].getWithExplicit('type');
                    if (explicitScaleType) {
                        if (scaleCompatible(explicitScaleType.value, childScaleType.value)) {
                            // merge scale component if type are compatible
                            scaleTypeWithExplicitIndex[channel] = mergeValuesWithExplicit(explicitScaleType, childScaleType, 'type', 'scale', scaleTypeTieBreaker);
                        }
                        else {
                            // Otherwise, update conflicting channel to be independent
                            resolve.scale[channel] = 'independent';
                            // Remove from the index so they don't get merged
                            delete scaleTypeWithExplicitIndex[channel];
                        }
                    }
                    else {
                        scaleTypeWithExplicitIndex[channel] = childScaleType;
                    }
                }
            });
        }
        // Merge each channel listed in the index
        for (const channel of keys(scaleTypeWithExplicitIndex)) {
            // Create new merged scale component
            const name = model.scaleName(channel, true);
            const typeWithExplicit = scaleTypeWithExplicitIndex[channel];
            scaleComponents[channel] = new ScaleComponent(name, typeWithExplicit);
            // rename each child and mark them as merged
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
        var _a;
        return ((_a = model) === null || _a === void 0 ? void 0 : _a.type) === 'unit';
    }
    function isFacetModel(model) {
        var _a;
        return ((_a = model) === null || _a === void 0 ? void 0 : _a.type) === 'facet';
    }
    function isRepeatModel(model) {
        var _a;
        return ((_a = model) === null || _a === void 0 ? void 0 : _a.type) === 'repeat';
    }
    function isConcatModel(model) {
        var _a;
        return ((_a = model) === null || _a === void 0 ? void 0 : _a.type) === 'concat';
    }
    function isLayerModel(model) {
        var _a;
        return ((_a = model) === null || _a === void 0 ? void 0 : _a.type) === 'layer';
    }
    class Model {
        constructor(spec, type, parent, parentGivenName, config, repeater, resolve, view) {
            var _a, _b;
            this.type = type;
            this.parent = parent;
            this.config = config;
            this.repeater = repeater;
            this.view = view;
            this.children = [];
            /**
             * Corrects the data references in marks after assemble.
             */
            this.correctDataNames = (mark) => {
                // TODO: make this correct
                // for normal data references
                if (mark.from && mark.from.data) {
                    mark.from.data = this.lookupDataSource(mark.from.data);
                }
                // for access to facet data
                if (mark.from && mark.from.facet && mark.from.facet.data) {
                    mark.from.facet.data = this.lookupDataSource(mark.from.facet.data);
                }
                return mark;
            };
            this.parent = parent;
            this.config = config;
            this.repeater = repeater;
            // If name is not provided, always use parent's givenName to avoid name conflicts.
            this.name = (_a = spec.name, (_a !== null && _a !== void 0 ? _a : parentGivenName));
            this.title = isText(spec.title) ? { text: spec.title } : spec.title;
            // Shared name maps
            this.scaleNameMap = parent ? parent.scaleNameMap : new NameMap();
            this.projectionNameMap = parent ? parent.projectionNameMap : new NameMap();
            this.signalNameMap = parent ? parent.signalNameMap : new NameMap();
            this.data = spec.data;
            this.description = spec.description;
            this.transforms = normalizeTransform((_b = spec.transform, (_b !== null && _b !== void 0 ? _b : [])));
            this.layout = isUnitSpec(spec) || isLayerSpec(spec) ? {} : extractCompositionLayout(spec, type, config);
            this.component = {
                data: {
                    sources: parent ? parent.component.data.sources : [],
                    outputNodes: parent ? parent.component.data.outputNodes : {},
                    outputNodeRefCounts: parent ? parent.component.data.outputNodeRefCounts : {},
                    // data is faceted if the spec is a facet spec or the parent has faceted data and data is undefined
                    isFaceted: isFacetSpec(spec) || (parent && parent.component.data.isFaceted && spec.data === undefined)
                },
                layoutSize: new Split(),
                layoutHeaders: { row: {}, column: {}, facet: {} },
                mark: null,
                resolve: Object.assign({ scale: {}, axis: {}, legend: {} }, (resolve ? duplicate(resolve) : {})),
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
        assembleGroupStyle() {
            var _a, _b;
            if (this.type === 'unit' || this.type === 'layer') {
                return _b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.style, (_b !== null && _b !== void 0 ? _b : 'cell');
            }
            return undefined;
        }
        assembleEncodeFromView(view) {
            // Exclude "style"
            const baseView = __rest(view, ["style"]);
            const e = {};
            for (const property in baseView) {
                if (hasOwnProperty(baseView, property)) {
                    const value = baseView[property];
                    if (value !== undefined) {
                        e[property] = { value };
                    }
                }
            }
            return e;
        }
        assembleGroupEncodeEntry(isTopLevel) {
            let encodeEntry = undefined;
            if (this.view) {
                encodeEntry = this.assembleEncodeFromView(this.view);
            }
            if (!isTopLevel) {
                // For top-level spec, we can set the global width and height signal to adjust the group size.
                // For other child specs, we have to manually set width and height in the encode entry.
                if (this.type === 'unit' || this.type === 'layer') {
                    return Object.assign({ width: this.getSizeSignalRef('width'), height: this.getSizeSignalRef('height') }, ((encodeEntry !== null && encodeEntry !== void 0 ? encodeEntry : {})));
                }
            }
            return encodeEntry;
        }
        assembleLayout() {
            if (!this.layout) {
                return undefined;
            }
            const _a = this.layout, { spacing } = _a, layout = __rest(_a, ["spacing"]);
            const { component, config } = this;
            const titleBand = assembleLayoutTitleBand(component.layoutHeaders, config);
            return Object.assign(Object.assign(Object.assign({ padding: spacing }, this.assembleDefaultLayout()), layout), (titleBand ? { titleBand } : {}));
        }
        assembleDefaultLayout() {
            return {};
        }
        assembleHeaderMarks() {
            const { layoutHeaders } = this.component;
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
            var _a, _b, _c;
            const _d = (_a = this.title, (_a !== null && _a !== void 0 ? _a : {})), { encoding } = _d, titleNoEncoding = __rest(_d, ["encoding"]);
            const title = Object.assign(Object.assign(Object.assign({}, extractTitleConfig(this.config.title).nonMark), titleNoEncoding), (encoding ? { encode: { update: encoding } } : {}));
            if (title.text) {
                if (contains(['unit', 'layer'], this.type)) {
                    // Unit/Layer
                    if (contains(['middle', undefined], title.anchor)) {
                        title.frame = (_b = title.frame, (_b !== null && _b !== void 0 ? _b : 'group'));
                    }
                }
                else {
                    // composition with Vega layout
                    // Set title = "start" by default for composition as "middle" does not look nice
                    // https://github.com/vega/vega/issues/960#issuecomment-471360328
                    title.anchor = (_c = title.anchor, (_c !== null && _c !== void 0 ? _c : 'start'));
                }
                return keys(title).length > 0 ? title : undefined;
            }
            return undefined;
        }
        /**
         * Assemble the mark group for this model. We accept optional `signals` so that we can include concat top-level signals with the top-level model's local signals.
         */
        assembleGroup(signals = []) {
            const group = {};
            signals = signals.concat(this.assembleSignals());
            if (signals.length > 0) {
                group.signals = signals;
            }
            const layout = this.assembleLayout();
            if (layout) {
                group.layout = layout;
            }
            group.marks = [].concat(this.assembleHeaderMarks(), this.assembleMarks());
            // Only include scales if this spec is top-level or if parent is facet.
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
            return varName((this.name ? this.name + '_' : '') + text);
        }
        /**
         * Request a data source name for the given data source type and mark that data source as required.
         * This method should be called in parse, so that all used data source can be correctly instantiated in assembleData().
         * You can lookup the correct dataset name in assemble with `lookupDataSource`.
         */
        requestDataName(name) {
            var _a;
            const fullName = this.getName(name);
            // Increase ref count. This is critical because otherwise we won't create a data source.
            // We also increase the ref counts on OutputNode.getSource() calls.
            const refCounts = this.component.data.outputNodeRefCounts;
            refCounts[fullName] = (_a = refCounts[fullName], (_a !== null && _a !== void 0 ? _a : 0)) + 1;
            return fullName;
        }
        getSizeSignalRef(sizeType) {
            if (isFacetModel(this.parent)) {
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
                            const fieldRef = vgField({ aggregate: 'distinct', field }, { expr: 'datum' });
                            return {
                                signal: sizeExpr(scaleName, scaleComponent, fieldRef)
                            };
                        }
                        else {
                            warn(`Unknown field for ${channel}. Cannot calculate view size.`);
                            return null;
                        }
                    }
                }
            }
            return {
                signal: this.signalNameMap.get(this.getName(sizeType))
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
            }
            // If there is a scale for the channel, it should either
            // be in the scale component or exist in the name map
            if (
            // If there is a scale for the channel, there should be a local scale component for it
            (isChannel(originalScaleName) && isScaleChannel(originalScaleName) && this.component.scales[originalScaleName]) ||
                // in the scale name map (the scale get merged by its parent)
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
            if ((this.component.projection && !this.component.projection.merged) ||
                this.projectionNameMap.has(this.getName('projection'))) {
                return this.projectionNameMap.get(this.getName('projection'));
            }
            return undefined;
        }
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
                throw new Error(message.selectionNotFound(origName));
            }
            return sel;
        }
    }
    /** Abstract class for UnitModel and FacetModel. Both of which can contain fieldDefs as a part of its own specification. */
    class ModelWithField extends Model {
        /** Get "field" reference for Vega */
        vgField(channel, opt = {}) {
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
        constructor(parent, transform) {
            var _a, _b, _c;
            super(parent);
            this.transform = transform;
            this.transform = duplicate(transform); // duplicate to prevent side effects
            const specifiedAs = (_a = this.transform.as, (_a !== null && _a !== void 0 ? _a : [undefined, undefined]));
            this.transform.as = [(_b = specifiedAs[0], (_b !== null && _b !== void 0 ? _b : 'value')), (_c = specifiedAs[1], (_c !== null && _c !== void 0 ? _c : 'density'))];
        }
        clone() {
            return new DensityTransformNode(null, duplicate(this.transform));
        }
        dependentFields() {
            var _a;
            return new Set([this.transform.density, ...(_a = this.transform.groupby, (_a !== null && _a !== void 0 ? _a : []))]);
        }
        producedFields() {
            return new Set(this.transform.as);
        }
        hash() {
            return `DensityTransform ${hash(this.transform)}`;
        }
        assemble() {
            const _a = this.transform, { density } = _a, rest = __rest(_a, ["density"]);
            const result = Object.assign({ type: 'kde', field: density }, rest);
            return result;
        }
    }

    class FilterInvalidNode extends DataFlowNode {
        constructor(parent, filter) {
            super(parent);
            this.filter = filter;
        }
        clone() {
            return new FilterInvalidNode(null, Object.assign({}, this.filter));
        }
        static make(parent, model) {
            const { config, mark, markDef } = model;
            const invalid = getMarkPropOrConfig('invalid', markDef, config);
            if (invalid !== 'filter') {
                return null;
            }
            const filter = model.reduceFieldDef((aggregator, fieldDef, channel) => {
                const scaleComponent = isScaleChannel(channel) && model.getScaleComponent(channel);
                if (scaleComponent) {
                    const scaleType = scaleComponent.get('type');
                    // While discrete domain scales can handle invalid values, continuous scales can't.
                    // Thus, for non-path marks, we have to filter null for scales with continuous domains.
                    // (For path marks, we will use "defined" property and skip these values instead.)
                    if (hasContinuousDomain(scaleType) && !fieldDef.aggregate && !isPathMark(mark)) {
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
            return `FilterInvalid ${hash(this.filter)}`;
        }
        /**
         * Create the VgTransforms for each of the filtered fields.
         */
        assemble() {
            const filters = keys(this.filter).reduce((vegaFilters, field) => {
                const fieldDef = this.filter[field];
                const ref = vgField(fieldDef, { expr: 'datum' });
                if (fieldDef !== null) {
                    if (fieldDef.type === 'temporal') {
                        vegaFilters.push(`(isDate(${ref}) || (isValid(${ref}) && isFinite(+${ref})))`);
                    }
                    else if (fieldDef.type === 'quantitative') {
                        vegaFilters.push(`isValid(${ref})`);
                        vegaFilters.push(`isFinite(+${ref})`);
                    }
                }
                return vegaFilters;
            }, []);
            return filters.length > 0
                ? {
                    type: 'filter',
                    expr: filters.join(' && ')
                }
                : null;
        }
    }

    /**
     * A class for flatten transform nodes
     */
    class FlattenTransformNode extends DataFlowNode {
        constructor(parent, transform) {
            super(parent);
            this.transform = transform;
            this.transform = duplicate(transform); // duplicate to prevent side effects
            const { flatten, as = [] } = this.transform;
            this.transform.as = flatten.map((f, i) => { var _a; return _a = as[i], (_a !== null && _a !== void 0 ? _a : f); });
        }
        clone() {
            return new FlattenTransformNode(this.parent, duplicate(this.transform));
        }
        dependentFields() {
            return new Set(this.transform.flatten);
        }
        producedFields() {
            return new Set(this.transform.as);
        }
        hash() {
            return `FlattenTransform ${hash(this.transform)}`;
        }
        assemble() {
            const { flatten: fields, as } = this.transform;
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
        constructor(parent, transform) {
            var _a, _b, _c;
            super(parent);
            this.transform = transform;
            this.transform = duplicate(transform); // duplicate to prevent side effects
            const specifiedAs = (_a = this.transform.as, (_a !== null && _a !== void 0 ? _a : [undefined, undefined]));
            this.transform.as = [(_b = specifiedAs[0], (_b !== null && _b !== void 0 ? _b : 'key')), (_c = specifiedAs[1], (_c !== null && _c !== void 0 ? _c : 'value'))];
        }
        clone() {
            return new FoldTransformNode(null, duplicate(this.transform));
        }
        dependentFields() {
            return new Set(this.transform.fold);
        }
        producedFields() {
            return new Set(this.transform.as);
        }
        hash() {
            return `FoldTransform ${hash(this.transform)}`;
        }
        assemble() {
            const { fold, as } = this.transform;
            const result = {
                type: 'fold',
                fields: fold,
                as
            };
            return result;
        }
    }

    class GeoJSONNode extends DataFlowNode {
        constructor(parent, fields, geojson, signal) {
            super(parent);
            this.fields = fields;
            this.geojson = geojson;
            this.signal = signal;
        }
        clone() {
            return new GeoJSONNode(null, duplicate(this.fields), this.geojson, this.signal);
        }
        static parseAll(parent, model) {
            if (model.component.projection && !model.component.projection.isFit) {
                return parent;
            }
            let geoJsonCounter = 0;
            for (const coordinates of [
                [LONGITUDE, LATITUDE],
                [LONGITUDE2, LATITUDE2]
            ]) {
                const pair = coordinates.map(channel => model.channelHasField(channel)
                    ? model.fieldDef(channel).field
                    : isValueDef(model.encoding[channel])
                        ? { expr: model.encoding[channel].value + '' }
                        : undefined);
                if (pair[0] || pair[1]) {
                    parent = new GeoJSONNode(parent, pair, null, model.getName(`geojson_${geoJsonCounter++}`));
                }
            }
            if (model.channelHasField(SHAPE)) {
                const fieldDef = model.fieldDef(SHAPE);
                if (fieldDef.type === GEOJSON) {
                    parent = new GeoJSONNode(parent, null, fieldDef.field, model.getName(`geojson_${geoJsonCounter++}`));
                }
            }
            return parent;
        }
        dependentFields() {
            var _a;
            const fields = (_a = this.fields, (_a !== null && _a !== void 0 ? _a : [])).filter(isString);
            return new Set([...(this.geojson ? [this.geojson] : []), ...fields]);
        }
        producedFields() {
            return new Set();
        }
        hash() {
            return `GeoJSON ${this.geojson} ${this.signal} ${hash(this.fields)}`;
        }
        assemble() {
            return Object.assign(Object.assign(Object.assign({ type: 'geojson' }, (this.fields ? { fields: this.fields } : {})), (this.geojson ? { geojson: this.geojson } : {})), { signal: this.signal });
        }
    }

    class GeoPointNode extends DataFlowNode {
        constructor(parent, projection, fields, as) {
            super(parent);
            this.projection = projection;
            this.fields = fields;
            this.as = as;
        }
        clone() {
            return new GeoPointNode(null, this.projection, duplicate(this.fields), duplicate(this.as));
        }
        static parseAll(parent, model) {
            if (!model.projectionName()) {
                return parent;
            }
            for (const coordinates of [
                [LONGITUDE, LATITUDE],
                [LONGITUDE2, LATITUDE2]
            ]) {
                const pair = coordinates.map(channel => model.channelHasField(channel)
                    ? model.fieldDef(channel).field
                    : isValueDef(model.encoding[channel])
                        ? { expr: model.encoding[channel].value + '' }
                        : undefined);
                const suffix = coordinates[0] === LONGITUDE2 ? '2' : '';
                if (pair[0] || pair[1]) {
                    parent = new GeoPointNode(parent, model.projectionName(), pair, [
                        model.getName('x' + suffix),
                        model.getName('y' + suffix)
                    ]);
                }
            }
            return parent;
        }
        dependentFields() {
            return new Set(this.fields.filter(isString));
        }
        producedFields() {
            return new Set(this.as);
        }
        hash() {
            return `Geopoint ${this.projection} ${hash(this.fields)} ${hash(this.as)}`;
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
        constructor(parent, transform) {
            super(parent);
            this.transform = transform;
        }
        clone() {
            return new ImputeNode(null, duplicate(this.transform));
        }
        dependentFields() {
            var _a;
            return new Set([this.transform.impute, this.transform.key, ...(_a = this.transform.groupby, (_a !== null && _a !== void 0 ? _a : []))]);
        }
        producedFields() {
            return new Set([this.transform.impute]);
        }
        processSequence(keyvals) {
            const { start = 0, stop, step } = keyvals;
            const result = [start, stop, ...(step ? [step] : [])].join(',');
            return { signal: `sequence(${result})` };
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
                const { method, value, frame, keyvals } = imputedChannel.impute;
                const groupbyFields = pathGroupingFields(model.mark, encoding);
                return new ImputeNode(parent, Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ impute: imputedChannel.field, key: keyChannel.field }, (method ? { method } : {})), (value !== undefined ? { value } : {})), (frame ? { frame } : {})), (keyvals !== undefined ? { keyvals } : {})), (groupbyFields.length ? { groupby: groupbyFields } : {})));
            }
            return null;
        }
        hash() {
            return `Impute ${hash(this.transform)}`;
        }
        assemble() {
            const { impute, key, keyvals, method, groupby, value, frame = [null, null] } = this.transform;
            const imputeTransform = Object.assign(Object.assign(Object.assign(Object.assign({ type: 'impute', field: impute, key }, (keyvals ? { keyvals: isImputeSequence(keyvals) ? this.processSequence(keyvals) : keyvals } : {})), { method: 'value' }), (groupby ? { groupby } : {})), { value: !method || method === 'value' ? value : null });
            if (method && method !== 'value') {
                const deriveNewField = Object.assign({ type: 'window', as: [`imputed_${impute}_value`], ops: [method], fields: [impute], frame, ignorePeers: false }, (groupby ? { groupby } : {}));
                const replaceOriginal = {
                    type: 'formula',
                    expr: `datum.${impute} === null ? datum.imputed_${impute}_value : datum.${impute}`,
                    as: impute
                };
                return [imputeTransform, deriveNewField, replaceOriginal];
            }
            else {
                return [imputeTransform];
            }
        }
    }

    /**
     * Class to track interesting properties (see https://15721.courses.cs.cmu.edu/spring2016/papers/graefe-ieee1995.pdf)
     * about how fields have been parsed or whether they have been derived in a transform. We use this to not parse the
     * same field again (or differently).
     */
    class AncestorParse extends Split {
        constructor(explicit = {}, implicit = {}, parseNothing = false) {
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

    /**
     * A class for loess transform nodes
     */
    class LoessTransformNode extends DataFlowNode {
        constructor(parent, transform) {
            var _a, _b, _c;
            super(parent);
            this.transform = transform;
            this.transform = duplicate(transform); // duplicate to prevent side effects
            const specifiedAs = (_a = this.transform.as, (_a !== null && _a !== void 0 ? _a : [undefined, undefined]));
            this.transform.as = [(_b = specifiedAs[0], (_b !== null && _b !== void 0 ? _b : transform.on)), (_c = specifiedAs[1], (_c !== null && _c !== void 0 ? _c : transform.loess))];
        }
        clone() {
            return new LoessTransformNode(null, duplicate(this.transform));
        }
        dependentFields() {
            var _a;
            return new Set([this.transform.loess, this.transform.on, ...(_a = this.transform.groupby, (_a !== null && _a !== void 0 ? _a : []))]);
        }
        producedFields() {
            return new Set(this.transform.as);
        }
        hash() {
            return `LoessTransform ${hash(this.transform)}`;
        }
        assemble() {
            const _a = this.transform, { loess, on } = _a, rest = __rest(_a, ["loess", "on"]);
            const result = Object.assign({ type: 'loess', x: on, y: loess }, rest);
            return result;
        }
    }

    class LookupNode extends DataFlowNode {
        constructor(parent, transform, secondary) {
            super(parent);
            this.transform = transform;
            this.secondary = secondary;
        }
        clone() {
            return new LookupNode(null, duplicate(this.transform), this.secondary);
        }
        static make(parent, model, transform, counter) {
            const sources = model.component.data.sources;
            const { from } = transform;
            let fromOutputNode = null;
            if (isLookupData(from)) {
                let fromSource = findSource(from.data, sources);
                if (!fromSource) {
                    fromSource = new SourceNode(from.data);
                    sources.push(fromSource);
                }
                const fromOutputName = model.getName(`lookup_${counter}`);
                fromOutputNode = new OutputNode(fromSource, fromOutputName, 'lookup', model.component.data.outputNodeRefCounts);
                model.component.data.outputNodes[fromOutputName] = fromOutputNode;
            }
            else if (isLookupSelection(from)) {
                const selName = from.selection;
                transform = Object.assign({ as: selName }, transform);
                fromOutputNode = model.getSelectionComponent(varName(selName), selName).materialized;
                if (!fromOutputNode) {
                    throw new Error(message.noSameUnitLookup(selName));
                }
            }
            return new LookupNode(parent, transform, fromOutputNode.getSource());
        }
        dependentFields() {
            return new Set([this.transform.lookup]);
        }
        producedFields() {
            return new Set(this.transform.as ? array(this.transform.as) : this.transform.from.fields);
        }
        hash() {
            return `Lookup ${hash({ transform: this.transform, secondary: this.secondary })}`;
        }
        assemble() {
            let foreign;
            if (this.transform.from.fields) {
                // lookup a few fields and add create a flat output
                foreign = Object.assign({ values: this.transform.from.fields }, (this.transform.as ? { as: array(this.transform.as) } : {}));
            }
            else {
                // lookup full record and nest it
                let asName = this.transform.as;
                if (!isString(asName)) {
                    warn(message.NO_FIELDS_NEEDS_AS);
                    asName = '_lookup';
                }
                foreign = {
                    as: [asName]
                };
            }
            return Object.assign(Object.assign({ type: 'lookup', from: this.secondary, key: this.transform.from.key, fields: [this.transform.lookup] }, foreign), (this.transform.default ? { default: this.transform.default } : {}));
        }
    }

    /**
     * A class for quantile transform nodes
     */
    class QuantileTransformNode extends DataFlowNode {
        constructor(parent, transform) {
            var _a, _b, _c;
            super(parent);
            this.transform = transform;
            this.transform = duplicate(transform); // duplicate to prevent side effects
            const specifiedAs = (_a = this.transform.as, (_a !== null && _a !== void 0 ? _a : [undefined, undefined]));
            this.transform.as = [(_b = specifiedAs[0], (_b !== null && _b !== void 0 ? _b : 'prob')), (_c = specifiedAs[1], (_c !== null && _c !== void 0 ? _c : 'value'))];
        }
        clone() {
            return new QuantileTransformNode(null, duplicate(this.transform));
        }
        dependentFields() {
            var _a;
            return new Set([this.transform.quantile, ...(_a = this.transform.groupby, (_a !== null && _a !== void 0 ? _a : []))]);
        }
        producedFields() {
            return new Set(this.transform.as);
        }
        hash() {
            return `QuantileTransform ${hash(this.transform)}`;
        }
        assemble() {
            const _a = this.transform, { quantile } = _a, rest = __rest(_a, ["quantile"]);
            const result = Object.assign({ type: 'quantile', field: quantile }, rest);
            return result;
        }
    }

    /**
     * A class for regression transform nodes
     */
    class RegressionTransformNode extends DataFlowNode {
        constructor(parent, transform) {
            var _a, _b, _c;
            super(parent);
            this.transform = transform;
            this.transform = duplicate(transform); // duplicate to prevent side effects
            const specifiedAs = (_a = this.transform.as, (_a !== null && _a !== void 0 ? _a : [undefined, undefined]));
            this.transform.as = [(_b = specifiedAs[0], (_b !== null && _b !== void 0 ? _b : transform.on)), (_c = specifiedAs[1], (_c !== null && _c !== void 0 ? _c : transform.regression))];
        }
        clone() {
            return new RegressionTransformNode(null, duplicate(this.transform));
        }
        dependentFields() {
            var _a;
            return new Set([this.transform.regression, this.transform.on, ...(_a = this.transform.groupby, (_a !== null && _a !== void 0 ? _a : []))]);
        }
        producedFields() {
            return new Set(this.transform.as);
        }
        hash() {
            return `RegressionTransform ${hash(this.transform)}`;
        }
        assemble() {
            const _a = this.transform, { regression, on } = _a, rest = __rest(_a, ["regression", "on"]);
            const result = Object.assign({ type: 'regression', x: on, y: regression }, rest);
            return result;
        }
    }

    /**
     * A class for pivot transform nodes.
     */
    class PivotTransformNode extends DataFlowNode {
        constructor(parent, transform) {
            super(parent);
            this.transform = transform;
        }
        clone() {
            return new PivotTransformNode(null, duplicate(this.transform));
        }
        addDimensions(fields) {
            var _a;
            this.transform.groupby = unique((_a = this.transform.groupby, (_a !== null && _a !== void 0 ? _a : [])).concat(fields), d => d);
        }
        producedFields() {
            return undefined; // return undefined so that potentially everything can depend on the pivot
        }
        dependentFields() {
            var _a;
            return new Set([this.transform.pivot, this.transform.value, ...(_a = this.transform.groupby, (_a !== null && _a !== void 0 ? _a : []))]);
        }
        hash() {
            return `PivotTransform ${hash(this.transform)}`;
        }
        assemble() {
            const { pivot, value, groupby, limit, op } = this.transform;
            return Object.assign(Object.assign(Object.assign({ type: 'pivot', field: pivot, value }, (limit !== undefined ? { limit } : {})), (op !== undefined ? { op } : {})), (groupby !== undefined ? { groupby } : {}));
        }
    }

    /**
     * A class for the sample transform nodes
     */
    class SampleTransformNode extends DataFlowNode {
        constructor(parent, transform) {
            super(parent);
            this.transform = transform;
        }
        clone() {
            return new SampleTransformNode(null, duplicate(this.transform));
        }
        dependentFields() {
            return new Set();
        }
        producedFields() {
            return new Set();
        }
        hash() {
            return `SampleTransform ${hash(this.transform)}`;
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
            var _a;
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
                    // If node's parent is a root source and the data source does not refer to another data source, use normal format parse
                    dataSource.format = Object.assign(Object.assign({}, (_a = dataSource.format, (_a !== null && _a !== void 0 ? _a : {}))), { parse: node.assembleFormatParse() });
                    // add calculates for all nested fields
                    dataSource.transform.push(...node.assembleTransforms(true));
                }
                else {
                    // Otherwise use Vega expression to parse
                    dataSource.transform.push(...node.assembleTransforms());
                }
            }
            if (node instanceof FacetNode) {
                if (!dataSource.name) {
                    dataSource.name = `data_${datasetIndex++}`;
                }
                if (!dataSource.source || dataSource.transform.length > 0) {
                    data.push(dataSource);
                    node.data = dataSource.name;
                }
                else {
                    node.data = dataSource.source;
                }
                node.assemble().forEach(d => data.push(d));
                // break here because the rest of the tree has to be taken care of by the facet.
                return;
            }
            if (node instanceof GraticuleNode ||
                node instanceof SequenceNode ||
                node instanceof FilterInvalidNode ||
                node instanceof FilterNode ||
                node instanceof CalculateNode ||
                node instanceof GeoPointNode ||
                node instanceof GeoJSONNode ||
                node instanceof AggregateNode ||
                node instanceof LookupNode ||
                node instanceof WindowTransformNode ||
                node instanceof JoinAggregateTransformNode ||
                node instanceof FoldTransformNode ||
                node instanceof FlattenTransformNode ||
                node instanceof DensityTransformNode ||
                node instanceof LoessTransformNode ||
                node instanceof QuantileTransformNode ||
                node instanceof RegressionTransformNode ||
                node instanceof IdentifierNode ||
                node instanceof SampleTransformNode ||
                node instanceof PivotTransformNode) {
                dataSource.transform.push(node.assemble());
            }
            if (node instanceof BinNode ||
                node instanceof TimeUnitNode ||
                node instanceof ImputeNode ||
                node instanceof StackNode) {
                dataSource.transform.push(...node.assemble());
            }
            if (node instanceof OutputNode) {
                if (dataSource.source && dataSource.transform.length === 0) {
                    node.setSource(dataSource.source);
                }
                else if (node.parent instanceof OutputNode) {
                    // Note that an output node may be required but we still do not assemble a
                    // separate data source for it.
                    node.setSource(dataSource.name);
                }
                else {
                    if (!dataSource.name) {
                        dataSource.name = `data_${datasetIndex++}`;
                    }
                    // Here we set the name of the datasource we generated. From now on
                    // other assemblers can use it.
                    node.setSource(dataSource.name);
                    // if this node has more than one child, we will add a datasource automatically
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
                default: {
                    if (!dataSource.name) {
                        dataSource.name = `data_${datasetIndex++}`;
                    }
                    let source = dataSource.name;
                    if (!dataSource.source || dataSource.transform.length > 0) {
                        data.push(dataSource);
                    }
                    else {
                        source = dataSource.source;
                    }
                    node.children.forEach(child => {
                        const newData = {
                            name: null,
                            source: source,
                            transform: []
                        };
                        walkTree(child, newData);
                    });
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
        root.children.forEach(child => walkTree(child, {
            source: root.name,
            name: null,
            transform: []
        }));
        return data;
    }
    /**
     * Create Vega Data array from a given compiled model and append all of them to the given array
     *
     * @param  model
     * @param  data array
     * @return modified data array
     */
    function assembleRootData(dataComponent, datasets) {
        var _a, _b;
        const data = [];
        // dataComponent.sources.forEach(debug);
        // draw(dataComponent.sources);
        const walkTree = makeWalkTree(data);
        let sourceIndex = 0;
        dataComponent.sources.forEach(root => {
            // assign a name if the source does not have a name yet
            if (!root.hasName()) {
                root.dataName = `source_${sourceIndex++}`;
            }
            const newData = root.assemble();
            walkTree(root, newData);
        });
        // remove empty transform arrays for cleaner output
        data.forEach(d => {
            if (d.transform.length === 0) {
                delete d.transform;
            }
        });
        // move sources without transforms (the ones that are potentially used in lookups) to the beginning
        let whereTo = 0;
        for (const [i, d] of data.entries()) {
            if ((_a = d.transform, (_a !== null && _a !== void 0 ? _a : [])).length === 0 && !d.source) {
                data.splice(whereTo++, 0, data.splice(i, 1)[0]);
            }
        }
        // now fix the from references in lookup transforms
        for (const d of data) {
            for (const t of (_b = d.transform, (_b !== null && _b !== void 0 ? _b : []))) {
                if (t.type === 'lookup') {
                    t.from = dataComponent.outputNodes[t.from].getSource();
                }
            }
        }
        // inline values for datasets that are in the datastore
        for (const d of data) {
            if (d.name in datasets) {
                d.values = datasets[d.name];
            }
        }
        return data;
    }

    function getHeaderType(orient) {
        if (orient === 'top' || orient === 'left') {
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
        var _a;
        if (model.channelHasField(channel)) {
            const fieldDef = model.facet[channel];
            const titleConfig = getHeaderProperty('title', null, model.config, channel);
            let title$1 = title(fieldDef, model.config, {
                allowDisabling: true,
                includeDefault: titleConfig === undefined || !!titleConfig
            });
            if (model.child.component.layoutHeaders[channel].title) {
                // TODO: better handle multiline titles
                title$1 = isArray(title$1) ? title$1.join(', ') : title$1;
                // merge title with child to produce "Title / Subtitle / Sub-subtitle"
                title$1 += ' / ' + model.child.component.layoutHeaders[channel].title;
                model.child.component.layoutHeaders[channel].title = null;
            }
            const labelOrient = getHeaderProperty('labelOrient', fieldDef, model.config, channel);
            const header = (_a = fieldDef.header, (_a !== null && _a !== void 0 ? _a : {}));
            const labels = getFirstDefined(header.labels, true);
            const headerType = contains(['bottom', 'right'], labelOrient) ? 'footer' : 'header';
            model.component.layoutHeaders[channel] = {
                title: title$1,
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
        var _a;
        const { child } = model;
        if (child.component.axes[channel]) {
            const { layoutHeaders, resolve } = model.component;
            resolve.axis[channel] = parseGuideResolve(resolve, channel);
            if (resolve.axis[channel] === 'shared') {
                // For shared axis, move the axes to facet's header or footer
                const headerChannel = channel === 'x' ? 'column' : 'row';
                const layoutHeader = layoutHeaders[headerChannel];
                for (const axisComponent of child.component.axes[channel]) {
                    const headerType = getHeaderType(axisComponent.get('orient'));
                    layoutHeader[headerType] = (_a = layoutHeader[headerType], (_a !== null && _a !== void 0 ? _a : [makeHeaderComponent(model, headerChannel, false)]));
                    // FIXME: assemble shouldn't be called here, but we do it this way so we only extract the main part of the axes
                    const mainAxis = assembleAxis(axisComponent, 'main', model.config, { header: true });
                    // LayoutHeader no longer keep track of property precedence, thus let's combine.
                    layoutHeader[headerType][0].axes.push(mainAxis);
                    axisComponent.mainExtracted = true;
                }
            }
        }
    }

    function parseLayerLayoutSize(model) {
        parseChildrenLayoutSize(model);
        const layoutSizeCmpt = model.component.layoutSize;
        layoutSizeCmpt.setWithExplicit('width', parseNonUnitLayoutSizeForChannel(model, 'width'));
        layoutSizeCmpt.setWithExplicit('height', parseNonUnitLayoutSizeForChannel(model, 'height'));
    }
    const parseRepeatLayoutSize = parseLayerLayoutSize;
    const SIZE_TYPE_TO_MERGE = {
        vconcat: 'width',
        hconcat: 'height'
    };
    function parseConcatLayoutSize(model) {
        parseChildrenLayoutSize(model);
        const layoutSizeCmpt = model.component.layoutSize;
        const sizeTypeToMerge = SIZE_TYPE_TO_MERGE[model.concatType];
        if (sizeTypeToMerge) {
            layoutSizeCmpt.setWithExplicit(sizeTypeToMerge, parseNonUnitLayoutSizeForChannel(model, sizeTypeToMerge));
        }
    }
    function parseChildrenLayoutSize(model) {
        for (const child of model.children) {
            child.parseLayoutSize();
        }
    }
    function parseNonUnitLayoutSizeForChannel(model, sizeType) {
        const channel = sizeType === 'width' ? 'x' : 'y';
        const resolve = model.component.resolve;
        let mergedSize;
        // Try to merge layout size
        for (const child of model.children) {
            const childSize = child.component.layoutSize.getWithExplicit(sizeType);
            const scaleResolve = resolve.scale[channel];
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
            }
            else {
                mergedSize = childSize;
            }
        }
        if (mergedSize) {
            // If merged, rename size and set size of all children.
            for (const child of model.children) {
                model.renameSignal(child.getName(sizeType), model.getName(sizeType));
                child.component.layoutSize.set(sizeType, 'merged', false);
            }
            return mergedSize;
        }
        else {
            // Otherwise, there is no merged size.
            return {
                explicit: false,
                value: undefined
            };
        }
    }
    function parseUnitLayoutSize(model) {
        const { size, component } = model;
        for (const channel of POSITION_SCALE_CHANNELS) {
            const sizeType = getSizeType(channel);
            if (size[sizeType]) {
                const specifiedSize = size[sizeType];
                component.layoutSize.set(sizeType, isStep(specifiedSize) ? 'step' : specifiedSize, true);
            }
            else {
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
                }
                else {
                    return size;
                }
            }
            else {
                return getViewConfigContinuousSize(config.view, sizeType);
            }
        }
        else if (model.hasProjection) {
            return getViewConfigContinuousSize(config.view, sizeType);
        }
        else {
            const size = getViewConfigDiscreteSize(config.view, sizeType);
            return isStep(size) ? size.step : size;
        }
    }

    function replaceRepeaterInFacet(facet, repeater) {
        if (isFacetMapping(facet)) {
            return replaceRepeater(facet, repeater);
        }
        return replaceRepeaterInFieldDef(facet, repeater);
    }
    function replaceRepeaterInEncoding(encoding, repeater) {
        return replaceRepeater(encoding, repeater);
    }
    /**
     * Replaces repeated value and returns if the repeated value is valid.
     */
    function replaceRepeat(o, repeater) {
        if (isRepeatRef(o.field)) {
            if (o.field.repeat in repeater) {
                // any needed to calm down ts compiler
                return Object.assign(Object.assign({}, o), { field: repeater[o.field.repeat] });
            }
            else {
                warn(message.noSuchRepeatedValue(o.field.repeat));
                return undefined;
            }
        }
        return o;
    }
    /**
     * Replace repeater values in a field def with the concrete field name.
     */
    function replaceRepeaterInFieldDef(fieldDef, repeater) {
        fieldDef = replaceRepeat(fieldDef, repeater);
        if (fieldDef === undefined) {
            // the field def should be ignored
            return undefined;
        }
        else if (fieldDef === null) {
            return null;
        }
        if (isSortableFieldDef(fieldDef) && isSortField(fieldDef.sort)) {
            const sort = replaceRepeat(fieldDef.sort, repeater);
            fieldDef = Object.assign(Object.assign({}, fieldDef), (sort ? { sort } : {}));
        }
        return fieldDef;
    }
    function replaceRepeaterInChannelDef(channelDef, repeater) {
        if (isFieldDef(channelDef)) {
            const fd = replaceRepeaterInFieldDef(channelDef, repeater);
            if (fd) {
                return fd;
            }
            else if (isConditionalDef(channelDef)) {
                return { condition: channelDef.condition };
            }
        }
        else {
            if (hasConditionalFieldDef(channelDef)) {
                const fd = replaceRepeaterInFieldDef(channelDef.condition, repeater);
                if (fd) {
                    return Object.assign(Object.assign({}, channelDef), { condition: fd });
                }
                else {
                    const channelDefWithoutCondition = __rest(channelDef, ["condition"]);
                    return channelDefWithoutCondition;
                }
            }
            return channelDef;
        }
        return undefined;
    }
    function replaceRepeater(mapping, repeater) {
        const out = {};
        for (const channel in mapping) {
            if (hasOwnProperty(mapping, channel)) {
                const channelDef = mapping[channel];
                if (isArray(channelDef)) {
                    // array cannot have condition
                    out[channel] = channelDef.map(cd => replaceRepeaterInChannelDef(cd, repeater)).filter(cd => cd);
                }
                else {
                    const cd = replaceRepeaterInChannelDef(channelDef, repeater);
                    if (cd !== undefined) {
                        out[channel] = cd;
                    }
                }
            }
        }
        return out;
    }

    function facetSortFieldName(fieldDef, sort, opt) {
        return vgField(sort, Object.assign({ suffix: `by_${vgField(fieldDef)}` }, ((opt !== null && opt !== void 0 ? opt : {}))));
    }
    class FacetModel extends ModelWithField {
        constructor(spec, parent, parentGivenName, repeater, config) {
            super(spec, 'facet', parent, parentGivenName, config, repeater, spec.resolve);
            this.child = buildModel(spec.spec, this, this.getName('child'), undefined, repeater, config);
            this.children = [this.child];
            const facet = replaceRepeaterInFacet(spec.facet, repeater);
            this.facet = this.initFacet(facet);
        }
        initFacet(facet) {
            // clone to prevent side effect to the original spec
            if (!isFacetMapping(facet)) {
                return { facet: normalize$1(facet, 'facet') };
            }
            return reduce(facet, (normalizedFacet, fieldDef, channel) => {
                if (!contains([ROW, COLUMN], channel)) {
                    // Drop unsupported channel
                    warn(message.incompatibleChannel(channel, 'facet'));
                    return normalizedFacet;
                }
                if (fieldDef.field === undefined) {
                    warn(message.emptyFieldDef(fieldDef, channel));
                    return normalizedFacet;
                }
                // Convert type to full, lowercase type, or augment the fieldDef with a default type if missing.
                normalizedFacet[channel] = normalize$1(fieldDef, channel);
                return normalizedFacet;
            }, {});
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
            var _a, _b, _c, _d;
            const layoutMixins = {};
            for (const channel of FACET_CHANNELS) {
                for (const headerType of HEADER_TYPES) {
                    const layoutHeaderComponent = this.component.layoutHeaders[channel];
                    const headerComponent = layoutHeaderComponent[headerType];
                    const { facetFieldDef } = layoutHeaderComponent;
                    if (facetFieldDef) {
                        const titleOrient = getHeaderProperty('titleOrient', facetFieldDef, this.config, channel);
                        if (contains(['right', 'bottom'], titleOrient)) {
                            const headerChannel = getHeaderChannel(channel, titleOrient);
                            layoutMixins.titleAnchor = (_a = layoutMixins.titleAnchor, (_a !== null && _a !== void 0 ? _a : {}));
                            layoutMixins.titleAnchor[headerChannel] = 'end';
                        }
                    }
                    if ((_b = headerComponent) === null || _b === void 0 ? void 0 : _b[0]) {
                        // set header/footerBand
                        const sizeType = channel === 'row' ? 'height' : 'width';
                        const bandType = headerType === 'header' ? 'headerBand' : 'footerBand';
                        if (channel !== 'facet' && !this.child.component.layoutSize.get(sizeType)) {
                            // If facet child does not have size signal, then apply headerBand
                            layoutMixins[bandType] = (_c = layoutMixins[bandType], (_c !== null && _c !== void 0 ? _c : {}));
                            layoutMixins[bandType][channel] = 0.5;
                        }
                        if (layoutHeaderComponent.title) {
                            layoutMixins.offset = (_d = layoutMixins.offset, (_d !== null && _d !== void 0 ? _d : {}));
                            layoutMixins.offset[channel === 'row' ? 'rowTitle' : 'columnTitle'] = 10;
                        }
                    }
                }
            }
            return layoutMixins;
        }
        assembleDefaultLayout() {
            const { column, row } = this.facet;
            const columns = column ? this.columnDistinctSignal() : row ? 1 : undefined;
            let align = 'all';
            // Do not align the cells if the scale corresponding to the direction is indepent.
            // We always align when we facet into both row and column.
            if (!row && this.component.resolve.scale.x === 'independent') {
                align = 'none';
            }
            else if (!column && this.component.resolve.scale.y === 'independent') {
                align = 'none';
            }
            return Object.assign(Object.assign(Object.assign({}, this.getHeaderLayoutMixins()), (columns ? { columns } : {})), { bounds: 'full', align });
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
            }
            else {
                // In facetNode.assemble(), the name is always this.getName('column') + '_layout'.
                const facetLayoutDataName = this.getName('column_domain');
                return { signal: `length(data('${facetLayoutDataName}'))` };
            }
        }
        assembleGroup(signals) {
            if (this.parent && this.parent instanceof FacetModel) {
                // Provide number of columns for layout.
                // See discussion in https://github.com/vega/vega/issues/952
                // and https://github.com/vega/vega-view/releases/tag/v1.2.6
                return Object.assign(Object.assign({}, (this.channelHasField('column')
                    ? {
                        encode: {
                            update: {
                                // TODO(https://github.com/vega/vega-lite/issues/2759):
                                // Correct the signal for facet of concat of facet_column
                                columns: { field: vgField(this.facet.column, { prefix: 'distinct' }) }
                            }
                        }
                    }
                    : {})), super.assembleGroup(signals));
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
                    as.push(`distinct_${field}`);
                }
            }
            else {
                for (const channel of ['x', 'y']) {
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
                                as.push(`distinct_${field}`);
                            }
                            else {
                                warn(`Unknown field for ${channel}. Cannot calculate view size.`);
                            }
                        }
                    }
                }
            }
            return { fields, ops, as };
        }
        assembleFacet() {
            const { name, data } = this.component.data.facetRoot;
            const { row, column } = this.facet;
            const { fields, ops, as } = this.getCardinalityAggregateForChild();
            const groupby = [];
            for (const channel of FACET_CHANNELS) {
                const fieldDef = this.facet[channel];
                if (fieldDef) {
                    groupby.push(vgField(fieldDef));
                    const { bin, sort } = fieldDef;
                    if (isBinning(bin)) {
                        groupby.push(vgField(fieldDef, { binSuffix: 'end' }));
                    }
                    if (isSortField(sort)) {
                        const { field, op = DEFAULT_SORT_OP } = sort;
                        const outputName = facetSortFieldName(fieldDef, sort);
                        if (row && column) {
                            // For crossed facet, use pre-calculate field as it requires a different groupby
                            // For each calculated field, apply max and assign them to the same name as
                            // all values of the same group should be the same anyway.
                            fields.push(outputName);
                            ops.push('max');
                            as.push(outputName);
                        }
                        else {
                            fields.push(field);
                            ops.push(op);
                            as.push(outputName);
                        }
                    }
                    else if (isArray(sort)) {
                        const outputName = sortArrayIndexField(fieldDef, channel);
                        fields.push(outputName);
                        ops.push('max');
                        as.push(outputName);
                    }
                }
            }
            const cross = !!row && !!column;
            return Object.assign({ name,
                data,
                groupby }, (cross || fields.length > 0
                ? {
                    aggregate: Object.assign(Object.assign({}, (cross ? { cross } : {})), (fields.length ? { fields, ops, as } : {}))
                }
                : {}));
        }
        facetSortFields(channel) {
            const { facet } = this;
            const fieldDef = facet[channel];
            if (fieldDef) {
                if (isSortField(fieldDef.sort)) {
                    return [facetSortFieldName(fieldDef, fieldDef.sort, { expr: 'datum' })];
                }
                else if (isArray(fieldDef.sort)) {
                    return [sortArrayIndexField(fieldDef, channel, { expr: 'datum' })];
                }
                return [vgField(fieldDef, { expr: 'datum' })];
            }
            return [];
        }
        facetSortOrder(channel) {
            const { facet } = this;
            const fieldDef = facet[channel];
            if (fieldDef) {
                const { sort } = fieldDef;
                const order = (isSortField(sort) ? sort.order : !isArray(sort) && sort) || 'ascending';
                return [order];
            }
            return [];
        }
        assembleLabelTitle() {
            const { facet, config } = this;
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
                    const labelOrient = getHeaderProperty('labelOrient', facet[channel], config, channel);
                    if (contains(ORTHOGONAL_ORIENT[channel], labelOrient)) {
                        // Row/Column with orthogonal labelOrient must use title to display labels
                        return assembleLabelTitle(facet[channel], channel, config);
                    }
                }
            }
            return undefined;
        }
        assembleMarks() {
            const { child } = this;
            // If we facet by two dimensions, we need to add a cross operator to the aggregation
            // so that we create all groups
            const facetRoot = this.component.data.facetRoot;
            const data = assembleFacetData(facetRoot);
            const encodeEntry = child.assembleGroupEncodeEntry(false);
            const title = this.assembleLabelTitle() || child.assembleTitle();
            const style = child.assembleGroupStyle();
            const markGroup = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ name: this.getName('cell'), type: 'group' }, (title ? { title } : {})), (style ? { style } : {})), { from: {
                    facet: this.assembleFacet()
                }, 
                // TODO: move this to after data
                sort: {
                    field: FACET_CHANNELS.map(c => this.facetSortFields(c)).flat(),
                    order: FACET_CHANNELS.map(c => this.facetSortOrder(c)).flat()
                } }), (data.length > 0 ? { data: data } : {})), (encodeEntry ? { encode: { update: encodeEntry } } : {})), child.assembleGroup(assembleFacetSignals(this, [])));
            return [markGroup];
        }
        getMapping() {
            return this.facet;
        }
    }

    function makeJoinAggregateFromFacet(parent, facet) {
        const { row, column } = facet;
        if (row && column) {
            let newParent = null;
            // only need to make one for crossed facet
            for (const fieldDef of [row, column]) {
                if (isSortField(fieldDef.sort)) {
                    const { field, op = DEFAULT_SORT_OP } = fieldDef.sort;
                    parent = newParent = new JoinAggregateTransformNode(parent, {
                        joinaggregate: [
                            {
                                op,
                                field,
                                as: facetSortFieldName(fieldDef, fieldDef.sort, { forAs: true })
                            }
                        ],
                        groupby: [vgField(fieldDef)]
                    });
                }
            }
            return newParent;
        }
        return null;
    }

    function findSource(data, sources) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        for (const other of sources) {
            const otherData = other.data;
            // if both datasets have a name defined, we cannot merge
            if (data.name && other.hasName() && data.name !== other.dataName) {
                continue;
            }
            // feature and mesh are mutually exclusive
            if (((_a = data['format']) === null || _a === void 0 ? void 0 : _a.mesh) && ((_b = otherData.format) === null || _b === void 0 ? void 0 : _b.feature)) {
                continue;
            }
            // we have to extract the same feature or mesh
            if ((((_c = data['format']) === null || _c === void 0 ? void 0 : _c.feature) || ((_d = otherData.format) === null || _d === void 0 ? void 0 : _d.feature)) &&
                ((_e = data['format']) === null || _e === void 0 ? void 0 : _e.feature) !== ((_f = otherData.format) === null || _f === void 0 ? void 0 : _f.feature)) {
                continue;
            }
            if ((((_g = data['format']) === null || _g === void 0 ? void 0 : _g.mesh) || ((_h = otherData.format) === null || _h === void 0 ? void 0 : _h.mesh)) && ((_j = data['format']) === null || _j === void 0 ? void 0 : _j.mesh) !== ((_k = otherData.format) === null || _k === void 0 ? void 0 : _k.mesh)) {
                continue;
            }
            if (isInlineData(data) && isInlineData(otherData)) {
                if (deepEqual(data.values, otherData.values)) {
                    return other;
                }
            }
            else if (isUrlData(data) && isUrlData(otherData)) {
                if (data.url === otherData.url) {
                    return other;
                }
            }
            else if (isNamedData(data)) {
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
                const source = new SourceNode([]);
                sources.push(source);
                return source;
            }
            const existingSource = findSource(model.data, sources);
            if (existingSource) {
                if (!isGenerator(model.data)) {
                    existingSource.data.format = mergeDeep({}, model.data.format, existingSource.data.format);
                }
                // if the new source has a name but the existing one does not, we can set it
                if (!existingSource.hasName() && model.data.name) {
                    existingSource.dataName = model.data.name;
                }
                return existingSource;
            }
            else {
                const source = new SourceNode(model.data);
                sources.push(source);
                return source;
            }
        }
        else {
            // If we don't have a source defined (overriding parent's data), use the parent's facet root or main.
            return model.parent.component.data.facetRoot
                ? model.parent.component.data.facetRoot
                : model.parent.component.data.main;
        }
    }
    /**
     * Parses a transform array into a chain of connected dataflow nodes.
     */
    function parseTransformArray(head, model, ancestorParse) {
        var _a, _b;
        let lookupCounter = 0;
        for (const t of model.transforms) {
            let derivedType = undefined;
            let transformNode;
            if (isCalculate(t)) {
                transformNode = head = new CalculateNode(head, t);
                derivedType = 'derived';
            }
            else if (isFilter(t)) {
                const implicit = getImplicitFromFilterTransform(t);
                transformNode = head = (_a = ParseNode.makeWithAncestors(head, {}, implicit, ancestorParse), (_a !== null && _a !== void 0 ? _a : head));
                head = new FilterNode(head, model, t.filter);
            }
            else if (isBin(t)) {
                transformNode = head = BinNode.makeFromTransform(head, t, model);
                derivedType = 'number';
            }
            else if (isTimeUnit(t)) {
                derivedType = 'date';
                const parsedAs = ancestorParse.getWithExplicit(t.field);
                // Create parse node because the input to time unit is always date.
                if (parsedAs.value === undefined) {
                    head = new ParseNode(head, { [t.field]: derivedType });
                    ancestorParse.set(t.field, derivedType, false);
                }
                transformNode = head = TimeUnitNode.makeFromTransform(head, t);
            }
            else if (isAggregate$1(t)) {
                transformNode = head = AggregateNode.makeFromTransform(head, t);
                derivedType = 'number';
                if (requiresSelectionId(model)) {
                    head = new IdentifierNode(head);
                }
            }
            else if (isLookup(t)) {
                transformNode = head = LookupNode.make(head, model, t, lookupCounter++);
                derivedType = 'derived';
            }
            else if (isWindow(t)) {
                transformNode = head = new WindowTransformNode(head, t);
                derivedType = 'number';
            }
            else if (isJoinAggregate(t)) {
                transformNode = head = new JoinAggregateTransformNode(head, t);
                derivedType = 'number';
            }
            else if (isStack(t)) {
                transformNode = head = StackNode.makeFromTransform(head, t);
                derivedType = 'derived';
            }
            else if (isFold(t)) {
                transformNode = head = new FoldTransformNode(head, t);
                derivedType = 'derived';
            }
            else if (isFlatten(t)) {
                transformNode = head = new FlattenTransformNode(head, t);
                derivedType = 'derived';
            }
            else if (isPivot(t)) {
                transformNode = head = new PivotTransformNode(head, t);
                derivedType = 'derived';
            }
            else if (isSample(t)) {
                head = new SampleTransformNode(head, t);
            }
            else if (isImpute(t)) {
                transformNode = head = ImputeNode.makeFromTransform(head, t);
                derivedType = 'derived';
            }
            else if (isDensity(t)) {
                transformNode = head = new DensityTransformNode(head, t);
                derivedType = 'derived';
            }
            else if (isQuantile(t)) {
                transformNode = head = new QuantileTransformNode(head, t);
                derivedType = 'derived';
            }
            else if (isRegression(t)) {
                transformNode = head = new RegressionTransformNode(head, t);
                derivedType = 'derived';
            }
            else if (isLoess(t)) {
                transformNode = head = new LoessTransformNode(head, t);
                derivedType = 'derived';
            }
            else {
                warn(message.invalidTransformIgnored(t));
                continue;
            }
            if (transformNode && derivedType !== undefined) {
                for (const field of (_b = transformNode.producedFields(), (_b !== null && _b !== void 0 ? _b : []))) {
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        let head = parseRoot(model, model.component.data.sources);
        const { outputNodes, outputNodeRefCounts } = model.component.data;
        const ancestorParse = model.parent ? model.parent.component.data.ancestorParse.clone() : new AncestorParse();
        const data = model.data;
        if (isGenerator(data)) {
            // insert generator transform
            if (isSequenceGenerator(data)) {
                head = new SequenceNode(head, data.sequence);
            }
            else if (isGraticuleGenerator(data)) {
                head = new GraticuleNode(head, data.graticule);
            }
            // no parsing necessary for generator
            ancestorParse.parseNothing = true;
        }
        else if (((_b = (_a = data) === null || _a === void 0 ? void 0 : _a.format) === null || _b === void 0 ? void 0 : _b.parse) === null) {
            // format.parse: null means disable parsing
            ancestorParse.parseNothing = true;
        }
        head = (_c = ParseNode.makeExplicit(head, model, ancestorParse), (_c !== null && _c !== void 0 ? _c : head));
        // Default discrete selections require an identifer transform to
        // uniquely identify data points. Add this transform at the head of
        // the pipeline such that the identifier field is available for all
        // subsequent datasets. During optimization, we will remove this
        // transform if it proves to be unnecessary. Additional identifier
        // transforms will be necessary when new tuples are constructed
        // (e.g., post-aggregation).
        head = new IdentifierNode(head);
        // HACK: This is equivalent for merging bin extent for union scale.
        // FIXME(https://github.com/vega/vega-lite/issues/2270): Correctly merge extent / bin node for shared bin scale
        const parentIsLayer = model.parent && isLayerModel(model.parent);
        if (isUnitModel(model) || isFacetModel(model)) {
            if (parentIsLayer) {
                head = (_d = BinNode.makeFromEncoding(head, model), (_d !== null && _d !== void 0 ? _d : head));
            }
        }
        if (model.transforms.length > 0) {
            head = parseTransformArray(head, model, ancestorParse);
        }
        // create parse nodes for fields that need to be parsed (or flattened) implicitly
        const implicitSelection = getImplicitFromSelection(model);
        const implicitEncoding = getImplicitFromEncoding(model);
        head = (_e = ParseNode.makeWithAncestors(head, {}, Object.assign(Object.assign({}, implicitSelection), implicitEncoding), ancestorParse), (_e !== null && _e !== void 0 ? _e : head));
        if (isUnitModel(model)) {
            head = GeoJSONNode.parseAll(head, model);
            head = GeoPointNode.parseAll(head, model);
        }
        if (isUnitModel(model) || isFacetModel(model)) {
            if (!parentIsLayer) {
                head = (_f = BinNode.makeFromEncoding(head, model), (_f !== null && _f !== void 0 ? _f : head));
            }
            head = (_g = TimeUnitNode.makeFromEncoding(head, model), (_g !== null && _g !== void 0 ? _g : head));
            head = CalculateNode.parseAllForSortIndex(head, model);
        }
        // add an output node pre aggregation
        const rawName = model.getName(RAW);
        const raw = new OutputNode(head, rawName, RAW, outputNodeRefCounts);
        outputNodes[rawName] = raw;
        head = raw;
        if (isUnitModel(model)) {
            const agg = AggregateNode.makeFromEncoding(head, model);
            if (agg) {
                head = agg;
                if (requiresSelectionId(model)) {
                    head = new IdentifierNode(head);
                }
            }
            head = (_h = ImputeNode.makeFromEncoding(head, model), (_h !== null && _h !== void 0 ? _h : head));
            head = (_j = StackNode.makeFromEncoding(head, model), (_j !== null && _j !== void 0 ? _j : head));
        }
        if (isUnitModel(model)) {
            head = (_k = FilterInvalidNode.make(head, model), (_k !== null && _k !== void 0 ? _k : head));
        }
        // output node for marks
        const mainName = model.getName(MAIN);
        const main = new OutputNode(head, mainName, MAIN, outputNodeRefCounts);
        outputNodes[mainName] = main;
        head = main;
        if (isUnitModel(model)) {
            materializeSelections(model, main);
        }
        // add facet marker
        let facetRoot = null;
        if (isFacetModel(model)) {
            const facetName = model.getName('facet');
            // Derive new sort index field for facet's sort array
            head = CalculateNode.parseAllForSortIndex(head, model);
            // Derive new aggregate for facet's sort field
            // augment data source with new fields for crossed facet
            head = (_l = makeJoinAggregateFromFacet(head, model.facet), (_l !== null && _l !== void 0 ? _l : head));
            facetRoot = new FacetNode(head, model, facetName, main.getSource());
            outputNodes[facetName] = facetRoot;
            head = facetRoot;
        }
        return Object.assign(Object.assign({}, model.component.data), { outputNodes,
            outputNodeRefCounts,
            raw,
            main,
            facetRoot,
            ancestorParse });
    }

    class BaseConcatModel extends Model {
        constructor(spec, specType, parent, parentGivenName, config, repeater, resolve) {
            super(spec, specType, parent, parentGivenName, config, repeater, resolve);
        }
        parseData() {
            this.component.data = parseData(this);
            this.children.forEach(child => {
                child.parseData();
            });
        }
        parseSelections() {
            // Merge selections up the hierarchy so that they may be referenced
            // across unit specs. Persist their definitions within each child
            // to assemble signals which remain within output Vega unit groups.
            this.component.selection = {};
            for (const child of this.children) {
                child.parseSelections();
                keys(child.component.selection).forEach(key => {
                    this.component.selection[key] = child.component.selection[key];
                });
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
            }
            // TODO(#2415): support shared axes
        }
        assembleSelectionTopLevelSignals(signals) {
            return this.children.reduce((sg, child) => child.assembleSelectionTopLevelSignals(sg), signals);
        }
        assembleSignals() {
            this.children.forEach(child => child.assembleSignals());
            return [];
        }
        assembleLayoutSignals() {
            return this.children.reduce((signals, child) => {
                return [...signals, ...child.assembleLayoutSignals()];
            }, assembleLayoutSignals(this));
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
                return Object.assign(Object.assign(Object.assign(Object.assign({ type: 'group', name: child.getName('group') }, (title ? { title } : {})), (style ? { style } : {})), (encodeEntry ? { encode: { update: encodeEntry } } : {})), child.assembleGroup());
            });
        }
    }

    class ConcatModel extends BaseConcatModel {
        constructor(spec, parent, parentGivenName, repeater, config) {
            var _a, _b, _c, _d;
            super(spec, 'concat', parent, parentGivenName, config, repeater, spec.resolve);
            if (((_b = (_a = spec.resolve) === null || _a === void 0 ? void 0 : _a.axis) === null || _b === void 0 ? void 0 : _b.x) === 'shared' || ((_d = (_c = spec.resolve) === null || _c === void 0 ? void 0 : _c.axis) === null || _d === void 0 ? void 0 : _d.y) === 'shared') {
                warn(message.CONCAT_CANNOT_SHARE_AXIS);
            }
            this.concatType = isVConcatSpec(spec) ? 'vconcat' : isHConcatSpec(spec) ? 'hconcat' : 'concat';
            this.children = this.getChildren(spec).map((child, i) => {
                return buildModel(child, this, this.getName('concat_' + i), undefined, repeater, config);
            });
        }
        getChildren(spec) {
            if (isVConcatSpec(spec)) {
                return spec.vconcat;
            }
            else if (isHConcatSpec(spec)) {
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
        assembleDefaultLayout() {
            return Object.assign(Object.assign({}, (this.concatType === 'vconcat' ? { columns: 1 } : {})), { bounds: 'full', 
                // Use align each so it can work with multiple plots with different size
                align: 'each' });
        }
    }

    function isFalseOrNull(v) {
        return v === false || v === null;
    }
    const AXIS_COMPONENT_PROPERTIES_INDEX = Object.assign(Object.assign({ gridScale: 1, scale: 1 }, COMMON_AXIS_PROPERTIES_INDEX), { labelExpr: 1, labelOffset: 1, encode: 1 });
    const AXIS_COMPONENT_PROPERTIES = keys(AXIS_COMPONENT_PROPERTIES_INDEX);
    class AxisComponent extends Split {
        constructor(explicit = {}, implicit = {}, mainExtracted = false) {
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
            }
            // Other parts are enabled by default, so they should not be false or null.
            return !isFalseOrNull(this.get(part));
        }
    }

    function labels$1(model, channel, specifiedLabelsSpec) {
        var _a, _b;
        const fieldDef = (_a = model.fieldDef(channel), (_a !== null && _a !== void 0 ? _a : (channel === 'x' ? model.fieldDef('x2') : channel === 'y' ? model.fieldDef('y2') : undefined)));
        const axis = model.axis(channel);
        let labelsSpec = {};
        // We use a label encoding instead of setting the `format` property because Vega does not let us determine how the format should be interpreted.
        if (isTimeFormatFieldDef(fieldDef)) {
            const isUTCScale = model.getScaleComponent(channel).get('type') === ScaleType.UTC;
            const expr = timeFormatExpression('datum.value', (_b = normalizeTimeUnit(fieldDef.timeUnit)) === null || _b === void 0 ? void 0 : _b.unit, axis.format, null, isUTCScale);
            if (expr) {
                labelsSpec.text = { signal: expr };
            }
        }
        labelsSpec = Object.assign(Object.assign({}, labelsSpec), specifiedLabelsSpec);
        return keys(labelsSpec).length === 0 ? undefined : labelsSpec;
    }

    function parseUnitAxes(model) {
        return POSITION_SCALE_CHANNELS.reduce((axis, channel) => {
            if (model.component.scales[channel] && model.axis(channel)) {
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
        var _a;
        const { axes, resolve } = model.component;
        const axisCount = { top: 0, bottom: 0, right: 0, left: 0 };
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
        }
        // Move axes to layer's axis component and merge shared axes
        for (const channel of [X, Y]) {
            for (const child of model.children) {
                if (!child.component.axes[channel]) {
                    // skip if the child does not have a particular axis
                    continue;
                }
                if (resolve.axis[channel] === 'independent') {
                    // If axes are independent, concat the axisComponent array.
                    axes[channel] = (_a = axes[channel], (_a !== null && _a !== void 0 ? _a : [])).concat(child.component.axes[channel]);
                    // Automatically adjust orient
                    for (const axisComponent of child.component.axes[channel]) {
                        const { value: orient, explicit } = axisComponent.getWithExplicit('orient');
                        if (axisCount[orient] > 0 && !explicit) {
                            // Change axis orient if the number do not match
                            const oppositeOrient = OPPOSITE_ORIENT[orient];
                            if (axisCount[orient] > axisCount[oppositeOrient]) {
                                axisComponent.set('orient', oppositeOrient, false);
                            }
                        }
                        axisCount[orient]++;
                        // TODO(https://github.com/vega/vega-lite/issues/2634): automatically add extra offset?
                    }
                }
                // After merging, make sure to remove axes from child
                delete child.component.axes[channel];
            }
            // Suppress grid lines for dual axis charts (https://github.com/vega/vega-lite/issues/4676)
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
                }
                else if (merged && child) {
                    const mergedOrient = merged.getWithExplicit('orient');
                    const childOrient = child.getWithExplicit('orient');
                    if (mergedOrient.explicit && childOrient.explicit && mergedOrient.value !== childOrient.value) {
                        // TODO: throw warning if resolve is explicit (We don't have info about explicit/implicit resolve yet.)
                        // Cannot merge due to inconsistent orient
                        return undefined;
                    }
                    else {
                        mergedAxisCmpts[i] = mergeAxisComponent(merged, child);
                    }
                }
            }
        }
        else {
            // For first one, return a copy of the child
            return childAxisCmpts.map(axisComponent => axisComponent.clone());
        }
        return mergedAxisCmpts;
    }
    function mergeAxisComponent(merged, child) {
        for (const prop of AXIS_COMPONENT_PROPERTIES) {
            const mergedValueWithExplicit = mergeValuesWithExplicit(merged.getWithExplicit(prop), child.getWithExplicit(prop), prop, 'axis', 
            // Tie breaker function
            (v1, v2) => {
                switch (prop) {
                    case 'title':
                        return mergeTitleComponent(v1, v2);
                    case 'gridScale':
                        return {
                            explicit: v1.explicit,
                            value: getFirstDefined(v1.value, v2.value)
                        };
                }
                return defaultTieBreaker(v1, v2, prop, 'axis');
            });
            merged.setWithExplicit(prop, mergedValueWithExplicit);
        }
        return merged;
    }
    function getFieldDefTitle(model, channel) {
        const channel2 = channel === 'x' ? 'x2' : 'y2';
        const fieldDef = model.fieldDef(channel);
        const fieldDef2 = model.fieldDef(channel2);
        const title1 = fieldDef ? fieldDef.title : undefined;
        const title2 = fieldDef2 ? fieldDef2.title : undefined;
        if (title1 && title2) {
            return mergeTitle(title1, title2);
        }
        else if (title1) {
            return title1;
        }
        else if (title2) {
            return title2;
        }
        else if (title1 !== undefined) {
            // falsy value to disable config
            return title1;
        }
        else if (title2 !== undefined) {
            // falsy value to disable config
            return title2;
        }
        return undefined;
    }
    function isExplicit$1(value, property, axis, model, channel) {
        switch (property) {
            case 'titleAngle':
            case 'labelAngle':
                return value === normalizeAngle(axis[property]);
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
        }
        // Otherwise, things are explicit if the returned value matches the specified property
        return value === axis[property];
    }
    function parseAxis(channel, model) {
        var _a;
        const axis = model.axis(channel);
        const axisComponent = new AxisComponent();
        // 1.2. Add properties
        for (const property of AXIS_COMPONENT_PROPERTIES) {
            const value = getProperty$1(property, axis, channel, model);
            const { configValue = undefined, configFrom = undefined } = isAxisProperty(property)
                ? getAxisConfig(property, model.config, channel, axisComponent.get('orient'), model.getScaleComponent(channel).get('type'), axis.style)
                : {};
            const explicit = isExplicit$1(value, property, axis, model, channel);
            if (value !== undefined && (explicit || configValue === undefined)) {
                // only set property if it is explicitly set or has no config value (otherwise we will accidentally override config)
                axisComponent.set(property, value, explicit);
            }
            else if (
            // Cases that we need to implicit values
            // 1. Grid, orient, and tickCount
            // - Grid is an exception because we need to set grid = true to generate another grid axis
            // - Orient and tickCount are not axis configs in Vega, so we need to set too.
            (contains(['grid', 'orient', 'tickCount'], property) && configValue) ||
                // 2. Conditional axis values and signals
                isConditionalAxisValue(configValue) || // need to set "any" as TS isn't smart enough to figure the generic parameter type yet
                isSignalRef(configValue) ||
                // 3. StyleAxis
                contains(['axisQuantitative', 'axisTemporal', 'style'], configFrom)) {
                // If a config is specified and is conditional, copy conditional value from axis config
                axisComponent.set(property, configValue, false);
            }
        }
        // 2) Add guide encode definition groups
        const axisEncoding = (_a = axis.encoding, (_a !== null && _a !== void 0 ? _a : {}));
        const axisEncode = AXIS_PARTS.reduce((e, part) => {
            var _a;
            if (!axisComponent.hasAxisPart(part)) {
                // No need to create encode for a disabled part.
                return e;
            }
            const axisEncodingPart = guideEncodeEntry((_a = axisEncoding[part], (_a !== null && _a !== void 0 ? _a : {})), model);
            const value = part === 'labels' ? labels$1(model, channel, axisEncodingPart) : axisEncodingPart;
            if (value !== undefined && keys(value).length > 0) {
                e[part] = { update: value };
            }
            return e;
        }, {});
        // FIXME: By having encode as one property, we won't have fine grained encode merging.
        if (keys(axisEncode).length > 0) {
            axisComponent.set('encode', axisEncode, !!axis.encoding || axis.labelAngle !== undefined);
        }
        return axisComponent;
    }
    function getProperty$1(property, specifiedAxis, channel, model) {
        const fieldDef = model.fieldDef(channel);
        // Some properties depend on labelAngle so we have to declare it here.
        // Also, we don't use `getFirstDefined` for labelAngle
        // as we want to normalize specified value to be within [0,360)
        const labelAngle$1 = labelAngle(model, specifiedAxis, channel, fieldDef);
        const orient$1 = getFirstDefined(specifiedAxis.orient, orient(channel));
        const { mark, config } = model;
        switch (property) {
            case 'scale':
                return model.scaleName(channel);
            case 'gridScale':
                return gridScale(model, channel);
            case 'format':
                // We don't include temporal field here as we apply format in encode block
                if (isTimeFormatFieldDef(fieldDef)) {
                    return undefined;
                }
                return numberFormat(fieldDef, specifiedAxis.format, config);
            case 'formatType':
                // As with format, we don't include temporal field here as we apply format in encode block
                if (isTimeFormatFieldDef(fieldDef)) {
                    return undefined;
                }
                return specifiedAxis.formatType;
            case 'grid': {
                if (isBinned(model.fieldDef(channel).bin)) {
                    return false;
                }
                else {
                    const scaleType = model.getScaleComponent(channel).get('type');
                    return getFirstDefined(specifiedAxis.grid, defaultGrid(scaleType, fieldDef));
                }
            }
            case 'labelAlign':
                return getFirstDefined(specifiedAxis.labelAlign, defaultLabelAlign(labelAngle$1, orient$1));
            case 'labelAngle':
                return labelAngle$1;
            case 'labelBaseline':
                return getFirstDefined(specifiedAxis.labelBaseline, defaultLabelBaseline(labelAngle$1, orient$1));
            case 'labelFlush':
                return getFirstDefined(specifiedAxis.labelFlush, defaultLabelFlush(fieldDef, channel));
            case 'labelOverlap': {
                const scaleType = model.getScaleComponent(channel).get('type');
                return getFirstDefined(specifiedAxis.labelOverlap, defaultLabelOverlap(fieldDef, scaleType));
            }
            case 'orient':
                return orient$1;
            case 'tickCount': {
                const scaleType = model.getScaleComponent(channel).get('type');
                const sizeType = channel === 'x' ? 'width' : channel === 'y' ? 'height' : undefined;
                const size = sizeType ? model.getSizeSignalRef(sizeType) : undefined;
                return getFirstDefined(specifiedAxis.tickCount, defaultTickCount({ fieldDef, scaleType, size }));
            }
            case 'title': {
                const channel2 = channel === 'x' ? 'x2' : 'y2';
                const fieldDef2 = model.fieldDef(channel2);
                // Keep undefined so we use default if title is unspecified.
                // For other falsy value, keep them so we will hide the title.
                return getFirstDefined(specifiedAxis.title, getFieldDefTitle(model, channel), // If title not specified, store base parts of fieldDef (and fieldDef2 if exists)
                mergeTitleFieldDefs([toFieldDefBase(fieldDef)], fieldDef2 ? [toFieldDefBase(fieldDef2)] : []));
            }
            case 'values':
                return values(specifiedAxis, model, fieldDef);
            case 'zindex':
                return getFirstDefined(specifiedAxis.zindex, defaultZindex(mark, fieldDef));
        }
        // Otherwise, return specified property.
        return isAxisProperty(property) ? specifiedAxis[property] : undefined;
    }

    function initLayoutSize({ encoding, size }) {
        for (const channel of POSITION_SCALE_CHANNELS) {
            const sizeType = getSizeType(channel);
            const fieldDef = getFieldDef(encoding[channel]);
            if (isStep(size[sizeType])) {
                if (fieldDef) {
                    if (isContinuous(fieldDef)) {
                        delete size[sizeType];
                        warn(message.stepDropped(sizeType));
                    }
                }
            }
        }
        return size;
    }

    function normalizeMarkDef(mark, encoding, config, { graticule }) {
        var _a, _b, _c;
        const markDef = isMarkDef(mark) ? Object.assign({}, mark) : { type: mark };
        // set orient, which can be overridden by rules as sometimes the specified orient is invalid.
        const specifiedOrient = (_a = markDef.orient, (_a !== null && _a !== void 0 ? _a : getMarkConfig('orient', markDef, config)));
        markDef.orient = orient$1(markDef.type, encoding, specifiedOrient);
        if (specifiedOrient !== undefined && specifiedOrient !== markDef.orient) {
            warn(message.orientOverridden(markDef.orient, specifiedOrient));
        }
        if (markDef.type === 'bar' && markDef.orient) {
            const cornerRadiusEnd = (_b = markDef.cornerRadiusEnd, (_b !== null && _b !== void 0 ? _b : getMarkConfig('cornerRadiusEnd', // FIXME: make the typing work with getMarkConfig()
            markDef, config)));
            if (cornerRadiusEnd !== undefined) {
                const newProps = BAR_CORNER_RADIUS_INDEX[markDef.orient];
                for (const newProp of newProps) {
                    markDef[newProp] = cornerRadiusEnd;
                }
                if (markDef.cornerRadiusEnd !== undefined) {
                    delete markDef.cornerRadiusEnd; // no need to keep the original cap cornerRadius
                }
            }
        }
        // set opacity and filled if not specified in mark config
        const specifiedOpacity = getFirstDefined(markDef.opacity, getMarkConfig('opacity', markDef, config));
        if (specifiedOpacity === undefined) {
            markDef.opacity = opacity(markDef.type, encoding);
        }
        const specifiedFilled = markDef.filled;
        if (specifiedFilled === undefined) {
            markDef.filled = graticule ? false : filled(markDef, config);
        }
        // set cursor, which should be pointer if href channel is present unless otherwise specified
        const specifiedCursor = (_c = markDef.cursor, (_c !== null && _c !== void 0 ? _c : getMarkConfig('cursor', markDef, config)));
        if (specifiedCursor === undefined) {
            markDef.cursor = cursor(markDef, encoding, config);
        }
        return markDef;
    }
    function cursor(markDef, encoding, config) {
        if (encoding.href || markDef.href || getMarkConfig('href', markDef, config)) {
            return 'pointer';
        }
        return markDef.cursor;
    }
    function opacity(mark, encoding) {
        if (contains([POINT, TICK, CIRCLE, SQUARE], mark)) {
            // point-based marks
            if (!isAggregate(encoding)) {
                return 0.7;
            }
        }
        return undefined;
    }
    function filled(markDef, config) {
        const filledConfig = getMarkConfig('filled', markDef, config);
        const mark = markDef.type;
        return getFirstDefined(filledConfig, mark !== POINT && mark !== LINE && mark !== RULE);
    }
    function orient$1(mark, encoding, specifiedOrient) {
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
        const { x, y, x2, y2 } = encoding;
        switch (mark) {
            case BAR:
                if (isFieldDef(x) && (isBinned(x.bin) || (isFieldDef(y) && y.aggregate && !x.aggregate))) {
                    return 'vertical';
                }
                if (isFieldDef(y) && (isBinned(y.bin) || (isFieldDef(x) && x.aggregate && !y.aggregate))) {
                    return 'horizontal';
                }
                if (y2 || x2) {
                    // Ranged bar does not always have clear orientation, so we allow overriding
                    if (specifiedOrient) {
                        return specifiedOrient;
                    }
                    // If y is range and x is non-range, non-bin Q, y is likely a prebinned field
                    if (!x2 && isFieldDef(x) && x.type === QUANTITATIVE && !isBinning(x.bin)) {
                        return 'horizontal';
                    }
                    // If x is range and y is non-range, non-bin Q, x is likely a prebinned field
                    if (!y2 && isFieldDef(y) && y.type === QUANTITATIVE && !isBinning(y.bin)) {
                        return 'vertical';
                    }
                }
            // falls through
            case RULE:
                // return undefined for line segment rule and bar with both axis ranged
                if (x2 && y2) {
                    return undefined;
                }
            // falls through
            case AREA:
                // If there are range for both x and y, y (vertical) has higher precedence.
                if (y2) {
                    if (isFieldDef(y) && isBinned(y.bin)) {
                        return 'horizontal';
                    }
                    else {
                        return 'vertical';
                    }
                }
                else if (x2) {
                    if (isFieldDef(x) && isBinned(x.bin)) {
                        return 'vertical';
                    }
                    else {
                        return 'horizontal';
                    }
                }
                else if (mark === RULE) {
                    if (x && !y) {
                        return 'vertical';
                    }
                    else if (y && !x) {
                        return 'horizontal';
                    }
                }
            // falls through
            case LINE:
            case TICK: {
                // Tick is opposite to bar, line, area and never have ranged mark.
                const xIsContinuous = isFieldDef(x) && isContinuous(x);
                const yIsContinuous = isFieldDef(y) && isContinuous(y);
                if (xIsContinuous && !yIsContinuous) {
                    return mark !== 'tick' ? 'horizontal' : 'vertical';
                }
                else if (!xIsContinuous && yIsContinuous) {
                    return mark !== 'tick' ? 'vertical' : 'horizontal';
                }
                else if (xIsContinuous && yIsContinuous) {
                    const xDef = x; // we can cast here since they are surely fieldDef
                    const yDef = y;
                    const xIsTemporal = xDef.type === TEMPORAL;
                    const yIsTemporal = yDef.type === TEMPORAL;
                    // temporal without timeUnit is considered continuous, but better serves as dimension
                    if (xIsTemporal && !yIsTemporal) {
                        return mark !== 'tick' ? 'vertical' : 'horizontal';
                    }
                    else if (!xIsTemporal && yIsTemporal) {
                        return mark !== 'tick' ? 'horizontal' : 'vertical';
                    }
                    if (!xDef.aggregate && yDef.aggregate) {
                        return mark !== 'tick' ? 'vertical' : 'horizontal';
                    }
                    else if (xDef.aggregate && !yDef.aggregate) {
                        return mark !== 'tick' ? 'horizontal' : 'vertical';
                    }
                    if (specifiedOrient) {
                        // When ambiguous, use user specified one.
                        return specifiedOrient;
                    }
                    return 'vertical';
                }
                else {
                    // Discrete x Discrete case
                    if (specifiedOrient) {
                        // When ambiguous, use user specified one.
                        return specifiedOrient;
                    }
                    return undefined;
                }
            }
        }
        return 'vertical';
    }

    const area = {
        vgMark: 'area',
        encodeEntry: (model) => {
            return Object.assign(Object.assign(Object.assign(Object.assign({}, baseEncodeEntry(model, {
                align: 'ignore',
                baseline: 'ignore',
                color: 'include',
                orient: 'include',
                size: 'ignore'
            })), pointOrRangePosition('x', model, {
                defaultPos: 'zeroOrMin',
                defaultPos2: 'zeroOrMin',
                range: model.markDef.orient === 'horizontal'
            })), pointOrRangePosition('y', model, {
                defaultPos: 'zeroOrMin',
                defaultPos2: 'zeroOrMin',
                range: model.markDef.orient === 'vertical'
            })), defined(model));
        }
    };

    const bar = {
        vgMark: 'rect',
        encodeEntry: (model) => {
            return Object.assign(Object.assign(Object.assign({}, baseEncodeEntry(model, {
                align: 'ignore',
                baseline: 'ignore',
                color: 'include',
                orient: 'ignore',
                size: 'ignore'
            })), rectPosition(model, 'x', 'bar')), rectPosition(model, 'y', 'bar'));
        }
    };

    const geoshape = {
        vgMark: 'shape',
        encodeEntry: (model) => {
            return Object.assign({}, baseEncodeEntry(model, {
                align: 'ignore',
                baseline: 'ignore',
                color: 'include',
                size: 'ignore',
                orient: 'ignore'
            }));
        },
        postEncodingTransform: (model) => {
            const { encoding } = model;
            const shapeDef = encoding.shape;
            const transform = Object.assign({ type: 'geoshape', projection: model.projectionName() }, (shapeDef && isFieldDef(shapeDef) && shapeDef.type === GEOJSON
                ? { field: vgField(shapeDef, { expr: 'datum' }) }
                : {}));
            return [transform];
        }
    };

    const image = {
        vgMark: 'image',
        encodeEntry: (model) => {
            return Object.assign(Object.assign(Object.assign(Object.assign({}, baseEncodeEntry(model, {
                align: 'ignore',
                baseline: 'ignore',
                color: 'ignore',
                orient: 'ignore',
                size: 'ignore'
            })), rectPosition(model, 'x', 'image')), rectPosition(model, 'y', 'image')), text(model, 'url'));
        }
    };

    const line = {
        vgMark: 'line',
        encodeEntry: (model) => {
            return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, baseEncodeEntry(model, {
                align: 'ignore',
                baseline: 'ignore',
                color: 'include',
                size: 'ignore',
                orient: 'ignore'
            })), pointPosition('x', model, { defaultPos: 'mid' })), pointPosition('y', model, { defaultPos: 'mid' })), nonPosition('size', model, {
                vgChannel: 'strokeWidth' // VL's line size is strokeWidth
            })), defined(model));
        }
    };
    const trail = {
        vgMark: 'trail',
        encodeEntry: (model) => {
            return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, baseEncodeEntry(model, {
                align: 'ignore',
                baseline: 'ignore',
                color: 'include',
                size: 'include',
                orient: 'ignore'
            })), pointPosition('x', model, { defaultPos: 'mid' })), pointPosition('y', model, { defaultPos: 'mid' })), nonPosition('size', model)), defined(model));
        }
    };

    function encodeEntry(model, fixedShape) {
        const { config } = model;
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, baseEncodeEntry(model, {
            align: 'ignore',
            baseline: 'ignore',
            color: 'include',
            size: 'include',
            orient: 'ignore'
        })), pointPosition('x', model, { defaultPos: 'mid' })), pointPosition('y', model, { defaultPos: 'mid' })), nonPosition('size', model)), shapeMixins(model, config, fixedShape));
    }
    function shapeMixins(model, config, fixedShape) {
        if (fixedShape) {
            return { shape: { value: fixedShape } };
        }
        return nonPosition('shape', model);
    }
    const point$1 = {
        vgMark: 'symbol',
        encodeEntry: (model) => {
            return encodeEntry(model);
        }
    };
    const circle = {
        vgMark: 'symbol',
        encodeEntry: (model) => {
            return encodeEntry(model, 'circle');
        }
    };
    const square = {
        vgMark: 'symbol',
        encodeEntry: (model) => {
            return encodeEntry(model, 'square');
        }
    };

    const rect = {
        vgMark: 'rect',
        encodeEntry: (model) => {
            return Object.assign(Object.assign(Object.assign({}, baseEncodeEntry(model, {
                align: 'ignore',
                baseline: 'ignore',
                color: 'include',
                orient: 'ignore',
                size: 'ignore'
            })), rectPosition(model, 'x', 'rect')), rectPosition(model, 'y', 'rect'));
        }
    };

    const rule = {
        vgMark: 'rule',
        encodeEntry: (model) => {
            const { markDef } = model;
            const orient = markDef.orient;
            if (!model.encoding.x && !model.encoding.y && !model.encoding.latitude && !model.encoding.longitude) {
                // Show nothing if we have none of x, y, lat, and long.
                return {};
            }
            return Object.assign(Object.assign(Object.assign(Object.assign({}, baseEncodeEntry(model, {
                align: 'ignore',
                baseline: 'ignore',
                color: 'include',
                orient: 'ignore',
                size: 'ignore'
            })), pointOrRangePosition('x', model, {
                defaultPos: orient === 'horizontal' ? 'zeroOrMax' : 'mid',
                defaultPos2: 'zeroOrMin',
                range: orient !== 'vertical' // include x2 for horizontal or line segment rule
            })), pointOrRangePosition('y', model, {
                defaultPos: orient === 'vertical' ? 'zeroOrMax' : 'mid',
                defaultPos2: 'zeroOrMin',
                range: orient !== 'horizontal' // include y2 for vertical or line segment rule
            })), nonPosition('size', model, {
                vgChannel: 'strokeWidth' // VL's rule size is strokeWidth
            }));
        }
    };

    const text$1 = {
        vgMark: 'text',
        encodeEntry: (model) => {
            const { config, encoding } = model;
            return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, baseEncodeEntry(model, {
                align: 'include',
                baseline: 'include',
                color: 'include',
                size: 'ignore',
                orient: 'ignore'
            })), pointPosition('x', model, { defaultPos: 'mid' })), pointPosition('y', model, { defaultPos: 'mid' })), text(model)), nonPosition('size', model, {
                vgChannel: 'fontSize' // VL's text size is fontSize
            })), valueIfDefined('align', align(model.markDef, encoding, config))), valueIfDefined('baseline', baseline(model.markDef, encoding, config)));
        }
    };
    function align(markDef, encoding, config) {
        var _a;
        const a = (_a = markDef.align, (_a !== null && _a !== void 0 ? _a : getMarkConfig('align', markDef, config)));
        if (a === undefined) {
            return 'center';
        }
        // If there is a config, Vega-parser will process this already.
        return undefined;
    }
    function baseline(markDef, encoding, config) {
        var _a;
        const b = (_a = markDef.baseline, (_a !== null && _a !== void 0 ? _a : getMarkConfig('baseline', markDef, config)));
        if (b === undefined) {
            return 'middle';
        }
        // If there is a config, Vega-parser will process this already.
        return undefined;
    }

    const tick = {
        vgMark: 'rect',
        encodeEntry: (model) => {
            const { config, markDef } = model;
            const orient = markDef.orient;
            const vgSizeChannel = orient === 'horizontal' ? 'width' : 'height';
            const vgThicknessChannel = orient === 'horizontal' ? 'height' : 'width';
            return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, baseEncodeEntry(model, {
                align: 'ignore',
                baseline: 'ignore',
                color: 'include',
                orient: 'ignore',
                size: 'ignore'
            })), pointPosition('x', model, { defaultPos: 'mid', vgChannel: 'xc' })), pointPosition('y', model, { defaultPos: 'mid', vgChannel: 'yc' })), nonPosition('size', model, {
                defaultValue: defaultSize(model),
                vgChannel: vgSizeChannel
            })), { [vgThicknessChannel]: { value: getFirstDefined(markDef.thickness, config.tick.thickness) } });
        }
    };
    function defaultSize(model) {
        const { config, markDef } = model;
        const { orient } = markDef;
        const vgSizeChannel = orient === 'horizontal' ? 'width' : 'height';
        const scale = model.getScaleComponent(orient === 'horizontal' ? 'x' : 'y');
        const markPropOrConfig = getFirstDefined(markDef[vgSizeChannel], markDef.size, getMarkConfig('size', markDef, config, { vgChannel: vgSizeChannel }), config.tick.bandSize);
        if (markPropOrConfig !== undefined) {
            return markPropOrConfig;
        }
        else {
            const scaleRange = scale ? scale.get('range') : undefined;
            if (scaleRange && isVgRangeStep(scaleRange) && isNumber(scaleRange.step)) {
                return (scaleRange.step * 3) / 4;
            }
            const defaultViewStep = getViewConfigDiscreteStep(config.view, vgSizeChannel);
            return (defaultViewStep * 3) / 4;
        }
    }

    const markCompiler = {
        area,
        bar,
        circle,
        geoshape,
        image,
        line,
        point: point$1,
        rect,
        rule,
        square,
        text: text$1,
        tick,
        trail
    };
    function parseMarkGroups(model) {
        if (contains([LINE, AREA, TRAIL], model.mark)) {
            return parsePathMark(model);
        }
        else if (contains([BAR], model.mark)) {
            return getStackGroups(model);
        }
        else {
            return getMarkGroups(model);
        }
    }
    const FACETED_PATH_PREFIX = 'faceted_path_';
    function parsePathMark(model) {
        const details = pathGroupingFields(model.mark, model.encoding);
        const pathMarks = getMarkGroups(model, {
            // If has subfacet for line/area group, need to use faceted data from below.
            fromPrefix: details.length > 0 ? FACETED_PATH_PREFIX : ''
        });
        if (details.length > 0) {
            // have level of details - need to facet line into subgroups
            // TODO: for non-stacked plot, map order to zindex. (Maybe rename order for layer to zindex?)
            return [
                {
                    name: model.getName('pathgroup'),
                    type: 'group',
                    from: {
                        facet: {
                            name: FACETED_PATH_PREFIX + model.requestDataName(MAIN),
                            data: model.requestDataName(MAIN),
                            groupby: details
                        }
                    },
                    encode: {
                        update: {
                            width: { field: { group: 'width' } },
                            height: { field: { group: 'height' } }
                        }
                    },
                    marks: pathMarks
                }
            ];
        }
        else {
            return pathMarks;
        }
    }
    const STACK_GROUP_PREFIX = 'stack_group_';
    /**
     * We need to put stacked bars into groups in order to enable cornerRadius for stacks.
     * If stack is used and the model doesn't have size encoding, we put the mark into groups,
     * and apply cornerRadius properties at the group.
     */
    function getStackGroups(model) {
        var _a, _b;
        // Don't use nested groups when cornerRadius is not specified, or specified as 0
        const hasCornerRadius = VG_CORNERRADIUS_CHANNELS.some(prop => model.markDef[prop] || getMarkConfig(prop, model.markDef, model.config));
        // Activate groups if stack is used and the model doesn't have size encoding
        if (model.stack && !model.fieldDef('size') && hasCornerRadius) {
            // Generate the mark
            const [mark] = getMarkGroups(model, { fromPrefix: STACK_GROUP_PREFIX });
            // Get the scale for the stacked field
            const fieldScale = model.scaleName(model.stack.fieldChannel);
            const stackField = (opt = {}) => model.vgField(model.stack.fieldChannel, opt);
            // Find the min/max of the pixel value on the stacked direction
            const stackFieldGroup = (func, expr) => {
                const vgFieldMinMax = [
                    stackField({ prefix: 'min', suffix: 'start', expr }),
                    stackField({ prefix: 'max', suffix: 'start', expr }),
                    stackField({ prefix: 'min', suffix: 'end', expr }),
                    stackField({ prefix: 'max', suffix: 'end', expr })
                ];
                return `${func}(${vgFieldMinMax.map(field => `scale('${fieldScale}',${field})`).join(',')})`;
            };
            let groupUpdate;
            let innerGroupUpdate;
            // Build the encoding for group and an inner group
            if (model.stack.fieldChannel === 'x') {
                // Move cornerRadius, y/yc/y2/height properties to group
                // Group x/x2 should be the min/max of the marks within
                groupUpdate = Object.assign(Object.assign({}, pick(mark.encode.update, ['y', 'yc', 'y2', 'height', ...VG_CORNERRADIUS_CHANNELS])), { x: { signal: stackFieldGroup('min', 'datum') }, x2: { signal: stackFieldGroup('max', 'datum') }, clip: { value: true } });
                // Inner group should revert the x translation, and pass height through
                innerGroupUpdate = {
                    x: { field: { group: 'x' }, mult: -1 },
                    height: { field: { group: 'height' } }
                };
                // The marks should use the same height as group, without y/yc/y2 properties (because it's already done by group)
                // This is why size encoding is not supported yet
                mark.encode.update = Object.assign(Object.assign({}, omit(mark.encode.update, ['y', 'yc', 'y2'])), { height: { field: { group: 'height' } } });
            }
            else {
                groupUpdate = Object.assign(Object.assign({}, pick(mark.encode.update, ['x', 'xc', 'x2', 'width'])), { y: { signal: stackFieldGroup('min', 'datum') }, y2: { signal: stackFieldGroup('max', 'datum') }, clip: { value: true } });
                innerGroupUpdate = {
                    y: { field: { group: 'y' }, mult: -1 },
                    width: { field: { group: 'width' } }
                };
                mark.encode.update = Object.assign(Object.assign({}, omit(mark.encode.update, ['x', 'xc', 'x2'])), { width: { field: { group: 'width' } } });
            }
            // Deal with cornerRadius properties
            for (const key of VG_CORNERRADIUS_CHANNELS) {
                const configValue = getMarkConfig(key, model.markDef, model.config);
                // Move from mark to group
                if (mark.encode.update[key]) {
                    groupUpdate[key] = mark.encode.update[key];
                    delete mark.encode.update[key];
                }
                else if (configValue) {
                    groupUpdate[key] = { value: configValue };
                }
                // Overwrite any cornerRadius on mark set by config --- they are already moved to the group
                if (configValue) {
                    mark.encode.update[key] = { value: 0 };
                }
            }
            // For bin and time unit, we have to add bin/timeunit -end channels.
            const groupByField = model.fieldDef(model.stack.groupbyChannel);
            const groupby = vgField(groupByField) ? [vgField(groupByField)] : [];
            if (((_a = groupByField) === null || _a === void 0 ? void 0 : _a.bin) || ((_b = groupByField) === null || _b === void 0 ? void 0 : _b.timeUnit)) {
                groupby.push(vgField(groupByField, { binSuffix: 'end' }));
            }
            const strokeProperties = [
                'stroke',
                'strokeWidth',
                'strokeJoin',
                'strokeCap',
                'strokeDash',
                'strokeDashOffset',
                'strokeMiterLimit',
                'strokeOpacity'
            ];
            // Generate stroke properties for the group
            groupUpdate = strokeProperties.reduce((encode, prop) => {
                if (mark.encode.update[prop]) {
                    return Object.assign(Object.assign({}, encode), { [prop]: mark.encode.update[prop] });
                }
                else {
                    const configValue = getMarkConfig(prop, model.markDef, model.config);
                    if (configValue !== undefined) {
                        return Object.assign(Object.assign({}, encode), { [prop]: { value: configValue } });
                    }
                    else {
                        return encode;
                    }
                }
            }, groupUpdate);
            // Apply strokeForeground and strokeOffset if stroke is used
            if (groupUpdate.stroke) {
                groupUpdate.strokeForeground = { value: true };
                groupUpdate.strokeOffset = { value: 0 };
            }
            return [
                {
                    type: 'group',
                    from: {
                        facet: {
                            data: model.requestDataName(MAIN),
                            name: STACK_GROUP_PREFIX + model.requestDataName(MAIN),
                            groupby,
                            aggregate: {
                                fields: [
                                    stackField({ suffix: 'start' }),
                                    stackField({ suffix: 'start' }),
                                    stackField({ suffix: 'end' }),
                                    stackField({ suffix: 'end' })
                                ],
                                ops: ['min', 'max', 'min', 'max']
                            }
                        }
                    },
                    encode: {
                        update: groupUpdate
                    },
                    marks: [
                        {
                            type: 'group',
                            encode: { update: innerGroupUpdate },
                            marks: [mark]
                        }
                    ]
                }
            ];
        }
        else {
            return getMarkGroups(model);
        }
    }
    function getSort$1(model) {
        const { encoding, stack, mark, markDef, config } = model;
        const order = encoding.order;
        if ((!isArray(order) && isValueDef(order) && isNullOrFalse(order.value)) ||
            (!order && isNullOrFalse(markDef.order)) ||
            isNullOrFalse(getMarkConfig('order', markDef, config))) {
            return undefined;
        }
        else if ((isArray(order) || isFieldDef(order)) && !stack) {
            // Sort by the order field if it is specified and the field is not stacked. (For stacked field, order specify stack order.)
            return sortParams(order, { expr: 'datum' });
        }
        else if (isPathMark(mark)) {
            // For both line and area, we sort values based on dimension by default
            const dimensionChannel = markDef.orient === 'horizontal' ? 'y' : 'x';
            const dimensionChannelDef = encoding[dimensionChannel];
            if (isFieldDef(dimensionChannelDef)) {
                const s = dimensionChannelDef.sort;
                if (isArray(s)) {
                    return {
                        field: vgField(dimensionChannelDef, { prefix: dimensionChannel, suffix: 'sort_index', expr: 'datum' })
                    };
                }
                else if (isSortField(s)) {
                    return {
                        field: vgField({
                            // FIXME: this op might not already exist?
                            // FIXME: what if dimensionChannel (x or y) contains custom domain?
                            aggregate: isAggregate(model.encoding) ? s.op : undefined,
                            field: s.field
                        }, { expr: 'datum' })
                    };
                }
                else if (isSortByEncoding(s)) {
                    const fieldDefToSort = model.fieldDef(s.encoding);
                    return {
                        field: vgField(fieldDefToSort, { expr: 'datum' }),
                        order: s.order
                    };
                }
                else {
                    return {
                        field: vgField(dimensionChannelDef, {
                            // For stack with imputation, we only have bin_mid
                            binSuffix: model.stack && model.stack.impute ? 'mid' : undefined,
                            expr: 'datum'
                        })
                    };
                }
            }
            return undefined;
        }
        return undefined;
    }
    function getMarkGroups(model, opt = { fromPrefix: '' }) {
        const mark = model.mark;
        const clip = getFirstDefined(model.markDef.clip, scaleClip(model), projectionClip(model));
        const style = getStyles(model.markDef);
        const key = model.encoding.key;
        const sort = getSort$1(model);
        const interactive = interactiveFlag(model);
        const postEncodingTransform = markCompiler[mark].postEncodingTransform
            ? markCompiler[mark].postEncodingTransform(model)
            : null;
        return [
            Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ name: model.getName('marks'), type: markCompiler[mark].vgMark }, (clip ? { clip: true } : {})), (style ? { style } : {})), (key ? { key: key.field } : {})), (sort ? { sort } : {})), (interactive ? interactive : {})), { from: { data: opt.fromPrefix + model.requestDataName(MAIN) }, encode: {
                    update: markCompiler[mark].encodeEntry(model)
                } }), (postEncodingTransform
                ? {
                    transform: postEncodingTransform
                }
                : {}))
        ];
    }
    /**
     * If scales are bound to interval selections, we want to automatically clip
     * marks to account for panning/zooming interactions. We identify bound scales
     * by the selectionExtent property, which gets added during scale parsing.
     */
    function scaleClip(model) {
        const xScale = model.getScaleComponent('x');
        const yScale = model.getScaleComponent('y');
        return (xScale && xScale.get('selectionExtent')) || (yScale && yScale.get('selectionExtent')) ? true : undefined;
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
        if (!model.component.selection)
            return null;
        const unitCount = keys(model.component.selection).length;
        let parentCount = unitCount;
        let parent = model.parent;
        while (parent && parentCount === 0) {
            parentCount = keys(parent.component.selection).length;
            parent = parent.parent;
        }
        return parentCount ? { interactive: unitCount > 0 } : null;
    }

    /**
     * Internal model of Vega-Lite specification for the compiler.
     */
    class UnitModel extends ModelWithField {
        constructor(spec, parent, parentGivenName, parentGivenSize = {}, repeater, config) {
            var _a;
            super(spec, 'unit', parent, parentGivenName, config, repeater, undefined, isFrameMixins(spec) ? spec.view : undefined);
            this.specifiedScales = {};
            this.specifiedAxes = {};
            this.specifiedLegends = {};
            this.specifiedProjection = {};
            this.selection = {};
            this.children = [];
            const mark = isMarkDef(spec.mark) ? spec.mark.type : spec.mark;
            const encodingWithRepeaterReplaced = replaceRepeaterInEncoding((_a = spec.encoding, (_a !== null && _a !== void 0 ? _a : {})), repeater);
            this.markDef = normalizeMarkDef(spec.mark, encodingWithRepeaterReplaced, config, {
                graticule: spec.data && isGraticuleGenerator(spec.data)
            });
            const encoding = (this.encoding = normalizeEncoding(encodingWithRepeaterReplaced, this.markDef));
            this.size = initLayoutSize({
                encoding,
                size: isFrameMixins(spec)
                    ? Object.assign(Object.assign(Object.assign({}, parentGivenSize), (spec.width ? { width: spec.width } : {})), (spec.height ? { height: spec.height } : {})) : parentGivenSize
            });
            // calculate stack properties
            this.stack = stack(mark, encoding);
            this.specifiedScales = this.initScales(mark, encoding);
            this.specifiedAxes = this.initAxes(encoding);
            this.specifiedLegends = this.initLegend(encoding);
            this.specifiedProjection = spec.projection;
            // Selections will be initialized upon parse.
            this.selection = spec.selection;
        }
        get hasProjection() {
            const { encoding } = this;
            const isGeoShapeMark = this.mark === GEOSHAPE;
            const hasGeoPosition = encoding && GEOPOSITION_CHANNELS.some(channel => isFieldDef(encoding[channel]));
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
                let fieldDef;
                let specifiedScale;
                const channelDef = encoding[channel];
                if (isFieldDef(channelDef)) {
                    fieldDef = channelDef;
                    specifiedScale = channelDef.scale;
                }
                else if (hasConditionalFieldDef(channelDef)) {
                    // Need to specify generic for hasConditionalFieldDef as the value type can vary across channels
                    fieldDef = channelDef.condition;
                    specifiedScale = channelDef.condition['scale'];
                }
                if (fieldDef) {
                    scales[channel] = (specifiedScale !== null && specifiedScale !== void 0 ? specifiedScale : {});
                }
                return scales;
            }, {});
        }
        initAxes(encoding) {
            return [X, Y].reduce((_axis, channel) => {
                // Position Axis
                // TODO: handle ConditionFieldDef
                const channelDef = encoding[channel];
                if (isFieldDef(channelDef) ||
                    (channel === X && isFieldDef(encoding.x2)) ||
                    (channel === Y && isFieldDef(encoding.y2))) {
                    const axisSpec = isFieldDef(channelDef) ? channelDef.axis : null;
                    if (axisSpec !== null) {
                        _axis[channel] = Object.assign({}, axisSpec);
                    }
                }
                return _axis;
            }, {});
        }
        initLegend(encoding) {
            return NONPOSITION_SCALE_CHANNELS.reduce((_legend, channel) => {
                const channelDef = encoding[channel];
                if (channelDef) {
                    const legend = isFieldDef(channelDef)
                        ? channelDef.legend
                        : hasConditionalFieldDef(channelDef) // Need to specify generic for hasConditionalFieldDef as the value type can vary across channels
                            ? channelDef.condition['legend']
                            : null;
                    if (legend !== null && legend !== false && supportLegend(channel)) {
                        _legend[channel] = Object.assign({}, legend);
                    }
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
            var _a;
            let marks = (_a = this.component.mark, (_a !== null && _a !== void 0 ? _a : []));
            // If this unit is part of a layer, selections should augment
            // all in concert rather than each unit individually. This
            // ensures correct interleaving of clipping and brushed marks.
            if (!this.parent || !isLayerModel(this.parent)) {
                marks = assembleUnitSelectionMarks(this, marks);
            }
            return marks.map(this.correctDataNames);
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
            return getTypedFieldDef(channelDef);
        }
    }

    class LayerModel extends Model {
        constructor(spec, parent, parentGivenName, parentGivenSize, repeater, config) {
            super(spec, 'layer', parent, parentGivenName, config, repeater, spec.resolve, spec.view);
            const layoutSize = Object.assign(Object.assign(Object.assign({}, parentGivenSize), (spec.width ? { width: spec.width } : {})), (spec.height ? { height: spec.height } : {}));
            this.children = spec.layer.map((layer, i) => {
                if (isLayerSpec(layer)) {
                    return new LayerModel(layer, this, this.getName('layer_' + i), layoutSize, repeater, config);
                }
                else if (isUnitSpec(layer)) {
                    return new UnitModel(layer, this, this.getName('layer_' + i), layoutSize, repeater, config);
                }
                throw new Error(message.invalidSpec(layer));
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
                keys(child.component.selection).forEach(key => {
                    this.component.selection[key] = child.component.selection[key];
                });
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
        }
        // TODO: Support same named selections across children.
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
        assembleTitle() {
            let title = super.assembleTitle();
            if (title) {
                return title;
            }
            // If title does not provide layer, look into children
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

    class RepeatModel extends BaseConcatModel {
        constructor(spec, parent, parentGivenName, repeatValues, config) {
            super(spec, 'repeat', parent, parentGivenName, config, repeatValues, spec.resolve);
            if (spec.resolve && spec.resolve.axis && (spec.resolve.axis.x === 'shared' || spec.resolve.axis.y === 'shared')) {
                warn(message.REPEAT_CANNOT_SHARE_AXIS);
            }
            this.repeat = spec.repeat;
            this.children = this._initChildren(spec, this.repeat, repeatValues, config);
        }
        _initChildren(spec, repeat, repeater, config) {
            const children = [];
            const row = (!isArray(repeat) && repeat.row) || [repeater ? repeater.row : null];
            const column = (!isArray(repeat) && repeat.column) || [repeater ? repeater.column : null];
            const repeatValues = (isArray(repeat) && repeat) || [repeater ? repeater.repeat : null];
            // cross product
            for (const repeatValue of repeatValues) {
                for (const rowValue of row) {
                    for (const columnValue of column) {
                        const name = (repeatValue ? `__repeat_repeat_${repeatValue}` : '') +
                            (rowValue ? `__repeat_row_${rowValue}` : '') +
                            (columnValue ? `__repeat_column_${columnValue}` : '');
                        const childRepeat = {
                            repeat: repeatValue,
                            row: rowValue,
                            column: columnValue
                        };
                        children.push(buildModel(spec.spec, this, this.getName('child' + name), undefined, childRepeat, config));
                    }
                }
            }
            return children;
        }
        parseLayoutSize() {
            parseRepeatLayoutSize(this);
        }
        assembleDefaultLayout() {
            const { repeat } = this;
            const columns = isArray(repeat) ? undefined : repeat.column ? repeat.column.length : 1;
            return Object.assign(Object.assign({}, (columns ? { columns } : {})), { bounds: 'full', align: 'all' });
        }
    }

    function buildModel(spec, parent, parentGivenName, unitSize, repeater, config) {
        if (isFacetSpec(spec)) {
            return new FacetModel(spec, parent, parentGivenName, repeater, config);
        }
        else if (isLayerSpec(spec)) {
            return new LayerModel(spec, parent, parentGivenName, unitSize, repeater, config);
        }
        else if (isUnitSpec(spec)) {
            return new UnitModel(spec, parent, parentGivenName, unitSize, repeater, config);
        }
        else if (isRepeatSpec(spec)) {
            return new RepeatModel(spec, parent, parentGivenName, repeater, config);
        }
        else if (isAnyConcatSpec(spec)) {
            return new ConcatModel(spec, parent, parentGivenName, repeater, config);
        }
        throw new Error(message.invalidSpec(spec));
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
    function compile(inputSpec, opt = {}) {
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
            const config = initConfig(mergeConfig(opt.config, inputSpec.config));
            // 2. Normalize: Convert input spec -> normalized spec
            // - Decompose all extended unit specs into composition of unit spec. For example, a box plot get expanded into multiple layers of bars, ticks, and rules. The shorthand row/column channel is also expanded to a facet spec.
            // - Normalize autosize and width or height spec
            const spec = normalize$2(inputSpec, config);
            // 3. Build Model: normalized spec -> Model (a tree structure)
            // This phases instantiates the models with default config by doing a top-down traversal. This allows us to pass properties that child models derive from their parents via their constructors.
            // See the abstract `Model` class and its children (UnitModel, LayerModel, FacetModel, RepeatModel, ConcatModel) for different types of models.
            const model = buildModel(spec, null, '', undefined, undefined, config);
            // 4 Parse: Model --> Model with components
            // Note that components = intermediate representations that are equivalent to Vega specs.
            // We need these intermediate representation because we need to merge many visualization "components" like projections, scales, axes, and legends.
            // We will later convert these components into actual Vega specs in the assemble phase.
            // In this phase, we do a bottom-up traversal over the whole tree to
            // parse for each type of components once (e.g., data, layout, mark, scale).
            // By doing bottom-up traversal, we start parsing components of unit specs and
            // then merge child components of parent composite specs.
            //
            // Please see inside model.parse() for order of different components parsed.
            model.parse();
            // draw(model.component.data.sources);
            // 5. Optimize the dataflow. This will modify the data component of the model.
            optimizeDataflow(model.component.data, model);
            // 6. Assemble: convert model components --> Vega Spec.
            const vgSpec = assembleTopLevelModel(model, getTopLevelProperties(inputSpec, spec.autosize, config, model), inputSpec.datasets, inputSpec.usermeta);
            return {
                spec: vgSpec,
                normalized: spec
            };
        }
        finally {
            // Reset the singleton logger if a logger is provided
            if (opt.logger) {
                reset();
            }
            // Reset the singleton field title formatter if provided
            if (opt.fieldTitle) {
                resetTitleFormatter();
            }
        }
    }
    function getTopLevelProperties(inputSpec, autosize, config, model) {
        const width = model.component.layoutSize.get('width');
        const height = model.component.layoutSize.get('height');
        if (autosize === undefined) {
            autosize = { type: 'pad' };
        }
        else if (isString(autosize)) {
            autosize = { type: autosize };
        }
        if (width && height && isFitType(autosize.type)) {
            if (width === 'step' && height === 'step') {
                warn(message.droppingFit());
                autosize.type = 'pad';
            }
            else if (width === 'step' || height === 'step') {
                // effectively XOR, because else if
                // get step dimension
                const sizeType = width === 'step' ? 'width' : 'height';
                // log that we're dropping fit for respective channel
                warn(message.droppingFit(getPositionScaleChannel(sizeType)));
                // setting type to inverse fit (so if we dropped fit-x, type is now fit-y)
                const inverseSizeType = sizeType === 'width' ? 'height' : 'width';
                autosize.type = getFitType(inverseSizeType);
            }
        }
        return Object.assign(Object.assign(Object.assign({}, (keys(autosize).length === 1 && autosize.type
            ? autosize.type === 'pad'
                ? {}
                : { autosize: autosize.type }
            : { autosize })), extractTopLevelProperties(config)), extractTopLevelProperties(inputSpec));
    }
    /*
     * Assemble the top-level model to a Vega spec.
     *
     * Note: this couldn't be `model.assemble()` since the top-level model
     * needs some special treatment to generate top-level properties.
     */
    function assembleTopLevelModel(model, topLevelProperties, datasets = {}, usermeta) {
        // Config with Vega-Lite only config removed.
        const vgConfig = model.config ? stripAndRedirectConfig(model.config) : undefined;
        const data = [].concat(model.assembleSelectionData([]), 
        // only assemble data in the root
        assembleRootData(model.component.data, datasets));
        const projections = model.assembleProjections();
        const title = model.assembleTitle();
        const style = model.assembleGroupStyle();
        const encodeEntry = model.assembleGroupEncodeEntry(true);
        let layoutSignals = model.assembleLayoutSignals();
        // move width and height signals with values to top level
        layoutSignals = layoutSignals.filter(signal => {
            if ((signal.name === 'width' || signal.name === 'height') && signal.value !== undefined) {
                topLevelProperties[signal.name] = +signal.value;
                return false;
            }
            return true;
        });
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ $schema: 'https://vega.github.io/schema/vega/v5.json' }, (model.description ? { description: model.description } : {})), topLevelProperties), (title ? { title } : {})), (style ? { style } : {})), (encodeEntry ? { encode: { update: encodeEntry } } : {})), { data }), (projections.length > 0 ? { projections: projections } : {})), model.assembleGroup([...layoutSignals, ...model.assembleSelectionTopLevelSignals([])])), (vgConfig ? { config: vgConfig } : {})), (usermeta ? { usermeta } : {}));
    }

    class TransformExtractMapper extends SpecMapper {
        mapUnit(spec, { config }) {
            if (spec.encoding) {
                const { encoding: oldEncoding, transform: oldTransforms } = spec;
                const { bins, timeUnits, aggregate, groupby, encoding } = extractTransformsFromEncoding(oldEncoding, config);
                const transform = [
                    ...(oldTransforms ? oldTransforms : []),
                    ...bins,
                    ...timeUnits,
                    ...(aggregate.length === 0 ? [] : [{ aggregate, groupby }])
                ];
                return Object.assign(Object.assign(Object.assign({}, spec), (transform.length > 0 ? { transform } : {})), { encoding });
            }
            else {
                return spec;
            }
        }
    }
    const extractor = new TransformExtractMapper();
    /**
     * Modifies spec extracting transformations from encoding and moving them to the transforms array
     */
    function extractTransforms(spec, config) {
        return extractor.map(spec, { config });
    }

    const version$1 = pkg.version;

    exports.compile = compile;
    exports.extractTransforms = extractTransforms;
    exports.normalize = normalize$2;
    exports.version = version$1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vega-lite.js.map
