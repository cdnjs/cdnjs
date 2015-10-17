'use strict';

(function() {

    /**
     * @ngdoc overview
     * @name ngStorage
     */

    angular.module('ngStorage', []).

    /**
     * @ngdoc object
     * @name ngStorage.$localStorage
     * @requires $rootScope
     * @requires $browser
     * @requires $window
     */

    factory('$localStorage', _storageFactory('localStorage')).

    /**
     * @ngdoc object
     * @name ngStorage.$sessionStorage
     * @requires $rootScope
     * @requires $browser
     * @requires $window
     */

    factory('$sessionStorage', _storageFactory('sessionStorage'));

    function _storageFactory(storageType) {
        return [
            '$rootScope',
            '$browser',
            '$window',

            function(
                $rootScope,
                $browser,
                $window
            ){
                var webStorage = $window[storageType],
                    $storage = {
                        $default: function(items) {
                            for (var k in items) {
                                angular.isDefined($storage[k]) || ($storage[k] = items[k]);
                            }

                            return $storage;
                        },
                        $reset: function(items) {
                            for (var k in $storage) {
                                '$' === k[0] || delete $storage[k];
                            }

                            return $storage.$default(items);
                        }
                    },
                    _last$storage;

                // (#8) `i < webStorage.length` is needed for IE9
                for (var i = 0, k; i < webStorage.length && (k = webStorage.key(i)); i++) {
                    'ngStorage-' === k.slice(0, 10) && ($storage[k.slice(10)] = angular.fromJson(webStorage.getItem(k)));
                }

                _last$storage = angular.copy($storage);

                $browser.addPollFn(function() {
                    if (!angular.equals($storage, _last$storage)) {
                        angular.forEach($storage, function(v, k) {
                            if (angular.isDefined(v) && '$' !== k[0]) {

                                // Remove $$hashKey and other things that cannot be stringified
                                $storage[k] = angular.fromJson(angular.toJson(v));

                                webStorage.setItem('ngStorage-' + k, angular.toJson(v));
                            }

                            delete _last$storage[k];
                        });

                        for (var k in _last$storage) {
                            webStorage.removeItem('ngStorage-' + k);
                        }

                        _last$storage = angular.copy($storage);

                        $rootScope.$apply();
                    }
                });

                // (#6) Use `$window.addEventListener` instead of `angular.element` to avoid the jQuery-specific `event.originalEvent`
                'localStorage' === storageType && $window.addEventListener('storage', function(event) {
                    if ('ngStorage-' === event.key.slice(0, 10)) {
                        event.newValue ? $storage[event.key.slice(10)] = angular.fromJson(event.newValue) : delete $storage[event.key.slice(10)];

                        _last$storage = angular.copy($storage);

                        $rootScope.$apply();
                    }
                });

                return $storage;
            }
        ];
    }

})();
