
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

angular.module('SmoothScrollbar', []).constant('SCROLLBAR_VERSION', Scrollbar.version).provider('ScrollbarService', function ScrollbarServiceProvider() {
    var DEFAULT_OPTIONS = {};
    var scrollbarInstances = {};
    var deferreds = {};

    this.setDefaultOptions = function () {
        var opt = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return angular.extend(DEFAULT_OPTIONS, opt);
    };

    var id = 0;

    this.$get = ['$q', function ($q) {
        var ScrollbarService = function () {
            function ScrollbarService() {
                _classCallCheck(this, ScrollbarService);

                this.id = 0;
            }

            /**
             * @method
             * Generate a scrollbar name with timestamp + id
             *
             * @return {String}
             */


            _createClass(ScrollbarService, [{
                key: 'generateName',
                value: function generateName() {
                    this.id++;
                    return Date.now().toString(32) + '$' + this.id;
                }

                /**
                 * @method
                 * Get scrollbar instance
                 * If instance isn't existed,
                 * callback wiil be invoked after instance is created
                 *
                 * @param {String} name: scrollbar name
                 *
                 * @return {Promise} resolved with scrollbar<Scrollbar>
                 */

            }, {
                key: 'getInstance',
                value: function getInstance(name) {
                    var deferred = deferreds[name] = deferreds[name] || $q.defer();

                    if (scrollbarInstances.hasOwnProperty(name)) {
                        deferred.resolve(scrollbarInstances[name]);
                    }

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
                    if (scrollbarInstances.hasOwnProperty(name)) {
                        return scrollbarInstances[name];
                    }

                    var res = {};

                    Object.keys(options).forEach(function (prop) {
                        if (options[prop] !== undefined) {
                            res[prop] = options[prop];
                        }
                    });

                    var instance = scrollbarInstances[name] = Scrollbar.init(elem, _extends({}, DEFAULT_OPTIONS, res));

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
                    var instance = scrollbarInstances[name];

                    if (instance) {
                        instance.destroy(true);
                        delete scrollbarInstances[name];
                        delete deferreds[name];
                    }
                }
            }]);

            return ScrollbarService;
        }();

        return new ScrollbarService();
    }];
}).directive('scrollbar', ['ScrollbarService', function (ScrollbarService) {
    return {
        restrict: 'AE',
        transclude: true,
        scope: {
            speed: '=',
            damping: '=',
            thumbMinSize: '=',
            syncCallbacks: '=',
            renderByPixels: '=',
            alwaysShowTracks: '=',
            continuousScrolling: '=',
            overscrollEffect: '=',
            overscrollDamping: '=',
            overscrollEffectColor: '@'
        },
        link: function link(scope, elem, attrs, ctrl, transclude) {
            if (attrs.continuousScrolling === 'auto') {
                scope.continuousScrolling = 'auto';
            }

            var name = attrs.scrollbar || attrs.name || ScrollbarService.generateName();

            var scrollbar = ScrollbarService.createInstance(name, elem[0], scope);

            var original = {
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
            }, $scrollContent);
        }
    };
}]);
return undefined;

}));
