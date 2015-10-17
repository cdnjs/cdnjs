/**
 * angular-recaptcha build:2014-12-22 
 * https://github.com/vividcortex/angular-recaptcha 
 * Copyright (c) 2014 VividCortex 
**/

/*global angular, Recaptcha */
(function (ng) {
    'use strict';

    ng.module('vcRecaptcha', []);

}(angular));

/*global angular */
(function (ng) {
    'use strict';

    var app = ng.module('vcRecaptcha');

    /**
     * An angular service to wrap the reCaptcha API
     */
    app.service('vcRecaptchaService', ['$timeout', '$window', '$q', function ($timeout, $window, $q) {
        var deferred = $q.defer(), promise = deferred.promise, recaptcha;

        $window.vcRecapthaApiLoaded = function () {
            recaptcha = $window.grecaptcha;

            deferred.resolve(recaptcha);
        };


        function getRecaptcha() {
            if (!!recaptcha) {
                return $q.when(recaptcha);
            }

            return promise;
        }

        function validateRecaptchaInstance() {
            if (!recaptcha) {
                throw new Error('reCaptcha has not been loaded yet.');
            }
        }


        // Check if grecaptcha is not defined already.
        if (ng.isDefined($window.grecaptcha)) {
            $window.vcRecapthaApiLoaded();
        }

        return {

            /**
             * Creates a new reCaptcha object
             *
             * @param elm  the DOM element where to put the captcha
             * @param key  the recaptcha public key (refer to the README file if you don't know what this is)
             * @param fn   a callback function to call when the captcha is resolved
             * @param conf the captcha object configuration
             */
            create: function (elm, key, fn, conf) {
                conf.callback = fn;
                conf.sitekey = key;

                return getRecaptcha().then(function (recaptcha) {
                    return recaptcha.render(elm, conf);
                });
            },

            /**
             * Reloads the reCaptcha
             */
            reload: function (widgetId) {
                validateRecaptchaInstance();

                // $log.info('Reloading captcha');
                recaptcha.reset(widgetId);

                // reCaptcha will call the same callback provided to the
                // create function once this new captcha is resolved.
            },

            /**
             * Gets the response from the reCaptcha widget.
             *
             * @see https://developers.google.com/recaptcha/docs/display#js_api
             *
             * @returns {String}
             */
            getResponse: function (widgetId) {
                validateRecaptchaInstance();

                return recaptcha.getResponse(widgetId);
            }
        };

    }]);

}(angular));

/*global angular, Recaptcha */
(function (ng) {
    'use strict';

    function throwNoKeyException() {
        throw new Error('You need to set the "key" attribute to your public reCaptcha key. If you don\'t have a key, please get one from https://www.google.com/recaptcha/admin/create');
    }

    var app = ng.module('vcRecaptcha');

    app.directive('vcRecaptcha', ['$log', '$timeout', 'vcRecaptchaService', function ($log, $timeout, vcRecaptcha) {

        return {
            restrict: 'A',
            scope: {
                key: '=',
                onCreate: '&',
                onSuccess: '&'
            },
            link: function (scope, elm, attrs) {
                if (!attrs.hasOwnProperty('key')) {
                    throwNoKeyException();
                }

                scope.widgetId = null;

                var removeCreationListener = scope.$watch('key', function (key) {
                    if (!key) {
                        return;
                    }

                    if (key.length !== 40) {
                        throwNoKeyException();
                    }

                    var callback = function () {
                        // Notify about the response availability
                        scope.onSuccess({response: vcRecaptcha.getResponse(scope.widgetId)});
                    };

                    vcRecaptcha.create(elm[0], scope.key, callback, {

                        theme: attrs.theme || null

                    }).then(function (widgetId) {

                        // The widget has been created
                        scope.widgetId = widgetId;
                        scope.onCreate({widgetId: scope.widgetId});
                    });

                    // Remove this listener to avoid creating the widget more than once.
                    removeCreationListener();
                });
            }
        };
    }]);

}(angular));
