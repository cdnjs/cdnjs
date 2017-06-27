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
        return function(
            $rootScope,
            $browser,
            $window
        ){
            var webStorage = $window[storageType],
                $storage = {
                    $default: function(items) {
                        angular.forEach(items, function(v, k) {
                            angular.isDefined($storage[k]) || ($storage[k] = v);
                        });

                        return $storage;
                    },
                    $reset: function(items) {
                        for (var k in $storage) {
                            /^\$/.test(k) || delete $storage[k];
                        }

                        angular.forEach(items, function(v, k) {
                            $storage[k] = v;
                        });

                        return $storage;
                    }
                },
                _last$storage;

            for (var i = 0, k; k = webStorage.key(i); i++) {
                $storage[k] = angular.fromJson(webStorage.getItem(k));
            }

            _last$storage = angular.copy($storage);

            $browser.addPollFn(function() {
                if (!angular.equals($storage, _last$storage)) {
                    angular.forEach($storage, function(v, k) {
                        if (angular.isDefined(v) && !/^\$/.test(k)) {

                            // Remove $$hashKey and other things that cannot be stringified
                            $storage[k] = angular.fromJson(angular.toJson(v));

                            webStorage.setItem(k, angular.toJson(v));
                        }

                        delete _last$storage[k];
                    });

                    angular.forEach(_last$storage, function(v, k) {
                        webStorage.removeItem(k);
                    });

                    _last$storage = angular.copy($storage);

                    $rootScope.$digest();
                }
            });

            'localStorage' === storageType && angular.element($window).bind('storage', function(event) {
                event.newValue ? $storage[event.key] = angular.fromJson(event.newValue) : delete $storage[event.key];

                _last$storage = angular.copy($storage);

                $rootScope.$digest();
            });

            return $storage;
        };
    }

})();
