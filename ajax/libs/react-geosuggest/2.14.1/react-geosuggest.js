var Geosuggest = (function (React) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, basedir, module) {
    	return module = {
    		path: basedir,
    		exports: {},
    		require: function (path, base) {
    			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    		}
    	}, fn(module, module.exports), module.exports;
    }

    function commonjsRequire () {
    	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
    }

    var classnames = createCommonjsModule(function (module) {
    /*!
      Copyright (c) 2017 Jed Watson.
      Licensed under the MIT License (MIT), see
      http://jedwatson.github.io/classnames
    */
    /* global define */

    (function () {

    	var hasOwn = {}.hasOwnProperty;

    	function classNames () {
    		var classes = [];

    		for (var i = 0; i < arguments.length; i++) {
    			var arg = arguments[i];
    			if (!arg) continue;

    			var argType = typeof arg;

    			if (argType === 'string' || argType === 'number') {
    				classes.push(arg);
    			} else if (Array.isArray(arg) && arg.length) {
    				var inner = classNames.apply(null, arg);
    				if (inner) {
    					classes.push(inner);
    				}
    			} else if (argType === 'object') {
    				for (var key in arg) {
    					if (hasOwn.call(arg, key) && arg[key]) {
    						classes.push(key);
    					}
    				}
    			}
    		}

    		return classes.join(' ');
    	}

    	if ( module.exports) {
    		classNames.default = classNames;
    		module.exports = classNames;
    	} else {
    		window.classNames = classNames;
    	}
    }());
    });

    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    /** Used as the `TypeError` message for "Functions" methods. */
    var FUNC_ERROR_TEXT = 'Expected a function';

    /** Used as references for various `Number` constants. */
    var NAN = 0 / 0;

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /** Used to match leading and trailing whitespace. */
    var reTrim = /^\s+|\s+$/g;

    /** Used to detect bad signed hexadecimal string values. */
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

    /** Used to detect binary string values. */
    var reIsBinary = /^0b[01]+$/i;

    /** Used to detect octal string values. */
    var reIsOctal = /^0o[0-7]+$/i;

    /** Built-in method references without a dependency on `root`. */
    var freeParseInt = parseInt;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max,
        nativeMin = Math.min;

    /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */
    var now = function() {
      return root.Date.now();
    };

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */
    function debounce(func, wait, options) {
      var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            result = wait - timeSinceLastCall;

        return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
      }

      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
      }

      function cancel() {
        if (timerId !== undefined) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      }

      function flush() {
        return timerId === undefined ? result : trailingEdge(now());
      }

      function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
          if (timerId === undefined) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            // Handle invocations in a tight loop.
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === undefined) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && objectToString.call(value) == symbolTag);
    }

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    var lodash_debounce = debounce;

    /* istanbul ignore next */
    /* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function */
    /**
     * Default values
     */
    var defaults = {
        autoActivateFirstSuggest: false,
        disabled: false,
        fixtures: [],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getSuggestLabel: function (suggest) { return suggest.description; },
        highlightMatch: true,
        ignoreEnter: false,
        ignoreTab: false,
        initialValue: '',
        maxFixtures: 10,
        minLength: 1,
        onKeyDown: function () { },
        onKeyPress: function () { },
        placeholder: 'Search places',
        queryDelay: 250,
        skipSuggest: function () { return false; },
        style: {},
        inputType: 'text'
    };

    /**
     * Attributes allowed on input elements
     */
    var allowedAttributes = [
        'autoCapitalize',
        'autoComplete',
        'autoCorrect',
        'autoFocus',
        'disabled',
        'form',
        'formAction',
        'formEncType',
        'formMethod',
        'formNoValidate',
        'formTarget',
        'height',
        'inputMode',
        'maxLength',
        'name',
        'onClick',
        'onContextMenu',
        'onCopy',
        'onCut',
        'onDoubleClick',
        'onMouseDown',
        'onMouseEnter',
        'onMouseLeave',
        'onMouseMove',
        'onMouseOut',
        'onMouseOver',
        'onMouseUp',
        'onPaste',
        'pattern',
        'placeholder',
        'readOnly',
        'required',
        'size',
        'spellCheck',
        'tabIndex',
        'title',
        'aria-atomic',
        'aria-busy',
        'aria-controls',
        'aria-current',
        'aria-describedby',
        'aria-details',
        'aria-disabled',
        'aria-dropeffect',
        'aria-errormessage',
        'aria-flowto',
        'aria-grabbed',
        'aria-haspopup',
        'aria-hidden',
        'aria-invalid',
        'aria-keyshortcuts',
        'aria-label',
        'aria-labelledby',
        'aria-live',
        'aria-owns',
        'aria-relevant',
        'aria-roledescription',
        'aria-activedescendant',
        'aria-autocomplete',
        'aria-multiline',
        'aria-placeholder',
        'aria-readonly',
        'aria-required'
    ];
    /**
     * Filter the properties for only allowed input properties
     */
    function filterInputAttributes (props) {
        var attributes = {};
        Object.keys(props).forEach(function (attribute) {
            var isDataAttribute = attribute.startsWith('data-');
            var isAllowedAttribute = allowedAttributes.includes(attribute);
            if (isAllowedAttribute || isDataAttribute) {
                attributes[attribute] = props[attribute];
            }
        });
        return attributes;
    }

    /**
     * The input field
     */
    var Input = /** @class */ (function (_super) {
        __extends(Input, _super);
        /**
         * The constructor.
         */
        function Input(props) {
            var _this = _super.call(this, props) || this;
            /* eslint-enable @typescript-eslint/no-empty-function */
            /**
             * The reference to the input element
             */
            _this.input = null;
            _this.onChange = _this.onChange.bind(_this);
            _this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
            return _this;
        }
        /**
         * When the input got changed
         */
        Input.prototype.onChange = function () {
            if (this.input) {
                this.props.onChange(this.input.value);
            }
        };
        /**
         * When a key gets pressed in the input
         */
        // eslint-disable-next-line complexity
        Input.prototype.onInputKeyDown = function (event) {
            // Call props.onKeyDown if defined
            // Gives the developer a little bit more control if needed
            if (this.props.onKeyDown) {
                this.props.onKeyDown(event);
            }
            switch (event.which) {
                case 40: // DOWN
                    if (!event.shiftKey) {
                        event.preventDefault();
                        this.props.onNext();
                    }
                    break;
                case 38: // UP
                    if (!event.shiftKey) {
                        event.preventDefault();
                        this.props.onPrev();
                    }
                    break;
                case 13: // ENTER
                    if (this.props.doNotSubmitOnEnter) {
                        event.preventDefault();
                    }
                    if (!this.props.ignoreEnter) {
                        this.props.onSelect();
                    }
                    break;
                case 9: // TAB
                    if (!this.props.ignoreTab) {
                        this.props.onSelect();
                    }
                    break;
                case 27: // ESC
                    this.props.onEscape();
                    break;
            }
        };
        /**
         * Focus the input
         */
        Input.prototype.focus = function () {
            if (this.input) {
                this.input.focus();
            }
        };
        /**
         * Blur the input
         */
        Input.prototype.blur = function () {
            if (this.input) {
                this.input.blur();
            }
        };
        /**
         * Render the view
         */
        Input.prototype.render = function () {
            var _this = this;
            var attributes = filterInputAttributes(this.props);
            var classes = classnames('geosuggest__input', this.props.className);
            var shouldRenderLabel = this.props.label && this.props.id;
            if (!attributes.tabIndex) {
                attributes.tabIndex = 0;
            }
            return (React.createElement(React.Fragment, null,
                shouldRenderLabel && (React.createElement("label", { className: "geosuggest__label", htmlFor: this.props.id }, this.props.label)),
                React.createElement("input", __assign({ className: classes, id: "geosuggest__input" + (this.props.id ? "--" + this.props.id : ''), ref: function (i) { return (_this.input = i); }, type: this.props.inputType }, attributes, { value: this.props.value, style: this.props.style, onKeyDown: this.onInputKeyDown, onChange: this.onChange, onKeyPress: this.props.onKeyPress, onFocus: this.props.onFocus, onBlur: this.props.onBlur, role: "combobox", "aria-expanded": !this.props.isSuggestsHidden, "aria-activedescendant": this.props.activeSuggest
                        ? this.props.activeSuggest.placeId
                        : // eslint-disable-next-line no-undefined
                            undefined, "aria-owns": this.props.listId }))));
        };
        /* eslint-disable @typescript-eslint/no-empty-function */
        /**
         * Default values for the properties
         */
        Input.defaultProps = {
            activeSuggest: null,
            autoComplete: 'nope',
            className: '',
            isSuggestsHidden: true,
            listId: '',
            inputType: 'text',
            onBlur: function () { },
            onChange: function () { },
            onEscape: function () { },
            onFocus: function () { },
            onKeyDown: function () { },
            onKeyPress: function () { },
            onNext: function () { },
            onPrev: function () { },
            onSelect: function () { },
            value: ''
        };
        return Input;
    }(React.PureComponent));

    /**
     * A single Geosuggest item in the list
     */
    var default_1 = /** @class */ (function (_super) {
        __extends(default_1, _super);
        /**
         * The constructor.
         */
        function default_1(props) {
            var _this = _super.call(this, props) || this;
            /**
             * The reference to the suggest element
             */
            _this.ref = null;
            _this.onClick = _this.onClick.bind(_this);
            return _this;
        }
        /**
         * Makes a text bold
         */
        default_1.prototype.makeBold = function (element, key) {
            return (React.createElement("b", { className: "geosuggest__item__matched-text", key: key }, element));
        };
        /**
         * Replace matched text with the same in bold
         */
        default_1.prototype.formatMatchedText = function (userInput, suggest) {
            if (!userInput || !suggest.matchedSubstrings) {
                return suggest.label;
            }
            var start = suggest.matchedSubstrings.offset;
            var length = suggest.matchedSubstrings.length;
            var end = start + length;
            var boldPart = this.makeBold(suggest.label.substring(start, end), suggest.label);
            var pre = '';
            var post = '';
            if (start > 0) {
                pre = suggest.label.slice(0, start);
            }
            if (end < suggest.label.length) {
                post = suggest.label.slice(end);
            }
            return (React.createElement("span", null,
                pre,
                boldPart,
                post));
        };
        /**
         * Checking if item just became active and scrolling if needed.
         */
        default_1.prototype.componentDidUpdate = function (prevProps) {
            if (!prevProps.isActive && this.props.isActive) {
                this.scrollIfNeeded();
            }
        };
        /**
         * Scrolling current item to the center of the list if item needs scrolling.
         * Item is scrolled to the center of the list.
         */
        default_1.prototype.scrollIfNeeded = function () {
            var element = this.ref;
            var parent = element && element.parentElement;
            if (!element || !parent) {
                return;
            }
            var overTop = element.offsetTop - parent.offsetTop < parent.scrollTop;
            var overBottom = element.offsetTop - parent.offsetTop + element.clientHeight >
                parent.scrollTop + parent.clientHeight;
            if (overTop || overBottom) {
                parent.scrollTop =
                    element.offsetTop -
                        parent.offsetTop -
                        parent.clientHeight / 2 +
                        element.clientHeight / 2;
            }
        };
        /**
         * When the suggest item got clicked
         */
        default_1.prototype.onClick = function (event) {
            event.preventDefault();
            this.props.onSelect(this.props.suggest);
        };
        /**
         * Render the view
         */
        default_1.prototype.render = function () {
            var _a;
            var _this = this;
            var suggest = this.props.suggest;
            var classes = classnames('geosuggest__item', this.props.className, this.props.suggestItemClassName, { 'geosuggest__item--active': this.props.isActive }, (_a = {},
                _a[this.props.activeClassName || ''] = this.props.activeClassName
                    ? this.props.isActive
                    : null,
                _a));
            var content = suggest.label;
            if (this.props.renderSuggestItem) {
                content = this.props.renderSuggestItem(suggest, this.props.userInput);
            }
            else if (this.props.isHighlightMatch) {
                content = this.formatMatchedText(this.props.userInput, suggest);
            }
            return (React.createElement("li", { className: classes, ref: function (li) { return (_this.ref = li); }, style: this.props.style, onMouseDown: this.props.onMouseDown, onMouseOut: this.props.onMouseOut, onClick: this.onClick, role: "option", "aria-selected": this.props.isActive, id: suggest.placeId }, content));
        };
        return default_1;
    }(React.PureComponent));

    /**
     * The list with suggestions.
     */
    var default_1$1 = /** @class */ (function (_super) {
        __extends(default_1$1, _super);
        function default_1$1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Whether or not it is hidden
         */
        default_1$1.prototype.isHidden = function () {
            return this.props.isHidden || this.props.suggests.length === 0;
        };
        /**
         * There are new properties available for the list
         */
        default_1$1.prototype.componentDidUpdate = function (prevProps) {
            if (prevProps.suggests !== this.props.suggests) {
                if (this.props.suggests.length === 0) {
                    this.props.onSuggestNoResults();
                }
            }
        };
        /**
         * Render the view
         * @return {Function} The React element to render
         */
        default_1$1.prototype.render = function () {
            var _a;
            var _this = this;
            var classes = classnames('geosuggest__suggests', this.props.suggestsClassName, { 'geosuggest__suggests--hidden': this.isHidden() }, (_a = {},
                _a[this.props.hiddenClassName || ''] = this.props.hiddenClassName
                    ? this.isHidden()
                    : null,
                _a));
            return (React.createElement("ul", { className: classes, style: this.props.style, role: "listbox", id: this.props.listId }, this.props.suggests.map(function (suggest) {
                var isActive = (_this.props.activeSuggest &&
                    suggest.placeId === _this.props.activeSuggest.placeId) ||
                    false;
                return (React.createElement(default_1, { key: suggest.placeId, className: suggest.className || '', userInput: _this.props.userInput, isHighlightMatch: _this.props.isHighlightMatch, suggest: suggest, style: _this.props.suggestItemStyle, suggestItemClassName: _this.props.suggestItemClassName, isActive: isActive, activeClassName: _this.props.suggestItemActiveClassName, onMouseDown: _this.props.onSuggestMouseDown, onMouseOut: _this.props.onSuggestMouseOut, onSelect: _this.props.onSuggestSelect, renderSuggestItem: _this.props.renderSuggestItem }));
            })));
        };
        return default_1$1;
    }(React.PureComponent));

    /* global window */
    // Escapes special characters in user input for regex
    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }
    /**
     * Entry point for the Geosuggest component
     */
    var default_1$2 = /** @class */ (function (_super) {
        __extends(default_1, _super);
        /**
         * The constructor. Sets the initial state.
         */
        // eslint-disable-next-line max-statements
        function default_1(props) {
            var _this = _super.call(this, props) || this;
            /**
             * The Google Map instance
             */
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            _this.googleMaps = null;
            /**
             * The autocomple service to get suggests
             */
            _this.autocompleteService = null;
            /**
             * The places service to get place details
             */
            _this.placesService = null;
            /**
             * The sessionToken service to use session based monetization
             */
            _this.sessionToken = undefined;
            /**
             * The geocoder to get geocoded results
             */
            _this.geocoder = null;
            /**
             * The input component
             */
            _this.input = null;
            _this.state = {
                activeSuggest: null,
                ignoreBlur: false,
                isLoading: false,
                isSuggestsHidden: true,
                suggests: [],
                userInput: props.initialValue || ''
            };
            _this.onInputChange = _this.onInputChange.bind(_this);
            _this.onAfterInputChange = _this.onAfterInputChange.bind(_this);
            _this.onInputFocus = _this.onInputFocus.bind(_this);
            _this.onInputBlur = _this.onInputBlur.bind(_this);
            _this.onNext = _this.onNext.bind(_this);
            _this.onPrev = _this.onPrev.bind(_this);
            _this.onSelect = _this.onSelect.bind(_this);
            _this.onSuggestMouseDown = _this.onSuggestMouseDown.bind(_this);
            _this.onSuggestMouseOut = _this.onSuggestMouseOut.bind(_this);
            _this.onSuggestNoResults = _this.onSuggestNoResults.bind(_this);
            _this.hideSuggests = _this.hideSuggests.bind(_this);
            _this.selectSuggest = _this.selectSuggest.bind(_this);
            _this.listId = "geosuggest__list" + (props.id ? "--" + props.id : '');
            if (props.queryDelay) {
                _this.onAfterInputChange = lodash_debounce(_this.onAfterInputChange, props.queryDelay);
            }
            return _this;
        }
        /**
         * Change inputValue if prop changes
         */
        default_1.prototype.componentDidUpdate = function (prevProps) {
            if (prevProps.initialValue !== this.props.initialValue) {
                this.setState({ userInput: this.props.initialValue || '' });
            }
            if (JSON.stringify(prevProps.fixtures) !== JSON.stringify(this.props.fixtures)) {
                this.searchSuggests();
            }
        };
        /**
         * Called on the client side after component is mounted.
         * Google api sdk object will be obtained and cached as a instance property.
         * Necessary objects of google api will also be determined and saved.
         */
        default_1.prototype.componentDidMount = function () {
            if (typeof window === 'undefined') {
                return;
            }
            var googleMaps = this.props.googleMaps ||
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (window.google && window.google.maps) ||
                this.googleMaps;
            /* istanbul ignore next */
            if (!googleMaps) {
                if (console) {
                    // eslint-disable-next-line no-console
                    console.error('Google maps API was not found in the page.');
                }
                return;
            }
            this.googleMaps = googleMaps;
            this.autocompleteService = new googleMaps.places.AutocompleteService();
            this.placesService = new googleMaps.places.PlacesService(document.createElement('div'));
            this.sessionToken = new googleMaps.places.AutocompleteSessionToken();
            this.geocoder = new googleMaps.Geocoder();
        };
        /**
         * When the component will unmount
         */
        default_1.prototype.componentWillUnmount = function () {
            clearTimeout(this.timer);
        };
        /**
         * When the input changed
         */
        default_1.prototype.onInputChange = function (userInput) {
            if (!userInput) {
                if (this.props.onSuggestSelect) {
                    this.props.onSuggestSelect();
                }
            }
            this.setState({ userInput: userInput }, this.onAfterInputChange);
        };
        /**
         * On After the input got changed
         */
        default_1.prototype.onAfterInputChange = function () {
            this.showSuggests();
            if (this.props.onChange) {
                this.props.onChange(this.state.userInput);
            }
        };
        /**
         * When the input gets focused
         */
        default_1.prototype.onInputFocus = function () {
            if (this.props.onFocus) {
                this.props.onFocus();
            }
            this.showSuggests();
        };
        /**
         * When the input gets blurred
         */
        default_1.prototype.onInputBlur = function () {
            if (!this.state.ignoreBlur) {
                this.hideSuggests();
            }
        };
        default_1.prototype.onNext = function () {
            this.activateSuggest('next');
        };
        default_1.prototype.onPrev = function () {
            this.activateSuggest('prev');
        };
        default_1.prototype.onSelect = function () {
            this.selectSuggest(this.state.activeSuggest);
        };
        default_1.prototype.onSuggestMouseDown = function () {
            this.setState({ ignoreBlur: true });
        };
        default_1.prototype.onSuggestMouseOut = function () {
            this.setState({ ignoreBlur: false });
        };
        default_1.prototype.onSuggestNoResults = function () {
            if (this.props.onSuggestNoResults) {
                this.props.onSuggestNoResults(this.state.userInput);
            }
        };
        /**
         * Focus the input
         */
        default_1.prototype.focus = function () {
            if (this.input) {
                this.input.focus();
            }
        };
        /**
         * Blur the input
         */
        default_1.prototype.blur = function () {
            if (this.input) {
                this.input.blur();
            }
        };
        /**
         * Update the value of the user input
         */
        default_1.prototype.update = function (userInput) {
            this.setState({ userInput: userInput });
            if (this.props.onChange) {
                this.props.onChange(userInput);
            }
        };
        /*
         * Clear the input and close the suggestion pane
         */
        default_1.prototype.clear = function () {
            this.setState({ userInput: '' }, this.hideSuggests);
        };
        /**
         * Search for new suggests
         */
        // eslint-disable-next-line complexity, max-statements
        default_1.prototype.searchSuggests = function () {
            var _this = this;
            if (!this.state.userInput) {
                this.updateSuggests();
                return;
            }
            var options = {
                input: this.state.userInput,
                sessionToken: this.sessionToken
            };
            var inputLength = this.state.userInput.length;
            var isShorterThanMinLength = this.props.minLength && inputLength < this.props.minLength;
            if (isShorterThanMinLength) {
                this.updateSuggests();
                return;
            }
            var _a = this.props, location = _a.location, radius = _a.radius, bounds = _a.bounds, types = _a.types, country = _a.country;
            /* eslint-disable curly */
            if (location)
                options.location = location;
            if (radius)
                options.radius = Number(this.props.radius);
            if (bounds)
                options.bounds = bounds;
            if (types)
                options.types = types;
            if (country)
                options.componentRestrictions = { country: country };
            /* eslint-enable curly */
            this.setState({ isLoading: true }, function () {
                if (!_this.autocompleteService) {
                    _this.setState({ isLoading: false });
                    return;
                }
                _this.autocompleteService.getPlacePredictions(options, function (suggestsGoogle) {
                    _this.setState({ isLoading: false });
                    _this.updateSuggests(suggestsGoogle || [], // can be null
                    function () {
                        if (_this.props.autoActivateFirstSuggest &&
                            !_this.state.activeSuggest) {
                            _this.activateSuggest('next');
                        }
                    });
                });
            });
        };
        /**
         * Update the suggests
         */
        default_1.prototype.updateSuggests = function (suggestsGoogle, 
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function
        callback) {
            var _this = this;
            if (suggestsGoogle === void 0) { suggestsGoogle = []; }
            if (callback === void 0) { callback = function () { }; }
            var suggests = [];
            var userInput = this.state.userInput;
            var _a = this.props, skipSuggest = _a.skipSuggest, maxFixtures = _a.maxFixtures, fixtures = _a.fixtures;
            var regex = new RegExp(escapeRegExp(userInput), 'gim');
            var fixturesSearched = 0;
            var activeSuggest = null;
            if (fixtures) {
                fixtures.forEach(function (fixture) {
                    if (maxFixtures && fixturesSearched >= maxFixtures) {
                        return;
                    }
                    if (skipSuggest &&
                        !skipSuggest(fixture) &&
                        fixture.label.match(regex)) {
                        fixturesSearched++;
                        suggests.push(__assign(__assign({}, fixture), { isFixture: true, matchedSubstrings: {
                                length: userInput.length,
                                offset: fixture.label.indexOf(userInput)
                            }, placeId: fixture.placeId || fixture.label }));
                    }
                });
            }
            suggestsGoogle.forEach(function (suggest) {
                if (skipSuggest && !skipSuggest(suggest)) {
                    suggests.push({
                        description: suggest.description,
                        isFixture: false,
                        label: _this.props.getSuggestLabel
                            ? _this.props.getSuggestLabel(suggest)
                            : '',
                        matchedSubstrings: suggest.matched_substrings[0],
                        placeId: suggest.place_id
                    });
                }
            });
            activeSuggest = this.updateActiveSuggest(suggests);
            if (this.props.onUpdateSuggests) {
                this.props.onUpdateSuggests(suggests, activeSuggest);
            }
            this.setState({ suggests: suggests, activeSuggest: activeSuggest }, callback);
        };
        /**
         * Return the new activeSuggest object after suggests have been updated
         */
        default_1.prototype.updateActiveSuggest = function (suggests) {
            if (suggests === void 0) { suggests = []; }
            var activeSuggest = this.state.activeSuggest;
            if (activeSuggest) {
                var newSuggest = suggests.filter(function (listedSuggest) {
                    return activeSuggest &&
                        activeSuggest.placeId === listedSuggest.placeId &&
                        activeSuggest.isFixture === listedSuggest.isFixture;
                })[0];
                activeSuggest = newSuggest || null;
            }
            return activeSuggest;
        };
        /**
         * Show the suggestions
         */
        default_1.prototype.showSuggests = function () {
            this.searchSuggests();
            this.setState({ isSuggestsHidden: false });
        };
        /**
         * Hide the suggestions
         */
        default_1.prototype.hideSuggests = function () {
            var _this = this;
            if (this.props.onBlur) {
                this.props.onBlur(this.state.userInput);
            }
            this.timer = window.setTimeout(function () {
                _this.setState({
                    activeSuggest: null,
                    isSuggestsHidden: true
                });
            }, 100);
        };
        /**
         * Activate a new suggest
         */
        // eslint-disable-next-line complexity, max-statements
        default_1.prototype.activateSuggest = function (direction) {
            if (this.state.isSuggestsHidden) {
                this.showSuggests();
                return;
            }
            var suggestsCount = this.state.suggests.length - 1;
            var next = direction === 'next';
            var newActiveSuggest = null;
            var newIndex = 0;
            var i = 0;
            for (i; i <= suggestsCount; i++) {
                if (this.state.suggests[i] === this.state.activeSuggest) {
                    newIndex = next ? i + 1 : i - 1;
                }
            }
            if (!this.state.activeSuggest) {
                newIndex = next ? 0 : suggestsCount;
            }
            if (newIndex >= 0 && newIndex <= suggestsCount) {
                newActiveSuggest = this.state.suggests[newIndex];
            }
            if (this.props.onActivateSuggest) {
                this.props.onActivateSuggest(newActiveSuggest);
            }
            this.setState({ activeSuggest: newActiveSuggest });
        };
        /**
         * When an item got selected
         */
        // eslint-disable-next-line complexity
        default_1.prototype.selectSuggest = function (suggestToSelect) {
            var suggest = suggestToSelect || {
                isFixture: true,
                label: this.state.userInput,
                placeId: this.state.userInput
            };
            if (!suggestToSelect &&
                this.props.autoActivateFirstSuggest &&
                this.state.suggests.length > 0) {
                suggest = this.state.suggests[0];
            }
            this.setState({
                isSuggestsHidden: true,
                userInput: typeof suggest.label !== 'object'
                    ? suggest.label
                    : suggest.description || ''
            });
            if (suggest.location) {
                this.setState({ ignoreBlur: false });
                if (this.props.onSuggestSelect) {
                    this.props.onSuggestSelect(suggest);
                }
                return;
            }
            this.geocodeSuggest(suggest);
        };
        /**
         * Geocode a suggest
         */
        default_1.prototype.geocodeSuggest = function (suggestToGeocode) {
            var _this = this;
            if (!this.geocoder) {
                return;
            }
            if (suggestToGeocode.placeId &&
                !suggestToGeocode.isFixture &&
                this.placesService) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var options = {
                    placeId: suggestToGeocode.placeId,
                    sessionToken: this.sessionToken
                };
                if (this.props.placeDetailFields) {
                    options.fields = this.props.placeDetailFields;
                    options.fields.unshift('geometry');
                }
                this.placesService.getDetails(options, function (results, status) {
                    if (status === _this.googleMaps.places.PlacesServiceStatus.OK) {
                        var gmaps = results;
                        var location_1 = (gmaps.geometry &&
                            gmaps.geometry.location);
                        var suggest = __assign(__assign({}, suggestToGeocode), { gmaps: gmaps, location: {
                                lat: location_1.lat(),
                                lng: location_1.lng()
                            } });
                        _this.sessionToken = new google.maps.places.AutocompleteSessionToken();
                        if (_this.props.onSuggestSelect) {
                            _this.props.onSuggestSelect(suggest);
                        }
                    }
                });
            }
            else {
                var options = {
                    address: suggestToGeocode.label,
                    bounds: this.props.bounds,
                    componentRestrictions: this.props.country
                        ? { country: this.props.country }
                        : // eslint-disable-next-line no-undefined
                            undefined,
                    location: this.props.location
                };
                this.geocoder.geocode(options, function (results, status) {
                    if (status === _this.googleMaps.GeocoderStatus.OK) {
                        var gmaps = results[0];
                        var location_2 = (gmaps.geometry &&
                            gmaps.geometry.location);
                        var suggest = __assign(__assign({}, suggestToGeocode), { gmaps: gmaps, location: {
                                lat: location_2.lat(),
                                lng: location_2.lng()
                            } });
                        if (_this.props.onSuggestSelect) {
                            _this.props.onSuggestSelect(suggest);
                        }
                    }
                });
            }
        };
        /**
         * Render the view
         */
        default_1.prototype.render = function () {
            var _this = this;
            var attributes = filterInputAttributes(this.props);
            var classes = classnames('geosuggest', this.props.className, {
                'geosuggest--loading': this.state.isLoading
            });
            var input = (React.createElement(Input, __assign({ className: this.props.inputClassName, ref: function (i) { return (_this.input = i); }, value: this.state.userInput, doNotSubmitOnEnter: !this.state.isSuggestsHidden, ignoreTab: this.props.ignoreTab, ignoreEnter: this.props.ignoreEnter, style: this.props.style && this.props.style.input, onChange: this.onInputChange, onFocus: this.onInputFocus, onBlur: this.onInputBlur, onKeyDown: this.props.onKeyDown, onKeyPress: this.props.onKeyPress, inputType: this.props.inputType, onNext: this.onNext, onPrev: this.onPrev, onSelect: this.onSelect, onEscape: this.hideSuggests, isSuggestsHidden: this.state.isSuggestsHidden, activeSuggest: this.state.activeSuggest, label: this.props.label, id: this.props.id, listId: this.listId }, attributes)));
            var suggestionsList = (React.createElement(default_1$1, { isHidden: this.state.isSuggestsHidden, style: this.props.style && this.props.style.suggests, suggestItemStyle: this.props.style && this.props.style.suggestItem, userInput: this.state.userInput, isHighlightMatch: Boolean(this.props.highlightMatch), suggestsClassName: this.props.suggestsClassName, suggestItemClassName: this.props.suggestItemClassName, suggests: this.state.suggests, hiddenClassName: this.props.suggestsHiddenClassName, suggestItemActiveClassName: this.props.suggestItemActiveClassName, activeSuggest: this.state.activeSuggest, onSuggestNoResults: this.onSuggestNoResults, onSuggestMouseDown: this.onSuggestMouseDown, onSuggestMouseOut: this.onSuggestMouseOut, onSuggestSelect: this.selectSuggest, renderSuggestItem: this.props.renderSuggestItem, listId: this.listId }));
            return (React.createElement("div", { className: classes, id: this.props.id },
                React.createElement("div", { className: "geosuggest__input-wrapper" }, input),
                React.createElement("div", { className: "geosuggest__suggests-wrapper" }, suggestionsList)));
        };
        /**
         * Default values for the properties
         */
        default_1.defaultProps = defaults;
        return default_1;
    }(React.Component));

    return default_1$2;

}(React));
