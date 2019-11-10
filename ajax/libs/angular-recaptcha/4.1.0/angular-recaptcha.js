/**
 * @license angular-recaptcha build:2017-04-24
 * https://github.com/vividcortex/angular-recaptcha
 * Copyright (c) 2017 VividCortex
**/

/*global angular, Recaptcha */
(function (ng) {
    'use strict';

    ng.module('vcRecaptcha', []);

}(angular));

/*global angular */
(function (ng) {
    'use strict';

    function throwNoKeyException() {
        throw new Error('You need to set the "key" attribute to your public reCaptcha key. If you don\'t have a key, please get one from https://www.google.com/recaptcha/admin/create');
    }

    var app = ng.module('vcRecaptcha');

    /**
     * An angular service to wrap the reCaptcha API
     */
    app.provider('vcRecaptchaService', function(){
        var provider = this;
        var config = {};
        provider.onLoadFunctionName = 'vcRecaptchaApiLoaded';

        /**
         * Sets the reCaptcha configuration values which will be used by default is not specified in a specific directive instance.
         *
         * @since 2.5.0
         * @param defaults  object which overrides the current defaults object.
         */
        provider.setDefaults = function(defaults){
            ng.copy(defaults, config);
        };

        /**
         * Sets the reCaptcha key which will be used by default is not specified in a specific directive instance.
         *
         * @since 2.5.0
         * @param siteKey  the reCaptcha public key (refer to the README file if you don't know what this is).
         */
        provider.setSiteKey = function(siteKey){
            config.key = siteKey;
        };

        /**
         * Sets the reCaptcha theme which will be used by default is not specified in a specific directive instance.
         *
         * @since 2.5.0
         * @param theme  The reCaptcha theme.
         */
        provider.setTheme = function(theme){
            config.theme = theme;
        };

        /**
         * Sets the reCaptcha stoken which will be used by default is not specified in a specific directive instance.
         *
         * @since 2.5.0
         * @param stoken  The reCaptcha stoken.
         */
        provider.setStoken = function(stoken){
            config.stoken = stoken;
        };

        /**
         * Sets the reCaptcha size which will be used by default is not specified in a specific directive instance.
         *
         * @since 2.5.0
         * @param size  The reCaptcha size.
         */
        provider.setSize = function(size){
            config.size = size;
        };

        /**
         * Sets the reCaptcha type which will be used by default is not specified in a specific directive instance.
         *
         * @since 2.5.0
         * @param type  The reCaptcha type.
         */
        provider.setType = function(type){
            config.type = type;
        };

        /**
         * Sets the reCaptcha language which will be used by default is not specified in a specific directive instance.
         *
         * @param lang  The reCaptcha language.
         */
        provider.setLang = function(lang){
            config.lang = lang;
        };

        /**
         * Sets the reCaptcha badge position which will be used by default if not specified in a specific directive instance.
         *
         * @param badge  The reCaptcha badge position.
         */
        provider.setBadge = function(badge){
            config.badge = badge;
        };

        /**
         * Sets the reCaptcha configuration values which will be used by default is not specified in a specific directive instance.
         *
         * @since 2.5.0
         * @param onLoadFunctionName  string name which overrides the name of the onload function. Should match what is in the recaptcha script querystring onload value.
         */
        provider.setOnLoadFunctionName = function(onLoadFunctionName){
            provider.onLoadFunctionName = onLoadFunctionName;
        };

        provider.$get = ['$rootScope','$window', '$q', '$document', function ($rootScope, $window, $q, $document) {
            var deferred = $q.defer(), promise = deferred.promise, instances = {}, recaptcha;

            $window.vcRecaptchaApiLoadedCallback = $window.vcRecaptchaApiLoadedCallback || [];

            var callback = function () {
                recaptcha = $window.grecaptcha;

                deferred.resolve(recaptcha);
            };

            $window.vcRecaptchaApiLoadedCallback.push(callback);

            $window[provider.onLoadFunctionName] = function () {
                $window.vcRecaptchaApiLoadedCallback.forEach(function(callback) {
                    callback();
                });
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
                callback();
            } else {
                // Generate link on demand
                var script = $window.document.createElement('script');
                script.async = true;
                script.defer = true;
                script.src = 'https://www.google.com/recaptcha/api.js?onload='+provider.onLoadFunctionName+'&render=explicit';
                $document.find('body').append(script);
            }

            return {

                /**
                 * Creates a new reCaptcha object
                 *
                 * @param elm  the DOM element where to put the captcha
                 * @param conf the captcha object configuration
                 * @throws NoKeyException    if no key is provided in the provider config or the directive instance (via attribute)
                 */
                create: function (elm, conf) {

                    conf.sitekey = conf.key || config.key;
                    conf.theme = conf.theme || config.theme;
                    conf.stoken = conf.stoken || config.stoken;
                    conf.size = conf.size || config.size;
                    conf.type = conf.type || config.type;
                    conf.hl = conf.lang || config.lang;
                    conf.badge = conf.badge || config.badge;

                    if (!conf.sitekey || conf.sitekey.length !== 40) {
                        throwNoKeyException();
                    }
                    return getRecaptcha().then(function (recaptcha) {
                        var widgetId = recaptcha.render(elm, conf);
                        instances[widgetId] = elm;
                        return widgetId;
                    });
                },

                /**
                 * Reloads the reCaptcha
                 */
                reload: function (widgetId) {
                    validateRecaptchaInstance();

                    recaptcha.reset(widgetId);

                    // Let everyone know this widget has been reset.
                    $rootScope.$broadcast('reCaptchaReset', widgetId);
                },

                /**
                 * Executes the reCaptcha
                 */
                execute: function (widgetId) {
                    validateRecaptchaInstance();

                    recaptcha.execute(widgetId);
                },

                /**
                 * Get/Set reCaptcha language
                 */
                useLang: function (widgetId, lang) {
                    var instance = instances[widgetId];

                    if (instance) {
                        var iframe = instance.querySelector('iframe');
                        if (lang) {
                            // Setter
                            if (iframe && iframe.src) {
                                var s = iframe.src;
                                if (/[?&]hl=/.test(s)) {
                                    s = s.replace(/([?&]hl=)\w+/, '$1' + lang);
                                } else {
                                    s += ((s.indexOf('?') === -1) ? '?' : '&') + 'hl=' + lang;
                                }

                                iframe.src = s;
                            }
                        } else {
                            // Getter
                            if (iframe && iframe.src && /[?&]hl=\w+/.test(iframe.src)) {
                                return iframe.src.replace(/.+[?&]hl=(\w+)([^\w].+)?/, '$1');
                            } else {
                                return null;
                            }
                        }
                    } else {
                        throw new Error('reCaptcha Widget ID not exists', widgetId);
                    }
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
                },

                /**
                 * Gets reCaptcha instance and configuration
                 */
                getInstance: function (widgetId) {
                    return instances[widgetId];
                },

                /**
                 * Destroy reCaptcha instance.
                 */
                destroy: function (widgetId) {
                    delete instances[widgetId];
                }
            };

        }];
    });

}(angular));

/*global angular, Recaptcha */
(function (ng) {
    'use strict';

    var app = ng.module('vcRecaptcha');

    app.directive('vcRecaptcha', ['$document', '$timeout', 'vcRecaptchaService', function ($document, $timeout, vcRecaptcha) {

        return {
            restrict: 'A',
            require: "?^^form",
            scope: {
                response: '=?ngModel',
                key: '=?',
                stoken: '=?',
                theme: '=?',
                size: '=?',
                type: '=?',
                lang: '=?',
                badge: '=?',
                tabindex: '=?',
                required: '=?',
                onCreate: '&',
                onSuccess: '&',
                onExpire: '&'
            },
            link: function (scope, elm, attrs, ctrl) {
                scope.widgetId = null;

                if(ctrl && ng.isDefined(attrs.required)){
                    scope.$watch('required', validate);
                }

                var removeCreationListener = scope.$watch('key', function (key) {
                    var callback = function (gRecaptchaResponse) {
                        // Safe $apply
                        $timeout(function () {
                            scope.response = gRecaptchaResponse;
                            validate();

                            // Notify about the response availability
                            scope.onSuccess({response: gRecaptchaResponse, widgetId: scope.widgetId});
                        });
                    };

                    vcRecaptcha.create(elm[0], {

                        callback: callback,
                        key: key,
                        stoken: scope.stoken || attrs.stoken || null,
                        theme: scope.theme || attrs.theme || null,
                        type: scope.type || attrs.type || null,
                        lang: scope.lang || attrs.lang || null,
                        tabindex: scope.tabindex || attrs.tabindex || null,
                        size: scope.size || attrs.size || null,
                        badge: scope.badge || attrs.badge || null,
                        'expired-callback': expired

                    }).then(function (widgetId) {
                        // The widget has been created
                        validate();
                        scope.widgetId = widgetId;
                        scope.onCreate({widgetId: widgetId});

                        scope.$on('$destroy', destroy);

                        scope.$on('reCaptchaReset', function(event, resetWidgetId){
                          if(ng.isUndefined(resetWidgetId) || widgetId === resetWidgetId){
                            scope.response = "";
                            validate();
                          }
                        })

                    });

                    // Remove this listener to avoid creating the widget more than once.
                    removeCreationListener();
                });

                function destroy() {
                  if (ctrl) {
                    // reset the validity of the form if we were removed
                    ctrl.$setValidity('recaptcha', null);
                  }

                  cleanup();
                }

                function expired(){
                    // Safe $apply
                    $timeout(function () {
                        scope.response = "";
                        validate();

                        // Notify about the response availability
                        scope.onExpire({ widgetId: scope.widgetId });
                    });
                }

                function validate(){
                    if(ctrl){
                        ctrl.$setValidity('recaptcha', scope.required === false ? null : Boolean(scope.response));
                    }
                }

                function cleanup(){
                  vcRecaptcha.destroy(scope.widgetId);

                  // removes elements reCaptcha added.
                  ng.element($document[0].querySelectorAll('.pls-container')).parent().remove();
                }
            }
        };
    }]);

}(angular));
