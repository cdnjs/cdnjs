this.eg = this.eg || {};
this.eg.Flicking = this.eg.Flicking || {};
this.eg.Flicking.plugin = this.eg.Flicking.plugin || {};
this.eg.Flicking.plugin.ParallaxEffect = (function (Flicking) {
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
   * A plugin to add horizontal parallax effect attached with flicking interaction.
   * - Should be targeted only one element per panel.
   * - It can't be used with `previewPadding` option.
   * @ko 플리킹 인터렉션에 따른 가로유형 패럴렉스 효과 플러그인.
   * - 각 패널당 한 개의 요소만 지정되어야 한다.
   * - `previewPadding` 옵션과 같이 사용될 수 없다.
   * @alias eg.Flicking.plugin.ParallaxEffect
   * @memberof eg.Flicking.plugin
   * @see eg.Flicking#plugin
   * @see eg.Flicking#plugins
   * @example
   * ```html
   * <div id="flick">
   * 	<div><p style="background-image:url(a.png)">panel 0</p></div>
   * 	<div><p style="background-image:url(b.png)">panel 1</p></div>
   * 	<div><p style="background-image:url(c.png)">panel 2</p></div>
   * </div>
   * ```
   * ```js
   * // as namespace usage
   * new eg.Flicking("#some")
   *  .plugin([
   *      // Apply parallax effect to '<p>' selector matched elements
   *      new eg.Flicking.plugin.ParallaxEffect("p")
   *  ]);
   *
   * // as ESM import usage
   * import Flicking from "@egjs/flicking";
   * import ParallaxEffect from "@egjs/flicking/dist/plugin/ParallaxEffect";
   *
   * new Flicking("#some")
   *  .plugin([
   *      new ParallaxEffect("p")
   *  ]);
   * ```
   */

  var ParallaxEffect =
  /*#__PURE__*/
  function (_Plugin) {
    _inheritsLoose(ParallaxEffect, _Plugin);

    /**
     * Constructor
     * @param {String} selector Target selector string within panel element<ko>패널 내에 위치한 대상 요소 셀렉터 문자열</ko>
     */
    function ParallaxEffect(selector) {
      return _Plugin.call(this, {
        selector: selector
      }) || this;
    }

    var _proto = ParallaxEffect.prototype;

    _proto.$componentMount = function $componentMount() {
      var _this = this;

      // select target elements
      this.imgs = this.$$.getAllElements().map(function (v) {
        return v.querySelector(_this.options.selector);
      });
      this.resize();

      this._build();

      return this;
    };

    _proto._build = function _build() {
      var _this2 = this;

      var utils = Plugin.utils;

      var currIndex = this._getCurrIndex(); // set panel element's style


      utils.css(this.getInstanceConf().panel.$list, {
        overflow: "hidden"
      }); // set targeted element's style

      this.imgs.forEach(function (v, i) {
        var x = -50;

        if (currIndex > i) {
          x = 50;
        } else if (currIndex === i) {
          x = 0;
        }

        _this2.useWillChange && utils.css(v, {
          willChange: "transform"
        });

        _this2._setTranslate(v, x + "%", 0);
      });
    };

    _proto._setTranslate = function _setTranslate(el, x, y) {
      el && Plugin.utils.css(el, {
        transform: Plugin.utils.translate.apply(null, this.$$._getDataByDirection([x, y]).concat(this.useLayerHack))
      });
      return el;
    };

    _proto._getCurrIndex = function _getCurrIndex() {
      return this.getInstanceConf().panel.currIndex;
    };

    _proto._getPanel = function _getPanel() {
      var index = this._getCurrIndex();

      return {
        prev: this.imgs[index - 1],
        curr: this.imgs[index],
        next: this.imgs[index + 1]
      };
    };

    _proto.arrange = function arrange(type) {
      if (this.$$.options.circular && type !== "resize") {
        this.imgs = type === "next" ? this.imgs.concat(this.imgs.shift()) : [this.imgs.pop()].concat(this.imgs);
      }

      var panel = this._getPanel(); // update panel's translate


      this._setTranslate(panel.curr, 0, 0);

      /next|resize/.test(type) && this._setTranslate(panel.next, "50%", 0);
      /prev|resize/.test(type) && this._setTranslate(panel.prev, "-50%", 0);
    };

    _proto.onFlick = function onFlick(e, distance) {
      var _this3 = this;

      var pos = e.pos;
      var maxRange = this.size;
      var delta = pos % maxRange / 2;
      var siblingDelta = -(maxRange / 2 - delta);

      if (Math.abs(distance) >= maxRange) {
        return;
      }

      var panel = this._getPanel();

      var update = [];

      if (distance > 0 && panel.next) {
        update.push({
          el: panel.curr,
          x: delta
        });
        update.push({
          el: panel.next,
          x: siblingDelta
        });
      } else if (distance < 0 && panel.prev) {
        update.push({
          el: panel.curr,
          x: siblingDelta
        });
        update.push({
          el: panel.prev,
          x: delta
        });
      }

      update.forEach(function (v) {
        return _this3._setTranslate(v.el, v.x + "px", 0);
      });
    };

    _proto.onRestore = function onRestore() {
      this.arrange("resize");
    };

    _proto.resize = function resize() {
      this.size = this.getInstanceConf().panel.size;
      this.onRestore("resize");
    };

    _proto.get = function get() {
      return this.imgs[this._getCurrIndex()];
    };

    return ParallaxEffect;
  }(Plugin);
  module.exports = ParallaxEffect;

  return ParallaxEffect;

}(eg.Flicking));
//# sourceMappingURL=ParallaxEffect.js.map
