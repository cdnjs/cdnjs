this.primevue = this.primevue || {};
this.primevue.chart = (function (BaseComponent, ChartStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var ChartStyle__default = /*#__PURE__*/_interopDefaultLegacy(ChartStyle);

    var script$1 = {
      name: 'BaseChart',
      "extends": BaseComponent__default["default"],
      props: {
        type: String,
        data: null,
        options: null,
        plugins: null,
        width: {
          type: Number,
          "default": 300
        },
        height: {
          type: Number,
          "default": 150
        },
        canvasProps: {
          type: null,
          "default": null
        }
      },
      style: ChartStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'Chart',
      "extends": script$1,
      inheritAttrs: false,
      emits: ['select', 'loaded'],
      chart: null,
      watch: {
        /*
         * Use deep watch to enable triggering watch for changes within structure
         * otherwise the entire data object needs to be replaced to trigger watch
         */
        data: {
          handler: function handler() {
            this.reinit();
          },
          deep: true
        },
        type: function type() {
          this.reinit();
        },
        options: function options() {
          this.reinit();
        }
      },
      mounted: function mounted() {
        this.initChart();
      },
      beforeUnmount: function beforeUnmount() {
        if (this.chart) {
          this.chart.destroy();
          this.chart = null;
        }
      },
      methods: {
        initChart: function initChart() {
          var _this = this;
          import('chart.js/auto').then(function (module) {
            if (_this.chart) {
              _this.chart.destroy();
              _this.chart = null;
            }
            if (module && module["default"]) {
              _this.chart = new module["default"](_this.$refs.canvas, {
                type: _this.type,
                data: _this.data,
                options: _this.options,
                plugins: _this.plugins
              });
            }
            _this.$emit('loaded', _this.chart);
          });
        },
        getCanvas: function getCanvas() {
          return this.$canvas;
        },
        getChart: function getChart() {
          return this.chart;
        },
        getBase64Image: function getBase64Image() {
          return this.chart.toBase64Image();
        },
        refresh: function refresh() {
          if (this.chart) {
            this.chart.update();
          }
        },
        reinit: function reinit() {
          this.initChart();
        },
        onCanvasClick: function onCanvasClick(event) {
          if (this.chart) {
            var element = this.chart.getElementsAtEventForMode(event, 'nearest', {
              intersect: true
            }, false);
            var dataset = this.chart.getElementsAtEventForMode(event, 'dataset', {
              intersect: true
            }, false);
            if (element && element[0] && dataset) {
              this.$emit('select', {
                originalEvent: event,
                element: element[0],
                dataset: dataset
              });
            }
          }
        },
        generateLegend: function generateLegend() {
          if (this.chart) {
            return this.chart.generateLegend();
          }
        }
      }
    };

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
    function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var _hoisted_1 = ["width", "height"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root'),
        style: _ctx.sx('root')
      }, _ctx.ptmi('root')), [vue.createElementVNode("canvas", vue.mergeProps({
        ref: "canvas",
        width: _ctx.width,
        height: _ctx.height,
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return $options.onCanvasClick($event);
        })
      }, _objectSpread(_objectSpread({}, _ctx.canvasProps), _ctx.ptm('canvas'))), null, 16, _hoisted_1)], 16);
    }

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.chart.style, Vue);
