/*
 * matchmedia-ng (c) 2014 Jason Kulatunga, Inc. | http://analogj.mit-license.org/
 */
(function(window, angular, undefined) {
'use strict';

angular.module("matchmedia-ng", []).
    provider('matchmedia', function (){

        ///////////////////////////////////////////////////////////////////////
        // Configuration
        ///////////////////////////////////////////////////////////////////////
        /**
         *
         * these settings can be changed by injecting matchmediaProvider into
         * the config function of your module and
         * changing the matchmediaProvider.rules with your own rule key value
         * pairs E.G.

         *  angular.module('app').config(['matchmediaProvider', function (matchmediaProvider) {
         *      matchmediaProvider.rules.phone = "(max-width: 500px)";
         *      matchmediaProvider.rules.desktop: = "(max-width: 1500px)";
         *  }]);
         *
         * default values taken from twitter bootstrap :
         * https://github.com/twitter/bootstrap/blob/master/less/responsive-utilities.less
         */
        var matchmedia = {
            rules: {
                print : "print",
                screen : "screen",
                phone : "(max-width: 767px)",
                tablet : "(min-width: 768px) and (max-width: 979px)",
                desktop : "(min-width: 980px)",
                portrait : "(orientation: portrait)",
                landscape : "(orientation: landscape)"
            }
        };
        matchmedia.$get = ['$window','safeApply', 'logger', function($window, safeApply, logger) {

            logger.log('Creating matchmedia');

            ///////////////////////////////////////////////////////////////////////
            // Private Methods
            ///////////////////////////////////////////////////////////////////////
            function createSafeListener(cb, $scope){
                return function(mediaQueryList){
                    safeApply(function() {
                        cb(mediaQueryList);
                    },$scope);
                };
            }

            ///////////////////////////////////////////////////////////////////////
            // Public Methods
            ///////////////////////////////////////////////////////////////////////
            //should never be called directly, but is available for custom calls.
            var matchmediaService = {};

            /**
             * @param {string} query media query to listen on.
             * @param {function(mediaQueryList)} listener Function to call when the media query is matched.
             * @returns {function()} Returns a deregistration function for this listener.
             */
            matchmediaService.on = function(query, listener, $scope) {
                var supportsMatchMedia = $window.matchMedia !== undefined && !!$window.matchMedia('all').addListener;
                if(supportsMatchMedia) {
                    logger.log('adding listener for query: '+ query);
                    var mediaQueryList = $window.matchMedia(query);
                    var handler = createSafeListener(listener, $scope);
                    mediaQueryList.addListener(handler);
                    //immediately return the current mediaQueryList;
                    handler(mediaQueryList);

                    return function() {
                        logger.log('removing listener from query: '+ query);
                        mediaQueryList.removeListener(handler);

                    };
                }
            };
            /**
             * @param {string} query media query to test.
             * @returns {mediaQueryList} Returns a boolean.
             */
            matchmediaService.is = function(query) {
                logger.log('test query: '+ query);
                return $window.matchMedia(query).matches;
            };



            ///////////////////////////////////////////////////////////////////////
            // Aliased Methods
            ///////////////////////////////////////////////////////////////////////
            matchmediaService.onPrint = function(listener, $scope){
                return matchmediaService.on(matchmedia.rules.print,listener, $scope);
            };
            matchmediaService.onScreen = function(listener, $scope){
                return matchmediaService.on(matchmedia.rules.screen,listener, $scope);
            };
            matchmediaService.onPhone = function(listener, $scope){
                return matchmediaService.on(matchmedia.rules.phone,listener, $scope);
            };
            matchmediaService.onTablet = function(listener, $scope){
                return matchmediaService.on(matchmedia.rules.tablet,listener, $scope);
            };
            matchmediaService.onDesktop = function(listener, $scope){
                return matchmediaService.on(matchmedia.rules.desktop,listener, $scope);
            };
            matchmediaService.onPortrait = function(listener, $scope){
                return matchmediaService.on(matchmedia.rules.portrait,listener, $scope);
            };
            matchmediaService.onLandscape = function(listener, $scope){
                return matchmediaService.on(matchmedia.rules.landscape,listener, $scope);
            };

            matchmediaService.isPrint = function(){
                return matchmediaService.is(matchmedia.rules.print);
            };
            matchmediaService.isScreen = function(){
                return matchmediaService.is(matchmedia.rules.screen);
            };
            matchmediaService.isPhone = function(){
                return matchmediaService.is(matchmedia.rules.phone);
            };
            matchmediaService.isTablet = function(){
                return matchmediaService.is(matchmedia.rules.tablet);
            };
            matchmediaService.isDesktop = function(){
                return matchmediaService.is(matchmedia.rules.desktop);
            };
            matchmediaService.isPortrait = function(){
                return matchmediaService.is(matchmedia.rules.portrait);
            };
            matchmediaService.isLandscape = function(){
                return matchmediaService.is(matchmedia.rules.landscape);
            };
            return matchmediaService;
        }];
        return matchmedia;
    })
    .directive('ajMatchmedia', ['matchmedia', function(matchmedia) {
        return {
            restrict: 'E',
            scope: {
                'queryListener': '&',
                'queryMatches': '='
            },
            link: function(scope, element, attrs, controllers) {
                var deregister;

                if (attrs.on && attrs.queryListener) {
                    if (attrs.on.slice(0, 2) === 'on' && matchmedia[attrs.on] !== 'undefined') {
                        deregister = matchmedia[attrs.on](function(mediaQueryList) {
                            scope.queryListener({mediaQueryList: mediaQueryList});
                        });
                    } else {
                        deregister = matchmedia.on(attrs.on, function(mediaQueryList) {
                            scope.queryListener({mediaQueryList: mediaQueryList});
                        });
                    }
                    scope.$on('$destroy', deregister);
                } else if (attrs.is && attrs.queryMatches) {
                    if (attrs.is.slice(0, 2) === 'is' && matchmedia[attrs.is] !== 'undefined') {
                        scope.queryMatches = matchmedia[attrs.is]();
                    } else {
                        scope.queryMatches = matchmedia.is(attrs.is);
                    }
                }
            }
        };
    }])
    .factory('safeApply', ['$rootScope',function($rootScope) {
        return function(fn, $scope) {
            $scope = $scope || $rootScope;
            var phase = $scope.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if (fn) {
                    $scope.$eval(fn);
                }
            } else {
                if (fn) {
                    $scope.$apply(fn);
                } else {
                    $scope.$apply();
                }
            }
        };
    }])
    .provider('logger', function(){
        this.DEVMODE = false;

        this.setDEVMODE = function(devmode){
            this.DEVMODE = devmode;
        };

        this.$get = ['$window', '$log', function($window, $log) {
            var DEVMODE = this.DEVMODE;
            var logger = {};
            logger.log = function(){
                if (DEVMODE) $log.info(arguments);
            };
            logger.always = function(){
                $log.info(arguments);
            };
            return logger;
        }];
    });
})(window, window.angular);
