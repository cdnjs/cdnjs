
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["angular","smooth-scrollbar"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('angular'), require('smooth-scrollbar'));
  } else {
    root.undefined = factory(root.angular, root.Scrollbar);
  }
}(this, function(angular, Scrollbar) {

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

angular.module('SmoothScrollbar', []).constant('SCROLLBAR_VERSION', Scrollbar.version).service('ScrollbarService', (_temp = _class = (function () {
    function ScrollbarService($q) {
        _classCallCheck(this, ScrollbarService);

        this.scrollbarInstances = {};
        this.deferreds = {};
        this.$q = $q;
    }

    /**
     * @method
     * Get scrollbar instance
     * If instance isn't existed,
     * callback wiil be invoked after instance is created
     *
     * @param {String} name: scrollbar name
     */

    _createClass(ScrollbarService, [{
        key: 'getInstance',
        value: function getInstance(name) {
            var scrollbarInstances = this.scrollbarInstances;
            var deferreds = this.deferreds;
            var $q = this.$q;

            if (scrollbarInstances.hasOwnProperty(name)) {
                return ($q.resolve || $q.when)(scrollbarInstances[name]);
            }

            var deferred = deferreds[name] = deferreds[name] || $q.defer();

            return deferred.promise;
        }

        /**
         * @method
         * Create scrollbar instance
         *
         * @param {String} name: scrollbar name
         * @param {Element} elem: container element
         * @param {Object} options: as is explained in scrollbar constructor
         *
         * @return {Scrollbar} scrollbar instance
         */

    }, {
        key: 'createInstance',
        value: function createInstance(name, elem, options) {
            var scrollbarInstances = this.scrollbarInstances;
            var deferreds = this.deferreds;

            if (scrollbarInstances.hasOwnProperty(name)) {
                return scrollbarInstances[name];
            }

            var instance = scrollbarInstances[name] = Scrollbar.init(elem, options);

            if (deferreds.hasOwnProperty(name)) {
                deferreds[name].resolve(instance);
            }

            return instance;
        }

        /**
         * @method
         * Destroy scrollbar instance
         *
         * @param {String} name: scrollbar name
         */

    }, {
        key: 'destroyInstance',
        value: function destroyInstance(name) {
            var scrollbarInstances = this.scrollbarInstances;
            var deferreds = this.deferreds;

            var instance = scrollbarInstances[name];

            if (instance) {
                instance.destroy();
                delete scrollbarInstances[name];
                delete deferreds[name];
            }
        }
    }]);

    return ScrollbarService;
})(), _class.$inject = ['$q'], _temp)).directive('scrollbar', ['ScrollbarService', function (ScrollbarService) {
    return {
        restrict: 'AE',
        transclude: true,
        scope: {
            speed: '@',
            stepLength: '@',
            easingDuration: '@',
            easingCurve: '@',
            propagation: '='
        },
        link: function link(scope, elem, attrs, ctrl, transclude) {
            var speed = scope.speed;
            var stepLength = scope.stepLength;
            var easingDuration = scope.easingDuration;
            var easingCurve = scope.easingCurve;

            var name = attrs.scrollbar || attrs.name || Date.now().toString(32);

            var scrollbar = ScrollbarService.createInstance(name, elem[0], scope);

            var original = {
                update: scrollbar.update.bind(scrollbar),
                scrollTo: scrollbar.scrollTo.bind(scrollbar),
                addListener: scrollbar.addListener.bind(scrollbar),
                infiniteScroll: scrollbar.infiniteScroll.bind(scrollbar)
            };

            var applyChange = function applyChange(cb) {
                if (typeof cb !== 'function') return;

                return function () {
                    cb.apply(undefined, arguments);
                    scope.$apply();
                };
            };

            scrollbar.update = function (cb) {
                original.update(applyChange(cb));
            };

            scrollbar.scrollTo = function (x, y, duration, cb) {
                original.scrollTo(x, y, duration, applyChange(cb));
            };

            scrollbar.addListener = function (cb) {
                if (typeof cb !== 'function') return;

                original.addListener(applyChange(cb));
            };

            scrollbar.infiniteScroll = function (cb, threshold) {
                if (typeof cb !== 'function') return;

                original.infiniteScroll(applyChange(cb), threshold);
            };

            scope.$on('$destroy', function () {
                ScrollbarService.destroyInstance(name);
            });

            var $scrollContent = angular.element(scrollbar.targets.content);

            transclude(function (clones) {
                $scrollContent.append(clones);
            });
        }
    };
}]);
return undefined;

}));
