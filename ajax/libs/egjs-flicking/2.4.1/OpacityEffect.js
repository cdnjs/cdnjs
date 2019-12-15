this.eg = this.eg || {};
this.eg.Flicking = this.eg.Flicking || {};
this.eg.Flicking.plugin = this.eg.Flicking.plugin || {};
this.eg.Flicking.plugin.OpacityEffect = (function (Flicking) {
  'use strict';

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * Copyright (c) 2015 NAVER Corp.
   * egjs projects are licensed under the MIT license
   */

  var utils = Flicking.utils;
  var consts = utils.extend(utils.extend({}, Flicking.consts), {
    DIRECTION_NONE: Flicking.DIRECTION_NONE,
    DIRECTION_LEFT: Flicking.DIRECTION_LEFT,
    DIRECTION_RIGHT: Flicking.DIRECTION_RIGHT,
    DIRECTION_UP: Flicking.DIRECTION_UP,
    DIRECTION_DOWN: Flicking.DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: Flicking.DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: Flicking.DIRECTION_VERTICAL,
    DIRECTION_ALL: Flicking.DIRECTION_ALL
  });
  /**
   * Base class to generate flicking plugin
   * Lifecycle: componentWillMount --> componentMount --> componentDidMount --> componentWillUnmount
   * @ko Flicking 플러그인을 생성하기 위한 기본 클래스
   * @alias eg.Flicking.plugin
   * @private
   */

  var Plugin =
  /*#__PURE__*/
  function () {
    var Plugin =
    /*#__PURE__*/
    function () {
      /**
       * Constructor
       * @param {Object} options Option object <ko>옵션 객체</ko>
       */
      function Plugin(options) {
        if (options === void 0) {
          options = {};
        }

        this.options = options;
      }
      /**
       * Before mounting. It's init point from Flicking instance
       * @param {Flicking} instance Flicking instance
       * @returns {Plugin}
       */


      var _proto = Plugin.prototype;

      _proto.$componentWillMount = function $componentWillMount(instance) {
        this.$$ = instance; // get hint and layer-hack setting

        this.useWillChange = instance.$container.style.willChange === "transform";
        this.useLayerHack = this.getInstanceConf().useLayerHack;
        this.bindEvents();
        this.$componentMount();
        this.$componentDidMount();
        return this;
      };
      /**
       * After mounting
       * @return {Plugin}
       */


      _proto.$componentDidMount = function $componentDidMount() {
        return this;
      };
      /**
       * Before the destroy
       */


      _proto.$componentWillUnmount = function $componentWillUnmount() {
        var _this = this;

        Object.keys(this).forEach(function (v) {
          _this[v] = null;
        });
      };

      _proto.getInstanceConf = function getInstanceConf() {
        return this.$$._conf;
      };
      /**
       * Bind flicking custom events
       */


      _proto.bindEvents = function bindEvents() {
        this.$$.on({
          flick: this._onFlick.bind(this),
          flickEnd: this._onFlickEnd.bind(this),
          restore: this._onRestore.bind(this)
        });
      };
      /**
       * 'flick' event handler
       * @param {Object} e
       * @private
       */


      _proto._onFlick = function _onFlick(e) {
        var pos = e.pos;
        var distance = e.distance || pos - this.$$._conf.panel.size;
        this.onFlick && this.onFlick(e, distance);
      };
      /**
       * 'flickEnd' event handler
       * @param {Object} e
       * @private
       */


      _proto._onFlickEnd = function _onFlickEnd(e) {
        var type = e.direction & consts.DIRECTION_LEFT && "next" || e.direction & consts.DIRECTION_RIGHT && "prev" || "";
        type && this.arrange && this.arrange(type);
        this.onFlickEnd && this.onFlickEnd(e);
      };
      /**
       * 'restore' event handler
       * @param {Object} e
       * @private
       */


      _proto._onRestore = function _onRestore(e) {
        this.onRestore && this.onRestore(e);
      };
      /**
       * Constant to expose Flicking's utility
       * @ko Flicking 유틸리티
       * @name utils
       * @memberof Plugin
       * @static
       * @constant
       * @type {Object}
       * @private
       */


      return Plugin;
    }();

    Plugin.utils = utils;
    Plugin.consts = consts;
    Plugin.VERSION = "2.4.0-snapshot";
    return Plugin;
  }();

  /**
   * A plugin to add opacity effect attached with flicking interaction.
   * - Should be targeted only one element(or a wrapper element having child nodes) per panel.
   * @ko 플리킹 인터렉션에 따른 투명도 조절 효과 플러그인.
   * - 각 패널당 한 개의 요소(또는 자식노드를 포함하는 한 개의 래퍼요소)만 지정되어야 한다.
   * @alias eg.Flicking.plugin.OpacityEffect
   * @memberof eg.Flicking.plugin
   * @see eg.Flicking#plugin
   * @see eg.Flicking#plugins
   * @example
   * ```html
   * <div id="flick">
   * 	<div><p>panel 0 <span class="text">abc</span></p></div>
   * 	<div><p>panel 1 <span class="text">abc</span></p></div>
   * 	<div><p>panel 2 <span class="text">abc</span></p></div>
   * </div>
   * ```
   * ```js
   * // as namespace usage
   * new eg.Flicking("#some")
   *  .plugin([
   *      // Apply opacity effect to '<span>' selector matched elements
   *      new eg.Flicking.plugin.OpacityEffect("span")
   *  ]);
   *
   * // as ESM import usage
   * import Flicking from "@egjs/flicking";
   * import OpacityEffect from "@egjs/flicking/dist/plugin/OpacityEffect";
   *
   * new Flicking("#some")
   *  .plugin([
   *      new OpacityEffect("span")
   *  ]);
   * ```
   */

  var OpacityEffect =
  /*#__PURE__*/
  function (_Plugin) {
    _inheritsLoose(OpacityEffect, _Plugin);

    /**
     * Constructor
     * @param {String} selector Target element selector string <ko>대상 요소 셀렉터 문자열</ko>
     */
    function OpacityEffect(selector) {
      return _Plugin.call(this, {
        selector: selector
      }) || this;
    }

    var _proto = OpacityEffect.prototype;

    _proto.$componentMount = function $componentMount() {
      this.details = Plugin.utils.toArray(this.$$.$wrapper.querySelectorAll(this.options.selector));

      this._build();

      this.resize();
      return this;
    };

    _proto._build = function _build() {
      this.details = [this.details.pop()].concat(this.details);
    };

    _proto._setSelected = function _setSelected(index, setClass) {
      var utils = Plugin.utils;
      utils.classList(utils.css(this.details[index], {
        opacity: ""
      }), "selected", setClass);
    };

    _proto.resize = function resize() {
      this.size = this.getInstanceConf().panel.size;
      this.onRestore("resize");
    };

    _proto.arrange = function arrange(type) {
      if (type !== "resize") {
        this.details = type === "next" ? this.details.concat(this.details.shift()) : [this.details.pop()].concat(this.details);
      }

      this._setSelected(1, true);

      /next|resize/.test(type) && this._setSelected(0, false);
      /prev|resize/.test(type) && this._setSelected(2, false);
    };

    _proto.onFlick = function onFlick(e, distance) {
      var pos = e.pos;
      var per = pos % this.size / this.size;
      var utils = Plugin.utils;

      if (Math.abs(distance) >= this.size) {
        return;
      }

      var opacity = distance > 0 && per <= 0.5 && 1 - 2 * per || distance < 0 && per > 0.5 && 2 * (per - 0.5);
      opacity !== undefined && utils.css(this.details[1], {
        opacity: opacity
      });
    };

    _proto.onRestore = function onRestore() {
      this.arrange("resize");
    };

    _proto.get = function get() {
      return this.details[1];
    };

    return OpacityEffect;
  }(Plugin);
  module.exports = OpacityEffect;

  return OpacityEffect;

}(eg.Flicking));
//# sourceMappingURL=OpacityEffect.js.map
