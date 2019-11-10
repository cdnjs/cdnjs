/*** Directives and services for responding to idle users in AngularJS
* @author Mike Grabski <me@mikegrabski.com>
* @version v0.3.2
* @link https://github.com/HackedByChinese/ng-idle.git
* @license MIT
*/
(function (window, angular, undefined) {
    'use strict';    

    // $keepalive service and provider
    function $KeepaliveProvider() {
    	var options = {
    		http: null,
    		interval: 10*60
    	};

    	this.http = function (value) {
            if (!value) throw new Error('Argument must be a string containing a URL, or an object containing the HTTP request configuration.');
    		if (angular.isString(value)) {
    			value = {url: value, method: 'GET'};
    		}

    		value['cache'] = false;

    		options.http = value;
    	}

    	this.interval = function (seconds) {
    		seconds = parseInt(seconds);

    		if (isNaN(seconds) || seconds <= 0) throw new Error('Interval must be expressed in seconds and be greater than 0.');
    		options.interval = seconds;
    	}

    	this.$get = function ($rootScope, $log, $timeout, $http) {
    		
    		var state = {ping: null};


    		function handleResponse(data, status, onetimeonly) {
    			$rootScope.$broadcast('$keepaliveResponse', data, status);

    			if (!onetimeonly) schedulePing();
    		}

    		function schedulePing() {
    			state.ping = $timeout(ping, options.interval * 1000);
    		}

    		function ping(onetimeonly) {
    			$rootScope.$broadcast('$keepalive');

    			if (angular.isObject(options.http)) {
    			 	$http(options.http)
    			 		.success(function(data, status) {
    			 			handleResponse(data, status, onetimeonly);
    			 		})
    			 		.error(function(data, status) {
    			 			handleResponse(data, status, onetimeonly);
    			 		});
    			} else if (!onetimeonly) schedulePing();
    		};

    		return {
    			_options: function() {
    				return options;
    			},
    			start: function() {
    				$timeout.cancel(state.ping);

    				schedulePing();
    			},
    			stop: function() {
    				$timeout.cancel(state.ping);
    			},
    			ping: function() {
    				ping(true);
    			}
    		};
    	};
        this.$get.$inject = ['$rootScope', '$log', '$timeout', '$http'];
    }

    angular.module('ngIdle.keepalive', [])
        .provider('$keepalive', $KeepaliveProvider);

    // $idle service and provider
    function $IdleProvider() {

        var options = {
            idleDuration: 20 * 60, // in seconds (default is 20min)
            warningDuration: 30, // in seconds (default is 30sec)
            autoResume: true, // lets events automatically resume (unsets idle state/resets warning)
            events: 'mousemove keydown DOMMouseScroll mousewheel mousedown touchstart',
            keepalive: true
        };

        this.activeOn = function (events) {
            options.events = events;
        };

        this.idleDuration = function (seconds) {
        	if (seconds <= 0) throw new Error("idleDuration must be a value in seconds, greater than 0.");

        	options.idleDuration = seconds;
        };

        this.warningDuration = function (seconds) {
        	if (seconds < 0) throw new Error("warning must be a value in seconds, greatner than 0.");

        	options.warningDuration = seconds;
        };

        this.autoResume = function (value) {
        	options.autoResume = value === true;
        };

        this.keepalive = function (enabled) {
        	options.keepalive = enabled === true;
        };

        this.$get = function ($timeout, $log, $rootScope, $document, $keepalive) {
        	var state = {idle: null, warning: null, idling: false, running: false, countdown: null};

        	function startKeepalive() {
        		if (!options.keepalive) return;

        		if (state.running) $keepalive.ping();

        		$keepalive.start();
        	}

        	function stopKeepalive() {
        		if (!options.keepalive) return;

        		$keepalive.stop();
        	}

        	function toggleState() {
        		state.idling = !state.idling;
        		var name = state.idling ? 'Start' : 'End';

        		$rootScope.$broadcast('$idle' + name);

        		if (state.idling) {
        			stopKeepalive();
        			state.countdown = options.warningDuration;
        			countdown();
        		} else {
        			startKeepalive();
        		}
        	}

        	function countdown() {
        		if (state.countdown <= 0) {
        			$rootScope.$broadcast('$idleTimeout');
        		} else {
        			$rootScope.$broadcast('$idleWarn', state.countdown);

        			state.warning = $timeout(countdown, 1000);
        		}

        		state.countdown--;
        	}

            var svc = {
                _options: function() {
                    return options;
                },
                running: function() {
                	return state.running;
                },
                idling: function() {
                	return state.idling;
                },
                watch: function() {
                	$timeout.cancel(state.idle);
                	$timeout.cancel(state.warning);

					if (state.idling) toggleState();
					else if (!state.running) startKeepalive();

                	state.running = true;

                	state.idle = $timeout(toggleState, options.idleDuration * 1000);
                },
                unwatch: function() {
                	$timeout.cancel(state.idle);
                	$timeout.cancel(state.warning);

                	state.idling = false;
                	state.running = false;
                }
            };
           
            var interrupt = function () {
            	if (state.running && options.autoResume) svc.watch();
            };

            $document.find('body').on(options.events, interrupt);

            return svc;
        };
        this.$get.$inject = ['$timeout', '$log', '$rootScope', '$document', '$keepalive'];
    };

    angular.module('ngIdle.idle', [])
        .provider('$idle', $IdleProvider);

    angular.module('ngIdle.ngIdleCountdown', [])
        .directive('ngIdleCountdown', function() {
            return {
                restrict: 'A',
                scope: {
                    value: '=ngIdleCountdown'
                },
                link: function($scope) {
                    $scope.$on('$idleWarn', function(e, countdown) {
                        $scope.$apply(function() {
                            $scope.value = countdown;
                        });                        
                    });

                    $scope.$on('$idleTimeout', function() {
                        $scope.$apply(function() {
                            $scope.value = 0;
                        });
                    });
                }
            };
        });

    angular.module('ngIdle', ['ngIdle.keepalive', 'ngIdle.idle', 'ngIdle.ngIdleCountdown']);
    
})(window, window.angular);