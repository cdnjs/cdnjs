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

	var _Network = __webpack_require__(35);

	var _Network2 = _interopRequireDefault(_Network);

	var _Elements = __webpack_require__(39);

	var _Elements2 = _interopRequireDefault(_Elements);

	var _Snippets = __webpack_require__(50);

	var _Snippets2 = _interopRequireDefault(_Snippets);

	var _Resources = __webpack_require__(55);

	var _Resources2 = _interopRequireDefault(_Resources);

	var _Info = __webpack_require__(59);

	var _Info2 = _interopRequireDefault(_Info);

	var _Features = __webpack_require__(64);

	var _Features2 = _interopRequireDefault(_Features);

	var _Settings = __webpack_require__(70);

	var _Settings2 = _interopRequireDefault(_Settings);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _config = __webpack_require__(8);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(74);
	__webpack_require__(76);

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
	    features = new _Features2.default(),
	    settings = new _Settings2.default();

	devTools.add(consoleTool).add(elements).add(network).add(resources).add(info).add(snippets).add(features).add(settings).showTool('console');

	settings.separator().add(devTools.config, 'activeEruda', 'Always Activated').separator().add(homeBtn.config, 'rememberPos', 'Remember Entry Button Position').separator().add(devTools.config, 'transparent', 'Transparent').add(devTools.config, 'halfScreen', 'Half Screen Size').separator().add(consoleTool.config, 'catchGlobalErr', 'Catch Global Errors').add(consoleTool.config, 'overrideConsole', 'Override Console');

	function appendContainer() {
	    if (eruda) eruda.destroy();
	    _util2.default.$('body').append('<div id="eruda"></div>');
	    $container = _util2.default.$('#eruda');
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
	                document.body.appendChild(el);
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

	    /* ------------------------------ pxToNum ------------------------------ */

	    var pxToNum = _.pxToNum = (function (exports)
	    {
	        function exports(str)
	        {
	            return toNum(str.replace('px', ''));
	        }

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
	exports.push([module.id, ".eruda-home-btn {\n  width: 40px;\n  height: 40px;\n  background: #000;\n  opacity: 0.3;\n  border-radius: 10px;\n  position: relative;\n  z-index: 1000;\n  -webkit-transition: opacity .3s;\n  transition: opacity .3s;\n  color: #fff;\n  font-size: 25px;\n  text-align: center;\n  line-height: 40px; }\n  .eruda-home-btn span {\n    position: relative;\n    top: 2px; }\n  .eruda-home-btn.eruda-active {\n    opacity: .8; }\n", ""]);

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

	__webpack_require__(21);

	function activeEruda(flag) {
	    window.localStorage.setItem('active-eruda', flag);
	}

	var DevTools = function () {
	    function DevTools($parent) {
	        _classCallCheck(this, DevTools);

	        this._$parent = $parent;
	        this._isShow = false;
	        this._opacity = 1;
	        this._tools = {};

	        this._appendTpl();
	        this._initNavBar();
	        this._initConfig();
	    }

	    _createClass(DevTools, [{
	        key: 'show',
	        value: function show() {
	            var _this = this;

	            this._isShow = true;

	            this._$el.show();
	            // Need a delay after show to enable transition effect.
	            setTimeout(function () {
	                return _this._$el.css('opacity', _this._opacity);
	            }, 50);

	            return this;
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            var _this2 = this;

	            this._isShow = false;

	            this._$el.css({ opacity: 0 });
	            setTimeout(function () {
	                return _this2._$el.hide();
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
	            tool.init(this._$tools.find('.eruda-' + name));
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
	            var _this3 = this;

	            _util2.default.each(this._tools, function (tool, key) {
	                return _this3.remove(key);
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

	            _util2.default.each(tools, function (tool) {
	                tool.active = false;
	                tool.hide();
	            });

	            tool.active = true;
	            tool.show();

	            this._navBar.activeTool(name);

	            return this;
	        }
	    }, {
	        key: '_initConfig',
	        value: function _initConfig() {
	            var _this4 = this;

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
	                        return _this4._setTransparency(val);
	                    case 'halfScreen':
	                        return _this4._setHalfScreen(val);
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
	            var $parent = this._$parent;

	            $parent.append(__webpack_require__(23)());

	            this._$el = $parent.find('.eruda-dev-tools');
	            this._$tools = this._$el.find('.eruda-tools');
	        }
	    }, {
	        key: '_initNavBar',
	        value: function _initNavBar() {
	            var _this5 = this;

	            this._navBar = new _NavBar2.default(this._$el.find('.eruda-nav-bar ul'));
	            this._navBar.on('showTool', function (name) {
	                _this5.showTool(name);
	            });
	        }
	    }]);

	    return DevTools;
	}();

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

	__webpack_require__(32);

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
	        value: function init($el) {
	            _get(Object.getPrototypeOf(Console.prototype), 'init', this).call(this, $el);

	            this._appendTpl();
	            this._initLog();
	            this._bindEvent();
	            this._initConfig();
	        }
	    }, {
	        key: 'overrideConsole',
	        value: function overrideConsole() {
	            var log = this._log,
	                winConsole = window.console;

	            function override(name) {
	                var origin = winConsole[name];

	                winConsole[name] = function () {
	                    log[name].apply(log, arguments);

	                    origin.apply(winConsole, arguments);
	                };
	            }

	            var methods = ['log', 'error', 'info', 'warn', 'dir', 'time', 'timeEnd', 'clear'];

	            methods.forEach(function (name) {
	                return override(name);
	            });

	            return this;
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
	        key: 'destroy',
	        value: function destroy() {
	            _get(Object.getPrototypeOf(Console.prototype), 'destroy', this).call(this);

	            window.onerror = this._origOnerror;
	        }
	    }, {
	        key: '_appendTpl',
	        value: function _appendTpl() {
	            var $el = this._$el;

	            $el.append(__webpack_require__(34)());
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

	            this._log = new _Log2.default(this._$logs);

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
	            var cfg = this.config = _config2.default.create('eruda-console');

	            cfg.set(_util2.default.defaults(cfg.get(), {
	                catchGlobalErr: true,
	                overrideConsole: true
	            }));

	            if (cfg.get('catchGlobalErr')) this.catchGlobalErr();
	            if (cfg.get('overrideConsole')) this.overrideConsole();
	        }
	    }]);

	    return Console;
	}(_Tool3.default);

	exports.default = Console;

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(26);

	var Log = function (_util$Emitter) {
	    _inherits(Log, _util$Emitter);

	    function Log($el) {
	        _classCallCheck(this, Log);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Log).call(this));

	        _this._$el = $el;
	        _this._logs = [];
	        _this._tpl = __webpack_require__(28);
	        _this._filter = 'all';
	        _this._lastLog = {};
	        _this._timer = {};
	        return _this;
	    }

	    _createClass(Log, [{
	        key: 'clear',
	        value: function clear() {
	            this._logs = [];

	            this._render();
	        }
	    }, {
	        key: 'input',
	        value: function input(jsCode) {
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
	                val: transCode(jsCode)
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
	            msg = transMsg(msg);

	            this._insert({
	                type: 'output',
	                ignoreFilter: true,
	                val: msg
	            });

	            return this;
	        }
	    }, {
	        key: 'dir',
	        value: function dir(obj) {
	            var msg = _util2.default.isObj(obj) ? JSON.stringify(obj, null, 4) : transMsg(obj);

	            this._insert({
	                type: 'dir',
	                isCode: true,
	                val: msg
	            });

	            return this;
	        }
	    }, {
	        key: 'log',
	        value: function log() {
	            var msg = transMultipleMsg(arguments);

	            this._insert({
	                type: 'log',
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
	            var ignoreFilter = false;

	            if (_util2.default.isErr(msg)) {
	                ignoreFilter = msg.ignoreFilter;
	                msg = errToStr(msg);
	            } else {
	                msg = errToStr(new Error(), transMsg(msg));
	            }

	            this._insert({
	                type: 'error',
	                ignoreFilter: ignoreFilter,
	                val: msg
	            });

	            return this;
	        }
	    }, {
	        key: 'info',
	        value: function info() {
	            var msg = transMultipleMsg(arguments);

	            this._insert({
	                type: 'info',
	                val: msg
	            });

	            return this;
	        }
	    }, {
	        key: 'warn',
	        value: function warn() {
	            var msg = transMultipleMsg(arguments);

	            this._insert({
	                type: 'warn',
	                val: msg
	            });

	            return this;
	        }
	    }, {
	        key: 'filter',
	        value: function filter(type) {
	            this._filter = type;

	            this.emit('filter', type);

	            this._render();
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

	            var lastLog = this._lastLog;

	            if (lastLog.type === log.type && lastLog.val === log.val) {
	                lastLog.times++;
	                lastLog.showTimes = true;
	            } else {
	                this._logs.push(log);

	                this._lastLog = log;
	            }

	            this._render();
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
	        key: '_render',
	        value: function _render() {
	            var logs = this._filterLogs(this._logs);

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


	var cmdList = __webpack_require__(29),
	    helpMsg = __webpack_require__(30)({
	    commands: cmdList
	});

	var libraries = __webpack_require__(31);

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

	function transMsg(msg) {
	    if (_util2.default.isUndef(msg)) {
	        msg = 'undefined';
	    } else if (_util2.default.isFn(msg)) {
	        msg = msg.toString();
	    } else if (_util2.default.isArr(msg)) {
	        msg = JSON.stringify(msg);
	    } else if (_util2.default.isObj(msg)) {
	        msg = 'Object ' + JSON.stringify(msg);
	    }

	    return _util2.default.escape(msg);
	}

	function transMultipleMsg(args) {
	    var ret = [];

	    _util2.default.each(args, function (val) {
	        ret.push(transMsg(val));
	    });

	    return ret.join(' ');
	}

	function transCode(code) {
	    return code.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(27);
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-console .eruda-logs {\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  height: 100%;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  font-size: 14px; }\n  .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li {\n    padding: 10px;\n    overflow-x: auto; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li a {\n      color: #76a2ee !important; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li .eruda-times {\n      background: #76a2ee;\n      padding: 5px;\n      color: #fff;\n      border-radius: 4px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-log, .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-output, .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-info, .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-dir {\n      border-bottom: 1px solid #b4b4b4; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-html table {\n      width: 100%;\n      background: #fff;\n      border-collapse: collapse; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-html table th {\n        background: #76a2ee;\n        color: #fff; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-html table th, .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-html table td {\n        padding: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-html .eruda-blue {\n      color: #76a2ee; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-error {\n      background: #fff0f0;\n      color: #ff0000;\n      border-top: 1px solid #ffd7d7;\n      border-bottom: 1px solid #ffd7d7; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-error .eruda-stack {\n        color: #000;\n        padding-left: 1.2em; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-warn {\n      background: #fffbe6;\n      border-top: 1px solid #fff5c2;\n      border-bottom: 1px solid #fff5c2; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs li.eruda-info {\n      color: #76a2ee; }\n", ""]);

	// exports


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : {};

	  return "        <li class=\"eruda-"
	    + container.escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
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

	  return "                <pre><code>"
	    + ((stack1 = ((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"val","hash":{},"data":data}) : helper))) != null ? stack1 : "")
	    + "</code></pre>\r\n";
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
/* 29 */
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
/* 30 */
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
/* 31 */
/***/ function(module, exports) {

	module.exports = {
		"jQuery": "//cdn.bootcss.com/jquery/2.2.1/jquery.js",
		"underscore": "//cdn.bootcss.com/underscore.js/1.8.3/underscore-min.js"
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(33);
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-console {\n  padding-top: 40px;\n  padding-bottom: 40px; }\n  .eruda-dev-tools .eruda-tools .eruda-console .eruda-control {\n    position: absolute;\n    left: 0;\n    top: 0;\n    padding: 10px 10px 10px 40px;\n    background: #fff;\n    height: 40px;\n    line-height: 20px;\n    width: 100%; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-blocked, .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-info {\n      display: inline-block;\n      color: #b4b4b4;\n      padding: 5px;\n      font-size: 16px;\n      position: absolute;\n      top: 8px; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-blocked:active, .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-info:active {\n        color: #f2f2f2; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-blocked {\n      left: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-info {\n      right: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-filter {\n      color: #b4b4b4;\n      margin: 0 1px;\n      font-size: 12px;\n      height: 20px;\n      display: inline-block;\n      padding: 0 4px;\n      line-height: 20px;\n      border-radius: 4px; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-filter.eruda-active {\n        background: #b4b4b4;\n        color: #fff; }\n  .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    background: #fff;\n    height: 40px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input .eruda-buttons {\n      display: none;\n      position: absolute;\n      left: 0;\n      top: 0;\n      width: 100%;\n      height: 40px;\n      color: #b4b4b4;\n      font-size: 12px;\n      border-bottom: 1px solid #f2f2f2; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input .eruda-buttons .eruda-button {\n        width: 50%;\n        display: inline-block;\n        text-align: center;\n        height: 40px;\n        line-height: 40px;\n        float: left; }\n        .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input .eruda-buttons .eruda-button:active {\n          background: #76a2ee;\n          color: #fff; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input textarea {\n      padding: 10px;\n      outline: none;\n      border: none;\n      font-size: 14px;\n      width: 100%;\n      height: 100%; }\n", ""]);

	// exports


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<div class=\"eruda-control\">\r\n    <span class=\"eruda-icon-blocked clear-console\" ontouchstart></span>\r\n    <span class=\"eruda-filter filter eruda-active\" data-filter=\"all\">All</span>\r\n    <span class=\"eruda-filter filter\" data-filter=\"error\">Error</span>\r\n    <span class=\"eruda-filter filter\" data-filter=\"warn\">Warning</span>\r\n    <span class=\"eruda-filter filter\" data-filter=\"info\">Info</span>\r\n    <span class=\"eruda-filter filter\" data-filter=\"log\">Log</span>\r\n    <span class=\"eruda-icon-info help\" ontouchstart></span>\r\n</div>\r\n<div class=\"eruda-logs\"></div>\r\n<div class=\"eruda-js-input\">\r\n    <div class=\"eruda-buttons\">\r\n        <div class=\"eruda-button cancel\" ontouchstart>Cancel</div>\r\n        <div class=\"eruda-button execute\" ontouchstart>Execute</div>\r\n    </div>\r\n    <textarea placeholder=\"Type JavaScript here\"></textarea>\r\n</div>\r\n";
	},"useData":true});

/***/ },
/* 35 */
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

	__webpack_require__(36);

	var Network = function (_Tool) {
	    _inherits(Network, _Tool);

	    function Network() {
	        _classCallCheck(this, Network);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Network).call(this));

	        _this.name = 'network';
	        _this._performanceTimingData = [];

	        _this._tpl = __webpack_require__(38);
	        return _this;
	    }

	    _createClass(Network, [{
	        key: 'init',
	        value: function init($el) {
	            var _this2 = this;

	            _get(Object.getPrototypeOf(Network.prototype), 'init', this).call(this, $el);

	            window.addEventListener('load', function () {
	                // SetTimeout is required to make sure timing data is initialized.
	                setTimeout(function () {
	                    _this2._getPerformanceTimingData();
	                }, 1000);
	            }, false);
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

	            this._render();
	        }
	    }, {
	        key: '_render',
	        value: function _render() {
	            this._$el.html(this._tpl({
	                data: this._performanceTimingData,
	                timing: this._performanceTiming
	            }));
	        }
	    }]);

	    return Network;
	}(_Tool3.default);

	exports.default = Network;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(37);
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-network {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing {\n    padding: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing .eruda-inner-wrapper {\n      background: #76a2ee; }\n      .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing .eruda-inner-wrapper .eruda-bar {\n        border-bottom: 1px solid #fff;\n        overflow-x: auto;\n        -webkit-overflow-scrolling: touch; }\n        .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing .eruda-inner-wrapper .eruda-bar span {\n          font-size: 14px;\n          white-space: nowrap;\n          color: #fff;\n          padding: 5px 0;\n          background: #f73c37;\n          display: inline-block; }\n        .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing .eruda-inner-wrapper .eruda-bar:last-child {\n          border-bottom: none; }\n  .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing-data {\n    padding: 0 10px 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing-data table {\n      width: 100%;\n      background: #fff;\n      border-collapse: collapse; }\n      .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing-data table th {\n        background: #b4b4b4;\n        text-align: left;\n        color: #fff; }\n      .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing-data table th, .eruda-dev-tools .eruda-tools .eruda-network .eruda-performance-timing-data table td {\n        padding: 10px;\n        font-size: 14px; }\n", ""]);

	// exports


/***/ },
/* 38 */
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
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=depth0 != null ? depth0 : {};

	  return "<div class=\"eruda-performance-timing\">\r\n    <div class=\"eruda-inner-wrapper\">\r\n"
	    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "    </div>\r\n</div>\r\n\r\n<div class=\"eruda-performance-timing-data\">\r\n    <table>\r\n        <thead>\r\n            <tr>\r\n                <th>Name</th>\r\n                <th>Time(ms)</th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n"
	    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.timing : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "        </tbody>\r\n    </table>\r\n</div>";
	},"useData":true});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Tool2 = __webpack_require__(20);

	var _Tool3 = _interopRequireDefault(_Tool2);

	var _CssStore = __webpack_require__(40);

	var _CssStore2 = _interopRequireDefault(_CssStore);

	var _Highlight = __webpack_require__(41);

	var _Highlight2 = _interopRequireDefault(_Highlight);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(45);

	var Elements = function (_Tool) {
	    _inherits(Elements, _Tool);

	    function Elements() {
	        _classCallCheck(this, Elements);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Elements).call(this));

	        _this.name = 'elements';
	        _this._tpl = __webpack_require__(47);
	        _this._rmDefComputedStyle = true;
	        _this._highlightElement = false;
	        return _this;
	    }

	    _createClass(Elements, [{
	        key: 'init',
	        value: function init($el) {
	            _get(Object.getPrototypeOf(Elements.prototype), 'init', this).call(this, $el);

	            $el.html('<div class="eruda-show-area"></div>');
	            this._$showArea = $el.find('.eruda-show-area');
	            $el.append(__webpack_require__(48)());

	            this._bindEvent();
	            this._htmlEl = document.getElementsByTagName('html')[0];
	            this._initHighlight();
	            this._setEl(this._htmlEl, 0);
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

	            var parent = this._curEl.parentNode;

	            this._setEl(parent, this._curLevel - 1);
	        }
	    }, {
	        key: '_bindEvent',
	        value: function _bindEvent() {
	            var _this2 = this;

	            var self = this;

	            this._$el.on('click', '.eruda-child', function () {
	                var idx = _util2.default.$(this).data('idx');

	                var el = self._curEl.children[idx],
	                    level = self._curLevel + 1;

	                self._setEl(el, level);
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
	                return _this2._setEl(_this2._htmlEl, 0);
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
	            this._highlight = new _Highlight2.default();
	        }
	    }, {
	        key: '_toggleHighlight',
	        value: function _toggleHighlight() {
	            this._highlightElement = !this._highlightElement;

	            this._render();
	        }
	    }, {
	        key: '_setEl',
	        value: function _setEl(el, level) {
	            this._curEl = el;
	            this._$curEl = _util2.default.$(el);
	            this._curLevel = level;
	            this._curCssStore = new _CssStore2.default(el);
	            this._highlight.setEl(el);
	            this._rmDefComputedStyle = true;

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
	            var children = el.children;
	            var attributes = el.attributes;
	            var textContent = el.textContent;
	            var tagName = el.tagName;


	            ret.children = formatChildren(children);
	            ret.attributes = formatAttr(attributes);
	            if (children.length === 0) ret.textContent = textContent;
	            ret.name = formatElName(tagName, id, className, attributes) + '(' + this._curLevel + ')';

	            if (needNoStyle(tagName)) return ret;

	            var computedStyle = cssStore.getComputedStyle();
	            if (this._rmDefComputedStyle) computedStyle = rmDefComputedStyle(computedStyle);
	            ret.computedStyle = computedStyle;

	            var styles = cssStore.getMatchedCSSRules();
	            styles.unshift(getAttrStyle(attributes));
	            ret.styles = styles;

	            return ret;
	        }
	    }, {
	        key: '_render',
	        value: function _render() {
	            this._highlight[this._highlightElement ? 'show' : 'hide']();
	            this._$showArea.html(this._tpl(this._getData()));
	        }
	    }]);

	    return Elements;
	}(_Tool3.default);

	exports.default = Elements;


	function formatElName(tagName, id, className, attributes) {
	    var ret = tagName.toLowerCase();

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

	function formatChildren(children) {
	    var ret = [];

	    for (var i = 0, len = children.length; i < len; i++) {
	        var child = children[i];
	        if (child.id === 'eruda') break;
	        ret.push(formatElName(child.tagName, child.id, child.className, child.attributes));
	    }

	    return ret;
	}

	function getAttrStyle(attribute) {
	    var ret = {
	        selectorText: 'element.style',
	        style: {}
	    };

	    for (var i = 0, len = attribute.length; i < len; i++) {
	        var attr = attribute[i];

	        if (attr.name === 'style') {
	            var elStyle = {},
	                rules = attr.value.split(';');

	            _util2.default.each(rules, function (rule) {
	                rule = rule.split(':');
	                elStyle[rule[0]] = rule[1];
	            });

	            ret.style = elStyle;

	            break;
	        }
	    }

	    return ret;
	}

	var defComputedStyle = __webpack_require__(49);

	function rmDefComputedStyle(computedStyle) {
	    var ret = {};

	    _util2.default.each(computedStyle, function (val, key) {
	        if (val === defComputedStyle[key]) return;

	        ret[key] = val;
	    });

	    return ret;
	}

	var noStyleTag = ['script', 'style', 'meta', 'title', 'link', 'head'];

	function needNoStyle(tagName) {
	    tagName = tagName.toLowerCase();

	    return noStyleTag.indexOf(tagName) > -1;
	}

/***/ },
/* 40 */
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
/* 41 */
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

	__webpack_require__(42);

	var Highlight = function () {
	    function Highlight() {
	        _classCallCheck(this, Highlight);

	        this._appendTpl();
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
	                return _util2.default.pxToNum(computedStyle.getPropertyValue(name));
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
	        value: function _appendTpl() {
	            _util2.default.$('body').append(__webpack_require__(44)());

	            this._$el = _util2.default.$('.eruda-elements-highlight');
	            this._$margin = this._$el.find('.eruda-margin');
	            this._$padding = this._$el.find('.eruda-padding');
	            this._$content = this._$el.find('.eruda-content');
	        }
	    }]);

	    return Highlight;
	}();

	exports.default = Highlight;

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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-elements-highlight {\n  display: none;\n  position: absolute;\n  left: 0;\n  right: 0;\n  opacity: .5;\n  z-index: 10000; }\n  .eruda-elements-highlight .eruda-margin {\n    position: absolute;\n    background: #e8925b;\n    z-index: 100; }\n  .eruda-elements-highlight .eruda-border {\n    position: absolute;\n    left: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    background: #ffcd7c;\n    z-index: 200; }\n  .eruda-elements-highlight .eruda-padding {\n    position: absolute;\n    background: #86af76;\n    z-index: 300; }\n  .eruda-elements-highlight .eruda-content {\n    position: absolute;\n    background: #5e88c1;\n    z-index: 400; }\n", ""]);

	// exports


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<div class=\"eruda-elements-highlight\">\r\n    <div class=\"eruda-margin\"></div>\r\n    <div class=\"eruda-border\"></div>\r\n    <div class=\"eruda-padding\"></div>\r\n    <div class=\"eruda-content\"></div>\r\n</div>";
	},"useData":true});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(46);
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-elements {\n  padding-bottom: 40px; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-show-area {\n    overflow-y: auto;\n    -webkit-overflow-scrolling: touch;\n    height: 100%; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-breadcrumb {\n    background: #fff;\n    padding: 10px;\n    margin-bottom: 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-section {\n    margin-bottom: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-section h2 {\n      background: #76a2ee;\n      padding: 10px;\n      color: #fff;\n      font-size: 14px; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-children {\n    background: #fff;\n    margin-bottom: 10px !important; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-children li {\n      padding: 10px;\n      overflow-x: auto;\n      -webkit-overflow-scrolling: touch;\n      border-top: 1px solid #b4b4b4; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-children li:last-child {\n        border-bottom: 1px solid #b4b4b4; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-attributes {\n    background: #fff;\n    font-size: 12px; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-attributes .eruda-table-wrapper {\n      overflow-x: auto;\n      -webkit-overflow-scrolling: touch; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-attributes table td {\n      padding: 5px 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-text-content {\n    background: #fff; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-text-content .eruda-content {\n      padding: 10px;\n      overflow-x: auto;\n      -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-computed-style {\n    background: #fff;\n    font-size: 12px; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-computed-style .eruda-table-wrapper {\n      max-height: 200px;\n      overflow-y: auto;\n      -webkit-overflow-scrolling: touch; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-computed-style table td {\n      padding: 5px 10px; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-computed-style table td.eruda-key {\n        color: #f73c37; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles {\n    background: #fff;\n    font-size: 12px; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper {\n      padding: 10px; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper .eruda-style-rules {\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n        border: 1px solid #b4b4b4;\n        padding: 10px;\n        background: #fff;\n        margin-bottom: 10px; }\n        .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper .eruda-style-rules .eruda-rule {\n          padding-left: 2em; }\n          .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper .eruda-style-rules .eruda-rule span {\n            color: #f73c37; }\n        .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper .eruda-style-rules:last-child {\n          margin-bottom: 0; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-bottom-bar {\n    height: 40px;\n    background: #fff;\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-bottom-bar .eruda-btn {\n      text-align: center;\n      color: #b4b4b4;\n      font-size: 14px;\n      line-height: 40px;\n      -webkit-box-flex: 1;\n      -webkit-flex-grow: 1;\n          -ms-flex-positive: 1;\n              flex-grow: 1; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-bottom-bar .eruda-btn:active, .eruda-dev-tools .eruda-tools .eruda-elements .eruda-bottom-bar .eruda-btn.eruda-active {\n        background: #76a2ee;\n        color: #fff; }\n", ""]);

	// exports


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "    <ul class=\"eruda-children\">\r\n"
	    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.children : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "    </ul>\r\n";
	},"2":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=container.escapeExpression;

	  return "            <li class=\"eruda-child\" data-idx=\""
	    + alias1(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"index","hash":{},"data":data}) : helper)))
	    + "\">"
	    + alias1(container.lambda(depth0, depth0))
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
	},"16":function(container,depth0,helpers,partials,data) {
	    var helper;

	  return "    <div class=\"eruda-text-content eruda-section\">\r\n        <h2>Text</h2>\r\n        <div class=\"eruda-content\">\r\n            "
	    + container.escapeExpression(((helper = (helper = helpers.textContent || (depth0 != null ? depth0.textContent : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"textContent","hash":{},"data":data}) : helper)))
	    + "\r\n        </div>\r\n    </div>\r\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : {};

	  return "<div class=\"eruda-breadcrumb\">\r\n    "
	    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
	    + "\r\n</div>\r\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.children : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "<div class=\"eruda-attributes eruda-section\">\r\n    <h2>Attributes</h2>\r\n    <div class=\"eruda-table-wrapper\">\r\n        <table>\r\n            <tbody>\r\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.attributes : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
	    + "            </tbody>\r\n        </table>\r\n    </div>\r\n</div>\r\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.computedStyle : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.styles : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.textContent : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"useData":true});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<div class=\"eruda-bottom-bar\">\r\n    <div class=\"eruda-btn back\" ontouchstart>Back</div>\r\n    <div class=\"eruda-btn refresh\" ontouchstart>Refresh</div>\r\n    <div class=\"eruda-btn highlight\" ontouchstart>Highlight</div>\r\n    <div class=\"eruda-btn reset\" ontouchstart>Reset</div>\r\n</div>";
	},"useData":true});

/***/ },
/* 49 */
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Tool2 = __webpack_require__(20);

	var _Tool3 = _interopRequireDefault(_Tool2);

	var _defSnippets = __webpack_require__(51);

	var _defSnippets2 = _interopRequireDefault(_defSnippets);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(52);

	var Snippets = function (_Tool) {
	    _inherits(Snippets, _Tool);

	    function Snippets() {
	        _classCallCheck(this, Snippets);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Snippets).call(this));

	        _this.name = 'snippets';

	        _this._snippets = [];
	        _this._tpl = __webpack_require__(54);
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
/* 51 */
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(53);
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-snippets {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  padding: 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section {\n    margin-bottom: 10px;\n    border-radius: 4px;\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n    overflow: hidden; }\n    .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section .eruda-btn, .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section .eruda-name {\n      padding: 10px;\n      color: #fff;\n      background: #b4b4b4;\n      font-size: 14px;\n      text-align: center; }\n    .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section .eruda-btn {\n      background: #eda29b;\n      cursor: pointer; }\n    .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section .eruda-btn:active {\n      background: #f73c37; }\n    .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section .eruda-description {\n      background: #fff;\n      padding: 10px; }\n", ""]);

	// exports


/***/ },
/* 54 */
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
/* 55 */
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

	__webpack_require__(56);

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
	        _this._tpl = __webpack_require__(58);
	        return _this;
	    }

	    _createClass(Resources, [{
	        key: 'init',
	        value: function init($el) {
	            _get(Object.getPrototypeOf(Resources.prototype), 'init', this).call(this, $el);

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
	            });

	            _util2.default.orientation.on('change', function () {
	                return _this2._render();
	            });
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

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(57);
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-resources {\n  padding: 10px;\n  font-size: 14px;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-resources .eruda-section {\n    margin-bottom: 10px;\n    border-radius: 4px;\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n    overflow: hidden; }\n  .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title {\n    padding: 10px;\n    color: #fff;\n    background: #76a2ee;\n    font-size: 14px; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title.eruda-ok {\n      background: #8de191; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title.eruda-warn {\n      background: #fff5c2; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title.eruda-danger {\n      background: #eda29b; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title .eruda-btn {\n      float: right;\n      margin-right: 2px;\n      display: inline-block;\n      background: #fff;\n      color: #b4b4b4;\n      text-align: center;\n      width: 18px;\n      height: 18px;\n      line-height: 18px;\n      border-radius: 50%;\n      font-size: 12px;\n      cursor: pointer; }\n      .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title .eruda-btn .eruda-icon-loop {\n        position: relative;\n        top: 1px; }\n  .eruda-dev-tools .eruda-tools .eruda-resources .eruda-link-list li {\n    padding: 10px;\n    background: #fff;\n    word-break: break-all; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-link-list li a {\n      color: #76a2ee !important; }\n  .eruda-dev-tools .eruda-tools .eruda-resources .eruda-image-list {\n    background: #fff;\n    padding: 10px !important; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-image-list li {\n      width: 25%;\n      float: left;\n      overflow-y: hidden; }\n      .eruda-dev-tools .eruda-tools .eruda-resources .eruda-image-list li img {\n        width: 100%; }\n      .eruda-dev-tools .eruda-tools .eruda-resources .eruda-image-list li.eruda-empty {\n        padding: 10px;\n        width: 100%; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-image-list::after {\n      display: block;\n      content: '';\n      clear: both; }\n  .eruda-dev-tools .eruda-tools .eruda-resources table {\n    border-collapse: collapse;\n    width: 100%;\n    background: #fff; }\n    .eruda-dev-tools .eruda-tools .eruda-resources table td {\n      padding: 10px;\n      word-break: break-all; }\n      .eruda-dev-tools .eruda-tools .eruda-resources table td .eruda-icon-bin {\n        color: #f73c37;\n        display: inline-block;\n        padding: 5px; }\n      .eruda-dev-tools .eruda-tools .eruda-resources table td.eruda-key {\n        white-space: nowrap; }\n      .eruda-dev-tools .eruda-tools .eruda-resources table td.eruda-control {\n        width: 40px;\n        text-align: center; }\n", ""]);

	// exports


/***/ },
/* 58 */
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
	    + "\" target=\"_blank\">"
	    + alias2(alias1(depth0, depth0))
	    + "</a>\r\n                </li>\r\n";
	},"12":function(container,depth0,helpers,partials,data) {
	    return "            <li>Empty</li>\r\n";
	},"14":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.stylesheetData : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"16":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.imageData : depth0),{"name":"each","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"17":function(container,depth0,helpers,partials,data) {
	    var alias1=container.lambda, alias2=container.escapeExpression;

	  return "                <li>\r\n                    <a href=\""
	    + alias2(alias1(depth0, depth0))
	    + "\" target=\"_blank\">\r\n                        <img src=\""
	    + alias2(alias1(depth0, depth0))
	    + "\" data-exclude=\"true\"/>\r\n                    </a>\r\n                </li>\r\n";
	},"19":function(container,depth0,helpers,partials,data) {
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
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.imageData : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(19, data, 0),"data":data})) != null ? stack1 : "")
	    + "    </ul>\r\n</div>";
	},"useData":true});

/***/ },
/* 59 */
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

	var _defInfo = __webpack_require__(60);

	var _defInfo2 = _interopRequireDefault(_defInfo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(61);

	var Info = function (_Tool) {
	    _inherits(Info, _Tool);

	    function Info() {
	        _classCallCheck(this, Info);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Info).call(this));

	        _this.name = 'info';
	        _this._tpl = __webpack_require__(63);
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
/* 60 */
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(62);
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-info {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  font-size: 14px; }\n  .eruda-dev-tools .eruda-tools .eruda-info li {\n    overflow-x: auto;\n    border-bottom: 1px solid #b4b4b4; }\n    .eruda-dev-tools .eruda-tools .eruda-info li .eruda-title, .eruda-dev-tools .eruda-tools .eruda-info li .eruda-content {\n      padding: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-info li .eruda-content {\n      margin: 0; }\n    .eruda-dev-tools .eruda-tools .eruda-info li .eruda-title {\n      padding-bottom: 0;\n      font-size: 16px;\n      color: #76a2ee; }\n", ""]);

	// exports


/***/ },
/* 63 */
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
/* 64 */
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

	var _modernizr = __webpack_require__(65);

	var _modernizr2 = _interopRequireDefault(_modernizr);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(66);

	var featureList = __webpack_require__(68);

	var featureNames = featureList['feature-detects'],
	    specialNames = featureList['special-names'];

	var Features = function (_Tool) {
	    _inherits(Features, _Tool);

	    function Features() {
	        _classCallCheck(this, Features);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Features).call(this));

	        _this.name = 'features';
	        _this._tpl = __webpack_require__(69);
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
/* 65 */
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
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(67);
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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-features {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-features ul li {\n    width: 50%;\n    float: left;\n    padding: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-features ul li .eruda-inner-wrapper {\n      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n      font-size: 14px;\n      text-decoration: underline;\n      color: #fff;\n      display: block;\n      padding: 10px;\n      border-radius: 4px;\n      text-align: center;\n      background: #eda29b; }\n      .eruda-dev-tools .eruda-tools .eruda-features ul li .eruda-inner-wrapper.eruda-ok {\n        background: #fff;\n        color: #b4b4b4; }\n  .eruda-dev-tools .eruda-tools .eruda-features ul::after {\n    display: block;\n    content: '';\n    clear: both; }\n  .eruda-dev-tools .eruda-tools .eruda-features .eruda-html5test {\n    color: #fff;\n    background: #76a2ee;\n    display: block;\n    padding: 10px;\n    text-decoration: none;\n    text-align: center;\n    margin-top: 10px; }\n", ""]);

	// exports


/***/ },
/* 68 */
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
/* 69 */
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(71);

	var Settings = function (_Tool) {
	    _inherits(Settings, _Tool);

	    function Settings() {
	        _classCallCheck(this, Settings);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Settings).call(this));

	        _this.name = 'settings';
	        _this._switchTpl = __webpack_require__(73);
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(72);
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".eruda-dev-tools .eruda-tools .eruda-settings {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-settings .eruda-separator {\n    height: 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch {\n    padding: 10px;\n    background: #fff;\n    font-size: 14px;\n    border-bottom: 1px solid #f2f2f2; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox {\n      float: right;\n      position: relative;\n      vertical-align: top;\n      width: 46px;\n      height: 20px;\n      padding: 3px;\n      border-radius: 18px;\n      box-shadow: inset 0 -1px white, inset 0 1px 1px rgba(0, 0, 0, 0.05);\n      cursor: pointer;\n      background-image: -webkit-linear-gradient(top, #eeeeee, white 25px);\n      background-image: linear-gradient(to bottom, #eeeeee, white 25px); }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-input {\n        position: absolute;\n        top: 0;\n        left: 0;\n        opacity: 0; }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-label {\n        position: relative;\n        display: block;\n        height: 14px;\n        font-size: 10px;\n        text-transform: uppercase;\n        background: #eceeef;\n        border-radius: inherit;\n        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);\n        -webkit-transition: 0.15s ease-out;\n        transition: 0.15s ease-out;\n        -webkit-transition-property: opacity background;\n        transition-property: opacity background; }\n        .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-label:before, .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-label:after {\n          position: absolute;\n          top: 50%;\n          margin-top: -.5em;\n          line-height: 1;\n          -webkit-transition: inherit;\n          transition: inherit; }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-input:checked ~ .eruda-label {\n        background: #47a8d8;\n        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15), inset 0 0 3px rgba(0, 0, 0, 0.2); }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-input:checked ~ .eruda-label:before {\n        opacity: 0; }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-input:checked ~ .eruda-label:after {\n        opacity: 1; }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-handle {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 18px;\n        height: 18px;\n        border-radius: 10px;\n        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);\n        background-image: -webkit-linear-gradient(top, white 40%, #f0f0f0);\n        background-image: linear-gradient(to bottom, white 40%, #f0f0f0);\n        -webkit-transition: left 0.15s ease-out;\n        transition: left 0.15s ease-out; }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-handle:before {\n        content: '';\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        margin: -6px 0 0 -6px;\n        width: 12px;\n        height: 12px;\n        border-radius: 6px;\n        box-shadow: inset 0 1px rgba(0, 0, 0, 0.02);\n        background-image: -webkit-linear-gradient(top, #eeeeee, white);\n        background-image: linear-gradient(to bottom, #eeeeee, white); }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-input:checked ~ .eruda-handle {\n        left: 30px;\n        box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.2); }\n", ""]);

	// exports


/***/ },
/* 73 */
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(75);
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, "#eruda {\n  pointer-events: none;\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 100000;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }\n  #eruda * {\n    box-sizing: border-box;\n    pointer-events: all; }\n  #eruda ul {\n    list-style: none;\n    padding: 0;\n    margin: 0; }\n  #eruda pre {\n    padding: 0;\n    margin: 0; }\n  #eruda h1, #eruda h2, #eruda h3, #eruda h4 {\n    margin: 0; }\n", ""]);

	// exports


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(77);
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, "@font-face {\n    font-family: 'icomoon';\n    src: url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAeAAAsAAAAABzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIF2WNtYXAAAAFoAAAAVAAAAFQXVtKLZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAA2AAAANgVhdUnGhlYWQAAAUkAAAANgAAADYJuqOraGhlYQAABVwAAAAkAAAAJAfCA8pobXR4AAAFgAAAACQAAAAkGgAAQGxvY2EAAAWkAAAAFAAAABQCIAMgbWF4cAAABbgAAAAgAAAAIAARAERuYW1lAAAF2AAAAYYAAAGGmUoJ+3Bvc3QAAAdgAAAAIAAAACAAAwAAAAMDqwGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QQDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkE//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAgAA/8AEAAPAABkAMgAAAS4DIyIOAhUzND4CMzIeAhcHIREHExQOAiMiLgInNyERNx4DMzI+AjUDeiNVYGo4aruLUGBBcZhWLldPRR2WAWCGJkFxmFYuV09FHZb+oIYjVWBqOGq7i1ADGiY+KxdQi7tqVphxQRMkMyCWAWCG/qZWmHFBEyQzIJb+oIYmPisXUIu7agAAAAAFAAAAAAQAA4AAAwAHAAsAHwAjAAATESERAyERIQchESEBIxUjFSM1MzUzNSM1IzUzFTMVMwUjNTMABABA/IADgED9AAMA/kBAQEBAQEBAQEBAAQDAwAOA/IADgPzAAwBA/YABQEBAQEBAQEBAQMBAAAAAAAcAQP/AA4ADwAAJAA0AEQAVABkALQAxAAATERQWMyEyNjURASMRMxMjETMTIxEzEyMRMxMjNTQmKwEiBh0BIyIGHQEhNTQmISM1M4AmGgJAGib+AEBAgEBAgEBAgEBAkNAcFOAUHNAUHANAHP7cwMACgP2AGiYmGgKA/cABwP5AAcD+QAHA/kABwAFAUBQcHBRQHBRQUBQcPwAAAAMAAP/ABAADwAAoADQAQQAAAS4DIyIOAgcOAxUUHgIXHgMzMj4CNz4DNTQuAicTFAYHAT4BMzIeAgU0NjcBDgEjIi4CNQNqJFRcYzMzY1xUJCQ4JhQUJjgkJFRcYzMzY1xUJCQ4JhQUJjgkFiYh/ekvcT5PjGk8/QAmIQIXL3E+T4xpPAMqJDgmFBQmOCQkVFxjMzNjXFQkJDgmFBQmOCQkVFxjMzNjXFQk/pY+cS8CFyEmPGmMTz5xL/3pISY8aYxPAAAEAAD/wAQAA8AADwAZAC0AQQAAATQ2OwEyFh0BFAYrASImNRMhNTM1IzUzETMDIg4CFRQeAjMyPgI1NC4CAyIuAjU0PgIzMh4CFRQOAgHAHBQgFBwcFCAUHMD/AEBAwECAaruLUFCLu2pqu4tQUIu7alaYcUFBcZhWVphxQUFxmAKQFBwcFCAUHBwU/lBAwED/AALAUIu7amq7i1BQi7tqaruLUPxgQXGYVlaYcUFBcZhWVphxQQAAAQAAAAAAALdAQ69fDzz1AAsEAAAAAADTTi+XAAAAANNOL5cAAP/ABAADwAAAAAgAAgAAAAAAAAABAAADwP/AAAAEAAAAAAAEAAABAAAAAAAAAAAAAAAAAAAACQQAAAAAAAAAAAAAAAIAAAAEAAAABAAAAAQAAEAEAAAABAAAAAAAAAAACgAUAB4AagCkAPIBVAGwAAEAAAAJAEIABwAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAHAAAAAQAAAAAAAgAHAGAAAQAAAAAAAwAHADYAAQAAAAAABAAHAHUAAQAAAAAABQALABUAAQAAAAAABgAHAEsAAQAAAAAACgAaAIoAAwABBAkAAQAOAAcAAwABBAkAAgAOAGcAAwABBAkAAwAOAD0AAwABBAkABAAOAHwAAwABBAkABQAWACAAAwABBAkABgAOAFIAAwABBAkACgA0AKRpY29tb29uAGkAYwBvAG0AbwBvAG5WZXJzaW9uIDEuMABWAGUAcgBzAGkAbwBuACAAMQAuADBpY29tb29uAGkAYwBvAG0AbwBvAG5pY29tb29uAGkAYwBvAG0AbwBvAG5SZWd1bGFyAFIAZQBnAHUAbABhAHJpY29tb29uAGkAYwBvAG0AbwBvAG5Gb250IGdlbmVyYXRlZCBieSBJY29Nb29uLgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA') format('woff');\n    font-weight: normal;\n    font-style: normal;\n}\n\n[class^=\"eruda-icon-\"], [class*=\" icon-\"] {\n    /* use !important to prevent issues with browser extensions that change fonts */\n    font-family: 'icomoon' !important;\n    speak: none;\n    font-style: normal;\n    font-weight: normal;\n    font-variant: normal;\n    text-transform: none;\n    line-height: 1;\n\n    /* Better Font Rendering =========== */\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\n.eruda-icon-info:before {\n    content: \"\\E904\";\n}\n.eruda-icon-blocked:before {\n    content: \"\\E903\";\n}\n.eruda-icon-terminal:before {\n    content: \"\\E901\";\n}\n.eruda-icon-bin:before {\n    content: \"\\E902\";\n}\n.eruda-icon-loop:before {\n    content: \"\\E900\";\n}\n\n", ""]);

	// exports


/***/ }
/******/ ]);