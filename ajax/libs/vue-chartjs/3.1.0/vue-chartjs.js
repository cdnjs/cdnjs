/*!
 * vue-chartjs v3.1.0
 * (c) 2018 Jakub Juszczak <jakub@posteo.de>
 * http://vue-chartjs.org
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("chart.js"));
	else if(typeof define === 'function' && define.amd)
		define("VueChartJs", ["chart.js"], factory);
	else if(typeof exports === 'object')
		exports["VueChartJs"] = factory(require("chart.js"));
	else
		root["VueChartJs"] = factory(root["Chart"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external {"root":"Chart","commonjs":"chart.js","commonjs2":"chart.js","amd":"chart.js"}
var external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js__ = __webpack_require__(0);
var external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js___default = /*#__PURE__*/__webpack_require__.n(external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js__);

// CONCATENATED MODULE: ./src/BaseCharts/Bar.js

/* harmony default export */ var Bar = ({
  render: function render(createElement) {
    return createElement('div', {
      style: this.styles,
      class: this.cssClasses
    }, [createElement('canvas', {
      attrs: {
        id: this.chartId,
        width: this.width,
        height: this.height
      },
      ref: 'canvas'
    })]);
  },
  props: {
    chartId: {
      default: 'bar-chart',
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    },
    cssClasses: {
      type: String,
      default: ''
    },
    styles: {
      type: Object
    },
    plugins: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      _chart: null,
      _plugins: this.plugins
    };
  },
  methods: {
    addPlugin: function addPlugin(plugin) {
      this.$data._plugins.push(plugin);
    },
    renderChart: function renderChart(data, options) {
      this.$data._chart = new external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js___default.a(this.$refs.canvas.getContext('2d'), {
        type: 'bar',
        data: data,
        options: options,
        plugins: this.$data._plugins
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$data._chart) {
      this.$data._chart.destroy();
    }
  }
});
// CONCATENATED MODULE: ./src/BaseCharts/HorizontalBar.js

/* harmony default export */ var HorizontalBar = ({
  render: function render(createElement) {
    return createElement('div', {
      style: this.styles,
      class: this.cssClasses
    }, [createElement('canvas', {
      attrs: {
        id: this.chartId,
        width: this.width,
        height: this.height
      },
      ref: 'canvas'
    })]);
  },
  props: {
    chartId: {
      default: 'horizontalbar-chart',
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    },
    cssClasses: {
      type: String,
      default: ''
    },
    styles: {
      type: Object
    },
    plugins: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      _chart: null,
      _plugins: this.plugins
    };
  },
  methods: {
    addPlugin: function addPlugin(plugin) {
      this.$data._plugins.push(plugin);
    },
    renderChart: function renderChart(data, options) {
      this.$data._chart = new external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js___default.a(this.$refs.canvas.getContext('2d'), {
        type: 'horizontalBar',
        data: data,
        options: options,
        plugins: this.$data._plugins
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$data._chart) {
      this.$data._chart.destroy();
    }
  }
});
// CONCATENATED MODULE: ./src/BaseCharts/Doughnut.js

/* harmony default export */ var Doughnut = ({
  render: function render(createElement) {
    return createElement('div', {
      style: this.styles,
      class: this.cssClasses
    }, [createElement('canvas', {
      attrs: {
        id: this.chartId,
        width: this.width,
        height: this.height
      },
      ref: 'canvas'
    })]);
  },
  props: {
    chartId: {
      default: 'doughnut-chart',
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    },
    cssClasses: {
      type: String,
      default: ''
    },
    styles: {
      type: Object
    },
    plugins: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      _chart: null,
      _plugins: this.plugins
    };
  },
  methods: {
    addPlugin: function addPlugin(plugin) {
      this.$data._plugins.push(plugin);
    },
    renderChart: function renderChart(data, options) {
      this.$data._chart = new external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js___default.a(this.$refs.canvas.getContext('2d'), {
        type: 'doughnut',
        data: data,
        options: options,
        plugins: this.$data._plugins
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$data._chart) {
      this.$data._chart.destroy();
    }
  }
});
// CONCATENATED MODULE: ./src/BaseCharts/Line.js

/* harmony default export */ var Line = ({
  render: function render(createElement) {
    return createElement('div', {
      style: this.styles,
      class: this.cssClasses
    }, [createElement('canvas', {
      attrs: {
        id: this.chartId,
        width: this.width,
        height: this.height
      },
      ref: 'canvas'
    })]);
  },
  props: {
    chartId: {
      default: 'line-chart',
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    },
    cssClasses: {
      type: String,
      default: ''
    },
    styles: {
      type: Object
    },
    plugins: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      _chart: null,
      _plugins: this.plugins
    };
  },
  methods: {
    addPlugin: function addPlugin(plugin) {
      this.$data._plugins.push(plugin);
    },
    renderChart: function renderChart(data, options) {
      this.$data._chart = new external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js___default.a(this.$refs.canvas.getContext('2d'), {
        type: 'line',
        data: data,
        options: options,
        plugins: this.$data._plugins
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$data._chart) {
      this.$data._chart.destroy();
    }
  }
});
// CONCATENATED MODULE: ./src/BaseCharts/Pie.js

/* harmony default export */ var Pie = ({
  render: function render(createElement) {
    return createElement('div', {
      style: this.styles,
      class: this.cssClasses
    }, [createElement('canvas', {
      attrs: {
        id: this.chartId,
        width: this.width,
        height: this.height
      },
      ref: 'canvas'
    })]);
  },
  props: {
    chartId: {
      default: 'pie-chart',
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    },
    cssClasses: {
      type: String,
      default: ''
    },
    styles: {
      type: Object
    },
    plugins: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      _chart: null,
      _plugins: this.plugins
    };
  },
  methods: {
    addPlugin: function addPlugin(plugin) {
      this.$data._plugins.push(plugin);
    },
    renderChart: function renderChart(data, options) {
      this.$data._chart = new external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js___default.a(this.$refs.canvas.getContext('2d'), {
        type: 'pie',
        data: data,
        options: options,
        plugins: this.$data._plugins
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$data._chart) {
      this.$data._chart.destroy();
    }
  }
});
// CONCATENATED MODULE: ./src/BaseCharts/PolarArea.js

/* harmony default export */ var PolarArea = ({
  render: function render(createElement) {
    return createElement('div', {
      style: this.styles,
      class: this.cssClasses
    }, [createElement('canvas', {
      attrs: {
        id: this.chartId,
        width: this.width,
        height: this.height
      },
      ref: 'canvas'
    })]);
  },
  props: {
    chartId: {
      default: 'polar-chart',
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    },
    cssClasses: {
      type: String,
      default: ''
    },
    styles: {
      type: Object
    },
    plugins: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      _chart: null,
      _plugins: this.plugins
    };
  },
  methods: {
    addPlugin: function addPlugin(plugin) {
      this.$data._plugins.push(plugin);
    },
    renderChart: function renderChart(data, options) {
      this.$data._chart = new external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js___default.a(this.$refs.canvas.getContext('2d'), {
        type: 'polarArea',
        data: data,
        options: options,
        plugins: this.$data._plugins
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$data._chart) {
      this.$data._chart.destroy();
    }
  }
});
// CONCATENATED MODULE: ./src/BaseCharts/Radar.js

/* harmony default export */ var Radar = ({
  render: function render(createElement) {
    return createElement('div', {
      style: this.styles,
      class: this.cssClasses
    }, [createElement('canvas', {
      attrs: {
        id: this.chartId,
        width: this.width,
        height: this.height
      },
      ref: 'canvas'
    })]);
  },
  props: {
    chartId: {
      default: 'radar-chart',
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    },
    cssClasses: {
      type: String,
      default: ''
    },
    styles: {
      type: Object
    },
    plugins: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      _chart: null,
      _plugins: this.plugins
    };
  },
  methods: {
    addPlugin: function addPlugin(plugin) {
      this.$data._plugins.push(plugin);
    },
    renderChart: function renderChart(data, options) {
      this.$data._chart = new external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js___default.a(this.$refs.canvas.getContext('2d'), {
        type: 'radar',
        data: data,
        options: options,
        plugins: this.$data._plugins
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$data._chart) {
      this.$data._chart.destroy();
    }
  }
});
// CONCATENATED MODULE: ./src/BaseCharts/Bubble.js

/* harmony default export */ var Bubble = ({
  render: function render(createElement) {
    return createElement('div', {
      style: this.styles,
      class: this.cssClasses
    }, [createElement('canvas', {
      attrs: {
        id: this.chartId,
        width: this.width,
        height: this.height
      },
      ref: 'canvas'
    })]);
  },
  props: {
    chartId: {
      default: 'bubble-chart',
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    },
    cssClasses: {
      type: String,
      default: ''
    },
    styles: {
      type: Object
    },
    plugins: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      _chart: null,
      _plugins: this.plugins
    };
  },
  methods: {
    addPlugin: function addPlugin(plugin) {
      this.$data._plugins.push(plugin);
    },
    renderChart: function renderChart(data, options) {
      this.$data._chart = new external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js___default.a(this.$refs.canvas.getContext('2d'), {
        type: 'bubble',
        data: data,
        options: options,
        plugins: this.$data._plugins
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$data._chart) {
      this.$data._chart.destroy();
    }
  }
});
// CONCATENATED MODULE: ./src/BaseCharts/Scatter.js

/* harmony default export */ var Scatter = ({
  render: function render(createElement) {
    return createElement('div', {
      style: this.styles,
      class: this.cssClasses
    }, [createElement('canvas', {
      attrs: {
        id: this.chartId,
        width: this.width,
        height: this.height
      },
      ref: 'canvas'
    })]);
  },
  props: {
    chartId: {
      default: 'scatter-chart',
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    },
    cssClasses: {
      type: String,
      default: ''
    },
    styles: {
      type: Object
    },
    plugins: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      _chart: null,
      _plugins: this.plugins
    };
  },
  methods: {
    addPlugin: function addPlugin(plugin) {
      this.$data._plugins.push(plugin);
    },
    renderChart: function renderChart(data, options) {
      this.$data._chart = new external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js___default.a(this.$refs.canvas.getContext('2d'), {
        type: 'scatter',
        data: data,
        options: options,
        plugins: this.$data._plugins
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$data._chart) {
      this.$data._chart.destroy();
    }
  }
});
// EXTERNAL MODULE: ./src/mixins/reactiveData.js
var reactiveData = __webpack_require__(2);
var reactiveData_default = /*#__PURE__*/__webpack_require__.n(reactiveData);

// EXTERNAL MODULE: ./src/mixins/reactiveProp.js
var reactiveProp = __webpack_require__(3);
var reactiveProp_default = /*#__PURE__*/__webpack_require__.n(reactiveProp);

// CONCATENATED MODULE: ./src/mixins/index.js


/* harmony default export */ var mixins = ({
  reactiveData: reactiveData_default.a,
  reactiveProp: reactiveProp_default.a
});
// EXTERNAL MODULE: ./package.json
var package_0 = __webpack_require__(4);
var package_default = /*#__PURE__*/__webpack_require__.n(package_0);

// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueCharts", function() { return VueCharts; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Bar", function() { return Bar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "HorizontalBar", function() { return HorizontalBar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Doughnut", function() { return Doughnut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Line", function() { return Line; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Pie", function() { return Pie; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PolarArea", function() { return PolarArea; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Radar", function() { return Radar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Bubble", function() { return Bubble; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Scatter", function() { return Scatter; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "mixins", function() { return mixins; });











var VueCharts = {
  version: package_default.a.version,
  Bar: Bar,
  HorizontalBar: HorizontalBar,
  Doughnut: Doughnut,
  Line: Line,
  Pie: Pie,
  PolarArea: PolarArea,
  Radar: Radar,
  Bubble: Bubble,
  Scatter: Scatter,
  mixins: mixins
};
/* harmony default export */ var src = __webpack_exports__["default"] = (VueCharts);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
  data: function data() {
    return {
      chartData: null
    };
  },
  watch: {
    'chartData': {
      handler: function handler(newData, oldData) {
        if (oldData) {
          var chart = this.$data._chart;
          var newDatasetLabels = newData.datasets.map(function (dataset) {
            return dataset.label;
          });
          var oldDatasetLabels = oldData.datasets.map(function (dataset) {
            return dataset.label;
          });
          var oldLabels = JSON.stringify(oldDatasetLabels);
          var newLabels = JSON.stringify(newDatasetLabels);

          if (newLabels === oldLabels && oldData.datasets.length === newData.datasets.length) {
            newData.datasets.forEach(function (dataset, i) {
              var oldDatasetKeys = Object.keys(oldData.datasets[i]);
              var newDatasetKeys = Object.keys(dataset);
              var deletionKeys = oldDatasetKeys.filter(function (key) {
                return key !== '_meta' && newDatasetKeys.indexOf(key) === -1;
              });
              deletionKeys.forEach(function (deletionKey) {
                delete chart.data.datasets[i][deletionKey];
              });

              for (var attribute in dataset) {
                if (dataset.hasOwnProperty(attribute)) {
                  chart.data.datasets[i][attribute] = dataset[attribute];
                }
              }
            });

            if (newData.hasOwnProperty('labels')) {
              chart.data.labels = newData.labels;
            }

            if (newData.hasOwnProperty('xLabels')) {
              chart.data.xLabels = newData.xLabels;
            }

            if (newData.hasOwnProperty('yLabels')) {
              chart.data.yLabels = newData.yLabels;
            }

            chart.update();
          } else {
            chart.destroy();
            this.renderChart(this.chartData, this.options);
          }
        } else {
          if (this.$data._chart) {
            this.$data._chart.destroy();
          }

          this.renderChart(this.chartData, this.options);
        }
      }
    }
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
  props: {
    chartData: {
      required: true
    }
  },
  watch: {
    'chartData': {
      handler: function handler(newData, oldData) {
        if (oldData) {
          var chart = this.$data._chart;
          var newDatasetLabels = newData.datasets.map(function (dataset) {
            return dataset.label;
          });
          var oldDatasetLabels = oldData.datasets.map(function (dataset) {
            return dataset.label;
          });
          var oldLabels = JSON.stringify(oldDatasetLabels);
          var newLabels = JSON.stringify(newDatasetLabels);

          if (newLabels === oldLabels && oldData.datasets.length === newData.datasets.length) {
            newData.datasets.forEach(function (dataset, i) {
              var oldDatasetKeys = Object.keys(oldData.datasets[i]);
              var newDatasetKeys = Object.keys(dataset);
              var deletionKeys = oldDatasetKeys.filter(function (key) {
                return key !== '_meta' && newDatasetKeys.indexOf(key) === -1;
              });
              deletionKeys.forEach(function (deletionKey) {
                delete chart.data.datasets[i][deletionKey];
              });

              for (var attribute in dataset) {
                if (dataset.hasOwnProperty(attribute)) {
                  chart.data.datasets[i][attribute] = dataset[attribute];
                }
              }
            });

            if (newData.hasOwnProperty('labels')) {
              chart.data.labels = newData.labels;
            }

            if (newData.hasOwnProperty('xLabels')) {
              chart.data.xLabels = newData.xLabels;
            }

            if (newData.hasOwnProperty('yLabels')) {
              chart.data.yLabels = newData.yLabels;
            }

            chart.update();
          } else {
            chart.destroy();
            this.renderChart(this.chartData, this.options);
          }
        } else {
          if (this.$data._chart) {
            this.$data._chart.destroy();
          }

          this.renderChart(this.chartData, this.options);
        }
      }
    }
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {"name":"vue-chartjs","version":"3.1.0","description":"Vue.js wrapper for chart.js for creating beautiful charts.","author":"Jakub Juszczak <jakub@posteo.de>","homepage":"http://vue-chartjs.org","license":"MIT","contributors":[{"name":"Thorsten Lünborg","web":"https://github.com/LinusBorg"},{"name":"Juan Carlos Alonso","web":"https://github.com/jcalonso"}],"maintainers":[{"name":"Jakub Juszczak","email":"jakub@posteo.de","web":"http://www.jakubjuszczak.de"}],"repository":{"type":"git","url":"git+ssh://git@github.com:apertureless/vue-chartjs.git"},"bugs":{"url":"https://github.com/apertureless/vue-chartjs/issues"},"keywords":["ChartJs","Vue","Visualisation","Wrapper","Charts"],"main":"dist/vue-chartjs.js","unpkg":"dist/vue-chartjs.min.js","module":"es/index.js","jsnext:main":"es/index.js","files":["src","dist","es"],"scripts":{"dev":"node build/dev-server.js","build":"yarn run release && yarn run build:es","build:es":"cross-env BABEL_ENV=es babel src --out-dir es","unit":"karma start test/unit/karma.conf.js --single-run","e2e":"node test/e2e/runner.js","test":"npm run unit","lint":"eslint --ext .js,.vue src test/unit/specs test/e2e/specs","release":"webpack --progress --hide-modules --config  ./build/webpack.release.js && cross-env NODE_ENV=production webpack --progress --hide-modules --config  ./build/webpack.release.min.js","prepublishOnly":"yarn run lint && yarn run test && yarn run build"},"dependencies":{},"peerDependencies":{"chart.js":"2.7.x"},"devDependencies":{"@babel/cli":"^7.0.0-beta.31","@babel/core":"^7.0.0-beta.31","@babel/preset-env":"^7.0.0-beta.31","@babel/preset-stage-2":"^7.0.0-beta.31","babel-loader":"8.0.0-beta.0","chai":"^3.5.0","chart.js":"2.7.0","chromedriver":"^2.28.0","connect-history-api-fallback":"^1.1.0","cross-env":"^5.1.1","cross-spawn":"^5.1.0","css-loader":"^0.28.0","eslint":"^3.19.0","eslint-config-standard":"^10.2.1","eslint-friendly-formatter":"^2.0.7","eslint-loader":"^1.7.1","eslint-plugin-html":"^2.0.1","eslint-plugin-import":"^2.2.0","eslint-plugin-node":"^4.2.2","eslint-plugin-promise":"^3.5.0","eslint-plugin-standard":"^3.0.1","eventsource-polyfill":"^0.9.6","express":"^4.15.2","extract-text-webpack-plugin":"^3.0.1","file-loader":"^0.10.1","friendly-errors-webpack-plugin":"^1.6.1","function-bind":"^1.0.2","html-webpack-plugin":"^2.28.0","http-proxy-middleware":"^0.17.4","inject-loader":"^3.0.0","isparta":"^4.0.0","jasmine-core":"^2.5.2","json-loader":"^0.5.4","karma":"^1.5.0","karma-coverage":"^1.1.1","karma-jasmine":"^1.0.2","karma-mocha":"^1.2.0","karma-phantomjs-launcher":"^1.0.4","karma-phantomjs-shim":"^1.4.0","karma-sinon-chai":"^1.2.0","karma-sourcemap-loader":"^0.3.7","karma-spec-reporter":"0.0.30","karma-webpack":"2","lolex":"^1.6.0","mocha":"^3.1.0","opn":"^5.1.0","ora":"^1.2.0","phantomjs-prebuilt":"^2.1.13","portfinder":"^1.0.13","selenium-server":"^3.3.1","shelljs":"^0.7.7","sinon":"^2.1.0","sinon-chai":"^2.9.0","url-loader":"^0.5.8","vue":"2.5.2","vue-hot-reload-api":"2.1.0","vue-html-loader":"^1.2.4","vue-loader":"^13.3.0","vue-style-loader":"3.0.1","vue-template-compiler":"2.5.2","webpack":"^3.7.1","webpack-dev-middleware":"^1.10.1","webpack-hot-middleware":"^2.17.1","webpack-merge":"^4.1.0"},"engines":{"node":">=6.9.0","npm":">= 3.0.0"},"browserify":{"transform":["babelify"]},"greenkeeper":{"ignore":["extract-text-webpack-plugin","karma-webpack","webpack","webpack-merge"]}}

/***/ })
/******/ ]);
});