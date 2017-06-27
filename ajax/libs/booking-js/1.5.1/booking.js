(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["TimekitBooking"] = factory(require("jQuery"));
	else
		root["TimekitBooking"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*!
	 * Booking.js
	 * Version: 1.5.1
	 * http://booking.timekit.io
	 *
	 * Copyright 2015 Timekit, Inc.
	 * Timekit Booking.js is freely distributable under the MIT license.
	 *
	 */
	
	// External depenencies
	var $               = __webpack_require__(1);
	window.fullcalendar = __webpack_require__(2);
	var moment          = window.moment = __webpack_require__(3);
	var timekit         = __webpack_require__(7);
	
	// Internal dependencies
	var utils         = __webpack_require__(29);
	var defaultConfig = __webpack_require__(30);
	
	// Main library
	function TimekitBooking() {
	
	  // Library config
	  var config = {};
	
	  // DOM nodes
	  var rootTarget;
	  var calendarTarget;
	  var bookingPageTarget;
	
	  // Inject style dependencies
	  var includeStyles = function() {
	    __webpack_require__(31);
	    __webpack_require__(35);
	    __webpack_require__(37);
	    __webpack_require__(39);
	  };
	
	  // Make sure DOM element is ready and clean it
	  var prepareDOM = function() {
	
	    rootTarget = $(config.targetEl);
	    if (rootTarget.length === 0) {
	      throw new Error('TimekitBooking - No target DOM element was found (' + config.targetEl + ')');
	    }
	    rootTarget.addClass('bookingjs');
	    rootTarget.children(':not(script)').remove();
	
	  };
	
	  // Setup the Timekit SDK with correct credentials
	  var timekitSetup = function() {
	
	    var args = {};
	    $.extend(true, args, config.timekitConfig);
	
	    timekit.configure(args);
	    timekit.setUser(config.email, config.apiToken);
	
	  };
	
	  // Fetch availabile time through Timekit SDK
	  var timekitFindTime = function() {
	
	    var args = { emails: [config.email] };
	    $.extend(args, config.timekitFindTime);
	
	    utils.doCallback('findTimeStarted', config, args);
	
	    timekit.findTime(args)
	    .then(function(response){
	
	      utils.doCallback('findTimeSuccessful', config, response);
	
	      // Go to first event if enabled
	      if(config.goToFirstEvent && response.data.length > 0) {
	        var firstEventStart = response.data[0].start;
	        var firstEventStartHour = moment(firstEventStart).format('H');
	        goToDate(firstEventStart);
	        scrollToTime(firstEventStartHour);
	      }
	
	      // Render available timeslots in FullCalendar
	      renderCalendarEvents(response.data);
	
	    }).catch(function(response){
	      utils.doCallback('findTimeFailed', config, response);
	      throw new Error('TimekitBooking - An error with Timekit FindTime occured, context: ' + response);
	    });
	
	  };
	
	  // Tells FullCalendar to go to a specifc date
	  var goToDate = function(date) {
	
	    calendarTarget.fullCalendar('gotoDate', date);
	
	  };
	
	  // Scrolls fullcalendar to the specified hour
	  var scrollToTime = function(time) {
	
	    // Only proceed for agendaWeek view
	    if (calendarTarget.fullCalendar('getView').name !== 'agendaWeek'){
	      return;
	    }
	
	    // Get height of each hour row
	    var hours = calendarTarget.find('.fc-slats .fc-minor');
	    var hourHeight = $(hours[0]).height() * 2;
	
	    // If minTime is set in fullCalendar config, subtract that from the scollTo calculationn
	    var minTimeHeight = 0;
	    if (config.fullCalendar.minTime) {
	      var minTime = moment(config.fullCalendar.minTime, 'HH:mm:ss').format('H');
	      minTimeHeight = hourHeight * minTime;
	    }
	
	    // Calculate scrolling location and container sizes
	    var scrollTo = (hourHeight * time) - minTimeHeight;
	    var scrollable = calendarTarget.find('.fc-scroller');
	    var scrollableHeight = scrollable.height();
	    var scrollableScrollTop = scrollable.scrollTop();
	    var maximumHeight = scrollable.find('.fc-time-grid').height();
	
	    // Only perform the scroll if the scrollTo is outside the current visible boundary
	    if (scrollTo > scrollableScrollTop && scrollTo < scrollableScrollTop + scrollableHeight) {
	      return;
	    }
	
	    // If scrollTo point is past the maximum height, then scroll to maximum possible while still animating
	    if (scrollTo > maximumHeight - scrollableHeight) {
	      scrollTo = maximumHeight - scrollableHeight;
	    }
	
	    // Perform the scrollTo animation
	    scrollable.animate({scrollTop: scrollTo});
	
	  };
	
	  // Calculate and display timezone helper
	  var renderTimezoneHelper = function() {
	
	    var localTzOffset = (new Date()).getTimezoneOffset()/60*-1;
	    var timezoneIcon = __webpack_require__(41);
	
	    var template = __webpack_require__(42);
	
	    var timezoneHelperTarget = $(template.render({
	      timezoneIcon: timezoneIcon,
	      loading: true
	    }));
	
	    rootTarget.addClass('has-timezonehelper');
	    rootTarget.append(timezoneHelperTarget);
	
	    var args = {
	      email: config.email
	    };
	
	    utils.doCallback('getUserTimezoneStarted', config, args);
	
	    timekit.getUserTimezone(args).then(function(response){
	
	      utils.doCallback('getUserTimezoneSuccesful', config, response);
	
	      var hostTzOffset = response.data.utc_offset;
	      var tzOffsetDiff = Math.abs(localTzOffset - hostTzOffset);
	
	      var template = __webpack_require__(42);
	      var newTimezoneHelperTarget = $(template.render({
	        timezoneIcon: timezoneIcon,
	        timezoneDifference: (tzOffsetDiff === 0 ? false : true),
	        timezoneOffset: tzOffsetDiff,
	        timezoneDirection: (tzOffsetDiff > 0 ? 'ahead' : 'behind'),
	        hostName: config.name
	      }));
	
	      timezoneHelperTarget.replaceWith(newTimezoneHelperTarget);
	
	    }).catch(function(response){
	      utils.doCallback('getUserTimezoneFailed', config, response);
	      throw new Error('TimekitBooking - An error with Timekit getUserTimezone occured, context: ' + response);
	    });
	
	  };
	
	  // Setup and render FullCalendar
	  var initializeCalendar = function() {
	
	    var sizing = decideCalendarSize();
	
	    var args = {
	      defaultView: sizing.view,
	      height: sizing.height,
	      eventClick: showBookingPage,
	      windowResize: function() {
	        var sizing = decideCalendarSize();
	        calendarTarget.fullCalendar('changeView', sizing.view);
	        calendarTarget.fullCalendar('option', 'height', sizing.height);
	      }
	    };
	
	    $.extend(true, args, config.fullCalendar);
	
	    calendarTarget = $('<div class="bookingjs-calendar empty-calendar">');
	    rootTarget.append(calendarTarget);
	
	    calendarTarget.fullCalendar(args);
	    rootTarget.addClass('show');
	
	    utils.doCallback('fullCalendarInitialized', config);
	
	  };
	
	  // Fires when window is resized and calendar must adhere
	  var decideCalendarSize = function() {
	
	    var view = 'agendaWeek';
	    var height = 420;
	    var rootWidth = rootTarget.width();
	
	    if (rootWidth < 480) {
	      view = 'basicDay';
	      height = 335;
	      rootTarget.addClass('is-small');
	    } else {
	      rootTarget.removeClass('is-small');
	    }
	
	    if (config.bookingFields.comment.enabled) {  height += 84; }
	    if (config.bookingFields.phone.enabled) {    height += 48; }
	    if (config.bookingFields.voip.enabled) {     height += 48; }
	    if (config.bookingFields.location.enabled) { height += 48; }
	
	    return {
	      height: height,
	      view: view
	    };
	
	  };
	
	  // Render the supplied calendar events in FullCalendar
	  var renderCalendarEvents = function(eventData) {
	
	    calendarTarget.fullCalendar('addEventSource', {
	      events: eventData
	    });
	
	    calendarTarget.removeClass('empty-calendar');
	
	  };
	
	  // Render the avatar image
	  var renderAvatarImage = function() {
	
	    var template = __webpack_require__(46);
	    var avatarTarget = $(template.render({
	      image: config.avatar
	    }));
	
	    rootTarget.addClass('has-avatar');
	    rootTarget.append(avatarTarget);
	
	  };
	
	  // Render the avatar image
	  var renderDisplayName = function() {
	
	    var template = __webpack_require__(47);
	    var displayNameTarget = $(template.render({
	      name: config.name
	    }));
	
	    rootTarget.addClass('has-displayname');
	    rootTarget.append(displayNameTarget);
	
	  };
	
	  // Event handler when a timeslot is clicked in FullCalendar
	  var showBookingPage = function(eventData) {
	
	    utils.doCallback('showBookingPage', config, eventData);
	
	    var fieldsTemplate = __webpack_require__(48);
	    var template = __webpack_require__(49);
	
	    var dateFormat = config.localization.bookingDateFormat || moment.localeData().longDateFormat('LL');
	    var timeFormat = config.localization.bookingTimeFormat || moment.localeData().longDateFormat('LT');
	
	    bookingPageTarget = $(template.render({
	      chosenDate:           moment(eventData.start).format(dateFormat),
	      chosenTime:           moment(eventData.start).format(timeFormat) + ' - ' + moment(eventData.end).format(timeFormat),
	      start:                moment(eventData.start).format(),
	      end:                  moment(eventData.end).format(),
	      closeIcon:            __webpack_require__(50),
	      checkmarkIcon:        __webpack_require__(51),
	      loadingIcon:          __webpack_require__(52),
	      errorIcon:            __webpack_require__(53),
	      submitText:           'Book it',
	      successMessageTitle:  'Thanks!',
	      successMessagePart1:  'An invitation has been sent to:',
	      successMessagePart2:  'Accept the invitation to confirm the booking.',
	      fields:               config.bookingFields
	    }, {
	      formFields: fieldsTemplate
	    }));
	
	    bookingPageTarget.children('.bookingjs-bookpage-close').click(function(e) {
	      e.preventDefault();
	      hideBookingPage();
	    });
	
	    var form = bookingPageTarget.children('.bookingjs-form');
	
	    form.submit(function(e) {
	      submitBookingForm(this, e);
	    });
	
	    // Show powered by Timekit message
	    if (config.showCredits) {
	      renderPoweredByMessage(bookingPageTarget);
	    }
	
	    $(document).on('keyup', function(e) {
	      // escape key maps to keycode `27`
	      if (e.keyCode === 27) { hideBookingPage(); }
	    });
	
	    rootTarget.append(bookingPageTarget);
	
	    setTimeout(function(){
	      bookingPageTarget.addClass('show');
	    }, 100);
	
	  };
	
	  // Remove the booking page DOM node
	  var hideBookingPage = function() {
	
	    utils.doCallback('closeBookingPage', config);
	
	    bookingPageTarget.removeClass('show');
	
	    setTimeout(function(){
	      bookingPageTarget.remove();
	    }, 200);
	
	    $(document).off('keyup');
	
	  };
	
	  // Event handler on form submit
	  var submitBookingForm = function(form, e) {
	
	    e.preventDefault();
	
	    var formElement = $(form);
	
	    // Abort if form is submitting, have submitted or does not validate
	    if(formElement.hasClass('loading') || formElement.hasClass('success') || formElement.hasClass('error') || !e.target.checkValidity()) {
	      var submitButton = formElement.find('.bookingjs-form-button');
	      submitButton.addClass('button-shake');
	      setTimeout(function() {
	        submitButton.removeClass('button-shake');
	      }, 500);
	      return;
	    }
	
	    var values = {};
	    $.each(formElement.serializeArray(), function(i, field) {
	        values[field.name] = field.value;
	    });
	
	    formElement.addClass('loading');
	
	    utils.doCallback('submitBookingForm', config, values);
	
	    // Call create event endpoint
	    timekitCreateEvent(values).then(function(response){
	
	      utils.doCallback('createEventSuccessful', config, response);
	
	      formElement.find('.booked-email').html(values.email);
	      formElement.removeClass('loading').addClass('success');
	
	    }).catch(function(response){
	
	      utils.doCallback('createEventFailed', config, response);
	
	      var submitButton = formElement.find('.bookingjs-form-button');
	      submitButton.addClass('button-shake');
	      setTimeout(function() {
	        submitButton.removeClass('button-shake');
	      }, 500);
	
	      formElement.removeClass('loading').addClass('error');
	      setTimeout(function() {
	        formElement.removeClass('error');
	      }, 2000);
	
	      throw new Error('TimekitBooking - An error with Timekit createEvent occured, context: ' + response);
	    });
	
	  };
	
	  // Create new event through Timekit SDK
	  var timekitCreateEvent = function(data) {
	
	    var args = {
	      start: data.start,
	      end: data.end,
	      what: config.name + ' x ' + data.name,
	      where: 'TBD',
	      description: '',
	      calendar_id: config.calendar,
	      participants: [config.email, data.email]
	    };
	
	    if (config.bookingFields.location.enabled) { args.where = data.location; }
	    if (config.bookingFields.phone.enabled) {    args.description += config.bookingFields.phone.placeholder + ': ' + data.phone + '\n'; }
	    if (config.bookingFields.voip.enabled) {     args.description += config.bookingFields.voip.placeholder + ': ' + data.voip + '\n'; }
	    if (config.bookingFields.comment.enabled) {  args.description += config.bookingFields.comment.placeholder + ': ' + data.comment + '\n'; }
	
	    $.extend(true, args, config.timekitCreateEvent);
	
	    utils.doCallback('createEventStarted', config, args);
	
	    return timekit.createEvent(args);
	
	  };
	
	  // Render the powered by Timekit message
	  var renderPoweredByMessage = function(pageTarget) {
	
	    var template = __webpack_require__(54);
	    var timekitIcon = __webpack_require__(55);
	    var poweredTarget = $(template.render({
	      timekitIcon: timekitIcon
	    }));
	
	    pageTarget.append(poweredTarget);
	
	  };
	
	  // Set configs and defaults
	  var setConfig = function(suppliedConfig) {
	
	    // Check whether a config is supplied
	    if(suppliedConfig === undefined || typeof suppliedConfig !== 'object' || $.isEmptyObject(suppliedConfig)) {
	      if (window.timekitBookingConfig !== undefined) {
	        suppliedConfig = window.timekitBookingConfig;
	      } else {
	        throw new Error('TimekitBooking - No configuration was supplied or found. Please supply a config object upon library initialization');
	      }
	    }
	
	    // Extend the default config with supplied settings
	    var newConfig = $.extend(true, {}, defaultConfig.primary, suppliedConfig);
	
	    // Apply any presets if applicable (supplied config have presedence over preset)
	    var presetsConfig = {};
	    if(newConfig.localization.timeDateFormat === '24h-dmy-mon') {
	      presetsConfig = defaultConfig.presets.timeDateFormat24hdmymon;
	    }
	    if(newConfig.localization.timeDateFormat === '12h-mdy-sun') {
	      presetsConfig = defaultConfig.presets.timeDateFormat12hmdysun;
	    }
	
	    // Extend the config with the presets
	    var finalConfig = $.extend(true, {}, presetsConfig, newConfig);
	
	    // Check for required settings
	    if(!finalConfig.email || !finalConfig.apiToken || !finalConfig.calendar) {
	      throw new Error('TimekitBooking - A required config setting was missing ("email", "apiToken" or "calendar")');
	    }
	
	    // Set new config to instance config
	    config = finalConfig;
	
	    return config;
	
	  };
	
	  // Get library config
	  var getConfig = function() {
	
	    return config;
	
	  };
	
	  // Render method
	  var render = function() {
	
	    // Set rootTarget to the target element and clean before child nodes before continuing
	    prepareDOM();
	
	    // Setup Timekit SDK config
	    timekitSetup();
	
	    // Initialize FullCalendar
	    initializeCalendar();
	
	    // Get availability through Timekit SDK
	    timekitFindTime();
	
	    // Show timezone helper if enabled
	    if (config.localization.showTimezoneHelper) {
	      renderTimezoneHelper();
	    }
	
	    // Show image avatar if set
	    if (config.avatar) {
	      renderAvatarImage();
	    }
	
	    // Print out display name
	    if (config.name) {
	      renderDisplayName();
	    }
	
	    utils.doCallback('renderCompleted', config);
	
	    return this;
	
	  };
	
	  // Initilization method
	  var init = function(suppliedConfig) {
	
	    // Handle config and defaults
	    setConfig(suppliedConfig);
	
	    // Include library styles if enabled
	    if (config.includeStyles) {
	      includeStyles();
	    }
	
	    return render();
	
	  };
	
	  var destroy = function() {
	
	    prepareDOM();
	    config = {};
	    return this;
	
	  };
	
	  // The fullCalendar object for advanced puppeting
	  var fullCalendar = function() {
	
	    if (calendarTarget.fullCalendar === undefined) { return undefined; }
	    return calendarTarget.fullCalendar.apply(calendarTarget, arguments);
	
	  };
	
	  // Expose methods
	  return {
	    setConfig: setConfig,
	    getConfig: getConfig,
	    render:    render,
	    init:      init,
	    destroy:   destroy,
	    fullCalendar: fullCalendar
	  };
	
	}
	
	// Autoload if config is available on window, else export function
	if (window && window.timekitBookingConfig && window.timekitBookingConfig.autoload !== false) {
	  $(window).load(function(){
	    var instance = new TimekitBooking();
	    instance.init(window.timekitBookingConfig);
	    module.exports = instance;
	  });
	} else {
	  module.exports = TimekitBooking;
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * FullCalendar v2.4.0
	 * Docs & License: http://fullcalendar.io/
	 * (c) 2015 Adam Shaw
	 */
	
	(function(factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(1), __webpack_require__(3) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}
		else if (typeof exports === 'object') { // Node/CommonJS
			module.exports = factory(require('jquery'), require('moment'));
		}
		else {
			factory(jQuery, moment);
		}
	})(function($, moment) {
	
	;;
	
	var fc = $.fullCalendar = { version: "2.4.0" };
	var fcViews = fc.views = {};
	
	
	$.fn.fullCalendar = function(options) {
		var args = Array.prototype.slice.call(arguments, 1); // for a possible method call
		var res = this; // what this function will return (this jQuery object by default)
	
		this.each(function(i, _element) { // loop each DOM element involved
			var element = $(_element);
			var calendar = element.data('fullCalendar'); // get the existing calendar object (if any)
			var singleRes; // the returned value of this single method call
	
			// a method call
			if (typeof options === 'string') {
				if (calendar && $.isFunction(calendar[options])) {
					singleRes = calendar[options].apply(calendar, args);
					if (!i) {
						res = singleRes; // record the first method call result
					}
					if (options === 'destroy') { // for the destroy method, must remove Calendar object data
						element.removeData('fullCalendar');
					}
				}
			}
			// a new calendar initialization
			else if (!calendar) { // don't initialize twice
				calendar = new Calendar(element, options);
				element.data('fullCalendar', calendar);
				calendar.render();
			}
		});
		
		return res;
	};
	
	
	var complexOptions = [ // names of options that are objects whose properties should be combined
		'header',
		'buttonText',
		'buttonIcons',
		'themeButtonIcons'
	];
	
	
	// Merges an array of option objects into a single object
	function mergeOptions(optionObjs) {
		return mergeProps(optionObjs, complexOptions);
	}
	
	
	// Given options specified for the calendar's constructor, massages any legacy options into a non-legacy form.
	// Converts View-Option-Hashes into the View-Specific-Options format.
	function massageOverrides(input) {
		var overrides = { views: input.views || {} }; // the output. ensure a `views` hash
		var subObj;
	
		// iterate through all option override properties (except `views`)
		$.each(input, function(name, val) {
			if (name != 'views') {
	
				// could the value be a legacy View-Option-Hash?
				if (
					$.isPlainObject(val) &&
					!/(time|duration|interval)$/i.test(name) && // exclude duration options. might be given as objects
					$.inArray(name, complexOptions) == -1 // complex options aren't allowed to be View-Option-Hashes
				) {
					subObj = null;
	
					// iterate through the properties of this possible View-Option-Hash value
					$.each(val, function(subName, subVal) {
	
						// is the property targeting a view?
						if (/^(month|week|day|default|basic(Week|Day)?|agenda(Week|Day)?)$/.test(subName)) {
							if (!overrides.views[subName]) { // ensure the view-target entry exists
								overrides.views[subName] = {};
							}
							overrides.views[subName][name] = subVal; // record the value in the `views` object
						}
						else { // a non-View-Option-Hash property
							if (!subObj) {
								subObj = {};
							}
							subObj[subName] = subVal; // accumulate these unrelated values for later
						}
					});
	
					if (subObj) { // non-View-Option-Hash properties? transfer them as-is
						overrides[name] = subObj;
					}
				}
				else {
					overrides[name] = val; // transfer normal options as-is
				}
			}
		});
	
		return overrides;
	}
	
	;;
	
	// exports
	fc.intersectionToSeg = intersectionToSeg;
	fc.applyAll = applyAll;
	fc.debounce = debounce;
	fc.isInt = isInt;
	fc.htmlEscape = htmlEscape;
	fc.cssToStr = cssToStr;
	fc.proxy = proxy;
	fc.capitaliseFirstLetter = capitaliseFirstLetter;
	
	
	/* FullCalendar-specific DOM Utilities
	----------------------------------------------------------------------------------------------------------------------*/
	
	
	// Given the scrollbar widths of some other container, create borders/margins on rowEls in order to match the left
	// and right space that was offset by the scrollbars. A 1-pixel border first, then margin beyond that.
	function compensateScroll(rowEls, scrollbarWidths) {
		if (scrollbarWidths.left) {
			rowEls.css({
				'border-left-width': 1,
				'margin-left': scrollbarWidths.left - 1
			});
		}
		if (scrollbarWidths.right) {
			rowEls.css({
				'border-right-width': 1,
				'margin-right': scrollbarWidths.right - 1
			});
		}
	}
	
	
	// Undoes compensateScroll and restores all borders/margins
	function uncompensateScroll(rowEls) {
		rowEls.css({
			'margin-left': '',
			'margin-right': '',
			'border-left-width': '',
			'border-right-width': ''
		});
	}
	
	
	// Make the mouse cursor express that an event is not allowed in the current area
	function disableCursor() {
		$('body').addClass('fc-not-allowed');
	}
	
	
	// Returns the mouse cursor to its original look
	function enableCursor() {
		$('body').removeClass('fc-not-allowed');
	}
	
	
	// Given a total available height to fill, have `els` (essentially child rows) expand to accomodate.
	// By default, all elements that are shorter than the recommended height are expanded uniformly, not considering
	// any other els that are already too tall. if `shouldRedistribute` is on, it considers these tall rows and 
	// reduces the available height.
	function distributeHeight(els, availableHeight, shouldRedistribute) {
	
		// *FLOORING NOTE*: we floor in certain places because zoom can give inaccurate floating-point dimensions,
		// and it is better to be shorter than taller, to avoid creating unnecessary scrollbars.
	
		var minOffset1 = Math.floor(availableHeight / els.length); // for non-last element
		var minOffset2 = Math.floor(availableHeight - minOffset1 * (els.length - 1)); // for last element *FLOORING NOTE*
		var flexEls = []; // elements that are allowed to expand. array of DOM nodes
		var flexOffsets = []; // amount of vertical space it takes up
		var flexHeights = []; // actual css height
		var usedHeight = 0;
	
		undistributeHeight(els); // give all elements their natural height
	
		// find elements that are below the recommended height (expandable).
		// important to query for heights in a single first pass (to avoid reflow oscillation).
		els.each(function(i, el) {
			var minOffset = i === els.length - 1 ? minOffset2 : minOffset1;
			var naturalOffset = $(el).outerHeight(true);
	
			if (naturalOffset < minOffset) {
				flexEls.push(el);
				flexOffsets.push(naturalOffset);
				flexHeights.push($(el).height());
			}
			else {
				// this element stretches past recommended height (non-expandable). mark the space as occupied.
				usedHeight += naturalOffset;
			}
		});
	
		// readjust the recommended height to only consider the height available to non-maxed-out rows.
		if (shouldRedistribute) {
			availableHeight -= usedHeight;
			minOffset1 = Math.floor(availableHeight / flexEls.length);
			minOffset2 = Math.floor(availableHeight - minOffset1 * (flexEls.length - 1)); // *FLOORING NOTE*
		}
	
		// assign heights to all expandable elements
		$(flexEls).each(function(i, el) {
			var minOffset = i === flexEls.length - 1 ? minOffset2 : minOffset1;
			var naturalOffset = flexOffsets[i];
			var naturalHeight = flexHeights[i];
			var newHeight = minOffset - (naturalOffset - naturalHeight); // subtract the margin/padding
	
			if (naturalOffset < minOffset) { // we check this again because redistribution might have changed things
				$(el).height(newHeight);
			}
		});
	}
	
	
	// Undoes distrubuteHeight, restoring all els to their natural height
	function undistributeHeight(els) {
		els.height('');
	}
	
	
	// Given `els`, a jQuery set of <td> cells, find the cell with the largest natural width and set the widths of all the
	// cells to be that width.
	// PREREQUISITE: if you want a cell to take up width, it needs to have a single inner element w/ display:inline
	function matchCellWidths(els) {
		var maxInnerWidth = 0;
	
		els.find('> *').each(function(i, innerEl) {
			var innerWidth = $(innerEl).outerWidth();
			if (innerWidth > maxInnerWidth) {
				maxInnerWidth = innerWidth;
			}
		});
	
		maxInnerWidth++; // sometimes not accurate of width the text needs to stay on one line. insurance
	
		els.width(maxInnerWidth);
	
		return maxInnerWidth;
	}
	
	
	// Turns a container element into a scroller if its contents is taller than the allotted height.
	// Returns true if the element is now a scroller, false otherwise.
	// NOTE: this method is best because it takes weird zooming dimensions into account
	function setPotentialScroller(containerEl, height) {
		containerEl.height(height).addClass('fc-scroller');
	
		// are scrollbars needed?
		if (containerEl[0].scrollHeight - 1 > containerEl[0].clientHeight) { // !!! -1 because IE is often off-by-one :(
			return true;
		}
	
		unsetScroller(containerEl); // undo
		return false;
	}
	
	
	// Takes an element that might have been a scroller, and turns it back into a normal element.
	function unsetScroller(containerEl) {
		containerEl.height('').removeClass('fc-scroller');
	}
	
	
	/* General DOM Utilities
	----------------------------------------------------------------------------------------------------------------------*/
	
	fc.getClientRect = getClientRect;
	fc.getContentRect = getContentRect;
	fc.getScrollbarWidths = getScrollbarWidths;
	
	
	// borrowed from https://github.com/jquery/jquery-ui/blob/1.11.0/ui/core.js#L51
	function getScrollParent(el) {
		var position = el.css('position'),
			scrollParent = el.parents().filter(function() {
				var parent = $(this);
				return (/(auto|scroll)/).test(
					parent.css('overflow') + parent.css('overflow-y') + parent.css('overflow-x')
				);
			}).eq(0);
	
		return position === 'fixed' || !scrollParent.length ? $(el[0].ownerDocument || document) : scrollParent;
	}
	
	
	// Queries the outer bounding area of a jQuery element.
	// Returns a rectangle with absolute coordinates: left, right (exclusive), top, bottom (exclusive).
	function getOuterRect(el) {
		var offset = el.offset();
	
		return {
			left: offset.left,
			right: offset.left + el.outerWidth(),
			top: offset.top,
			bottom: offset.top + el.outerHeight()
		};
	}
	
	
	// Queries the area within the margin/border/scrollbars of a jQuery element. Does not go within the padding.
	// Returns a rectangle with absolute coordinates: left, right (exclusive), top, bottom (exclusive).
	// NOTE: should use clientLeft/clientTop, but very unreliable cross-browser.
	function getClientRect(el) {
		var offset = el.offset();
		var scrollbarWidths = getScrollbarWidths(el);
		var left = offset.left + getCssFloat(el, 'border-left-width') + scrollbarWidths.left;
		var top = offset.top + getCssFloat(el, 'border-top-width') + scrollbarWidths.top;
	
		return {
			left: left,
			right: left + el[0].clientWidth, // clientWidth includes padding but NOT scrollbars
			top: top,
			bottom: top + el[0].clientHeight // clientHeight includes padding but NOT scrollbars
		};
	}
	
	
	// Queries the area within the margin/border/padding of a jQuery element. Assumed not to have scrollbars.
	// Returns a rectangle with absolute coordinates: left, right (exclusive), top, bottom (exclusive).
	function getContentRect(el) {
		var offset = el.offset(); // just outside of border, margin not included
		var left = offset.left + getCssFloat(el, 'border-left-width') + getCssFloat(el, 'padding-left');
		var top = offset.top + getCssFloat(el, 'border-top-width') + getCssFloat(el, 'padding-top');
	
		return {
			left: left,
			right: left + el.width(),
			top: top,
			bottom: top + el.height()
		};
	}
	
	
	// Returns the computed left/right/top/bottom scrollbar widths for the given jQuery element.
	// NOTE: should use clientLeft/clientTop, but very unreliable cross-browser.
	function getScrollbarWidths(el) {
		var leftRightWidth = el.innerWidth() - el[0].clientWidth; // the paddings cancel out, leaving the scrollbars
		var widths = {
			left: 0,
			right: 0,
			top: 0,
			bottom: el.innerHeight() - el[0].clientHeight // the paddings cancel out, leaving the bottom scrollbar
		};
	
		if (getIsLeftRtlScrollbars() && el.css('direction') == 'rtl') { // is the scrollbar on the left side?
			widths.left = leftRightWidth;
		}
		else {
			widths.right = leftRightWidth;
		}
	
		return widths;
	}
	
	
	// Logic for determining if, when the element is right-to-left, the scrollbar appears on the left side
	
	var _isLeftRtlScrollbars = null;
	
	function getIsLeftRtlScrollbars() { // responsible for caching the computation
		if (_isLeftRtlScrollbars === null) {
			_isLeftRtlScrollbars = computeIsLeftRtlScrollbars();
		}
		return _isLeftRtlScrollbars;
	}
	
	function computeIsLeftRtlScrollbars() { // creates an offscreen test element, then removes it
		var el = $('<div><div/></div>')
			.css({
				position: 'absolute',
				top: -1000,
				left: 0,
				border: 0,
				padding: 0,
				overflow: 'scroll',
				direction: 'rtl'
			})
			.appendTo('body');
		var innerEl = el.children();
		var res = innerEl.offset().left > el.offset().left; // is the inner div shifted to accommodate a left scrollbar?
		el.remove();
		return res;
	}
	
	
	// Retrieves a jQuery element's computed CSS value as a floating-point number.
	// If the queried value is non-numeric (ex: IE can return "medium" for border width), will just return zero.
	function getCssFloat(el, prop) {
		return parseFloat(el.css(prop)) || 0;
	}
	
	
	// Returns a boolean whether this was a left mouse click and no ctrl key (which means right click on Mac)
	function isPrimaryMouseButton(ev) {
		return ev.which == 1 && !ev.ctrlKey;
	}
	
	
	/* Geometry
	----------------------------------------------------------------------------------------------------------------------*/
	
	fc.intersectRects = intersectRects;
	
	// Returns a new rectangle that is the intersection of the two rectangles. If they don't intersect, returns false
	function intersectRects(rect1, rect2) {
		var res = {
			left: Math.max(rect1.left, rect2.left),
			right: Math.min(rect1.right, rect2.right),
			top: Math.max(rect1.top, rect2.top),
			bottom: Math.min(rect1.bottom, rect2.bottom)
		};
	
		if (res.left < res.right && res.top < res.bottom) {
			return res;
		}
		return false;
	}
	
	
	// Returns a new point that will have been moved to reside within the given rectangle
	function constrainPoint(point, rect) {
		return {
			left: Math.min(Math.max(point.left, rect.left), rect.right),
			top: Math.min(Math.max(point.top, rect.top), rect.bottom)
		};
	}
	
	
	// Returns a point that is the center of the given rectangle
	function getRectCenter(rect) {
		return {
			left: (rect.left + rect.right) / 2,
			top: (rect.top + rect.bottom) / 2
		};
	}
	
	
	// Subtracts point2's coordinates from point1's coordinates, returning a delta
	function diffPoints(point1, point2) {
		return {
			left: point1.left - point2.left,
			top: point1.top - point2.top
		};
	}
	
	
	/* Object Ordering by Field
	----------------------------------------------------------------------------------------------------------------------*/
	
	fc.parseFieldSpecs = parseFieldSpecs;
	fc.compareByFieldSpecs = compareByFieldSpecs;
	fc.compareByFieldSpec = compareByFieldSpec;
	fc.flexibleCompare = flexibleCompare;
	
	
	function parseFieldSpecs(input) {
		var specs = [];
		var tokens = [];
		var i, token;
	
		if (typeof input === 'string') {
			tokens = input.split(/\s*,\s*/);
		}
		else if (typeof input === 'function') {
			tokens = [ input ];
		}
		else if ($.isArray(input)) {
			tokens = input;
		}
	
		for (i = 0; i < tokens.length; i++) {
			token = tokens[i];
	
			if (typeof token === 'string') {
				specs.push(
					token.charAt(0) == '-' ?
						{ field: token.substring(1), order: -1 } :
						{ field: token, order: 1 }
				);
			}
			else if (typeof token === 'function') {
				specs.push({ func: token });
			}
		}
	
		return specs;
	}
	
	
	function compareByFieldSpecs(obj1, obj2, fieldSpecs) {
		var i;
		var cmp;
	
		for (i = 0; i < fieldSpecs.length; i++) {
			cmp = compareByFieldSpec(obj1, obj2, fieldSpecs[i]);
			if (cmp) {
				return cmp;
			}
		}
	
		return 0;
	}
	
	
	function compareByFieldSpec(obj1, obj2, fieldSpec) {
		if (fieldSpec.func) {
			return fieldSpec.func(obj1, obj2);
		}
		return flexibleCompare(obj1[fieldSpec.field], obj2[fieldSpec.field]) *
			(fieldSpec.order || 1);
	}
	
	
	function flexibleCompare(a, b) {
		if (!a && !b) {
			return 0;
		}
		if (b == null) {
			return -1;
		}
		if (a == null) {
			return 1;
		}
		if ($.type(a) === 'string' || $.type(b) === 'string') {
			return String(a).localeCompare(String(b));
		}
		return a - b;
	}
	
	
	/* FullCalendar-specific Misc Utilities
	----------------------------------------------------------------------------------------------------------------------*/
	
	
	// Creates a basic segment with the intersection of the two ranges. Returns undefined if no intersection.
	// Expects all dates to be normalized to the same timezone beforehand.
	// TODO: move to date section?
	function intersectionToSeg(subjectRange, constraintRange) {
		var subjectStart = subjectRange.start;
		var subjectEnd = subjectRange.end;
		var constraintStart = constraintRange.start;
		var constraintEnd = constraintRange.end;
		var segStart, segEnd;
		var isStart, isEnd;
	
		if (subjectEnd > constraintStart && subjectStart < constraintEnd) { // in bounds at all?
	
			if (subjectStart >= constraintStart) {
				segStart = subjectStart.clone();
				isStart = true;
			}
			else {
				segStart = constraintStart.clone();
				isStart =  false;
			}
	
			if (subjectEnd <= constraintEnd) {
				segEnd = subjectEnd.clone();
				isEnd = true;
			}
			else {
				segEnd = constraintEnd.clone();
				isEnd = false;
			}
	
			return {
				start: segStart,
				end: segEnd,
				isStart: isStart,
				isEnd: isEnd
			};
		}
	}
	
	
	/* Date Utilities
	----------------------------------------------------------------------------------------------------------------------*/
	
	fc.computeIntervalUnit = computeIntervalUnit;
	fc.divideRangeByDuration = divideRangeByDuration;
	fc.divideDurationByDuration = divideDurationByDuration;
	fc.multiplyDuration = multiplyDuration;
	fc.durationHasTime = durationHasTime;
	
	var dayIDs = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];
	var intervalUnits = [ 'year', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond' ];
	
	
	// Diffs the two moments into a Duration where full-days are recorded first, then the remaining time.
	// Moments will have their timezones normalized.
	function diffDayTime(a, b) {
		return moment.duration({
			days: a.clone().stripTime().diff(b.clone().stripTime(), 'days'),
			ms: a.time() - b.time() // time-of-day from day start. disregards timezone
		});
	}
	
	
	// Diffs the two moments via their start-of-day (regardless of timezone). Produces whole-day durations.
	function diffDay(a, b) {
		return moment.duration({
			days: a.clone().stripTime().diff(b.clone().stripTime(), 'days')
		});
	}
	
	
	// Diffs two moments, producing a duration, made of a whole-unit-increment of the given unit. Uses rounding.
	function diffByUnit(a, b, unit) {
		return moment.duration(
			Math.round(a.diff(b, unit, true)), // returnFloat=true
			unit
		);
	}
	
	
	// Computes the unit name of the largest whole-unit period of time.
	// For example, 48 hours will be "days" whereas 49 hours will be "hours".
	// Accepts start/end, a range object, or an original duration object.
	function computeIntervalUnit(start, end) {
		var i, unit;
		var val;
	
		for (i = 0; i < intervalUnits.length; i++) {
			unit = intervalUnits[i];
			val = computeRangeAs(unit, start, end);
	
			if (val >= 1 && isInt(val)) {
				break;
			}
		}
	
		return unit; // will be "milliseconds" if nothing else matches
	}
	
	
	// Computes the number of units (like "hours") in the given range.
	// Range can be a {start,end} object, separate start/end args, or a Duration.
	// Results are based on Moment's .as() and .diff() methods, so results can depend on internal handling
	// of month-diffing logic (which tends to vary from version to version).
	function computeRangeAs(unit, start, end) {
	
		if (end != null) { // given start, end
			return end.diff(start, unit, true);
		}
		else if (moment.isDuration(start)) { // given duration
			return start.as(unit);
		}
		else { // given { start, end } range object
			return start.end.diff(start.start, unit, true);
		}
	}
	
	
	// Intelligently divides a range (specified by a start/end params) by a duration
	function divideRangeByDuration(start, end, dur) {
		var months;
	
		if (durationHasTime(dur)) {
			return (end - start) / dur;
		}
		months = dur.asMonths();
		if (Math.abs(months) >= 1 && isInt(months)) {
			return end.diff(start, 'months', true) / months;
		}
		return end.diff(start, 'days', true) / dur.asDays();
	}
	
	
	// Intelligently divides one duration by another
	function divideDurationByDuration(dur1, dur2) {
		var months1, months2;
	
		if (durationHasTime(dur1) || durationHasTime(dur2)) {
			return dur1 / dur2;
		}
		months1 = dur1.asMonths();
		months2 = dur2.asMonths();
		if (
			Math.abs(months1) >= 1 && isInt(months1) &&
			Math.abs(months2) >= 1 && isInt(months2)
		) {
			return months1 / months2;
		}
		return dur1.asDays() / dur2.asDays();
	}
	
	
	// Intelligently multiplies a duration by a number
	function multiplyDuration(dur, n) {
		var months;
	
		if (durationHasTime(dur)) {
			return moment.duration(dur * n);
		}
		months = dur.asMonths();
		if (Math.abs(months) >= 1 && isInt(months)) {
			return moment.duration({ months: months * n });
		}
		return moment.duration({ days: dur.asDays() * n });
	}
	
	
	// Returns a boolean about whether the given duration has any time parts (hours/minutes/seconds/ms)
	function durationHasTime(dur) {
		return Boolean(dur.hours() || dur.minutes() || dur.seconds() || dur.milliseconds());
	}
	
	
	function isNativeDate(input) {
		return  Object.prototype.toString.call(input) === '[object Date]' || input instanceof Date;
	}
	
	
	// Returns a boolean about whether the given input is a time string, like "06:40:00" or "06:00"
	function isTimeString(str) {
		return /^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(str);
	}
	
	
	/* Logging and Debug
	----------------------------------------------------------------------------------------------------------------------*/
	
	fc.log = function() {
		var console = window.console;
	
		if (console && console.log) {
			return console.log.apply(console, arguments);
		}
	};
	
	fc.warn = function() {
		var console = window.console;
	
		if (console && console.warn) {
			return console.warn.apply(console, arguments);
		}
		else {
			return fc.log.apply(fc, arguments);
		}
	};
	
	
	/* General Utilities
	----------------------------------------------------------------------------------------------------------------------*/
	
	var hasOwnPropMethod = {}.hasOwnProperty;
	
	
	// Merges an array of objects into a single object.
	// The second argument allows for an array of property names who's object values will be merged together.
	function mergeProps(propObjs, complexProps) {
		var dest = {};
		var i, name;
		var complexObjs;
		var j, val;
		var props;
	
		if (complexProps) {
			for (i = 0; i < complexProps.length; i++) {
				name = complexProps[i];
				complexObjs = [];
	
				// collect the trailing object values, stopping when a non-object is discovered
				for (j = propObjs.length - 1; j >= 0; j--) {
					val = propObjs[j][name];
	
					if (typeof val === 'object') {
						complexObjs.unshift(val);
					}
					else if (val !== undefined) {
						dest[name] = val; // if there were no objects, this value will be used
						break;
					}
				}
	
				// if the trailing values were objects, use the merged value
				if (complexObjs.length) {
					dest[name] = mergeProps(complexObjs);
				}
			}
		}
	
		// copy values into the destination, going from last to first
		for (i = propObjs.length - 1; i >= 0; i--) {
			props = propObjs[i];
	
			for (name in props) {
				if (!(name in dest)) { // if already assigned by previous props or complex props, don't reassign
					dest[name] = props[name];
				}
			}
		}
	
		return dest;
	}
	
	
	// Create an object that has the given prototype. Just like Object.create
	function createObject(proto) {
		var f = function() {};
		f.prototype = proto;
		return new f();
	}
	
	
	function copyOwnProps(src, dest) {
		for (var name in src) {
			if (hasOwnProp(src, name)) {
				dest[name] = src[name];
			}
		}
	}
	
	
	// Copies over certain methods with the same names as Object.prototype methods. Overcomes an IE<=8 bug:
	// https://developer.mozilla.org/en-US/docs/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug
	function copyNativeMethods(src, dest) {
		var names = [ 'constructor', 'toString', 'valueOf' ];
		var i, name;
	
		for (i = 0; i < names.length; i++) {
			name = names[i];
	
			if (src[name] !== Object.prototype[name]) {
				dest[name] = src[name];
			}
		}
	}
	
	
	function hasOwnProp(obj, name) {
		return hasOwnPropMethod.call(obj, name);
	}
	
	
	// Is the given value a non-object non-function value?
	function isAtomic(val) {
		return /undefined|null|boolean|number|string/.test($.type(val));
	}
	
	
	function applyAll(functions, thisObj, args) {
		if ($.isFunction(functions)) {
			functions = [ functions ];
		}
		if (functions) {
			var i;
			var ret;
			for (i=0; i<functions.length; i++) {
				ret = functions[i].apply(thisObj, args) || ret;
			}
			return ret;
		}
	}
	
	
	function firstDefined() {
		for (var i=0; i<arguments.length; i++) {
			if (arguments[i] !== undefined) {
				return arguments[i];
			}
		}
	}
	
	
	function htmlEscape(s) {
		return (s + '').replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/'/g, '&#039;')
			.replace(/"/g, '&quot;')
			.replace(/\n/g, '<br />');
	}
	
	
	function stripHtmlEntities(text) {
		return text.replace(/&.*?;/g, '');
	}
	
	
	// Given a hash of CSS properties, returns a string of CSS.
	// Uses property names as-is (no camel-case conversion). Will not make statements for null/undefined values.
	function cssToStr(cssProps) {
		var statements = [];
	
		$.each(cssProps, function(name, val) {
			if (val != null) {
				statements.push(name + ':' + val);
			}
		});
	
		return statements.join(';');
	}
	
	
	function capitaliseFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
	
	function compareNumbers(a, b) { // for .sort()
		return a - b;
	}
	
	
	function isInt(n) {
		return n % 1 === 0;
	}
	
	
	// Returns a method bound to the given object context.
	// Just like one of the jQuery.proxy signatures, but without the undesired behavior of treating the same method with
	// different contexts as identical when binding/unbinding events.
	function proxy(obj, methodName) {
		var method = obj[methodName];
	
		return function() {
			return method.apply(obj, arguments);
		};
	}
	
	
	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds.
	// https://github.com/jashkenas/underscore/blob/1.6.0/underscore.js#L714
	function debounce(func, wait) {
		var timeoutId;
		var args;
		var context;
		var timestamp; // of most recent call
		var later = function() {
			var last = +new Date() - timestamp;
			if (last < wait && last > 0) {
				timeoutId = setTimeout(later, wait - last);
			}
			else {
				timeoutId = null;
				func.apply(context, args);
				if (!timeoutId) {
					context = args = null;
				}
			}
		};
	
		return function() {
			context = this;
			args = arguments;
			timestamp = +new Date();
			if (!timeoutId) {
				timeoutId = setTimeout(later, wait);
			}
		};
	}
	
	;;
	
	var ambigDateOfMonthRegex = /^\s*\d{4}-\d\d$/;
	var ambigTimeOrZoneRegex =
		/^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/;
	var newMomentProto = moment.fn; // where we will attach our new methods
	var oldMomentProto = $.extend({}, newMomentProto); // copy of original moment methods
	var allowValueOptimization;
	var setUTCValues; // function defined below
	var setLocalValues; // function defined below
	
	
	// Creating
	// -------------------------------------------------------------------------------------------------
	
	// Creates a new moment, similar to the vanilla moment(...) constructor, but with
	// extra features (ambiguous time, enhanced formatting). When given an existing moment,
	// it will function as a clone (and retain the zone of the moment). Anything else will
	// result in a moment in the local zone.
	fc.moment = function() {
		return makeMoment(arguments);
	};
	
	// Sames as fc.moment, but forces the resulting moment to be in the UTC timezone.
	fc.moment.utc = function() {
		var mom = makeMoment(arguments, true);
	
		// Force it into UTC because makeMoment doesn't guarantee it
		// (if given a pre-existing moment for example)
		if (mom.hasTime()) { // don't give ambiguously-timed moments a UTC zone
			mom.utc();
		}
	
		return mom;
	};
	
	// Same as fc.moment, but when given an ISO8601 string, the timezone offset is preserved.
	// ISO8601 strings with no timezone offset will become ambiguously zoned.
	fc.moment.parseZone = function() {
		return makeMoment(arguments, true, true);
	};
	
	// Builds an enhanced moment from args. When given an existing moment, it clones. When given a
	// native Date, or called with no arguments (the current time), the resulting moment will be local.
	// Anything else needs to be "parsed" (a string or an array), and will be affected by:
	//    parseAsUTC - if there is no zone information, should we parse the input in UTC?
	//    parseZone - if there is zone information, should we force the zone of the moment?
	function makeMoment(args, parseAsUTC, parseZone) {
		var input = args[0];
		var isSingleString = args.length == 1 && typeof input === 'string';
		var isAmbigTime;
		var isAmbigZone;
		var ambigMatch;
		var mom;
	
		if (moment.isMoment(input)) {
			mom = moment.apply(null, args); // clone it
			transferAmbigs(input, mom); // the ambig flags weren't transfered with the clone
		}
		else if (isNativeDate(input) || input === undefined) {
			mom = moment.apply(null, args); // will be local
		}
		else { // "parsing" is required
			isAmbigTime = false;
			isAmbigZone = false;
	
			if (isSingleString) {
				if (ambigDateOfMonthRegex.test(input)) {
					// accept strings like '2014-05', but convert to the first of the month
					input += '-01';
					args = [ input ]; // for when we pass it on to moment's constructor
					isAmbigTime = true;
					isAmbigZone = true;
				}
				else if ((ambigMatch = ambigTimeOrZoneRegex.exec(input))) {
					isAmbigTime = !ambigMatch[5]; // no time part?
					isAmbigZone = true;
				}
			}
			else if ($.isArray(input)) {
				// arrays have no timezone information, so assume ambiguous zone
				isAmbigZone = true;
			}
			// otherwise, probably a string with a format
	
			if (parseAsUTC || isAmbigTime) {
				mom = moment.utc.apply(moment, args);
			}
			else {
				mom = moment.apply(null, args);
			}
	
			if (isAmbigTime) {
				mom._ambigTime = true;
				mom._ambigZone = true; // ambiguous time always means ambiguous zone
			}
			else if (parseZone) { // let's record the inputted zone somehow
				if (isAmbigZone) {
					mom._ambigZone = true;
				}
				else if (isSingleString) {
					if (mom.utcOffset) {
						mom.utcOffset(input); // if not a valid zone, will assign UTC
					}
					else {
						mom.zone(input); // for moment-pre-2.9
					}
				}
			}
		}
	
		mom._fullCalendar = true; // flag for extended functionality
	
		return mom;
	}
	
	
	// A clone method that works with the flags related to our enhanced functionality.
	// In the future, use moment.momentProperties
	newMomentProto.clone = function() {
		var mom = oldMomentProto.clone.apply(this, arguments);
	
		// these flags weren't transfered with the clone
		transferAmbigs(this, mom);
		if (this._fullCalendar) {
			mom._fullCalendar = true;
		}
	
		return mom;
	};
	
	
	// Week Number
	// -------------------------------------------------------------------------------------------------
	
	
	// Returns the week number, considering the locale's custom week number calcuation
	// `weeks` is an alias for `week`
	newMomentProto.week = newMomentProto.weeks = function(input) {
		var weekCalc = (this._locale || this._lang) // works pre-moment-2.8
			._fullCalendar_weekCalc;
	
		if (input == null && typeof weekCalc === 'function') { // custom function only works for getter
			return weekCalc(this);
		}
		else if (weekCalc === 'ISO') {
			return oldMomentProto.isoWeek.apply(this, arguments); // ISO getter/setter
		}
	
		return oldMomentProto.week.apply(this, arguments); // local getter/setter
	};
	
	
	// Time-of-day
	// -------------------------------------------------------------------------------------------------
	
	// GETTER
	// Returns a Duration with the hours/minutes/seconds/ms values of the moment.
	// If the moment has an ambiguous time, a duration of 00:00 will be returned.
	//
	// SETTER
	// You can supply a Duration, a Moment, or a Duration-like argument.
	// When setting the time, and the moment has an ambiguous time, it then becomes unambiguous.
	newMomentProto.time = function(time) {
	
		// Fallback to the original method (if there is one) if this moment wasn't created via FullCalendar.
		// `time` is a generic enough method name where this precaution is necessary to avoid collisions w/ other plugins.
		if (!this._fullCalendar) {
			return oldMomentProto.time.apply(this, arguments);
		}
	
		if (time == null) { // getter
			return moment.duration({
				hours: this.hours(),
				minutes: this.minutes(),
				seconds: this.seconds(),
				milliseconds: this.milliseconds()
			});
		}
		else { // setter
	
			this._ambigTime = false; // mark that the moment now has a time
	
			if (!moment.isDuration(time) && !moment.isMoment(time)) {
				time = moment.duration(time);
			}
	
			// The day value should cause overflow (so 24 hours becomes 00:00:00 of next day).
			// Only for Duration times, not Moment times.
			var dayHours = 0;
			if (moment.isDuration(time)) {
				dayHours = Math.floor(time.asDays()) * 24;
			}
	
			// We need to set the individual fields.
			// Can't use startOf('day') then add duration. In case of DST at start of day.
			return this.hours(dayHours + time.hours())
				.minutes(time.minutes())
				.seconds(time.seconds())
				.milliseconds(time.milliseconds());
		}
	};
	
	// Converts the moment to UTC, stripping out its time-of-day and timezone offset,
	// but preserving its YMD. A moment with a stripped time will display no time
	// nor timezone offset when .format() is called.
	newMomentProto.stripTime = function() {
		var a;
	
		if (!this._ambigTime) {
	
			// get the values before any conversion happens
			a = this.toArray(); // array of y/m/d/h/m/s/ms
	
			// TODO: use keepLocalTime in the future
			this.utc(); // set the internal UTC flag (will clear the ambig flags)
			setUTCValues(this, a.slice(0, 3)); // set the year/month/date. time will be zero
	
			// Mark the time as ambiguous. This needs to happen after the .utc() call, which might call .utcOffset(),
			// which clears all ambig flags. Same with setUTCValues with moment-timezone.
			this._ambigTime = true;
			this._ambigZone = true; // if ambiguous time, also ambiguous timezone offset
		}
	
		return this; // for chaining
	};
	
	// Returns if the moment has a non-ambiguous time (boolean)
	newMomentProto.hasTime = function() {
		return !this._ambigTime;
	};
	
	
	// Timezone
	// -------------------------------------------------------------------------------------------------
	
	// Converts the moment to UTC, stripping out its timezone offset, but preserving its
	// YMD and time-of-day. A moment with a stripped timezone offset will display no
	// timezone offset when .format() is called.
	// TODO: look into Moment's keepLocalTime functionality
	newMomentProto.stripZone = function() {
		var a, wasAmbigTime;
	
		if (!this._ambigZone) {
	
			// get the values before any conversion happens
			a = this.toArray(); // array of y/m/d/h/m/s/ms
			wasAmbigTime = this._ambigTime;
	
			this.utc(); // set the internal UTC flag (might clear the ambig flags, depending on Moment internals)
			setUTCValues(this, a); // will set the year/month/date/hours/minutes/seconds/ms
	
			// the above call to .utc()/.utcOffset() unfortunately might clear the ambig flags, so restore
			this._ambigTime = wasAmbigTime || false;
	
			// Mark the zone as ambiguous. This needs to happen after the .utc() call, which might call .utcOffset(),
			// which clears the ambig flags. Same with setUTCValues with moment-timezone.
			this._ambigZone = true;
		}
	
		return this; // for chaining
	};
	
	// Returns of the moment has a non-ambiguous timezone offset (boolean)
	newMomentProto.hasZone = function() {
		return !this._ambigZone;
	};
	
	
	// this method implicitly marks a zone
	newMomentProto.local = function() {
		var a = this.toArray(); // year,month,date,hours,minutes,seconds,ms as an array
		var wasAmbigZone = this._ambigZone;
	
		oldMomentProto.local.apply(this, arguments);
	
		// ensure non-ambiguous
		// this probably already happened via local() -> utcOffset(), but don't rely on Moment's internals
		this._ambigTime = false;
		this._ambigZone = false;
	
		if (wasAmbigZone) {
			// If the moment was ambiguously zoned, the date fields were stored as UTC.
			// We want to preserve these, but in local time.
			// TODO: look into Moment's keepLocalTime functionality
			setLocalValues(this, a);
		}
	
		return this; // for chaining
	};
	
	
	// implicitly marks a zone
	newMomentProto.utc = function() {
		oldMomentProto.utc.apply(this, arguments);
	
		// ensure non-ambiguous
		// this probably already happened via utc() -> utcOffset(), but don't rely on Moment's internals
		this._ambigTime = false;
		this._ambigZone = false;
	
		return this;
	};
	
	
	// methods for arbitrarily manipulating timezone offset.
	// should clear time/zone ambiguity when called.
	$.each([
		'zone', // only in moment-pre-2.9. deprecated afterwards
		'utcOffset'
	], function(i, name) {
		if (oldMomentProto[name]) { // original method exists?
	
			// this method implicitly marks a zone (will probably get called upon .utc() and .local())
			newMomentProto[name] = function(tzo) {
	
				if (tzo != null) { // setter
					// these assignments needs to happen before the original zone method is called.
					// I forget why, something to do with a browser crash.
					this._ambigTime = false;
					this._ambigZone = false;
				}
	
				return oldMomentProto[name].apply(this, arguments);
			};
		}
	});
	
	
	// Formatting
	// -------------------------------------------------------------------------------------------------
	
	newMomentProto.format = function() {
		if (this._fullCalendar && arguments[0]) { // an enhanced moment? and a format string provided?
			return formatDate(this, arguments[0]); // our extended formatting
		}
		if (this._ambigTime) {
			return oldMomentFormat(this, 'YYYY-MM-DD');
		}
		if (this._ambigZone) {
			return oldMomentFormat(this, 'YYYY-MM-DD[T]HH:mm:ss');
		}
		return oldMomentProto.format.apply(this, arguments);
	};
	
	newMomentProto.toISOString = function() {
		if (this._ambigTime) {
			return oldMomentFormat(this, 'YYYY-MM-DD');
		}
		if (this._ambigZone) {
			return oldMomentFormat(this, 'YYYY-MM-DD[T]HH:mm:ss');
		}
		return oldMomentProto.toISOString.apply(this, arguments);
	};
	
	
	// Querying
	// -------------------------------------------------------------------------------------------------
	
	// Is the moment within the specified range? `end` is exclusive.
	// FYI, this method is not a standard Moment method, so always do our enhanced logic.
	newMomentProto.isWithin = function(start, end) {
		var a = commonlyAmbiguate([ this, start, end ]);
		return a[0] >= a[1] && a[0] < a[2];
	};
	
	// When isSame is called with units, timezone ambiguity is normalized before the comparison happens.
	// If no units specified, the two moments must be identically the same, with matching ambig flags.
	newMomentProto.isSame = function(input, units) {
		var a;
	
		// only do custom logic if this is an enhanced moment
		if (!this._fullCalendar) {
			return oldMomentProto.isSame.apply(this, arguments);
		}
	
		if (units) {
			a = commonlyAmbiguate([ this, input ], true); // normalize timezones but don't erase times
			return oldMomentProto.isSame.call(a[0], a[1], units);
		}
		else {
			input = fc.moment.parseZone(input); // normalize input
			return oldMomentProto.isSame.call(this, input) &&
				Boolean(this._ambigTime) === Boolean(input._ambigTime) &&
				Boolean(this._ambigZone) === Boolean(input._ambigZone);
		}
	};
	
	// Make these query methods work with ambiguous moments
	$.each([
		'isBefore',
		'isAfter'
	], function(i, methodName) {
		newMomentProto[methodName] = function(input, units) {
			var a;
	
			// only do custom logic if this is an enhanced moment
			if (!this._fullCalendar) {
				return oldMomentProto[methodName].apply(this, arguments);
			}
	
			a = commonlyAmbiguate([ this, input ]);
			return oldMomentProto[methodName].call(a[0], a[1], units);
		};
	});
	
	
	// Misc Internals
	// -------------------------------------------------------------------------------------------------
	
	// given an array of moment-like inputs, return a parallel array w/ moments similarly ambiguated.
	// for example, of one moment has ambig time, but not others, all moments will have their time stripped.
	// set `preserveTime` to `true` to keep times, but only normalize zone ambiguity.
	// returns the original moments if no modifications are necessary.
	function commonlyAmbiguate(inputs, preserveTime) {
		var anyAmbigTime = false;
		var anyAmbigZone = false;
		var len = inputs.length;
		var moms = [];
		var i, mom;
	
		// parse inputs into real moments and query their ambig flags
		for (i = 0; i < len; i++) {
			mom = inputs[i];
			if (!moment.isMoment(mom)) {
				mom = fc.moment.parseZone(mom);
			}
			anyAmbigTime = anyAmbigTime || mom._ambigTime;
			anyAmbigZone = anyAmbigZone || mom._ambigZone;
			moms.push(mom);
		}
	
		// strip each moment down to lowest common ambiguity
		// use clones to avoid modifying the original moments
		for (i = 0; i < len; i++) {
			mom = moms[i];
			if (!preserveTime && anyAmbigTime && !mom._ambigTime) {
				moms[i] = mom.clone().stripTime();
			}
			else if (anyAmbigZone && !mom._ambigZone) {
				moms[i] = mom.clone().stripZone();
			}
		}
	
		return moms;
	}
	
	// Transfers all the flags related to ambiguous time/zone from the `src` moment to the `dest` moment
	// TODO: look into moment.momentProperties for this.
	function transferAmbigs(src, dest) {
		if (src._ambigTime) {
			dest._ambigTime = true;
		}
		else if (dest._ambigTime) {
			dest._ambigTime = false;
		}
	
		if (src._ambigZone) {
			dest._ambigZone = true;
		}
		else if (dest._ambigZone) {
			dest._ambigZone = false;
		}
	}
	
	
	// Sets the year/month/date/etc values of the moment from the given array.
	// Inefficient because it calls each individual setter.
	function setMomentValues(mom, a) {
		mom.year(a[0] || 0)
			.month(a[1] || 0)
			.date(a[2] || 0)
			.hours(a[3] || 0)
			.minutes(a[4] || 0)
			.seconds(a[5] || 0)
			.milliseconds(a[6] || 0);
	}
	
	// Can we set the moment's internal date directly?
	allowValueOptimization = '_d' in moment() && 'updateOffset' in moment;
	
	// Utility function. Accepts a moment and an array of the UTC year/month/date/etc values to set.
	// Assumes the given moment is already in UTC mode.
	setUTCValues = allowValueOptimization ? function(mom, a) {
		// simlate what moment's accessors do
		mom._d.setTime(Date.UTC.apply(Date, a));
		moment.updateOffset(mom, false); // keepTime=false
	} : setMomentValues;
	
	// Utility function. Accepts a moment and an array of the local year/month/date/etc values to set.
	// Assumes the given moment is already in local mode.
	setLocalValues = allowValueOptimization ? function(mom, a) {
		// simlate what moment's accessors do
		mom._d.setTime(+new Date( // FYI, there is now way to apply an array of args to a constructor
			a[0] || 0,
			a[1] || 0,
			a[2] || 0,
			a[3] || 0,
			a[4] || 0,
			a[5] || 0,
			a[6] || 0
		));
		moment.updateOffset(mom, false); // keepTime=false
	} : setMomentValues;
	
	;;
	
	// Single Date Formatting
	// -------------------------------------------------------------------------------------------------
	
	
	// call this if you want Moment's original format method to be used
	function oldMomentFormat(mom, formatStr) {
		return oldMomentProto.format.call(mom, formatStr); // oldMomentProto defined in moment-ext.js
	}
	
	
	// Formats `date` with a Moment formatting string, but allow our non-zero areas and
	// additional token.
	function formatDate(date, formatStr) {
		return formatDateWithChunks(date, getFormatStringChunks(formatStr));
	}
	
	
	function formatDateWithChunks(date, chunks) {
		var s = '';
		var i;
	
		for (i=0; i<chunks.length; i++) {
			s += formatDateWithChunk(date, chunks[i]);
		}
	
		return s;
	}
	
	
	// addition formatting tokens we want recognized
	var tokenOverrides = {
		t: function(date) { // "a" or "p"
			return oldMomentFormat(date, 'a').charAt(0);
		},
		T: function(date) { // "A" or "P"
			return oldMomentFormat(date, 'A').charAt(0);
		}
	};
	
	
	function formatDateWithChunk(date, chunk) {
		var token;
		var maybeStr;
	
		if (typeof chunk === 'string') { // a literal string
			return chunk;
		}
		else if ((token = chunk.token)) { // a token, like "YYYY"
			if (tokenOverrides[token]) {
				return tokenOverrides[token](date); // use our custom token
			}
			return oldMomentFormat(date, token);
		}
		else if (chunk.maybe) { // a grouping of other chunks that must be non-zero
			maybeStr = formatDateWithChunks(date, chunk.maybe);
			if (maybeStr.match(/[1-9]/)) {
				return maybeStr;
			}
		}
	
		return '';
	}
	
	
	// Date Range Formatting
	// -------------------------------------------------------------------------------------------------
	// TODO: make it work with timezone offset
	
	// Using a formatting string meant for a single date, generate a range string, like
	// "Sep 2 - 9 2013", that intelligently inserts a separator where the dates differ.
	// If the dates are the same as far as the format string is concerned, just return a single
	// rendering of one date, without any separator.
	function formatRange(date1, date2, formatStr, separator, isRTL) {
		var localeData;
	
		date1 = fc.moment.parseZone(date1);
		date2 = fc.moment.parseZone(date2);
	
		localeData = (date1.localeData || date1.lang).call(date1); // works with moment-pre-2.8
	
		// Expand localized format strings, like "LL" -> "MMMM D YYYY"
		formatStr = localeData.longDateFormat(formatStr) || formatStr;
		// BTW, this is not important for `formatDate` because it is impossible to put custom tokens
		// or non-zero areas in Moment's localized format strings.
	
		separator = separator || ' - ';
	
		return formatRangeWithChunks(
			date1,
			date2,
			getFormatStringChunks(formatStr),
			separator,
			isRTL
		);
	}
	fc.formatRange = formatRange; // expose
	
	
	function formatRangeWithChunks(date1, date2, chunks, separator, isRTL) {
		var chunkStr; // the rendering of the chunk
		var leftI;
		var leftStr = '';
		var rightI;
		var rightStr = '';
		var middleI;
		var middleStr1 = '';
		var middleStr2 = '';
		var middleStr = '';
	
		// Start at the leftmost side of the formatting string and continue until you hit a token
		// that is not the same between dates.
		for (leftI=0; leftI<chunks.length; leftI++) {
			chunkStr = formatSimilarChunk(date1, date2, chunks[leftI]);
			if (chunkStr === false) {
				break;
			}
			leftStr += chunkStr;
		}
	
		// Similarly, start at the rightmost side of the formatting string and move left
		for (rightI=chunks.length-1; rightI>leftI; rightI--) {
			chunkStr = formatSimilarChunk(date1, date2, chunks[rightI]);
			if (chunkStr === false) {
				break;
			}
			rightStr = chunkStr + rightStr;
		}
	
		// The area in the middle is different for both of the dates.
		// Collect them distinctly so we can jam them together later.
		for (middleI=leftI; middleI<=rightI; middleI++) {
			middleStr1 += formatDateWithChunk(date1, chunks[middleI]);
			middleStr2 += formatDateWithChunk(date2, chunks[middleI]);
		}
	
		if (middleStr1 || middleStr2) {
			if (isRTL) {
				middleStr = middleStr2 + separator + middleStr1;
			}
			else {
				middleStr = middleStr1 + separator + middleStr2;
			}
		}
	
		return leftStr + middleStr + rightStr;
	}
	
	
	var similarUnitMap = {
		Y: 'year',
		M: 'month',
		D: 'day', // day of month
		d: 'day', // day of week
		// prevents a separator between anything time-related...
		A: 'second', // AM/PM
		a: 'second', // am/pm
		T: 'second', // A/P
		t: 'second', // a/p
		H: 'second', // hour (24)
		h: 'second', // hour (12)
		m: 'second', // minute
		s: 'second' // second
	};
	// TODO: week maybe?
	
	
	// Given a formatting chunk, and given that both dates are similar in the regard the
	// formatting chunk is concerned, format date1 against `chunk`. Otherwise, return `false`.
	function formatSimilarChunk(date1, date2, chunk) {
		var token;
		var unit;
	
		if (typeof chunk === 'string') { // a literal string
			return chunk;
		}
		else if ((token = chunk.token)) {
			unit = similarUnitMap[token.charAt(0)];
			// are the dates the same for this unit of measurement?
			if (unit && date1.isSame(date2, unit)) {
				return oldMomentFormat(date1, token); // would be the same if we used `date2`
				// BTW, don't support custom tokens
			}
		}
	
		return false; // the chunk is NOT the same for the two dates
		// BTW, don't support splitting on non-zero areas
	}
	
	
	// Chunking Utils
	// -------------------------------------------------------------------------------------------------
	
	
	var formatStringChunkCache = {};
	
	
	function getFormatStringChunks(formatStr) {
		if (formatStr in formatStringChunkCache) {
			return formatStringChunkCache[formatStr];
		}
		return (formatStringChunkCache[formatStr] = chunkFormatString(formatStr));
	}
	
	
	// Break the formatting string into an array of chunks
	function chunkFormatString(formatStr) {
		var chunks = [];
		var chunker = /\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g; // TODO: more descrimination
		var match;
	
		while ((match = chunker.exec(formatStr))) {
			if (match[1]) { // a literal string inside [ ... ]
				chunks.push(match[1]);
			}
			else if (match[2]) { // non-zero formatting inside ( ... )
				chunks.push({ maybe: chunkFormatString(match[2]) });
			}
			else if (match[3]) { // a formatting token
				chunks.push({ token: match[3] });
			}
			else if (match[5]) { // an unenclosed literal string
				chunks.push(match[5]);
			}
		}
	
		return chunks;
	}
	
	;;
	
	fc.Class = Class; // export
	
	// class that all other classes will inherit from
	function Class() { }
	
	// called upon a class to create a subclass
	Class.extend = function(members) {
		var superClass = this;
		var subClass;
	
		members = members || {};
	
		// ensure a constructor for the subclass, forwarding all arguments to the super-constructor if it doesn't exist
		if (hasOwnProp(members, 'constructor')) {
			subClass = members.constructor;
		}
		if (typeof subClass !== 'function') {
			subClass = members.constructor = function() {
				superClass.apply(this, arguments);
			};
		}
	
		// build the base prototype for the subclass, which is an new object chained to the superclass's prototype
		subClass.prototype = createObject(superClass.prototype);
	
		// copy each member variable/method onto the the subclass's prototype
		copyOwnProps(members, subClass.prototype);
		copyNativeMethods(members, subClass.prototype); // hack for IE8
	
		// copy over all class variables/methods to the subclass, such as `extend` and `mixin`
		copyOwnProps(superClass, subClass);
	
		return subClass;
	};
	
	// adds new member variables/methods to the class's prototype.
	// can be called with another class, or a plain object hash containing new members.
	Class.mixin = function(members) {
		copyOwnProps(members.prototype || members, this.prototype); // TODO: copyNativeMethods?
	};
	;;
	
	var Emitter = fc.Emitter = Class.extend({
	
		callbackHash: null,
	
	
		on: function(name, callback) {
			this.getCallbacks(name).add(callback);
			return this; // for chaining
		},
	
	
		off: function(name, callback) {
			this.getCallbacks(name).remove(callback);
			return this; // for chaining
		},
	
	
		trigger: function(name) { // args...
			var args = Array.prototype.slice.call(arguments, 1);
	
			this.triggerWith(name, this, args);
	
			return this; // for chaining
		},
	
	
		triggerWith: function(name, context, args) {
			var callbacks = this.getCallbacks(name);
	
			callbacks.fireWith(context, args);
	
			return this; // for chaining
		},
	
	
		getCallbacks: function(name) {
			var callbacks;
	
			if (!this.callbackHash) {
				this.callbackHash = {};
			}
	
			callbacks = this.callbackHash[name];
			if (!callbacks) {
				callbacks = this.callbackHash[name] = $.Callbacks();
			}
	
			return callbacks;
		}
	
	});
	;;
	
	/* A rectangular panel that is absolutely positioned over other content
	------------------------------------------------------------------------------------------------------------------------
	Options:
		- className (string)
		- content (HTML string or jQuery element set)
		- parentEl
		- top
		- left
		- right (the x coord of where the right edge should be. not a "CSS" right)
		- autoHide (boolean)
		- show (callback)
		- hide (callback)
	*/
	
	var Popover = Class.extend({
	
		isHidden: true,
		options: null,
		el: null, // the container element for the popover. generated by this object
		documentMousedownProxy: null, // document mousedown handler bound to `this`
		margin: 10, // the space required between the popover and the edges of the scroll container
	
	
		constructor: function(options) {
			this.options = options || {};
		},
	
	
		// Shows the popover on the specified position. Renders it if not already
		show: function() {
			if (this.isHidden) {
				if (!this.el) {
					this.render();
				}
				this.el.show();
				this.position();
				this.isHidden = false;
				this.trigger('show');
			}
		},
	
	
		// Hides the popover, through CSS, but does not remove it from the DOM
		hide: function() {
			if (!this.isHidden) {
				this.el.hide();
				this.isHidden = true;
				this.trigger('hide');
			}
		},
	
	
		// Creates `this.el` and renders content inside of it
		render: function() {
			var _this = this;
			var options = this.options;
	
			this.el = $('<div class="fc-popover"/>')
				.addClass(options.className || '')
				.css({
					// position initially to the top left to avoid creating scrollbars
					top: 0,
					left: 0
				})
				.append(options.content)
				.appendTo(options.parentEl);
	
			// when a click happens on anything inside with a 'fc-close' className, hide the popover
			this.el.on('click', '.fc-close', function() {
				_this.hide();
			});
	
			if (options.autoHide) {
				$(document).on('mousedown', this.documentMousedownProxy = proxy(this, 'documentMousedown'));
			}
		},
	
	
		// Triggered when the user clicks *anywhere* in the document, for the autoHide feature
		documentMousedown: function(ev) {
			// only hide the popover if the click happened outside the popover
			if (this.el && !$(ev.target).closest(this.el).length) {
				this.hide();
			}
		},
	
	
		// Hides and unregisters any handlers
		removeElement: function() {
			this.hide();
	
			if (this.el) {
				this.el.remove();
				this.el = null;
			}
	
			$(document).off('mousedown', this.documentMousedownProxy);
		},
	
	
		// Positions the popover optimally, using the top/left/right options
		position: function() {
			var options = this.options;
			var origin = this.el.offsetParent().offset();
			var width = this.el.outerWidth();
			var height = this.el.outerHeight();
			var windowEl = $(window);
			var viewportEl = getScrollParent(this.el);
			var viewportTop;
			var viewportLeft;
			var viewportOffset;
			var top; // the "position" (not "offset") values for the popover
			var left; //
	
			// compute top and left
			top = options.top || 0;
			if (options.left !== undefined) {
				left = options.left;
			}
			else if (options.right !== undefined) {
				left = options.right - width; // derive the left value from the right value
			}
			else {
				left = 0;
			}
	
			if (viewportEl.is(window) || viewportEl.is(document)) { // normalize getScrollParent's result
				viewportEl = windowEl;
				viewportTop = 0; // the window is always at the top left
				viewportLeft = 0; // (and .offset() won't work if called here)
			}
			else {
				viewportOffset = viewportEl.offset();
				viewportTop = viewportOffset.top;
				viewportLeft = viewportOffset.left;
			}
	
			// if the window is scrolled, it causes the visible area to be further down
			viewportTop += windowEl.scrollTop();
			viewportLeft += windowEl.scrollLeft();
	
			// constrain to the view port. if constrained by two edges, give precedence to top/left
			if (options.viewportConstrain !== false) {
				top = Math.min(top, viewportTop + viewportEl.outerHeight() - height - this.margin);
				top = Math.max(top, viewportTop + this.margin);
				left = Math.min(left, viewportLeft + viewportEl.outerWidth() - width - this.margin);
				left = Math.max(left, viewportLeft + this.margin);
			}
	
			this.el.css({
				top: top - origin.top,
				left: left - origin.left
			});
		},
	
	
		// Triggers a callback. Calls a function in the option hash of the same name.
		// Arguments beyond the first `name` are forwarded on.
		// TODO: better code reuse for this. Repeat code
		trigger: function(name) {
			if (this.options[name]) {
				this.options[name].apply(this, Array.prototype.slice.call(arguments, 1));
			}
		}
	
	});
	
	;;
	
	/* A "coordinate map" converts pixel coordinates into an associated cell, which has an associated date
	------------------------------------------------------------------------------------------------------------------------
	Common interface:
	
		CoordMap.prototype = {
			build: function() {},
			getCell: function(x, y) {}
		};
	
	*/
	
	/* Coordinate map for a grid component
	----------------------------------------------------------------------------------------------------------------------*/
	
	var GridCoordMap = Class.extend({
	
		grid: null, // reference to the Grid
		rowCoords: null, // array of {top,bottom} objects
		colCoords: null, // array of {left,right} objects
	
		containerEl: null, // container element that all coordinates are constrained to. optionally assigned
		bounds: null,
	
	
		constructor: function(grid) {
			this.grid = grid;
		},
	
	
		// Queries the grid for the coordinates of all the cells
		build: function() {
			this.grid.build();
			this.rowCoords = this.grid.computeRowCoords();
			this.colCoords = this.grid.computeColCoords();
			this.computeBounds();
		},
	
	
		// Clears the coordinates data to free up memory
		clear: function() {
			this.grid.clear();
			this.rowCoords = null;
			this.colCoords = null;
		},
	
	
		// Given a coordinate of the document, gets the associated cell. If no cell is underneath, returns null
		getCell: function(x, y) {
			var rowCoords = this.rowCoords;
			var rowCnt = rowCoords.length;
			var colCoords = this.colCoords;
			var colCnt = colCoords.length;
			var hitRow = null;
			var hitCol = null;
			var i, coords;
			var cell;
	
			if (this.inBounds(x, y)) {
	
				for (i = 0; i < rowCnt; i++) {
					coords = rowCoords[i];
					if (y >= coords.top && y < coords.bottom) {
						hitRow = i;
						break;
					}
				}
	
				for (i = 0; i < colCnt; i++) {
					coords = colCoords[i];
					if (x >= coords.left && x < coords.right) {
						hitCol = i;
						break;
					}
				}
	
				if (hitRow !== null && hitCol !== null) {
	
					cell = this.grid.getCell(hitRow, hitCol); // expected to return a fresh object we can modify
					cell.grid = this.grid; // for CellDragListener's isCellsEqual. dragging between grids
	
					// make the coordinates available on the cell object
					$.extend(cell, rowCoords[hitRow], colCoords[hitCol]);
	
					return cell;
				}
			}
	
			return null;
		},
	
	
		// If there is a containerEl, compute the bounds into min/max values
		computeBounds: function() {
			this.bounds = this.containerEl ?
				getClientRect(this.containerEl) : // area within scrollbars
				null;
		},
	
	
		// Determines if the given coordinates are in bounds. If no `containerEl`, always true
		inBounds: function(x, y) {
			var bounds = this.bounds;
	
			if (bounds) {
				return x >= bounds.left && x < bounds.right && y >= bounds.top && y < bounds.bottom;
			}
	
			return true;
		}
	
	});
	
	
	/* Coordinate map that is a combination of multiple other coordinate maps
	----------------------------------------------------------------------------------------------------------------------*/
	
	var ComboCoordMap = Class.extend({
	
		coordMaps: null, // an array of CoordMaps
	
	
		constructor: function(coordMaps) {
			this.coordMaps = coordMaps;
		},
	
	
		// Builds all coordMaps
		build: function() {
			var coordMaps = this.coordMaps;
			var i;
	
			for (i = 0; i < coordMaps.length; i++) {
				coordMaps[i].build();
			}
		},
	
	
		// Queries all coordMaps for the cell underneath the given coordinates, returning the first result
		getCell: function(x, y) {
			var coordMaps = this.coordMaps;
			var cell = null;
			var i;
	
			for (i = 0; i < coordMaps.length && !cell; i++) {
				cell = coordMaps[i].getCell(x, y);
			}
	
			return cell;
		},
	
	
		// Clears all coordMaps
		clear: function() {
			var coordMaps = this.coordMaps;
			var i;
	
			for (i = 0; i < coordMaps.length; i++) {
				coordMaps[i].clear();
			}
		}
	
	});
	
	;;
	
	/* Tracks a drag's mouse movement, firing various handlers
	----------------------------------------------------------------------------------------------------------------------*/
	
	var DragListener = fc.DragListener = Class.extend({
	
		options: null,
	
		isListening: false,
		isDragging: false,
	
		// coordinates of the initial mousedown
		originX: null,
		originY: null,
	
		// handler attached to the document, bound to the DragListener's `this`
		mousemoveProxy: null,
		mouseupProxy: null,
	
		// for IE8 bug-fighting behavior, for now
		subjectEl: null, // the element being draged. optional
		subjectHref: null,
	
		scrollEl: null,
		scrollBounds: null, // { top, bottom, left, right }
		scrollTopVel: null, // pixels per second
		scrollLeftVel: null, // pixels per second
		scrollIntervalId: null, // ID of setTimeout for scrolling animation loop
		scrollHandlerProxy: null, // this-scoped function for handling when scrollEl is scrolled
	
		scrollSensitivity: 30, // pixels from edge for scrolling to start
		scrollSpeed: 200, // pixels per second, at maximum speed
		scrollIntervalMs: 50, // millisecond wait between scroll increment
	
	
		constructor: function(options) {
			options = options || {};
			this.options = options;
			this.subjectEl = options.subjectEl;
		},
	
	
		// Call this when the user does a mousedown. Will probably lead to startListening
		mousedown: function(ev) {
			if (isPrimaryMouseButton(ev)) {
	
				ev.preventDefault(); // prevents native selection in most browsers
	
				this.startListening(ev);
	
				// start the drag immediately if there is no minimum distance for a drag start
				if (!this.options.distance) {
					this.startDrag(ev);
				}
			}
		},
	
	
		// Call this to start tracking mouse movements
		startListening: function(ev) {
			var scrollParent;
	
			if (!this.isListening) {
	
				// grab scroll container and attach handler
				if (ev && this.options.scroll) {
					scrollParent = getScrollParent($(ev.target));
					if (!scrollParent.is(window) && !scrollParent.is(document)) {
						this.scrollEl = scrollParent;
	
						// scope to `this`, and use `debounce` to make sure rapid calls don't happen
						this.scrollHandlerProxy = debounce(proxy(this, 'scrollHandler'), 100);
						this.scrollEl.on('scroll', this.scrollHandlerProxy);
					}
				}
	
				$(document)
					.on('mousemove', this.mousemoveProxy = proxy(this, 'mousemove'))
					.on('mouseup', this.mouseupProxy = proxy(this, 'mouseup'))
					.on('selectstart', this.preventDefault); // prevents native selection in IE<=8
	
				if (ev) {
					this.originX = ev.pageX;
					this.originY = ev.pageY;
				}
				else {
					// if no starting information was given, origin will be the topleft corner of the screen.
					// if so, dx/dy in the future will be the absolute coordinates.
					this.originX = 0;
					this.originY = 0;
				}
	
				this.isListening = true;
				this.listenStart(ev);
			}
		},
	
	
		// Called when drag listening has started (but a real drag has not necessarily began)
		listenStart: function(ev) {
			this.trigger('listenStart', ev);
		},
	
	
		// Called when the user moves the mouse
		mousemove: function(ev) {
			var dx = ev.pageX - this.originX;
			var dy = ev.pageY - this.originY;
			var minDistance;
			var distanceSq; // current distance from the origin, squared
	
			if (!this.isDragging) { // if not already dragging...
				// then start the drag if the minimum distance criteria is met
				minDistance = this.options.distance || 1;
				distanceSq = dx * dx + dy * dy;
				if (distanceSq >= minDistance * minDistance) { // use pythagorean theorem
					this.startDrag(ev);
				}
			}
	
			if (this.isDragging) {
				this.drag(dx, dy, ev); // report a drag, even if this mousemove initiated the drag
			}
		},
	
	
		// Call this to initiate a legitimate drag.
		// This function is called internally from this class, but can also be called explicitly from outside
		startDrag: function(ev) {
	
			if (!this.isListening) { // startDrag must have manually initiated
				this.startListening();
			}
	
			if (!this.isDragging) {
				this.isDragging = true;
				this.dragStart(ev);
			}
		},
	
	
		// Called when the actual drag has started (went beyond minDistance)
		dragStart: function(ev) {
			var subjectEl = this.subjectEl;
	
			this.trigger('dragStart', ev);
	
			// remove a mousedown'd <a>'s href so it is not visited (IE8 bug)
			if ((this.subjectHref = subjectEl ? subjectEl.attr('href') : null)) {
				subjectEl.removeAttr('href');
			}
		},
	
	
		// Called while the mouse is being moved and when we know a legitimate drag is taking place
		drag: function(dx, dy, ev) {
			this.trigger('drag', dx, dy, ev);
			this.updateScroll(ev); // will possibly cause scrolling
		},
	
	
		// Called when the user does a mouseup
		mouseup: function(ev) {
			this.stopListening(ev);
		},
	
	
		// Called when the drag is over. Will not cause listening to stop however.
		// A concluding 'cellOut' event will NOT be triggered.
		stopDrag: function(ev) {
			if (this.isDragging) {
				this.stopScrolling();
				this.dragStop(ev);
				this.isDragging = false;
			}
		},
	
	
		// Called when dragging has been stopped
		dragStop: function(ev) {
			var _this = this;
	
			this.trigger('dragStop', ev);
	
			// restore a mousedown'd <a>'s href (for IE8 bug)
			setTimeout(function() { // must be outside of the click's execution
				if (_this.subjectHref) {
					_this.subjectEl.attr('href', _this.subjectHref);
				}
			}, 0);
		},
	
	
		// Call this to stop listening to the user's mouse events
		stopListening: function(ev) {
			this.stopDrag(ev); // if there's a current drag, kill it
	
			if (this.isListening) {
	
				// remove the scroll handler if there is a scrollEl
				if (this.scrollEl) {
					this.scrollEl.off('scroll', this.scrollHandlerProxy);
					this.scrollHandlerProxy = null;
				}
	
				$(document)
					.off('mousemove', this.mousemoveProxy)
					.off('mouseup', this.mouseupProxy)
					.off('selectstart', this.preventDefault);
	
				this.mousemoveProxy = null;
				this.mouseupProxy = null;
	
				this.isListening = false;
				this.listenStop(ev);
			}
		},
	
	
		// Called when drag listening has stopped
		listenStop: function(ev) {
			this.trigger('listenStop', ev);
		},
	
	
		// Triggers a callback. Calls a function in the option hash of the same name.
		// Arguments beyond the first `name` are forwarded on.
		trigger: function(name) {
			if (this.options[name]) {
				this.options[name].apply(this, Array.prototype.slice.call(arguments, 1));
			}
		},
	
	
		// Stops a given mouse event from doing it's native browser action. In our case, text selection.
		preventDefault: function(ev) {
			ev.preventDefault();
		},
	
	
		/* Scrolling
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Computes and stores the bounding rectangle of scrollEl
		computeScrollBounds: function() {
			var el = this.scrollEl;
	
			this.scrollBounds = el ? getOuterRect(el) : null;
				// TODO: use getClientRect in future. but prevents auto scrolling when on top of scrollbars
		},
	
	
		// Called when the dragging is in progress and scrolling should be updated
		updateScroll: function(ev) {
			var sensitivity = this.scrollSensitivity;
			var bounds = this.scrollBounds;
			var topCloseness, bottomCloseness;
			var leftCloseness, rightCloseness;
			var topVel = 0;
			var leftVel = 0;
	
			if (bounds) { // only scroll if scrollEl exists
	
				// compute closeness to edges. valid range is from 0.0 - 1.0
				topCloseness = (sensitivity - (ev.pageY - bounds.top)) / sensitivity;
				bottomCloseness = (sensitivity - (bounds.bottom - ev.pageY)) / sensitivity;
				leftCloseness = (sensitivity - (ev.pageX - bounds.left)) / sensitivity;
				rightCloseness = (sensitivity - (bounds.right - ev.pageX)) / sensitivity;
	
				// translate vertical closeness into velocity.
				// mouse must be completely in bounds for velocity to happen.
				if (topCloseness >= 0 && topCloseness <= 1) {
					topVel = topCloseness * this.scrollSpeed * -1; // negative. for scrolling up
				}
				else if (bottomCloseness >= 0 && bottomCloseness <= 1) {
					topVel = bottomCloseness * this.scrollSpeed;
				}
	
				// translate horizontal closeness into velocity
				if (leftCloseness >= 0 && leftCloseness <= 1) {
					leftVel = leftCloseness * this.scrollSpeed * -1; // negative. for scrolling left
				}
				else if (rightCloseness >= 0 && rightCloseness <= 1) {
					leftVel = rightCloseness * this.scrollSpeed;
				}
			}
	
			this.setScrollVel(topVel, leftVel);
		},
	
	
		// Sets the speed-of-scrolling for the scrollEl
		setScrollVel: function(topVel, leftVel) {
	
			this.scrollTopVel = topVel;
			this.scrollLeftVel = leftVel;
	
			this.constrainScrollVel(); // massages into realistic values
	
			// if there is non-zero velocity, and an animation loop hasn't already started, then START
			if ((this.scrollTopVel || this.scrollLeftVel) && !this.scrollIntervalId) {
				this.scrollIntervalId = setInterval(
					proxy(this, 'scrollIntervalFunc'), // scope to `this`
					this.scrollIntervalMs
				);
			}
		},
	
	
		// Forces scrollTopVel and scrollLeftVel to be zero if scrolling has already gone all the way
		constrainScrollVel: function() {
			var el = this.scrollEl;
	
			if (this.scrollTopVel < 0) { // scrolling up?
				if (el.scrollTop() <= 0) { // already scrolled all the way up?
					this.scrollTopVel = 0;
				}
			}
			else if (this.scrollTopVel > 0) { // scrolling down?
				if (el.scrollTop() + el[0].clientHeight >= el[0].scrollHeight) { // already scrolled all the way down?
					this.scrollTopVel = 0;
				}
			}
	
			if (this.scrollLeftVel < 0) { // scrolling left?
				if (el.scrollLeft() <= 0) { // already scrolled all the left?
					this.scrollLeftVel = 0;
				}
			}
			else if (this.scrollLeftVel > 0) { // scrolling right?
				if (el.scrollLeft() + el[0].clientWidth >= el[0].scrollWidth) { // already scrolled all the way right?
					this.scrollLeftVel = 0;
				}
			}
		},
	
	
		// This function gets called during every iteration of the scrolling animation loop
		scrollIntervalFunc: function() {
			var el = this.scrollEl;
			var frac = this.scrollIntervalMs / 1000; // considering animation frequency, what the vel should be mult'd by
	
			// change the value of scrollEl's scroll
			if (this.scrollTopVel) {
				el.scrollTop(el.scrollTop() + this.scrollTopVel * frac);
			}
			if (this.scrollLeftVel) {
				el.scrollLeft(el.scrollLeft() + this.scrollLeftVel * frac);
			}
	
			this.constrainScrollVel(); // since the scroll values changed, recompute the velocities
	
			// if scrolled all the way, which causes the vels to be zero, stop the animation loop
			if (!this.scrollTopVel && !this.scrollLeftVel) {
				this.stopScrolling();
			}
		},
	
	
		// Kills any existing scrolling animation loop
		stopScrolling: function() {
			if (this.scrollIntervalId) {
				clearInterval(this.scrollIntervalId);
				this.scrollIntervalId = null;
	
				// when all done with scrolling, recompute positions since they probably changed
				this.scrollStop();
			}
		},
	
	
		// Get called when the scrollEl is scrolled (NOTE: this is delayed via debounce)
		scrollHandler: function() {
			// recompute all coordinates, but *only* if this is *not* part of our scrolling animation
			if (!this.scrollIntervalId) {
				this.scrollStop();
			}
		},
	
	
		// Called when scrolling has stopped, whether through auto scroll, or the user scrolling
		scrollStop: function() {
		}
	
	});
	
	;;
	
	/* Tracks mouse movements over a CoordMap and raises events about which cell the mouse is over.
	------------------------------------------------------------------------------------------------------------------------
	options:
	- subjectEl
	- subjectCenter
	*/
	
	var CellDragListener = DragListener.extend({
	
		coordMap: null, // converts coordinates to date cells
		origCell: null, // the cell the mouse was over when listening started
		cell: null, // the cell the mouse is over
		coordAdjust: null, // delta that will be added to the mouse coordinates when computing collisions
	
	
		constructor: function(coordMap, options) {
			DragListener.prototype.constructor.call(this, options); // call the super-constructor
	
			this.coordMap = coordMap;
		},
	
	
		// Called when drag listening starts (but a real drag has not necessarily began).
		// ev might be undefined if dragging was started manually.
		listenStart: function(ev) {
			var subjectEl = this.subjectEl;
			var subjectRect;
			var origPoint;
			var point;
	
			DragListener.prototype.listenStart.apply(this, arguments); // call the super-method
	
			this.computeCoords();
	
			if (ev) {
				origPoint = { left: ev.pageX, top: ev.pageY };
				point = origPoint;
	
				// constrain the point to bounds of the element being dragged
				if (subjectEl) {
					subjectRect = getOuterRect(subjectEl); // used for centering as well
					point = constrainPoint(point, subjectRect);
				}
	
				this.origCell = this.getCell(point.left, point.top);
	
				// treat the center of the subject as the collision point?
				if (subjectEl && this.options.subjectCenter) {
	
					// only consider the area the subject overlaps the cell. best for large subjects
					if (this.origCell) {
						subjectRect = intersectRects(this.origCell, subjectRect) ||
							subjectRect; // in case there is no intersection
					}
	
					point = getRectCenter(subjectRect);
				}
	
				this.coordAdjust = diffPoints(point, origPoint); // point - origPoint
			}
			else {
				this.origCell = null;
				this.coordAdjust = null;
			}
		},
	
	
		// Recomputes the drag-critical positions of elements
		computeCoords: function() {
			this.coordMap.build();
			this.computeScrollBounds();
		},
	
	
		// Called when the actual drag has started
		dragStart: function(ev) {
			var cell;
	
			DragListener.prototype.dragStart.apply(this, arguments); // call the super-method
	
			cell = this.getCell(ev.pageX, ev.pageY); // might be different from this.origCell if the min-distance is large
	
			// report the initial cell the mouse is over
			// especially important if no min-distance and drag starts immediately
			if (cell) {
				this.cellOver(cell);
			}
		},
	
	
		// Called when the drag moves
		drag: function(dx, dy, ev) {
			var cell;
	
			DragListener.prototype.drag.apply(this, arguments); // call the super-method
	
			cell = this.getCell(ev.pageX, ev.pageY);
	
			if (!isCellsEqual(cell, this.cell)) { // a different cell than before?
				if (this.cell) {
					this.cellOut();
				}
				if (cell) {
					this.cellOver(cell);
				}
			}
		},
	
	
		// Called when dragging has been stopped
		dragStop: function() {
			this.cellDone();
			DragListener.prototype.dragStop.apply(this, arguments); // call the super-method
		},
	
	
		// Called when a the mouse has just moved over a new cell
		cellOver: function(cell) {
			this.cell = cell;
			this.trigger('cellOver', cell, isCellsEqual(cell, this.origCell), this.origCell);
		},
	
	
		// Called when the mouse has just moved out of a cell
		cellOut: function() {
			if (this.cell) {
				this.trigger('cellOut', this.cell);
				this.cellDone();
				this.cell = null;
			}
		},
	
	
		// Called after a cellOut. Also called before a dragStop
		cellDone: function() {
			if (this.cell) {
				this.trigger('cellDone', this.cell);
			}
		},
	
	
		// Called when drag listening has stopped
		listenStop: function() {
			DragListener.prototype.listenStop.apply(this, arguments); // call the super-method
	
			this.origCell = this.cell = null;
			this.coordMap.clear();
		},
	
	
		// Called when scrolling has stopped, whether through auto scroll, or the user scrolling
		scrollStop: function() {
			DragListener.prototype.scrollStop.apply(this, arguments); // call the super-method
	
			this.computeCoords(); // cells' absolute positions will be in new places. recompute
		},
	
	
		// Gets the cell underneath the coordinates for the given mouse event
		getCell: function(left, top) {
	
			if (this.coordAdjust) {
				left += this.coordAdjust.left;
				top += this.coordAdjust.top;
			}
	
			return this.coordMap.getCell(left, top);
		}
	
	});
	
	
	// Returns `true` if the cells are identically equal. `false` otherwise.
	// They must have the same row, col, and be from the same grid.
	// Two null values will be considered equal, as two "out of the grid" states are the same.
	function isCellsEqual(cell1, cell2) {
	
		if (!cell1 && !cell2) {
			return true;
		}
	
		if (cell1 && cell2) {
			return cell1.grid === cell2.grid &&
				cell1.row === cell2.row &&
				cell1.col === cell2.col;
		}
	
		return false;
	}
	
	;;
	
	/* Creates a clone of an element and lets it track the mouse as it moves
	----------------------------------------------------------------------------------------------------------------------*/
	
	var MouseFollower = Class.extend({
	
		options: null,
	
		sourceEl: null, // the element that will be cloned and made to look like it is dragging
		el: null, // the clone of `sourceEl` that will track the mouse
		parentEl: null, // the element that `el` (the clone) will be attached to
	
		// the initial position of el, relative to the offset parent. made to match the initial offset of sourceEl
		top0: null,
		left0: null,
	
		// the initial position of the mouse
		mouseY0: null,
		mouseX0: null,
	
		// the number of pixels the mouse has moved from its initial position
		topDelta: null,
		leftDelta: null,
	
		mousemoveProxy: null, // document mousemove handler, bound to the MouseFollower's `this`
	
		isFollowing: false,
		isHidden: false,
		isAnimating: false, // doing the revert animation?
	
		constructor: function(sourceEl, options) {
			this.options = options = options || {};
			this.sourceEl = sourceEl;
			this.parentEl = options.parentEl ? $(options.parentEl) : sourceEl.parent(); // default to sourceEl's parent
		},
	
	
		// Causes the element to start following the mouse
		start: function(ev) {
			if (!this.isFollowing) {
				this.isFollowing = true;
	
				this.mouseY0 = ev.pageY;
				this.mouseX0 = ev.pageX;
				this.topDelta = 0;
				this.leftDelta = 0;
	
				if (!this.isHidden) {
					this.updatePosition();
				}
	
				$(document).on('mousemove', this.mousemoveProxy = proxy(this, 'mousemove'));
			}
		},
	
	
		// Causes the element to stop following the mouse. If shouldRevert is true, will animate back to original position.
		// `callback` gets invoked when the animation is complete. If no animation, it is invoked immediately.
		stop: function(shouldRevert, callback) {
			var _this = this;
			var revertDuration = this.options.revertDuration;
	
			function complete() {
				this.isAnimating = false;
				_this.removeElement();
	
				this.top0 = this.left0 = null; // reset state for future updatePosition calls
	
				if (callback) {
					callback();
				}
			}
	
			if (this.isFollowing && !this.isAnimating) { // disallow more than one stop animation at a time
				this.isFollowing = false;
	
				$(document).off('mousemove', this.mousemoveProxy);
	
				if (shouldRevert && revertDuration && !this.isHidden) { // do a revert animation?
					this.isAnimating = true;
					this.el.animate({
						top: this.top0,
						left: this.left0
					}, {
						duration: revertDuration,
						complete: complete
					});
				}
				else {
					complete();
				}
			}
		},
	
	
		// Gets the tracking element. Create it if necessary
		getEl: function() {
			var el = this.el;
	
			if (!el) {
				this.sourceEl.width(); // hack to force IE8 to compute correct bounding box
				el = this.el = this.sourceEl.clone()
					.css({
						position: 'absolute',
						visibility: '', // in case original element was hidden (commonly through hideEvents())
						display: this.isHidden ? 'none' : '', // for when initially hidden
						margin: 0,
						right: 'auto', // erase and set width instead
						bottom: 'auto', // erase and set height instead
						width: this.sourceEl.width(), // explicit height in case there was a 'right' value
						height: this.sourceEl.height(), // explicit width in case there was a 'bottom' value
						opacity: this.options.opacity || '',
						zIndex: this.options.zIndex
					})
					.appendTo(this.parentEl);
			}
	
			return el;
		},
	
	
		// Removes the tracking element if it has already been created
		removeElement: function() {
			if (this.el) {
				this.el.remove();
				this.el = null;
			}
		},
	
	
		// Update the CSS position of the tracking element
		updatePosition: function() {
			var sourceOffset;
			var origin;
	
			this.getEl(); // ensure this.el
	
			// make sure origin info was computed
			if (this.top0 === null) {
				this.sourceEl.width(); // hack to force IE8 to compute correct bounding box
				sourceOffset = this.sourceEl.offset();
				origin = this.el.offsetParent().offset();
				this.top0 = sourceOffset.top - origin.top;
				this.left0 = sourceOffset.left - origin.left;
			}
	
			this.el.css({
				top: this.top0 + this.topDelta,
				left: this.left0 + this.leftDelta
			});
		},
	
	
		// Gets called when the user moves the mouse
		mousemove: function(ev) {
			this.topDelta = ev.pageY - this.mouseY0;
			this.leftDelta = ev.pageX - this.mouseX0;
	
			if (!this.isHidden) {
				this.updatePosition();
			}
		},
	
	
		// Temporarily makes the tracking element invisible. Can be called before following starts
		hide: function() {
			if (!this.isHidden) {
				this.isHidden = true;
				if (this.el) {
					this.el.hide();
				}
			}
		},
	
	
		// Show the tracking element after it has been temporarily hidden
		show: function() {
			if (this.isHidden) {
				this.isHidden = false;
				this.updatePosition();
				this.getEl().show();
			}
		}
	
	});
	
	;;
	
	/* A utility class for rendering <tr> rows.
	----------------------------------------------------------------------------------------------------------------------*/
	// It leverages methods of the subclass and the View to determine custom rendering behavior for each row "type"
	// (such as highlight rows, day rows, helper rows, etc).
	
	var RowRenderer = Class.extend({
	
		view: null, // a View object
		isRTL: null, // shortcut to the view's isRTL option
		cellHtml: '<td/>', // plain default HTML used for a cell when no other is available
	
	
		constructor: function(view) {
			this.view = view;
			this.isRTL = view.opt('isRTL');
		},
	
	
		// Renders the HTML for a row, leveraging custom cell-HTML-renderers based on the `rowType`.
		// Also applies the "intro" and "outro" cells, which are specified by the subclass and views.
		// `row` is an optional row number.
		rowHtml: function(rowType, row) {
			var renderCell = this.getHtmlRenderer('cell', rowType);
			var rowCellHtml = '';
			var col;
			var cell;
	
			row = row || 0;
	
			for (col = 0; col < this.colCnt; col++) {
				cell = this.getCell(row, col);
				rowCellHtml += renderCell(cell);
			}
	
			rowCellHtml = this.bookendCells(rowCellHtml, rowType, row); // apply intro and outro
	
			return '<tr>' + rowCellHtml + '</tr>';
		},
	
	
		// Applies the "intro" and "outro" HTML to the given cells.
		// Intro means the leftmost cell when the calendar is LTR and the rightmost cell when RTL. Vice-versa for outro.
		// `cells` can be an HTML string of <td>'s or a jQuery <tr> element
		// `row` is an optional row number.
		bookendCells: function(cells, rowType, row) {
			var intro = this.getHtmlRenderer('intro', rowType)(row || 0);
			var outro = this.getHtmlRenderer('outro', rowType)(row || 0);
			var prependHtml = this.isRTL ? outro : intro;
			var appendHtml = this.isRTL ? intro : outro;
	
			if (typeof cells === 'string') {
				return prependHtml + cells + appendHtml;
			}
			else { // a jQuery <tr> element
				return cells.prepend(prependHtml).append(appendHtml);
			}
		},
	
	
		// Returns an HTML-rendering function given a specific `rendererName` (like cell, intro, or outro) and a specific
		// `rowType` (like day, eventSkeleton, helperSkeleton), which is optional.
		// If a renderer for the specific rowType doesn't exist, it will fall back to a generic renderer.
		// We will query the View object first for any custom rendering functions, then the methods of the subclass.
		getHtmlRenderer: function(rendererName, rowType) {
			var view = this.view;
			var generalName; // like "cellHtml"
			var specificName; // like "dayCellHtml". based on rowType
			var provider; // either the View or the RowRenderer subclass, whichever provided the method
			var renderer;
	
			generalName = rendererName + 'Html';
			if (rowType) {
				specificName = rowType + capitaliseFirstLetter(rendererName) + 'Html';
			}
	
			if (specificName && (renderer = view[specificName])) {
				provider = view;
			}
			else if (specificName && (renderer = this[specificName])) {
				provider = this;
			}
			else if ((renderer = view[generalName])) {
				provider = view;
			}
			else if ((renderer = this[generalName])) {
				provider = this;
			}
	
			if (typeof renderer === 'function') {
				return function() {
					return renderer.apply(provider, arguments) || ''; // use correct `this` and always return a string
				};
			}
	
			// the rendered can be a plain string as well. if not specified, always an empty string.
			return function() {
				return renderer || '';
			};
		}
	
	});
	
	;;
	
	/* An abstract class comprised of a "grid" of cells that each represent a specific datetime
	----------------------------------------------------------------------------------------------------------------------*/
	
	var Grid = fc.Grid = RowRenderer.extend({
	
		start: null, // the date of the first cell
		end: null, // the date after the last cell
	
		rowCnt: 0, // number of rows
		colCnt: 0, // number of cols
	
		el: null, // the containing element
		coordMap: null, // a GridCoordMap that converts pixel values to datetimes
		elsByFill: null, // a hash of jQuery element sets used for rendering each fill. Keyed by fill name.
	
		externalDragStartProxy: null, // binds the Grid's scope to externalDragStart (in DayGrid.events)
	
		// derived from options
		colHeadFormat: null, // TODO: move to another class. not applicable to all Grids
		eventTimeFormat: null,
		displayEventTime: null,
		displayEventEnd: null,
	
		// if all cells are the same length of time, the duration they all share. optional.
		// when defined, allows the computeCellRange shortcut, as well as improved resizing behavior.
		cellDuration: null,
	
		// if defined, holds the unit identified (ex: "year" or "month") that determines the level of granularity
		// of the date cells. if not defined, assumes to be day and time granularity.
		largeUnit: null,
	
	
		constructor: function() {
			RowRenderer.apply(this, arguments); // call the super-constructor
	
			this.coordMap = new GridCoordMap(this);
			this.elsByFill = {};
			this.externalDragStartProxy = proxy(this, 'externalDragStart');
		},
	
	
		/* Options
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Generates the format string used for the text in column headers, if not explicitly defined by 'columnFormat'
		// TODO: move to another class. not applicable to all Grids
		computeColHeadFormat: function() {
			// subclasses must implement if they want to use headHtml()
		},
	
	
		// Generates the format string used for event time text, if not explicitly defined by 'timeFormat'
		computeEventTimeFormat: function() {
			return this.view.opt('smallTimeFormat');
		},
	
	
		// Determines whether events should have their end times displayed, if not explicitly defined by 'displayEventTime'.
		// Only applies to non-all-day events.
		computeDisplayEventTime: function() {
			return true;
		},
	
	
		// Determines whether events should have their end times displayed, if not explicitly defined by 'displayEventEnd'
		computeDisplayEventEnd: function() {
			return true;
		},
	
	
		/* Dates
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Tells the grid about what period of time to display.
		// Any date-related cell system internal data should be generated.
		setRange: function(range) {
			this.start = range.start.clone();
			this.end = range.end.clone();
	
			this.rangeUpdated();
			this.processRangeOptions();
		},
	
	
		// Called when internal variables that rely on the range should be updated
		rangeUpdated: function() {
		},
	
	
		// Updates values that rely on options and also relate to range
		processRangeOptions: function() {
			var view = this.view;
			var displayEventTime;
			var displayEventEnd;
	
			// Populate option-derived settings. Look for override first, then compute if necessary.
			this.colHeadFormat = view.opt('columnFormat') || this.computeColHeadFormat();
	
			this.eventTimeFormat =
				view.opt('eventTimeFormat') ||
				view.opt('timeFormat') || // deprecated
				this.computeEventTimeFormat();
	
			displayEventTime = view.opt('displayEventTime');
			if (displayEventTime == null) {
				displayEventTime = this.computeDisplayEventTime(); // might be based off of range
			}
	
			displayEventEnd = view.opt('displayEventEnd');
			if (displayEventEnd == null) {
				displayEventEnd = this.computeDisplayEventEnd(); // might be based off of range
			}
	
			this.displayEventTime = displayEventTime;
			this.displayEventEnd = displayEventEnd;
		},
	
	
		// Called before the grid's coordinates will need to be queried for cells.
		// Any non-date-related cell system internal data should be built.
		build: function() {
		},
	
	
		// Called after the grid's coordinates are done being relied upon.
		// Any non-date-related cell system internal data should be cleared.
		clear: function() {
		},
	
	
		// Converts a range with an inclusive `start` and an exclusive `end` into an array of segment objects
		rangeToSegs: function(range) {
			// subclasses must implement
		},
	
	
		// Diffs the two dates, returning a duration, based on granularity of the grid
		diffDates: function(a, b) {
			if (this.largeUnit) {
				return diffByUnit(a, b, this.largeUnit);
			}
			else {
				return diffDayTime(a, b);
			}
		},
	
	
		/* Cells
		------------------------------------------------------------------------------------------------------------------*/
		// NOTE: columns are ordered left-to-right
	
	
		// Gets an object containing row/col number, misc data, and range information about the cell.
		// Accepts row/col values, an object with row/col properties, or a single-number offset from the first cell.
		getCell: function(row, col) {
			var cell;
	
			if (col == null) {
				if (typeof row === 'number') { // a single-number offset
					col = row % this.colCnt;
					row = Math.floor(row / this.colCnt);
				}
				else { // an object with row/col properties
					col = row.col;
					row = row.row;
				}
			}
	
			cell = { row: row, col: col };
	
			$.extend(cell, this.getRowData(row), this.getColData(col));
			$.extend(cell, this.computeCellRange(cell));
	
			return cell;
		},
	
	
		// Given a cell object with index and misc data, generates a range object
		// If the grid is leveraging cellDuration, this doesn't need to be defined. Only computeCellDate does.
		// If being overridden, should return a range with reference-free date copies.
		computeCellRange: function(cell) {
			var date = this.computeCellDate(cell);
	
			return {
				start: date,
				end: date.clone().add(this.cellDuration)
			};
		},
	
	
		// Given a cell, returns its start date. Should return a reference-free date copy.
		computeCellDate: function(cell) {
			// subclasses can implement
		},
	
	
		// Retrieves misc data about the given row
		getRowData: function(row) {
			return {};
		},
	
	
		// Retrieves misc data baout the given column
		getColData: function(col) {
			return {};
		},
	
	
		// Retrieves the element representing the given row
		getRowEl: function(row) {
			// subclasses should implement if leveraging the default getCellDayEl() or computeRowCoords()
		},
	
	
		// Retrieves the element representing the given column
		getColEl: function(col) {
			// subclasses should implement if leveraging the default getCellDayEl() or computeColCoords()
		},
	
	
		// Given a cell object, returns the element that represents the cell's whole-day
		getCellDayEl: function(cell) {
			return this.getColEl(cell.col) || this.getRowEl(cell.row);
		},
	
	
		/* Cell Coordinates
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Computes the top/bottom coordinates of all rows.
		// By default, queries the dimensions of the element provided by getRowEl().
		computeRowCoords: function() {
			var items = [];
			var i, el;
			var top;
	
			for (i = 0; i < this.rowCnt; i++) {
				el = this.getRowEl(i);
				top = el.offset().top;
				items.push({
					top: top,
					bottom: top + el.outerHeight()
				});
			}
	
			return items;
		},
	
	
		// Computes the left/right coordinates of all rows.
		// By default, queries the dimensions of the element provided by getColEl(). Columns can be LTR or RTL.
		computeColCoords: function() {
			var items = [];
			var i, el;
			var left;
	
			for (i = 0; i < this.colCnt; i++) {
				el = this.getColEl(i);
				left = el.offset().left;
				items.push({
					left: left,
					right: left + el.outerWidth()
				});
			}
	
			return items;
		},
	
	
		/* Rendering
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Sets the container element that the grid should render inside of.
		// Does other DOM-related initializations.
		setElement: function(el) {
			var _this = this;
	
			this.el = el;
	
			// attach a handler to the grid's root element.
			// jQuery will take care of unregistering them when removeElement gets called.
			el.on('mousedown', function(ev) {
				if (
					!$(ev.target).is('.fc-event-container *, .fc-more') && // not an an event element, or "more.." link
					!$(ev.target).closest('.fc-popover').length // not on a popover (like the "more.." events one)
				) {
					_this.dayMousedown(ev);
				}
			});
	
			// attach event-element-related handlers. in Grid.events
			// same garbage collection note as above.
			this.bindSegHandlers();
	
			this.bindGlobalHandlers();
		},
	
	
		// Removes the grid's container element from the DOM. Undoes any other DOM-related attachments.
		// DOES NOT remove any content beforehand (doesn't clear events or call unrenderDates), unlike View
		removeElement: function() {
			this.unbindGlobalHandlers();
	
			this.el.remove();
	
			// NOTE: we don't null-out this.el for the same reasons we don't do it within View::removeElement
		},
	
	
		// Renders the basic structure of grid view before any content is rendered
		renderSkeleton: function() {
			// subclasses should implement
		},
	
	
		// Renders the grid's date-related content (like cells that represent days/times).
		// Assumes setRange has already been called and the skeleton has already been rendered.
		renderDates: function() {
			// subclasses should implement
		},
	
	
		// Unrenders the grid's date-related content
		unrenderDates: function() {
			// subclasses should implement
		},
	
	
		/* Handlers
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Binds DOM handlers to elements that reside outside the grid, such as the document
		bindGlobalHandlers: function() {
			$(document).on('dragstart sortstart', this.externalDragStartProxy); // jqui
		},
	
	
		// Unbinds DOM handlers from elements that reside outside the grid
		unbindGlobalHandlers: function() {
			$(document).off('dragstart sortstart', this.externalDragStartProxy); // jqui
		},
	
	
		// Process a mousedown on an element that represents a day. For day clicking and selecting.
		dayMousedown: function(ev) {
			var _this = this;
			var view = this.view;
			var isSelectable = view.opt('selectable');
			var dayClickCell; // null if invalid dayClick
			var selectionRange; // null if invalid selection
	
			// this listener tracks a mousedown on a day element, and a subsequent drag.
			// if the drag ends on the same day, it is a 'dayClick'.
			// if 'selectable' is enabled, this listener also detects selections.
			var dragListener = new CellDragListener(this.coordMap, {
				//distance: 5, // needs more work if we want dayClick to fire correctly
				scroll: view.opt('dragScroll'),
				dragStart: function() {
					view.unselect(); // since we could be rendering a new selection, we want to clear any old one
				},
				cellOver: function(cell, isOrig, origCell) {
					if (origCell) { // click needs to have started on a cell
						dayClickCell = isOrig ? cell : null; // single-cell selection is a day click
						if (isSelectable) {
							selectionRange = _this.computeSelection(origCell, cell);
							if (selectionRange) {
								_this.renderSelection(selectionRange);
							}
							else {
								disableCursor();
							}
						}
					}
				},
				cellOut: function(cell) {
					dayClickCell = null;
					selectionRange = null;
					_this.unrenderSelection();
					enableCursor();
				},
				listenStop: function(ev) {
					if (dayClickCell) {
						view.triggerDayClick(dayClickCell, _this.getCellDayEl(dayClickCell), ev);
					}
					if (selectionRange) {
						// the selection will already have been rendered. just report it
						view.reportSelection(selectionRange, ev);
					}
					enableCursor();
				}
			});
	
			dragListener.mousedown(ev); // start listening, which will eventually initiate a dragStart
		},
	
	
		/* Event Helper
		------------------------------------------------------------------------------------------------------------------*/
		// TODO: should probably move this to Grid.events, like we did event dragging / resizing
	
	
		// Renders a mock event over the given range
		renderRangeHelper: function(range, sourceSeg) {
			var fakeEvent = this.fabricateHelperEvent(range, sourceSeg);
	
			this.renderHelper(fakeEvent, sourceSeg); // do the actual rendering
		},
	
	
		// Builds a fake event given a date range it should cover, and a segment is should be inspired from.
		// The range's end can be null, in which case the mock event that is rendered will have a null end time.
		// `sourceSeg` is the internal segment object involved in the drag. If null, something external is dragging.
		fabricateHelperEvent: function(range, sourceSeg) {
			var fakeEvent = sourceSeg ? createObject(sourceSeg.event) : {}; // mask the original event object if possible
	
			fakeEvent.start = range.start.clone();
			fakeEvent.end = range.end ? range.end.clone() : null;
			fakeEvent.allDay = null; // force it to be freshly computed by normalizeEventRange
			this.view.calendar.normalizeEventRange(fakeEvent);
	
			// this extra className will be useful for differentiating real events from mock events in CSS
			fakeEvent.className = (fakeEvent.className || []).concat('fc-helper');
	
			// if something external is being dragged in, don't render a resizer
			if (!sourceSeg) {
				fakeEvent.editable = false;
			}
	
			return fakeEvent;
		},
	
	
		// Renders a mock event
		renderHelper: function(event, sourceSeg) {
			// subclasses must implement
		},
	
	
		// Unrenders a mock event
		unrenderHelper: function() {
			// subclasses must implement
		},
	
	
		/* Selection
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a visual indication of a selection. Will highlight by default but can be overridden by subclasses.
		renderSelection: function(range) {
			this.renderHighlight(this.selectionRangeToSegs(range));
		},
	
	
		// Unrenders any visual indications of a selection. Will unrender a highlight by default.
		unrenderSelection: function() {
			this.unrenderHighlight();
		},
	
	
		// Given the first and last cells of a selection, returns a range object.
		// Will return something falsy if the selection is invalid (when outside of selectionConstraint for example).
		// Subclasses can override and provide additional data in the range object. Will be passed to renderSelection().
		computeSelection: function(firstCell, lastCell) {
			var dates = [
				firstCell.start,
				firstCell.end,
				lastCell.start,
				lastCell.end
			];
			var range;
	
			dates.sort(compareNumbers); // sorts chronologically. works with Moments
	
			range = {
				start: dates[0].clone(),
				end: dates[3].clone()
			};
	
			if (!this.view.calendar.isSelectionRangeAllowed(range)) {
				return null;
			}
	
			return range;
		},
	
	
		selectionRangeToSegs: function(range) {
			return this.rangeToSegs(range);
		},
	
	
		/* Highlight
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders an emphasis on the given date range. Given an array of segments.
		renderHighlight: function(segs) {
			this.renderFill('highlight', segs);
		},
	
	
		// Unrenders the emphasis on a date range
		unrenderHighlight: function() {
			this.unrenderFill('highlight');
		},
	
	
		// Generates an array of classNames for rendering the highlight. Used by the fill system.
		highlightSegClasses: function() {
			return [ 'fc-highlight' ];
		},
	
	
		/* Fill System (highlight, background events, business hours)
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a set of rectangles over the given segments of time.
		// MUST RETURN a subset of segs, the segs that were actually rendered.
		// Responsible for populating this.elsByFill. TODO: better API for expressing this requirement
		renderFill: function(type, segs) {
			// subclasses must implement
		},
	
	
		// Unrenders a specific type of fill that is currently rendered on the grid
		unrenderFill: function(type) {
			var el = this.elsByFill[type];
	
			if (el) {
				el.remove();
				delete this.elsByFill[type];
			}
		},
	
	
		// Renders and assigns an `el` property for each fill segment. Generic enough to work with different types.
		// Only returns segments that successfully rendered.
		// To be harnessed by renderFill (implemented by subclasses).
		// Analagous to renderFgSegEls.
		renderFillSegEls: function(type, segs) {
			var _this = this;
			var segElMethod = this[type + 'SegEl'];
			var html = '';
			var renderedSegs = [];
			var i;
	
			if (segs.length) {
	
				// build a large concatenation of segment HTML
				for (i = 0; i < segs.length; i++) {
					html += this.fillSegHtml(type, segs[i]);
				}
	
				// Grab individual elements from the combined HTML string. Use each as the default rendering.
				// Then, compute the 'el' for each segment.
				$(html).each(function(i, node) {
					var seg = segs[i];
					var el = $(node);
	
					// allow custom filter methods per-type
					if (segElMethod) {
						el = segElMethod.call(_this, seg, el);
					}
	
					if (el) { // custom filters did not cancel the render
						el = $(el); // allow custom filter to return raw DOM node
	
						// correct element type? (would be bad if a non-TD were inserted into a table for example)
						if (el.is(_this.fillSegTag)) {
							seg.el = el;
							renderedSegs.push(seg);
						}
					}
				});
			}
	
			return renderedSegs;
		},
	
	
		fillSegTag: 'div', // subclasses can override
	
	
		// Builds the HTML needed for one fill segment. Generic enought o work with different types.
		fillSegHtml: function(type, seg) {
	
			// custom hooks per-type
			var classesMethod = this[type + 'SegClasses'];
			var cssMethod = this[type + 'SegCss'];
	
			var classes = classesMethod ? classesMethod.call(this, seg) : [];
			var css = cssToStr(cssMethod ? cssMethod.call(this, seg) : {});
	
			return '<' + this.fillSegTag +
				(classes.length ? ' class="' + classes.join(' ') + '"' : '') +
				(css ? ' style="' + css + '"' : '') +
				' />';
		},
	
	
		/* Generic rendering utilities for subclasses
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a day-of-week header row.
		// TODO: move to another class. not applicable to all Grids
		headHtml: function() {
			return '' +
				'<div class="fc-row ' + this.view.widgetHeaderClass + '">' +
					'<table>' +
						'<thead>' +
							this.rowHtml('head') + // leverages RowRenderer
						'</thead>' +
					'</table>' +
				'</div>';
		},
	
	
		// Used by the `headHtml` method, via RowRenderer, for rendering the HTML of a day-of-week header cell
		// TODO: move to another class. not applicable to all Grids
		headCellHtml: function(cell) {
			var view = this.view;
			var date = cell.start;
	
			return '' +
				'<th class="fc-day-header ' + view.widgetHeaderClass + ' fc-' + dayIDs[date.day()] + '">' +
					htmlEscape(date.format(this.colHeadFormat)) +
				'</th>';
		},
	
	
		// Renders the HTML for a single-day background cell
		bgCellHtml: function(cell) {
			var view = this.view;
			var date = cell.start;
			var classes = this.getDayClasses(date);
	
			classes.unshift('fc-day', view.widgetContentClass);
	
			return '<td class="' + classes.join(' ') + '"' +
				' data-date="' + date.format('YYYY-MM-DD') + '"' + // if date has a time, won't format it
				'></td>';
		},
	
	
		// Computes HTML classNames for a single-day cell
		getDayClasses: function(date) {
			var view = this.view;
			var today = view.calendar.getNow().stripTime();
			var classes = [ 'fc-' + dayIDs[date.day()] ];
	
			if (
				view.intervalDuration.as('months') == 1 &&
				date.month() != view.intervalStart.month()
			) {
				classes.push('fc-other-month');
			}
	
			if (date.isSame(today, 'day')) {
				classes.push(
					'fc-today',
					view.highlightStateClass
				);
			}
			else if (date < today) {
				classes.push('fc-past');
			}
			else {
				classes.push('fc-future');
			}
	
			return classes;
		}
	
	});
	
	;;
	
	/* Event-rendering and event-interaction methods for the abstract Grid class
	----------------------------------------------------------------------------------------------------------------------*/
	
	Grid.mixin({
	
		mousedOverSeg: null, // the segment object the user's mouse is over. null if over nothing
		isDraggingSeg: false, // is a segment being dragged? boolean
		isResizingSeg: false, // is a segment being resized? boolean
		isDraggingExternal: false, // jqui-dragging an external element? boolean
		segs: null, // the event segments currently rendered in the grid
	
	
		// Renders the given events onto the grid
		renderEvents: function(events) {
			var segs = this.eventsToSegs(events);
			var bgSegs = [];
			var fgSegs = [];
			var i, seg;
	
			for (i = 0; i < segs.length; i++) {
				seg = segs[i];
	
				if (isBgEvent(seg.event)) {
					bgSegs.push(seg);
				}
				else {
					fgSegs.push(seg);
				}
			}
	
			// Render each different type of segment.
			// Each function may return a subset of the segs, segs that were actually rendered.
			bgSegs = this.renderBgSegs(bgSegs) || bgSegs;
			fgSegs = this.renderFgSegs(fgSegs) || fgSegs;
	
			this.segs = bgSegs.concat(fgSegs);
		},
	
	
		// Unrenders all events currently rendered on the grid
		unrenderEvents: function() {
			this.triggerSegMouseout(); // trigger an eventMouseout if user's mouse is over an event
	
			this.unrenderFgSegs();
			this.unrenderBgSegs();
	
			this.segs = null;
		},
	
	
		// Retrieves all rendered segment objects currently rendered on the grid
		getEventSegs: function() {
			return this.segs || [];
		},
	
	
		/* Foreground Segment Rendering
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders foreground event segments onto the grid. May return a subset of segs that were rendered.
		renderFgSegs: function(segs) {
			// subclasses must implement
		},
	
	
		// Unrenders all currently rendered foreground segments
		unrenderFgSegs: function() {
			// subclasses must implement
		},
	
	
		// Renders and assigns an `el` property for each foreground event segment.
		// Only returns segments that successfully rendered.
		// A utility that subclasses may use.
		renderFgSegEls: function(segs, disableResizing) {
			var view = this.view;
			var html = '';
			var renderedSegs = [];
			var i;
	
			if (segs.length) { // don't build an empty html string
	
				// build a large concatenation of event segment HTML
				for (i = 0; i < segs.length; i++) {
					html += this.fgSegHtml(segs[i], disableResizing);
				}
	
				// Grab individual elements from the combined HTML string. Use each as the default rendering.
				// Then, compute the 'el' for each segment. An el might be null if the eventRender callback returned false.
				$(html).each(function(i, node) {
					var seg = segs[i];
					var el = view.resolveEventEl(seg.event, $(node));
	
					if (el) {
						el.data('fc-seg', seg); // used by handlers
						seg.el = el;
						renderedSegs.push(seg);
					}
				});
			}
	
			return renderedSegs;
		},
	
	
		// Generates the HTML for the default rendering of a foreground event segment. Used by renderFgSegEls()
		fgSegHtml: function(seg, disableResizing) {
			// subclasses should implement
		},
	
	
		/* Background Segment Rendering
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders the given background event segments onto the grid.
		// Returns a subset of the segs that were actually rendered.
		renderBgSegs: function(segs) {
			return this.renderFill('bgEvent', segs);
		},
	
	
		// Unrenders all the currently rendered background event segments
		unrenderBgSegs: function() {
			this.unrenderFill('bgEvent');
		},
	
	
		// Renders a background event element, given the default rendering. Called by the fill system.
		bgEventSegEl: function(seg, el) {
			return this.view.resolveEventEl(seg.event, el); // will filter through eventRender
		},
	
	
		// Generates an array of classNames to be used for the default rendering of a background event.
		// Called by the fill system.
		bgEventSegClasses: function(seg) {
			var event = seg.event;
			var source = event.source || {};
	
			return [ 'fc-bgevent' ].concat(
				event.className,
				source.className || []
			);
		},
	
	
		// Generates a semicolon-separated CSS string to be used for the default rendering of a background event.
		// Called by the fill system.
		// TODO: consolidate with getEventSkinCss?
		bgEventSegCss: function(seg) {
			var view = this.view;
			var event = seg.event;
			var source = event.source || {};
	
			return {
				'background-color':
					event.backgroundColor ||
					event.color ||
					source.backgroundColor ||
					source.color ||
					view.opt('eventBackgroundColor') ||
					view.opt('eventColor')
			};
		},
	
	
		// Generates an array of classNames to be used for the rendering business hours overlay. Called by the fill system.
		businessHoursSegClasses: function(seg) {
			return [ 'fc-nonbusiness', 'fc-bgevent' ];
		},
	
	
		/* Handlers
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Attaches event-element-related handlers to the container element and leverage bubbling
		bindSegHandlers: function() {
			var _this = this;
			var view = this.view;
	
			$.each(
				{
					mouseenter: function(seg, ev) {
						_this.triggerSegMouseover(seg, ev);
					},
					mouseleave: function(seg, ev) {
						_this.triggerSegMouseout(seg, ev);
					},
					click: function(seg, ev) {
						return view.trigger('eventClick', this, seg.event, ev); // can return `false` to cancel
					},
					mousedown: function(seg, ev) {
						if ($(ev.target).is('.fc-resizer') && view.isEventResizable(seg.event)) {
							_this.segResizeMousedown(seg, ev, $(ev.target).is('.fc-start-resizer'));
						}
						else if (view.isEventDraggable(seg.event)) {
							_this.segDragMousedown(seg, ev);
						}
					}
				},
				function(name, func) {
					// attach the handler to the container element and only listen for real event elements via bubbling
					_this.el.on(name, '.fc-event-container > *', function(ev) {
						var seg = $(this).data('fc-seg'); // grab segment data. put there by View::renderEvents
	
						// only call the handlers if there is not a drag/resize in progress
						if (seg && !_this.isDraggingSeg && !_this.isResizingSeg) {
							return func.call(this, seg, ev); // `this` will be the event element
						}
					});
				}
			);
		},
	
	
		// Updates internal state and triggers handlers for when an event element is moused over
		triggerSegMouseover: function(seg, ev) {
			if (!this.mousedOverSeg) {
				this.mousedOverSeg = seg;
				this.view.trigger('eventMouseover', seg.el[0], seg.event, ev);
			}
		},
	
	
		// Updates internal state and triggers handlers for when an event element is moused out.
		// Can be given no arguments, in which case it will mouseout the segment that was previously moused over.
		triggerSegMouseout: function(seg, ev) {
			ev = ev || {}; // if given no args, make a mock mouse event
	
			if (this.mousedOverSeg) {
				seg = seg || this.mousedOverSeg; // if given no args, use the currently moused-over segment
				this.mousedOverSeg = null;
				this.view.trigger('eventMouseout', seg.el[0], seg.event, ev);
			}
		},
	
	
		/* Event Dragging
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Called when the user does a mousedown on an event, which might lead to dragging.
		// Generic enough to work with any type of Grid.
		segDragMousedown: function(seg, ev) {
			var _this = this;
			var view = this.view;
			var calendar = view.calendar;
			var el = seg.el;
			var event = seg.event;
			var dropLocation;
	
			// A clone of the original element that will move with the mouse
			var mouseFollower = new MouseFollower(seg.el, {
				parentEl: view.el,
				opacity: view.opt('dragOpacity'),
				revertDuration: view.opt('dragRevertDuration'),
				zIndex: 2 // one above the .fc-view
			});
	
			// Tracks mouse movement over the *view's* coordinate map. Allows dragging and dropping between subcomponents
			// of the view.
			var dragListener = new CellDragListener(view.coordMap, {
				distance: 5,
				scroll: view.opt('dragScroll'),
				subjectEl: el,
				subjectCenter: true,
				listenStart: function(ev) {
					mouseFollower.hide(); // don't show until we know this is a real drag
					mouseFollower.start(ev);
				},
				dragStart: function(ev) {
					_this.triggerSegMouseout(seg, ev); // ensure a mouseout on the manipulated event has been reported
					_this.segDragStart(seg, ev);
					view.hideEvent(event); // hide all event segments. our mouseFollower will take over
				},
				cellOver: function(cell, isOrig, origCell) {
	
					// starting cell could be forced (DayGrid.limit)
					if (seg.cell) {
						origCell = seg.cell;
					}
	
					dropLocation = _this.computeEventDrop(origCell, cell, event);
	
					if (dropLocation && !calendar.isEventRangeAllowed(dropLocation, event)) {
						disableCursor();
						dropLocation = null;
					}
	
					// if a valid drop location, have the subclass render a visual indication
					if (dropLocation && view.renderDrag(dropLocation, seg)) {
						mouseFollower.hide(); // if the subclass is already using a mock event "helper", hide our own
					}
					else {
						mouseFollower.show(); // otherwise, have the helper follow the mouse (no snapping)
					}
	
					if (isOrig) {
						dropLocation = null; // needs to have moved cells to be a valid drop
					}
				},
				cellOut: function() { // called before mouse moves to a different cell OR moved out of all cells
					view.unrenderDrag(); // unrender whatever was done in renderDrag
					mouseFollower.show(); // show in case we are moving out of all cells
					dropLocation = null;
				},
				cellDone: function() { // Called after a cellOut OR before a dragStop
					enableCursor();
				},
				dragStop: function(ev) {
					// do revert animation if hasn't changed. calls a callback when finished (whether animation or not)
					mouseFollower.stop(!dropLocation, function() {
						view.unrenderDrag();
						view.showEvent(event);
						_this.segDragStop(seg, ev);
	
						if (dropLocation) {
							view.reportEventDrop(event, dropLocation, this.largeUnit, el, ev);
						}
					});
				},
				listenStop: function() {
					mouseFollower.stop(); // put in listenStop in case there was a mousedown but the drag never started
				}
			});
	
			dragListener.mousedown(ev); // start listening, which will eventually lead to a dragStart
		},
	
	
		// Called before event segment dragging starts
		segDragStart: function(seg, ev) {
			this.isDraggingSeg = true;
			this.view.trigger('eventDragStart', seg.el[0], seg.event, ev, {}); // last argument is jqui dummy
		},
	
	
		// Called after event segment dragging stops
		segDragStop: function(seg, ev) {
			this.isDraggingSeg = false;
			this.view.trigger('eventDragStop', seg.el[0], seg.event, ev, {}); // last argument is jqui dummy
		},
	
	
		// Given the cell an event drag began, and the cell event was dropped, calculates the new start/end/allDay
		// values for the event. Subclasses may override and set additional properties to be used by renderDrag.
		// A falsy returned value indicates an invalid drop.
		computeEventDrop: function(startCell, endCell, event) {
			var calendar = this.view.calendar;
			var dragStart = startCell.start;
			var dragEnd = endCell.start;
			var delta;
			var dropLocation;
	
			if (dragStart.hasTime() === dragEnd.hasTime()) {
				delta = this.diffDates(dragEnd, dragStart);
	
				// if an all-day event was in a timed area and it was dragged to a different time,
				// guarantee an end and adjust start/end to have times
				if (event.allDay && durationHasTime(delta)) {
					dropLocation = {
						start: event.start.clone(),
						end: calendar.getEventEnd(event), // will be an ambig day
						allDay: false // for normalizeEventRangeTimes
					};
					calendar.normalizeEventRangeTimes(dropLocation);
				}
				// othewise, work off existing values
				else {
					dropLocation = {
						start: event.start.clone(),
						end: event.end ? event.end.clone() : null,
						allDay: event.allDay // keep it the same
					};
				}
	
				dropLocation.start.add(delta);
				if (dropLocation.end) {
					dropLocation.end.add(delta);
				}
			}
			else {
				// if switching from day <-> timed, start should be reset to the dropped date, and the end cleared
				dropLocation = {
					start: dragEnd.clone(),
					end: null, // end should be cleared
					allDay: !dragEnd.hasTime()
				};
			}
	
			return dropLocation;
		},
	
	
		// Utility for apply dragOpacity to a jQuery set
		applyDragOpacity: function(els) {
			var opacity = this.view.opt('dragOpacity');
	
			if (opacity != null) {
				els.each(function(i, node) {
					// Don't use jQuery (will set an IE filter), do it the old fashioned way.
					// In IE8, a helper element will disappears if there's a filter.
					node.style.opacity = opacity;
				});
			}
		},
	
	
		/* External Element Dragging
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Called when a jQuery UI drag is initiated anywhere in the DOM
		externalDragStart: function(ev, ui) {
			var view = this.view;
			var el;
			var accept;
	
			if (view.opt('droppable')) { // only listen if this setting is on
				el = $((ui ? ui.item : null) || ev.target);
	
				// Test that the dragged element passes the dropAccept selector or filter function.
				// FYI, the default is "*" (matches all)
				accept = view.opt('dropAccept');
				if ($.isFunction(accept) ? accept.call(el[0], el) : el.is(accept)) {
					if (!this.isDraggingExternal) { // prevent double-listening if fired twice
						this.listenToExternalDrag(el, ev, ui);
					}
				}
			}
		},
	
	
		// Called when a jQuery UI drag starts and it needs to be monitored for cell dropping
		listenToExternalDrag: function(el, ev, ui) {
			var _this = this;
			var meta = getDraggedElMeta(el); // extra data about event drop, including possible event to create
			var dragListener;
			var dropLocation; // a null value signals an unsuccessful drag
	
			// listener that tracks mouse movement over date-associated pixel regions
			dragListener = new CellDragListener(this.coordMap, {
				listenStart: function() {
					_this.isDraggingExternal = true;
				},
				cellOver: function(cell) {
					dropLocation = _this.computeExternalDrop(cell, meta);
					if (dropLocation) {
						_this.renderDrag(dropLocation); // called without a seg parameter
					}
					else { // invalid drop cell
						disableCursor();
					}
				},
				cellOut: function() {
					dropLocation = null; // signal unsuccessful
					_this.unrenderDrag();
					enableCursor();
				},
				dragStop: function() {
					_this.unrenderDrag();
					enableCursor();
	
					if (dropLocation) { // element was dropped on a valid date/time cell
						_this.view.reportExternalDrop(meta, dropLocation, el, ev, ui);
					}
				},
				listenStop: function() {
					_this.isDraggingExternal = false;
				}
			});
	
			dragListener.startDrag(ev); // start listening immediately
		},
	
	
		// Given a cell to be dropped upon, and misc data associated with the jqui drag (guaranteed to be a plain object),
		// returns start/end dates for the event that would result from the hypothetical drop. end might be null.
		// Returning a null value signals an invalid drop cell.
		computeExternalDrop: function(cell, meta) {
			var dropLocation = {
				start: cell.start.clone(),
				end: null
			};
	
			// if dropped on an all-day cell, and element's metadata specified a time, set it
			if (meta.startTime && !dropLocation.start.hasTime()) {
				dropLocation.start.time(meta.startTime);
			}
	
			if (meta.duration) {
				dropLocation.end = dropLocation.start.clone().add(meta.duration);
			}
	
			if (!this.view.calendar.isExternalDropRangeAllowed(dropLocation, meta.eventProps)) {
				return null;
			}
	
			return dropLocation;
		},
	
	
	
		/* Drag Rendering (for both events and an external elements)
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a visual indication of an event or external element being dragged.
		// `dropLocation` contains hypothetical start/end/allDay values the event would have if dropped. end can be null.
		// `seg` is the internal segment object that is being dragged. If dragging an external element, `seg` is null.
		// A truthy returned value indicates this method has rendered a helper element.
		renderDrag: function(dropLocation, seg) {
			// subclasses must implement
		},
	
	
		// Unrenders a visual indication of an event or external element being dragged
		unrenderDrag: function() {
			// subclasses must implement
		},
	
	
		/* Resizing
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Called when the user does a mousedown on an event's resizer, which might lead to resizing.
		// Generic enough to work with any type of Grid.
		segResizeMousedown: function(seg, ev, isStart) {
			var _this = this;
			var view = this.view;
			var calendar = view.calendar;
			var el = seg.el;
			var event = seg.event;
			var eventEnd = calendar.getEventEnd(event);
			var dragListener;
			var resizeLocation; // falsy if invalid resize
	
			// Tracks mouse movement over the *grid's* coordinate map
			dragListener = new CellDragListener(this.coordMap, {
				distance: 5,
				scroll: view.opt('dragScroll'),
				subjectEl: el,
				dragStart: function(ev) {
					_this.triggerSegMouseout(seg, ev); // ensure a mouseout on the manipulated event has been reported
					_this.segResizeStart(seg, ev);
				},
				cellOver: function(cell, isOrig, origCell) {
					resizeLocation = isStart ?
						_this.computeEventStartResize(origCell, cell, event) :
						_this.computeEventEndResize(origCell, cell, event);
	
					if (resizeLocation) {
						if (!calendar.isEventRangeAllowed(resizeLocation, event)) {
							disableCursor();
							resizeLocation = null;
						}
						// no change? (TODO: how does this work with timezones?)
						else if (resizeLocation.start.isSame(event.start) && resizeLocation.end.isSame(eventEnd)) {
							resizeLocation = null;
						}
					}
	
					if (resizeLocation) {
						view.hideEvent(event);
						_this.renderEventResize(resizeLocation, seg);
					}
				},
				cellOut: function() { // called before mouse moves to a different cell OR moved out of all cells
					resizeLocation = null;
				},
				cellDone: function() { // resets the rendering to show the original event
					_this.unrenderEventResize();
					view.showEvent(event);
					enableCursor();
				},
				dragStop: function(ev) {
					_this.segResizeStop(seg, ev);
	
					if (resizeLocation) { // valid date to resize to?
						view.reportEventResize(event, resizeLocation, this.largeUnit, el, ev);
					}
				}
			});
	
			dragListener.mousedown(ev); // start listening, which will eventually lead to a dragStart
		},
	
	
		// Called before event segment resizing starts
		segResizeStart: function(seg, ev) {
			this.isResizingSeg = true;
			this.view.trigger('eventResizeStart', seg.el[0], seg.event, ev, {}); // last argument is jqui dummy
		},
	
	
		// Called after event segment resizing stops
		segResizeStop: function(seg, ev) {
			this.isResizingSeg = false;
			this.view.trigger('eventResizeStop', seg.el[0], seg.event, ev, {}); // last argument is jqui dummy
		},
	
	
		// Returns new date-information for an event segment being resized from its start
		computeEventStartResize: function(startCell, endCell, event) {
			return this.computeEventResize('start', startCell, endCell, event);
		},
	
	
		// Returns new date-information for an event segment being resized from its end
		computeEventEndResize: function(startCell, endCell, event) {
			return this.computeEventResize('end', startCell, endCell, event);
		},
	
	
		// Returns new date-information for an event segment being resized from its start OR end
		// `type` is either 'start' or 'end'
		computeEventResize: function(type, startCell, endCell, event) {
			var calendar = this.view.calendar;
			var delta = this.diffDates(endCell[type], startCell[type]);
			var range;
			var defaultDuration;
	
			// build original values to work from, guaranteeing a start and end
			range = {
				start: event.start.clone(),
				end: calendar.getEventEnd(event),
				allDay: event.allDay
			};
	
			// if an all-day event was in a timed area and was resized to a time, adjust start/end to have times
			if (range.allDay && durationHasTime(delta)) {
				range.allDay = false;
				calendar.normalizeEventRangeTimes(range);
			}
	
			range[type].add(delta); // apply delta to start or end
	
			// if the event was compressed too small, find a new reasonable duration for it
			if (!range.start.isBefore(range.end)) {
	
				defaultDuration = event.allDay ?
					calendar.defaultAllDayEventDuration :
					calendar.defaultTimedEventDuration;
	
				// between the cell's duration and the event's default duration, use the smaller of the two.
				// example: if year-length slots, and compressed to one slot, we don't want the event to be a year long
				if (this.cellDuration && this.cellDuration < defaultDuration) {
					defaultDuration = this.cellDuration;
				}
	
				if (type == 'start') { // resizing the start?
					range.start = range.end.clone().subtract(defaultDuration);
				}
				else { // resizing the end?
					range.end = range.start.clone().add(defaultDuration);
				}
			}
	
			return range;
		},
	
	
		// Renders a visual indication of an event being resized.
		// `range` has the updated dates of the event. `seg` is the original segment object involved in the drag.
		renderEventResize: function(range, seg) {
			// subclasses must implement
		},
	
	
		// Unrenders a visual indication of an event being resized.
		unrenderEventResize: function() {
			// subclasses must implement
		},
	
	
		/* Rendering Utils
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Compute the text that should be displayed on an event's element.
		// `range` can be the Event object itself, or something range-like, with at least a `start`.
		// If event times are disabled, or the event has no time, will return a blank string.
		// If not specified, formatStr will default to the eventTimeFormat setting,
		// and displayEnd will default to the displayEventEnd setting.
		getEventTimeText: function(range, formatStr, displayEnd) {
	
			if (formatStr == null) {
				formatStr = this.eventTimeFormat;
			}
	
			if (displayEnd == null) {
				displayEnd = this.displayEventEnd;
			}
	
			if (this.displayEventTime && range.start.hasTime()) {
				if (displayEnd && range.end) {
					return this.view.formatRange(range, formatStr);
				}
				else {
					return range.start.format(formatStr);
				}
			}
	
			return '';
		},
	
	
		// Generic utility for generating the HTML classNames for an event segment's element
		getSegClasses: function(seg, isDraggable, isResizable) {
			var event = seg.event;
			var classes = [
				'fc-event',
				seg.isStart ? 'fc-start' : 'fc-not-start',
				seg.isEnd ? 'fc-end' : 'fc-not-end'
			].concat(
				event.className,
				event.source ? event.source.className : []
			);
	
			if (isDraggable) {
				classes.push('fc-draggable');
			}
			if (isResizable) {
				classes.push('fc-resizable');
			}
	
			return classes;
		},
	
	
		// Utility for generating event skin-related CSS properties
		getEventSkinCss: function(event) {
			var view = this.view;
			var source = event.source || {};
			var eventColor = event.color;
			var sourceColor = source.color;
			var optionColor = view.opt('eventColor');
	
			return {
				'background-color':
					event.backgroundColor ||
					eventColor ||
					source.backgroundColor ||
					sourceColor ||
					view.opt('eventBackgroundColor') ||
					optionColor,
				'border-color':
					event.borderColor ||
					eventColor ||
					source.borderColor ||
					sourceColor ||
					view.opt('eventBorderColor') ||
					optionColor,
				color:
					event.textColor ||
					source.textColor ||
					view.opt('eventTextColor')
			};
		},
	
	
		/* Converting events -> ranges -> segs
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Converts an array of event objects into an array of event segment objects.
		// A custom `rangeToSegsFunc` may be given for arbitrarily slicing up events.
		// Doesn't guarantee an order for the resulting array.
		eventsToSegs: function(events, rangeToSegsFunc) {
			var eventRanges = this.eventsToRanges(events);
			var segs = [];
			var i;
	
			for (i = 0; i < eventRanges.length; i++) {
				segs.push.apply(
					segs,
					this.eventRangeToSegs(eventRanges[i], rangeToSegsFunc)
				);
			}
	
			return segs;
		},
	
	
		// Converts an array of events into an array of "range" objects.
		// A "range" object is a plain object with start/end properties denoting the time it covers. Also an event property.
		// For "normal" events, this will be identical to the event's start/end, but for "inverse-background" events,
		// will create an array of ranges that span the time *not* covered by the given event.
		// Doesn't guarantee an order for the resulting array.
		eventsToRanges: function(events) {
			var _this = this;
			var eventsById = groupEventsById(events);
			var ranges = [];
	
			// group by ID so that related inverse-background events can be rendered together
			$.each(eventsById, function(id, eventGroup) {
				if (eventGroup.length) {
					ranges.push.apply(
						ranges,
						isInverseBgEvent(eventGroup[0]) ?
							_this.eventsToInverseRanges(eventGroup) :
							_this.eventsToNormalRanges(eventGroup)
					);
				}
			});
	
			return ranges;
		},
	
	
		// Converts an array of "normal" events (not inverted rendering) into a parallel array of ranges
		eventsToNormalRanges: function(events) {
			var calendar = this.view.calendar;
			var ranges = [];
			var i, event;
			var eventStart, eventEnd;
	
			for (i = 0; i < events.length; i++) {
				event = events[i];
	
				// make copies and normalize by stripping timezone
				eventStart = event.start.clone().stripZone();
				eventEnd = calendar.getEventEnd(event).stripZone();
	
				ranges.push({
					event: event,
					start: eventStart,
					end: eventEnd,
					eventStartMS: +eventStart,
					eventDurationMS: eventEnd - eventStart
				});
			}
	
			return ranges;
		},
	
	
		// Converts an array of events, with inverse-background rendering, into an array of range objects.
		// The range objects will cover all the time NOT covered by the events.
		eventsToInverseRanges: function(events) {
			var view = this.view;
			var viewStart = view.start.clone().stripZone(); // normalize timezone
			var viewEnd = view.end.clone().stripZone(); // normalize timezone
			var normalRanges = this.eventsToNormalRanges(events); // will give us normalized dates we can use w/o copies
			var inverseRanges = [];
			var event0 = events[0]; // assign this to each range's `.event`
			var start = viewStart; // the end of the previous range. the start of the new range
			var i, normalRange;
	
			// ranges need to be in order. required for our date-walking algorithm
			normalRanges.sort(compareNormalRanges);
	
			for (i = 0; i < normalRanges.length; i++) {
				normalRange = normalRanges[i];
	
				// add the span of time before the event (if there is any)
				if (normalRange.start > start) { // compare millisecond time (skip any ambig logic)
					inverseRanges.push({
						event: event0,
						start: start,
						end: normalRange.start
					});
				}
	
				start = normalRange.end;
			}
	
			// add the span of time after the last event (if there is any)
			if (start < viewEnd) { // compare millisecond time (skip any ambig logic)
				inverseRanges.push({
					event: event0,
					start: start,
					end: viewEnd
				});
			}
	
			return inverseRanges;
		},
	
	
		// Slices the given event range into one or more segment objects.
		// A `rangeToSegsFunc` custom slicing function can be given.
		eventRangeToSegs: function(eventRange, rangeToSegsFunc) {
			var segs;
			var i, seg;
	
			eventRange = this.view.calendar.ensureVisibleEventRange(eventRange);
	
			if (rangeToSegsFunc) {
				segs = rangeToSegsFunc(eventRange);
			}
			else {
				segs = this.rangeToSegs(eventRange); // defined by the subclass
			}
	
			for (i = 0; i < segs.length; i++) {
				seg = segs[i];
				seg.event = eventRange.event;
				seg.eventStartMS = eventRange.eventStartMS;
				seg.eventDurationMS = eventRange.eventDurationMS;
			}
	
			return segs;
		},
	
	
		sortSegs: function(segs) {
			segs.sort(proxy(this, 'compareSegs'));
		},
	
	
		// A cmp function for determining which segments should take visual priority
		// DOES NOT WORK ON INVERTED BACKGROUND EVENTS because they have no eventStartMS/eventDurationMS
		compareSegs: function(seg1, seg2) {
			return seg1.eventStartMS - seg2.eventStartMS || // earlier events go first
				seg2.eventDurationMS - seg1.eventDurationMS || // tie? longer events go first
				seg2.event.allDay - seg1.event.allDay || // tie? put all-day events first (booleans cast to 0/1)
				compareByFieldSpecs(seg1.event, seg2.event, this.view.eventOrderSpecs);
		}
	
	});
	
	
	/* Utilities
	----------------------------------------------------------------------------------------------------------------------*/
	
	
	function isBgEvent(event) { // returns true if background OR inverse-background
		var rendering = getEventRendering(event);
		return rendering === 'background' || rendering === 'inverse-background';
	}
	
	
	function isInverseBgEvent(event) {
		return getEventRendering(event) === 'inverse-background';
	}
	
	
	function getEventRendering(event) {
		return firstDefined((event.source || {}).rendering, event.rendering);
	}
	
	
	function groupEventsById(events) {
		var eventsById = {};
		var i, event;
	
		for (i = 0; i < events.length; i++) {
			event = events[i];
			(eventsById[event._id] || (eventsById[event._id] = [])).push(event);
		}
	
		return eventsById;
	}
	
	
	// A cmp function for determining which non-inverted "ranges" (see above) happen earlier
	function compareNormalRanges(range1, range2) {
		return range1.eventStartMS - range2.eventStartMS; // earlier ranges go first
	}
	
	
	/* External-Dragging-Element Data
	----------------------------------------------------------------------------------------------------------------------*/
	
	// Require all HTML5 data-* attributes used by FullCalendar to have this prefix.
	// A value of '' will query attributes like data-event. A value of 'fc' will query attributes like data-fc-event.
	fc.dataAttrPrefix = '';
	
	// Given a jQuery element that might represent a dragged FullCalendar event, returns an intermediate data structure
	// to be used for Event Object creation.
	// A defined `.eventProps`, even when empty, indicates that an event should be created.
	function getDraggedElMeta(el) {
		var prefix = fc.dataAttrPrefix;
		var eventProps; // properties for creating the event, not related to date/time
		var startTime; // a Duration
		var duration;
		var stick;
	
		if (prefix) { prefix += '-'; }
		eventProps = el.data(prefix + 'event') || null;
	
		if (eventProps) {
			if (typeof eventProps === 'object') {
				eventProps = $.extend({}, eventProps); // make a copy
			}
			else { // something like 1 or true. still signal event creation
				eventProps = {};
			}
	
			// pluck special-cased date/time properties
			startTime = eventProps.start;
			if (startTime == null) { startTime = eventProps.time; } // accept 'time' as well
			duration = eventProps.duration;
			stick = eventProps.stick;
			delete eventProps.start;
			delete eventProps.time;
			delete eventProps.duration;
			delete eventProps.stick;
		}
	
		// fallback to standalone attribute values for each of the date/time properties
		if (startTime == null) { startTime = el.data(prefix + 'start'); }
		if (startTime == null) { startTime = el.data(prefix + 'time'); } // accept 'time' as well
		if (duration == null) { duration = el.data(prefix + 'duration'); }
		if (stick == null) { stick = el.data(prefix + 'stick'); }
	
		// massage into correct data types
		startTime = startTime != null ? moment.duration(startTime) : null;
		duration = duration != null ? moment.duration(duration) : null;
		stick = Boolean(stick);
	
		return { eventProps: eventProps, startTime: startTime, duration: duration, stick: stick };
	}
	
	
	;;
	
	/* A component that renders a grid of whole-days that runs horizontally. There can be multiple rows, one per week.
	----------------------------------------------------------------------------------------------------------------------*/
	
	var DayGrid = Grid.extend({
	
		numbersVisible: false, // should render a row for day/week numbers? set by outside view. TODO: make internal
		bottomCoordPadding: 0, // hack for extending the hit area for the last row of the coordinate grid
		breakOnWeeks: null, // should create a new row for each week? set by outside view
	
		cellDates: null, // flat chronological array of each cell's dates
		dayToCellOffsets: null, // maps days offsets from grid's start date, to cell offsets
	
		rowEls: null, // set of fake row elements
		dayEls: null, // set of whole-day elements comprising the row's background
		helperEls: null, // set of cell skeleton elements for rendering the mock event "helper"
	
	
		constructor: function() {
			Grid.apply(this, arguments);
	
			this.cellDuration = moment.duration(1, 'day'); // for Grid system
		},
	
	
		// Renders the rows and columns into the component's `this.el`, which should already be assigned.
		// isRigid determins whether the individual rows should ignore the contents and be a constant height.
		// Relies on the view's colCnt and rowCnt. In the future, this component should probably be self-sufficient.
		renderDates: function(isRigid) {
			var view = this.view;
			var rowCnt = this.rowCnt;
			var colCnt = this.colCnt;
			var cellCnt = rowCnt * colCnt;
			var html = '';
			var row;
			var i, cell;
	
			for (row = 0; row < rowCnt; row++) {
				html += this.dayRowHtml(row, isRigid);
			}
			this.el.html(html);
	
			this.rowEls = this.el.find('.fc-row');
			this.dayEls = this.el.find('.fc-day');
	
			// trigger dayRender with each cell's element
			for (i = 0; i < cellCnt; i++) {
				cell = this.getCell(i);
				view.trigger('dayRender', null, cell.start, this.dayEls.eq(i));
			}
		},
	
	
		unrenderDates: function() {
			this.removeSegPopover();
		},
	
	
		renderBusinessHours: function() {
			var events = this.view.calendar.getBusinessHoursEvents(true); // wholeDay=true
			var segs = this.eventsToSegs(events);
	
			this.renderFill('businessHours', segs, 'bgevent');
		},
	
	
		// Generates the HTML for a single row. `row` is the row number.
		dayRowHtml: function(row, isRigid) {
			var view = this.view;
			var classes = [ 'fc-row', 'fc-week', view.widgetContentClass ];
	
			if (isRigid) {
				classes.push('fc-rigid');
			}
	
			return '' +
				'<div class="' + classes.join(' ') + '">' +
					'<div class="fc-bg">' +
						'<table>' +
							this.rowHtml('day', row) + // leverages RowRenderer. calls dayCellHtml()
						'</table>' +
					'</div>' +
					'<div class="fc-content-skeleton">' +
						'<table>' +
							(this.numbersVisible ?
								'<thead>' +
									this.rowHtml('number', row) + // leverages RowRenderer. View will define render method
								'</thead>' :
								''
								) +
						'</table>' +
					'</div>' +
				'</div>';
		},
	
	
		// Renders the HTML for a whole-day cell. Will eventually end up in the day-row's background.
		// We go through a 'day' row type instead of just doing a 'bg' row type so that the View can do custom rendering
		// specifically for whole-day rows, whereas a 'bg' might also be used for other purposes (TimeGrid bg for example).
		dayCellHtml: function(cell) {
			return this.bgCellHtml(cell);
		},
	
	
		/* Options
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Computes a default column header formatting string if `colFormat` is not explicitly defined
		computeColHeadFormat: function() {
			if (this.rowCnt > 1) { // more than one week row. day numbers will be in each cell
				return 'ddd'; // "Sat"
			}
			else if (this.colCnt > 1) { // multiple days, so full single date string WON'T be in title text
				return this.view.opt('dayOfMonthFormat'); // "Sat 12/10"
			}
			else { // single day, so full single date string will probably be in title text
				return 'dddd'; // "Saturday"
			}
		},
	
	
		// Computes a default event time formatting string if `timeFormat` is not explicitly defined
		computeEventTimeFormat: function() {
			return this.view.opt('extraSmallTimeFormat'); // like "6p" or "6:30p"
		},
	
	
		// Computes a default `displayEventEnd` value if one is not expliclty defined
		computeDisplayEventEnd: function() {
			return this.colCnt == 1; // we'll likely have space if there's only one day
		},
	
	
		/* Cell System
		------------------------------------------------------------------------------------------------------------------*/
	
	
		rangeUpdated: function() {
			var cellDates;
			var firstDay;
			var rowCnt;
			var colCnt;
	
			this.updateCellDates(); // populates cellDates and dayToCellOffsets
			cellDates = this.cellDates;
	
			if (this.breakOnWeeks) {
				// count columns until the day-of-week repeats
				firstDay = cellDates[0].day();
				for (colCnt = 1; colCnt < cellDates.length; colCnt++) {
					if (cellDates[colCnt].day() == firstDay) {
						break;
					}
				}
				rowCnt = Math.ceil(cellDates.length / colCnt);
			}
			else {
				rowCnt = 1;
				colCnt = cellDates.length;
			}
	
			this.rowCnt = rowCnt;
			this.colCnt = colCnt;
		},
	
	
		// Populates cellDates and dayToCellOffsets
		updateCellDates: function() {
			var view = this.view;
			var date = this.start.clone();
			var dates = [];
			var offset = -1;
			var offsets = [];
	
			while (date.isBefore(this.end)) { // loop each day from start to end
				if (view.isHiddenDay(date)) {
					offsets.push(offset + 0.5); // mark that it's between offsets
				}
				else {
					offset++;
					offsets.push(offset);
					dates.push(date.clone());
				}
				date.add(1, 'days');
			}
	
			this.cellDates = dates;
			this.dayToCellOffsets = offsets;
		},
	
	
		// Given a cell object, generates its start date. Returns a reference-free copy.
		computeCellDate: function(cell) {
			var colCnt = this.colCnt;
			var index = cell.row * colCnt + (this.isRTL ? colCnt - cell.col - 1 : cell.col);
	
			return this.cellDates[index].clone();
		},
	
	
		// Retrieves the element representing the given row
		getRowEl: function(row) {
			return this.rowEls.eq(row);
		},
	
	
		// Retrieves the element representing the given column
		getColEl: function(col) {
			return this.dayEls.eq(col);
		},
	
	
		// Gets the whole-day element associated with the cell
		getCellDayEl: function(cell) {
			return this.dayEls.eq(cell.row * this.colCnt + cell.col);
		},
	
	
		// Overrides Grid's method for when row coordinates are computed
		computeRowCoords: function() {
			var rowCoords = Grid.prototype.computeRowCoords.call(this); // call the super-method
	
			// hack for extending last row (used by AgendaView)
			rowCoords[rowCoords.length - 1].bottom += this.bottomCoordPadding;
	
			return rowCoords;
		},
	
	
		/* Dates
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Slices up a date range by row into an array of segments
		rangeToSegs: function(range) {
			var isRTL = this.isRTL;
			var rowCnt = this.rowCnt;
			var colCnt = this.colCnt;
			var segs = [];
			var first, last; // inclusive cell-offset range for given range
			var row;
			var rowFirst, rowLast; // inclusive cell-offset range for current row
			var isStart, isEnd;
			var segFirst, segLast; // inclusive cell-offset range for segment
			var seg;
	
			range = this.view.computeDayRange(range); // make whole-day range, considering nextDayThreshold
			first = this.dateToCellOffset(range.start);
			last = this.dateToCellOffset(range.end.subtract(1, 'days')); // offset of inclusive end date
	
			for (row = 0; row < rowCnt; row++) {
				rowFirst = row * colCnt;
				rowLast = rowFirst + colCnt - 1;
	
				// intersect segment's offset range with the row's
				segFirst = Math.max(rowFirst, first);
				segLast = Math.min(rowLast, last);
	
				// deal with in-between indices
				segFirst = Math.ceil(segFirst); // in-between starts round to next cell
				segLast = Math.floor(segLast); // in-between ends round to prev cell
	
				if (segFirst <= segLast) { // was there any intersection with the current row?
	
					// must be matching integers to be the segment's start/end
					isStart = segFirst === first;
					isEnd = segLast === last;
	
					// translate offsets to be relative to start-of-row
					segFirst -= rowFirst;
					segLast -= rowFirst;
	
					seg = { row: row, isStart: isStart, isEnd: isEnd };
					if (isRTL) {
						seg.leftCol = colCnt - segLast - 1;
						seg.rightCol = colCnt - segFirst - 1;
					}
					else {
						seg.leftCol = segFirst;
						seg.rightCol = segLast;
					}
					segs.push(seg);
				}
			}
	
			return segs;
		},
	
	
		// Given a date, returns its chronolocial cell-offset from the first cell of the grid.
		// If the date lies between cells (because of hiddenDays), returns a floating-point value between offsets.
		// If before the first offset, returns a negative number.
		// If after the last offset, returns an offset past the last cell offset.
		// Only works for *start* dates of cells. Will not work for exclusive end dates for cells.
		dateToCellOffset: function(date) {
			var offsets = this.dayToCellOffsets;
			var day = date.diff(this.start, 'days');
	
			if (day < 0) {
				return offsets[0] - 1;
			}
			else if (day >= offsets.length) {
				return offsets[offsets.length - 1] + 1;
			}
			else {
				return offsets[day];
			}
		},
	
	
		/* Event Drag Visualization
		------------------------------------------------------------------------------------------------------------------*/
		// TODO: move to DayGrid.event, similar to what we did with Grid's drag methods
	
	
		// Renders a visual indication of an event or external element being dragged.
		// The dropLocation's end can be null. seg can be null. See Grid::renderDrag for more info.
		renderDrag: function(dropLocation, seg) {
	
			// always render a highlight underneath
			this.renderHighlight(this.eventRangeToSegs(dropLocation));
	
			// if a segment from the same calendar but another component is being dragged, render a helper event
			if (seg && !seg.el.closest(this.el).length) {
	
				this.renderRangeHelper(dropLocation, seg);
				this.applyDragOpacity(this.helperEls);
	
				return true; // a helper has been rendered
			}
		},
	
	
		// Unrenders any visual indication of a hovering event
		unrenderDrag: function() {
			this.unrenderHighlight();
			this.unrenderHelper();
		},
	
	
		/* Event Resize Visualization
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a visual indication of an event being resized
		renderEventResize: function(range, seg) {
			this.renderHighlight(this.eventRangeToSegs(range));
			this.renderRangeHelper(range, seg);
		},
	
	
		// Unrenders a visual indication of an event being resized
		unrenderEventResize: function() {
			this.unrenderHighlight();
			this.unrenderHelper();
		},
	
	
		/* Event Helper
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a mock "helper" event. `sourceSeg` is the associated internal segment object. It can be null.
		renderHelper: function(event, sourceSeg) {
			var helperNodes = [];
			var segs = this.eventsToSegs([ event ]);
			var rowStructs;
	
			segs = this.renderFgSegEls(segs); // assigns each seg's el and returns a subset of segs that were rendered
			rowStructs = this.renderSegRows(segs);
	
			// inject each new event skeleton into each associated row
			this.rowEls.each(function(row, rowNode) {
				var rowEl = $(rowNode); // the .fc-row
				var skeletonEl = $('<div class="fc-helper-skeleton"><table/></div>'); // will be absolutely positioned
				var skeletonTop;
	
				// If there is an original segment, match the top position. Otherwise, put it at the row's top level
				if (sourceSeg && sourceSeg.row === row) {
					skeletonTop = sourceSeg.el.position().top;
				}
				else {
					skeletonTop = rowEl.find('.fc-content-skeleton tbody').position().top;
				}
	
				skeletonEl.css('top', skeletonTop)
					.find('table')
						.append(rowStructs[row].tbodyEl);
	
				rowEl.append(skeletonEl);
				helperNodes.push(skeletonEl[0]);
			});
	
			this.helperEls = $(helperNodes); // array -> jQuery set
		},
	
	
		// Unrenders any visual indication of a mock helper event
		unrenderHelper: function() {
			if (this.helperEls) {
				this.helperEls.remove();
				this.helperEls = null;
			}
		},
	
	
		/* Fill System (highlight, background events, business hours)
		------------------------------------------------------------------------------------------------------------------*/
	
	
		fillSegTag: 'td', // override the default tag name
	
	
		// Renders a set of rectangles over the given segments of days.
		// Only returns segments that successfully rendered.
		renderFill: function(type, segs, className) {
			var nodes = [];
			var i, seg;
			var skeletonEl;
	
			segs = this.renderFillSegEls(type, segs); // assignes `.el` to each seg. returns successfully rendered segs
	
			for (i = 0; i < segs.length; i++) {
				seg = segs[i];
				skeletonEl = this.renderFillRow(type, seg, className);
				this.rowEls.eq(seg.row).append(skeletonEl);
				nodes.push(skeletonEl[0]);
			}
	
			this.elsByFill[type] = $(nodes);
	
			return segs;
		},
	
	
		// Generates the HTML needed for one row of a fill. Requires the seg's el to be rendered.
		renderFillRow: function(type, seg, className) {
			var colCnt = this.colCnt;
			var startCol = seg.leftCol;
			var endCol = seg.rightCol + 1;
			var skeletonEl;
			var trEl;
	
			className = className || type.toLowerCase();
	
			skeletonEl = $(
				'<div class="fc-' + className + '-skeleton">' +
					'<table><tr/></table>' +
				'</div>'
			);
			trEl = skeletonEl.find('tr');
	
			if (startCol > 0) {
				trEl.append('<td colspan="' + startCol + '"/>');
			}
	
			trEl.append(
				seg.el.attr('colspan', endCol - startCol)
			);
	
			if (endCol < colCnt) {
				trEl.append('<td colspan="' + (colCnt - endCol) + '"/>');
			}
	
			this.bookendCells(trEl, type);
	
			return skeletonEl;
		}
	
	});
	
	;;
	
	/* Event-rendering methods for the DayGrid class
	----------------------------------------------------------------------------------------------------------------------*/
	
	DayGrid.mixin({
	
		rowStructs: null, // an array of objects, each holding information about a row's foreground event-rendering
	
	
		// Unrenders all events currently rendered on the grid
		unrenderEvents: function() {
			this.removeSegPopover(); // removes the "more.." events popover
			Grid.prototype.unrenderEvents.apply(this, arguments); // calls the super-method
		},
	
	
		// Retrieves all rendered segment objects currently rendered on the grid
		getEventSegs: function() {
			return Grid.prototype.getEventSegs.call(this) // get the segments from the super-method
				.concat(this.popoverSegs || []); // append the segments from the "more..." popover
		},
	
	
		// Renders the given background event segments onto the grid
		renderBgSegs: function(segs) {
	
			// don't render timed background events
			var allDaySegs = $.grep(segs, function(seg) {
				return seg.event.allDay;
			});
	
			return Grid.prototype.renderBgSegs.call(this, allDaySegs); // call the super-method
		},
	
	
		// Renders the given foreground event segments onto the grid
		renderFgSegs: function(segs) {
			var rowStructs;
	
			// render an `.el` on each seg
			// returns a subset of the segs. segs that were actually rendered
			segs = this.renderFgSegEls(segs);
	
			rowStructs = this.rowStructs = this.renderSegRows(segs);
	
			// append to each row's content skeleton
			this.rowEls.each(function(i, rowNode) {
				$(rowNode).find('.fc-content-skeleton > table').append(
					rowStructs[i].tbodyEl
				);
			});
	
			return segs; // return only the segs that were actually rendered
		},
	
	
		// Unrenders all currently rendered foreground event segments
		unrenderFgSegs: function() {
			var rowStructs = this.rowStructs || [];
			var rowStruct;
	
			while ((rowStruct = rowStructs.pop())) {
				rowStruct.tbodyEl.remove();
			}
	
			this.rowStructs = null;
		},
	
	
		// Uses the given events array to generate <tbody> elements that should be appended to each row's content skeleton.
		// Returns an array of rowStruct objects (see the bottom of `renderSegRow`).
		// PRECONDITION: each segment shoud already have a rendered and assigned `.el`
		renderSegRows: function(segs) {
			var rowStructs = [];
			var segRows;
			var row;
	
			segRows = this.groupSegRows(segs); // group into nested arrays
	
			// iterate each row of segment groupings
			for (row = 0; row < segRows.length; row++) {
				rowStructs.push(
					this.renderSegRow(row, segRows[row])
				);
			}
	
			return rowStructs;
		},
	
	
		// Builds the HTML to be used for the default element for an individual segment
		fgSegHtml: function(seg, disableResizing) {
			var view = this.view;
			var event = seg.event;
			var isDraggable = view.isEventDraggable(event);
			var isResizableFromStart = !disableResizing && event.allDay &&
				seg.isStart && view.isEventResizableFromStart(event);
			var isResizableFromEnd = !disableResizing && event.allDay &&
				seg.isEnd && view.isEventResizableFromEnd(event);
			var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd);
			var skinCss = cssToStr(this.getEventSkinCss(event));
			var timeHtml = '';
			var timeText;
			var titleHtml;
	
			classes.unshift('fc-day-grid-event', 'fc-h-event');
	
			// Only display a timed events time if it is the starting segment
			if (seg.isStart) {
				timeText = this.getEventTimeText(event);
				if (timeText) {
					timeHtml = '<span class="fc-time">' + htmlEscape(timeText) + '</span>';
				}
			}
	
			titleHtml =
				'<span class="fc-title">' +
					(htmlEscape(event.title || '') || '&nbsp;') + // we always want one line of height
				'</span>';
			
			return '<a class="' + classes.join(' ') + '"' +
					(event.url ?
						' href="' + htmlEscape(event.url) + '"' :
						''
						) +
					(skinCss ?
						' style="' + skinCss + '"' :
						''
						) +
				'>' +
					'<div class="fc-content">' +
						(this.isRTL ?
							titleHtml + ' ' + timeHtml : // put a natural space in between
							timeHtml + ' ' + titleHtml   //
							) +
					'</div>' +
					(isResizableFromStart ?
						'<div class="fc-resizer fc-start-resizer" />' :
						''
						) +
					(isResizableFromEnd ?
						'<div class="fc-resizer fc-end-resizer" />' :
						''
						) +
				'</a>';
		},
	
	
		// Given a row # and an array of segments all in the same row, render a <tbody> element, a skeleton that contains
		// the segments. Returns object with a bunch of internal data about how the render was calculated.
		// NOTE: modifies rowSegs
		renderSegRow: function(row, rowSegs) {
			var colCnt = this.colCnt;
			var segLevels = this.buildSegLevels(rowSegs); // group into sub-arrays of levels
			var levelCnt = Math.max(1, segLevels.length); // ensure at least one level
			var tbody = $('<tbody/>');
			var segMatrix = []; // lookup for which segments are rendered into which level+col cells
			var cellMatrix = []; // lookup for all <td> elements of the level+col matrix
			var loneCellMatrix = []; // lookup for <td> elements that only take up a single column
			var i, levelSegs;
			var col;
			var tr;
			var j, seg;
			var td;
	
			// populates empty cells from the current column (`col`) to `endCol`
			function emptyCellsUntil(endCol) {
				while (col < endCol) {
					// try to grab a cell from the level above and extend its rowspan. otherwise, create a fresh cell
					td = (loneCellMatrix[i - 1] || [])[col];
					if (td) {
						td.attr(
							'rowspan',
							parseInt(td.attr('rowspan') || 1, 10) + 1
						);
					}
					else {
						td = $('<td/>');
						tr.append(td);
					}
					cellMatrix[i][col] = td;
					loneCellMatrix[i][col] = td;
					col++;
				}
			}
	
			for (i = 0; i < levelCnt; i++) { // iterate through all levels
				levelSegs = segLevels[i];
				col = 0;
				tr = $('<tr/>');
	
				segMatrix.push([]);
				cellMatrix.push([]);
				loneCellMatrix.push([]);
	
				// levelCnt might be 1 even though there are no actual levels. protect against this.
				// this single empty row is useful for styling.
				if (levelSegs) {
					for (j = 0; j < levelSegs.length; j++) { // iterate through segments in level
						seg = levelSegs[j];
	
						emptyCellsUntil(seg.leftCol);
	
						// create a container that occupies or more columns. append the event element.
						td = $('<td class="fc-event-container"/>').append(seg.el);
						if (seg.leftCol != seg.rightCol) {
							td.attr('colspan', seg.rightCol - seg.leftCol + 1);
						}
						else { // a single-column segment
							loneCellMatrix[i][col] = td;
						}
	
						while (col <= seg.rightCol) {
							cellMatrix[i][col] = td;
							segMatrix[i][col] = seg;
							col++;
						}
	
						tr.append(td);
					}
				}
	
				emptyCellsUntil(colCnt); // finish off the row
				this.bookendCells(tr, 'eventSkeleton');
				tbody.append(tr);
			}
	
			return { // a "rowStruct"
				row: row, // the row number
				tbodyEl: tbody,
				cellMatrix: cellMatrix,
				segMatrix: segMatrix,
				segLevels: segLevels,
				segs: rowSegs
			};
		},
	
	
		// Stacks a flat array of segments, which are all assumed to be in the same row, into subarrays of vertical levels.
		// NOTE: modifies segs
		buildSegLevels: function(segs) {
			var levels = [];
			var i, seg;
			var j;
	
			// Give preference to elements with certain criteria, so they have
			// a chance to be closer to the top.
			this.sortSegs(segs);
			
			for (i = 0; i < segs.length; i++) {
				seg = segs[i];
	
				// loop through levels, starting with the topmost, until the segment doesn't collide with other segments
				for (j = 0; j < levels.length; j++) {
					if (!isDaySegCollision(seg, levels[j])) {
						break;
					}
				}
				// `j` now holds the desired subrow index
				seg.level = j;
	
				// create new level array if needed and append segment
				(levels[j] || (levels[j] = [])).push(seg);
			}
	
			// order segments left-to-right. very important if calendar is RTL
			for (j = 0; j < levels.length; j++) {
				levels[j].sort(compareDaySegCols);
			}
	
			return levels;
		},
	
	
		// Given a flat array of segments, return an array of sub-arrays, grouped by each segment's row
		groupSegRows: function(segs) {
			var segRows = [];
			var i;
	
			for (i = 0; i < this.rowCnt; i++) {
				segRows.push([]);
			}
	
			for (i = 0; i < segs.length; i++) {
				segRows[segs[i].row].push(segs[i]);
			}
	
			return segRows;
		}
	
	});
	
	
	// Computes whether two segments' columns collide. They are assumed to be in the same row.
	function isDaySegCollision(seg, otherSegs) {
		var i, otherSeg;
	
		for (i = 0; i < otherSegs.length; i++) {
			otherSeg = otherSegs[i];
	
			if (
				otherSeg.leftCol <= seg.rightCol &&
				otherSeg.rightCol >= seg.leftCol
			) {
				return true;
			}
		}
	
		return false;
	}
	
	
	// A cmp function for determining the leftmost event
	function compareDaySegCols(a, b) {
		return a.leftCol - b.leftCol;
	}
	
	;;
	
	/* Methods relate to limiting the number events for a given day on a DayGrid
	----------------------------------------------------------------------------------------------------------------------*/
	// NOTE: all the segs being passed around in here are foreground segs
	
	DayGrid.mixin({
	
		segPopover: null, // the Popover that holds events that can't fit in a cell. null when not visible
		popoverSegs: null, // an array of segment objects that the segPopover holds. null when not visible
	
	
		removeSegPopover: function() {
			if (this.segPopover) {
				this.segPopover.hide(); // in handler, will call segPopover's removeElement
			}
		},
	
	
		// Limits the number of "levels" (vertically stacking layers of events) for each row of the grid.
		// `levelLimit` can be false (don't limit), a number, or true (should be computed).
		limitRows: function(levelLimit) {
			var rowStructs = this.rowStructs || [];
			var row; // row #
			var rowLevelLimit;
	
			for (row = 0; row < rowStructs.length; row++) {
				this.unlimitRow(row);
	
				if (!levelLimit) {
					rowLevelLimit = false;
				}
				else if (typeof levelLimit === 'number') {
					rowLevelLimit = levelLimit;
				}
				else {
					rowLevelLimit = this.computeRowLevelLimit(row);
				}
	
				if (rowLevelLimit !== false) {
					this.limitRow(row, rowLevelLimit);
				}
			}
		},
	
	
		// Computes the number of levels a row will accomodate without going outside its bounds.
		// Assumes the row is "rigid" (maintains a constant height regardless of what is inside).
		// `row` is the row number.
		computeRowLevelLimit: function(row) {
			var rowEl = this.rowEls.eq(row); // the containing "fake" row div
			var rowHeight = rowEl.height(); // TODO: cache somehow?
			var trEls = this.rowStructs[row].tbodyEl.children();
			var i, trEl;
			var trHeight;
	
			function iterInnerHeights(i, childNode) {
				trHeight = Math.max(trHeight, $(childNode).outerHeight());
			}
	
			// Reveal one level <tr> at a time and stop when we find one out of bounds
			for (i = 0; i < trEls.length; i++) {
				trEl = trEls.eq(i).removeClass('fc-limited'); // reset to original state (reveal)
	
				// with rowspans>1 and IE8, trEl.outerHeight() would return the height of the largest cell,
				// so instead, find the tallest inner content element.
				trHeight = 0;
				trEl.find('> td > :first-child').each(iterInnerHeights);
	
				if (trEl.position().top + trHeight > rowHeight) {
					return i;
				}
			}
	
			return false; // should not limit at all
		},
	
	
		// Limits the given grid row to the maximum number of levels and injects "more" links if necessary.
		// `row` is the row number.
		// `levelLimit` is a number for the maximum (inclusive) number of levels allowed.
		limitRow: function(row, levelLimit) {
			var _this = this;
			var rowStruct = this.rowStructs[row];
			var moreNodes = []; // array of "more" <a> links and <td> DOM nodes
			var col = 0; // col #, left-to-right (not chronologically)
			var cell;
			var levelSegs; // array of segment objects in the last allowable level, ordered left-to-right
			var cellMatrix; // a matrix (by level, then column) of all <td> jQuery elements in the row
			var limitedNodes; // array of temporarily hidden level <tr> and segment <td> DOM nodes
			var i, seg;
			var segsBelow; // array of segment objects below `seg` in the current `col`
			var totalSegsBelow; // total number of segments below `seg` in any of the columns `seg` occupies
			var colSegsBelow; // array of segment arrays, below seg, one for each column (offset from segs's first column)
			var td, rowspan;
			var segMoreNodes; // array of "more" <td> cells that will stand-in for the current seg's cell
			var j;
			var moreTd, moreWrap, moreLink;
	
			// Iterates through empty level cells and places "more" links inside if need be
			function emptyCellsUntil(endCol) { // goes from current `col` to `endCol`
				while (col < endCol) {
					cell = _this.getCell(row, col);
					segsBelow = _this.getCellSegs(cell, levelLimit);
					if (segsBelow.length) {
						td = cellMatrix[levelLimit - 1][col];
						moreLink = _this.renderMoreLink(cell, segsBelow);
						moreWrap = $('<div/>').append(moreLink);
						td.append(moreWrap);
						moreNodes.push(moreWrap[0]);
					}
					col++;
				}
			}
	
			if (levelLimit && levelLimit < rowStruct.segLevels.length) { // is it actually over the limit?
				levelSegs = rowStruct.segLevels[levelLimit - 1];
				cellMatrix = rowStruct.cellMatrix;
	
				limitedNodes = rowStruct.tbodyEl.children().slice(levelLimit) // get level <tr> elements past the limit
					.addClass('fc-limited').get(); // hide elements and get a simple DOM-nodes array
	
				// iterate though segments in the last allowable level
				for (i = 0; i < levelSegs.length; i++) {
					seg = levelSegs[i];
					emptyCellsUntil(seg.leftCol); // process empty cells before the segment
	
					// determine *all* segments below `seg` that occupy the same columns
					colSegsBelow = [];
					totalSegsBelow = 0;
					while (col <= seg.rightCol) {
						cell = this.getCell(row, col);
						segsBelow = this.getCellSegs(cell, levelLimit);
						colSegsBelow.push(segsBelow);
						totalSegsBelow += segsBelow.length;
						col++;
					}
	
					if (totalSegsBelow) { // do we need to replace this segment with one or many "more" links?
						td = cellMatrix[levelLimit - 1][seg.leftCol]; // the segment's parent cell
						rowspan = td.attr('rowspan') || 1;
						segMoreNodes = [];
	
						// make a replacement <td> for each column the segment occupies. will be one for each colspan
						for (j = 0; j < colSegsBelow.length; j++) {
							moreTd = $('<td class="fc-more-cell"/>').attr('rowspan', rowspan);
							segsBelow = colSegsBelow[j];
							cell = this.getCell(row, seg.leftCol + j);
							moreLink = this.renderMoreLink(cell, [ seg ].concat(segsBelow)); // count seg as hidden too
							moreWrap = $('<div/>').append(moreLink);
							moreTd.append(moreWrap);
							segMoreNodes.push(moreTd[0]);
							moreNodes.push(moreTd[0]);
						}
	
						td.addClass('fc-limited').after($(segMoreNodes)); // hide original <td> and inject replacements
						limitedNodes.push(td[0]);
					}
				}
	
				emptyCellsUntil(this.colCnt); // finish off the level
				rowStruct.moreEls = $(moreNodes); // for easy undoing later
				rowStruct.limitedEls = $(limitedNodes); // for easy undoing later
			}
		},
	
	
		// Reveals all levels and removes all "more"-related elements for a grid's row.
		// `row` is a row number.
		unlimitRow: function(row) {
			var rowStruct = this.rowStructs[row];
	
			if (rowStruct.moreEls) {
				rowStruct.moreEls.remove();
				rowStruct.moreEls = null;
			}
	
			if (rowStruct.limitedEls) {
				rowStruct.limitedEls.removeClass('fc-limited');
				rowStruct.limitedEls = null;
			}
		},
	
	
		// Renders an <a> element that represents hidden event element for a cell.
		// Responsible for attaching click handler as well.
		renderMoreLink: function(cell, hiddenSegs) {
			var _this = this;
			var view = this.view;
	
			return $('<a class="fc-more"/>')
				.text(
					this.getMoreLinkText(hiddenSegs.length)
				)
				.on('click', function(ev) {
					var clickOption = view.opt('eventLimitClick');
					var date = cell.start;
					var moreEl = $(this);
					var dayEl = _this.getCellDayEl(cell);
					var allSegs = _this.getCellSegs(cell);
	
					// rescope the segments to be within the cell's date
					var reslicedAllSegs = _this.resliceDaySegs(allSegs, date);
					var reslicedHiddenSegs = _this.resliceDaySegs(hiddenSegs, date);
	
					if (typeof clickOption === 'function') {
						// the returned value can be an atomic option
						clickOption = view.trigger('eventLimitClick', null, {
							date: date,
							dayEl: dayEl,
							moreEl: moreEl,
							segs: reslicedAllSegs,
							hiddenSegs: reslicedHiddenSegs
						}, ev);
					}
	
					if (clickOption === 'popover') {
						_this.showSegPopover(cell, moreEl, reslicedAllSegs);
					}
					else if (typeof clickOption === 'string') { // a view name
						view.calendar.zoomTo(date, clickOption);
					}
				});
		},
	
	
		// Reveals the popover that displays all events within a cell
		showSegPopover: function(cell, moreLink, segs) {
			var _this = this;
			var view = this.view;
			var moreWrap = moreLink.parent(); // the <div> wrapper around the <a>
			var topEl; // the element we want to match the top coordinate of
			var options;
	
			if (this.rowCnt == 1) {
				topEl = view.el; // will cause the popover to cover any sort of header
			}
			else {
				topEl = this.rowEls.eq(cell.row); // will align with top of row
			}
	
			options = {
				className: 'fc-more-popover',
				content: this.renderSegPopoverContent(cell, segs),
				parentEl: this.el,
				top: topEl.offset().top,
				autoHide: true, // when the user clicks elsewhere, hide the popover
				viewportConstrain: view.opt('popoverViewportConstrain'),
				hide: function() {
					// kill everything when the popover is hidden
					_this.segPopover.removeElement();
					_this.segPopover = null;
					_this.popoverSegs = null;
				}
			};
	
			// Determine horizontal coordinate.
			// We use the moreWrap instead of the <td> to avoid border confusion.
			if (this.isRTL) {
				options.right = moreWrap.offset().left + moreWrap.outerWidth() + 1; // +1 to be over cell border
			}
			else {
				options.left = moreWrap.offset().left - 1; // -1 to be over cell border
			}
	
			this.segPopover = new Popover(options);
			this.segPopover.show();
		},
	
	
		// Builds the inner DOM contents of the segment popover
		renderSegPopoverContent: function(cell, segs) {
			var view = this.view;
			var isTheme = view.opt('theme');
			var title = cell.start.format(view.opt('dayPopoverFormat'));
			var content = $(
				'<div class="fc-header ' + view.widgetHeaderClass + '">' +
					'<span class="fc-close ' +
						(isTheme ? 'ui-icon ui-icon-closethick' : 'fc-icon fc-icon-x') +
					'"></span>' +
					'<span class="fc-title">' +
						htmlEscape(title) +
					'</span>' +
					'<div class="fc-clear"/>' +
				'</div>' +
				'<div class="fc-body ' + view.widgetContentClass + '">' +
					'<div class="fc-event-container"></div>' +
				'</div>'
			);
			var segContainer = content.find('.fc-event-container');
			var i;
	
			// render each seg's `el` and only return the visible segs
			segs = this.renderFgSegEls(segs, true); // disableResizing=true
			this.popoverSegs = segs;
	
			for (i = 0; i < segs.length; i++) {
	
				// because segments in the popover are not part of a grid coordinate system, provide a hint to any
				// grids that want to do drag-n-drop about which cell it came from
				segs[i].cell = cell;
	
				segContainer.append(segs[i].el);
			}
	
			return content;
		},
	
	
		// Given the events within an array of segment objects, reslice them to be in a single day
		resliceDaySegs: function(segs, dayDate) {
	
			// build an array of the original events
			var events = $.map(segs, function(seg) {
				return seg.event;
			});
	
			var dayStart = dayDate.clone().stripTime();
			var dayEnd = dayStart.clone().add(1, 'days');
			var dayRange = { start: dayStart, end: dayEnd };
	
			// slice the events with a custom slicing function
			segs = this.eventsToSegs(
				events,
				function(range) {
					var seg = intersectionToSeg(range, dayRange); // undefind if no intersection
					return seg ? [ seg ] : []; // must return an array of segments
				}
			);
	
			// force an order because eventsToSegs doesn't guarantee one
			this.sortSegs(segs);
	
			return segs;
		},
	
	
		// Generates the text that should be inside a "more" link, given the number of events it represents
		getMoreLinkText: function(num) {
			var opt = this.view.opt('eventLimitText');
	
			if (typeof opt === 'function') {
				return opt(num);
			}
			else {
				return '+' + num + ' ' + opt;
			}
		},
	
	
		// Returns segments within a given cell.
		// If `startLevel` is specified, returns only events including and below that level. Otherwise returns all segs.
		getCellSegs: function(cell, startLevel) {
			var segMatrix = this.rowStructs[cell.row].segMatrix;
			var level = startLevel || 0;
			var segs = [];
			var seg;
	
			while (level < segMatrix.length) {
				seg = segMatrix[level][cell.col];
				if (seg) {
					segs.push(seg);
				}
				level++;
			}
	
			return segs;
		}
	
	});
	
	;;
	
	/* A component that renders one or more columns of vertical time slots
	----------------------------------------------------------------------------------------------------------------------*/
	
	var TimeGrid = Grid.extend({
	
		slotDuration: null, // duration of a "slot", a distinct time segment on given day, visualized by lines
		snapDuration: null, // granularity of time for dragging and selecting
		minTime: null, // Duration object that denotes the first visible time of any given day
		maxTime: null, // Duration object that denotes the exclusive visible end time of any given day
		colDates: null, // whole-day dates for each column. left to right
		labelFormat: null, // formatting string for times running along vertical axis
		labelInterval: null, // duration of how often a label should be displayed for a slot
	
		dayEls: null, // cells elements in the day-row background
		slatEls: null, // elements running horizontally across all columns
	
		slatTops: null, // an array of top positions, relative to the container. last item holds bottom of last slot
	
		helperEl: null, // cell skeleton element for rendering the mock event "helper"
	
		businessHourSegs: null,
	
	
		constructor: function() {
			Grid.apply(this, arguments); // call the super-constructor
			this.processOptions();
		},
	
	
		// Renders the time grid into `this.el`, which should already be assigned.
		// Relies on the view's colCnt. In the future, this component should probably be self-sufficient.
		renderDates: function() {
			this.el.html(this.renderHtml());
			this.dayEls = this.el.find('.fc-day');
			this.slatEls = this.el.find('.fc-slats tr');
		},
	
	
		renderBusinessHours: function() {
			var events = this.view.calendar.getBusinessHoursEvents();
			this.businessHourSegs = this.renderFill('businessHours', this.eventsToSegs(events), 'bgevent');
		},
	
	
		// Renders the basic HTML skeleton for the grid
		renderHtml: function() {
			return '' +
				'<div class="fc-bg">' +
					'<table>' +
						this.rowHtml('slotBg') + // leverages RowRenderer, which will call slotBgCellHtml
					'</table>' +
				'</div>' +
				'<div class="fc-slats">' +
					'<table>' +
						this.slatRowHtml() +
					'</table>' +
				'</div>';
		},
	
	
		// Renders the HTML for a vertical background cell behind the slots.
		// This method is distinct from 'bg' because we wanted a new `rowType` so the View could customize the rendering.
		slotBgCellHtml: function(cell) {
			return this.bgCellHtml(cell);
		},
	
	
		// Generates the HTML for the horizontal "slats" that run width-wise. Has a time axis on a side. Depends on RTL.
		slatRowHtml: function() {
			var view = this.view;
			var isRTL = this.isRTL;
			var html = '';
			var slotTime = moment.duration(+this.minTime); // wish there was .clone() for durations
			var slotDate; // will be on the view's first day, but we only care about its time
			var isLabeled;
			var axisHtml;
	
			// Calculate the time for each slot
			while (slotTime < this.maxTime) {
				slotDate = this.start.clone().time(slotTime); // after .time() will be in UTC. but that's good, avoids DST issues
				isLabeled = isInt(divideDurationByDuration(slotTime, this.labelInterval));
	
				axisHtml =
					'<td class="fc-axis fc-time ' + view.widgetContentClass + '" ' + view.axisStyleAttr() + '>' +
						(isLabeled ?
							'<span>' + // for matchCellWidths
								htmlEscape(slotDate.format(this.labelFormat)) +
							'</span>' :
							''
							) +
					'</td>';
	
				html +=
					'<tr ' + (isLabeled ? '' : 'class="fc-minor"') + '>' +
						(!isRTL ? axisHtml : '') +
						'<td class="' + view.widgetContentClass + '"/>' +
						(isRTL ? axisHtml : '') +
					"</tr>";
	
				slotTime.add(this.slotDuration);
			}
	
			return html;
		},
	
	
		/* Options
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Parses various options into properties of this object
		processOptions: function() {
			var view = this.view;
			var slotDuration = view.opt('slotDuration');
			var snapDuration = view.opt('snapDuration');
			var input;
	
			slotDuration = moment.duration(slotDuration);
			snapDuration = snapDuration ? moment.duration(snapDuration) : slotDuration;
	
			this.slotDuration = slotDuration;
			this.snapDuration = snapDuration;
			this.cellDuration = snapDuration; // for Grid system
	
			this.minTime = moment.duration(view.opt('minTime'));
			this.maxTime = moment.duration(view.opt('maxTime'));
	
			// might be an array value (for TimelineView).
			// if so, getting the most granular entry (the last one probably).
			input = view.opt('slotLabelFormat');
			if ($.isArray(input)) {
				input = input[input.length - 1];
			}
	
			this.labelFormat =
				input ||
				view.opt('axisFormat') || // deprecated
				view.opt('smallTimeFormat'); // the computed default
	
			input = view.opt('slotLabelInterval');
			this.labelInterval = input ?
				moment.duration(input) :
				this.computeLabelInterval(slotDuration);
		},
	
	
		// Computes an automatic value for slotLabelInterval
		computeLabelInterval: function(slotDuration) {
			var i;
			var labelInterval;
			var slotsPerLabel;
	
			// find the smallest stock label interval that results in more than one slots-per-label
			for (i = AGENDA_STOCK_SUB_DURATIONS.length - 1; i >= 0; i--) {
				labelInterval = moment.duration(AGENDA_STOCK_SUB_DURATIONS[i]);
				slotsPerLabel = divideDurationByDuration(labelInterval, slotDuration);
				if (isInt(slotsPerLabel) && slotsPerLabel > 1) {
					return labelInterval;
				}
			}
	
			return moment.duration(slotDuration); // fall back. clone
		},
	
	
		// Computes a default column header formatting string if `colFormat` is not explicitly defined
		computeColHeadFormat: function() {
			if (this.colCnt > 1) { // multiple days, so full single date string WON'T be in title text
				return this.view.opt('dayOfMonthFormat'); // "Sat 12/10"
			}
			else { // single day, so full single date string will probably be in title text
				return 'dddd'; // "Saturday"
			}
		},
	
	
		// Computes a default event time formatting string if `timeFormat` is not explicitly defined
		computeEventTimeFormat: function() {
			return this.view.opt('noMeridiemTimeFormat'); // like "6:30" (no AM/PM)
		},
	
	
		// Computes a default `displayEventEnd` value if one is not expliclty defined
		computeDisplayEventEnd: function() {
			return true;
		},
	
	
		/* Cell System
		------------------------------------------------------------------------------------------------------------------*/
	
	
		rangeUpdated: function() {
			var view = this.view;
			var colDates = [];
			var date;
	
			date = this.start.clone();
			while (date.isBefore(this.end)) {
				colDates.push(date.clone());
				date.add(1, 'day');
				date = view.skipHiddenDays(date);
			}
	
			if (this.isRTL) {
				colDates.reverse();
			}
	
			this.colDates = colDates;
			this.colCnt = colDates.length;
			this.rowCnt = Math.ceil((this.maxTime - this.minTime) / this.snapDuration); // # of vertical snaps
		},
	
	
		// Given a cell object, generates its start date. Returns a reference-free copy.
		computeCellDate: function(cell) {
			var date = this.colDates[cell.col];
			var time = this.computeSnapTime(cell.row);
	
			date = this.view.calendar.rezoneDate(date); // give it a 00:00 time
			date.time(time);
	
			return date;
		},
	
	
		// Retrieves the element representing the given column
		getColEl: function(col) {
			return this.dayEls.eq(col);
		},
	
	
		/* Dates
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Given a row number of the grid, representing a "snap", returns a time (Duration) from its start-of-day
		computeSnapTime: function(row) {
			return moment.duration(this.minTime + this.snapDuration * row);
		},
	
	
		// Slices up a date range by column into an array of segments
		rangeToSegs: function(range) {
			var colCnt = this.colCnt;
			var segs = [];
			var seg;
			var col;
			var colDate;
			var colRange;
	
			// normalize :(
			range = {
				start: range.start.clone().stripZone(),
				end: range.end.clone().stripZone()
			};
	
			for (col = 0; col < colCnt; col++) {
				colDate = this.colDates[col]; // will be ambig time/timezone
				colRange = {
					start: colDate.clone().time(this.minTime),
					end: colDate.clone().time(this.maxTime)
				};
				seg = intersectionToSeg(range, colRange); // both will be ambig timezone
				if (seg) {
					seg.col = col;
					segs.push(seg);
				}
			}
	
			return segs;
		},
	
	
		/* Coordinates
		------------------------------------------------------------------------------------------------------------------*/
	
	
		updateSize: function(isResize) { // NOT a standard Grid method
			this.computeSlatTops();
	
			if (isResize) {
				this.updateSegVerticals();
			}
		},
	
	
		// Computes the top/bottom coordinates of each "snap" rows
		computeRowCoords: function() {
			var originTop = this.el.offset().top;
			var items = [];
			var i;
			var item;
	
			for (i = 0; i < this.rowCnt; i++) {
				item = {
					top: originTop + this.computeTimeTop(this.computeSnapTime(i))
				};
				if (i > 0) {
					items[i - 1].bottom = item.top;
				}
				items.push(item);
			}
			item.bottom = item.top + this.computeTimeTop(this.computeSnapTime(i));
	
			return items;
		},
	
	
		// Computes the top coordinate, relative to the bounds of the grid, of the given date.
		// A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
		computeDateTop: function(date, startOfDayDate) {
			return this.computeTimeTop(
				moment.duration(
					date.clone().stripZone() - startOfDayDate.clone().stripTime()
				)
			);
		},
	
	
		// Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
		computeTimeTop: function(time) {
			var slatCoverage = (time - this.minTime) / this.slotDuration; // floating-point value of # of slots covered
			var slatIndex;
			var slatRemainder;
			var slatTop;
			var slatBottom;
	
			// constrain. because minTime/maxTime might be customized
			slatCoverage = Math.max(0, slatCoverage);
			slatCoverage = Math.min(this.slatEls.length, slatCoverage);
	
			slatIndex = Math.floor(slatCoverage); // an integer index of the furthest whole slot
			slatRemainder = slatCoverage - slatIndex;
			slatTop = this.slatTops[slatIndex]; // the top position of the furthest whole slot
	
			if (slatRemainder) { // time spans part-way into the slot
				slatBottom = this.slatTops[slatIndex + 1];
				return slatTop + (slatBottom - slatTop) * slatRemainder; // part-way between slots
			}
			else {
				return slatTop;
			}
		},
	
	
		// Queries each `slatEl` for its position relative to the grid's container and stores it in `slatTops`.
		// Includes the the bottom of the last slat as the last item in the array.
		computeSlatTops: function() {
			var tops = [];
			var top;
	
			this.slatEls.each(function(i, node) {
				top = $(node).position().top;
				tops.push(top);
			});
	
			tops.push(top + this.slatEls.last().outerHeight()); // bottom of the last slat
	
			this.slatTops = tops;
		},
	
	
		/* Event Drag Visualization
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a visual indication of an event being dragged over the specified date(s).
		// dropLocation's end might be null, as well as `seg`. See Grid::renderDrag for more info.
		// A returned value of `true` signals that a mock "helper" event has been rendered.
		renderDrag: function(dropLocation, seg) {
	
			if (seg) { // if there is event information for this drag, render a helper event
				this.renderRangeHelper(dropLocation, seg);
				this.applyDragOpacity(this.helperEl);
	
				return true; // signal that a helper has been rendered
			}
			else {
				// otherwise, just render a highlight
				this.renderHighlight(this.eventRangeToSegs(dropLocation));
			}
		},
	
	
		// Unrenders any visual indication of an event being dragged
		unrenderDrag: function() {
			this.unrenderHelper();
			this.unrenderHighlight();
		},
	
	
		/* Event Resize Visualization
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a visual indication of an event being resized
		renderEventResize: function(range, seg) {
			this.renderRangeHelper(range, seg);
		},
	
	
		// Unrenders any visual indication of an event being resized
		unrenderEventResize: function() {
			this.unrenderHelper();
		},
	
	
		/* Event Helper
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a mock "helper" event. `sourceSeg` is the original segment object and might be null (an external drag)
		renderHelper: function(event, sourceSeg) {
			var segs = this.eventsToSegs([ event ]);
			var tableEl;
			var i, seg;
			var sourceEl;
	
			segs = this.renderFgSegEls(segs); // assigns each seg's el and returns a subset of segs that were rendered
			tableEl = this.renderSegTable(segs);
	
			// Try to make the segment that is in the same row as sourceSeg look the same
			for (i = 0; i < segs.length; i++) {
				seg = segs[i];
				if (sourceSeg && sourceSeg.col === seg.col) {
					sourceEl = sourceSeg.el;
					seg.el.css({
						left: sourceEl.css('left'),
						right: sourceEl.css('right'),
						'margin-left': sourceEl.css('margin-left'),
						'margin-right': sourceEl.css('margin-right')
					});
				}
			}
	
			this.helperEl = $('<div class="fc-helper-skeleton"/>')
				.append(tableEl)
					.appendTo(this.el);
		},
	
	
		// Unrenders any mock helper event
		unrenderHelper: function() {
			if (this.helperEl) {
				this.helperEl.remove();
				this.helperEl = null;
			}
		},
	
	
		/* Selection
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a visual indication of a selection. Overrides the default, which was to simply render a highlight.
		renderSelection: function(range) {
			if (this.view.opt('selectHelper')) { // this setting signals that a mock helper event should be rendered
				this.renderRangeHelper(range);
			}
			else {
				this.renderHighlight(this.selectionRangeToSegs(range));
			}
		},
	
	
		// Unrenders any visual indication of a selection
		unrenderSelection: function() {
			this.unrenderHelper();
			this.unrenderHighlight();
		},
	
	
		/* Fill System (highlight, background events, business hours)
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a set of rectangles over the given time segments.
		// Only returns segments that successfully rendered.
		renderFill: function(type, segs, className) {
			var segCols;
			var skeletonEl;
			var trEl;
			var col, colSegs;
			var tdEl;
			var containerEl;
			var dayDate;
			var i, seg;
	
			if (segs.length) {
	
				segs = this.renderFillSegEls(type, segs); // assignes `.el` to each seg. returns successfully rendered segs
				segCols = this.groupSegCols(segs); // group into sub-arrays, and assigns 'col' to each seg
	
				className = className || type.toLowerCase();
				skeletonEl = $(
					'<div class="fc-' + className + '-skeleton">' +
						'<table><tr/></table>' +
					'</div>'
				);
				trEl = skeletonEl.find('tr');
	
				for (col = 0; col < segCols.length; col++) {
					colSegs = segCols[col];
					tdEl = $('<td/>').appendTo(trEl);
	
					if (colSegs.length) {
						containerEl = $('<div class="fc-' + className + '-container"/>').appendTo(tdEl);
						dayDate = this.colDates[col];
	
						for (i = 0; i < colSegs.length; i++) {
							seg = colSegs[i];
							containerEl.append(
								seg.el.css({
									top: this.computeDateTop(seg.start, dayDate),
									bottom: -this.computeDateTop(seg.end, dayDate) // the y position of the bottom edge
								})
							);
						}
					}
				}
	
				this.bookendCells(trEl, type);
	
				this.el.append(skeletonEl);
				this.elsByFill[type] = skeletonEl;
			}
	
			return segs;
		}
	
	});
	
	;;
	
	/* Event-rendering methods for the TimeGrid class
	----------------------------------------------------------------------------------------------------------------------*/
	
	TimeGrid.mixin({
	
		eventSkeletonEl: null, // has cells with event-containers, which contain absolutely positioned event elements
	
	
		// Renders the given foreground event segments onto the grid
		renderFgSegs: function(segs) {
			segs = this.renderFgSegEls(segs); // returns a subset of the segs. segs that were actually rendered
	
			this.el.append(
				this.eventSkeletonEl = $('<div class="fc-content-skeleton"/>')
					.append(this.renderSegTable(segs))
			);
	
			return segs; // return only the segs that were actually rendered
		},
	
	
		// Unrenders all currently rendered foreground event segments
		unrenderFgSegs: function(segs) {
			if (this.eventSkeletonEl) {
				this.eventSkeletonEl.remove();
				this.eventSkeletonEl = null;
			}
		},
	
	
		// Renders and returns the <table> portion of the event-skeleton.
		// Returns an object with properties 'tbodyEl' and 'segs'.
		renderSegTable: function(segs) {
			var tableEl = $('<table><tr/></table>');
			var trEl = tableEl.find('tr');
			var segCols;
			var i, seg;
			var col, colSegs;
			var containerEl;
	
			segCols = this.groupSegCols(segs); // group into sub-arrays, and assigns 'col' to each seg
	
			this.computeSegVerticals(segs); // compute and assign top/bottom
	
			for (col = 0; col < segCols.length; col++) { // iterate each column grouping
				colSegs = segCols[col];
				this.placeSlotSegs(colSegs); // compute horizontal coordinates, z-index's, and reorder the array
	
				containerEl = $('<div class="fc-event-container"/>');
	
				// assign positioning CSS and insert into container
				for (i = 0; i < colSegs.length; i++) {
					seg = colSegs[i];
					seg.el.css(this.generateSegPositionCss(seg));
	
					// if the height is short, add a className for alternate styling
					if (seg.bottom - seg.top < 30) {
						seg.el.addClass('fc-short');
					}
	
					containerEl.append(seg.el);
				}
	
				trEl.append($('<td/>').append(containerEl));
			}
	
			this.bookendCells(trEl, 'eventSkeleton');
	
			return tableEl;
		},
	
	
		// Given an array of segments that are all in the same column, sets the backwardCoord and forwardCoord on each.
		// NOTE: Also reorders the given array by date!
		placeSlotSegs: function(segs) {
			var levels;
			var level0;
			var i;
	
			this.sortSegs(segs); // order by date
			levels = buildSlotSegLevels(segs);
			computeForwardSlotSegs(levels);
	
			if ((level0 = levels[0])) {
	
				for (i = 0; i < level0.length; i++) {
					computeSlotSegPressures(level0[i]);
				}
	
				for (i = 0; i < level0.length; i++) {
					this.computeSlotSegCoords(level0[i], 0, 0);
				}
			}
		},
	
	
		// Calculate seg.forwardCoord and seg.backwardCoord for the segment, where both values range
		// from 0 to 1. If the calendar is left-to-right, the seg.backwardCoord maps to "left" and
		// seg.forwardCoord maps to "right" (via percentage). Vice-versa if the calendar is right-to-left.
		//
		// The segment might be part of a "series", which means consecutive segments with the same pressure
		// who's width is unknown until an edge has been hit. `seriesBackwardPressure` is the number of
		// segments behind this one in the current series, and `seriesBackwardCoord` is the starting
		// coordinate of the first segment in the series.
		computeSlotSegCoords: function(seg, seriesBackwardPressure, seriesBackwardCoord) {
			var forwardSegs = seg.forwardSegs;
			var i;
	
			if (seg.forwardCoord === undefined) { // not already computed
	
				if (!forwardSegs.length) {
	
					// if there are no forward segments, this segment should butt up against the edge
					seg.forwardCoord = 1;
				}
				else {
	
					// sort highest pressure first
					this.sortForwardSlotSegs(forwardSegs);
	
					// this segment's forwardCoord will be calculated from the backwardCoord of the
					// highest-pressure forward segment.
					this.computeSlotSegCoords(forwardSegs[0], seriesBackwardPressure + 1, seriesBackwardCoord);
					seg.forwardCoord = forwardSegs[0].backwardCoord;
				}
	
				// calculate the backwardCoord from the forwardCoord. consider the series
				seg.backwardCoord = seg.forwardCoord -
					(seg.forwardCoord - seriesBackwardCoord) / // available width for series
					(seriesBackwardPressure + 1); // # of segments in the series
	
				// use this segment's coordinates to computed the coordinates of the less-pressurized
				// forward segments
				for (i=0; i<forwardSegs.length; i++) {
					this.computeSlotSegCoords(forwardSegs[i], 0, seg.forwardCoord);
				}
			}
		},
	
	
		// Refreshes the CSS top/bottom coordinates for each segment element. Probably after a window resize/zoom.
		// Repositions business hours segs too, so not just for events. Maybe shouldn't be here.
		updateSegVerticals: function() {
			var allSegs = (this.segs || []).concat(this.businessHourSegs || []);
			var i;
	
			this.computeSegVerticals(allSegs);
	
			for (i = 0; i < allSegs.length; i++) {
				allSegs[i].el.css(
					this.generateSegVerticalCss(allSegs[i])
				);
			}
		},
	
	
		// For each segment in an array, computes and assigns its top and bottom properties
		computeSegVerticals: function(segs) {
			var i, seg;
	
			for (i = 0; i < segs.length; i++) {
				seg = segs[i];
				seg.top = this.computeDateTop(seg.start, seg.start);
				seg.bottom = this.computeDateTop(seg.end, seg.start);
			}
		},
	
	
		// Renders the HTML for a single event segment's default rendering
		fgSegHtml: function(seg, disableResizing) {
			var view = this.view;
			var event = seg.event;
			var isDraggable = view.isEventDraggable(event);
			var isResizableFromStart = !disableResizing && seg.isStart && view.isEventResizableFromStart(event);
			var isResizableFromEnd = !disableResizing && seg.isEnd && view.isEventResizableFromEnd(event);
			var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd);
			var skinCss = cssToStr(this.getEventSkinCss(event));
			var timeText;
			var fullTimeText; // more verbose time text. for the print stylesheet
			var startTimeText; // just the start time text
	
			classes.unshift('fc-time-grid-event', 'fc-v-event');
	
			if (view.isMultiDayEvent(event)) { // if the event appears to span more than one day...
				// Don't display time text on segments that run entirely through a day.
				// That would appear as midnight-midnight and would look dumb.
				// Otherwise, display the time text for the *segment's* times (like 6pm-midnight or midnight-10am)
				if (seg.isStart || seg.isEnd) {
					timeText = this.getEventTimeText(seg);
					fullTimeText = this.getEventTimeText(seg, 'LT');
					startTimeText = this.getEventTimeText(seg, null, false); // displayEnd=false
				}
			} else {
				// Display the normal time text for the *event's* times
				timeText = this.getEventTimeText(event);
				fullTimeText = this.getEventTimeText(event, 'LT');
				startTimeText = this.getEventTimeText(event, null, false); // displayEnd=false
			}
	
			return '<a class="' + classes.join(' ') + '"' +
				(event.url ?
					' href="' + htmlEscape(event.url) + '"' :
					''
					) +
				(skinCss ?
					' style="' + skinCss + '"' :
					''
					) +
				'>' +
					'<div class="fc-content">' +
						(timeText ?
							'<div class="fc-time"' +
							' data-start="' + htmlEscape(startTimeText) + '"' +
							' data-full="' + htmlEscape(fullTimeText) + '"' +
							'>' +
								'<span>' + htmlEscape(timeText) + '</span>' +
							'</div>' :
							''
							) +
						(event.title ?
							'<div class="fc-title">' +
								htmlEscape(event.title) +
							'</div>' :
							''
							) +
					'</div>' +
					'<div class="fc-bg"/>' +
					/* TODO: write CSS for this
					(isResizableFromStart ?
						'<div class="fc-resizer fc-start-resizer" />' :
						''
						) +
					*/
					(isResizableFromEnd ?
						'<div class="fc-resizer fc-end-resizer" />' :
						''
						) +
				'</a>';
		},
	
	
		// Generates an object with CSS properties/values that should be applied to an event segment element.
		// Contains important positioning-related properties that should be applied to any event element, customized or not.
		generateSegPositionCss: function(seg) {
			var shouldOverlap = this.view.opt('slotEventOverlap');
			var backwardCoord = seg.backwardCoord; // the left side if LTR. the right side if RTL. floating-point
			var forwardCoord = seg.forwardCoord; // the right side if LTR. the left side if RTL. floating-point
			var props = this.generateSegVerticalCss(seg); // get top/bottom first
			var left; // amount of space from left edge, a fraction of the total width
			var right; // amount of space from right edge, a fraction of the total width
	
			if (shouldOverlap) {
				// double the width, but don't go beyond the maximum forward coordinate (1.0)
				forwardCoord = Math.min(1, backwardCoord + (forwardCoord - backwardCoord) * 2);
			}
	
			if (this.isRTL) {
				left = 1 - forwardCoord;
				right = backwardCoord;
			}
			else {
				left = backwardCoord;
				right = 1 - forwardCoord;
			}
	
			props.zIndex = seg.level + 1; // convert from 0-base to 1-based
			props.left = left * 100 + '%';
			props.right = right * 100 + '%';
	
			if (shouldOverlap && seg.forwardPressure) {
				// add padding to the edge so that forward stacked events don't cover the resizer's icon
				props[this.isRTL ? 'marginLeft' : 'marginRight'] = 10 * 2; // 10 is a guesstimate of the icon's width
			}
	
			return props;
		},
	
	
		// Generates an object with CSS properties for the top/bottom coordinates of a segment element
		generateSegVerticalCss: function(seg) {
			return {
				top: seg.top,
				bottom: -seg.bottom // flipped because needs to be space beyond bottom edge of event container
			};
		},
	
	
		// Given a flat array of segments, return an array of sub-arrays, grouped by each segment's col
		groupSegCols: function(segs) {
			var segCols = [];
			var i;
	
			for (i = 0; i < this.colCnt; i++) {
				segCols.push([]);
			}
	
			for (i = 0; i < segs.length; i++) {
				segCols[segs[i].col].push(segs[i]);
			}
	
			return segCols;
		},
	
	
		sortForwardSlotSegs: function(forwardSegs) {
			forwardSegs.sort(proxy(this, 'compareForwardSlotSegs'));
		},
	
	
		// A cmp function for determining which forward segment to rely on more when computing coordinates.
		compareForwardSlotSegs: function(seg1, seg2) {
			// put higher-pressure first
			return seg2.forwardPressure - seg1.forwardPressure ||
				// put segments that are closer to initial edge first (and favor ones with no coords yet)
				(seg1.backwardCoord || 0) - (seg2.backwardCoord || 0) ||
				// do normal sorting...
				this.compareSegs(seg1, seg2);
		}
	
	});
	
	
	// Builds an array of segments "levels". The first level will be the leftmost tier of segments if the calendar is
	// left-to-right, or the rightmost if the calendar is right-to-left. Assumes the segments are already ordered by date.
	function buildSlotSegLevels(segs) {
		var levels = [];
		var i, seg;
		var j;
	
		for (i=0; i<segs.length; i++) {
			seg = segs[i];
	
			// go through all the levels and stop on the first level where there are no collisions
			for (j=0; j<levels.length; j++) {
				if (!computeSlotSegCollisions(seg, levels[j]).length) {
					break;
				}
			}
	
			seg.level = j;
	
			(levels[j] || (levels[j] = [])).push(seg);
		}
	
		return levels;
	}
	
	
	// For every segment, figure out the other segments that are in subsequent
	// levels that also occupy the same vertical space. Accumulate in seg.forwardSegs
	function computeForwardSlotSegs(levels) {
		var i, level;
		var j, seg;
		var k;
	
		for (i=0; i<levels.length; i++) {
			level = levels[i];
	
			for (j=0; j<level.length; j++) {
				seg = level[j];
	
				seg.forwardSegs = [];
				for (k=i+1; k<levels.length; k++) {
					computeSlotSegCollisions(seg, levels[k], seg.forwardSegs);
				}
			}
		}
	}
	
	
	// Figure out which path forward (via seg.forwardSegs) results in the longest path until
	// the furthest edge is reached. The number of segments in this path will be seg.forwardPressure
	function computeSlotSegPressures(seg) {
		var forwardSegs = seg.forwardSegs;
		var forwardPressure = 0;
		var i, forwardSeg;
	
		if (seg.forwardPressure === undefined) { // not already computed
	
			for (i=0; i<forwardSegs.length; i++) {
				forwardSeg = forwardSegs[i];
	
				// figure out the child's maximum forward path
				computeSlotSegPressures(forwardSeg);
	
				// either use the existing maximum, or use the child's forward pressure
				// plus one (for the forwardSeg itself)
				forwardPressure = Math.max(
					forwardPressure,
					1 + forwardSeg.forwardPressure
				);
			}
	
			seg.forwardPressure = forwardPressure;
		}
	}
	
	
	// Find all the segments in `otherSegs` that vertically collide with `seg`.
	// Append into an optionally-supplied `results` array and return.
	function computeSlotSegCollisions(seg, otherSegs, results) {
		results = results || [];
	
		for (var i=0; i<otherSegs.length; i++) {
			if (isSlotSegCollision(seg, otherSegs[i])) {
				results.push(otherSegs[i]);
			}
		}
	
		return results;
	}
	
	
	// Do these segments occupy the same vertical space?
	function isSlotSegCollision(seg1, seg2) {
		return seg1.bottom > seg2.top && seg1.top < seg2.bottom;
	}
	
	;;
	
	/* An abstract class from which other views inherit from
	----------------------------------------------------------------------------------------------------------------------*/
	
	var View = fc.View = Class.extend({
	
		type: null, // subclass' view name (string)
		name: null, // deprecated. use `type` instead
		title: null, // the text that will be displayed in the header's title
	
		calendar: null, // owner Calendar object
		options: null, // hash containing all options. already merged with view-specific-options
		coordMap: null, // a CoordMap object for converting pixel regions to dates
		el: null, // the view's containing element. set by Calendar
	
		displaying: null, // a promise representing the state of rendering. null if no render requested
		isSkeletonRendered: false,
		isEventsRendered: false,
	
		// range the view is actually displaying (moments)
		start: null,
		end: null, // exclusive
	
		// range the view is formally responsible for (moments)
		// may be different from start/end. for example, a month view might have 1st-31st, excluding padded dates
		intervalStart: null,
		intervalEnd: null, // exclusive
		intervalDuration: null,
		intervalUnit: null, // name of largest unit being displayed, like "month" or "week"
	
		isRTL: false,
		isSelected: false, // boolean whether a range of time is user-selected or not
	
		eventOrderSpecs: null, // criteria for ordering events when they have same date/time
	
		// subclasses can optionally use a scroll container
		scrollerEl: null, // the element that will most likely scroll when content is too tall
		scrollTop: null, // cached vertical scroll value
	
		// classNames styled by jqui themes
		widgetHeaderClass: null,
		widgetContentClass: null,
		highlightStateClass: null,
	
		// for date utils, computed from options
		nextDayThreshold: null,
		isHiddenDayHash: null,
	
		// document handlers, bound to `this` object
		documentMousedownProxy: null, // TODO: doesn't work with touch
	
	
		constructor: function(calendar, type, options, intervalDuration) {
	
			this.calendar = calendar;
			this.type = this.name = type; // .name is deprecated
			this.options = options;
			this.intervalDuration = intervalDuration || moment.duration(1, 'day');
	
			this.nextDayThreshold = moment.duration(this.opt('nextDayThreshold'));
			this.initThemingProps();
			this.initHiddenDays();
			this.isRTL = this.opt('isRTL');
	
			this.eventOrderSpecs = parseFieldSpecs(this.opt('eventOrder'));
	
			this.documentMousedownProxy = proxy(this, 'documentMousedown');
	
			this.initialize();
		},
	
	
		// A good place for subclasses to initialize member variables
		initialize: function() {
			// subclasses can implement
		},
	
	
		// Retrieves an option with the given name
		opt: function(name) {
			return this.options[name];
		},
	
	
		// Triggers handlers that are view-related. Modifies args before passing to calendar.
		trigger: function(name, thisObj) { // arguments beyond thisObj are passed along
			var calendar = this.calendar;
	
			return calendar.trigger.apply(
				calendar,
				[name, thisObj || this].concat(
					Array.prototype.slice.call(arguments, 2), // arguments beyond thisObj
					[ this ] // always make the last argument a reference to the view. TODO: deprecate
				)
			);
		},
	
	
		/* Dates
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Updates all internal dates to center around the given current date
		setDate: function(date) {
			this.setRange(this.computeRange(date));
		},
	
	
		// Updates all internal dates for displaying the given range.
		// Expects all values to be normalized (like what computeRange does).
		setRange: function(range) {
			$.extend(this, range);
			this.updateTitle();
		},
	
	
		// Given a single current date, produce information about what range to display.
		// Subclasses can override. Must return all properties.
		computeRange: function(date) {
			var intervalUnit = computeIntervalUnit(this.intervalDuration);
			var intervalStart = date.clone().startOf(intervalUnit);
			var intervalEnd = intervalStart.clone().add(this.intervalDuration);
			var start, end;
	
			// normalize the range's time-ambiguity
			if (/year|month|week|day/.test(intervalUnit)) { // whole-days?
				intervalStart.stripTime();
				intervalEnd.stripTime();
			}
			else { // needs to have a time?
				if (!intervalStart.hasTime()) {
					intervalStart = this.calendar.rezoneDate(intervalStart); // convert to current timezone, with 00:00
				}
				if (!intervalEnd.hasTime()) {
					intervalEnd = this.calendar.rezoneDate(intervalEnd); // convert to current timezone, with 00:00
				}
			}
	
			start = intervalStart.clone();
			start = this.skipHiddenDays(start);
			end = intervalEnd.clone();
			end = this.skipHiddenDays(end, -1, true); // exclusively move backwards
	
			return {
				intervalUnit: intervalUnit,
				intervalStart: intervalStart,
				intervalEnd: intervalEnd,
				start: start,
				end: end
			};
		},
	
	
		// Computes the new date when the user hits the prev button, given the current date
		computePrevDate: function(date) {
			return this.massageCurrentDate(
				date.clone().startOf(this.intervalUnit).subtract(this.intervalDuration), -1
			);
		},
	
	
		// Computes the new date when the user hits the next button, given the current date
		computeNextDate: function(date) {
			return this.massageCurrentDate(
				date.clone().startOf(this.intervalUnit).add(this.intervalDuration)
			);
		},
	
	
		// Given an arbitrarily calculated current date of the calendar, returns a date that is ensured to be completely
		// visible. `direction` is optional and indicates which direction the current date was being
		// incremented or decremented (1 or -1).
		massageCurrentDate: function(date, direction) {
			if (this.intervalDuration.as('days') <= 1) { // if the view displays a single day or smaller
				if (this.isHiddenDay(date)) {
					date = this.skipHiddenDays(date, direction);
					date.startOf('day');
				}
			}
	
			return date;
		},
	
	
		/* Title and Date Formatting
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Sets the view's title property to the most updated computed value
		updateTitle: function() {
			this.title = this.computeTitle();
		},
	
	
		// Computes what the title at the top of the calendar should be for this view
		computeTitle: function() {
			return this.formatRange(
				{ start: this.intervalStart, end: this.intervalEnd },
				this.opt('titleFormat') || this.computeTitleFormat(),
				this.opt('titleRangeSeparator')
			);
		},
	
	
		// Generates the format string that should be used to generate the title for the current date range.
		// Attempts to compute the most appropriate format if not explicitly specified with `titleFormat`.
		computeTitleFormat: function() {
			if (this.intervalUnit == 'year') {
				return 'YYYY';
			}
			else if (this.intervalUnit == 'month') {
				return this.opt('monthYearFormat'); // like "September 2014"
			}
			else if (this.intervalDuration.as('days') > 1) {
				return 'll'; // multi-day range. shorter, like "Sep 9 - 10 2014"
			}
			else {
				return 'LL'; // one day. longer, like "September 9 2014"
			}
		},
	
	
		// Utility for formatting a range. Accepts a range object, formatting string, and optional separator.
		// Displays all-day ranges naturally, with an inclusive end. Takes the current isRTL into account.
		formatRange: function(range, formatStr, separator) {
			var end = range.end;
	
			if (!end.hasTime()) { // all-day?
				end = end.clone().subtract(1); // convert to inclusive. last ms of previous day
			}
	
			return formatRange(range.start, end, formatStr, separator, this.opt('isRTL'));
		},
	
	
		/* Rendering
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Sets the container element that the view should render inside of.
		// Does other DOM-related initializations.
		setElement: function(el) {
			this.el = el;
			this.bindGlobalHandlers();
		},
	
	
		// Removes the view's container element from the DOM, clearing any content beforehand.
		// Undoes any other DOM-related attachments.
		removeElement: function() {
			this.clear(); // clears all content
	
			// clean up the skeleton
			if (this.isSkeletonRendered) {
				this.unrenderSkeleton();
				this.isSkeletonRendered = false;
			}
	
			this.unbindGlobalHandlers();
	
			this.el.remove();
	
			// NOTE: don't null-out this.el in case the View was destroyed within an API callback.
			// We don't null-out the View's other jQuery element references upon destroy,
			//  so we shouldn't kill this.el either.
		},
	
	
		// Does everything necessary to display the view centered around the given date.
		// Does every type of rendering EXCEPT rendering events.
		// Is asychronous and returns a promise.
		display: function(date) {
			var _this = this;
			var scrollState = null;
	
			if (this.displaying) {
				scrollState = this.queryScroll();
			}
	
			return this.clear().then(function() { // clear the content first (async)
				return (
					_this.displaying =
						$.when(_this.displayView(date)) // displayView might return a promise
							.then(function() {
								_this.forceScroll(_this.computeInitialScroll(scrollState));
								_this.triggerRender();
							})
				);
			});
		},
	
	
		// Does everything necessary to clear the content of the view.
		// Clears dates and events. Does not clear the skeleton.
		// Is asychronous and returns a promise.
		clear: function() {
			var _this = this;
			var displaying = this.displaying;
	
			if (displaying) { // previously displayed, or in the process of being displayed?
				return displaying.then(function() { // wait for the display to finish
					_this.displaying = null;
					_this.clearEvents();
					return _this.clearView(); // might return a promise. chain it
				});
			}
			else {
				return $.when(); // an immediately-resolved promise
			}
		},
	
	
		// Displays the view's non-event content, such as date-related content or anything required by events.
		// Renders the view's non-content skeleton if necessary.
		// Can be asynchronous and return a promise.
		displayView: function(date) {
			if (!this.isSkeletonRendered) {
				this.renderSkeleton();
				this.isSkeletonRendered = true;
			}
			this.setDate(date);
			if (this.render) {
				this.render(); // TODO: deprecate
			}
			this.renderDates();
			this.updateSize();
			this.renderBusinessHours(); // might need coordinates, so should go after updateSize()
		},
	
	
		// Unrenders the view content that was rendered in displayView.
		// Can be asynchronous and return a promise.
		clearView: function() {
			this.unselect();
			this.triggerUnrender();
			this.unrenderBusinessHours();
			this.unrenderDates();
			if (this.destroy) {
				this.destroy(); // TODO: deprecate
			}
		},
	
	
		// Renders the basic structure of the view before any content is rendered
		renderSkeleton: function() {
			// subclasses should implement
		},
	
	
		// Unrenders the basic structure of the view
		unrenderSkeleton: function() {
			// subclasses should implement
		},
	
	
		// Renders the view's date-related content (like cells that represent days/times).
		// Assumes setRange has already been called and the skeleton has already been rendered.
		renderDates: function() {
			// subclasses should implement
		},
	
	
		// Unrenders the view's date-related content
		unrenderDates: function() {
			// subclasses should override
		},
	
	
		// Renders business-hours onto the view. Assumes updateSize has already been called.
		renderBusinessHours: function() {
			// subclasses should implement
		},
	
	
		// Unrenders previously-rendered business-hours
		unrenderBusinessHours: function() {
			// subclasses should implement
		},
	
	
		// Signals that the view's content has been rendered
		triggerRender: function() {
			this.trigger('viewRender', this, this, this.el);
		},
	
	
		// Signals that the view's content is about to be unrendered
		triggerUnrender: function() {
			this.trigger('viewDestroy', this, this, this.el);
		},
	
	
		// Binds DOM handlers to elements that reside outside the view container, such as the document
		bindGlobalHandlers: function() {
			$(document).on('mousedown', this.documentMousedownProxy);
		},
	
	
		// Unbinds DOM handlers from elements that reside outside the view container
		unbindGlobalHandlers: function() {
			$(document).off('mousedown', this.documentMousedownProxy);
		},
	
	
		// Initializes internal variables related to theming
		initThemingProps: function() {
			var tm = this.opt('theme') ? 'ui' : 'fc';
	
			this.widgetHeaderClass = tm + '-widget-header';
			this.widgetContentClass = tm + '-widget-content';
			this.highlightStateClass = tm + '-state-highlight';
		},
	
	
		/* Dimensions
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Refreshes anything dependant upon sizing of the container element of the grid
		updateSize: function(isResize) {
			var scrollState;
	
			if (isResize) {
				scrollState = this.queryScroll();
			}
	
			this.updateHeight(isResize);
			this.updateWidth(isResize);
	
			if (isResize) {
				this.setScroll(scrollState);
			}
		},
	
	
		// Refreshes the horizontal dimensions of the calendar
		updateWidth: function(isResize) {
			// subclasses should implement
		},
	
	
		// Refreshes the vertical dimensions of the calendar
		updateHeight: function(isResize) {
			var calendar = this.calendar; // we poll the calendar for height information
	
			this.setHeight(
				calendar.getSuggestedViewHeight(),
				calendar.isHeightAuto()
			);
		},
	
	
		// Updates the vertical dimensions of the calendar to the specified height.
		// if `isAuto` is set to true, height becomes merely a suggestion and the view should use its "natural" height.
		setHeight: function(height, isAuto) {
			// subclasses should implement
		},
	
	
		/* Scroller
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Given the total height of the view, return the number of pixels that should be used for the scroller.
		// Utility for subclasses.
		computeScrollerHeight: function(totalHeight) {
			var scrollerEl = this.scrollerEl;
			var both;
			var otherHeight; // cumulative height of everything that is not the scrollerEl in the view (header+borders)
	
			both = this.el.add(scrollerEl);
	
			// fuckin IE8/9/10/11 sometimes returns 0 for dimensions. this weird hack was the only thing that worked
			both.css({
				position: 'relative', // cause a reflow, which will force fresh dimension recalculation
				left: -1 // ensure reflow in case the el was already relative. negative is less likely to cause new scroll
			});
			otherHeight = this.el.outerHeight() - scrollerEl.height(); // grab the dimensions
			both.css({ position: '', left: '' }); // undo hack
	
			return totalHeight - otherHeight;
		},
	
	
		// Computes the initial pre-configured scroll state prior to allowing the user to change it.
		// Given the scroll state from the previous rendering. If first time rendering, given null.
		computeInitialScroll: function(previousScrollState) {
			return 0;
		},
	
	
		// Retrieves the view's current natural scroll state. Can return an arbitrary format.
		queryScroll: function() {
			if (this.scrollerEl) {
				return this.scrollerEl.scrollTop(); // operates on scrollerEl by default
			}
		},
	
	
		// Sets the view's scroll state. Will accept the same format computeInitialScroll and queryScroll produce.
		setScroll: function(scrollState) {
			if (this.scrollerEl) {
				return this.scrollerEl.scrollTop(scrollState); // operates on scrollerEl by default
			}
		},
	
	
		// Sets the scroll state, making sure to overcome any predefined scroll value the browser has in mind
		forceScroll: function(scrollState) {
			var _this = this;
	
			this.setScroll(scrollState);
			setTimeout(function() {
				_this.setScroll(scrollState);
			}, 0);
		},
	
	
		/* Event Elements / Segments
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Does everything necessary to display the given events onto the current view
		displayEvents: function(events) {
			var scrollState = this.queryScroll();
	
			this.clearEvents();
			this.renderEvents(events);
			this.isEventsRendered = true;
			this.setScroll(scrollState);
			this.triggerEventRender();
		},
	
	
		// Does everything necessary to clear the view's currently-rendered events
		clearEvents: function() {
			if (this.isEventsRendered) {
				this.triggerEventUnrender();
				if (this.destroyEvents) {
					this.destroyEvents(); // TODO: deprecate
				}
				this.unrenderEvents();
				this.isEventsRendered = false;
			}
		},
	
	
		// Renders the events onto the view.
		renderEvents: function(events) {
			// subclasses should implement
		},
	
	
		// Removes event elements from the view.
		unrenderEvents: function() {
			// subclasses should implement
		},
	
	
		// Signals that all events have been rendered
		triggerEventRender: function() {
			this.renderedEventSegEach(function(seg) {
				this.trigger('eventAfterRender', seg.event, seg.event, seg.el);
			});
			this.trigger('eventAfterAllRender');
		},
	
	
		// Signals that all event elements are about to be removed
		triggerEventUnrender: function() {
			this.renderedEventSegEach(function(seg) {
				this.trigger('eventDestroy', seg.event, seg.event, seg.el);
			});
		},
	
	
		// Given an event and the default element used for rendering, returns the element that should actually be used.
		// Basically runs events and elements through the eventRender hook.
		resolveEventEl: function(event, el) {
			var custom = this.trigger('eventRender', event, event, el);
	
			if (custom === false) { // means don't render at all
				el = null;
			}
			else if (custom && custom !== true) {
				el = $(custom);
			}
	
			return el;
		},
	
	
		// Hides all rendered event segments linked to the given event
		showEvent: function(event) {
			this.renderedEventSegEach(function(seg) {
				seg.el.css('visibility', '');
			}, event);
		},
	
	
		// Shows all rendered event segments linked to the given event
		hideEvent: function(event) {
			this.renderedEventSegEach(function(seg) {
				seg.el.css('visibility', 'hidden');
			}, event);
		},
	
	
		// Iterates through event segments that have been rendered (have an el). Goes through all by default.
		// If the optional `event` argument is specified, only iterates through segments linked to that event.
		// The `this` value of the callback function will be the view.
		renderedEventSegEach: function(func, event) {
			var segs = this.getEventSegs();
			var i;
	
			for (i = 0; i < segs.length; i++) {
				if (!event || segs[i].event._id === event._id) {
					if (segs[i].el) {
						func.call(this, segs[i]);
					}
				}
			}
		},
	
	
		// Retrieves all the rendered segment objects for the view
		getEventSegs: function() {
			// subclasses must implement
			return [];
		},
	
	
		/* Event Drag-n-Drop
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Computes if the given event is allowed to be dragged by the user
		isEventDraggable: function(event) {
			var source = event.source || {};
	
			return firstDefined(
				event.startEditable,
				source.startEditable,
				this.opt('eventStartEditable'),
				event.editable,
				source.editable,
				this.opt('editable')
			);
		},
	
	
		// Must be called when an event in the view is dropped onto new location.
		// `dropLocation` is an object that contains the new start/end/allDay values for the event.
		reportEventDrop: function(event, dropLocation, largeUnit, el, ev) {
			var calendar = this.calendar;
			var mutateResult = calendar.mutateEvent(event, dropLocation, largeUnit);
			var undoFunc = function() {
				mutateResult.undo();
				calendar.reportEventChange();
			};
	
			this.triggerEventDrop(event, mutateResult.dateDelta, undoFunc, el, ev);
			calendar.reportEventChange(); // will rerender events
		},
	
	
		// Triggers event-drop handlers that have subscribed via the API
		triggerEventDrop: function(event, dateDelta, undoFunc, el, ev) {
			this.trigger('eventDrop', el[0], event, dateDelta, undoFunc, ev, {}); // {} = jqui dummy
		},
	
	
		/* External Element Drag-n-Drop
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Must be called when an external element, via jQuery UI, has been dropped onto the calendar.
		// `meta` is the parsed data that has been embedded into the dragging event.
		// `dropLocation` is an object that contains the new start/end/allDay values for the event.
		reportExternalDrop: function(meta, dropLocation, el, ev, ui) {
			var eventProps = meta.eventProps;
			var eventInput;
			var event;
	
			// Try to build an event object and render it. TODO: decouple the two
			if (eventProps) {
				eventInput = $.extend({}, eventProps, dropLocation);
				event = this.calendar.renderEvent(eventInput, meta.stick)[0]; // renderEvent returns an array
			}
	
			this.triggerExternalDrop(event, dropLocation, el, ev, ui);
		},
	
	
		// Triggers external-drop handlers that have subscribed via the API
		triggerExternalDrop: function(event, dropLocation, el, ev, ui) {
	
			// trigger 'drop' regardless of whether element represents an event
			this.trigger('drop', el[0], dropLocation.start, ev, ui);
	
			if (event) {
				this.trigger('eventReceive', null, event); // signal an external event landed
			}
		},
	
	
		/* Drag-n-Drop Rendering (for both events and external elements)
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a visual indication of a event or external-element drag over the given drop zone.
		// If an external-element, seg will be `null`
		renderDrag: function(dropLocation, seg) {
			// subclasses must implement
		},
	
	
		// Unrenders a visual indication of an event or external-element being dragged.
		unrenderDrag: function() {
			// subclasses must implement
		},
	
	
		/* Event Resizing
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Computes if the given event is allowed to be resized from its starting edge
		isEventResizableFromStart: function(event) {
			return this.opt('eventResizableFromStart') && this.isEventResizable(event);
		},
	
	
		// Computes if the given event is allowed to be resized from its ending edge
		isEventResizableFromEnd: function(event) {
			return this.isEventResizable(event);
		},
	
	
		// Computes if the given event is allowed to be resized by the user at all
		isEventResizable: function(event) {
			var source = event.source || {};
	
			return firstDefined(
				event.durationEditable,
				source.durationEditable,
				this.opt('eventDurationEditable'),
				event.editable,
				source.editable,
				this.opt('editable')
			);
		},
	
	
		// Must be called when an event in the view has been resized to a new length
		reportEventResize: function(event, resizeLocation, largeUnit, el, ev) {
			var calendar = this.calendar;
			var mutateResult = calendar.mutateEvent(event, resizeLocation, largeUnit);
			var undoFunc = function() {
				mutateResult.undo();
				calendar.reportEventChange();
			};
	
			this.triggerEventResize(event, mutateResult.durationDelta, undoFunc, el, ev);
			calendar.reportEventChange(); // will rerender events
		},
	
	
		// Triggers event-resize handlers that have subscribed via the API
		triggerEventResize: function(event, durationDelta, undoFunc, el, ev) {
			this.trigger('eventResize', el[0], event, durationDelta, undoFunc, ev, {}); // {} = jqui dummy
		},
	
	
		/* Selection
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Selects a date range on the view. `start` and `end` are both Moments.
		// `ev` is the native mouse event that begin the interaction.
		select: function(range, ev) {
			this.unselect(ev);
			this.renderSelection(range);
			this.reportSelection(range, ev);
		},
	
	
		// Renders a visual indication of the selection
		renderSelection: function(range) {
			// subclasses should implement
		},
	
	
		// Called when a new selection is made. Updates internal state and triggers handlers.
		reportSelection: function(range, ev) {
			this.isSelected = true;
			this.triggerSelect(range, ev);
		},
	
	
		// Triggers handlers to 'select'
		triggerSelect: function(range, ev) {
			this.trigger('select', null, range.start, range.end, ev);
		},
	
	
		// Undoes a selection. updates in the internal state and triggers handlers.
		// `ev` is the native mouse event that began the interaction.
		unselect: function(ev) {
			if (this.isSelected) {
				this.isSelected = false;
				if (this.destroySelection) {
					this.destroySelection(); // TODO: deprecate
				}
				this.unrenderSelection();
				this.trigger('unselect', null, ev);
			}
		},
	
	
		// Unrenders a visual indication of selection
		unrenderSelection: function() {
			// subclasses should implement
		},
	
	
		// Handler for unselecting when the user clicks something and the 'unselectAuto' setting is on
		documentMousedown: function(ev) {
			var ignore;
	
			// is there a selection, and has the user made a proper left click?
			if (this.isSelected && this.opt('unselectAuto') && isPrimaryMouseButton(ev)) {
	
				// only unselect if the clicked element is not identical to or inside of an 'unselectCancel' element
				ignore = this.opt('unselectCancel');
				if (!ignore || !$(ev.target).closest(ignore).length) {
					this.unselect(ev);
				}
			}
		},
	
	
		/* Day Click
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Triggers handlers to 'dayClick'
		triggerDayClick: function(cell, dayEl, ev) {
			this.trigger('dayClick', dayEl, cell.start, ev);
		},
	
	
		/* Date Utils
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Initializes internal variables related to calculating hidden days-of-week
		initHiddenDays: function() {
			var hiddenDays = this.opt('hiddenDays') || []; // array of day-of-week indices that are hidden
			var isHiddenDayHash = []; // is the day-of-week hidden? (hash with day-of-week-index -> bool)
			var dayCnt = 0;
			var i;
	
			if (this.opt('weekends') === false) {
				hiddenDays.push(0, 6); // 0=sunday, 6=saturday
			}
	
			for (i = 0; i < 7; i++) {
				if (
					!(isHiddenDayHash[i] = $.inArray(i, hiddenDays) !== -1)
				) {
					dayCnt++;
				}
			}
	
			if (!dayCnt) {
				throw 'invalid hiddenDays'; // all days were hidden? bad.
			}
	
			this.isHiddenDayHash = isHiddenDayHash;
		},
	
	
		// Is the current day hidden?
		// `day` is a day-of-week index (0-6), or a Moment
		isHiddenDay: function(day) {
			if (moment.isMoment(day)) {
				day = day.day();
			}
			return this.isHiddenDayHash[day];
		},
	
	
		// Incrementing the current day until it is no longer a hidden day, returning a copy.
		// If the initial value of `date` is not a hidden day, don't do anything.
		// Pass `isExclusive` as `true` if you are dealing with an end date.
		// `inc` defaults to `1` (increment one day forward each time)
		skipHiddenDays: function(date, inc, isExclusive) {
			var out = date.clone();
			inc = inc || 1;
			while (
				this.isHiddenDayHash[(out.day() + (isExclusive ? inc : 0) + 7) % 7]
			) {
				out.add(inc, 'days');
			}
			return out;
		},
	
	
		// Returns the date range of the full days the given range visually appears to occupy.
		// Returns a new range object.
		computeDayRange: function(range) {
			var startDay = range.start.clone().stripTime(); // the beginning of the day the range starts
			var end = range.end;
			var endDay = null;
			var endTimeMS;
	
			if (end) {
				endDay = end.clone().stripTime(); // the beginning of the day the range exclusively ends
				endTimeMS = +end.time(); // # of milliseconds into `endDay`
	
				// If the end time is actually inclusively part of the next day and is equal to or
				// beyond the next day threshold, adjust the end to be the exclusive end of `endDay`.
				// Otherwise, leaving it as inclusive will cause it to exclude `endDay`.
				if (endTimeMS && endTimeMS >= this.nextDayThreshold) {
					endDay.add(1, 'days');
				}
			}
	
			// If no end was specified, or if it is within `startDay` but not past nextDayThreshold,
			// assign the default duration of one day.
			if (!end || endDay <= startDay) {
				endDay = startDay.clone().add(1, 'days');
			}
	
			return { start: startDay, end: endDay };
		},
	
	
		// Does the given event visually appear to occupy more than one day?
		isMultiDayEvent: function(event) {
			var range = this.computeDayRange(event); // event is range-ish
	
			return range.end.diff(range.start, 'days') > 1;
		}
	
	});
	
	;;
	
	var Calendar = fc.Calendar = Class.extend({
	
		dirDefaults: null, // option defaults related to LTR or RTL
		langDefaults: null, // option defaults related to current locale
		overrides: null, // option overrides given to the fullCalendar constructor
		options: null, // all defaults combined with overrides
		viewSpecCache: null, // cache of view definitions
		view: null, // current View object
		header: null,
		loadingLevel: 0, // number of simultaneous loading tasks
	
	
		// a lot of this class' OOP logic is scoped within this constructor function,
		// but in the future, write individual methods on the prototype.
		constructor: Calendar_constructor,
	
	
		// Subclasses can override this for initialization logic after the constructor has been called
		initialize: function() {
		},
	
	
		// Initializes `this.options` and other important options-related objects
		initOptions: function(overrides) {
			var lang, langDefaults;
			var isRTL, dirDefaults;
	
			// converts legacy options into non-legacy ones.
			// in the future, when this is removed, don't use `overrides` reference. make a copy.
			overrides = massageOverrides(overrides);
	
			lang = overrides.lang;
			langDefaults = langOptionHash[lang];
			if (!langDefaults) {
				lang = Calendar.defaults.lang;
				langDefaults = langOptionHash[lang] || {};
			}
	
			isRTL = firstDefined(
				overrides.isRTL,
				langDefaults.isRTL,
				Calendar.defaults.isRTL
			);
			dirDefaults = isRTL ? Calendar.rtlDefaults : {};
	
			this.dirDefaults = dirDefaults;
			this.langDefaults = langDefaults;
			this.overrides = overrides;
			this.options = mergeOptions([ // merge defaults and overrides. lowest to highest precedence
				Calendar.defaults, // global defaults
				dirDefaults,
				langDefaults,
				overrides
			]);
			populateInstanceComputableOptions(this.options);
	
			this.viewSpecCache = {}; // somewhat unrelated
		},
	
	
		// Gets information about how to create a view. Will use a cache.
		getViewSpec: function(viewType) {
			var cache = this.viewSpecCache;
	
			return cache[viewType] || (cache[viewType] = this.buildViewSpec(viewType));
		},
	
	
		// Given a duration singular unit, like "week" or "day", finds a matching view spec.
		// Preference is given to views that have corresponding buttons.
		getUnitViewSpec: function(unit) {
			var viewTypes;
			var i;
			var spec;
	
			if ($.inArray(unit, intervalUnits) != -1) {
	
				// put views that have buttons first. there will be duplicates, but oh well
				viewTypes = this.header.getViewsWithButtons();
				$.each(fc.views, function(viewType) { // all views
					viewTypes.push(viewType);
				});
	
				for (i = 0; i < viewTypes.length; i++) {
					spec = this.getViewSpec(viewTypes[i]);
					if (spec) {
						if (spec.singleUnit == unit) {
							return spec;
						}
					}
				}
			}
		},
	
	
		// Builds an object with information on how to create a given view
		buildViewSpec: function(requestedViewType) {
			var viewOverrides = this.overrides.views || {};
			var specChain = []; // for the view. lowest to highest priority
			var defaultsChain = []; // for the view. lowest to highest priority
			var overridesChain = []; // for the view. lowest to highest priority
			var viewType = requestedViewType;
			var spec; // for the view
			var overrides; // for the view
			var duration;
			var unit;
	
			// iterate from the specific view definition to a more general one until we hit an actual View class
			while (viewType) {
				spec = fcViews[viewType];
				overrides = viewOverrides[viewType];
				viewType = null; // clear. might repopulate for another iteration
	
				if (typeof spec === 'function') { // TODO: deprecate
					spec = { 'class': spec };
				}
	
				if (spec) {
					specChain.unshift(spec);
					defaultsChain.unshift(spec.defaults || {});
					duration = duration || spec.duration;
					viewType = viewType || spec.type;
				}
	
				if (overrides) {
					overridesChain.unshift(overrides); // view-specific option hashes have options at zero-level
					duration = duration || overrides.duration;
					viewType = viewType || overrides.type;
				}
			}
	
			spec = mergeProps(specChain);
			spec.type = requestedViewType;
			if (!spec['class']) {
				return false;
			}
	
			if (duration) {
				duration = moment.duration(duration);
				if (duration.valueOf()) { // valid?
					spec.duration = duration;
					unit = computeIntervalUnit(duration);
	
					// view is a single-unit duration, like "week" or "day"
					// incorporate options for this. lowest priority
					if (duration.as(unit) === 1) {
						spec.singleUnit = unit;
						overridesChain.unshift(viewOverrides[unit] || {});
					}
				}
			}
	
			spec.defaults = mergeOptions(defaultsChain);
			spec.overrides = mergeOptions(overridesChain);
	
			this.buildViewSpecOptions(spec);
			this.buildViewSpecButtonText(spec, requestedViewType);
	
			return spec;
		},
	
	
		// Builds and assigns a view spec's options object from its already-assigned defaults and overrides
		buildViewSpecOptions: function(spec) {
			spec.options = mergeOptions([ // lowest to highest priority
				Calendar.defaults, // global defaults
				spec.defaults, // view's defaults (from ViewSubclass.defaults)
				this.dirDefaults,
				this.langDefaults, // locale and dir take precedence over view's defaults!
				this.overrides, // calendar's overrides (options given to constructor)
				spec.overrides // view's overrides (view-specific options)
			]);
			populateInstanceComputableOptions(spec.options);
		},
	
	
		// Computes and assigns a view spec's buttonText-related options
		buildViewSpecButtonText: function(spec, requestedViewType) {
	
			// given an options object with a possible `buttonText` hash, lookup the buttonText for the
			// requested view, falling back to a generic unit entry like "week" or "day"
			function queryButtonText(options) {
				var buttonText = options.buttonText || {};
				return buttonText[requestedViewType] ||
					(spec.singleUnit ? buttonText[spec.singleUnit] : null);
			}
	
			// highest to lowest priority
			spec.buttonTextOverride =
				queryButtonText(this.overrides) || // constructor-specified buttonText lookup hash takes precedence
				spec.overrides.buttonText; // `buttonText` for view-specific options is a string
	
			// highest to lowest priority. mirrors buildViewSpecOptions
			spec.buttonTextDefault =
				queryButtonText(this.langDefaults) ||
				queryButtonText(this.dirDefaults) ||
				spec.defaults.buttonText || // a single string. from ViewSubclass.defaults
				queryButtonText(Calendar.defaults) ||
				(spec.duration ? this.humanizeDuration(spec.duration) : null) || // like "3 days"
				requestedViewType; // fall back to given view name
		},
	
	
		// Given a view name for a custom view or a standard view, creates a ready-to-go View object
		instantiateView: function(viewType) {
			var spec = this.getViewSpec(viewType);
	
			return new spec['class'](this, viewType, spec.options, spec.duration);
		},
	
	
		// Returns a boolean about whether the view is okay to instantiate at some point
		isValidViewType: function(viewType) {
			return Boolean(this.getViewSpec(viewType));
		},
	
	
		// Should be called when any type of async data fetching begins
		pushLoading: function() {
			if (!(this.loadingLevel++)) {
				this.trigger('loading', null, true, this.view);
			}
		},
	
	
		// Should be called when any type of async data fetching completes
		popLoading: function() {
			if (!(--this.loadingLevel)) {
				this.trigger('loading', null, false, this.view);
			}
		},
	
	
		// Given arguments to the select method in the API, returns a range
		buildSelectRange: function(start, end) {
	
			start = this.moment(start);
			if (end) {
				end = this.moment(end);
			}
			else if (start.hasTime()) {
				end = start.clone().add(this.defaultTimedEventDuration);
			}
			else {
				end = start.clone().add(this.defaultAllDayEventDuration);
			}
	
			return { start: start, end: end };
		}
	
	});
	
	
	Calendar.mixin(Emitter);
	
	
	function Calendar_constructor(element, overrides) {
		var t = this;
	
	
		t.initOptions(overrides || {});
		var options = this.options;
	
		
		// Exports
		// -----------------------------------------------------------------------------------
	
		t.render = render;
		t.destroy = destroy;
		t.refetchEvents = refetchEvents;
		t.reportEvents = reportEvents;
		t.reportEventChange = reportEventChange;
		t.rerenderEvents = renderEvents; // `renderEvents` serves as a rerender. an API method
		t.changeView = renderView; // `renderView` will switch to another view
		t.select = select;
		t.unselect = unselect;
		t.prev = prev;
		t.next = next;
		t.prevYear = prevYear;
		t.nextYear = nextYear;
		t.today = today;
		t.gotoDate = gotoDate;
		t.incrementDate = incrementDate;
		t.zoomTo = zoomTo;
		t.getDate = getDate;
		t.getCalendar = getCalendar;
		t.getView = getView;
		t.option = option;
		t.trigger = trigger;
	
	
	
		// Language-data Internals
		// -----------------------------------------------------------------------------------
		// Apply overrides to the current language's data
	
	
		var localeData = createObject( // make a cheap copy
			getMomentLocaleData(options.lang) // will fall back to en
		);
	
		if (options.monthNames) {
			localeData._months = options.monthNames;
		}
		if (options.monthNamesShort) {
			localeData._monthsShort = options.monthNamesShort;
		}
		if (options.dayNames) {
			localeData._weekdays = options.dayNames;
		}
		if (options.dayNamesShort) {
			localeData._weekdaysShort = options.dayNamesShort;
		}
		if (options.firstDay != null) {
			var _week = createObject(localeData._week); // _week: { dow: # }
			_week.dow = options.firstDay;
			localeData._week = _week;
		}
	
		// assign a normalized value, to be used by our .week() moment extension
		localeData._fullCalendar_weekCalc = (function(weekCalc) {
			if (typeof weekCalc === 'function') {
				return weekCalc;
			}
			else if (weekCalc === 'local') {
				return weekCalc;
			}
			else if (weekCalc === 'iso' || weekCalc === 'ISO') {
				return 'ISO';
			}
		})(options.weekNumberCalculation);
	
	
	
		// Calendar-specific Date Utilities
		// -----------------------------------------------------------------------------------
	
	
		t.defaultAllDayEventDuration = moment.duration(options.defaultAllDayEventDuration);
		t.defaultTimedEventDuration = moment.duration(options.defaultTimedEventDuration);
	
	
		// Builds a moment using the settings of the current calendar: timezone and language.
		// Accepts anything the vanilla moment() constructor accepts.
		t.moment = function() {
			var mom;
	
			if (options.timezone === 'local') {
				mom = fc.moment.apply(null, arguments);
	
				// Force the moment to be local, because fc.moment doesn't guarantee it.
				if (mom.hasTime()) { // don't give ambiguously-timed moments a local zone
					mom.local();
				}
			}
			else if (options.timezone === 'UTC') {
				mom = fc.moment.utc.apply(null, arguments); // process as UTC
			}
			else {
				mom = fc.moment.parseZone.apply(null, arguments); // let the input decide the zone
			}
	
			if ('_locale' in mom) { // moment 2.8 and above
				mom._locale = localeData;
			}
			else { // pre-moment-2.8
				mom._lang = localeData;
			}
	
			return mom;
		};
	
	
		// Returns a boolean about whether or not the calendar knows how to calculate
		// the timezone offset of arbitrary dates in the current timezone.
		t.getIsAmbigTimezone = function() {
			return options.timezone !== 'local' && options.timezone !== 'UTC';
		};
	
	
		// Returns a copy of the given date in the current timezone of it is ambiguously zoned.
		// This will also give the date an unambiguous time.
		t.rezoneDate = function(date) {
			return t.moment(date.toArray());
		};
	
	
		// Returns a moment for the current date, as defined by the client's computer,
		// or overridden by the `now` option.
		t.getNow = function() {
			var now = options.now;
			if (typeof now === 'function') {
				now = now();
			}
			return t.moment(now);
		};
	
	
		// Get an event's normalized end date. If not present, calculate it from the defaults.
		t.getEventEnd = function(event) {
			if (event.end) {
				return event.end.clone();
			}
			else {
				return t.getDefaultEventEnd(event.allDay, event.start);
			}
		};
	
	
		// Given an event's allDay status and start date, return swhat its fallback end date should be.
		t.getDefaultEventEnd = function(allDay, start) { // TODO: rename to computeDefaultEventEnd
			var end = start.clone();
	
			if (allDay) {
				end.stripTime().add(t.defaultAllDayEventDuration);
			}
			else {
				end.add(t.defaultTimedEventDuration);
			}
	
			if (t.getIsAmbigTimezone()) {
				end.stripZone(); // we don't know what the tzo should be
			}
	
			return end;
		};
	
	
		// Produces a human-readable string for the given duration.
		// Side-effect: changes the locale of the given duration.
		t.humanizeDuration = function(duration) {
			return (duration.locale || duration.lang).call(duration, options.lang) // works moment-pre-2.8
				.humanize();
		};
	
	
		
		// Imports
		// -----------------------------------------------------------------------------------
	
	
		EventManager.call(t, options);
		var isFetchNeeded = t.isFetchNeeded;
		var fetchEvents = t.fetchEvents;
	
	
	
		// Locals
		// -----------------------------------------------------------------------------------
	
	
		var _element = element[0];
		var header;
		var headerElement;
		var content;
		var tm; // for making theme classes
		var currentView; // NOTE: keep this in sync with this.view
		var viewsByType = {}; // holds all instantiated view instances, current or not
		var suggestedViewHeight;
		var windowResizeProxy; // wraps the windowResize function
		var ignoreWindowResize = 0;
		var date;
		var events = [];
		
		
		
		// Main Rendering
		// -----------------------------------------------------------------------------------
	
	
		if (options.defaultDate != null) {
			date = t.moment(options.defaultDate);
		}
		else {
			date = t.getNow();
		}
		
		
		function render() {
			if (!content) {
				initialRender();
			}
			else if (elementVisible()) {
				// mainly for the public API
				calcSize();
				renderView();
			}
		}
		
		
		function initialRender() {
			tm = options.theme ? 'ui' : 'fc';
			element.addClass('fc');
	
			if (options.isRTL) {
				element.addClass('fc-rtl');
			}
			else {
				element.addClass('fc-ltr');
			}
	
			if (options.theme) {
				element.addClass('ui-widget');
			}
			else {
				element.addClass('fc-unthemed');
			}
	
			content = $("<div class='fc-view-container'/>").prependTo(element);
	
			header = t.header = new Header(t, options);
			headerElement = header.render();
			if (headerElement) {
				element.prepend(headerElement);
			}
	
			renderView(options.defaultView);
	
			if (options.handleWindowResize) {
				windowResizeProxy = debounce(windowResize, options.windowResizeDelay); // prevents rapid calls
				$(window).resize(windowResizeProxy);
			}
		}
		
		
		function destroy() {
	
			if (currentView) {
				currentView.removeElement();
	
				// NOTE: don't null-out currentView/t.view in case API methods are called after destroy.
				// It is still the "current" view, just not rendered.
			}
	
			header.removeElement();
			content.remove();
			element.removeClass('fc fc-ltr fc-rtl fc-unthemed ui-widget');
	
			if (windowResizeProxy) {
				$(window).unbind('resize', windowResizeProxy);
			}
		}
		
		
		function elementVisible() {
			return element.is(':visible');
		}
		
		
	
		// View Rendering
		// -----------------------------------------------------------------------------------
	
	
		// Renders a view because of a date change, view-type change, or for the first time.
		// If not given a viewType, keep the current view but render different dates.
		function renderView(viewType) {
			ignoreWindowResize++;
	
			// if viewType is changing, remove the old view's rendering
			if (currentView && viewType && currentView.type !== viewType) {
				header.deactivateButton(currentView.type);
				freezeContentHeight(); // prevent a scroll jump when view element is removed
				currentView.removeElement();
				currentView = t.view = null;
			}
	
			// if viewType changed, or the view was never created, create a fresh view
			if (!currentView && viewType) {
				currentView = t.view =
					viewsByType[viewType] ||
					(viewsByType[viewType] = t.instantiateView(viewType));
	
				currentView.setElement(
					$("<div class='fc-view fc-" + viewType + "-view' />").appendTo(content)
				);
				header.activateButton(viewType);
			}
	
			if (currentView) {
	
				// in case the view should render a period of time that is completely hidden
				date = currentView.massageCurrentDate(date);
	
				// render or rerender the view
				if (
					!currentView.displaying ||
					!date.isWithin(currentView.intervalStart, currentView.intervalEnd) // implicit date window change
				) {
					if (elementVisible()) {
	
						freezeContentHeight();
						currentView.display(date);
						unfreezeContentHeight(); // immediately unfreeze regardless of whether display is async
	
						// need to do this after View::render, so dates are calculated
						updateHeaderTitle();
						updateTodayButton();
	
						getAndRenderEvents();
					}
				}
			}
	
			unfreezeContentHeight(); // undo any lone freezeContentHeight calls
			ignoreWindowResize--;
		}
	
		
	
		// Resizing
		// -----------------------------------------------------------------------------------
	
	
		t.getSuggestedViewHeight = function() {
			if (suggestedViewHeight === undefined) {
				calcSize();
			}
			return suggestedViewHeight;
		};
	
	
		t.isHeightAuto = function() {
			return options.contentHeight === 'auto' || options.height === 'auto';
		};
		
		
		function updateSize(shouldRecalc) {
			if (elementVisible()) {
	
				if (shouldRecalc) {
					_calcSize();
				}
	
				ignoreWindowResize++;
				currentView.updateSize(true); // isResize=true. will poll getSuggestedViewHeight() and isHeightAuto()
				ignoreWindowResize--;
	
				return true; // signal success
			}
		}
	
	
		function calcSize() {
			if (elementVisible()) {
				_calcSize();
			}
		}
		
		
		function _calcSize() { // assumes elementVisible
			if (typeof options.contentHeight === 'number') { // exists and not 'auto'
				suggestedViewHeight = options.contentHeight;
			}
			else if (typeof options.height === 'number') { // exists and not 'auto'
				suggestedViewHeight = options.height - (headerElement ? headerElement.outerHeight(true) : 0);
			}
			else {
				suggestedViewHeight = Math.round(content.width() / Math.max(options.aspectRatio, .5));
			}
		}
		
		
		function windowResize(ev) {
			if (
				!ignoreWindowResize &&
				ev.target === window && // so we don't process jqui "resize" events that have bubbled up
				currentView.start // view has already been rendered
			) {
				if (updateSize(true)) {
					currentView.trigger('windowResize', _element);
				}
			}
		}
		
		
		
		/* Event Fetching/Rendering
		-----------------------------------------------------------------------------*/
		// TODO: going forward, most of this stuff should be directly handled by the view
	
	
		function refetchEvents() { // can be called as an API method
			destroyEvents(); // so that events are cleared before user starts waiting for AJAX
			fetchAndRenderEvents();
		}
	
	
		function renderEvents() { // destroys old events if previously rendered
			if (elementVisible()) {
				freezeContentHeight();
				currentView.displayEvents(events);
				unfreezeContentHeight();
			}
		}
	
	
		function destroyEvents() {
			freezeContentHeight();
			currentView.clearEvents();
			unfreezeContentHeight();
		}
		
	
		function getAndRenderEvents() {
			if (!options.lazyFetching || isFetchNeeded(currentView.start, currentView.end)) {
				fetchAndRenderEvents();
			}
			else {
				renderEvents();
			}
		}
	
	
		function fetchAndRenderEvents() {
			fetchEvents(currentView.start, currentView.end);
				// ... will call reportEvents
				// ... which will call renderEvents
		}
	
		
		// called when event data arrives
		function reportEvents(_events) {
			events = _events;
			renderEvents();
		}
	
	
		// called when a single event's data has been changed
		function reportEventChange() {
			renderEvents();
		}
	
	
	
		/* Header Updating
		-----------------------------------------------------------------------------*/
	
	
		function updateHeaderTitle() {
			header.updateTitle(currentView.title);
		}
	
	
		function updateTodayButton() {
			var now = t.getNow();
			if (now.isWithin(currentView.intervalStart, currentView.intervalEnd)) {
				header.disableButton('today');
			}
			else {
				header.enableButton('today');
			}
		}
		
	
	
		/* Selection
		-----------------------------------------------------------------------------*/
		
	
		function select(start, end) {
			currentView.select(
				t.buildSelectRange.apply(t, arguments)
			);
		}
		
	
		function unselect() { // safe to be called before renderView
			if (currentView) {
				currentView.unselect();
			}
		}
		
		
		
		/* Date
		-----------------------------------------------------------------------------*/
		
		
		function prev() {
			date = currentView.computePrevDate(date);
			renderView();
		}
		
		
		function next() {
			date = currentView.computeNextDate(date);
			renderView();
		}
		
		
		function prevYear() {
			date.add(-1, 'years');
			renderView();
		}
		
		
		function nextYear() {
			date.add(1, 'years');
			renderView();
		}
		
		
		function today() {
			date = t.getNow();
			renderView();
		}
		
		
		function gotoDate(dateInput) {
			date = t.moment(dateInput);
			renderView();
		}
		
		
		function incrementDate(delta) {
			date.add(moment.duration(delta));
			renderView();
		}
	
	
		// Forces navigation to a view for the given date.
		// `viewType` can be a specific view name or a generic one like "week" or "day".
		function zoomTo(newDate, viewType) {
			var spec;
	
			viewType = viewType || 'day'; // day is default zoom
			spec = t.getViewSpec(viewType) || t.getUnitViewSpec(viewType);
	
			date = newDate;
			renderView(spec ? spec.type : null);
		}
		
		
		function getDate() {
			return date.clone();
		}
	
	
	
		/* Height "Freezing"
		-----------------------------------------------------------------------------*/
		// TODO: move this into the view
	
	
		function freezeContentHeight() {
			content.css({
				width: '100%',
				height: content.height(),
				overflow: 'hidden'
			});
		}
	
	
		function unfreezeContentHeight() {
			content.css({
				width: '',
				height: '',
				overflow: ''
			});
		}
		
		
		
		/* Misc
		-----------------------------------------------------------------------------*/
		
	
		function getCalendar() {
			return t;
		}
	
		
		function getView() {
			return currentView;
		}
		
		
		function option(name, value) {
			if (value === undefined) {
				return options[name];
			}
			if (name == 'height' || name == 'contentHeight' || name == 'aspectRatio') {
				options[name] = value;
				updateSize(true); // true = allow recalculation of height
			}
		}
		
		
		function trigger(name, thisObj) { // overrides the Emitter's trigger method :(
			var args = Array.prototype.slice.call(arguments, 2);
	
			thisObj = thisObj || _element;
			this.triggerWith(name, thisObj, args); // Emitter's method
	
			if (options[name]) {
				return options[name].apply(thisObj, args);
			}
		}
	
		t.initialize();
	}
	
	;;
	
	Calendar.defaults = {
	
		titleRangeSeparator: ' \u2014 ', // emphasized dash
		monthYearFormat: 'MMMM YYYY', // required for en. other languages rely on datepicker computable option
	
		defaultTimedEventDuration: '02:00:00',
		defaultAllDayEventDuration: { days: 1 },
		forceEventDuration: false,
		nextDayThreshold: '09:00:00', // 9am
	
		// display
		defaultView: 'month',
		aspectRatio: 1.35,
		header: {
			left: 'title',
			center: '',
			right: 'today prev,next'
		},
		weekends: true,
		weekNumbers: false,
	
		weekNumberTitle: 'W',
		weekNumberCalculation: 'local',
		
		//editable: false,
	
		scrollTime: '06:00:00',
		
		// event ajax
		lazyFetching: true,
		startParam: 'start',
		endParam: 'end',
		timezoneParam: 'timezone',
	
		timezone: false,
	
		//allDayDefault: undefined,
	
		// locale
		isRTL: false,
		buttonText: {
			prev: "prev",
			next: "next",
			prevYear: "prev year",
			nextYear: "next year",
			year: 'year', // TODO: locale files need to specify this
			today: 'today',
			month: 'month',
			week: 'week',
			day: 'day'
		},
	
		buttonIcons: {
			prev: 'left-single-arrow',
			next: 'right-single-arrow',
			prevYear: 'left-double-arrow',
			nextYear: 'right-double-arrow'
		},
		
		// jquery-ui theming
		theme: false,
		themeButtonIcons: {
			prev: 'circle-triangle-w',
			next: 'circle-triangle-e',
			prevYear: 'seek-prev',
			nextYear: 'seek-next'
		},
	
		//eventResizableFromStart: false,
		dragOpacity: .75,
		dragRevertDuration: 500,
		dragScroll: true,
		
		//selectable: false,
		unselectAuto: true,
		
		dropAccept: '*',
	
		eventOrder: 'title',
	
		eventLimit: false,
		eventLimitText: 'more',
		eventLimitClick: 'popover',
		dayPopoverFormat: 'LL',
		
		handleWindowResize: true,
		windowResizeDelay: 200 // milliseconds before an updateSize happens
		
	};
	
	
	Calendar.englishDefaults = { // used by lang.js
		dayPopoverFormat: 'dddd, MMMM D'
	};
	
	
	Calendar.rtlDefaults = { // right-to-left defaults
		header: { // TODO: smarter solution (first/center/last ?)
			left: 'next,prev today',
			center: '',
			right: 'title'
		},
		buttonIcons: {
			prev: 'right-single-arrow',
			next: 'left-single-arrow',
			prevYear: 'right-double-arrow',
			nextYear: 'left-double-arrow'
		},
		themeButtonIcons: {
			prev: 'circle-triangle-e',
			next: 'circle-triangle-w',
			nextYear: 'seek-prev',
			prevYear: 'seek-next'
		}
	};
	
	;;
	
	var langOptionHash = fc.langs = {}; // initialize and expose
	
	
	// TODO: document the structure and ordering of a FullCalendar lang file
	// TODO: rename everything "lang" to "locale", like what the moment project did
	
	
	// Initialize jQuery UI datepicker translations while using some of the translations
	// Will set this as the default language for datepicker.
	fc.datepickerLang = function(langCode, dpLangCode, dpOptions) {
	
		// get the FullCalendar internal option hash for this language. create if necessary
		var fcOptions = langOptionHash[langCode] || (langOptionHash[langCode] = {});
	
		// transfer some simple options from datepicker to fc
		fcOptions.isRTL = dpOptions.isRTL;
		fcOptions.weekNumberTitle = dpOptions.weekHeader;
	
		// compute some more complex options from datepicker
		$.each(dpComputableOptions, function(name, func) {
			fcOptions[name] = func(dpOptions);
		});
	
		// is jQuery UI Datepicker is on the page?
		if ($.datepicker) {
	
			// Register the language data.
			// FullCalendar and MomentJS use language codes like "pt-br" but Datepicker
			// does it like "pt-BR" or if it doesn't have the language, maybe just "pt".
			// Make an alias so the language can be referenced either way.
			$.datepicker.regional[dpLangCode] =
				$.datepicker.regional[langCode] = // alias
					dpOptions;
	
			// Alias 'en' to the default language data. Do this every time.
			$.datepicker.regional.en = $.datepicker.regional[''];
	
			// Set as Datepicker's global defaults.
			$.datepicker.setDefaults(dpOptions);
		}
	};
	
	
	// Sets FullCalendar-specific translations. Will set the language as the global default.
	fc.lang = function(langCode, newFcOptions) {
		var fcOptions;
		var momOptions;
	
		// get the FullCalendar internal option hash for this language. create if necessary
		fcOptions = langOptionHash[langCode] || (langOptionHash[langCode] = {});
	
		// provided new options for this language? merge them in
		if (newFcOptions) {
			fcOptions = langOptionHash[langCode] = mergeOptions([ fcOptions, newFcOptions ]);
		}
	
		// compute language options that weren't defined.
		// always do this. newFcOptions can be undefined when initializing from i18n file,
		// so no way to tell if this is an initialization or a default-setting.
		momOptions = getMomentLocaleData(langCode); // will fall back to en
		$.each(momComputableOptions, function(name, func) {
			if (fcOptions[name] == null) {
				fcOptions[name] = func(momOptions, fcOptions);
			}
		});
	
		// set it as the default language for FullCalendar
		Calendar.defaults.lang = langCode;
	};
	
	
	// NOTE: can't guarantee any of these computations will run because not every language has datepicker
	// configs, so make sure there are English fallbacks for these in the defaults file.
	var dpComputableOptions = {
	
		buttonText: function(dpOptions) {
			return {
				// the translations sometimes wrongly contain HTML entities
				prev: stripHtmlEntities(dpOptions.prevText),
				next: stripHtmlEntities(dpOptions.nextText),
				today: stripHtmlEntities(dpOptions.currentText)
			};
		},
	
		// Produces format strings like "MMMM YYYY" -> "September 2014"
		monthYearFormat: function(dpOptions) {
			return dpOptions.showMonthAfterYear ?
				'YYYY[' + dpOptions.yearSuffix + '] MMMM' :
				'MMMM YYYY[' + dpOptions.yearSuffix + ']';
		}
	
	};
	
	var momComputableOptions = {
	
		// Produces format strings like "ddd M/D" -> "Fri 9/15"
		dayOfMonthFormat: function(momOptions, fcOptions) {
			var format = momOptions.longDateFormat('l'); // for the format like "M/D/YYYY"
	
			// strip the year off the edge, as well as other misc non-whitespace chars
			format = format.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g, '');
	
			if (fcOptions.isRTL) {
				format += ' ddd'; // for RTL, add day-of-week to end
			}
			else {
				format = 'ddd ' + format; // for LTR, add day-of-week to beginning
			}
			return format;
		},
	
		// Produces format strings like "h:mma" -> "6:00pm"
		mediumTimeFormat: function(momOptions) { // can't be called `timeFormat` because collides with option
			return momOptions.longDateFormat('LT')
				.replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
		},
	
		// Produces format strings like "h(:mm)a" -> "6pm" / "6:30pm"
		smallTimeFormat: function(momOptions) {
			return momOptions.longDateFormat('LT')
				.replace(':mm', '(:mm)')
				.replace(/(\Wmm)$/, '($1)') // like above, but for foreign langs
				.replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
		},
	
		// Produces format strings like "h(:mm)t" -> "6p" / "6:30p"
		extraSmallTimeFormat: function(momOptions) {
			return momOptions.longDateFormat('LT')
				.replace(':mm', '(:mm)')
				.replace(/(\Wmm)$/, '($1)') // like above, but for foreign langs
				.replace(/\s*a$/i, 't'); // convert to AM/PM/am/pm to lowercase one-letter. remove any spaces beforehand
		},
	
		// Produces format strings like "ha" / "H" -> "6pm" / "18"
		hourFormat: function(momOptions) {
			return momOptions.longDateFormat('LT')
				.replace(':mm', '')
				.replace(/(\Wmm)$/, '') // like above, but for foreign langs
				.replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
		},
	
		// Produces format strings like "h:mm" -> "6:30" (with no AM/PM)
		noMeridiemTimeFormat: function(momOptions) {
			return momOptions.longDateFormat('LT')
				.replace(/\s*a$/i, ''); // remove trailing AM/PM
		}
	
	};
	
	
	// options that should be computed off live calendar options (considers override options)
	var instanceComputableOptions = { // TODO: best place for this? related to lang?
	
		// Produces format strings for results like "Mo 16"
		smallDayDateFormat: function(options) {
			return options.isRTL ?
				'D dd' :
				'dd D';
		},
	
		// Produces format strings for results like "Wk 5"
		weekFormat: function(options) {
			return options.isRTL ?
				'w[ ' + options.weekNumberTitle + ']' :
				'[' + options.weekNumberTitle + ' ]w';
		},
	
		// Produces format strings for results like "Wk5"
		smallWeekFormat: function(options) {
			return options.isRTL ?
				'w[' + options.weekNumberTitle + ']' :
				'[' + options.weekNumberTitle + ']w';
		}
	
	};
	
	function populateInstanceComputableOptions(options) {
		$.each(instanceComputableOptions, function(name, func) {
			if (options[name] == null) {
				options[name] = func(options);
			}
		});
	}
	
	
	// Returns moment's internal locale data. If doesn't exist, returns English.
	// Works with moment-pre-2.8
	function getMomentLocaleData(langCode) {
		var func = moment.localeData || moment.langData;
		return func.call(moment, langCode) ||
			func.call(moment, 'en'); // the newer localData could return null, so fall back to en
	}
	
	
	// Initialize English by forcing computation of moment-derived options.
	// Also, sets it as the default.
	fc.lang('en', Calendar.englishDefaults);
	
	;;
	
	/* Top toolbar area with buttons and title
	----------------------------------------------------------------------------------------------------------------------*/
	// TODO: rename all header-related things to "toolbar"
	
	function Header(calendar, options) {
		var t = this;
		
		// exports
		t.render = render;
		t.removeElement = removeElement;
		t.updateTitle = updateTitle;
		t.activateButton = activateButton;
		t.deactivateButton = deactivateButton;
		t.disableButton = disableButton;
		t.enableButton = enableButton;
		t.getViewsWithButtons = getViewsWithButtons;
		
		// locals
		var el = $();
		var viewsWithButtons = [];
		var tm;
	
	
		function render() {
			var sections = options.header;
	
			tm = options.theme ? 'ui' : 'fc';
	
			if (sections) {
				el = $("<div class='fc-toolbar'/>")
					.append(renderSection('left'))
					.append(renderSection('right'))
					.append(renderSection('center'))
					.append('<div class="fc-clear"/>');
	
				return el;
			}
		}
		
		
		function removeElement() {
			el.remove();
			el = $();
		}
		
		
		function renderSection(position) {
			var sectionEl = $('<div class="fc-' + position + '"/>');
			var buttonStr = options.header[position];
	
			if (buttonStr) {
				$.each(buttonStr.split(' '), function(i) {
					var groupChildren = $();
					var isOnlyButtons = true;
					var groupEl;
	
					$.each(this.split(','), function(j, buttonName) {
						var customButtonProps;
						var viewSpec;
						var buttonClick;
						var overrideText; // text explicitly set by calendar's constructor options. overcomes icons
						var defaultText;
						var themeIcon;
						var normalIcon;
						var innerHtml;
						var classes;
						var button; // the element
	
						if (buttonName == 'title') {
							groupChildren = groupChildren.add($('<h2>&nbsp;</h2>')); // we always want it to take up height
							isOnlyButtons = false;
						}
						else {
							if ((customButtonProps = (calendar.options.customButtons || {})[buttonName])) {
								buttonClick = function(ev) {
									if (customButtonProps.click) {
										customButtonProps.click.call(button[0], ev);
									}
								};
								overrideText = ''; // icons will override text
								defaultText = customButtonProps.text;
							}
							else if ((viewSpec = calendar.getViewSpec(buttonName))) {
								buttonClick = function() {
									calendar.changeView(buttonName);
								};
								viewsWithButtons.push(buttonName);
								overrideText = viewSpec.buttonTextOverride;
								defaultText = viewSpec.buttonTextDefault;
							}
							else if (calendar[buttonName]) { // a calendar method
								buttonClick = function() {
									calendar[buttonName]();
								};
								overrideText = (calendar.overrides.buttonText || {})[buttonName];
								defaultText = options.buttonText[buttonName]; // everything else is considered default
							}
	
							if (buttonClick) {
	
								themeIcon =
									customButtonProps ?
										customButtonProps.themeIcon :
										options.themeButtonIcons[buttonName];
	
								normalIcon =
									customButtonProps ?
										customButtonProps.icon :
										options.buttonIcons[buttonName];
	
								if (overrideText) {
									innerHtml = htmlEscape(overrideText);
								}
								else if (themeIcon && options.theme) {
									innerHtml = "<span class='ui-icon ui-icon-" + themeIcon + "'></span>";
								}
								else if (normalIcon && !options.theme) {
									innerHtml = "<span class='fc-icon fc-icon-" + normalIcon + "'></span>";
								}
								else {
									innerHtml = htmlEscape(defaultText);
								}
	
								classes = [
									'fc-' + buttonName + '-button',
									tm + '-button',
									tm + '-state-default'
								];
	
								button = $( // type="button" so that it doesn't submit a form
									'<button type="button" class="' + classes.join(' ') + '">' +
										innerHtml +
									'</button>'
									)
									.click(function(ev) {
										// don't process clicks for disabled buttons
										if (!button.hasClass(tm + '-state-disabled')) {
	
											buttonClick(ev);
	
											// after the click action, if the button becomes the "active" tab, or disabled,
											// it should never have a hover class, so remove it now.
											if (
												button.hasClass(tm + '-state-active') ||
												button.hasClass(tm + '-state-disabled')
											) {
												button.removeClass(tm + '-state-hover');
											}
										}
									})
									.mousedown(function() {
										// the *down* effect (mouse pressed in).
										// only on buttons that are not the "active" tab, or disabled
										button
											.not('.' + tm + '-state-active')
											.not('.' + tm + '-state-disabled')
											.addClass(tm + '-state-down');
									})
									.mouseup(function() {
										// undo the *down* effect
										button.removeClass(tm + '-state-down');
									})
									.hover(
										function() {
											// the *hover* effect.
											// only on buttons that are not the "active" tab, or disabled
											button
												.not('.' + tm + '-state-active')
												.not('.' + tm + '-state-disabled')
												.addClass(tm + '-state-hover');
										},
										function() {
											// undo the *hover* effect
											button
												.removeClass(tm + '-state-hover')
												.removeClass(tm + '-state-down'); // if mouseleave happens before mouseup
										}
									);
	
								groupChildren = groupChildren.add(button);
							}
						}
					});
	
					if (isOnlyButtons) {
						groupChildren
							.first().addClass(tm + '-corner-left').end()
							.last().addClass(tm + '-corner-right').end();
					}
	
					if (groupChildren.length > 1) {
						groupEl = $('<div/>');
						if (isOnlyButtons) {
							groupEl.addClass('fc-button-group');
						}
						groupEl.append(groupChildren);
						sectionEl.append(groupEl);
					}
					else {
						sectionEl.append(groupChildren); // 1 or 0 children
					}
				});
			}
	
			return sectionEl;
		}
		
		
		function updateTitle(text) {
			el.find('h2').text(text);
		}
		
		
		function activateButton(buttonName) {
			el.find('.fc-' + buttonName + '-button')
				.addClass(tm + '-state-active');
		}
		
		
		function deactivateButton(buttonName) {
			el.find('.fc-' + buttonName + '-button')
				.removeClass(tm + '-state-active');
		}
		
		
		function disableButton(buttonName) {
			el.find('.fc-' + buttonName + '-button')
				.attr('disabled', 'disabled')
				.addClass(tm + '-state-disabled');
		}
		
		
		function enableButton(buttonName) {
			el.find('.fc-' + buttonName + '-button')
				.removeAttr('disabled')
				.removeClass(tm + '-state-disabled');
		}
	
	
		function getViewsWithButtons() {
			return viewsWithButtons;
		}
	
	}
	
	;;
	
	fc.sourceNormalizers = [];
	fc.sourceFetchers = [];
	
	var ajaxDefaults = {
		dataType: 'json',
		cache: false
	};
	
	var eventGUID = 1;
	
	
	function EventManager(options) { // assumed to be a calendar
		var t = this;
		
		
		// exports
		t.isFetchNeeded = isFetchNeeded;
		t.fetchEvents = fetchEvents;
		t.addEventSource = addEventSource;
		t.removeEventSource = removeEventSource;
		t.updateEvent = updateEvent;
		t.renderEvent = renderEvent;
		t.removeEvents = removeEvents;
		t.clientEvents = clientEvents;
		t.mutateEvent = mutateEvent;
		t.normalizeEventRange = normalizeEventRange;
		t.normalizeEventRangeTimes = normalizeEventRangeTimes;
		t.ensureVisibleEventRange = ensureVisibleEventRange;
		
		
		// imports
		var reportEvents = t.reportEvents;
		
		
		// locals
		var stickySource = { events: [] };
		var sources = [ stickySource ];
		var rangeStart, rangeEnd;
		var currentFetchID = 0;
		var pendingSourceCnt = 0;
		var cache = []; // holds events that have already been expanded
	
	
		$.each(
			(options.events ? [ options.events ] : []).concat(options.eventSources || []),
			function(i, sourceInput) {
				var source = buildEventSource(sourceInput);
				if (source) {
					sources.push(source);
				}
			}
		);
		
		
		
		/* Fetching
		-----------------------------------------------------------------------------*/
		
		
		function isFetchNeeded(start, end) {
			return !rangeStart || // nothing has been fetched yet?
				// or, a part of the new range is outside of the old range? (after normalizing)
				start.clone().stripZone() < rangeStart.clone().stripZone() ||
				end.clone().stripZone() > rangeEnd.clone().stripZone();
		}
		
		
		function fetchEvents(start, end) {
			rangeStart = start;
			rangeEnd = end;
			cache = [];
			var fetchID = ++currentFetchID;
			var len = sources.length;
			pendingSourceCnt = len;
			for (var i=0; i<len; i++) {
				fetchEventSource(sources[i], fetchID);
			}
		}
		
		
		function fetchEventSource(source, fetchID) {
			_fetchEventSource(source, function(eventInputs) {
				var isArraySource = $.isArray(source.events);
				var i, eventInput;
				var abstractEvent;
	
				if (fetchID == currentFetchID) {
	
					if (eventInputs) {
						for (i = 0; i < eventInputs.length; i++) {
							eventInput = eventInputs[i];
	
							if (isArraySource) { // array sources have already been convert to Event Objects
								abstractEvent = eventInput;
							}
							else {
								abstractEvent = buildEventFromInput(eventInput, source);
							}
	
							if (abstractEvent) { // not false (an invalid event)
								cache.push.apply(
									cache,
									expandEvent(abstractEvent) // add individual expanded events to the cache
								);
							}
						}
					}
	
					pendingSourceCnt--;
					if (!pendingSourceCnt) {
						reportEvents(cache);
					}
				}
			});
		}
		
		
		function _fetchEventSource(source, callback) {
			var i;
			var fetchers = fc.sourceFetchers;
			var res;
	
			for (i=0; i<fetchers.length; i++) {
				res = fetchers[i].call(
					t, // this, the Calendar object
					source,
					rangeStart.clone(),
					rangeEnd.clone(),
					options.timezone,
					callback
				);
	
				if (res === true) {
					// the fetcher is in charge. made its own async request
					return;
				}
				else if (typeof res == 'object') {
					// the fetcher returned a new source. process it
					_fetchEventSource(res, callback);
					return;
				}
			}
	
			var events = source.events;
			if (events) {
				if ($.isFunction(events)) {
					t.pushLoading();
					events.call(
						t, // this, the Calendar object
						rangeStart.clone(),
						rangeEnd.clone(),
						options.timezone,
						function(events) {
							callback(events);
							t.popLoading();
						}
					);
				}
				else if ($.isArray(events)) {
					callback(events);
				}
				else {
					callback();
				}
			}else{
				var url = source.url;
				if (url) {
					var success = source.success;
					var error = source.error;
					var complete = source.complete;
	
					// retrieve any outbound GET/POST $.ajax data from the options
					var customData;
					if ($.isFunction(source.data)) {
						// supplied as a function that returns a key/value object
						customData = source.data();
					}
					else {
						// supplied as a straight key/value object
						customData = source.data;
					}
	
					// use a copy of the custom data so we can modify the parameters
					// and not affect the passed-in object.
					var data = $.extend({}, customData || {});
	
					var startParam = firstDefined(source.startParam, options.startParam);
					var endParam = firstDefined(source.endParam, options.endParam);
					var timezoneParam = firstDefined(source.timezoneParam, options.timezoneParam);
	
					if (startParam) {
						data[startParam] = rangeStart.format();
					}
					if (endParam) {
						data[endParam] = rangeEnd.format();
					}
					if (options.timezone && options.timezone != 'local') {
						data[timezoneParam] = options.timezone;
					}
	
					t.pushLoading();
					$.ajax($.extend({}, ajaxDefaults, source, {
						data: data,
						success: function(events) {
							events = events || [];
							var res = applyAll(success, this, arguments);
							if ($.isArray(res)) {
								events = res;
							}
							callback(events);
						},
						error: function() {
							applyAll(error, this, arguments);
							callback();
						},
						complete: function() {
							applyAll(complete, this, arguments);
							t.popLoading();
						}
					}));
				}else{
					callback();
				}
			}
		}
		
		
		
		/* Sources
		-----------------------------------------------------------------------------*/
		
	
		function addEventSource(sourceInput) {
			var source = buildEventSource(sourceInput);
			if (source) {
				sources.push(source);
				pendingSourceCnt++;
				fetchEventSource(source, currentFetchID); // will eventually call reportEvents
			}
		}
	
	
		function buildEventSource(sourceInput) { // will return undefined if invalid source
			var normalizers = fc.sourceNormalizers;
			var source;
			var i;
	
			if ($.isFunction(sourceInput) || $.isArray(sourceInput)) {
				source = { events: sourceInput };
			}
			else if (typeof sourceInput === 'string') {
				source = { url: sourceInput };
			}
			else if (typeof sourceInput === 'object') {
				source = $.extend({}, sourceInput); // shallow copy
			}
	
			if (source) {
	
				// TODO: repeat code, same code for event classNames
				if (source.className) {
					if (typeof source.className === 'string') {
						source.className = source.className.split(/\s+/);
					}
					// otherwise, assumed to be an array
				}
				else {
					source.className = [];
				}
	
				// for array sources, we convert to standard Event Objects up front
				if ($.isArray(source.events)) {
					source.origArray = source.events; // for removeEventSource
					source.events = $.map(source.events, function(eventInput) {
						return buildEventFromInput(eventInput, source);
					});
				}
	
				for (i=0; i<normalizers.length; i++) {
					normalizers[i].call(t, source);
				}
	
				return source;
			}
		}
	
	
		function removeEventSource(source) {
			sources = $.grep(sources, function(src) {
				return !isSourcesEqual(src, source);
			});
			// remove all client events from that source
			cache = $.grep(cache, function(e) {
				return !isSourcesEqual(e.source, source);
			});
			reportEvents(cache);
		}
	
	
		function isSourcesEqual(source1, source2) {
			return source1 && source2 && getSourcePrimitive(source1) == getSourcePrimitive(source2);
		}
	
	
		function getSourcePrimitive(source) {
			return (
				(typeof source === 'object') ? // a normalized event source?
					(source.origArray || source.googleCalendarId || source.url || source.events) : // get the primitive
					null
			) ||
			source; // the given argument *is* the primitive
		}
		
		
		
		/* Manipulation
		-----------------------------------------------------------------------------*/
	
	
		// Only ever called from the externally-facing API
		function updateEvent(event) {
	
			// massage start/end values, even if date string values
			event.start = t.moment(event.start);
			if (event.end) {
				event.end = t.moment(event.end);
			}
			else {
				event.end = null;
			}
	
			mutateEvent(event, getMiscEventProps(event)); // will handle start/end/allDay normalization
			reportEvents(cache); // reports event modifications (so we can redraw)
		}
	
	
		// Returns a hash of misc event properties that should be copied over to related events.
		function getMiscEventProps(event) {
			var props = {};
	
			$.each(event, function(name, val) {
				if (isMiscEventPropName(name)) {
					if (val !== undefined && isAtomic(val)) { // a defined non-object
						props[name] = val;
					}
				}
			});
	
			return props;
		}
	
		// non-date-related, non-id-related, non-secret
		function isMiscEventPropName(name) {
			return !/^_|^(id|allDay|start|end)$/.test(name);
		}
	
		
		// returns the expanded events that were created
		function renderEvent(eventInput, stick) {
			var abstractEvent = buildEventFromInput(eventInput);
			var events;
			var i, event;
	
			if (abstractEvent) { // not false (a valid input)
				events = expandEvent(abstractEvent);
	
				for (i = 0; i < events.length; i++) {
					event = events[i];
	
					if (!event.source) {
						if (stick) {
							stickySource.events.push(event);
							event.source = stickySource;
						}
						cache.push(event);
					}
				}
	
				reportEvents(cache);
	
				return events;
			}
	
			return [];
		}
		
		
		function removeEvents(filter) {
			var eventID;
			var i;
	
			if (filter == null) { // null or undefined. remove all events
				filter = function() { return true; }; // will always match
			}
			else if (!$.isFunction(filter)) { // an event ID
				eventID = filter + '';
				filter = function(event) {
					return event._id == eventID;
				};
			}
	
			// Purge event(s) from our local cache
			cache = $.grep(cache, filter, true); // inverse=true
	
			// Remove events from array sources.
			// This works because they have been converted to official Event Objects up front.
			// (and as a result, event._id has been calculated).
			for (i=0; i<sources.length; i++) {
				if ($.isArray(sources[i].events)) {
					sources[i].events = $.grep(sources[i].events, filter, true);
				}
			}
	
			reportEvents(cache);
		}
		
		
		function clientEvents(filter) {
			if ($.isFunction(filter)) {
				return $.grep(cache, filter);
			}
			else if (filter != null) { // not null, not undefined. an event ID
				filter += '';
				return $.grep(cache, function(e) {
					return e._id == filter;
				});
			}
			return cache; // else, return all
		}
		
		
		
		/* Event Normalization
		-----------------------------------------------------------------------------*/
	
	
		// Given a raw object with key/value properties, returns an "abstract" Event object.
		// An "abstract" event is an event that, if recurring, will not have been expanded yet.
		// Will return `false` when input is invalid.
		// `source` is optional
		function buildEventFromInput(input, source) {
			var out = {};
			var start, end;
			var allDay;
	
			if (options.eventDataTransform) {
				input = options.eventDataTransform(input);
			}
			if (source && source.eventDataTransform) {
				input = source.eventDataTransform(input);
			}
	
			// Copy all properties over to the resulting object.
			// The special-case properties will be copied over afterwards.
			$.extend(out, input);
	
			if (source) {
				out.source = source;
			}
	
			out._id = input._id || (input.id === undefined ? '_fc' + eventGUID++ : input.id + '');
	
			if (input.className) {
				if (typeof input.className == 'string') {
					out.className = input.className.split(/\s+/);
				}
				else { // assumed to be an array
					out.className = input.className;
				}
			}
			else {
				out.className = [];
			}
	
			start = input.start || input.date; // "date" is an alias for "start"
			end = input.end;
	
			// parse as a time (Duration) if applicable
			if (isTimeString(start)) {
				start = moment.duration(start);
			}
			if (isTimeString(end)) {
				end = moment.duration(end);
			}
	
			if (input.dow || moment.isDuration(start) || moment.isDuration(end)) {
	
				// the event is "abstract" (recurring) so don't calculate exact start/end dates just yet
				out.start = start ? moment.duration(start) : null; // will be a Duration or null
				out.end = end ? moment.duration(end) : null; // will be a Duration or null
				out._recurring = true; // our internal marker
			}
			else {
	
				if (start) {
					start = t.moment(start);
					if (!start.isValid()) {
						return false;
					}
				}
	
				if (end) {
					end = t.moment(end);
					if (!end.isValid()) {
						end = null; // let defaults take over
					}
				}
	
				allDay = input.allDay;
				if (allDay === undefined) { // still undefined? fallback to default
					allDay = firstDefined(
						source ? source.allDayDefault : undefined,
						options.allDayDefault
					);
					// still undefined? normalizeEventRange will calculate it
				}
	
				assignDatesToEvent(start, end, allDay, out);
			}
	
			return out;
		}
	
	
		// Normalizes and assigns the given dates to the given partially-formed event object.
		// NOTE: mutates the given start/end moments. does not make a copy.
		function assignDatesToEvent(start, end, allDay, event) {
			event.start = start;
			event.end = end;
			event.allDay = allDay;
			normalizeEventRange(event);
			backupEventDates(event);
		}
	
	
		// Ensures proper values for allDay/start/end. Accepts an Event object, or a plain object with event-ish properties.
		// NOTE: Will modify the given object.
		function normalizeEventRange(props) {
	
			normalizeEventRangeTimes(props);
	
			if (props.end && !props.end.isAfter(props.start)) {
				props.end = null;
			}
	
			if (!props.end) {
				if (options.forceEventDuration) {
					props.end = t.getDefaultEventEnd(props.allDay, props.start);
				}
				else {
					props.end = null;
				}
			}
		}
	
	
		// Ensures the allDay property exists and the timeliness of the start/end dates are consistent
		function normalizeEventRangeTimes(range) {
			if (range.allDay == null) {
				range.allDay = !(range.start.hasTime() || (range.end && range.end.hasTime()));
			}
	
			if (range.allDay) {
				range.start.stripTime();
				if (range.end) {
					// TODO: consider nextDayThreshold here? If so, will require a lot of testing and adjustment
					range.end.stripTime();
				}
			}
			else {
				if (!range.start.hasTime()) {
					range.start = t.rezoneDate(range.start); // will assign a 00:00 time
				}
				if (range.end && !range.end.hasTime()) {
					range.end = t.rezoneDate(range.end); // will assign a 00:00 time
				}
			}
		}
	
	
		// If `range` is a proper range with a start and end, returns the original object.
		// If missing an end, computes a new range with an end, computing it as if it were an event.
		// TODO: make this a part of the event -> eventRange system
		function ensureVisibleEventRange(range) {
			var allDay;
	
			if (!range.end) {
	
				allDay = range.allDay; // range might be more event-ish than we think
				if (allDay == null) {
					allDay = !range.start.hasTime();
				}
	
				range = $.extend({}, range); // make a copy, copying over other misc properties
				range.end = t.getDefaultEventEnd(allDay, range.start);
			}
			return range;
		}
	
	
		// If the given event is a recurring event, break it down into an array of individual instances.
		// If not a recurring event, return an array with the single original event.
		// If given a falsy input (probably because of a failed buildEventFromInput call), returns an empty array.
		// HACK: can override the recurring window by providing custom rangeStart/rangeEnd (for businessHours).
		function expandEvent(abstractEvent, _rangeStart, _rangeEnd) {
			var events = [];
			var dowHash;
			var dow;
			var i;
			var date;
			var startTime, endTime;
			var start, end;
			var event;
	
			_rangeStart = _rangeStart || rangeStart;
			_rangeEnd = _rangeEnd || rangeEnd;
	
			if (abstractEvent) {
				if (abstractEvent._recurring) {
	
					// make a boolean hash as to whether the event occurs on each day-of-week
					if ((dow = abstractEvent.dow)) {
						dowHash = {};
						for (i = 0; i < dow.length; i++) {
							dowHash[dow[i]] = true;
						}
					}
	
					// iterate through every day in the current range
					date = _rangeStart.clone().stripTime(); // holds the date of the current day
					while (date.isBefore(_rangeEnd)) {
	
						if (!dowHash || dowHash[date.day()]) { // if everyday, or this particular day-of-week
	
							startTime = abstractEvent.start; // the stored start and end properties are times (Durations)
							endTime = abstractEvent.end; // "
							start = date.clone();
							end = null;
	
							if (startTime) {
								start = start.time(startTime);
							}
							if (endTime) {
								end = date.clone().time(endTime);
							}
	
							event = $.extend({}, abstractEvent); // make a copy of the original
							assignDatesToEvent(
								start, end,
								!startTime && !endTime, // allDay?
								event
							);
							events.push(event);
						}
	
						date.add(1, 'days');
					}
				}
				else {
					events.push(abstractEvent); // return the original event. will be a one-item array
				}
			}
	
			return events;
		}
	
	
	
		/* Event Modification Math
		-----------------------------------------------------------------------------------------*/
	
	
		// Modifies an event and all related events by applying the given properties.
		// Special date-diffing logic is used for manipulation of dates.
		// If `props` does not contain start/end dates, the updated values are assumed to be the event's current start/end.
		// All date comparisons are done against the event's pristine _start and _end dates.
		// Returns an object with delta information and a function to undo all operations.
		// For making computations in a granularity greater than day/time, specify largeUnit.
		// NOTE: The given `newProps` might be mutated for normalization purposes.
		function mutateEvent(event, newProps, largeUnit) {
			var miscProps = {};
			var oldProps;
			var clearEnd;
			var startDelta;
			var endDelta;
			var durationDelta;
			var undoFunc;
	
			// diffs the dates in the appropriate way, returning a duration
			function diffDates(date1, date0) { // date1 - date0
				if (largeUnit) {
					return diffByUnit(date1, date0, largeUnit);
				}
				else if (newProps.allDay) {
					return diffDay(date1, date0);
				}
				else {
					return diffDayTime(date1, date0);
				}
			}
	
			newProps = newProps || {};
	
			// normalize new date-related properties
			if (!newProps.start) {
				newProps.start = event.start.clone();
			}
			if (newProps.end === undefined) {
				newProps.end = event.end ? event.end.clone() : null;
			}
			if (newProps.allDay == null) { // is null or undefined?
				newProps.allDay = event.allDay;
			}
			normalizeEventRange(newProps);
	
			// create normalized versions of the original props to compare against
			// need a real end value, for diffing
			oldProps = {
				start: event._start.clone(),
				end: event._end ? event._end.clone() : t.getDefaultEventEnd(event._allDay, event._start),
				allDay: newProps.allDay // normalize the dates in the same regard as the new properties
			};
			normalizeEventRange(oldProps);
	
			// need to clear the end date if explicitly changed to null
			clearEnd = event._end !== null && newProps.end === null;
	
			// compute the delta for moving the start date
			startDelta = diffDates(newProps.start, oldProps.start);
	
			// compute the delta for moving the end date
			if (newProps.end) {
				endDelta = diffDates(newProps.end, oldProps.end);
				durationDelta = endDelta.subtract(startDelta);
			}
			else {
				durationDelta = null;
			}
	
			// gather all non-date-related properties
			$.each(newProps, function(name, val) {
				if (isMiscEventPropName(name)) {
					if (val !== undefined) {
						miscProps[name] = val;
					}
				}
			});
	
			// apply the operations to the event and all related events
			undoFunc = mutateEvents(
				clientEvents(event._id), // get events with this ID
				clearEnd,
				newProps.allDay,
				startDelta,
				durationDelta,
				miscProps
			);
	
			return {
				dateDelta: startDelta,
				durationDelta: durationDelta,
				undo: undoFunc
			};
		}
	
	
		// Modifies an array of events in the following ways (operations are in order):
		// - clear the event's `end`
		// - convert the event to allDay
		// - add `dateDelta` to the start and end
		// - add `durationDelta` to the event's duration
		// - assign `miscProps` to the event
		//
		// Returns a function that can be called to undo all the operations.
		//
		// TODO: don't use so many closures. possible memory issues when lots of events with same ID.
		//
		function mutateEvents(events, clearEnd, allDay, dateDelta, durationDelta, miscProps) {
			var isAmbigTimezone = t.getIsAmbigTimezone();
			var undoFunctions = [];
	
			// normalize zero-length deltas to be null
			if (dateDelta && !dateDelta.valueOf()) { dateDelta = null; }
			if (durationDelta && !durationDelta.valueOf()) { durationDelta = null; }
	
			$.each(events, function(i, event) {
				var oldProps;
				var newProps;
	
				// build an object holding all the old values, both date-related and misc.
				// for the undo function.
				oldProps = {
					start: event.start.clone(),
					end: event.end ? event.end.clone() : null,
					allDay: event.allDay
				};
				$.each(miscProps, function(name) {
					oldProps[name] = event[name];
				});
	
				// new date-related properties. work off the original date snapshot.
				// ok to use references because they will be thrown away when backupEventDates is called.
				newProps = {
					start: event._start,
					end: event._end,
					allDay: allDay // normalize the dates in the same regard as the new properties
				};
				normalizeEventRange(newProps); // massages start/end/allDay
	
				// strip or ensure the end date
				if (clearEnd) {
					newProps.end = null;
				}
				else if (durationDelta && !newProps.end) { // the duration translation requires an end date
					newProps.end = t.getDefaultEventEnd(newProps.allDay, newProps.start);
				}
	
				if (dateDelta) {
					newProps.start.add(dateDelta);
					if (newProps.end) {
						newProps.end.add(dateDelta);
					}
				}
	
				if (durationDelta) {
					newProps.end.add(durationDelta); // end already ensured above
				}
	
				// if the dates have changed, and we know it is impossible to recompute the
				// timezone offsets, strip the zone.
				if (
					isAmbigTimezone &&
					!newProps.allDay &&
					(dateDelta || durationDelta)
				) {
					newProps.start.stripZone();
					if (newProps.end) {
						newProps.end.stripZone();
					}
				}
	
				$.extend(event, miscProps, newProps); // copy over misc props, then date-related props
				backupEventDates(event); // regenerate internal _start/_end/_allDay
	
				undoFunctions.push(function() {
					$.extend(event, oldProps);
					backupEventDates(event); // regenerate internal _start/_end/_allDay
				});
			});
	
			return function() {
				for (var i = 0; i < undoFunctions.length; i++) {
					undoFunctions[i]();
				}
			};
		}
	
	
		/* Business Hours
		-----------------------------------------------------------------------------------------*/
	
		t.getBusinessHoursEvents = getBusinessHoursEvents;
	
	
		// Returns an array of events as to when the business hours occur in the given view.
		// Abuse of our event system :(
		function getBusinessHoursEvents(wholeDay) {
			var optionVal = options.businessHours;
			var defaultVal = {
				className: 'fc-nonbusiness',
				start: '09:00',
				end: '17:00',
				dow: [ 1, 2, 3, 4, 5 ], // monday - friday
				rendering: 'inverse-background'
			};
			var view = t.getView();
			var eventInput;
	
			if (optionVal) { // `true` (which means "use the defaults") or an override object
				eventInput = $.extend(
					{}, // copy to a new object in either case
					defaultVal,
					typeof optionVal === 'object' ? optionVal : {} // override the defaults
				);
			}
	
			if (eventInput) {
	
				// if a whole-day series is requested, clear the start/end times
				if (wholeDay) {
					eventInput.start = null;
					eventInput.end = null;
				}
	
				return expandEvent(
					buildEventFromInput(eventInput),
					view.start,
					view.end
				);
			}
	
			return [];
		}
	
	
		/* Overlapping / Constraining
		-----------------------------------------------------------------------------------------*/
	
		t.isEventRangeAllowed = isEventRangeAllowed;
		t.isSelectionRangeAllowed = isSelectionRangeAllowed;
		t.isExternalDropRangeAllowed = isExternalDropRangeAllowed;
	
	
		function isEventRangeAllowed(range, event) {
			var source = event.source || {};
			var constraint = firstDefined(
				event.constraint,
				source.constraint,
				options.eventConstraint
			);
			var overlap = firstDefined(
				event.overlap,
				source.overlap,
				options.eventOverlap
			);
	
			range = ensureVisibleEventRange(range); // ensure a proper range with an end for isRangeAllowed
	
			return isRangeAllowed(range, constraint, overlap, event);
		}
	
	
		function isSelectionRangeAllowed(range) {
			return isRangeAllowed(range, options.selectConstraint, options.selectOverlap);
		}
	
	
		// when `eventProps` is defined, consider this an event.
		// `eventProps` can contain misc non-date-related info about the event.
		function isExternalDropRangeAllowed(range, eventProps) {
			var eventInput;
			var event;
	
			// note: very similar logic is in View's reportExternalDrop
			if (eventProps) {
				eventInput = $.extend({}, eventProps, range);
				event = expandEvent(buildEventFromInput(eventInput))[0];
			}
	
			if (event) {
				return isEventRangeAllowed(range, event);
			}
			else { // treat it as a selection
	
				range = ensureVisibleEventRange(range); // ensure a proper range with an end for isSelectionRangeAllowed
	
				return isSelectionRangeAllowed(range);
			}
		}
	
	
		// Returns true if the given range (caused by an event drop/resize or a selection) is allowed to exist
		// according to the constraint/overlap settings.
		// `event` is not required if checking a selection.
		function isRangeAllowed(range, constraint, overlap, event) {
			var constraintEvents;
			var anyContainment;
			var peerEvents;
			var i, peerEvent;
			var peerOverlap;
	
			// normalize. fyi, we're normalizing in too many places :(
			range = $.extend({}, range); // copy all properties in case there are misc non-date properties
			range.start = range.start.clone().stripZone();
			range.end = range.end.clone().stripZone();
	
			// the range must be fully contained by at least one of produced constraint events
			if (constraint != null) {
	
				// not treated as an event! intermediate data structure
				// TODO: use ranges in the future
				constraintEvents = constraintToEvents(constraint);
	
				anyContainment = false;
				for (i = 0; i < constraintEvents.length; i++) {
					if (eventContainsRange(constraintEvents[i], range)) {
						anyContainment = true;
						break;
					}
				}
	
				if (!anyContainment) {
					return false;
				}
			}
	
			peerEvents = t.getPeerEvents(event, range);
	
			for (i = 0; i < peerEvents.length; i++)  {
				peerEvent = peerEvents[i];
	
				// there needs to be an actual intersection before disallowing anything
				if (eventIntersectsRange(peerEvent, range)) {
	
					// evaluate overlap for the given range and short-circuit if necessary
					if (overlap === false) {
						return false;
					}
					// if the event's overlap is a test function, pass the peer event in question as the first param
					else if (typeof overlap === 'function' && !overlap(peerEvent, event)) {
						return false;
					}
	
					// if we are computing if the given range is allowable for an event, consider the other event's
					// EventObject-specific or Source-specific `overlap` property
					if (event) {
						peerOverlap = firstDefined(
							peerEvent.overlap,
							(peerEvent.source || {}).overlap
							// we already considered the global `eventOverlap`
						);
						if (peerOverlap === false) {
							return false;
						}
						// if the peer event's overlap is a test function, pass the subject event as the first param
						if (typeof peerOverlap === 'function' && !peerOverlap(event, peerEvent)) {
							return false;
						}
					}
				}
			}
	
			return true;
		}
	
	
		// Given an event input from the API, produces an array of event objects. Possible event inputs:
		// 'businessHours'
		// An event ID (number or string)
		// An object with specific start/end dates or a recurring event (like what businessHours accepts)
		function constraintToEvents(constraintInput) {
	
			if (constraintInput === 'businessHours') {
				return getBusinessHoursEvents();
			}
	
			if (typeof constraintInput === 'object') {
				return expandEvent(buildEventFromInput(constraintInput));
			}
	
			return clientEvents(constraintInput); // probably an ID
		}
	
	
		// Does the event's date range fully contain the given range?
		// start/end already assumed to have stripped zones :(
		function eventContainsRange(event, range) {
			var eventStart = event.start.clone().stripZone();
			var eventEnd = t.getEventEnd(event).stripZone();
	
			return range.start >= eventStart && range.end <= eventEnd;
		}
	
	
		// Does the event's date range intersect with the given range?
		// start/end already assumed to have stripped zones :(
		function eventIntersectsRange(event, range) {
			var eventStart = event.start.clone().stripZone();
			var eventEnd = t.getEventEnd(event).stripZone();
	
			return range.start < eventEnd && range.end > eventStart;
		}
	
	
		t.getEventCache = function() {
			return cache;
		};
	
	}
	
	
	// Returns a list of events that the given event should be compared against when being considered for a move to
	// the specified range. Attached to the Calendar's prototype because EventManager is a mixin for a Calendar.
	Calendar.prototype.getPeerEvents = function(event, range) {
		var cache = this.getEventCache();
		var peerEvents = [];
		var i, otherEvent;
	
		for (i = 0; i < cache.length; i++) {
			otherEvent = cache[i];
			if (
				!event ||
				event._id !== otherEvent._id // don't compare the event to itself or other related [repeating] events
			) {
				peerEvents.push(otherEvent);
			}
		}
	
		return peerEvents;
	};
	
	
	// updates the "backup" properties, which are preserved in order to compute diffs later on.
	function backupEventDates(event) {
		event._allDay = event.allDay;
		event._start = event.start.clone();
		event._end = event.end ? event.end.clone() : null;
	}
	
	;;
	
	/* An abstract class for the "basic" views, as well as month view. Renders one or more rows of day cells.
	----------------------------------------------------------------------------------------------------------------------*/
	// It is a manager for a DayGrid subcomponent, which does most of the heavy lifting.
	// It is responsible for managing width/height.
	
	var BasicView = View.extend({
	
		dayGrid: null, // the main subcomponent that does most of the heavy lifting
	
		dayNumbersVisible: false, // display day numbers on each day cell?
		weekNumbersVisible: false, // display week numbers along the side?
	
		weekNumberWidth: null, // width of all the week-number cells running down the side
	
		headRowEl: null, // the fake row element of the day-of-week header
	
	
		initialize: function() {
			this.dayGrid = new DayGrid(this);
			this.coordMap = this.dayGrid.coordMap; // the view's date-to-cell mapping is identical to the subcomponent's
		},
	
	
		// Sets the display range and computes all necessary dates
		setRange: function(range) {
			View.prototype.setRange.call(this, range); // call the super-method
	
			this.dayGrid.breakOnWeeks = /year|month|week/.test(this.intervalUnit); // do before setRange
			this.dayGrid.setRange(range);
		},
	
	
		// Compute the value to feed into setRange. Overrides superclass.
		computeRange: function(date) {
			var range = View.prototype.computeRange.call(this, date); // get value from the super-method
	
			// year and month views should be aligned with weeks. this is already done for week
			if (/year|month/.test(range.intervalUnit)) {
				range.start.startOf('week');
				range.start = this.skipHiddenDays(range.start);
	
				// make end-of-week if not already
				if (range.end.weekday()) {
					range.end.add(1, 'week').startOf('week');
					range.end = this.skipHiddenDays(range.end, -1, true); // exclusively move backwards
				}
			}
	
			return range;
		},
	
	
		// Renders the view into `this.el`, which should already be assigned
		renderDates: function() {
	
			this.dayNumbersVisible = this.dayGrid.rowCnt > 1; // TODO: make grid responsible
			this.weekNumbersVisible = this.opt('weekNumbers');
			this.dayGrid.numbersVisible = this.dayNumbersVisible || this.weekNumbersVisible;
	
			this.el.addClass('fc-basic-view').html(this.renderHtml());
	
			this.headRowEl = this.el.find('thead .fc-row');
	
			this.scrollerEl = this.el.find('.fc-day-grid-container');
			this.dayGrid.coordMap.containerEl = this.scrollerEl; // constrain clicks/etc to the dimensions of the scroller
	
			this.dayGrid.setElement(this.el.find('.fc-day-grid'));
			this.dayGrid.renderDates(this.hasRigidRows());
		},
	
	
		// Unrenders the content of the view. Since we haven't separated skeleton rendering from date rendering,
		// always completely kill the dayGrid's rendering.
		unrenderDates: function() {
			this.dayGrid.unrenderDates();
			this.dayGrid.removeElement();
		},
	
	
		renderBusinessHours: function() {
			this.dayGrid.renderBusinessHours();
		},
	
	
		// Builds the HTML skeleton for the view.
		// The day-grid component will render inside of a container defined by this HTML.
		renderHtml: function() {
			return '' +
				'<table>' +
					'<thead class="fc-head">' +
						'<tr>' +
							'<td class="' + this.widgetHeaderClass + '">' +
								this.dayGrid.headHtml() + // render the day-of-week headers
							'</td>' +
						'</tr>' +
					'</thead>' +
					'<tbody class="fc-body">' +
						'<tr>' +
							'<td class="' + this.widgetContentClass + '">' +
								'<div class="fc-day-grid-container">' +
									'<div class="fc-day-grid"/>' +
								'</div>' +
							'</td>' +
						'</tr>' +
					'</tbody>' +
				'</table>';
		},
	
	
		// Generates the HTML that will go before the day-of week header cells.
		// Queried by the DayGrid subcomponent when generating rows. Ordering depends on isRTL.
		headIntroHtml: function() {
			if (this.weekNumbersVisible) {
				return '' +
					'<th class="fc-week-number ' + this.widgetHeaderClass + '" ' + this.weekNumberStyleAttr() + '>' +
						'<span>' + // needed for matchCellWidths
							htmlEscape(this.opt('weekNumberTitle')) +
						'</span>' +
					'</th>';
			}
		},
	
	
		// Generates the HTML that will go before content-skeleton cells that display the day/week numbers.
		// Queried by the DayGrid subcomponent. Ordering depends on isRTL.
		numberIntroHtml: function(row) {
			if (this.weekNumbersVisible) {
				return '' +
					'<td class="fc-week-number" ' + this.weekNumberStyleAttr() + '>' +
						'<span>' + // needed for matchCellWidths
							this.dayGrid.getCell(row, 0).start.format('w') +
						'</span>' +
					'</td>';
			}
		},
	
	
		// Generates the HTML that goes before the day bg cells for each day-row.
		// Queried by the DayGrid subcomponent. Ordering depends on isRTL.
		dayIntroHtml: function() {
			if (this.weekNumbersVisible) {
				return '<td class="fc-week-number ' + this.widgetContentClass + '" ' +
					this.weekNumberStyleAttr() + '></td>';
			}
		},
	
	
		// Generates the HTML that goes before every other type of row generated by DayGrid. Ordering depends on isRTL.
		// Affects helper-skeleton and highlight-skeleton rows.
		introHtml: function() {
			if (this.weekNumbersVisible) {
				return '<td class="fc-week-number" ' + this.weekNumberStyleAttr() + '></td>';
			}
		},
	
	
		// Generates the HTML for the <td>s of the "number" row in the DayGrid's content skeleton.
		// The number row will only exist if either day numbers or week numbers are turned on.
		numberCellHtml: function(cell) {
			var date = cell.start;
			var classes;
	
			if (!this.dayNumbersVisible) { // if there are week numbers but not day numbers
				return '<td/>'; //  will create an empty space above events :(
			}
	
			classes = this.dayGrid.getDayClasses(date);
			classes.unshift('fc-day-number');
	
			return '' +
				'<td class="' + classes.join(' ') + '" data-date="' + date.format() + '">' +
					date.date() +
				'</td>';
		},
	
	
		// Generates an HTML attribute string for setting the width of the week number column, if it is known
		weekNumberStyleAttr: function() {
			if (this.weekNumberWidth !== null) {
				return 'style="width:' + this.weekNumberWidth + 'px"';
			}
			return '';
		},
	
	
		// Determines whether each row should have a constant height
		hasRigidRows: function() {
			var eventLimit = this.opt('eventLimit');
			return eventLimit && typeof eventLimit !== 'number';
		},
	
	
		/* Dimensions
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Refreshes the horizontal dimensions of the view
		updateWidth: function() {
			if (this.weekNumbersVisible) {
				// Make sure all week number cells running down the side have the same width.
				// Record the width for cells created later.
				this.weekNumberWidth = matchCellWidths(
					this.el.find('.fc-week-number')
				);
			}
		},
	
	
		// Adjusts the vertical dimensions of the view to the specified values
		setHeight: function(totalHeight, isAuto) {
			var eventLimit = this.opt('eventLimit');
			var scrollerHeight;
	
			// reset all heights to be natural
			unsetScroller(this.scrollerEl);
			uncompensateScroll(this.headRowEl);
	
			this.dayGrid.removeSegPopover(); // kill the "more" popover if displayed
	
			// is the event limit a constant level number?
			if (eventLimit && typeof eventLimit === 'number') {
				this.dayGrid.limitRows(eventLimit); // limit the levels first so the height can redistribute after
			}
	
			scrollerHeight = this.computeScrollerHeight(totalHeight);
			this.setGridHeight(scrollerHeight, isAuto);
	
			// is the event limit dynamically calculated?
			if (eventLimit && typeof eventLimit !== 'number') {
				this.dayGrid.limitRows(eventLimit); // limit the levels after the grid's row heights have been set
			}
	
			if (!isAuto && setPotentialScroller(this.scrollerEl, scrollerHeight)) { // using scrollbars?
	
				compensateScroll(this.headRowEl, getScrollbarWidths(this.scrollerEl));
	
				// doing the scrollbar compensation might have created text overflow which created more height. redo
				scrollerHeight = this.computeScrollerHeight(totalHeight);
				this.scrollerEl.height(scrollerHeight);
			}
		},
	
	
		// Sets the height of just the DayGrid component in this view
		setGridHeight: function(height, isAuto) {
			if (isAuto) {
				undistributeHeight(this.dayGrid.rowEls); // let the rows be their natural height with no expanding
			}
			else {
				distributeHeight(this.dayGrid.rowEls, height, true); // true = compensate for height-hogging rows
			}
		},
	
	
		/* Events
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders the given events onto the view and populates the segments array
		renderEvents: function(events) {
			this.dayGrid.renderEvents(events);
	
			this.updateHeight(); // must compensate for events that overflow the row
		},
	
	
		// Retrieves all segment objects that are rendered in the view
		getEventSegs: function() {
			return this.dayGrid.getEventSegs();
		},
	
	
		// Unrenders all event elements and clears internal segment data
		unrenderEvents: function() {
			this.dayGrid.unrenderEvents();
	
			// we DON'T need to call updateHeight() because:
			// A) a renderEvents() call always happens after this, which will eventually call updateHeight()
			// B) in IE8, this causes a flash whenever events are rerendered
		},
	
	
		/* Dragging (for both events and external elements)
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// A returned value of `true` signals that a mock "helper" event has been rendered.
		renderDrag: function(dropLocation, seg) {
			return this.dayGrid.renderDrag(dropLocation, seg);
		},
	
	
		unrenderDrag: function() {
			this.dayGrid.unrenderDrag();
		},
	
	
		/* Selection
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a visual indication of a selection
		renderSelection: function(range) {
			this.dayGrid.renderSelection(range);
		},
	
	
		// Unrenders a visual indications of a selection
		unrenderSelection: function() {
			this.dayGrid.unrenderSelection();
		}
	
	});
	
	;;
	
	/* A month view with day cells running in rows (one-per-week) and columns
	----------------------------------------------------------------------------------------------------------------------*/
	
	var MonthView = BasicView.extend({
	
		// Produces information about what range to display
		computeRange: function(date) {
			var range = BasicView.prototype.computeRange.call(this, date); // get value from super-method
			var rowCnt;
	
			// ensure 6 weeks
			if (this.isFixedWeeks()) {
				rowCnt = Math.ceil(range.end.diff(range.start, 'weeks', true)); // could be partial weeks due to hiddenDays
				range.end.add(6 - rowCnt, 'weeks');
			}
	
			return range;
		},
	
	
		// Overrides the default BasicView behavior to have special multi-week auto-height logic
		setGridHeight: function(height, isAuto) {
	
			isAuto = isAuto || this.opt('weekMode') === 'variable'; // LEGACY: weekMode is deprecated
	
			// if auto, make the height of each row the height that it would be if there were 6 weeks
			if (isAuto) {
				height *= this.rowCnt / 6;
			}
	
			distributeHeight(this.dayGrid.rowEls, height, !isAuto); // if auto, don't compensate for height-hogging rows
		},
	
	
		isFixedWeeks: function() {
			var weekMode = this.opt('weekMode'); // LEGACY: weekMode is deprecated
			if (weekMode) {
				return weekMode === 'fixed'; // if any other type of weekMode, assume NOT fixed
			}
	
			return this.opt('fixedWeekCount');
		}
	
	});
	
	;;
	
	fcViews.basic = {
		'class': BasicView
	};
	
	fcViews.basicDay = {
		type: 'basic',
		duration: { days: 1 }
	};
	
	fcViews.basicWeek = {
		type: 'basic',
		duration: { weeks: 1 }
	};
	
	fcViews.month = {
		'class': MonthView,
		duration: { months: 1 }, // important for prev/next
		defaults: {
			fixedWeekCount: true
		}
	};
	;;
	
	/* An abstract class for all agenda-related views. Displays one more columns with time slots running vertically.
	----------------------------------------------------------------------------------------------------------------------*/
	// Is a manager for the TimeGrid subcomponent and possibly the DayGrid subcomponent (if allDaySlot is on).
	// Responsible for managing width/height.
	
	var AgendaView = View.extend({
	
		timeGrid: null, // the main time-grid subcomponent of this view
		dayGrid: null, // the "all-day" subcomponent. if all-day is turned off, this will be null
	
		axisWidth: null, // the width of the time axis running down the side
	
		noScrollRowEls: null, // set of fake row elements that must compensate when scrollerEl has scrollbars
	
		// when the time-grid isn't tall enough to occupy the given height, we render an <hr> underneath
		bottomRuleEl: null,
		bottomRuleHeight: null,
	
	
		initialize: function() {
			this.timeGrid = new TimeGrid(this);
	
			if (this.opt('allDaySlot')) { // should we display the "all-day" area?
				this.dayGrid = new DayGrid(this); // the all-day subcomponent of this view
	
				// the coordinate grid will be a combination of both subcomponents' grids
				this.coordMap = new ComboCoordMap([
					this.dayGrid.coordMap,
					this.timeGrid.coordMap
				]);
			}
			else {
				this.coordMap = this.timeGrid.coordMap;
			}
		},
	
	
		/* Rendering
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Sets the display range and computes all necessary dates
		setRange: function(range) {
			View.prototype.setRange.call(this, range); // call the super-method
	
			this.timeGrid.setRange(range);
			if (this.dayGrid) {
				this.dayGrid.setRange(range);
			}
		},
	
	
		// Renders the view into `this.el`, which has already been assigned
		renderDates: function() {
	
			this.el.addClass('fc-agenda-view').html(this.renderHtml());
	
			// the element that wraps the time-grid that will probably scroll
			this.scrollerEl = this.el.find('.fc-time-grid-container');
			this.timeGrid.coordMap.containerEl = this.scrollerEl; // don't accept clicks/etc outside of this
	
			this.timeGrid.setElement(this.el.find('.fc-time-grid'));
			this.timeGrid.renderDates();
	
			// the <hr> that sometimes displays under the time-grid
			this.bottomRuleEl = $('<hr class="fc-divider ' + this.widgetHeaderClass + '"/>')
				.appendTo(this.timeGrid.el); // inject it into the time-grid
	
			if (this.dayGrid) {
				this.dayGrid.setElement(this.el.find('.fc-day-grid'));
				this.dayGrid.renderDates();
	
				// have the day-grid extend it's coordinate area over the <hr> dividing the two grids
				this.dayGrid.bottomCoordPadding = this.dayGrid.el.next('hr').outerHeight();
			}
	
			this.noScrollRowEls = this.el.find('.fc-row:not(.fc-scroller *)'); // fake rows not within the scroller
		},
	
	
		// Unrenders the content of the view. Since we haven't separated skeleton rendering from date rendering,
		// always completely kill each grid's rendering.
		unrenderDates: function() {
			this.timeGrid.unrenderDates();
			this.timeGrid.removeElement();
	
			if (this.dayGrid) {
				this.dayGrid.unrenderDates();
				this.dayGrid.removeElement();
			}
		},
	
	
		renderBusinessHours: function() {
			this.timeGrid.renderBusinessHours();
	
			if (this.dayGrid) {
				this.dayGrid.renderBusinessHours();
			}
		},
	
	
		// Builds the HTML skeleton for the view.
		// The day-grid and time-grid components will render inside containers defined by this HTML.
		renderHtml: function() {
			return '' +
				'<table>' +
					'<thead class="fc-head">' +
						'<tr>' +
							'<td class="' + this.widgetHeaderClass + '">' +
								this.timeGrid.headHtml() + // render the day-of-week headers
							'</td>' +
						'</tr>' +
					'</thead>' +
					'<tbody class="fc-body">' +
						'<tr>' +
							'<td class="' + this.widgetContentClass + '">' +
								(this.dayGrid ?
									'<div class="fc-day-grid"/>' +
									'<hr class="fc-divider ' + this.widgetHeaderClass + '"/>' :
									''
									) +
								'<div class="fc-time-grid-container">' +
									'<div class="fc-time-grid"/>' +
								'</div>' +
							'</td>' +
						'</tr>' +
					'</tbody>' +
				'</table>';
		},
	
	
		// Generates the HTML that will go before the day-of week header cells.
		// Queried by the TimeGrid subcomponent when generating rows. Ordering depends on isRTL.
		headIntroHtml: function() {
			var date;
			var weekText;
	
			if (this.opt('weekNumbers')) {
				date = this.timeGrid.getCell(0).start;
				weekText = date.format(this.opt('smallWeekFormat'));
	
				return '' +
					'<th class="fc-axis fc-week-number ' + this.widgetHeaderClass + '" ' + this.axisStyleAttr() + '>' +
						'<span>' + // needed for matchCellWidths
							htmlEscape(weekText) +
						'</span>' +
					'</th>';
			}
			else {
				return '<th class="fc-axis ' + this.widgetHeaderClass + '" ' + this.axisStyleAttr() + '></th>';
			}
		},
	
	
		// Generates the HTML that goes before the all-day cells.
		// Queried by the DayGrid subcomponent when generating rows. Ordering depends on isRTL.
		dayIntroHtml: function() {
			return '' +
				'<td class="fc-axis ' + this.widgetContentClass + '" ' + this.axisStyleAttr() + '>' +
					'<span>' + // needed for matchCellWidths
						(this.opt('allDayHtml') || htmlEscape(this.opt('allDayText'))) +
					'</span>' +
				'</td>';
		},
	
	
		// Generates the HTML that goes before the bg of the TimeGrid slot area. Long vertical column.
		slotBgIntroHtml: function() {
			return '<td class="fc-axis ' + this.widgetContentClass + '" ' + this.axisStyleAttr() + '></td>';
		},
	
	
		// Generates the HTML that goes before all other types of cells.
		// Affects content-skeleton, helper-skeleton, highlight-skeleton for both the time-grid and day-grid.
		// Queried by the TimeGrid and DayGrid subcomponents when generating rows. Ordering depends on isRTL.
		introHtml: function() {
			return '<td class="fc-axis" ' + this.axisStyleAttr() + '></td>';
		},
	
	
		// Generates an HTML attribute string for setting the width of the axis, if it is known
		axisStyleAttr: function() {
			if (this.axisWidth !== null) {
				 return 'style="width:' + this.axisWidth + 'px"';
			}
			return '';
		},
	
	
		/* Dimensions
		------------------------------------------------------------------------------------------------------------------*/
	
	
		updateSize: function(isResize) {
			this.timeGrid.updateSize(isResize);
	
			View.prototype.updateSize.call(this, isResize); // call the super-method
		},
	
	
		// Refreshes the horizontal dimensions of the view
		updateWidth: function() {
			// make all axis cells line up, and record the width so newly created axis cells will have it
			this.axisWidth = matchCellWidths(this.el.find('.fc-axis'));
		},
	
	
		// Adjusts the vertical dimensions of the view to the specified values
		setHeight: function(totalHeight, isAuto) {
			var eventLimit;
			var scrollerHeight;
	
			if (this.bottomRuleHeight === null) {
				// calculate the height of the rule the very first time
				this.bottomRuleHeight = this.bottomRuleEl.outerHeight();
			}
			this.bottomRuleEl.hide(); // .show() will be called later if this <hr> is necessary
	
			// reset all dimensions back to the original state
			this.scrollerEl.css('overflow', '');
			unsetScroller(this.scrollerEl);
			uncompensateScroll(this.noScrollRowEls);
	
			// limit number of events in the all-day area
			if (this.dayGrid) {
				this.dayGrid.removeSegPopover(); // kill the "more" popover if displayed
	
				eventLimit = this.opt('eventLimit');
				if (eventLimit && typeof eventLimit !== 'number') {
					eventLimit = AGENDA_ALL_DAY_EVENT_LIMIT; // make sure "auto" goes to a real number
				}
				if (eventLimit) {
					this.dayGrid.limitRows(eventLimit);
				}
			}
	
			if (!isAuto) { // should we force dimensions of the scroll container, or let the contents be natural height?
	
				scrollerHeight = this.computeScrollerHeight(totalHeight);
				if (setPotentialScroller(this.scrollerEl, scrollerHeight)) { // using scrollbars?
	
					// make the all-day and header rows lines up
					compensateScroll(this.noScrollRowEls, getScrollbarWidths(this.scrollerEl));
	
					// the scrollbar compensation might have changed text flow, which might affect height, so recalculate
					// and reapply the desired height to the scroller.
					scrollerHeight = this.computeScrollerHeight(totalHeight);
					this.scrollerEl.height(scrollerHeight);
				}
				else { // no scrollbars
					// still, force a height and display the bottom rule (marks the end of day)
					this.scrollerEl.height(scrollerHeight).css('overflow', 'hidden'); // in case <hr> goes outside
					this.bottomRuleEl.show();
				}
			}
		},
	
	
		// Computes the initial pre-configured scroll state prior to allowing the user to change it
		computeInitialScroll: function() {
			var scrollTime = moment.duration(this.opt('scrollTime'));
			var top = this.timeGrid.computeTimeTop(scrollTime);
	
			// zoom can give weird floating-point values. rather scroll a little bit further
			top = Math.ceil(top);
	
			if (top) {
				top++; // to overcome top border that slots beyond the first have. looks better
			}
	
			return top;
		},
	
	
		/* Events
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders events onto the view and populates the View's segment array
		renderEvents: function(events) {
			var dayEvents = [];
			var timedEvents = [];
			var daySegs = [];
			var timedSegs;
			var i;
	
			// separate the events into all-day and timed
			for (i = 0; i < events.length; i++) {
				if (events[i].allDay) {
					dayEvents.push(events[i]);
				}
				else {
					timedEvents.push(events[i]);
				}
			}
	
			// render the events in the subcomponents
			timedSegs = this.timeGrid.renderEvents(timedEvents);
			if (this.dayGrid) {
				daySegs = this.dayGrid.renderEvents(dayEvents);
			}
	
			// the all-day area is flexible and might have a lot of events, so shift the height
			this.updateHeight();
		},
	
	
		// Retrieves all segment objects that are rendered in the view
		getEventSegs: function() {
			return this.timeGrid.getEventSegs().concat(
				this.dayGrid ? this.dayGrid.getEventSegs() : []
			);
		},
	
	
		// Unrenders all event elements and clears internal segment data
		unrenderEvents: function() {
	
			// unrender the events in the subcomponents
			this.timeGrid.unrenderEvents();
			if (this.dayGrid) {
				this.dayGrid.unrenderEvents();
			}
	
			// we DON'T need to call updateHeight() because:
			// A) a renderEvents() call always happens after this, which will eventually call updateHeight()
			// B) in IE8, this causes a flash whenever events are rerendered
		},
	
	
		/* Dragging (for events and external elements)
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// A returned value of `true` signals that a mock "helper" event has been rendered.
		renderDrag: function(dropLocation, seg) {
			if (dropLocation.start.hasTime()) {
				return this.timeGrid.renderDrag(dropLocation, seg);
			}
			else if (this.dayGrid) {
				return this.dayGrid.renderDrag(dropLocation, seg);
			}
		},
	
	
		unrenderDrag: function() {
			this.timeGrid.unrenderDrag();
			if (this.dayGrid) {
				this.dayGrid.unrenderDrag();
			}
		},
	
	
		/* Selection
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a visual indication of a selection
		renderSelection: function(range) {
			if (range.start.hasTime() || range.end.hasTime()) {
				this.timeGrid.renderSelection(range);
			}
			else if (this.dayGrid) {
				this.dayGrid.renderSelection(range);
			}
		},
	
	
		// Unrenders a visual indications of a selection
		unrenderSelection: function() {
			this.timeGrid.unrenderSelection();
			if (this.dayGrid) {
				this.dayGrid.unrenderSelection();
			}
		}
	
	});
	
	;;
	
	var AGENDA_ALL_DAY_EVENT_LIMIT = 5;
	
	// potential nice values for the slot-duration and interval-duration
	// from largest to smallest
	var AGENDA_STOCK_SUB_DURATIONS = [
		{ hours: 1 },
		{ minutes: 30 },
		{ minutes: 15 },
		{ seconds: 30 },
		{ seconds: 15 }
	];
	
	fcViews.agenda = {
		'class': AgendaView,
		defaults: {
			allDaySlot: true,
			allDayText: 'all-day',
			slotDuration: '00:30:00',
			minTime: '00:00:00',
			maxTime: '24:00:00',
			slotEventOverlap: true // a bad name. confused with overlap/constraint system
		}
	};
	
	fcViews.agendaDay = {
		type: 'agenda',
		duration: { days: 1 }
	};
	
	fcViews.agendaWeek = {
		type: 'agenda',
		duration: { weeks: 1 }
	};
	;;
	
	return fc; // export for Node/CommonJS
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
	//! version : 2.10.6
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com
	
	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    global.moment = factory()
	}(this, function () { 'use strict';
	
	    var hookCallback;
	
	    function utils_hooks__hooks () {
	        return hookCallback.apply(null, arguments);
	    }
	
	    // This is done to register the method called with moment()
	    // without creating circular dependencies.
	    function setHookCallback (callback) {
	        hookCallback = callback;
	    }
	
	    function isArray(input) {
	        return Object.prototype.toString.call(input) === '[object Array]';
	    }
	
	    function isDate(input) {
	        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
	    }
	
	    function map(arr, fn) {
	        var res = [], i;
	        for (i = 0; i < arr.length; ++i) {
	            res.push(fn(arr[i], i));
	        }
	        return res;
	    }
	
	    function hasOwnProp(a, b) {
	        return Object.prototype.hasOwnProperty.call(a, b);
	    }
	
	    function extend(a, b) {
	        for (var i in b) {
	            if (hasOwnProp(b, i)) {
	                a[i] = b[i];
	            }
	        }
	
	        if (hasOwnProp(b, 'toString')) {
	            a.toString = b.toString;
	        }
	
	        if (hasOwnProp(b, 'valueOf')) {
	            a.valueOf = b.valueOf;
	        }
	
	        return a;
	    }
	
	    function create_utc__createUTC (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, true).utc();
	    }
	
	    function defaultParsingFlags() {
	        // We need to deep clone this object.
	        return {
	            empty           : false,
	            unusedTokens    : [],
	            unusedInput     : [],
	            overflow        : -2,
	            charsLeftOver   : 0,
	            nullInput       : false,
	            invalidMonth    : null,
	            invalidFormat   : false,
	            userInvalidated : false,
	            iso             : false
	        };
	    }
	
	    function getParsingFlags(m) {
	        if (m._pf == null) {
	            m._pf = defaultParsingFlags();
	        }
	        return m._pf;
	    }
	
	    function valid__isValid(m) {
	        if (m._isValid == null) {
	            var flags = getParsingFlags(m);
	            m._isValid = !isNaN(m._d.getTime()) &&
	                flags.overflow < 0 &&
	                !flags.empty &&
	                !flags.invalidMonth &&
	                !flags.invalidWeekday &&
	                !flags.nullInput &&
	                !flags.invalidFormat &&
	                !flags.userInvalidated;
	
	            if (m._strict) {
	                m._isValid = m._isValid &&
	                    flags.charsLeftOver === 0 &&
	                    flags.unusedTokens.length === 0 &&
	                    flags.bigHour === undefined;
	            }
	        }
	        return m._isValid;
	    }
	
	    function valid__createInvalid (flags) {
	        var m = create_utc__createUTC(NaN);
	        if (flags != null) {
	            extend(getParsingFlags(m), flags);
	        }
	        else {
	            getParsingFlags(m).userInvalidated = true;
	        }
	
	        return m;
	    }
	
	    var momentProperties = utils_hooks__hooks.momentProperties = [];
	
	    function copyConfig(to, from) {
	        var i, prop, val;
	
	        if (typeof from._isAMomentObject !== 'undefined') {
	            to._isAMomentObject = from._isAMomentObject;
	        }
	        if (typeof from._i !== 'undefined') {
	            to._i = from._i;
	        }
	        if (typeof from._f !== 'undefined') {
	            to._f = from._f;
	        }
	        if (typeof from._l !== 'undefined') {
	            to._l = from._l;
	        }
	        if (typeof from._strict !== 'undefined') {
	            to._strict = from._strict;
	        }
	        if (typeof from._tzm !== 'undefined') {
	            to._tzm = from._tzm;
	        }
	        if (typeof from._isUTC !== 'undefined') {
	            to._isUTC = from._isUTC;
	        }
	        if (typeof from._offset !== 'undefined') {
	            to._offset = from._offset;
	        }
	        if (typeof from._pf !== 'undefined') {
	            to._pf = getParsingFlags(from);
	        }
	        if (typeof from._locale !== 'undefined') {
	            to._locale = from._locale;
	        }
	
	        if (momentProperties.length > 0) {
	            for (i in momentProperties) {
	                prop = momentProperties[i];
	                val = from[prop];
	                if (typeof val !== 'undefined') {
	                    to[prop] = val;
	                }
	            }
	        }
	
	        return to;
	    }
	
	    var updateInProgress = false;
	
	    // Moment prototype object
	    function Moment(config) {
	        copyConfig(this, config);
	        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
	        // Prevent infinite loop in case updateOffset creates new moment
	        // objects.
	        if (updateInProgress === false) {
	            updateInProgress = true;
	            utils_hooks__hooks.updateOffset(this);
	            updateInProgress = false;
	        }
	    }
	
	    function isMoment (obj) {
	        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
	    }
	
	    function absFloor (number) {
	        if (number < 0) {
	            return Math.ceil(number);
	        } else {
	            return Math.floor(number);
	        }
	    }
	
	    function toInt(argumentForCoercion) {
	        var coercedNumber = +argumentForCoercion,
	            value = 0;
	
	        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	            value = absFloor(coercedNumber);
	        }
	
	        return value;
	    }
	
	    function compareArrays(array1, array2, dontConvert) {
	        var len = Math.min(array1.length, array2.length),
	            lengthDiff = Math.abs(array1.length - array2.length),
	            diffs = 0,
	            i;
	        for (i = 0; i < len; i++) {
	            if ((dontConvert && array1[i] !== array2[i]) ||
	                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
	                diffs++;
	            }
	        }
	        return diffs + lengthDiff;
	    }
	
	    function Locale() {
	    }
	
	    var locales = {};
	    var globalLocale;
	
	    function normalizeLocale(key) {
	        return key ? key.toLowerCase().replace('_', '-') : key;
	    }
	
	    // pick the locale from the array
	    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	    function chooseLocale(names) {
	        var i = 0, j, next, locale, split;
	
	        while (i < names.length) {
	            split = normalizeLocale(names[i]).split('-');
	            j = split.length;
	            next = normalizeLocale(names[i + 1]);
	            next = next ? next.split('-') : null;
	            while (j > 0) {
	                locale = loadLocale(split.slice(0, j).join('-'));
	                if (locale) {
	                    return locale;
	                }
	                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	                    //the next array item is better than a shallower substring of this one
	                    break;
	                }
	                j--;
	            }
	            i++;
	        }
	        return null;
	    }
	
	    function loadLocale(name) {
	        var oldLocale = null;
	        // TODO: Find a better way to register and load all the locales in Node
	        if (!locales[name] && typeof module !== 'undefined' &&
	                module && module.exports) {
	            try {
	                oldLocale = globalLocale._abbr;
	                __webpack_require__(5)("./" + name);
	                // because defineLocale currently also sets the global locale, we
	                // want to undo that for lazy loaded locales
	                locale_locales__getSetGlobalLocale(oldLocale);
	            } catch (e) { }
	        }
	        return locales[name];
	    }
	
	    // This function will load locale and then set the global locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    function locale_locales__getSetGlobalLocale (key, values) {
	        var data;
	        if (key) {
	            if (typeof values === 'undefined') {
	                data = locale_locales__getLocale(key);
	            }
	            else {
	                data = defineLocale(key, values);
	            }
	
	            if (data) {
	                // moment.duration._locale = moment._locale = data;
	                globalLocale = data;
	            }
	        }
	
	        return globalLocale._abbr;
	    }
	
	    function defineLocale (name, values) {
	        if (values !== null) {
	            values.abbr = name;
	            locales[name] = locales[name] || new Locale();
	            locales[name].set(values);
	
	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);
	
	            return locales[name];
	        } else {
	            // useful for testing
	            delete locales[name];
	            return null;
	        }
	    }
	
	    // returns locale data
	    function locale_locales__getLocale (key) {
	        var locale;
	
	        if (key && key._locale && key._locale._abbr) {
	            key = key._locale._abbr;
	        }
	
	        if (!key) {
	            return globalLocale;
	        }
	
	        if (!isArray(key)) {
	            //short-circuit everything else
	            locale = loadLocale(key);
	            if (locale) {
	                return locale;
	            }
	            key = [key];
	        }
	
	        return chooseLocale(key);
	    }
	
	    var aliases = {};
	
	    function addUnitAlias (unit, shorthand) {
	        var lowerCase = unit.toLowerCase();
	        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	    }
	
	    function normalizeUnits(units) {
	        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	    }
	
	    function normalizeObjectUnits(inputObject) {
	        var normalizedInput = {},
	            normalizedProp,
	            prop;
	
	        for (prop in inputObject) {
	            if (hasOwnProp(inputObject, prop)) {
	                normalizedProp = normalizeUnits(prop);
	                if (normalizedProp) {
	                    normalizedInput[normalizedProp] = inputObject[prop];
	                }
	            }
	        }
	
	        return normalizedInput;
	    }
	
	    function makeGetSet (unit, keepTime) {
	        return function (value) {
	            if (value != null) {
	                get_set__set(this, unit, value);
	                utils_hooks__hooks.updateOffset(this, keepTime);
	                return this;
	            } else {
	                return get_set__get(this, unit);
	            }
	        };
	    }
	
	    function get_set__get (mom, unit) {
	        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
	    }
	
	    function get_set__set (mom, unit, value) {
	        return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	    }
	
	    // MOMENTS
	
	    function getSet (units, value) {
	        var unit;
	        if (typeof units === 'object') {
	            for (unit in units) {
	                this.set(unit, units[unit]);
	            }
	        } else {
	            units = normalizeUnits(units);
	            if (typeof this[units] === 'function') {
	                return this[units](value);
	            }
	        }
	        return this;
	    }
	
	    function zeroFill(number, targetLength, forceSign) {
	        var absNumber = '' + Math.abs(number),
	            zerosToFill = targetLength - absNumber.length,
	            sign = number >= 0;
	        return (sign ? (forceSign ? '+' : '') : '-') +
	            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
	    }
	
	    var formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
	
	    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
	
	    var formatFunctions = {};
	
	    var formatTokenFunctions = {};
	
	    // token:    'M'
	    // padded:   ['MM', 2]
	    // ordinal:  'Mo'
	    // callback: function () { this.month() + 1 }
	    function addFormatToken (token, padded, ordinal, callback) {
	        var func = callback;
	        if (typeof callback === 'string') {
	            func = function () {
	                return this[callback]();
	            };
	        }
	        if (token) {
	            formatTokenFunctions[token] = func;
	        }
	        if (padded) {
	            formatTokenFunctions[padded[0]] = function () {
	                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	            };
	        }
	        if (ordinal) {
	            formatTokenFunctions[ordinal] = function () {
	                return this.localeData().ordinal(func.apply(this, arguments), token);
	            };
	        }
	    }
	
	    function removeFormattingTokens(input) {
	        if (input.match(/\[[\s\S]/)) {
	            return input.replace(/^\[|\]$/g, '');
	        }
	        return input.replace(/\\/g, '');
	    }
	
	    function makeFormatFunction(format) {
	        var array = format.match(formattingTokens), i, length;
	
	        for (i = 0, length = array.length; i < length; i++) {
	            if (formatTokenFunctions[array[i]]) {
	                array[i] = formatTokenFunctions[array[i]];
	            } else {
	                array[i] = removeFormattingTokens(array[i]);
	            }
	        }
	
	        return function (mom) {
	            var output = '';
	            for (i = 0; i < length; i++) {
	                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
	            }
	            return output;
	        };
	    }
	
	    // format date using native date object
	    function formatMoment(m, format) {
	        if (!m.isValid()) {
	            return m.localeData().invalidDate();
	        }
	
	        format = expandFormat(format, m.localeData());
	        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
	
	        return formatFunctions[format](m);
	    }
	
	    function expandFormat(format, locale) {
	        var i = 5;
	
	        function replaceLongDateFormatTokens(input) {
	            return locale.longDateFormat(input) || input;
	        }
	
	        localFormattingTokens.lastIndex = 0;
	        while (i >= 0 && localFormattingTokens.test(format)) {
	            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	            localFormattingTokens.lastIndex = 0;
	            i -= 1;
	        }
	
	        return format;
	    }
	
	    var match1         = /\d/;            //       0 - 9
	    var match2         = /\d\d/;          //      00 - 99
	    var match3         = /\d{3}/;         //     000 - 999
	    var match4         = /\d{4}/;         //    0000 - 9999
	    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
	    var match1to2      = /\d\d?/;         //       0 - 99
	    var match1to3      = /\d{1,3}/;       //       0 - 999
	    var match1to4      = /\d{1,4}/;       //       0 - 9999
	    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999
	
	    var matchUnsigned  = /\d+/;           //       0 - inf
	    var matchSigned    = /[+-]?\d+/;      //    -inf - inf
	
	    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
	
	    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
	
	    // any word (or two) characters or numbers including two/three word month in arabic.
	    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
	
	    var regexes = {};
	
	    function isFunction (sth) {
	        // https://github.com/moment/moment/issues/2325
	        return typeof sth === 'function' &&
	            Object.prototype.toString.call(sth) === '[object Function]';
	    }
	
	
	    function addRegexToken (token, regex, strictRegex) {
	        regexes[token] = isFunction(regex) ? regex : function (isStrict) {
	            return (isStrict && strictRegex) ? strictRegex : regex;
	        };
	    }
	
	    function getParseRegexForToken (token, config) {
	        if (!hasOwnProp(regexes, token)) {
	            return new RegExp(unescapeFormat(token));
	        }
	
	        return regexes[token](config._strict, config._locale);
	    }
	
	    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	    function unescapeFormat(s) {
	        return s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	            return p1 || p2 || p3 || p4;
	        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    }
	
	    var tokens = {};
	
	    function addParseToken (token, callback) {
	        var i, func = callback;
	        if (typeof token === 'string') {
	            token = [token];
	        }
	        if (typeof callback === 'number') {
	            func = function (input, array) {
	                array[callback] = toInt(input);
	            };
	        }
	        for (i = 0; i < token.length; i++) {
	            tokens[token[i]] = func;
	        }
	    }
	
	    function addWeekParseToken (token, callback) {
	        addParseToken(token, function (input, array, config, token) {
	            config._w = config._w || {};
	            callback(input, config._w, config, token);
	        });
	    }
	
	    function addTimeToArrayFromToken(token, input, config) {
	        if (input != null && hasOwnProp(tokens, token)) {
	            tokens[token](input, config._a, config, token);
	        }
	    }
	
	    var YEAR = 0;
	    var MONTH = 1;
	    var DATE = 2;
	    var HOUR = 3;
	    var MINUTE = 4;
	    var SECOND = 5;
	    var MILLISECOND = 6;
	
	    function daysInMonth(year, month) {
	        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	    }
	
	    // FORMATTING
	
	    addFormatToken('M', ['MM', 2], 'Mo', function () {
	        return this.month() + 1;
	    });
	
	    addFormatToken('MMM', 0, 0, function (format) {
	        return this.localeData().monthsShort(this, format);
	    });
	
	    addFormatToken('MMMM', 0, 0, function (format) {
	        return this.localeData().months(this, format);
	    });
	
	    // ALIASES
	
	    addUnitAlias('month', 'M');
	
	    // PARSING
	
	    addRegexToken('M',    match1to2);
	    addRegexToken('MM',   match1to2, match2);
	    addRegexToken('MMM',  matchWord);
	    addRegexToken('MMMM', matchWord);
	
	    addParseToken(['M', 'MM'], function (input, array) {
	        array[MONTH] = toInt(input) - 1;
	    });
	
	    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	        var month = config._locale.monthsParse(input, token, config._strict);
	        // if we didn't find a month name, mark the date as invalid.
	        if (month != null) {
	            array[MONTH] = month;
	        } else {
	            getParsingFlags(config).invalidMonth = input;
	        }
	    });
	
	    // LOCALES
	
	    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	    function localeMonths (m) {
	        return this._months[m.month()];
	    }
	
	    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	    function localeMonthsShort (m) {
	        return this._monthsShort[m.month()];
	    }
	
	    function localeMonthsParse (monthName, format, strict) {
	        var i, mom, regex;
	
	        if (!this._monthsParse) {
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	        }
	
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            if (strict && !this._longMonthsParse[i]) {
	                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	            }
	            if (!strict && !this._monthsParse[i]) {
	                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (!strict && this._monthsParse[i].test(monthName)) {
	                return i;
	            }
	        }
	    }
	
	    // MOMENTS
	
	    function setMonth (mom, value) {
	        var dayOfMonth;
	
	        // TODO: Move this out of here!
	        if (typeof value === 'string') {
	            value = mom.localeData().monthsParse(value);
	            // TODO: Another silent failure?
	            if (typeof value !== 'number') {
	                return mom;
	            }
	        }
	
	        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	        return mom;
	    }
	
	    function getSetMonth (value) {
	        if (value != null) {
	            setMonth(this, value);
	            utils_hooks__hooks.updateOffset(this, true);
	            return this;
	        } else {
	            return get_set__get(this, 'Month');
	        }
	    }
	
	    function getDaysInMonth () {
	        return daysInMonth(this.year(), this.month());
	    }
	
	    function checkOverflow (m) {
	        var overflow;
	        var a = m._a;
	
	        if (a && getParsingFlags(m).overflow === -2) {
	            overflow =
	                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
	                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
	                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
	                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
	                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
	                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
	                -1;
	
	            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	                overflow = DATE;
	            }
	
	            getParsingFlags(m).overflow = overflow;
	        }
	
	        return m;
	    }
	
	    function warn(msg) {
	        if (utils_hooks__hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
	            console.warn('Deprecation warning: ' + msg);
	        }
	    }
	
	    function deprecate(msg, fn) {
	        var firstTime = true;
	
	        return extend(function () {
	            if (firstTime) {
	                warn(msg + '\n' + (new Error()).stack);
	                firstTime = false;
	            }
	            return fn.apply(this, arguments);
	        }, fn);
	    }
	
	    var deprecations = {};
	
	    function deprecateSimple(name, msg) {
	        if (!deprecations[name]) {
	            warn(msg);
	            deprecations[name] = true;
	        }
	    }
	
	    utils_hooks__hooks.suppressDeprecationWarnings = false;
	
	    var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
	
	    var isoDates = [
	        ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
	        ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
	        ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
	        ['GGGG-[W]WW', /\d{4}-W\d{2}/],
	        ['YYYY-DDD', /\d{4}-\d{3}/]
	    ];
	
	    // iso time formats and regexes
	    var isoTimes = [
	        ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
	        ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
	        ['HH:mm', /(T| )\d\d:\d\d/],
	        ['HH', /(T| )\d\d/]
	    ];
	
	    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
	
	    // date from iso format
	    function configFromISO(config) {
	        var i, l,
	            string = config._i,
	            match = from_string__isoRegex.exec(string);
	
	        if (match) {
	            getParsingFlags(config).iso = true;
	            for (i = 0, l = isoDates.length; i < l; i++) {
	                if (isoDates[i][1].exec(string)) {
	                    config._f = isoDates[i][0];
	                    break;
	                }
	            }
	            for (i = 0, l = isoTimes.length; i < l; i++) {
	                if (isoTimes[i][1].exec(string)) {
	                    // match[6] should be 'T' or space
	                    config._f += (match[6] || ' ') + isoTimes[i][0];
	                    break;
	                }
	            }
	            if (string.match(matchOffset)) {
	                config._f += 'Z';
	            }
	            configFromStringAndFormat(config);
	        } else {
	            config._isValid = false;
	        }
	    }
	
	    // date from iso format or fallback
	    function configFromString(config) {
	        var matched = aspNetJsonRegex.exec(config._i);
	
	        if (matched !== null) {
	            config._d = new Date(+matched[1]);
	            return;
	        }
	
	        configFromISO(config);
	        if (config._isValid === false) {
	            delete config._isValid;
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }
	
	    utils_hooks__hooks.createFromInputFallback = deprecate(
	        'moment construction falls back to js Date. This is ' +
	        'discouraged and will be removed in upcoming major ' +
	        'release. Please refer to ' +
	        'https://github.com/moment/moment/issues/1407 for more info.',
	        function (config) {
	            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	        }
	    );
	
	    function createDate (y, m, d, h, M, s, ms) {
	        //can't just apply() to create a date:
	        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	        var date = new Date(y, m, d, h, M, s, ms);
	
	        //the date constructor doesn't accept years < 1970
	        if (y < 1970) {
	            date.setFullYear(y);
	        }
	        return date;
	    }
	
	    function createUTCDate (y) {
	        var date = new Date(Date.UTC.apply(null, arguments));
	        if (y < 1970) {
	            date.setUTCFullYear(y);
	        }
	        return date;
	    }
	
	    addFormatToken(0, ['YY', 2], 0, function () {
	        return this.year() % 100;
	    });
	
	    addFormatToken(0, ['YYYY',   4],       0, 'year');
	    addFormatToken(0, ['YYYYY',  5],       0, 'year');
	    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');
	
	    // ALIASES
	
	    addUnitAlias('year', 'y');
	
	    // PARSING
	
	    addRegexToken('Y',      matchSigned);
	    addRegexToken('YY',     match1to2, match2);
	    addRegexToken('YYYY',   match1to4, match4);
	    addRegexToken('YYYYY',  match1to6, match6);
	    addRegexToken('YYYYYY', match1to6, match6);
	
	    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	    addParseToken('YYYY', function (input, array) {
	        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
	    });
	    addParseToken('YY', function (input, array) {
	        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });
	
	    // HELPERS
	
	    function daysInYear(year) {
	        return isLeapYear(year) ? 366 : 365;
	    }
	
	    function isLeapYear(year) {
	        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	    }
	
	    // HOOKS
	
	    utils_hooks__hooks.parseTwoDigitYear = function (input) {
	        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	    };
	
	    // MOMENTS
	
	    var getSetYear = makeGetSet('FullYear', false);
	
	    function getIsLeapYear () {
	        return isLeapYear(this.year());
	    }
	
	    addFormatToken('w', ['ww', 2], 'wo', 'week');
	    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');
	
	    // ALIASES
	
	    addUnitAlias('week', 'w');
	    addUnitAlias('isoWeek', 'W');
	
	    // PARSING
	
	    addRegexToken('w',  match1to2);
	    addRegexToken('ww', match1to2, match2);
	    addRegexToken('W',  match1to2);
	    addRegexToken('WW', match1to2, match2);
	
	    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	        week[token.substr(0, 1)] = toInt(input);
	    });
	
	    // HELPERS
	
	    // firstDayOfWeek       0 = sun, 6 = sat
	    //                      the day of the week that starts the week
	    //                      (usually sunday or monday)
	    // firstDayOfWeekOfYear 0 = sun, 6 = sat
	    //                      the first week is the week that contains the first
	    //                      of this day of the week
	    //                      (eg. ISO weeks use thursday (4))
	    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
	        var end = firstDayOfWeekOfYear - firstDayOfWeek,
	            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
	            adjustedMoment;
	
	
	        if (daysToDayOfWeek > end) {
	            daysToDayOfWeek -= 7;
	        }
	
	        if (daysToDayOfWeek < end - 7) {
	            daysToDayOfWeek += 7;
	        }
	
	        adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, 'd');
	        return {
	            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
	            year: adjustedMoment.year()
	        };
	    }
	
	    // LOCALES
	
	    function localeWeek (mom) {
	        return weekOfYear(mom, this._week.dow, this._week.doy).week;
	    }
	
	    var defaultLocaleWeek = {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    };
	
	    function localeFirstDayOfWeek () {
	        return this._week.dow;
	    }
	
	    function localeFirstDayOfYear () {
	        return this._week.doy;
	    }
	
	    // MOMENTS
	
	    function getSetWeek (input) {
	        var week = this.localeData().week(this);
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }
	
	    function getSetISOWeek (input) {
	        var week = weekOfYear(this, 1, 4).week;
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }
	
	    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');
	
	    // ALIASES
	
	    addUnitAlias('dayOfYear', 'DDD');
	
	    // PARSING
	
	    addRegexToken('DDD',  match1to3);
	    addRegexToken('DDDD', match3);
	    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	        config._dayOfYear = toInt(input);
	    });
	
	    // HELPERS
	
	    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
	        var week1Jan = 6 + firstDayOfWeek - firstDayOfWeekOfYear, janX = createUTCDate(year, 0, 1 + week1Jan), d = janX.getUTCDay(), dayOfYear;
	        if (d < firstDayOfWeek) {
	            d += 7;
	        }
	
	        weekday = weekday != null ? 1 * weekday : firstDayOfWeek;
	
	        dayOfYear = 1 + week1Jan + 7 * (week - 1) - d + weekday;
	
	        return {
	            year: dayOfYear > 0 ? year : year - 1,
	            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
	        };
	    }
	
	    // MOMENTS
	
	    function getSetDayOfYear (input) {
	        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	    }
	
	    // Pick the first defined of two or three arguments.
	    function defaults(a, b, c) {
	        if (a != null) {
	            return a;
	        }
	        if (b != null) {
	            return b;
	        }
	        return c;
	    }
	
	    function currentDateArray(config) {
	        var now = new Date();
	        if (config._useUTC) {
	            return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()];
	        }
	        return [now.getFullYear(), now.getMonth(), now.getDate()];
	    }
	
	    // convert an array to a date.
	    // the array should mirror the parameters below
	    // note: all values past the year are optional and will default to the lowest possible value.
	    // [year, month, day , hour, minute, second, millisecond]
	    function configFromArray (config) {
	        var i, date, input = [], currentDate, yearToUse;
	
	        if (config._d) {
	            return;
	        }
	
	        currentDate = currentDateArray(config);
	
	        //compute day of the year from weeks and weekdays
	        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	            dayOfYearFromWeekInfo(config);
	        }
	
	        //if the day of the year is set, figure out what it is
	        if (config._dayOfYear) {
	            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
	
	            if (config._dayOfYear > daysInYear(yearToUse)) {
	                getParsingFlags(config)._overflowDayOfYear = true;
	            }
	
	            date = createUTCDate(yearToUse, 0, config._dayOfYear);
	            config._a[MONTH] = date.getUTCMonth();
	            config._a[DATE] = date.getUTCDate();
	        }
	
	        // Default to current date.
	        // * if no year, month, day of month are given, default to today
	        // * if day of month is given, default month and year
	        // * if month is given, default only year
	        // * if year is given, don't default anything
	        for (i = 0; i < 3 && config._a[i] == null; ++i) {
	            config._a[i] = input[i] = currentDate[i];
	        }
	
	        // Zero out whatever was not defaulted, including time
	        for (; i < 7; i++) {
	            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
	        }
	
	        // Check for 24:00:00.000
	        if (config._a[HOUR] === 24 &&
	                config._a[MINUTE] === 0 &&
	                config._a[SECOND] === 0 &&
	                config._a[MILLISECOND] === 0) {
	            config._nextDay = true;
	            config._a[HOUR] = 0;
	        }
	
	        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	        // Apply timezone offset from input. The actual utcOffset can be changed
	        // with parseZone.
	        if (config._tzm != null) {
	            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	        }
	
	        if (config._nextDay) {
	            config._a[HOUR] = 24;
	        }
	    }
	
	    function dayOfYearFromWeekInfo(config) {
	        var w, weekYear, week, weekday, dow, doy, temp;
	
	        w = config._w;
	        if (w.GG != null || w.W != null || w.E != null) {
	            dow = 1;
	            doy = 4;
	
	            // TODO: We need to take the current isoWeekYear, but that depends on
	            // how we interpret now (local, utc, fixed offset). So create
	            // a now version of current config (take local/utc/offset flags, and
	            // create now).
	            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
	            week = defaults(w.W, 1);
	            weekday = defaults(w.E, 1);
	        } else {
	            dow = config._locale._week.dow;
	            doy = config._locale._week.doy;
	
	            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
	            week = defaults(w.w, 1);
	
	            if (w.d != null) {
	                // weekday -- low day numbers are considered next week
	                weekday = w.d;
	                if (weekday < dow) {
	                    ++week;
	                }
	            } else if (w.e != null) {
	                // local weekday -- counting starts from begining of week
	                weekday = w.e + dow;
	            } else {
	                // default to begining of week
	                weekday = dow;
	            }
	        }
	        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);
	
	        config._a[YEAR] = temp.year;
	        config._dayOfYear = temp.dayOfYear;
	    }
	
	    utils_hooks__hooks.ISO_8601 = function () {};
	
	    // date from string and format string
	    function configFromStringAndFormat(config) {
	        // TODO: Move this to another part of the creation flow to prevent circular deps
	        if (config._f === utils_hooks__hooks.ISO_8601) {
	            configFromISO(config);
	            return;
	        }
	
	        config._a = [];
	        getParsingFlags(config).empty = true;
	
	        // This array is used to make a Date, either with `new Date` or `Date.UTC`
	        var string = '' + config._i,
	            i, parsedInput, tokens, token, skipped,
	            stringLength = string.length,
	            totalParsedInputLength = 0;
	
	        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
	
	        for (i = 0; i < tokens.length; i++) {
	            token = tokens[i];
	            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	            if (parsedInput) {
	                skipped = string.substr(0, string.indexOf(parsedInput));
	                if (skipped.length > 0) {
	                    getParsingFlags(config).unusedInput.push(skipped);
	                }
	                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	                totalParsedInputLength += parsedInput.length;
	            }
	            // don't parse if it's not a known token
	            if (formatTokenFunctions[token]) {
	                if (parsedInput) {
	                    getParsingFlags(config).empty = false;
	                }
	                else {
	                    getParsingFlags(config).unusedTokens.push(token);
	                }
	                addTimeToArrayFromToken(token, parsedInput, config);
	            }
	            else if (config._strict && !parsedInput) {
	                getParsingFlags(config).unusedTokens.push(token);
	            }
	        }
	
	        // add remaining unparsed input length to the string
	        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
	        if (string.length > 0) {
	            getParsingFlags(config).unusedInput.push(string);
	        }
	
	        // clear _12h flag if hour is <= 12
	        if (getParsingFlags(config).bigHour === true &&
	                config._a[HOUR] <= 12 &&
	                config._a[HOUR] > 0) {
	            getParsingFlags(config).bigHour = undefined;
	        }
	        // handle meridiem
	        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
	
	        configFromArray(config);
	        checkOverflow(config);
	    }
	
	
	    function meridiemFixWrap (locale, hour, meridiem) {
	        var isPm;
	
	        if (meridiem == null) {
	            // nothing to do
	            return hour;
	        }
	        if (locale.meridiemHour != null) {
	            return locale.meridiemHour(hour, meridiem);
	        } else if (locale.isPM != null) {
	            // Fallback
	            isPm = locale.isPM(meridiem);
	            if (isPm && hour < 12) {
	                hour += 12;
	            }
	            if (!isPm && hour === 12) {
	                hour = 0;
	            }
	            return hour;
	        } else {
	            // this is not supposed to happen
	            return hour;
	        }
	    }
	
	    function configFromStringAndArray(config) {
	        var tempConfig,
	            bestMoment,
	
	            scoreToBeat,
	            i,
	            currentScore;
	
	        if (config._f.length === 0) {
	            getParsingFlags(config).invalidFormat = true;
	            config._d = new Date(NaN);
	            return;
	        }
	
	        for (i = 0; i < config._f.length; i++) {
	            currentScore = 0;
	            tempConfig = copyConfig({}, config);
	            if (config._useUTC != null) {
	                tempConfig._useUTC = config._useUTC;
	            }
	            tempConfig._f = config._f[i];
	            configFromStringAndFormat(tempConfig);
	
	            if (!valid__isValid(tempConfig)) {
	                continue;
	            }
	
	            // if there is any input that was not parsed add a penalty for that format
	            currentScore += getParsingFlags(tempConfig).charsLeftOver;
	
	            //or tokens
	            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
	
	            getParsingFlags(tempConfig).score = currentScore;
	
	            if (scoreToBeat == null || currentScore < scoreToBeat) {
	                scoreToBeat = currentScore;
	                bestMoment = tempConfig;
	            }
	        }
	
	        extend(config, bestMoment || tempConfig);
	    }
	
	    function configFromObject(config) {
	        if (config._d) {
	            return;
	        }
	
	        var i = normalizeObjectUnits(config._i);
	        config._a = [i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond];
	
	        configFromArray(config);
	    }
	
	    function createFromConfig (config) {
	        var res = new Moment(checkOverflow(prepareConfig(config)));
	        if (res._nextDay) {
	            // Adding is smart enough around DST
	            res.add(1, 'd');
	            res._nextDay = undefined;
	        }
	
	        return res;
	    }
	
	    function prepareConfig (config) {
	        var input = config._i,
	            format = config._f;
	
	        config._locale = config._locale || locale_locales__getLocale(config._l);
	
	        if (input === null || (format === undefined && input === '')) {
	            return valid__createInvalid({nullInput: true});
	        }
	
	        if (typeof input === 'string') {
	            config._i = input = config._locale.preparse(input);
	        }
	
	        if (isMoment(input)) {
	            return new Moment(checkOverflow(input));
	        } else if (isArray(format)) {
	            configFromStringAndArray(config);
	        } else if (format) {
	            configFromStringAndFormat(config);
	        } else if (isDate(input)) {
	            config._d = input;
	        } else {
	            configFromInput(config);
	        }
	
	        return config;
	    }
	
	    function configFromInput(config) {
	        var input = config._i;
	        if (input === undefined) {
	            config._d = new Date();
	        } else if (isDate(input)) {
	            config._d = new Date(+input);
	        } else if (typeof input === 'string') {
	            configFromString(config);
	        } else if (isArray(input)) {
	            config._a = map(input.slice(0), function (obj) {
	                return parseInt(obj, 10);
	            });
	            configFromArray(config);
	        } else if (typeof(input) === 'object') {
	            configFromObject(config);
	        } else if (typeof(input) === 'number') {
	            // from milliseconds
	            config._d = new Date(input);
	        } else {
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }
	
	    function createLocalOrUTC (input, format, locale, strict, isUTC) {
	        var c = {};
	
	        if (typeof(locale) === 'boolean') {
	            strict = locale;
	            locale = undefined;
	        }
	        // object construction must be done this way.
	        // https://github.com/moment/moment/issues/1423
	        c._isAMomentObject = true;
	        c._useUTC = c._isUTC = isUTC;
	        c._l = locale;
	        c._i = input;
	        c._f = format;
	        c._strict = strict;
	
	        return createFromConfig(c);
	    }
	
	    function local__createLocal (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, false);
	    }
	
	    var prototypeMin = deprecate(
	         'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
	         function () {
	             var other = local__createLocal.apply(null, arguments);
	             return other < this ? this : other;
	         }
	     );
	
	    var prototypeMax = deprecate(
	        'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            return other > this ? this : other;
	        }
	    );
	
	    // Pick a moment m from moments so that m[fn](other) is true for all
	    // other. This relies on the function fn to be transitive.
	    //
	    // moments should either be an array of moment objects or an array, whose
	    // first element is an array of moment objects.
	    function pickBy(fn, moments) {
	        var res, i;
	        if (moments.length === 1 && isArray(moments[0])) {
	            moments = moments[0];
	        }
	        if (!moments.length) {
	            return local__createLocal();
	        }
	        res = moments[0];
	        for (i = 1; i < moments.length; ++i) {
	            if (!moments[i].isValid() || moments[i][fn](res)) {
	                res = moments[i];
	            }
	        }
	        return res;
	    }
	
	    // TODO: Use [].sort instead?
	    function min () {
	        var args = [].slice.call(arguments, 0);
	
	        return pickBy('isBefore', args);
	    }
	
	    function max () {
	        var args = [].slice.call(arguments, 0);
	
	        return pickBy('isAfter', args);
	    }
	
	    function Duration (duration) {
	        var normalizedInput = normalizeObjectUnits(duration),
	            years = normalizedInput.year || 0,
	            quarters = normalizedInput.quarter || 0,
	            months = normalizedInput.month || 0,
	            weeks = normalizedInput.week || 0,
	            days = normalizedInput.day || 0,
	            hours = normalizedInput.hour || 0,
	            minutes = normalizedInput.minute || 0,
	            seconds = normalizedInput.second || 0,
	            milliseconds = normalizedInput.millisecond || 0;
	
	        // representation for dateAddRemove
	        this._milliseconds = +milliseconds +
	            seconds * 1e3 + // 1000
	            minutes * 6e4 + // 1000 * 60
	            hours * 36e5; // 1000 * 60 * 60
	        // Because of dateAddRemove treats 24 hours as different from a
	        // day when working around DST, we need to store them separately
	        this._days = +days +
	            weeks * 7;
	        // It is impossible translate months into days without knowing
	        // which months you are are talking about, so we have to store
	        // it separately.
	        this._months = +months +
	            quarters * 3 +
	            years * 12;
	
	        this._data = {};
	
	        this._locale = locale_locales__getLocale();
	
	        this._bubble();
	    }
	
	    function isDuration (obj) {
	        return obj instanceof Duration;
	    }
	
	    function offset (token, separator) {
	        addFormatToken(token, 0, 0, function () {
	            var offset = this.utcOffset();
	            var sign = '+';
	            if (offset < 0) {
	                offset = -offset;
	                sign = '-';
	            }
	            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
	        });
	    }
	
	    offset('Z', ':');
	    offset('ZZ', '');
	
	    // PARSING
	
	    addRegexToken('Z',  matchOffset);
	    addRegexToken('ZZ', matchOffset);
	    addParseToken(['Z', 'ZZ'], function (input, array, config) {
	        config._useUTC = true;
	        config._tzm = offsetFromString(input);
	    });
	
	    // HELPERS
	
	    // timezone chunker
	    // '+10:00' > ['10',  '00']
	    // '-1530'  > ['-15', '30']
	    var chunkOffset = /([\+\-]|\d\d)/gi;
	
	    function offsetFromString(string) {
	        var matches = ((string || '').match(matchOffset) || []);
	        var chunk   = matches[matches.length - 1] || [];
	        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	        var minutes = +(parts[1] * 60) + toInt(parts[2]);
	
	        return parts[0] === '+' ? minutes : -minutes;
	    }
	
	    // Return a moment from input, that is local/utc/zone equivalent to model.
	    function cloneWithOffset(input, model) {
	        var res, diff;
	        if (model._isUTC) {
	            res = model.clone();
	            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
	            // Use low-level api, because this fn is low-level api.
	            res._d.setTime(+res._d + diff);
	            utils_hooks__hooks.updateOffset(res, false);
	            return res;
	        } else {
	            return local__createLocal(input).local();
	        }
	    }
	
	    function getDateOffset (m) {
	        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	        // https://github.com/moment/moment/pull/1871
	        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	    }
	
	    // HOOKS
	
	    // This function will be called whenever a moment is mutated.
	    // It is intended to keep the offset in sync with the timezone.
	    utils_hooks__hooks.updateOffset = function () {};
	
	    // MOMENTS
	
	    // keepLocalTime = true means only change the timezone, without
	    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	    // +0200, so we adjust the time as needed, to be valid.
	    //
	    // Keeping the time actually adds/subtracts (one hour)
	    // from the actual represented time. That is why we call updateOffset
	    // a second time. In case it wants us to change the offset again
	    // _changeInProgress == true case, then we have to adjust, because
	    // there is no such time in the given timezone.
	    function getSetOffset (input, keepLocalTime) {
	        var offset = this._offset || 0,
	            localAdjust;
	        if (input != null) {
	            if (typeof input === 'string') {
	                input = offsetFromString(input);
	            }
	            if (Math.abs(input) < 16) {
	                input = input * 60;
	            }
	            if (!this._isUTC && keepLocalTime) {
	                localAdjust = getDateOffset(this);
	            }
	            this._offset = input;
	            this._isUTC = true;
	            if (localAdjust != null) {
	                this.add(localAdjust, 'm');
	            }
	            if (offset !== input) {
	                if (!keepLocalTime || this._changeInProgress) {
	                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
	                } else if (!this._changeInProgress) {
	                    this._changeInProgress = true;
	                    utils_hooks__hooks.updateOffset(this, true);
	                    this._changeInProgress = null;
	                }
	            }
	            return this;
	        } else {
	            return this._isUTC ? offset : getDateOffset(this);
	        }
	    }
	
	    function getSetZone (input, keepLocalTime) {
	        if (input != null) {
	            if (typeof input !== 'string') {
	                input = -input;
	            }
	
	            this.utcOffset(input, keepLocalTime);
	
	            return this;
	        } else {
	            return -this.utcOffset();
	        }
	    }
	
	    function setOffsetToUTC (keepLocalTime) {
	        return this.utcOffset(0, keepLocalTime);
	    }
	
	    function setOffsetToLocal (keepLocalTime) {
	        if (this._isUTC) {
	            this.utcOffset(0, keepLocalTime);
	            this._isUTC = false;
	
	            if (keepLocalTime) {
	                this.subtract(getDateOffset(this), 'm');
	            }
	        }
	        return this;
	    }
	
	    function setOffsetToParsedOffset () {
	        if (this._tzm) {
	            this.utcOffset(this._tzm);
	        } else if (typeof this._i === 'string') {
	            this.utcOffset(offsetFromString(this._i));
	        }
	        return this;
	    }
	
	    function hasAlignedHourOffset (input) {
	        input = input ? local__createLocal(input).utcOffset() : 0;
	
	        return (this.utcOffset() - input) % 60 === 0;
	    }
	
	    function isDaylightSavingTime () {
	        return (
	            this.utcOffset() > this.clone().month(0).utcOffset() ||
	            this.utcOffset() > this.clone().month(5).utcOffset()
	        );
	    }
	
	    function isDaylightSavingTimeShifted () {
	        if (typeof this._isDSTShifted !== 'undefined') {
	            return this._isDSTShifted;
	        }
	
	        var c = {};
	
	        copyConfig(c, this);
	        c = prepareConfig(c);
	
	        if (c._a) {
	            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
	            this._isDSTShifted = this.isValid() &&
	                compareArrays(c._a, other.toArray()) > 0;
	        } else {
	            this._isDSTShifted = false;
	        }
	
	        return this._isDSTShifted;
	    }
	
	    function isLocal () {
	        return !this._isUTC;
	    }
	
	    function isUtcOffset () {
	        return this._isUTC;
	    }
	
	    function isUtc () {
	        return this._isUTC && this._offset === 0;
	    }
	
	    var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;
	
	    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	    var create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
	
	    function create__createDuration (input, key) {
	        var duration = input,
	            // matching against regexp is expensive, do it on demand
	            match = null,
	            sign,
	            ret,
	            diffRes;
	
	        if (isDuration(input)) {
	            duration = {
	                ms : input._milliseconds,
	                d  : input._days,
	                M  : input._months
	            };
	        } else if (typeof input === 'number') {
	            duration = {};
	            if (key) {
	                duration[key] = input;
	            } else {
	                duration.milliseconds = input;
	            }
	        } else if (!!(match = aspNetRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y  : 0,
	                d  : toInt(match[DATE])        * sign,
	                h  : toInt(match[HOUR])        * sign,
	                m  : toInt(match[MINUTE])      * sign,
	                s  : toInt(match[SECOND])      * sign,
	                ms : toInt(match[MILLISECOND]) * sign
	            };
	        } else if (!!(match = create__isoRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y : parseIso(match[2], sign),
	                M : parseIso(match[3], sign),
	                d : parseIso(match[4], sign),
	                h : parseIso(match[5], sign),
	                m : parseIso(match[6], sign),
	                s : parseIso(match[7], sign),
	                w : parseIso(match[8], sign)
	            };
	        } else if (duration == null) {// checks for null or undefined
	            duration = {};
	        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));
	
	            duration = {};
	            duration.ms = diffRes.milliseconds;
	            duration.M = diffRes.months;
	        }
	
	        ret = new Duration(duration);
	
	        if (isDuration(input) && hasOwnProp(input, '_locale')) {
	            ret._locale = input._locale;
	        }
	
	        return ret;
	    }
	
	    create__createDuration.fn = Duration.prototype;
	
	    function parseIso (inp, sign) {
	        // We'd normally use ~~inp for this, but unfortunately it also
	        // converts floats to ints.
	        // inp may be undefined, so careful calling replace on it.
	        var res = inp && parseFloat(inp.replace(',', '.'));
	        // apply sign while we're at it
	        return (isNaN(res) ? 0 : res) * sign;
	    }
	
	    function positiveMomentsDifference(base, other) {
	        var res = {milliseconds: 0, months: 0};
	
	        res.months = other.month() - base.month() +
	            (other.year() - base.year()) * 12;
	        if (base.clone().add(res.months, 'M').isAfter(other)) {
	            --res.months;
	        }
	
	        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));
	
	        return res;
	    }
	
	    function momentsDifference(base, other) {
	        var res;
	        other = cloneWithOffset(other, base);
	        if (base.isBefore(other)) {
	            res = positiveMomentsDifference(base, other);
	        } else {
	            res = positiveMomentsDifference(other, base);
	            res.milliseconds = -res.milliseconds;
	            res.months = -res.months;
	        }
	
	        return res;
	    }
	
	    function createAdder(direction, name) {
	        return function (val, period) {
	            var dur, tmp;
	            //invert the arguments, but complain about it
	            if (period !== null && !isNaN(+period)) {
	                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
	                tmp = val; val = period; period = tmp;
	            }
	
	            val = typeof val === 'string' ? +val : val;
	            dur = create__createDuration(val, period);
	            add_subtract__addSubtract(this, dur, direction);
	            return this;
	        };
	    }
	
	    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
	        var milliseconds = duration._milliseconds,
	            days = duration._days,
	            months = duration._months;
	        updateOffset = updateOffset == null ? true : updateOffset;
	
	        if (milliseconds) {
	            mom._d.setTime(+mom._d + milliseconds * isAdding);
	        }
	        if (days) {
	            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
	        }
	        if (months) {
	            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
	        }
	        if (updateOffset) {
	            utils_hooks__hooks.updateOffset(mom, days || months);
	        }
	    }
	
	    var add_subtract__add      = createAdder(1, 'add');
	    var add_subtract__subtract = createAdder(-1, 'subtract');
	
	    function moment_calendar__calendar (time, formats) {
	        // We want to compare the start of today, vs this.
	        // Getting start-of-today depends on whether we're local/utc/offset or not.
	        var now = time || local__createLocal(),
	            sod = cloneWithOffset(now, this).startOf('day'),
	            diff = this.diff(sod, 'days', true),
	            format = diff < -6 ? 'sameElse' :
	                diff < -1 ? 'lastWeek' :
	                diff < 0 ? 'lastDay' :
	                diff < 1 ? 'sameDay' :
	                diff < 2 ? 'nextDay' :
	                diff < 7 ? 'nextWeek' : 'sameElse';
	        return this.format(formats && formats[format] || this.localeData().calendar(format, this, local__createLocal(now)));
	    }
	
	    function clone () {
	        return new Moment(this);
	    }
	
	    function isAfter (input, units) {
	        var inputMs;
	        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
	        if (units === 'millisecond') {
	            input = isMoment(input) ? input : local__createLocal(input);
	            return +this > +input;
	        } else {
	            inputMs = isMoment(input) ? +input : +local__createLocal(input);
	            return inputMs < +this.clone().startOf(units);
	        }
	    }
	
	    function isBefore (input, units) {
	        var inputMs;
	        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
	        if (units === 'millisecond') {
	            input = isMoment(input) ? input : local__createLocal(input);
	            return +this < +input;
	        } else {
	            inputMs = isMoment(input) ? +input : +local__createLocal(input);
	            return +this.clone().endOf(units) < inputMs;
	        }
	    }
	
	    function isBetween (from, to, units) {
	        return this.isAfter(from, units) && this.isBefore(to, units);
	    }
	
	    function isSame (input, units) {
	        var inputMs;
	        units = normalizeUnits(units || 'millisecond');
	        if (units === 'millisecond') {
	            input = isMoment(input) ? input : local__createLocal(input);
	            return +this === +input;
	        } else {
	            inputMs = +local__createLocal(input);
	            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
	        }
	    }
	
	    function diff (input, units, asFloat) {
	        var that = cloneWithOffset(input, this),
	            zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4,
	            delta, output;
	
	        units = normalizeUnits(units);
	
	        if (units === 'year' || units === 'month' || units === 'quarter') {
	            output = monthDiff(this, that);
	            if (units === 'quarter') {
	                output = output / 3;
	            } else if (units === 'year') {
	                output = output / 12;
	            }
	        } else {
	            delta = this - that;
	            output = units === 'second' ? delta / 1e3 : // 1000
	                units === 'minute' ? delta / 6e4 : // 1000 * 60
	                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
	                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	                delta;
	        }
	        return asFloat ? output : absFloor(output);
	    }
	
	    function monthDiff (a, b) {
	        // difference in months
	        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
	            // b is in (anchor - 1 month, anchor + 1 month)
	            anchor = a.clone().add(wholeMonthDiff, 'months'),
	            anchor2, adjust;
	
	        if (b - anchor < 0) {
	            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor - anchor2);
	        } else {
	            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor2 - anchor);
	        }
	
	        return -(wholeMonthDiff + adjust);
	    }
	
	    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	
	    function toString () {
	        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	    }
	
	    function moment_format__toISOString () {
	        var m = this.clone().utc();
	        if (0 < m.year() && m.year() <= 9999) {
	            if ('function' === typeof Date.prototype.toISOString) {
	                // native implementation is ~50x faster, use it when we can
	                return this.toDate().toISOString();
	            } else {
	                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	            }
	        } else {
	            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	        }
	    }
	
	    function format (inputString) {
	        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
	        return this.localeData().postformat(output);
	    }
	
	    function from (time, withoutSuffix) {
	        if (!this.isValid()) {
	            return this.localeData().invalidDate();
	        }
	        return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	    }
	
	    function fromNow (withoutSuffix) {
	        return this.from(local__createLocal(), withoutSuffix);
	    }
	
	    function to (time, withoutSuffix) {
	        if (!this.isValid()) {
	            return this.localeData().invalidDate();
	        }
	        return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
	    }
	
	    function toNow (withoutSuffix) {
	        return this.to(local__createLocal(), withoutSuffix);
	    }
	
	    function locale (key) {
	        var newLocaleData;
	
	        if (key === undefined) {
	            return this._locale._abbr;
	        } else {
	            newLocaleData = locale_locales__getLocale(key);
	            if (newLocaleData != null) {
	                this._locale = newLocaleData;
	            }
	            return this;
	        }
	    }
	
	    var lang = deprecate(
	        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	        function (key) {
	            if (key === undefined) {
	                return this.localeData();
	            } else {
	                return this.locale(key);
	            }
	        }
	    );
	
	    function localeData () {
	        return this._locale;
	    }
	
	    function startOf (units) {
	        units = normalizeUnits(units);
	        // the following switch intentionally omits break keywords
	        // to utilize falling through the cases.
	        switch (units) {
	        case 'year':
	            this.month(0);
	            /* falls through */
	        case 'quarter':
	        case 'month':
	            this.date(1);
	            /* falls through */
	        case 'week':
	        case 'isoWeek':
	        case 'day':
	            this.hours(0);
	            /* falls through */
	        case 'hour':
	            this.minutes(0);
	            /* falls through */
	        case 'minute':
	            this.seconds(0);
	            /* falls through */
	        case 'second':
	            this.milliseconds(0);
	        }
	
	        // weeks are a special case
	        if (units === 'week') {
	            this.weekday(0);
	        }
	        if (units === 'isoWeek') {
	            this.isoWeekday(1);
	        }
	
	        // quarters are also special
	        if (units === 'quarter') {
	            this.month(Math.floor(this.month() / 3) * 3);
	        }
	
	        return this;
	    }
	
	    function endOf (units) {
	        units = normalizeUnits(units);
	        if (units === undefined || units === 'millisecond') {
	            return this;
	        }
	        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	    }
	
	    function to_type__valueOf () {
	        return +this._d - ((this._offset || 0) * 60000);
	    }
	
	    function unix () {
	        return Math.floor(+this / 1000);
	    }
	
	    function toDate () {
	        return this._offset ? new Date(+this) : this._d;
	    }
	
	    function toArray () {
	        var m = this;
	        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	    }
	
	    function toObject () {
	        var m = this;
	        return {
	            years: m.year(),
	            months: m.month(),
	            date: m.date(),
	            hours: m.hours(),
	            minutes: m.minutes(),
	            seconds: m.seconds(),
	            milliseconds: m.milliseconds()
	        };
	    }
	
	    function moment_valid__isValid () {
	        return valid__isValid(this);
	    }
	
	    function parsingFlags () {
	        return extend({}, getParsingFlags(this));
	    }
	
	    function invalidAt () {
	        return getParsingFlags(this).overflow;
	    }
	
	    addFormatToken(0, ['gg', 2], 0, function () {
	        return this.weekYear() % 100;
	    });
	
	    addFormatToken(0, ['GG', 2], 0, function () {
	        return this.isoWeekYear() % 100;
	    });
	
	    function addWeekYearFormatToken (token, getter) {
	        addFormatToken(0, [token, token.length], 0, getter);
	    }
	
	    addWeekYearFormatToken('gggg',     'weekYear');
	    addWeekYearFormatToken('ggggg',    'weekYear');
	    addWeekYearFormatToken('GGGG',  'isoWeekYear');
	    addWeekYearFormatToken('GGGGG', 'isoWeekYear');
	
	    // ALIASES
	
	    addUnitAlias('weekYear', 'gg');
	    addUnitAlias('isoWeekYear', 'GG');
	
	    // PARSING
	
	    addRegexToken('G',      matchSigned);
	    addRegexToken('g',      matchSigned);
	    addRegexToken('GG',     match1to2, match2);
	    addRegexToken('gg',     match1to2, match2);
	    addRegexToken('GGGG',   match1to4, match4);
	    addRegexToken('gggg',   match1to4, match4);
	    addRegexToken('GGGGG',  match1to6, match6);
	    addRegexToken('ggggg',  match1to6, match6);
	
	    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	        week[token.substr(0, 2)] = toInt(input);
	    });
	
	    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });
	
	    // HELPERS
	
	    function weeksInYear(year, dow, doy) {
	        return weekOfYear(local__createLocal([year, 11, 31 + dow - doy]), dow, doy).week;
	    }
	
	    // MOMENTS
	
	    function getSetWeekYear (input) {
	        var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
	        return input == null ? year : this.add((input - year), 'y');
	    }
	
	    function getSetISOWeekYear (input) {
	        var year = weekOfYear(this, 1, 4).year;
	        return input == null ? year : this.add((input - year), 'y');
	    }
	
	    function getISOWeeksInYear () {
	        return weeksInYear(this.year(), 1, 4);
	    }
	
	    function getWeeksInYear () {
	        var weekInfo = this.localeData()._week;
	        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	    }
	
	    addFormatToken('Q', 0, 0, 'quarter');
	
	    // ALIASES
	
	    addUnitAlias('quarter', 'Q');
	
	    // PARSING
	
	    addRegexToken('Q', match1);
	    addParseToken('Q', function (input, array) {
	        array[MONTH] = (toInt(input) - 1) * 3;
	    });
	
	    // MOMENTS
	
	    function getSetQuarter (input) {
	        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	    }
	
	    addFormatToken('D', ['DD', 2], 'Do', 'date');
	
	    // ALIASES
	
	    addUnitAlias('date', 'D');
	
	    // PARSING
	
	    addRegexToken('D',  match1to2);
	    addRegexToken('DD', match1to2, match2);
	    addRegexToken('Do', function (isStrict, locale) {
	        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
	    });
	
	    addParseToken(['D', 'DD'], DATE);
	    addParseToken('Do', function (input, array) {
	        array[DATE] = toInt(input.match(match1to2)[0], 10);
	    });
	
	    // MOMENTS
	
	    var getSetDayOfMonth = makeGetSet('Date', true);
	
	    addFormatToken('d', 0, 'do', 'day');
	
	    addFormatToken('dd', 0, 0, function (format) {
	        return this.localeData().weekdaysMin(this, format);
	    });
	
	    addFormatToken('ddd', 0, 0, function (format) {
	        return this.localeData().weekdaysShort(this, format);
	    });
	
	    addFormatToken('dddd', 0, 0, function (format) {
	        return this.localeData().weekdays(this, format);
	    });
	
	    addFormatToken('e', 0, 0, 'weekday');
	    addFormatToken('E', 0, 0, 'isoWeekday');
	
	    // ALIASES
	
	    addUnitAlias('day', 'd');
	    addUnitAlias('weekday', 'e');
	    addUnitAlias('isoWeekday', 'E');
	
	    // PARSING
	
	    addRegexToken('d',    match1to2);
	    addRegexToken('e',    match1to2);
	    addRegexToken('E',    match1to2);
	    addRegexToken('dd',   matchWord);
	    addRegexToken('ddd',  matchWord);
	    addRegexToken('dddd', matchWord);
	
	    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config) {
	        var weekday = config._locale.weekdaysParse(input);
	        // if we didn't get a weekday name, mark the date as invalid
	        if (weekday != null) {
	            week.d = weekday;
	        } else {
	            getParsingFlags(config).invalidWeekday = input;
	        }
	    });
	
	    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	        week[token] = toInt(input);
	    });
	
	    // HELPERS
	
	    function parseWeekday(input, locale) {
	        if (typeof input !== 'string') {
	            return input;
	        }
	
	        if (!isNaN(input)) {
	            return parseInt(input, 10);
	        }
	
	        input = locale.weekdaysParse(input);
	        if (typeof input === 'number') {
	            return input;
	        }
	
	        return null;
	    }
	
	    // LOCALES
	
	    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	    function localeWeekdays (m) {
	        return this._weekdays[m.day()];
	    }
	
	    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	    function localeWeekdaysShort (m) {
	        return this._weekdaysShort[m.day()];
	    }
	
	    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	    function localeWeekdaysMin (m) {
	        return this._weekdaysMin[m.day()];
	    }
	
	    function localeWeekdaysParse (weekdayName) {
	        var i, mom, regex;
	
	        this._weekdaysParse = this._weekdaysParse || [];
	
	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already
	            if (!this._weekdaysParse[i]) {
	                mom = local__createLocal([2000, 1]).day(i);
	                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (this._weekdaysParse[i].test(weekdayName)) {
	                return i;
	            }
	        }
	    }
	
	    // MOMENTS
	
	    function getSetDayOfWeek (input) {
	        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	        if (input != null) {
	            input = parseWeekday(input, this.localeData());
	            return this.add(input - day, 'd');
	        } else {
	            return day;
	        }
	    }
	
	    function getSetLocaleDayOfWeek (input) {
	        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	        return input == null ? weekday : this.add(input - weekday, 'd');
	    }
	
	    function getSetISODayOfWeek (input) {
	        // behaves the same as moment#day except
	        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	        // as a setter, sunday should belong to the previous week.
	        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
	    }
	
	    addFormatToken('H', ['HH', 2], 0, 'hour');
	    addFormatToken('h', ['hh', 2], 0, function () {
	        return this.hours() % 12 || 12;
	    });
	
	    function meridiem (token, lowercase) {
	        addFormatToken(token, 0, 0, function () {
	            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	        });
	    }
	
	    meridiem('a', true);
	    meridiem('A', false);
	
	    // ALIASES
	
	    addUnitAlias('hour', 'h');
	
	    // PARSING
	
	    function matchMeridiem (isStrict, locale) {
	        return locale._meridiemParse;
	    }
	
	    addRegexToken('a',  matchMeridiem);
	    addRegexToken('A',  matchMeridiem);
	    addRegexToken('H',  match1to2);
	    addRegexToken('h',  match1to2);
	    addRegexToken('HH', match1to2, match2);
	    addRegexToken('hh', match1to2, match2);
	
	    addParseToken(['H', 'HH'], HOUR);
	    addParseToken(['a', 'A'], function (input, array, config) {
	        config._isPm = config._locale.isPM(input);
	        config._meridiem = input;
	    });
	    addParseToken(['h', 'hh'], function (input, array, config) {
	        array[HOUR] = toInt(input);
	        getParsingFlags(config).bigHour = true;
	    });
	
	    // LOCALES
	
	    function localeIsPM (input) {
	        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	        // Using charAt should be more compatible.
	        return ((input + '').toLowerCase().charAt(0) === 'p');
	    }
	
	    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
	    function localeMeridiem (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'pm' : 'PM';
	        } else {
	            return isLower ? 'am' : 'AM';
	        }
	    }
	
	
	    // MOMENTS
	
	    // Setting the hour should keep the time, because the user explicitly
	    // specified which hour he wants. So trying to maintain the same hour (in
	    // a new timezone) makes sense. Adding/subtracting hours does not follow
	    // this rule.
	    var getSetHour = makeGetSet('Hours', true);
	
	    addFormatToken('m', ['mm', 2], 0, 'minute');
	
	    // ALIASES
	
	    addUnitAlias('minute', 'm');
	
	    // PARSING
	
	    addRegexToken('m',  match1to2);
	    addRegexToken('mm', match1to2, match2);
	    addParseToken(['m', 'mm'], MINUTE);
	
	    // MOMENTS
	
	    var getSetMinute = makeGetSet('Minutes', false);
	
	    addFormatToken('s', ['ss', 2], 0, 'second');
	
	    // ALIASES
	
	    addUnitAlias('second', 's');
	
	    // PARSING
	
	    addRegexToken('s',  match1to2);
	    addRegexToken('ss', match1to2, match2);
	    addParseToken(['s', 'ss'], SECOND);
	
	    // MOMENTS
	
	    var getSetSecond = makeGetSet('Seconds', false);
	
	    addFormatToken('S', 0, 0, function () {
	        return ~~(this.millisecond() / 100);
	    });
	
	    addFormatToken(0, ['SS', 2], 0, function () {
	        return ~~(this.millisecond() / 10);
	    });
	
	    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	    addFormatToken(0, ['SSSS', 4], 0, function () {
	        return this.millisecond() * 10;
	    });
	    addFormatToken(0, ['SSSSS', 5], 0, function () {
	        return this.millisecond() * 100;
	    });
	    addFormatToken(0, ['SSSSSS', 6], 0, function () {
	        return this.millisecond() * 1000;
	    });
	    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	        return this.millisecond() * 10000;
	    });
	    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	        return this.millisecond() * 100000;
	    });
	    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	        return this.millisecond() * 1000000;
	    });
	
	
	    // ALIASES
	
	    addUnitAlias('millisecond', 'ms');
	
	    // PARSING
	
	    addRegexToken('S',    match1to3, match1);
	    addRegexToken('SS',   match1to3, match2);
	    addRegexToken('SSS',  match1to3, match3);
	
	    var token;
	    for (token = 'SSSS'; token.length <= 9; token += 'S') {
	        addRegexToken(token, matchUnsigned);
	    }
	
	    function parseMs(input, array) {
	        array[MILLISECOND] = toInt(('0.' + input) * 1000);
	    }
	
	    for (token = 'S'; token.length <= 9; token += 'S') {
	        addParseToken(token, parseMs);
	    }
	    // MOMENTS
	
	    var getSetMillisecond = makeGetSet('Milliseconds', false);
	
	    addFormatToken('z',  0, 0, 'zoneAbbr');
	    addFormatToken('zz', 0, 0, 'zoneName');
	
	    // MOMENTS
	
	    function getZoneAbbr () {
	        return this._isUTC ? 'UTC' : '';
	    }
	
	    function getZoneName () {
	        return this._isUTC ? 'Coordinated Universal Time' : '';
	    }
	
	    var momentPrototype__proto = Moment.prototype;
	
	    momentPrototype__proto.add          = add_subtract__add;
	    momentPrototype__proto.calendar     = moment_calendar__calendar;
	    momentPrototype__proto.clone        = clone;
	    momentPrototype__proto.diff         = diff;
	    momentPrototype__proto.endOf        = endOf;
	    momentPrototype__proto.format       = format;
	    momentPrototype__proto.from         = from;
	    momentPrototype__proto.fromNow      = fromNow;
	    momentPrototype__proto.to           = to;
	    momentPrototype__proto.toNow        = toNow;
	    momentPrototype__proto.get          = getSet;
	    momentPrototype__proto.invalidAt    = invalidAt;
	    momentPrototype__proto.isAfter      = isAfter;
	    momentPrototype__proto.isBefore     = isBefore;
	    momentPrototype__proto.isBetween    = isBetween;
	    momentPrototype__proto.isSame       = isSame;
	    momentPrototype__proto.isValid      = moment_valid__isValid;
	    momentPrototype__proto.lang         = lang;
	    momentPrototype__proto.locale       = locale;
	    momentPrototype__proto.localeData   = localeData;
	    momentPrototype__proto.max          = prototypeMax;
	    momentPrototype__proto.min          = prototypeMin;
	    momentPrototype__proto.parsingFlags = parsingFlags;
	    momentPrototype__proto.set          = getSet;
	    momentPrototype__proto.startOf      = startOf;
	    momentPrototype__proto.subtract     = add_subtract__subtract;
	    momentPrototype__proto.toArray      = toArray;
	    momentPrototype__proto.toObject     = toObject;
	    momentPrototype__proto.toDate       = toDate;
	    momentPrototype__proto.toISOString  = moment_format__toISOString;
	    momentPrototype__proto.toJSON       = moment_format__toISOString;
	    momentPrototype__proto.toString     = toString;
	    momentPrototype__proto.unix         = unix;
	    momentPrototype__proto.valueOf      = to_type__valueOf;
	
	    // Year
	    momentPrototype__proto.year       = getSetYear;
	    momentPrototype__proto.isLeapYear = getIsLeapYear;
	
	    // Week Year
	    momentPrototype__proto.weekYear    = getSetWeekYear;
	    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;
	
	    // Quarter
	    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;
	
	    // Month
	    momentPrototype__proto.month       = getSetMonth;
	    momentPrototype__proto.daysInMonth = getDaysInMonth;
	
	    // Week
	    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
	    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
	    momentPrototype__proto.weeksInYear    = getWeeksInYear;
	    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;
	
	    // Day
	    momentPrototype__proto.date       = getSetDayOfMonth;
	    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
	    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
	    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
	    momentPrototype__proto.dayOfYear  = getSetDayOfYear;
	
	    // Hour
	    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;
	
	    // Minute
	    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;
	
	    // Second
	    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;
	
	    // Millisecond
	    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;
	
	    // Offset
	    momentPrototype__proto.utcOffset            = getSetOffset;
	    momentPrototype__proto.utc                  = setOffsetToUTC;
	    momentPrototype__proto.local                = setOffsetToLocal;
	    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
	    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
	    momentPrototype__proto.isDST                = isDaylightSavingTime;
	    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
	    momentPrototype__proto.isLocal              = isLocal;
	    momentPrototype__proto.isUtcOffset          = isUtcOffset;
	    momentPrototype__proto.isUtc                = isUtc;
	    momentPrototype__proto.isUTC                = isUtc;
	
	    // Timezone
	    momentPrototype__proto.zoneAbbr = getZoneAbbr;
	    momentPrototype__proto.zoneName = getZoneName;
	
	    // Deprecations
	    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);
	
	    var momentPrototype = momentPrototype__proto;
	
	    function moment__createUnix (input) {
	        return local__createLocal(input * 1000);
	    }
	
	    function moment__createInZone () {
	        return local__createLocal.apply(null, arguments).parseZone();
	    }
	
	    var defaultCalendar = {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    };
	
	    function locale_calendar__calendar (key, mom, now) {
	        var output = this._calendar[key];
	        return typeof output === 'function' ? output.call(mom, now) : output;
	    }
	
	    var defaultLongDateFormat = {
	        LTS  : 'h:mm:ss A',
	        LT   : 'h:mm A',
	        L    : 'MM/DD/YYYY',
	        LL   : 'MMMM D, YYYY',
	        LLL  : 'MMMM D, YYYY h:mm A',
	        LLLL : 'dddd, MMMM D, YYYY h:mm A'
	    };
	
	    function longDateFormat (key) {
	        var format = this._longDateFormat[key],
	            formatUpper = this._longDateFormat[key.toUpperCase()];
	
	        if (format || !formatUpper) {
	            return format;
	        }
	
	        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
	            return val.slice(1);
	        });
	
	        return this._longDateFormat[key];
	    }
	
	    var defaultInvalidDate = 'Invalid date';
	
	    function invalidDate () {
	        return this._invalidDate;
	    }
	
	    var defaultOrdinal = '%d';
	    var defaultOrdinalParse = /\d{1,2}/;
	
	    function ordinal (number) {
	        return this._ordinal.replace('%d', number);
	    }
	
	    function preParsePostFormat (string) {
	        return string;
	    }
	
	    var defaultRelativeTime = {
	        future : 'in %s',
	        past   : '%s ago',
	        s  : 'a few seconds',
	        m  : 'a minute',
	        mm : '%d minutes',
	        h  : 'an hour',
	        hh : '%d hours',
	        d  : 'a day',
	        dd : '%d days',
	        M  : 'a month',
	        MM : '%d months',
	        y  : 'a year',
	        yy : '%d years'
	    };
	
	    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
	        var output = this._relativeTime[string];
	        return (typeof output === 'function') ?
	            output(number, withoutSuffix, string, isFuture) :
	            output.replace(/%d/i, number);
	    }
	
	    function pastFuture (diff, output) {
	        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	        return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
	    }
	
	    function locale_set__set (config) {
	        var prop, i;
	        for (i in config) {
	            prop = config[i];
	            if (typeof prop === 'function') {
	                this[i] = prop;
	            } else {
	                this['_' + i] = prop;
	            }
	        }
	        // Lenient ordinal parsing accepts just a number in addition to
	        // number + (possibly) stuff coming from _ordinalParseLenient.
	        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
	    }
	
	    var prototype__proto = Locale.prototype;
	
	    prototype__proto._calendar       = defaultCalendar;
	    prototype__proto.calendar        = locale_calendar__calendar;
	    prototype__proto._longDateFormat = defaultLongDateFormat;
	    prototype__proto.longDateFormat  = longDateFormat;
	    prototype__proto._invalidDate    = defaultInvalidDate;
	    prototype__proto.invalidDate     = invalidDate;
	    prototype__proto._ordinal        = defaultOrdinal;
	    prototype__proto.ordinal         = ordinal;
	    prototype__proto._ordinalParse   = defaultOrdinalParse;
	    prototype__proto.preparse        = preParsePostFormat;
	    prototype__proto.postformat      = preParsePostFormat;
	    prototype__proto._relativeTime   = defaultRelativeTime;
	    prototype__proto.relativeTime    = relative__relativeTime;
	    prototype__proto.pastFuture      = pastFuture;
	    prototype__proto.set             = locale_set__set;
	
	    // Month
	    prototype__proto.months       =        localeMonths;
	    prototype__proto._months      = defaultLocaleMonths;
	    prototype__proto.monthsShort  =        localeMonthsShort;
	    prototype__proto._monthsShort = defaultLocaleMonthsShort;
	    prototype__proto.monthsParse  =        localeMonthsParse;
	
	    // Week
	    prototype__proto.week = localeWeek;
	    prototype__proto._week = defaultLocaleWeek;
	    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
	    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;
	
	    // Day of Week
	    prototype__proto.weekdays       =        localeWeekdays;
	    prototype__proto._weekdays      = defaultLocaleWeekdays;
	    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
	    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
	    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
	    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
	    prototype__proto.weekdaysParse  =        localeWeekdaysParse;
	
	    // Hours
	    prototype__proto.isPM = localeIsPM;
	    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
	    prototype__proto.meridiem = localeMeridiem;
	
	    function lists__get (format, index, field, setter) {
	        var locale = locale_locales__getLocale();
	        var utc = create_utc__createUTC().set(setter, index);
	        return locale[field](utc, format);
	    }
	
	    function list (format, index, field, count, setter) {
	        if (typeof format === 'number') {
	            index = format;
	            format = undefined;
	        }
	
	        format = format || '';
	
	        if (index != null) {
	            return lists__get(format, index, field, setter);
	        }
	
	        var i;
	        var out = [];
	        for (i = 0; i < count; i++) {
	            out[i] = lists__get(format, i, field, setter);
	        }
	        return out;
	    }
	
	    function lists__listMonths (format, index) {
	        return list(format, index, 'months', 12, 'month');
	    }
	
	    function lists__listMonthsShort (format, index) {
	        return list(format, index, 'monthsShort', 12, 'month');
	    }
	
	    function lists__listWeekdays (format, index) {
	        return list(format, index, 'weekdays', 7, 'day');
	    }
	
	    function lists__listWeekdaysShort (format, index) {
	        return list(format, index, 'weekdaysShort', 7, 'day');
	    }
	
	    function lists__listWeekdaysMin (format, index) {
	        return list(format, index, 'weekdaysMin', 7, 'day');
	    }
	
	    locale_locales__getSetGlobalLocale('en', {
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (toInt(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });
	
	    // Side effect imports
	    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
	    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);
	
	    var mathAbs = Math.abs;
	
	    function duration_abs__abs () {
	        var data           = this._data;
	
	        this._milliseconds = mathAbs(this._milliseconds);
	        this._days         = mathAbs(this._days);
	        this._months       = mathAbs(this._months);
	
	        data.milliseconds  = mathAbs(data.milliseconds);
	        data.seconds       = mathAbs(data.seconds);
	        data.minutes       = mathAbs(data.minutes);
	        data.hours         = mathAbs(data.hours);
	        data.months        = mathAbs(data.months);
	        data.years         = mathAbs(data.years);
	
	        return this;
	    }
	
	    function duration_add_subtract__addSubtract (duration, input, value, direction) {
	        var other = create__createDuration(input, value);
	
	        duration._milliseconds += direction * other._milliseconds;
	        duration._days         += direction * other._days;
	        duration._months       += direction * other._months;
	
	        return duration._bubble();
	    }
	
	    // supports only 2.0-style add(1, 's') or add(duration)
	    function duration_add_subtract__add (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, 1);
	    }
	
	    // supports only 2.0-style subtract(1, 's') or subtract(duration)
	    function duration_add_subtract__subtract (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, -1);
	    }
	
	    function absCeil (number) {
	        if (number < 0) {
	            return Math.floor(number);
	        } else {
	            return Math.ceil(number);
	        }
	    }
	
	    function bubble () {
	        var milliseconds = this._milliseconds;
	        var days         = this._days;
	        var months       = this._months;
	        var data         = this._data;
	        var seconds, minutes, hours, years, monthsFromDays;
	
	        // if we have a mix of positive and negative values, bubble down first
	        // check: https://github.com/moment/moment/issues/2166
	        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
	                (milliseconds <= 0 && days <= 0 && months <= 0))) {
	            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	            days = 0;
	            months = 0;
	        }
	
	        // The following code bubbles up values, see the tests for
	        // examples of what that means.
	        data.milliseconds = milliseconds % 1000;
	
	        seconds           = absFloor(milliseconds / 1000);
	        data.seconds      = seconds % 60;
	
	        minutes           = absFloor(seconds / 60);
	        data.minutes      = minutes % 60;
	
	        hours             = absFloor(minutes / 60);
	        data.hours        = hours % 24;
	
	        days += absFloor(hours / 24);
	
	        // convert days to months
	        monthsFromDays = absFloor(daysToMonths(days));
	        months += monthsFromDays;
	        days -= absCeil(monthsToDays(monthsFromDays));
	
	        // 12 months -> 1 year
	        years = absFloor(months / 12);
	        months %= 12;
	
	        data.days   = days;
	        data.months = months;
	        data.years  = years;
	
	        return this;
	    }
	
	    function daysToMonths (days) {
	        // 400 years have 146097 days (taking into account leap year rules)
	        // 400 years have 12 months === 4800
	        return days * 4800 / 146097;
	    }
	
	    function monthsToDays (months) {
	        // the reverse of daysToMonths
	        return months * 146097 / 4800;
	    }
	
	    function as (units) {
	        var days;
	        var months;
	        var milliseconds = this._milliseconds;
	
	        units = normalizeUnits(units);
	
	        if (units === 'month' || units === 'year') {
	            days   = this._days   + milliseconds / 864e5;
	            months = this._months + daysToMonths(days);
	            return units === 'month' ? months : months / 12;
	        } else {
	            // handle milliseconds separately because of floating point math errors (issue #1867)
	            days = this._days + Math.round(monthsToDays(this._months));
	            switch (units) {
	                case 'week'   : return days / 7     + milliseconds / 6048e5;
	                case 'day'    : return days         + milliseconds / 864e5;
	                case 'hour'   : return days * 24    + milliseconds / 36e5;
	                case 'minute' : return days * 1440  + milliseconds / 6e4;
	                case 'second' : return days * 86400 + milliseconds / 1000;
	                // Math.floor prevents floating point math errors here
	                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
	                default: throw new Error('Unknown unit ' + units);
	            }
	        }
	    }
	
	    // TODO: Use this.as('ms')?
	    function duration_as__valueOf () {
	        return (
	            this._milliseconds +
	            this._days * 864e5 +
	            (this._months % 12) * 2592e6 +
	            toInt(this._months / 12) * 31536e6
	        );
	    }
	
	    function makeAs (alias) {
	        return function () {
	            return this.as(alias);
	        };
	    }
	
	    var asMilliseconds = makeAs('ms');
	    var asSeconds      = makeAs('s');
	    var asMinutes      = makeAs('m');
	    var asHours        = makeAs('h');
	    var asDays         = makeAs('d');
	    var asWeeks        = makeAs('w');
	    var asMonths       = makeAs('M');
	    var asYears        = makeAs('y');
	
	    function duration_get__get (units) {
	        units = normalizeUnits(units);
	        return this[units + 's']();
	    }
	
	    function makeGetter(name) {
	        return function () {
	            return this._data[name];
	        };
	    }
	
	    var milliseconds = makeGetter('milliseconds');
	    var seconds      = makeGetter('seconds');
	    var minutes      = makeGetter('minutes');
	    var hours        = makeGetter('hours');
	    var days         = makeGetter('days');
	    var months       = makeGetter('months');
	    var years        = makeGetter('years');
	
	    function weeks () {
	        return absFloor(this.days() / 7);
	    }
	
	    var round = Math.round;
	    var thresholds = {
	        s: 45,  // seconds to minute
	        m: 45,  // minutes to hour
	        h: 22,  // hours to day
	        d: 26,  // days to month
	        M: 11   // months to year
	    };
	
	    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	    }
	
	    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
	        var duration = create__createDuration(posNegDuration).abs();
	        var seconds  = round(duration.as('s'));
	        var minutes  = round(duration.as('m'));
	        var hours    = round(duration.as('h'));
	        var days     = round(duration.as('d'));
	        var months   = round(duration.as('M'));
	        var years    = round(duration.as('y'));
	
	        var a = seconds < thresholds.s && ['s', seconds]  ||
	                minutes === 1          && ['m']           ||
	                minutes < thresholds.m && ['mm', minutes] ||
	                hours   === 1          && ['h']           ||
	                hours   < thresholds.h && ['hh', hours]   ||
	                days    === 1          && ['d']           ||
	                days    < thresholds.d && ['dd', days]    ||
	                months  === 1          && ['M']           ||
	                months  < thresholds.M && ['MM', months]  ||
	                years   === 1          && ['y']           || ['yy', years];
	
	        a[2] = withoutSuffix;
	        a[3] = +posNegDuration > 0;
	        a[4] = locale;
	        return substituteTimeAgo.apply(null, a);
	    }
	
	    // This function allows you to set a threshold for relative time strings
	    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
	        if (thresholds[threshold] === undefined) {
	            return false;
	        }
	        if (limit === undefined) {
	            return thresholds[threshold];
	        }
	        thresholds[threshold] = limit;
	        return true;
	    }
	
	    function humanize (withSuffix) {
	        var locale = this.localeData();
	        var output = duration_humanize__relativeTime(this, !withSuffix, locale);
	
	        if (withSuffix) {
	            output = locale.pastFuture(+this, output);
	        }
	
	        return locale.postformat(output);
	    }
	
	    var iso_string__abs = Math.abs;
	
	    function iso_string__toISOString() {
	        // for ISO strings we do not use the normal bubbling rules:
	        //  * milliseconds bubble up until they become hours
	        //  * days do not bubble at all
	        //  * months bubble up until they become years
	        // This is because there is no context-free conversion between hours and days
	        // (think of clock changes)
	        // and also not between days and months (28-31 days per month)
	        var seconds = iso_string__abs(this._milliseconds) / 1000;
	        var days         = iso_string__abs(this._days);
	        var months       = iso_string__abs(this._months);
	        var minutes, hours, years;
	
	        // 3600 seconds -> 60 minutes -> 1 hour
	        minutes           = absFloor(seconds / 60);
	        hours             = absFloor(minutes / 60);
	        seconds %= 60;
	        minutes %= 60;
	
	        // 12 months -> 1 year
	        years  = absFloor(months / 12);
	        months %= 12;
	
	
	        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	        var Y = years;
	        var M = months;
	        var D = days;
	        var h = hours;
	        var m = minutes;
	        var s = seconds;
	        var total = this.asSeconds();
	
	        if (!total) {
	            // this is the same as C#'s (Noda) and python (isodate)...
	            // but not other JS (goog.date)
	            return 'P0D';
	        }
	
	        return (total < 0 ? '-' : '') +
	            'P' +
	            (Y ? Y + 'Y' : '') +
	            (M ? M + 'M' : '') +
	            (D ? D + 'D' : '') +
	            ((h || m || s) ? 'T' : '') +
	            (h ? h + 'H' : '') +
	            (m ? m + 'M' : '') +
	            (s ? s + 'S' : '');
	    }
	
	    var duration_prototype__proto = Duration.prototype;
	
	    duration_prototype__proto.abs            = duration_abs__abs;
	    duration_prototype__proto.add            = duration_add_subtract__add;
	    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
	    duration_prototype__proto.as             = as;
	    duration_prototype__proto.asMilliseconds = asMilliseconds;
	    duration_prototype__proto.asSeconds      = asSeconds;
	    duration_prototype__proto.asMinutes      = asMinutes;
	    duration_prototype__proto.asHours        = asHours;
	    duration_prototype__proto.asDays         = asDays;
	    duration_prototype__proto.asWeeks        = asWeeks;
	    duration_prototype__proto.asMonths       = asMonths;
	    duration_prototype__proto.asYears        = asYears;
	    duration_prototype__proto.valueOf        = duration_as__valueOf;
	    duration_prototype__proto._bubble        = bubble;
	    duration_prototype__proto.get            = duration_get__get;
	    duration_prototype__proto.milliseconds   = milliseconds;
	    duration_prototype__proto.seconds        = seconds;
	    duration_prototype__proto.minutes        = minutes;
	    duration_prototype__proto.hours          = hours;
	    duration_prototype__proto.days           = days;
	    duration_prototype__proto.weeks          = weeks;
	    duration_prototype__proto.months         = months;
	    duration_prototype__proto.years          = years;
	    duration_prototype__proto.humanize       = humanize;
	    duration_prototype__proto.toISOString    = iso_string__toISOString;
	    duration_prototype__proto.toString       = iso_string__toISOString;
	    duration_prototype__proto.toJSON         = iso_string__toISOString;
	    duration_prototype__proto.locale         = locale;
	    duration_prototype__proto.localeData     = localeData;
	
	    // Deprecations
	    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
	    duration_prototype__proto.lang = lang;
	
	    // Side effect imports
	
	    addFormatToken('X', 0, 0, 'unix');
	    addFormatToken('x', 0, 0, 'valueOf');
	
	    // PARSING
	
	    addRegexToken('x', matchSigned);
	    addRegexToken('X', matchTimestamp);
	    addParseToken('X', function (input, array, config) {
	        config._d = new Date(parseFloat(input, 10) * 1000);
	    });
	    addParseToken('x', function (input, array, config) {
	        config._d = new Date(toInt(input));
	    });
	
	    // Side effect imports
	
	
	    utils_hooks__hooks.version = '2.10.6';
	
	    setHookCallback(local__createLocal);
	
	    utils_hooks__hooks.fn                    = momentPrototype;
	    utils_hooks__hooks.min                   = min;
	    utils_hooks__hooks.max                   = max;
	    utils_hooks__hooks.utc                   = create_utc__createUTC;
	    utils_hooks__hooks.unix                  = moment__createUnix;
	    utils_hooks__hooks.months                = lists__listMonths;
	    utils_hooks__hooks.isDate                = isDate;
	    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
	    utils_hooks__hooks.invalid               = valid__createInvalid;
	    utils_hooks__hooks.duration              = create__createDuration;
	    utils_hooks__hooks.isMoment              = isMoment;
	    utils_hooks__hooks.weekdays              = lists__listWeekdays;
	    utils_hooks__hooks.parseZone             = moment__createInZone;
	    utils_hooks__hooks.localeData            = locale_locales__getLocale;
	    utils_hooks__hooks.isDuration            = isDuration;
	    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
	    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
	    utils_hooks__hooks.defineLocale          = defineLocale;
	    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
	    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
	    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
	
	    var _moment = utils_hooks__hooks;
	
	    return _moment;
	
	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./en-gb": 6,
		"./en-gb.js": 6
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 5;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : great britain english (en-gb)
	//! author : Chris Gedrim : https://github.com/chrisgedrim
	
	(function (global, factory) {
	    true ? factory(__webpack_require__(3)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var en_gb = moment.defineLocale('en-gb', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return en_gb;
	
	}));

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*!
	 * Timekit JavaScript SDK
	 * Version: 1.1.0
	 * http://timekit.io
	 *
	 * Copyright 2015 Timekit, Inc.
	 * The Timekit JavaScript SDK is freely distributable under the MIT license.
	 *
	 */
	var axios = __webpack_require__(8);
	var base64 = __webpack_require__(27);
	var humps = __webpack_require__(28);
	
	function Timekit() {
	
	  /**
	   * Auth variables for login gated API methods
	   * @type {String}
	   */
	  var userEmail;
	  var userApiToken;
	  var includes;
	
	  /**
	   * Default config
	   * @type {Object}
	   */
	  var config = {
	    app: 'demo',
	    apiBaseUrl: 'https://api.timekit.io/',
	    apiVersion: 'v2',
	    convertResponseToCamelcase: false
	  };
	
	  /**
	   * Generate base64 string for basic auth purposes
	   * @type {Function}
	   * @return {String}
	   */
	
	  var encodeAuthHeader = function() {
	    return base64.encode(userEmail + ':' + userApiToken);
	  };
	
	  /**
	   * Build absolute URL for API call
	   * @type {Function}
	   * @return {String}
	   */
	  var buildUrl = function(endpoint) {
	    return config.apiBaseUrl + config.apiVersion + endpoint;
	  };
	
	  /**
	   * Root Object that holds methods to expose for API consumption
	   * @type {Object}
	   */
	  var TK = {};
	
	
	  /**
	   * Prepare and make HTTP request to API
	   * @type {Object}
	   * @return {Promise}
	   */
	  TK.makeRequest = function(args) {
	
	    // construct URL with base, version and endpoint
	    args.url = buildUrl(args.url);
	
	    // add http headers if applicable
	    args.headers = { 'Timekit-App': config.app };
	    if (userEmail && userApiToken) { args.headers.Authorization = 'Basic ' + encodeAuthHeader(); }
	    if (config.inputTimestampFormat) { args.headers['Timekit-InputTimestampFormat'] = config.inputTimestampFormat; }
	    if (config.outputTimestampFormat) { args.headers['Timekit-OutputTimestampFormat'] = config.outputTimestampFormat; }
	    if (config.timezone) { args.headers['Timekit-Timezone'] = config.timezone; }
	
	    // add dynamic includes if applicable
	    if (includes && includes.length > 0) {
	      if (args.params === undefined) { args.params = {}; }
	      args.params.include = includes.join();
	      includes = [];
	    }
	
	    // decamelize keys in data objects
	    if (args.data) { args.data = humps.decamelizeKeys(args.data); }
	
	    // register response interceptor for data manipulation
	    var interceptor = axios.interceptors.response.use(function (response) {
	      if(response.data && response.data.data) {
	        response.data = response.data.data;
	        if (config.convertResponseToCamelcase) {
	          response.data = humps.camelizeKeys(response.data);
	        }
	      }
	      return response;
	    }, function (error) {
	      return Promise.reject(error);
	    });
	
	    // execute request!
	    var request = axios(args);
	
	    // deregister response interceptor
	    axios.interceptors.response.eject(interceptor);
	
	    return request;
	  };
	
	  /**
	   * Overwrite default config with supplied settings
	   * @type {Function}
	   * @return {Object}
	   */
	  TK.configure = function(custom) {
	    for (var attr in custom) { config[attr] = custom[attr]; }
	    return config;
	  };
	
	  /**
	   * Returns the current config
	   * @type {Function}
	   * @return {Object}
	   */
	  TK.getConfig = function() {
	    return config;
	  };
	
	  /**
	   * Set the active user manuallt (happens automatically on timekit.auth())
	   * @type {Function}
	   */
	  TK.setUser = function(email, apiToken) {
	    userEmail = email;
	    userApiToken = apiToken;
	  };
	
	  /**
	   * Returns the current active user
	   * @type {Function}
	   * @return {Object}
	   */
	  TK.getUser = function() {
	    return {
	      email: userEmail,
	      apiToken: userApiToken
	    };
	  };
	
	  /**
	   * Add supplied dynamic includes to the next request (fluent/chainable return)
	   * @type {Function}
	   * @return {Object}
	   */
	  TK.include = function() {
	    includes = Array.prototype.slice.call(arguments);
	    return this;
	  };
	
	  /**
	   * Get user's connected accounts
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getAccounts = function() {
	
	    return TK.makeRequest({
	      url: '/accounts',
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Redirect to the Google signup/login page
	   * @type {Function}
	   * @return {String}
	   */
	  TK.accountGoogleSignup = function(data, shouldAutoRedirect) {
	
	    var url = buildUrl('/accounts/google/signup') + '?Timekit-App=' + config.app + (data && data.callback ? '&callback=' + data.callback : '');
	
	    if(shouldAutoRedirect && window) {
	      window.location.href = url;
	    } else {
	      return url;
	    }
	
	  };
	
	  /**
	   * Get user's Google calendars
	   * @type {Function
	   * @return {Promise}
	   */
	  TK.getAccountGoogleCalendars = function() {
	
	    return TK.makeRequest({
	      url: '/accounts/google/calendars',
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Initiate a server sync on all the users accounts
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.accountSync = function() {
	
	    return TK.makeRequest({
	      url: '/accounts/sync',
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Authenticate a user to retrive API token for future calls
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.auth = function(data) {
	
	    var r = TK.makeRequest({
	      url: '/auth',
	      method: 'post',
	      data: data
	    });
	
	    r.then(function(response) {
	      TK.setUser(response.data.email, response.data.api_token);
	    }).catch(function(){
	      TK.setUser('','');
	    });
	
	    return r;
	
	  };
	
	  /**
	   * Get list of apps
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getApps = function() {
	
	    return TK.makeRequest({
	      url: '/apps',
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Get settings for a specific app
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getApp = function(data) {
	
	    return TK.makeRequest({
	      url: '/apps/' + data.slug,
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Create a new Timekit app
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.createApp = function(data) {
	
	    return TK.makeRequest({
	      url: '/apps',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Update settings for a specific app
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.updateApp = function(data) {
	
	    var slug = data.slug;
	    delete data.slug;
	
	    return TK.makeRequest({
	      url: '/apps/' + slug,
	      method: 'put',
	      data: data
	    });
	
	  };
	
	  /**
	   * Delete an app
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.deleteApp = function(data) {
	
	    return TK.makeRequest({
	      url: '/apps/' + data.slug,
	      method: 'delete'
	    });
	
	  };
	
	  /**
	   * Get users calendars that are present on Timekit (synced from providers)
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getCalendars = function() {
	
	    return TK.makeRequest({
	      url: '/calendars',
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Get users calendars that are present on Timekit (synced from providers)
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getCalendar = function(data) {
	
	    return TK.makeRequest({
	      url: '/calendars/' + data.id,
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Create a new calendar for current user
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.createCalendar = function(data) {
	
	    return TK.makeRequest({
	      url: '/calendars/',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Delete a calendar
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.deleteCalendar = function(data) {
	
	    return TK.makeRequest({
	      url: '/calendars/' + data.id,
	      method: 'delete'
	    });
	
	  };
	
	  /**
	   * Get users contacts that are present on Timekit (synced from providers)
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getContacts = function() {
	
	    return TK.makeRequest({
	      url: '/contacts/',
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Get all user's events
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getEvents = function(data) {
	
	    return TK.makeRequest({
	      url: '/events',
	      method: 'get',
	      params: data
	    });
	
	  };
	
	  /**
	   * Get a user's event by ID
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getEvent = function(data) {
	
	    return TK.makeRequest({
	      url: '/events/' + data.id,
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Create a new event
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.createEvent = function(data) {
	
	    return TK.makeRequest({
	      url: '/events',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Delete a user's event by ID
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.deleteEvent = function(data) {
	
	    return TK.makeRequest({
	      url: '/events/' + data.id,
	      method: 'delete'
	    });
	
	  };
	
	  /**
	   * Get a user's anonymized availability (other user's on Timekit can be queryied by supplying their email)
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getAvailability = function(data) {
	
	    return TK.makeRequest({
	      url: '/events/availability',
	      method: 'get',
	      params: data
	    });
	
	  };
	
	  /**
	   * Find mutual availability across multiple users/calendars
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.findTime = function(data) {
	
	    return TK.makeRequest({
	      url: '/findtime',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Find mutual availability across multiple users/calendars
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.findTimeBulk = function(data) {
	
	    return TK.makeRequest({
	      url: '/findtime/bulk',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Get a user's meetings
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getMeetings = function() {
	
	    return TK.makeRequest({
	      url: '/meetings',
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Get a user's specific meeting
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getMeeting = function(data) {
	
	    return TK.makeRequest({
	      url: '/meetings/' + data.id,
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Get a user's specific meeting
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.createMeeting = function(data) {
	
	    return TK.makeRequest({
	      url: '/meetings',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Get a user's specific meeting
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.updateMeeting = function(data) {
	
	    var id = data.id;
	    delete data.id;
	
	    return TK.makeRequest({
	      url: '/meetings/' + id,
	      method: 'put',
	      data: data
	    });
	
	  };
	
	  /**
	   * Set availability (true/faalse) on a meeting's suggestion
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.setMeetingAvailability = function(data) {
	
	    return TK.makeRequest({
	      url: '/meetings/availability',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Book/finalize the meeting, sending out meeting invites to all participants
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.bookMeeting = function(data) {
	
	    return TK.makeRequest({
	      url: '/meetings/book',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Invite users/emails to a meeting, sending out invite emails to the supplied addresses
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.inviteToMeeting = function(data) {
	
	    var id = data.id;
	    delete data.id;
	
	    return TK.makeRequest({
	      url: '/meetings/' + id + '/invite',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Create a new user with the given properties
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.createUser = function(data) {
	
	    return TK.makeRequest({
	      url: '/users',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Fetch current user data from server
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getUserInfo = function() {
	
	    return TK.makeRequest({
	      url: '/users/me',
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Fetch current user data from server
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.updateUser = function(data) {
	
	    return TK.makeRequest({
	      url: '/users/me',
	      method: 'put',
	      data: data
	    });
	
	  };
	
	  /**
	   * Reset password for a user
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.resetUserPassword = function(data) {
	
	    return TK.makeRequest({
	      url: '/users/resetpassword',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Get a specific users' timezone
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getUserTimezone = function(data) {
	
	    return TK.makeRequest({
	      url: '/users/timezone/' + data.email,
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Get a user property by key
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getUserProperties = function() {
	
	    return TK.makeRequest({
	      url: '/properties',
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Get a user property by key
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getUserProperty = function(data) {
	
	    return TK.makeRequest({
	      url: '/properties/' + data.key,
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Set or update user properties
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.setUserProperties = function(data) {
	
	    return TK.makeRequest({
	      url: '/properties',
	      method: 'put',
	      data: data
	    });
	
	  };
	
	  /**
	   * Get all user auth credentials
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getCredentials = function() {
	
	    return TK.makeRequest({
	      url: '/credentials',
	      method: 'get'
	    });
	
	  };
	
	    /**
	   * Create a new pair of auth credentials
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.createCredential = function(data) {
	
	    return TK.makeRequest({
	      url: '/credentials',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Delete a pair of auth credentials
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.deleteCredential = function(data) {
	
	    return TK.makeRequest({
	      url: '/credentials/' + data.id,
	      method: 'delete'
	    });
	
	  };
	
	  return TK;
	
	}
	
	module.exports = new Timekit();


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaults = __webpack_require__(10);
	var utils = __webpack_require__(11);
	var deprecatedMethod = __webpack_require__(12);
	var dispatchRequest = __webpack_require__(13);
	var InterceptorManager = __webpack_require__(21);
	
	// Polyfill ES6 Promise if needed
	(function () {
	  // webpack is being used to set es6-promise to the native Promise
	  // for the standalone build. It's necessary to make sure polyfill exists.
	  var P = __webpack_require__(22);
	  if (P && typeof P.polyfill === 'function') {
	    P.polyfill();
	  }
	})();
	
	var axios = module.exports = function axios(config) {
	  config = utils.merge({
	    method: 'get',
	    headers: {},
	    transformRequest: defaults.transformRequest,
	    transformResponse: defaults.transformResponse
	  }, config);
	
	  // Don't allow overriding defaults.withCredentials
	  config.withCredentials = config.withCredentials || defaults.withCredentials;
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  axios.interceptors.request.forEach(function (interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  axios.interceptors.response.forEach(function (interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  // Provide alias for success
	  promise.success = function success(fn) {
	    deprecatedMethod('success', 'then', 'https://github.com/mzabriskie/axios/blob/master/README.md#response-api');
	
	    promise.then(function(response) {
	      fn(response.data, response.status, response.headers, response.config);
	    });
	    return promise;
	  };
	
	  // Provide alias for error
	  promise.error = function error(fn) {
	    deprecatedMethod('error', 'catch', 'https://github.com/mzabriskie/axios/blob/master/README.md#response-api');
	
	    promise.then(null, function(response) {
	      fn(response.data, response.status, response.headers, response.config);
	    });
	    return promise;
	  };
	
	  return promise;
	};
	
	// Expose defaults
	axios.defaults = defaults;
	
	// Expose all/spread
	axios.all = function (promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(26);
	
	// Expose interceptors
	axios.interceptors = {
	  request: new InterceptorManager(),
	  response: new InterceptorManager()
	};
	
	// Provide aliases for supported request methods
	(function () {
	  function createShortMethods() {
	    utils.forEach(arguments, function (method) {
	      axios[method] = function (url, config) {
	        return axios(utils.merge(config || {}, {
	          method: method,
	          url: url
	        }));
	      };
	    });
	  }
	
	  function createShortMethodsWithData() {
	    utils.forEach(arguments, function (method) {
	      axios[method] = function (url, data, config) {
	        return axios(utils.merge(config || {}, {
	          method: method,
	          url: url,
	          data: data
	        }));
	      };
	    });
	  }
	
	  createShortMethods('delete', 'get', 'head');
	  createShortMethodsWithData('post', 'put', 'patch');
	})();


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(11);
	
	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	module.exports = {
	  transformRequest: [function (data, headers) {
	    if(utils.isFormData(data)) {
	      return data;
	    }
	    if (utils.isArrayBuffer(data)) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
	      // Set application/json if no Content-Type has been specified
	      if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	        headers['Content-Type'] = 'application/json;charset=utf-8';
	      }
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function (data) {
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) {}
	    }
	    return data;
	  }],
	
	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE)
	  },
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN'
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return toString.call(val) === '[object FormData]';
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    return ArrayBuffer.isView(val);
	  } else {
	    return (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array or arguments callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Check if obj is array-like
	  var isArrayLike = isArray(obj) || (typeof obj === 'object' && !isNaN(obj.length));
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArrayLike) {
	    obj = [obj];
	  }
	
	  // Iterate over array values
	  if (isArrayLike) {
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  }
	  // Iterate over object keys
	  else {
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/*obj1, obj2, obj3, ...*/) {
	  var result = {};
	  forEach(arguments, function (obj) {
	    forEach(obj, function (val, key) {
	      result[key] = val;
	    });
	  });
	  return result;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  forEach: forEach,
	  merge: merge,
	  trim: trim
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Supply a warning to the developer that a method they are using
	 * has been deprecated.
	 *
	 * @param {string} method The name of the deprecated method
	 * @param {string} [instead] The alternate method to use if applicable
	 * @param {string} [docs] The documentation URL to get further details
	 */
	module.exports = function deprecatedMethod(method, instead, docs) {
	  try {
	    console.warn(
	      'DEPRECATED method `' + method + '`.' +
	      (instead ? ' Use `' + instead + '` instead.' : '') +
	      ' This method will be removed in a future release.');
	
	    if (docs) {
	      console.warn('For more information about usage see ' + docs);
	    }
	  } catch (e) {}
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/**
	 * Dispatch a request to the server using whichever adapter
	 * is supported by the current environment.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  return new Promise(function (resolve, reject) {
	    try {
	      // For browsers use XHR adapter
	      if (typeof window !== 'undefined') {
	        __webpack_require__(15)(resolve, reject, config);
	      }
	      // For node use HTTP adapter
	      else if (typeof process !== 'undefined') {
	        __webpack_require__(15)(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	};
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ },
/* 14 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*global ActiveXObject:true*/
	
	var defaults = __webpack_require__(10);
	var utils = __webpack_require__(11);
	var buildUrl = __webpack_require__(16);
	var cookies = __webpack_require__(17);
	var parseHeaders = __webpack_require__(18);
	var transformData = __webpack_require__(19);
	var urlIsSameOrigin = __webpack_require__(20);
	
	module.exports = function xhrAdapter(resolve, reject, config) {
	  // Transform request data
	  var data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Merge headers
	  var requestHeaders = utils.merge(
	    defaults.headers.common,
	    defaults.headers[config.method] || {},
	    config.headers || {}
	  );
	
	  if (utils.isFormData(data)) {
	    delete requestHeaders['Content-Type']; // Let the browser set it
	  }
	
	  // Create the request
	  var request = new (XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
	  request.open(config.method.toUpperCase(), buildUrl(config.url, config.params), true);
	
	  // Listen for ready state
	  request.onreadystatechange = function () {
	    if (request && request.readyState === 4) {
	      // Prepare the response
	      var responseHeaders = parseHeaders(request.getAllResponseHeaders());
	      var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response;
	      var response = {
	        data: transformData(
	          responseData,
	          responseHeaders,
	          config.transformResponse
	        ),
	        status: request.status,
	        statusText: request.statusText,
	        headers: responseHeaders,
	        config: config
	      };
	
	      // Resolve or reject the Promise based on the status
	      (request.status >= 200 && request.status < 300 ?
	        resolve :
	        reject)(response);
	
	      // Clean up request
	      request = null;
	    }
	  };
	
	  // Add xsrf header
	  var xsrfValue = urlIsSameOrigin(config.url) ?
	      cookies.read(config.xsrfCookieName || defaults.xsrfCookieName) :
	      undefined;
	  if (xsrfValue) {
	    requestHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue;
	  }
	
	  // Add headers to the request
	  utils.forEach(requestHeaders, function (val, key) {
	    // Remove Content-Type if data is undefined
	    if (!data && key.toLowerCase() === 'content-type') {
	      delete requestHeaders[key];
	    }
	    // Otherwise add header to the request
	    else {
	      request.setRequestHeader(key, val);
	    }
	  });
	
	  // Add withCredentials to request if needed
	  if (config.withCredentials) {
	    request.withCredentials = true;
	  }
	
	  // Add responseType to request if needed
	  if (config.responseType) {
	    try {
	      request.responseType = config.responseType;
	    } catch (e) {
	      if (request.responseType !== 'json') {
	        throw e;
	      }
	    }
	  }
	
	  if (utils.isArrayBuffer(data)) {
	    data = new DataView(data);
	  }
	
	  // Send the request
	  request.send(data);
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(11);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildUrl(url, params) {
	  if (!params) {
	    return url;
	  }
	
	  var parts = [];
	
	  utils.forEach(params, function (val, key) {
	    if (val === null || typeof val === 'undefined') {
	      return;
	    }
	    if (!utils.isArray(val)) {
	      val = [val];
	    }
	
	    utils.forEach(val, function (v) {
	      if (utils.isDate(v)) {
	        v = v.toISOString();
	      }
	      else if (utils.isObject(v)) {
	        v = JSON.stringify(v);
	      }
	      parts.push(encode(key) + '=' + encode(v));
	    });
	  });
	
	  if (parts.length > 0) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
	  }
	
	  return url;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(11);
	
	module.exports = {
	  write: function write(name, value, expires, path, domain, secure) {
	    var cookie = [];
	    cookie.push(name + '=' + encodeURIComponent(value));
	
	    if (utils.isNumber(expires)) {
	      cookie.push('expires=' + new Date(expires).toGMTString());
	    }
	
	    if (utils.isString(path)) {
	      cookie.push('path=' + path);
	    }
	
	    if (utils.isString(domain)) {
	      cookie.push('domain=' + domain);
	    }
	
	    if (secure === true) {
	      cookie.push('secure');
	    }
	
	    document.cookie = cookie.join('; ');
	  },
	
	  read: function read(name) {
	    var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	    return (match ? decodeURIComponent(match[3]) : null);
	  },
	
	  remove: function remove(name) {
	    this.write(name, '', Date.now() - 86400000);
	  }
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(11);
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {}, key, val, i;
	
	  if (!headers) { return parsed; }
	
	  utils.forEach(headers.split('\n'), function(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });
	
	  return parsed;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(11);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  utils.forEach(fns, function (fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(11);
	var msie = /(msie|trident)/i.test(navigator.userAgent);
	var urlParsingNode = document.createElement('a');
	var originUrl;
	
	/**
	 * Parse a URL to discover it's components
	 *
	 * @param {String} url The URL to be parsed
	 * @returns {Object}
	 */
	function urlResolve(url) {
	  var href = url;
	
	  if (msie) {
	    // IE needs attribute set twice to normalize properties
	    urlParsingNode.setAttribute('href', href);
	    href = urlParsingNode.href;
	  }
	
	  urlParsingNode.setAttribute('href', href);
	
	  // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	  return {
	    href: urlParsingNode.href,
	    protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	    host: urlParsingNode.host,
	    search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	    hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	    hostname: urlParsingNode.hostname,
	    port: urlParsingNode.port,
	    pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	              urlParsingNode.pathname :
	              '/' + urlParsingNode.pathname
	  };
	}
	
	originUrl = urlResolve(window.location.href);
	
	/**
	 * Determine if a URL shares the same origin as the current location
	 *
	 * @param {String} requestUrl The URL to test
	 * @returns {boolean} True if URL shares the same origin, otherwise false
	 */
	module.exports = function urlIsSameOrigin(requestUrl) {
	  var parsed = (utils.isString(requestUrl)) ? urlResolve(requestUrl) : requestUrl;
	  return (parsed.protocol === originUrl.protocol &&
	        parsed.host === originUrl.host);
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(11);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function (fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
	
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function (id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `remove`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function (fn) {
	  utils.forEach(this.handlers, function (h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, setImmediate, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   2.3.0
	 */
	
	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }
	
	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }
	
	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }
	
	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }
	
	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$toString = {}.toString;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;
	
	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }
	
	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }
	
	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }
	
	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
	
	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';
	
	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      var nextTick = process.nextTick;
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // setImmediate should be used instead instead
	      var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
	      if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
	        nextTick = setImmediate;
	      }
	      return function() {
	        nextTick(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });
	
	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }
	
	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }
	
	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }
	
	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];
	
	        callback(arg);
	
	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }
	
	      lib$es6$promise$asap$$len = 0;
	    }
	
	    function lib$es6$promise$asap$$attemptVertex() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(24);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }
	
	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertex();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	
	    function lib$es6$promise$$internal$$noop() {}
	
	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;
	
	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$selfFullfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }
	
	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }
	
	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;
	
	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }
	
	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = lib$es6$promise$$internal$$getThen(maybeThenable);
	
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }
	
	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFullfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }
	
	      lib$es6$promise$$internal$$publish(promise);
	    }
	
	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	
	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;
	
	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }
	
	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;
	
	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }
	
	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;
	
	      parent._onerror = null;
	
	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;
	
	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;
	
	      if (subscribers.length === 0) { return; }
	
	      var child, callback, detail = promise._result;
	
	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];
	
	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }
	
	      promise._subscribers.length = 0;
	    }
	
	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }
	
	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;
	
	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);
	
	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }
	
	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }
	
	      } else {
	        value = detail;
	        succeeded = true;
	      }
	
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }
	
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      var enumerator = this;
	
	      enumerator._instanceConstructor = Constructor;
	      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (enumerator._validateInput(input)) {
	        enumerator._input     = input;
	        enumerator.length     = input.length;
	        enumerator._remaining = input.length;
	
	        enumerator._init();
	
	        if (enumerator.length === 0) {
	          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	        } else {
	          enumerator.length = enumerator.length || 0;
	          enumerator._enumerate();
	          if (enumerator._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
	      }
	    }
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return lib$es6$promise$utils$$isArray(input);
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };
	
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var enumerator = this;
	
	      var length  = enumerator.length;
	      var promise = enumerator.promise;
	      var input   = enumerator._input;
	
	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        enumerator._eachEntry(input[i], i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var enumerator = this;
	      var c = enumerator._instanceConstructor;
	
	      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
	          entry._onerror = null;
	          enumerator._settledAt(entry._state, i, entry._result);
	        } else {
	          enumerator._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        enumerator._remaining--;
	        enumerator._result[i] = entry;
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var enumerator = this;
	      var promise = enumerator.promise;
	
	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        enumerator._remaining--;
	
	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          enumerator._result[i] = value;
	        }
	      }
	
	      if (enumerator._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;
	
	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }
	
	      var length = entries.length;
	
	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }
	
	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }
	
	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }
	
	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
	
	    var lib$es6$promise$promise$$counter = 0;
	
	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }
	
	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }
	
	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.
	
	      Terminology
	      -----------
	
	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.
	
	      A promise can be in one of three states: pending, fulfilled, or rejected.
	
	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.
	
	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.
	
	
	      Basic Usage:
	      ------------
	
	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);
	
	        // on failure
	        reject(reason);
	      });
	
	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Advanced Usage:
	      ---------------
	
	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.
	
	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();
	
	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();
	
	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }
	
	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Unlike callbacks, promises are great composable primitives.
	
	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON
	
	        return values;
	      });
	      ```
	
	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];
	
	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        if (!lib$es6$promise$utils$$isFunction(resolver)) {
	          lib$es6$promise$promise$$needsResolver();
	        }
	
	        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
	          lib$es6$promise$promise$$needsNew();
	        }
	
	        lib$es6$promise$$internal$$initializePromise(this, resolver);
	      }
	    }
	
	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
	
	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,
	
	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.
	
	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```
	
	      Chaining
	      --------
	
	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.
	
	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });
	
	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	
	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```
	
	      Assimilation
	      ------------
	
	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```
	
	      If the assimliated promise rejects, then the downstream promise will also reject.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```
	
	      Simple Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var result;
	
	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```
	
	      Advanced Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var author, books;
	
	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	
	      function foundBooks(books) {
	
	      }
	
	      function failure(reason) {
	
	      }
	
	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection) {
	        var parent = this;
	        var state = parent._state;
	
	        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	          return this;
	        }
	
	        var child = new this.constructor(lib$es6$promise$$internal$$noop);
	        var result = parent._result;
	
	        if (state) {
	          var callback = arguments[state - 1];
	          lib$es6$promise$asap$$asap(function(){
	            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }
	
	        return child;
	      },
	
	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.
	
	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }
	
	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }
	
	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;
	
	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }
	
	      var P = local.Promise;
	
	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }
	
	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
	
	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };
	
	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(25)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }
	
	    lib$es6$promise$polyfill$$default();
	}).call(this);
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14), __webpack_require__(23).setImmediate, (function() { return this; }()), __webpack_require__(4)(module)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(14).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23).setImmediate, __webpack_require__(23).clearImmediate))

/***/ },
/* 24 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function (arr) {
	    callback.apply(null, arr);
	  };
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
	;(function(root) {
	
		// Detect free variables `exports`.
		var freeExports = typeof exports == 'object' && exports;
	
		// Detect free variable `module`.
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;
	
		// Detect free variable `global`, from Node.js or Browserified code, and use
		// it as `root`.
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}
	
		/*--------------------------------------------------------------------------*/
	
		var InvalidCharacterError = function(message) {
			this.message = message;
		};
		InvalidCharacterError.prototype = new Error;
		InvalidCharacterError.prototype.name = 'InvalidCharacterError';
	
		var error = function(message) {
			// Note: the error messages used throughout this file match those used by
			// the native `atob`/`btoa` implementation in Chromium.
			throw new InvalidCharacterError(message);
		};
	
		var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		// http://whatwg.org/html/common-microsyntaxes.html#space-character
		var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;
	
		// `decode` is designed to be fully compatible with `atob` as described in the
		// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
		// The optimized base64-decoding algorithm used is based on @atk’s excellent
		// implementation. https://gist.github.com/atk/1020396
		var decode = function(input) {
			input = String(input)
				.replace(REGEX_SPACE_CHARACTERS, '');
			var length = input.length;
			if (length % 4 == 0) {
				input = input.replace(/==?$/, '');
				length = input.length;
			}
			if (
				length % 4 == 1 ||
				// http://whatwg.org/C#alphanumeric-ascii-characters
				/[^+a-zA-Z0-9/]/.test(input)
			) {
				error(
					'Invalid character: the string to be decoded is not correctly encoded.'
				);
			}
			var bitCounter = 0;
			var bitStorage;
			var buffer;
			var output = '';
			var position = -1;
			while (++position < length) {
				buffer = TABLE.indexOf(input.charAt(position));
				bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
				// Unless this is the first of a group of 4 characters…
				if (bitCounter++ % 4) {
					// …convert the first 8 bits to a single ASCII character.
					output += String.fromCharCode(
						0xFF & bitStorage >> (-2 * bitCounter & 6)
					);
				}
			}
			return output;
		};
	
		// `encode` is designed to be fully compatible with `btoa` as described in the
		// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
		var encode = function(input) {
			input = String(input);
			if (/[^\0-\xFF]/.test(input)) {
				// Note: no need to special-case astral symbols here, as surrogates are
				// matched, and the input is supposed to only contain ASCII anyway.
				error(
					'The string to be encoded contains characters outside of the ' +
					'Latin1 range.'
				);
			}
			var padding = input.length % 3;
			var output = '';
			var position = -1;
			var a;
			var b;
			var c;
			var d;
			var buffer;
			// Make sure any padding is handled outside of the loop.
			var length = input.length - padding;
	
			while (++position < length) {
				// Read three bytes, i.e. 24 bits.
				a = input.charCodeAt(position) << 16;
				b = input.charCodeAt(++position) << 8;
				c = input.charCodeAt(++position);
				buffer = a + b + c;
				// Turn the 24 bits into four chunks of 6 bits each, and append the
				// matching character for each of them to the output.
				output += (
					TABLE.charAt(buffer >> 18 & 0x3F) +
					TABLE.charAt(buffer >> 12 & 0x3F) +
					TABLE.charAt(buffer >> 6 & 0x3F) +
					TABLE.charAt(buffer & 0x3F)
				);
			}
	
			if (padding == 2) {
				a = input.charCodeAt(position) << 8;
				b = input.charCodeAt(++position);
				buffer = a + b;
				output += (
					TABLE.charAt(buffer >> 10) +
					TABLE.charAt((buffer >> 4) & 0x3F) +
					TABLE.charAt((buffer << 2) & 0x3F) +
					'='
				);
			} else if (padding == 1) {
				buffer = input.charCodeAt(position);
				output += (
					TABLE.charAt(buffer >> 2) +
					TABLE.charAt((buffer << 4) & 0x3F) +
					'=='
				);
			}
	
			return output;
		};
	
		var base64 = {
			'encode': encode,
			'decode': decode,
			'version': '0.1.0'
		};
	
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return base64;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = base64;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (var key in base64) {
					base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.base64 = base64;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module), (function() { return this; }())))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;// =========
	// = humps =
	// =========
	// version 0.7.0
	// Underscore-to-camelCase converter (and vice versa)
	// for strings and object keys
	
	// humps is copyright © 2012+ Dom Christie
	// Released under the MIT license.
	
	
	;(function(global) {
	
	  var _processKeys = function(convert, obj, separator, ignoreNumbers) {
	    if(!_isObject(obj) || _isDate(obj) || _isRegExp(obj) || _isBoolean(obj)) {
	      return obj;
	    }
	
	    var output,
	        i = 0,
	        l = 0;
	
	    if(_isArray(obj)) {
	      output = [];
	      for(l=obj.length; i<l; i++) {
	        output.push(_processKeys(convert, obj[i], separator, ignoreNumbers));
	      }
	    }
	    else {
	      output = {};
	      for(var key in obj) {
	        if(obj.hasOwnProperty(key)) {
	          output[convert(key, separator, ignoreNumbers)] = _processKeys(convert, obj[key], separator, ignoreNumbers);
	        }
	      }
	    }
	    return output;
	  };
	
	  // String conversion methods
	
	  var separateWords = function(string, separator, ignoreNumbers) {
	    if (typeof separator === 'undefined') {
	      separator = '_';
	    }
	
	    var regexp = /([a-z])([A-Z0-9])/g;
	
	    if (ignoreNumbers) {
	      regexp = /([a-z])([A-Z])/g;
	    }
	
	    return string.replace(regexp, '$1'+ separator +'$2');
	  };
	
	  var camelize = function(string) {
	    if (_isNumerical(string)) {
	      return string;
	    }
	    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
	      return chr ? chr.toUpperCase() : '';
	    });
	    // Ensure 1st char is always lowercase
	    return string.substr(0, 1).toLowerCase() + string.substr(1);
	  };
	
	  var pascalize = function(string) {
	    var camelized = camelize(string);
	    // Ensure 1st char is always uppercase
	    return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
	  };
	
	  var decamelize = function(string, separator, ignoreNumbers) {
	    return separateWords(string, separator, ignoreNumbers).toLowerCase();
	  };
	
	  // Utilities
	  // Taken from Underscore.js
	
	  var toString = Object.prototype.toString;
	
	  var _isObject = function(obj) {
	    return obj === Object(obj);
	  };
	  var _isArray = function(obj) {
	    return toString.call(obj) == '[object Array]';
	  };
	  var _isDate = function(obj) {
	    return toString.call(obj) == '[object Date]';
	  };
	  var _isRegExp = function(obj) {
	    return toString.call(obj) == '[object RegExp]';
	  };
	  var _isBoolean = function(obj) {
	    return toString.call(obj) == '[object Boolean]';
	  };
	
	  // Performant way to determine if obj coerces to a number
	  var _isNumerical = function(obj) {
	    obj = obj - 0;
	    return obj === obj;
	  };
	
	  var humps = {
	    camelize: camelize,
	    decamelize: decamelize,
	    pascalize: pascalize,
	    depascalize: decamelize,
	    camelizeKeys: function(object) {
	      return _processKeys(camelize, object);
	    },
	    decamelizeKeys: function(object, separator, ignoreNumbers) {
	      return _processKeys(decamelize, object, separator, ignoreNumbers);
	    },
	    pascalizeKeys: function(object) {
	      return _processKeys(pascalize, object);
	    },
	    depascalizeKeys: function () {
	      return this.decamelizeKeys.apply(this, arguments);
	    }
	  };
	
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (humps), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module !== 'undefined' && module.exports) {
	    module.exports = humps;
	  } else {
	    global.humps = humps;
	  }
	
	})(this);


/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	/*
	 * Utily functions for Booking.js
	 */
	
	module.exports = {
	
	  isFunction: function(object) {
	   return !!(object && object.constructor && object.call && object.apply);
	  },
	
	  doCallback: function(hook, config, arg) {
	    if(this.isFunction(config.callbacks[hook])) {
	      config.callbacks[hook](arg);
	    }
	  }
	
	};


/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	
	/*
	 * Default configuration for for Booking.js
	 */
	
	var primary = {
	
	  // email: '',
	  // apiToken: '',
	  // calendar: '',
	  targetEl: '#bookingjs',
	  name: '',
	  avatar: '',
	  autoload: true,
	  includeStyles: true,
	  showCredits: true,
	  goToFirstEvent: true,
	  bookingFields: {
	    name: {
	      placeholder: 'Your full name',
	      prefilled: false
	    },
	    email: {
	      placeholder: 'Your e-mail',
	      prefilled: false
	    },
	    comment: {
	      enabled: true,
	      placeholder: 'Write a comment (optional)',
	      prefilled: false,
	      required: false
	    },
	    phone: {
	      enabled: false,
	      placeholder: 'Your phone number',
	      prefilled: false,
	      required: false
	    },
	    voip: {
	      enabled: false,
	      placeholder: 'Your Skype username',
	      prefilled: false,
	      required: false
	    },
	    location: {
	      enabled: false,
	      placeholder: 'Location',
	      prefilled: false,
	      required: false
	    }
	  },
	  timekitConfig: {
	    app: 'bookingjs'
	  },
	  timekitFindTime: {
	    future: '4 weeks',
	    length: '1 hour'
	  },
	  timekitCreateEvent: {
	    invite: true,
	    my_rsvp: 'needsAction'
	  },
	  fullCalendar: {
	    header: {
	      left: '',
	      center: '',
	      right: 'today, prev, next'
	    },
	    views: {
	      agenda: {
	        displayEventEnd: false
	      }
	    },
	    allDaySlot: false,
	    scrollTime: '08:00:00',
	    timezone: 'local',
	    //minTime: '08:00:00',
	    //maxTime: '19:00:00',
	  },
	  localization: {
	    showTimezoneHelper: true,
	    timeDateFormat: '12h-mdy-sun'
	  },
	  callbacks: {}
	
	};
	
	// Preset: timeDateFormat = '24h-dmy-mon'
	var timeDateFormat24hdmymon = {
	
	  fullCalendar: {
	    timeFormat: 'HH:mm',
	    firstDay: 1,
	    views: {
	      basic: {
	        columnFormat: 'dddd D/M'
	      },
	      agenda: {
	        columnFormat: 'ddd\n D/M',
	        slotLabelFormat: 'HH:mm'
	      }
	    }
	  },
	  localization: {
	    bookingDateFormat: 'D. MMMM YYYY',
	    bookingTimeFormat: 'HH:mm'
	  }
	
	};
	
	// Preset: timeDateFormat = '12h-mdy-sun'
	var timeDateFormat12hmdysun = {
	
	  fullCalendar: {
	    timeFormat: 'h:mma',
	    firstDay: 0,
	    views: {
	      basic: {
	        columnFormat: 'dddd M/D',
	      },
	      agenda: {
	        columnFormat: 'ddd\n M/D',
	        slotLabelFormat: 'ha'
	      }
	    },
	  },
	  localization: {
	    bookingDateFormat: 'MMMM D, YYYY',
	    bookingTimeFormat: 'h:mma'
	  }
	
	};
	
	// Export objects
	module.exports = {
	  primary: primary,
	  presets: {
	    timeDateFormat24hdmymon:  timeDateFormat24hdmymon,
	    timeDateFormat12hmdysun:  timeDateFormat12hmdysun
	  }
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(32);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {"singleton":true});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js?minimize!./../../autoprefixer-loader/index.js!./fullcalendar.css", function() {
				var newContent = require("!!./../../css-loader/index.js?minimize!./../../autoprefixer-loader/index.js!./fullcalendar.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(33)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!\n * FullCalendar v2.4.0 Stylesheet\n * Docs & License: http://fullcalendar.io/\n * (c) 2015 Adam Shaw\n */.fc{direction:ltr;text-align:left}.fc-rtl{text-align:right}body .fc{font-size:1em}.fc-unthemed .fc-divider,.fc-unthemed .fc-popover,.fc-unthemed .fc-row,.fc-unthemed tbody,.fc-unthemed td,.fc-unthemed th,.fc-unthemed thead{border-color:#ddd}.fc-unthemed .fc-popover{background-color:#fff}.fc-unthemed .fc-divider,.fc-unthemed .fc-popover .fc-header{background:#eee}.fc-unthemed .fc-popover .fc-header .fc-close{color:#666}.fc-unthemed .fc-today{background:#fcf8e3}.fc-highlight{background:#bce8f1}.fc-bgevent,.fc-highlight{opacity:.3;filter:alpha(opacity=30)}.fc-bgevent{background:#8fdf82}.fc-nonbusiness{background:#d7d7d7}.fc-icon{display:inline-block;width:1em;height:1em;line-height:1em;font-size:1em;text-align:center;overflow:hidden;font-family:Courier New,Courier,monospace;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.fc-icon:after{position:relative;margin:0 -1em}.fc-icon-left-single-arrow:after{content:\"\\2039\";font-weight:700;font-size:200%;top:-7%;left:3%}.fc-icon-right-single-arrow:after{content:\"\\203A\";font-weight:700;font-size:200%;top:-7%;left:-3%}.fc-icon-left-double-arrow:after{content:\"\\AB\";font-size:160%;top:-7%}.fc-icon-right-double-arrow:after{content:\"\\BB\";font-size:160%;top:-7%}.fc-icon-left-triangle:after{content:\"\\25C4\";font-size:125%;top:3%;left:-2%}.fc-icon-right-triangle:after{content:\"\\25BA\";font-size:125%;top:3%;left:2%}.fc-icon-down-triangle:after{content:\"\\25BC\";font-size:125%;top:2%}.fc-icon-x:after{content:\"\\D7\";font-size:200%;top:6%}.fc button{box-sizing:border-box;margin:0;height:2.1em;padding:0 .6em;font-size:1em;white-space:nowrap;cursor:pointer}.fc button::-moz-focus-inner{margin:0;padding:0}.fc-state-default{border:1px solid}.fc-state-default.fc-corner-left{border-top-left-radius:4px;border-bottom-left-radius:4px}.fc-state-default.fc-corner-right{border-top-right-radius:4px;border-bottom-right-radius:4px}.fc button .fc-icon{position:relative;top:-.05em;margin:0 .2em;vertical-align:middle}.fc-state-default{background-color:#f5f5f5;background-image:-webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));background-image:-webkit-linear-gradient(top,#fff,#e6e6e6);background-image:linear-gradient(to bottom,#fff,#e6e6e6);background-repeat:repeat-x;border-color:#e6e6e6 #e6e6e6 #bfbfbf;border-color:rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);color:#333;text-shadow:0 1px 1px hsla(0,0%,100%,.75);box-shadow:inset 0 1px 0 hsla(0,0%,100%,.2),0 1px 2px rgba(0,0,0,.05)}.fc-state-active,.fc-state-disabled,.fc-state-down,.fc-state-hover{color:#333;background-color:#e6e6e6}.fc-state-hover{color:#333;text-decoration:none;background-position:0 -15px;-webkit-transition:background-position .1s linear;transition:background-position .1s linear}.fc-state-active,.fc-state-down{background-color:#ccc;background-image:none;box-shadow:inset 0 2px 4px rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.05)}.fc-state-disabled{cursor:default;background-image:none;opacity:.65;filter:alpha(opacity=65);box-shadow:none}.fc-button-group{display:inline-block}.fc .fc-button-group>*{float:left;margin:0 0 0 -1px}.fc .fc-button-group>:first-child{margin-left:0}.fc-popover{position:absolute;box-shadow:0 2px 6px rgba(0,0,0,.15)}.fc-popover .fc-header{padding:2px 4px}.fc-popover .fc-header .fc-title{margin:0 2px}.fc-popover .fc-header .fc-close{cursor:pointer}.fc-ltr .fc-popover .fc-header .fc-title,.fc-rtl .fc-popover .fc-header .fc-close{float:left}.fc-ltr .fc-popover .fc-header .fc-close,.fc-rtl .fc-popover .fc-header .fc-title{float:right}.fc-unthemed .fc-popover{border-width:1px;border-style:solid}.fc-unthemed .fc-popover .fc-header .fc-close{font-size:.9em;margin-top:2px}.fc-popover>.ui-widget-header+.ui-widget-content{border-top:0}.fc-divider{border-style:solid;border-width:1px}hr.fc-divider{height:0;margin:0;padding:0 0 2px;border-width:1px 0}.fc-clear{clear:both}.fc-bg,.fc-bgevent-skeleton,.fc-helper-skeleton,.fc-highlight-skeleton{position:absolute;top:0;left:0;right:0}.fc-bg{bottom:0}.fc-bg table{height:100%}.fc table{width:100%;table-layout:fixed;border-collapse:collapse;border-spacing:0;font-size:1em}.fc th{text-align:center}.fc td,.fc th{border-style:solid;border-width:1px;padding:0;vertical-align:top}.fc td.fc-today{border-style:double}.fc .fc-row{border-style:solid;border-width:0}.fc-row table{border-left:0 hidden transparent;border-right:0 hidden transparent;border-bottom:0 hidden transparent}.fc-row:first-child table{border-top:0 hidden transparent}.fc-row{position:relative}.fc-row .fc-bg{z-index:1}.fc-row .fc-bgevent-skeleton,.fc-row .fc-highlight-skeleton{bottom:0}.fc-row .fc-bgevent-skeleton table,.fc-row .fc-highlight-skeleton table{height:100%}.fc-row .fc-bgevent-skeleton td,.fc-row .fc-highlight-skeleton td{border-color:transparent}.fc-row .fc-bgevent-skeleton{z-index:2}.fc-row .fc-highlight-skeleton{z-index:3}.fc-row .fc-content-skeleton{position:relative;z-index:4;padding-bottom:2px}.fc-row .fc-helper-skeleton{z-index:5}.fc-row .fc-content-skeleton td,.fc-row .fc-helper-skeleton td{background:none;border-color:transparent;border-bottom:0}.fc-row .fc-content-skeleton tbody td,.fc-row .fc-helper-skeleton tbody td{border-top:0}.fc-scroller{overflow-y:scroll;overflow-x:hidden}.fc-scroller>*{position:relative;width:100%;overflow:hidden}.fc-event{position:relative;display:block;font-size:.85em;line-height:1.3;border-radius:3px;border:1px solid #3a87ad;background-color:#3a87ad;font-weight:400}.fc-event,.fc-event:hover,.ui-widget .fc-event{color:#fff;text-decoration:none}.fc-event.fc-draggable,.fc-event[href]{cursor:pointer}.fc-not-allowed,.fc-not-allowed .fc-event{cursor:not-allowed}.fc-event .fc-bg{z-index:1;background:#fff;opacity:.25;filter:alpha(opacity=25)}.fc-event .fc-content{position:relative;z-index:2}.fc-event .fc-resizer{position:absolute;z-index:3}.fc-ltr .fc-h-event.fc-not-start,.fc-rtl .fc-h-event.fc-not-end{margin-left:0;border-left-width:0;padding-left:1px;border-top-left-radius:0;border-bottom-left-radius:0}.fc-ltr .fc-h-event.fc-not-end,.fc-rtl .fc-h-event.fc-not-start{margin-right:0;border-right-width:0;padding-right:1px;border-top-right-radius:0;border-bottom-right-radius:0}.fc-h-event .fc-resizer{top:-1px;bottom:-1px;left:-1px;right:-1px;width:5px}.fc-ltr .fc-h-event .fc-start-resizer,.fc-ltr .fc-h-event .fc-start-resizer:after,.fc-ltr .fc-h-event .fc-start-resizer:before,.fc-rtl .fc-h-event .fc-end-resizer,.fc-rtl .fc-h-event .fc-end-resizer:after,.fc-rtl .fc-h-event .fc-end-resizer:before{right:auto;cursor:w-resize}.fc-ltr .fc-h-event .fc-end-resizer,.fc-ltr .fc-h-event .fc-end-resizer:after,.fc-ltr .fc-h-event .fc-end-resizer:before,.fc-rtl .fc-h-event .fc-start-resizer,.fc-rtl .fc-h-event .fc-start-resizer:after,.fc-rtl .fc-h-event .fc-start-resizer:before{left:auto;cursor:e-resize}.fc-day-grid-event{margin:1px 2px 0;padding:0 1px}.fc-day-grid-event .fc-content{white-space:nowrap;overflow:hidden}.fc-day-grid-event .fc-time{font-weight:700}.fc-day-grid-event .fc-resizer{left:-3px;right:-3px;width:7px}a.fc-more{margin:1px 3px;font-size:.85em;cursor:pointer;text-decoration:none}a.fc-more:hover{text-decoration:underline}.fc-limited{display:none}.fc-day-grid .fc-row{z-index:1}.fc-more-popover{z-index:2;width:220px}.fc-more-popover .fc-event-container{padding:10px}.fc-toolbar{text-align:center;margin-bottom:1em}.fc-toolbar .fc-left{float:left}.fc-toolbar .fc-right{float:right}.fc-toolbar .fc-center{display:inline-block}.fc .fc-toolbar>*>*{float:left;margin-left:.75em}.fc .fc-toolbar>*>:first-child{margin-left:0}.fc-toolbar h2{margin:0}.fc-toolbar button{position:relative}.fc-toolbar .fc-state-hover,.fc-toolbar .ui-state-hover{z-index:2}.fc-toolbar .fc-state-down{z-index:3}.fc-toolbar .fc-state-active,.fc-toolbar .ui-state-active{z-index:4}.fc-toolbar button:focus{z-index:5}.fc-view-container *,.fc-view-container :after,.fc-view-container :before{box-sizing:content-box}.fc-view,.fc-view>table{position:relative;z-index:1}.fc-basicDay-view .fc-content-skeleton,.fc-basicWeek-view .fc-content-skeleton{padding-top:1px;padding-bottom:1em}.fc-basic-view .fc-body .fc-row{min-height:4em}.fc-row.fc-rigid{overflow:hidden}.fc-row.fc-rigid .fc-content-skeleton{position:absolute;top:0;left:0;right:0}.fc-basic-view .fc-day-number,.fc-basic-view .fc-week-number{padding:0 2px}.fc-basic-view td.fc-day-number,.fc-basic-view td.fc-week-number span{padding-top:2px;padding-bottom:2px}.fc-basic-view .fc-week-number{text-align:center}.fc-basic-view .fc-week-number span{display:inline-block;min-width:1.25em}.fc-ltr .fc-basic-view .fc-day-number{text-align:right}.fc-rtl .fc-basic-view .fc-day-number{text-align:left}.fc-day-number.fc-other-month{opacity:.3;filter:alpha(opacity=30)}.fc-agenda-view .fc-day-grid{position:relative;z-index:2}.fc-agenda-view .fc-day-grid .fc-row{min-height:3em}.fc-agenda-view .fc-day-grid .fc-row .fc-content-skeleton{padding-top:1px;padding-bottom:1em}.fc .fc-axis{vertical-align:middle;padding:0 4px;white-space:nowrap}.fc-ltr .fc-axis{text-align:right}.fc-rtl .fc-axis{text-align:left}.ui-widget td.fc-axis{font-weight:400}.fc-time-grid,.fc-time-grid-container{position:relative;z-index:1}.fc-time-grid{min-height:100%}.fc-time-grid table{border:0 hidden transparent}.fc-time-grid>.fc-bg{z-index:1}.fc-time-grid .fc-slats,.fc-time-grid>hr{position:relative;z-index:2}.fc-time-grid .fc-bgevent-skeleton,.fc-time-grid .fc-content-skeleton{position:absolute;top:0;left:0;right:0}.fc-time-grid .fc-bgevent-skeleton{z-index:3}.fc-time-grid .fc-highlight-skeleton{z-index:4}.fc-time-grid .fc-content-skeleton{z-index:5}.fc-time-grid .fc-helper-skeleton{z-index:6}.fc-time-grid .fc-slats td{height:1.5em;border-bottom:0}.fc-time-grid .fc-slats .fc-minor td{border-top-style:dotted}.fc-time-grid .fc-slats .ui-widget-content{background:none}.fc-time-grid .fc-highlight-container{position:relative}.fc-time-grid .fc-highlight{position:absolute;left:0;right:0}.fc-time-grid .fc-bgevent-container,.fc-time-grid .fc-event-container{position:relative}.fc-ltr .fc-time-grid .fc-event-container{margin:0 2.5% 0 2px}.fc-rtl .fc-time-grid .fc-event-container{margin:0 2px 0 2.5%}.fc-time-grid .fc-bgevent,.fc-time-grid .fc-event{position:absolute;z-index:1}.fc-time-grid .fc-bgevent{left:0;right:0}.fc-v-event.fc-not-start{border-top-width:0;padding-top:1px;border-top-left-radius:0;border-top-right-radius:0}.fc-v-event.fc-not-end{border-bottom-width:0;padding-bottom:1px;border-bottom-left-radius:0;border-bottom-right-radius:0}.fc-time-grid-event{overflow:hidden}.fc-time-grid-event .fc-time,.fc-time-grid-event .fc-title{padding:0 1px}.fc-time-grid-event .fc-time{font-size:.85em;white-space:nowrap}.fc-time-grid-event.fc-short .fc-content{white-space:nowrap}.fc-time-grid-event.fc-short .fc-time,.fc-time-grid-event.fc-short .fc-title{display:inline-block;vertical-align:top}.fc-time-grid-event.fc-short .fc-time span{display:none}.fc-time-grid-event.fc-short .fc-time:before{content:attr(data-start)}.fc-time-grid-event.fc-short .fc-time:after{content:\"\\A0-\\A0\"}.fc-time-grid-event.fc-short .fc-title{font-size:.85em;padding:0}.fc-time-grid-event .fc-resizer{left:0;right:0;bottom:0;height:8px;overflow:hidden;line-height:8px;font-size:11px;font-family:monospace;text-align:center;cursor:s-resize}.fc-time-grid-event .fc-resizer:after{content:\"=\"}", ""]);
	
	// exports


/***/ },
/* 33 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(36);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {"singleton":true});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?minimize!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/sass-loader/index.js!./fullcalendar.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?minimize!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/sass-loader/index.js!./fullcalendar.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(33)();
	// imports
	
	
	// module
	exports.push([module.id, ".fc-view-container{background-color:#fbfbfb;color:#333}.fc-row.fc-widget-header{border-bottom:1px solid #ececec}.fc-row.fc-widget-header .fc-day-header{text-transform:uppercase;font-size:.9em;font-weight:600}.fc-axis,.fc-row.fc-widget-header .fc-day-header:first-line{color:#b9b9b9}.fc-axis{font-size:.9em}.fc-state-default{text-shadow:none;box-shadow:none;background-image:none;background-color:#fff;border-color:#fff}.fc-button{text-transform:uppercase;font-weight:600;font-size:1.1em}.fc-content-skeleton{border-top:1px solid #ddd}.fc .fc-toolbar{padding:0;margin-bottom:0;border-bottom:1px solid #ececec}.fc .fc-toolbar>*>button{padding:15px 17px;height:auto;outline:0;margin-left:0;-webkit-transition:opacity .2s ease;transition:opacity .2s ease;opacity:.3}.fc .fc-toolbar>*>button:hover{opacity:1}.fc .fc-toolbar>*>button.fc-state-disabled{-webkit-transition:opacity 0s;transition:opacity 0s;opacity:0}.fc .fc-toolbar>*>button.fc-prev-button{padding-right:8px}.fc .fc-toolbar>*>button.fc-next-button{padding-left:8px}.fc .fc-toolbar>*>button .fc-icon{font-size:1.1em}.fc .fc-toolbar>.fc-right>button.fc-today-button{padding:15px 5px}.fc-unthemed .fc-today{background:#fff}.fc-body>tr>.fc-widget-content,.fc-head>tr>.fc-widget-header{border:0!important}.fc th{border-color:#fff;padding:5px}.fc-unthemed .fc-divider,.fc-unthemed .fc-popover .fc-header{background-color:transparent}.empty-calendar .fc-event{opacity:0}.fc-event{-webkit-transition:all .2s,opacity .6s;transition:all .2s,opacity .6s;border:none;border-left:3px solid #689ad8;padding:3px;background-color:#fff;border-radius:4px;color:#333;margin:1px 0;box-shadow:0 1px 2px rgba(0,0,0,.07);cursor:pointer;margin-bottom:2px;opacity:1}.fc-event:hover{color:#fff;background-color:#689ad8;border-left:3px solid #689ad8;box-shadow:0 1px 3px rgba(0,0,0,.15)}.fc-event .fc-bg{opacity:0}.fc-day-grid-event{padding:15px;margin:5px}.fc-day-grid-event .fc-time{font-weight:600}.fc-time-grid .fc-slats .fc-minor td{border-top-style:none}.fc-time-grid .fc-slats td{border-top-color:#fbfbfb}.fc-time-grid .fc-slats td.fc-axis{border-top-color:#ececec}.fc-time-grid-event.fc-short .fc-content{font-size:.7em;line-height:.2em}.fc-time-grid-event.fc-short .fc-time:after{content:''}.fc-time-grid-event .fc-time{font-size:1.1em;padding:5px}.fc-unthemed .fc-divider,.fc-unthemed .fc-popover,.fc-unthemed .fc-row,.fc-unthemed tbody,.fc-unthemed td,.fc-unthemed th,.fc-unthemed thead{border-color:#ececec}.fc-agendaMonthly-view .fc-event{color:#fff}", ""]);
	
	// exports


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(38);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {"singleton":true});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?minimize!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/sass-loader/index.js!./utils.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?minimize!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/sass-loader/index.js!./utils.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(33)();
	// imports
	
	
	// module
	exports.push([module.id, "@keyframes spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes shake{0%{-webkit-transform:translateX(0);transform:translateX(0)}25%{-webkit-transform:translateX(5px);transform:translateX(5px)}50%{-webkit-transform:translateX(-5px);transform:translateX(-5px)}75%{-webkit-transform:translateX(5px);transform:translateX(5px)}}@keyframes shake{0%,to{-webkit-transform:translateX(0);transform:translateX(0)}25%{-webkit-transform:translateX(5px);transform:translateX(5px)}50%{-webkit-transform:translateX(-5px);transform:translateX(-5px)}75%{-webkit-transform:translateX(5px);transform:translateX(5px)}to{-webkit-transform:translateX(0);transform:translateX(0)}}", ""]);
	
	// exports


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(40);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {"singleton":true});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?minimize!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?minimize!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(33)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600);", ""]);
	
	// module
	exports.push([module.id, "/*!\n * Booking.js\n * http://booking.timekit.io\n * (c) 2015 Timekit Inc.\n */.bookingjs{position:relative;font-family:Open Sans,Helvetica,Tahoma,Arial,sans-serif;font-size:13px;border-radius:4px;background-color:#fff;box-shadow:rgba(0,0,0,.2) 0 2px 4px 0;margin:60px auto 20px;z-index:10;opacity:0;color:#333}.bookingjs.show{-webkit-transition:opacity .3s ease;transition:opacity .3s ease;opacity:1}.is-small.has-avatar.has-displayname .bookingjs-calendar .fc-toolbar{padding-bottom:24px}.is-small .bookingjs-calendar .fc-toolbar>.fc-right>button.fc-today-button{position:absolute;left:15px}.bookingjs-timezonehelper{color:#aeaeae;text-align:center;padding:7px 10px;background-color:#fbfbfb;border-top:1px solid #ececec;min-height:15px;z-index:20;border-radius:0 0 4px 4px}.bookingjs-timezoneicon{width:10px;margin-right:5px}.bookingjs-avatar{position:absolute;top:-50px;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);border-radius:150px;border:3px solid #fff;box-shadow:0 1px 3px 0 rgba(0,0,0,.13);overflow:hidden;z-index:40;background-color:#fff}.is-small .bookingjs-avatar{top:-40px}.bookingjs-avatar img{max-width:100%;vertical-align:middle;display:inline-block;width:80px;height:80px}.is-small .bookingjs-avatar img{width:70px;height:70px}.bookingjs-displayname{position:absolute;top:0;left:0;padding:15px 20px;color:#333;font-weight:600}.is-small .bookingjs-displayname{text-align:center;width:100%;box-sizing:border-box}.is-small.has-avatar .bookingjs-displayname{top:28px}.bookingjs-bookpage{position:absolute;height:100%;width:100%;top:0;left:0;background-color:#fbfbfb;z-index:30;opacity:0;-webkit-transition:opacity .2s ease;transition:opacity .2s ease;border-radius:4px}.bookingjs-bookpage.show{opacity:1}.bookingjs-bookpage-close{position:absolute;top:0;right:0;padding:18px;-webkit-transition:opacity .2s ease;transition:opacity .2s ease;opacity:.3}.bookingjs-bookpage-close:hover{opacity:1}.bookingjs-bookpage-date{text-align:center;font-size:34px;font-weight:400;margin-top:70px;margin-bottom:10px}.is-small .bookingjs-bookpage-date{font-size:27px;margin-top:60px}.bookingjs-bookpage-time{text-align:center;font-size:17px;font-weight:400;margin-bottom:50px;margin-top:10px}.is-small .bookingjs-bookpage-time{font-size:15px;margin-bottom:35px}.bookingjs-closeicon{width:15px}.bookingjs-form{width:350px;position:relative;margin:0 auto;text-align:center}.is-small .bookingjs-form{width:90%}.bookingjs-form-box{position:relative;box-shadow:0 1px 3px 0 rgba(0,0,0,.1);border-radius:4px;overflow:hidden;background-color:#fff;line-height:0}.bookingjs-form-success-message{position:absolute;top:-999px;left:0;right:0;padding:30px;background-color:#fff;opacity:0;-webkit-transition:opacity .3s ease;transition:opacity .3s ease;line-height:normal}.is-small .bookingjs-form-success-message{padding:22px 10px}.bookingjs-form-success-message .title{font-weight:600}.bookingjs-form-success-message .booked-email{color:#aeaeae}.bookingjs-form.success .bookingjs-form-success-message{opacity:1;top:0;bottom:0}.bookingjs-form-input{-webkit-transition:box-shadow .2s ease;transition:box-shadow .2s ease;width:100%;padding:15px 25px;border:0 solid #ececec;font-size:1em;box-shadow:inset 0 0 1px 1px hsla(0,0%,100%,0);text-align:left;box-sizing:border-box;line-height:normal;font-family:Open Sans,Helvetica,Tahoma,Arial,sans-serif}.bookingjs-form-input:focus{outline:0;box-shadow:inset 0 0 1px 1px #689ad8}.bookingjs-form-input.hidden{display:none}.bookingjs-form-button{position:relative;-webkit-transition:background-color .2s,max-width .3s;transition:background-color .2s,max-width .3s;display:inline-block;padding:13px 25px;background-color:#689ad8;text-transform:uppercase;box-shadow:0 1px 3px 0 rgba(0,0,0,.15);color:#fff;border:0;border-radius:3px;font-size:1.1em;font-weight:600;margin-top:30px;cursor:pointer;height:44px;outline:0;text-align:center;max-width:200px}.bookingjs-form-button .error-text,.bookingjs-form-button .loading-text,.bookingjs-form-button .success-text{-webkit-transition:opacity .3s ease;transition:opacity .3s ease;position:absolute;top:13px;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);opacity:0}.bookingjs-form-button .inactive-text{white-space:nowrap;opacity:1}.bookingjs-form-button .loading-text svg{height:19px;width:19px;-webkit-animation:spin .6s infinite linear;animation:spin .6s infinite linear}.bookingjs-form-button .error-text svg{height:15px;width:15px;margin-top:2px}.bookingjs-form-button .success-text svg{height:15px;margin-top:2px;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);-webkit-transition:-webkit-transform .6s ease;transition:-webkit-transform .6s ease;transition:transform .6s ease;transition:transform .6s ease,-webkit-transform .6s ease}.bookingjs-form-button:hover{background-color:#3f7fce}.bookingjs-form-button.button-shake{-webkit-animation:shake .5s 1 ease;animation:shake .5s 1 ease}.bookingjs-form.loading .bookingjs-form-button,.bookingjs-form.loading .bookingjs-form-button:hover{max-width:80px;background-color:#b1b1b1;cursor:not-allowed}.bookingjs-form.loading .bookingjs-form-button .inactive-text,.bookingjs-form.loading .bookingjs-form-button:hover .inactive-text{opacity:0}.bookingjs-form.loading .bookingjs-form-button .loading-text,.bookingjs-form.loading .bookingjs-form-button:hover .loading-text{opacity:1}.bookingjs-form.error .bookingjs-form-button,.bookingjs-form.error .bookingjs-form-button:hover{max-width:80px;background-color:#d83b46;cursor:not-allowed}.bookingjs-form.error .bookingjs-form-button .inactive-text,.bookingjs-form.error .bookingjs-form-button:hover .inactive-text{opacity:0}.bookingjs-form.error .bookingjs-form-button .error-text,.bookingjs-form.error .bookingjs-form-button:hover .error-text{opacity:1}.bookingjs-form.success .bookingjs-form-button,.bookingjs-form.success .bookingjs-form-button:hover{max-width:80px;background-color:#5baf56;cursor:not-allowed}.bookingjs-form.success .bookingjs-form-button .inactive-text,.bookingjs-form.success .bookingjs-form-button:hover .inactive-text{opacity:0}.bookingjs-form.success .bookingjs-form-button .success-text,.bookingjs-form.success .bookingjs-form-button:hover .success-text{opacity:1}.bookingjs-form.success .bookingjs-form-button .success-text svg,.bookingjs-form.success .bookingjs-form-button:hover .success-text svg{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}.bookingjs-poweredby{position:absolute;bottom:0;left:0;right:0;text-align:center;padding:7px 10px}.bookingjs-poweredby a{-webkit-transition:color .2s ease;transition:color .2s ease;color:#aeaeae;text-decoration:none}.bookingjs-poweredby a svg path{-webkit-transition:fill .2s ease;transition:fill .2s ease;fill:#aeaeae}.bookingjs-poweredby a:hover{color:#333}.bookingjs-poweredby a:hover svg path{fill:#333}.bookingjs-timekiticon{width:13px;margin-right:5px;vertical-align:sub}", ""]);
	
	// exports


/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = "<svg class=\"bookingjs-timezoneicon\" viewBox=\"0 0 98 98\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"><title>Shape</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\"><g id=\"timezone-icon\" sketch:type=\"MSLayerGroup\" fill=\"#AEAEAE\"><path d=\"M37.656,1.387 L39.381,2.516 L46.176,3.475 L49.313,2.778 L55.186,3.495 L56.364,5.065 L52.274,4.52 L48.092,6.262 L49.293,9.385 L53.613,11.348 L54.189,7.395 L58.285,7.133 L64.121,12.707 L65.775,14.887 L66.56,16.28 L62.029,18.067 L55.185,21.169 L54.624,24.206 L50.095,28.476 L50.271,32.572 L48.9,32.559 L48.353,29.086 L45.757,28.238 L38.294,28.631 L35.286,34.137 L37.901,37.274 L42.221,34.917 L42.516,38.755 L44.172,40.062 L47.131,43.46 L46.985,47.751 L52.448,49.034 L56.454,46.159 L58.284,46.768 L65.003,49.45 L74.433,52.985 L76.396,57.698 L83.111,60.968 L84.644,66.732 L80.062,71.857 L74.66,77.519 L68.933,80.482 L63.04,84.408 L55.185,89.515 L50.835,93.941 L49.292,92.263 L52.782,83.419 L53.663,73.167 L46.15,66.34 L46.199,60.596 L48.164,58.239 L50.471,51.415 L45.809,48.811 L42.664,43.706 L37.75,41.817 L30.047,37.667 L26.904,29.024 L25.334,33.344 L22.977,26.276 L23.762,15.671 L27.69,12.136 L26.512,9.779 L29.26,5.459 L23.905,6.99 C9.611,15.545 0.01,31.135 0.01,49.006 C0.01,76.062 21.945,98 49.006,98 C76.062,98 98,76.062 98,49.006 C98,21.947 76.062,0.012 49.006,0.012 C45.092,0.012 41.305,0.52 37.656,1.387 Z\" id=\"Shape\" sketch:type=\"MSShapeGroup\"></path></g></g></svg>"

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(43);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bookingjs-timezonehelper\">");t.b("\n");t.b("\n" + i);t.b("  ");t.b(t.t(t.f("timezoneIcon",c,p,0)));t.b("\n");t.b("\n" + i);if(t.s(t.f("loading",c,p,1),c,p,0,79,110,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <span>Loading...</span>");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(!t.s(t.f("loading",c,p,1),c,p,1,0,0,"")){if(t.s(t.f("timezoneDifference",c,p,1),c,p,0,172,318,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <span>Your timezone is ");t.b(t.v(t.f("timezoneOffset",c,p,0)));t.b(" hours ");t.b(t.v(t.f("timezoneDirection",c,p,0)));t.b(" of ");t.b(t.v(t.f("hostName",c,p,0)));t.b(" (calendar shown in your local time)</span>");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(!t.s(t.f("timezoneDifference",c,p,1),c,p,1,0,0,"")){t.b("      <span>You are in the same timezone as ");t.b(t.v(t.f("hostName",c,p,0)));t.b("</span>");t.b("\n" + i);};};t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"bookingjs-timezonehelper\">\n\n  {{& timezoneIcon }}\n\n  {{# loading }}\n    <span>Loading...</span>\n  {{/ loading }}\n\n  {{^ loading }}\n    {{# timezoneDifference }}\n      <span>Your timezone is {{ timezoneOffset }} hours {{ timezoneDirection }} of {{ hostName }} (calendar shown in your local time)</span>\n    {{/ timezoneDifference }}\n\n    {{^ timezoneDifference }}\n      <span>You are in the same timezone as {{ hostName }}</span>\n    {{/ timezoneDifference }}\n  {{/ loading }}\n\n</div>\n", H);return T; }();

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */
	
	// This file is for use with Node.js. See dist/ for browser files.
	
	var Hogan = __webpack_require__(44);
	Hogan.Template = __webpack_require__(45).Template;
	Hogan.template = Hogan.Template;
	module.exports = Hogan;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */
	
	(function (Hogan) {
	  // Setup regex  assignments
	  // remove whitespace according to Mustache spec
	  var rIsWhitespace = /\S/,
	      rQuot = /\"/g,
	      rNewline =  /\n/g,
	      rCr = /\r/g,
	      rSlash = /\\/g,
	      rLineSep = /\u2028/,
	      rParagraphSep = /\u2029/;
	
	  Hogan.tags = {
	    '#': 1, '^': 2, '<': 3, '$': 4,
	    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
	    '{': 10, '&': 11, '_t': 12
	  };
	
	  Hogan.scan = function scan(text, delimiters) {
	    var len = text.length,
	        IN_TEXT = 0,
	        IN_TAG_TYPE = 1,
	        IN_TAG = 2,
	        state = IN_TEXT,
	        tagType = null,
	        tag = null,
	        buf = '',
	        tokens = [],
	        seenTag = false,
	        i = 0,
	        lineStart = 0,
	        otag = '{{',
	        ctag = '}}';
	
	    function addBuf() {
	      if (buf.length > 0) {
	        tokens.push({tag: '_t', text: new String(buf)});
	        buf = '';
	      }
	    }
	
	    function lineIsWhitespace() {
	      var isAllWhitespace = true;
	      for (var j = lineStart; j < tokens.length; j++) {
	        isAllWhitespace =
	          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
	          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
	        if (!isAllWhitespace) {
	          return false;
	        }
	      }
	
	      return isAllWhitespace;
	    }
	
	    function filterLine(haveSeenTag, noNewLine) {
	      addBuf();
	
	      if (haveSeenTag && lineIsWhitespace()) {
	        for (var j = lineStart, next; j < tokens.length; j++) {
	          if (tokens[j].text) {
	            if ((next = tokens[j+1]) && next.tag == '>') {
	              // set indent to token value
	              next.indent = tokens[j].text.toString()
	            }
	            tokens.splice(j, 1);
	          }
	        }
	      } else if (!noNewLine) {
	        tokens.push({tag:'\n'});
	      }
	
	      seenTag = false;
	      lineStart = tokens.length;
	    }
	
	    function changeDelimiters(text, index) {
	      var close = '=' + ctag,
	          closeIndex = text.indexOf(close, index),
	          delimiters = trim(
	            text.substring(text.indexOf('=', index) + 1, closeIndex)
	          ).split(' ');
	
	      otag = delimiters[0];
	      ctag = delimiters[delimiters.length - 1];
	
	      return closeIndex + close.length - 1;
	    }
	
	    if (delimiters) {
	      delimiters = delimiters.split(' ');
	      otag = delimiters[0];
	      ctag = delimiters[1];
	    }
	
	    for (i = 0; i < len; i++) {
	      if (state == IN_TEXT) {
	        if (tagChange(otag, text, i)) {
	          --i;
	          addBuf();
	          state = IN_TAG_TYPE;
	        } else {
	          if (text.charAt(i) == '\n') {
	            filterLine(seenTag);
	          } else {
	            buf += text.charAt(i);
	          }
	        }
	      } else if (state == IN_TAG_TYPE) {
	        i += otag.length - 1;
	        tag = Hogan.tags[text.charAt(i + 1)];
	        tagType = tag ? text.charAt(i + 1) : '_v';
	        if (tagType == '=') {
	          i = changeDelimiters(text, i);
	          state = IN_TEXT;
	        } else {
	          if (tag) {
	            i++;
	          }
	          state = IN_TAG;
	        }
	        seenTag = i;
	      } else {
	        if (tagChange(ctag, text, i)) {
	          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
	                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
	          buf = '';
	          i += ctag.length - 1;
	          state = IN_TEXT;
	          if (tagType == '{') {
	            if (ctag == '}}') {
	              i++;
	            } else {
	              cleanTripleStache(tokens[tokens.length - 1]);
	            }
	          }
	        } else {
	          buf += text.charAt(i);
	        }
	      }
	    }
	
	    filterLine(seenTag, true);
	
	    return tokens;
	  }
	
	  function cleanTripleStache(token) {
	    if (token.n.substr(token.n.length - 1) === '}') {
	      token.n = token.n.substring(0, token.n.length - 1);
	    }
	  }
	
	  function trim(s) {
	    if (s.trim) {
	      return s.trim();
	    }
	
	    return s.replace(/^\s*|\s*$/g, '');
	  }
	
	  function tagChange(tag, text, index) {
	    if (text.charAt(index) != tag.charAt(0)) {
	      return false;
	    }
	
	    for (var i = 1, l = tag.length; i < l; i++) {
	      if (text.charAt(index + i) != tag.charAt(i)) {
	        return false;
	      }
	    }
	
	    return true;
	  }
	
	  // the tags allowed inside super templates
	  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};
	
	  function buildTree(tokens, kind, stack, customTags) {
	    var instructions = [],
	        opener = null,
	        tail = null,
	        token = null;
	
	    tail = stack[stack.length - 1];
	
	    while (tokens.length > 0) {
	      token = tokens.shift();
	
	      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
	        throw new Error('Illegal content in < super tag.');
	      }
	
	      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
	        stack.push(token);
	        token.nodes = buildTree(tokens, token.tag, stack, customTags);
	      } else if (token.tag == '/') {
	        if (stack.length === 0) {
	          throw new Error('Closing tag without opener: /' + token.n);
	        }
	        opener = stack.pop();
	        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
	          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
	        }
	        opener.end = token.i;
	        return instructions;
	      } else if (token.tag == '\n') {
	        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
	      }
	
	      instructions.push(token);
	    }
	
	    if (stack.length > 0) {
	      throw new Error('missing closing tag: ' + stack.pop().n);
	    }
	
	    return instructions;
	  }
	
	  function isOpener(token, tags) {
	    for (var i = 0, l = tags.length; i < l; i++) {
	      if (tags[i].o == token.n) {
	        token.tag = '#';
	        return true;
	      }
	    }
	  }
	
	  function isCloser(close, open, tags) {
	    for (var i = 0, l = tags.length; i < l; i++) {
	      if (tags[i].c == close && tags[i].o == open) {
	        return true;
	      }
	    }
	  }
	
	  function stringifySubstitutions(obj) {
	    var items = [];
	    for (var key in obj) {
	      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
	    }
	    return "{ " + items.join(",") + " }";
	  }
	
	  function stringifyPartials(codeObj) {
	    var partials = [];
	    for (var key in codeObj.partials) {
	      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
	    }
	    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
	  }
	
	  Hogan.stringify = function(codeObj, text, options) {
	    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
	  }
	
	  var serialNo = 0;
	  Hogan.generate = function(tree, text, options) {
	    serialNo = 0;
	    var context = { code: '', subs: {}, partials: {} };
	    Hogan.walk(tree, context);
	
	    if (options.asString) {
	      return this.stringify(context, text, options);
	    }
	
	    return this.makeTemplate(context, text, options);
	  }
	
	  Hogan.wrapMain = function(code) {
	    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
	  }
	
	  Hogan.template = Hogan.Template;
	
	  Hogan.makeTemplate = function(codeObj, text, options) {
	    var template = this.makePartials(codeObj);
	    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
	    return new this.template(template, text, this, options);
	  }
	
	  Hogan.makePartials = function(codeObj) {
	    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
	    for (key in template.partials) {
	      template.partials[key] = this.makePartials(template.partials[key]);
	    }
	    for (key in codeObj.subs) {
	      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
	    }
	    return template;
	  }
	
	  function esc(s) {
	    return s.replace(rSlash, '\\\\')
	            .replace(rQuot, '\\\"')
	            .replace(rNewline, '\\n')
	            .replace(rCr, '\\r')
	            .replace(rLineSep, '\\u2028')
	            .replace(rParagraphSep, '\\u2029');
	  }
	
	  function chooseMethod(s) {
	    return (~s.indexOf('.')) ? 'd' : 'f';
	  }
	
	  function createPartial(node, context) {
	    var prefix = "<" + (context.prefix || "");
	    var sym = prefix + node.n + serialNo++;
	    context.partials[sym] = {name: node.n, partials: {}};
	    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
	    return sym;
	  }
	
	  Hogan.codegen = {
	    '#': function(node, context) {
	      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
	                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
	                      't.rs(c,p,' + 'function(c,p,t){';
	      Hogan.walk(node.nodes, context);
	      context.code += '});c.pop();}';
	    },
	
	    '^': function(node, context) {
	      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
	      Hogan.walk(node.nodes, context);
	      context.code += '};';
	    },
	
	    '>': createPartial,
	    '<': function(node, context) {
	      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
	      Hogan.walk(node.nodes, ctx);
	      var template = context.partials[createPartial(node, context)];
	      template.subs = ctx.subs;
	      template.partials = ctx.partials;
	    },
	
	    '$': function(node, context) {
	      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
	      Hogan.walk(node.nodes, ctx);
	      context.subs[node.n] = ctx.code;
	      if (!context.inPartial) {
	        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
	      }
	    },
	
	    '\n': function(node, context) {
	      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
	    },
	
	    '_v': function(node, context) {
	      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
	    },
	
	    '_t': function(node, context) {
	      context.code += write('"' + esc(node.text) + '"');
	    },
	
	    '{': tripleStache,
	
	    '&': tripleStache
	  }
	
	  function tripleStache(node, context) {
	    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
	  }
	
	  function write(s) {
	    return 't.b(' + s + ');';
	  }
	
	  Hogan.walk = function(nodelist, context) {
	    var func;
	    for (var i = 0, l = nodelist.length; i < l; i++) {
	      func = Hogan.codegen[nodelist[i].tag];
	      func && func(nodelist[i], context);
	    }
	    return context;
	  }
	
	  Hogan.parse = function(tokens, text, options) {
	    options = options || {};
	    return buildTree(tokens, '', [], options.sectionTags || []);
	  }
	
	  Hogan.cache = {};
	
	  Hogan.cacheKey = function(text, options) {
	    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
	  }
	
	  Hogan.compile = function(text, options) {
	    options = options || {};
	    var key = Hogan.cacheKey(text, options);
	    var template = this.cache[key];
	
	    if (template) {
	      var partials = template.partials;
	      for (var name in partials) {
	        delete partials[name].instance;
	      }
	      return template;
	    }
	
	    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
	    return this.cache[key] = template;
	  }
	})( true ? exports : Hogan);


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */
	
	var Hogan = {};
	
	(function (Hogan) {
	  Hogan.Template = function (codeObj, text, compiler, options) {
	    codeObj = codeObj || {};
	    this.r = codeObj.code || this.r;
	    this.c = compiler;
	    this.options = options || {};
	    this.text = text || '';
	    this.partials = codeObj.partials || {};
	    this.subs = codeObj.subs || {};
	    this.buf = '';
	  }
	
	  Hogan.Template.prototype = {
	    // render: replaced by generated code.
	    r: function (context, partials, indent) { return ''; },
	
	    // variable escaping
	    v: hoganEscape,
	
	    // triple stache
	    t: coerceToString,
	
	    render: function render(context, partials, indent) {
	      return this.ri([context], partials || {}, indent);
	    },
	
	    // render internal -- a hook for overrides that catches partials too
	    ri: function (context, partials, indent) {
	      return this.r(context, partials, indent);
	    },
	
	    // ensurePartial
	    ep: function(symbol, partials) {
	      var partial = this.partials[symbol];
	
	      // check to see that if we've instantiated this partial before
	      var template = partials[partial.name];
	      if (partial.instance && partial.base == template) {
	        return partial.instance;
	      }
	
	      if (typeof template == 'string') {
	        if (!this.c) {
	          throw new Error("No compiler available.");
	        }
	        template = this.c.compile(template, this.options);
	      }
	
	      if (!template) {
	        return null;
	      }
	
	      // We use this to check whether the partials dictionary has changed
	      this.partials[symbol].base = template;
	
	      if (partial.subs) {
	        // Make sure we consider parent template now
	        if (!partials.stackText) partials.stackText = {};
	        for (key in partial.subs) {
	          if (!partials.stackText[key]) {
	            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
	          }
	        }
	        template = createSpecializedPartial(template, partial.subs, partial.partials,
	          this.stackSubs, this.stackPartials, partials.stackText);
	      }
	      this.partials[symbol].instance = template;
	
	      return template;
	    },
	
	    // tries to find a partial in the current scope and render it
	    rp: function(symbol, context, partials, indent) {
	      var partial = this.ep(symbol, partials);
	      if (!partial) {
	        return '';
	      }
	
	      return partial.ri(context, partials, indent);
	    },
	
	    // render a section
	    rs: function(context, partials, section) {
	      var tail = context[context.length - 1];
	
	      if (!isArray(tail)) {
	        section(context, partials, this);
	        return;
	      }
	
	      for (var i = 0; i < tail.length; i++) {
	        context.push(tail[i]);
	        section(context, partials, this);
	        context.pop();
	      }
	    },
	
	    // maybe start a section
	    s: function(val, ctx, partials, inverted, start, end, tags) {
	      var pass;
	
	      if (isArray(val) && val.length === 0) {
	        return false;
	      }
	
	      if (typeof val == 'function') {
	        val = this.ms(val, ctx, partials, inverted, start, end, tags);
	      }
	
	      pass = !!val;
	
	      if (!inverted && pass && ctx) {
	        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
	      }
	
	      return pass;
	    },
	
	    // find values with dotted names
	    d: function(key, ctx, partials, returnFound) {
	      var found,
	          names = key.split('.'),
	          val = this.f(names[0], ctx, partials, returnFound),
	          doModelGet = this.options.modelGet,
	          cx = null;
	
	      if (key === '.' && isArray(ctx[ctx.length - 2])) {
	        val = ctx[ctx.length - 1];
	      } else {
	        for (var i = 1; i < names.length; i++) {
	          found = findInScope(names[i], val, doModelGet);
	          if (found !== undefined) {
	            cx = val;
	            val = found;
	          } else {
	            val = '';
	          }
	        }
	      }
	
	      if (returnFound && !val) {
	        return false;
	      }
	
	      if (!returnFound && typeof val == 'function') {
	        ctx.push(cx);
	        val = this.mv(val, ctx, partials);
	        ctx.pop();
	      }
	
	      return val;
	    },
	
	    // find values with normal names
	    f: function(key, ctx, partials, returnFound) {
	      var val = false,
	          v = null,
	          found = false,
	          doModelGet = this.options.modelGet;
	
	      for (var i = ctx.length - 1; i >= 0; i--) {
	        v = ctx[i];
	        val = findInScope(key, v, doModelGet);
	        if (val !== undefined) {
	          found = true;
	          break;
	        }
	      }
	
	      if (!found) {
	        return (returnFound) ? false : "";
	      }
	
	      if (!returnFound && typeof val == 'function') {
	        val = this.mv(val, ctx, partials);
	      }
	
	      return val;
	    },
	
	    // higher order templates
	    ls: function(func, cx, partials, text, tags) {
	      var oldTags = this.options.delimiters;
	
	      this.options.delimiters = tags;
	      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
	      this.options.delimiters = oldTags;
	
	      return false;
	    },
	
	    // compile text
	    ct: function(text, cx, partials) {
	      if (this.options.disableLambda) {
	        throw new Error('Lambda features disabled.');
	      }
	      return this.c.compile(text, this.options).render(cx, partials);
	    },
	
	    // template result buffering
	    b: function(s) { this.buf += s; },
	
	    fl: function() { var r = this.buf; this.buf = ''; return r; },
	
	    // method replace section
	    ms: function(func, ctx, partials, inverted, start, end, tags) {
	      var textSource,
	          cx = ctx[ctx.length - 1],
	          result = func.call(cx);
	
	      if (typeof result == 'function') {
	        if (inverted) {
	          return true;
	        } else {
	          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
	          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
	        }
	      }
	
	      return result;
	    },
	
	    // method replace variable
	    mv: function(func, ctx, partials) {
	      var cx = ctx[ctx.length - 1];
	      var result = func.call(cx);
	
	      if (typeof result == 'function') {
	        return this.ct(coerceToString(result.call(cx)), cx, partials);
	      }
	
	      return result;
	    },
	
	    sub: function(name, context, partials, indent) {
	      var f = this.subs[name];
	      if (f) {
	        this.activeSub = name;
	        f(context, partials, this, indent);
	        this.activeSub = false;
	      }
	    }
	
	  };
	
	  //Find a key in an object
	  function findInScope(key, scope, doModelGet) {
	    var val;
	
	    if (scope && typeof scope == 'object') {
	
	      if (scope[key] !== undefined) {
	        val = scope[key];
	
	      // try lookup with get for backbone or similar model data
	      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
	        val = scope.get(key);
	      }
	    }
	
	    return val;
	  }
	
	  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
	    function PartialTemplate() {};
	    PartialTemplate.prototype = instance;
	    function Substitutions() {};
	    Substitutions.prototype = instance.subs;
	    var key;
	    var partial = new PartialTemplate();
	    partial.subs = new Substitutions();
	    partial.subsText = {};  //hehe. substext.
	    partial.buf = '';
	
	    stackSubs = stackSubs || {};
	    partial.stackSubs = stackSubs;
	    partial.subsText = stackText;
	    for (key in subs) {
	      if (!stackSubs[key]) stackSubs[key] = subs[key];
	    }
	    for (key in stackSubs) {
	      partial.subs[key] = stackSubs[key];
	    }
	
	    stackPartials = stackPartials || {};
	    partial.stackPartials = stackPartials;
	    for (key in partials) {
	      if (!stackPartials[key]) stackPartials[key] = partials[key];
	    }
	    for (key in stackPartials) {
	      partial.partials[key] = stackPartials[key];
	    }
	
	    return partial;
	  }
	
	  var rAmp = /&/g,
	      rLt = /</g,
	      rGt = />/g,
	      rApos = /\'/g,
	      rQuot = /\"/g,
	      hChars = /[&<>\"\']/;
	
	  function coerceToString(val) {
	    return String((val === null || val === undefined) ? '' : val);
	  }
	
	  function hoganEscape(str) {
	    str = coerceToString(str);
	    return hChars.test(str) ?
	      str
	        .replace(rAmp, '&amp;')
	        .replace(rLt, '&lt;')
	        .replace(rGt, '&gt;')
	        .replace(rApos, '&#39;')
	        .replace(rQuot, '&quot;') :
	      str;
	  }
	
	  var isArray = Array.isArray || function(a) {
	    return Object.prototype.toString.call(a) === '[object Array]';
	  };
	
	})( true ? exports : Hogan);


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(43);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bookingjs-avatar\">");t.b("\n" + i);t.b("  <img src=\"");t.b(t.t(t.f("image",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"bookingjs-avatar\">\n  <img src=\"{{& image }}\" />\n</div>\n", H);return T; }();

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(43);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bookingjs-displayname\">");t.b("\n" + i);t.b("  <span>");t.b(t.v(t.f("name",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"bookingjs-displayname\">\n  <span>{{ name }}</span>\n</div>\n", H);return T; }();

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(43);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("\n" + i);t.b("<input");t.b("\n" + i);t.b("  class=\"bookingjs-form-input input-name\"");t.b("\n" + i);t.b("  type=\"text\"");t.b("\n" + i);t.b("  name=\"name\"");t.b("\n" + i);t.b("  placeholder=\"");t.b(t.v(t.d("fields.name.placeholder",c,p,0)));t.b("\"");t.b("\n" + i);t.b("  ");if(t.s(t.d("fields.name.prefilled",c,p,1),c,p,0,154,191,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" value=\"");t.b(t.v(t.d("fields.name.prefilled",c,p,0)));t.b("\" ");});c.pop();}t.b("\n" + i);t.b("  required");t.b("\n" + i);t.b("/>");t.b("\n");t.b("\n" + i);t.b("<input");t.b("\n" + i);t.b("  class=\"bookingjs-form-input input-email\"");t.b("\n" + i);t.b("  type=\"email\"");t.b("\n" + i);t.b("  name=\"email\"");t.b("\n" + i);t.b("  placeholder=\"");t.b(t.v(t.d("fields.email.placeholder",c,p,0)));t.b("\"");t.b("\n" + i);t.b("  ");if(t.s(t.d("fields.email.prefilled",c,p,1),c,p,0,393,431,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" value=\"");t.b(t.v(t.d("fields.email.prefilled",c,p,0)));t.b("\" ");});c.pop();}t.b("\n" + i);t.b("  required");t.b("\n" + i);t.b("/>");t.b("\n");t.b("\n" + i);if(t.s(t.d("fields.phone.enabled",c,p,1),c,p,0,503,816,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <input");t.b("\n" + i);t.b("    class=\"bookingjs-form-input input-phone\"");t.b("\n" + i);t.b("    type=\"tel\"");t.b("\n" + i);t.b("    name=\"phone\"");t.b("\n" + i);t.b("    placeholder=\"");t.b(t.v(t.d("fields.phone.placeholder",c,p,0)));t.b("\"");t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.phone.prefilled",c,p,1),c,p,0,672,710,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" value=\"");t.b(t.v(t.d("fields.phone.prefilled",c,p,0)));t.b("\" ");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.phone.required",c,p,1),c,p,0,772,782,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" required ");});c.pop();}t.b("\n" + i);t.b("  />");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(t.s(t.d("fields.voip.enabled",c,p,1),c,p,0,871,1177,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <input");t.b("\n" + i);t.b("    class=\"bookingjs-form-input input-voip\"");t.b("\n" + i);t.b("    type=\"text\"");t.b("\n" + i);t.b("    name=\"voip\"");t.b("\n" + i);t.b("    placeholder=\"");t.b(t.v(t.d("fields.voip.placeholder",c,p,0)));t.b("\"");t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.voip.prefilled",c,p,1),c,p,0,1037,1074,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" value=\"");t.b(t.v(t.d("fields.voip.prefilled",c,p,0)));t.b("\" ");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.voip.required",c,p,1),c,p,0,1134,1144,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" required ");});c.pop();}t.b("\n" + i);t.b("  />");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(t.s(t.d("fields.location.enabled",c,p,1),c,p,0,1235,1573,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <input");t.b("\n" + i);t.b("    class=\"bookingjs-form-input input-location\"");t.b("\n" + i);t.b("    type=\"text\"");t.b("\n" + i);t.b("    name=\"location\"");t.b("\n" + i);t.b("    placeholder=\"");t.b(t.v(t.d("fields.location.placeholder",c,p,0)));t.b("\"");t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.location.prefilled",c,p,1),c,p,0,1417,1458,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" value=\"");t.b(t.v(t.d("fields.location.prefilled",c,p,0)));t.b("\" ");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.location.required",c,p,1),c,p,0,1526,1536,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" required ");});c.pop();}t.b("\n" + i);t.b("  />");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(t.s(t.d("fields.comment.enabled",c,p,1),c,p,0,1634,1964,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <textarea");t.b("\n" + i);t.b("    class=\"bookingjs-form-input input-comment\"");t.b("\n" + i);t.b("    rows=\"3\"");t.b("\n" + i);t.b("    name=\"comment\"");t.b("\n" + i);t.b("    placeholder=\"");t.b(t.v(t.d("fields.comment.placeholder",c,p,0)));t.b("\"");t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.comment.prefilled",c,p,1),c,p,0,1812,1852,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" value=\"");t.b(t.v(t.d("fields.comment.prefilled",c,p,0)));t.b("\" ");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.comment.required",c,p,1),c,p,0,1918,1928,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" required ");});c.pop();}t.b("\n" + i);t.b("  />");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "\n<input\n  class=\"bookingjs-form-input input-name\"\n  type=\"text\"\n  name=\"name\"\n  placeholder=\"{{ fields.name.placeholder }}\"\n  {{# fields.name.prefilled }} value=\"{{ fields.name.prefilled }}\" {{/ fields.name.prefilled }}\n  required\n/>\n\n<input\n  class=\"bookingjs-form-input input-email\"\n  type=\"email\"\n  name=\"email\"\n  placeholder=\"{{ fields.email.placeholder }}\"\n  {{# fields.email.prefilled }} value=\"{{ fields.email.prefilled }}\" {{/ fields.email.prefilled }}\n  required\n/>\n\n{{# fields.phone.enabled }}\n  <input\n    class=\"bookingjs-form-input input-phone\"\n    type=\"tel\"\n    name=\"phone\"\n    placeholder=\"{{ fields.phone.placeholder }}\"\n    {{# fields.phone.prefilled }} value=\"{{ fields.phone.prefilled }}\" {{/ fields.phone.prefilled }}\n    {{# fields.phone.required }} required {{/ fields.phone.required }}\n  />\n{{/ fields.phone.enabled }}\n\n{{# fields.voip.enabled }}\n  <input\n    class=\"bookingjs-form-input input-voip\"\n    type=\"text\"\n    name=\"voip\"\n    placeholder=\"{{ fields.voip.placeholder }}\"\n    {{# fields.voip.prefilled }} value=\"{{ fields.voip.prefilled }}\" {{/ fields.voip.prefilled }}\n    {{# fields.voip.required }} required {{/ fields.voip.required }}\n  />\n{{/ fields.voip.enabled }}\n\n{{# fields.location.enabled }}\n  <input\n    class=\"bookingjs-form-input input-location\"\n    type=\"text\"\n    name=\"location\"\n    placeholder=\"{{ fields.location.placeholder }}\"\n    {{# fields.location.prefilled }} value=\"{{ fields.location.prefilled }}\" {{/ fields.location.prefilled }}\n    {{# fields.location.required }} required {{/ fields.location.required }}\n  />\n{{/ fields.location.enabled }}\n\n{{# fields.comment.enabled }}\n  <textarea\n    class=\"bookingjs-form-input input-comment\"\n    rows=\"3\"\n    name=\"comment\"\n    placeholder=\"{{ fields.comment.placeholder }}\"\n    {{# fields.comment.prefilled }} value=\"{{ fields.comment.prefilled }}\" {{/ fields.comment.prefilled }}\n    {{# fields.comment.required }} required {{/ fields.comment.required }}\n  />\n{{/ fields.comment.enabled }}", H);return T; }();

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(43);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bookingjs-bookpage\">");t.b("\n" + i);t.b("  <a class=\"bookingjs-bookpage-close\" href=\"#\">");t.b(t.t(t.f("closeIcon",c,p,0)));t.b("</a>");t.b("\n" + i);t.b("  <h2 class=\"bookingjs-bookpage-date\">");t.b(t.v(t.f("chosenDate",c,p,0)));t.b("</h2>");t.b("\n" + i);t.b("  <h3 class=\"bookingjs-bookpage-time\">");t.b(t.v(t.f("chosenTime",c,p,0)));t.b("</h3>");t.b("\n" + i);t.b("  <form class=\"bookingjs-form\" action=\"#\">");t.b("\n" + i);t.b("    <div class=\"bookingjs-form-box\">");t.b("\n" + i);t.b("      <div class=\"bookingjs-form-success-message\">");t.b("\n" + i);t.b("        <span class=\"title\">");t.b(t.v(t.f("successMessageTitle",c,p,0)));t.b("</span><br /><br />");t.b("\n" + i);t.b("        <span>");t.b(t.v(t.f("successMessagePart1",c,p,0)));t.b("</span><br />");t.b("\n" + i);t.b("        <span class=\"booked-email\"></span><br /><br />");t.b("\n" + i);t.b("        <span>");t.b(t.v(t.f("successMessagePart2",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <div class=\"bookingjs-form-fields\">");t.b("\n" + i);t.b("        <input class=\"bookingjs-form-input hidden\" type=\"text\" name=\"start\" value=\"");t.b(t.v(t.f("start",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("        <input class=\"bookingjs-form-input hidden\" type=\"text\" name=\"end\" value=\"");t.b(t.v(t.f("end",c,p,0)));t.b("\" />");t.b("\n" + i);t.b(t.rp("<formFields0",c,p,"        "));t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <button class=\"bookingjs-form-button\" type=\"submit\">");t.b("\n" + i);t.b("      <span class=\"inactive-text\">");t.b(t.v(t.f("submitText",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("      <span class=\"loading-text\">");t.b(t.t(t.f("loadingIcon",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("      <span class=\"error-text\">");t.b(t.t(t.f("errorIcon",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("      <span class=\"success-text\">");t.b(t.t(t.f("checkmarkIcon",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("    </button>");t.b("\n" + i);t.b("  </form>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<formFields0":{name:"formFields", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"bookingjs-bookpage\">\n  <a class=\"bookingjs-bookpage-close\" href=\"#\">{{& closeIcon }}</a>\n  <h2 class=\"bookingjs-bookpage-date\">{{ chosenDate }}</h2>\n  <h3 class=\"bookingjs-bookpage-time\">{{ chosenTime }}</h3>\n  <form class=\"bookingjs-form\" action=\"#\">\n    <div class=\"bookingjs-form-box\">\n      <div class=\"bookingjs-form-success-message\">\n        <span class=\"title\">{{ successMessageTitle }}</span><br /><br />\n        <span>{{ successMessagePart1 }}</span><br />\n        <span class=\"booked-email\"></span><br /><br />\n        <span>{{ successMessagePart2 }}</span>\n      </div>\n      <div class=\"bookingjs-form-fields\">\n        <input class=\"bookingjs-form-input hidden\" type=\"text\" name=\"start\" value=\"{{ start }}\" />\n        <input class=\"bookingjs-form-input hidden\" type=\"text\" name=\"end\" value=\"{{ end }}\" />\n        {{> formFields }}\n      </div>\n    </div>\n    <button class=\"bookingjs-form-button\" type=\"submit\">\n      <span class=\"inactive-text\">{{ submitText }}</span>\n      <span class=\"loading-text\">{{& loadingIcon }}</span>\n      <span class=\"error-text\">{{& errorIcon }}</span>\n      <span class=\"success-text\">{{& checkmarkIcon }}</span>\n    </button>\n  </form>\n</div>\n", H);return T; }();

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = "<svg class=\"bookingjs-closeicon\" viewBox=\"0 0 90 90\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"><title>close-icon</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\"><g id=\"close-icon\" sketch:type=\"MSLayerGroup\" fill=\"#000000\"><path d=\"M58,45 L87.2,15.8 C90.9,12.1 90.9,6.3 87.3,2.7 C83.7,-0.9 77.8,-0.8 74.2,2.8 L45,32 L15.8,2.8 C12.1,-0.9 6.3,-0.9 2.7,2.7 C-0.9,6.3 -0.8,12.2 2.8,15.8 L32,45 L2.8,74.2 C-0.9,77.9 -0.9,83.7 2.7,87.3 C6.3,90.9 12.2,90.8 15.8,87.2 L45,58 L74.2,87.2 C77.9,90.9 83.7,90.9 87.3,87.3 C90.9,83.7 90.8,77.8 87.2,74.2 L58,45 L58,45 Z\" id=\"Shape\" sketch:type=\"MSShapeGroup\"></path></g></g></svg>"

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 38 26\" x=\"0px\" y=\"0px\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"><path fill=\"#fff\" d=\"M4.59255916,9.14153015 L4.59255916,9.14153015 L4.59255917,9.14153016 C3.61060488,8.15335155 2.0152224,8.15314806 1.03260582,9.1419932 L0.737322592,9.43914816 C-0.245558943,10.4282599 -0.245836003,12.0327396 0.736862454,13.0216671 L12.8967481,25.2586313 C13.4826504,25.8482474 14.3060779,26.1023412 15.1093609,25.9623831 L15.1946218,25.9520176 C15.7962843,25.9101633 16.3621851,25.6553951 16.7974015,25.21742 L37.2642739,4.6208133 C38.2456495,3.63321696 38.2453889,2.02851586 37.2626092,1.03950653 L36.967326,0.742351578 C35.9843771,-0.246827998 34.390543,-0.247513927 33.4085772,0.740676315 L15.4197831,18.8434968 L14.826599,19.4404409 L14.2334149,18.8434968 L4.59255916,9.14153015 Z\" id=\"Path\"></path></svg>"

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = "<svg version=\"1.1\" id=\"loader-1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 38 38\" xml:space=\"preserve\"><path fill=\"#fff\" d=\"M38,19 C38,8.50658975 29.4934102,0 19,0 C8.50658975,0 0,8.50658975 0,19 L5,19 C5,11.2680135 11.2680135,5 19,5 C26.7319865,5 33,11.2680135 33,19 L38,19 Z\" id=\"Oval-1\" sketch:type=\"MSShapeGroup\"></path></path></svg>"

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = "<svg class=\"bookingjs-closeicon\" viewBox=\"0 0 90 90\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"><title>error-icon</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\"><g id=\"error-icon\" sketch:type=\"MSLayerGroup\" fill=\"#FFFFFF\"><path d=\"M58,45 L87.2,15.8 C90.9,12.1 90.9,6.3 87.3,2.7 C83.7,-0.9 77.8,-0.8 74.2,2.8 L45,32 L15.8,2.8 C12.1,-0.9 6.3,-0.9 2.7,2.7 C-0.9,6.3 -0.8,12.2 2.8,15.8 L32,45 L2.8,74.2 C-0.9,77.9 -0.9,83.7 2.7,87.3 C6.3,90.9 12.2,90.8 15.8,87.2 L45,58 L74.2,87.2 C77.9,90.9 83.7,90.9 87.3,87.3 C90.9,83.7 90.8,77.8 87.2,74.2 L58,45 L58,45 Z\" id=\"Shape\" sketch:type=\"MSShapeGroup\"></path></g></g></svg>"

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(43);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bookingjs-poweredby\">");t.b("\n" + i);t.b("  <a href=\"http://booking.timekit.io\" target=\"_blank\">");t.b("\n" + i);t.b("    ");t.b(t.t(t.f("timekitIcon",c,p,0)));t.b("\n" + i);t.b("    <span>Powered by Timekit</span>");t.b("\n" + i);t.b("  </a>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"bookingjs-poweredby\">\n  <a href=\"http://booking.timekit.io\" target=\"_blank\">\n    {{& timekitIcon }}\n    <span>Powered by Timekit</span>\n  </a>\n</div>\n", H);return T; }();

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = "<svg class=\"bookingjs-timekiticon\" viewBox=\"0 0 495 594\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"><title>Full vector path</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\"><g id=\"Artboard-8\" sketch:type=\"MSArtboardGroup\" transform=\"translate(-979.000000, -549.000000)\" fill=\"#AEAEAE\"><g id=\"Full-vector-path\" sketch:type=\"MSLayerGroup\" transform=\"translate(979.000000, 549.000000)\"><path d=\"M32.6783606,348.314972 L81.9095347,309.666147 L178.242802,387.91348 C213.042282,416.179589 268.948833,417.207556 304.79022,390.230569 L411.868735,309.63503 L461.989416,351.164228 L294.687237,477.088734 C265.004826,499.430003 217.635083,498.547293 188.834846,475.15411 L32.6783606,348.314972 Z M19.2354438,359.039602 C-6.62593762,382.117664 -5.82713003,417.651408 21.8567615,440.137832 L188.814783,575.750588 C217.626101,599.152772 265.020127,600.031261 294.666324,577.71725 L471.933566,444.292269 C501.091173,422.346008 502.419289,385.92569 475.267328,362.197265 L304.79022,490.511467 C268.948833,517.488455 213.042282,516.460488 178.242802,488.194379 L19.2354438,359.039602 Z M95.4596929,299.028626 L198.50357,218.134257 C227.693194,195.219007 274.527519,195.836287 303.106573,219.516436 L398.57111,298.61683 L294.687237,376.807835 C265.004826,399.149104 217.635083,398.266394 188.834846,374.873211 L95.4596929,299.028626 Z\" id=\"Base-layer\" sketch:type=\"MSShapeGroup\"></path><path d=\"M45.8421644,258.72646 L32.470588,247.865309 L198.50357,117.521482 C227.708304,94.5943704 274.527519,95.223512 303.106573,118.903661 L462.199296,250.725357 L448.401633,261.110541 L292.387775,131.839944 C269.89295,113.20109 231.857075,112.695864 208.877526,130.735908 L45.8421644,258.72646 Z M32.2967277,269.367817 L19.0412272,258.600949 C-6.62061571,281.684165 -5.74436993,317.105855 21.8366979,339.50876 L188.834846,475.15411 C217.635083,498.547293 265.004826,499.430003 294.687237,477.088734 L471.912654,343.695235 C501.008799,321.795234 502.426315,285.506694 475.470948,261.763118 L461.699258,272.12874 L463.151849,273.332334 C483.387128,290.098964 482.810002,314.466035 461.809671,330.272501 L284.584254,463.666001 C261.076006,481.360119 222.242635,480.64608 199.426891,462.113841 L32.4287426,326.468491 C12.2129453,310.048076 12.2096732,285.628236 32.2967277,269.367817 Z\" id=\"Middle-layer\" sketch:type=\"MSShapeGroup\"></path><path d=\"M303.106573,18.6227621 L473.870647,160.115153 C502.470886,183.812855 501.573077,221.089616 471.912654,243.414336 L294.687237,376.807835 C265.004826,399.149104 217.635083,398.266394 188.834846,374.873211 L21.8366979,239.227861 C-6.94564818,215.84921 -6.64628574,178.293025 22.5453033,155.376233 L198.50357,17.2405832 C227.708304,-5.6865285 274.527519,-5.05738689 303.106573,18.6227621 Z M292.387775,31.5590447 C269.89295,12.9201909 231.857075,12.4149656 208.877526,30.4550095 L32.9192595,168.590659 C12.2117199,184.847067 12.006219,209.599262 32.4287426,226.187592 L199.426891,361.832942 C222.242635,380.365181 261.076006,381.07922 284.584254,363.385102 L461.809671,229.991603 C482.810002,214.185136 483.387128,189.818065 463.151849,173.051435 L292.387775,31.5590447 Z\" id=\"Top-layer\" sketch:type=\"MSShapeGroup\"></path></g></g></g></svg>"

/***/ }
/******/ ])
});
;
//# sourceMappingURL=booking.js.map