var eruda =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _EntryBtn = __webpack_require__(1);

	var _EntryBtn2 = _interopRequireDefault(_EntryBtn);

	var _DevTools = __webpack_require__(16);

	var _DevTools2 = _interopRequireDefault(_DevTools);

	var _Console = __webpack_require__(24);

	var _Console2 = _interopRequireDefault(_Console);

	var _Network = __webpack_require__(40);

	var _Network2 = _interopRequireDefault(_Network);

	var _Elements = __webpack_require__(45);

	var _Elements2 = _interopRequireDefault(_Elements);

	var _Snippets = __webpack_require__(56);

	var _Snippets2 = _interopRequireDefault(_Snippets);

	var _Resources = __webpack_require__(61);

	var _Resources2 = _interopRequireDefault(_Resources);

	var _Info = __webpack_require__(65);

	var _Info2 = _interopRequireDefault(_Info);

	var _Features = __webpack_require__(70);

	var _Features2 = _interopRequireDefault(_Features);

	var _Sources = __webpack_require__(76);

	var _Sources2 = _interopRequireDefault(_Sources);

	var _Settings = __webpack_require__(84);

	var _Settings2 = _interopRequireDefault(_Settings);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _config = __webpack_require__(8);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(88);
	__webpack_require__(90);
	__webpack_require__(92);

	var $container;

	appendContainer();

	var devTools = new _DevTools2.default($container);

	var homeBtn = new _EntryBtn2.default($container);

	homeBtn.on('click', function () {
	    return devTools.toggle();
	});

	var consoleTool = new _Console2.default(),
	    network = new _Network2.default(),
	    elements = new _Elements2.default(),
	    snippets = new _Snippets2.default(),
	    resources = new _Resources2.default(),
	    info = new _Info2.default(),
	    sources = new _Sources2.default(),
	    features = new _Features2.default(),
	    settings = new _Settings2.default();

	devTools.add(consoleTool).add(elements).add(network).add(resources).add(info).add(snippets).add(sources).add(features).add(settings).showTool('console');

	settings.separator().add(devTools.config, 'activeEruda', 'Always Activated').separator().add(homeBtn.config, 'rememberPos', 'Remember Entry Button Position').separator().add(devTools.config, 'transparent', 'Transparent').add(devTools.config, 'halfScreen', 'Half Screen Size').separator().add(consoleTool.config, 'catchGlobalErr', 'Catch Global Errors').add(consoleTool.config, 'overrideConsole', 'Override Console').separator().add(network.config, 'overrideXhr', 'Catch Ajax Requests');

	function appendContainer() {
	    if (eruda) eruda.destroy();

	    var containerNode = document.createElement('div');
	    containerNode.id = 'eruda';
	    containerNode.className = 'eruda-container';
	    document.documentElement.appendChild(containerNode);
	    $container = _util2.default.$(containerNode);
	}

	module.exports = {
	    get: function get(name) {
	        return _util2.default.isUndef(name) ? devTools : devTools.get(name);
	    },
	    add: function add(tool) {
	        devTools.add(tool);

	        return this;
	    },
	    remove: function remove(name) {
	        devTools.remove(name);

	        return this;
	    },
	    show: function show(name) {
	        _util2.default.isUndef(name) ? devTools.show() : devTools.showTool(name);

	        return this;
	    },
	    destroy: function destroy() {
	        devTools.destroy();
	        $container.remove();
	        window.eruda = undefined;
	    },

	    config: _config2.default,
	    util: _util2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _draggabilly = __webpack_require__(3);

	var _draggabilly2 = _interopRequireDefault(_draggabilly);

	var _config = __webpack_require__(8);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(10);

	var HomeBtn = function (_util$Emitter) {
	    _inherits(HomeBtn, _util$Emitter);

	    function HomeBtn($parent) {
	        _classCallCheck(this, HomeBtn);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HomeBtn).call(this));

	        _this._$parent = $parent;

	        _this._appendTpl();
	        _this._makeDraggable();
	        _this._initConfig();
	        _this._setPos();
	        _this._bindEvent();
	        return _this;
	    }

	    _createClass(HomeBtn, [{
	        key: '_appendTpl',
	        value: function _appendTpl() {
	            var $parent = this._$parent;

	            $parent.append(__webpack_require__(14)());

	            this._$el = $parent.find('.eruda-home-btn');
	        }
	    }, {
	        key: '_setPos',
	        value: function _setPos(orientationChanged) {
	            var cfg = this.config,
	                pos = cfg.get('pos'),
	                defPost = getDefPos();

	            var outOfRange = pos.x > defPost.x + 10 || pos.y > defPost.y + 10;

	            if (outOfRange || !cfg.get('rememberPos') || orientationChanged) {
	                pos = defPost;
	            }

	            this._$el.css({
	                left: pos.x,
	                top: pos.y
	            });

	            cfg.set('pos', pos);
	        }
	    }, {
	        key: '_bindEvent',
	        value: function _bindEvent() {
	            var _this2 = this;

	            var draggabilly = this._draggabilly,
	                $el = this._$el;

	            draggabilly.on('staticClick', function () {
	                return _this2.emit('click');
	            }).on('dragStart', function () {
	                return $el.addClass('eruda-active');
	            });

	            draggabilly.on('dragEnd', function () {
	                var cfg = _this2.config;

	                if (cfg.get('rememberPos')) {
	                    cfg.set('pos', {
	                        x: _util2.default.toNum(_this2._$el.css('left').replace('px', '')),
	                        y: _util2.default.toNum(_this2._$el.css('top').replace('px', ''))
	                    });
	                }

	                $el.rmClass('eruda-active');
	            });

	            _util2.default.orientation.on('change', function () {
	                return _this2._setPos(true);
	            });
	        }
	    }, {
	        key: '_makeDraggable',
	        value: function _makeDraggable() {
	            this._draggabilly = new _draggabilly2.default(this._$el.get(0), {
	                containment: true
	            });
	        }
	    }, {
	        key: '_initConfig',
	        value: function _initConfig() {
	            var cfg = this.config = _config2.default.create('eruda-home-button');

	            cfg.set(_util2.default.defaults(cfg.get(), {
	                rememberPos: true,
	                pos: getDefPos()
	            }));
	        }
	    }]);

	    return HomeBtn;
	}(_util2.default.Emitter);

	exports.default = HomeBtn;
	;

	function getDefPos() {
	    var wh = window.innerHeight,
	        ww = window.innerWidth;

	    return {
	        x: ww - 50,
	        y: wh - 50
	    };
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	// Built by eustia.
	module.exports = (function ()
	{
	        var _ = {};

	    /* ------------------------------ last ------------------------------ */

	    var last = _.last = (function (exports)
	    {
	        /* Get the last element of array.
	         *
	         * |Name  |Type |Desc                     |
	         * |--------------------------------------|
	         * |arr   |array|The array to query       |
	         * |return|*    |The last element of array|
	         *
	         * ```javascript
	         * last([1, 2]); // -> 2
	         * ```
	         */

	        exports = function (arr)
	        {
	            var len = arr ? arr.length : 0;

	            if (len) return arr[len - 1];
	        };

	        return exports;
	    })({});

	    /* ------------------------------ isUndef ------------------------------ */

	    var isUndef = _.isUndef = (function (exports)
	    {
	        /* Check if value is undefined.
	         *
	         * |Name  |Type   |Desc                      |
	         * |-----------------------------------------|
	         * |val   |*      |The value to check        |
	         * |return|boolean|True if value is undefined|
	         *
	         * ```javascript
	         * isUndef(void 0); // -> true
	         * isUndef(null); // -> false
	         * ```
	         */

	        exports = function (val)
	        {
	            return val === void 0;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ isObj ------------------------------ */

	    var isObj = _.isObj = (function (exports)
	    {
	        /* Check if value is the language type of Object.
	         *
	         * |Name  |Type   |Desc                      |
	         * |-----------------------------------------|
	         * |val   |*      |The value to check        |
	         * |return|boolean|True if value is an object|
	         *
	         * [Language Spec](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	         *
	         * ```javascript
	         * isObj({}); // -> true
	         * isObj([]); // -> true
	         * ```
	         */

	        exports = function (val)
	        {
	            var type = typeof val;

	            return !!val && (type === 'function' || type === 'object');
	        };

	        return exports;
	    })({});

	    /* ------------------------------ inherits ------------------------------ */

	    var inherits = _.inherits = (function (exports)
	    {
	        /* Inherit the prototype methods from one constructor into another.
	         *
	         * |Name      |Type    |Desc       |
	         * |-------------------------------|
	         * |Class     |function|Child Class|
	         * |SuperClass|function|Super Class|
	         *
	         * ```javascript
	         * function People(name)
	         * {
	         *     this._name = name;
	         * }
	         * People.prototype = {
	         *     getName: function ()
	         *     {
	         *         return this._name;
	         *     }
	         * };
	         * function Student(name)
	         * {
	         *     this._name = name;
	         * }
	         * inherits(Student, People);
	         * var s = new Student('RedHood');
	         * s.getName(); // -> 'RedHood'
	         * ```
	         */

	        var objCreate = Object.create;

	        function noop() {}

	        exports = function (Class, SuperClass)
	        {
	            if (objCreate) return Class.prototype = objCreate(SuperClass.prototype);

	            noop.prototype  = SuperClass.prototype;
	            Class.prototype = new noop();
	        };

	        return exports;
	    })({});

	    /* ------------------------------ has ------------------------------ */

	    var has = _.has = (function (exports)
	    {
	        /* Checks if key is a direct property.
	         *
	         * |Name  |Type   |Desc                            |
	         * |-----------------------------------------------|
	         * |obj   |object |The object to query             |
	         * |key   |string |The path to check               |
	         * |return|boolean|True if key is a direct property|
	         *
	         * ```javascript
	         * has({one: 1}, 'one'); // -> true
	         * ```
	         */

	        var hasOwnProp = Object.prototype.hasOwnProperty;

	        exports = function (obj, key)
	        {
	            return hasOwnProp.call(obj, key);
	        };

	        return exports;
	    })({});

	    /* ------------------------------ slice ------------------------------ */

	    var slice = _.slice = (function (exports)
	    {
	        // TODO

	        var arrProto = Array.prototype;

	        exports = function (arr, start, end)
	        {
	            return arrProto.slice.call(arr, start, end);
	        };

	        return exports;
	    })({});

	    /* ------------------------------ allKeys ------------------------------ */

	    var allKeys = _.allKeys = (function (exports)
	    {
	        /* Retrieve all the names of object's own and inherited properties.
	         *
	         * |Name  |Type  |Desc                           |
	         * |---------------------------------------------|
	         * |obj   |object|The object to query            |
	         * |return|array |The array of all property names|
	         *
	         * > Members of Object's prototype won't be retrieved.
	         *
	         * ```javascript
	         * var obj = Object.create({zero: 0});
	         * obj.one = 1;
	         * allKeys(obj) // -> ['zero', 'one']
	         * ```
	         */

	        exports = function (obj)
	        {
	            var ret = [], key;

	            for (key in obj) ret.push(key);

	            return ret;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ splitCase ------------------------------ */

	    var splitCase = _.splitCase = (function (exports)
	    {
	        /* Split different string case to an array.
	         *
	         * |Name  |Type  |Desc           |
	         * |-----------------------------|
	         * |str   |string|String to split|
	         * |return|array |Result array   |
	         *
	         * ```javascript
	         * splitCase('foo-bar'); // -> ['foo', 'bar']
	         * splitCase('foo bar'); // -> ['foo', 'bar']
	         * splitCase('foo_bar'); // -> ['foo', 'bar']
	         * splitCase('foo.bar'); // -> ['foo', 'bar']
	         * splitCase('fooBar'); // -> ['foo', 'bar']
	         * splitCase('foo-Bar'); // -> ['foo', 'bar']
	         * ```
	         */

	        var regUpperCase = /([A-Z])/g,
	            regSeparator = /[_.\- ]+/g,
	            regTrim = /(^-)|(-$)/g;

	        function exports(str)
	        {
	            str = str.replace(regUpperCase, '-$1')
	                     .toLowerCase()
	                     .replace(regSeparator, '-')
	                     .replace(regTrim, '');

	            return str.split('-');
	        }

	        return exports;
	    })({});

	    /* ------------------------------ camelCase ------------------------------ */

	    var camelCase = _.camelCase = (function (exports)
	    {
	        /* Convert string to "camelCase".
	         *
	         * |Name  |Type  |Desc              |
	         * |--------------------------------|
	         * |str   |string|String to convert |
	         * |return|string|Camel cased string|
	         *
	         * ```javascript
	         * camelCase('foo-bar'); // -> fooBar
	         * camelCase('foo bar'); // -> fooBar
	         * camelCase('foo_bar'); // -> fooBar
	         * camelCase('foo.bar'); // -> fooBar
	         * ```
	         */

	        function exports(str)
	        {
	            var arr = splitCase(str);

	            var ret = arr[0];
	            arr.shift();

	            arr.forEach(capitalize, arr);
	            ret += arr.join('');

	            return ret;
	        }

	        function capitalize(val, idx)
	        {
	            this[idx] = val.replace(/\w/, function (match)
	            {
	                return match.toUpperCase();
	            });
	        }

	        return exports;
	    })({});

	    /* ------------------------------ kebabCase ------------------------------ */

	    var kebabCase = _.kebabCase = (function (exports)
	    {
	        /* Convert string to "kebabCase".
	         *
	         * |Name  |Type  |Desc              |
	         * |--------------------------------|
	         * |str   |string|String to convert |
	         * |return|string|Kebab cased string|
	         *
	         * ```javascript
	         * kebabCase('fooBar'); // -> foo-bar
	         * kebabCase('foo bar'); // -> foo-bar
	         * kebabCase('foo_bar'); // -> foo-bar
	         * kebabCase('foo.bar'); // -> foo-bar
	         * ```
	         */

	        function exports(str)
	        {
	            return splitCase(str).join('-');
	        }

	        return exports;
	    })({});

	    /* ------------------------------ idxOf ------------------------------ */

	    var idxOf = _.idxOf = (function (exports)
	    {
	        /* Get the index at which the first occurrence of value.
	         *
	         * |Name       |Type  |Desc                |
	         * |---------------------------------------|
	         * |arr        |array |Array to search     |
	         * |val        |*     |Value to search for |
	         * |[fromIdx=0]|number|Index to search from|
	         *
	         * ```javascript
	         * idxOf([1, 2, 1, 2], 2, 2); // -> 3
	         * ```
	         */

	        exports = function (arr, val, fromIdx)
	        {
	            return Array.prototype.indexOf.call(arr, val);
	        };

	        return exports;
	    })({});

	    /* ------------------------------ keys ------------------------------ */

	    var keys = _.keys = (function (exports)
	    {
	        /* Create an array of the own enumerable property names of object.
	         *
	         * |Name  |Type  |Desc                       |
	         * |-----------------------------------------|
	         * |obj   |object|The object to query        |
	         * |return|array |The array of property names|
	         */

	        exports = Object.keys || function (obj)
	        {
	            var ret = [], key;

	            for (key in obj)
	            {
	                if (has(obj, key)) ret.push(key);
	            }

	            return ret;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ escape ------------------------------ */

	    var escape = _.escape = (function (exports)
	    {
	        /* Escapes a string for insertion into HTML, replacing &, <, >, ", `, and ' characters.
	         *
	         * |Name  |Type  |Desc            |
	         * |------------------------------|
	         * |str   |string|String to escape|
	         * |return|string|Escaped string  |
	         *
	         * ```javascript
	         * escape('You & Me'); -> // -> 'You &amp; Me'
	         * ```
	         */

	        function exports(str)
	        {
	            return regTest.test(str) ? str.replace(regReplace, replaceFn) : str;
	        }

	        var MAP = exports.MAP = {
	            '&': '&amp;',
	            '<': '&lt;',
	            '>': '&gt;',
	            '"': '&quot;',
	            "'": '&#x27;',
	            '`': '&#x60;'
	        };

	        var regSrc = '(?:' + keys(MAP).join('|') + ')',
	            regTest = new RegExp(regSrc),
	            regReplace = new RegExp(regSrc, 'g');

	        function replaceFn(match)
	        {
	            return MAP[match];
	        }

	        return exports;
	    })({});

	    /* ------------------------------ escapeRegExp ------------------------------ */

	    var escapeRegExp = _.escapeRegExp = (function (exports)
	    {
	        /* Escape special chars to be used as literals in RegExp constructors.
	         *
	         * |Name  |Type  |Desc            |
	         * |------------------------------|
	         * |str   |string|string to escape|
	         * |return|string|Escaped string  |
	         *
	         * ```javascript
	         * escapeRegExp('[eris]'); // -> '\\[eris\\]'
	         * ```
	         */

	        function exports(str)
	        {
	            return str.replace(/\W/g, '\\$&');
	        }

	        return exports;
	    })({});

	    /* ------------------------------ evalCss ------------------------------ */

	    var evalCss = _.evalCss = (function (exports)
	    {
	        /* Load css into page.
	         *
	         * |Name|Type|Desc|
	         * |--------------|
	         * |css|string|Css code|
	         *
	         * ```javascript
	         * evalCss('body{background:#08c}');
	         * ```
	         */

	        exports = function (css)
	        {
	            var style = document.createElement('style');
	            style.textContent = css;
	            style.type = 'text/css';
	            document.body.appendChild(style);
	        };

	        return exports;
	    })({});

	    /* ------------------------------ get ------------------------------ */

	    var get = _.get = (function (exports)
	    {
	        function exports(url, cb)
	        {
	            var xhr = new window.XMLHttpRequest();

	            xhr.onload = function ()
	            {
	                var status = xhr.status;

	                if ((status >= 200 && status < 300) || status === 304)
	                {
	                    cb(null, xhr.responseText);
	                }
	            };

	            xhr.onerror = function () { cb(xhr) };

	            xhr.open('GET', url);
	            xhr.send();
	        }

	        return exports;
	    })({});

	    /* ------------------------------ identity ------------------------------ */

	    var identity = _.identity = (function (exports)
	    {
	        /* Return the first argument given.
	         *
	         * |Name  |Type|Desc       |
	         * |-----------------------|
	         * |val   |*   |Any value  |
	         * |return|*   |Given value|
	         *
	         * ```javascript
	         * identity('a'); // -> 'a'
	         * ```
	         */

	        exports = function (val)
	        {
	            return val;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ objToStr ------------------------------ */

	    var objToStr = _.objToStr = (function (exports)
	    {
	        /* Alias of Object.prototype.toString.
	         *
	         * |Name  |Type  |Desc                                    |
	         * |------------------------------------------------------|
	         * |value |*     |Source value                            |
	         * |return|string|String representation of the given value|
	         */

	        var ObjToStr = Object.prototype.toString;

	        exports = function (val)
	        {
	            return ObjToStr.call(val);
	        };

	        return exports;
	    })({});

	    /* ------------------------------ isArr ------------------------------ */

	    var isArr = _.isArr = (function (exports)
	    {
	        /* Check if value is an `Array` object.
	         *
	         * |Name  |Type   |Desc                              |
	         * |-------------------------------------------------|
	         * |val   |*      |The value to check                |
	         * |return|boolean|True if value is an `Array` object|
	         *
	         * ```javascript
	         * isArr([]); // -> true
	         * isArr({}); // -> false
	         * ```
	         */

	        exports = Array.isArray || function (val)
	        {
	            return objToStr(val) === '[object Array]';
	        };

	        return exports;
	    })({});

	    /* ------------------------------ isNum ------------------------------ */

	    var isNum = _.isNum = (function (exports)
	    {
	        /* Checks if value is classified as a Number primitive or object.
	         *
	         * |Name|Type|Desc|
	         * |--------------|
	         * |value|*|The value to check|
	         * |return|boolean|True if value is correctly classified, else false|
	         */

	        exports = function (val)
	        {
	            return objToStr(val) === '[object Number]';
	        };

	        return exports;
	    })({});

	    /* ------------------------------ isArrLike ------------------------------ */

	    var isArrLike = _.isArrLike = (function (exports)
	    {
	        // TODO

	        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

	        exports = function (val)
	        {
	            if (!has(val, 'length')) return false;

	            var len = val.length;

	            return isNum(len) && len >= 0 && len <= MAX_ARR_IDX;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ each ------------------------------ */

	    var each = _.each = (function (exports)
	    {
	        /* Iterates over elements of collection and invokes iteratee for each element.
	         *
	         * |Name    |Type         |Desc                          |
	         * |-----------------------------------------------------|
	         * |obj     |object\|array|Collection to iterate over    |
	         * |iteratee|function     |Function invoked per iteration|
	         * |[ctx]   |*            |Function context              |
	         *
	         * ```javascript
	         * each({'a': 1, 'b': 2}, function (val, key) {});
	         * ```
	         */

	        exports = function (obj, iteratee, ctx)
	        {
	            var i, len;

	            if (isArrLike(obj))
	            {
	                for (i = 0, len = obj.length; i < len; i++) iteratee.call(ctx, obj[i], i, obj);
	            } else
	            {
	                var _keys = keys(obj);
	                for (i = 0, len = _keys.length; i < len; i++)
	                {
	                    iteratee.call(ctx, obj[_keys[i]], _keys[i], obj);
	                }
	            }

	            return obj;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ createAssigner ------------------------------ */

	    var createAssigner = _.createAssigner = (function (exports)
	    {
	        /* Used to create extend, extendOwn and defaults.
	         *
	         * |Name    |Type    |Desc                          |
	         * |------------------------------------------------|
	         * |keysFn  |function|Function to get object keys   |
	         * |defaults|boolean |No override when set to true  |
	         * |return  |function|The result function, extend...|
	         */

	        exports = function (keysFn, defaults)
	        {
	            return function (obj)
	            {
	                each(arguments, function (src, idx)
	                {
	                    if (idx === 0) return;

	                    var keys = keysFn(src);

	                    each(keys, function (key)
	                    {
	                        if (!defaults || isUndef(obj[key])) obj[key] = src[key];
	                    });
	                });

	                return obj;
	            };
	        };

	        return exports;
	    })({});

	    /* ------------------------------ defaults ------------------------------ */

	    var defaults = _.defaults = (function (exports)
	    {
	        /* Fill in undefined properties in object with the first value present in the following list of defaults objects.
	         *
	         * |Name  |Type  |Desc              |
	         * |--------------------------------|
	         * |obj   |object|Destination object|
	         * |*src  |object|Sources objects   |
	         * |return|object|Destination object|
	         *
	         * ```javascript
	         * defaults({name: 'RedHood'}, {name: 'Unknown', age: 24}); // -> {name: 'RedHood', age: 24}
	         * ```
	         */

	        exports = createAssigner(allKeys, true);

	        return exports;
	    })({});

	    /* ------------------------------ cookie ------------------------------ */

	    var cookie = _.cookie = (function (exports)
	    {
	        /* Simple api for handling browser cookies.
	         *
	         * ## get: get cookie value.
	         *
	         * |Name  |Type  |Desc                      |
	         * |----------------------------------------|
	         * |key   |string|Cookie key                |
	         * |return|string|Corresponding cookie value|
	         *
	         * ## set: set cookie value.
	         *
	         * |Name     |Type   |Desc          |
	         * |--------------------------------|
	         * |key      |string |Cookie key    |
	         * |val      |string |Cookie value  |
	         * |[options]|object |Cookie options|
	         * |return   |exports|Module cookie |
	         *
	         * ## remove: remove cookie value.
	         *
	         * |Name     |Type   |Desc          |
	         * |--------------------------------|
	         * |key      |string |Cookie key    |
	         * |[options]|object |Cookie options|
	         * |return   |exports|Module cookie |
	         *
	         * ```javascript
	         * cookie.set('a', '1', {path: '/'});
	         * cookie.get('a'); // -> '1'
	         * cookie.remove('a');
	         * ```
	         */

	        var defOpts = { path: '/' };

	        function setCookie(key, val, options)
	        {
	            if (!isUndef(val))
	            {
	                options = options || {};
	                options = defaults(options, defOpts);

	                if (isNum(options.expires))
	                {
	                    var expires = new Date();
	                    expires.setMilliseconds(expires.getMilliseconds() + options.expires * 864e+5);
	                    options.expires = expires;
	                }

	                val = encodeURIComponent(val);
	                key = encodeURIComponent(key);

	                document.cookie = [
	                    key, '=', val,
	                    options.expires && '; expires=' + options.expires.toUTCString(),
	                    options.path && '; path=' + options.path,
	                    options.domain  && '; domain=' + options.domain,
	                    options.secure ? '; secure' : ''
	                ].join('');

	                return exports;
	            }

	            var cookies = document.cookie ? document.cookie.split('; ') : [],
	                result = key ? undefined : {};

	            for (var i = 0, len = cookies.length; i < len; i++)
	            {
	                var c = cookies[i],
	                    parts = c.split('='),
	                    name = decodeURIComponent(parts.shift());

	                c = parts.join('=');
	                c = decodeURIComponent(c);

	                if (key === name)
	                {
	                    result = c;
	                    break;
	                }

	                if (!key) result[name] = c;
	            }

	            return result;
	        }

	        exports = {
	            get: setCookie,
	            set: setCookie,
	            remove: function (key, options)
	            {
	                options = options || {};
	                options.expires = -1;
	                return setCookie(key, '', options);
	            }
	        };

	        return exports;
	    })({});

	    /* ------------------------------ extend ------------------------------ */

	    var extend = _.extend = (function (exports)
	    {
	        /* Copy all of the properties in the source objects over to the destination object.
	         *
	         * |Name  |Type  |Desc              |
	         * |--------------------------------|
	         * |obj   |object|Destination object|
	         * |*src  |object|Sources objects   |
	         * |return|object|Destination object|
	         *
	         * ```javascript
	         * extend({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
	         * ```
	         */

	        exports = createAssigner(allKeys);

	        return exports;
	    })({});

	    /* ------------------------------ extendOwn ------------------------------ */

	    var extendOwn = _.extendOwn = (function (exports)
	    {
	        /* Like extend, but only copies own properties over to the destination object.
	         *
	         * |Name  |Type  |Desc              |
	         * |--------------------------------|
	         * |obj   |object|Destination object|
	         * |*src  |object|Sources objects   |
	         * |return|object|Destination object|
	         *
	         * ```javascript
	         * extendOwn({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
	         * ```
	         */

	        exports = createAssigner(keys);

	        return exports;
	    })({});

	    /* ------------------------------ values ------------------------------ */

	    var values = _.values = (function (exports)
	    {
	        /* Creates an array of the own enumerable property values of object.
	         *
	         * |Name  |Type  |Desc                    |
	         * |--------------------------------------|
	         * |obj   |object|Object to query         |
	         * |return|array |Array of property values|
	         *
	         * ```javascript
	         * values({one: 1, two: 2}); // -> [1, 2]
	         * ```
	         */

	        exports = function (obj)
	        {
	            var ret = [];

	            each(obj, function (val) { ret.push(val) });

	            return ret;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ contain ------------------------------ */

	    var contain = _.contain = (function (exports)
	    {
	        // TODO

	        exports = function (arr, val)
	        {
	            if (!isArrLike(arr)) arr = values(arr);

	            return idxOf(arr, val) >= 0;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ isStr ------------------------------ */

	    var isStr = _.isStr = (function (exports)
	    {
	        /* Check if value is a string primitive.
	         *
	         * |Name  |Type   |Desc                               |
	         * |--------------------------------------------------|
	         * |val   |*      |The value to check                 |
	         * |return|boolean|True if value is a string primitive|
	         *
	         * ```javascript
	         * isStr('eris'); // -> true
	         * ```
	         */

	        exports = function (val)
	        {
	            return objToStr(val) === '[object String]';
	        };

	        return exports;
	    })({});

	    /* ------------------------------ isBool ------------------------------ */

	    var isBool = _.isBool = (function (exports)
	    {
	        /* Check if value is a boolean primitive.
	         *
	         * |Name  |Type   |Desc                      |
	         * |-----------------------------------------|
	         * |val   |*      |The value to check        |
	         * |return|boolean|True if value is a boolean|
	         *
	         * ```javascript
	         * isBool(true); // -> true
	         * isBool(false); // -> true
	         * isBool(1); // -> false
	         * ```
	         */

	        exports = function (val)
	        {
	            return val === true || val === false;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ isEl ------------------------------ */

	    var isEl = _.isEl = (function (exports)
	    {
	        /* Check if value is a DOM element.
	         *
	         * |Name  |Type   |Desc                          |
	         * |---------------------------------------------|
	         * |val   |*      |Value to check                |
	         * |return|boolean|True if value is a DOM element|
	         *
	         * ```javascript
	         * isEl(document.body); // -> true
	         * ```
	         */

	        exports = function (val)
	        {
	            return !!(val && val.nodeType === 1);
	        };

	        return exports;
	    })({});

	    /* ------------------------------ isErr ------------------------------ */

	    var isErr = _.isErr = (function (exports)
	    {
	        /* Check if value is an error.
	         *
	         * |Name  |Type   |Desc                     |
	         * |----------------------------------------|
	         * |val   |*      |The value to check       |
	         * |return|boolean|True if value is an error|
	         *
	         * ```javascript
	         * isErr(new Error()); // -> true
	         * ```
	         */

	        exports = function (val)
	        {
	            return objToStr(val) === '[object Error]';
	        };

	        return exports;
	    })({});

	    /* ------------------------------ isFn ------------------------------ */

	    var isFn = _.isFn = (function (exports)
	    {
	        /* Check if value is a function.
	         *
	         * |Name  |Type   |Desc                       |
	         * |------------------------------------------|
	         * |val   |*      |The value to check         |
	         * |return|boolean|True if value is a function|
	         *
	         * Generator function is also classified as true.
	         *
	         * ```javascript
	         * isFn(function() {}); // -> true
	         * isFn(function*() {}); // -> true
	         * ```
	         */

	        exports = function (val)
	        {
	            var objStr = objToStr(val);

	            return objStr === '[object Function]' || objStr === '[object GeneratorFunction]';
	        };

	        return exports;
	    })({});

	    /* ------------------------------ isMatch ------------------------------ */

	    var isMatch = _.isMatch = (function (exports)
	    {
	        /* Check if keys and values in src are contained in obj.
	         *
	         * |Name  |Type  |Desc                               |
	         * |-------------------------------------------------|
	         * |obj   |object |Object to inspect                 |
	         * |src   |object |Object of property values to match|
	         * |return|boolean|True if object is match           |
	         *
	         * ```javascript
	         * isMatch({a: 1, b: 2}, {a: 1}); // -> true
	         * ```
	         */

	        exports = function (obj, src)
	        {
	            var _keys = keys(src),
	                len = _keys.length;

	            if (obj == null) return !len;

	            obj = Object(obj);

	            for (var i = 0; i < len; i++)
	            {
	                var key = _keys[i];
	                if (src[key] !== obj[key] || !(key in obj)) return false;
	            }

	            return true;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ isRegExp ------------------------------ */

	    var isRegExp = _.isRegExp = (function (exports)
	    {
	        /* Check if value is a regular expression.
	         *
	         * |Name  |Type   |Desc                                 |
	         * |----------------------------------------------------|
	         * |val   |*      |The value to check                   |
	         * |return|boolean|True if value is a regular expression|
	         *
	         * ```javascript
	         * isRegExp(/a/); // -> true
	         * ```
	         */

	        exports = function (val)
	        {
	            return objToStr(val) === '[object RegExp]';
	        };

	        return exports;
	    })({});

	    /* ------------------------------ loadJs ------------------------------ */

	    var loadJs = _.loadJs = (function (exports)
	    {
	        /* Inject script tag into page with given src value.
	         */

	        exports = function (url, cb)
	        {
	            var script = document.createElement('script');
	            script.src = url;
	            script.onload = function ()
	            {
	                var isNotLoaded = script.readyState &&
	                    script.readyState != "complete" &&
	                    script.readyState != "loaded";

	                cb && cb(!isNotLoaded);
	            };
	            document.body.appendChild(script);
	        };

	        return exports;
	    })({});

	    /* ------------------------------ ltrim ------------------------------ */

	    var ltrim = _.ltrim = (function (exports)
	    {
	        /* Remove chars or white-spaces from beginning of string.
	         *
	         * |Name  |Type         |Desc                  |
	         * |-------------------------------------------|
	         * |str   |string       |The string to trim    |
	         * |chars |string\|array|The characters to trim|
	         * |return|string       |The trimmed string    |
	         *
	         * ```javascript
	         * ltrim(' abc  '); // -> 'abc  '
	         * ltrim('_abc_', '_'); // -> 'abc_'
	         * ltrim('_abc_', ['a', '_']); // -> 'bc_'
	         * ```
	         */

	        var regSpace = /^\s+/;

	        exports = function (str, chars)
	        {
	            if (chars == null) return str.replace(regSpace, '');

	            var start   = 0,
	                len     = str.length,
	                charLen = chars.length,
	                found   = true,
	                i, c;

	            while (found && start < len)
	            {
	                found = false;
	                i = -1;
	                c = str.charAt(start);

	                while (++i < charLen)
	                {
	                    if (c === chars[i])
	                    {
	                        found = true;
	                        start++;
	                        break;
	                    }
	                }
	            }

	            return (start >= len) ? '' : str.substr(start, len);
	        };

	        return exports;
	    })({});

	    /* ------------------------------ matcher ------------------------------ */

	    var matcher = _.matcher = (function (exports)
	    {
	        // TODO

	        exports = function (attrs)
	        {
	            attrs = extendOwn({}, attrs);

	            return function (obj)
	            {
	                return isMatch(obj, attrs);
	            };
	        };

	        return exports;
	    })({});

	    /* ------------------------------ now ------------------------------ */

	    var now = _.now = (function (exports)
	    {
	        /* Gets the number of milliseconds that have elapsed since the Unix epoch. */

	        exports = Date.now || function ()
	        {
	            return new Date().getTime();
	        };

	        return exports;
	    })({});

	    /* ------------------------------ optimizeCb ------------------------------ */

	    var optimizeCb = _.optimizeCb = (function (exports)
	    {
	        exports = function (func, ctx, argCount)
	        {
	            if (isUndef(ctx)) return func;

	            switch (argCount == null ? 3 : argCount)
	            {
	                case 1: return function (val)
	                {
	                    return func.call(ctx, val);
	                };
	                case 3: return function (val, idx, collection)
	                {
	                    return func.call(ctx, val, idx, collection);
	                };
	                case 4: return function (accumulator, val, idx, collection)
	                {
	                    return func.call(ctx, accumulator, val, idx, collection);
	                }
	            }

	            return function ()
	            {
	                return func.apply(ctx, arguments);
	            };
	        };

	        return exports;
	    })({});

	    /* ------------------------------ safeCb ------------------------------ */

	    var safeCb = _.safeCb = (function (exports)
	    {
	        /* function
	         * safeCb: Create callback based on input value.
	         */

	        exports = function (val, ctx, argCount)
	        {
	            if (val == null) return identity;

	            if (isFn(val)) return optimizeCb(val, ctx, argCount);

	            if (isObj(val)) return matcher(val);

	            return function (key)
	            {
	                return function (obj)
	                {
	                    return obj == null ? undefined : obj[key];
	                }
	            };
	        };

	        return exports;
	    })({});

	    /* ------------------------------ filter ------------------------------ */

	    var filter = _.filter = (function (exports)
	    {
	        /* Iterates over elements of collection, returning an array of all the values that pass a truth test.
	         *
	         * |Name     |Type    |Desc                                   |
	         * |----------------------------------------------------------|
	         * |obj      |array   |Collection to iterate over             |
	         * |predicate|function|Function invoked per iteration         |
	         * |[ctx]    |*       |Predicate context                      |
	         * |return   |array   |Array of all values that pass predicate|
	         *
	         * ```javascript
	         * filter([1, 2, 3, 4, 5], function (val)
	         * {
	         *     return val % 2 === 0;
	         * }); // -> [2, 4]
	         * ```
	         */

	        exports = function (obj, predicate, ctx)
	        {
	            var ret = [];

	            predicate = safeCb(predicate, ctx);

	            each(obj, function (val, idx, list)
	            {
	                if (predicate(val, idx, list)) ret.push(val);
	            });

	            return ret;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ map ------------------------------ */

	    var map = _.map = (function (exports)
	    {
	        /* Create an array of values by running each element in collection through iteratee.
	         *
	         * |Name    |Type         |Desc                          |
	         * |-----------------------------------------------------|
	         * |obj     |array\|object|Collection to iterate over    |
	         * |iteratee|function     |Function invoked per iteration|
	         * |[ctx]   |*            |Function context              |
	         * |return  |array        |New mapped array              |
	         *
	         * ```javascript
	         * map([4, 8], function (n) { return n * n; }); // -> [16, 64]
	         * ```
	         */

	        exports = function (obj, iteratee, ctx)
	        {
	            iteratee = safeCb(iteratee, ctx);

	            var _keys = !isArrLike(obj) && keys(obj),
	                len = (_keys || obj).length,
	                results = Array(len);

	            for (var i = 0; i < len; i++)
	            {
	                var curKey = _keys ? _keys[i] : i;
	                results[i] = iteratee(obj[curKey], curKey, obj);
	            }

	            return results;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ toArr ------------------------------ */

	    var toArr = _.toArr = (function (exports)
	    {
	        /* Convert value to an array.
	         *
	         * |Name  |Type |Desc            |
	         * |-----------------------------|
	         * |val   |*    |Value to convert|
	         * |return|array|Converted array |
	         *
	         * ```javascript
	         * toArr({a: 1, b: 2}); // -> [{a: 1, b: 2}]
	         * toArr('abc'); // -> ['abc']
	         * toArr(1); // -> []
	         * toArr(null); // -> []
	         * ```
	         */

	        exports = function (val)
	        {
	            if (!val) return [];

	            if (isArr(val)) return val;

	            if (isArrLike(val) && !isStr(val)) return map(val);

	            return [val];
	        };

	        return exports;
	    })({});

	    /* ------------------------------ Class ------------------------------ */

	    var Class = _.Class = (function (exports)
	    {
	        /* Create JavaScript class.
	         *
	         * |Name   |Type    |Desc                             |
	         * |--------------------------------------------------|
	         * |methods|object  |Public methods                   |
	         * |statics|object  |Static methods                   |
	         * |return |function|Function used to create instances|
	         */

	        var regCallSuper = /callSuper/;

	        function makeClass(parent, methods, statics)
	        {
	            statics = statics || {};

	            var ctor = function ()
	            {
	                var args = toArr(arguments);

	                if (has(ctor.prototype, 'initialize') &&
	                    !regCallSuper.test(this.initialize.toString()) &&
	                    this.callSuper)
	                {
	                    args.unshift('initialize');
	                    this.callSuper.apply(this, args);
	                    args.shift();
	                }

	                return this.initialize
	                       ? this.initialize.apply(this, args) || this
	                       : this;
	            };

	            inherits(ctor, parent);
	            ctor.superclass = ctor.prototype.superclass = parent;

	            ctor.extend = function (methods, statics)
	            {
	                return makeClass(ctor, methods, statics);
	            };
	            ctor.inherits = function (Class)
	            {
	                inherits(Class, ctor);
	            };
	            ctor.methods = function (methods)
	            {
	                extend(ctor.prototype, methods);
	                return ctor;
	            };
	            ctor.statics = function (statics)
	            {
	                extend(ctor, statics);
	                return ctor;
	            };

	            ctor.methods(methods).statics(statics);

	            return ctor;
	        }

	        exports = function (methods, statics)
	        {
	            return Base.extend(methods, statics);
	        };

	        var Base = exports.Base = makeClass(Object, {
	            className: 'Base',
	            callSuper: function (name)
	            {
	                var superMethod = this.superclass.prototype[name];

	                if (!superMethod) return;

	                return superMethod.apply(this, toArr(arguments).slice(1));
	            },
	            toString: function ()
	            {
	                return this.className;
	            }
	        });

	        return exports;
	    })({});

	    /* ------------------------------ Emitter ------------------------------ */

	    var Emitter = _.Emitter = (function (exports)
	    {
	        exports = Class({
	            initialize: function ()
	            {
	                this._events = this._events || {};
	            },
	            on: function (event, listener)
	            {
	                this._events[event] = this._events[event] || [];
	                this._events[event].push(listener);

	                return this;
	            },
	            off: function (event, listener)
	            {
	                if (!has(this._events, event)) return;

	                this._events[event].splice(this._events[event].indexOf(listener), 1);

	                return this;
	            },
	            once: function (event, listener)
	            {
	                var fired = false;

	                function g()
	                {
	                    this.off(event, g);
	                    if (!fired)
	                    {
	                        fired = true;
	                        listener.apply(this, arguments);
	                    }
	                }

	                this.on(event, g);

	                return this;
	            },
	            emit: function (event)
	            {
	                if (!has(this._events, event)) return;

	                var args = slice(arguments, 1);

	                each(this._events[event], function (val)
	                {
	                    val.apply(this, args);
	                }, this);

	                return this;
	            }
	        }, {
	            mixin: function (obj)
	            {
	                each(['on', 'off', 'once', 'emit'], function (val)
	                {
	                    obj[val] = Emitter.prototype[val];
	                });

	                obj._events = obj._events || {};
	            }
	        });

	        return exports;
	    })({});

	    /* ------------------------------ Select ------------------------------ */

	    var Select = _.Select = (function (exports)
	    {
	        /* jQuery like dom manipulator.
	         */

	        function mergeArr(first, second)
	        {
	            var len = second.length,
	                i   = first.length;

	            for (var j = 0; j < len; j++) first[i++] = second[j];

	            first.length = i;

	            return first;
	        }

	        exports = Class({
	            className: 'Select',
	            initialize: function (selector)
	            {
	                this.length = 0;

	                if (!selector) return this;

	                if (isStr(selector)) return rootSelect.find(selector);

	                if (selector.nodeType)
	                {
	                    this[0]     = selector;
	                    this.length = 1;
	                }
	            },
	            find: function (selector)
	            {
	                var ret = new Select;

	                this.each(function ()
	                {
	                    mergeArr(ret, this.querySelectorAll(selector));
	                });

	                return ret;
	            },
	            each: function (fn)
	            {
	                each(this, function (element, idx)
	                {
	                    fn.call(element, idx, element);
	                });

	                return this;
	            }
	        });

	        var rootSelect = new exports(document);

	        return exports;
	    })({});

	    /* ------------------------------ $safeNodes ------------------------------ */

	    var $safeNodes = _.$safeNodes = (function (exports)
	    {
	        exports = function (nodes)
	        {
	            if (isStr(nodes)) return new Select(nodes);

	            return toArr(nodes);
	        };

	        return exports;
	    })({});

	    /* ------------------------------ $attr ------------------------------ */

	    var $attr = _.$attr = (function (exports)
	    {
	        exports = function (nodes, name, val)
	        {
	            nodes = $safeNodes(nodes);

	            var isGetter = isUndef(val) && isStr(name);
	            if (isGetter) return getAttr(nodes[0], name);

	            var attrs = name;
	            if (!isObj(attrs))
	            {
	                attrs = {};
	                attrs[name] = val;
	            }

	            setAttr(nodes, attrs);
	        };

	        exports.remove = function (nodes, names)
	        {
	            nodes = $safeNodes(nodes);
	            names = toArr(names);

	            each(nodes, function (node)
	            {
	                each(names, function (name)
	                {
	                    node.removeAttribute(name);
	                });
	            });
	        };

	        function getAttr(node, name)
	        {
	            return node.getAttribute(name);
	        }

	        function setAttr(nodes, attrs)
	        {
	            each(nodes, function (node)
	            {
	                each(attrs, function (val, name)
	                {
	                    node.setAttribute(name, val);
	                });
	            })
	        }

	        return exports;
	    })({});

	    /* ------------------------------ $data ------------------------------ */

	    var $data = _.$data = (function (exports)
	    {
	        exports = function (nodes, name, val)
	        {
	            var dataName = name;

	            if (isStr(name)) dataName = 'data-' + name;
	            if (isObj(name))
	            {
	                dataName = {};
	                each(name, function (val, key)
	                {
	                    dataName['data-' + key] = val;
	                });
	            }

	            return $attr(nodes, dataName, val);
	        };

	        return exports;
	    })({});

	    /* ------------------------------ $css ------------------------------ */

	    var $css = _.$css = (function (exports)
	    {
	        exports = function (nodes, name, val)
	        {
	            nodes = $safeNodes(nodes);

	            var isGetter = isUndef(val) && isStr(name);
	            if (isGetter) return getCss(nodes[0], name);

	            var css = name;
	            if (!isObj(css))
	            {
	                css = {};
	                css[name] = val;
	            }

	            setCss(nodes, css);
	        };

	        function getCss(node, name)
	        {
	            return node.style[camelCase(name)];
	        }

	        function setCss(nodes, css)
	        {
	            each(nodes, function (node)
	            {
	                var cssText = ';';
	                each(css, function (val, key)
	                {
	                    cssText += kebabCase(key) + ':' + addPx(key, val) + ';';
	                });
	                node.style.cssText += cssText;
	            });
	        }

	        var cssNumProps = [
	            'column-count',
	            'columns',
	            'font-weight',
	            'line-weight',
	            'opacity',
	            'z-index',
	            'zoom'
	        ];

	        function addPx(key, val)
	        {
	            var needPx = isNum(val) && !contain(cssNumProps, kebabCase(key));

	            return needPx ? val + 'px' : val;
	        }

	        return exports;
	    })({});

	    /* ------------------------------ $insert ------------------------------ */

	    var $insert = _.$insert = (function (exports)
	    {
	        exports = {
	            before: insertFactory('beforebegin'),
	            after: insertFactory('afterend'),
	            append: insertFactory('beforeend'),
	            prepend: insertFactory('afterbegin')
	        };

	        function insertFactory(type)
	        {
	            return function (nodes, val)
	            {
	                nodes = $safeNodes(nodes);

	                each(nodes, function (node)
	                {
	                    node.insertAdjacentHTML(type, val);
	                });
	            };
	        }

	        return exports;
	    })({});

	    /* ------------------------------ $offset ------------------------------ */

	    var $offset = _.$offset = (function (exports)
	    {
	        exports = function (nodes)
	        {
	            nodes = $safeNodes(nodes);

	            var node = nodes[0];

	            var clientRect = node.getBoundingClientRect();

	            return {
	                left: clientRect.left + window.pageXOffset,
	                top : clientRect.top  + window.pageYOffset,
	                width : Math.round(clientRect.width),
	                height: Math.round(clientRect.height)
	            };
	        };

	        return exports;
	    })({});

	    /* ------------------------------ $property ------------------------------ */

	    var $property = _.$property = (function (exports)
	    {
	        exports = {
	            html: propFactory('innerHTML'),
	            text: propFactory('textContent'),
	            val: propFactory('value')
	        };

	        function propFactory(name)
	        {
	            return function (nodes, val)
	            {
	                nodes = $safeNodes(nodes);

	                if (isUndef(val)) return nodes[0][name];

	                each(nodes, function (node)
	                {
	                    node[name] = val;
	                });
	            };
	        }

	        return exports;
	    })({});

	    /* ------------------------------ $remove ------------------------------ */

	    var $remove = _.$remove = (function (exports)
	    {
	        exports = function (nodes)
	        {
	            nodes = $safeNodes(nodes);

	            each(nodes, function (node)
	            {
	                var parent = node.parentNode;

	                if (parent) parent.removeChild(node);
	            });
	        };

	        return exports;
	    })({});

	    /* ------------------------------ $show ------------------------------ */

	    var $show = _.$show = (function (exports)
	    {
	        exports = function (nodes)
	        {
	            nodes = $safeNodes(nodes);

	            each(nodes, function (node)
	            {
	                if (isHidden(node))
	                {
	                    node.style.display = getDefDisplay(node.nodeName);
	                }
	            });
	        };

	        function isHidden(node)
	        {
	            return getComputedStyle(node, '').getPropertyValue('display') == 'none';
	        }

	        var elDisplay = {};

	        function getDefDisplay(nodeName)
	        {
	            var el, display;

	            if (!elDisplay[nodeName])
	            {
	                el = document.createElement(nodeName);
	                document.documentElement.appendChild(el);
	                display = getComputedStyle(el, '').getPropertyValue("display");
	                el.parentNode.removeChild(el);
	                display == "none" && (display = "block");
	                elDisplay[nodeName] = display;
	            }

	            return elDisplay[nodeName];
	        }

	        return exports;
	    })({});

	    /* ------------------------------ delegate ------------------------------ */

	    var delegate = _.delegate = (function (exports)
	    {
	        function retTrue()  { return true }
	        function retFalse() { return false }

	        function trigger(e)
	        {
	            var handlers = this.events[e.type],
	                handler,
	                handlerQueue = formatHandlers.call(this, e, handlers);

	            e = new delegate.Event(e);

	            var i = 0, j, matched, ret;

	            while ((matched = handlerQueue[i++]) && !e.isPropagationStopped())
	            {
	                e.curTarget = matched.el;
	                j = 0;
	                while ((handler = matched.handlers[j++]) && !e.isImmediatePropagationStopped())
	                {
	                    ret = handler.handler.apply(matched.el, [e]);

	                    if (ret === false)
	                    {
	                        e.preventDefault();
	                        e.stopPropagation();
	                    }
	                }
	            }
	        }

	        function formatHandlers(e, handlers)
	        {
	            var current = e.target,
	                ret     = [],
	                delegateCount = handlers.delegateCount,
	                selector, matches, handler, i;

	            if (current.nodeType)
	            {
	                for (; current !== this; current = current.parentNode || this)
	                {
	                    matches = [];
	                    for (i = 0; i < delegateCount; i++)
	                    {
	                        handler = handlers[i];
	                        selector = handler.selector + ' ';
	                        if (matches[selector] === undefined)
	                        {
	                            matches[selector] = contain(this.querySelectorAll(selector), current);
	                        }
	                        if (matches[selector]) matches.push(handler);
	                    }
	                    if (matches.length) ret.push({ el: current, handlers: matches});
	                }
	            }

	            if (delegateCount < handlers.length)
	            {
	                ret.push({
	                    el: this,
	                    handlers: handlers.slice(delegateCount)
	                });
	            }

	            return ret;
	        }

	        exports = {
	            add: function (el, type, selector, fn)
	            {
	                var handler = {
	                        selector: selector,
	                        handler : fn
	                    },
	                    handlers;

	                if (!el.events) el.events = {};

	                if (!(handlers = el.events[type]))
	                {
	                    handlers = el.events[type] = [];
	                    handlers.delegateCount = 0;
	                    el.addEventListener(type, function (e)
	                    {
	                        trigger.apply(el, arguments);
	                    }, false);
	                }

	                selector ? handlers.splice(handlers.delegateCount++, 0, handler)
	                         : handlers.push(handler);
	            },
	            remove: function (el, type, selector, fn)
	            {
	                var events = el.events;

	                if (!events || !events[type]) return;

	                var handlers = events[type],
	                    i = handlers.length,
	                    handler;

	                while (i--)
	                {
	                    handler = handlers[i];

	                    if ((!selector || handler.selector == selector) && handler.handler == fn)
	                    {
	                        handlers.splice(i, 1);
	                        if (handler.selector)
	                        {
	                            handlers.delegateCount--;
	                        }
	                    }
	                }
	            },
	            Event: Class({
	                className: 'Event',
	                initialize: function Event(e) { this.origEvent = e },
	                isDefaultPrevented: retFalse,
	                isPropagationStopped: retFalse,
	                isImmediatePropagationStopped: retFalse,
	                preventDefault: function ()
	                {
	                    var e = this.origEvent;

	                    this.isDefaultPrevented = retTrue;
	                    if (e && e.preventDefault) e.preventDefault();
	                },
	                stopPropagation: function ()
	                {
	                    var e = this.origEvent;

	                    this.isPropagationStopped = retTrue;
	                    if (e && e.stopPropagation) e.stopPropagation();
	                },
	                stopImmediatePropagation: function ()
	                {
	                    var e = this.origEvent;

	                    this.isImmediatePropagationStopped = retTrue;
	                    if (e && e.stopImmediatePropagation) e.stopImmediatePropagation();
	                    this.stopPropagation();
	                }
	            })
	        };

	        return exports;
	    })({});

	    /* ------------------------------ $event ------------------------------ */

	    var $event = _.$event = (function (exports)
	    {
	        exports = {
	            on: eventFactory('add'),
	            off: eventFactory('remove')
	        };

	        function eventFactory(type)
	        {
	            return function (nodes, event, selector, handler)
	            {
	                nodes = $safeNodes(nodes);

	                if (isUndef(handler))
	                {
	                    handler = selector;
	                    selector = undefined;
	                }

	                each(nodes, function (node)
	                {
	                    delegate[type](node, event, selector, handler);
	                });
	            };
	        }

	        return exports;
	    })({});

	    /* ------------------------------ some ------------------------------ */

	    var some = _.some = (function (exports)
	    {
	        /* Check if predicate return truthy for any element.
	         *
	         * |Name     |Type         |Desc                                          |
	         * |----------------------------------------------------------------------|
	         * |obj      |array\|object|Collection to iterate over                    |
	         * |predicate|function     |Function to invoked per iteration             |
	         * |ctx      |*            |Predicate context                             |
	         * |return   |boolean      |True if any element passes the predicate check|
	         *
	         * ```javascript
	         * some([2, 5], function (val)
	         * {
	         *     return val % 2 === 0;
	         * }); // -> true
	         * ```
	         */

	        exports = function (obj, predicate, ctx)
	        {
	            predicate = safeCb(predicate, ctx);

	            var _keys = !isArrLike(obj) && keys(obj),
	                len   = (_keys || obj).length;

	            for (var i = 0; i < len; i++)
	            {
	                var key = _keys ? _keys[i] : i;
	                if (predicate(obj[key], key, obj)) return true;
	            }

	            return false;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ $class ------------------------------ */

	    var $class = _.$class = (function (exports)
	    {
	        exports = {
	            add: function (nodes, name)
	            {
	                nodes = $safeNodes(nodes);
	                var names = toArr(name);

	                each(nodes, function (node)
	                {
	                    var classList = [];

	                    each(names, function (name)
	                    {
	                        if (!exports.has(node, name)) classList.push(name);
	                    });

	                    if (classList.length !== 0) node.className += ' ' + classList.join(' ');
	                });
	            },
	            has: function (nodes, name)
	            {
	                nodes = $safeNodes(nodes);

	                var regName = new RegExp('(^|\\s)' + name + '(\\s|$)');

	                return some(nodes, function (node)
	                {
	                    return regName.test(node.className);
	                });
	            },
	            toggle: function (nodes, name)
	            {
	                nodes = $safeNodes(nodes);

	                each(nodes, function (node)
	                {
	                    if (!exports.has(node, name)) return exports.add(node, name);

	                    exports.remove(node, name);
	                });
	            },
	            remove: function (nodes, name)
	            {
	                nodes = $safeNodes(nodes);
	                var names = toArr(name);

	                each(nodes, function (node)
	                {
	                    each(names, function (name)
	                    {
	                        node.classList.remove(name);
	                    });
	                });
	            }
	        };

	        return exports;
	    })({});

	    /* ------------------------------ $ ------------------------------ */

	    var $ = _.$ = (function (exports)
	    {
	        /* jQuery like style dom manipulator.
	         */

	        exports = function (selector)
	        {
	            return new Select(selector);
	        };

	        Select.methods({
	            offset: function ()
	            {
	                return $offset(this);
	            },
	            hide: function ()
	            {
	                return this.css('display', 'none');
	            },
	            show: function ()
	            {
	                $show(this);

	                return this;
	            },
	            first: function ()
	            {
	                return $(this[0]);
	            },
	            last: function () {
	                return $(last(this));
	            },
	            get: function (idx)
	            {
	                return this[idx];
	            },
	            eq: function (idx)
	            {
	                return $(this[idx]);
	            },
	            on: function (event, selector, handler)
	            {
	                $event.on(this, event, selector, handler);

	                return this;
	            },
	            off: function (event, selector, handler)
	            {
	                $event.off(this, event, selector, handler);

	                return this;
	            },
	            html: function (val)
	            {
	                var result = $property.html(this, val);

	                if (isUndef(val)) return result;

	                return this;
	            },
	            text: function (val)
	            {
	                var result = $property.text(this, val);

	                if (isUndef(val)) return result;

	                return this;
	            },
	            val: function (val)
	            {
	                var result = $property.val(this, val);

	                if (isUndef(val)) return result;

	                return this;
	            },
	            css: function (name, val)
	            {
	                var result = $css(this, name, val);

	                if (isGetter(name, val)) return result;

	                return this;
	            },
	            attr: function (name, val)
	            {
	                var result = $attr(this, name, val);

	                if (isGetter(name, val)) return result;

	                return this;
	            },
	            data: function (name, val)
	            {
	                var result = $data(this, name, val);

	                if (isGetter(name, val)) return result;

	                return this;
	            },
	            rmAttr: function (name)
	            {
	                $attr.remove(this, name);

	                return this;
	            },
	            remove: function ()
	            {
	                $remove(this);

	                return this;
	            },
	            addClass: function (name)
	            {
	                $class.add(this, name);

	                return this;
	            },
	            rmClass: function (name)
	            {
	                $class.remove(this, name);

	                return this;
	            },
	            toggleClass: function (name)
	            {
	                $class.toggle(this, name);

	                return this;
	            },
	            hasClass: function (name)
	            {
	                return $class.has(this, name);
	            },
	            parent: function ()
	            {
	                return $(this[0].parentNode);
	            },
	            append: function (val)
	            {
	                $insert.append(this, val);

	                return this;
	            },
	            prepend: function (val)
	            {
	                $insert.prepend(this, val);

	                return this;
	            },
	            before: function (val)
	            {
	                $insert.before(this, val);

	                return this;
	            },
	            after: function (val)
	            {
	                $insert.after(this, val);

	                return this;
	            }
	        });

	        function isGetter(name, val)
	        {
	            return isUndef(val) && isStr(name);
	        }

	        return exports;
	    })({});

	    /* ------------------------------ orientation ------------------------------ */

	    var orientation = _.orientation = (function (exports)
	    {
	        Emitter.mixin(exports);

	        window.addEventListener('orientationchange', function ()
	        {
	            setTimeout(function ()
	            {
	                exports.emit('change');
	            }, 150);
	        }, false);

	        return exports;
	    })({});

	    /* ------------------------------ rtrim ------------------------------ */

	    var rtrim = _.rtrim = (function (exports)
	    {
	        /* Remove chars or white-spaces from end of string.
	         *
	         * |Name  |Type         |Desc                  |
	         * |-------------------------------------------|
	         * |str   |string       |The string to trim    |
	         * |chars |string\|array|The characters to trim|
	         * |return|string       |The trimmed string    |
	         *
	         * ```javascript
	         * rtrim(' abc  '); // -> ' abc'
	         * rtrim('_abc_', '_'); // -> '_abc'
	         * rtrim('_abc_', ['c', '_']); // -> '_ab'
	         * ```
	         */

	        var regSpace = /\s+$/;

	        exports = function (str, chars)
	        {
	            if (chars == null) return str.replace(regSpace, '');

	            var end = str.length - 1,
	                charLen = chars.length,
	                found = true,
	                i, c;

	            while (found && end >= 0)
	            {
	                found = false;
	                i = -1;
	                c = str.charAt(end);

	                while (++i < charLen)
	                {
	                    if (c === chars[i])
	                    {
	                        found = true;
	                        end--;
	                        break;
	                    }
	                }
	            }

	            return (end >= 0) ? str.substring(0, end + 1) : '';
	        };

	        return exports;
	    })({});

	    /* ------------------------------ startWith ------------------------------ */

	    var startWith = _.startWith = (function (exports)
	    {
	        /* Check if string starts with the given target string.
	         *
	         * |Name  |Type   |Desc                             |
	         * |------------------------------------------------|
	         * |str   |string |The string to search             |
	         * |prefix|string |String prefix                    |
	         * |return|boolean|True if string starts with prefix|
	         *
	         * ```javascript
	         * startWith('ab', 'a'); // -> true
	         * ```
	         */

	        exports = function (str, prefix)
	        {
	            return str.indexOf(prefix) === 0;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ toNum ------------------------------ */

	    var toNum = _.toNum = (function (exports)
	    {
	        /* Convert value to a number.
	         *
	         * |Name  |Type  |Desc            |
	         * |------------------------------|
	         * |val   |*     |Value to process|
	         * |return|number|Resulted number |
	         *
	         * ```javascript
	         * toNum('5'); // -> 5
	         * ```
	         */

	        exports = function (val)
	        {
	            if (isNum(val)) return val;

	            if (isObj(val))
	            {
	                var temp = isFn(val.valueOf) ? val.valueOf() : val;
	                val = isObj(temp) ? (temp + '') : temp;
	            }

	            if (!isStr(val)) return val === 0 ? val : +val;

	            return +val;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ toStr ------------------------------ */

	    var toStr = _.toStr = (function (exports)
	    {
	        /* Convert value to a string.
	         *
	         * |Name  |Type  |Desc            |
	         * |------------------------------|
	         * |val   |*     |Value to convert|
	         * |return|string|Resulted string |
	         *
	         * ```javascript
	         * toStr(null); // -> ''
	         * toStr(1); // -> '1'
	         * toStr(false); // -> 'false'
	         * toStr([1, 2, 3]); // -> '1,2,3'
	         * ```
	         */

	        function exports(val)
	        {
	            return val == null ? '' : val.toString();
	        }

	        return exports;
	    })({});

	    /* ------------------------------ trim ------------------------------ */

	    var trim = _.trim = (function (exports)
	    {
	        /* Remove chars or white-spaces from beginning end of string.
	         *
	         * |Name  |Type         |Desc                  |
	         * |-------------------------------------------|
	         * |str   |string       |The string to trim    |
	         * |chars |string\|array|The characters to trim|
	         * |return|string       |The trimmed string    |
	         *
	         * ```javascript
	         * trim(' abc  '); // -> 'abc'
	         * trim('_abc_', '_'); // -> 'abc'
	         * trim('_abc_', ['a', 'c', '_']); // -> 'b'
	         * ```
	         */

	        var regSpace = /^\s+|\s+$/g;

	        exports = function (str, chars)
	        {
	            if (chars == null) return str.replace(regSpace, '');

	            return ltrim(rtrim(str, chars), chars);
	        };

	        return exports;
	    })({});

	    /* ------------------------------ uniqId ------------------------------ */

	    var uniqId = _.uniqId = (function (exports)
	    {
	        /* Generate a globally-unique id.
	         *
	         * |Name  |Type  |Desc              |
	         * |--------------------------------|
	         * |prefix|string|Id prefix         |
	         * |return|string|Globally-unique id|
	         *
	         * ```javascript
	         * uniqueId('eusita_'); // -> 'eustia_xxx'
	         * ```
	         */

	        var idCounter = 0;

	        exports = function (prefix)
	        {
	            var id = ++idCounter + '';

	            return prefix ? prefix + id : id;
	        };

	        return exports;
	    })({});

	    /* ------------------------------ unique ------------------------------ */

	    var unique = _.unique = (function (exports)
	    {
	        /* Create duplicate-free version of an array.
	         *
	         * |Name     |Type    |Desc                         |
	         * |------------------------------------------------|
	         * |arr      |array   |Array to inspect             |
	         * |[compare]|function|Function for comparing values|
	         * |return   |array   |New duplicate free array     |
	         *
	         * ```javascript
	         * unique([1, 2, 3, 1]); // -> [1, 2, 3]
	         * ```
	         */

	        function isEqual(a, b) { return a === b }

	        exports = function (arr, compare)
	        {
	            compare = compare || isEqual;

	            return filter(arr, function (item, idx, arr)
	            {
	                var len = arr.length;

	                while (++idx < len)
	                {
	                    if (compare(item, arr[idx])) return false;
	                }

	                return true;
	            });
	        };

	        return exports;
	    })({});

	    return _;
	})();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Draggabilly v2.1.0
	 * Make that shiz draggable
	 * http://draggabilly.desandro.com
	 * MIT license
	 */

	/*jshint browser: true, strict: true, undef: true, unused: true */

	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /*globals define, module, require */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(4),
	        __webpack_require__(5)
	      ], __WEBPACK_AMD_DEFINE_RESULT__ = function( getSize, Unidragger ) {
	        return factory( window, getSize, Unidragger );
	      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('get-size'),
	      require('unidragger')
	    );
	  } else {
	    // browser global
	    window.Draggabilly = factory(
	      window,
	      window.getSize,
	      window.Unidragger
	    );
	  }

	}( window, function factory( window, getSize, Unidragger ) {

	'use strict';

	// vars
	var document = window.document;

	function noop() {}

	// -------------------------- helpers -------------------------- //

	// extend objects
	function extend( a, b ) {
	  for ( var prop in b ) {
	    a[ prop ] = b[ prop ];
	  }
	  return a;
	}

	function isElement( obj ) {
	  return obj instanceof HTMLElement;
	}

	// -------------------------- requestAnimationFrame -------------------------- //

	// get rAF, prefixed, if present
	var requestAnimationFrame = window.requestAnimationFrame ||
	  window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

	// fallback to setTimeout
	var lastTime = 0;
	if ( !requestAnimationFrame )  {
	  requestAnimationFrame = function( callback ) {
	    var currTime = new Date().getTime();
	    var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
	    var id = setTimeout( callback, timeToCall );
	    lastTime = currTime + timeToCall;
	    return id;
	  };
	}

	// -------------------------- support -------------------------- //

	var docElem = document.documentElement;
	var transformProperty = typeof docElem.style.transform == 'string' ?
	  'transform' : 'WebkitTransform';

	var jQuery = window.jQuery;

	// --------------------------  -------------------------- //

	function Draggabilly( element, options ) {
	  // querySelector if string
	  this.element = typeof element == 'string' ?
	    document.querySelector( element ) : element;

	  if ( jQuery ) {
	    this.$element = jQuery( this.element );
	  }

	  // options
	  this.options = extend( {}, this.constructor.defaults );
	  this.option( options );

	  this._create();
	}

	// inherit Unidragger methods
	var proto = Draggabilly.prototype = Object.create( Unidragger.prototype );

	Draggabilly.defaults = {
	};

	/**
	 * set options
	 * @param {Object} opts
	 */
	proto.option = function( opts ) {
	  extend( this.options, opts );
	};

	proto._create = function() {

	  // properties
	  this.position = {};
	  this._getPosition();

	  this.startPoint = { x: 0, y: 0 };
	  this.dragPoint = { x: 0, y: 0 };

	  this.startPosition = extend( {}, this.position );

	  // set relative positioning
	  var style = getComputedStyle( this.element );
	  if ( style.position != 'relative' && style.position != 'absolute' ) {
	    this.element.style.position = 'relative';
	  }

	  this.enable();
	  this.setHandles();

	};

	/**
	 * set this.handles and bind start events to 'em
	 */
	proto.setHandles = function() {
	  this.handles = this.options.handle ?
	    this.element.querySelectorAll( this.options.handle ) : [ this.element ];

	  this.bindHandles();
	};

	/**
	 * emits events via EvEmitter and jQuery events
	 * @param {String} type - name of event
	 * @param {Event} event - original event
	 * @param {Array} args - extra arguments
	 */
	proto.dispatchEvent = function( type, event, args ) {
	  var emitArgs = [ event ].concat( args );
	  this.emitEvent( type, emitArgs );
	  var jQuery = window.jQuery;
	  // trigger jQuery event
	  if ( jQuery && this.$element ) {
	    if ( event ) {
	      // create jQuery event
	      var $event = jQuery.Event( event );
	      $event.type = type;
	      this.$element.trigger( $event, args );
	    } else {
	      // just trigger with type if no event available
	      this.$element.trigger( type, args );
	    }
	  }
	};

	// -------------------------- position -------------------------- //

	// get x/y position from style
	Draggabilly.prototype._getPosition = function() {
	  var style = getComputedStyle( this.element );
	  var x = this._getPositionCoord( style.left, 'width' );
	  var y = this._getPositionCoord( style.top, 'height' );
	  // clean up 'auto' or other non-integer values
	  this.position.x = isNaN( x ) ? 0 : x;
	  this.position.y = isNaN( y ) ? 0 : y;

	  this._addTransformPosition( style );
	};

	Draggabilly.prototype._getPositionCoord = function( styleSide, measure ) {
	  if ( styleSide.indexOf('%') != -1 ) {
	    // convert percent into pixel for Safari, #75
	    var parentSize = getSize( this.element.parentNode );
	    return ( parseFloat( styleSide ) / 100 ) * parentSize[ measure ];
	  }

	  return parseInt( styleSide, 10 );
	};

	// add transform: translate( x, y ) to position
	proto._addTransformPosition = function( style ) {
	  var transform = style[ transformProperty ];
	  // bail out if value is 'none'
	  if ( transform.indexOf('matrix') !== 0 ) {
	    return;
	  }
	  // split matrix(1, 0, 0, 1, x, y)
	  var matrixValues = transform.split(',');
	  // translate X value is in 12th or 4th position
	  var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
	  var translateX = parseInt( matrixValues[ xIndex ], 10 );
	  // translate Y value is in 13th or 5th position
	  var translateY = parseInt( matrixValues[ xIndex + 1 ], 10 );
	  this.position.x += translateX;
	  this.position.y += translateY;
	};

	// -------------------------- events -------------------------- //

	/**
	 * pointer start
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerDown = function( event, pointer ) {
	  this._dragPointerDown( event, pointer );
	  // kludge to blur focused inputs in dragger
	  var focused = document.activeElement;
	  // do not blur body for IE10, metafizzy/flickity#117
	  if ( focused && focused.blur && focused != document.body ) {
	    focused.blur();
	  }
	  // bind move and end events
	  this._bindPostStartEvents( event );
	  this.element.classList.add('is-pointer-down');
	  this.dispatchEvent( 'pointerDown', event, [ pointer ] );
	};

	/**
	 * drag move
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerMove = function( event, pointer ) {
	  var moveVector = this._dragPointerMove( event, pointer );
	  this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
	  this._dragMove( event, pointer, moveVector );
	};

	/**
	 * drag start
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.dragStart = function( event, pointer ) {
	  if ( !this.isEnabled ) {
	    return;
	  }
	  this._getPosition();
	  this.measureContainment();
	  // position _when_ drag began
	  this.startPosition.x = this.position.x;
	  this.startPosition.y = this.position.y;
	  // reset left/top style
	  this.setLeftTop();

	  this.dragPoint.x = 0;
	  this.dragPoint.y = 0;

	  this.element.classList.add('is-dragging');
	  this.dispatchEvent( 'dragStart', event, [ pointer ] );
	  // start animation
	  this.animate();
	};

	proto.measureContainment = function() {
	  var containment = this.options.containment;
	  if ( !containment ) {
	    return;
	  }

	  // use element if element
	  var container = isElement( containment ) ? containment :
	    // fallback to querySelector if string
	    typeof containment == 'string' ? document.querySelector( containment ) :
	    // otherwise just `true`, use the parent
	    this.element.parentNode;

	  var elemSize = getSize( this.element );
	  var containerSize = getSize( container );
	  var elemRect = this.element.getBoundingClientRect();
	  var containerRect = container.getBoundingClientRect();

	  var borderSizeX = containerSize.borderLeftWidth + containerSize.borderRightWidth;
	  var borderSizeY = containerSize.borderTopWidth + containerSize.borderBottomWidth;

	  var position = this.relativeStartPosition = {
	    x: elemRect.left - ( containerRect.left + containerSize.borderLeftWidth ),
	    y: elemRect.top - ( containerRect.top + containerSize.borderTopWidth )
	  };

	  this.containSize = {
	    width: ( containerSize.width - borderSizeX ) - position.x - elemSize.width,
	    height: ( containerSize.height - borderSizeY ) - position.y - elemSize.height
	  };
	};

	// ----- move event ----- //

	/**
	 * drag move
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.dragMove = function( event, pointer, moveVector ) {
	  if ( !this.isEnabled ) {
	    return;
	  }
	  var dragX = moveVector.x;
	  var dragY = moveVector.y;

	  var grid = this.options.grid;
	  var gridX = grid && grid[0];
	  var gridY = grid && grid[1];

	  dragX = applyGrid( dragX, gridX );
	  dragY = applyGrid( dragY, gridY );

	  dragX = this.containDrag( 'x', dragX, gridX );
	  dragY = this.containDrag( 'y', dragY, gridY );

	  // constrain to axis
	  dragX = this.options.axis == 'y' ? 0 : dragX;
	  dragY = this.options.axis == 'x' ? 0 : dragY;

	  this.position.x = this.startPosition.x + dragX;
	  this.position.y = this.startPosition.y + dragY;
	  // set dragPoint properties
	  this.dragPoint.x = dragX;
	  this.dragPoint.y = dragY;

	  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
	};

	function applyGrid( value, grid, method ) {
	  method = method || 'round';
	  return grid ? Math[ method ]( value / grid ) * grid : value;
	}

	proto.containDrag = function( axis, drag, grid ) {
	  if ( !this.options.containment ) {
	    return drag;
	  }
	  var measure = axis == 'x' ? 'width' : 'height';

	  var rel = this.relativeStartPosition[ axis ];
	  var min = applyGrid( -rel, grid, 'ceil' );
	  var max = this.containSize[ measure ];
	  max = applyGrid( max, grid, 'floor' );
	  return  Math.min( max, Math.max( min, drag ) );
	};

	// ----- end event ----- //

	/**
	 * pointer up
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerUp = function( event, pointer ) {
	  this.element.classList.remove('is-pointer-down');
	  this.dispatchEvent( 'pointerUp', event, [ pointer ] );
	  this._dragPointerUp( event, pointer );
	};

	/**
	 * drag end
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.dragEnd = function( event, pointer ) {
	  if ( !this.isEnabled ) {
	    return;
	  }
	  // use top left position when complete
	  if ( transformProperty ) {
	    this.element.style[ transformProperty ] = '';
	    this.setLeftTop();
	  }
	  this.element.classList.remove('is-dragging');
	  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
	};

	// -------------------------- animation -------------------------- //

	proto.animate = function() {
	  // only render and animate if dragging
	  if ( !this.isDragging ) {
	    return;
	  }

	  this.positionDrag();

	  var _this = this;
	  requestAnimationFrame( function animateFrame() {
	    _this.animate();
	  });

	};

	// left/top positioning
	proto.setLeftTop = function() {
	  this.element.style.left = this.position.x + 'px';
	  this.element.style.top  = this.position.y + 'px';
	};

	proto.positionDrag = function() {
	  this.element.style[ transformProperty ] = 'translate3d( ' + this.dragPoint.x +
	    'px, ' + this.dragPoint.y + 'px, 0)';
	};

	// ----- staticClick ----- //

	proto.staticClick = function( event, pointer ) {
	  this.dispatchEvent( 'staticClick', event, [ pointer ] );
	};

	// ----- methods ----- //

	proto.enable = function() {
	  this.isEnabled = true;
	};

	proto.disable = function() {
	  this.isEnabled = false;
	  if ( this.isDragging ) {
	    this.dragEnd();
	  }
	};

	proto.destroy = function() {
	  this.disable();
	  // reset styles
	  this.element.style[ transformProperty ] = '';
	  this.element.style.left = '';
	  this.element.style.top = '';
	  this.element.style.position = '';
	  // unbind handles
	  this.unbindHandles();
	  // remove jQuery data
	  if ( this.$element ) {
	    this.$element.removeData('draggabilly');
	  }
	};

	// ----- jQuery bridget ----- //

	// required for jQuery bridget
	proto._init = noop;

	if ( jQuery && jQuery.bridget ) {
	  jQuery.bridget( 'draggabilly', Draggabilly );
	}

	// -----  ----- //

	return Draggabilly;

	}));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * getSize v2.0.2
	 * measure size of elements
	 * MIT license
	 */

	/*jshint browser: true, strict: true, undef: true, unused: true */
	/*global define: false, module: false, console: false */

	( function( window, factory ) {
	  'use strict';

	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return factory();
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory();
	  } else {
	    // browser global
	    window.getSize = factory();
	  }

	})( window, function factory() {
	'use strict';

	// -------------------------- helpers -------------------------- //

	// get a number from a string, not a percentage
	function getStyleSize( value ) {
	  var num = parseFloat( value );
	  // not a percent like '100%', and a number
	  var isValid = value.indexOf('%') == -1 && !isNaN( num );
	  return isValid && num;
	}

	function noop() {}

	var logError = typeof console == 'undefined' ? noop :
	  function( message ) {
	    console.error( message );
	  };

	// -------------------------- measurements -------------------------- //

	var measurements = [
	  'paddingLeft',
	  'paddingRight',
	  'paddingTop',
	  'paddingBottom',
	  'marginLeft',
	  'marginRight',
	  'marginTop',
	  'marginBottom',
	  'borderLeftWidth',
	  'borderRightWidth',
	  'borderTopWidth',
	  'borderBottomWidth'
	];

	var measurementsLength = measurements.length;

	function getZeroSize() {
	  var size = {
	    width: 0,
	    height: 0,
	    innerWidth: 0,
	    innerHeight: 0,
	    outerWidth: 0,
	    outerHeight: 0
	  };
	  for ( var i=0; i < measurementsLength; i++ ) {
	    var measurement = measurements[i];
	    size[ measurement ] = 0;
	  }
	  return size;
	}

	// -------------------------- getStyle -------------------------- //

	/**
	 * getStyle, get style of element, check for Firefox bug
	 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	 */
	function getStyle( elem ) {
	  var style = getComputedStyle( elem );
	  if ( !style ) {
	    logError( 'Style returned ' + style +
	      '. Are you running this code in a hidden iframe on Firefox? ' +
	      'See http://bit.ly/getsizebug1' );
	  }
	  return style;
	}

	// -------------------------- setup -------------------------- //

	var isSetup = false;

	var isBoxSizeOuter;

	/**
	 * setup
	 * check isBoxSizerOuter
	 * do on first getSize() rather than on page load for Firefox bug
	 */
	function setup() {
	  // setup once
	  if ( isSetup ) {
	    return;
	  }
	  isSetup = true;

	  // -------------------------- box sizing -------------------------- //

	  /**
	   * WebKit measures the outer-width on style.width on border-box elems
	   * IE & Firefox<29 measures the inner-width
	   */
	  var div = document.createElement('div');
	  div.style.width = '200px';
	  div.style.padding = '1px 2px 3px 4px';
	  div.style.borderStyle = 'solid';
	  div.style.borderWidth = '1px 2px 3px 4px';
	  div.style.boxSizing = 'border-box';

	  var body = document.body || document.documentElement;
	  body.appendChild( div );
	  var style = getStyle( div );

	  getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize( style.width ) == 200;
	  body.removeChild( div );

	}

	// -------------------------- getSize -------------------------- //

	function getSize( elem ) {
	  setup();

	  // use querySeletor if elem is string
	  if ( typeof elem == 'string' ) {
	    elem = document.querySelector( elem );
	  }

	  // do not proceed on non-objects
	  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
	    return;
	  }

	  var style = getStyle( elem );

	  // if hidden, everything is 0
	  if ( style.display == 'none' ) {
	    return getZeroSize();
	  }

	  var size = {};
	  size.width = elem.offsetWidth;
	  size.height = elem.offsetHeight;

	  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

	  // get all measurements
	  for ( var i=0; i < measurementsLength; i++ ) {
	    var measurement = measurements[i];
	    var value = style[ measurement ];
	    var num = parseFloat( value );
	    // any 'auto', 'medium' value will be 0
	    size[ measurement ] = !isNaN( num ) ? num : 0;
	  }

	  var paddingWidth = size.paddingLeft + size.paddingRight;
	  var paddingHeight = size.paddingTop + size.paddingBottom;
	  var marginWidth = size.marginLeft + size.marginRight;
	  var marginHeight = size.marginTop + size.marginBottom;
	  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
	  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

	  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

	  // overwrite width and height if we can get it from style
	  var styleWidth = getStyleSize( style.width );
	  if ( styleWidth !== false ) {
	    size.width = styleWidth +
	      // add padding and border unless it's already including it
	      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
	  }

	  var styleHeight = getStyleSize( style.height );
	  if ( styleHeight !== false ) {
	    size.height = styleHeight +
	      // add padding and border unless it's already including it
	      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
	  }

	  size.innerWidth = size.width - ( paddingWidth + borderWidth );
	  size.innerHeight = size.height - ( paddingHeight + borderHeight );

	  size.outerWidth = size.width + marginWidth;
	  size.outerHeight = size.height + marginHeight;

	  return size;
	}

	return getSize;

	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Unidragger v2.1.0
	 * Draggable base class
	 * MIT license
	 */

	/*jshint browser: true, unused: true, undef: true, strict: true */

	( function( window, factory ) {
	  // universal module definition
	  /*jshint strict: false */ /*globals define, module, require */

	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(6)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( Unipointer ) {
	      return factory( window, Unipointer );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('unipointer')
	    );
	  } else {
	    // browser global
	    window.Unidragger = factory(
	      window,
	      window.Unipointer
	    );
	  }

	}( window, function factory( window, Unipointer ) {

	'use strict';

	// -----  ----- //

	function noop() {}

	// -------------------------- Unidragger -------------------------- //

	function Unidragger() {}

	// inherit Unipointer & EvEmitter
	var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

	// ----- bind start ----- //

	proto.bindHandles = function() {
	  this._bindHandles( true );
	};

	proto.unbindHandles = function() {
	  this._bindHandles( false );
	};

	var navigator = window.navigator;
	/**
	 * works as unbinder, as you can .bindHandles( false ) to unbind
	 * @param {Boolean} isBind - will unbind if falsey
	 */
	proto._bindHandles = function( isBind ) {
	  // munge isBind, default to true
	  isBind = isBind === undefined ? true : !!isBind;
	  // extra bind logic
	  var binderExtra;
	  if ( navigator.pointerEnabled ) {
	    binderExtra = function( handle ) {
	      // disable scrolling on the element
	      handle.style.touchAction = isBind ? 'none' : '';
	    };
	  } else if ( navigator.msPointerEnabled ) {
	    binderExtra = function( handle ) {
	      // disable scrolling on the element
	      handle.style.msTouchAction = isBind ? 'none' : '';
	    };
	  } else {
	    binderExtra = noop;
	  }
	  // bind each handle
	  var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';
	  for ( var i=0; i < this.handles.length; i++ ) {
	    var handle = this.handles[i];
	    this._bindStartEvent( handle, isBind );
	    binderExtra( handle );
	    handle[ bindMethod ]( 'click', this );
	  }
	};

	// ----- start event ----- //

	/**
	 * pointer start
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerDown = function( event, pointer ) {
	  // dismiss range sliders
	  if ( event.target.nodeName == 'INPUT' && event.target.type == 'range' ) {
	    // reset pointerDown logic
	    this.isPointerDown = false;
	    delete this.pointerIdentifier;
	    return;
	  }

	  this._dragPointerDown( event, pointer );
	  // kludge to blur focused inputs in dragger
	  var focused = document.activeElement;
	  if ( focused && focused.blur ) {
	    focused.blur();
	  }
	  // bind move and end events
	  this._bindPostStartEvents( event );
	  this.emitEvent( 'pointerDown', [ event, pointer ] );
	};

	// base pointer down logic
	proto._dragPointerDown = function( event, pointer ) {
	  // track to see when dragging starts
	  this.pointerDownPoint = Unipointer.getPointerPoint( pointer );

	  var canPreventDefault = this.canPreventDefaultOnPointerDown( event, pointer );
	  if ( canPreventDefault ) {
	    event.preventDefault();
	  }
	};

	// overwriteable method so Flickity can prevent for scrolling
	proto.canPreventDefaultOnPointerDown = function( event ) {
	  // prevent default, unless touchstart or <select>
	  return event.target.nodeName != 'SELECT';
	};

	// ----- move event ----- //

	/**
	 * drag move
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerMove = function( event, pointer ) {
	  var moveVector = this._dragPointerMove( event, pointer );
	  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
	  this._dragMove( event, pointer, moveVector );
	};

	// base pointer move logic
	proto._dragPointerMove = function( event, pointer ) {
	  var movePoint = Unipointer.getPointerPoint( pointer );
	  var moveVector = {
	    x: movePoint.x - this.pointerDownPoint.x,
	    y: movePoint.y - this.pointerDownPoint.y
	  };
	  // start drag if pointer has moved far enough to start drag
	  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
	    this._dragStart( event, pointer );
	  }
	  return moveVector;
	};

	// condition if pointer has moved far enough to start drag
	proto.hasDragStarted = function( moveVector ) {
	  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
	};


	// ----- end event ----- //

	/**
	 * pointer up
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerUp = function( event, pointer ) {
	  this.emitEvent( 'pointerUp', [ event, pointer ] );
	  this._dragPointerUp( event, pointer );
	};

	proto._dragPointerUp = function( event, pointer ) {
	  if ( this.isDragging ) {
	    this._dragEnd( event, pointer );
	  } else {
	    // pointer didn't move enough for drag to start
	    this._staticClick( event, pointer );
	  }
	};

	// -------------------------- drag -------------------------- //

	// dragStart
	proto._dragStart = function( event, pointer ) {
	  this.isDragging = true;
	  this.dragStartPoint = Unipointer.getPointerPoint( pointer );
	  // prevent clicks
	  this.isPreventingClicks = true;

	  this.dragStart( event, pointer );
	};

	proto.dragStart = function( event, pointer ) {
	  this.emitEvent( 'dragStart', [ event, pointer ] );
	};

	// dragMove
	proto._dragMove = function( event, pointer, moveVector ) {
	  // do not drag if not dragging yet
	  if ( !this.isDragging ) {
	    return;
	  }

	  this.dragMove( event, pointer, moveVector );
	};

	proto.dragMove = function( event, pointer, moveVector ) {
	  event.preventDefault();
	  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
	};

	// dragEnd
	proto._dragEnd = function( event, pointer ) {
	  // set flags
	  this.isDragging = false;
	  // re-enable clicking async
	  setTimeout( function() {
	    delete this.isPreventingClicks;
	  }.bind( this ) );

	  this.dragEnd( event, pointer );
	};

	proto.dragEnd = function( event, pointer ) {
	  this.emitEvent( 'dragEnd', [ event, pointer ] );
	};

	// ----- onclick ----- //

	// handle all clicks and prevent clicks when dragging
	proto.onclick = function( event ) {
	  if ( this.isPreventingClicks ) {
	    event.preventDefault();
	  }
	};

	// ----- staticClick ----- //

	// triggered after pointer down & up with no/tiny movement
	proto._staticClick = function( event, pointer ) {
	  // ignore emulated mouse up clicks
	  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
	    return;
	  }

	  // allow click in <input>s and <textarea>s
	  var nodeName = event.target.nodeName;
	  if ( nodeName == 'INPUT' || nodeName == 'TEXTAREA' ) {
	    event.target.focus();
	  }
	  this.staticClick( event, pointer );

	  // set flag for emulated clicks 300ms after touchend
	  if ( event.type != 'mouseup' ) {
	    this.isIgnoringMouseUp = true;
	    // reset flag after 300ms
	    setTimeout( function() {
	      delete this.isIgnoringMouseUp;
	    }.bind( this ), 400 );
	  }
	};

	proto.staticClick = function( event, pointer ) {
	  this.emitEvent( 'staticClick', [ event, pointer ] );
	};

	// ----- utils ----- //

	Unidragger.getPointerPoint = Unipointer.getPointerPoint;

	// -----  ----- //

	return Unidragger;

	}));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Unipointer v2.1.0
	 * base class for doing one thing with pointer event
	 * MIT license
	 */

	/*jshint browser: true, undef: true, unused: true, strict: true */

	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /*global define, module, require */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(7)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( EvEmitter ) {
	      return factory( window, EvEmitter );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('ev-emitter')
	    );
	  } else {
	    // browser global
	    window.Unipointer = factory(
	      window,
	      window.EvEmitter
	    );
	  }

	}( window, function factory( window, EvEmitter ) {

	'use strict';

	function noop() {}

	function Unipointer() {}

	// inherit EvEmitter
	var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

	proto.bindStartEvent = function( elem ) {
	  this._bindStartEvent( elem, true );
	};

	proto.unbindStartEvent = function( elem ) {
	  this._bindStartEvent( elem, false );
	};

	/**
	 * works as unbinder, as you can ._bindStart( false ) to unbind
	 * @param {Boolean} isBind - will unbind if falsey
	 */
	proto._bindStartEvent = function( elem, isBind ) {
	  // munge isBind, default to true
	  isBind = isBind === undefined ? true : !!isBind;
	  var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';

	  if ( window.navigator.pointerEnabled ) {
	    // W3C Pointer Events, IE11. See https://coderwall.com/p/mfreca
	    elem[ bindMethod ]( 'pointerdown', this );
	  } else if ( window.navigator.msPointerEnabled ) {
	    // IE10 Pointer Events
	    elem[ bindMethod ]( 'MSPointerDown', this );
	  } else {
	    // listen for both, for devices like Chrome Pixel
	    elem[ bindMethod ]( 'mousedown', this );
	    elem[ bindMethod ]( 'touchstart', this );
	  }
	};

	// trigger handler methods for events
	proto.handleEvent = function( event ) {
	  var method = 'on' + event.type;
	  if ( this[ method ] ) {
	    this[ method ]( event );
	  }
	};

	// returns the touch that we're keeping track of
	proto.getTouch = function( touches ) {
	  for ( var i=0; i < touches.length; i++ ) {
	    var touch = touches[i];
	    if ( touch.identifier == this.pointerIdentifier ) {
	      return touch;
	    }
	  }
	};

	// ----- start event ----- //

	proto.onmousedown = function( event ) {
	  // dismiss clicks from right or middle buttons
	  var button = event.button;
	  if ( button && ( button !== 0 && button !== 1 ) ) {
	    return;
	  }
	  this._pointerDown( event, event );
	};

	proto.ontouchstart = function( event ) {
	  this._pointerDown( event, event.changedTouches[0] );
	};

	proto.onMSPointerDown =
	proto.onpointerdown = function( event ) {
	  this._pointerDown( event, event );
	};

	/**
	 * pointer start
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto._pointerDown = function( event, pointer ) {
	  // dismiss other pointers
	  if ( this.isPointerDown ) {
	    return;
	  }

	  this.isPointerDown = true;
	  // save pointer identifier to match up touch events
	  this.pointerIdentifier = pointer.pointerId !== undefined ?
	    // pointerId for pointer events, touch.indentifier for touch events
	    pointer.pointerId : pointer.identifier;

	  this.pointerDown( event, pointer );
	};

	proto.pointerDown = function( event, pointer ) {
	  this._bindPostStartEvents( event );
	  this.emitEvent( 'pointerDown', [ event, pointer ] );
	};

	// hash of events to be bound after start event
	var postStartEvents = {
	  mousedown: [ 'mousemove', 'mouseup' ],
	  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
	  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
	  MSPointerDown: [ 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel' ]
	};

	proto._bindPostStartEvents = function( event ) {
	  if ( !event ) {
	    return;
	  }
	  // get proper events to match start event
	  var events = postStartEvents[ event.type ];
	  // bind events to node
	  events.forEach( function( eventName ) {
	    window.addEventListener( eventName, this );
	  }, this );
	  // save these arguments
	  this._boundPointerEvents = events;
	};

	proto._unbindPostStartEvents = function() {
	  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
	  if ( !this._boundPointerEvents ) {
	    return;
	  }
	  this._boundPointerEvents.forEach( function( eventName ) {
	    window.removeEventListener( eventName, this );
	  }, this );

	  delete this._boundPointerEvents;
	};

	// ----- move event ----- //

	proto.onmousemove = function( event ) {
	  this._pointerMove( event, event );
	};

	proto.onMSPointerMove =
	proto.onpointermove = function( event ) {
	  if ( event.pointerId == this.pointerIdentifier ) {
	    this._pointerMove( event, event );
	  }
	};

	proto.ontouchmove = function( event ) {
	  var touch = this.getTouch( event.changedTouches );
	  if ( touch ) {
	    this._pointerMove( event, touch );
	  }
	};

	/**
	 * pointer move
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 * @private
	 */
	proto._pointerMove = function( event, pointer ) {
	  this.pointerMove( event, pointer );
	};

	// public
	proto.pointerMove = function( event, pointer ) {
	  this.emitEvent( 'pointerMove', [ event, pointer ] );
	};

	// ----- end event ----- //


	proto.onmouseup = function( event ) {
	  this._pointerUp( event, event );
	};

	proto.onMSPointerUp =
	proto.onpointerup = function( event ) {
	  if ( event.pointerId == this.pointerIdentifier ) {
	    this._pointerUp( event, event );
	  }
	};

	proto.ontouchend = function( event ) {
	  var touch = this.getTouch( event.changedTouches );
	  if ( touch ) {
	    this._pointerUp( event, touch );
	  }
	};

	/**
	 * pointer up
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 * @private
	 */
	proto._pointerUp = function( event, pointer ) {
	  this._pointerDone();
	  this.pointerUp( event, pointer );
	};

	// public
	proto.pointerUp = function( event, pointer ) {
	  this.emitEvent( 'pointerUp', [ event, pointer ] );
	};

	// ----- pointer done ----- //

	// triggered on pointer up & pointer cancel
	proto._pointerDone = function() {
	  // reset properties
	  this.isPointerDown = false;
	  delete this.pointerIdentifier;
	  // remove events
	  this._unbindPostStartEvents();
	  this.pointerDone();
	};

	proto.pointerDone = noop;

	// ----- pointer cancel ----- //

	proto.onMSPointerCancel =
	proto.onpointercancel = function( event ) {
	  if ( event.pointerId == this.pointerIdentifier ) {
	    this._pointerCancel( event, event );
	  }
	};

	proto.ontouchcancel = function( event ) {
	  var touch = this.getTouch( event.changedTouches );
	  if ( touch ) {
	    this._pointerCancel( event, touch );
	  }
	};

	/**
	 * pointer cancel
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 * @private
	 */
	proto._pointerCancel = function( event, pointer ) {
	  this._pointerDone();
	  this.pointerCancel( event, pointer );
	};

	// public
	proto.pointerCancel = function( event, pointer ) {
	  this.emitEvent( 'pointerCancel', [ event, pointer ] );
	};

	// -----  ----- //

	// utility function for getting x/y coords from event
	Unipointer.getPointerPoint = function( pointer ) {
	  return {
	    x: pointer.pageX,
	    y: pointer.pageY
	  };
	};

	// -----  ----- //

	return Unipointer;

	}));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * EvEmitter v1.0.2
	 * Lil' event emitter
	 * MIT License
	 */

	/* jshint unused: true, undef: true, strict: true */

	( function( global, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /* globals define, module */
	  if ( true ) {
	    // AMD - RequireJS
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS - Browserify, Webpack
	    module.exports = factory();
	  } else {
	    // Browser globals
	    global.EvEmitter = factory();
	  }

	}( this, function() {

	"use strict";

	function EvEmitter() {}

	var proto = EvEmitter.prototype;

	proto.on = function( eventName, listener ) {
	  if ( !eventName || !listener ) {
	    return;
	  }
	  // set events hash
	  var events = this._events = this._events || {};
	  // set listeners array
	  var listeners = events[ eventName ] = events[ eventName ] || [];
	  // only add once
	  if ( listeners.indexOf( listener ) == -1 ) {
	    listeners.push( listener );
	  }

	  return this;
	};

	proto.once = function( eventName, listener ) {
	  if ( !eventName || !listener ) {
	    return;
	  }
	  // add event
	  this.on( eventName, listener );
	  // set once flag
	  // set onceEvents hash
	  var onceEvents = this._onceEvents = this._onceEvents || {};
	  // set onceListeners object
	  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
	  // set flag
	  onceListeners[ listener ] = true;

	  return this;
	};

	proto.off = function( eventName, listener ) {
	  var listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) {
	    return;
	  }
	  var index = listeners.indexOf( listener );
	  if ( index != -1 ) {
	    listeners.splice( index, 1 );
	  }

	  return this;
	};

	proto.emitEvent = function( eventName, args ) {
	  var listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) {
	    return;
	  }
	  var i = 0;
	  var listener = listeners[i];
	  args = args || [];
	  // once stuff
	  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

	  while ( listener ) {
	    var isOnce = onceListeners && onceListeners[ listener ];
	    if ( isOnce ) {
	      // remove listener
	      // remove before trigger to prevent recursion
	      this.off( eventName, listener );
	      // unset once flag
	      delete onceListeners[ listener ];
	    }
	    // trigger listener
	    listener.apply( this, args );
	    // get next listener
	    i += isOnce ? 0 : 1;
	    listener = listeners[i];
	  }

	  return this;
	};

	return EvEmitter;

	}));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Storage = __webpack_require__(9);

	var _Storage2 = _interopRequireDefault(_Storage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var configs = {};

	var config = {
	    create: function create(name) {
	        if (!configs[name]) configs[name] = new _Storage2.default(name);

	        return configs[name];
	    }
	};

	exports.default = config;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var localStore = {
	    _storage: window.localStorage,
	    get: function get(key) {
	        var val = this._storage.getItem(key);

	        try {
	            val = JSON.parse(val);
	        } catch (e) {}

	        return val;
	    },
	    set: function set(key, val) {
	        if (_util2.default.isObj(val)) val = JSON.stringify(val);

	        this._storage.setItem(key, val);

	        return this;
	    },
	    remove: function remove(key) {
	        this._storage.removeItem(key);

	        return this;
	    }
	};

	var Storage = function (_util$Emitter) {
	    _inherits(Storage, _util$Emitter);

	    function Storage(name) {
	        _classCallCheck(this, Storage);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Storage).call(this));

	        _this._name = name;
	        _this._val = localStore.get(name);
	        if (!_this._val || !_util2.default.isObj(_this._val)) _this._val = {};
	        return _this;
	    }

	    _createClass(Storage, [{
	        key: 'save',
	        value: function save() {
	            localStore.set(this._name, this._val);

	            return this;
	        }
	    }, {
	        key: 'get',
	        value: function get(key) {
	            if (_util2.default.isUndef(key)) return this._val;

	            return this._val[key];
	        }
	    }, {
	        key: 'set',
	        value: function set(key, val) {
	            var _this2 = this;

	            var kv;

	            if (_util2.default.isObj(key)) {
	                kv = key;
	            } else {
	                kv = {};
	                kv[key] = val;
	            }

	            _util2.default.each(kv, function (val, key) {
	                var preVal = _this2._val[key];
	                _this2._val[key] = val;
	                if (preVal !== val) _this2.emit('change', key, val);
	            });

	            return this.save();
	        }
	    }]);

	    return Storage;
	}(_util2.default.Emitter);

	exports.default = Storage;
	;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./EntryBtn.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./EntryBtn.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-container .eruda-home-btn {\n  width: 40px;\n  height: 40px;\n  background: #000;\n  opacity: 0.3;\n  border-radius: 10px;\n  position: relative;\n  z-index: 1000;\n  -webkit-transition: opacity .3s;\n  transition: opacity .3s;\n  color: #fff;\n  font-size: 25px;\n  text-align: center;\n  line-height: 40px; }\n  .eruda-container .eruda-home-btn span {\n    position: relative;\n    top: 1px; }\n  .eruda-container .eruda-home-btn.eruda-active {\n    opacity: .8; }\n", ""]);

	// exports


/***/ },
/* 12 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<div class=\"eruda-home-btn\">\r\n    <span class=\"eruda-icon-terminal\"></span>\r\n</div>";
	},"useData":true});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*!

	 handlebars v4.0.5

	Copyright (C) 2011-2015 by Yehuda Katz

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

	@license
	*/
	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["Handlebars"] = factory();
		else
			root["Handlebars"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _interopRequireWildcard = __webpack_require__(1)['default'];

		var _interopRequireDefault = __webpack_require__(2)['default'];

		exports.__esModule = true;

		var _handlebarsBase = __webpack_require__(3);

		var base = _interopRequireWildcard(_handlebarsBase);

		// Each of these augment the Handlebars object. No need to setup here.
		// (This is done to easily share code between commonjs and browse envs)

		var _handlebarsSafeString = __webpack_require__(17);

		var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

		var _handlebarsException = __webpack_require__(5);

		var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

		var _handlebarsUtils = __webpack_require__(4);

		var Utils = _interopRequireWildcard(_handlebarsUtils);

		var _handlebarsRuntime = __webpack_require__(18);

		var runtime = _interopRequireWildcard(_handlebarsRuntime);

		var _handlebarsNoConflict = __webpack_require__(19);

		var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

		// For compatibility and usage outside of module systems, make the Handlebars object a namespace
		function create() {
		  var hb = new base.HandlebarsEnvironment();

		  Utils.extend(hb, base);
		  hb.SafeString = _handlebarsSafeString2['default'];
		  hb.Exception = _handlebarsException2['default'];
		  hb.Utils = Utils;
		  hb.escapeExpression = Utils.escapeExpression;

		  hb.VM = runtime;
		  hb.template = function (spec) {
		    return runtime.template(spec, hb);
		  };

		  return hb;
		}

		var inst = create();
		inst.create = create;

		_handlebarsNoConflict2['default'](inst);

		inst['default'] = inst;

		exports['default'] = inst;
		module.exports = exports['default'];

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		"use strict";

		exports["default"] = function (obj) {
		  if (obj && obj.__esModule) {
		    return obj;
		  } else {
		    var newObj = {};

		    if (obj != null) {
		      for (var key in obj) {
		        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
		      }
		    }

		    newObj["default"] = obj;
		    return newObj;
		  }
		};

		exports.__esModule = true;

	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		"use strict";

		exports["default"] = function (obj) {
		  return obj && obj.__esModule ? obj : {
		    "default": obj
		  };
		};

		exports.__esModule = true;

	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _interopRequireDefault = __webpack_require__(2)['default'];

		exports.__esModule = true;
		exports.HandlebarsEnvironment = HandlebarsEnvironment;

		var _utils = __webpack_require__(4);

		var _exception = __webpack_require__(5);

		var _exception2 = _interopRequireDefault(_exception);

		var _helpers = __webpack_require__(6);

		var _decorators = __webpack_require__(14);

		var _logger = __webpack_require__(16);

		var _logger2 = _interopRequireDefault(_logger);

		var VERSION = '4.0.5';
		exports.VERSION = VERSION;
		var COMPILER_REVISION = 7;

		exports.COMPILER_REVISION = COMPILER_REVISION;
		var REVISION_CHANGES = {
		  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
		  2: '== 1.0.0-rc.3',
		  3: '== 1.0.0-rc.4',
		  4: '== 1.x.x',
		  5: '== 2.0.0-alpha.x',
		  6: '>= 2.0.0-beta.1',
		  7: '>= 4.0.0'
		};

		exports.REVISION_CHANGES = REVISION_CHANGES;
		var objectType = '[object Object]';

		function HandlebarsEnvironment(helpers, partials, decorators) {
		  this.helpers = helpers || {};
		  this.partials = partials || {};
		  this.decorators = decorators || {};

		  _helpers.registerDefaultHelpers(this);
		  _decorators.registerDefaultDecorators(this);
		}

		HandlebarsEnvironment.prototype = {
		  constructor: HandlebarsEnvironment,

		  logger: _logger2['default'],
		  log: _logger2['default'].log,

		  registerHelper: function registerHelper(name, fn) {
		    if (_utils.toString.call(name) === objectType) {
		      if (fn) {
		        throw new _exception2['default']('Arg not supported with multiple helpers');
		      }
		      _utils.extend(this.helpers, name);
		    } else {
		      this.helpers[name] = fn;
		    }
		  },
		  unregisterHelper: function unregisterHelper(name) {
		    delete this.helpers[name];
		  },

		  registerPartial: function registerPartial(name, partial) {
		    if (_utils.toString.call(name) === objectType) {
		      _utils.extend(this.partials, name);
		    } else {
		      if (typeof partial === 'undefined') {
		        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
		      }
		      this.partials[name] = partial;
		    }
		  },
		  unregisterPartial: function unregisterPartial(name) {
		    delete this.partials[name];
		  },

		  registerDecorator: function registerDecorator(name, fn) {
		    if (_utils.toString.call(name) === objectType) {
		      if (fn) {
		        throw new _exception2['default']('Arg not supported with multiple decorators');
		      }
		      _utils.extend(this.decorators, name);
		    } else {
		      this.decorators[name] = fn;
		    }
		  },
		  unregisterDecorator: function unregisterDecorator(name) {
		    delete this.decorators[name];
		  }
		};

		var log = _logger2['default'].log;

		exports.log = log;
		exports.createFrame = _utils.createFrame;
		exports.logger = _logger2['default'];

	/***/ },
	/* 4 */
	/***/ function(module, exports) {

		'use strict';

		exports.__esModule = true;
		exports.extend = extend;
		exports.indexOf = indexOf;
		exports.escapeExpression = escapeExpression;
		exports.isEmpty = isEmpty;
		exports.createFrame = createFrame;
		exports.blockParams = blockParams;
		exports.appendContextPath = appendContextPath;
		var escape = {
		  '&': '&amp;',
		  '<': '&lt;',
		  '>': '&gt;',
		  '"': '&quot;',
		  "'": '&#x27;',
		  '`': '&#x60;',
		  '=': '&#x3D;'
		};

		var badChars = /[&<>"'`=]/g,
		    possible = /[&<>"'`=]/;

		function escapeChar(chr) {
		  return escape[chr];
		}

		function extend(obj /* , ...source */) {
		  for (var i = 1; i < arguments.length; i++) {
		    for (var key in arguments[i]) {
		      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
		        obj[key] = arguments[i][key];
		      }
		    }
		  }

		  return obj;
		}

		var toString = Object.prototype.toString;

		exports.toString = toString;
		// Sourced from lodash
		// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
		/* eslint-disable func-style */
		var isFunction = function isFunction(value) {
		  return typeof value === 'function';
		};
		// fallback for older versions of Chrome and Safari
		/* istanbul ignore next */
		if (isFunction(/x/)) {
		  exports.isFunction = isFunction = function (value) {
		    return typeof value === 'function' && toString.call(value) === '[object Function]';
		  };
		}
		exports.isFunction = isFunction;

		/* eslint-enable func-style */

		/* istanbul ignore next */
		var isArray = Array.isArray || function (value) {
		  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
		};

		exports.isArray = isArray;
		// Older IE versions do not directly support indexOf so we must implement our own, sadly.

		function indexOf(array, value) {
		  for (var i = 0, len = array.length; i < len; i++) {
		    if (array[i] === value) {
		      return i;
		    }
		  }
		  return -1;
		}

		function escapeExpression(string) {
		  if (typeof string !== 'string') {
		    // don't escape SafeStrings, since they're already safe
		    if (string && string.toHTML) {
		      return string.toHTML();
		    } else if (string == null) {
		      return '';
		    } else if (!string) {
		      return string + '';
		    }

		    // Force a string conversion as this will be done by the append regardless and
		    // the regex test will do this transparently behind the scenes, causing issues if
		    // an object's to string has escaped characters in it.
		    string = '' + string;
		  }

		  if (!possible.test(string)) {
		    return string;
		  }
		  return string.replace(badChars, escapeChar);
		}

		function isEmpty(value) {
		  if (!value && value !== 0) {
		    return true;
		  } else if (isArray(value) && value.length === 0) {
		    return true;
		  } else {
		    return false;
		  }
		}

		function createFrame(object) {
		  var frame = extend({}, object);
		  frame._parent = object;
		  return frame;
		}

		function blockParams(params, ids) {
		  params.path = ids;
		  return params;
		}

		function appendContextPath(contextPath, id) {
		  return (contextPath ? contextPath + '.' : '') + id;
		}

	/***/ },
	/* 5 */
	/***/ function(module, exports) {

		'use strict';

		exports.__esModule = true;

		var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

		function Exception(message, node) {
		  var loc = node && node.loc,
		      line = undefined,
		      column = undefined;
		  if (loc) {
		    line = loc.start.line;
		    column = loc.start.column;

		    message += ' - ' + line + ':' + column;
		  }

		  var tmp = Error.prototype.constructor.call(this, message);

		  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
		  for (var idx = 0; idx < errorProps.length; idx++) {
		    this[errorProps[idx]] = tmp[errorProps[idx]];
		  }

		  /* istanbul ignore else */
		  if (Error.captureStackTrace) {
		    Error.captureStackTrace(this, Exception);
		  }

		  if (loc) {
		    this.lineNumber = line;
		    this.column = column;
		  }
		}

		Exception.prototype = new Error();

		exports['default'] = Exception;
		module.exports = exports['default'];

	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _interopRequireDefault = __webpack_require__(2)['default'];

		exports.__esModule = true;
		exports.registerDefaultHelpers = registerDefaultHelpers;

		var _helpersBlockHelperMissing = __webpack_require__(7);

		var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

		var _helpersEach = __webpack_require__(8);

		var _helpersEach2 = _interopRequireDefault(_helpersEach);

		var _helpersHelperMissing = __webpack_require__(9);

		var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

		var _helpersIf = __webpack_require__(10);

		var _helpersIf2 = _interopRequireDefault(_helpersIf);

		var _helpersLog = __webpack_require__(11);

		var _helpersLog2 = _interopRequireDefault(_helpersLog);

		var _helpersLookup = __webpack_require__(12);

		var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

		var _helpersWith = __webpack_require__(13);

		var _helpersWith2 = _interopRequireDefault(_helpersWith);

		function registerDefaultHelpers(instance) {
		  _helpersBlockHelperMissing2['default'](instance);
		  _helpersEach2['default'](instance);
		  _helpersHelperMissing2['default'](instance);
		  _helpersIf2['default'](instance);
		  _helpersLog2['default'](instance);
		  _helpersLookup2['default'](instance);
		  _helpersWith2['default'](instance);
		}

	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		exports.__esModule = true;

		var _utils = __webpack_require__(4);

		exports['default'] = function (instance) {
		  instance.registerHelper('blockHelperMissing', function (context, options) {
		    var inverse = options.inverse,
		        fn = options.fn;

		    if (context === true) {
		      return fn(this);
		    } else if (context === false || context == null) {
		      return inverse(this);
		    } else if (_utils.isArray(context)) {
		      if (context.length > 0) {
		        if (options.ids) {
		          options.ids = [options.name];
		        }

		        return instance.helpers.each(context, options);
		      } else {
		        return inverse(this);
		      }
		    } else {
		      if (options.data && options.ids) {
		        var data = _utils.createFrame(options.data);
		        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
		        options = { data: data };
		      }

		      return fn(context, options);
		    }
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _interopRequireDefault = __webpack_require__(2)['default'];

		exports.__esModule = true;

		var _utils = __webpack_require__(4);

		var _exception = __webpack_require__(5);

		var _exception2 = _interopRequireDefault(_exception);

		exports['default'] = function (instance) {
		  instance.registerHelper('each', function (context, options) {
		    if (!options) {
		      throw new _exception2['default']('Must pass iterator to #each');
		    }

		    var fn = options.fn,
		        inverse = options.inverse,
		        i = 0,
		        ret = '',
		        data = undefined,
		        contextPath = undefined;

		    if (options.data && options.ids) {
		      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
		    }

		    if (_utils.isFunction(context)) {
		      context = context.call(this);
		    }

		    if (options.data) {
		      data = _utils.createFrame(options.data);
		    }

		    function execIteration(field, index, last) {
		      if (data) {
		        data.key = field;
		        data.index = index;
		        data.first = index === 0;
		        data.last = !!last;

		        if (contextPath) {
		          data.contextPath = contextPath + field;
		        }
		      }

		      ret = ret + fn(context[field], {
		        data: data,
		        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
		      });
		    }

		    if (context && typeof context === 'object') {
		      if (_utils.isArray(context)) {
		        for (var j = context.length; i < j; i++) {
		          if (i in context) {
		            execIteration(i, i, i === context.length - 1);
		          }
		        }
		      } else {
		        var priorKey = undefined;

		        for (var key in context) {
		          if (context.hasOwnProperty(key)) {
		            // We're running the iterations one step out of sync so we can detect
		            // the last iteration without have to scan the object twice and create
		            // an itermediate keys array.
		            if (priorKey !== undefined) {
		              execIteration(priorKey, i - 1);
		            }
		            priorKey = key;
		            i++;
		          }
		        }
		        if (priorKey !== undefined) {
		          execIteration(priorKey, i - 1, true);
		        }
		      }
		    }

		    if (i === 0) {
		      ret = inverse(this);
		    }

		    return ret;
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _interopRequireDefault = __webpack_require__(2)['default'];

		exports.__esModule = true;

		var _exception = __webpack_require__(5);

		var _exception2 = _interopRequireDefault(_exception);

		exports['default'] = function (instance) {
		  instance.registerHelper('helperMissing', function () /* [args, ]options */{
		    if (arguments.length === 1) {
		      // A missing field in a {{foo}} construct.
		      return undefined;
		    } else {
		      // Someone is actually trying to call something, blow up.
		      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
		    }
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		exports.__esModule = true;

		var _utils = __webpack_require__(4);

		exports['default'] = function (instance) {
		  instance.registerHelper('if', function (conditional, options) {
		    if (_utils.isFunction(conditional)) {
		      conditional = conditional.call(this);
		    }

		    // Default behavior is to render the positive path if the value is truthy and not empty.
		    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
		    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
		    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
		      return options.inverse(this);
		    } else {
		      return options.fn(this);
		    }
		  });

		  instance.registerHelper('unless', function (conditional, options) {
		    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 11 */
	/***/ function(module, exports) {

		'use strict';

		exports.__esModule = true;

		exports['default'] = function (instance) {
		  instance.registerHelper('log', function () /* message, options */{
		    var args = [undefined],
		        options = arguments[arguments.length - 1];
		    for (var i = 0; i < arguments.length - 1; i++) {
		      args.push(arguments[i]);
		    }

		    var level = 1;
		    if (options.hash.level != null) {
		      level = options.hash.level;
		    } else if (options.data && options.data.level != null) {
		      level = options.data.level;
		    }
		    args[0] = level;

		    instance.log.apply(instance, args);
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 12 */
	/***/ function(module, exports) {

		'use strict';

		exports.__esModule = true;

		exports['default'] = function (instance) {
		  instance.registerHelper('lookup', function (obj, field) {
		    return obj && obj[field];
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		exports.__esModule = true;

		var _utils = __webpack_require__(4);

		exports['default'] = function (instance) {
		  instance.registerHelper('with', function (context, options) {
		    if (_utils.isFunction(context)) {
		      context = context.call(this);
		    }

		    var fn = options.fn;

		    if (!_utils.isEmpty(context)) {
		      var data = options.data;
		      if (options.data && options.ids) {
		        data = _utils.createFrame(options.data);
		        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
		      }

		      return fn(context, {
		        data: data,
		        blockParams: _utils.blockParams([context], [data && data.contextPath])
		      });
		    } else {
		      return options.inverse(this);
		    }
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 14 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _interopRequireDefault = __webpack_require__(2)['default'];

		exports.__esModule = true;
		exports.registerDefaultDecorators = registerDefaultDecorators;

		var _decoratorsInline = __webpack_require__(15);

		var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

		function registerDefaultDecorators(instance) {
		  _decoratorsInline2['default'](instance);
		}

	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		exports.__esModule = true;

		var _utils = __webpack_require__(4);

		exports['default'] = function (instance) {
		  instance.registerDecorator('inline', function (fn, props, container, options) {
		    var ret = fn;
		    if (!props.partials) {
		      props.partials = {};
		      ret = function (context, options) {
		        // Create a new partials stack frame prior to exec.
		        var original = container.partials;
		        container.partials = _utils.extend({}, original, props.partials);
		        var ret = fn(context, options);
		        container.partials = original;
		        return ret;
		      };
		    }

		    props.partials[options.args[0]] = options.fn;

		    return ret;
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		exports.__esModule = true;

		var _utils = __webpack_require__(4);

		var logger = {
		  methodMap: ['debug', 'info', 'warn', 'error'],
		  level: 'info',

		  // Maps a given level value to the `methodMap` indexes above.
		  lookupLevel: function lookupLevel(level) {
		    if (typeof level === 'string') {
		      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
		      if (levelMap >= 0) {
		        level = levelMap;
		      } else {
		        level = parseInt(level, 10);
		      }
		    }

		    return level;
		  },

		  // Can be overridden in the host environment
		  log: function log(level) {
		    level = logger.lookupLevel(level);

		    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
		      var method = logger.methodMap[level];
		      if (!console[method]) {
		        // eslint-disable-line no-console
		        method = 'log';
		      }

		      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		        message[_key - 1] = arguments[_key];
		      }

		      console[method].apply(console, message); // eslint-disable-line no-console
		    }
		  }
		};

		exports['default'] = logger;
		module.exports = exports['default'];

	/***/ },
	/* 17 */
	/***/ function(module, exports) {

		// Build out our basic SafeString type
		'use strict';

		exports.__esModule = true;
		function SafeString(string) {
		  this.string = string;
		}

		SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
		  return '' + this.string;
		};

		exports['default'] = SafeString;
		module.exports = exports['default'];

	/***/ },
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _interopRequireWildcard = __webpack_require__(1)['default'];

		var _interopRequireDefault = __webpack_require__(2)['default'];

		exports.__esModule = true;
		exports.checkRevision = checkRevision;
		exports.template = template;
		exports.wrapProgram = wrapProgram;
		exports.resolvePartial = resolvePartial;
		exports.invokePartial = invokePartial;
		exports.noop = noop;

		var _utils = __webpack_require__(4);

		var Utils = _interopRequireWildcard(_utils);

		var _exception = __webpack_require__(5);

		var _exception2 = _interopRequireDefault(_exception);

		var _base = __webpack_require__(3);

		function checkRevision(compilerInfo) {
		  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
		      currentRevision = _base.COMPILER_REVISION;

		  if (compilerRevision !== currentRevision) {
		    if (compilerRevision < currentRevision) {
		      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
		          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
		      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
		    } else {
		      // Use the embedded version info since the runtime doesn't know about this revision yet
		      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
		    }
		  }
		}

		function template(templateSpec, env) {
		  /* istanbul ignore next */
		  if (!env) {
		    throw new _exception2['default']('No environment passed to template');
		  }
		  if (!templateSpec || !templateSpec.main) {
		    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
		  }

		  templateSpec.main.decorator = templateSpec.main_d;

		  // Note: Using env.VM references rather than local var references throughout this section to allow
		  // for external users to override these as psuedo-supported APIs.
		  env.VM.checkRevision(templateSpec.compiler);

		  function invokePartialWrapper(partial, context, options) {
		    if (options.hash) {
		      context = Utils.extend({}, context, options.hash);
		      if (options.ids) {
		        options.ids[0] = true;
		      }
		    }

		    partial = env.VM.resolvePartial.call(this, partial, context, options);
		    var result = env.VM.invokePartial.call(this, partial, context, options);

		    if (result == null && env.compile) {
		      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
		      result = options.partials[options.name](context, options);
		    }
		    if (result != null) {
		      if (options.indent) {
		        var lines = result.split('\n');
		        for (var i = 0, l = lines.length; i < l; i++) {
		          if (!lines[i] && i + 1 === l) {
		            break;
		          }

		          lines[i] = options.indent + lines[i];
		        }
		        result = lines.join('\n');
		      }
		      return result;
		    } else {
		      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
		    }
		  }

		  // Just add water
		  var container = {
		    strict: function strict(obj, name) {
		      if (!(name in obj)) {
		        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
		      }
		      return obj[name];
		    },
		    lookup: function lookup(depths, name) {
		      var len = depths.length;
		      for (var i = 0; i < len; i++) {
		        if (depths[i] && depths[i][name] != null) {
		          return depths[i][name];
		        }
		      }
		    },
		    lambda: function lambda(current, context) {
		      return typeof current === 'function' ? current.call(context) : current;
		    },

		    escapeExpression: Utils.escapeExpression,
		    invokePartial: invokePartialWrapper,

		    fn: function fn(i) {
		      var ret = templateSpec[i];
		      ret.decorator = templateSpec[i + '_d'];
		      return ret;
		    },

		    programs: [],
		    program: function program(i, data, declaredBlockParams, blockParams, depths) {
		      var programWrapper = this.programs[i],
		          fn = this.fn(i);
		      if (data || depths || blockParams || declaredBlockParams) {
		        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
		      } else if (!programWrapper) {
		        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
		      }
		      return programWrapper;
		    },

		    data: function data(value, depth) {
		      while (value && depth--) {
		        value = value._parent;
		      }
		      return value;
		    },
		    merge: function merge(param, common) {
		      var obj = param || common;

		      if (param && common && param !== common) {
		        obj = Utils.extend({}, common, param);
		      }

		      return obj;
		    },

		    noop: env.VM.noop,
		    compilerInfo: templateSpec.compiler
		  };

		  function ret(context) {
		    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		    var data = options.data;

		    ret._setup(options);
		    if (!options.partial && templateSpec.useData) {
		      data = initData(context, data);
		    }
		    var depths = undefined,
		        blockParams = templateSpec.useBlockParams ? [] : undefined;
		    if (templateSpec.useDepths) {
		      if (options.depths) {
		        depths = context !== options.depths[0] ? [context].concat(options.depths) : options.depths;
		      } else {
		        depths = [context];
		      }
		    }

		    function main(context /*, options*/) {
		      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
		    }
		    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
		    return main(context, options);
		  }
		  ret.isTop = true;

		  ret._setup = function (options) {
		    if (!options.partial) {
		      container.helpers = container.merge(options.helpers, env.helpers);

		      if (templateSpec.usePartial) {
		        container.partials = container.merge(options.partials, env.partials);
		      }
		      if (templateSpec.usePartial || templateSpec.useDecorators) {
		        container.decorators = container.merge(options.decorators, env.decorators);
		      }
		    } else {
		      container.helpers = options.helpers;
		      container.partials = options.partials;
		      container.decorators = options.decorators;
		    }
		  };

		  ret._child = function (i, data, blockParams, depths) {
		    if (templateSpec.useBlockParams && !blockParams) {
		      throw new _exception2['default']('must pass block params');
		    }
		    if (templateSpec.useDepths && !depths) {
		      throw new _exception2['default']('must pass parent depths');
		    }

		    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
		  };
		  return ret;
		}

		function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
		  function prog(context) {
		    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		    var currentDepths = depths;
		    if (depths && context !== depths[0]) {
		      currentDepths = [context].concat(depths);
		    }

		    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
		  }

		  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

		  prog.program = i;
		  prog.depth = depths ? depths.length : 0;
		  prog.blockParams = declaredBlockParams || 0;
		  return prog;
		}

		function resolvePartial(partial, context, options) {
		  if (!partial) {
		    if (options.name === '@partial-block') {
		      partial = options.data['partial-block'];
		    } else {
		      partial = options.partials[options.name];
		    }
		  } else if (!partial.call && !options.name) {
		    // This is a dynamic partial that returned a string
		    options.name = partial;
		    partial = options.partials[partial];
		  }
		  return partial;
		}

		function invokePartial(partial, context, options) {
		  options.partial = true;
		  if (options.ids) {
		    options.data.contextPath = options.ids[0] || options.data.contextPath;
		  }

		  var partialBlock = undefined;
		  if (options.fn && options.fn !== noop) {
		    options.data = _base.createFrame(options.data);
		    partialBlock = options.data['partial-block'] = options.fn;

		    if (partialBlock.partials) {
		      options.partials = Utils.extend({}, options.partials, partialBlock.partials);
		    }
		  }

		  if (partial === undefined && partialBlock) {
		    partial = partialBlock;
		  }

		  if (partial === undefined) {
		    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
		  } else if (partial instanceof Function) {
		    return partial(context, options);
		  }
		}

		function noop() {
		  return '';
		}

		function initData(context, data) {
		  if (!data || !('root' in data)) {
		    data = data ? _base.createFrame(data) : {};
		    data.root = context;
		  }
		  return data;
		}

		function executeDecorators(fn, prog, container, depths, data, blockParams) {
		  if (fn.decorator) {
		    var props = {};
		    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
		    Utils.extend(prog, props);
		  }
		  return prog;
		}

	/***/ },
	/* 19 */
	/***/ function(module, exports) {

		/* WEBPACK VAR INJECTION */(function(global) {/* global window */
		'use strict';

		exports.__esModule = true;

		exports['default'] = function (Handlebars) {
		  /* istanbul ignore next */
		  var root = typeof global !== 'undefined' ? global : window,
		      $Handlebars = root.Handlebars;
		  /* istanbul ignore next */
		  Handlebars.noConflict = function () {
		    if (root.Handlebars === Handlebars) {
		      root.Handlebars = $Handlebars;
		    }
		    return Handlebars;
		  };
		};

		module.exports = exports['default'];
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _NavBar = __webpack_require__(17);

	var _NavBar2 = _interopRequireDefault(_NavBar);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _Tool = __webpack_require__(20);

	var _Tool2 = _interopRequireDefault(_Tool);

	var _config = __webpack_require__(8);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(21);

	function activeEruda(flag) {
	        window.localStorage.setItem('active-eruda', flag);
	}

	var DevTools = function (_util$Emitter) {
	        _inherits(DevTools, _util$Emitter);

	        function DevTools($parent) {
	                _classCallCheck(this, DevTools);

	                var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DevTools).call(this));

	                _this.$parent = $parent;
	                _this._isShow = false;
	                _this._opacity = 1;
	                _this._tools = {};

	                _this._appendTpl();
	                _this._initNavBar();
	                _this._initConfig();
	                return _this;
	        }

	        _createClass(DevTools, [{
	                key: 'show',
	                value: function show() {
	                        var _this2 = this;

	                        this._isShow = true;

	                        this._$el.show();
	                        // Need a delay after show to enable transition effect.
	                        setTimeout(function () {
	                                return _this2._$el.css('opacity', _this2._opacity);
	                        }, 50);

	                        return this;
	                }
	        }, {
	                key: 'hide',
	                value: function hide() {
	                        var _this3 = this;

	                        this._isShow = false;

	                        this._$el.css({ opacity: 0 });
	                        setTimeout(function () {
	                                return _this3._$el.hide();
	                        }, 300);

	                        return this;
	                }
	        }, {
	                key: 'toggle',
	                value: function toggle() {
	                        return this._isShow ? this.hide() : this.show();
	                }
	        }, {
	                key: 'add',
	                value: function add(tool) {
	                        _util2.default.defaults(tool, new _Tool2.default());

	                        var name = tool.name;

	                        this._$tools.append('<div class="eruda-' + name + ' eruda-tool"></div>');
	                        tool.init(this._$tools.find('.eruda-' + name), this);
	                        tool.active = false;
	                        this._tools[name] = tool;

	                        this._navBar.add(name);

	                        return this;
	                }
	        }, {
	                key: 'remove',
	                value: function remove(name) {
	                        var tool = this._tools[name];

	                        delete this._tools[name];
	                        this._navBar.remove(name);

	                        tool.destroy();
	                        if (tool.active) {
	                                var keys = _util2.default.keys(this._tools);
	                                if (keys.length > 0) this.showTool(keys[0]);
	                        }

	                        return this;
	                }
	        }, {
	                key: 'get',
	                value: function get(name) {
	                        var tool = this._tools[name];

	                        if (tool) return tool;
	                }
	        }, {
	                key: 'destroy',
	                value: function destroy() {
	                        var _this4 = this;

	                        _util2.default.each(this._tools, function (tool, key) {
	                                return _this4.remove(key);
	                        });
	                        this._navBar.destroy();
	                        this._$el.remove();
	                }
	        }, {
	                key: 'showTool',
	                value: function showTool(name) {
	                        var tools = this._tools;

	                        var tool = tools[name];
	                        if (!tool) return;

	                        var lastTool = {};

	                        _util2.default.each(tools, function (tool) {
	                                if (tool.active) lastTool = tool;

	                                tool.active = false;
	                                tool.hide();
	                        });

	                        tool.active = true;
	                        tool.show();

	                        this._navBar.activeTool(name);

	                        this.emit('showTool', name, lastTool);

	                        return this;
	                }
	        }, {
	                key: '_initConfig',
	                value: function _initConfig() {
	                        var _this5 = this;

	                        var cfg = this.config = _config2.default.create('eruda-dev-tools');

	                        cfg.set(_util2.default.defaults(cfg.get(), {
	                                transparent: false,
	                                halfScreen: false,
	                                activeEruda: false
	                        }));

	                        if (cfg.get('transparent')) this._setTransparency(true);
	                        if (cfg.get('halfScreen')) this._setHalfScreen(true);

	                        cfg.on('change', function (key, val) {
	                                switch (key) {
	                                        case 'transparent':
	                                                return _this5._setTransparency(val);
	                                        case 'halfScreen':
	                                                return _this5._setHalfScreen(val);
	                                        case 'activeEruda':
	                                                return activeEruda(val);
	                                }
	                        });
	                }
	        }, {
	                key: '_setTransparency',
	                value: function _setTransparency(flag) {
	                        this._opacity = flag ? 0.9 : 1;
	                        if (this._isShow) this._$el.css({ opacity: this._opacity });
	                }
	        }, {
	                key: '_setHalfScreen',
	                value: function _setHalfScreen(flag) {
	                        this._$el.css({
	                                height: flag ? '50%' : '100%'
	                        });
	                }
	        }, {
	                key: '_appendTpl',
	                value: function _appendTpl() {
	                        var $parent = this.$parent;

	                        $parent.append(__webpack_require__(23)());

	                        this._$el = $parent.find('.eruda-dev-tools');
	                        this._$tools = this._$el.find('.eruda-tools');
	                }
	        }, {
	                key: '_initNavBar',
	                value: function _initNavBar() {
	                        var _this6 = this;

	                        this._navBar = new _NavBar2.default(this._$el.find('.eruda-nav-bar ul'));
	                        this._navBar.on('showTool', function (name) {
	                                _this6.showTool(name);
	                        });
	                }
	        }]);

	        return DevTools;
	}(_util2.default.Emitter);

	exports.default = DevTools;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(18);

	var NavBar = function (_util$Emitter) {
	    _inherits(NavBar, _util$Emitter);

	    function NavBar($el) {
	        _classCallCheck(this, NavBar);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NavBar).call(this));

	        _this._$el = $el;
	        _this._len = 0;

	        _this._bindEvent();
	        return _this;
	    }

	    _createClass(NavBar, [{
	        key: 'add',
	        value: function add(name) {
	            this._len++;
	            this._$el.append('<li class="' + name + '">' + name + '</li>').css({ width: this._len * 69 });
	        }
	    }, {
	        key: 'remove',
	        value: function remove(name) {
	            this._len--;
	            this._$el.find('li.' + name).remove();
	            this._$el.css({ width: this._len * 69 });
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this._$el.remove();
	        }
	    }, {
	        key: 'activeTool',
	        value: function activeTool(name) {
	            var $el = this._$el;

	            $el.find('li').each(function () {
	                var $this = _util2.default.$(this);

	                $this.text() === name ? $this.addClass('eruda-active') : $this.rmClass('eruda-active');
	            });
	        }
	    }, {
	        key: '_bindEvent',
	        value: function _bindEvent() {
	            var $el = this._$el;

	            var self = this;

	            $el.on('click', 'li', function () {
	                self.emit('showTool', _util2.default.$(this).text());
	            });
	        }
	    }]);

	    return NavBar;
	}(_util2.default.Emitter);

	exports.default = NavBar;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(19);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./NavBar.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./NavBar.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-nav-bar {\n  height: 50px;\n  overflow-y: auto;\n  position: absolute;\n  width: 100%;\n  -webkit-overflow-scrolling: touch;\n  left: 0;\n  top: 0;\n  z-index: 100;\n  background: #76a2ee; }\n  .eruda-dev-tools .eruda-nav-bar ul {\n    font-size: 0; }\n    .eruda-dev-tools .eruda-nav-bar ul li {\n      cursor: pointer;\n      display: inline-block;\n      height: 50px;\n      line-height: 50px;\n      width: 69px;\n      color: #f2f2f2;\n      font-size: 12px;\n      text-align: center;\n      opacity: 0.5;\n      text-transform: capitalize; }\n      .eruda-dev-tools .eruda-nav-bar ul li.eruda-active {\n        color: #fff;\n        opacity: 1;\n        border-bottom: 3px solid #fff; }\n", ""]);

	// exports


/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Tool = function () {
	    function Tool() {
	        _classCallCheck(this, Tool);
	    }

	    _createClass(Tool, [{
	        key: "init",
	        value: function init($el) {
	            this._$el = $el;
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            this._$el.show();

	            return this;
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            this._$el.hide();

	            return this;
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this._$el.remove();
	        }
	    }]);

	    return Tool;
	}();

	exports.default = Tool;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(22);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./DevTools.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./DevTools.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  bottom: 0;\n  left: 0;\n  padding-top: 50px !important;\n  background: #fff;\n  z-index: 500;\n  display: none;\n  opacity: 0;\n  -webkit-transition: opacity .3s;\n  transition: opacity .3s;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0); }\n  .eruda-dev-tools .eruda-tools {\n    height: 100%;\n    width: 100%;\n    position: relative;\n    overflow: auto;\n    -webkit-overflow-scrolling: touch; }\n    .eruda-dev-tools .eruda-tools .eruda-tool {\n      -webkit-transform: translateZ(0);\n              transform: translateZ(0);\n      position: absolute;\n      overflow: hidden;\n      display: none;\n      left: 0;\n      top: 0;\n      background: #f2f2f2;\n      width: 100%;\n      height: 100%; }\n", ""]);

	// exports


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<div class=\"eruda-dev-tools\">\r\n    <div class=\"eruda-nav-bar\"><ul></ul></div>\r\n    <div class=\"eruda-tools\"></div>\r\n</div>";
	},"useData":true});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Log = __webpack_require__(25);

	var _Log2 = _interopRequireDefault(_Log);

	var _Tool2 = __webpack_require__(20);

	var _Tool3 = _interopRequireDefault(_Tool2);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _config = __webpack_require__(8);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(37);

	var Console = function (_Tool) {
	    _inherits(Console, _Tool);

	    function Console() {
	        _classCallCheck(this, Console);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Console).call(this));

	        _this.name = 'console';
	        return _this;
	    }

	    _createClass(Console, [{
	        key: 'init',
	        value: function init($el, parent) {
	            _get(Object.getPrototypeOf(Console.prototype), 'init', this).call(this, $el);

	            this._parent = parent;
	            this._appendTpl();
	            this._initLog();
	            this._bindEvent();
	            this._initConfig();
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            _get(Object.getPrototypeOf(Console.prototype), 'show', this).call(this);

	            this._log.render();
	        }
	    }, {
	        key: 'overrideConsole',
	        value: function overrideConsole() {
	            var log = this._log,
	                origConsole = {},
	                winConsole = window.console;

	            function override(name) {
	                var origin = origConsole[name] = winConsole[name];

	                winConsole[name] = function () {
	                    log[name].apply(log, arguments);

	                    origin.apply(winConsole, arguments);
	                };
	            }

	            CONSOLE_METHOD.forEach(function (name) {
	                return override(name);
	            });

	            this._origConsole = origConsole;

	            return this;
	        }
	    }, {
	        key: 'restoreConsole',
	        value: function restoreConsole() {
	            var origConsole = this._origConsole;
	            if (origConsole) {
	                var winConsole = window.console;
	                CONSOLE_METHOD.forEach(function (name) {
	                    return winConsole[name] = origConsole[name];
	                });
	            }
	        }
	    }, {
	        key: 'catchGlobalErr',
	        value: function catchGlobalErr() {
	            var log = this._log;

	            this._origOnerror = window.onerror;
	            window.onerror = function (errMsg, url, lineNum, column, errObj) {
	                if (errObj) return log.error(errObj);
	                log.error(errMsg);
	            };

	            return this;
	        }
	    }, {
	        key: 'ignoreGlobalErr',
	        value: function ignoreGlobalErr() {
	            var origOnerror = this._origOnerror;
	            if (origOnerror) window.onerror = origOnerror;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            _get(Object.getPrototypeOf(Console.prototype), 'destroy', this).call(this);

	            this.ignoreGlobalErr();
	            this.restoreConsole();
	        }
	    }, {
	        key: '_appendTpl',
	        value: function _appendTpl() {
	            var $el = this._$el;

	            $el.append(__webpack_require__(39)());
	            this._$control = $el.find('.eruda-control');
	            this._$logs = $el.find('.eruda-logs');
	            this._$inputContainer = $el.find('.eruda-js-input');
	            this._$input = this._$inputContainer.find('textarea');
	            this._$inputBtns = this._$inputContainer.find('.eruda-buttons');
	        }
	    }, {
	        key: '_initLog',
	        value: function _initLog() {
	            var _this2 = this;

	            this._log = new _Log2.default(this._$logs, this);

	            this._log.on('filter', function (filter) {
	                _this2._$control.find('.filter').each(function () {
	                    var $this = _util2.default.$(this),
	                        isMatch = $this.data('filter') === filter;

	                    $this[isMatch ? 'addClass' : 'rmClass']('eruda-active');
	                });
	            });
	        }
	    }, {
	        key: '_bindEvent',
	        value: function _bindEvent() {
	            var _this3 = this;

	            var $input = this._$input,
	                $inputBtns = this._$inputBtns,
	                $control = this._$control,
	                parent = this._parent,
	                log = this._log;

	            $control.on('click', '.clear-console', function () {
	                return log.clear();
	            });
	            $control.on('click', '.filter', function () {
	                log.filter(_util2.default.$(this).data('filter'));
	            }).on('click', '.help', function () {
	                return log.help();
	            });

	            $inputBtns.on('click', '.cancel', function () {
	                return _this3._hideInput();
	            });
	            $inputBtns.on('click', '.execute', function () {
	                var jsInput = $input.val();

	                if (_util2.default.trim(jsInput) === '') return;

	                log.input(jsInput);

	                $input.val('').get(0).blur();

	                _this3._hideInput();
	            });

	            $input.on('focusin', function () {
	                return _this3._showInput();
	            });

	            log.on('viewJson', function (data) {
	                parent.get('sources').set('json', data);
	                parent.showTool('sources');
	            });
	        }
	    }, {
	        key: '_hideInput',
	        value: function _hideInput() {
	            this._$inputContainer.css({
	                paddingTop: 0,
	                height: 40
	            });

	            this._$inputBtns.hide();
	        }
	    }, {
	        key: '_showInput',
	        value: function _showInput() {
	            this._$inputContainer.css({
	                paddingTop: 40,
	                height: '100%'
	            });

	            this._$inputBtns.show();
	        }
	    }, {
	        key: '_initConfig',
	        value: function _initConfig() {
	            var _this4 = this;

	            var cfg = this.config = _config2.default.create('eruda-console');

	            cfg.set(_util2.default.defaults(cfg.get(), {
	                catchGlobalErr: true,
	                overrideConsole: true
	            }));

	            if (cfg.get('catchGlobalErr')) this.catchGlobalErr();
	            if (cfg.get('overrideConsole')) this.overrideConsole();

	            cfg.on('change', function (key, val) {
	                switch (key) {
	                    case 'catchGlobalErr':
	                        return val ? _this4.catchGlobalErr() : _this4.ignoreGlobalErr();
	                    case 'overrideConsole':
	                        return val ? _this4.overrideConsole() : _this4.restoreConsole();
	                }
	            });
	        }
	    }]);

	    return Console;
	}(_Tool3.default);

	exports.default = Console;


	var CONSOLE_METHOD = ['log', 'error', 'info', 'warn', 'dir', 'time', 'timeEnd', 'clear'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _highlight = __webpack_require__(26);

	var _highlight2 = _interopRequireDefault(_highlight);

	var _jsBeautify = __webpack_require__(27);

	var _jsBeautify2 = _interopRequireDefault(_jsBeautify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(31);

	var Log = function (_util$Emitter) {
	    _inherits(Log, _util$Emitter);

	    function Log($el, parent) {
	        _classCallCheck(this, Log);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Log).call(this));

	        _this._$el = $el;
	        _this._parent = parent;
	        _this._logs = [];
	        _this._renderLogs = [];
	        _this._tpl = __webpack_require__(33);
	        _this._filter = 'all';
	        _this._isUpdated = false;
	        _this._lastLog = {};
	        _this._timer = {};

	        _this._bindEvent();
	        return _this;
	    }

	    _createClass(Log, [{
	        key: 'clear',
	        value: function clear() {
	            this._logs = [];
	            this._lastLog = {};

	            this._isUpdated = true;
	            this.render();
	        }
	    }, {
	        key: 'input',
	        value: function input(jsCode) {
	            var src = jsCode;

	            jsCode = _util2.default.trim(jsCode);

	            if (_util2.default.startWith(jsCode, ':')) {
	                var cmd = jsCode.slice(1);
	                this._runCmd(cmd);

	                return this;
	            } else if (_util2.default.startWith(jsCode, '/')) {
	                var regexp = _util2.default.trim(jsCode.slice(1));
	                return this.filter(new RegExp(_util2.default.escapeRegExp(regexp)));
	            }

	            this._insert({
	                type: 'input',
	                ignoreFilter: true,
	                isCode: true,
	                src: src,
	                val: jsCode
	            });

	            try {
	                this.output(evalJs(jsCode));
	            } catch (e) {
	                e.ignoreFilter = true;
	                this.error(e);
	            }

	            return this;
	        }
	    }, {
	        key: 'output',
	        value: function output(msg) {
	            this._insert({
	                type: 'output',
	                ignoreFilter: true,
	                src: msg,
	                val: transMsg(msg)
	            });

	            return this;
	        }
	    }, {
	        key: 'dir',
	        value: function dir(obj) {
	            var msg = _util2.default.isObj(obj) ? JSON.stringify(obj, null, 4) : transMsg(obj, true);

	            this._insert({
	                type: 'dir',
	                isCode: true,
	                src: obj,
	                val: msg
	            });

	            return this;
	        }
	    }, {
	        key: 'log',
	        value: function log() {
	            var msg = transMultipleMsg(arguments),
	                src = arguments.length === 1 ? arguments[0] : arguments;

	            this._insert({
	                type: 'log',
	                src: src,
	                val: msg
	            });

	            return this;
	        }
	    }, {
	        key: 'html',
	        value: function html(msg) {
	            this._insert({
	                type: 'html',
	                ignoreFilter: true,
	                val: msg
	            });

	            return this;
	        }
	    }, {
	        key: 'error',
	        value: function error(msg) {
	            var src = msg,
	                ignoreFilter = false;

	            if (_util2.default.isErr(msg)) {
	                ignoreFilter = msg.ignoreFilter;
	                msg = errToStr(msg);
	            } else {
	                msg = errToStr(new Error(), transMsg(msg));
	            }

	            this._insert({
	                type: 'error',
	                ignoreFilter: ignoreFilter,
	                src: src,
	                val: msg
	            });

	            return this;
	        }
	    }, {
	        key: 'info',
	        value: function info() {
	            var msg = transMultipleMsg(arguments),
	                src = arguments.length === 1 ? arguments[0] : arguments;

	            this._insert({
	                type: 'info',
	                src: src,
	                val: msg
	            });

	            return this;
	        }
	    }, {
	        key: 'warn',
	        value: function warn() {
	            var msg = transMultipleMsg(arguments),
	                src = arguments.length === 1 ? arguments[0] : arguments;

	            this._insert({
	                type: 'warn',
	                src: src,
	                val: msg
	            });

	            return this;
	        }
	    }, {
	        key: 'filter',
	        value: function filter(type) {
	            this._filter = type;

	            this.emit('filter', type);

	            this._isUpdated = true;
	            this.render();
	        }
	    }, {
	        key: 'help',
	        value: function help() {
	            return this.html(helpMsg);
	        }
	    }, {
	        key: 'time',
	        value: function time(name) {
	            this._timer[name] = _util2.default.now();

	            return this;
	        }
	    }, {
	        key: 'timeEnd',
	        value: function timeEnd(name) {
	            var startTime = this._timer[name];

	            if (!startTime) return;

	            var duration = _util2.default.now() - startTime;
	            this.log('<div class="eruda-blue">' + name + ':' + duration + 'ms</div>');
	            delete this._timer[name];

	            return this;
	        }
	    }, {
	        key: '_insert',
	        value: function _insert(log) {
	            _util2.default.defaults(log, {
	                type: 'log',
	                isCode: false,
	                ignoreFilter: false,
	                val: '',
	                showTimes: false,
	                times: 1
	            });

	            log.src = log.src || log.val;

	            if (log.isCode) {
	                log.val = (0, _highlight2.default)((0, _jsBeautify2.default)(log.val), 'js');
	            } else if (log.type != 'html') {
	                log.val = txtToHtml(log.val);
	            }

	            var lastLog = this._lastLog;

	            if (log.type !== 'html' && lastLog.type === log.type && lastLog.val === log.val) {
	                lastLog.times++;
	                lastLog.showTimes = true;
	            } else {
	                this._logs.push(log);

	                this._lastLog = log;
	            }

	            this._isUpdated = true;
	            this.render();
	        }
	    }, {
	        key: '_bindEvent',
	        value: function _bindEvent() {
	            var self = this;

	            this._$el.on('click', '.eruda-log-item', function () {
	                var idx = _util2.default.$(this).data('idx');

	                var src = self._renderLogs[idx].src;

	                try {
	                    if (!_util2.default.isObj(src)) src = JSON.parse(src);
	                    self.emit('viewJson', src);
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: '_runCmd',
	        value: function _runCmd(cmd) {
	            cmd = _util2.default.trim(cmd);

	            switch (cmd) {
	                case 'c':
	                    return this.clear();
	                case 'a':
	                    return this.filter('all');
	                case 'e':
	                    return this.filter('error');
	                case 'i':
	                    return this.filter('info');
	                case 'w':
	                    return this.filter('warn');
	                case 'l':
	                    return this.filter('log');
	                case 'h':
	                    return this.help();
	                case '$':
	                    return this._loadJs('jQuery');
	                case '_':
	                    return this._loadJs('underscore');
	                default:
	                    this.warn('Unknown command').help();
	            }
	        }
	    }, {
	        key: '_loadJs',
	        value: function _loadJs(name) {
	            var _this2 = this;

	            _util2.default.loadJs(libraries[name], function (result) {
	                if (result) return _this2.log(name + ' is loaded');

	                _this2.warn('Failed to load ' + name);
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            if (!this._parent.active || !this._isUpdated) return;

	            this._isUpdated = false;

	            var logs = this._renderLogs = this._filterLogs(this._logs);

	            this._$el.html(this._tpl({
	                logs: logs
	            }));

	            this._scrollToBottom();
	        }
	    }, {
	        key: '_filterLogs',
	        value: function _filterLogs(logs) {
	            var filter = this._filter;

	            if (filter === 'all') return logs;

	            var isRegexp = _util2.default.isRegExp(filter);

	            return _util2.default.filter(logs, function (val) {
	                if (isRegexp) return filter.test(val.val);

	                return val.ignoreFilter || val.type === filter;
	            });
	        }
	    }, {
	        key: '_scrollToBottom',
	        value: function _scrollToBottom() {
	            var el = this._$el.get(0);

	            el.scrollTop = el.scrollHeight;
	        }
	    }]);

	    return Log;
	}(_util2.default.Emitter);

	exports.default = Log;


	var cmdList = __webpack_require__(34),
	    helpMsg = __webpack_require__(35)({
	    commands: cmdList
	});

	var libraries = __webpack_require__(36);

	var regJsUrl = /https?:\/\/([0-9.\-A-Za-z]+)(?::(\d+))?\/[A-Z.a-z0-9/]*\.js/g;

	function evalJs(jsInput) {
	    return eval.call(window, jsInput);
	}

	function errToStr(err, msg) {
	    var lines = err.stack.split('\n');

	    if (_util2.default.isUndef(msg)) msg = lines[0] + '<br/>';
	    var stack = '<div class="eruda-stack">' + lines.slice(1).join('<br/>') + '</div>';

	    stack = stack.replace(regJsUrl, function (match) {
	        return '<a href="' + match + '" target="_blank">' + match + '</a>';
	    });

	    return msg + stack;
	}

	function transMsg(msg, noEscape) {
	    if (_util2.default.isUndef(msg)) {
	        msg = 'undefined';
	    } else if (_util2.default.isFn(msg)) {
	        msg = msg.toString();
	    } else if (_util2.default.isArr(msg)) {
	        msg = JSON.stringify(msg);
	    } else if (_util2.default.isObj(msg)) {
	        msg = 'Object ' + JSON.stringify(msg);
	    }

	    msg = _util2.default.toStr(msg);

	    if (noEscape) return msg;

	    return _util2.default.escape(msg);
	}

	function transMultipleMsg(args) {
	    var ret = [];

	    _util2.default.each(args, function (val) {
	        ret.push(transMsg(val));
	    });

	    return ret.join(' ');
	}

	function txtToHtml(str) {
	    return str.replace(/\n/g, '<br/>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = highlight;

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// https://github.com/trentrichardson/jQuery-Litelighter

	function highlight(str, lang) {
	    str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');

	    lang = language[lang];

	    var subLangSi = 0,
	        subLangs = [];

	    _util2.default.each(lang, function (val) {
	        if (!val.language) return;

	        str = str.replace(val.re, function ($1, $2, $3) {
	            subLangs[subLangSi++] = highlight($2, val.language);
	            return $1.replace($2, '___subtmpl' + (subLangSi - 1) + '___');
	        });
	    });

	    _util2.default.each(lang, function (val, key) {
	        if (language[val.language]) return;

	        str = str.replace(val.re, "___" + key + "___$1___end" + key + "___");
	    });

	    var lvls = [];

	    str = str.replace(/___(?!subtmpl)\w+?___/g, function ($0) {
	        var end = $0.substr(3, 3) === 'end',
	            tag = (!end ? $0.substr(3) : $0.substr(6)).replace(/_/g, ''),
	            lastTag = lvls.length > 0 ? lvls[lvls.length - 1] : null;

	        if (!end && (lastTag == null || tag == lastTag || lastTag != null && lang[lastTag].embed != undefined && lang[lastTag].embed.indexOf(tag) > -1)) {
	            lvls.push(tag);

	            return $0;
	        } else if (end && tag == lastTag) {
	            lvls.pop();

	            return $0;
	        }

	        return "";
	    });

	    _util2.default.each(lang, function (val, key) {
	        str = str.replace(new RegExp("___end" + key + "___", "g"), "</span>").replace(new RegExp("___" + key + "___", "g"), "<span style='" + style[val.style] + "'>");
	    });

	    _util2.default.each(lang, function (val) {
	        if (!val.language) return;

	        str = str.replace(/___subtmpl\d+___/g, function ($tmpl) {
	            var i = parseInt($tmpl.replace(/___subtmpl(\d+)___/, "$1"), 10);
	            return subLangs[i];
	        });
	    });

	    return str;
	};

	var style = {
	    code: 'background-color:#ffffff;color:#555;',
	    comment: 'color:#969896',
	    string: 'color:#183691',
	    number: 'color:#0086b3;',
	    keyword: 'color:#a71d5d;',
	    operators: 'color:#a71d5d;'
	};

	var language = {};

	language.js = {
	    comment: { re: /(\/\/.*|\/\*([\s\S]*?)\*\/)/g, style: 'comment' },
	    string: { re: /(('.*?')|(".*?"))/g, style: 'string' },
	    numbers: { re: /(\-?(\d+|\d+\.\d+|\.\d+))/g, style: 'number' },
	    regex: { re: /([^\/]\/[^\/].+\/(g|i|m)*)/g, style: 'number' },
	    keywords: { re: /(?:\b)(function|for|foreach|while|if|else|elseif|switch|break|as|return|this|class|self|default|var|false|true|null|undefined)(?:\b)/gi, style: 'keyword' },
	    operators: { re: /(\+|\-|\/|\*|%|=|&lt;|&gt;|\||\?|\.)/g, style: 'operators' }
	};

	language.html = {
	    comment: { re: /(&lt;!\-\-([\s\S]*?)\-\-&gt;)/g, style: 'comment' },
	    tag: { re: /(&lt;\/?\w(.|\n)*?\/?&gt;)/g, style: 'keyword', embed: ['string'] },
	    string: language.js.string,
	    css: { re: /(?:&lt;style.*?&gt;)([\s\S]+?)(?:&lt;\/style&gt;)/gi, language: 'css' },
	    script: { re: /(?:&lt;script.*?&gt;)([\s\S]+?)(?:&lt;\/script&gt;)/gi, language: 'js' }
	};

	language.css = {
	    comment: language.js.comment,
	    string: language.js.string,
	    numbers: { re: /((\-?(\d+|\d+\.\d+|\.\d+)(%|px|em|pt|in)?)|#[0-9a-fA-F]{3}[0-9a-fA-F]{3})/g, style: 'number' },
	    keywords: { re: /(@\w+|:?:\w+|[a-z\-]+:)/g, style: 'keyword' }
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	The following batches are equivalent:

	var beautify_js = require('js-beautify');
	var beautify_js = require('js-beautify').js;
	var beautify_js = require('js-beautify').js_beautify;

	var beautify_css = require('js-beautify').css;
	var beautify_css = require('js-beautify').css_beautify;

	var beautify_html = require('js-beautify').html;
	var beautify_html = require('js-beautify').html_beautify;

	All methods returned accept two arguments, the source string and an options object.
	**/

	function get_beautify(js_beautify, css_beautify, html_beautify) {
	    // the default is js
	    var beautify = function (src, config) {
	        return js_beautify.js_beautify(src, config);
	    };

	    // short aliases
	    beautify.js   = js_beautify.js_beautify;
	    beautify.css  = css_beautify.css_beautify;
	    beautify.html = html_beautify.html_beautify;

	    // legacy aliases
	    beautify.js_beautify   = js_beautify.js_beautify;
	    beautify.css_beautify  = css_beautify.css_beautify;
	    beautify.html_beautify = html_beautify.html_beautify;

	    return beautify;
	}

	if (true) {
	    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(28),
	        __webpack_require__(29),
	        __webpack_require__(30)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(js_beautify, css_beautify, html_beautify) {
	        return get_beautify(js_beautify, css_beautify, html_beautify);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
	    (function(mod) {
	        var js_beautify = require('./lib/beautify');
	        var css_beautify = require('./lib/beautify-css');
	        var html_beautify = require('./lib/beautify-html');

	        mod.exports = get_beautify(js_beautify, css_beautify, html_beautify);

	    })(module);
	}



/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
	/*

	  The MIT License (MIT)

	  Copyright (c) 2007-2013 Einar Lielmanis and contributors.

	  Permission is hereby granted, free of charge, to any person
	  obtaining a copy of this software and associated documentation files
	  (the "Software"), to deal in the Software without restriction,
	  including without limitation the rights to use, copy, modify, merge,
	  publish, distribute, sublicense, and/or sell copies of the Software,
	  and to permit persons to whom the Software is furnished to do so,
	  subject to the following conditions:

	  The above copyright notice and this permission notice shall be
	  included in all copies or substantial portions of the Software.

	  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
	  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	  SOFTWARE.

	 JS Beautifier
	---------------


	  Written by Einar Lielmanis, <einar@jsbeautifier.org>
	      http://jsbeautifier.org/

	  Originally converted to javascript by Vital, <vital76@gmail.com>
	  "End braces on own line" added by Chris J. Shull, <chrisjshull@gmail.com>
	  Parsing improvements for brace-less statements by Liam Newman <bitwiseman@gmail.com>


	  Usage:
	    js_beautify(js_source_text);
	    js_beautify(js_source_text, options);

	  The options are:
	    indent_size (default 4)          - indentation size,
	    indent_char (default space)      - character to indent with,
	    preserve_newlines (default true) - whether existing line breaks should be preserved,
	    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk,

	    jslint_happy (default false) - if true, then jslint-stricter mode is enforced.

	            jslint_happy        !jslint_happy
	            ---------------------------------
	            function ()         function()

	            switch () {         switch() {
	            case 1:               case 1:
	              break;                break;
	            }                   }

	    space_after_anon_function (default false) - should the space before an anonymous function's parens be added, "function()" vs "function ()",
	          NOTE: This option is overriden by jslint_happy (i.e. if jslint_happy is true, space_after_anon_function is true by design)

	    brace_style (default "collapse") - "collapse-preserve-inline" | "collapse" | "expand" | "end-expand" | "none"
	            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.

	    space_before_conditional (default true) - should the space before conditional statement be added, "if(true)" vs "if (true)",

	    unescape_strings (default false) - should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"

	    wrap_line_length (default unlimited) - lines should wrap at next opportunity after this number of characters.
	          NOTE: This is not a hard limit. Lines will continue until a point where a newline would
	                be preserved if it were present.

	    end_with_newline (default false)  - end output with a newline


	    e.g

	    js_beautify(js_source_text, {
	      'indent_size': 1,
	      'indent_char': '\t'
	    });

	*/

	(function() {

	    var acorn = {};
	    (function (exports) {
	      // This section of code is taken from acorn.
	      //
	      // Acorn was written by Marijn Haverbeke and released under an MIT
	      // license. The Unicode regexps (for identifiers and whitespace) were
	      // taken from [Esprima](http://esprima.org) by Ariya Hidayat.
	      //
	      // Git repositories for Acorn are available at
	      //
	      //     http://marijnhaverbeke.nl/git/acorn
	      //     https://github.com/marijnh/acorn.git

	      // ## Character categories

	      // Big ugly regular expressions that match characters in the
	      // whitespace, identifier, and identifier-start categories. These
	      // are only applied when a character is found to actually have a
	      // code point above 128.

	      var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
	      var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
	      var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
	      var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
	      var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

	      // Whether a single character denotes a newline.

	      var newline = exports.newline = /[\n\r\u2028\u2029]/;

	      // Matches a whole line break (where CRLF is considered a single
	      // line break). Used to count lines.

	      // in javascript, these two differ
	      // in python they are the same, different methods are called on them
	      var lineBreak = exports.lineBreak = /\r\n|[\n\r\u2028\u2029]/;
	      var allLineBreaks = exports.allLineBreaks = new RegExp(lineBreak.source, 'g');


	      // Test whether a given character code starts an identifier.

	      var isIdentifierStart = exports.isIdentifierStart = function(code) {
	        // permit $ (36) and @ (64). @ is used in ES7 decorators.
	        if (code < 65) return code === 36 || code === 64;
	        // 65 through 91 are uppercase letters.
	        if (code < 91) return true;
	        // permit _ (95).
	        if (code < 97) return code === 95;
	        // 97 through 123 are lowercase letters.
	        if (code < 123)return true;
	        return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
	      };

	      // Test whether a given character is part of an identifier.

	      var isIdentifierChar = exports.isIdentifierChar = function(code) {
	        if (code < 48) return code === 36;
	        if (code < 58) return true;
	        if (code < 65) return false;
	        if (code < 91) return true;
	        if (code < 97) return code === 95;
	        if (code < 123)return true;
	        return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
	      };
	    })(acorn);

	    function in_array(what, arr) {
	        for (var i = 0; i < arr.length; i += 1) {
	            if (arr[i] === what) {
	                return true;
	            }
	        }
	        return false;
	    }

	    function trim(s) {
	        return s.replace(/^\s+|\s+$/g, '');
	    }

	    function ltrim(s) {
	        return s.replace(/^\s+/g, '');
	    }

	    function rtrim(s) {
	        return s.replace(/\s+$/g, '');
	    }

	    function js_beautify(js_source_text, options) {
	        "use strict";
	        var beautifier = new Beautifier(js_source_text, options);
	        return beautifier.beautify();
	    }

	    var MODE = {
	            BlockStatement: 'BlockStatement', // 'BLOCK'
	            Statement: 'Statement', // 'STATEMENT'
	            ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
	            ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
	            ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
	            Conditional: 'Conditional', //'(COND-EXPRESSION)',
	            Expression: 'Expression' //'(EXPRESSION)'
	        };

	    function Beautifier(js_source_text, options) {
	        "use strict";
	        var output
	        var tokens = [], token_pos;
	        var Tokenizer;
	        var current_token;
	        var last_type, last_last_text, indent_string;
	        var flags, previous_flags, flag_store;
	        var prefix;

	        var handlers, opt;
	        var baseIndentString = '';

	        handlers = {
	            'TK_START_EXPR': handle_start_expr,
	            'TK_END_EXPR': handle_end_expr,
	            'TK_START_BLOCK': handle_start_block,
	            'TK_END_BLOCK': handle_end_block,
	            'TK_WORD': handle_word,
	            'TK_RESERVED': handle_word,
	            'TK_SEMICOLON': handle_semicolon,
	            'TK_STRING': handle_string,
	            'TK_EQUALS': handle_equals,
	            'TK_OPERATOR': handle_operator,
	            'TK_COMMA': handle_comma,
	            'TK_BLOCK_COMMENT': handle_block_comment,
	            'TK_COMMENT': handle_comment,
	            'TK_DOT': handle_dot,
	            'TK_UNKNOWN': handle_unknown,
	            'TK_EOF': handle_eof
	        };

	        function create_flags(flags_base, mode) {
	            var next_indent_level = 0;
	            if (flags_base) {
	                next_indent_level = flags_base.indentation_level;
	                if (!output.just_added_newline() &&
	                    flags_base.line_indent_level > next_indent_level) {
	                    next_indent_level = flags_base.line_indent_level;
	                }
	            }

	            var next_flags = {
	                mode: mode,
	                parent: flags_base,
	                last_text: flags_base ? flags_base.last_text : '', // last token text
	                last_word: flags_base ? flags_base.last_word : '', // last 'TK_WORD' passed
	                declaration_statement: false,
	                declaration_assignment: false,
	                multiline_frame: false,
	                inline_frame: false,
	                if_block: false,
	                else_block: false,
	                do_block: false,
	                do_while: false,
	                import_block: false,
	                in_case_statement: false, // switch(..){ INSIDE HERE }
	                in_case: false, // we're on the exact line with "case 0:"
	                case_body: false, // the indented case-action block
	                indentation_level: next_indent_level,
	                line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
	                start_line_index: output.get_line_number(),
	                ternary_depth: 0
	            };
	            return next_flags;
	        }

	        // Some interpreters have unexpected results with foo = baz || bar;
	        options = options ? options : {};
	        opt = {};

	        // compatibility
	        if (options.braces_on_own_line !== undefined) { //graceful handling of deprecated option
	            opt.brace_style = options.braces_on_own_line ? "expand" : "collapse";
	        }
	        opt.brace_style = options.brace_style ? options.brace_style : (opt.brace_style ? opt.brace_style : "collapse");

	        // graceful handling of deprecated option
	        if (opt.brace_style === "expand-strict") {
	            opt.brace_style = "expand";
	        }

	        opt.indent_size = options.indent_size ? parseInt(options.indent_size, 10) : 4;
	        opt.indent_char = options.indent_char ? options.indent_char : ' ';
	        opt.eol = options.eol ? options.eol : 'auto';
	        opt.preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
	        opt.break_chained_methods = (options.break_chained_methods === undefined) ? false : options.break_chained_methods;
	        opt.max_preserve_newlines = (options.max_preserve_newlines === undefined) ? 0 : parseInt(options.max_preserve_newlines, 10);
	        opt.space_in_paren = (options.space_in_paren === undefined) ? false : options.space_in_paren;
	        opt.space_in_empty_paren = (options.space_in_empty_paren === undefined) ? false : options.space_in_empty_paren;
	        opt.jslint_happy = (options.jslint_happy === undefined) ? false : options.jslint_happy;
	        opt.space_after_anon_function = (options.space_after_anon_function === undefined) ? false : options.space_after_anon_function;
	        opt.keep_array_indentation = (options.keep_array_indentation === undefined) ? false : options.keep_array_indentation;
	        opt.space_before_conditional = (options.space_before_conditional === undefined) ? true : options.space_before_conditional;
	        opt.unescape_strings = (options.unescape_strings === undefined) ? false : options.unescape_strings;
	        opt.wrap_line_length = (options.wrap_line_length === undefined) ? 0 : parseInt(options.wrap_line_length, 10);
	        opt.e4x = (options.e4x === undefined) ? false : options.e4x;
	        opt.end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
	        opt.comma_first = (options.comma_first === undefined) ? false : options.comma_first;

	        // For testing of beautify ignore:start directive
	        opt.test_output_raw = (options.test_output_raw === undefined) ? false : options.test_output_raw;

	        // force opt.space_after_anon_function to true if opt.jslint_happy
	        if(opt.jslint_happy) {
	            opt.space_after_anon_function = true;
	        }

	        if(options.indent_with_tabs){
	            opt.indent_char = '\t';
	            opt.indent_size = 1;
	        }

	        if (opt.eol === 'auto') {
	            opt.eol = '\n';
	            if (js_source_text && acorn.lineBreak.test(js_source_text || '')) {
	                opt.eol = js_source_text.match(acorn.lineBreak)[0];
	            }
	        }

	        opt.eol = opt.eol.replace(/\\r/, '\r').replace(/\\n/, '\n')

	        //----------------------------------
	        indent_string = '';
	        while (opt.indent_size > 0) {
	            indent_string += opt.indent_char;
	            opt.indent_size -= 1;
	        }

	        var preindent_index = 0;
	        if(js_source_text && js_source_text.length) {
	            while ( (js_source_text.charAt(preindent_index) === ' ' ||
	                    js_source_text.charAt(preindent_index) === '\t')) {
	                baseIndentString += js_source_text.charAt(preindent_index);
	                preindent_index += 1;
	            }
	            js_source_text = js_source_text.substring(preindent_index);
	        }

	        last_type = 'TK_START_BLOCK'; // last token type
	        last_last_text = ''; // pre-last token text
	        output = new Output(indent_string, baseIndentString);

	        // If testing the ignore directive, start with output disable set to true
	        output.raw = opt.test_output_raw;


	        // Stack of parsing/formatting states, including MODE.
	        // We tokenize, parse, and output in an almost purely a forward-only stream of token input
	        // and formatted output.  This makes the beautifier less accurate than full parsers
	        // but also far more tolerant of syntax errors.
	        //
	        // For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
	        // MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
	        // encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
	        // most full parsers would die, but the beautifier gracefully falls back to
	        // MODE.BlockStatement and continues on.
	        flag_store = [];
	        set_mode(MODE.BlockStatement);

	        this.beautify = function() {

	            /*jshint onevar:true */
	            var local_token, sweet_code;
	            Tokenizer = new tokenizer(js_source_text, opt, indent_string);
	            tokens = Tokenizer.tokenize();
	            token_pos = 0;

	            while (local_token = get_token()) {
	                for(var i = 0; i < local_token.comments_before.length; i++) {
	                    // The cleanest handling of inline comments is to treat them as though they aren't there.
	                    // Just continue formatting and the behavior should be logical.
	                    // Also ignore unknown tokens.  Again, this should result in better behavior.
	                    handle_token(local_token.comments_before[i]);
	                }
	                handle_token(local_token);

	                last_last_text = flags.last_text;
	                last_type = local_token.type;
	                flags.last_text = local_token.text;

	                token_pos += 1;
	            }

	            sweet_code = output.get_code();
	            if (opt.end_with_newline) {
	                sweet_code += '\n';
	            }

	            if (opt.eol != '\n') {
	                sweet_code = sweet_code.replace(/[\n]/g, opt.eol);
	            }

	            return sweet_code;
	        };

	        function handle_token(local_token) {
	            var newlines = local_token.newlines;
	            var keep_whitespace = opt.keep_array_indentation && is_array(flags.mode);

	            if (keep_whitespace) {
	                for (i = 0; i < newlines; i += 1) {
	                    print_newline(i > 0);
	                }
	            } else {
	                if (opt.max_preserve_newlines && newlines > opt.max_preserve_newlines) {
	                    newlines = opt.max_preserve_newlines;
	                }

	                if (opt.preserve_newlines) {
	                    if (local_token.newlines > 1) {
	                        print_newline();
	                        for (var i = 1; i < newlines; i += 1) {
	                            print_newline(true);
	                        }
	                    }
	                }
	            }

	            current_token = local_token;
	            handlers[current_token.type]();
	        }

	        // we could use just string.split, but
	        // IE doesn't like returning empty strings
	        function split_linebreaks(s) {
	            //return s.split(/\x0d\x0a|\x0a/);

	            s = s.replace(acorn.allLineBreaks, '\n');
	            var out = [],
	                idx = s.indexOf("\n");
	            while (idx !== -1) {
	                out.push(s.substring(0, idx));
	                s = s.substring(idx + 1);
	                idx = s.indexOf("\n");
	            }
	            if (s.length) {
	                out.push(s);
	            }
	            return out;
	        }

	        var newline_restricted_tokens = ['break','contiue','return', 'throw'];
	        function allow_wrap_or_preserved_newline(force_linewrap) {
	            force_linewrap = (force_linewrap === undefined) ? false : force_linewrap;

	            // Never wrap the first token on a line
	            if (output.just_added_newline()) {
	                return
	            }

	            if ((opt.preserve_newlines && current_token.wanted_newline) || force_linewrap) {
	                print_newline(false, true);
	            } else if (opt.wrap_line_length) {
	                if (last_type === 'TK_RESERVED' && in_array(flags.last_text, newline_restricted_tokens)) {
	                    // These tokens should never have a newline inserted
	                    // between them and the following expression.
	                    return
	                }
	                var proposed_line_length = output.current_line.get_character_count() + current_token.text.length +
	                    (output.space_before_token ? 1 : 0);
	                if (proposed_line_length >= opt.wrap_line_length) {
	                    print_newline(false, true);
	                }
	            }
	        }

	        function print_newline(force_newline, preserve_statement_flags) {
	            if (!preserve_statement_flags) {
	                if (flags.last_text !== ';' && flags.last_text !== ',' && flags.last_text !== '=' && last_type !== 'TK_OPERATOR') {
	                    while (flags.mode === MODE.Statement && !flags.if_block && !flags.do_block) {
	                        restore_mode();
	                    }
	                }
	            }

	            if (output.add_new_line(force_newline)) {
	                flags.multiline_frame = true;
	            }
	        }

	        function print_token_line_indentation() {
	            if (output.just_added_newline()) {
	                if (opt.keep_array_indentation && is_array(flags.mode) && current_token.wanted_newline) {
	                    output.current_line.push(current_token.whitespace_before);
	                    output.space_before_token = false;
	                } else if (output.set_indent(flags.indentation_level)) {
	                    flags.line_indent_level = flags.indentation_level;
	                }
	            }
	        }

	        function print_token(printable_token) {
	            if (output.raw) {
	                output.add_raw_token(current_token)
	                return;
	            }

	            if (opt.comma_first && last_type === 'TK_COMMA'
	                && output.just_added_newline()) {
	                if(output.previous_line.last() === ',') {
	                    var popped = output.previous_line.pop();
	                    // if the comma was already at the start of the line,
	                    // pull back onto that line and reprint the indentation
	                    if(output.previous_line.is_empty()) {
	                         output.previous_line.push(popped);
	                         output.trim(true);
	                         output.current_line.pop();
	                         output.trim();
	                    }

	                    // add the comma in front of the next token
	                    print_token_line_indentation();
	                    output.add_token(',');
	                    output.space_before_token = true;
	                }
	            }

	            printable_token = printable_token || current_token.text;
	            print_token_line_indentation();
	            output.add_token(printable_token);
	        }

	        function indent() {
	            flags.indentation_level += 1;
	        }

	        function deindent() {
	            if (flags.indentation_level > 0 &&
	                ((!flags.parent) || flags.indentation_level > flags.parent.indentation_level))
	                flags.indentation_level -= 1;
	        }

	        function set_mode(mode) {
	            if (flags) {
	                flag_store.push(flags);
	                previous_flags = flags;
	            } else {
	                previous_flags = create_flags(null, mode);
	            }

	            flags = create_flags(previous_flags, mode);
	        }

	        function is_array(mode) {
	            return mode === MODE.ArrayLiteral;
	        }

	        function is_expression(mode) {
	            return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
	        }

	        function restore_mode() {
	            if (flag_store.length > 0) {
	                previous_flags = flags;
	                flags = flag_store.pop();
	                if (previous_flags.mode === MODE.Statement) {
	                    output.remove_redundant_indentation(previous_flags);
	                }
	            }
	        }

	        function start_of_object_property() {
	            return flags.parent.mode === MODE.ObjectLiteral && flags.mode === MODE.Statement && (
	                (flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set'])));
	        }

	        function start_of_statement() {
	            if (
	                    (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD') ||
	                    (last_type === 'TK_RESERVED' && flags.last_text === 'do') ||
	                    (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['return', 'throw']) && !current_token.wanted_newline) ||
	                    (last_type === 'TK_RESERVED' && flags.last_text === 'else' && !(current_token.type === 'TK_RESERVED' && current_token.text === 'if')) ||
	                    (last_type === 'TK_END_EXPR' && (previous_flags.mode === MODE.ForInitializer || previous_flags.mode === MODE.Conditional)) ||
	                    (last_type === 'TK_WORD' && flags.mode === MODE.BlockStatement
	                        && !flags.in_case
	                        && !(current_token.text === '--' || current_token.text === '++')
	                        && last_last_text !== 'function'
	                        && current_token.type !== 'TK_WORD' && current_token.type !== 'TK_RESERVED') ||
	                    (flags.mode === MODE.ObjectLiteral && (
	                        (flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set']))))
	                ) {

	                set_mode(MODE.Statement);
	                indent();

	                if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD') {
	                    flags.declaration_statement = true;
	                }

	                // Issue #276:
	                // If starting a new statement with [if, for, while, do], push to a new line.
	                // if (a) if (b) if(c) d(); else e(); else f();
	                if (!start_of_object_property()) {
	                    allow_wrap_or_preserved_newline(
	                        current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['do', 'for', 'if', 'while']));
	                }

	                return true;
	            }
	            return false;
	        }

	        function all_lines_start_with(lines, c) {
	            for (var i = 0; i < lines.length; i++) {
	                var line = trim(lines[i]);
	                if (line.charAt(0) !== c) {
	                    return false;
	                }
	            }
	            return true;
	        }

	        function each_line_matches_indent(lines, indent) {
	            var i = 0,
	                len = lines.length,
	                line;
	            for (; i < len; i++) {
	                line = lines[i];
	                // allow empty lines to pass through
	                if (line && line.indexOf(indent) !== 0) {
	                    return false;
	                }
	            }
	            return true;
	        }

	        function is_special_word(word) {
	            return in_array(word, ['case', 'return', 'do', 'if', 'throw', 'else']);
	        }

	        function get_token(offset) {
	            var index = token_pos + (offset || 0);
	            return (index < 0 || index >= tokens.length) ? null : tokens[index];
	        }

	        function handle_start_expr() {
	            if (start_of_statement()) {
	                // The conditional starts the statement if appropriate.
	            }

	            var next_mode = MODE.Expression;
	            if (current_token.text === '[') {

	                if (last_type === 'TK_WORD' || flags.last_text === ')') {
	                    // this is array index specifier, break immediately
	                    // a[x], fn()[x]
	                    if (last_type === 'TK_RESERVED' && in_array(flags.last_text, Tokenizer.line_starters)) {
	                        output.space_before_token = true;
	                    }
	                    set_mode(next_mode);
	                    print_token();
	                    indent();
	                    if (opt.space_in_paren) {
	                        output.space_before_token = true;
	                    }
	                    return;
	                }

	                next_mode = MODE.ArrayLiteral;
	                if (is_array(flags.mode)) {
	                    if (flags.last_text === '[' ||
	                        (flags.last_text === ',' && (last_last_text === ']' || last_last_text === '}'))) {
	                        // ], [ goes to new line
	                        // }, [ goes to new line
	                        if (!opt.keep_array_indentation) {
	                            print_newline();
	                        }
	                    }
	                }

	            } else {
	                if (last_type === 'TK_RESERVED' && flags.last_text === 'for') {
	                    next_mode = MODE.ForInitializer;
	                } else if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['if', 'while'])) {
	                    next_mode = MODE.Conditional;
	                } else {
	                    // next_mode = MODE.Expression;
	                }
	            }

	            if (flags.last_text === ';' || last_type === 'TK_START_BLOCK') {
	                print_newline();
	            } else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || flags.last_text === '.') {
	                // TODO: Consider whether forcing this is required.  Review failing tests when removed.
	                allow_wrap_or_preserved_newline(current_token.wanted_newline);
	                // do nothing on (( and )( and ][ and ]( and .(
	            } else if (!(last_type === 'TK_RESERVED' && current_token.text === '(') && last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
	                output.space_before_token = true;
	            } else if ((last_type === 'TK_RESERVED' && (flags.last_word === 'function' || flags.last_word === 'typeof')) ||
	                (flags.last_text === '*' && last_last_text === 'function')) {
	                // function() vs function ()
	                if (opt.space_after_anon_function) {
	                    output.space_before_token = true;
	                }
	            } else if (last_type === 'TK_RESERVED' && (in_array(flags.last_text, Tokenizer.line_starters) || flags.last_text === 'catch')) {
	                if (opt.space_before_conditional) {
	                    output.space_before_token = true;
	                }
	            }

	            // Should be a space between await and an IIFE
	            if(current_token.text === '(' && last_type === 'TK_RESERVED' && flags.last_word === 'await'){
	                output.space_before_token = true;
	            }

	            // Support of this kind of newline preservation.
	            // a = (b &&
	            //     (c || d));
	            if (current_token.text === '(') {
	                if (last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
	                    if (!start_of_object_property()) {
	                        allow_wrap_or_preserved_newline();
	                    }
	                }
	            }

	            // Support preserving wrapped arrow function expressions
	            // a.b('c',
	            //     () => d.e
	            // )
	            if (current_token.text === '(' && last_type !== 'TK_WORD' && last_type !== 'TK_RESERVED') {
	                allow_wrap_or_preserved_newline();
	            }

	            set_mode(next_mode);
	            print_token();
	            if (opt.space_in_paren) {
	                output.space_before_token = true;
	            }

	            // In all cases, if we newline while inside an expression it should be indented.
	            indent();
	        }

	        function handle_end_expr() {
	            // statements inside expressions are not valid syntax, but...
	            // statements must all be closed when their container closes
	            while (flags.mode === MODE.Statement) {
	                restore_mode();
	            }

	            if (flags.multiline_frame) {
	                allow_wrap_or_preserved_newline(current_token.text === ']' && is_array(flags.mode) && !opt.keep_array_indentation);
	            }

	            if (opt.space_in_paren) {
	                if (last_type === 'TK_START_EXPR' && ! opt.space_in_empty_paren) {
	                    // () [] no inner space in empty parens like these, ever, ref #320
	                    output.trim();
	                    output.space_before_token = false;
	                } else {
	                    output.space_before_token = true;
	                }
	            }
	            if (current_token.text === ']' && opt.keep_array_indentation) {
	                print_token();
	                restore_mode();
	            } else {
	                restore_mode();
	                print_token();
	            }
	            output.remove_redundant_indentation(previous_flags);

	            // do {} while () // no statement required after
	            if (flags.do_while && previous_flags.mode === MODE.Conditional) {
	                previous_flags.mode = MODE.Expression;
	                flags.do_block = false;
	                flags.do_while = false;

	            }
	        }

	        function handle_start_block() {
	            // Check if this is should be treated as a ObjectLiteral
	            var next_token = get_token(1)
	            var second_token = get_token(2)
	            if (second_token && (
	                    (in_array(second_token.text, [':', ',']) && in_array(next_token.type, ['TK_STRING', 'TK_WORD', 'TK_RESERVED']))
	                    || (in_array(next_token.text, ['get', 'set']) && in_array(second_token.type, ['TK_WORD', 'TK_RESERVED']))
	                )) {
	                // We don't support TypeScript,but we didn't break it for a very long time.
	                // We'll try to keep not breaking it.
	                if (!in_array(last_last_text, ['class','interface'])) {
	                    set_mode(MODE.ObjectLiteral);
	                } else {
	                    set_mode(MODE.BlockStatement);
	                }
	            } else if (last_type === 'TK_OPERATOR' && flags.last_text === '=>') {
	                // arrow function: (param1, paramN) => { statements }
	                set_mode(MODE.BlockStatement);
	            } else if (in_array(last_type, ['TK_EQUALS', 'TK_START_EXPR', 'TK_COMMA', 'TK_OPERATOR']) ||
	                (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['return', 'throw', 'import']))
	                ) {
	                // Detecting shorthand function syntax is difficult by scanning forward,
	                //     so check the surrounding context.
	                // If the block is being returned, imported, passed as arg,
	                //     assigned with = or assigned in a nested object, treat as an ObjectLiteral.
	                set_mode(MODE.ObjectLiteral);
	            } else {
	                set_mode(MODE.BlockStatement);
	            }

	            var empty_braces = !next_token.comments_before.length &&  next_token.text === '}';
	            var empty_anonymous_function = empty_braces && flags.last_word === 'function' &&
	                last_type === 'TK_END_EXPR';


	            if (opt.brace_style === "expand" ||
	                (opt.brace_style === "none" && current_token.wanted_newline)) {
	                if (last_type !== 'TK_OPERATOR' &&
	                    (empty_anonymous_function ||
	                        last_type === 'TK_EQUALS' ||
	                        (last_type === 'TK_RESERVED' && is_special_word(flags.last_text) && flags.last_text !== 'else'))) {
	                    output.space_before_token = true;
	                } else {
	                    print_newline(false, true);
	                }
	            } else { // collapse
	                if (opt.brace_style === 'collapse-preserve-inline') {
	                    // search forward for a newline wanted inside this block
	                    var index = 0;
	                    var check_token = null;
	                    flags.inline_frame = true;
	                    do {
	                        index += 1;
	                        check_token = get_token(index);
	                        if (check_token.wanted_newline) {
	                            flags.inline_frame = false;
	                            break;
	                        }
	                    } while (check_token.type !== 'TK_EOF' &&
	                          !(check_token.type === 'TK_END_BLOCK' && check_token.opened === current_token))
	                }

	                if (is_array(previous_flags.mode) && (last_type === 'TK_START_EXPR' || last_type === 'TK_COMMA')) {
	                    // if we're preserving inline,
	                    // allow newline between comma and next brace.
	                    if (flags.inline_frame) {
	                        allow_wrap_or_preserved_newline();
	                        flags.inline_frame = true;
	                        previous_flags.multiline_frame = previous_flags.multiline_frame || flags.multiline_frame;
	                        flags.multiline_frame = false;
	                    } else if (last_type === 'TK_COMMA') {
	                        output.space_before_token = true;
	                    }
	                } else if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
	                    if (last_type === 'TK_START_BLOCK') {
	                        print_newline();
	                    } else {
	                        output.space_before_token = true;
	                    }
	                }
	            }
	            print_token();
	            indent();
	        }

	        function handle_end_block() {
	            // statements must all be closed when their container closes
	            while (flags.mode === MODE.Statement) {
	                restore_mode();
	            }
	            var empty_braces = last_type === 'TK_START_BLOCK';

	            if (opt.brace_style === "expand") {
	                if (!empty_braces) {
	                    print_newline();
	                }
	            } else {
	                // skip {}
	                if (!empty_braces) {
	                    if (flags.inline_frame) {
	                        output.space_before_token = true;
	                    } else if (is_array(flags.mode) && opt.keep_array_indentation) {
	                        // we REALLY need a newline here, but newliner would skip that
	                        opt.keep_array_indentation = false;
	                        print_newline();
	                        opt.keep_array_indentation = true;

	                    } else {
	                        print_newline();
	                    }
	                }
	            }
	            restore_mode();
	            print_token();
	        }

	        function handle_word() {
	            if (current_token.type === 'TK_RESERVED') {
	                if (in_array(current_token.text, ['set', 'get']) && flags.mode !== MODE.ObjectLiteral) {
	                    current_token.type = 'TK_WORD';
	                } else if (in_array(current_token.text, ['as', 'from']) && !flags.import_block) {
	                    current_token.type = 'TK_WORD';
	                } else if (flags.mode === MODE.ObjectLiteral) {
	                    var next_token = get_token(1);
	                    if (next_token.text == ':') {
	                        current_token.type = 'TK_WORD';
	                    }
	                }
	            }

	            if (start_of_statement()) {
	                // The conditional starts the statement if appropriate.
	            } else if (current_token.wanted_newline && !is_expression(flags.mode) &&
	                (last_type !== 'TK_OPERATOR' || (flags.last_text === '--' || flags.last_text === '++')) &&
	                last_type !== 'TK_EQUALS' &&
	                (opt.preserve_newlines || !(last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const', 'set', 'get'])))) {

	                print_newline();
	            }

	            if (flags.do_block && !flags.do_while) {
	                if (current_token.type === 'TK_RESERVED' && current_token.text === 'while') {
	                    // do {} ## while ()
	                    output.space_before_token = true;
	                    print_token();
	                    output.space_before_token = true;
	                    flags.do_while = true;
	                    return;
	                } else {
	                    // do {} should always have while as the next word.
	                    // if we don't see the expected while, recover
	                    print_newline();
	                    flags.do_block = false;
	                }
	            }

	            // if may be followed by else, or not
	            // Bare/inline ifs are tricky
	            // Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();
	            if (flags.if_block) {
	                if (!flags.else_block && (current_token.type === 'TK_RESERVED' && current_token.text === 'else')) {
	                    flags.else_block = true;
	                } else {
	                    while (flags.mode === MODE.Statement) {
	                        restore_mode();
	                    }
	                    flags.if_block = false;
	                    flags.else_block = false;
	                }
	            }

	            if (current_token.type === 'TK_RESERVED' && (current_token.text === 'case' || (current_token.text === 'default' && flags.in_case_statement))) {
	                print_newline();
	                if (flags.case_body || opt.jslint_happy) {
	                    // switch cases following one another
	                    deindent();
	                    flags.case_body = false;
	                }
	                print_token();
	                flags.in_case = true;
	                flags.in_case_statement = true;
	                return;
	            }

	            if (current_token.type === 'TK_RESERVED' && current_token.text === 'function') {
	                if (in_array(flags.last_text, ['}', ';']) || (output.just_added_newline() && ! in_array(flags.last_text, ['[', '{', ':', '=', ',']))) {
	                    // make sure there is a nice clean space of at least one blank line
	                    // before a new function definition
	                    if ( !output.just_added_blankline() && !current_token.comments_before.length) {
	                        print_newline();
	                        print_newline(true);
	                    }
	                }
	                if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD') {
	                    if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set', 'new', 'return', 'export', 'async'])) {
	                        output.space_before_token = true;
	                    } else if (last_type === 'TK_RESERVED' && flags.last_text === 'default' && last_last_text === 'export') {
	                        output.space_before_token = true;
	                    } else {
	                        print_newline();
	                    }
	                } else if (last_type === 'TK_OPERATOR' || flags.last_text === '=') {
	                    // foo = function
	                    output.space_before_token = true;
	                } else if (!flags.multiline_frame && (is_expression(flags.mode) || is_array(flags.mode))) {
	                    // (function
	                } else {
	                    print_newline();
	                }
	            }

	            if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
	                if (!start_of_object_property()) {
	                    allow_wrap_or_preserved_newline();
	                }
	            }

	            if (current_token.type === 'TK_RESERVED' &&  in_array(current_token.text, ['function', 'get', 'set'])) {
	                print_token();
	                flags.last_word = current_token.text;
	                return;
	            }

	            prefix = 'NONE';

	            if (last_type === 'TK_END_BLOCK') {

	                if (!(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally', 'from']))) {
	                    prefix = 'NEWLINE';
	                } else {
	                    if (opt.brace_style === "expand" ||
	                        opt.brace_style === "end-expand" ||
	                        (opt.brace_style === "none" && current_token.wanted_newline)) {
	                        prefix = 'NEWLINE';
	                    } else {
	                        prefix = 'SPACE';
	                        output.space_before_token = true;
	                    }
	                }
	            } else if (last_type === 'TK_SEMICOLON' && flags.mode === MODE.BlockStatement) {
	                // TODO: Should this be for STATEMENT as well?
	                prefix = 'NEWLINE';
	            } else if (last_type === 'TK_SEMICOLON' && is_expression(flags.mode)) {
	                prefix = 'SPACE';
	            } else if (last_type === 'TK_STRING') {
	                prefix = 'NEWLINE';
	            } else if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' ||
	                (flags.last_text === '*' && last_last_text === 'function')) {
	                prefix = 'SPACE';
	            } else if (last_type === 'TK_START_BLOCK') {
	                if (flags.inline_frame) {
	                    prefix = 'SPACE';
	                } else {
	                    prefix = 'NEWLINE';
	                }
	            } else if (last_type === 'TK_END_EXPR') {
	                output.space_before_token = true;
	                prefix = 'NEWLINE';
	            }

	            if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, Tokenizer.line_starters) && flags.last_text !== ')') {
	                if (flags.last_text === 'else' || flags.last_text === 'export') {
	                    prefix = 'SPACE';
	                } else {
	                    prefix = 'NEWLINE';
	                }

	            }

	            if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally'])) {
	                if (!(last_type === 'TK_END_BLOCK' && previous_flags.mode === MODE.BlockStatement) ||
	                    opt.brace_style === "expand" ||
	                    opt.brace_style === "end-expand" ||
	                    (opt.brace_style === "none" && current_token.wanted_newline)) {
	                    print_newline();
	                } else {
	                    output.trim(true);
	                    var line = output.current_line;
	                    // If we trimmed and there's something other than a close block before us
	                    // put a newline back in.  Handles '} // comment' scenario.
	                    if (line.last() !== '}') {
	                        print_newline();
	                    }
	                    output.space_before_token = true;
	                }
	            } else if (prefix === 'NEWLINE') {
	                if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
	                    // no newline between 'return nnn'
	                    output.space_before_token = true;
	                } else if (last_type !== 'TK_END_EXPR') {
	                    if ((last_type !== 'TK_START_EXPR' || !(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['var', 'let', 'const']))) && flags.last_text !== ':') {
	                        // no need to force newline on 'var': for (var x = 0...)
	                        if (current_token.type === 'TK_RESERVED' && current_token.text === 'if' && flags.last_text === 'else') {
	                            // no newline for } else if {
	                            output.space_before_token = true;
	                        } else {
	                            print_newline();
	                        }
	                    }
	                } else if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, Tokenizer.line_starters) && flags.last_text !== ')') {
	                    print_newline();
	                }
	            } else if (flags.multiline_frame && is_array(flags.mode) && flags.last_text === ',' && last_last_text === '}') {
	                print_newline(); // }, in lists get a newline treatment
	            } else if (prefix === 'SPACE') {
	                output.space_before_token = true;
	            }
	            print_token();
	            flags.last_word = current_token.text;

	            if (current_token.type === 'TK_RESERVED') {
	                if (current_token.text === 'do') {
	                    flags.do_block = true;
	                } else if (current_token.text === 'if') {
	                    flags.if_block = true;
	                } else if (current_token.text === 'import') {
	                    flags.import_block = true;
	                } else if (flags.import_block && current_token.type === 'TK_RESERVED' && current_token.text === 'from') {
	                    flags.import_block = false;
	                }
	            }
	        }

	        function handle_semicolon() {
	            if (start_of_statement()) {
	                // The conditional starts the statement if appropriate.
	                // Semicolon can be the start (and end) of a statement
	                output.space_before_token = false;
	            }
	            while (flags.mode === MODE.Statement && !flags.if_block && !flags.do_block) {
	                restore_mode();
	            }

	            // hacky but effective for the moment
	            if (flags.import_block) {
	                flags.import_block = false;
	            }
	            print_token();
	        }

	        function handle_string() {
	            if (start_of_statement()) {
	                // The conditional starts the statement if appropriate.
	                // One difference - strings want at least a space before
	                output.space_before_token = true;
	            } else if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' || flags.inline_frame) {
	                output.space_before_token = true;
	            } else if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
	                if (!start_of_object_property()) {
	                    allow_wrap_or_preserved_newline();
	                }
	            } else {
	                print_newline();
	            }
	            print_token();
	        }

	        function handle_equals() {
	            if (start_of_statement()) {
	                // The conditional starts the statement if appropriate.
	            }

	            if (flags.declaration_statement) {
	                // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
	                flags.declaration_assignment = true;
	            }
	            output.space_before_token = true;
	            print_token();
	            output.space_before_token = true;
	        }

	        function handle_comma() {
	            print_token();
	            output.space_before_token = true;
	            if (flags.declaration_statement) {
	                if (is_expression(flags.parent.mode)) {
	                    // do not break on comma, for(var a = 1, b = 2)
	                    flags.declaration_assignment = false;
	                }

	                if (flags.declaration_assignment) {
	                    flags.declaration_assignment = false;
	                    print_newline(false, true);
	                } else if (opt.comma_first) {
	                    // for comma-first, we want to allow a newline before the comma
	                    // to turn into a newline after the comma, which we will fixup later
	                    allow_wrap_or_preserved_newline();
	                }
	            } else if (flags.mode === MODE.ObjectLiteral ||
	                (flags.mode === MODE.Statement && flags.parent.mode === MODE.ObjectLiteral)) {
	                if (flags.mode === MODE.Statement) {
	                    restore_mode();
	                }

	                if (!flags.inline_frame) {
	                    print_newline();
	                }
	            } else if (opt.comma_first) {
	                // EXPR or DO_BLOCK
	                // for comma-first, we want to allow a newline before the comma
	                // to turn into a newline after the comma, which we will fixup later
	                allow_wrap_or_preserved_newline();
	            }
	        }

	        function handle_operator() {
	            if (start_of_statement()) {
	                // The conditional starts the statement if appropriate.
	            }

	            if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
	                // "return" had a special handling in TK_WORD. Now we need to return the favor
	                output.space_before_token = true;
	                print_token();
	                return;
	            }

	            // hack for actionscript's import .*;
	            if (current_token.text === '*' && last_type === 'TK_DOT') {
	                print_token();
	                return;
	            }

	            if (current_token.text === ':' && flags.in_case) {
	                flags.case_body = true;
	                indent();
	                print_token();
	                print_newline();
	                flags.in_case = false;
	                return;
	            }

	            if (current_token.text === '::') {
	                // no spaces around exotic namespacing syntax operator
	                print_token();
	                return;
	            }

	            // Allow line wrapping between operators
	            if (last_type === 'TK_OPERATOR') {
	                allow_wrap_or_preserved_newline();
	            }

	            var space_before = true;
	            var space_after = true;

	            if (in_array(current_token.text, ['--', '++', '!', '~']) || (in_array(current_token.text, ['-', '+']) && (in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) || in_array(flags.last_text, Tokenizer.line_starters) || flags.last_text === ','))) {
	                // unary operators (and binary +/- pretending to be unary) special cases

	                space_before = false;
	                space_after = false;

	                // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
	                // if there is a newline between -- or ++ and anything else we should preserve it.
	                if (current_token.wanted_newline && (current_token.text === '--' || current_token.text === '++')) {
	                    print_newline(false, true);
	                }

	                if (flags.last_text === ';' && is_expression(flags.mode)) {
	                    // for (;; ++i)
	                    //        ^^^
	                    space_before = true;
	                }

	                if (last_type === 'TK_RESERVED') {
	                    space_before = true;
	                } else if (last_type === 'TK_END_EXPR') {
	                    space_before = !(flags.last_text === ']' && (current_token.text === '--' || current_token.text === '++'));
	                } else if (last_type === 'TK_OPERATOR') {
	                    // a++ + ++b;
	                    // a - -b
	                    space_before = in_array(current_token.text, ['--', '-', '++', '+']) && in_array(flags.last_text, ['--', '-', '++', '+']);
	                    // + and - are not unary when preceeded by -- or ++ operator
	                    // a-- + b
	                    // a * +b
	                    // a - -b
	                    if (in_array(current_token.text, ['+', '-']) && in_array(flags.last_text, ['--', '++'])) {
	                        space_after = true;
	                    }
	                }


	                if (((flags.mode === MODE.BlockStatement && !flags.inline_frame) || flags.mode === MODE.Statement)
	                    && (flags.last_text === '{' || flags.last_text === ';')) {
	                    // { foo; --i }
	                    // foo(); --bar;
	                    print_newline();
	                }
	            } else if (current_token.text === ':') {
	                if (flags.ternary_depth === 0) {
	                    // Colon is invalid javascript outside of ternary and object, but do our best to guess what was meant.
	                    space_before = false;
	                } else {
	                    flags.ternary_depth -= 1;
	                }
	            } else if (current_token.text === '?') {
	                flags.ternary_depth += 1;
	            } else if (current_token.text === '*' && last_type === 'TK_RESERVED' && flags.last_text === 'function') {
	                space_before = false;
	                space_after = false;
	            }
	            output.space_before_token = output.space_before_token || space_before;
	            print_token();
	            output.space_before_token = space_after;
	        }

	        function handle_block_comment() {
	            if (output.raw) {
	                output.add_raw_token(current_token)
	                if (current_token.directives && current_token.directives['preserve'] === 'end') {
	                    // If we're testing the raw output behavior, do not allow a directive to turn it off.
	                    if (!opt.test_output_raw) {
	                        output.raw = false;
	                    }
	                }
	                return;
	            }

	            if (current_token.directives) {
	                print_newline(false, true);
	                print_token();
	                if (current_token.directives['preserve'] === 'start') {
	                    output.raw = true;
	                }
	                print_newline(false, true);
	                return;
	            }

	            // inline block
	            if (!acorn.newline.test(current_token.text) && !current_token.wanted_newline) {
	                output.space_before_token = true;
	                print_token();
	                output.space_before_token = true;
	                return;
	            }

	            var lines = split_linebreaks(current_token.text);
	            var j; // iterator for this case
	            var javadoc = false;
	            var starless = false;
	            var lastIndent = current_token.whitespace_before;
	            var lastIndentLength = lastIndent.length;

	            // block comment starts with a new line
	            print_newline(false, true);
	            if (lines.length > 1) {
	                if (all_lines_start_with(lines.slice(1), '*')) {
	                    javadoc = true;
	                }
	                else if (each_line_matches_indent(lines.slice(1), lastIndent)) {
	                    starless = true;
	                }
	            }

	            // first line always indented
	            print_token(lines[0]);
	            for (j = 1; j < lines.length; j++) {
	                print_newline(false, true);
	                if (javadoc) {
	                    // javadoc: reformat and re-indent
	                    print_token(' ' + ltrim(lines[j]));
	                } else if (starless && lines[j].length > lastIndentLength) {
	                    // starless: re-indent non-empty content, avoiding trim
	                    print_token(lines[j].substring(lastIndentLength));
	                } else {
	                    // normal comments output raw
	                    output.add_token(lines[j]);
	                }
	            }

	            // for comments of more than one line, make sure there's a new line after
	            print_newline(false, true);
	        }

	        function handle_comment() {
	            if (current_token.wanted_newline) {
	                print_newline(false, true);
	            } else {
	                output.trim(true);
	            }

	            output.space_before_token = true;
	            print_token();
	            print_newline(false, true);
	        }

	        function handle_dot() {
	            if (start_of_statement()) {
	                // The conditional starts the statement if appropriate.
	            }

	            if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
	                output.space_before_token = true;
	            } else {
	                // allow preserved newlines before dots in general
	                // force newlines on dots after close paren when break_chained - for bar().baz()
	                allow_wrap_or_preserved_newline(flags.last_text === ')' && opt.break_chained_methods);
	            }

	            print_token();
	        }

	        function handle_unknown() {
	            print_token();

	            if (current_token.text[current_token.text.length - 1] === '\n') {
	                print_newline();
	            }
	        }

	        function handle_eof() {
	            // Unwind any open statements
	            while (flags.mode === MODE.Statement) {
	                restore_mode();
	            }
	        }
	    }


	    function OutputLine(parent) {
	        var _character_count = 0;
	        // use indent_count as a marker for lines that have preserved indentation
	        var _indent_count = -1;

	        var _items = [];
	        var _empty = true;

	        this.set_indent = function(level) {
	            _character_count = parent.baseIndentLength + level * parent.indent_length
	            _indent_count = level;
	        }

	        this.get_character_count = function() {
	            return _character_count;
	        }

	        this.is_empty = function() {
	            return _empty;
	        }

	        this.last = function() {
	            if (!this._empty) {
	              return _items[_items.length - 1];
	            } else {
	              return null;
	            }
	        }

	        this.push = function(input) {
	            _items.push(input);
	            _character_count += input.length;
	            _empty = false;
	        }

	        this.pop = function() {
	            var item = null;
	            if (!_empty) {
	                item = _items.pop();
	                _character_count -= item.length;
	                _empty = _items.length === 0;
	            }
	            return item;
	        }

	        this.remove_indent = function() {
	            if (_indent_count > 0) {
	                _indent_count -= 1;
	                _character_count -= parent.indent_length
	            }
	        }

	        this.trim = function() {
	            while (this.last() === ' ') {
	                var item = _items.pop();
	                _character_count -= 1;
	            }
	            _empty = _items.length === 0;
	        }

	        this.toString = function() {
	            var result = '';
	            if (!this._empty) {
	                if (_indent_count >= 0) {
	                    result = parent.indent_cache[_indent_count];
	                }
	                result += _items.join('')
	            }
	            return result;
	        }
	    }

	    function Output(indent_string, baseIndentString) {
	        baseIndentString = baseIndentString || '';
	        this.indent_cache = [ baseIndentString ];
	        this.baseIndentLength = baseIndentString.length;
	        this.indent_length = indent_string.length;
	        this.raw = false;

	        var lines =[];
	        this.baseIndentString = baseIndentString;
	        this.indent_string = indent_string;
	        this.previous_line = null;
	        this.current_line = null;
	        this.space_before_token = false;

	        this.add_outputline = function() {
	            this.previous_line = this.current_line;
	            this.current_line = new OutputLine(this);
	            lines.push(this.current_line);
	        }

	        // initialize
	        this.add_outputline();


	        this.get_line_number = function() {
	            return lines.length;
	        }

	        // Using object instead of string to allow for later expansion of info about each line
	        this.add_new_line = function(force_newline) {
	            if (this.get_line_number() === 1 && this.just_added_newline()) {
	                return false; // no newline on start of file
	            }

	            if (force_newline || !this.just_added_newline()) {
	                if (!this.raw) {
	                    this.add_outputline();
	                }
	                return true;
	            }

	            return false;
	        }

	        this.get_code = function() {
	            var sweet_code = lines.join('\n').replace(/[\r\n\t ]+$/, '');
	            return sweet_code;
	        }

	        this.set_indent = function(level) {
	            // Never indent your first output indent at the start of the file
	            if (lines.length > 1) {
	                while(level >= this.indent_cache.length) {
	                    this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
	                }

	                this.current_line.set_indent(level);
	                return true;
	            }
	            this.current_line.set_indent(0);
	            return false;
	        }

	        this.add_raw_token = function(token) {
	            for (var x = 0; x < token.newlines; x++) {
	                this.add_outputline();
	            }
	            this.current_line.push(token.whitespace_before);
	            this.current_line.push(token.text);
	            this.space_before_token = false;
	        }

	        this.add_token = function(printable_token) {
	            this.add_space_before_token();
	            this.current_line.push(printable_token);
	        }

	        this.add_space_before_token = function() {
	            if (this.space_before_token && !this.just_added_newline()) {
	                this.current_line.push(' ');
	            }
	            this.space_before_token = false;
	        }

	        this.remove_redundant_indentation = function (frame) {
	            // This implementation is effective but has some issues:
	            //     - can cause line wrap to happen too soon due to indent removal
	            //           after wrap points are calculated
	            // These issues are minor compared to ugly indentation.

	            if (frame.multiline_frame ||
	                frame.mode === MODE.ForInitializer ||
	                frame.mode === MODE.Conditional) {
	                return;
	            }

	            // remove one indent from each line inside this section
	            var index = frame.start_line_index;
	            var line;

	            var output_length = lines.length;
	            while (index < output_length) {
	                lines[index].remove_indent();
	                index++;
	            }
	        }

	        this.trim = function(eat_newlines) {
	            eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;

	            this.current_line.trim(indent_string, baseIndentString);

	            while (eat_newlines && lines.length > 1 &&
	                this.current_line.is_empty()) {
	                lines.pop();
	                this.current_line = lines[lines.length - 1]
	                this.current_line.trim();
	            }

	            this.previous_line = lines.length > 1 ? lines[lines.length - 2] : null;
	        }

	        this.just_added_newline = function() {
	            return this.current_line.is_empty();
	        }

	        this.just_added_blankline = function() {
	            if (this.just_added_newline()) {
	                if (lines.length === 1) {
	                    return true; // start of the file and newline = blank
	                }

	                var line = lines[lines.length - 2];
	                return line.is_empty();
	            }
	            return false;
	        }
	    }


	    var Token = function(type, text, newlines, whitespace_before, mode, parent) {
	        this.type = type;
	        this.text = text;
	        this.comments_before = [];
	        this.newlines = newlines || 0;
	        this.wanted_newline = newlines > 0;
	        this.whitespace_before = whitespace_before || '';
	        this.parent = null;
	        this.opened = null;
	        this.directives = null;
	    }

	    function tokenizer(input, opts, indent_string) {

	        var whitespace = "\n\r\t ".split('');
	        var digit = /[0-9]/;
	        var digit_bin = /[01]/;
	        var digit_oct = /[01234567]/;
	        var digit_hex = /[0123456789abcdefABCDEF]/;

	        var punct = ('+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: => **').split(' ');
	        // words which should always start on new line.
	        this.line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export'.split(',');
	        var reserved_words = this.line_starters.concat(['do', 'in', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof', 'yield', 'async', 'await', 'from', 'as']);

	        //  /* ... */ comment ends with nearest */ or end of file
	        var block_comment_pattern = /([\s\S]*?)((?:\*\/)|$)/g;

	        // comment ends just before nearest linefeed or end of file
	        var comment_pattern = /([^\n\r\u2028\u2029]*)/g;

	        var directives_block_pattern = /\/\* beautify( \w+[:]\w+)+ \*\//g;
	        var directive_pattern = / (\w+)[:](\w+)/g;
	        var directives_end_ignore_pattern = /([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g;

	        var template_pattern = /((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g

	        var n_newlines, whitespace_before_token, in_html_comment, tokens, parser_pos;
	        var input_length;

	        this.tokenize = function() {
	            // cache the source's length.
	            input_length = input.length
	            parser_pos = 0;
	            in_html_comment = false
	            tokens = [];

	            var next, last;
	            var token_values;
	            var open = null;
	            var open_stack = [];
	            var comments = [];

	            while (!(last && last.type === 'TK_EOF')) {
	                token_values = tokenize_next();
	                next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
	                while(next.type === 'TK_COMMENT' || next.type === 'TK_BLOCK_COMMENT' || next.type === 'TK_UNKNOWN') {
	                    if (next.type === 'TK_BLOCK_COMMENT') {
	                        next.directives = token_values[2];
	                    }
	                    comments.push(next);
	                    token_values = tokenize_next();
	                    next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
	                }

	                if (comments.length) {
	                    next.comments_before = comments;
	                    comments = [];
	                }

	                if (next.type === 'TK_START_BLOCK' || next.type === 'TK_START_EXPR') {
	                    next.parent = last;
	                    open_stack.push(open);
	                    open = next;
	                }  else if ((next.type === 'TK_END_BLOCK' || next.type === 'TK_END_EXPR') &&
	                    (open && (
	                        (next.text === ']' && open.text === '[') ||
	                        (next.text === ')' && open.text === '(') ||
	                        (next.text === '}' && open.text === '{')))) {
	                    next.parent = open.parent;
	                    next.opened = open

	                    open = open_stack.pop();
	                }

	                tokens.push(next);
	                last = next;
	            }

	            return tokens;
	        }

	        function get_directives (text) {
	            if (!text.match(directives_block_pattern)) {
	                return null;
	            }

	            var directives = {};
	            directive_pattern.lastIndex = 0;
	            var directive_match = directive_pattern.exec(text);

	            while (directive_match) {
	                directives[directive_match[1]] = directive_match[2];
	                directive_match = directive_pattern.exec(text);
	            }

	            return directives;
	        }

	        function tokenize_next() {
	            var i, resulting_string;
	            var whitespace_on_this_line = [];

	            n_newlines = 0;
	            whitespace_before_token = '';

	            if (parser_pos >= input_length) {
	                return ['', 'TK_EOF'];
	            }

	            var last_token;
	            if (tokens.length) {
	                last_token = tokens[tokens.length-1];
	            } else {
	                // For the sake of tokenizing we can pretend that there was on open brace to start
	                last_token = new Token('TK_START_BLOCK', '{');
	            }


	            var c = input.charAt(parser_pos);
	            parser_pos += 1;

	            while (in_array(c, whitespace)) {

	                if (acorn.newline.test(c)) {
	                    if (!(c === '\n' && input.charAt(parser_pos-2) === '\r')) {
	                        n_newlines += 1;
	                        whitespace_on_this_line = [];
	                    }
	                } else {
	                    whitespace_on_this_line.push(c);
	                }

	                if (parser_pos >= input_length) {
	                    return ['', 'TK_EOF'];
	                }

	                c = input.charAt(parser_pos);
	                parser_pos += 1;
	            }

	            if(whitespace_on_this_line.length) {
	                whitespace_before_token = whitespace_on_this_line.join('');
	            }

	            if (digit.test(c) || (c === '.' && digit.test(input.charAt(parser_pos)))) {
	                var allow_decimal = true;
	                var allow_e = true;
	                var local_digit = digit;

	                if (c === '0' && parser_pos < input_length && /[XxOoBb]/.test(input.charAt(parser_pos))) {
	                    // switch to hex/oct/bin number, no decimal or e, just hex/oct/bin digits
	                    allow_decimal = false;
	                    allow_e = false;
	                    if ( /[Bb]/.test(input.charAt(parser_pos)) ) {
	                        local_digit = digit_bin;
	                    } else if ( /[Oo]/.test(input.charAt(parser_pos)) ) {
	                        local_digit = digit_oct;
	                    } else {
	                        local_digit = digit_hex;
	                    }
	                    c += input.charAt(parser_pos);
	                    parser_pos += 1;
	                } else if (c === '.') {
	                    // Already have a decimal for this literal, don't allow another
	                    allow_decimal = false;
	                } else {
	                    // we know this first loop will run.  It keeps the logic simpler.
	                    c = '';
	                    parser_pos -= 1;
	                }

	                // Add the digits
	                while (parser_pos < input_length && local_digit.test(input.charAt(parser_pos))) {
	                    c += input.charAt(parser_pos);
	                    parser_pos += 1;

	                    if (allow_decimal && parser_pos < input_length && input.charAt(parser_pos) === '.') {
	                        c += input.charAt(parser_pos);
	                        parser_pos += 1;
	                        allow_decimal = false;
	                    } else if (allow_e && parser_pos < input_length && /[Ee]/.test(input.charAt(parser_pos))) {
	                        c += input.charAt(parser_pos);
	                        parser_pos += 1;

	                        if (parser_pos < input_length && /[+-]/.test(input.charAt(parser_pos))) {
	                            c += input.charAt(parser_pos);
	                            parser_pos += 1;
	                        }

	                        allow_e = false;
	                        allow_decimal = false;
	                    }
	                }

	                return [c, 'TK_WORD'];
	            }

	            if (acorn.isIdentifierStart(input.charCodeAt(parser_pos-1))) {
	                if (parser_pos < input_length) {
	                    while (acorn.isIdentifierChar(input.charCodeAt(parser_pos))) {
	                        c += input.charAt(parser_pos);
	                        parser_pos += 1;
	                        if (parser_pos === input_length) {
	                            break;
	                        }
	                    }
	                }

	                if (!(last_token.type === 'TK_DOT' ||
	                        (last_token.type === 'TK_RESERVED' && in_array(last_token.text, ['set', 'get'])))
	                    && in_array(c, reserved_words)) {
	                    if (c === 'in') { // hack for 'in' operator
	                        return [c, 'TK_OPERATOR'];
	                    }
	                    return [c, 'TK_RESERVED'];
	                }

	                return [c, 'TK_WORD'];
	            }

	            if (c === '(' || c === '[') {
	                return [c, 'TK_START_EXPR'];
	            }

	            if (c === ')' || c === ']') {
	                return [c, 'TK_END_EXPR'];
	            }

	            if (c === '{') {
	                return [c, 'TK_START_BLOCK'];
	            }

	            if (c === '}') {
	                return [c, 'TK_END_BLOCK'];
	            }

	            if (c === ';') {
	                return [c, 'TK_SEMICOLON'];
	            }

	            if (c === '/') {
	                var comment = '';
	                // peek for comment /* ... */
	                if (input.charAt(parser_pos) === '*') {
	                    parser_pos += 1;
	                    block_comment_pattern.lastIndex = parser_pos;
	                    var comment_match = block_comment_pattern.exec(input);
	                    comment = '/*' + comment_match[0];
	                    parser_pos += comment_match[0].length;
	                    var directives = get_directives(comment);
	                    if (directives && directives['ignore'] === 'start') {
	                        directives_end_ignore_pattern.lastIndex = parser_pos;
	                        comment_match = directives_end_ignore_pattern.exec(input)
	                        comment += comment_match[0];
	                        parser_pos += comment_match[0].length;
	                    }
	                    comment = comment.replace(acorn.allLineBreaks, '\n');
	                    return [comment, 'TK_BLOCK_COMMENT', directives];
	                }
	                // peek for comment // ...
	                if (input.charAt(parser_pos) === '/') {
	                    parser_pos += 1;
	                    comment_pattern.lastIndex = parser_pos;
	                    var comment_match = comment_pattern.exec(input);
	                    comment = '//' + comment_match[0];
	                    parser_pos += comment_match[0].length;
	                    return [comment, 'TK_COMMENT'];
	                }

	            }

	            var startXmlRegExp = /^<([-a-zA-Z:0-9_.]+|{.+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{.+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.+?}))*\s*(\/?)\s*>/

	            if (c === '`' || c === "'" || c === '"' || // string
	                (
	                    (c === '/') || // regexp
	                    (opts.e4x && c === "<" && input.slice(parser_pos - 1).match(startXmlRegExp)) // xml
	                ) && ( // regex and xml can only appear in specific locations during parsing
	                    (last_token.type === 'TK_RESERVED' && in_array(last_token.text , ['return', 'case', 'throw', 'else', 'do', 'typeof', 'yield'])) ||
	                    (last_token.type === 'TK_END_EXPR' && last_token.text === ')' &&
	                        last_token.parent && last_token.parent.type === 'TK_RESERVED' && in_array(last_token.parent.text, ['if', 'while', 'for'])) ||
	                    (in_array(last_token.type, ['TK_COMMENT', 'TK_START_EXPR', 'TK_START_BLOCK',
	                        'TK_END_BLOCK', 'TK_OPERATOR', 'TK_EQUALS', 'TK_EOF', 'TK_SEMICOLON', 'TK_COMMA'
	                    ]))
	                )) {

	                var sep = c,
	                    esc = false,
	                    has_char_escapes = false;

	                resulting_string = c;

	                if (sep === '/') {
	                    //
	                    // handle regexp
	                    //
	                    var in_char_class = false;
	                    while (parser_pos < input_length &&
	                            ((esc || in_char_class || input.charAt(parser_pos) !== sep) &&
	                            !acorn.newline.test(input.charAt(parser_pos)))) {
	                        resulting_string += input.charAt(parser_pos);
	                        if (!esc) {
	                            esc = input.charAt(parser_pos) === '\\';
	                            if (input.charAt(parser_pos) === '[') {
	                                in_char_class = true;
	                            } else if (input.charAt(parser_pos) === ']') {
	                                in_char_class = false;
	                            }
	                        } else {
	                            esc = false;
	                        }
	                        parser_pos += 1;
	                    }
	                } else if (opts.e4x && sep === '<') {
	                    //
	                    // handle e4x xml literals
	                    //

	                    var xmlRegExp = /<(\/?)([-a-zA-Z:0-9_.]+|{.+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{.+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.+?}))*\s*(\/?)\s*>/g;
	                    var xmlStr = input.slice(parser_pos - 1);
	                    var match = xmlRegExp.exec(xmlStr);
	                    if (match && match.index === 0) {
	                        var rootTag = match[2];
	                        var depth = 0;
	                        while (match) {
	                            var isEndTag = !! match[1];
	                            var tagName = match[2];
	                            var isSingletonTag = ( !! match[match.length - 1]) || (tagName.slice(0, 8) === "![CDATA[");
	                            if (tagName === rootTag && !isSingletonTag) {
	                                if (isEndTag) {
	                                    --depth;
	                                } else {
	                                    ++depth;
	                                }
	                            }
	                            if (depth <= 0) {
	                                break;
	                            }
	                            match = xmlRegExp.exec(xmlStr);
	                        }
	                        var xmlLength = match ? match.index + match[0].length : xmlStr.length;
	                        xmlStr = xmlStr.slice(0, xmlLength);
	                        parser_pos += xmlLength - 1;
	                        xmlStr = xmlStr.replace(acorn.allLineBreaks, '\n');
	                        return [xmlStr, "TK_STRING"];
	                    }
	                } else {
	                    //
	                    // handle string
	                    //
	                    var parse_string = function(delimiter, allow_unescaped_newlines, start_sub) {
	                        // Template strings can travers lines without escape characters.
	                        // Other strings cannot
	                        var current_char;
	                        while (parser_pos < input_length) {
	                            current_char = input.charAt(parser_pos);
	                            if (!(esc || (current_char !== delimiter &&
	                                (allow_unescaped_newlines || !acorn.newline.test(current_char))))) {
	                                break;
	                            }

	                            // Handle \r\n linebreaks after escapes or in template strings
	                            if ((esc || allow_unescaped_newlines) && acorn.newline.test(current_char)) {
	                                if (current_char === '\r' && input.charAt(parser_pos + 1) === '\n') {
	                                    parser_pos += 1;
	                                    current_char = input.charAt(parser_pos);
	                                }
	                                resulting_string += '\n';
	                            } else {
	                                resulting_string += current_char;
	                            }
	                            if (esc) {
	                                if (current_char === 'x' || current_char === 'u') {
	                                    has_char_escapes = true;
	                                }
	                                esc = false;
	                            } else {
	                                esc = current_char === '\\';
	                            }

	                            parser_pos += 1;

	                            if (start_sub && resulting_string.indexOf(start_sub, resulting_string.length - start_sub.length) !== -1) {
	                                if (delimiter === '`') {
	                                    parse_string('}', allow_unescaped_newlines, '`')
	                                }  else {
	                                    parse_string('`', allow_unescaped_newlines, '${')
	                                }
	                            }
	                        }
	                    }
	                    if (sep === '`') {
	                        parse_string('`', true, '${')
	                    }  else {
	                        parse_string(sep)
	                    }
	                }

	                if (has_char_escapes && opts.unescape_strings) {
	                    resulting_string = unescape_string(resulting_string);
	                }

	                if (parser_pos < input_length && input.charAt(parser_pos) === sep) {
	                    resulting_string += sep;
	                    parser_pos += 1;

	                    if (sep === '/') {
	                        // regexps may have modifiers /regexp/MOD , so fetch those, too
	                        // Only [gim] are valid, but if the user puts in garbage, do what we can to take it.
	                        while (parser_pos < input_length && acorn.isIdentifierStart(input.charCodeAt(parser_pos))) {
	                            resulting_string += input.charAt(parser_pos);
	                            parser_pos += 1;
	                        }
	                    }
	                }
	                return [resulting_string, 'TK_STRING'];
	            }

	            if (c === '#') {

	                if (tokens.length === 0 && input.charAt(parser_pos) === '!') {
	                    // shebang
	                    resulting_string = c;
	                    while (parser_pos < input_length && c !== '\n') {
	                        c = input.charAt(parser_pos);
	                        resulting_string += c;
	                        parser_pos += 1;
	                    }
	                    return [trim(resulting_string) + '\n', 'TK_UNKNOWN'];
	                }



	                // Spidermonkey-specific sharp variables for circular references
	                // https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
	                // http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
	                var sharp = '#';
	                if (parser_pos < input_length && digit.test(input.charAt(parser_pos))) {
	                    do {
	                        c = input.charAt(parser_pos);
	                        sharp += c;
	                        parser_pos += 1;
	                    } while (parser_pos < input_length && c !== '#' && c !== '=');
	                    if (c === '#') {
	                        //
	                    } else if (input.charAt(parser_pos) === '[' && input.charAt(parser_pos + 1) === ']') {
	                        sharp += '[]';
	                        parser_pos += 2;
	                    } else if (input.charAt(parser_pos) === '{' && input.charAt(parser_pos + 1) === '}') {
	                        sharp += '{}';
	                        parser_pos += 2;
	                    }
	                    return [sharp, 'TK_WORD'];
	                }
	            }

	            if (c === '<' && (input.charAt(parser_pos) === '?' || input.charAt(parser_pos) === '%')) {
	                template_pattern.lastIndex = parser_pos - 1;
	                var template_match = template_pattern.exec(input);
	                if(template_match) {
	                    c = template_match[0];
	                    parser_pos += c.length - 1;
	                    c = c.replace(acorn.allLineBreaks, '\n');
	                    return [c, 'TK_STRING'];
	                }
	            }

	            if (c === '<' && input.substring(parser_pos - 1, parser_pos + 3) === '<!--') {
	                parser_pos += 3;
	                c = '<!--';
	                while (!acorn.newline.test(input.charAt(parser_pos)) && parser_pos < input_length) {
	                    c += input.charAt(parser_pos);
	                    parser_pos++;
	                }
	                in_html_comment = true;
	                return [c, 'TK_COMMENT'];
	            }

	            if (c === '-' && in_html_comment && input.substring(parser_pos - 1, parser_pos + 2) === '-->') {
	                in_html_comment = false;
	                parser_pos += 2;
	                return ['-->', 'TK_COMMENT'];
	            }

	            if (c === '.') {
	                return [c, 'TK_DOT'];
	            }

	            if (in_array(c, punct)) {
	                while (parser_pos < input_length && in_array(c + input.charAt(parser_pos), punct)) {
	                    c += input.charAt(parser_pos);
	                    parser_pos += 1;
	                    if (parser_pos >= input_length) {
	                        break;
	                    }
	                }

	                if (c === ',') {
	                    return [c, 'TK_COMMA'];
	                } else if (c === '=') {
	                    return [c, 'TK_EQUALS'];
	                } else {
	                    return [c, 'TK_OPERATOR'];
	                }
	            }

	            return [c, 'TK_UNKNOWN'];
	        }


	        function unescape_string(s) {
	            var esc = false,
	                out = '',
	                pos = 0,
	                s_hex = '',
	                escaped = 0,
	                c;

	            while (esc || pos < s.length) {

	                c = s.charAt(pos);
	                pos++;

	                if (esc) {
	                    esc = false;
	                    if (c === 'x') {
	                        // simple hex-escape \x24
	                        s_hex = s.substr(pos, 2);
	                        pos += 2;
	                    } else if (c === 'u') {
	                        // unicode-escape, \u2134
	                        s_hex = s.substr(pos, 4);
	                        pos += 4;
	                    } else {
	                        // some common escape, e.g \n
	                        out += '\\' + c;
	                        continue;
	                    }
	                    if (!s_hex.match(/^[0123456789abcdefABCDEF]+$/)) {
	                        // some weird escaping, bail out,
	                        // leaving whole string intact
	                        return s;
	                    }

	                    escaped = parseInt(s_hex, 16);

	                    if (escaped >= 0x00 && escaped < 0x20) {
	                        // leave 0x00...0x1f escaped
	                        if (c === 'x') {
	                            out += '\\x' + s_hex;
	                        } else {
	                            out += '\\u' + s_hex;
	                        }
	                        continue;
	                    } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
	                        // single-quote, apostrophe, backslash - escape these
	                        out += '\\' + String.fromCharCode(escaped);
	                    } else if (c === 'x' && escaped > 0x7e && escaped <= 0xff) {
	                        // we bail out on \x7f..\xff,
	                        // leaving whole string escaped,
	                        // as it's probably completely binary
	                        return s;
	                    } else {
	                        out += String.fromCharCode(escaped);
	                    }
	                } else if (c === '\\') {
	                    esc = true;
	                } else {
	                    out += c;
	                }
	            }
	            return out;
	        }

	    }


	    if (true) {
	        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return { js_beautify: js_beautify };
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        // Add support for CommonJS. Just put this file somewhere on your require.paths
	        // and you will be able to `var js_beautify = require("beautify").js_beautify`.
	        exports.js_beautify = js_beautify;
	    } else if (typeof window !== "undefined") {
	        // If we're running a web page and don't have either of the above, add our one global
	        window.js_beautify = js_beautify;
	    } else if (typeof global !== "undefined") {
	        // If we don't even have window, try global.
	        global.js_beautify = js_beautify;
	    }

	}());


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
	/*

	  The MIT License (MIT)

	  Copyright (c) 2007-2013 Einar Lielmanis and contributors.

	  Permission is hereby granted, free of charge, to any person
	  obtaining a copy of this software and associated documentation files
	  (the "Software"), to deal in the Software without restriction,
	  including without limitation the rights to use, copy, modify, merge,
	  publish, distribute, sublicense, and/or sell copies of the Software,
	  and to permit persons to whom the Software is furnished to do so,
	  subject to the following conditions:

	  The above copyright notice and this permission notice shall be
	  included in all copies or substantial portions of the Software.

	  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
	  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	  SOFTWARE.


	 CSS Beautifier
	---------------

	    Written by Harutyun Amirjanyan, (amirjanyan@gmail.com)

	    Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
	        http://jsbeautifier.org/

	    Usage:
	        css_beautify(source_text);
	        css_beautify(source_text, options);

	    The options are (default in brackets):
	        indent_size (4)                   — indentation size,
	        indent_char (space)               — character to indent with,
	        selector_separator_newline (true) - separate selectors with newline or
	                                            not (e.g. "a,\nbr" or "a, br")
	        end_with_newline (false)          - end with a newline
	        newline_between_rules (true)      - add a new line after every css rule

	    e.g

	    css_beautify(css_source_text, {
	      'indent_size': 1,
	      'indent_char': '\t',
	      'selector_separator': ' ',
	      'end_with_newline': false,
	      'newline_between_rules': true
	    });
	*/

	// http://www.w3.org/TR/CSS21/syndata.html#tokenization
	// http://www.w3.org/TR/css3-syntax/

	(function() {
	    function css_beautify(source_text, options) {
	        options = options || {};
	        source_text = source_text || '';
	        // HACK: newline parsing inconsistent. This brute force normalizes the input.
	        source_text = source_text.replace(/\r\n|[\r\u2028\u2029]/g, '\n')

	        var indentSize = options.indent_size || 4;
	        var indentCharacter = options.indent_char || ' ';
	        var selectorSeparatorNewline = (options.selector_separator_newline === undefined) ? true : options.selector_separator_newline;
	        var end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
	        var newline_between_rules = (options.newline_between_rules === undefined) ? true : options.newline_between_rules;
	        var eol = options.eol ? options.eol : '\n';

	        // compatibility
	        if (typeof indentSize === "string") {
	            indentSize = parseInt(indentSize, 10);
	        }

	        if(options.indent_with_tabs){
	            indentCharacter = '\t';
	            indentSize = 1;
	        }

	        eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n')


	        // tokenizer
	        var whiteRe = /^\s+$/;
	        var wordRe = /[\w$\-_]/;

	        var pos = -1,
	            ch;
	        var parenLevel = 0;

	        function next() {
	            ch = source_text.charAt(++pos);
	            return ch || '';
	        }

	        function peek(skipWhitespace) {
	            var result = '';
	            var prev_pos = pos;
	            if (skipWhitespace) {
	                eatWhitespace();
	            }
	            result = source_text.charAt(pos + 1) || '';
	            pos = prev_pos - 1;
	            next();
	            return result;
	        }

	        function eatString(endChars) {
	            var start = pos;
	            while (next()) {
	                if (ch === "\\") {
	                    next();
	                } else if (endChars.indexOf(ch) !== -1) {
	                    break;
	                } else if (ch === "\n") {
	                    break;
	                }
	            }
	            return source_text.substring(start, pos + 1);
	        }

	        function peekString(endChar) {
	            var prev_pos = pos;
	            var str = eatString(endChar);
	            pos = prev_pos - 1;
	            next();
	            return str;
	        }

	        function eatWhitespace() {
	            var result = '';
	            while (whiteRe.test(peek())) {
	                next();
	                result += ch;
	            }
	            return result;
	        }

	        function skipWhitespace() {
	            var result = '';
	            if (ch && whiteRe.test(ch)) {
	                result = ch;
	            }
	            while (whiteRe.test(next())) {
	                result += ch;
	            }
	            return result;
	        }

	        function eatComment(singleLine) {
	            var start = pos;
	            singleLine = peek() === "/";
	            next();
	            while (next()) {
	                if (!singleLine && ch === "*" && peek() === "/") {
	                    next();
	                    break;
	                } else if (singleLine && ch === "\n") {
	                    return source_text.substring(start, pos);
	                }
	            }

	            return source_text.substring(start, pos) + ch;
	        }


	        function lookBack(str) {
	            return source_text.substring(pos - str.length, pos).toLowerCase() ===
	                str;
	        }

	        // Nested pseudo-class if we are insideRule
	        // and the next special character found opens
	        // a new block
	        function foundNestedPseudoClass() {
	            var openParen = 0;
	            for (var i = pos + 1; i < source_text.length; i++) {
	                var ch = source_text.charAt(i);
	                if (ch === "{") {
	                    return true;
	                } else if (ch === '(') {
	                    // pseudoclasses can contain ()
	                    openParen += 1;
	                } else if (ch === ')') {
	                    if (openParen == 0) {
	                        return false;
	                    }
	                    openParen -= 1;
	                } else if (ch === ";" || ch === "}") {
	                    return false;
	                }
	            }
	            return false;
	        }

	        // printer
	        var basebaseIndentString = source_text.match(/^[\t ]*/)[0];
	        var singleIndent = new Array(indentSize + 1).join(indentCharacter);
	        var indentLevel = 0;
	        var nestedLevel = 0;

	        function indent() {
	            indentLevel++;
	            basebaseIndentString += singleIndent;
	        }

	        function outdent() {
	            indentLevel--;
	            basebaseIndentString = basebaseIndentString.slice(0, -indentSize);
	        }

	        var print = {};
	        print["{"] = function(ch) {
	            print.singleSpace();
	            output.push(ch);
	            print.newLine();
	        };
	        print["}"] = function(ch) {
	            print.newLine();
	            output.push(ch);
	            print.newLine();
	        };

	        print._lastCharWhitespace = function() {
	            return whiteRe.test(output[output.length - 1]);
	        };

	        print.newLine = function(keepWhitespace) {
	            if (output.length) {
	                if (!keepWhitespace && output[output.length - 1] !== '\n') {
	                    print.trim();
	                }

	                output.push('\n');

	                if (basebaseIndentString) {
	                    output.push(basebaseIndentString);
	                }
	            }
	        };
	        print.singleSpace = function() {
	            if (output.length && !print._lastCharWhitespace()) {
	                output.push(' ');
	            }
	        };

	        print.preserveSingleSpace = function() {
	            if (isAfterSpace) {
	                print.singleSpace();
	            }
	        };

	        print.trim = function() {
	            while (print._lastCharWhitespace()) {
	                output.pop();
	            }
	        };


	        var output = [];
	        /*_____________________--------------------_____________________*/

	        var insideRule = false;
	        var insidePropertyValue = false;
	        var enteringConditionalGroup = false;
	        var top_ch = '';
	        var last_top_ch = '';

	        while (true) {
	            var whitespace = skipWhitespace();
	            var isAfterSpace = whitespace !== '';
	            var isAfterNewline = whitespace.indexOf('\n') !== -1;
	            last_top_ch = top_ch;
	            top_ch = ch;

	            if (!ch) {
	                break;
	            } else if (ch === '/' && peek() === '*') { /* css comment */
	                var header = indentLevel === 0;

	                if (isAfterNewline || header) {
	                    print.newLine();
	                }

	                output.push(eatComment());
	                print.newLine();
	                if (header) {
	                    print.newLine(true);
	                }
	            } else if (ch === '/' && peek() === '/') { // single line comment
	                if (!isAfterNewline && last_top_ch !== '{' ) {
	                    print.trim();
	                }
	                print.singleSpace();
	                output.push(eatComment());
	                print.newLine();
	            } else if (ch === '@') {
	                print.preserveSingleSpace();
	                output.push(ch);

	                // strip trailing space, if present, for hash property checks
	                var variableOrRule = peekString(": ,;{}()[]/='\"");

	                if (variableOrRule.match(/[ :]$/)) {
	                    // we have a variable or pseudo-class, add it and insert one space before continuing
	                    next();
	                    variableOrRule = eatString(": ").replace(/\s$/, '');
	                    output.push(variableOrRule);
	                    print.singleSpace();
	                }

	                variableOrRule = variableOrRule.replace(/\s$/, '')

	                // might be a nesting at-rule
	                if (variableOrRule in css_beautify.NESTED_AT_RULE) {
	                    nestedLevel += 1;
	                    if (variableOrRule in css_beautify.CONDITIONAL_GROUP_RULE) {
	                        enteringConditionalGroup = true;
	                    }
	                }
	            } else if (ch === '#' && peek() === '{') {
	              print.preserveSingleSpace();
	              output.push(eatString('}'));
	            } else if (ch === '{') {
	                if (peek(true) === '}') {
	                    eatWhitespace();
	                    next();
	                    print.singleSpace();
	                    output.push("{}");
	                    print.newLine();
	                    if (newline_between_rules && indentLevel === 0) {
	                        print.newLine(true);
	                    }
	                } else {
	                    indent();
	                    print["{"](ch);
	                    // when entering conditional groups, only rulesets are allowed
	                    if (enteringConditionalGroup) {
	                        enteringConditionalGroup = false;
	                        insideRule = (indentLevel > nestedLevel);
	                    } else {
	                        // otherwise, declarations are also allowed
	                        insideRule = (indentLevel >= nestedLevel);
	                    }
	                }
	            } else if (ch === '}') {
	                outdent();
	                print["}"](ch);
	                insideRule = false;
	                insidePropertyValue = false;
	                if (nestedLevel) {
	                    nestedLevel--;
	                }
	                if (newline_between_rules && indentLevel === 0) {
	                    print.newLine(true);
	                }
	            } else if (ch === ":") {
	                eatWhitespace();
	                if ((insideRule || enteringConditionalGroup) &&
	                    !(lookBack("&") || foundNestedPseudoClass())) {
	                    // 'property: value' delimiter
	                    // which could be in a conditional group query
	                    insidePropertyValue = true;
	                    output.push(':');
	                    print.singleSpace();
	                } else {
	                    // sass/less parent reference don't use a space
	                    // sass nested pseudo-class don't use a space
	                    if (peek() === ":") {
	                        // pseudo-element
	                        next();
	                        output.push("::");
	                    } else {
	                        // pseudo-class
	                        output.push(':');
	                    }
	                }
	            } else if (ch === '"' || ch === '\'') {
	                print.preserveSingleSpace();
	                output.push(eatString(ch));
	            } else if (ch === ';') {
	                insidePropertyValue = false;
	                output.push(ch);
	                print.newLine();
	            } else if (ch === '(') { // may be a url
	                if (lookBack("url")) {
	                    output.push(ch);
	                    eatWhitespace();
	                    if (next()) {
	                        if (ch !== ')' && ch !== '"' && ch !== '\'') {
	                            output.push(eatString(')'));
	                        } else {
	                            pos--;
	                        }
	                    }
	                } else {
	                    parenLevel++;
	                    print.preserveSingleSpace();
	                    output.push(ch);
	                    eatWhitespace();
	                }
	            } else if (ch === ')') {
	                output.push(ch);
	                parenLevel--;
	            } else if (ch === ',') {
	                output.push(ch);
	                eatWhitespace();
	                if (selectorSeparatorNewline && !insidePropertyValue && parenLevel < 1) {
	                    print.newLine();
	                } else {
	                    print.singleSpace();
	                }
	            } else if (ch === ']') {
	                output.push(ch);
	            } else if (ch === '[') {
	                print.preserveSingleSpace();
	                output.push(ch);
	            } else if (ch === '=') { // no whitespace before or after
	                eatWhitespace()
	                ch = '=';
	                output.push(ch);
	            } else {
	                print.preserveSingleSpace();
	                output.push(ch);
	            }
	        }


	        var sweetCode = '';
	        if (basebaseIndentString) {
	            sweetCode += basebaseIndentString;
	        }

	        sweetCode += output.join('').replace(/[\r\n\t ]+$/, '');

	        // establish end_with_newline
	        if (end_with_newline) {
	            sweetCode += '\n';
	        }

	        if (eol != '\n') {
	            sweetCode = sweetCode.replace(/[\n]/g, eol);
	        }

	        return sweetCode;
	    }

	    // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
	    css_beautify.NESTED_AT_RULE = {
	        "@page": true,
	        "@font-face": true,
	        "@keyframes": true,
	        // also in CONDITIONAL_GROUP_RULE below
	        "@media": true,
	        "@supports": true,
	        "@document": true
	    };
	    css_beautify.CONDITIONAL_GROUP_RULE = {
	        "@media": true,
	        "@supports": true,
	        "@document": true
	    };

	    /*global define */
	    if (true) {
	        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return {
	                css_beautify: css_beautify
	            };
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        // Add support for CommonJS. Just put this file somewhere on your require.paths
	        // and you will be able to `var html_beautify = require("beautify").html_beautify`.
	        exports.css_beautify = css_beautify;
	    } else if (typeof window !== "undefined") {
	        // If we're running a web page and don't have either of the above, add our one global
	        window.css_beautify = css_beautify;
	    } else if (typeof global !== "undefined") {
	        // If we don't even have window, try global.
	        global.css_beautify = css_beautify;
	    }

	}());


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
	/*

	  The MIT License (MIT)

	  Copyright (c) 2007-2013 Einar Lielmanis and contributors.

	  Permission is hereby granted, free of charge, to any person
	  obtaining a copy of this software and associated documentation files
	  (the "Software"), to deal in the Software without restriction,
	  including without limitation the rights to use, copy, modify, merge,
	  publish, distribute, sublicense, and/or sell copies of the Software,
	  and to permit persons to whom the Software is furnished to do so,
	  subject to the following conditions:

	  The above copyright notice and this permission notice shall be
	  included in all copies or substantial portions of the Software.

	  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
	  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	  SOFTWARE.


	 Style HTML
	---------------

	  Written by Nochum Sossonko, (nsossonko@hotmail.com)

	  Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
	    http://jsbeautifier.org/

	  Usage:
	    style_html(html_source);

	    style_html(html_source, options);

	  The options are:
	    indent_inner_html (default false)  — indent <head> and <body> sections,
	    indent_size (default 4)          — indentation size,
	    indent_char (default space)      — character to indent with,
	    wrap_line_length (default 250)            -  maximum amount of characters per line (0 = disable)
	    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none"
	            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
	    unformatted (defaults to inline tags) - list of tags, that shouldn't be reformatted
	    indent_scripts (default normal)  - "keep"|"separate"|"normal"
	    preserve_newlines (default true) - whether existing line breaks before elements should be preserved
	                                        Only works before elements, not inside tags or for text.
	    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk
	    indent_handlebars (default false) - format and indent {{#foo}} and {{/foo}}
	    end_with_newline (false)          - end with a newline
	    extra_liners (default [head,body,/html]) -List of tags that should have an extra newline before them.

	    e.g.

	    style_html(html_source, {
	      'indent_inner_html': false,
	      'indent_size': 2,
	      'indent_char': ' ',
	      'wrap_line_length': 78,
	      'brace_style': 'expand',
	      'preserve_newlines': true,
	      'max_preserve_newlines': 5,
	      'indent_handlebars': false,
	      'extra_liners': ['/html']
	    });
	*/

	(function() {

	    function trim(s) {
	        return s.replace(/^\s+|\s+$/g, '');
	    }

	    function ltrim(s) {
	        return s.replace(/^\s+/g, '');
	    }

	    function rtrim(s) {
	        return s.replace(/\s+$/g,'');
	    }

	    function style_html(html_source, options, js_beautify, css_beautify) {
	        //Wrapper function to invoke all the necessary constructors and deal with the output.

	        var multi_parser,
	            indent_inner_html,
	            indent_size,
	            indent_character,
	            wrap_line_length,
	            brace_style,
	            unformatted,
	            preserve_newlines,
	            max_preserve_newlines,
	            indent_handlebars,
	            wrap_attributes,
	            wrap_attributes_indent_size,
	            end_with_newline,
	            extra_liners,
	            eol;

	        options = options || {};

	        // backwards compatibility to 1.3.4
	        if ((options.wrap_line_length === undefined || parseInt(options.wrap_line_length, 10) === 0) &&
	                (options.max_char !== undefined && parseInt(options.max_char, 10) !== 0)) {
	            options.wrap_line_length = options.max_char;
	        }

	        indent_inner_html = (options.indent_inner_html === undefined) ? false : options.indent_inner_html;
	        indent_size = (options.indent_size === undefined) ? 4 : parseInt(options.indent_size, 10);
	        indent_character = (options.indent_char === undefined) ? ' ' : options.indent_char;
	        brace_style = (options.brace_style === undefined) ? 'collapse' : options.brace_style;
	        wrap_line_length =  parseInt(options.wrap_line_length, 10) === 0 ? 32786 : parseInt(options.wrap_line_length || 250, 10);
	        unformatted = options.unformatted || [
	            // https://www.w3.org/TR/html5/dom.html#phrasing-content
	            'a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite',
	            'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img',
	            'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript',
	            'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', /* 'script', */ 'select', 'small',
	            'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var',
	            'video', 'wbr', 'text',
	            // prexisting - not sure of full effect of removing, leaving in
	            'acronym', 'address', 'big', 'dt', 'ins', 'small', 'strike', 'tt',
	            'pre',
	            'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
	        ];
	        preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
	        max_preserve_newlines = preserve_newlines ?
	            (isNaN(parseInt(options.max_preserve_newlines, 10)) ? 32786 : parseInt(options.max_preserve_newlines, 10))
	            : 0;
	        indent_handlebars = (options.indent_handlebars === undefined) ? false : options.indent_handlebars;
	        wrap_attributes = (options.wrap_attributes === undefined) ? 'auto' : options.wrap_attributes;
	        wrap_attributes_indent_size = (isNaN(parseInt(options.wrap_attributes_indent_size, 10))) ? indent_size : parseInt(options.wrap_attributes_indent_size, 10);
	        end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
	        extra_liners = (typeof options.extra_liners == 'object') && options.extra_liners ?
	            options.extra_liners.concat() : (typeof options.extra_liners === 'string') ?
	            options.extra_liners.split(',') : 'head,body,/html'.split(',');
	        eol = options.eol ? options.eol : '\n';

	        if(options.indent_with_tabs){
	            indent_character = '\t';
	            indent_size = 1;
	        }

	        eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n')

	        function Parser() {

	            this.pos = 0; //Parser position
	            this.token = '';
	            this.current_mode = 'CONTENT'; //reflects the current Parser mode: TAG/CONTENT
	            this.tags = { //An object to hold tags, their position, and their parent-tags, initiated with default values
	                parent: 'parent1',
	                parentcount: 1,
	                parent1: ''
	            };
	            this.tag_type = '';
	            this.token_text = this.last_token = this.last_text = this.token_type = '';
	            this.newlines = 0;
	            this.indent_content = indent_inner_html;

	            this.Utils = { //Uilities made available to the various functions
	                whitespace: "\n\r\t ".split(''),

	                single_token: [
	                    // HTLM void elements - aka self-closing tags - aka singletons
	                    // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
	                    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen',
	                    'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr',
	                    // NOTE: Optional tags - are not understood.
	                    // https://www.w3.org/TR/html5/syntax.html#optional-tags
	                    // The rules for optional tags are too complex for a simple list
	                    // Also, the content of these tags should still be indented in many cases.
	                    // 'li' is a good exmple.

	                    // Doctype and xml elements
	                    '!doctype', '?xml',
	                    // ?php tag
	                    '?php',
	                    // other tags that were in this list, keeping just in case
	                    'basefont', 'isindex'
	                ],
	                extra_liners: extra_liners, //for tags that need a line of whitespace before them
	                in_array: function(what, arr) {
	                    for (var i = 0; i < arr.length; i++) {
	                        if (what === arr[i]) {
	                            return true;
	                        }
	                    }
	                    return false;
	                }
	            };

	            // Return true if the given text is composed entirely of whitespace.
	            this.is_whitespace = function(text) {
	                for (var n = 0; n < text.length; n++) {
	                    if (!this.Utils.in_array(text.charAt(n), this.Utils.whitespace)) {
	                        return false;
	                    }
	                }
	                return true;
	            };

	            this.traverse_whitespace = function() {
	                var input_char = '';

	                input_char = this.input.charAt(this.pos);
	                if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
	                    this.newlines = 0;
	                    while (this.Utils.in_array(input_char, this.Utils.whitespace)) {
	                        if (preserve_newlines && input_char === '\n' && this.newlines <= max_preserve_newlines) {
	                            this.newlines += 1;
	                        }

	                        this.pos++;
	                        input_char = this.input.charAt(this.pos);
	                    }
	                    return true;
	                }
	                return false;
	            };

	            // Append a space to the given content (string array) or, if we are
	            // at the wrap_line_length, append a newline/indentation.
	            // return true if a newline was added, false if a space was added
	            this.space_or_wrap = function(content) {
	                if (this.line_char_count >= this.wrap_line_length) { //insert a line when the wrap_line_length is reached
	                    this.print_newline(false, content);
	                    this.print_indentation(content);
	                    return true;
	                } else {
	                    this.line_char_count++;
	                    content.push(' ');
	                    return false;
	                }
	            };

	            this.get_content = function() { //function to capture regular content between tags
	                var input_char = '',
	                    content = [],
	                    space = false; //if a space is needed

	                while (this.input.charAt(this.pos) !== '<') {
	                    if (this.pos >= this.input.length) {
	                        return content.length ? content.join('') : ['', 'TK_EOF'];
	                    }

	                    if (this.traverse_whitespace()) {
	                        this.space_or_wrap(content);
	                        continue;
	                    }

	                    if (indent_handlebars) {
	                        // Handlebars parsing is complicated.
	                        // {{#foo}} and {{/foo}} are formatted tags.
	                        // {{something}} should get treated as content, except:
	                        // {{else}} specifically behaves like {{#if}} and {{/if}}
	                        var peek3 = this.input.substr(this.pos, 3);
	                        if (peek3 === '{{#' || peek3 === '{{/') {
	                            // These are tags and not content.
	                            break;
	                        } else if (peek3 === '{{!') {
	                            return [this.get_tag(), 'TK_TAG_HANDLEBARS_COMMENT'];
	                        } else if (this.input.substr(this.pos, 2) === '{{') {
	                            if (this.get_tag(true) === '{{else}}') {
	                                break;
	                            }
	                        }
	                    }

	                    input_char = this.input.charAt(this.pos);
	                    this.pos++;
	                    this.line_char_count++;
	                    content.push(input_char); //letter at-a-time (or string) inserted to an array
	                }
	                return content.length ? content.join('') : '';
	            };

	            this.get_contents_to = function(name) { //get the full content of a script or style to pass to js_beautify
	                if (this.pos === this.input.length) {
	                    return ['', 'TK_EOF'];
	                }
	                var input_char = '';
	                var content = '';
	                var reg_match = new RegExp('</' + name + '\\s*>', 'igm');
	                reg_match.lastIndex = this.pos;
	                var reg_array = reg_match.exec(this.input);
	                var end_script = reg_array ? reg_array.index : this.input.length; //absolute end of script
	                if (this.pos < end_script) { //get everything in between the script tags
	                    content = this.input.substring(this.pos, end_script);
	                    this.pos = end_script;
	                }
	                return content;
	            };

	            this.record_tag = function(tag) { //function to record a tag and its parent in this.tags Object
	                if (this.tags[tag + 'count']) { //check for the existence of this tag type
	                    this.tags[tag + 'count']++;
	                    this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
	                } else { //otherwise initialize this tag type
	                    this.tags[tag + 'count'] = 1;
	                    this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
	                }
	                this.tags[tag + this.tags[tag + 'count'] + 'parent'] = this.tags.parent; //set the parent (i.e. in the case of a div this.tags.div1parent)
	                this.tags.parent = tag + this.tags[tag + 'count']; //and make this the current parent (i.e. in the case of a div 'div1')
	            };

	            this.retrieve_tag = function(tag) { //function to retrieve the opening tag to the corresponding closer
	                if (this.tags[tag + 'count']) { //if the openener is not in the Object we ignore it
	                    var temp_parent = this.tags.parent; //check to see if it's a closable tag.
	                    while (temp_parent) { //till we reach '' (the initial value);
	                        if (tag + this.tags[tag + 'count'] === temp_parent) { //if this is it use it
	                            break;
	                        }
	                        temp_parent = this.tags[temp_parent + 'parent']; //otherwise keep on climbing up the DOM Tree
	                    }
	                    if (temp_parent) { //if we caught something
	                        this.indent_level = this.tags[tag + this.tags[tag + 'count']]; //set the indent_level accordingly
	                        this.tags.parent = this.tags[temp_parent + 'parent']; //and set the current parent
	                    }
	                    delete this.tags[tag + this.tags[tag + 'count'] + 'parent']; //delete the closed tags parent reference...
	                    delete this.tags[tag + this.tags[tag + 'count']]; //...and the tag itself
	                    if (this.tags[tag + 'count'] === 1) {
	                        delete this.tags[tag + 'count'];
	                    } else {
	                        this.tags[tag + 'count']--;
	                    }
	                }
	            };

	            this.indent_to_tag = function(tag) {
	                // Match the indentation level to the last use of this tag, but don't remove it.
	                if (!this.tags[tag + 'count']) {
	                    return;
	                }
	                var temp_parent = this.tags.parent;
	                while (temp_parent) {
	                    if (tag + this.tags[tag + 'count'] === temp_parent) {
	                        break;
	                    }
	                    temp_parent = this.tags[temp_parent + 'parent'];
	                }
	                if (temp_parent) {
	                    this.indent_level = this.tags[tag + this.tags[tag + 'count']];
	                }
	            };

	            this.get_tag = function(peek) { //function to get a full tag and parse its type
	                var input_char = '',
	                    content = [],
	                    comment = '',
	                    space = false,
	                    first_attr = true,
	                    tag_start, tag_end,
	                    tag_start_char,
	                    orig_pos = this.pos,
	                    orig_line_char_count = this.line_char_count;

	                peek = peek !== undefined ? peek : false;

	                do {
	                    if (this.pos >= this.input.length) {
	                        if (peek) {
	                            this.pos = orig_pos;
	                            this.line_char_count = orig_line_char_count;
	                        }
	                        return content.length ? content.join('') : ['', 'TK_EOF'];
	                    }

	                    input_char = this.input.charAt(this.pos);
	                    this.pos++;

	                    if (this.Utils.in_array(input_char, this.Utils.whitespace)) { //don't want to insert unnecessary space
	                        space = true;
	                        continue;
	                    }

	                    if (input_char === "'" || input_char === '"') {
	                        input_char += this.get_unformatted(input_char);
	                        space = true;

	                    }

	                    if (input_char === '=') { //no space before =
	                        space = false;
	                    }

	                    if (content.length && content[content.length - 1] !== '=' && input_char !== '>' && space) {
	                        //no space after = or before >
	                        var wrapped = this.space_or_wrap(content);
	                        var indentAttrs = wrapped && input_char !== '/' && wrap_attributes !== 'force';
	                        space = false;
	                        if (!first_attr && wrap_attributes === 'force' &&  input_char !== '/') {
	                            this.print_newline(false, content);
	                            this.print_indentation(content);
	                            indentAttrs = true;
	                        }
	                        if (indentAttrs) {
	                            //indent attributes an auto or forced line-wrap
	                            for (var count = 0; count < wrap_attributes_indent_size; count++) {
	                                content.push(indent_character);
	                            }
	                        }
	                        for (var i = 0; i < content.length; i++) {
	                          if (content[i] === ' ') {
	                            first_attr = false;
	                            break;
	                          }
	                        }
	                    }

	                    if (indent_handlebars && tag_start_char === '<') {
	                        // When inside an angle-bracket tag, put spaces around
	                        // handlebars not inside of strings.
	                        if ((input_char + this.input.charAt(this.pos)) === '{{') {
	                            input_char += this.get_unformatted('}}');
	                            if (content.length && content[content.length - 1] !== ' ' && content[content.length - 1] !== '<') {
	                                input_char = ' ' + input_char;
	                            }
	                            space = true;
	                        }
	                    }

	                    if (input_char === '<' && !tag_start_char) {
	                        tag_start = this.pos - 1;
	                        tag_start_char = '<';
	                    }

	                    if (indent_handlebars && !tag_start_char) {
	                        if (content.length >= 2 && content[content.length - 1] === '{' && content[content.length - 2] === '{') {
	                            if (input_char === '#' || input_char === '/' || input_char === '!') {
	                                tag_start = this.pos - 3;
	                            } else {
	                                tag_start = this.pos - 2;
	                            }
	                            tag_start_char = '{';
	                        }
	                    }

	                    this.line_char_count++;
	                    content.push(input_char); //inserts character at-a-time (or string)

	                    if (content[1] && (content[1] === '!' || content[1] === '?' || content[1] === '%')) { //if we're in a comment, do something special
	                        // We treat all comments as literals, even more than preformatted tags
	                        // we just look for the appropriate close tag
	                        content = [this.get_comment(tag_start)];
	                        break;
	                    }

	                    if (indent_handlebars && content[1] && content[1] === '{' && content[2] && content[2] === '!') { //if we're in a comment, do something special
	                        // We treat all comments as literals, even more than preformatted tags
	                        // we just look for the appropriate close tag
	                        content = [this.get_comment(tag_start)];
	                        break;
	                    }

	                    if (indent_handlebars && tag_start_char === '{' && content.length > 2 && content[content.length - 2] === '}' && content[content.length - 1] === '}') {
	                        break;
	                    }
	                } while (input_char !== '>');

	                var tag_complete = content.join('');
	                var tag_index;
	                var tag_offset;

	                if (tag_complete.indexOf(' ') !== -1) { //if there's whitespace, thats where the tag name ends
	                    tag_index = tag_complete.indexOf(' ');
	                } else if (tag_complete.charAt(0) === '{') {
	                    tag_index = tag_complete.indexOf('}');
	                } else { //otherwise go with the tag ending
	                    tag_index = tag_complete.indexOf('>');
	                }
	                if (tag_complete.charAt(0) === '<' || !indent_handlebars) {
	                    tag_offset = 1;
	                } else {
	                    tag_offset = tag_complete.charAt(2) === '#' ? 3 : 2;
	                }
	                var tag_check = tag_complete.substring(tag_offset, tag_index).toLowerCase();
	                if (tag_complete.charAt(tag_complete.length - 2) === '/' ||
	                    this.Utils.in_array(tag_check, this.Utils.single_token)) { //if this tag name is a single tag type (either in the list or has a closing /)
	                    if (!peek) {
	                        this.tag_type = 'SINGLE';
	                    }
	                } else if (indent_handlebars && tag_complete.charAt(0) === '{' && tag_check === 'else') {
	                    if (!peek) {
	                        this.indent_to_tag('if');
	                        this.tag_type = 'HANDLEBARS_ELSE';
	                        this.indent_content = true;
	                        this.traverse_whitespace();
	                    }
	                } else if (this.is_unformatted(tag_check, unformatted)) { // do not reformat the "unformatted" tags
	                    comment = this.get_unformatted('</' + tag_check + '>', tag_complete); //...delegate to get_unformatted function
	                    content.push(comment);
	                    tag_end = this.pos - 1;
	                    this.tag_type = 'SINGLE';
	                } else if (tag_check === 'script' &&
	                    (tag_complete.search('type') === -1 ||
	                    (tag_complete.search('type') > -1 &&
	                    tag_complete.search(/\b(text|application)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json)/) > -1))) {
	                    if (!peek) {
	                        this.record_tag(tag_check);
	                        this.tag_type = 'SCRIPT';
	                    }
	                } else if (tag_check === 'style' &&
	                    (tag_complete.search('type') === -1 ||
	                    (tag_complete.search('type') > -1 && tag_complete.search('text/css') > -1))) {
	                    if (!peek) {
	                        this.record_tag(tag_check);
	                        this.tag_type = 'STYLE';
	                    }
	                } else if (tag_check.charAt(0) === '!') { //peek for <! comment
	                    // for comments content is already correct.
	                    if (!peek) {
	                        this.tag_type = 'SINGLE';
	                        this.traverse_whitespace();
	                    }
	                } else if (!peek) {
	                    if (tag_check.charAt(0) === '/') { //this tag is a double tag so check for tag-ending
	                        this.retrieve_tag(tag_check.substring(1)); //remove it and all ancestors
	                        this.tag_type = 'END';
	                    } else { //otherwise it's a start-tag
	                        this.record_tag(tag_check); //push it on the tag stack
	                        if (tag_check.toLowerCase() !== 'html') {
	                            this.indent_content = true;
	                        }
	                        this.tag_type = 'START';
	                    }

	                    // Allow preserving of newlines after a start or end tag
	                    if (this.traverse_whitespace()) {
	                        this.space_or_wrap(content);
	                    }

	                    if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) { //check if this double needs an extra line
	                        this.print_newline(false, this.output);
	                        if (this.output.length && this.output[this.output.length - 2] !== '\n') {
	                            this.print_newline(true, this.output);
	                        }
	                    }
	                }

	                if (peek) {
	                    this.pos = orig_pos;
	                    this.line_char_count = orig_line_char_count;
	                }

	                return content.join(''); //returns fully formatted tag
	            };

	            this.get_comment = function(start_pos) { //function to return comment content in its entirety
	                // this is will have very poor perf, but will work for now.
	                var comment = '',
	                    delimiter = '>',
	                    matched = false;

	                this.pos = start_pos;
	                var input_char = this.input.charAt(this.pos);
	                this.pos++;

	                while (this.pos <= this.input.length) {
	                    comment += input_char;

	                    // only need to check for the delimiter if the last chars match
	                    if (comment.charAt(comment.length - 1) === delimiter.charAt(delimiter.length - 1) &&
	                        comment.indexOf(delimiter) !== -1) {
	                        break;
	                    }

	                    // only need to search for custom delimiter for the first few characters
	                    if (!matched && comment.length < 10) {
	                        if (comment.indexOf('<![if') === 0) { //peek for <![if conditional comment
	                            delimiter = '<![endif]>';
	                            matched = true;
	                        } else if (comment.indexOf('<![cdata[') === 0) { //if it's a <[cdata[ comment...
	                            delimiter = ']]>';
	                            matched = true;
	                        } else if (comment.indexOf('<![') === 0) { // some other ![ comment? ...
	                            delimiter = ']>';
	                            matched = true;
	                        } else if (comment.indexOf('<!--') === 0) { // <!-- comment ...
	                            delimiter = '-->';
	                            matched = true;
	                        } else if (comment.indexOf('{{!') === 0) { // {{! handlebars comment
	                            delimiter = '}}';
	                            matched = true;
	                        } else if (comment.indexOf('<?') === 0) { // {{! handlebars comment
	                            delimiter = '?>';
	                            matched = true;
	                        } else if (comment.indexOf('<%') === 0) { // {{! handlebars comment
	                            delimiter = '%>';
	                            matched = true;
	                        }
	                    }

	                    input_char = this.input.charAt(this.pos);
	                    this.pos++;
	                }

	                return comment;
	            };

	            function tokenMatcher(delimiter) {
	              var token = '';

	              var add = function (str) {
	                var newToken = token + str.toLowerCase();
	                token = newToken.length <= delimiter.length ? newToken : newToken.substr(newToken.length - delimiter.length, delimiter.length);
	              };

	              var doesNotMatch = function () {
	                return token.indexOf(delimiter) === -1;
	              };

	              return {
	                add: add,
	                doesNotMatch: doesNotMatch
	              };
	            }

	            this.get_unformatted = function(delimiter, orig_tag) { //function to return unformatted content in its entirety
	                if (orig_tag && orig_tag.toLowerCase().indexOf(delimiter) !== -1) {
	                    return '';
	                }
	                var input_char = '';
	                var content = '';
	                var space = true;

	                var delimiterMatcher = tokenMatcher(delimiter);

	                do {

	                    if (this.pos >= this.input.length) {
	                        return content;
	                    }

	                    input_char = this.input.charAt(this.pos);
	                    this.pos++;

	                    if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
	                        if (!space) {
	                            this.line_char_count--;
	                            continue;
	                        }
	                        if (input_char === '\n' || input_char === '\r') {
	                            content += '\n';
	                            /*  Don't change tab indention for unformatted blocks.  If using code for html editing, this will greatly affect <pre> tags if they are specified in the 'unformatted array'
	                for (var i=0; i<this.indent_level; i++) {
	                  content += this.indent_string;
	                }
	                space = false; //...and make sure other indentation is erased
	                */
	                            this.line_char_count = 0;
	                            continue;
	                        }
	                    }
	                    content += input_char;
	                    delimiterMatcher.add(input_char);
	                    this.line_char_count++;
	                    space = true;

	                    if (indent_handlebars && input_char === '{' && content.length && content.charAt(content.length - 2) === '{') {
	                        // Handlebars expressions in strings should also be unformatted.
	                        content += this.get_unformatted('}}');
	                        // Don't consider when stopping for delimiters.
	                    }
	                } while (delimiterMatcher.doesNotMatch());

	                return content;
	            };

	            this.get_token = function() { //initial handler for token-retrieval
	                var token;

	                if (this.last_token === 'TK_TAG_SCRIPT' || this.last_token === 'TK_TAG_STYLE') { //check if we need to format javascript
	                    var type = this.last_token.substr(7);
	                    token = this.get_contents_to(type);
	                    if (typeof token !== 'string') {
	                        return token;
	                    }
	                    return [token, 'TK_' + type];
	                }
	                if (this.current_mode === 'CONTENT') {
	                    token = this.get_content();
	                    if (typeof token !== 'string') {
	                        return token;
	                    } else {
	                        return [token, 'TK_CONTENT'];
	                    }
	                }

	                if (this.current_mode === 'TAG') {
	                    token = this.get_tag();
	                    if (typeof token !== 'string') {
	                        return token;
	                    } else {
	                        var tag_name_type = 'TK_TAG_' + this.tag_type;
	                        return [token, tag_name_type];
	                    }
	                }
	            };

	            this.get_full_indent = function(level) {
	                level = this.indent_level + level || 0;
	                if (level < 1) {
	                    return '';
	                }

	                return Array(level + 1).join(this.indent_string);
	            };

	            this.is_unformatted = function(tag_check, unformatted) {
	                //is this an HTML5 block-level link?
	                if (!this.Utils.in_array(tag_check, unformatted)) {
	                    return false;
	                }

	                if (tag_check.toLowerCase() !== 'a' || !this.Utils.in_array('a', unformatted)) {
	                    return true;
	                }

	                //at this point we have an  tag; is its first child something we want to remain
	                //unformatted?
	                var next_tag = this.get_tag(true /* peek. */ );

	                // test next_tag to see if it is just html tag (no external content)
	                var tag = (next_tag || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);

	                // if next_tag comes back but is not an isolated tag, then
	                // let's treat the 'a' tag as having content
	                // and respect the unformatted option
	                if (!tag || this.Utils.in_array(tag, unformatted)) {
	                    return true;
	                } else {
	                    return false;
	                }
	            };

	            this.printer = function(js_source, indent_character, indent_size, wrap_line_length, brace_style) { //handles input/output and some other printing functions

	                this.input = js_source || ''; //gets the input for the Parser

	                // HACK: newline parsing inconsistent. This brute force normalizes the input.
	                this.input = this.input.replace(/\r\n|[\r\u2028\u2029]/g, '\n')

	                this.output = [];
	                this.indent_character = indent_character;
	                this.indent_string = '';
	                this.indent_size = indent_size;
	                this.brace_style = brace_style;
	                this.indent_level = 0;
	                this.wrap_line_length = wrap_line_length;
	                this.line_char_count = 0; //count to see if wrap_line_length was exceeded

	                for (var i = 0; i < this.indent_size; i++) {
	                    this.indent_string += this.indent_character;
	                }

	                this.print_newline = function(force, arr) {
	                    this.line_char_count = 0;
	                    if (!arr || !arr.length) {
	                        return;
	                    }
	                    if (force || (arr[arr.length - 1] !== '\n')) { //we might want the extra line
	                        if ((arr[arr.length - 1] !== '\n')) {
	                            arr[arr.length - 1] = rtrim(arr[arr.length - 1]);
	                        }
	                        arr.push('\n');
	                    }
	                };

	                this.print_indentation = function(arr) {
	                    for (var i = 0; i < this.indent_level; i++) {
	                        arr.push(this.indent_string);
	                        this.line_char_count += this.indent_string.length;
	                    }
	                };

	                this.print_token = function(text) {
	                    // Avoid printing initial whitespace.
	                    if (this.is_whitespace(text) && !this.output.length) {
	                        return;
	                    }
	                    if (text || text !== '') {
	                        if (this.output.length && this.output[this.output.length - 1] === '\n') {
	                            this.print_indentation(this.output);
	                            text = ltrim(text);
	                        }
	                    }
	                    this.print_token_raw(text);
	                };

	                this.print_token_raw = function(text) {
	                    // If we are going to print newlines, truncate trailing
	                    // whitespace, as the newlines will represent the space.
	                    if (this.newlines > 0) {
	                        text = rtrim(text);
	                    }

	                    if (text && text !== '') {
	                        if (text.length > 1 && text.charAt(text.length - 1) === '\n') {
	                            // unformatted tags can grab newlines as their last character
	                            this.output.push(text.slice(0, -1));
	                            this.print_newline(false, this.output);
	                        } else {
	                            this.output.push(text);
	                        }
	                    }

	                    for (var n = 0; n < this.newlines; n++) {
	                        this.print_newline(n > 0, this.output);
	                    }
	                    this.newlines = 0;
	                };

	                this.indent = function() {
	                    this.indent_level++;
	                };

	                this.unindent = function() {
	                    if (this.indent_level > 0) {
	                        this.indent_level--;
	                    }
	                };
	            };
	            return this;
	        }

	        /*_____________________--------------------_____________________*/

	        multi_parser = new Parser(); //wrapping functions Parser
	        multi_parser.printer(html_source, indent_character, indent_size, wrap_line_length, brace_style); //initialize starting values

	        while (true) {
	            var t = multi_parser.get_token();
	            multi_parser.token_text = t[0];
	            multi_parser.token_type = t[1];

	            if (multi_parser.token_type === 'TK_EOF') {
	                break;
	            }

	            switch (multi_parser.token_type) {
	                case 'TK_TAG_START':
	                    multi_parser.print_newline(false, multi_parser.output);
	                    multi_parser.print_token(multi_parser.token_text);
	                    if (multi_parser.indent_content) {
	                        multi_parser.indent();
	                        multi_parser.indent_content = false;
	                    }
	                    multi_parser.current_mode = 'CONTENT';
	                    break;
	                case 'TK_TAG_STYLE':
	                case 'TK_TAG_SCRIPT':
	                    multi_parser.print_newline(false, multi_parser.output);
	                    multi_parser.print_token(multi_parser.token_text);
	                    multi_parser.current_mode = 'CONTENT';
	                    break;
	                case 'TK_TAG_END':
	                    //Print new line only if the tag has no content and has child
	                    if (multi_parser.last_token === 'TK_CONTENT' && multi_parser.last_text === '') {
	                        var tag_name = multi_parser.token_text.match(/\w+/)[0];
	                        var tag_extracted_from_last_output = null;
	                        if (multi_parser.output.length) {
	                            tag_extracted_from_last_output = multi_parser.output[multi_parser.output.length - 1].match(/(?:<|{{#)\s*(\w+)/);
	                        }
	                        if (tag_extracted_from_last_output === null ||
	                            (tag_extracted_from_last_output[1] !== tag_name && !multi_parser.Utils.in_array(tag_extracted_from_last_output[1], unformatted))) {
	                            multi_parser.print_newline(false, multi_parser.output);
	                        }
	                    }
	                    multi_parser.print_token(multi_parser.token_text);
	                    multi_parser.current_mode = 'CONTENT';
	                    break;
	                case 'TK_TAG_SINGLE':
	                    // Don't add a newline before elements that should remain unformatted.
	                    var tag_check = multi_parser.token_text.match(/^\s*<([a-z-]+)/i);
	                    if (!tag_check || !multi_parser.Utils.in_array(tag_check[1], unformatted)) {
	                        multi_parser.print_newline(false, multi_parser.output);
	                    }
	                    multi_parser.print_token(multi_parser.token_text);
	                    multi_parser.current_mode = 'CONTENT';
	                    break;
	                case 'TK_TAG_HANDLEBARS_ELSE':
	                    // Don't add a newline if opening {{#if}} tag is on the current line
	                    var foundIfOnCurrentLine = false;
	                    for (var lastCheckedOutput=multi_parser.output.length-1; lastCheckedOutput>=0; lastCheckedOutput--) {
			        if (multi_parser.output[lastCheckedOutput] === '\n') {
			            break;
	                        } else {
	                            if (multi_parser.output[lastCheckedOutput].match(/{{#if/)) {
	                                foundIfOnCurrentLine = true;
	                                break;
	                            }
	                        }
	                    }
	                    if (!foundIfOnCurrentLine) {
	                        multi_parser.print_newline(false, multi_parser.output);
	                    }
	                    multi_parser.print_token(multi_parser.token_text);
	                    if (multi_parser.indent_content) {
	                        multi_parser.indent();
	                        multi_parser.indent_content = false;
	                    }
	                    multi_parser.current_mode = 'CONTENT';
	                    break;
	                case 'TK_TAG_HANDLEBARS_COMMENT':
	                    multi_parser.print_token(multi_parser.token_text);
	                    multi_parser.current_mode = 'TAG';
	                    break;
	                case 'TK_CONTENT':
	                    multi_parser.print_token(multi_parser.token_text);
	                    multi_parser.current_mode = 'TAG';
	                    break;
	                case 'TK_STYLE':
	                case 'TK_SCRIPT':
	                    if (multi_parser.token_text !== '') {
	                        multi_parser.print_newline(false, multi_parser.output);
	                        var text = multi_parser.token_text,
	                            _beautifier,
	                            script_indent_level = 1;
	                        if (multi_parser.token_type === 'TK_SCRIPT') {
	                            _beautifier = typeof js_beautify === 'function' && js_beautify;
	                        } else if (multi_parser.token_type === 'TK_STYLE') {
	                            _beautifier = typeof css_beautify === 'function' && css_beautify;
	                        }

	                        if (options.indent_scripts === "keep") {
	                            script_indent_level = 0;
	                        } else if (options.indent_scripts === "separate") {
	                            script_indent_level = -multi_parser.indent_level;
	                        }

	                        var indentation = multi_parser.get_full_indent(script_indent_level);
	                        if (_beautifier) {

	                            // call the Beautifier if avaliable
	                            var Child_options = function() {
	                                this.eol = '\n';
	                            };
	                            Child_options.prototype = options;
	                            var child_options = new Child_options();
	                            text = _beautifier(text.replace(/^\s*/, indentation), child_options);
	                        } else {
	                            // simply indent the string otherwise
	                            var white = text.match(/^\s*/)[0];
	                            var _level = white.match(/[^\n\r]*$/)[0].split(multi_parser.indent_string).length - 1;
	                            var reindent = multi_parser.get_full_indent(script_indent_level - _level);
	                            text = text.replace(/^\s*/, indentation)
	                                .replace(/\r\n|\r|\n/g, '\n' + reindent)
	                                .replace(/\s+$/, '');
	                        }
	                        if (text) {
	                            multi_parser.print_token_raw(text);
	                            multi_parser.print_newline(true, multi_parser.output);
	                        }
	                    }
	                    multi_parser.current_mode = 'TAG';
	                    break;
	                default:
	                    // We should not be getting here but we don't want to drop input on the floor
	                    // Just output the text and move on
	                    if (multi_parser.token_text !== '') {
	                        multi_parser.print_token(multi_parser.token_text);
	                    }
	                    break;
	            }
	            multi_parser.last_token = multi_parser.token_type;
	            multi_parser.last_text = multi_parser.token_text;
	        }
	        var sweet_code = multi_parser.output.join('').replace(/[\r\n\t ]+$/, '');

	        // establish end_with_newline
	        if (end_with_newline) {
	            sweet_code += '\n';
	        }

	        if (eol != '\n') {
	            sweet_code = sweet_code.replace(/[\n]/g, eol);
	        }

	        return sweet_code;
	    }

	    if (true) {
	        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(28), __webpack_require__(29)], __WEBPACK_AMD_DEFINE_RESULT__ = function(requireamd) {
	            var js_beautify =  __webpack_require__(28);
	            var css_beautify =  __webpack_require__(29);

	            return {
	              html_beautify: function(html_source, options) {
	                return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
	              }
	            };
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        // Add support for CommonJS. Just put this file somewhere on your require.paths
	        // and you will be able to `var html_beautify = require("beautify").html_beautify`.
	        var js_beautify = require('./beautify.js');
	        var css_beautify = require('./beautify-css.js');

	        exports.html_beautify = function(html_source, options) {
	            return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
	        };
	    } else if (typeof window !== "undefined") {
	        // If we're running a web page and don't have either of the above, add our one global
	        window.html_beautify = function(html_source, options) {
	            return style_html(html_source, options, window.js_beautify, window.css_beautify);
	        };
	    } else if (typeof global !== "undefined") {
	        // If we don't even have window, try global.
	        global.html_beautify = function(html_source, options) {
	            return style_html(html_source, options, global.js_beautify, global.css_beautify);
	        };
	    }

	}());


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(32);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Log.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Log.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-console .eruda-logs {\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  height: 100%;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  font-size: 14px; }\n  .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li {\n    padding: 10px;\n    overflow-x: auto; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li a {\n      color: #76a2ee !important; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li .eruda-times {\n      background: #76a2ee;\n      padding: 5px;\n      color: #fff;\n      border-radius: 4px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-input {\n      background: #fff; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-log, .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-output, .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-info, .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-dir {\n      border-bottom: 1px solid #b4b4b4; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-html table {\n      width: 100%;\n      background: #fff;\n      border-collapse: collapse; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-html table th {\n        background: #76a2ee;\n        color: #fff; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-html table th, .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-html table td {\n        padding: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-html .eruda-blue {\n      color: #76a2ee; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-error {\n      background: #fff0f0;\n      color: #ff0000;\n      border-top: 1px solid #ffd7d7;\n      border-bottom: 1px solid #ffd7d7; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-error .eruda-stack {\n        color: #000;\n        padding-left: 1.2em; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-warn {\n      background: #fffbe6;\n      border-top: 1px solid #fff5c2;\n      border-bottom: 1px solid #fff5c2; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-info {\n      color: #76a2ee; }\n", ""]);

	// exports


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

	  return "        <li class=\"eruda-"
	    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
	    + " eruda-log-item\" data-idx=\""
	    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
	    + "\">\r\n            "
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.showTimes : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\r\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isCode : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
	    + "        </li>\r\n";
	},"2":function(container,depth0,helpers,partials,data) {
	    var helper;

	  return "<span class=\"eruda-times\">"
	    + container.escapeExpression(((helper = (helper = helpers.times || (depth0 != null ? depth0.times : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"times","hash":{},"data":data}) : helper)))
	    + "</span>";
	},"4":function(container,depth0,helpers,partials,data) {
	    var stack1, helper;

	  return "                <pre>"
	    + ((stack1 = ((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"val","hash":{},"data":data}) : helper))) != null ? stack1 : "")
	    + "</pre>\r\n";
	},"6":function(container,depth0,helpers,partials,data) {
	    var stack1, helper;

	  return "                "
	    + ((stack1 = ((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"val","hash":{},"data":data}) : helper))) != null ? stack1 : "")
	    + "\r\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "<ul>\r\n"
	    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.logs : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "</ul>";
	},"useData":true});

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = {
		":c": "Clear console",
		":a": "Show all logs",
		":e": "Show error logs only",
		":w": "Show warn logs only",
		":i": "Show info logs only",
		":l": "Show normal logs only",
		":h": "Show help",
		":$": "Load jQuery",
		":_": "Load underscore",
		"/regexp": "Show logs that match given regexp"
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=container.escapeExpression;

	  return "            <tr>\r\n                <td>"
	    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"key","hash":{},"data":data}) : helper)))
	    + "</td>\r\n                <td>"
	    + alias1(container.lambda(depth0, depth0))
	    + "</td>\r\n            </tr>\r\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "<table>\r\n    <thead>\r\n        <tr>\r\n            <th>Command</th>\r\n            <th>Description</th>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n"
	    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.commands : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "    </tbody>\r\n</table>";
	},"useData":true});

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = {
		"jQuery": "//cdn.bootcss.com/jquery/2.2.1/jquery.js",
		"underscore": "//cdn.bootcss.com/underscore.js/1.8.3/underscore-min.js"
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(38);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Console.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Console.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-console {\n  padding-top: 40px;\n  padding-bottom: 40px; }\n  .eruda-dev-tools .eruda-tools .eruda-console .eruda-control {\n    position: absolute;\n    left: 0;\n    top: 0;\n    padding: 10px 10px 10px 40px;\n    background: #fff;\n    height: 40px;\n    line-height: 20px;\n    width: 100%; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-blocked, .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-info {\n      display: inline-block;\n      color: #b4b4b4;\n      padding: 5px;\n      font-size: 16px;\n      position: absolute;\n      top: 6px; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-blocked:active, .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-info:active {\n        color: #f2f2f2; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-blocked {\n      left: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-info {\n      right: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-filter {\n      color: #b4b4b4;\n      margin: 0 1px;\n      font-size: 12px;\n      height: 20px;\n      display: inline-block;\n      padding: 0 4px;\n      line-height: 20px;\n      border-radius: 4px; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-filter.eruda-active {\n        background: #b4b4b4;\n        color: #fff; }\n  .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    background: #fff;\n    height: 40px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input .eruda-buttons {\n      display: none;\n      position: absolute;\n      left: 0;\n      top: 0;\n      width: 100%;\n      height: 40px;\n      color: #b4b4b4;\n      font-size: 12px;\n      border-bottom: 1px solid #f2f2f2; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input .eruda-buttons .eruda-button {\n        width: 50%;\n        display: inline-block;\n        text-align: center;\n        height: 40px;\n        line-height: 40px;\n        float: left; }\n        .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input .eruda-buttons .eruda-button:active {\n          background: #76a2ee;\n          color: #fff; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input textarea {\n      padding: 10px;\n      outline: none;\n      border: none;\n      font-size: 14px;\n      width: 100%;\n      height: 100%; }\n", ""]);

	// exports


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<div class=\"eruda-control\">\r\n    <span class=\"eruda-icon-blocked clear-console\" ontouchstart></span>\r\n    <span class=\"eruda-filter filter eruda-active\" data-filter=\"all\">All</span>\r\n    <span class=\"eruda-filter filter\" data-filter=\"error\">Error</span>\r\n    <span class=\"eruda-filter filter\" data-filter=\"warn\">Warning</span>\r\n    <span class=\"eruda-filter filter\" data-filter=\"info\">Info</span>\r\n    <span class=\"eruda-filter filter\" data-filter=\"log\">Log</span>\r\n    <span class=\"eruda-icon-info help\" ontouchstart></span>\r\n</div>\r\n<div class=\"eruda-logs\"></div>\r\n<div class=\"eruda-js-input\">\r\n    <div class=\"eruda-buttons\">\r\n        <div class=\"eruda-button cancel\" ontouchstart>Cancel</div>\r\n        <div class=\"eruda-button execute\" ontouchstart>Execute</div>\r\n    </div>\r\n    <textarea placeholder=\"Type JavaScript here\"></textarea>\r\n</div>\r\n";
	},"useData":true});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Tool2 = __webpack_require__(20);

	var _Tool3 = _interopRequireDefault(_Tool2);

	var _Request = __webpack_require__(41);

	var _Request2 = _interopRequireDefault(_Request);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _config = __webpack_require__(8);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(42);

	var Network = function (_Tool) {
	    _inherits(Network, _Tool);

	    function Network() {
	        _classCallCheck(this, Network);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Network).call(this));

	        _this.name = 'network';
	        _this._performanceTimingData = [];
	        _this._requests = {};

	        _this._tpl = __webpack_require__(44);
	        return _this;
	    }

	    _createClass(Network, [{
	        key: 'init',
	        value: function init($el, parent) {
	            _get(Object.getPrototypeOf(Network.prototype), 'init', this).call(this, $el);

	            this._parent = parent;
	            this._bindEvent();
	            this._initConfig();
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            _get(Object.getPrototypeOf(Network.prototype), 'show', this).call(this);

	            this._getPerformanceTimingData();
	            this._render();
	        }
	    }, {
	        key: 'overrideXhr',
	        value: function overrideXhr() {
	            var winXhrProto = window.XMLHttpRequest.prototype;

	            var origSend = this._origSend = winXhrProto.send,
	                origOpen = this._origOpen = winXhrProto.open;

	            var self = this;

	            winXhrProto.open = function (method, url) {
	                var xhr = this;

	                var req = xhr.erudaRequest = new _Request2.default(xhr, method, url);

	                req.on('send', function (id, data) {
	                    return self._addReq(id, data);
	                });
	                req.on('update', function (id, data) {
	                    return self._updateReq(id, data);
	                });

	                xhr.addEventListener('readystatechange', function () {
	                    switch (xhr.readyState) {
	                        case 2:
	                            return req.handleHeadersReceived();
	                        case 4:
	                            return req.handleDone();
	                    }
	                });

	                origOpen.apply(this, arguments);
	            };

	            winXhrProto.send = function () {
	                var req = this.erudaRequest;
	                if (req) req.handleSend();

	                origSend.apply(this, arguments);
	            };
	        }
	    }, {
	        key: 'restoreXhr',
	        value: function restoreXhr() {
	            var winXhrProto = window.XMLHttpRequest.prototype;

	            if (this._origOpen) winXhrProto.open = this._origOpen;
	            if (this._origSend) winXhrProto.send = this._origSend;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            _get(Object.getPrototypeOf(Network.prototype), 'destroy', this).call(this);
	            this.restoreXhr();
	        }
	    }, {
	        key: '_addReq',
	        value: function _addReq(id, data) {
	            _util2.default.defaults(data, {
	                name: '',
	                url: '',
	                status: 'pending',
	                type: 'unknown',
	                subType: 'unknown',
	                size: 0,
	                method: 'GET',
	                startTime: _util2.default.now(),
	                time: 0,
	                resHeaders: {},
	                resTxt: '',
	                xhr: {},
	                done: false
	            });

	            this._requests[id] = data;

	            this._render();
	        }
	    }, {
	        key: '_updateReq',
	        value: function _updateReq(id, data) {
	            var target = this._requests[id];

	            if (!target) return;

	            _util2.default.extend(target, data);

	            target.time = target.time - target.startTime;

	            this._render();
	        }
	    }, {
	        key: '_bindEvent',
	        value: function _bindEvent() {
	            var $el = this._$el,
	                parent = this._parent;

	            var self = this;

	            $el.on('click', '.eruda-performance-timing', function () {
	                $el.find('.eruda-performance-timing-data').show();
	            });

	            $el.on('click', '.eruda-request', function () {
	                var id = _util2.default.$(this).data('id'),
	                    data = self._requests[id];

	                if (!data.done) return;

	                var sources = parent.get('sources');

	                sources.set('http', {
	                    url: data.url,
	                    resTxt: data.resTxt,
	                    type: data.type,
	                    subType: data.subType,
	                    resHeaders: data.resHeaders
	                });

	                parent.showTool('sources');
	            });
	        }
	    }, {
	        key: '_getPerformanceTimingData',
	        value: function _getPerformanceTimingData() {
	            var performance = window.webkitPerformance || window.performance,
	                timing = performance.timing;

	            var data = [];

	            var navigationStart = timing.navigationStart;
	            var unloadEventStart = timing.unloadEventStart;
	            var unloadEventEnd = timing.unloadEventEnd;
	            var redirectStart = timing.redirectStart;
	            var redirectEnd = timing.redirectEnd;
	            var fetchStart = timing.fetchStart;
	            var domainLookupStart = timing.domainLookupStart;
	            var domainLookupEnd = timing.domainLookupEnd;
	            var connectStart = timing.connectStart;
	            var connectEnd = timing.connectEnd;
	            var secureConnectionStart = timing.secureConnectionStart;
	            var requestStart = timing.requestStart;
	            var responseStart = timing.responseStart;
	            var responseEnd = timing.responseEnd;
	            var domLoading = timing.domLoading;
	            var domInteractive = timing.domInteractive;
	            var domContentLoadedEventStart = timing.domContentLoadedEventStart;
	            var domContentLoadedEventEnd = timing.domContentLoadedEventEnd;
	            var domComplete = timing.domComplete;
	            var loadEventStart = timing.loadEventStart;
	            var loadEventEnd = timing.loadEventEnd;


	            var start = navigationStart,
	                end = loadEventEnd,
	                total = end - start;

	            function getData(name, startTime, endTime) {
	                var duration = endTime - startTime;

	                return {
	                    name: name,
	                    start: (startTime - start) / total * 100,
	                    duration: duration,
	                    len: duration / total * 100
	                };
	            }

	            data.push(getData('Total', navigationStart, loadEventEnd));
	            data.push(getData('Network/Server', navigationStart, responseStart));
	            data.push(getData('App cache', fetchStart, domainLookupStart));
	            data.push(getData('DNS', domainLookupStart, domainLookupEnd));
	            data.push(getData('TCP', connectStart, connectEnd));
	            data.push(getData('Time to First Byte', requestStart, responseStart));
	            data.push(getData('Response', responseStart, responseEnd));
	            data.push(getData('Unload', unloadEventStart, unloadEventEnd));
	            data.push(getData('DOM Processing', domLoading, domComplete));
	            data.push(getData('DOM Construction', domLoading, domInteractive));
	            data.push(getData('DOM Content Loaded Event', domContentLoadedEventStart, domContentLoadedEventEnd));
	            data.push(getData('Load Event', loadEventStart, loadEventEnd));

	            this._performanceTimingData = data;

	            var performanceTiming = {};
	            ['navigationStart', 'unloadEventStart', 'unloadEventEnd', 'redirectStart', 'redirectEnd', 'fetchStart', 'domainLookupStart', 'domainLookupEnd', 'connectStart', 'connectEnd', 'secureConnectionStart', 'requestStart', 'responseStart', 'responseEnd', 'domLoading', 'domInteractive', 'domContentLoadedEventStart', 'domContentLoadedEventEnd', 'domComplete', 'loadEventStart', 'loadEventEnd'].forEach(function (val) {
	                performanceTiming[val] = timing[val] === 0 ? 0 : timing[val] - start;
	            });
	            this._performanceTiming = performanceTiming;
	        }
	    }, {
	        key: '_initConfig',
	        value: function _initConfig() {
	            var _this2 = this;

	            var cfg = this.config = _config2.default.create('eruda-network');

	            cfg.set(_util2.default.defaults(cfg.get(), {
	                overrideXhr: false
	            }));

	            if (cfg.get('overrideXhr')) this.overrideXhr();

	            cfg.on('change', function (key, val) {
	                switch (key) {
	                    case 'overrideXhr':
	                        return val ? _this2.overrideXhr() : _this2.restoreXhr();
	                }
	            });
	        }
	    }, {
	        key: '_render',
	        value: function _render() {
	            if (!this.active) return;

	            this._$el.html(this._tpl({
	                data: this._performanceTimingData,
	                timing: this._performanceTiming,
	                requests: this._requests
	            }));
	        }
	    }]);

	    return Network;
	}(_Tool3.default);

	exports.default = Network;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Request = function (_util$Emitter) {
	    _inherits(Request, _util$Emitter);

	    function Request(xhr, method, url) {
	        _classCallCheck(this, Request);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Request).call(this));

	        _this._xhr = xhr;
	        _this._method = method;
	        _this._url = url;
	        _this._id = _util2.default.uniqId('request');
	        return _this;
	    }

	    _createClass(Request, [{
	        key: 'handleSend',
	        value: function handleSend() {
	            this.emit('send', this._id, {
	                name: getFileName(this._url),
	                url: this._url,
	                method: this._method,
	                xhr: this._xhr
	            });
	        }
	    }, {
	        key: 'handleHeadersReceived',
	        value: function handleHeadersReceived() {
	            var xhr = this._xhr;

	            var type = getType(xhr.getResponseHeader('Content-Type'));

	            this.emit('update', this._id, {
	                type: type.type,
	                subType: type.subType,
	                size: formatSize(xhr.getResponseHeader('Content-Length')),
	                time: _util2.default.now(),
	                resHeaders: getHeaders(xhr)
	            });
	        }
	    }, {
	        key: 'handleDone',
	        value: function handleDone() {
	            this.emit('update', this._id, {
	                status: this._xhr.status,
	                done: true,
	                time: _util2.default.now(),
	                resTxt: this._xhr.responseText
	            });
	        }
	    }]);

	    return Request;
	}(_util2.default.Emitter);

	exports.default = Request;
	;

	function getHeaders(xhr) {
	    var raw = xhr.getAllResponseHeaders(),
	        lines = raw.split('\n');

	    var ret = {};

	    _util2.default.each(lines, function (line) {
	        line = _util2.default.trim(line);

	        if (line === '') return;

	        var _line$split = line.split(':', 2);

	        var _line$split2 = _slicedToArray(_line$split, 2);

	        var key = _line$split2[0];
	        var val = _line$split2[1];


	        ret[key] = _util2.default.trim(val);
	    });

	    return ret;
	}

	function getFileName(url) {
	    var ret = _util2.default.last(url.split('/'));

	    if (ret.indexOf('?') > -1) ret = ret.split('?')[0];

	    return ret;
	}

	function getType(contentType) {
	    if (!contentType) return 'unknown';

	    var type = contentType.split(';')[0].split('/');

	    return {
	        type: type[0],
	        subType: _util2.default.last(type)
	    };
	}

	function formatSize(size) {
	    if (size < 1024) return size + 'B';

	    return (size / 1024).toFixed(1) + 'KB';
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(43);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Network.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Network.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-network {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing {\n    padding: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing .eruda-inner-wrapper {\n      background: #76a2ee; }\n      .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing .eruda-inner-wrapper .eruda-bar {\n        border-bottom: 1px solid #fff;\n        overflow-x: auto;\n        -webkit-overflow-scrolling: touch; }\n        .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing .eruda-inner-wrapper .eruda-bar span {\n          font-size: 14px;\n          white-space: nowrap;\n          color: #fff;\n          padding: 5px 0;\n          background: #f73c37;\n          display: inline-block; }\n        .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing .eruda-inner-wrapper .eruda-bar:last-child {\n          border-bottom: none; }\n  .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing-data {\n    padding: 0 10px 10px;\n    text-align: center;\n    display: none; }\n    .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing-data table {\n      width: 100%;\n      background: #fff;\n      border-collapse: collapse;\n      text-align: left; }\n      .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing-data table th {\n        background: #b4b4b4;\n        text-align: left;\n        color: #fff; }\n      .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing-data table th, .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing-data table td {\n        padding: 10px;\n        font-size: 14px; }\n  .eruda-dev-tools .eruda-tools .eruda-network .eruda-requests {\n    background: #fff;\n    border-bottom: 1px solid #b4b4b4; }\n    .eruda-dev-tools .eruda-tools .eruda-network .eruda-requests li {\n      border-top: 1px solid #b4b4b4;\n      overflow-x: auto;\n      -webkit-overflow-scrolling: touch;\n      white-space: nowrap; }\n      .eruda-dev-tools .eruda-tools .eruda-network .eruda-requests li span {\n        display: inline-block;\n        line-height: 40px;\n        height: 40px;\n        padding: 0 10px;\n        font-size: 14px; }\n      .eruda-dev-tools .eruda-tools .eruda-network .eruda-requests li:nth-child(even) {\n        background: #f2f2f2; }\n", ""]);

	// exports


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

	  return "            <div class=\"eruda-bar\">\r\n                <span style=\"position:relative;left:"
	    + alias4(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start","hash":{},"data":data}) : helper)))
	    + "%;width:"
	    + alias4(((helper = (helper = helpers.len || (depth0 != null ? depth0.len : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"len","hash":{},"data":data}) : helper)))
	    + "%\">"
	    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
	    + "("
	    + alias4(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"duration","hash":{},"data":data}) : helper)))
	    + "ms)</span>\r\n            </div>\r\n";
	},"3":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=container.escapeExpression;

	  return "                <tr>\r\n                    <td>"
	    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"key","hash":{},"data":data}) : helper)))
	    + "</td>\r\n                    <td>"
	    + alias1(container.lambda(depth0, depth0))
	    + "</td>\r\n                </tr>\r\n";
	},"5":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

	  return "        <li class=\"eruda-request\" data-id=\""
	    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
	    + "\">\r\n            <span>"
	    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
	    + "</span>\r\n            <span>"
	    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
	    + "</span>\r\n            <span>"
	    + alias4(((helper = (helper = helpers.method || (depth0 != null ? depth0.method : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"method","hash":{},"data":data}) : helper)))
	    + "</span>\r\n            <span>"
	    + alias4(((helper = (helper = helpers.subType || (depth0 != null ? depth0.subType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subType","hash":{},"data":data}) : helper)))
	    + "</span>\r\n            <span>"
	    + alias4(((helper = (helper = helpers.size || (depth0 != null ? depth0.size : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"size","hash":{},"data":data}) : helper)))
	    + "</span>\r\n            <span>"
	    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
	    + "ms</span>\r\n            <span class=\"eruda-blue\">"
	    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
	    + "</span>\r\n        </li>\r\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=depth0 != null ? depth0 : {};

	  return "<div class=\"eruda-performance-timing\">\r\n    <div class=\"eruda-inner-wrapper\">\r\n"
	    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "    </div>\r\n</div>\r\n\r\n<div class=\"eruda-performance-timing-data\">\r\n    <table>\r\n        <thead>\r\n            <tr>\r\n                <th>Name</th>\r\n                <th>Time(ms)</th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n"
	    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.timing : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "        </tbody>\r\n    </table>\r\n</div>\r\n\r\n<ul class=\"eruda-requests\">\r\n"
	    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.requests : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "</ul>";
	},"useData":true});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Tool2 = __webpack_require__(20);

	var _Tool3 = _interopRequireDefault(_Tool2);

	var _CssStore = __webpack_require__(46);

	var _CssStore2 = _interopRequireDefault(_CssStore);

	var _Highlight = __webpack_require__(47);

	var _Highlight2 = _interopRequireDefault(_Highlight);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(51);

	var Elements = function (_Tool) {
	    _inherits(Elements, _Tool);

	    function Elements() {
	        _classCallCheck(this, Elements);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Elements).call(this));

	        _this.name = 'elements';
	        _this._tpl = __webpack_require__(53);
	        _this._rmDefComputedStyle = true;
	        _this._highlightElement = false;
	        return _this;
	    }

	    _createClass(Elements, [{
	        key: 'init',
	        value: function init($el, parent) {
	            _get(Object.getPrototypeOf(Elements.prototype), 'init', this).call(this, $el);

	            this._parent = parent;

	            $el.html('<div class="eruda-show-area"></div>');
	            this._$showArea = $el.find('.eruda-show-area');
	            $el.append(__webpack_require__(54)());

	            this._bindEvent();
	            this._htmlEl = document.documentElement;
	            this._initHighlight();
	            this._setEl(this._htmlEl);
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            _get(Object.getPrototypeOf(Elements.prototype), 'show', this).call(this);

	            this._render();
	        }
	    }, {
	        key: '_back',
	        value: function _back() {
	            if (this._curEl === this._htmlEl) return;

	            var parentQueue = this._curParentQueue;

	            var parent = parentQueue.shift();
	            while (!isElExist(parent)) {
	                parent = parentQueue.shift();
	            }this._setEl(parent);
	        }
	    }, {
	        key: '_bindEvent',
	        value: function _bindEvent() {
	            var _this2 = this;

	            var self = this;

	            this._$el.on('click', '.eruda-child', function () {
	                var idx = _util2.default.$(this).data('idx');

	                var curEl = self._curEl,
	                    el = curEl.childNodes[idx];

	                if (!isElExist(el)) self._render();

	                if (el.nodeType === 3) {
	                    var parent = self._parent,
	                        sources = parent.get('sources');

	                    var curTagName = curEl.tagName,
	                        type;

	                    switch (curTagName) {
	                        case 'SCRIPT':
	                            type = 'js';break;
	                        case 'STYLE':
	                            type = 'css';break;
	                        default:
	                            return;
	                    }

	                    sources.set(type, el.nodeValue);

	                    parent.showTool('sources');
	                }

	                if (el.nodeType === 1) return self._setEl(el);
	            }).on('click', '.toggle-all-computed-style', function () {
	                _this2._toggleAllComputedStyle();
	            });

	            var $bottomBar = this._$el.find('.eruda-bottom-bar');

	            $bottomBar.on('click', '.back', function () {
	                return _this2._back();
	            }).on('click', '.refresh', function () {
	                return _this2._render();
	            }).on('click', '.highlight', function () {
	                _util2.default.$(this).toggleClass('eruda-active');
	                self._toggleHighlight();
	            }).on('click', '.reset', function () {
	                return _this2._setEl(_this2._htmlEl);
	            });
	        }
	    }, {
	        key: '_toggleAllComputedStyle',
	        value: function _toggleAllComputedStyle() {
	            this._rmDefComputedStyle = !this._rmDefComputedStyle;

	            this._render();
	        }
	    }, {
	        key: '_initHighlight',
	        value: function _initHighlight() {
	            this._highlight = new _Highlight2.default(this._parent.$parent);
	        }
	    }, {
	        key: '_toggleHighlight',
	        value: function _toggleHighlight() {
	            this._highlightElement = !this._highlightElement;

	            this._render();
	        }
	    }, {
	        key: '_setEl',
	        value: function _setEl(el) {
	            this._curEl = el;
	            this._curCssStore = new _CssStore2.default(el);
	            this._highlight.setEl(el);
	            this._rmDefComputedStyle = true;
	            window.$0 = el;

	            var parentQueue = [];

	            var parent = el.parentNode;
	            while (parent) {
	                parentQueue.push(parent);
	                parent = parent.parentNode;
	            }
	            this._curParentQueue = parentQueue;

	            this._render();
	        }
	    }, {
	        key: '_getData',
	        value: function _getData() {
	            var ret = {};

	            var el = this._curEl,
	                cssStore = this._curCssStore;

	            var className = el.className;
	            var id = el.id;
	            var attributes = el.attributes;
	            var tagName = el.tagName;


	            ret.children = formatChildNodes(el.childNodes);
	            ret.attributes = formatAttr(attributes);
	            ret.name = formatElName({ tagName: tagName, id: id, className: className, attributes: attributes });

	            if (needNoStyle(tagName)) return ret;

	            var computedStyle = cssStore.getComputedStyle();
	            if (this._rmDefComputedStyle) computedStyle = rmDefComputedStyle(computedStyle);
	            ret.computedStyle = computedStyle;

	            var styles = cssStore.getMatchedCSSRules();
	            styles.unshift(getInlineStyle(el.style));
	            ret.styles = styles;

	            return ret;
	        }
	    }, {
	        key: '_render',
	        value: function _render() {
	            if (!isElExist(this._curEl)) return this._back();

	            this._highlight[this._highlightElement ? 'show' : 'hide']();
	            this._$showArea.html(this._tpl(this._getData()));
	        }
	    }]);

	    return Elements;
	}(_Tool3.default);

	exports.default = Elements;


	function isElExist(val) {
	    return _util2.default.isEl(val) && val.parentNode;
	}

	function formatElName(data) {
	    var id = data.id;
	    var className = data.className;
	    var attributes = data.attributes;


	    var ret = '<span class="eruda-blue">' + data.tagName.toLowerCase() + '</span>';

	    if (id !== '') ret += '#' + id;

	    _util2.default.each(className.split(/\s+/g), function (val) {
	        if (_util2.default.trim(val) === '') return;

	        ret += '.' + val;
	    });

	    _util2.default.each(attributes, function (attr) {
	        var name = attr.name;

	        if (name === 'id' || name === 'class' || name === 'style') return;

	        ret += ' ' + name + '="' + attr.value + '"';
	    });

	    return ret;
	}

	function formatAttr(attributes) {
	    var ret = [];

	    for (var i = 0, len = attributes.length; i < len; i++) {
	        var attr = attributes[i];
	        ret.push({
	            name: attr.name,
	            value: attr.value
	        });
	    }

	    return ret;
	}

	function formatChildNodes(nodes) {
	    var ret = [];

	    for (var i = 0, len = nodes.length; i < len; i++) {
	        var child = nodes[i];
	        if (child.nodeType === 3) {
	            var val = _util2.default.trim(child.nodeValue);
	            if (val !== '') ret.push({
	                text: val,
	                idx: i
	            });
	            continue;
	        }
	        if (child.nodeType === 1 && child.id !== 'eruda' && child.className.indexOf('eruda') < 0) {
	            ret.push({
	                text: formatElName({
	                    tagName: child.tagName,
	                    id: child.id,
	                    className: child.className,
	                    attributes: child.attributes
	                }),
	                idx: i
	            });
	        }
	    }

	    return ret;
	}

	function getInlineStyle(style) {
	    var ret = {
	        selectorText: 'element.style',
	        style: {}
	    };

	    for (var i = 0, len = style.length; i < len; i++) {
	        var s = style[i];

	        ret.style[s] = style[s];
	    }

	    return ret;
	}

	var defComputedStyle = __webpack_require__(55);

	function rmDefComputedStyle(computedStyle) {
	    var ret = {};

	    _util2.default.each(computedStyle, function (val, key) {
	        if (val === defComputedStyle[key]) return;

	        ret[key] = val;
	    });

	    return ret;
	}

	var NO_STYLE_TAG = ['script', 'style', 'meta', 'title', 'link', 'head'];

	function needNoStyle(tagName) {
	    tagName = tagName.toLowerCase();

	    return NO_STYLE_TAG.indexOf(tagName) > -1;
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function formatStyle(style) {
	    var ret = {};

	    for (var i = 0, len = style.length; i < len; i++) {
	        var name = style[i];

	        if (style[name] === 'initial') continue;

	        ret[name] = style[name];
	    }

	    return ret;
	}

	var elProto = Element.prototype;

	var matchesSel = function matchesSel(el, selText) {
	    return false;
	};

	if (elProto.webkitMatchesSelector) {
	    matchesSel = function matchesSel(el, selText) {
	        return el.webkitMatchesSelector(selText);
	    };
	} else if (elProto.mozMatchesSelector) {
	    matchesSel = function matchesSel(el, selText) {
	        return el.mozMatchesSelector(selText);
	    };
	}

	var CssStore = function () {
	    function CssStore(el) {
	        _classCallCheck(this, CssStore);

	        this._el = el;
	    }

	    _createClass(CssStore, [{
	        key: 'getComputedStyle',
	        value: function getComputedStyle() {
	            var computedStyle = window.getComputedStyle(this._el);

	            return formatStyle(computedStyle);
	        }
	    }, {
	        key: 'getMatchedCSSRules',
	        value: function getMatchedCSSRules() {
	            var _this = this;

	            var ret = [];

	            _util2.default.each(document.styleSheets, function (styleSheet) {
	                if (!styleSheet.cssRules) return;

	                _util2.default.each(styleSheet.cssRules, function (cssRule) {
	                    var matchesEl = false;

	                    // Mobile safari will throw DOM Exception 12 error, need to try catch it.
	                    try {
	                        matchesEl = _this._elMatchesSel(cssRule.selectorText);
	                    } catch (e) {}

	                    if (!matchesEl) return;

	                    ret.push({
	                        selectorText: cssRule.selectorText,
	                        style: formatStyle(cssRule.style)
	                    });
	                });
	            });

	            return ret;
	        }
	    }, {
	        key: '_elMatchesSel',
	        value: function _elMatchesSel(selText) {
	            return matchesSel(this._el, selText);
	        }
	    }]);

	    return CssStore;
	}();

	exports.default = CssStore;
	;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	__webpack_require__(48);

	var Highlight = function () {
	    function Highlight($container) {
	        _classCallCheck(this, Highlight);

	        this._appendTpl($container);
	    }

	    _createClass(Highlight, [{
	        key: 'setEl',
	        value: function setEl(el) {
	            this._$target = _util2.default.$(el);
	            this._target = el;
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            this._calSizeAndPos();
	            this._$el.show();
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this._$el.hide();
	        }
	    }, {
	        key: '_calSizeAndPos',
	        value: function _calSizeAndPos() {
	            var $target = this._$target;

	            var _$target$offset = $target.offset();

	            var left = _$target$offset.left;
	            var width = _$target$offset.width;
	            var top = _$target$offset.top;
	            var height = _$target$offset.height;


	            this._$el.css({
	                left: left,
	                top: top,
	                width: width,
	                height: height
	            });

	            var computedStyle = getComputedStyle(this._target, '');

	            function getNumStyle(name) {
	                return pxToNum(computedStyle.getPropertyValue(name));
	            }

	            var ml = getNumStyle('margin-left'),
	                mr = getNumStyle('margin-right'),
	                mt = getNumStyle('margin-top'),
	                mb = getNumStyle('margin-bottom');

	            this._$margin.css({
	                left: -ml,
	                top: -mt,
	                width: width + ml + mr,
	                height: height + mt + mb
	            });

	            var bl = getNumStyle('border-left-width'),
	                br = getNumStyle('border-right-width'),
	                bt = getNumStyle('border-top-width'),
	                bb = getNumStyle('border-bottom-width');

	            var bw = width - bl - br,
	                bh = height - bt - bb;

	            this._$padding.css({
	                left: bl,
	                top: bt,
	                width: bw,
	                height: bh
	            });

	            var pl = getNumStyle('padding-left'),
	                pr = getNumStyle('padding-right'),
	                pt = getNumStyle('padding-top'),
	                pb = getNumStyle('padding-bottom');

	            this._$content.css({
	                left: bl + pl,
	                top: bl + pt,
	                width: bw - pl - pr,
	                height: bh - pt - pb
	            });
	        }
	    }, {
	        key: '_appendTpl',
	        value: function _appendTpl($container) {
	            $container.append(__webpack_require__(50)());

	            this._$el = _util2.default.$('.eruda-elements-highlight');
	            this._$margin = this._$el.find('.eruda-margin');
	            this._$padding = this._$el.find('.eruda-padding');
	            this._$content = this._$el.find('.eruda-content');
	        }
	    }]);

	    return Highlight;
	}();

	exports.default = Highlight;


	function pxToNum(str) {
	    return _util2.default.toNum(str.replace('px', ''));
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(49);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Highlight.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Highlight.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-elements-highlight {\n  display: none;\n  position: absolute;\n  left: 0;\n  right: 0;\n  opacity: .5;\n  z-index: -100; }\n  .eruda-elements-highlight .eruda-margin {\n    position: absolute;\n    background: #e8925b;\n    z-index: 100; }\n  .eruda-elements-highlight .eruda-border {\n    position: absolute;\n    left: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    background: #ffcd7c;\n    z-index: 200; }\n  .eruda-elements-highlight .eruda-padding {\n    position: absolute;\n    background: #86af76;\n    z-index: 300; }\n  .eruda-elements-highlight .eruda-content {\n    position: absolute;\n    background: #5e88c1;\n    z-index: 400; }\n", ""]);

	// exports


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<div class=\"eruda-elements-highlight\">\r\n    <div class=\"eruda-margin\"></div>\r\n    <div class=\"eruda-border\"></div>\r\n    <div class=\"eruda-padding\"></div>\r\n    <div class=\"eruda-content\"></div>\r\n</div>";
	},"useData":true});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(52);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Elements.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Elements.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-elements {\n  padding-bottom: 40px; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-show-area {\n    overflow-y: auto;\n    -webkit-overflow-scrolling: touch;\n    height: 100%; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-breadcrumb {\n    background: #fff;\n    padding: 10px;\n    margin-bottom: 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-section {\n    margin-bottom: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-section h2 {\n      background: #76a2ee;\n      padding: 10px;\n      color: #fff;\n      font-size: 14px; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-children {\n    background: #fff;\n    margin-bottom: 10px !important; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-children li {\n      padding: 10px;\n      overflow-x: auto;\n      -webkit-overflow-scrolling: touch;\n      border-top: 1px solid #b4b4b4; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-children li:last-child {\n        border-bottom: 1px solid #b4b4b4; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-attributes {\n    background: #fff;\n    font-size: 12px; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-attributes .eruda-table-wrapper {\n      overflow-x: auto;\n      -webkit-overflow-scrolling: touch; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-attributes table td {\n      padding: 5px 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-text-content {\n    background: #fff; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-text-content .eruda-content {\n      padding: 10px;\n      overflow-x: auto;\n      -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-computed-style {\n    background: #fff;\n    font-size: 12px; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-computed-style .eruda-table-wrapper {\n      max-height: 200px;\n      overflow-y: auto;\n      -webkit-overflow-scrolling: touch; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-computed-style table td {\n      padding: 5px 10px; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-computed-style table td.eruda-key {\n        color: #f73c37; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles {\n    background: #fff;\n    font-size: 12px; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper {\n      padding: 10px; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper .eruda-style-rules {\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n        border: 1px solid #b4b4b4;\n        padding: 10px;\n        background: #fff;\n        margin-bottom: 10px; }\n        .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper .eruda-style-rules .eruda-rule {\n          padding-left: 2em; }\n          .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper .eruda-style-rules .eruda-rule span {\n            color: #f73c37; }\n        .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper .eruda-style-rules:last-child {\n          margin-bottom: 0; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-bottom-bar {\n    height: 40px;\n    background: #fff;\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-bottom-bar .eruda-btn {\n      text-align: center;\n      color: #b4b4b4;\n      font-size: 14px;\n      line-height: 40px;\n      -webkit-box-flex: 1;\n      -webkit-flex-grow: 1;\n          -ms-flex-positive: 1;\n              flex-grow: 1; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-bottom-bar .eruda-btn:active, .eruda-dev-tools .eruda-tools .eruda-elements .eruda-bottom-bar .eruda-btn.eruda-active {\n        background: #76a2ee;\n        color: #fff; }\n", ""]);

	// exports


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "    <ul class=\"eruda-children\">\r\n"
	    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.children : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "    </ul>\r\n";
	},"2":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function";

	  return "            <li class=\"eruda-child\" data-idx=\""
	    + container.escapeExpression(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idx","hash":{},"data":data}) : helper)))
	    + "\">"
	    + ((stack1 = ((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper))) != null ? stack1 : "")
	    + "</li>\r\n";
	},"4":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.attributes : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"5":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

	  return "                    <tr>\r\n                        <td>"
	    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
	    + "</td>\r\n                        <td>"
	    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
	    + "</td>\r\n                    </tr>\r\n";
	},"7":function(container,depth0,helpers,partials,data) {
	    return "                <tr>\r\n                    <td>Empty</td>\r\n                </tr>\r\n";
	},"9":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "    <div class=\"eruda-computed-style eruda-section\">\r\n        <h2 class=\"toggle-all-computed-style\">Computed Style</h2>\r\n        <div class=\"eruda-table-wrapper\">\r\n            <table>\r\n                <tbody>\r\n"
	    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.computedStyle : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n";
	},"10":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=container.escapeExpression;

	  return "                    <tr>\r\n                        <td class=\"eruda-key\">"
	    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"key","hash":{},"data":data}) : helper)))
	    + "</td>\r\n                        <td>"
	    + alias1(container.lambda(depth0, depth0))
	    + "</td>\r\n                    </tr>\r\n";
	},"12":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "    <div class=\"eruda-styles eruda-section\">\r\n        <h2>Styles</h2>\r\n        <div class=\"eruda-style-wrapper\">\r\n"
	    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.styles : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "        </div>\r\n    </div>\r\n";
	},"13":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : {};

	  return "                <div class=\"eruda-style-rules\">\r\n                    <div>"
	    + container.escapeExpression(((helper = (helper = helpers.selectorText || (depth0 != null ? depth0.selectorText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"selectorText","hash":{},"data":data}) : helper)))
	    + " {</div>\r\n"
	    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.style : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "                    <div>}</div>\r\n                </div>\r\n";
	},"14":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=container.escapeExpression;

	  return "                        <div class=\"eruda-rule\">\r\n                            <span>"
	    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"key","hash":{},"data":data}) : helper)))
	    + "</span>: "
	    + alias1(container.lambda(depth0, depth0))
	    + ";\r\n                        </div>\r\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : {};

	  return "<div class=\"eruda-breadcrumb\">\r\n    "
	    + ((stack1 = ((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper))) != null ? stack1 : "")
	    + "\r\n</div>\r\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.children : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "<div class=\"eruda-attributes eruda-section\">\r\n    <h2>Attributes</h2>\r\n    <div class=\"eruda-table-wrapper\">\r\n        <table>\r\n            <tbody>\r\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.attributes : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
	    + "            </tbody>\r\n        </table>\r\n    </div>\r\n</div>\r\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.computedStyle : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.styles : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"useData":true});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<div class=\"eruda-bottom-bar\">\r\n    <div class=\"eruda-btn back\" ontouchstart>Back</div>\r\n    <div class=\"eruda-btn refresh\" ontouchstart>Refresh</div>\r\n    <div class=\"eruda-btn highlight\" ontouchstart>Highlight</div>\r\n    <div class=\"eruda-btn reset\" ontouchstart>Reset</div>\r\n</div>";
	},"useData":true});

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = {
		"align-content": "stretch",
		"align-items": "stretch",
		"align-self": "start",
		"alignment-baseline": "auto",
		"all": "",
		"animation": "none 0s ease 0s 1 normal none running",
		"animation-delay": "0s",
		"animation-direction": "normal",
		"animation-duration": "0s",
		"animation-fill-mode": "none",
		"animation-iteration-count": "1",
		"animation-name": "none",
		"animation-play-state": "running",
		"animation-timing-function": "ease",
		"backface-visibility": "visible",
		"background": "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box",
		"background-attachment": "scroll",
		"background-blend-mode": "normal",
		"background-clip": "border-box",
		"background-color": "rgba(0, 0, 0, 0)",
		"background-image": "none",
		"background-origin": "padding-box",
		"background-position": "0% 0%",
		"background-position-x": "0%",
		"background-position-y": "0%",
		"background-repeat": "repeat",
		"background-repeat-x": "",
		"background-repeat-y": "",
		"background-size": "auto",
		"baseline-shift": "0px",
		"border": "0px none rgb(0, 0, 0)",
		"border-bottom": "0px none rgb(0, 0, 0)",
		"border-bottom-color": "rgb(0, 0, 0)",
		"border-bottom-left-radius": "0px",
		"border-bottom-right-radius": "0px",
		"border-bottom-style": "none",
		"border-bottom-width": "0px",
		"border-collapse": "separate",
		"border-color": "rgb(0, 0, 0)",
		"border-image": "none",
		"border-image-outset": "0px",
		"border-image-repeat": "stretch",
		"border-image-slice": "100%",
		"border-image-source": "none",
		"border-image-width": "1",
		"border-left": "0px none rgb(0, 0, 0)",
		"border-left-color": "rgb(0, 0, 0)",
		"border-left-style": "none",
		"border-left-width": "0px",
		"border-radius": "0px",
		"border-right": "0px none rgb(0, 0, 0)",
		"border-right-color": "rgb(0, 0, 0)",
		"border-right-style": "none",
		"border-right-width": "0px",
		"border-spacing": "0px 0px",
		"border-style": "none",
		"border-top": "0px none rgb(0, 0, 0)",
		"border-top-color": "rgb(0, 0, 0)",
		"border-top-left-radius": "0px",
		"border-top-right-radius": "0px",
		"border-top-style": "none",
		"border-top-width": "0px",
		"border-width": "0px",
		"bottom": "auto",
		"box-shadow": "none",
		"box-sizing": "content-box",
		"buffered-rendering": "auto",
		"caption-side": "top",
		"clear": "none",
		"clip": "auto",
		"clip-path": "none",
		"clip-rule": "nonzero",
		"color": "rgb(0, 0, 0)",
		"color-interpolation": "sRGB",
		"color-interpolation-filters": "linearRGB",
		"color-rendering": "auto",
		"content": "",
		"counter-increment": "none",
		"counter-reset": "none",
		"cursor": "auto",
		"cx": "0px",
		"cy": "0px",
		"direction": "ltr",
		"display": "block",
		"dominant-baseline": "auto",
		"empty-cells": "show",
		"fill": "rgb(0, 0, 0)",
		"fill-opacity": "1",
		"fill-rule": "nonzero",
		"filter": "none",
		"flex": "0 1 auto",
		"flex-basis": "auto",
		"flex-direction": "row",
		"flex-flow": "row nowrap",
		"flex-grow": "0",
		"flex-shrink": "1",
		"flex-wrap": "nowrap",
		"float": "none",
		"flood-color": "rgb(0, 0, 0)",
		"flood-opacity": "1",
		"font": "normal normal normal normal 16px / normal simsun",
		"font-family": "Simsun",
		"font-feature-settings": "normal",
		"font-kerning": "auto",
		"font-size": "16px",
		"font-stretch": "normal",
		"font-style": "normal",
		"font-variant": "normal",
		"font-variant-ligatures": "normal",
		"font-weight": "normal",
		"image-rendering": "auto",
		"isolation": "auto",
		"justify-content": "flex-start",
		"left": "auto",
		"letter-spacing": "normal",
		"lighting-color": "rgb(255, 255, 255)",
		"line-height": "normal",
		"list-style": "disc outside none",
		"list-style-image": "none",
		"list-style-position": "outside",
		"list-style-type": "disc",
		"margin": "0px",
		"margin-bottom": "0px",
		"margin-left": "0px",
		"margin-right": "0px",
		"margin-top": "0px",
		"marker": "",
		"marker-end": "none",
		"marker-mid": "none",
		"marker-start": "none",
		"mask": "none",
		"mask-type": "luminance",
		"max-height": "none",
		"max-width": "none",
		"max-zoom": "",
		"min-height": "0px",
		"min-width": "0px",
		"min-zoom": "",
		"mix-blend-mode": "normal",
		"motion": "none 0px auto 0deg",
		"motion-offset": "0px",
		"motion-path": "none",
		"motion-rotation": "auto 0deg",
		"object-fit": "fill",
		"object-position": "50% 50%",
		"opacity": "1",
		"order": "0",
		"orientation": "",
		"orphans": "auto",
		"outline": "rgb(0, 0, 0) none 0px",
		"outline-color": "rgb(0, 0, 0)",
		"outline-offset": "0px",
		"outline-style": "none",
		"outline-width": "0px",
		"overflow": "visible",
		"overflow-wrap": "normal",
		"overflow-x": "visible",
		"overflow-y": "visible",
		"padding": "0px",
		"padding-bottom": "0px",
		"padding-left": "0px",
		"padding-right": "0px",
		"padding-top": "0px",
		"page": "",
		"page-break-after": "auto",
		"page-break-before": "auto",
		"page-break-inside": "auto",
		"paint-order": "fill stroke markers",
		"perspective": "none",
		"pointer-events": "auto",
		"position": "static",
		"quotes": "",
		"r": "0px",
		"resize": "none",
		"right": "auto",
		"rx": "0px",
		"ry": "0px",
		"shape-image-threshold": "0",
		"shape-margin": "0px",
		"shape-outside": "none",
		"shape-rendering": "auto",
		"size": "",
		"speak": "normal",
		"src": "",
		"stop-color": "rgb(0, 0, 0)",
		"stop-opacity": "1",
		"stroke": "none",
		"stroke-dasharray": "none",
		"stroke-dashoffset": "0px",
		"stroke-linecap": "butt",
		"stroke-linejoin": "miter",
		"stroke-miterlimit": "4",
		"stroke-opacity": "1",
		"stroke-width": "1px",
		"tab-size": "8",
		"table-layout": "auto",
		"text-align": "start",
		"text-align-last": "auto",
		"text-anchor": "start",
		"text-combine-upright": "none",
		"text-decoration": "none",
		"text-indent": "0px",
		"text-orientation": "mixed",
		"text-overflow": "clip",
		"text-rendering": "auto",
		"text-shadow": "none",
		"text-transform": "none",
		"top": "auto",
		"touch-action": "auto",
		"transform": "none",
		"transform-style": "flat",
		"transition": "all 0s ease 0s",
		"transition-delay": "0s",
		"transition-duration": "0s",
		"transition-property": "all",
		"transition-timing-function": "ease",
		"unicode-bidi": "normal",
		"unicode-range": "",
		"user-zoom": "",
		"vector-effect": "none",
		"vertical-align": "baseline",
		"visibility": "visible",
		"-webkit-app-region": "no-drag",
		"-webkit-appearance": "none",
		"-webkit-background-clip": "border-box",
		"-webkit-background-composite": "source-over",
		"-webkit-background-origin": "padding-box",
		"-webkit-border-after": "0px none rgb(0, 0, 0)",
		"-webkit-border-after-color": "rgb(0, 0, 0)",
		"-webkit-border-after-style": "none",
		"-webkit-border-after-width": "0px",
		"-webkit-border-before": "0px none rgb(0, 0, 0)",
		"-webkit-border-before-color": "rgb(0, 0, 0)",
		"-webkit-border-before-style": "none",
		"-webkit-border-before-width": "0px",
		"-webkit-border-end": "0px none rgb(0, 0, 0)",
		"-webkit-border-end-color": "rgb(0, 0, 0)",
		"-webkit-border-end-style": "none",
		"-webkit-border-end-width": "0px",
		"-webkit-border-horizontal-spacing": "0px",
		"-webkit-border-image": "none",
		"-webkit-border-start": "0px none rgb(0, 0, 0)",
		"-webkit-border-start-color": "rgb(0, 0, 0)",
		"-webkit-border-start-style": "none",
		"-webkit-border-start-width": "0px",
		"-webkit-border-vertical-spacing": "0px",
		"-webkit-box-align": "stretch",
		"-webkit-box-decoration-break": "slice",
		"-webkit-box-direction": "normal",
		"-webkit-box-flex": "0",
		"-webkit-box-flex-group": "1",
		"-webkit-box-lines": "single",
		"-webkit-box-ordinal-group": "1",
		"-webkit-box-orient": "horizontal",
		"-webkit-box-pack": "start",
		"-webkit-box-reflect": "none",
		"-webkit-clip-path": "none",
		"-webkit-column-break-after": "auto",
		"-webkit-column-break-before": "auto",
		"-webkit-column-break-inside": "auto",
		"-webkit-column-count": "auto",
		"-webkit-column-gap": "normal",
		"-webkit-column-rule": "0px none rgb(0, 0, 0)",
		"-webkit-column-rule-color": "rgb(0, 0, 0)",
		"-webkit-column-rule-style": "none",
		"-webkit-column-rule-width": "0px",
		"-webkit-column-span": "none",
		"-webkit-column-width": "auto",
		"-webkit-columns": "auto auto",
		"-webkit-filter": "none",
		"-webkit-font-size-delta": "",
		"-webkit-font-smoothing": "auto",
		"-webkit-highlight": "none",
		"-webkit-hyphenate-character": "auto",
		"-webkit-line-break": "auto",
		"-webkit-line-clamp": "none",
		"-webkit-locale": "auto",
		"-webkit-logical-height": "8px",
		"-webkit-logical-width": "980px",
		"-webkit-margin-after": "0px",
		"-webkit-margin-after-collapse": "collapse",
		"-webkit-margin-before": "0px",
		"-webkit-margin-before-collapse": "collapse",
		"-webkit-margin-bottom-collapse": "collapse",
		"-webkit-margin-collapse": "",
		"-webkit-margin-end": "0px",
		"-webkit-margin-start": "0px",
		"-webkit-margin-top-collapse": "collapse",
		"-webkit-mask": "",
		"-webkit-mask-box-image": "none",
		"-webkit-mask-box-image-outset": "0px",
		"-webkit-mask-box-image-repeat": "stretch",
		"-webkit-mask-box-image-slice": "0 fill",
		"-webkit-mask-box-image-source": "none",
		"-webkit-mask-box-image-width": "auto",
		"-webkit-mask-clip": "border-box",
		"-webkit-mask-composite": "source-over",
		"-webkit-mask-image": "none",
		"-webkit-mask-origin": "border-box",
		"-webkit-mask-position": "0% 0%",
		"-webkit-mask-position-x": "0%",
		"-webkit-mask-position-y": "0%",
		"-webkit-mask-repeat": "repeat",
		"-webkit-mask-repeat-x": "",
		"-webkit-mask-repeat-y": "",
		"-webkit-mask-size": "auto",
		"-webkit-max-logical-height": "none",
		"-webkit-max-logical-width": "none",
		"-webkit-min-logical-height": "0px",
		"-webkit-min-logical-width": "0px",
		"-webkit-padding-after": "0px",
		"-webkit-padding-before": "0px",
		"-webkit-padding-end": "0px",
		"-webkit-padding-start": "0px",
		"-webkit-perspective-origin-x": "",
		"-webkit-perspective-origin-y": "",
		"-webkit-print-color-adjust": "economy",
		"-webkit-rtl-ordering": "logical",
		"-webkit-ruby-position": "before",
		"-webkit-tap-highlight-color": "rgba(0, 0, 0, 0.180392)",
		"-webkit-text-combine": "none",
		"-webkit-text-decorations-in-effect": "none",
		"-webkit-text-emphasis": "",
		"-webkit-text-emphasis-color": "rgb(0, 0, 0)",
		"-webkit-text-emphasis-position": "over",
		"-webkit-text-emphasis-style": "none",
		"-webkit-text-fill-color": "rgb(0, 0, 0)",
		"-webkit-text-orientation": "vertical-right",
		"-webkit-text-security": "none",
		"-webkit-text-stroke": "",
		"-webkit-text-stroke-color": "rgb(0, 0, 0)",
		"-webkit-text-stroke-width": "0px",
		"-webkit-transform-origin-x": "",
		"-webkit-transform-origin-y": "",
		"-webkit-transform-origin-z": "",
		"-webkit-user-drag": "auto",
		"-webkit-user-modify": "read-only",
		"-webkit-user-select": "text",
		"-webkit-writing-mode": "horizontal-tb",
		"white-space": "normal",
		"widows": "1",
		"will-change": "auto",
		"word-break": "normal",
		"word-spacing": "0px",
		"word-wrap": "normal",
		"writing-mode": "horizontal-tb",
		"x": "0px",
		"y": "0px",
		"z-index": "0",
		"zoom": "1"
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Tool2 = __webpack_require__(20);

	var _Tool3 = _interopRequireDefault(_Tool2);

	var _defSnippets = __webpack_require__(57);

	var _defSnippets2 = _interopRequireDefault(_defSnippets);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(58);

	var Snippets = function (_Tool) {
	    _inherits(Snippets, _Tool);

	    function Snippets() {
	        _classCallCheck(this, Snippets);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Snippets).call(this));

	        _this.name = 'snippets';

	        _this._snippets = [];
	        _this._tpl = __webpack_require__(60);
	        return _this;
	    }

	    _createClass(Snippets, [{
	        key: 'init',
	        value: function init($el) {
	            _get(Object.getPrototypeOf(Snippets.prototype), 'init', this).call(this, $el);

	            this._bindEvent();
	            this._addDefSnippets();
	        }
	    }, {
	        key: 'add',
	        value: function add(name, fn, desc) {
	            this._snippets.push({
	                name: name,
	                fn: fn,
	                desc: desc
	            });

	            this._render();
	        }
	    }, {
	        key: '_bindEvent',
	        value: function _bindEvent() {
	            var self = this;

	            this._$el.on('click', '.run', function I() {
	                var idx = _util2.default.$(this).data('idx');

	                self._run(idx);
	            });
	        }
	    }, {
	        key: '_run',
	        value: function _run(idx) {
	            this._snippets[idx].fn.call(null);
	        }
	    }, {
	        key: '_addDefSnippets',
	        value: function _addDefSnippets() {
	            var _this2 = this;

	            _util2.default.each(_defSnippets2.default, function (snippet) {
	                _this2.add(snippet.name, snippet.fn, snippet.desc);
	            });
	        }
	    }, {
	        key: '_render',
	        value: function _render() {
	            this._$el.html(this._tpl({
	                snippets: this._snippets
	            }));
	        }
	    }]);

	    return Snippets;
	}(_Tool3.default);

	exports.default = Snippets;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var borderCss = '',
	    selector = 'html',
	    colors = ['f5f5f5', 'dabb3a', 'abc1c7', '472936', 'c84941', '296dd1', '67adb4', '1ea061'];

	_util2.default.each(colors, function (color) {
	    selector += '>*';

	    borderCss += selector + '{border: 2px solid #' + color + ' !important}';
	});

	exports.default = [{
	    name: 'Border All',
	    fn: function fn() {
	        _util2.default.evalCss(borderCss);
	    },
	    desc: 'Add color borders to all elements'
	}, {
	    name: 'Refresh Page',
	    fn: function fn() {
	        window.location.reload();
	    },
	    desc: 'Refresh current page'
	}];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(59);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Snippets.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Snippets.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-snippets {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  padding: 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section {\n    margin-bottom: 10px;\n    border-radius: 4px;\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n    overflow: hidden; }\n    .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section .eruda-btn, .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section .eruda-name {\n      padding: 10px;\n      color: #fff;\n      background: #b4b4b4;\n      font-size: 14px;\n      text-align: center; }\n    .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section .eruda-btn {\n      background: #eda29b;\n      cursor: pointer; }\n    .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section .eruda-btn:active {\n      background: #f73c37; }\n    .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section .eruda-description {\n      background: #fff;\n      padding: 10px; }\n", ""]);

	// exports


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

	  return "    <div class=\"eruda-section\">\r\n        <h2 class=\"eruda-name\">"
	    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
	    + "</h2>\r\n        <div class=\"eruda-description\">\r\n            "
	    + alias4(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data}) : helper)))
	    + "\r\n        </div>\r\n        <div class=\"eruda-btn run\" data-idx=\""
	    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
	    + "\" ontouchstart>Run</div>\r\n    </div>\r\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.snippets : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"useData":true});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Tool2 = __webpack_require__(20);

	var _Tool3 = _interopRequireDefault(_Tool2);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(62);

	var Resources = function (_Tool) {
	    _inherits(Resources, _Tool);

	    function Resources() {
	        _classCallCheck(this, Resources);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Resources).call(this));

	        _this.name = 'resources';
	        _this._localStoreData = [];
	        _this._cookieData = [];
	        _this._scriptData = [];
	        _this._stylesheetData = [];
	        _this._imageData = [];
	        _this._tpl = __webpack_require__(64);
	        return _this;
	    }

	    _createClass(Resources, [{
	        key: 'init',
	        value: function init($el, parent) {
	            _get(Object.getPrototypeOf(Resources.prototype), 'init', this).call(this, $el);

	            this._parent = parent;

	            this.refresh();
	            this._bindEvent();
	        }
	    }, {
	        key: 'refresh',
	        value: function refresh() {
	            return this.refreshLocalStorage().refreshCookie().refreshScript().refreshStylesheet().refreshImage()._render();
	        }
	    }, {
	        key: 'refreshScript',
	        value: function refreshScript() {
	            var scriptData = [];

	            _util2.default.$('script').each(function () {
	                var src = this.src;

	                if (src !== '') scriptData.push(src);
	            });

	            scriptData = _util2.default.unique(scriptData);

	            this._scriptData = scriptData;

	            return this;
	        }
	    }, {
	        key: 'refreshStylesheet',
	        value: function refreshStylesheet() {
	            var stylesheetData = [];

	            _util2.default.$('link').each(function () {
	                if (this.rel !== 'stylesheet') return;

	                stylesheetData.push(this.href);
	            });

	            stylesheetData = _util2.default.unique(stylesheetData);

	            this._stylesheetData = stylesheetData;

	            return this;
	        }
	    }, {
	        key: 'refreshLocalStorage',
	        value: function refreshLocalStorage() {
	            var localStoreData = [];

	            // Mobile safari is not able to loop through localStorage directly.
	            var localStore = JSON.parse(JSON.stringify(window.localStorage));

	            _util2.default.each(localStore, function (val, key) {
	                localStoreData.push({
	                    key: key,
	                    val: val.slice(0, 500)
	                });
	            });

	            this._localStoreData = localStoreData;

	            return this;
	        }
	    }, {
	        key: 'refreshCookie',
	        value: function refreshCookie() {
	            var cookieData = [];

	            var cookie = document.cookie;
	            if (_util2.default.trim(cookie) !== '') {
	                _util2.default.each(document.cookie.split(';'), function (val) {
	                    val = val.split('=');
	                    cookieData.push({
	                        key: _util2.default.trim(val[0]),
	                        val: decodeURIComponent(val[1])
	                    });
	                });
	            }

	            this._cookieData = cookieData;

	            return this;
	        }
	    }, {
	        key: 'refreshImage',
	        value: function refreshImage() {
	            var imageData = [];

	            _util2.default.$('img').each(function () {
	                var $this = _util2.default.$(this),
	                    src = $this.attr('src');

	                if ($this.data('exclude') === 'true') return;

	                imageData.push(src);
	            });

	            imageData = _util2.default.unique(imageData);

	            this._imageData = imageData;

	            return this;
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            _get(Object.getPrototypeOf(Resources.prototype), 'show', this).call(this);

	            return this.refresh();
	        }
	    }, {
	        key: '_bindEvent',
	        value: function _bindEvent() {
	            var _this2 = this;

	            var self = this;

	            var parent = this._parent;

	            this._$el.on('click', '.refresh-local-storage', function () {
	                _this2.refreshLocalStorage()._render();
	            }).on('click', '.refresh-cookie', function () {
	                _this2.refreshCookie()._render();
	            }).on('click', '.refresh-script', function () {
	                _this2.refreshScript()._render();
	            }).on('click', '.refresh-image', function () {
	                _this2.refreshImage()._render();
	            }).on('click', '.delete-local-storage', function () {
	                var key = _util2.default.$(this).data('key');

	                localStorage.removeItem(key);
	                self.refreshLocalStorage()._render();
	            }).on('click', '.delete-cookie', function () {
	                var key = _util2.default.$(this).data('key');

	                _util2.default.cookie.remove(key);
	                self.refreshCookie()._render();
	            }).on('click', '.img-link', function () {
	                var src = _util2.default.$(this).attr('src');

	                var sources = parent.get('sources');

	                sources.set('img', src);

	                parent.showTool('sources');
	            }).on('click', '.css-link', linkFactory('css')).on('click', '.js-link', linkFactory('js'));

	            _util2.default.orientation.on('change', function () {
	                return _this2._render();
	            });

	            function linkFactory(type) {
	                return function (e) {
	                    var url = _util2.default.$(this).attr('href');

	                    if (!isCrossOrig(url)) {
	                        e.preventDefault();

	                        return _util2.default.get(url, function (err, data) {
	                            if (err) return;

	                            var sources = parent.get('sources');

	                            sources.set(type, data);

	                            parent.showTool('sources');
	                        });
	                    }
	                };
	            }
	        }
	    }, {
	        key: '_render',
	        value: function _render() {
	            var _this3 = this;

	            var localStoreData = this._localStoreData,
	                cookieData = this._cookieData,
	                scriptData = this._scriptData,
	                stylesheetData = this._stylesheetData,
	                imageData = this._imageData;

	            this._$el.html(this._tpl({
	                localStoreData: localStoreData,
	                localStoreState: getState('localStore', localStoreData.length),
	                cookieData: cookieData,
	                cookieState: getState('cookie', cookieData.length),
	                scriptData: scriptData,
	                scriptState: getState('script', scriptData.length),
	                stylesheetData: stylesheetData,
	                stylesheetState: getState('stylesheet', stylesheetData.length),
	                imageData: imageData,
	                imageState: getState('image', imageData.length)
	            }));

	            if (this._imageData.length === 0) return;

	            setTimeout(function () {
	                var $li = _this3._$el.find('.eruda-image-list li');

	                $li.css({ height: $li.get(0).offsetWidth });
	            }, 150);
	        }
	    }]);

	    return Resources;
	}(_Tool3.default);

	exports.default = Resources;


	function getState(type, len) {
	    if (type === 'localStore' || len === 0) return '';

	    var warn = 0,
	        danger = 0;

	    switch (type) {
	        case 'cookie':
	            warn = 30;danger = 60;break;
	        case 'script':
	            warn = 5;danger = 10;break;
	        case 'stylesheet':
	            warn = 4;danger = 8;break;
	        case 'image':
	            warn = 50;danger = 100;break;
	    }

	    if (len >= danger) return 'eruda-danger';
	    if (len >= warn) return 'eruda-warn';

	    return 'eruda-ok';
	}

	var origin = window.location.origin;

	function isCrossOrig(url) {
	    return !_util2.default.startWith(url, origin);
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(63);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Resources.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Resources.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-resources {\n  padding: 10px;\n  font-size: 14px;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-resources .eruda-section {\n    margin-bottom: 10px;\n    border-radius: 4px;\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n    overflow: hidden; }\n  .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title {\n    padding: 10px;\n    color: #fff;\n    background: #76a2ee;\n    font-size: 14px; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title.eruda-ok {\n      background: #8de191; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title.eruda-warn {\n      background: #fff5c2; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title.eruda-danger {\n      background: #eda29b; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title .eruda-btn {\n      float: right;\n      margin-right: 2px;\n      display: inline-block;\n      background: #fff;\n      color: #b4b4b4;\n      text-align: center;\n      width: 18px;\n      height: 18px;\n      line-height: 18px;\n      border-radius: 50%;\n      font-size: 12px;\n      cursor: pointer; }\n      .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title .eruda-btn .eruda-icon-loop {\n        position: relative;\n        top: 1px; }\n  .eruda-dev-tools .eruda-tools .eruda-resources .eruda-link-list li {\n    padding: 10px;\n    background: #fff;\n    word-break: break-all; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-link-list li a {\n      color: #76a2ee !important; }\n  .eruda-dev-tools .eruda-tools .eruda-resources .eruda-image-list {\n    background: #fff;\n    padding: 10px !important; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-image-list li {\n      width: 25%;\n      float: left;\n      overflow-y: hidden; }\n      .eruda-dev-tools .eruda-tools .eruda-resources .eruda-image-list li img {\n        width: 100%; }\n      .eruda-dev-tools .eruda-tools .eruda-resources .eruda-image-list li.eruda-empty {\n        padding: 10px;\n        width: 100%; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-image-list::after {\n      display: block;\n      content: '';\n      clear: both; }\n  .eruda-dev-tools .eruda-tools .eruda-resources table {\n    border-collapse: collapse;\n    width: 100%;\n    background: #fff; }\n    .eruda-dev-tools .eruda-tools .eruda-resources table td {\n      padding: 10px;\n      word-break: break-all; }\n      .eruda-dev-tools .eruda-tools .eruda-resources table td .eruda-icon-bin {\n        color: #f73c37;\n        display: inline-block;\n        padding: 5px; }\n      .eruda-dev-tools .eruda-tools .eruda-resources table td.eruda-key {\n        white-space: nowrap; }\n      .eruda-dev-tools .eruda-tools .eruda-resources table td.eruda-control {\n        width: 40px;\n        text-align: center; }\n", ""]);

	// exports


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.localStoreData : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"2":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

	  return "                    <tr>\r\n                        <td class=\"eruda-key\">"
	    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
	    + "</td>\r\n                        <td>"
	    + alias4(((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"val","hash":{},"data":data}) : helper)))
	    + "</td>\r\n                        <td class=\"eruda-control\">\r\n                            <span class=\"eruda-icon-bin delete-local-storage\" data-key=\""
	    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
	    + "\"></span>\r\n                        </td>\r\n                    </tr>\r\n";
	},"4":function(container,depth0,helpers,partials,data) {
	    return "                <tr>\r\n                    <td>Empty</td>\r\n                </tr>\r\n";
	},"6":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.cookieData : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"7":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

	  return "                    <tr>\r\n                        <td class=\"eruda-key\">"
	    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
	    + "</td>\r\n                        <td>"
	    + alias4(((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"val","hash":{},"data":data}) : helper)))
	    + "</td>\r\n                        <td class=\"eruda-control\">\r\n                            <span class=\"eruda-icon-bin delete-cookie\" data-key=\""
	    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
	    + "\"></span>\r\n                        </td>\r\n                    </tr>\r\n";
	},"9":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.scriptData : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"10":function(container,depth0,helpers,partials,data) {
	    var alias1=container.lambda, alias2=container.escapeExpression;

	  return "                <li>\r\n                    <a href=\""
	    + alias2(alias1(depth0, depth0))
	    + "\" target=\"_blank\" class=\"js-link\">"
	    + alias2(alias1(depth0, depth0))
	    + "</a>\r\n                </li>\r\n";
	},"12":function(container,depth0,helpers,partials,data) {
	    return "            <li>Empty</li>\r\n";
	},"14":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.stylesheetData : depth0),{"name":"each","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"15":function(container,depth0,helpers,partials,data) {
	    var alias1=container.lambda, alias2=container.escapeExpression;

	  return "                <li>\r\n                    <a href=\""
	    + alias2(alias1(depth0, depth0))
	    + "\" target=\"_blank\" class=\"css-link\">"
	    + alias2(alias1(depth0, depth0))
	    + "</a>\r\n                </li>\r\n";
	},"17":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.imageData : depth0),{"name":"each","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"18":function(container,depth0,helpers,partials,data) {
	    return "                <li>\r\n                    <img src=\""
	    + container.escapeExpression(container.lambda(depth0, depth0))
	    + "\" data-exclude=\"true\" class=\"img-link\"/>\r\n                </li>\r\n";
	},"20":function(container,depth0,helpers,partials,data) {
	    return "            <li class=\"eruda-empty\">Empty</li>\r\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

	  return "<div class=\"eruda-section\">\r\n    <h2 class=\"eruda-title "
	    + alias4(((helper = (helper = helpers.localStoreState || (depth0 != null ? depth0.localStoreState : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"localStoreState","hash":{},"data":data}) : helper)))
	    + "\">\r\n        LocalStorage\r\n        <div class=\"eruda-btn refresh-local-storage\">\r\n            <span class=\"eruda-icon-loop\"></span>\r\n        </div>\r\n    </h2>\r\n    <table>\r\n        <tbody>\r\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.localStoreData : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
	    + "        </tbody>\r\n    </table>\r\n</div>\r\n<div class=\"eruda-section\">\r\n    <h2 class=\"eruda-title "
	    + alias4(((helper = (helper = helpers.cookieState || (depth0 != null ? depth0.cookieState : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cookieState","hash":{},"data":data}) : helper)))
	    + "\">\r\n        Cookie\r\n        <div class=\"eruda-btn refresh-cookie\">\r\n            <span class=\"eruda-icon-loop\"></span>\r\n        </div>\r\n    </h2>\r\n    <table>\r\n        <tbody>\r\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.cookieData : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
	    + "        </tbody>\r\n    </table>\r\n</div>\r\n<div class=\"eruda-section\">\r\n    <h2 class=\"eruda-title "
	    + alias4(((helper = (helper = helpers.scriptState || (depth0 != null ? depth0.scriptState : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"scriptState","hash":{},"data":data}) : helper)))
	    + "\">\r\n        Script\r\n        <div class=\"eruda-btn refresh-script\">\r\n            <span class=\"eruda-icon-loop\"></span>\r\n        </div>\r\n    </h2>\r\n    <ul class=\"eruda-link-list\">\r\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.scriptData : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "")
	    + "    </ul>\r\n</div>\r\n<div class=\"eruda-section\">\r\n    <h2 class=\"eruda-title "
	    + alias4(((helper = (helper = helpers.stylesheetState || (depth0 != null ? depth0.stylesheetState : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stylesheetState","hash":{},"data":data}) : helper)))
	    + "\">\r\n        Stylesheet\r\n        <div class=\"eruda-btn refresh-stylesheet\">\r\n            <span class=\"eruda-icon-loop\"></span>\r\n        </div>\r\n    </h2>\r\n    <ul class=\"eruda-link-list\">\r\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.stylesheetData : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "")
	    + "    </ul>\r\n</div>\r\n<div class=\"eruda-section\">\r\n    <h2 class=\"eruda-title "
	    + alias4(((helper = (helper = helpers.imageState || (depth0 != null ? depth0.imageState : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imageState","hash":{},"data":data}) : helper)))
	    + "\">\r\n        Image\r\n        <div class=\"eruda-btn refresh-image\">\r\n            <span class=\"eruda-icon-loop\"></span>\r\n        </div>\r\n    </h2>\r\n    <ul class=\"eruda-image-list\">\r\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.imageData : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(20, data, 0),"data":data})) != null ? stack1 : "")
	    + "    </ul>\r\n</div>";
	},"useData":true});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Tool2 = __webpack_require__(20);

	var _Tool3 = _interopRequireDefault(_Tool2);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _defInfo = __webpack_require__(66);

	var _defInfo2 = _interopRequireDefault(_defInfo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(67);

	var Info = function (_Tool) {
	    _inherits(Info, _Tool);

	    function Info() {
	        _classCallCheck(this, Info);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Info).call(this));

	        _this.name = 'info';
	        _this._tpl = __webpack_require__(69);
	        _this._msgs = [];
	        return _this;
	    }

	    _createClass(Info, [{
	        key: 'init',
	        value: function init($el) {
	            _get(Object.getPrototypeOf(Info.prototype), 'init', this).call(this, $el);

	            this._addDefInfo();
	        }
	    }, {
	        key: 'add',
	        value: function add(name, val) {
	            this._msgs.push({
	                name: name,
	                val: val
	            });

	            this._render();

	            return this;
	        }
	    }, {
	        key: '_addDefInfo',
	        value: function _addDefInfo() {
	            var _this2 = this;

	            _util2.default.each(_defInfo2.default, function (info) {
	                _this2.add(info.name, info.val);
	            });
	        }
	    }, {
	        key: '_render',
	        value: function _render() {
	            this._$el.html(this._tpl({
	                messages: this._msgs
	            }));
	        }
	    }]);

	    return Info;
	}(_Tool3.default);

	exports.default = Info;

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = [{
	    name: 'Location',
	    val: location.href
	}, {
	    name: 'User Agent',
	    val: navigator.userAgent
	}, {
	    name: 'Help',
	    val: 'Use eruda.get("info").add("name", "value") to add your own custom info.'
	}];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(68);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Info.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Info.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-info {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  font-size: 14px; }\n  .eruda-dev-tools .eruda-tools .eruda-info li {\n    overflow-x: auto;\n    border-bottom: 1px solid #b4b4b4; }\n    .eruda-dev-tools .eruda-tools .eruda-info li .eruda-title, .eruda-dev-tools .eruda-tools .eruda-info li .eruda-content {\n      padding: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-info li .eruda-content {\n      margin: 0; }\n    .eruda-dev-tools .eruda-tools .eruda-info li .eruda-title {\n      padding-bottom: 0;\n      font-size: 16px;\n      color: #76a2ee; }\n", ""]);

	// exports


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

	  return "        <li>\r\n            <h2 class=\"eruda-title\">"
	    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
	    + "</h2>\r\n            <p class=\"eruda-content\">"
	    + alias4(((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"val","hash":{},"data":data}) : helper)))
	    + "</p>\r\n        </li>\r\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "<ul>\r\n"
	    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.messages : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "</ul>";
	},"useData":true});

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Tool2 = __webpack_require__(20);

	var _Tool3 = _interopRequireDefault(_Tool2);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _modernizr = __webpack_require__(71);

	var _modernizr2 = _interopRequireDefault(_modernizr);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(72);

	var featureList = __webpack_require__(74);

	var featureNames = featureList['feature-detects'],
	    specialNames = featureList['special-names'];

	var Features = function (_Tool) {
	    _inherits(Features, _Tool);

	    function Features() {
	        _classCallCheck(this, Features);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Features).call(this));

	        _this.name = 'features';
	        _this._tpl = __webpack_require__(75);
	        _this._features = {};
	        return _this;
	    }

	    _createClass(Features, [{
	        key: 'init',
	        value: function init($el) {
	            _get(Object.getPrototypeOf(Features.prototype), 'init', this).call(this, $el);

	            this._initFeatures();
	        }
	    }, {
	        key: '_initFeatures',
	        value: function _initFeatures() {
	            var _this2 = this;

	            _util2.default.each(featureNames, function (feature) {
	                if (specialNames[feature]) feature = specialNames[feature];
	                feature = feature.replace(/\//g, '');

	                _modernizr2.default.on(feature, function (result) {
	                    _this2._add(feature, result);
	                });
	            });
	        }
	    }, {
	        key: '_add',
	        value: function _add(name, result) {
	            this._features[name] = result;

	            this._render();
	        }
	    }, {
	        key: '_render',
	        value: function _render() {
	            this._$el.html(this._tpl({
	                features: this._features
	            }));
	        }
	    }]);

	    return Features;
	}(_Tool3.default);

	exports.default = Features;

/***/ },
/* 71 */
/***/ function(module, exports) {

	/*!
	 * modernizr v3.3.1
	 * Build http://modernizr.com/download?-audio-bloburls-boxshadow-boxsizing-canvas-cookies-cssanimations-csscalc-csstransforms-csstransforms3d-csstransitions-datauri-fetch-filereader-filesystem-flash-flexbox-fullscreen-geolocation-hashchange-history-indexeddb-json-localstorage-notification-performance-placeholder-pointerevents-promises-queryselector-scriptasync-scriptdefer-serviceworker-sessionstorage-stylescoped-svg-templatestrings-touchevents-typedarrays-video-webgl-webp-webpalpha-websockets-websqldatabase-xhr2-dontmin
	 *
	 * Copyright (c)
	 *  Faruk Ates
	 *  Paul Irish
	 *  Alex Sexton
	 *  Ryan Seddon
	 *  Patrick Kettner
	 *  Stu Cox
	 *  Richard Herrera

	 * MIT License
	 */

	/*
	 * Modernizr tests which native CSS3 and HTML5 features are available in the
	 * current UA and makes the results available to you in two ways: as properties on
	 * a global `Modernizr` object, and as classes on the `<html>` element. This
	 * information allows you to progressively enhance your pages with a granular level
	 * of control over the experience.
	*/

	;(function(window, document, undefined){
	  var tests = [];
	  

	  /**
	   *
	   * ModernizrProto is the constructor for Modernizr
	   *
	   * @class
	   * @access public
	   */

	  var ModernizrProto = {
	    // The current version, dummy
	    _version: '3.3.1',

	    // Any settings that don't work as separate modules
	    // can go in here as configuration.
	    _config: {
	      'classPrefix': '',
	      'enableClasses': true,
	      'enableJSClass': true,
	      'usePrefixes': true
	    },

	    // Queue of tests
	    _q: [],

	    // Stub these for people who are listening
	    on: function(test, cb) {
	      // I don't really think people should do this, but we can
	      // safe guard it a bit.
	      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
	      // This is in case people listen to synchronous tests. I would leave it out,
	      // but the code to *disallow* sync tests in the real version of this
	      // function is actually larger than this.
	      var self = this;
	      setTimeout(function() {
	        cb(self[test]);
	      }, 0);
	    },

	    addTest: function(name, fn, options) {
	      tests.push({name: name, fn: fn, options: options});
	    },

	    addAsyncTest: function(fn) {
	      tests.push({name: null, fn: fn});
	    }
	  };

	  

	  // Fake some of Object.create so we can force non test results to be non "own" properties.
	  var Modernizr = function() {};
	  Modernizr.prototype = ModernizrProto;

	  // Leak modernizr globally when you `require` it rather than force it here.
	  // Overwrite name so constructor name is nicer :D
	  Modernizr = new Modernizr();

	  

	  var classes = [];
	  

	  /**
	   * is returns a boolean if the typeof an obj is exactly type.
	   *
	   * @access private
	   * @function is
	   * @param {*} obj - A thing we want to check the type of
	   * @param {string} type - A string to compare the typeof against
	   * @returns {boolean}
	   */

	  function is(obj, type) {
	    return typeof obj === type;
	  }
	  ;

	  /**
	   * Run through all tests and detect their support in the current UA.
	   *
	   * @access private
	   */

	  function testRunner() {
	    var featureNames;
	    var feature;
	    var aliasIdx;
	    var result;
	    var nameIdx;
	    var featureName;
	    var featureNameSplit;

	    for (var featureIdx in tests) {
	      if (tests.hasOwnProperty(featureIdx)) {
	        featureNames = [];
	        feature = tests[featureIdx];
	        // run the test, throw the return value into the Modernizr,
	        // then based on that boolean, define an appropriate className
	        // and push it into an array of classes we'll join later.
	        //
	        // If there is no name, it's an 'async' test that is run,
	        // but not directly added to the object. That should
	        // be done with a post-run addTest call.
	        if (feature.name) {
	          featureNames.push(feature.name.toLowerCase());

	          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
	            // Add all the aliases into the names list
	            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
	              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
	            }
	          }
	        }

	        // Run the test, or use the raw value if it's not a function
	        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


	        // Set each of the names on the Modernizr object
	        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
	          featureName = featureNames[nameIdx];
	          // Support dot properties as sub tests. We don't do checking to make sure
	          // that the implied parent tests have been added. You must call them in
	          // order (either in the test, or make the parent test a dependency).
	          //
	          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
	          // hashtag famous last words
	          featureNameSplit = featureName.split('.');

	          if (featureNameSplit.length === 1) {
	            Modernizr[featureNameSplit[0]] = result;
	          } else {
	            // cast to a Boolean, if not one already
	            /* jshint -W053 */
	            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
	              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
	            }

	            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
	          }

	          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
	        }
	      }
	    }
	  }
	  ;

	  /**
	   * docElement is a convenience wrapper to grab the root element of the document
	   *
	   * @access private
	   * @returns {HTMLElement|SVGElement} The root element of the document
	   */

	  var docElement = document.documentElement;
	  

	  /**
	   * A convenience helper to check if the document we are running in is an SVG document
	   *
	   * @access private
	   * @returns {boolean}
	   */

	  var isSVG = docElement.nodeName.toLowerCase() === 'svg';
	  

	  /**
	   * createElement is a convenience wrapper around document.createElement. Since we
	   * use createElement all over the place, this allows for (slightly) smaller code
	   * as well as abstracting away issues with creating elements in contexts other than
	   * HTML documents (e.g. SVG documents).
	   *
	   * @access private
	   * @function createElement
	   * @returns {HTMLElement|SVGElement} An HTML or SVG element
	   */

	  function createElement() {
	    if (typeof document.createElement !== 'function') {
	      // This is the case in IE7, where the type of createElement is "object".
	      // For this reason, we cannot call apply() as Object is not a Function.
	      return document.createElement(arguments[0]);
	    } else if (isSVG) {
	      return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
	    } else {
	      return document.createElement.apply(document, arguments);
	    }
	  }

	  ;
	/*!
	{
	  "name" : "HTML5 Audio Element",
	  "property": "audio",
	  "tags" : ["html5", "audio", "media"]
	}
	!*/
	/* DOC
	Detects the audio element
	*/

	  // This tests evaluates support of the audio element, as well as
	  // testing what types of content it supports.
	  //
	  // We're using the Boolean constructor here, so that we can extend the value
	  // e.g.  Modernizr.audio     // true
	  //       Modernizr.audio.ogg // 'probably'
	  //
	  // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
	  //                     thx to NielsLeenheer and zcorpan

	  // Note: in some older browsers, "no" was a return value instead of empty string.
	  //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
	  //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5
	  Modernizr.addTest('audio', function() {
	    /* jshint -W053 */
	    var elem = createElement('audio');
	    var bool = false;

	    try {
	      if (bool = !!elem.canPlayType) {
	        bool      = new Boolean(bool);
	        bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '');
	        bool.mp3  = elem.canPlayType('audio/mpeg; codecs="mp3"')  .replace(/^no$/, '');
	        bool.opus  = elem.canPlayType('audio/ogg; codecs="opus"') .replace(/^no$/, '');

	        // Mimetypes accepted:
	        //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
	        //   bit.ly/iphoneoscodecs
	        bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/, '');
	        bool.m4a  = (elem.canPlayType('audio/x-m4a;')            ||
	                     elem.canPlayType('audio/aac;'))             .replace(/^no$/, '');
	      }
	    } catch (e) { }

	    return bool;
	  });

	/*!
	{
	  "name": "Canvas",
	  "property": "canvas",
	  "caniuse": "canvas",
	  "tags": ["canvas", "graphics"],
	  "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
	}
	!*/
	/* DOC
	Detects support for the `<canvas>` element for 2D drawing.
	*/

	  // On the S60 and BB Storm, getContext exists, but always returns undefined
	  // so we actually have to call getContext() to verify
	  // github.com/Modernizr/Modernizr/issues/issue/97/
	  Modernizr.addTest('canvas', function() {
	    var elem = createElement('canvas');
	    return !!(elem.getContext && elem.getContext('2d'));
	  });

	/*!
	{
	  "name": "Cookies",
	  "property": "cookies",
	  "tags": ["storage"],
	  "authors": ["tauren"]
	}
	!*/
	/* DOC
	Detects whether cookie support is enabled.
	*/

	  // https://github.com/Modernizr/Modernizr/issues/191

	  Modernizr.addTest('cookies', function() {
	    // navigator.cookieEnabled cannot detect custom or nuanced cookie blocking
	    // configurations. For example, when blocking cookies via the Advanced
	    // Privacy Settings in IE9, it always returns true. And there have been
	    // issues in the past with site-specific exceptions.
	    // Don't rely on it.

	    // try..catch because some in situations `document.cookie` is exposed but throws a
	    // SecurityError if you try to access it; e.g. documents created from data URIs
	    // or in sandboxed iframes (depending on flags/context)
	    try {
	      // Create cookie
	      document.cookie = 'cookietest=1';
	      var ret = document.cookie.indexOf('cookietest=') != -1;
	      // Delete cookie
	      document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
	      return ret;
	    }
	    catch (e) {
	      return false;
	    }
	  });


	  /**
	   * If the browsers follow the spec, then they would expose vendor-specific style as:
	   *   elem.style.WebkitBorderRadius
	   * instead of something like the following, which would be technically incorrect:
	   *   elem.style.webkitBorderRadius

	   * Webkit ghosts their properties in lowercase but Opera & Moz do not.
	   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
	   *   erik.eae.net/archives/2008/03/10/21.48.10/

	   * More here: github.com/Modernizr/Modernizr/issues/issue/21
	   *
	   * @access private
	   * @returns {string} The string representing the vendor-specific style properties
	   */

	  var omPrefixes = 'Moz O ms Webkit';
	  

	  var cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);
	  ModernizrProto._cssomPrefixes = cssomPrefixes;
	  


	  /**
	   * contains checks to see if a string contains another string
	   *
	   * @access private
	   * @function contains
	   * @param {string} str - The string we want to check for substrings
	   * @param {string} substr - The substring we want to search the first string for
	   * @returns {boolean}
	   */

	  function contains(str, substr) {
	    return !!~('' + str).indexOf(substr);
	  }

	  ;

	  /**
	   * Create our "modernizr" element that we do most feature tests on.
	   *
	   * @access private
	   */

	  var modElem = {
	    elem: createElement('modernizr')
	  };

	  // Clean up this element
	  Modernizr._q.push(function() {
	    delete modElem.elem;
	  });

	  

	  var mStyle = {
	    style: modElem.elem.style
	  };

	  // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
	  // the front of the queue.
	  Modernizr._q.unshift(function() {
	    delete mStyle.style;
	  });

	  

	  /**
	   * getBody returns the body of a document, or an element that can stand in for
	   * the body if a real body does not exist
	   *
	   * @access private
	   * @function getBody
	   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
	   * artificially created element that stands in for the body
	   */

	  function getBody() {
	    // After page load injecting a fake body doesn't work so check if body exists
	    var body = document.body;

	    if (!body) {
	      // Can't use the real body create a fake one.
	      body = createElement(isSVG ? 'svg' : 'body');
	      body.fake = true;
	    }

	    return body;
	  }

	  ;

	  /**
	   * injectElementWithStyles injects an element with style element and some CSS rules
	   *
	   * @access private
	   * @function injectElementWithStyles
	   * @param {string} rule - String representing a css rule
	   * @param {function} callback - A function that is used to test the injected element
	   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
	   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
	   * @returns {boolean}
	   */

	  function injectElementWithStyles(rule, callback, nodes, testnames) {
	    var mod = 'modernizr';
	    var style;
	    var ret;
	    var node;
	    var docOverflow;
	    var div = createElement('div');
	    var body = getBody();

	    if (parseInt(nodes, 10)) {
	      // In order not to give false positives we create a node for each test
	      // This also allows the method to scale for unspecified uses
	      while (nodes--) {
	        node = createElement('div');
	        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
	        div.appendChild(node);
	      }
	    }

	    style = createElement('style');
	    style.type = 'text/css';
	    style.id = 's' + mod;

	    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
	    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
	    (!body.fake ? div : body).appendChild(style);
	    body.appendChild(div);

	    if (style.styleSheet) {
	      style.styleSheet.cssText = rule;
	    } else {
	      style.appendChild(document.createTextNode(rule));
	    }
	    div.id = mod;

	    if (body.fake) {
	      //avoid crashing IE8, if background image is used
	      body.style.background = '';
	      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
	      body.style.overflow = 'hidden';
	      docOverflow = docElement.style.overflow;
	      docElement.style.overflow = 'hidden';
	      docElement.appendChild(body);
	    }

	    ret = callback(div, rule);
	    // If this is done after page load we don't want to remove the body so check if body exists
	    if (body.fake) {
	      body.parentNode.removeChild(body);
	      docElement.style.overflow = docOverflow;
	      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
	      docElement.offsetHeight;
	    } else {
	      div.parentNode.removeChild(div);
	    }

	    return !!ret;

	  }

	  ;

	  /**
	   * domToCSS takes a camelCase string and converts it to kebab-case
	   * e.g. boxSizing -> box-sizing
	   *
	   * @access private
	   * @function domToCSS
	   * @param {string} name - String name of camelCase prop we want to convert
	   * @returns {string} The kebab-case version of the supplied name
	   */

	  function domToCSS(name) {
	    return name.replace(/([A-Z])/g, function(str, m1) {
	      return '-' + m1.toLowerCase();
	    }).replace(/^ms-/, '-ms-');
	  }
	  ;

	  /**
	   * nativeTestProps allows for us to use native feature detection functionality if available.
	   * some prefixed form, or false, in the case of an unsupported rule
	   *
	   * @access private
	   * @function nativeTestProps
	   * @param {array} props - An array of property names
	   * @param {string} value - A string representing the value we want to check via @supports
	   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
	   */

	  // Accepts a list of property names and a single value
	  // Returns `undefined` if native detection not available
	  function nativeTestProps(props, value) {
	    var i = props.length;
	    // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
	    if ('CSS' in window && 'supports' in window.CSS) {
	      // Try every prefixed variant of the property
	      while (i--) {
	        if (window.CSS.supports(domToCSS(props[i]), value)) {
	          return true;
	        }
	      }
	      return false;
	    }
	    // Otherwise fall back to at-rule (for Opera 12.x)
	    else if ('CSSSupportsRule' in window) {
	      // Build a condition string for every prefixed variant
	      var conditionText = [];
	      while (i--) {
	        conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
	      }
	      conditionText = conditionText.join(' or ');
	      return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function(node) {
	        return getComputedStyle(node, null).position == 'absolute';
	      });
	    }
	    return undefined;
	  }
	  ;

	  /**
	   * cssToDOM takes a kebab-case string and converts it to camelCase
	   * e.g. box-sizing -> boxSizing
	   *
	   * @access private
	   * @function cssToDOM
	   * @param {string} name - String name of kebab-case prop we want to convert
	   * @returns {string} The camelCase version of the supplied name
	   */

	  function cssToDOM(name) {
	    return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
	      return m1 + m2.toUpperCase();
	    }).replace(/^-/, '');
	  }
	  ;

	  // testProps is a generic CSS / DOM property test.

	  // In testing support for a given CSS property, it's legit to test:
	  //    `elem.style[styleName] !== undefined`
	  // If the property is supported it will return an empty string,
	  // if unsupported it will return undefined.

	  // We'll take advantage of this quick test and skip setting a style
	  // on our modernizr element, but instead just testing undefined vs
	  // empty string.

	  // Property names can be provided in either camelCase or kebab-case.

	  function testProps(props, prefixed, value, skipValueTest) {
	    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

	    // Try native detect first
	    if (!is(value, 'undefined')) {
	      var result = nativeTestProps(props, value);
	      if (!is(result, 'undefined')) {
	        return result;
	      }
	    }

	    // Otherwise do it properly
	    var afterInit, i, propsLength, prop, before;

	    // If we don't have a style element, that means we're running async or after
	    // the core tests, so we'll need to create our own elements to use

	    // inside of an SVG element, in certain browsers, the `style` element is only
	    // defined for valid tags. Therefore, if `modernizr` does not have one, we
	    // fall back to a less used element and hope for the best.
	    var elems = ['modernizr', 'tspan'];
	    while (!mStyle.style) {
	      afterInit = true;
	      mStyle.modElem = createElement(elems.shift());
	      mStyle.style = mStyle.modElem.style;
	    }

	    // Delete the objects if we created them.
	    function cleanElems() {
	      if (afterInit) {
	        delete mStyle.style;
	        delete mStyle.modElem;
	      }
	    }

	    propsLength = props.length;
	    for (i = 0; i < propsLength; i++) {
	      prop = props[i];
	      before = mStyle.style[prop];

	      if (contains(prop, '-')) {
	        prop = cssToDOM(prop);
	      }

	      if (mStyle.style[prop] !== undefined) {

	        // If value to test has been passed in, do a set-and-check test.
	        // 0 (integer) is a valid property value, so check that `value` isn't
	        // undefined, rather than just checking it's truthy.
	        if (!skipValueTest && !is(value, 'undefined')) {

	          // Needs a try catch block because of old IE. This is slow, but will
	          // be avoided in most cases because `skipValueTest` will be used.
	          try {
	            mStyle.style[prop] = value;
	          } catch (e) {}

	          // If the property value has changed, we assume the value used is
	          // supported. If `value` is empty string, it'll fail here (because
	          // it hasn't changed), which matches how browsers have implemented
	          // CSS.supports()
	          if (mStyle.style[prop] != before) {
	            cleanElems();
	            return prefixed == 'pfx' ? prop : true;
	          }
	        }
	        // Otherwise just return true, or the property name if this is a
	        // `prefixed()` call
	        else {
	          cleanElems();
	          return prefixed == 'pfx' ? prop : true;
	        }
	      }
	    }
	    cleanElems();
	    return false;
	  }

	  ;

	  /**
	   * List of JavaScript DOM values used for tests
	   *
	   * @memberof Modernizr
	   * @name Modernizr._domPrefixes
	   * @optionName Modernizr._domPrefixes
	   * @optionProp domPrefixes
	   * @access public
	   * @example
	   *
	   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
	   * than kebab-case properties, all properties are their Capitalized variant
	   *
	   * ```js
	   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
	   * ```
	   */

	  var domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);
	  ModernizrProto._domPrefixes = domPrefixes;
	  

	  /**
	   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
	   *
	   * @access private
	   * @function fnBind
	   * @param {function} fn - a function you want to change `this` reference to
	   * @param {object} that - the `this` you want to call the function with
	   * @returns {function} The wrapped version of the supplied function
	   */

	  function fnBind(fn, that) {
	    return function() {
	      return fn.apply(that, arguments);
	    };
	  }

	  ;

	  /**
	   * testDOMProps is a generic DOM property test; if a browser supports
	   *   a certain property, it won't return undefined for it.
	   *
	   * @access private
	   * @function testDOMProps
	   * @param {array.<string>} props - An array of properties to test for
	   * @param {object} obj - An object or Element you want to use to test the parameters again
	   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
	   */
	  function testDOMProps(props, obj, elem) {
	    var item;

	    for (var i in props) {
	      if (props[i] in obj) {

	        // return the property name as a string
	        if (elem === false) {
	          return props[i];
	        }

	        item = obj[props[i]];

	        // let's bind a function
	        if (is(item, 'function')) {
	          // bind to obj unless overriden
	          return fnBind(item, elem || obj);
	        }

	        // return the unbound function or obj or value
	        return item;
	      }
	    }
	    return false;
	  }

	  ;

	  /**
	   * testPropsAll tests a list of DOM properties we want to check against.
	   * We specify literally ALL possible (known and/or likely) properties on
	   * the element including the non-vendor prefixed one, for forward-
	   * compatibility.
	   *
	   * @access private
	   * @function testPropsAll
	   * @param {string} prop - A string of the property to test for
	   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
	   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
	   * @param {string} [value] - A string of a css value
	   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
	   */
	  function testPropsAll(prop, prefixed, elem, value, skipValueTest) {

	    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
	    props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

	    // did they call .prefixed('boxSizing') or are we just testing a prop?
	    if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
	      return testProps(props, prefixed, value, skipValueTest);

	      // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
	    } else {
	      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
	      return testDOMProps(props, prefixed, elem);
	    }
	  }

	  // Modernizr.testAllProps() investigates whether a given style property,
	  // or any of its vendor-prefixed variants, is recognized
	  //
	  // Note that the property names must be provided in the camelCase variant.
	  // Modernizr.testAllProps('boxSizing')
	  ModernizrProto.testAllProps = testPropsAll;

	  

	  /**
	   * testAllProps determines whether a given CSS property is supported in the browser
	   *
	   * @memberof Modernizr
	   * @name Modernizr.testAllProps
	   * @optionName Modernizr.testAllProps()
	   * @optionProp testAllProps
	   * @access public
	   * @function testAllProps
	   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
	   * @param {string} [value] - String of the value to test
	   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
	   * @example
	   *
	   * testAllProps determines whether a given CSS property, in some prefixed form,
	   * is supported by the browser.
	   *
	   * ```js
	   * testAllProps('boxSizing')  // true
	   * ```
	   *
	   * It can optionally be given a CSS value in string form to test if a property
	   * value is valid
	   *
	   * ```js
	   * testAllProps('display', 'block') // true
	   * testAllProps('display', 'penguin') // false
	   * ```
	   *
	   * A boolean can be passed as a third parameter to skip the value check when
	   * native detection (@supports) isn't available.
	   *
	   * ```js
	   * testAllProps('shapeOutside', 'content-box', true);
	   * ```
	   */

	  function testAllProps(prop, value, skipValueTest) {
	    return testPropsAll(prop, undefined, undefined, value, skipValueTest);
	  }
	  ModernizrProto.testAllProps = testAllProps;
	  
	/*!
	{
	  "name": "CSS Animations",
	  "property": "cssanimations",
	  "caniuse": "css-animation",
	  "polyfills": ["transformie", "csssandpaper"],
	  "tags": ["css"],
	  "warnings": ["Android < 4 will pass this test, but can only animate a single property at a time"],
	  "notes": [{
	    "name" : "Article: 'Dispelling the Android CSS animation myths'",
	    "href": "https://goo.gl/OGw5Gm"
	  }]
	}
	!*/
	/* DOC
	Detects whether or not elements can be animated using CSS
	*/

	  Modernizr.addTest('cssanimations', testAllProps('animationName', 'a', true));

	/*!
	{
	  "name": "Box Shadow",
	  "property": "boxshadow",
	  "caniuse": "css-boxshadow",
	  "tags": ["css"],
	  "knownBugs": [
	    "WebOS false positives on this test.",
	    "The Kindle Silk browser false positives"
	  ]
	}
	!*/

	  Modernizr.addTest('boxshadow', testAllProps('boxShadow', '1px 1px', true));

	/*!
	{
	  "name": "Box Sizing",
	  "property": "boxsizing",
	  "caniuse": "css3-boxsizing",
	  "polyfills": ["borderboxmodel", "boxsizingpolyfill", "borderbox"],
	  "tags": ["css"],
	  "builderAliases": ["css_boxsizing"],
	  "notes": [{
	    "name": "MDN Docs",
	    "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing"
	  },{
	    "name": "Related Github Issue",
	    "href": "https://github.com/Modernizr/Modernizr/issues/248"
	  }]
	}
	!*/

	  Modernizr.addTest('boxsizing', testAllProps('boxSizing', 'border-box', true) && (document.documentMode === undefined || document.documentMode > 7));


	  /**
	   * List of property values to set for css tests. See ticket #21
	   * http://git.io/vUGl4
	   *
	   * @memberof Modernizr
	   * @name Modernizr._prefixes
	   * @optionName Modernizr._prefixes
	   * @optionProp prefixes
	   * @access public
	   * @example
	   *
	   * Modernizr._prefixes is the internal list of prefixes that we test against
	   * inside of things like [prefixed](#modernizr-prefixed) and [prefixedCSS](#-code-modernizr-prefixedcss). It is simply
	   * an array of kebab-case vendor prefixes you can use within your code.
	   *
	   * Some common use cases include
	   *
	   * Generating all possible prefixed version of a CSS property
	   * ```js
	   * var rule = Modernizr._prefixes.join('transform: rotate(20deg); ');
	   *
	   * rule === 'transform: rotate(20deg); webkit-transform: rotate(20deg); moz-transform: rotate(20deg); o-transform: rotate(20deg); ms-transform: rotate(20deg);'
	   * ```
	   *
	   * Generating all possible prefixed version of a CSS value
	   * ```js
	   * rule = 'display:' +  Modernizr._prefixes.join('flex; display:') + 'flex';
	   *
	   * rule === 'display:flex; display:-webkit-flex; display:-moz-flex; display:-o-flex; display:-ms-flex; display:flex'
	   * ```
	   */

	  var prefixes = (ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : []);

	  // expose these for the plugin API. Look in the source for how to join() them against your input
	  ModernizrProto._prefixes = prefixes;

	  
	/*!
	{
	  "name": "CSS Calc",
	  "property": "csscalc",
	  "caniuse": "calc",
	  "tags": ["css"],
	  "builderAliases": ["css_calc"],
	  "authors": ["@calvein"]
	}
	!*/
	/* DOC
	Method of allowing calculated values for length units. For example:

	```css
	//lem {
	  width: calc(100% - 3em);
	}
	```
	*/

	  Modernizr.addTest('csscalc', function() {
	    var prop = 'width:';
	    var value = 'calc(10px);';
	    var el = createElement('a');

	    el.style.cssText = prop + prefixes.join(value + prop);

	    return !!el.style.length;
	  });

	/*!
	{
	  "name": "Flexbox",
	  "property": "flexbox",
	  "caniuse": "flexbox",
	  "tags": ["css"],
	  "notes": [{
	    "name": "The _new_ flexbox",
	    "href": "http://dev.w3.org/csswg/css3-flexbox"
	  }],
	  "warnings": [
	    "A `true` result for this detect does not imply that the `flex-wrap` property is supported; see the `flexwrap` detect."
	  ]
	}
	!*/
	/* DOC
	Detects support for the Flexible Box Layout model, a.k.a. Flexbox, which allows easy manipulation of layout order and sizing within a container.
	*/

	  Modernizr.addTest('flexbox', testAllProps('flexBasis', '1px', true));

	/*!
	{
	  "name": "CSS Transforms",
	  "property": "csstransforms",
	  "caniuse": "transforms2d",
	  "tags": ["css"]
	}
	!*/

	  Modernizr.addTest('csstransforms', function() {
	    // Android < 3.0 is buggy, so we sniff and blacklist
	    // http://git.io/hHzL7w
	    return navigator.userAgent.indexOf('Android 2.') === -1 &&
	           testAllProps('transform', 'scale(1)', true);
	  });


	  /**
	   * testStyles injects an element with style element and some CSS rules
	   *
	   * @memberof Modernizr
	   * @name Modernizr.testStyles
	   * @optionName Modernizr.testStyles()
	   * @optionProp testStyles
	   * @access public
	   * @function testStyles
	   * @param {string} rule - String representing a css rule
	   * @param {function} callback - A function that is used to test the injected element
	   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
	   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
	   * @returns {boolean}
	   * @example
	   *
	   * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
	   * along with (possibly multiple) DOM elements. This lets you check for features
	   * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
	   *
	   * ```js
	   * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
	   *   // elem is the first DOM node in the page (by default #modernizr)
	   *   // rule is the first argument you supplied - the CSS rule in string form
	   *
	   *   addTest('widthworks', elem.style.width === '9px')
	   * });
	   * ```
	   *
	   * If your test requires multiple nodes, you can include a third argument
	   * indicating how many additional div elements to include on the page. The
	   * additional nodes are injected as children of the `elem` that is returned as
	   * the first argument to the callback.
	   *
	   * ```js
	   * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
	   *   document.getElementById('modernizr').style.width === '1px'; // true
	   *   document.getElementById('modernizr2').style.width === '2px'; // true
	   *   elem.firstChild === document.getElementById('modernizr2'); // true
	   * }, 1);
	   * ```
	   *
	   * By default, all of the additional elements have an ID of `modernizr[n]`, where
	   * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
	   * the second additional is `#modernizr3`, etc.).
	   * If you want to have more meaningful IDs for your function, you can provide
	   * them as the fourth argument, as an array of strings
	   *
	   * ```js
	   * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
	   *   elem.firstChild === document.getElementById('foo'); // true
	   *   elem.lastChild === document.getElementById('bar'); // true
	   * }, 2, ['foo', 'bar']);
	   * ```
	   *
	   */

	  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;
	  
	/*!
	{
	  "name": "CSS Supports",
	  "property": "supports",
	  "caniuse": "css-featurequeries",
	  "tags": ["css"],
	  "builderAliases": ["css_supports"],
	  "notes": [{
	    "name": "W3 Spec",
	    "href": "http://dev.w3.org/csswg/css3-conditional/#at-supports"
	  },{
	    "name": "Related Github Issue",
	    "href": "github.com/Modernizr/Modernizr/issues/648"
	  },{
	    "name": "W3 Info",
	    "href": "http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
	  }]
	}
	!*/

	  var newSyntax = 'CSS' in window && 'supports' in window.CSS;
	  var oldSyntax = 'supportsCSS' in window;
	  Modernizr.addTest('supports', newSyntax || oldSyntax);

	/*!
	{
	  "name": "CSS Transforms 3D",
	  "property": "csstransforms3d",
	  "caniuse": "transforms3d",
	  "tags": ["css"],
	  "warnings": [
	    "Chrome may occassionally fail this test on some systems; more info: https://code.google.com/p/chromium/issues/detail?id=129004"
	  ]
	}
	!*/

	  Modernizr.addTest('csstransforms3d', function() {
	    var ret = !!testAllProps('perspective', '1px', true);
	    var usePrefix = Modernizr._config.usePrefixes;

	    // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
	    //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
	    //   some conditions. As a result, Webkit typically recognizes the syntax but
	    //   will sometimes throw a false positive, thus we must do a more thorough check:
	    if (ret && (!usePrefix || 'webkitPerspective' in docElement.style)) {
	      var mq;
	      var defaultStyle = '#modernizr{width:0;height:0}';
	      // Use CSS Conditional Rules if available
	      if (Modernizr.supports) {
	        mq = '@supports (perspective: 1px)';
	      } else {
	        // Otherwise, Webkit allows this media query to succeed only if the feature is enabled.
	        // `@media (transform-3d),(-webkit-transform-3d){ ... }`
	        mq = '@media (transform-3d)';
	        if (usePrefix) {
	          mq += ',(-webkit-transform-3d)';
	        }
	      }

	      mq += '{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}';

	      testStyles(defaultStyle + mq, function(elem) {
	        ret = elem.offsetWidth === 7 && elem.offsetHeight === 18;
	      });
	    }

	    return ret;
	  });

	/*!
	{
	  "name": "CSS Transitions",
	  "property": "csstransitions",
	  "caniuse": "css-transitions",
	  "tags": ["css"]
	}
	!*/

	  Modernizr.addTest('csstransitions', testAllProps('transition', 'all', true));

	/*!
	{
	  "name": "ES6 Promises",
	  "property": "promises",
	  "caniuse": "promises",
	  "polyfills": ["es6promises"],
	  "authors": ["Krister Kari", "Jake Archibald"],
	  "tags": ["es6"],
	  "notes": [{
	    "name": "The ES6 promises spec",
	    "href": "https://github.com/domenic/promises-unwrapping"
	  },{
	    "name": "Chromium dashboard - ES6 Promises",
	    "href": "https://www.chromestatus.com/features/5681726336532480"
	  },{
	    "name": "JavaScript Promises: There and back again - HTML5 Rocks",
	    "href": "http://www.html5rocks.com/en/tutorials/es6/promises/"
	  }]
	}
	!*/
	/* DOC
	Check if browser implements ECMAScript 6 Promises per specification.
	*/

	  Modernizr.addTest('promises', function() {
	    return 'Promise' in window &&
	    // Some of these methods are missing from
	    // Firefox/Chrome experimental implementations
	    'resolve' in window.Promise &&
	    'reject' in window.Promise &&
	    'all' in window.Promise &&
	    'race' in window.Promise &&
	    // Older version of the spec had a resolver object
	    // as the arg rather than a function
	    (function() {
	      var resolve;
	      new window.Promise(function(r) { resolve = r; });
	      return typeof resolve === 'function';
	    }());
	  });

	/*!
	{
	  "name": "File API",
	  "property": "filereader",
	  "caniuse": "fileapi",
	  "notes": [{
	    "name": "W3C Working Draft",
	    "href": "https://www.w3.org/TR/FileAPI/"
	  }],
	  "tags": ["file"],
	  "builderAliases": ["file_api"],
	  "knownBugs": ["Will fail in Safari 5 due to its lack of support for the standards defined FileReader object"]
	}
	!*/
	/* DOC
	`filereader` tests for the File API specification

	Tests for objects specific to the File API W3C specification without
	being redundant (don't bother testing for Blob since it is assumed
	to be the File object's prototype.)
	*/

	  Modernizr.addTest('filereader', !!(window.File && window.FileList && window.FileReader));


	  /**
	   * atRule returns a given CSS property at-rule (eg @keyframes), possibly in
	   * some prefixed form, or false, in the case of an unsupported rule
	   *
	   * @memberof Modernizr
	   * @name Modernizr.atRule
	   * @optionName Modernizr.atRule()
	   * @optionProp atRule
	   * @access public
	   * @function atRule
	   * @param {string} prop - String name of the @-rule to test for
	   * @returns {string|boolean} The string representing the (possibly prefixed)
	   * valid version of the @-rule, or `false` when it is unsupported.
	   * @example
	   * ```js
	   *  var keyframes = Modernizr.atRule('@keyframes');
	   *
	   *  if (keyframes) {
	   *    // keyframes are supported
	   *    // could be `@-webkit-keyframes` or `@keyframes`
	   *  } else {
	   *    // keyframes === `false`
	   *  }
	   * ```
	   *
	   */

	  var atRule = function(prop) {
	    var length = prefixes.length;
	    var cssrule = window.CSSRule;
	    var rule;

	    if (typeof cssrule === 'undefined') {
	      return undefined;
	    }

	    if (!prop) {
	      return false;
	    }

	    // remove literal @ from beginning of provided property
	    prop = prop.replace(/^@/, '');

	    // CSSRules use underscores instead of dashes
	    rule = prop.replace(/-/g, '_').toUpperCase() + '_RULE';

	    if (rule in cssrule) {
	      return '@' + prop;
	    }

	    for (var i = 0; i < length; i++) {
	      // prefixes gives us something like -o-, and we want O_
	      var prefix = prefixes[i];
	      var thisRule = prefix.toUpperCase() + '_' + rule;

	      if (thisRule in cssrule) {
	        return '@-' + prefix.toLowerCase() + '-' + prop;
	      }
	    }

	    return false;
	  };

	  ModernizrProto.atRule = atRule;

	  

	  /**
	   * prefixed returns the prefixed or nonprefixed property name variant of your input
	   *
	   * @memberof Modernizr
	   * @name Modernizr.prefixed
	   * @optionName Modernizr.prefixed()
	   * @optionProp prefixed
	   * @access public
	   * @function prefixed
	   * @param {string} prop - String name of the property to test for
	   * @param {object} [obj] - An object to test for the prefixed properties on
	   * @param {HTMLElement} [elem] - An element used to test specific properties against
	   * @returns {string|false} The string representing the (possibly prefixed) valid
	   * version of the property, or `false` when it is unsupported.
	   * @example
	   *
	   * Modernizr.prefixed takes a string css value in the DOM style camelCase (as
	   * opposed to the css style kebab-case) form and returns the (possibly prefixed)
	   * version of that property that the browser actually supports.
	   *
	   * For example, in older Firefox...
	   * ```
	   * prefixed('boxSizing')
	   * ```
	   * returns 'MozBoxSizing'
	   *
	   * In newer Firefox, as well as any other browser that support the unprefixed
	   * version would simply return `boxSizing`. Any browser that does not support
	   * the property at all, it will return `false`.
	   *
	   * By default, prefixed is checked against a DOM element. If you want to check
	   * for a property on another object, just pass it as a second argument
	   *
	   * ```js
	   * var rAF = prefixed('requestAnimationFrame', window);
	   *
	   * raf(function() {
	   *  renderFunction();
	   * })
	   * ```
	   *
	   * Note that this will return _the actual function_ - not the name of the function.
	   * If you need the actual name of the property, pass in `false` as a third argument
	   *
	   * ```js
	   * var rAFProp = prefixed('requestAnimationFrame', window, false);
	   *
	   * rafProp === 'WebkitRequestAnimationFrame' // in older webkit
	   * ```
	   *
	   * One common use case for prefixed is if you're trying to determine which transition
	   * end event to bind to, you might do something like...
	   * ```js
	   * var transEndEventNames = {
	   *     'WebkitTransition' : 'webkitTransitionEnd', * Saf 6, Android Browser
	   *     'MozTransition'    : 'transitionend',       * only for FF < 15
	   *     'transition'       : 'transitionend'        * IE10, Opera, Chrome, FF 15+, Saf 7+
	   * };
	   *
	   * var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
	   * ```
	   *
	   * If you want a similar lookup, but in kebab-case, you can use [prefixedCSS](#modernizr-prefixedcss).
	   */

	  var prefixed = ModernizrProto.prefixed = function(prop, obj, elem) {
	    if (prop.indexOf('@') === 0) {
	      return atRule(prop);
	    }

	    if (prop.indexOf('-') != -1) {
	      // Convert kebab-case to camelCase
	      prop = cssToDOM(prop);
	    }
	    if (!obj) {
	      return testPropsAll(prop, 'pfx');
	    } else {
	      // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
	      return testPropsAll(prop, obj, elem);
	    }
	  };

	  
	/*!
	{
	  "name": "Filesystem API",
	  "property": "filesystem",
	  "caniuse": "filesystem",
	  "notes": [{
	    "name": "W3 Draft",
	    "href": "http://dev.w3.org/2009/dap/file-system/file-dir-sys.html"
	  }],
	  "authors": ["Eric Bidelman (@ebidel)"],
	  "tags": ["file"],
	  "builderAliases": ["file_filesystem"],
	  "knownBugs": ["The API will be present in Chrome incognito, but will throw an exception. See crbug.com/93417"]
	}
	!*/

	  Modernizr.addTest('filesystem', !!prefixed('requestFileSystem', window));


	  /**
	   * hasOwnProp is a shim for hasOwnProperty that is needed for Safari 2.0 support
	   *
	   * @author kangax
	   * @access private
	   * @function hasOwnProp
	   * @param {object} object - The object to check for a property
	   * @param {string} property - The property to check for
	   * @returns {boolean}
	   */

	  // hasOwnProperty shim by kangax needed for Safari 2.0 support
	  var hasOwnProp;

	  (function() {
	    var _hasOwnProperty = ({}).hasOwnProperty;
	    /* istanbul ignore else */
	    /* we have no way of testing IE 5.5 or safari 2,
	     * so just assume the else gets hit */
	    if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
	      hasOwnProp = function(object, property) {
	        return _hasOwnProperty.call(object, property);
	      };
	    }
	    else {
	      hasOwnProp = function(object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
	        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
	      };
	    }
	  })();

	  

	  /**
	   * setClasses takes an array of class names and adds them to the root element
	   *
	   * @access private
	   * @function setClasses
	   * @param {string[]} classes - Array of class names
	   */

	  // Pass in an and array of class names, e.g.:
	  //  ['no-webp', 'borderradius', ...]
	  function setClasses(classes) {
	    var className = docElement.className;
	    var classPrefix = Modernizr._config.classPrefix || '';

	    if (isSVG) {
	      className = className.baseVal;
	    }

	    // Change `no-js` to `js` (independently of the `enableClasses` option)
	    // Handle classPrefix on this too
	    if (Modernizr._config.enableJSClass) {
	      var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
	      className = className.replace(reJS, '$1' + classPrefix + 'js$2');
	    }

	    if (Modernizr._config.enableClasses) {
	      // Add the new classes
	      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
	      isSVG ? docElement.className.baseVal = className : docElement.className = className;
	    }

	  }

	  ;


	   // _l tracks listeners for async tests, as well as tests that execute after the initial run
	  ModernizrProto._l = {};

	  /**
	   * Modernizr.on is a way to listen for the completion of async tests. Being
	   * asynchronous, they may not finish before your scripts run. As a result you
	   * will get a possibly false negative `undefined` value.
	   *
	   * @memberof Modernizr
	   * @name Modernizr.on
	   * @access public
	   * @function on
	   * @param {string} feature - String name of the feature detect
	   * @param {function} cb - Callback function returning a Boolean - true if feature is supported, false if not
	   * @example
	   *
	   * ```js
	   * Modernizr.on('flash', function( result ) {
	   *   if (result) {
	   *    // the browser has flash
	   *   } else {
	   *     // the browser does not have flash
	   *   }
	   * });
	   * ```
	   */

	  ModernizrProto.on = function(feature, cb) {
	    // Create the list of listeners if it doesn't exist
	    if (!this._l[feature]) {
	      this._l[feature] = [];
	    }

	    // Push this test on to the listener list
	    this._l[feature].push(cb);

	    // If it's already been resolved, trigger it on next tick
	    if (Modernizr.hasOwnProperty(feature)) {
	      // Next Tick
	      setTimeout(function() {
	        Modernizr._trigger(feature, Modernizr[feature]);
	      }, 0);
	    }
	  };

	  /**
	   * _trigger is the private function used to signal test completion and run any
	   * callbacks registered through [Modernizr.on](#modernizr-on)
	   *
	   * @memberof Modernizr
	   * @name Modernizr._trigger
	   * @access private
	   * @function _trigger
	   * @param {string} feature - string name of the feature detect
	   * @param {function|boolean} [res] - A feature detection function, or the boolean =
	   * result of a feature detection function
	   */

	  ModernizrProto._trigger = function(feature, res) {
	    if (!this._l[feature]) {
	      return;
	    }

	    var cbs = this._l[feature];

	    // Force async
	    setTimeout(function() {
	      var i, cb;
	      for (i = 0; i < cbs.length; i++) {
	        cb = cbs[i];
	        cb(res);
	      }
	    }, 0);

	    // Don't trigger these again
	    delete this._l[feature];
	  };

	  /**
	   * addTest allows you to define your own feature detects that are not currently
	   * included in Modernizr (under the covers it's the exact same code Modernizr
	   * uses for its own [feature detections](https://github.com/Modernizr/Modernizr/tree/master/feature-detects)). Just like the offical detects, the result
	   * will be added onto the Modernizr object, as well as an appropriate className set on
	   * the html element when configured to do so
	   *
	   * @memberof Modernizr
	   * @name Modernizr.addTest
	   * @optionName Modernizr.addTest()
	   * @optionProp addTest
	   * @access public
	   * @function addTest
	   * @param {string|object} feature - The string name of the feature detect, or an
	   * object of feature detect names and test
	   * @param {function|boolean} test - Function returning true if feature is supported,
	   * false if not. Otherwise a boolean representing the results of a feature detection
	   * @example
	   *
	   * The most common way of creating your own feature detects is by calling
	   * `Modernizr.addTest` with a string (preferably just lowercase, without any
	   * punctuation), and a function you want executed that will return a boolean result
	   *
	   * ```js
	   * Modernizr.addTest('itsTuesday', function() {
	   *  var d = new Date();
	   *  return d.getDay() === 2;
	   * });
	   * ```
	   *
	   * When the above is run, it will set Modernizr.itstuesday to `true` when it is tuesday,
	   * and to `false` every other day of the week. One thing to notice is that the names of
	   * feature detect functions are always lowercased when added to the Modernizr object. That
	   * means that `Modernizr.itsTuesday` will not exist, but `Modernizr.itstuesday` will.
	   *
	   *
	   *  Since we only look at the returned value from any feature detection function,
	   *  you do not need to actually use a function. For simple detections, just passing
	   *  in a statement that will return a boolean value works just fine.
	   *
	   * ```js
	   * Modernizr.addTest('hasJquery', 'jQuery' in window);
	   * ```
	   *
	   * Just like before, when the above runs `Modernizr.hasjquery` will be true if
	   * jQuery has been included on the page. Not using a function saves a small amount
	   * of overhead for the browser, as well as making your code much more readable.
	   *
	   * Finally, you also have the ability to pass in an object of feature names and
	   * their tests. This is handy if you want to add multiple detections in one go.
	   * The keys should always be a string, and the value can be either a boolean or
	   * function that returns a boolean.
	   *
	   * ```js
	   * var detects = {
	   *  'hasjquery': 'jQuery' in window,
	   *  'itstuesday': function() {
	   *    var d = new Date();
	   *    return d.getDay() === 2;
	   *  }
	   * }
	   *
	   * Modernizr.addTest(detects);
	   * ```
	   *
	   * There is really no difference between the first methods and this one, it is
	   * just a convenience to let you write more readable code.
	   */

	  function addTest(feature, test) {

	    if (typeof feature == 'object') {
	      for (var key in feature) {
	        if (hasOwnProp(feature, key)) {
	          addTest(key, feature[ key ]);
	        }
	      }
	    } else {

	      feature = feature.toLowerCase();
	      var featureNameSplit = feature.split('.');
	      var last = Modernizr[featureNameSplit[0]];

	      // Again, we don't check for parent test existence. Get that right, though.
	      if (featureNameSplit.length == 2) {
	        last = last[featureNameSplit[1]];
	      }

	      if (typeof last != 'undefined') {
	        // we're going to quit if you're trying to overwrite an existing test
	        // if we were to allow it, we'd do this:
	        //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
	        //   docElement.className = docElement.className.replace( re, '' );
	        // but, no rly, stuff 'em.
	        return Modernizr;
	      }

	      test = typeof test == 'function' ? test() : test;

	      // Set the value (this is the magic, right here).
	      if (featureNameSplit.length == 1) {
	        Modernizr[featureNameSplit[0]] = test;
	      } else {
	        // cast to a Boolean, if not one already
	        /* jshint -W053 */
	        if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
	          Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
	        }

	        Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;
	      }

	      // Set a single class (either `feature` or `no-feature`)
	      /* jshint -W041 */
	      setClasses([(!!test && test != false ? '' : 'no-') + featureNameSplit.join('-')]);
	      /* jshint +W041 */

	      // Trigger the event
	      Modernizr._trigger(feature, test);
	    }

	    return Modernizr; // allow chaining.
	  }

	  // After all the tests are run, add self to the Modernizr prototype
	  Modernizr._q.push(function() {
	    ModernizrProto.addTest = addTest;
	  });

	  

	/*!
	  {
	  "name": "Flash",
	  "property": "flash",
	  "tags": ["flash"],
	  "polyfills": ["shumway"]
	  }
	  !*/
	/* DOC
	Detects Flash support as well as Flash-blocking plugins
	*/

	  Modernizr.addAsyncTest(function() {
	    /* jshint -W053 */

	    var attachBody = function(body) {
	      if (!docElement.contains(body)) {
	        docElement.appendChild(body);
	      }
	    };
	    var removeFakeBody = function(body) {
	      // If we’re rockin’ an attached fake body, clean it up
	      if (body.fake && body.parentNode) {
	        body.parentNode.removeChild(body);
	      }
	    };
	    var runTest = function(result, embed) {
	      var bool = !!result;
	      if (bool) {
	        bool = new Boolean(bool);
	        bool.blocked = (result === 'blocked');
	      }
	      addTest('flash', function() { return bool; });

	      if (embed && body.contains(embed)) {

	        // in case embed has been wrapped, as with ClickToPlugin
	        while (embed.parentNode !== body) {
	          embed = embed.parentNode;
	        }

	        body.removeChild(embed);
	      }

	    };
	    var easy_detect;
	    var activex;
	    // we wrap activex in a try/catch because when Flash is disabled through
	    // ActiveX controls, it throws an error.
	    try {
	      // Pan is an API that exists for Flash objects.
	      activex = 'ActiveXObject' in window && 'Pan' in new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	    } catch (e) {}

	    easy_detect = !(('plugins' in navigator && 'Shockwave Flash' in navigator.plugins) || activex);

	    if (easy_detect || isSVG) {
	      runTest(false);
	    }
	    else {
	      // Flash seems to be installed, but it might be blocked. We have to
	      // actually create an element to see what happens to it.
	      var embed = createElement('embed');
	      var body = getBody();
	      var blockedDetect;
	      var inline_style;

	      embed.type = 'application/x-shockwave-flash';

	      // Need to do this in the body (fake or otherwise) otherwise IE8 complains
	      body.appendChild(embed);

	      // Pan doesn't exist in the embed if its IE (its on the ActiveXObjeect)
	      // so this check is for all other browsers.
	      if (!('Pan' in embed) && !activex) {
	        attachBody(body);
	        runTest('blocked', embed);
	        removeFakeBody(body);
	        return;
	      }

	      blockedDetect = function() {
	        // if we used a fake body originally, we need to restart this test, since
	        // we haven't been attached to the DOM, and therefore none of the blockers
	        // have had time to work.
	        attachBody(body);
	        if (!docElement.contains(body)) {
	          body = document.body || body;
	          embed = createElement('embed');
	          embed.type = 'application/x-shockwave-flash';
	          body.appendChild(embed);
	          return setTimeout(blockedDetect, 1000);
	        }
	        if (!docElement.contains(embed)) {
	          runTest('blocked');
	        }
	        else {
	          inline_style = embed.style.cssText;
	          if (inline_style !== '') {
	            // the style of the element has changed automatically. This is a
	            // really poor heuristic, but for lower end Flash blocks, it the
	            // only change they can make.
	            runTest('blocked', embed);
	          }
	          else {
	            runTest(true, embed);
	          }
	        }
	        removeFakeBody(body);
	      };

	      // If we have got this far, there is still a chance a userland plugin
	      // is blocking us (either changing the styles, or automatically removing
	      // the element). Both of these require us to take a step back for a moment
	      // to allow for them to get time of the thread, hence a setTimeout.
	      //
	      setTimeout(blockedDetect, 10);
	    }
	  });

	/*!
	{
	  "name": "placeholder attribute",
	  "property": "placeholder",
	  "tags": ["forms", "attribute"],
	  "builderAliases": ["forms_placeholder"]
	}
	!*/
	/* DOC
	Tests for placeholder attribute in inputs and textareas
	*/

	  Modernizr.addTest('placeholder', ('placeholder' in createElement('input') && 'placeholder' in createElement('textarea')));

	/*!
	{
	  "name": "Fullscreen API",
	  "property": "fullscreen",
	  "caniuse": "fullscreen",
	  "notes": [{
	    "name": "MDN documentation",
	    "href": "https://developer.mozilla.org/en/API/Fullscreen"
	  }],
	  "polyfills": ["screenfulljs"],
	  "builderAliases": ["fullscreen_api"]
	}
	!*/
	/* DOC
	Detects support for the ability to make the current website take over the user's entire screen
	*/

	  // github.com/Modernizr/Modernizr/issues/739
	  Modernizr.addTest('fullscreen', !!(prefixed('exitFullscreen', document, false) || prefixed('cancelFullScreen', document, false)));

	/*!
	{
	  "name": "Geolocation API",
	  "property": "geolocation",
	  "caniuse": "geolocation",
	  "tags": ["media"],
	  "notes": [{
	    "name": "MDN documentation",
	    "href": "https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation"
	  }],
	  "polyfills": [
	    "joshuabell-polyfill",
	    "webshims",
	    "geo-location-javascript",
	    "geolocation-api-polyfill"
	  ]
	}
	!*/
	/* DOC
	Detects support for the Geolocation API for users to provide their location to web applications.
	*/

	  // geolocation is often considered a trivial feature detect...
	  // Turns out, it's quite tricky to get right:
	  //
	  // Using !!navigator.geolocation does two things we don't want. It:
	  //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
	  //   2. Disables page caching in WebKit: webk.it/43956
	  //
	  // Meanwhile, in Firefox < 8, an about:config setting could expose
	  // a false positive that would throw an exception: bugzil.la/688158

	  Modernizr.addTest('geolocation', 'geolocation' in navigator);


	  /**
	   * Modernizr.hasEvent() detects support for a given event
	   *
	   * @memberof Modernizr
	   * @name Modernizr.hasEvent
	   * @optionName Modernizr.hasEvent()
	   * @optionProp hasEvent
	   * @access public
	   * @function hasEvent
	   * @param  {string|*} eventName - the name of an event to test for (e.g. "resize")
	   * @param  {Element|string} [element=HTMLDivElement] - is the element|document|window|tagName to test on
	   * @returns {boolean}
	   * @example
	   *  `Modernizr.hasEvent` lets you determine if the browser supports a supplied event.
	   *  By default, it does this detection on a div element
	   *
	   * ```js
	   *  hasEvent('blur') // true;
	   * ```
	   *
	   * However, you are able to give an object as a second argument to hasEvent to
	   * detect an event on something other than a div.
	   *
	   * ```js
	   *  hasEvent('devicelight', window) // true;
	   * ```
	   *
	   */

	  var hasEvent = (function() {

	    // Detect whether event support can be detected via `in`. Test on a DOM element
	    // using the "blur" event b/c it should always exist. bit.ly/event-detection
	    var needsFallback = !('onblur' in document.documentElement);

	    function inner(eventName, element) {

	      var isSupported;
	      if (!eventName) { return false; }
	      if (!element || typeof element === 'string') {
	        element = createElement(element || 'div');
	      }

	      // Testing via the `in` operator is sufficient for modern browsers and IE.
	      // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and
	      // "resize", whereas `in` "catches" those.
	      eventName = 'on' + eventName;
	      isSupported = eventName in element;

	      // Fallback technique for old Firefox - bit.ly/event-detection
	      if (!isSupported && needsFallback) {
	        if (!element.setAttribute) {
	          // Switch to generic element if it lacks `setAttribute`.
	          // It could be the `document`, `window`, or something else.
	          element = createElement('div');
	        }

	        element.setAttribute(eventName, '');
	        isSupported = typeof element[eventName] === 'function';

	        if (element[eventName] !== undefined) {
	          // If property was created, "remove it" by setting value to `undefined`.
	          element[eventName] = undefined;
	        }
	        element.removeAttribute(eventName);
	      }

	      return isSupported;
	    }
	    return inner;
	  })();


	  ModernizrProto.hasEvent = hasEvent;
	  
	/*!
	{
	  "name": "Hashchange event",
	  "property": "hashchange",
	  "caniuse": "hashchange",
	  "tags": ["history"],
	  "notes": [{
	    "name": "MDN documentation",
	    "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.onhashchange"
	  }],
	  "polyfills": [
	    "jquery-hashchange",
	    "moo-historymanager",
	    "jquery-ajaxy",
	    "hasher",
	    "shistory"
	  ]
	}
	!*/
	/* DOC
	Detects support for the `hashchange` event, fired when the current location fragment changes.
	*/

	  Modernizr.addTest('hashchange', function() {
	    if (hasEvent('hashchange', window) === false) {
	      return false;
	    }

	    // documentMode logic from YUI to filter out IE8 Compat Mode
	    //   which false positives.
	    return (document.documentMode === undefined || document.documentMode > 7);
	  });

	/*!
	{
	  "name": "History API",
	  "property": "history",
	  "caniuse": "history",
	  "tags": ["history"],
	  "authors": ["Hay Kranen", "Alexander Farkas"],
	  "notes": [{
	    "name": "W3C Spec",
	    "href": "https://www.w3.org/TR/html51/browsers.html#the-history-interface"
	  }, {
	    "name": "MDN documentation",
	    "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.history"
	  }],
	  "polyfills": ["historyjs", "html5historyapi"]
	}
	!*/
	/* DOC
	Detects support for the History API for manipulating the browser session history.
	*/

	  Modernizr.addTest('history', function() {
	    // Issue #733
	    // The stock browser on Android 2.2 & 2.3, and 4.0.x returns positive on history support
	    // Unfortunately support is really buggy and there is no clean way to detect
	    // these bugs, so we fall back to a user agent sniff :(
	    var ua = navigator.userAgent;

	    // We only want Android 2 and 4.0, stock browser, and not Chrome which identifies
	    // itself as 'Mobile Safari' as well, nor Windows Phone (issue #1471).
	    if ((ua.indexOf('Android 2.') !== -1 ||
	        (ua.indexOf('Android 4.0') !== -1)) &&
	        ua.indexOf('Mobile Safari') !== -1 &&
	        ua.indexOf('Chrome') === -1 &&
	        ua.indexOf('Windows Phone') === -1) {
	      return false;
	    }

	    // Return the regular check
	    return (window.history && 'pushState' in window.history);
	  });

	/*!
	{
	  "name": "Webp",
	  "async": true,
	  "property": "webp",
	  "tags": ["image"],
	  "builderAliases": ["img_webp"],
	  "authors": ["Krister Kari", "@amandeep", "Rich Bradshaw", "Ryan Seddon", "Paul Irish"],
	  "notes": [{
	    "name": "Webp Info",
	    "href": "https://developers.google.com/speed/webp/"
	  }, {
	    "name": "Chormium blog - Chrome 32 Beta: Animated WebP images and faster Chrome for Android touch input",
	    "href": "https://blog.chromium.org/2013/11/chrome-32-beta-animated-webp-images-and.html"
	  }, {
	    "name": "Webp Lossless Spec",
	    "href": "https://developers.google.com/speed/webp/docs/webp_lossless_bitstream_specification"
	  }, {
	    "name": "Article about WebP support on Android browsers",
	    "href": "http://www.wope-framework.com/en/2013/06/24/webp-support-on-android-browsers/"
	  }, {
	    "name": "Chormium WebP announcement",
	    "href": "https://blog.chromium.org/2011/11/lossless-and-transparency-encoding-in.html?m=1"
	  }]
	}
	!*/
	/* DOC
	Tests for lossy, non-alpha webp support.

	Tests for all forms of webp support (lossless, lossy, alpha, and animated)..

	  Modernizr.webp              // Basic support (lossy)
	  Modernizr.webp.lossless     // Lossless
	  Modernizr.webp.alpha        // Alpha (both lossy and lossless)
	  Modernizr.webp.animation    // Animated WebP

	*/


	  Modernizr.addAsyncTest(function() {

	    var webpTests = [{
	      'uri': 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=',
	      'name': 'webp'
	    }, {
	      'uri': 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==',
	      'name': 'webp.alpha'
	    }, {
	      'uri': 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
	      'name': 'webp.animation'
	    }, {
	      'uri': 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=',
	      'name': 'webp.lossless'
	    }];

	    var webp = webpTests.shift();
	    function test(name, uri, cb) {

	      var image = new Image();

	      function addResult(event) {
	        // if the event is from 'onload', check the see if the image's width is
	        // 1 pixel (which indiciates support). otherwise, it fails

	        var result = event && event.type === 'load' ? image.width == 1 : false;
	        var baseTest = name === 'webp';

	        /* jshint -W053 */
	        addTest(name, baseTest ? new Boolean(result) : result);

	        if (cb) {
	          cb(event);
	        }
	      }

	      image.onerror = addResult;
	      image.onload = addResult;

	      image.src = uri;
	    }

	    // test for webp support in general
	    test(webp.name, webp.uri, function(e) {
	      // if the webp test loaded, test everything else.
	      if (e && e.type === 'load') {
	        for (var i = 0; i < webpTests.length; i++) {
	          test(webpTests[i].name, webpTests[i].uri);
	        }
	      }
	    });

	  });


	/*!
	{
	  "name": "Webp Alpha",
	  "async": true,
	  "property": "webpalpha",
	  "aliases": ["webp-alpha"],
	  "tags": ["image"],
	  "authors": ["Krister Kari", "Rich Bradshaw", "Ryan Seddon", "Paul Irish"],
	  "notes": [{
	    "name": "WebP Info",
	    "href": "https://developers.google.com/speed/webp/"
	  },{
	    "name": "Article about WebP support on Android browsers",
	    "href": "http://www.wope-framework.com/en/2013/06/24/webp-support-on-android-browsers/"
	  },{
	    "name": "Chromium WebP announcement",
	    "href": "https://blog.chromium.org/2011/11/lossless-and-transparency-encoding-in.html?m=1"
	  }]
	}
	!*/
	/* DOC
	Tests for transparent webp support.
	*/

	  Modernizr.addAsyncTest(function() {
	    var image = new Image();

	    image.onerror = function() {
	      addTest('webpalpha', false, {aliases: ['webp-alpha']});
	    };

	    image.onload = function() {
	      addTest('webpalpha', image.width == 1, {aliases: ['webp-alpha']});
	    };

	    image.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==';
	  });

	/*!
	{
	  "name": "IndexedDB",
	  "property": "indexeddb",
	  "caniuse": "indexeddb",
	  "tags": ["storage"],
	  "polyfills": ["indexeddb"]
	}
	!*/
	/* DOC
	Detects support for the IndexedDB client-side storage API (final spec).
	*/

	  // Vendors had inconsistent prefixing with the experimental Indexed DB:
	  // - Webkit's implementation is accessible through webkitIndexedDB
	  // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
	  // For speed, we don't test the legacy (and beta-only) indexedDB

	  var indexeddb;
	  try {
	    indexeddb = prefixed('indexedDB', window);
	  } catch (e) {
	  }

	  Modernizr.addTest('indexeddb', !!indexeddb);

	  if (!!indexeddb) {
	    Modernizr.addTest('indexeddb.deletedatabase', 'deleteDatabase' in indexeddb);
	  }
	;
	/*!
	{
	  "name": "JSON",
	  "property": "json",
	  "caniuse": "json",
	  "notes": [{
	    "name": "MDN documentation",
	    "href": "https://developer.mozilla.org/en-US/docs/Glossary/JSON"
	  }],
	  "polyfills": ["json2"]
	}
	!*/
	/* DOC
	Detects native support for JSON handling functions.
	*/

	  // this will also succeed if you've loaded the JSON2.js polyfill ahead of time
	  //   ... but that should be obvious. :)

	  Modernizr.addTest('json', 'JSON' in window && 'parse' in JSON && 'stringify' in JSON);

	/*!
	{
	  "name": "Fetch API",
	  "property": "fetch",
	  "tags": ["network"],
	  "caniuse": "fetch",
	  "notes": [{
	    "name": "Fetch Living Standard",
	    "href": "https://fetch.spec.whatwg.org/"
	  }],
	  "polyfills": ["fetch"]
	}
	!*/
	/* DOC
	Detects support for the fetch API, a modern replacement for XMLHttpRequest.
	*/

	  Modernizr.addTest('fetch', 'fetch' in window);

	/*!
	{
	  "name": "XML HTTP Request Level 2 XHR2",
	  "property": "xhr2",
	  "tags": ["network"],
	  "builderAliases": ["network_xhr2"],
	  "notes": [{
	    "name": "W3 Spec",
	    "href": "https://www.w3.org/TR/XMLHttpRequest2/"
	  },{
	    "name": "Details on Related Github Issue",
	    "href": "https://github.com/Modernizr/Modernizr/issues/385"
	  }]
	}
	!*/
	/* DOC
	Tests for XHR2.
	*/

	  // all three of these details report consistently across all target browsers:
	  //   !!(window.ProgressEvent);
	  //   'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest
	  Modernizr.addTest('xhr2', 'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest());

	/*!
	{
	  "name": "Notification",
	  "property": "notification",
	  "caniuse": "notifications",
	  "authors": ["Theodoor van Donge", "Hendrik Beskow"],
	  "notes": [{
	    "name": "HTML5 Rocks tutorial",
	    "href": "http://www.html5rocks.com/en/tutorials/notifications/quick/"
	  },{
	    "name": "W3C spec",
	    "href": "https://www.w3.org/TR/notifications/"
	  }, {
	    "name": "Changes in Chrome to Notifications API due to Service Worker Push Notifications",
	    "href": "https://developers.google.com/web/updates/2015/05/Notifying-you-of-notificiation-changes"
	  }],
	  "knownBugs": [
	    "Possibility of false-positive on Chrome for Android if permissions we're granted for a website prior to Chrome 44."
	  ],
	  "polyfills": ["desktop-notify", "html5-notifications"]
	}
	!*/
	/* DOC
	Detects support for the Notifications API
	*/

	  Modernizr.addTest('notification', function() {
	    if (!window.Notification || !window.Notification.requestPermission) {
	      return false;
	    }
	    // if permission is already granted, assume support
	    if (window.Notification.permission === 'granted') {
	      return true;
	    }

	    try {
	      new window.Notification('');
	    } catch (e) {
	      if (e.name === 'TypeError') {
	        return false;
	      }
	    }

	    return true;
	  });

	/*!
	{
	  "name": "Navigation Timing API",
	  "property": "performance",
	  "caniuse": "nav-timing",
	  "tags": ["performance"],
	  "authors": ["Scott Murphy (@uxder)"],
	  "notes": [{
	    "name": "W3C Spec",
	    "href": "https://www.w3.org/TR/navigation-timing/"
	  },{
	    "name": "HTML5 Rocks article",
	    "href": "http://www.html5rocks.com/en/tutorials/webperformance/basics/"
	  }],
	  "polyfills": ["perfnow"]
	}
	!*/
	/* DOC
	Detects support for the Navigation Timing API, for measuring browser and connection performance.
	*/

	  Modernizr.addTest('performance', !!prefixed('performance', window));

	/*!
	{
	  "name": "DOM Pointer Events API",
	  "property": "pointerevents",
	  "tags": ["input"],
	  "authors": ["Stu Cox"],
	  "notes": [
	    {
	      "name": "W3C spec",
	      "href": "https://www.w3.org/TR/pointerevents/"
	    }
	  ],
	  "warnings": ["This property name now refers to W3C DOM PointerEvents: https://github.com/Modernizr/Modernizr/issues/548#issuecomment-12812099"],
	  "polyfills": ["handjs"]
	}
	!*/
	/* DOC
	Detects support for the DOM Pointer Events API, which provides a unified event interface for pointing input devices, as implemented in IE10+.
	*/

	  // **Test name hijacked!**
	  // Now refers to W3C DOM PointerEvents spec rather than the CSS pointer-events property.
	  Modernizr.addTest('pointerevents', function() {
	    // Cannot use `.prefixed()` for events, so test each prefix
	    var bool = false,
	    i = domPrefixes.length;

	    // Don't forget un-prefixed...
	    bool = Modernizr.hasEvent('pointerdown');

	    while (i-- && !bool) {
	      if (hasEvent(domPrefixes[i] + 'pointerdown')) {
	        bool = true;
	      }
	    }
	    return bool;
	  });

	/*!
	{
	  "name": "QuerySelector",
	  "property": "queryselector",
	  "caniuse": "queryselector",
	  "tags": ["queryselector"],
	  "authors": ["Andrew Betts (@triblondon)"],
	  "notes": [{
	    "name" : "W3C Selectors reference",
	    "href": "https://www.w3.org/TR/selectors-api/#queryselectorall"
	  }],
	  "polyfills": ["css-selector-engine"]
	}
	!*/
	/* DOC
	Detects support for querySelector.
	*/

	  Modernizr.addTest('queryselector', 'querySelector' in document && 'querySelectorAll' in document);

	/*!
	{
	  "name": "script[async]",
	  "property": "scriptasync",
	  "caniuse": "script-async",
	  "tags": ["script"],
	  "builderAliases": ["script_async"],
	  "authors": ["Theodoor van Donge"]
	}
	!*/
	/* DOC
	Detects support for the `async` attribute on the `<script>` element.
	*/

	  Modernizr.addTest('scriptasync', 'async' in createElement('script'));

	/*!
	{
	  "name": "script[defer]",
	  "property": "scriptdefer",
	  "caniuse": "script-defer",
	  "tags": ["script"],
	  "builderAliases": ["script_defer"],
	  "authors": ["Theodoor van Donge"],
	  "warnings": ["Browser implementation of the `defer` attribute vary: https://stackoverflow.com/questions/3952009/defer-attribute-chrome#answer-3982619"],
	  "knownBugs": ["False positive in Opera 12"]
	}
	!*/
	/* DOC
	Detects support for the `defer` attribute on the `<script>` element.
	*/

	  Modernizr.addTest('scriptdefer', 'defer' in createElement('script'));

	/*!
	{
	  "name": "ServiceWorker API",
	  "property": "serviceworker",
	  "notes": [{
	    "name": "ServiceWorkers Explained",
	    "href": "https://github.com/slightlyoff/ServiceWorker/blob/master/explainer.md"
	  }]
	}
	!*/
	/* DOC
	ServiceWorkers (formerly Navigation Controllers) are a way to persistently cache resources to built apps that work better offline.
	*/

	  Modernizr.addTest('serviceworker', 'serviceWorker' in navigator);

	/*!
	{
	  "name": "Local Storage",
	  "property": "localstorage",
	  "caniuse": "namevalue-storage",
	  "tags": ["storage"],
	  "knownBugs": [],
	  "notes": [],
	  "warnings": [],
	  "polyfills": [
	    "joshuabell-polyfill",
	    "cupcake",
	    "storagepolyfill",
	    "amplifyjs",
	    "yui-cacheoffline"
	  ]
	}
	!*/

	  // In FF4, if disabled, window.localStorage should === null.

	  // Normally, we could not test that directly and need to do a
	  //   `('localStorage' in window) && ` test first because otherwise Firefox will
	  //   throw bugzil.la/365772 if cookies are disabled

	  // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
	  // will throw the exception:
	  //   QUOTA_EXCEEDED_ERROR DOM Exception 22.
	  // Peculiarly, getItem and removeItem calls do not throw.

	  // Because we are forced to try/catch this, we'll go aggressive.

	  // Just FWIW: IE8 Compat mode supports these features completely:
	  //   www.quirksmode.org/dom/html5.html
	  // But IE8 doesn't support either with local files

	  Modernizr.addTest('localstorage', function() {
	    var mod = 'modernizr';
	    try {
	      localStorage.setItem(mod, mod);
	      localStorage.removeItem(mod);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  });

	/*!
	{
	  "name": "Session Storage",
	  "property": "sessionstorage",
	  "tags": ["storage"],
	  "polyfills": ["joshuabell-polyfill", "cupcake", "sessionstorage"]
	}
	!*/

	  // Because we are forced to try/catch this, we'll go aggressive.

	  // Just FWIW: IE8 Compat mode supports these features completely:
	  //   www.quirksmode.org/dom/html5.html
	  // But IE8 doesn't support either with local files
	  Modernizr.addTest('sessionstorage', function() {
	    var mod = 'modernizr';
	    try {
	      sessionStorage.setItem(mod, mod);
	      sessionStorage.removeItem(mod);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  });

	/*!
	{
	  "name": "Web SQL Database",
	  "property": "websqldatabase",
	  "caniuse": "sql-storage",
	  "tags": ["storage"]
	}
	!*/

	  // Chrome incognito mode used to throw an exception when using openDatabase
	  // It doesn't anymore.
	  Modernizr.addTest('websqldatabase', 'openDatabase' in window);

	/*!
	{
	  "name": "style[scoped]",
	  "property": "stylescoped",
	  "caniuse": "style-scoped",
	  "tags": ["dom"],
	  "builderAliases": ["style_scoped"],
	  "authors": ["Cătălin Mariș"],
	  "notes": [{
	    "name": "WHATWG Specification",
	    "href": "https://html.spec.whatwg.org/multipage/semantics.html#attr-style-scoped"
	  }],
	  "polyfills": ["scoped-styles"]
	}
	!*/
	/* DOC
	Support for the `scoped` attribute of the `<style>` element.
	*/

	  Modernizr.addTest('stylescoped', 'scoped' in createElement('style'));

	/*!
	{
	  "name": "SVG",
	  "property": "svg",
	  "caniuse": "svg",
	  "tags": ["svg"],
	  "authors": ["Erik Dahlstrom"],
	  "polyfills": [
	    "svgweb",
	    "raphael",
	    "amplesdk",
	    "canvg",
	    "svg-boilerplate",
	    "sie",
	    "dojogfx",
	    "fabricjs"
	  ]
	}
	!*/
	/* DOC
	Detects support for SVG in `<embed>` or `<object>` elements.
	*/

	  Modernizr.addTest('svg', !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);

	/*!
	{
	  "name": "Template strings",
	  "property": "templatestrings",
	  "notes": [{
	    "name": "MDN Reference",
	    "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings#Browser_compatibility"
	  }]
	}
	!*/
	/* DOC
	Template strings are string literals allowing embedded expressions.
	*/

	  Modernizr.addTest('templatestrings', function() {
	    var supports;
	    try {
	      // A number of tools, including uglifyjs and require, break on a raw "`", so
	      // use an eval to get around that.
	      eval('``');
	      supports = true;
	    } catch (e) {}
	    return !!supports;
	  });

	/*!
	{
	  "name": "Touch Events",
	  "property": "touchevents",
	  "caniuse" : "touch",
	  "tags": ["media", "attribute"],
	  "notes": [{
	    "name": "Touch Events spec",
	    "href": "https://www.w3.org/TR/2013/WD-touch-events-20130124/"
	  }],
	  "warnings": [
	    "Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
	  ],
	  "knownBugs": [
	    "False-positive on some configurations of Nokia N900",
	    "False-positive on some BlackBerry 6.0 builds – https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
	  ]
	}
	!*/
	/* DOC
	Indicates if the browser supports the W3C Touch Events API.

	This *does not* necessarily reflect a touchscreen device:

	* Older touchscreen devices only emulate mouse events
	* Modern IE touch devices implement the Pointer Events API instead: use `Modernizr.pointerevents` to detect support for that
	* Some browsers & OS setups may enable touch APIs when no touchscreen is connected
	* Future browsers may implement other event models for touch interactions

	See this article: [You Can't Detect A Touchscreen](http://www.stucox.com/blog/you-cant-detect-a-touchscreen/).

	It's recommended to bind both mouse and touch/pointer events simultaneously – see [this HTML5 Rocks tutorial](http://www.html5rocks.com/en/mobile/touchandmouse/).

	This test will also return `true` for Firefox 4 Multitouch support.
	*/

	  // Chrome (desktop) used to lie about its support on this, but that has since been rectified: http://crbug.com/36415
	  Modernizr.addTest('touchevents', function() {
	    var bool;
	    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
	      bool = true;
	    } else {
	      // include the 'heartz' as a way to have a non matching MQ to help terminate the join
	      // https://git.io/vznFH
	      var query = ['@media (', prefixes.join('touch-enabled),('), 'heartz', ')', '{#modernizr{top:9px;position:absolute}}'].join('');
	      testStyles(query, function(node) {
	        bool = node.offsetTop === 9;
	      });
	    }
	    return bool;
	  });

	/*!
	{
	  "name": "Typed arrays",
	  "property": "typedarrays",
	  "caniuse": "typedarrays",
	  "tags": ["js"],
	  "authors": ["Stanley Stuart (@fivetanley)"],
	  "notes": [{
	    "name": "MDN documentation",
	    "href": "https://developer.mozilla.org/en-US/docs/JavaScript_typed_arrays"
	  },{
	    "name": "Kronos spec",
	    "href": "https://www.khronos.org/registry/typedarray/specs/latest/"
	  }],
	  "polyfills": ["joshuabell-polyfill"]
	}
	!*/
	/* DOC
	Detects support for native binary data manipulation via Typed Arrays in JavaScript.

	Does not check for DataView support; use `Modernizr.dataview` for that.
	*/

	  // Should fail in:
	  // Internet Explorer <= 9
	  // Firefox <= 3.6
	  // Chrome <= 6.0
	  // iOS Safari < 4.2
	  // Safari < 5.1
	  // Opera < 11.6
	  // Opera Mini, <= 7.0
	  // Android Browser < 4.0
	  // Blackberry Browser < 10.0

	  Modernizr.addTest('typedarrays', 'ArrayBuffer' in window);

	/*!
	{
	  "name": "Blob URLs",
	  "property": "bloburls",
	  "caniuse": "bloburls",
	  "notes": [{
	    "name": "W3C Working Draft",
	    "href": "https://www.w3.org/TR/FileAPI/#creating-revoking"
	  }],
	  "tags": ["file", "url"],
	  "authors": ["Ron Waldon (@jokeyrhyme)"]
	}
	!*/
	/* DOC
	Detects support for creating Blob URLs
	*/

	  var url = prefixed('URL', window, false);
	  url = url && window[url];
	  Modernizr.addTest('bloburls', url && 'revokeObjectURL' in url && 'createObjectURL' in url);

	/*!
	{
	  "name": "Data URI",
	  "property": "datauri",
	  "caniuse": "datauri",
	  "tags": ["url"],
	  "builderAliases": ["url_data_uri"],
	  "async": true,
	  "notes": [{
	    "name": "Wikipedia article",
	    "href": "https://en.wikipedia.org/wiki/Data_URI_scheme"
	  }],
	  "warnings": ["Support in Internet Explorer 8 is limited to images and linked resources like CSS files, not HTML files"]
	}
	!*/
	/* DOC
	Detects support for data URIs. Provides a subproperty to report support for data URIs over 32kb in size:

	```javascript
	Modernizr.datauri           // true
	Modernizr.datauri.over32kb  // false in IE8
	```
	*/

	  // https://github.com/Modernizr/Modernizr/issues/14
	  Modernizr.addAsyncTest(function() {
	    /* jshint -W053 */

	    // IE7 throw a mixed content warning on HTTPS for this test, so we'll
	    // just blacklist it (we know it doesn't support data URIs anyway)
	    // https://github.com/Modernizr/Modernizr/issues/362
	    if (navigator.userAgent.indexOf('MSIE 7.') !== -1) {
	      // Keep the test async
	      setTimeout(function() {
	        addTest('datauri', false);
	      }, 10);
	    }

	    var datauri = new Image();

	    datauri.onerror = function() {
	      addTest('datauri', false);
	    };
	    datauri.onload = function() {
	      if (datauri.width == 1 && datauri.height == 1) {
	        testOver32kb();
	      }
	      else {
	        addTest('datauri', false);
	      }
	    };

	    datauri.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

	    // Once we have datauri, let's check to see if we can use data URIs over
	    // 32kb (IE8 can't). https://github.com/Modernizr/Modernizr/issues/321
	    function testOver32kb() {

	      var datauriBig = new Image();

	      datauriBig.onerror = function() {
	        addTest('datauri', true);
	        Modernizr.datauri = new Boolean(true);
	        Modernizr.datauri.over32kb = false;
	      };
	      datauriBig.onload = function() {
	        addTest('datauri', true);
	        Modernizr.datauri = new Boolean(true);
	        Modernizr.datauri.over32kb = (datauriBig.width == 1 && datauriBig.height == 1);
	      };

	      var base64str = 'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
	      while (base64str.length < 33000) {
	        base64str = '\r\n' + base64str;
	      }
	      datauriBig.src = 'data:image/gif;base64,' + base64str;
	    }

	  });

	/*!
	{
	  "name": "HTML5 Video",
	  "property": "video",
	  "caniuse": "video",
	  "tags": ["html5"],
	  "knownBugs": [
	    "Without QuickTime, `Modernizr.video.h264` will be `undefined`; https://github.com/Modernizr/Modernizr/issues/546"
	  ],
	  "polyfills": [
	    "html5media",
	    "mediaelementjs",
	    "sublimevideo",
	    "videojs",
	    "leanbackplayer",
	    "videoforeverybody"
	  ]
	}
	!*/
	/* DOC
	Detects support for the video element, as well as testing what types of content it supports.

	Subproperties are provided to describe support for `ogg`, `h264` and `webm` formats, e.g.:

	```javascript
	Modernizr.video         // true
	Modernizr.video.ogg     // 'probably'
	```
	*/

	  // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
	  //                     thx to NielsLeenheer and zcorpan

	  // Note: in some older browsers, "no" was a return value instead of empty string.
	  //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
	  //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

	  Modernizr.addTest('video', function() {
	    /* jshint -W053 */
	    var elem = createElement('video');
	    var bool = false;

	    // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
	    try {
	      if (bool = !!elem.canPlayType) {
	        bool = new Boolean(bool);
	        bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '');

	        // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
	        bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '');

	        bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '');

	        bool.vp9 = elem.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, '');

	        bool.hls = elem.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, '');
	      }
	    } catch (e) {}

	    return bool;
	  });

	/*!
	{
	  "name": "WebGL",
	  "property": "webgl",
	  "caniuse": "webgl",
	  "tags": ["webgl", "graphics"],
	  "polyfills": ["jebgl", "cwebgl", "iewebgl"]
	}
	!*/

	  Modernizr.addTest('webgl', function() {
	    var canvas = createElement('canvas');
	    var supports = 'probablySupportsContext' in canvas ? 'probablySupportsContext' :  'supportsContext';
	    if (supports in canvas) {
	      return canvas[supports]('webgl') || canvas[supports]('experimental-webgl');
	    }
	    return 'WebGLRenderingContext' in window;
	  });

	/*!
	{
	  "name": "WebSockets Support",
	  "property": "websockets",
	  "authors": ["Phread [fearphage]", "Mike Sherov [mikesherov]", "Burak Yigit Kaya [BYK]"],
	  "caniuse": "websockets",
	  "tags": ["html5"],
	  "warnings": [
	    "This test will reject any old version of WebSockets even if it is not prefixed such as in Safari 5.1"
	  ],
	  "notes": [{
	    "name": "CLOSING State and Spec",
	    "href": "https://www.w3.org/TR/websockets/#the-websocket-interface"
	  }],
	  "polyfills": [
	    "sockjs",
	    "socketio",
	    "kaazing-websocket-gateway",
	    "websocketjs",
	    "atmosphere",
	    "graceful-websocket",
	    "portal",
	    "datachannel"
	  ]
	}
	!*/

	  Modernizr.addTest('websockets', 'WebSocket' in window && window.WebSocket.CLOSING === 2);


	  // Run each test
	  testRunner();

	  delete ModernizrProto.addTest;
	  delete ModernizrProto.addAsyncTest;

	  // Run the things that are supposed to run after the tests
	  for (var i = 0; i < Modernizr._q.length; i++) {
	    Modernizr._q[i]();
	  }

	  // Leak Modernizr namespace
	  window.Modernizr = Modernizr;


	;

	})(window, document);
	module.exports = Modernizr;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(73);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Features.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Features.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-features {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-features ul li {\n    width: 50%;\n    float: left;\n    padding: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-features ul li .eruda-inner-wrapper {\n      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n      font-size: 14px;\n      text-decoration: underline;\n      color: #fff;\n      display: block;\n      padding: 10px;\n      border-radius: 4px;\n      text-align: center;\n      background: #eda29b; }\n      .eruda-dev-tools .eruda-tools .eruda-features ul li .eruda-inner-wrapper.eruda-ok {\n        background: #fff;\n        color: #b4b4b4; }\n  .eruda-dev-tools .eruda-tools .eruda-features ul::after {\n    display: block;\n    content: '';\n    clear: both; }\n  .eruda-dev-tools .eruda-tools .eruda-features .eruda-html5test {\n    color: #fff;\n    background: #76a2ee;\n    display: block;\n    padding: 10px;\n    text-decoration: none;\n    text-align: center;\n    margin-top: 10px; }\n", ""]);

	// exports


/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = {
		"feature-detects": [
			"audio",
			"canvas",
			"cookies",
			"css/animations",
			"css/boxshadow",
			"css/boxsizing",
			"css/calc",
			"css/flexbox",
			"css/transforms",
			"css/transforms3d",
			"css/transitions",
			"es6/promises",
			"file/api",
			"file/filesystem",
			"flash",
			"forms/placeholder",
			"fullscreen-api",
			"geolocation",
			"hashchange",
			"history",
			"img/webp",
			"img/webp-alpha",
			"indexeddb",
			"json",
			"network/fetch",
			"network/xhr2",
			"notification",
			"performance",
			"pointerevents",
			"queryselector",
			"script/async",
			"script/defer",
			"serviceworker",
			"storage/localstorage",
			"storage/sessionstorage",
			"storage/websqldatabase",
			"style/scoped",
			"svg",
			"templatestrings",
			"touchevents",
			"typed-arrays",
			"url/bloburls",
			"url/data-uri",
			"video",
			"webgl",
			"websockets"
		],
		"special-names": {
			"css/boxshadow": "boxshadow",
			"css/boxsizing": "boxsizing",
			"css/flexbox": "flexbox",
			"es6/promises": "promises",
			"file/api": "filereader",
			"file/filesystem": "filesystem",
			"forms/placeholder": "placeholder",
			"fullscreen-api": "fullscreen",
			"img/webp": "webp",
			"img/webp-alpha": "webpalpha",
			"network/fetch": "fetch",
			"network/xhr2": "xhr2",
			"storage/localstorage": "localstorage",
			"storage/sessionstorage": "sessionstorage",
			"storage/websqldatabase": "websqldatabase",
			"typed-arrays": "typedarrays",
			"url/bloburls": "bloburls",
			"url/data-uri": "datauri"
		}
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

	  return "        <li>\r\n            <a href=\"http://caniuse.com/#search="
	    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
	    + "\" target=\"_blank\" class=\"eruda-inner-wrapper "
	    + ((stack1 = helpers["if"].call(alias1,depth0,{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\">\r\n                "
	    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
	    + "\r\n            </a>\r\n        </li>\r\n";
	},"2":function(container,depth0,helpers,partials,data) {
	    return "eruda-ok";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "<ul>\r\n"
	    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.features : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "</ul>\r\n<a class=\"eruda-html5test\" target=\"_blank\" href=\"http://html5test.com\">Go to HTML5 Test</a>";
	},"useData":true});

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Tool2 = __webpack_require__(20);

	var _Tool3 = _interopRequireDefault(_Tool2);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _jsBeautify = __webpack_require__(27);

	var _jsBeautify2 = _interopRequireDefault(_jsBeautify);

	var _highlight = __webpack_require__(26);

	var _highlight2 = _interopRequireDefault(_highlight);

	var _JsonViewer = __webpack_require__(77);

	var _JsonViewer2 = _interopRequireDefault(_JsonViewer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(78);

	var Sources = function (_Tool) {
	    _inherits(Sources, _Tool);

	    function Sources() {
	        _classCallCheck(this, Sources);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sources).call(this));

	        _this.name = 'sources';
	        _this._isInit = false;

	        _this._loadTpl();
	        return _this;
	    }

	    _createClass(Sources, [{
	        key: 'init',
	        value: function init($el, parent) {
	            _get(Object.getPrototypeOf(Sources.prototype), 'init', this).call(this, $el);

	            this._parent = parent;
	            this._bindEvent();
	        }
	    }, {
	        key: 'set',
	        value: function set(type, val) {
	            if (type === 'img') {
	                // _isInit is required to set true for async process.
	                this._isInit = true;

	                var img = new Image();

	                var self = this;

	                img.onload = function () {
	                    self._data = {
	                        type: 'img',
	                        val: {
	                            width: this.width,
	                            height: this.height,
	                            src: val
	                        }
	                    };

	                    self._render();
	                };

	                img.src = val;

	                return;
	            }

	            this._data = {
	                type: type,
	                val: val
	            };

	            this._render();

	            return this;
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            _get(Object.getPrototypeOf(Sources.prototype), 'show', this).call(this);

	            if (!this._isInit) this._reset();

	            return this;
	        }
	    }, {
	        key: '_reset',
	        value: function _reset() {
	            var _this2 = this;

	            if (this._html) {
	                this._data = {
	                    type: 'html',
	                    val: this._html
	                };

	                return this._render();
	            }
	            _util2.default.get(location.href, function (err, data) {
	                if (err) return;

	                _this2._html = data;
	                _this2._reset();
	            });
	        }
	    }, {
	        key: '_bindEvent',
	        value: function _bindEvent() {
	            var _this3 = this;

	            this._parent.on('showTool', function (name, lastTool) {
	                if (name !== _this3.name && lastTool.name === _this3.name) _this3._reset();
	            });

	            this._$el.on('click', '.eruda-http .eruda-response', function () {
	                var data = _this3._data.val,
	                    resTxt = data.resTxt;

	                switch (data.subType) {
	                    case 'css':
	                        return _this3.set('css', resTxt);
	                    case 'html':
	                        return _this3.set('html', resTxt);
	                    case 'javascript':
	                        return _this3.set('js', resTxt);
	                    case 'json':
	                        return _this3.set('json', resTxt);
	                }
	                switch (data.type) {
	                    case 'image':
	                        return _this3.set('img', data.url);
	                }
	            });
	        }
	    }, {
	        key: '_loadTpl',
	        value: function _loadTpl() {
	            this._codeTpl = __webpack_require__(80);
	            this._imgTpl = __webpack_require__(81);
	            this._httpTpl = __webpack_require__(82);
	            this._jsonTpl = __webpack_require__(83);
	        }
	    }, {
	        key: '_render',
	        value: function _render() {
	            this._isInit = true;

	            var data = this._data;

	            switch (data.type) {
	                case 'html':
	                case 'js':
	                case 'css':
	                    return this._renderCode();
	                case 'img':
	                    return this._renderImg();
	                case 'http':
	                    return this._renderHttp();
	                case 'json':
	                    return this._renderJson();
	            }
	        }
	    }, {
	        key: '_renderImg',
	        value: function _renderImg() {
	            this._$el.html(this._imgTpl(this._data.val));
	        }
	    }, {
	        key: '_renderHttp',
	        value: function _renderHttp() {
	            this._$el.html(this._httpTpl(this._data.val));
	        }
	    }, {
	        key: '_renderCode',
	        value: function _renderCode() {
	            var data = this._data;

	            var code = data.val;

	            // If source code too big, don't process it.
	            if (data.val.length < 100000) {
	                switch (data.type) {
	                    case 'html':
	                        code = _jsBeautify2.default.html(code);
	                        break;
	                    case 'css':
	                        code = _jsBeautify2.default.css(code);
	                        break;
	                    case 'js':
	                        code = (0, _jsBeautify2.default)(code);
	                        break;
	                }

	                code = (0, _highlight2.default)(code, data.type);
	            }

	            this._$el.html(this._codeTpl({ code: code }));
	        }
	    }, {
	        key: '_renderJson',
	        value: function _renderJson() {
	            this._$el.html(this._jsonTpl());

	            var val = this._data.val;

	            try {
	                if (_util2.default.isStr(val)) val = JSON.parse(val);
	                new _JsonViewer2.default(val, this._$el.find('.eruda-json'));
	            } catch (e) {}
	        }
	    }]);

	    return Sources;
	}(_Tool3.default);

	exports.default = Sources;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var JsonViewer = function () {
	    function JsonViewer(data, $el) {
	        _classCallCheck(this, JsonViewer);

	        this._data = [data];
	        this._$el = $el;

	        this._appendTpl();
	        this._bindEvent();
	    }

	    _createClass(JsonViewer, [{
	        key: '_appendTpl',
	        value: function _appendTpl() {
	            this._$el.html(jsonToHtml(this._data));
	        }
	    }, {
	        key: '_bindEvent',
	        value: function _bindEvent() {
	            this._$el.on('click', '.eruda-expanded', function () {
	                var $this = _util2.default.$(this);

	                $this.parent().find('ul').eq(0).hide();
	                $this.addClass('eruda-collapsed');
	            }).on('click', '.eruda-expanded.eruda-collapsed', function () {
	                var $this = _util2.default.$(this);

	                $this.rmClass('eruda-collapsed');
	                $this.parent().find('ul').eq(0).show();
	            });
	        }
	    }]);

	    return JsonViewer;
	}();

	exports.default = JsonViewer;


	function jsonToHtml(data) {
	    var ret = '';

	    _util2.default.each(data, function (val, key) {
	        return ret += createEl(key, val);
	    });

	    return ret;
	}

	function createEl(key, val) {
	    var type = 'object',
	        open = '{',
	        close = '}';

	    if (_util2.default.isArr(val)) {
	        type = 'array';
	        open = '[';
	        close = ']';
	    }

	    if (val === null) {
	        return '<li>' + '<span class="eruda-key">"' + encode(key) + '": </span>' + '<span class="eruda-null">"' + encode(val) + '"</span>' + '</li>';
	    }
	    if (_util2.default.isObj(val)) {
	        var obj = '<li>' + '<span class="eruda-expanded"></span>' + '<span class="eruda-key">"' + encode(key) + '": </span>' + '<span class="eruda-open">' + open + '</span>' + '<ul class="eruda-' + type + '">';
	        obj += jsonToHtml(val);
	        return obj + '</ul><span class="eruda-close">' + close + '</span></li>';
	    }
	    if (_util2.default.isNum(val) || _util2.default.isBool(val)) {
	        return '<li>' + '<span class="eruda-key">"' + encode(key) + '": </span>' + '<span class="eruda-' + (typeof val === 'undefined' ? 'undefined' : _typeof(val)) + '">' + encode(val) + '</span>' + '</li>';
	    }

	    return '<li>' + '<span class="eruda-key">"' + encode(key) + '": </span>' + '<span class="eruda-' + (typeof val === 'undefined' ? 'undefined' : _typeof(val)) + '">"' + encode(val) + '"</span>' + '</li>';
	}

	function encode(str) {
	    return _util2.default.escape(_util2.default.toStr(str));
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(79);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Sources.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Sources.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-sources {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-code {\n    background: #fff;\n    padding: 10px;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    min-height: 100%; }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-image {\n    padding: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-image .eruda-img-container {\n      text-align: center; }\n      .eruda-dev-tools .eruda-tools .eruda-sources .eruda-image .eruda-img-container img {\n        max-width: 100%;\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2); }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-image .eruda-img-info {\n      text-align: center;\n      margin-top: 20px;\n      color: #b4b4b4; }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-http .eruda-breadcrumb {\n    background: #fff;\n    padding: 10px;\n    margin-bottom: 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-http .eruda-section {\n    background: #fff;\n    margin-bottom: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-http .eruda-section h2 {\n      background: #76a2ee;\n      padding: 10px;\n      color: #fff;\n      font-size: 16px; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-http .eruda-section table td {\n      font-size: 14px;\n      padding: 5px 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-http .eruda-response {\n    background: #fff;\n    padding: 10px;\n    margin-bottom: 10px;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json {\n    font-size: 14px;\n    line-height: 1.2;\n    background: #fff;\n    min-height: 100%;\n    padding: 10px 25px 10px;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json, .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json ul {\n      list-style: none !important; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json ul {\n      padding: 0 !important;\n      padding-left: 20px !important;\n      margin: 0 !important; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json li {\n      position: relative; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json > li > .eruda-key,\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json .eruda-array .eruda-key {\n      display: none; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json .eruda-array .eruda-object .eruda-key {\n      display: inline; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json li:after {\n      content: \",\"; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json li:last-child:after {\n      content: \"\"; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json .eruda-null {\n      color: #a71d5d; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json .eruda-string {\n      color: #183691; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json .eruda-number {\n      color: #0086b3; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json .eruda-boolean {\n      color: #a71d5d; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json .eruda-key {\n      color: #183691; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json .eruda-expanded:before {\n      content: \"-\";\n      font-size: 1.5em;\n      width: 13px;\n      text-align: center;\n      line-height: 13px;\n      font-family: sans-serif;\n      position: absolute;\n      left: -15px;\n      top: 0; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json .eruda-collapsed:before {\n      content: \"+\";\n      font-size: 1.5em;\n      color: #000;\n      top: 1px; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json li .eruda-collapsed ~ .eruda-close:before {\n      content: \"... \";\n      color: #999; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json .eruda-hidden ~ ul {\n      display: none; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json span {\n      position: static !important; }\n", ""]);

	// exports


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, helper;

	  return "<pre class=\"eruda-code\">"
	    + ((stack1 = ((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"code","hash":{},"data":data}) : helper))) != null ? stack1 : "")
	    + "</pre>";
	},"useData":true});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

	  return "<div class=\"eruda-image\">\r\n    <div class=\"eruda-img-container\">\r\n        <img src=\""
	    + alias4(((helper = (helper = helpers.src || (depth0 != null ? depth0.src : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data}) : helper)))
	    + "\">\r\n    </div>\r\n    <div class=\"eruda-img-info\">"
	    + alias4(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data}) : helper)))
	    + "px * "
	    + alias4(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"height","hash":{},"data":data}) : helper)))
	    + "px</div>\r\n</div>";
	},"useData":true});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=container.escapeExpression;

	  return "                    <tr>\r\n                        <td>"
	    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"key","hash":{},"data":data}) : helper)))
	    + "</td>\r\n                        <td>"
	    + alias1(container.lambda(depth0, depth0))
	    + "</td>\r\n                    </tr>\r\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

	  return "<div class=\"eruda-http\">\r\n    <div class=\"eruda-breadcrumb\">"
	    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
	    + "</div>\r\n    <div class=\"eruda-section\">\r\n        <h2>Response Headers</h2>\r\n        <table class=\"eruda-headers\">\r\n            <tbody>\r\n"
	    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.resHeaders : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "            </tbody>\r\n        </table>\r\n    </div>\r\n    <pre class=\"eruda-response\">"
	    + alias4(((helper = (helper = helpers.resTxt || (depth0 != null ? depth0.resTxt : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resTxt","hash":{},"data":data}) : helper)))
	    + "</pre>\r\n</div>";
	},"useData":true});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<ul class=\"eruda-json\"></ul>";
	},"useData":true});

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Tool2 = __webpack_require__(20);

	var _Tool3 = _interopRequireDefault(_Tool2);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(85);

	var Settings = function (_Tool) {
	    _inherits(Settings, _Tool);

	    function Settings() {
	        _classCallCheck(this, Settings);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Settings).call(this));

	        _this.name = 'settings';
	        _this._switchTpl = __webpack_require__(87);
	        _this._settings = [];
	        return _this;
	    }

	    _createClass(Settings, [{
	        key: 'init',
	        value: function init($el) {
	            _get(Object.getPrototypeOf(Settings.prototype), 'init', this).call(this, $el);

	            this._bindEvent();
	        }
	    }, {
	        key: 'add',
	        value: function add(config, key, desc) {
	            this._settings.push({
	                config: config,
	                key: key
	            });

	            this._$el.append(this._switchTpl({
	                desc: desc,
	                key: key,
	                idx: this._settings.length - 1,
	                val: config.get(key)
	            }));

	            return this;
	        }
	    }, {
	        key: 'separator',
	        value: function separator() {
	            this._$el.append('<div class="eruda-separator"></div>');

	            return this;
	        }
	    }, {
	        key: '_bindEvent',
	        value: function _bindEvent() {
	            var self = this;

	            this._$el.on('click', '.eruda-checkbox', function () {
	                var $input = _util2.default.$(this).find('input'),
	                    idx = $input.data('idx'),
	                    val = $input.get(0).checked;

	                var setting = self._settings[idx];
	                setting.config.set(setting.key, val);
	            });
	        }
	    }]);

	    return Settings;
	}(_Tool3.default);

	exports.default = Settings;
	;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(86);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Settings.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./Settings.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-settings {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-settings .eruda-separator {\n    height: 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch {\n    padding: 10px;\n    background: #fff;\n    font-size: 14px;\n    border-bottom: 1px solid #f2f2f2; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox {\n      float: right;\n      position: relative;\n      vertical-align: top;\n      width: 46px;\n      height: 20px;\n      padding: 3px;\n      border-radius: 18px;\n      box-shadow: inset 0 -1px white, inset 0 1px 1px rgba(0, 0, 0, 0.05);\n      cursor: pointer;\n      background-image: -webkit-linear-gradient(top, #eeeeee, white 25px);\n      background-image: linear-gradient(to bottom, #eeeeee, white 25px); }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-input {\n        position: absolute;\n        top: 0;\n        left: 0;\n        opacity: 0; }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-label {\n        position: relative;\n        display: block;\n        height: 14px;\n        font-size: 10px;\n        text-transform: uppercase;\n        background: #eceeef;\n        border-radius: inherit;\n        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);\n        -webkit-transition: 0.15s ease-out;\n        transition: 0.15s ease-out;\n        -webkit-transition-property: opacity background;\n        transition-property: opacity background; }\n        .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-label:before, .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-label:after {\n          position: absolute;\n          top: 50%;\n          margin-top: -.5em;\n          line-height: 1;\n          -webkit-transition: inherit;\n          transition: inherit; }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-input:checked ~ .eruda-label {\n        background: #47a8d8;\n        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15), inset 0 0 3px rgba(0, 0, 0, 0.2); }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-input:checked ~ .eruda-label:before {\n        opacity: 0; }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-input:checked ~ .eruda-label:after {\n        opacity: 1; }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-handle {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 18px;\n        height: 18px;\n        border-radius: 10px;\n        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);\n        background-image: -webkit-linear-gradient(top, white 40%, #f0f0f0);\n        background-image: linear-gradient(to bottom, white 40%, #f0f0f0);\n        -webkit-transition: left 0.15s ease-out;\n        transition: left 0.15s ease-out; }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-handle:before {\n        content: '';\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        margin: -6px 0 0 -6px;\n        width: 12px;\n        height: 12px;\n        border-radius: 6px;\n        box-shadow: inset 0 1px rgba(0, 0, 0, 0.02);\n        background-image: -webkit-linear-gradient(top, #eeeeee, white);\n        background-image: linear-gradient(to bottom, #eeeeee, white); }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-input:checked ~ .eruda-handle {\n        left: 30px;\n        box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.2); }\n", ""]);

	// exports


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    return "checked";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

	  return "<div class=\"eruda-switch\">\r\n    "
	    + alias4(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data}) : helper)))
	    + "\r\n    <label class=\"eruda-checkbox\">\r\n        <input type=\"checkbox\" class=\"eruda-input\" data-idx=\""
	    + alias4(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idx","hash":{},"data":data}) : helper)))
	    + "\" "
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.val : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\r\n        <span class=\"eruda-label\"></span>\r\n        <span class=\"eruda-handle\"></span>\r\n    </label>\r\n</div>";
	},"useData":true});

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(89);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-container {\n  pointer-events: none;\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 100000;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }\n  .eruda-container * {\n    box-sizing: border-box;\n    pointer-events: all;\n    -webkit-tap-highlight-color: transparent; }\n  .eruda-container ul {\n    list-style: none;\n    padding: 0;\n    margin: 0; }\n  .eruda-container h1, .eruda-container h2, .eruda-container h3, .eruda-container h4 {\n    margin: 0; }\n\n.eruda-blue {\n  color: #76a2ee; }\n\n.eruda-red {\n  color: #eda29b; }\n", ""]);

	// exports


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(91);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js!./reset.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js!./reset.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-container html, .eruda-container body, .eruda-container div, .eruda-container span, .eruda-container applet, .eruda-container object, .eruda-container iframe, .eruda-container h1, .eruda-container h2, .eruda-container h3, .eruda-container h4, .eruda-container h5, .eruda-container h6, .eruda-container p, .eruda-container blockquote, .eruda-container pre, .eruda-container a, .eruda-container abbr, .eruda-container acronym, .eruda-container address, .eruda-container big, .eruda-container cite, .eruda-container code, .eruda-container del, .eruda-container dfn, .eruda-container em, .eruda-container img, .eruda-container ins, .eruda-container kbd, .eruda-container q, .eruda-container s, .eruda-container samp, .eruda-container small, .eruda-container strike, .eruda-container strong, .eruda-container sub, .eruda-container sup, .eruda-container tt, .eruda-container var, .eruda-container b, .eruda-container u, .eruda-container i, .eruda-container center, .eruda-container dl, .eruda-container dt, .eruda-container dd, .eruda-container ol, .eruda-container ul, .eruda-container li, .eruda-container fieldset, .eruda-container form, .eruda-container label, .eruda-container legend, .eruda-container table, .eruda-container caption, .eruda-container tbody, .eruda-container tfoot, .eruda-container thead, .eruda-container tr, .eruda-container th, .eruda-container td, .eruda-container article, .eruda-container aside, .eruda-container canvas, .eruda-container details, .eruda-container embed, .eruda-container figure, .eruda-container figcaption, .eruda-container footer, .eruda-container header, .eruda-container hgroup, .eruda-container menu, .eruda-container nav, .eruda-container output, .eruda-container ruby, .eruda-container section, .eruda-container summary, .eruda-container time, .eruda-container mark, .eruda-container audio, .eruda-container video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n.eruda-container article, .eruda-container aside, .eruda-container details, .eruda-container figcaption, .eruda-container figure, .eruda-container footer, .eruda-container header, .eruda-container hgroup, .eruda-container menu, .eruda-container nav, .eruda-container section {\n  display: block; }\n\n.eruda-container body {\n  line-height: 1; }\n\n.eruda-container ol, .eruda-container ul {\n  list-style: none; }\n\n.eruda-container blockquote, .eruda-container q {\n  quotes: none; }\n\n.eruda-container blockquote:before, .eruda-container blockquote:after, .eruda-container q:before, .eruda-container q:after {\n  content: '';\n  content: none; }\n\n.eruda-container table {\n  border-collapse: collapse;\n  border-spacing: 0; }\n", ""]);

	// exports


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(93);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./icon.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./icon.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, "@font-face {\n    font-family: 'icomoon';\n    src: url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAeAAAsAAAAABzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIF2WNtYXAAAAFoAAAAVAAAAFQXVtKLZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAA2AAAANgVhdUnGhlYWQAAAUkAAAANgAAADYJuqOraGhlYQAABVwAAAAkAAAAJAfCA8pobXR4AAAFgAAAACQAAAAkGgAAQGxvY2EAAAWkAAAAFAAAABQCIAMgbWF4cAAABbgAAAAgAAAAIAARAERuYW1lAAAF2AAAAYYAAAGGmUoJ+3Bvc3QAAAdgAAAAIAAAACAAAwAAAAMDqwGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QQDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkE//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAgAA/8AEAAPAABkAMgAAAS4DIyIOAhUzND4CMzIeAhcHIREHExQOAiMiLgInNyERNx4DMzI+AjUDeiNVYGo4aruLUGBBcZhWLldPRR2WAWCGJkFxmFYuV09FHZb+oIYjVWBqOGq7i1ADGiY+KxdQi7tqVphxQRMkMyCWAWCG/qZWmHFBEyQzIJb+oIYmPisXUIu7agAAAAAFAAAAAAQAA4AAAwAHAAsAHwAjAAATESERAyERIQchESEBIxUjFSM1MzUzNSM1IzUzFTMVMwUjNTMABABA/IADgED9AAMA/kBAQEBAQEBAQEBAAQDAwAOA/IADgPzAAwBA/YABQEBAQEBAQEBAQMBAAAAAAAcAQP/AA4ADwAAJAA0AEQAVABkALQAxAAATERQWMyEyNjURASMRMxMjETMTIxEzEyMRMxMjNTQmKwEiBh0BIyIGHQEhNTQmISM1M4AmGgJAGib+AEBAgEBAgEBAgEBAkNAcFOAUHNAUHANAHP7cwMACgP2AGiYmGgKA/cABwP5AAcD+QAHA/kABwAFAUBQcHBRQHBRQUBQcPwAAAAMAAP/ABAADwAAoADQAQQAAAS4DIyIOAgcOAxUUHgIXHgMzMj4CNz4DNTQuAicTFAYHAT4BMzIeAgU0NjcBDgEjIi4CNQNqJFRcYzMzY1xUJCQ4JhQUJjgkJFRcYzMzY1xUJCQ4JhQUJjgkFiYh/ekvcT5PjGk8/QAmIQIXL3E+T4xpPAMqJDgmFBQmOCQkVFxjMzNjXFQkJDgmFBQmOCQkVFxjMzNjXFQk/pY+cS8CFyEmPGmMTz5xL/3pISY8aYxPAAAEAAD/wAQAA8AADwAZAC0AQQAAATQ2OwEyFh0BFAYrASImNRMhNTM1IzUzETMDIg4CFRQeAjMyPgI1NC4CAyIuAjU0PgIzMh4CFRQOAgHAHBQgFBwcFCAUHMD/AEBAwECAaruLUFCLu2pqu4tQUIu7alaYcUFBcZhWVphxQUFxmAKQFBwcFCAUHBwU/lBAwED/AALAUIu7amq7i1BQi7tqaruLUPxgQXGYVlaYcUFBcZhWVphxQQAAAQAAAAAAALdAQ69fDzz1AAsEAAAAAADTTi+XAAAAANNOL5cAAP/ABAADwAAAAAgAAgAAAAAAAAABAAADwP/AAAAEAAAAAAAEAAABAAAAAAAAAAAAAAAAAAAACQQAAAAAAAAAAAAAAAIAAAAEAAAABAAAAAQAAEAEAAAABAAAAAAAAAAACgAUAB4AagCkAPIBVAGwAAEAAAAJAEIABwAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAHAAAAAQAAAAAAAgAHAGAAAQAAAAAAAwAHADYAAQAAAAAABAAHAHUAAQAAAAAABQALABUAAQAAAAAABgAHAEsAAQAAAAAACgAaAIoAAwABBAkAAQAOAAcAAwABBAkAAgAOAGcAAwABBAkAAwAOAD0AAwABBAkABAAOAHwAAwABBAkABQAWACAAAwABBAkABgAOAFIAAwABBAkACgA0AKRpY29tb29uAGkAYwBvAG0AbwBvAG5WZXJzaW9uIDEuMABWAGUAcgBzAGkAbwBuACAAMQAuADBpY29tb29uAGkAYwBvAG0AbwBvAG5pY29tb29uAGkAYwBvAG0AbwBvAG5SZWd1bGFyAFIAZQBnAHUAbABhAHJpY29tb29uAGkAYwBvAG0AbwBvAG5Gb250IGdlbmVyYXRlZCBieSBJY29Nb29uLgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA') format('woff');\n    font-weight: normal;\n    font-style: normal;\n}\n\n[class^=\"eruda-icon-\"], [class*=\" eruda-icon-\"] {\n    /* use !important to prevent issues with browser extensions that change fonts */\n    font-family: 'icomoon' !important;\n    speak: none;\n    font-style: normal;\n    font-weight: normal;\n    font-variant: normal;\n    text-transform: none;\n    line-height: 1;\n\n    /* Better Font Rendering =========== */\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\n.eruda-icon-info:before {\n    content: \"\\E904\";\n}\n.eruda-icon-blocked:before {\n    content: \"\\E903\";\n}\n.eruda-icon-terminal:before {\n    content: \"\\E901\";\n}\n.eruda-icon-bin:before {\n    content: \"\\E902\";\n}\n.eruda-icon-loop:before {\n    content: \"\\E900\";\n}\n\n", ""]);

	// exports


/***/ }
/******/ ]);