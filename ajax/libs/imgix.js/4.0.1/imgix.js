(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
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
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

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

module.exports = debounce;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
var util = require('./util.js'),
  targetWidths = require('./targetWidths.js'),
  autoSize = require('./autoSize');

var ImgixTag = (function () {
  function ImgixTag(el, opts) {
    this.el = el;
    this.settings = opts || {};

    if (!this.el) {
      console.warn('ImgixTag must be passed a DOM element.');
      return;
    }

    this.window = this.settings.window ? this.settings.window : null;

    if (this.el.hasAttribute('ix-initialized') && !this.settings.force) {
      return;
    }

    this.ixPathVal = el.getAttribute(this.settings.pathInputAttribute);
    this.ixParamsVal = el.getAttribute(this.settings.paramsInputAttribute);
    this.ixSrcVal = el.getAttribute(this.settings.srcInputAttribute);
    this.ixHostVal =
      el.getAttribute(this.settings.hostInputAttribute) || this.settings.host;

    if (this.ixPathVal && !this.ixHostVal) {
      console.warn(
        'You must set a value for `imgix.config.host` or specify an `ix-host` attribute to use `ix-path` and `ix-params`.'
      );
      return;
    }

    if (typeof this.ixPathVal === 'string' && this.ixPathVal.length == 0) {
      console.warn('`ix-path` cannot accept a value of empty string ""');
      return;
    }

    if (typeof this.ixSrcVal === 'string' && this.ixSrcVal.length == 0) {
      console.warn('`ix-src` cannot accept a value of empty string ""');
      return;
    }

    this.baseParams = this._extractBaseParams();
    this.baseUrl = this._buildBaseUrl();
    this.baseUrlWithoutQuery = this.baseUrl.split('?')[0];

    //manual override to use sizes, srcset, and src when lazyloading
    if(util.isString(this.el.className)){
      if (this.el.className.includes("nolazyload")){
        this.settings.sizesAttribute = "sizes";
        this.settings.srcsetAttribute = "srcset";
        this.settings.srcAttribute = "src";
      }
    }

    if (util.isString(this.settings.sizesAttribute)) {
      this.el.setAttribute(this.settings.sizesAttribute, this.sizes());
    }

    if (util.isString(this.settings.srcsetAttribute)) {
      this.el.setAttribute(this.settings.srcsetAttribute, this.srcset());
    }

    if (
      util.isString(this.settings.srcAttribute) &&
      this.el.nodeName == 'IMG'
    ) {
      this.el.setAttribute(this.settings.srcAttribute, this.src());
    }

    this.el.setAttribute('ix-initialized', 'ix-initialized');
  }

  ImgixTag.prototype._extractBaseParams = function () {
    var params = {};

    if (
      this.settings.defaultParams &&
      typeof this.settings.defaultParams === 'object' &&
      this.settings.defaultParams !== null
    ) {
      params = Object.assign({}, this.settings.defaultParams);
    }

    if (this.ixPathVal) {
      params = Object.assign({}, params, JSON.parse(this.ixParamsVal) || {});

      // Encode any passed Base64 variant params
      for (var key in params) {
        if (key.substr(-2) === '64') {
          params[key] = util.encode64(params[key]);
        }
      }
    } else {
      // If the user used `ix-src`, we have to extract the base params
      // from that string URL.
      var lastQuestion = this.ixSrcVal.lastIndexOf('?');

      if (lastQuestion > -1) {
        var paramString = this.ixSrcVal.substr(lastQuestion + 1),
          splitParams = paramString.split('&');

        for (var i = 0, splitParam; i < splitParams.length; i++) {
          splitParam = splitParams[i].split('=');

          params[splitParam[0]] = splitParam[1];
        }
      }
    }

    if (this.settings.includeLibraryParam) {
      params.ixlib = 'imgixjs-' + imgix.VERSION;
    }

    return params;
  };

  ImgixTag.prototype._buildBaseUrl = function () {
    if (this.ixSrcVal) {
      return this.ixSrcVal;
    }

    var path = this.ixPathVal,
      protocol = this.settings.useHttps ? 'https' : 'http',
      url = protocol + '://' + this.ixHostVal,
      hostEndsWithSlash = this.ixHostVal.substr(-1) === '/',
      pathStartsWithSlash = path[0] === '/';

    // Make sure we don't end up with 2 or 0 slashes between
    // the host and path portions of the generated URL
    if (hostEndsWithSlash && pathStartsWithSlash) {
      url += path.substr(1);
    } else if (!hostEndsWithSlash && !pathStartsWithSlash) {
      url += '/' + path;
    } else {
      url += path;
    }

    url += '?';
    var params = [],
      param;
    for (var key in this.baseParams) {
      param = this.baseParams[key];
      if (param == null) {
        continue;
      }

      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(param));
    }

    url += params.join('&');

    return url;
  };

  ImgixTag.prototype._buildSrcsetPair = function (targetWidth) {
    var clonedParams = util.shallowClone(this.baseParams);
    clonedParams.w = targetWidth;

    var url = this.baseUrlWithoutQuery + '?',
      val,
      params = [];
    for (var key in clonedParams) {
      val = clonedParams[key];
      params.push(key + '=' + val);
    }

    url += params.join('&');

    return url + ' ' + targetWidth + 'w';
  };

  ImgixTag.prototype.src = function () {
    return this.baseUrl;
  };

  // Returns a comma-separated list of `url widthDescriptor` pairs,
  // scaled appropriately to the same aspect ratio as the base image
  // as appropriate.
  ImgixTag.prototype.srcset = function () {
    var pairs = [];

    for (var i = 0; i < targetWidths.length; i++) {
      pairs.push(this._buildSrcsetPair(targetWidths[i]));
    }

    return pairs.join(', ');
  };

  ImgixTag.prototype.sizes = function () {
    var existingSizes = this.el.getAttribute('sizes');
    var ixSizes = this.el.getAttribute('ix-sizes');
    const el = this.el;
    const _window = this.window;

    /**
     *
     * The conditionals bellow decide when to override the value for `sizes` for
     * the given element.
     *
     * - If `sizes` set, we leave the value as is even if `ix-sizes` is `auto`
     * - If `sizes` not set and `ix-sizes` not auto, set `sizes` to `ix-sizes`
     * - If `sizes` not set and `ix-sizes` is auto, set `sizes` automatically
     * - If `sizes` and `ix-sizes` not set, set `sizes` to browser default
     */

    if (existingSizes == null && ixSizes !== 'auto') {
      return ixSizes ? ixSizes : '100vw';
    } else if (existingSizes == null && ixSizes === 'auto') {
      return autoSize.updateOnResize({ el, existingSizes, ixSizes, _window });
    } else {
      return existingSizes ? existingSizes : '100vw';
    }
  };

  return ImgixTag;
})();

module.exports = ImgixTag;

},{"./autoSize":3,"./targetWidths.js":6,"./util.js":7}],3:[function(require,module,exports){
const util = require('./util');

const WIDTH_MIN_SIZE = 40;
const DEBOUNCE_TIMEOUT = 200;

/**
 * Function that returns an element width that's equal to or greater than
 * WIDTH_MIN_SIZE.
 *
 * If the element width is less than the minimum, it will recursively
 * look for first parent element with width greater than WIDTH_MIN_SIZE.
 *
 * As a fallback, if the resulting width is still less than minimum, width
 * is set to WIDTH_MIN_SIZE.
 *
 * We do this to avoid failing to resize when window expands and avoid
 * setting sizes to 0 when el.offsetWidth == 0.
 */
const getWidth = function ({ parent, width }) {
  if (width < WIDTH_MIN_SIZE) {
    width = WIDTH_MIN_SIZE;

    // TODO: add check and test for parent == null
    let parentWidth = parent.offsetWidth;
    let parentNode = parent.parentNode;

    // get the fist parent that has a size over the minimum
    while (parentNode && parentWidth < width) {
      parentWidth = parentNode.offsetWidth;

      // set for next loop
      parentNode = parentNode.parentNode;
    }

    if (parentWidth > width) {
      width = parentWidth;
    }
  }
  return width;
};

// Based off of: https://stackoverflow.com/questions/1977871/check-if-an-image-is-loaded-no-errors-with-jquery
// Determines if the `img` element was rendered on the page
const imageLoaded = ({ el }) => {
  // During the onload event, browser identifies any images that
  // weren’t downloaded as not complete. Some Gecko-based browsers
  // report this incorrectly. More here: https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-complete
  if (!el.complete) {
    console.warn(
      'Imgix.js: attempted to set sizes attribute on element with complete evaluating to false'
    );
    return false;
  }

  // naturalWidth and naturalHeight give the intrinsic (natural),
  // density-corrected size of the image. If img failed to load,
  // both of these will be zero. More here: https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-naturalheight
  if (el.naturalWidth === 0) {
    console.warn(
      'Imgix.js: attempted to set sizes attribute on element with no naturalWidth'
    );
    return false;
  }

  // Otherwise, assume it’s ok.
  return true;
};

// Returns true if img has sizes attr and the img has loaded.
const imgCanBeSized = ({ el, existingSizes, ixSizes, elHasAttributes }) => {
  if (!existingSizes && !ixSizes) {
    console.warn(
      'Imgix.js: attempted to set sizes attribute on element without existing sizes attribute value'
    );
    return false;
  }

  if (!elHasAttributes) {
    console.warn(
      'Imgix.js: attempted to set sizes attribute on element with no attributes'
    );
    return false;
  }

  return imageLoaded({ el });
};

const getCurrentSize = ({
  el,
  existingSizes,
  ixSizes,
  elHasAttributes,
  _window,
}) => {
  // TODO: instead of sizes="557px" do sizes="(max-width: currentBrowserWidth + 100) 557px, 100vw"
  // browserWidth = 1000px, image width = 500px
  // sizes="(max-width: currentBrowserWidth + 100) 557px, (imageWidth / browserWidth * 100)vw" --> 50vw

  // If image loaded calc size, otherwise leave as existing
  let currentSize = imgCanBeSized({
    el,
    existingSizes,
    ixSizes,
    elHasAttributes,
    _window,
  })
    ? getWidth({
        el,
        parent: el.parentNode,
        width: el.offsetWidth,
      }) + 'px'
    : existingSizes;

  return currentSize;
};

const resizeElement = ({
  el,
  existingSizes,
  ixSizes,
  _window,
  elHasAttributes,
}) => {
  // Run our resize function callback that calcs current size
  // and updates the elements `sizes` to match.
  const currentSize = getCurrentSize({
    el,
    existingSizes,
    ixSizes,
    elHasAttributes,
    _window,
  });

  // Only update element attributes if changed
  if (currentSize !== existingSizes) {
    _window.requestAnimationFrame(() => {
      el.setAttribute('sizes', currentSize);
    });
  }
};

// Function that makes throttled rAF calls to avoid multiple calls in the same frame
const updateOnResize = ({ el, existingSizes, ixSizes, _window }) => {
  // debounce fn
  const elHasAttributes = el.hasAttributes();

  const requestIdleCallback = util.rICShim(_window);
  const runDebounce = util.debounce(() => {
    requestIdleCallback(() =>
      resizeElement({ el, existingSizes, ixSizes, _window, elHasAttributes })
    );
  }, DEBOUNCE_TIMEOUT);
  // Listen for resize
  _window.addEventListener('resize', runDebounce, false);
  // Return the current size
  return (
    getWidth({
      el,
      parent: el.parentNode,
      width: el.offsetWidth,
    }) + 'px'
  );
};

const autoSize = {
  getElementWidth: getWidth,
  imgCanBeSized,
  updateOnResize,
};

module.exports = autoSize;

},{"./util":7}],4:[function(require,module,exports){
module.exports = {
  // URL assembly
  host: null,
  useHttps: true,
  includeLibraryParam: true,
  defaultParams: {},

  // Output element attributes
  srcAttribute: 'src',
  srcsetAttribute: 'srcset',
  sizesAttribute: 'sizes',

  // Input element attributes
  srcInputAttribute: 'ix-src',
  pathInputAttribute: 'ix-path',
  paramsInputAttribute: 'ix-params',
  hostInputAttribute: 'ix-host',
  window: typeof window !== 'undefined' ? window : null,
};

},{}],5:[function(require,module,exports){
(function (global){(function (){
var ImgixTag = require('./ImgixTag.js'),
  util = require('./util.js'),
  defaultConfig = require('./defaultConfig');

var VERSION = '4.0.1';

global.imgix = {
  init: function (opts) {
    var settings = util.shallowClone(this.config);
    util.extend(settings, opts || {});

    var elementQuery = [
      'img[' + settings.srcInputAttribute + ']',
      'source[' + settings.srcInputAttribute + ']',
      'img[' + settings.pathInputAttribute + ']',
      'source[' + settings.pathInputAttribute + ']',
    ].join(',');

    var allImgandSourceTags = document.querySelectorAll(elementQuery);

    for (var i = 0, el; i < allImgandSourceTags.length; i++) {
      new ImgixTag(allImgandSourceTags[i], settings);
    }
  },
  config: defaultConfig,
  VERSION: VERSION,
};

util.domReady(function () {
  util.objectEach(defaultConfig, function (defaultValue, key) {
    var metaTagValue = util.getMetaTagValue(key);

    if (typeof metaTagValue !== 'undefined') {
      var defaultConfigType = typeof defaultConfig[key];
      // Only allow boolean values for boolean configs
      if (defaultConfigType === 'boolean') {
        global.imgix.config[key] = !!metaTagValue;
      } else if (defaultConfigType === 'object' && defaultConfig[key] != null) {
        global.imgix.config[key] = JSON.parse(metaTagValue) || {};
      } else {
        global.imgix.config[key] = metaTagValue;
      }
    }
  });

  if (util.getMetaTagValue('autoInit') !== false) {
    global.imgix.init();
  }
});

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ImgixTag.js":2,"./defaultConfig":4,"./util.js":7}],6:[function(require,module,exports){
function targetWidths() {
  var resolutions = [];
  var prev = 100;
  var INCREMENT_PERCENTAGE = 8;
  var MAX_SIZE = 8192;

  function ensureEven(n) {
    return 2 * Math.round(n / 2);
  }

  while (prev <= MAX_SIZE) {
    resolutions.push(ensureEven(prev));
    prev *= 1 + (INCREMENT_PERCENTAGE / 100) * 2;
  }

  return resolutions;
}

module.exports = targetWidths();

},{}],7:[function(require,module,exports){
const _debounce = require('lodash.debounce');

module.exports = {
  compact: function (arr) {
    var compactedArr = [];

    for (var i = 0; i < arr.length; i++) {
      arr[i] && compactedArr.push(arr[i]);
    }

    return compactedArr;
  },
  shallowClone: function (obj) {
    var clone = {};

    for (var key in obj) {
      clone[key] = obj[key];
    }

    return clone;
  },
  extend: function (dest, source) {
    for (var key in source) {
      dest[key] = source[key];
    }

    return dest;
  },
  uniq: function (arr) {
    var n = {},
      r = [],
      i;

    for (i = 0; i < arr.length; i++) {
      if (!n[arr[i]]) {
        n[arr[i]] = true;
        r.push(arr[i]);
      }
    }

    return r;
  },
  objectEach: function (obj, iterator) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        iterator(obj[key], key);
      }
    }
  },
  isString: function (value) {
    return typeof value === 'string';
  },
  encode64: function (str) {
    var encodedUtf8Str = unescape(encodeURIComponent(str)),
      b64Str = btoa(encodedUtf8Str),
      urlSafeB64Str = b64Str.replace(/\+/g, '-');

    urlSafeB64Str = urlSafeB64Str
      .replace(/\//g, '_')
      .replace(/\//g, '_')
      .replace(/\=+$/, '');

    return urlSafeB64Str;
  },
  decode64: function (urlSafeB64Str) {
    var b64Str = urlSafeB64Str.replace(/-/g, '+').replace(/_/g, '/'),
      encodedUtf8Str = atob(b64Str),
      str = decodeURIComponent(escape(encodedUtf8Str));

    return str;
  },
  domReady: function (cb) {
    if (document.readyState === 'complete') {
      setTimeout(cb, 0);
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', cb, false);
    } else {
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState === 'complete') {
          cb();
        }
      });
    }
  },
  getMetaTagValue: function (propertyName) {
    var metaTag = document.querySelector(
        'meta[property="ix:' + propertyName + '"]'
      ),
      metaTagContent;

    if (!metaTag) {
      return;
    }

    metaTagContent = metaTag.getAttribute('content');

    if (metaTagContent === 'true') {
      return true;
    } else if (metaTagContent === 'false') {
      return false;
    } else if (metaTagContent === '' || metaTagContent === 'null') {
      return null;
    } else {
      return metaTagContent;
    }
  },
  debounce: _debounce,
  rICShim: function (_window) {
    // from: https://developers.google.com/web/updates/2015/08/using-requestidlecallback#checking_for_requestidlecallback
    return (
      _window.requestIdleCallback ||
      function (cb) {
        var start = Date.now();
        return setTimeout(function () {
          cb({
            didTimeout: false,
            timeRemaining: function () {
              return Math.max(0, 50 - (Date.now() - start));
            },
          });
        }, 1);
      }
    );
  },
};

},{"lodash.debounce":1}]},{},[5]);
