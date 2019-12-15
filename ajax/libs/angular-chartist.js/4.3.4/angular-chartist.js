(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('angular'), require('chartist')) :
	typeof define === 'function' && define.amd ? define(['angular', 'chartist'], factory) :
	(global['angular-chartist'] = factory(global.angular,global.Chartist));
}(this, (function (angular,Chartist) { 'use strict';

angular = angular && angular.hasOwnProperty('default') ? angular['default'] : angular;
Chartist = Chartist && Chartist.hasOwnProperty('default') ? Chartist['default'] : Chartist;

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var angularChartistModule = angular.module('angular-chartist', []);

var AngularChartistCtrl = function () {
  AngularChartistCtrl.$inject = ["$scope", "$element"];
  function AngularChartistCtrl($scope, $element) {
    'ngInject';

    var _this = this;

    classCallCheck(this, AngularChartistCtrl);
    this.data = $scope.data;
    this.chartType = $scope.chartType;

    this.events = $scope.events() || {};
    this.options = $scope.chartOptions() || null;
    this.responsiveOptions = $scope.responsiveOptions() || null;

    this.element = $element[0];

    this.renderChart();

    $scope.$watch(function () {
      return {
        data: $scope.data,
        chartType: $scope.chartType,
        chartOptions: $scope.chartOptions() || null,
        responsiveOptions: $scope.responsiveOptions() || null,
        events: $scope.events() || {}
      };
    }, this.update.bind(this), true);

    $scope.$on('$destroy', function () {
      if (_this.chart) {
        _this.chart.detach();
      }
    });
  }

  createClass(AngularChartistCtrl, [{
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      Object.keys(this.events).forEach(function (eventName) {
        _this2.chart.on(eventName, _this2.events[eventName]);
      });
    }
  }, {
    key: 'unbindEvents',
    value: function unbindEvents(events) {
      var _this3 = this;

      Object.keys(events).forEach(function (eventName) {
        _this3.chart.off(eventName, events[eventName]);
      });
    }
  }, {
    key: 'renderChart',
    value: function renderChart() {
      // ensure that the chart does not get created without data
      if (this.data) {
        this.chart = Chartist[this.chartType](this.element, this.data, this.options, this.responsiveOptions);

        this.bindEvents();

        return this.chart;
      }
    }
  }, {
    key: 'update',
    value: function update(newConfig, oldConfig) {
      // Update controller with new configuration
      this.chartType = newConfig.chartType;
      this.data = newConfig.data;
      this.options = newConfig.chartOptions;
      this.responsiveOptions = newConfig.responsiveOptions;
      this.events = newConfig.events;

      // If chart type changed we need to recreate whole chart, otherwise we can update
      if (!this.chart || newConfig.chartType !== oldConfig.chartType) {
        this.renderChart();
      } else {
        if (!angular.equals(newConfig.events, oldConfig.events)) {
          this.unbindEvents(oldConfig.events);
          this.bindEvents();
        }
        this.chart.update(this.data, this.options);
      }
    }
  }]);
  return AngularChartistCtrl;
}();

angularChartistModule.controller('AngularChartistCtrl', AngularChartistCtrl).directive('chartist', function () {
  'ngInject';

  return {
    restrict: 'EA',
    scope: {
      // mandatory
      data: '=chartistData',
      chartType: '@chartistChartType',
      // optional
      events: '&chartistEvents',
      chartOptions: '&chartistChartOptions',
      responsiveOptions: '&chartistResponsiveOptions'
    },
    controller: 'AngularChartistCtrl'
  };
});

var angularChartist = angularChartistModule.name;

return angularChartist;

})));
//# sourceMappingURL=angular-chartist.js.map
