/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 3.0.2
 * @requires billboard.js
 * @summary billboard.js plugin
*/
import { select } from 'd3-selection';

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
var _extendStatics = function extendStatics(d, b) {
  return _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
  }, _extendStatics(d, b);
};

function __extends(d, b) {
  function __() {
    this.constructor = d;
  }

  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + (b + "") + " is not a constructor or null");
  _extendStatics(d, b), d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Base class to generate billboard.js plugin
 * @class Plugin
 */

/**
 * Version info string for plugin
 * @name version
 * @static
 * @memberof Plugin
 * @type {string}
 * @example
 *   bb.plugin.stanford.version;  // ex) 1.9.0
 */
var Plugin = /*#__PURE__*/function () {
  /**
   * Version info string for plugin
   * @name version
   * @static
   * @memberof Plugin
   * @type {String}
   * @example
   *   bb.plugin.stanford.version;  // ex) 1.9.0
   */

  /**
   * Constructor
   * @param {Any} options config option object
   * @private
   */
  function Plugin(options) {
    options === void 0 && (options = {}), this.$$, this.options = options;
  }
  /**
   * Lifecycle hook for 'beforeInit' phase.
   * @private
   */


  var _proto = Plugin.prototype;
  return _proto.$beforeInit = function $beforeInit() {}
  /**
   * Lifecycle hook for 'init' phase.
   * @private
   */
  , _proto.$init = function $init() {}
  /**
   * Lifecycle hook for 'afterInit' phase.
   * @private
   */
  , _proto.$afterInit = function $afterInit() {}
  /**
   * Lifecycle hook for 'redraw' phase.
   * @private
   */
  , _proto.$redraw = function $redraw() {}
  /**
   * Lifecycle hook for 'willDestroy' phase.
   * @private
   */
  , _proto.$willDestroy = function $willDestroy() {
    var _this = this;

    Object.keys(this).forEach(function (key) {
      _this[key] = null, delete _this[key];
    });
  }, Plugin;
}();

Plugin.version = "#3.0.2#";

/**
 * Bubble compare diagram plugin.<br>
 * Compare data 3-dimensional ways: x-axis, y-axis & bubble-size.
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 * @class plugin-bubblecompare
 * @requires d3-selection
 * @param {object} options bubble compare plugin options
 * @augments Plugin
 * @returns {BubbleCompare}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-bubblecompare.js"></script>
 *
 *  var chart = bb.generate({
 *     data: {
 *        columns: [ ... ],
 *        type: "bubble"
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.bubblecompare({
 *          minR: 11,
 *          maxR: 74,
 *          expandScale: 1.1
 *        }),
 *     ]
 *  });
 * @example
 * import {bb} from "billboard.js";
 * import BubbleCompare from "billboard.js/dist/billboardjs-plugin-bubblecompare.esm";
 *
 * bb.generate({
 *     plugins: [
 *        new BubbleCompare({ ... })
 *     ]
 * })
 */
var BubbleCompare = /** @class */ (function (_super) {
    __extends(BubbleCompare, _super);
    function BubbleCompare(options) {
        var _this = _super.call(this, options) || this;
        return _this;
    }
    BubbleCompare.prototype.$init = function () {
        var $$ = this.$$;
        $$.findClosest = this.findClosest.bind(this);
        $$.getBubbleR = this.getBubbleR.bind(this);
        $$.pointExpandedR = this.pointExpandedR.bind(this);
    };
    BubbleCompare.prototype.pointExpandedR = function (d) {
        var baseR = this.getBubbleR(d);
        var _a = this.options.expandScale, expandScale = _a === void 0 ? 1 : _a;
        BubbleCompare.raiseFocusedBubbleLayer(d);
        this.changeCursorPoint();
        return baseR * expandScale;
    };
    BubbleCompare.raiseFocusedBubbleLayer = function (d) {
        d.raise && select(d.node().parentNode.parentNode).raise();
    };
    BubbleCompare.prototype.changeCursorPoint = function () {
        this.$$.$el.svg.select(".bb-event-rect").style("cursor", "pointer");
    };
    BubbleCompare.prototype.findClosest = function (values, pos) {
        var _this = this;
        var $$ = this.$$;
        return values
            .filter(function (v) { return v && !$$.isBarType(v.id); })
            .reduce(function (acc, cur) {
            var d = $$.dist(cur, pos);
            return d < _this.getBubbleR(cur) ? cur : acc;
        }, 0);
    };
    BubbleCompare.prototype.getBubbleR = function (d) {
        var _this = this;
        var _a = this.options, minR = _a.minR, maxR = _a.maxR;
        var curVal = this.getZData(d);
        if (!curVal)
            return minR;
        var _b = this.$$.data.targets.reduce(function (_a, cur) {
            var accMin = _a[0], accMax = _a[1];
            var val = _this.getZData(cur.values[0]);
            return [Math.min(accMin, val), Math.max(accMax, val)];
        }, [10000, 0]), min = _b[0], max = _b[1];
        var size = min > 0 && max === min ? 0 : curVal / max;
        return Math.abs(size) * (maxR - minR) + minR;
    };
    BubbleCompare.prototype.getZData = function (d) {
        return this.$$.isBubbleZType(d) ?
            this.$$.getBubbleZData(d.value, "z") :
            d.value;
    };
    BubbleCompare.version = "0.0.1";
    return BubbleCompare;
}(Plugin));

export default BubbleCompare;
