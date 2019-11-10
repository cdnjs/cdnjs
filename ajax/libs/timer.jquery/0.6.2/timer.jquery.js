/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Timer = __webpack_require__(1);

	var _Timer2 = _interopRequireDefault(_Timer);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* global $:true */

	(function () {
		$.fn.timer = function (options) {
			options = options || 'start';

			return this.each(function () {
				if (!($.data(this, _constants2.default.PLUGIN_NAME) instanceof _Timer2.default)) {
					/**
	     * Create a new data attribute on the element to hold the plugin name
	     * This way we can know which plugin(s) is/are initialized on the element later
	     */
					$.data(this, _constants2.default.PLUGIN_NAME, new _Timer2.default(this, options));
				}

				/**
	    * Use the instance of this plugin derived from the data attribute for this element
	    * to conduct whatever action requested as a string parameter.
	    */
				var instance = $.data(this, _constants2.default.PLUGIN_NAME);

				/**
	    * Provision for calling a function from this plugin
	    * without initializing it all over again
	    */
				if (typeof options === 'string') {
					if (typeof instance[options] === 'function') {
						/*
	     Pass in 'instance' to provide for the value of 'this' in the called function
	     */
						instance[options]();
					}
				} else {
					instance.start();
				}
			});
		};
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global $:true */


	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _utils = __webpack_require__(3);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Timer class to be instantiated on every element.
	 * All relative values will be stored at instance level.
	 */

	var Timer = function () {
		/**
	  * Construct a Timer instance on the provided element with the given config.
	  * @param  {Object} element HTML node as passed by jQuery
	  * @param  {Object|String} config User extended options or a string (start, pause, resume etc)
	  */

		function Timer(element, config) {
			_classCallCheck(this, Timer);

			this.element = element;
			this.originalConfig = $.extend({}, config);
			this.totalSeconds = 0;
			this.intervalId = null;
			// A HTML element will have the html() method in jQuery to inject content,
			this.html = 'html';
			if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
				// In case of input element or a textarea, jQuery provides the val() method to inject content
				this.html = 'val';
			}

			this.config = _utils2.default.getDefaultConfig();

			if (!config || typeof config === 'string') {
				return;
			}

			if (config.duration) {
				config.duration = _utils2.default.durationTimeToSeconds(config.duration);
			}
			this.config = $.extend(this.config, config);
			if (this.config.seconds) {
				this.totalSeconds = this.config.seconds;
			}

			if (this.config.editable) {
				_utils2.default.makeEditable(this);
			}

			this.startTime = _utils2.default.unixSeconds() - this.totalSeconds;

			// In case duration is set along with a callback as well as repeat,
			// then the update frequency needs to be at least 1000ms to prevent callback from being fired more than once
			if (this.config.duration && this.config.repeat && this.config.updateFrequency < 1000) {
				this.config.updateFrequency = 1000;
			}

			// If countdown is set, ensure duration is set as well
			// Also set the total seconds to the duration so that the first render gets the correct value
			if (this.config.countdown) {
				if (!this.config.duration) {
					throw new Error('Countdown option set without duration!');
				}

				if (this.config.editable) {
					throw new Error('Cannot set editable on a countdown timer!');
				}
				this.config.startTime = _utils2.default.unixSeconds() - this.config.duration;
				this.totalSeconds = this.config.duration;
			}
		}

		_createClass(Timer, [{
			key: 'start',
			value: function start() {
				if (this.state !== _constants2.default.TIMER_RUNNING) {
					_utils2.default.setState(this, _constants2.default.TIMER_RUNNING);
					this.render();
					this.intervalId = setInterval(_utils2.default.intervalHandler.bind(null, this), this.config.updateFrequency);
				}
			}
		}, {
			key: 'pause',
			value: function pause() {
				if (this.state === _constants2.default.TIMER_RUNNING) {
					_utils2.default.setState(this, _constants2.default.TIMER_PAUSED);
					clearInterval(this.intervalId);
				}
			}
		}, {
			key: 'resume',
			value: function resume() {
				if (this.state === _constants2.default.TIMER_PAUSED) {
					_utils2.default.setState(this, _constants2.default.TIMER_RUNNING);
					if (this.config.countdown) {
						this.startTime = _utils2.default.unixSeconds() - this.config.duration + this.totalSeconds;
					} else {
						this.startTime = _utils2.default.unixSeconds() - this.totalSeconds;
					}
					this.intervalId = setInterval(_utils2.default.intervalHandler.bind(null, this), this.config.updateFrequency);
				}
			}
		}, {
			key: 'remove',
			value: function remove() {
				clearInterval(this.intervalId);
				$(this.element).data(_constants2.default.PLUGIN_NAME, null);
			}
		}, {
			key: 'reset',
			value: function reset() {
				var element = this.element;
				var originalConfig = this.originalConfig;
				this.remove();
				$(element).timer(originalConfig);
			}
		}, {
			key: 'render',
			value: function render() {
				if (this.config.format) {
					$(this.element)[this.html](_utils2.default.secondsToFormattedTime(this.totalSeconds, this.config.format));
				} else {
					$(this.element)[this.html](_utils2.default.secondsToPrettyTime(this.totalSeconds));
				}
				// Make total seconds available via timer element's data attribute
				$(this.element).data('seconds', this.totalSeconds);
			}
		}]);

		return Timer;
	}();

	exports.default = Timer;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Constants = {
		PLUGIN_NAME: 'timer',
		TIMER_RUNNING: 'running',
		TIMER_PAUSED: 'paused',
		DAYINSECONDS: 86400,
		THIRTYSIXHUNDRED: 3600,
		SIXTY: 60,
		TEN: 10
	};

	exports.default = Constants;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Private
	 * Convert (a number) seconds to a Object with days, hours, minutes etc as properties
	 * Used by secondsToPrettyTime for to format the time display
	 * @param  {Number} totalSeconds The total seconds that needs to be distributed into an Object
	 * @return {Object} Object with days, hours, minutes, totalMinutes, seconds and totalSeconds
	 */
	var _secondsToTimeObj = function _secondsToTimeObj() {
		var totalSeconds = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

		var days = 0;
		var hours = 0;
		var totalMinutes = Math.floor(totalSeconds / _constants2.default.SIXTY);
		var minutes = totalMinutes;
		var seconds = void 0;

		if (totalSeconds >= _constants2.default.DAYINSECONDS) {
			days = Math.floor(totalSeconds / _constants2.default.DAYINSECONDS);
		}

		if (totalSeconds >= _constants2.default.THIRTYSIXHUNDRED) {
			hours = Math.floor(totalSeconds % _constants2.default.DAYINSECONDS / _constants2.default.THIRTYSIXHUNDRED);
		}

		if (totalSeconds >= _constants2.default.SIXTY) {
			minutes = Math.floor(totalSeconds % _constants2.default.THIRTYSIXHUNDRED / _constants2.default.SIXTY);
		}

		seconds = totalSeconds % _constants2.default.SIXTY;

		return { days: days, hours: hours, minutes: minutes, totalMinutes: totalMinutes, seconds: seconds, totalSeconds: totalSeconds };
	};

	/**
	 * Private
	 * Method to pad a given number with a 0 in case it's less than 10
	 * @param  {Number} num The number to be padded
	 * @return {String|Number} Padded (if less than 10) number
	 */
	/* global $:true */
	var _paddedValue = function _paddedValue(num) {
		num = parseInt(num, 10);
		if (num < 10) {
			return '0' + num;
		}
		return num;
	};

	var getDefaultConfig = function getDefaultConfig() {
		return {
			seconds: 0, // Default seconds value to start timer from
			editable: false, // Allow making changes to the time by clicking on it
			duration: null, // Duration to run callback after
			callback: function callback() {
				// Default callback to run after elapsed duration
				console.log('Time up!');
			},
			repeat: false, // this will repeat callback every n times duration is elapsed
			countdown: false, // if true, this will render the timer as a countdown (must have duration)
			format: null, // this sets the format in which the time will be printed
			updateFrequency: 500 // How often should timer display update
		};
	};

	/**
	 * @return {Number} Return seconds passed since Jan 1, 1970
	 */
	var unixSeconds = function unixSeconds() {
		return Math.round(Date.now() / 1000);
	};

	/**
	 * Convert seconds to pretty time.
	 * For example 100 becomes 1:40 min, 34 becomes 34 sec and 10000 becomes 2:46:40
	 * @param  {Number} seconds Seconds to be converted
	 * @return {String}         Pretty time
	 */
	var secondsToPrettyTime = function secondsToPrettyTime(seconds) {
		var timeObj = _secondsToTimeObj(seconds);

		if (timeObj.days) {
			return timeObj.days + ':' + _paddedValue(timeObj.hours) + ':' + _paddedValue(timeObj.minutes) + ':' + _paddedValue(timeObj.seconds);
		}

		if (timeObj.hours) {
			return timeObj.hours + ':' + _paddedValue(timeObj.minutes) + ':' + _paddedValue(timeObj.seconds);
		}

		var prettyTime = '';
		if (timeObj.minutes) {
			prettyTime = timeObj.minutes + ':' + _paddedValue(timeObj.seconds) + ' min';
		} else {
			prettyTime = timeObj.seconds + ' sec';
		}

		return prettyTime;
	};

	/**
	 * Convert seconds to user defined format for time
	 * @param  {Number} seconds       Seconds to be converted
	 * @param  {String} formattedTime User defined format
	 * @return {String}               Formatted time string
	 */
	var secondsToFormattedTime = function secondsToFormattedTime(seconds, formattedTime) {
		var timeObj = _secondsToTimeObj(seconds);
		var formatDef = [{ identifier: '%d', value: timeObj.days }, { identifier: '%h', value: timeObj.hours }, { identifier: '%m', value: timeObj.minutes }, { identifier: '%s', value: timeObj.seconds }, { identifier: '%g', value: timeObj.totalMinutes }, { identifier: '%t', value: timeObj.totalSeconds }, { identifier: '%D', value: _paddedValue(timeObj.days) }, { identifier: '%H', value: _paddedValue(timeObj.hours) }, { identifier: '%M', value: _paddedValue(timeObj.minutes) }, { identifier: '%S', value: _paddedValue(timeObj.seconds) }, { identifier: '%G', value: _paddedValue(timeObj.totalMinutes) }, { identifier: '%T', value: _paddedValue(timeObj.totalSeconds) }];
		formatDef.forEach(function (fmt) {
			formattedTime = formattedTime.replace(fmt.identifier, fmt.value);
		});

		return formattedTime;
	};

	/**
	 * Convert duration time format to seconds
	 * @param  {String} timeFormat e.g. 5m30s
	 * @return {Number} Returns 330
	 */
	var durationTimeToSeconds = function durationTimeToSeconds(timeFormat) {
		if (!timeFormat) {
			throw new Error('durationTimeToSeconds expects a string argument!');
		}

		// Early return in case a number is passed
		if (!isNaN(Number(timeFormat))) {
			return timeFormat;
		}

		timeFormat = timeFormat.toLowerCase();
		var days = timeFormat.match(/\d{1,2}d/); // Match 10d in 10d5h30m10s
		var hrs = timeFormat.match(/\d{1,2}h/); // Match 5h in 5h30m10s
		var mins = timeFormat.match(/\d{1,2}m/); // Match 30m in 5h30m10s
		var secs = timeFormat.match(/\d{1,2}s/); // Match 10s in 5h30m10s

		if (!days && !hrs && !mins && !secs) {
			throw new Error('Invalid string passed in durationTimeToSeconds!');
		}
		var seconds = 0;

		if (days) {
			seconds += Number(days[0].replace('d', '') * _constants2.default.DAYINSECONDS);
		}

		if (hrs) {
			seconds += Number(hrs[0].replace('h', '') * _constants2.default.THIRTYSIXHUNDRED);
		}

		if (mins) {
			seconds += Number(mins[0].replace('m', '')) * _constants2.default.SIXTY;
		}

		if (secs) {
			seconds += Number(secs[0].replace('s', ''));
		}

		return seconds;
	};

	/**
	 * Parse pretty time and return it as seconds
	 * Currently only the native pretty time is parseable
	 * @param  {String} editedTime The time as edited by the user
	 * @return {Number}            Parsed time
	 */
	var prettyTimeToSeconds = function prettyTimeToSeconds(editedTime) {
		var arr = void 0;
		var time = void 0;

		if (editedTime.indexOf('sec') > 0) {
			time = Number(editedTime.replace(/\ssec/g, ''));
		} else if (editedTime.indexOf('min') > 0) {
			editedTime = editedTime.replace(/\smin/g, '');
			arr = editedTime.split(':');
			time = Number(arr[0] * _constants2.default.SIXTY) + Number(arr[1]);
		} else if (editedTime.match(/\d{1,2}:\d{2}:\d{2}:\d{2}/)) {
			arr = editedTime.split(':');
			time = Number(arr[0] * _constants2.default.DAYINSECONDS) + Number(arr[1] * _constants2.default.THIRTYSIXHUNDRED) + Number(arr[2] * _constants2.default.SIXTY) + Number(arr[3]);
		} else if (editedTime.match(/\d{1,2}:\d{2}:\d{2}/)) {
			arr = editedTime.split(':');
			time = Number(arr[0] * _constants2.default.THIRTYSIXHUNDRED) + Number(arr[1] * _constants2.default.SIXTY) + Number(arr[2]);
		}

		return time;
	};

	/**
	 * Set the provided state of the timer in the data attr `state` of the timer HTML element
	 * @param  {Object} timerInstance Instance of the timer object
	 * @param  {[type]} newState      The state to be set on the HTML element
	 */
	var setState = function setState(timerInstance, newState) {
		timerInstance.state = newState;
		$(timerInstance.element).data('state', newState);
	};

	/**
	 * Convenience method to wire up focus & blur events to pause and resume
	 * Makes use of the local `prettyTimeToSeconds` function to convert user edited time to seconds
	 * @param  {Object} timerInstance Instance of the Timer Class
	 */
	var makeEditable = function makeEditable(timerInstance) {
		$(timerInstance.element).on('focus', function () {
			timerInstance.pause();
		});

		$(timerInstance.element).on('blur', function () {
			timerInstance.totalSeconds = prettyTimeToSeconds($(timerInstance.element)[timerInstance.html]());
			timerInstance.resume();
		});
	};

	/**
	 * The function that will be called via setInterval based on the timer's update frequency
	 * @param  {Object} timerInstance Instance of the timer object
	 */
	var intervalHandler = function intervalHandler(timerInstance) {
		timerInstance.totalSeconds = unixSeconds() - timerInstance.startTime;

		if (timerInstance.config.countdown) {
			timerInstance.totalSeconds = timerInstance.config.duration - timerInstance.totalSeconds;

			if (timerInstance.totalSeconds === 0) {
				clearInterval(timerInstance.intervalId);
				setState(timerInstance, _constants2.default.TIMER_STOPPED);
				timerInstance.config.callback();
				$(timerInstance.element).data('seconds');
			}

			timerInstance.render();
			return;
		}

		timerInstance.render();
		if (!timerInstance.config.duration) {
			return;
		}

		// If the timer was called with a duration parameter,
		// run the callback if duration is complete
		// and remove the duration if `repeat` is not requested
		if (timerInstance.totalSeconds > 0 && timerInstance.totalSeconds % timerInstance.config.duration === 0) {
			if (timerInstance.config.callback) {
				timerInstance.config.callback();
			}

			if (!timerInstance.config.repeat) {
				clearInterval(timerInstance.intervalId);
				setState(timerInstance, _constants2.default.TIMER_STOPPED);
				timerInstance.config.duration = null;
			}
		}
	};

	exports.default = {
		getDefaultConfig: getDefaultConfig,
		unixSeconds: unixSeconds,
		secondsToPrettyTime: secondsToPrettyTime,
		secondsToFormattedTime: secondsToFormattedTime,
		durationTimeToSeconds: durationTimeToSeconds,
		prettyTimeToSeconds: prettyTimeToSeconds,
		setState: setState,
		makeEditable: makeEditable,
		intervalHandler: intervalHandler
	};

/***/ }
/******/ ]);