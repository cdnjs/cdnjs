/**
 * Respond to idle users in AngularJS
 * @version v0.1.0
 * @link http://hackedbychinese.github.io/ng-idle
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function (window, angular, undefined) {
    'use strict';

    // register modules
    var ngIdleSvc = angular.module('ngIdle.services', []);
    angular.module('ngIdle', ['ngIdle.services']);

    // $idle service and provider
    function $IdleProvider() {

        var options = {
            idleDuration: 20 * 60, // in seconds (default is 20min)
            warningDuration: 30, // in seconds (default is 30sec)
            autoResume: true, // lets events automatically resume (unsets idle state/resets warning)
            events: 'mousemove keydown DOMMouseScroll mousewheel mousedown'
        };

        this.activeOn = activeOn;
        function activeOn (events) {
            options.events = events;
        };

        this.idleDuration = idleDuration;
        function idleDuration(seconds) {
        	if (seconds < 0) throw new Error("idleDuration must be a value in seconds, greatner than 0.");

        	options.idleDuration = seconds;
        }

        this.warningDuration = warningDuration;
        function warningDuration(seconds) {
        	if (seconds < 0) throw new Error("warning must be a value in seconds, greatner than 0.");

        	options.warningDuration = seconds;
        }

        this.autoResume = autoResume;
        function autoResume(value) {
        	options.autoResume = value === true;
        }

        this.$get = $get;
        $get.$inject = ['$timeout', '$log', '$rootScope', '$document'];
        
        function $get($timeout, $log, $rootScope, $document) {
        	var state = {idle: null, warning: null, idling: false, running: false, countdown: null};

        	function toggleState() {
        		state.idling = !state.idling;
        		var name = state.idling ? 'Start' : 'End';

        		$rootScope.$broadcast('$idle' + name);

        		if (state.idling) {
        			state.countdown = options.warningDuration;
        			countdown();
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
                _t: function() {
                	return state.t;
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

                	state.running = true;

                	if (state.idling) toggleState();

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
    }

    ngIdleSvc.provider('$idle', $IdleProvider);
    
})(window, window.angular);