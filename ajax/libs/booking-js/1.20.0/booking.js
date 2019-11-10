(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["TimekitBooking"] = factory(require("jquery"));
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/*!
	 * Booking.js
	 * http://timekit.io
	 *
	 * Copyright 2015 Timekit, Inc.
	 * Booking.js is freely distributable under the MIT license.
	 *
	 */
	
	// External depenencies
	var $               = __webpack_require__(1);
	var interpolate     = __webpack_require__(2);
	var timekitSDK      = __webpack_require__(4);
	window.fullcalendar = __webpack_require__(31);
	var moment          = window.moment = __webpack_require__(32);
	__webpack_require__(35);
	__webpack_require__(36);
	
	// Internal dependencies
	var utils         = __webpack_require__(40);
	var defaultConfig = __webpack_require__(42);
	__webpack_require__(43);
	__webpack_require__(45);
	__webpack_require__(47);
	__webpack_require__(49);
	
	// Main library
	function TimekitBooking() {
	
	  // SDK instance
	  var timekit = timekitSDK.newInstance();
	
	  // Library config
	  var config = {};
	
	  // DOM nodes
	  var rootTarget;
	  var calendarTarget;
	  var bookingPageTarget;
	  var loadingTarget;
	  var errorTarget;
	
	  // Make sure DOM element is ready and clean it
	  var prepareDOM = function(suppliedConfig) {
	
	    var targetElement = suppliedConfig.targetEl || config.targetEl || defaultConfig.primary.targetEl;
	
	    rootTarget = $(targetElement);
	
	    if (rootTarget.length === 0) {
	      throw triggerError('No target DOM element was found (' + targetElement + ')');
	    }
	
	    rootTarget.addClass('bookingjs');
	    rootTarget.children(':not(script)').remove();
	
	  };
	
	  // Setup the Timekit SDK with correct config
	  var timekitSetupConfig = function() {
	
	    timekit.configure(config.timekitConfig);
	
	  };
	
	  // Setup the Timekit SDK with correct credentials
	  var timekitSetupUser = function() {
	
	    timekit.setUser(config.email, config.apiToken);
	
	  };
	
	  // Fetch availabile time through Timekit SDK
	  var timekitFindTime = function() {
	
	    var args = {};
	
	    // Only add email to findtime if no calendars or users are explicitly specified
	    if (!config.timekitFindTime.calendar_ids && !config.timekitFindTime.user_ids) {
	      args.emails = [config.email];
	    }
	    $.extend(args, config.timekitFindTime);
	
	    utils.doCallback('findTimeStarted', config, args);
	
	    timekit.findTime(args)
	    .then(function(response){
	
	      utils.doCallback('findTimeSuccessful', config, response);
	      hideLoadingScreen();
	
	      // Render available timeslots in FullCalendar
	      if(response.data.length > 0) renderCalendarEvents(response.data);
	
	      // Render test ribbon if enabled 
	      if (response.headers['timekit-testmode']) renderTestModeRibbon();
	
	    }).catch(function(response){
	      utils.doCallback('findTimeFailed', config, response);
	      hideLoadingScreen();
	      triggerError(['An error with Timekit FindTime occured', response]);
	    });
	
	  };
	
	  // Fetch availabile team time through Timekit SDK
	  var timekitFindTimeTeam = function() {
	
	    var requestData = {
	      url: '/findtime/team',
	      method: 'post',
	      data: config.timekitFindTimeTeam
	    }
	
	    $.each(config.timekitFindTimeTeam.users, function (index, item) {
	      $.extend(item, config.timekitFindTime);
	      // Only add email to findtime if no calendars are explicitly specified
	      if (!item.calendar_ids && !item.user_ids) {
	        item.emails = [item._email];
	      }
	    })
	
	    utils.doCallback('findTimeTeamStarted', config, requestData);
	
	    timekit.makeRequest(requestData)
	    .then(function(response){
	
	      utils.doCallback('findTimeTeamSuccessful', config, response);
	      hideLoadingScreen();
	
	      // Render available timeslots in FullCalendar
	      if(response.data.length > 0) renderCalendarEvents(response.data);
	
	      // Render test ribbon if enabled
	      if (response.headers['timekit-testmode']) renderTestModeRibbon();
	
	    }).catch(function(response){
	      utils.doCallback('findTimeTeamFailed', config, response);
	      hideLoadingScreen();
	      triggerError(['An error with Timekit FindTimeTeam occured', response]);
	    });
	
	  };
	
	  // Fetch availabile time through Timekit SDK
	  var timekitGetBookingSlots = function() {
	
	    utils.doCallback('GetBookingSlotsStarted', config);
	
	    var requestData = {
	      url: '/bookings/groups',
	      method: 'get'
	    }
	
	    // scope group booking slots by widget ID if possible
	    if (config.widgetId) requestData.params = {
	      search: 'widget.id:' + config.widgetId
	    }
	
	    timekit
	    .makeRequest(requestData)
	    .then(function(response){
	
	      var slots = response.data.map(function(item) {
	        return {
	          title: item.attributes.event_info.what,
	          start: item.attributes.event_info.start,
	          end: item.attributes.event_info.end,
	          booking: item
	        }
	      })
	
	      // Make sure to sort the slots chronologically,
	      // otherwise FullCalendar might skip rendering some of them
	      slots.sort(function(a, b) {
	        return moment(a.start).isAfter(b.start)
	      })
	
	      utils.doCallback('getBookingSlotsSuccessful', config, response);
	      hideLoadingScreen();
	
	      // Render available timeslots in FullCalendar
	      if(slots.length > 0) renderCalendarEvents(slots);
	
	      // Render test ribbon if enabled 
	      if (response.headers['timekit-testmode']) renderTestModeRibbon();
	
	    }).catch(function(response){
	      utils.doCallback('getBookingSlotsFailed', config, response);
	      hideLoadingScreen();
	      triggerError(['An error with Timekit GetBookings occured', response]);
	    });
	
	  };
	
	  // Universal functional to retrieve availability through either findtime or group booking slots
	  var getAvailability = function() {
	
	    showLoadingScreen();
	
	    calendarTarget.fullCalendar('removeEventSources');
	
	    if (config.bookingGraph === 'group_customer' || config.bookingGraph === 'group_customer_payment') {
	      // If in group bookings mode, fetch slots
	      timekitGetBookingSlots();
	    } else if (config.timekitFindTimeTeam) {
	      // If in team availability mode, call findtime team
	      timekitFindTimeTeam();
	    } else {
	      // If in normal single-participant mode, call findtime
	      timekitFindTime();
	    }
	
	  };
	
	  // Go to the first timeslot in a list of timeslots
	  var goToFirstEvent = function(firstEventStart) {
	
	    calendarTarget.fullCalendar('gotoDate', firstEventStart);
	
	    var firstEventStartHour = moment(firstEventStart).format('H');
	    scrollToTime(firstEventStartHour);
	
	  };
	
	  // Scrolls fullcalendar to the specified hour
	  var scrollToTime = function(time) {
	
	    // Only proceed for agendaWeek view
	    if (calendarTarget.fullCalendar('getView').name !== 'agendaWeek'){
	      return;
	    }
	
	    // Get height of each hour row
	    var slotDuration = calendarTarget.fullCalendar('option', 'slotDuration');
	    var slotDurationMinutes = 30;
	    if (slotDuration) slotDurationMinutes = slotDuration.slice(3, 5);
	    var hours = calendarTarget.find('.fc-slats .fc-minor');
	    var hourHeight = $(hours[0]).height() * (60 / slotDurationMinutes);
	
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
	
	    var localTzOffset = (moment().utcOffset()/60);
	    var timezoneIcon = __webpack_require__(51);
	
	    var template = __webpack_require__(52);
	
	    var timezoneHelperTarget = $(template.render({
	      timezoneIcon: timezoneIcon,
	      loadingText: config.localization.strings.timezoneHelperLoading,
	      loading: true
	    }));
	
	    rootTarget.addClass('has-timezonehelper');
	    rootTarget.append(timezoneHelperTarget);
	
	    var args = {
	      email: config.email
	    };
	
	    utils.doCallback('getUserTimezoneStarted', config, args);
	
	    timekit.getUserTimezone(args).then(function(response){
	
	      utils.doCallback('getUserTimezoneSuccessful', config, response);
	
	      var hostTzOffset = response.data.utc_offset;
	      var tzOffsetDiff = localTzOffset - hostTzOffset;
	      var tzOffsetDiffAbs = Math.abs(localTzOffset - hostTzOffset);
	      var tzDirection = (tzOffsetDiff > 0 ? 'ahead of' : 'behind');
	
	      var template = __webpack_require__(52);
	      var newTimezoneHelperTarget = $(template.render({
	        timezoneIcon: timezoneIcon,
	        timezoneDifference: (tzOffsetDiffAbs === 0 ? false : true),
	        timezoneDifferent: interpolate.sprintf(config.localization.strings.timezoneHelperDifferent, tzOffsetDiffAbs, tzDirection, config.name),
	        timezoneSame: interpolate.sprintf(config.localization.strings.timezoneHelperSame, config.name)
	      }));
	
	      timezoneHelperTarget.replaceWith(newTimezoneHelperTarget);
	
	    }).catch(function(response){
	      utils.doCallback('getUserTimezoneFailed', config, response);
	      utils.logError(['An error with Timekit getUserTimezone occured', response]);
	    });
	
	  };
	
	  // Display ribbon if in testmode
	  var renderTestModeRibbon = function() {
	
	    var template = __webpack_require__(56);
	
	    var testModeRibbonTarget = $(template.render({
	      ribbonText: 'Test Mode',
	    }));
	
	    rootTarget.append(testModeRibbonTarget);
	
	  };
	
	  // Setup and render FullCalendar
	  var initializeCalendar = function() {
	
	    var sizing = decideCalendarSize(config.fullCalendar.defaultView);
	
	    var args = {
	      height: sizing.height,
	      eventClick: clickTimeslot,
	      windowResize: function() {
	        var sizing = decideCalendarSize();
	        calendarTarget.fullCalendar('changeView', sizing.view);
	        calendarTarget.fullCalendar('option', 'height', sizing.height);
	      }
	    };
	
	    $.extend(true, args, config.fullCalendar);
	    args.defaultView = sizing.view;
	
	    calendarTarget = $('<div class="bookingjs-calendar empty-calendar">');
	    rootTarget.append(calendarTarget);
	
	    calendarTarget.fullCalendar(args);
	
	    utils.doCallback('fullCalendarInitialized', config);
	
	  };
	
	  // Clicking a timeslot
	  var clickTimeslot = function(eventData) {
	
	    if (!config.disableConfirmPage) {
	      showBookingPage(eventData)
	    } else {
	      $('.fc-event-clicked').removeClass('fc-event-clicked');
	      $(this).addClass('fc-event-clicked');
	      utils.doCallback('clickTimeslot', config, eventData);
	    }
	
	  };
	
	  // Fires when window is resized and calendar must adhere
	  var decideCalendarSize = function(currentView) {
	
	    currentView = currentView || calendarTarget.fullCalendar('getView').name
	
	    var view = config.fullCalendar.defaultView
	    var height = 430;
	
	    if (rootTarget.width() < 480) {
	      height = 390;
	      rootTarget.addClass('is-small');
	      if (config.avatar) height -= 15;
	      if (currentView === 'agendaWeek' || currentView === 'basicDay') {
	        view = 'basicDay';
	      }
	    } else {
	      rootTarget.removeClass('is-small');
	    }
	
	    if (config.bookingFields.comment.enabled) {    height += 100; }
	    if (config.bookingFields.phone.enabled) {      height += 64; }
	    if (config.bookingFields.voip.enabled) {       height += 64; }
	    if (config.bookingFields.location.enabled) {   height += 64; }
	    if (!config.localization.showTimezoneHelper) { height += 33; }
	
	    return {
	      height: height,
	      view: view
	    };
	
	  };
	
	  // Render the supplied calendar events in FullCalendar
	  var renderCalendarEvents = function(eventData) {
	
	    var firstEventStart = moment(eventData[0].start)
	    var firstEventEnd = moment(eventData[0].end)
	    var firstEventDuration = firstEventEnd.diff(firstEventStart, 'minutes')
	
	    if (firstEventDuration <= 90) {
	      calendarTarget.fullCalendar('option', 'slotDuration', '00:15:00')
	    }
	
	    calendarTarget.fullCalendar('addEventSource', {
	      events: eventData
	    });
	
	    calendarTarget.removeClass('empty-calendar');
	
	    // Go to first event if enabled
	    if (config.goToFirstEvent) goToFirstEvent(eventData[0].start);
	
	  };
	
	  // Render the avatar image
	  var renderAvatarImage = function() {
	
	    var template = __webpack_require__(57);
	    var avatarTarget = $(template.render({
	      image: config.avatar
	    }));
	
	    rootTarget.addClass('has-avatar');
	    rootTarget.append(avatarTarget);
	
	  };
	
	  // Render the avatar image
	  var renderDisplayName = function() {
	
	    var template = __webpack_require__(58);
	    var displayNameTarget = $(template.render({
	      name: config.name
	    }));
	
	    rootTarget.addClass('has-displayname');
	    rootTarget.append(displayNameTarget);
	
	  };
	
	  // Show loading spinner screen
	  var showLoadingScreen = function() {
	
	    utils.doCallback('showLoadingScreen', config);
	
	    var template = __webpack_require__(59);
	    loadingTarget = $(template.render({
	      loadingIcon: __webpack_require__(60)
	    }));
	
	    rootTarget.append(loadingTarget);
	
	  };
	
	  // Remove the booking page DOM node
	  var hideLoadingScreen = function() {
	
	    utils.doCallback('hideLoadingScreen', config);
	    loadingTarget.removeClass('show');
	
	    setTimeout(function(){
	      loadingTarget.remove();
	    }, 500);
	
	  };
	
	  // Show error and warning screen
	  var triggerError = function(message) {
	
	    // If an error already has been thrown, exit
	    if (errorTarget) return message
	
	    utils.doCallback('errorTriggered', message);
	    utils.logError(message)
	
	    // If no target DOM element exists, only do the logging
	    if (!rootTarget) return message
	
	    var messageProcessed = message
	    var contextProcessed = null
	
	    if (utils.isArray(message)) {
	      messageProcessed = message[0]
	      if (message[1].data) {
	        contextProcessed = JSON.stringify(message[1].data.errors || message[1].data.error || message[1].data)
	      } else {
	        contextProcessed = JSON.stringify(message[1])
	      }
	    }
	
	    var template = __webpack_require__(61);
	    errorTarget = $(template.render({
	      errorWarningIcon: __webpack_require__(62),
	      message: messageProcessed,
	      context: contextProcessed
	    }));
	
	    rootTarget.append(errorTarget);
	
	    return message
	
	  };
	
	  // Event handler when a timeslot is clicked in FullCalendar
	  var showBookingPage = function(eventData) {
	
	    utils.doCallback('showBookingPage', config, eventData);
	
	    var fieldsTemplate = __webpack_require__(63);
	    var template = __webpack_require__(64);
	
	    var dateFormat = config.localization.bookingDateFormat || moment.localeData().longDateFormat('LL');
	    var timeFormat = config.localization.bookingTimeFormat || moment.localeData().longDateFormat('LT');
	
	    bookingPageTarget = $(template.render({
	      chosenDate:           moment(eventData.start).format(dateFormat),
	      chosenTime:           moment(eventData.start).format(timeFormat) + ' - ' + moment(eventData.end).format(timeFormat),
	      closeIcon:            __webpack_require__(65),
	      checkmarkIcon:        __webpack_require__(66),
	      loadingIcon:          __webpack_require__(60),
	      errorIcon:            __webpack_require__(67),
	      submitText:           config.localization.strings.submitText,
	      successMessageTitle:  config.localization.strings.successMessageTitle,
	      successMessageBody:   interpolate.sprintf(config.localization.strings.successMessageBody, '<span class="booked-email"></span>'),
	      fields:               config.bookingFields
	    }, {
	      formFields: fieldsTemplate
	    }));
	
	    var form = bookingPageTarget.children('.bookingjs-form');
	
	    bookingPageTarget.children('.bookingjs-bookpage-close').click(function(e) {
	      e.preventDefault();
	      var bookingHasBeenCreated = $(form).hasClass('success');
	      if (bookingHasBeenCreated) getAvailability();
	      hideBookingPage();
	    });
	
	    if (eventData.users) {
	      utils.logDebug(['Available users for chosen timeslot:', eventData.users], config);
	    }
	
	
	    form.find('.bookingjs-form-input').on('input', function() {
	      var field = $(this).closest('.bookingjs-form-field');
	      if (this.value) field.addClass('bookingjs-form-field--dirty');
	      else field.removeClass('bookingjs-form-field--dirty');
	    });
	
	    form.submit(function(e) {
	      submitBookingForm(this, e, eventData);
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
	  var submitBookingForm = function(form, e, eventData) {
	
	    e.preventDefault();
	
	    var formElement = $(form);
	
	    if(formElement.hasClass('success')) {
	      getAvailability();
	      hideBookingPage();
	      return;
	    }
	
	    // Abort if form is submitting, have submitted or does not validate
	    if(formElement.hasClass('loading') || formElement.hasClass('error') || !e.target.checkValidity()) {
	      var submitButton = formElement.find('.bookingjs-form-button');
	      submitButton.addClass('button-shake');
	      setTimeout(function() {
	        submitButton.removeClass('button-shake');
	      }, 500);
	      return;
	    }
	
	    var formData = {};
	    $.each(formElement.serializeArray(), function(i, field) {
	      formData[field.name] = field.value;
	    });
	
	    formElement.addClass('loading');
	
	    utils.doCallback('submitBookingForm', config, formData);
	
	    // Call create event endpoint
	    timekitCreateBooking(formData, eventData).then(function(response){
	
	      formElement.find('.booked-email').html(formData.email);
	      formElement.removeClass('loading').addClass('success');
	
	    }).catch(function(response){
	
	      showBookingFailed(formElement)
	
	    });
	
	  };
	
	  var showBookingFailed = function (formElement) {
	
	    var submitButton = formElement.find('.bookingjs-form-button');
	    submitButton.addClass('button-shake');
	    setTimeout(function() {
	      submitButton.removeClass('button-shake');
	    }, 500);
	
	    formElement.removeClass('loading').addClass('error');
	    setTimeout(function() {
	      formElement.removeClass('error');
	    }, 2000);
	
	  }
	
	  // Create new booking
	  var timekitCreateBooking = function(formData, eventData) {
	
	    var args = {
	      event: {
	        start: eventData.start.format(),
	        end: eventData.end.format(),
	        what: config.name + ' x ' + formData.name,
	        where: 'TBD',
	        description: '',
	        calendar_id: config.calendar,
	        participants: [formData.email]
	      },
	      customer: {
	        name: formData.name,
	        email: formData.email,
	        timezone: moment.tz.guess()
	      }
	    };
	
	    if (config.bookingFields.location.enabled) { args.event.where = formData.location; }
	    if (config.bookingFields.comment.enabled) {
	      args.event.description += config.bookingFields.comment.placeholder + ': ' + formData.comment + '\n';
	    }
	    if (config.bookingFields.phone.enabled) {
	      args.customer.phone = formData.phone;
	      args.event.description += config.bookingFields.phone.placeholder + ': ' + formData.phone + '\n';
	    }
	    if (config.bookingFields.voip.enabled) {
	      args.customer.voip = formData.voip;
	      args.event.description += config.bookingFields.voip.placeholder + ': ' + formData.voip + '\n';
	    }
	
	    $.extend(true, args, config.timekitCreateBooking);
	
	    // Handle group booking specifics
	    if (config.bookingGraph === 'group_customer' || config.bookingGraph === 'group_customer_payment') {
	      delete args.event
	      args.related = { owner_booking_id: eventData.booking.id }
	    }
	
	    // Handle team availability specifics
	    if (eventData.users) {
	      var designatedUser = eventData.users[0]
	      var teamUser = $.grep(config.timekitFindTimeTeam.users, function(user) {
	        return designatedUser.email === user._email
	      })
	      if (teamUser.length < 1 || !teamUser[0]._calendar) {
	        throw triggerError(['Encountered an error when picking designated team user to receive booking', designatedUser, config.timekitFindTimeTeam.users]);
	      } else {
	        timekit = timekit.asUser(designatedUser.email, designatedUser.token)
	        args.event.calendar_id = teamUser[0]._calendar
	      }
	      utils.logDebug(['Creating booking for user:', designatedUser], config);
	    }
	
	    // if a remote widget (has ID) is used, pass that reference when creating booking
	    // TODO had to be disabled for team availability because not all members own the widget
	    if (!eventData.users && config.widgetId) args.widget_id = config.widgetId
	
	    utils.doCallback('createBookingStarted', config, args);
	
	    var requestHeaders = {
	      'Timekit-OutputTimestampFormat': 'Y-m-d ' + config.localization.emailTimeFormat + ' (P e)'
	    };
	
	    var request = timekit
	    .include('attributes', 'event', 'user')
	    .headers(requestHeaders)
	    .createBooking(args);
	
	    request
	    .then(function(response){
	      utils.doCallback('createBookingSuccessful', config, response);
	    }).catch(function(response){
	      utils.doCallback('createBookingFailed', config, response);
	      triggerError(['An error with Timekit CreateBooking occured', response]);
	    });
	
	    return request;
	
	  };
	
	  // Render the powered by Timekit message
	  var renderPoweredByMessage = function(pageTarget) {
	
	    var campaignName = 'widget'
	    var campaignSource = window.location.hostname.replace(/\./g, '-')
	    if (config.widgetId) { campaignName = 'embedded-widget'; }
	    if (config.widgetSlug) { campaignName = 'hosted-widget'; }
	
	    var template = __webpack_require__(68);
	    var timekitLogo = __webpack_require__(69);
	    var poweredTarget = $(template.render({
	      timekitLogo: timekitLogo,
	      campaignName: campaignName,
	      campaignSource: campaignSource
	    }));
	
	    pageTarget.append(poweredTarget);
	
	  };
	
	  // Set config defaults
	  var setConfigDefaults = function(suppliedConfig) {
	
	    return $.extend(true, {}, defaultConfig.primary, suppliedConfig);
	
	  };
	
	  var applyConfigPreset = function (config, propertyName, propertyObject) {
	
	    var presetCheck = defaultConfig.presets[propertyName][propertyObject];
	    if (presetCheck) return $.extend(true, {}, presetCheck, config);
	    return config
	
	  };
	
	  // Setup config
	  var setConfig = function(suppliedConfig) {
	
	    // Check whether a config is supplied
	    if(suppliedConfig === undefined || typeof suppliedConfig !== 'object' || $.isEmptyObject(suppliedConfig)) {
	      throw triggerError('No configuration was supplied or found. Please supply a config object upon library initialization');
	    }
	
	    // Extend the default config with supplied settings
	    var newConfig = setConfigDefaults(suppliedConfig);
	    if (suppliedConfig.app) newConfig.timekitConfig.app = suppliedConfig.app
	
	    // Apply presets
	    newConfig = applyConfigPreset(newConfig, 'timeDateFormat', newConfig.localization.timeDateFormat)
	    newConfig = applyConfigPreset(newConfig, 'bookingGraph', newConfig.bookingGraph)
	    newConfig = applyConfigPreset(newConfig, 'availabilityView', newConfig.availabilityView)
	
	    // Check for required settings
	    if (!newConfig.app && !newConfig.timekitConfig.app) {
	      throw triggerError('A required config setting ("app") was missing');
	    }
	    if (!newConfig.email) {
	      throw triggerError('A required config setting ("email") was missing');
	    }
	    if (!newConfig.apiToken) {
	      throw triggerError('A required config setting ("apiToken") was missing');
	    }
	    if (!newConfig.calendar && newConfig.bookingGraph !== 'group_customer' && newConfig.bookingGraph !== 'group_customer_payment' && !newConfig.timekitFindTimeTeam) {
	      throw triggerError('A required config setting ("calendar") was missing');
	    }
	
	    // Set new config to instance config
	    config = newConfig;
	
	    utils.logDebug(['Final config:', config], config);
	    utils.logDebug(['Version:', getVersion()], config);
	
	    return config;
	
	  };
	
	  // Get library config
	  var getConfig = function() {
	
	    return config;
	
	  };
	
	  // Get library version
	  var getVersion = function() {
	
	    return ("1.20.0");
	
	  };
	
	  // Render method
	  var render = function() {
	
	    utils.doCallback('renderStarted', config);
	
	    // Setup Timekit SDK config
	    timekitSetupConfig();
	    timekitSetupUser();
	
	    // Initialize FullCalendar
	    initializeCalendar();
	
	    // Get availability through Timekit SDK
	    getAvailability();
	
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
	
	    utils.logDebug(['Supplied config:', suppliedConfig], suppliedConfig);
	
	    try {
	
	      // Set rootTarget to the target element and clean before child nodes before continuing
	      prepareDOM(suppliedConfig || {});
	
	      // Start from local config
	      if (!suppliedConfig || (!suppliedConfig.widgetId && !suppliedConfig.widgetSlug) || suppliedConfig.disableRemoteLoad) {
	        return start(suppliedConfig)
	      }
	
	    } catch (e) {
	      return this
	    }
	
	    // Load remote config
	    loadRemoteConfig(suppliedConfig)
	    .then(function (response) {
	      // save widget ID from remote to reference it when creating bookings
	      var remoteConfig = response.data.config
	      if (response.data.id) remoteConfig.widgetId = response.data.id
	      // merge with supplied config for overwriting settings
	      var mergedConfig = $.extend(true, {}, remoteConfig, suppliedConfig);
	      utils.logDebug(['Remote config:', remoteConfig], mergedConfig);
	      start(mergedConfig)
	    })
	    .catch(function () {
	      triggerError('The widget could not be found, please double-check your widgetId/widgetSlug');
	    })
	
	    return this
	
	  };
	
	  // Load config from remote (embed or hosted)
	  var loadRemoteConfig = function(suppliedConfig) {
	
	    config = setConfigDefaults(suppliedConfig)
	    timekitSetupConfig();
	    if (suppliedConfig.widgetId) {
	      return timekit
	      .getEmbedWidget({ id: suppliedConfig.widgetId })
	    }
	    if (suppliedConfig.widgetSlug) {
	      return timekit
	      .getHostedWidget({ slug: suppliedConfig.widgetSlug })
	    } else {
	      throw triggerError('No widget configuration, widgetSlug or widgetId found');
	    }
	
	  };
	
	  var start = function(suppliedConfig) {
	
	    // Handle config and defaults
	    setConfig(suppliedConfig);
	    return render();
	
	  };
	
	  var destroy = function() {
	
	    prepareDOM({});
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
	    setConfig:    setConfig,
	    getConfig:    getConfig,
	    getVersion:   getVersion,
	    render:       render,
	    init:         init,
	    destroy:      destroy,
	    timekitCreateBooking: timekitCreateBooking,
	    fullCalendar: fullCalendar,
	    timekitSdk:   timekit
	  };
	
	}
	
	// Autoload if config is available on window, else export function
	var globalLibraryConfig = window.timekitBookingConfig
	if (window && globalLibraryConfig && globalLibraryConfig.autoload !== false) {
	  $(window).on('load', function(){
	    var instance = new TimekitBooking();
	    instance.init(globalLibraryConfig);
	    module.exports = instance;
	  });
	} else {
	  module.exports = TimekitBooking;
	}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global window, exports, define */
	
	!function() {
	    'use strict'
	
	    var re = {
	        not_string: /[^s]/,
	        not_bool: /[^t]/,
	        not_type: /[^T]/,
	        not_primitive: /[^v]/,
	        number: /[diefg]/,
	        numeric_arg: /[bcdiefguxX]/,
	        json: /[j]/,
	        not_json: /[^j]/,
	        text: /^[^\x25]+/,
	        modulo: /^\x25{2}/,
	        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
	        key: /^([a-z_][a-z_\d]*)/i,
	        key_access: /^\.([a-z_][a-z_\d]*)/i,
	        index_access: /^\[(\d+)\]/,
	        sign: /^[\+\-]/
	    }
	
	    function sprintf(key) {
	        // `arguments` is not an array, but should be fine for this call
	        return sprintf_format(sprintf_parse(key), arguments)
	    }
	
	    function vsprintf(fmt, argv) {
	        return sprintf.apply(null, [fmt].concat(argv || []))
	    }
	
	    function sprintf_format(parse_tree, argv) {
	        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, match, pad, pad_character, pad_length, is_positive, sign
	        for (i = 0; i < tree_length; i++) {
	            if (typeof parse_tree[i] === 'string') {
	                output += parse_tree[i]
	            }
	            else if (Array.isArray(parse_tree[i])) {
	                match = parse_tree[i] // convenience purposes only
	                if (match[2]) { // keyword argument
	                    arg = argv[cursor]
	                    for (k = 0; k < match[2].length; k++) {
	                        if (!arg.hasOwnProperty(match[2][k])) {
	                            throw new Error(sprintf('[sprintf] property "%s" does not exist', match[2][k]))
	                        }
	                        arg = arg[match[2][k]]
	                    }
	                }
	                else if (match[1]) { // positional argument (explicit)
	                    arg = argv[match[1]]
	                }
	                else { // positional argument (implicit)
	                    arg = argv[cursor++]
	                }
	
	                if (re.not_type.test(match[8]) && re.not_primitive.test(match[8]) && arg instanceof Function) {
	                    arg = arg()
	                }
	
	                if (re.numeric_arg.test(match[8]) && (typeof arg !== 'number' && isNaN(arg))) {
	                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
	                }
	
	                if (re.number.test(match[8])) {
	                    is_positive = arg >= 0
	                }
	
	                switch (match[8]) {
	                    case 'b':
	                        arg = parseInt(arg, 10).toString(2)
	                        break
	                    case 'c':
	                        arg = String.fromCharCode(parseInt(arg, 10))
	                        break
	                    case 'd':
	                    case 'i':
	                        arg = parseInt(arg, 10)
	                        break
	                    case 'j':
	                        arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0)
	                        break
	                    case 'e':
	                        arg = match[7] ? parseFloat(arg).toExponential(match[7]) : parseFloat(arg).toExponential()
	                        break
	                    case 'f':
	                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)
	                        break
	                    case 'g':
	                        arg = match[7] ? String(Number(arg.toPrecision(match[7]))) : parseFloat(arg)
	                        break
	                    case 'o':
	                        arg = (parseInt(arg, 10) >>> 0).toString(8)
	                        break
	                    case 's':
	                        arg = String(arg)
	                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
	                        break
	                    case 't':
	                        arg = String(!!arg)
	                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
	                        break
	                    case 'T':
	                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
	                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
	                        break
	                    case 'u':
	                        arg = parseInt(arg, 10) >>> 0
	                        break
	                    case 'v':
	                        arg = arg.valueOf()
	                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
	                        break
	                    case 'x':
	                        arg = (parseInt(arg, 10) >>> 0).toString(16)
	                        break
	                    case 'X':
	                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
	                        break
	                }
	                if (re.json.test(match[8])) {
	                    output += arg
	                }
	                else {
	                    if (re.number.test(match[8]) && (!is_positive || match[3])) {
	                        sign = is_positive ? '+' : '-'
	                        arg = arg.toString().replace(re.sign, '')
	                    }
	                    else {
	                        sign = ''
	                    }
	                    pad_character = match[4] ? match[4] === '0' ? '0' : match[4].charAt(1) : ' '
	                    pad_length = match[6] - (sign + arg).length
	                    pad = match[6] ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
	                    output += match[5] ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
	                }
	            }
	        }
	        return output
	    }
	
	    var sprintf_cache = Object.create(null)
	
	    function sprintf_parse(fmt) {
	        if (sprintf_cache[fmt]) {
	            return sprintf_cache[fmt]
	        }
	
	        var _fmt = fmt, match, parse_tree = [], arg_names = 0
	        while (_fmt) {
	            if ((match = re.text.exec(_fmt)) !== null) {
	                parse_tree.push(match[0])
	            }
	            else if ((match = re.modulo.exec(_fmt)) !== null) {
	                parse_tree.push('%')
	            }
	            else if ((match = re.placeholder.exec(_fmt)) !== null) {
	                if (match[2]) {
	                    arg_names |= 1
	                    var field_list = [], replacement_field = match[2], field_match = []
	                    if ((field_match = re.key.exec(replacement_field)) !== null) {
	                        field_list.push(field_match[1])
	                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
	                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
	                                field_list.push(field_match[1])
	                            }
	                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
	                                field_list.push(field_match[1])
	                            }
	                            else {
	                                throw new SyntaxError('[sprintf] failed to parse named argument key')
	                            }
	                        }
	                    }
	                    else {
	                        throw new SyntaxError('[sprintf] failed to parse named argument key')
	                    }
	                    match[2] = field_list
	                }
	                else {
	                    arg_names |= 2
	                }
	                if (arg_names === 3) {
	                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
	                }
	                parse_tree.push(match)
	            }
	            else {
	                throw new SyntaxError('[sprintf] unexpected placeholder')
	            }
	            _fmt = _fmt.substring(match[0].length)
	        }
	        return sprintf_cache[fmt] = parse_tree
	    }
	
	    /**
	     * export to either browser or node.js
	     */
	    /* eslint-disable quote-props */
	    if (true) {
	        exports['sprintf'] = sprintf
	        exports['vsprintf'] = vsprintf
	    }
	    if (typeof window !== 'undefined') {
	        window['sprintf'] = sprintf
	        window['vsprintf'] = vsprintf
	
	        if ("function" === 'function' && __webpack_require__(3)['amd']) {
	            !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	                return {
	                    'sprintf': sprintf,
	                    'vsprintf': vsprintf
	                }
	            }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	        }
	    }
	    /* eslint-enable quote-props */
	}()


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise) {'use strict';
	
	/*!
	 * Timekit JavaScript SDK
	 * http://timekit.io
	 *
	 * Copyright 2015 Timekit, Inc.
	 * The Timekit JavaScript SDK is freely distributable under the MIT license.
	 *
	 */
	var axios = __webpack_require__(9);
	var base64 = __webpack_require__(28);
	var humps = __webpack_require__(30);
	
	function Timekit() {
	
	  /**
	   * Auth variables for login gated API methods
	   * @type {String}
	   */
	  var userEmail;
	  var userToken;
	  var includes = [];
	  var headers = {};
	
	  /**
	   * Default config
	   * @type {Object}
	   */
	  var config = {
	    app: '',
	    apiBaseUrl: 'https://api.timekit.io/',
	    apiVersion: 'v2',
	    convertResponseToCamelcase: false,
	    convertRequestToSnakecase: true,
	    autoFlattenResponse: true
	  };
	
	  /**
	   * Generate base64 string for basic auth purposes
	   * @type {Function}
	   * @return {String}
	   */
	
	  var encodeAuthHeader = function(email, token) {
	    return base64.encode(email + ':' + token);
	  };
	
	  /**
	   * Build absolute URL for API call
	   * @type {Function}
	   * @return {String}
	   */
	  var buildUrl = function(endpoint) {
	    return config.apiBaseUrl + config.apiVersion + endpoint;
	  };
	
	  var copyResponseMetaData = function(response) {
	    if (Object.keys(response.data).length < 2) return
	    response.metaData = {}
	    Object.keys(response.data).forEach(function(key) {
	      if (key !== 'data') response.metaData[key] = response.data[key]
	    })
	  }
	
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
	    args.headers = args.headers || headers || {};
	
	    if (!args.headers['Timekit-App'] && config.app) {
	      args.headers['Timekit-App'] = config.app;
	    }
	    if (config.inputTimestampFormat) {
	      args.headers['Timekit-InputTimestampFormat'] = config.inputTimestampFormat;
	    }
	    if (config.outputTimestampFormat) {
	      args.headers['Timekit-OutputTimestampFormat'] = config.outputTimestampFormat;
	    }
	    if (config.timezone) {
	      args.headers['Timekit-Timezone'] = config.timezone;
	    }
	
	    // add auth headers if not being overwritten by request/asUser
	    if (!args.headers['Authorization'] && userEmail && userToken) {
	      args.headers['Authorization'] = 'Basic ' + encodeAuthHeader(userEmail, userToken);
	    }
	
	    // reset headers
	    if (Object.keys(headers).length > 0) {
	      headers = {};
	    }
	
	    // add dynamic includes if applicable
	    if (includes && includes.length > 0) {
	      if (args.params === undefined) { args.params = {}; }
	      args.params.include = includes.join();
	      includes = [];
	    }
	
	    // decamelize keys in data objects
	    if (args.data && config.convertRequestToSnakecase) { args.data = humps.decamelizeKeys(args.data); }
	
	    // register response interceptor for data manipulation
	    var interceptor = axios.interceptors.response.use(function (response) {
	      if (response.data && response.data.data) {
	        if (config.autoFlattenResponse) {
	          copyResponseMetaData(response)
	          response.data = response.data.data;
	        }
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
	   * Set the active user manually (happens automatically on timekit.auth())
	   * @type {Function}
	   */
	  TK.setUser = function(email, apiToken) {
	    userEmail = email;
	    userToken = apiToken;
	  };
	
	  /**
	   * Returns the current active user
	   * @type {Function}
	   * @return {Object}
	   */
	  TK.getUser = function() {
	    return {
	      email: userEmail,
	      apiToken: userToken
	    };
	  };
	
	  /**
	   * Set the active user temporarily for the next request (fluent/chainable return)
	   * @type {Function}
	   */
	  TK.asUser = function(email, apiToken) {
	    headers['Authorization'] = 'Basic ' + encodeAuthHeader(email, apiToken);
	    return this;
	  };
	
	  /**
	  * Set the timekit app slug temporarily for the next request (fluent/chainable return)
	  * @type {Function}
	  */
	  TK.asApp = function(slug) {
	    headers['Timekit-App'] = slug;
	    return this;
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
	   * Add supplied headers to the next request (fluent/chainable return)
	   * @type {Function}
	   * @return {Object}
	   */
	  TK.headers = function(data) {
	    for (var attr in data) { headers[attr] = data[attr]; }
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
	
	    var app = config.app;
	
	    // If app header exists (using .asApp() function), use that
	    if (headers['Timekit-App']) {
	      app = headers['Timekit-App'];
	      delete headers['Timekit-App'];
	    }
	
	    var url = buildUrl('/accounts/google/signup') + '?Timekit-App=' + app + (data && data.callback ? '&callback=' + data.callback : '');
	
	    if(shouldAutoRedirect && window) {
	      window.location.href = url;
	    } else {
	      return url;
	    }
	
	  };
	
	  /**
	   * Initiate an account sync
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.accountSync = function(data) {
	
	    return TK.makeRequest({
	      url: '/accounts/sync',
	      method: 'get',
	      params: data
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
	   * Update a calendar for current user
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.updateCalendar = function(data) {
	
	    var id = data.id;
	    delete data.id;
	
	    return TK.makeRequest({
	      url: '/calendars/' + id,
	      method: 'put',
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
	   * Update an existing event
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.updateEvent = function(data) {
	
	    var id = data.id;
	    delete data.id;
	
	    return TK.makeRequest({
	      url: '/events/' + id,
	      method: 'put',
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
	   * Find bulk availability across multiple users/calendars
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
	   * Find team availability across multiple users/calendars
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.findTimeTeam = function(data) {
	
	    return TK.makeRequest({
	      url: '/findtime/team',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Create a findtime filtercollection
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.createFindTimeFilterCollection = function(data) {
	
	    return TK.makeRequest({
	      url: '/findtime/filtercollections',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Get findtime filtercollections
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getFindTimeFilterCollections = function() {
	
	    return TK.makeRequest({
	      url: '/findtime/filtercollections',
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Update a findtime filtercollections
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.updateFindTimeFilterCollection = function(data) {
	
	    var id = data.id;
	    delete data.id;
	
	    return TK.makeRequest({
	      url: '/findtime/filtercollections/' + id,
	      method: 'get',
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
	
	  /**
	   * Get all bookings
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getBookings = function() {
	
	    return TK.makeRequest({
	      url: '/bookings',
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Get specific booking
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getBooking = function(data) {
	
	    return TK.makeRequest({
	      url: '/bookings/' + data.id,
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Create a new booking
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.createBooking = function(data) {
	
	    return TK.makeRequest({
	      url: '/bookings',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Update an existing booking
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.updateBooking = function(data) {
	
	    var id = data.id;
	    delete data.id;
	
	    var action = data.action;
	    delete data.action;
	
	    return TK.makeRequest({
	      url: '/bookings/' + id + '/' + action,
	      method: 'put',
	      data: data
	    });
	
	  };
	
	  /**
	   * Get all bookings
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getGroupBookings = function() {
	
	    return TK.makeRequest({
	      url: '/bookings/groups',
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Get specific booking
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getGroupBooking = function(data) {
	
	    return TK.makeRequest({
	      url: '/bookings/' + data.id + '/groups',
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Get widgets
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getWidgets = function() {
	
	    return TK.makeRequest({
	      url: '/widgets',
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Get a specific widget
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getWidget = function(data) {
	
	    return TK.makeRequest({
	      url: '/widgets/' + data.id,
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Get public widget by slug
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getHostedWidget = function(data) {
	
	    return TK.makeRequest({
	      url: '/widgets/hosted/' + data.slug,
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Get public widget by slug
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.getEmbedWidget = function(data) {
	
	    return TK.makeRequest({
	      url: '/widgets/embed/' + data.id,
	      method: 'get'
	    });
	
	  };
	
	  /**
	   * Create a new widget
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.createWidget = function(data) {
	
	    return TK.makeRequest({
	      url: '/widgets',
	      method: 'post',
	      data: data
	    });
	
	  };
	
	  /**
	   * Update an existing widget
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.updateWidget = function(data) {
	
	    var id = data.id;
	    delete data.id;
	
	    return TK.makeRequest({
	      url: '/widgets/' + id,
	      method: 'put',
	      data: data
	    });
	
	  };
	
	  /**
	   * Delete a widget
	   * @type {Function}
	   * @return {Promise}
	   */
	  TK.deleteWidget = function(data) {
	
	    return TK.makeRequest({
	      url: '/widgets/' + data.id,
	      method: 'delete'
	    });
	
	  };
	
	  /**
	   * Return a new instance of the SDK
	   * @type {Function}
	   * @return {Object}
	   */
	  TK.newInstance = function() {
	    return new Timekit();
	  }
	
	  return TK;
	
	}
	
	module.exports = new Timekit();
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6).Promise;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, Promise, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   3.3.1
	 */
	
	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';
	
	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}
	
	function isFunction(x) {
	  return typeof x === 'function';
	}
	
	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}
	
	var isArray = _isArray;
	
	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;
	
	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};
	
	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}
	
	function setAsap(asapFn) {
	  asap = asapFn;
	}
	
	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';
	
	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
	
	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}
	
	// vertx
	function useVertxTimer() {
	  return function () {
	    vertxNext(flush);
	  };
	}
	
	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });
	
	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}
	
	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}
	
	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}
	
	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];
	
	    callback(arg);
	
	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }
	
	  len = 0;
	}
	
	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(8);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}
	
	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}
	
	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;
	
	  var parent = this;
	
	  var child = new this.constructor(noop);
	
	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }
	
	  var _state = parent._state;
	
	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }
	
	  return child;
	}
	
	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.resolve(1);
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }
	
	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}
	
	var PROMISE_ID = Math.random().toString(36).substring(16);
	
	function noop() {}
	
	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	
	var GET_THEN_ERROR = new ErrorObject();
	
	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}
	
	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}
	
	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}
	
	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}
	
	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	
	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}
	
	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}
	
	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}
	
	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}
	
	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }
	
	  publish(promise);
	}
	
	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	
	  promise._result = value;
	  promise._state = FULFILLED;
	
	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}
	
	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;
	
	  asap(publishRejection, promise);
	}
	
	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;
	
	  parent._onerror = null;
	
	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;
	
	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}
	
	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;
	
	  if (subscribers.length === 0) {
	    return;
	  }
	
	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;
	
	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];
	
	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }
	
	  promise._subscribers.length = 0;
	}
	
	function ErrorObject() {
	  this.error = null;
	}
	
	var TRY_CATCH_ERROR = new ErrorObject();
	
	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}
	
	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;
	
	  if (hasCallback) {
	    value = tryCatch(callback, detail);
	
	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value = null;
	    } else {
	      succeeded = true;
	    }
	
	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }
	
	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}
	
	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}
	
	var id = 0;
	function nextId() {
	  return id++;
	}
	
	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}
	
	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);
	
	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }
	
	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;
	
	    this._result = new Array(this.length);
	
	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}
	
	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};
	
	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;
	
	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};
	
	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;
	
	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);
	
	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};
	
	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;
	
	  if (promise._state === PENDING) {
	    this._remaining--;
	
	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }
	
	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};
	
	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;
	
	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};
	
	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```
	
	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```
	
	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}
	
	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.
	
	  Example:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```
	
	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```
	
	  An example real-world use case is implementing timeouts:
	
	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```
	
	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}
	
	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}
	
	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}
	
	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}
	
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
	  let promise = new Promise(function(resolve, reject) {
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
	      let xhr = new XMLHttpRequest();
	
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
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];
	
	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}
	
	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;
	
	Promise.prototype = {
	  constructor: Promise,
	
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
	    let result;
	  
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
	    let author, books;
	  
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
	  then: then,
	
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
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};
	
	function polyfill() {
	    var local = undefined;
	
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
	
	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }
	
	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }
	
	    local.Promise = Promise;
	}
	
	polyfill();
	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;
	
	return Promise;
	
	})));
	//# sourceMappingURL=es6-promise.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(5), (function() { return this; }())))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
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
	    var timeout = runTimeout(cleanUpNextTick);
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
	    runClearTimeout(timeout);
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
	        runTimeout(drainQueue);
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
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise) {'use strict';
	
	var defaults = __webpack_require__(11);
	var utils = __webpack_require__(12);
	var dispatchRequest = __webpack_require__(14);
	var InterceptorManager = __webpack_require__(23);
	var isAbsoluteURL = __webpack_require__(24);
	var combineURLs = __webpack_require__(25);
	var bind = __webpack_require__(26);
	var transformData = __webpack_require__(18);
	
	function Axios(defaultConfig) {
	  this.defaults = utils.merge({}, defaultConfig);
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}
	
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }
	
	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
	
	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }
	
	  // Don't allow overriding defaults.withCredentials
	  config.withCredentials = config.withCredentials || this.defaults.withCredentials;
	
	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );
	
	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	var defaultInstance = new Axios(defaults);
	var axios = module.exports = bind(Axios.prototype.request, defaultInstance);
	axios.request = bind(Axios.prototype.request, defaultInstance);
	
	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;
	
	// Expose properties from defaultInstance
	axios.defaults = defaultInstance.defaults;
	axios.interceptors = defaultInstance.interceptors;
	
	// Factory for creating new instances
	axios.create = function create(defaultConfig) {
	  return new Axios(defaultConfig);
	};
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(27);
	
	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	var normalizeHeaderName = __webpack_require__(13);
	
	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}
	
	module.exports = {
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
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
	
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',
	
	  maxContentLength: -1,
	
	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

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
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
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
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}
	
	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}
	
	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
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
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
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
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
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
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
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
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  trim: trim
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise, process) {'use strict';
	
	/**
	 * Dispatch a request to the server using whichever adapter
	 * is supported by the current environment.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  return new Promise(function executor(resolve, reject) {
	    try {
	      var adapter;
	
	      if (typeof config.adapter === 'function') {
	        // For custom adapter support
	        adapter = config.adapter;
	      } else if (typeof XMLHttpRequest !== 'undefined') {
	        // For browsers use XHR adapter
	        adapter = __webpack_require__(15);
	      } else if (typeof process !== 'undefined') {
	        // For node use HTTP adapter
	        adapter = __webpack_require__(15);
	      }
	
	      if (typeof adapter === 'function') {
	        adapter(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	};
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(7)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(12);
	var buildURL = __webpack_require__(16);
	var parseHeaders = __webpack_require__(17);
	var transformData = __webpack_require__(18);
	var isURLSameOrigin = __webpack_require__(19);
	var btoa = (typeof window !== 'undefined' && window.btoa) || __webpack_require__(20);
	var settle = __webpack_require__(21);
	
	module.exports = function xhrAdapter(resolve, reject, config) {
	  var requestData = config.data;
	  var requestHeaders = config.headers;
	
	  if (utils.isFormData(requestData)) {
	    delete requestHeaders['Content-Type']; // Let the browser set it
	  }
	
	  var request = new XMLHttpRequest();
	  var loadEvent = 'onreadystatechange';
	  var xDomain = false;
	
	  // For IE 8/9 CORS support
	  // Only supports POST and GET calls and doesn't returns the response headers.
	  // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	  if (process.env.NODE_ENV !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
	    request = new window.XDomainRequest();
	    loadEvent = 'onload';
	    xDomain = true;
	    request.onprogress = function handleProgress() {};
	    request.ontimeout = function handleTimeout() {};
	  }
	
	  // HTTP basic authentication
	  if (config.auth) {
	    var username = config.auth.username || '';
	    var password = config.auth.password || '';
	    requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	  }
	
	  request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
	
	  // Set the request timeout in MS
	  request.timeout = config.timeout;
	
	  // Listen for ready state
	  request[loadEvent] = function handleLoad() {
	    if (!request || (request.readyState !== 4 && !xDomain)) {
	      return;
	    }
	
	    // The request errored out and we didn't get a response, this will be
	    // handled by onerror instead
	    if (request.status === 0) {
	      return;
	    }
	
	    // Prepare the response
	    var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	    var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	    var response = {
	      data: transformData(
	        responseData,
	        responseHeaders,
	        config.transformResponse
	      ),
	      // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	      status: request.status === 1223 ? 204 : request.status,
	      statusText: request.status === 1223 ? 'No Content' : request.statusText,
	      headers: responseHeaders,
	      config: config,
	      request: request
	    };
	
	    settle(resolve, reject, response);
	
	    // Clean up request
	    request = null;
	  };
	
	  // Handle low level network errors
	  request.onerror = function handleError() {
	    // Real errors are hidden from us by the browser
	    // onerror should only fire if it's a network error
	    reject(new Error('Network Error'));
	
	    // Clean up request
	    request = null;
	  };
	
	  // Handle timeout
	  request.ontimeout = function handleTimeout() {
	    var err = new Error('timeout of ' + config.timeout + 'ms exceeded');
	    err.timeout = config.timeout;
	    err.code = 'ECONNABORTED';
	    reject(err);
	
	    // Clean up request
	    request = null;
	  };
	
	  // Add xsrf header
	  // This is only done if running in a standard browser environment.
	  // Specifically not if we're in a web worker, or react-native.
	  if (utils.isStandardBrowserEnv()) {
	    var cookies = __webpack_require__(22);
	
	    // Add xsrf header
	    var xsrfValue = config.withCredentials || isURLSameOrigin(config.url) ?
	        cookies.read(config.xsrfCookieName) :
	        undefined;
	
	    if (xsrfValue) {
	      requestHeaders[config.xsrfHeaderName] = xsrfValue;
	    }
	  }
	
	  // Add headers to the request
	  if ('setRequestHeader' in request) {
	    utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	      if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	        // Remove Content-Type if data is undefined
	        delete requestHeaders[key];
	      } else {
	        // Otherwise add header to the request
	        request.setRequestHeader(key, val);
	      }
	    });
	  }
	
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
	
	  // Handle progress if needed
	  if (config.progress) {
	    if (config.method === 'post' || config.method === 'put') {
	      request.upload.addEventListener('progress', config.progress);
	    } else if (config.method === 'get') {
	      request.addEventListener('progress', config.progress);
	    }
	  }
	
	  if (requestData === undefined) {
	    requestData = null;
	  }
	
	  // Send the request
	  request.send(requestData);
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }
	
	      if (!utils.isArray(val)) {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
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
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) { return parsed; }
	
	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });
	
	  return parsed;
	};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;
	
	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
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
	
	    originURL = resolveURL(window.location.href);
	
	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :
	
	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';
	
	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';
	
	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}
	
	module.exports = btoa;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(response);
	  }
	};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
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
	  })() :
	
	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
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
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
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
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

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
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)(module), (function() { return this; }())))

/***/ }),
/* 29 */
/***/ (function(module, exports) {

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


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * FullCalendar v3.5.1
	 * Docs & License: https://fullcalendar.io/
	 * (c) 2017 Adam Shaw
	 */
	
	(function(factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(1), __webpack_require__(32) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}
		else if (typeof exports === 'object') { // Node/CommonJS
			module.exports = factory(require('jquery'), require('moment'));
		}
		else {
			factory(jQuery, moment);
		}
	})(function($, moment) {
	
	;;
	
	var FC = $.fullCalendar = {
		version: "3.5.1",
		// When introducing internal API incompatibilities (where fullcalendar plugins would break),
		// the minor version of the calendar should be upped (ex: 2.7.2 -> 2.8.0)
		// and the below integer should be incremented.
		internalApiVersion: 10
	};
	var fcViews = FC.views = {};
	
	
	$.fn.fullCalendar = function(options) {
		var args = Array.prototype.slice.call(arguments, 1); // for a possible method call
		var res = this; // what this function will return (this jQuery object by default)
	
		this.each(function(i, _element) { // loop each DOM element involved
			var element = $(_element);
			var calendar = element.data('fullCalendar'); // get the existing calendar object (if any)
			var singleRes; // the returned value of this single method call
	
			// a method call
			if (typeof options === 'string') {
	
				if (options === 'getCalendar') {
					if (!i) { // first element only
						res = calendar;
					}
				}
				else if (options === 'destroy') { // don't warn if no calendar object
					if (calendar) {
						calendar.destroy();
						element.removeData('fullCalendar');
					}
				}
				else if (!calendar) {
					FC.warn("Attempting to call a FullCalendar method on an element with no calendar.");
				}
				else if ($.isFunction(calendar[options])) {
					singleRes = calendar[options].apply(calendar, args);
	
					if (!i) {
						res = singleRes; // record the first method call result
					}
					if (options === 'destroy') { // for the destroy method, must remove Calendar object data
						element.removeData('fullCalendar');
					}
				}
				else {
					FC.warn("'" + options + "' is an unknown FullCalendar method.");
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
		'footer',
		'buttonText',
		'buttonIcons',
		'themeButtonIcons'
	];
	
	
	// Merges an array of option objects into a single object
	function mergeOptions(optionObjs) {
		return mergeProps(optionObjs, complexOptions);
	}
	
	;;
	
	// exports
	FC.applyAll = applyAll;
	FC.debounce = debounce;
	FC.isInt = isInt;
	FC.htmlEscape = htmlEscape;
	FC.cssToStr = cssToStr;
	FC.proxy = proxy;
	FC.capitaliseFirstLetter = capitaliseFirstLetter;
	
	
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
	
	
	// Given one element that resides inside another,
	// Subtracts the height of the inner element from the outer element.
	function subtractInnerElHeight(outerEl, innerEl) {
		var both = outerEl.add(innerEl);
		var diff;
	
		// effin' IE8/9/10/11 sometimes returns 0 for dimensions. this weird hack was the only thing that worked
		both.css({
			position: 'relative', // cause a reflow, which will force fresh dimension recalculation
			left: -1 // ensure reflow in case the el was already relative. negative is less likely to cause new scroll
		});
		diff = outerEl.outerHeight() - innerEl.outerHeight(); // grab the dimensions
		both.css({ position: '', left: '' }); // undo hack
	
		return diff;
	}
	
	
	/* Element Geom Utilities
	----------------------------------------------------------------------------------------------------------------------*/
	
	FC.getOuterRect = getOuterRect;
	FC.getClientRect = getClientRect;
	FC.getContentRect = getContentRect;
	FC.getScrollbarWidths = getScrollbarWidths;
	
	
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
	// Origin is optional.
	function getOuterRect(el, origin) {
		var offset = el.offset();
		var left = offset.left - (origin ? origin.left : 0);
		var top = offset.top - (origin ? origin.top : 0);
	
		return {
			left: left,
			right: left + el.outerWidth(),
			top: top,
			bottom: top + el.outerHeight()
		};
	}
	
	
	// Queries the area within the margin/border/scrollbars of a jQuery element. Does not go within the padding.
	// Returns a rectangle with absolute coordinates: left, right (exclusive), top, bottom (exclusive).
	// Origin is optional.
	// WARNING: given element can't have borders
	// NOTE: should use clientLeft/clientTop, but very unreliable cross-browser.
	function getClientRect(el, origin) {
		var offset = el.offset();
		var scrollbarWidths = getScrollbarWidths(el);
		var left = offset.left + getCssFloat(el, 'border-left-width') + scrollbarWidths.left - (origin ? origin.left : 0);
		var top = offset.top + getCssFloat(el, 'border-top-width') + scrollbarWidths.top - (origin ? origin.top : 0);
	
		return {
			left: left,
			right: left + el[0].clientWidth, // clientWidth includes padding but NOT scrollbars
			top: top,
			bottom: top + el[0].clientHeight // clientHeight includes padding but NOT scrollbars
		};
	}
	
	
	// Queries the area within the margin/border/padding of a jQuery element. Assumed not to have scrollbars.
	// Returns a rectangle with absolute coordinates: left, right (exclusive), top, bottom (exclusive).
	// Origin is optional.
	function getContentRect(el, origin) {
		var offset = el.offset(); // just outside of border, margin not included
		var left = offset.left + getCssFloat(el, 'border-left-width') + getCssFloat(el, 'padding-left') -
			(origin ? origin.left : 0);
		var top = offset.top + getCssFloat(el, 'border-top-width') + getCssFloat(el, 'padding-top') -
			(origin ? origin.top : 0);
	
		return {
			left: left,
			right: left + el.width(),
			top: top,
			bottom: top + el.height()
		};
	}
	
	
	// Returns the computed left/right/top/bottom scrollbar widths for the given jQuery element.
	// WARNING: given element can't have borders (which will cause offsetWidth/offsetHeight to be larger).
	// NOTE: should use clientLeft/clientTop, but very unreliable cross-browser.
	function getScrollbarWidths(el) {
		var leftRightWidth = el[0].offsetWidth - el[0].clientWidth;
		var bottomWidth = el[0].offsetHeight - el[0].clientHeight;
		var widths;
	
		leftRightWidth = sanitizeScrollbarWidth(leftRightWidth);
		bottomWidth = sanitizeScrollbarWidth(bottomWidth);
	
		widths = { left: 0, right: 0, top: 0, bottom: bottomWidth };
	
		if (getIsLeftRtlScrollbars() && el.css('direction') == 'rtl') { // is the scrollbar on the left side?
			widths.left = leftRightWidth;
		}
		else {
			widths.right = leftRightWidth;
		}
	
		return widths;
	}
	
	
	// The scrollbar width computations in getScrollbarWidths are sometimes flawed when it comes to
	// retina displays, rounding, and IE11. Massage them into a usable value.
	function sanitizeScrollbarWidth(width) {
		width = Math.max(0, width); // no negatives
		width = Math.round(width);
		return width;
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
	
	
	/* Mouse / Touch Utilities
	----------------------------------------------------------------------------------------------------------------------*/
	
	FC.preventDefault = preventDefault;
	
	
	// Returns a boolean whether this was a left mouse click and no ctrl key (which means right click on Mac)
	function isPrimaryMouseButton(ev) {
		return ev.which == 1 && !ev.ctrlKey;
	}
	
	
	function getEvX(ev) {
		var touches = ev.originalEvent.touches;
	
		// on mobile FF, pageX for touch events is present, but incorrect,
		// so, look at touch coordinates first.
		if (touches && touches.length) {
			return touches[0].pageX;
		}
	
		return ev.pageX;
	}
	
	
	function getEvY(ev) {
		var touches = ev.originalEvent.touches;
	
		// on mobile FF, pageX for touch events is present, but incorrect,
		// so, look at touch coordinates first.
		if (touches && touches.length) {
			return touches[0].pageY;
		}
	
		return ev.pageY;
	}
	
	
	function getEvIsTouch(ev) {
		return /^touch/.test(ev.type);
	}
	
	
	function preventSelection(el) {
		el.addClass('fc-unselectable')
			.on('selectstart', preventDefault);
	}
	
	
	function allowSelection(el) {
		el.removeClass('fc-unselectable')
			.off('selectstart', preventDefault);
	}
	
	
	// Stops a mouse/touch event from doing it's native browser action
	function preventDefault(ev) {
		ev.preventDefault();
	}
	
	
	/* General Geometry Utils
	----------------------------------------------------------------------------------------------------------------------*/
	
	FC.intersectRects = intersectRects;
	
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
	
	FC.parseFieldSpecs = parseFieldSpecs;
	FC.compareByFieldSpecs = compareByFieldSpecs;
	FC.compareByFieldSpec = compareByFieldSpec;
	FC.flexibleCompare = flexibleCompare;
	
	
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
	
	
	/* Date Utilities
	----------------------------------------------------------------------------------------------------------------------*/
	
	FC.computeGreatestUnit = computeGreatestUnit;
	FC.divideRangeByDuration = divideRangeByDuration;
	FC.divideDurationByDuration = divideDurationByDuration;
	FC.multiplyDuration = multiplyDuration;
	FC.durationHasTime = durationHasTime;
	
	var dayIDs = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];
	var unitsDesc = [ 'year', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond' ]; // descending
	
	
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
	function computeGreatestUnit(start, end) {
		var i, unit;
		var val;
	
		for (i = 0; i < unitsDesc.length; i++) {
			unit = unitsDesc[i];
			val = computeRangeAs(unit, start, end);
	
			if (val >= 1 && isInt(val)) {
				break;
			}
		}
	
		return unit; // will be "milliseconds" if nothing else matches
	}
	
	
	// like computeGreatestUnit, but has special abilities to interpret the source input for clues
	function computeDurationGreatestUnit(duration, durationInput) {
		var unit = computeGreatestUnit(duration);
	
		// prevent days:7 from being interpreted as a week
		if (unit === 'week' && typeof durationInput === 'object' && durationInput.days) {
			unit = 'day';
		}
	
		return unit;
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
		return typeof str === 'string' &&
			/^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(str);
	}
	
	
	/* Logging and Debug
	----------------------------------------------------------------------------------------------------------------------*/
	
	FC.log = function() {
		var console = window.console;
	
		if (console && console.log) {
			return console.log.apply(console, arguments);
		}
	};
	
	FC.warn = function() {
		var console = window.console;
	
		if (console && console.warn) {
			return console.warn.apply(console, arguments);
		}
		else {
			return FC.log.apply(FC, arguments);
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
	
	
	function copyOwnProps(src, dest) {
		for (var name in src) {
			if (hasOwnProp(src, name)) {
				dest[name] = src[name];
			}
		}
	}
	
	
	function hasOwnProp(obj, name) {
		return hasOwnPropMethod.call(obj, name);
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
	
	
	function removeMatching(array, testFunc) {
		var removeCnt = 0;
		var i = 0;
	
		while (i < array.length) {
			if (testFunc(array[i])) { // truthy value means *remove*
				array.splice(i, 1);
				removeCnt++;
			}
			else {
				i++;
			}
		}
	
		return removeCnt;
	}
	
	
	function removeExact(array, exactVal) {
		var removeCnt = 0;
		var i = 0;
	
		while (i < array.length) {
			if (array[i] === exactVal) {
				array.splice(i, 1);
				removeCnt++;
			}
			else {
				i++;
			}
		}
	
		return removeCnt;
	}
	FC.removeExact = removeExact;
	
	
	
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
	
	
	// Given an object hash of HTML attribute names to values,
	// generates a string that can be injected between < > in HTML
	function attrsToStr(attrs) {
		var parts = [];
	
		$.each(attrs, function(name, val) {
			if (val != null) {
				parts.push(name + '="' + htmlEscape(val) + '"');
			}
		});
	
		return parts.join(' ');
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
	// N milliseconds. If `immediate` is passed, trigger the function on the
	// leading edge, instead of the trailing.
	// https://github.com/jashkenas/underscore/blob/1.6.0/underscore.js#L714
	function debounce(func, wait, immediate) {
		var timeout, args, context, timestamp, result;
	
		var later = function() {
			var last = +new Date() - timestamp;
			if (last < wait) {
				timeout = setTimeout(later, wait - last);
			}
			else {
				timeout = null;
				if (!immediate) {
					result = func.apply(context, args);
					context = args = null;
				}
			}
		};
	
		return function() {
			context = this;
			args = arguments;
			timestamp = +new Date();
			var callNow = immediate && !timeout;
			if (!timeout) {
				timeout = setTimeout(later, wait);
			}
			if (callNow) {
				result = func.apply(context, args);
				context = args = null;
			}
			return result;
		};
	}
	
	;;
	
	/*
	GENERAL NOTE on moments throughout the *entire rest* of the codebase:
	All moments are assumed to be ambiguously-zoned unless otherwise noted,
	with the NOTABLE EXCEOPTION of start/end dates that live on *Event Objects*.
	Ambiguously-TIMED moments are assumed to be ambiguously-zoned by nature.
	*/
	
	var ambigDateOfMonthRegex = /^\s*\d{4}-\d\d$/;
	var ambigTimeOrZoneRegex =
		/^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/;
	var newMomentProto = moment.fn; // where we will attach our new methods
	var oldMomentProto = $.extend({}, newMomentProto); // copy of original moment methods
	
	// tell momentjs to transfer these properties upon clone
	var momentProperties = moment.momentProperties;
	momentProperties.push('_fullCalendar');
	momentProperties.push('_ambigTime');
	momentProperties.push('_ambigZone');
	
	
	// Creating
	// -------------------------------------------------------------------------------------------------
	
	// Creates a new moment, similar to the vanilla moment(...) constructor, but with
	// extra features (ambiguous time, enhanced formatting). When given an existing moment,
	// it will function as a clone (and retain the zone of the moment). Anything else will
	// result in a moment in the local zone.
	FC.moment = function() {
		return makeMoment(arguments);
	};
	
	// Sames as FC.moment, but forces the resulting moment to be in the UTC timezone.
	FC.moment.utc = function() {
		var mom = makeMoment(arguments, true);
	
		// Force it into UTC because makeMoment doesn't guarantee it
		// (if given a pre-existing moment for example)
		if (mom.hasTime()) { // don't give ambiguously-timed moments a UTC zone
			mom.utc();
		}
	
		return mom;
	};
	
	// Same as FC.moment, but when given an ISO8601 string, the timezone offset is preserved.
	// ISO8601 strings with no timezone offset will become ambiguously zoned.
	FC.moment.parseZone = function() {
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
	
		if (moment.isMoment(input) || isNativeDate(input) || input === undefined) {
			mom = moment.apply(null, args);
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
					mom.utcOffset(input); // if not a valid zone, will assign UTC
				}
			}
		}
	
		mom._fullCalendar = true; // flag for extended functionality
	
		return mom;
	}
	
	
	// Week Number
	// -------------------------------------------------------------------------------------------------
	
	
	// Returns the week number, considering the locale's custom week number calcuation
	// `weeks` is an alias for `week`
	newMomentProto.week = newMomentProto.weeks = function(input) {
		var weekCalc = this._locale._fullCalendar_weekCalc;
	
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
	
		if (!this._ambigTime) {
	
			this.utc(true); // keepLocalTime=true (for keeping *date* value)
	
			// set time to zero
			this.set({
				hours: 0,
				minutes: 0,
				seconds: 0,
				ms: 0
			});
	
			// Mark the time as ambiguous. This needs to happen after the .utc() call, which might call .utcOffset(),
			// which clears all ambig flags.
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
	newMomentProto.stripZone = function() {
		var wasAmbigTime;
	
		if (!this._ambigZone) {
	
			wasAmbigTime = this._ambigTime;
	
			this.utc(true); // keepLocalTime=true (for keeping date and time values)
	
			// the above call to .utc()/.utcOffset() unfortunately might clear the ambig flags, so restore
			this._ambigTime = wasAmbigTime || false;
	
			// Mark the zone as ambiguous. This needs to happen after the .utc() call, which might call .utcOffset(),
			// which clears the ambig flags.
			this._ambigZone = true;
		}
	
		return this; // for chaining
	};
	
	// Returns of the moment has a non-ambiguous timezone offset (boolean)
	newMomentProto.hasZone = function() {
		return !this._ambigZone;
	};
	
	
	// implicitly marks a zone
	newMomentProto.local = function(keepLocalTime) {
	
		// for when converting from ambiguously-zoned to local,
		// keep the time values when converting from UTC -> local
		oldMomentProto.local.call(this, this._ambigZone || keepLocalTime);
	
		// ensure non-ambiguous
		// this probably already happened via local() -> utcOffset(), but don't rely on Moment's internals
		this._ambigTime = false;
		this._ambigZone = false;
	
		return this; // for chaining
	};
	
	
	// implicitly marks a zone
	newMomentProto.utc = function(keepLocalTime) {
	
		oldMomentProto.utc.call(this, keepLocalTime);
	
		// ensure non-ambiguous
		// this probably already happened via utc() -> utcOffset(), but don't rely on Moment's internals
		this._ambigTime = false;
		this._ambigZone = false;
	
		return this;
	};
	
	
	// implicitly marks a zone (will probably get called upon .utc() and .local())
	newMomentProto.utcOffset = function(tzo) {
	
		if (tzo != null) { // setter
			// these assignments needs to happen before the original zone method is called.
			// I forget why, something to do with a browser crash.
			this._ambigTime = false;
			this._ambigZone = false;
		}
	
		return oldMomentProto.utcOffset.apply(this, arguments);
	};
	
	
	// Formatting
	// -------------------------------------------------------------------------------------------------
	
	newMomentProto.format = function() {
	
		if (this._fullCalendar && arguments[0]) { // an enhanced moment? and a format string provided?
			return formatDate(this, arguments[0]); // our extended formatting
		}
		if (this._ambigTime) {
			return oldMomentFormat(englishMoment(this), 'YYYY-MM-DD');
		}
		if (this._ambigZone) {
			return oldMomentFormat(englishMoment(this), 'YYYY-MM-DD[T]HH:mm:ss');
		}
		if (this._fullCalendar) { // enhanced non-ambig moment?
			// moment.format() doesn't ensure english, but we want to.
			return oldMomentFormat(englishMoment(this));
		}
	
		return oldMomentProto.format.apply(this, arguments);
	};
	
	newMomentProto.toISOString = function() {
	
		if (this._ambigTime) {
			return oldMomentFormat(englishMoment(this), 'YYYY-MM-DD');
		}
		if (this._ambigZone) {
			return oldMomentFormat(englishMoment(this), 'YYYY-MM-DD[T]HH:mm:ss');
		}
		if (this._fullCalendar) { // enhanced non-ambig moment?
			// depending on browser, moment might not output english. ensure english.
			// https://github.com/moment/moment/blob/2.18.1/src/lib/moment/format.js#L22
			return oldMomentProto.toISOString.apply(englishMoment(this), arguments);
		}
	
		return oldMomentProto.toISOString.apply(this, arguments);
	};
	
	function englishMoment(mom) {
		if (mom.locale() !== 'en') {
			return mom.clone().locale('en');
		}
		return mom;
	}
	
	;;
	(function() {
	
	// exports
	FC.formatDate = formatDate;
	FC.formatRange = formatRange;
	FC.oldMomentFormat = oldMomentFormat;
	FC.queryMostGranularFormatUnit = queryMostGranularFormatUnit;
	
	
	// Config
	// ---------------------------------------------------------------------------------------------------------------------
	
	/*
	Inserted between chunks in the fake ("intermediate") formatting string.
	Important that it passes as whitespace (\s) because moment often identifies non-standalone months
	via a regexp with an \s.
	*/
	var PART_SEPARATOR = '\u000b'; // vertical tab
	
	/*
	Inserted as the first character of a literal-text chunk to indicate that the literal text is not actually literal text,
	but rather, a "special" token that has custom rendering (see specialTokens map).
	*/
	var SPECIAL_TOKEN_MARKER = '\u001f'; // information separator 1
	
	/*
	Inserted at the beginning and end of a span of text that must have non-zero numeric characters.
	Handling of these markers is done in a post-processing step at the very end of text rendering.
	*/
	var MAYBE_MARKER = '\u001e'; // information separator 2
	var MAYBE_REGEXP = new RegExp(MAYBE_MARKER + '([^' + MAYBE_MARKER + ']*)' + MAYBE_MARKER, 'g'); // must be global
	
	/*
	Addition formatting tokens we want recognized
	*/
	var specialTokens = {
		t: function(date) { // "a" or "p"
			return oldMomentFormat(date, 'a').charAt(0);
		},
		T: function(date) { // "A" or "P"
			return oldMomentFormat(date, 'A').charAt(0);
		}
	};
	
	/*
	The first characters of formatting tokens for units that are 1 day or larger.
	`value` is for ranking relative size (lower means bigger).
	`unit` is a normalized unit, used for comparing moments.
	*/
	var largeTokenMap = {
		Y: { value: 1, unit: 'year' },
		M: { value: 2, unit: 'month' },
		W: { value: 3, unit: 'week' }, // ISO week
		w: { value: 3, unit: 'week' }, // local week
		D: { value: 4, unit: 'day' }, // day of month
		d: { value: 4, unit: 'day' } // day of week
	};
	
	
	// Single Date Formatting
	// ---------------------------------------------------------------------------------------------------------------------
	
	/*
	Formats `date` with a Moment formatting string, but allow our non-zero areas and special token
	*/
	function formatDate(date, formatStr) {
		return renderFakeFormatString(
			getParsedFormatString(formatStr).fakeFormatString,
			date
		);
	}
	
	/*
	Call this if you want Moment's original format method to be used
	*/
	function oldMomentFormat(mom, formatStr) {
		return oldMomentProto.format.call(mom, formatStr); // oldMomentProto defined in moment-ext.js
	}
	
	
	// Date Range Formatting
	// -------------------------------------------------------------------------------------------------
	// TODO: make it work with timezone offset
	
	/*
	Using a formatting string meant for a single date, generate a range string, like
	"Sep 2 - 9 2013", that intelligently inserts a separator where the dates differ.
	If the dates are the same as far as the format string is concerned, just return a single
	rendering of one date, without any separator.
	*/
	function formatRange(date1, date2, formatStr, separator, isRTL) {
		var localeData;
	
		date1 = FC.moment.parseZone(date1);
		date2 = FC.moment.parseZone(date2);
	
		localeData = date1.localeData();
	
		// Expand localized format strings, like "LL" -> "MMMM D YYYY".
		// BTW, this is not important for `formatDate` because it is impossible to put custom tokens
		// or non-zero areas in Moment's localized format strings.
		formatStr = localeData.longDateFormat(formatStr) || formatStr;
	
		return renderParsedFormat(
			getParsedFormatString(formatStr),
			date1,
			date2,
			separator || ' - ',
			isRTL
		);
	}
	
	/*
	Renders a range with an already-parsed format string.
	*/
	function renderParsedFormat(parsedFormat, date1, date2, separator, isRTL) {
		var sameUnits = parsedFormat.sameUnits;
		var unzonedDate1 = date1.clone().stripZone(); // for same-unit comparisons
		var unzonedDate2 = date2.clone().stripZone(); // "
	
		var renderedParts1 = renderFakeFormatStringParts(parsedFormat.fakeFormatString, date1);
		var renderedParts2 = renderFakeFormatStringParts(parsedFormat.fakeFormatString, date2);
	
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
		for (
			leftI = 0;
			leftI < sameUnits.length && (!sameUnits[leftI] || unzonedDate1.isSame(unzonedDate2, sameUnits[leftI]));
			leftI++
		) {
			leftStr += renderedParts1[leftI];
		}
	
		// Similarly, start at the rightmost side of the formatting string and move left
		for (
			rightI = sameUnits.length - 1;
			rightI > leftI && (!sameUnits[rightI] || unzonedDate1.isSame(unzonedDate2, sameUnits[rightI]));
			rightI--
		) {
			// If current chunk is on the boundary of unique date-content, and is a special-case
			// date-formatting postfix character, then don't consume it. Consider it unique date-content.
			// TODO: make configurable
			if (rightI - 1 === leftI && renderedParts1[rightI] === '.') {
				break;
			}
	
			rightStr = renderedParts1[rightI] + rightStr;
		}
	
		// The area in the middle is different for both of the dates.
		// Collect them distinctly so we can jam them together later.
		for (middleI = leftI; middleI <= rightI; middleI++) {
			middleStr1 += renderedParts1[middleI];
			middleStr2 += renderedParts2[middleI];
		}
	
		if (middleStr1 || middleStr2) {
			if (isRTL) {
				middleStr = middleStr2 + separator + middleStr1;
			}
			else {
				middleStr = middleStr1 + separator + middleStr2;
			}
		}
	
		return processMaybeMarkers(
			leftStr + middleStr + rightStr
		);
	}
	
	
	// Format String Parsing
	// ---------------------------------------------------------------------------------------------------------------------
	
	var parsedFormatStrCache = {};
	
	/*
	Returns a parsed format string, leveraging a cache.
	*/
	function getParsedFormatString(formatStr) {
		return parsedFormatStrCache[formatStr] ||
			(parsedFormatStrCache[formatStr] = parseFormatString(formatStr));
	}
	
	/*
	Parses a format string into the following:
	- fakeFormatString: a momentJS formatting string, littered with special control characters that get post-processed.
	- sameUnits: for every part in fakeFormatString, if the part is a token, the value will be a unit string (like "day"),
	  that indicates how similar a range's start & end must be in order to share the same formatted text.
	  If not a token, then the value is null.
	  Always a flat array (not nested liked "chunks").
	*/
	function parseFormatString(formatStr) {
		var chunks = chunkFormatString(formatStr);
		
		return {
			fakeFormatString: buildFakeFormatString(chunks),
			sameUnits: buildSameUnits(chunks)
		};
	}
	
	/*
	Break the formatting string into an array of chunks.
	A 'maybe' chunk will have nested chunks.
	*/
	function chunkFormatString(formatStr) {
		var chunks = [];
		var match;
	
		// TODO: more descrimination
		// \4 is a backreference to the first character of a multi-character set.
		var chunker = /\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g;
	
		while ((match = chunker.exec(formatStr))) {
			if (match[1]) { // a literal string inside [ ... ]
				chunks.push.apply(chunks, // append
					splitStringLiteral(match[1])
				);
			}
			else if (match[2]) { // non-zero formatting inside ( ... )
				chunks.push({ maybe: chunkFormatString(match[2]) });
			}
			else if (match[3]) { // a formatting token
				chunks.push({ token: match[3] });
			}
			else if (match[5]) { // an unenclosed literal string
				chunks.push.apply(chunks, // append
					splitStringLiteral(match[5])
				);
			}
		}
	
		return chunks;
	}
	
	/*
	Potentially splits a literal-text string into multiple parts. For special cases.
	*/
	function splitStringLiteral(s) {
		if (s === '. ') {
			return [ '.', ' ' ]; // for locales with periods bound to the end of each year/month/date
		}
		else {
			return [ s ];
		}
	}
	
	/*
	Given chunks parsed from a real format string, generate a fake (aka "intermediate") format string with special control
	characters that will eventually be given to moment for formatting, and then post-processed.
	*/
	function buildFakeFormatString(chunks) {
		var parts = [];
		var i, chunk;
	
		for (i = 0; i < chunks.length; i++) {
			chunk = chunks[i];
	
			if (typeof chunk === 'string') {
				parts.push('[' + chunk + ']');
			}
			else if (chunk.token) {
				if (chunk.token in specialTokens) {
					parts.push(
						SPECIAL_TOKEN_MARKER + // useful during post-processing
						'[' + chunk.token + ']' // preserve as literal text
					);
				}
				else {
					parts.push(chunk.token); // unprotected text implies a format string
				}
			}
			else if (chunk.maybe) {
				parts.push(
					MAYBE_MARKER + // useful during post-processing
					buildFakeFormatString(chunk.maybe) +
					MAYBE_MARKER
				);
			}
		}
	
		return parts.join(PART_SEPARATOR);
	}
	
	/*
	Given parsed chunks from a real formatting string, generates an array of unit strings (like "day") that indicate
	in which regard two dates must be similar in order to share range formatting text.
	The `chunks` can be nested (because of "maybe" chunks), however, the returned array will be flat.
	*/
	function buildSameUnits(chunks) {
		var units = [];
		var i, chunk;
		var tokenInfo;
	
		for (i = 0; i < chunks.length; i++) {
			chunk = chunks[i];
	
			if (chunk.token) {
				tokenInfo = largeTokenMap[chunk.token.charAt(0)];
				units.push(tokenInfo ? tokenInfo.unit : 'second'); // default to a very strict same-second
			}
			else if (chunk.maybe) {
				units.push.apply(units, // append
					buildSameUnits(chunk.maybe)
				);
			}
			else {
				units.push(null);
			}
		}
	
		return units;
	}
	
	
	// Rendering to text
	// ---------------------------------------------------------------------------------------------------------------------
	
	/*
	Formats a date with a fake format string, post-processes the control characters, then returns.
	*/
	function renderFakeFormatString(fakeFormatString, date) {
		return processMaybeMarkers(
			renderFakeFormatStringParts(fakeFormatString, date).join('')
		);
	}
	
	/*
	Formats a date into parts that will have been post-processed, EXCEPT for the "maybe" markers.
	*/
	function renderFakeFormatStringParts(fakeFormatString, date) {
		var parts = [];
		var fakeRender = oldMomentFormat(date, fakeFormatString);
		var fakeParts = fakeRender.split(PART_SEPARATOR);
		var i, fakePart;
	
		for (i = 0; i < fakeParts.length; i++) {
			fakePart = fakeParts[i];
	
			if (fakePart.charAt(0) === SPECIAL_TOKEN_MARKER) {
				parts.push(
					// the literal string IS the token's name.
					// call special token's registered function.
					specialTokens[fakePart.substring(1)](date)
				);
			}
			else {
				parts.push(fakePart);
			}
		}
	
		return parts;
	}
	
	/*
	Accepts an almost-finally-formatted string and processes the "maybe" control characters, returning a new string.
	*/
	function processMaybeMarkers(s) {
		return s.replace(MAYBE_REGEXP, function(m0, m1) { // regex assumed to have 'g' flag
			if (m1.match(/[1-9]/)) { // any non-zero numeric characters?
				return m1;
			}
			else {
				return '';
			}
		});
	}
	
	
	// Misc Utils
	// -------------------------------------------------------------------------------------------------
	
	/*
	Returns a unit string, either 'year', 'month', 'day', or null for the most granular formatting token in the string.
	*/
	function queryMostGranularFormatUnit(formatStr) {
		var chunks = chunkFormatString(formatStr);
		var i, chunk;
		var candidate;
		var best;
	
		for (i = 0; i < chunks.length; i++) {
			chunk = chunks[i];
	
			if (chunk.token) {
				candidate = largeTokenMap[chunk.token.charAt(0)];
				if (candidate) {
					if (!best || candidate.value > best.value) {
						best = candidate;
					}
				}
			}
		}
	
		if (best) {
			return best.unit;
		}
	
		return null;
	};
	
	})();
	
	// quick local references
	var formatDate = FC.formatDate;
	var formatRange = FC.formatRange;
	var oldMomentFormat = FC.oldMomentFormat;
	
	;;
	
	FC.Class = Class; // export
	
	// Class that all other classes will inherit from
	function Class() { }
	
	
	// Called on a class to create a subclass.
	// Last argument contains instance methods. Any argument before the last are considered mixins.
	Class.extend = function() {
		var members = {};
		var i;
	
		for (i = 0; i < arguments.length; i++) {
			copyOwnProps(arguments[i], members);
		}
	
		return extendClass(this, members);
	};
	
	
	// Adds new member variables/methods to the class's prototype.
	// Can be called with another class, or a plain object hash containing new members.
	Class.mixin = function(members) {
		copyOwnProps(members, this.prototype);
	};
	
	
	function extendClass(superClass, members) {
		var subClass;
	
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
		subClass.prototype = Object.create(superClass.prototype);
	
		// copy each member variable/method onto the the subclass's prototype
		copyOwnProps(members, subClass.prototype);
	
		// copy over all class variables/methods to the subclass, such as `extend` and `mixin`
		copyOwnProps(superClass, subClass);
	
		return subClass;
	}
	
	;;
	
	var EmitterMixin = FC.EmitterMixin = {
	
		// jQuery-ification via $(this) allows a non-DOM object to have
		// the same event handling capabilities (including namespaces).
	
	
		on: function(types, handler) {
			$(this).on(types, this._prepareIntercept(handler));
			return this; // for chaining
		},
	
	
		one: function(types, handler) {
			$(this).one(types, this._prepareIntercept(handler));
			return this; // for chaining
		},
	
	
		_prepareIntercept: function(handler) {
			// handlers are always called with an "event" object as their first param.
			// sneak the `this` context and arguments into the extra parameter object
			// and forward them on to the original handler.
			var intercept = function(ev, extra) {
				return handler.apply(
					extra.context || this,
					extra.args || []
				);
			};
	
			// mimick jQuery's internal "proxy" system (risky, I know)
			// causing all functions with the same .guid to appear to be the same.
			// https://github.com/jquery/jquery/blob/2.2.4/src/core.js#L448
			// this is needed for calling .off with the original non-intercept handler.
			if (!handler.guid) {
				handler.guid = $.guid++;
			}
			intercept.guid = handler.guid;
	
			return intercept;
		},
	
	
		off: function(types, handler) {
			$(this).off(types, handler);
	
			return this; // for chaining
		},
	
	
		trigger: function(types) {
			var args = Array.prototype.slice.call(arguments, 1); // arguments after the first
	
			// pass in "extra" info to the intercept
			$(this).triggerHandler(types, { args: args });
	
			return this; // for chaining
		},
	
	
		triggerWith: function(types, context, args) {
	
			// `triggerHandler` is less reliant on the DOM compared to `trigger`.
			// pass in "extra" info to the intercept.
			$(this).triggerHandler(types, { context: context, args: args });
	
			return this; // for chaining
		},
	
	
		hasHandlers: function(type) {
			var hash = $._data(this, 'events'); // http://blog.jquery.com/2012/08/09/jquery-1-8-released/
	
			return hash && hash[type] && hash[type].length > 0;
		}
	
	};
	
	;;
	
	/*
	Utility methods for easily listening to events on another object,
	and more importantly, easily unlistening from them.
	*/
	var ListenerMixin = FC.ListenerMixin = (function() {
		var guid = 0;
		var ListenerMixin = {
	
			listenerId: null,
	
			/*
			Given an `other` object that has on/off methods, bind the given `callback` to an event by the given name.
			The `callback` will be called with the `this` context of the object that .listenTo is being called on.
			Can be called:
				.listenTo(other, eventName, callback)
			OR
				.listenTo(other, {
					eventName1: callback1,
					eventName2: callback2
				})
			*/
			listenTo: function(other, arg, callback) {
				if (typeof arg === 'object') { // given dictionary of callbacks
					for (var eventName in arg) {
						if (arg.hasOwnProperty(eventName)) {
							this.listenTo(other, eventName, arg[eventName]);
						}
					}
				}
				else if (typeof arg === 'string') {
					other.on(
						arg + '.' + this.getListenerNamespace(), // use event namespacing to identify this object
						$.proxy(callback, this) // always use `this` context
							// the usually-undesired jQuery guid behavior doesn't matter,
							// because we always unbind via namespace
					);
				}
			},
	
			/*
			Causes the current object to stop listening to events on the `other` object.
			`eventName` is optional. If omitted, will stop listening to ALL events on `other`.
			*/
			stopListeningTo: function(other, eventName) {
				other.off((eventName || '') + '.' + this.getListenerNamespace());
			},
	
			/*
			Returns a string, unique to this object, to be used for event namespacing
			*/
			getListenerNamespace: function() {
				if (this.listenerId == null) {
					this.listenerId = guid++;
				}
				return '_listener' + this.listenerId;
			}
	
		};
		return ListenerMixin;
	})();
	;;
	
	var ParsableModelMixin = {
	
		standardPropMap: {}, // will be cloned by allowRawProps
	
	
		/*
		Returns true/false for success
		*/
		applyRawProps: function(rawProps) {
			var standardPropMap = this.standardPropMap;
			var manualProps = {};
			var otherProps = {};
			var propName;
	
			for (propName in rawProps) {
				if (standardPropMap[propName] === true) { // copy automatically
					this[propName] = rawProps[propName];
				}
				else if (standardPropMap[propName] === false) {
					manualProps[propName] = rawProps[propName];
				}
				else {
					otherProps[propName] = rawProps[propName];
				}
			}
	
			this.applyOtherRawProps(otherProps);
	
			return this.applyManualRawProps(manualProps);
		},
	
	
		/*
		If subclasses override, they must call this supermethod and return the boolean response.
		*/
		applyManualRawProps: function(rawProps) {
			return true;
		},
	
	
		applyOtherRawProps: function(rawProps) {
			// subclasses can implement
		}
	
	};
	
	
	/*
	TODO: devise a better system
	*/
	var ParsableModelMixin_allowRawProps = function(propDefs) {
		var proto = this.prototype;
	
		proto.standardPropMap = Object.create(proto.standardPropMap);
	
		copyOwnProps(propDefs, proto.standardPropMap);
	};
	
	
	/*
	TODO: devise a better system
	*/
	var ParsableModelMixin_copyVerbatimStandardProps = function(src, dest) {
		var map = this.prototype.standardPropMap;
		var propName;
	
		for (propName in map) {
			if (
				src[propName] != null && // in the src object?
				map[propName] === true // false means "copy verbatim"
			) {
				dest[propName] = src[propName];
			}
		}
	};
	
	;;
	
	var Model = Class.extend(EmitterMixin, ListenerMixin, {
	
		_props: null,
		_watchers: null,
		_globalWatchArgs: null,
	
		constructor: function() {
			this._watchers = {};
			this._props = {};
			this.applyGlobalWatchers();
		},
	
		applyGlobalWatchers: function() {
			var argSets = this._globalWatchArgs || [];
			var i;
	
			for (i = 0; i < argSets.length; i++) {
				this.watch.apply(this, argSets[i]);
			}
		},
	
		has: function(name) {
			return name in this._props;
		},
	
		get: function(name) {
			if (name === undefined) {
				return this._props;
			}
	
			return this._props[name];
		},
	
		set: function(name, val) {
			var newProps;
	
			if (typeof name === 'string') {
				newProps = {};
				newProps[name] = val === undefined ? null : val;
			}
			else {
				newProps = name;
			}
	
			this.setProps(newProps);
		},
	
		reset: function(newProps) {
			var oldProps = this._props;
			var changeset = {}; // will have undefined's to signal unsets
			var name;
	
			for (name in oldProps) {
				changeset[name] = undefined;
			}
	
			for (name in newProps) {
				changeset[name] = newProps[name];
			}
	
			this.setProps(changeset);
		},
	
		unset: function(name) { // accepts a string or array of strings
			var newProps = {};
			var names;
			var i;
	
			if (typeof name === 'string') {
				names = [ name ];
			}
			else {
				names = name;
			}
	
			for (i = 0; i < names.length; i++) {
				newProps[names[i]] = undefined;
			}
	
			this.setProps(newProps);
		},
	
		setProps: function(newProps) {
			var changedProps = {};
			var changedCnt = 0;
			var name, val;
	
			for (name in newProps) {
				val = newProps[name];
	
				// a change in value?
				// if an object, don't check equality, because might have been mutated internally.
				// TODO: eventually enforce immutability.
				if (
					typeof val === 'object' ||
					val !== this._props[name]
				) {
					changedProps[name] = val;
					changedCnt++;
				}
			}
	
			if (changedCnt) {
	
				this.trigger('before:batchChange', changedProps);
	
				for (name in changedProps) {
					val = changedProps[name];
	
					this.trigger('before:change', name, val);
					this.trigger('before:change:' + name, val);
				}
	
				for (name in changedProps) {
					val = changedProps[name];
	
					if (val === undefined) {
						delete this._props[name];
					}
					else {
						this._props[name] = val;
					}
	
					this.trigger('change:' + name, val);
					this.trigger('change', name, val);
				}
	
				this.trigger('batchChange', changedProps);
			}
		},
	
		watch: function(name, depList, startFunc, stopFunc) {
			var _this = this;
	
			this.unwatch(name);
	
			this._watchers[name] = this._watchDeps(depList, function(deps) {
				var res = startFunc.call(_this, deps);
	
				if (res && res.then) {
					_this.unset(name); // put in an unset state while resolving
					res.then(function(val) {
						_this.set(name, val);
					});
				}
				else {
					_this.set(name, res);
				}
			}, function() {
				_this.unset(name);
	
				if (stopFunc) {
					stopFunc.call(_this);
				}
			});
		},
	
		unwatch: function(name) {
			var watcher = this._watchers[name];
	
			if (watcher) {
				delete this._watchers[name];
				watcher.teardown();
			}
		},
	
		_watchDeps: function(depList, startFunc, stopFunc) {
			var _this = this;
			var queuedChangeCnt = 0;
			var depCnt = depList.length;
			var satisfyCnt = 0;
			var values = {}; // what's passed as the `deps` arguments
			var bindTuples = []; // array of [ eventName, handlerFunc ] arrays
			var isCallingStop = false;
	
			function onBeforeDepChange(depName, val, isOptional) {
				queuedChangeCnt++;
				if (queuedChangeCnt === 1) { // first change to cause a "stop" ?
					if (satisfyCnt === depCnt) { // all deps previously satisfied?
						isCallingStop = true;
						stopFunc();
						isCallingStop = false;
					}
				}
			}
	
			function onDepChange(depName, val, isOptional) {
	
				if (val === undefined) { // unsetting a value?
	
					// required dependency that was previously set?
					if (!isOptional && values[depName] !== undefined) {
						satisfyCnt--;
					}
	
					delete values[depName];
				}
				else { // setting a value?
	
					// required dependency that was previously unset?
					if (!isOptional && values[depName] === undefined) {
						satisfyCnt++;
					}
	
					values[depName] = val;
				}
	
				queuedChangeCnt--;
				if (!queuedChangeCnt) { // last change to cause a "start"?
	
					// now finally satisfied or satisfied all along?
					if (satisfyCnt === depCnt) {
	
						// if the stopFunc initiated another value change, ignore it.
						// it will be processed by another change event anyway.
						if (!isCallingStop) {
							startFunc(values);
						}
					}
				}
			}
	
			// intercept for .on() that remembers handlers
			function bind(eventName, handler) {
				_this.on(eventName, handler);
				bindTuples.push([ eventName, handler ]);
			}
	
			// listen to dependency changes
			depList.forEach(function(depName) {
				var isOptional = false;
	
				if (depName.charAt(0) === '?') { // TODO: more DRY
					depName = depName.substring(1);
					isOptional = true;
				}
	
				bind('before:change:' + depName, function(val) {
					onBeforeDepChange(depName, val, isOptional);
				});
	
				bind('change:' + depName, function(val) {
					onDepChange(depName, val, isOptional);
				});
			});
	
			// process current dependency values
			depList.forEach(function(depName) {
				var isOptional = false;
	
				if (depName.charAt(0) === '?') { // TODO: more DRY
					depName = depName.substring(1);
					isOptional = true;
				}
	
				if (_this.has(depName)) {
					values[depName] = _this.get(depName);
					satisfyCnt++;
				}
				else if (isOptional) {
					satisfyCnt++;
				}
			});
	
			// initially satisfied
			if (satisfyCnt === depCnt) {
				startFunc(values);
			}
	
			return {
				teardown: function() {
					// remove all handlers
					for (var i = 0; i < bindTuples.length; i++) {
						_this.off(bindTuples[i][0], bindTuples[i][1]);
					}
					bindTuples = null;
	
					// was satisfied, so call stopFunc
					if (satisfyCnt === depCnt) {
						stopFunc();
					}
				},
				flash: function() {
					if (satisfyCnt === depCnt) {
						stopFunc();
						startFunc(values);
					}
				}
			};
		},
	
		flash: function(name) {
			var watcher = this._watchers[name];
	
			if (watcher) {
				watcher.flash();
			}
		}
	
	});
	
	
	Model.watch = function(/* same arguments as this.watch() */) {
		var proto = this.prototype;
	
		if (!proto._globalWatchArgs) {
			proto._globalWatchArgs = [];
		}
	
		proto._globalWatchArgs.push(arguments);
	};
	
	
	FC.Model = Model;
	
	
	;;
	
	var Promise = {
	
		construct: function(executor) {
			var deferred = $.Deferred();
			var promise = deferred.promise();
	
			if (typeof executor === 'function') {
				executor(
					function(val) { // resolve
						deferred.resolve(val);
						attachImmediatelyResolvingThen(promise, val);
					},
					function() { // reject
						deferred.reject();
						attachImmediatelyRejectingThen(promise);
					}
				);
			}
	
			return promise;
		},
	
		resolve: function(val) {
			var deferred = $.Deferred().resolve(val);
			var promise = deferred.promise();
	
			attachImmediatelyResolvingThen(promise, val);
	
			return promise;
		},
	
		reject: function() {
			var deferred = $.Deferred().reject();
			var promise = deferred.promise();
	
			attachImmediatelyRejectingThen(promise);
	
			return promise;
		}
	
	};
	
	
	function attachImmediatelyResolvingThen(promise, val) {
		promise.then = function(onResolve) {
			if (typeof onResolve === 'function') {
				return Promise.resolve(onResolve(val));
			}
			return promise;
		};
	}
	
	
	function attachImmediatelyRejectingThen(promise) {
		promise.then = function(onResolve, onReject) {
			if (typeof onReject === 'function') {
				onReject();
			}
			return promise;
		};
	}
	
	
	FC.Promise = Promise;
	
	;;
	
	var TaskQueue = Class.extend(EmitterMixin, {
	
		q: null,
		isPaused: false,
		isRunning: false,
	
	
		constructor: function() {
			this.q = [];
		},
	
	
		queue: function(/* taskFunc, taskFunc... */) {
			this.q.push.apply(this.q, arguments); // append
			this.tryStart();
		},
	
	
		pause: function() {
			this.isPaused = true;
		},
	
	
		resume: function() {
			this.isPaused = false;
			this.tryStart();
		},
	
	
		tryStart: function() {
			if (!this.isRunning && this.canRunNext()) {
				this.isRunning = true;
				this.trigger('start');
				this.runNext();
			}
		},
	
	
		canRunNext: function() {
			return !this.isPaused && this.q.length;
		},
	
	
		runNext: function() { // does not check canRunNext
			this.runTask(this.q.shift());
		},
	
	
		runTask: function(task) {
			this.runTaskFunc(task);
		},
	
	
		runTaskFunc: function(taskFunc) {
			var _this = this;
			var res = taskFunc();
	
			if (res && res.then) {
				res.then(done);
			}
			else {
				done();
			}
	
			function done() {
				if (_this.canRunNext()) {
					_this.runNext();
				}
				else {
					_this.isRunning = false;
					_this.trigger('stop');
				}
			}
		}
	
	});
	
	FC.TaskQueue = TaskQueue;
	
	;;
	
	var RenderQueue = TaskQueue.extend({
	
		waitsByNamespace: null,
		waitNamespace: null,
		waitId: null,
	
	
		constructor: function(waitsByNamespace) {
			TaskQueue.call(this); // super-constructor
	
			this.waitsByNamespace = waitsByNamespace || {};
		},
	
	
		queue: function(taskFunc, namespace, type) {
			var task = {
				func: taskFunc,
				namespace: namespace,
				type: type
			};
			var waitMs;
	
			if (namespace) {
				waitMs = this.waitsByNamespace[namespace];
			}
	
			if (this.waitNamespace) {
				if (namespace === this.waitNamespace && waitMs != null) {
					this.delayWait(waitMs);
				}
				else {
					this.clearWait();
					this.tryStart();
				}
			}
	
			if (this.compoundTask(task)) { // appended to queue?
	
				if (!this.waitNamespace && waitMs != null) {
					this.startWait(namespace, waitMs);
				}
				else {
					this.tryStart();
				}
			}
		},
	
	
		startWait: function(namespace, waitMs) {
			this.waitNamespace = namespace;
			this.spawnWait(waitMs);
		},
	
	
		delayWait: function(waitMs) {
			clearTimeout(this.waitId);
			this.spawnWait(waitMs);
		},
	
	
		spawnWait: function(waitMs) {
			var _this = this;
	
			this.waitId = setTimeout(function() {
				_this.waitNamespace = null;
				_this.tryStart();
			}, waitMs);
		},
	
	
		clearWait: function() {
			if (this.waitNamespace) {
				clearTimeout(this.waitId);
				this.waitId = null;
				this.waitNamespace = null;
			}
		},
	
	
		canRunNext: function() {
			if (!TaskQueue.prototype.canRunNext.apply(this, arguments)) {
				return false;
			}
	
			// waiting for a certain namespace to stop receiving tasks?
			if (this.waitNamespace) {
	
				// if there was a different namespace task in the meantime,
				// that forces all previously-waiting tasks to suddenly execute.
				// TODO: find a way to do this in constant time.
				for (var q = this.q, i = 0; i < q.length; i++) {
					if (q[i].namespace !== this.waitNamespace) {
						return true; // allow execution
					}
				}
	
				return false;
			}
	
			return true;
		},
	
	
		runTask: function(task) {
			this.runTaskFunc(task.func);
		},
	
	
		compoundTask: function(newTask) {
			var q = this.q;
			var shouldAppend = true;
			var i, task;
	
			if (newTask.namespace) {
	
				if (newTask.type === 'destroy' || newTask.type === 'init') {
	
					// remove all add/remove ops with same namespace, regardless of order
					for (i = q.length - 1; i >= 0; i--) {
						task = q[i];
	
						if (
							task.namespace === newTask.namespace &&
							(task.type === 'add' || task.type === 'remove')
						) {
							q.splice(i, 1); // remove task
						}
					}
	
					if (newTask.type === 'destroy') {
						// eat away final init/destroy operation
						if (q.length) {
							task = q[q.length - 1]; // last task
	
							if (task.namespace === newTask.namespace) {
	
								// the init and our destroy cancel each other out
								if (task.type === 'init') {
									shouldAppend = false;
									q.pop();
								}
								// prefer to use the destroy operation that's already present
								else if (task.type === 'destroy') {
									shouldAppend = false;
								}
							}
						}
					}
					else if (newTask.type === 'init') {
						// eat away final init operation
						if (q.length) {
							task = q[q.length - 1]; // last task
	
							if (
								task.namespace === newTask.namespace &&
								task.type === 'init'
							) {
								// our init operation takes precedence
								q.pop();
							}
						}
					}
				}
			}
	
			if (shouldAppend) {
				q.push(newTask);
			}
	
			return shouldAppend;
		}
	
	});
	
	FC.RenderQueue = RenderQueue;
	
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
	
	var Popover = Class.extend(ListenerMixin, {
	
		isHidden: true,
		options: null,
		el: null, // the container element for the popover. generated by this object
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
				this.listenTo($(document), 'mousedown', this.documentMousedown);
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
	
			this.stopListeningTo($(document), 'mousedown');
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
	
	/*
	A cache for the left/right/top/bottom/width/height values for one or more elements.
	Works with both offset (from topleft document) and position (from offsetParent).
	
	options:
	- els
	- isHorizontal
	- isVertical
	*/
	var CoordCache = FC.CoordCache = Class.extend({
	
		els: null, // jQuery set (assumed to be siblings)
		forcedOffsetParentEl: null, // options can override the natural offsetParent
		origin: null, // {left,top} position of offsetParent of els
		boundingRect: null, // constrain cordinates to this rectangle. {left,right,top,bottom} or null
		isHorizontal: false, // whether to query for left/right/width
		isVertical: false, // whether to query for top/bottom/height
	
		// arrays of coordinates (offsets from topleft of document)
		lefts: null,
		rights: null,
		tops: null,
		bottoms: null,
	
	
		constructor: function(options) {
			this.els = $(options.els);
			this.isHorizontal = options.isHorizontal;
			this.isVertical = options.isVertical;
			this.forcedOffsetParentEl = options.offsetParent ? $(options.offsetParent) : null;
		},
	
	
		// Queries the els for coordinates and stores them.
		// Call this method before using and of the get* methods below.
		build: function() {
			var offsetParentEl = this.forcedOffsetParentEl;
			if (!offsetParentEl && this.els.length > 0) {
				offsetParentEl = this.els.eq(0).offsetParent();
			}
	
			this.origin = offsetParentEl ?
				offsetParentEl.offset() :
				null;
	
			this.boundingRect = this.queryBoundingRect();
	
			if (this.isHorizontal) {
				this.buildElHorizontals();
			}
			if (this.isVertical) {
				this.buildElVerticals();
			}
		},
	
	
		// Destroys all internal data about coordinates, freeing memory
		clear: function() {
			this.origin = null;
			this.boundingRect = null;
			this.lefts = null;
			this.rights = null;
			this.tops = null;
			this.bottoms = null;
		},
	
	
		// When called, if coord caches aren't built, builds them
		ensureBuilt: function() {
			if (!this.origin) {
				this.build();
			}
		},
	
	
		// Populates the left/right internal coordinate arrays
		buildElHorizontals: function() {
			var lefts = [];
			var rights = [];
	
			this.els.each(function(i, node) {
				var el = $(node);
				var left = el.offset().left;
				var width = el.outerWidth();
	
				lefts.push(left);
				rights.push(left + width);
			});
	
			this.lefts = lefts;
			this.rights = rights;
		},
	
	
		// Populates the top/bottom internal coordinate arrays
		buildElVerticals: function() {
			var tops = [];
			var bottoms = [];
	
			this.els.each(function(i, node) {
				var el = $(node);
				var top = el.offset().top;
				var height = el.outerHeight();
	
				tops.push(top);
				bottoms.push(top + height);
			});
	
			this.tops = tops;
			this.bottoms = bottoms;
		},
	
	
		// Given a left offset (from document left), returns the index of the el that it horizontally intersects.
		// If no intersection is made, returns undefined.
		getHorizontalIndex: function(leftOffset) {
			this.ensureBuilt();
	
			var lefts = this.lefts;
			var rights = this.rights;
			var len = lefts.length;
			var i;
	
			for (i = 0; i < len; i++) {
				if (leftOffset >= lefts[i] && leftOffset < rights[i]) {
					return i;
				}
			}
		},
	
	
		// Given a top offset (from document top), returns the index of the el that it vertically intersects.
		// If no intersection is made, returns undefined.
		getVerticalIndex: function(topOffset) {
			this.ensureBuilt();
	
			var tops = this.tops;
			var bottoms = this.bottoms;
			var len = tops.length;
			var i;
	
			for (i = 0; i < len; i++) {
				if (topOffset >= tops[i] && topOffset < bottoms[i]) {
					return i;
				}
			}
		},
	
	
		// Gets the left offset (from document left) of the element at the given index
		getLeftOffset: function(leftIndex) {
			this.ensureBuilt();
			return this.lefts[leftIndex];
		},
	
	
		// Gets the left position (from offsetParent left) of the element at the given index
		getLeftPosition: function(leftIndex) {
			this.ensureBuilt();
			return this.lefts[leftIndex] - this.origin.left;
		},
	
	
		// Gets the right offset (from document left) of the element at the given index.
		// This value is NOT relative to the document's right edge, like the CSS concept of "right" would be.
		getRightOffset: function(leftIndex) {
			this.ensureBuilt();
			return this.rights[leftIndex];
		},
	
	
		// Gets the right position (from offsetParent left) of the element at the given index.
		// This value is NOT relative to the offsetParent's right edge, like the CSS concept of "right" would be.
		getRightPosition: function(leftIndex) {
			this.ensureBuilt();
			return this.rights[leftIndex] - this.origin.left;
		},
	
	
		// Gets the width of the element at the given index
		getWidth: function(leftIndex) {
			this.ensureBuilt();
			return this.rights[leftIndex] - this.lefts[leftIndex];
		},
	
	
		// Gets the top offset (from document top) of the element at the given index
		getTopOffset: function(topIndex) {
			this.ensureBuilt();
			return this.tops[topIndex];
		},
	
	
		// Gets the top position (from offsetParent top) of the element at the given position
		getTopPosition: function(topIndex) {
			this.ensureBuilt();
			return this.tops[topIndex] - this.origin.top;
		},
	
		// Gets the bottom offset (from the document top) of the element at the given index.
		// This value is NOT relative to the offsetParent's bottom edge, like the CSS concept of "bottom" would be.
		getBottomOffset: function(topIndex) {
			this.ensureBuilt();
			return this.bottoms[topIndex];
		},
	
	
		// Gets the bottom position (from the offsetParent top) of the element at the given index.
		// This value is NOT relative to the offsetParent's bottom edge, like the CSS concept of "bottom" would be.
		getBottomPosition: function(topIndex) {
			this.ensureBuilt();
			return this.bottoms[topIndex] - this.origin.top;
		},
	
	
		// Gets the height of the element at the given index
		getHeight: function(topIndex) {
			this.ensureBuilt();
			return this.bottoms[topIndex] - this.tops[topIndex];
		},
	
	
		// Bounding Rect
		// TODO: decouple this from CoordCache
	
		// Compute and return what the elements' bounding rectangle is, from the user's perspective.
		// Right now, only returns a rectangle if constrained by an overflow:scroll element.
		// Returns null if there are no elements
		queryBoundingRect: function() {
			var scrollParentEl;
	
			if (this.els.length > 0) {
				scrollParentEl = getScrollParent(this.els.eq(0));
	
				if (!scrollParentEl.is(document)) {
					return getClientRect(scrollParentEl);
				}
			}
	
			return null;
		},
	
		isPointInBounds: function(leftOffset, topOffset) {
			return this.isLeftInBounds(leftOffset) && this.isTopInBounds(topOffset);
		},
	
		isLeftInBounds: function(leftOffset) {
			return !this.boundingRect || (leftOffset >= this.boundingRect.left && leftOffset < this.boundingRect.right);
		},
	
		isTopInBounds: function(topOffset) {
			return !this.boundingRect || (topOffset >= this.boundingRect.top && topOffset < this.boundingRect.bottom);
		}
	
	});
	
	;;
	
	/* Tracks a drag's mouse movement, firing various handlers
	----------------------------------------------------------------------------------------------------------------------*/
	// TODO: use Emitter
	
	var DragListener = FC.DragListener = Class.extend(ListenerMixin, {
	
		options: null,
		subjectEl: null,
	
		// coordinates of the initial mousedown
		originX: null,
		originY: null,
	
		// the wrapping element that scrolls, or MIGHT scroll if there's overflow.
		// TODO: do this for wrappers that have overflow:hidden as well.
		scrollEl: null,
	
		isInteracting: false,
		isDistanceSurpassed: false,
		isDelayEnded: false,
		isDragging: false,
		isTouch: false,
		isGeneric: false, // initiated by 'dragstart' (jqui)
	
		delay: null,
		delayTimeoutId: null,
		minDistance: null,
	
		shouldCancelTouchScroll: true,
		scrollAlwaysKills: false,
	
	
		constructor: function(options) {
			this.options = options || {};
		},
	
	
		// Interaction (high-level)
		// -----------------------------------------------------------------------------------------------------------------
	
	
		startInteraction: function(ev, extraOptions) {
	
			if (ev.type === 'mousedown') {
				if (GlobalEmitter.get().shouldIgnoreMouse()) {
					return;
				}
				else if (!isPrimaryMouseButton(ev)) {
					return;
				}
				else {
					ev.preventDefault(); // prevents native selection in most browsers
				}
			}
	
			if (!this.isInteracting) {
	
				// process options
				extraOptions = extraOptions || {};
				this.delay = firstDefined(extraOptions.delay, this.options.delay, 0);
				this.minDistance = firstDefined(extraOptions.distance, this.options.distance, 0);
				this.subjectEl = this.options.subjectEl;
	
				preventSelection($('body'));
	
				this.isInteracting = true;
				this.isTouch = getEvIsTouch(ev);
				this.isGeneric = ev.type === 'dragstart';
				this.isDelayEnded = false;
				this.isDistanceSurpassed = false;
	
				this.originX = getEvX(ev);
				this.originY = getEvY(ev);
				this.scrollEl = getScrollParent($(ev.target));
	
				this.bindHandlers();
				this.initAutoScroll();
				this.handleInteractionStart(ev);
				this.startDelay(ev);
	
				if (!this.minDistance) {
					this.handleDistanceSurpassed(ev);
				}
			}
		},
	
	
		handleInteractionStart: function(ev) {
			this.trigger('interactionStart', ev);
		},
	
	
		endInteraction: function(ev, isCancelled) {
			if (this.isInteracting) {
				this.endDrag(ev);
	
				if (this.delayTimeoutId) {
					clearTimeout(this.delayTimeoutId);
					this.delayTimeoutId = null;
				}
	
				this.destroyAutoScroll();
				this.unbindHandlers();
	
				this.isInteracting = false;
				this.handleInteractionEnd(ev, isCancelled);
	
				allowSelection($('body'));
			}
		},
	
	
		handleInteractionEnd: function(ev, isCancelled) {
			this.trigger('interactionEnd', ev, isCancelled || false);
		},
	
	
		// Binding To DOM
		// -----------------------------------------------------------------------------------------------------------------
	
	
		bindHandlers: function() {
			// some browsers (Safari in iOS 10) don't allow preventDefault on touch events that are bound after touchstart,
			// so listen to the GlobalEmitter singleton, which is always bound, instead of the document directly.
			var globalEmitter = GlobalEmitter.get();
	
			if (this.isGeneric) {
				this.listenTo($(document), { // might only work on iOS because of GlobalEmitter's bind :(
					drag: this.handleMove,
					dragstop: this.endInteraction
				});
			}
			else if (this.isTouch) {
				this.listenTo(globalEmitter, {
					touchmove: this.handleTouchMove,
					touchend: this.endInteraction,
					scroll: this.handleTouchScroll
				});
			}
			else {
				this.listenTo(globalEmitter, {
					mousemove: this.handleMouseMove,
					mouseup: this.endInteraction
				});
			}
	
			this.listenTo(globalEmitter, {
				selectstart: preventDefault, // don't allow selection while dragging
				contextmenu: preventDefault // long taps would open menu on Chrome dev tools
			});
		},
	
	
		unbindHandlers: function() {
			this.stopListeningTo(GlobalEmitter.get());
			this.stopListeningTo($(document)); // for isGeneric
		},
	
	
		// Drag (high-level)
		// -----------------------------------------------------------------------------------------------------------------
	
	
		// extraOptions ignored if drag already started
		startDrag: function(ev, extraOptions) {
			this.startInteraction(ev, extraOptions); // ensure interaction began
	
			if (!this.isDragging) {
				this.isDragging = true;
				this.handleDragStart(ev);
			}
		},
	
	
		handleDragStart: function(ev) {
			this.trigger('dragStart', ev);
		},
	
	
		handleMove: function(ev) {
			var dx = getEvX(ev) - this.originX;
			var dy = getEvY(ev) - this.originY;
			var minDistance = this.minDistance;
			var distanceSq; // current distance from the origin, squared
	
			if (!this.isDistanceSurpassed) {
				distanceSq = dx * dx + dy * dy;
				if (distanceSq >= minDistance * minDistance) { // use pythagorean theorem
					this.handleDistanceSurpassed(ev);
				}
			}
	
			if (this.isDragging) {
				this.handleDrag(dx, dy, ev);
			}
		},
	
	
		// Called while the mouse is being moved and when we know a legitimate drag is taking place
		handleDrag: function(dx, dy, ev) {
			this.trigger('drag', dx, dy, ev);
			this.updateAutoScroll(ev); // will possibly cause scrolling
		},
	
	
		endDrag: function(ev) {
			if (this.isDragging) {
				this.isDragging = false;
				this.handleDragEnd(ev);
			}
		},
	
	
		handleDragEnd: function(ev) {
			this.trigger('dragEnd', ev);
		},
	
	
		// Delay
		// -----------------------------------------------------------------------------------------------------------------
	
	
		startDelay: function(initialEv) {
			var _this = this;
	
			if (this.delay) {
				this.delayTimeoutId = setTimeout(function() {
					_this.handleDelayEnd(initialEv);
				}, this.delay);
			}
			else {
				this.handleDelayEnd(initialEv);
			}
		},
	
	
		handleDelayEnd: function(initialEv) {
			this.isDelayEnded = true;
	
			if (this.isDistanceSurpassed) {
				this.startDrag(initialEv);
			}
		},
	
	
		// Distance
		// -----------------------------------------------------------------------------------------------------------------
	
	
		handleDistanceSurpassed: function(ev) {
			this.isDistanceSurpassed = true;
	
			if (this.isDelayEnded) {
				this.startDrag(ev);
			}
		},
	
	
		// Mouse / Touch
		// -----------------------------------------------------------------------------------------------------------------
	
	
		handleTouchMove: function(ev) {
	
			// prevent inertia and touchmove-scrolling while dragging
			if (this.isDragging && this.shouldCancelTouchScroll) {
				ev.preventDefault();
			}
	
			this.handleMove(ev);
		},
	
	
		handleMouseMove: function(ev) {
			this.handleMove(ev);
		},
	
	
		// Scrolling (unrelated to auto-scroll)
		// -----------------------------------------------------------------------------------------------------------------
	
	
		handleTouchScroll: function(ev) {
			// if the drag is being initiated by touch, but a scroll happens before
			// the drag-initiating delay is over, cancel the drag
			if (!this.isDragging || this.scrollAlwaysKills) {
				this.endInteraction(ev, true); // isCancelled=true
			}
		},
	
	
		// Utils
		// -----------------------------------------------------------------------------------------------------------------
	
	
		// Triggers a callback. Calls a function in the option hash of the same name.
		// Arguments beyond the first `name` are forwarded on.
		trigger: function(name) {
			if (this.options[name]) {
				this.options[name].apply(this, Array.prototype.slice.call(arguments, 1));
			}
			// makes _methods callable by event name. TODO: kill this
			if (this['_' + name]) {
				this['_' + name].apply(this, Array.prototype.slice.call(arguments, 1));
			}
		}
	
	
	});
	
	;;
	/*
	this.scrollEl is set in DragListener
	*/
	DragListener.mixin({
	
		isAutoScroll: false,
	
		scrollBounds: null, // { top, bottom, left, right }
		scrollTopVel: null, // pixels per second
		scrollLeftVel: null, // pixels per second
		scrollIntervalId: null, // ID of setTimeout for scrolling animation loop
	
		// defaults
		scrollSensitivity: 30, // pixels from edge for scrolling to start
		scrollSpeed: 200, // pixels per second, at maximum speed
		scrollIntervalMs: 50, // millisecond wait between scroll increment
	
	
		initAutoScroll: function() {
			var scrollEl = this.scrollEl;
	
			this.isAutoScroll =
				this.options.scroll &&
				scrollEl &&
				!scrollEl.is(window) &&
				!scrollEl.is(document);
	
			if (this.isAutoScroll) {
				// debounce makes sure rapid calls don't happen
				this.listenTo(scrollEl, 'scroll', debounce(this.handleDebouncedScroll, 100));
			}
		},
	
	
		destroyAutoScroll: function() {
			this.endAutoScroll(); // kill any animation loop
	
			// remove the scroll handler if there is a scrollEl
			if (this.isAutoScroll) {
				this.stopListeningTo(this.scrollEl, 'scroll'); // will probably get removed by unbindHandlers too :(
			}
		},
	
	
		// Computes and stores the bounding rectangle of scrollEl
		computeScrollBounds: function() {
			if (this.isAutoScroll) {
				this.scrollBounds = getOuterRect(this.scrollEl);
				// TODO: use getClientRect in future. but prevents auto scrolling when on top of scrollbars
			}
		},
	
	
		// Called when the dragging is in progress and scrolling should be updated
		updateAutoScroll: function(ev) {
			var sensitivity = this.scrollSensitivity;
			var bounds = this.scrollBounds;
			var topCloseness, bottomCloseness;
			var leftCloseness, rightCloseness;
			var topVel = 0;
			var leftVel = 0;
	
			if (bounds) { // only scroll if scrollEl exists
	
				// compute closeness to edges. valid range is from 0.0 - 1.0
				topCloseness = (sensitivity - (getEvY(ev) - bounds.top)) / sensitivity;
				bottomCloseness = (sensitivity - (bounds.bottom - getEvY(ev))) / sensitivity;
				leftCloseness = (sensitivity - (getEvX(ev) - bounds.left)) / sensitivity;
				rightCloseness = (sensitivity - (bounds.right - getEvX(ev))) / sensitivity;
	
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
				this.endAutoScroll();
			}
		},
	
	
		// Kills any existing scrolling animation loop
		endAutoScroll: function() {
			if (this.scrollIntervalId) {
				clearInterval(this.scrollIntervalId);
				this.scrollIntervalId = null;
	
				this.handleScrollEnd();
			}
		},
	
	
		// Get called when the scrollEl is scrolled (NOTE: this is delayed via debounce)
		handleDebouncedScroll: function() {
			// recompute all coordinates, but *only* if this is *not* part of our scrolling animation
			if (!this.scrollIntervalId) {
				this.handleScrollEnd();
			}
		},
	
	
		// Called when scrolling has stopped, whether through auto scroll, or the user scrolling
		handleScrollEnd: function() {
		}
	
	});
	;;
	
	/* Tracks mouse movements over a component and raises events about which hit the mouse is over.
	------------------------------------------------------------------------------------------------------------------------
	options:
	- subjectEl
	- subjectCenter
	*/
	
	var HitDragListener = DragListener.extend({
	
		component: null, // converts coordinates to hits
			// methods: hitsNeeded, hitsNotNeeded, queryHit
	
		origHit: null, // the hit the mouse was over when listening started
		hit: null, // the hit the mouse is over
		coordAdjust: null, // delta that will be added to the mouse coordinates when computing collisions
	
	
		constructor: function(component, options) {
			DragListener.call(this, options); // call the super-constructor
	
			this.component = component;
		},
	
	
		// Called when drag listening starts (but a real drag has not necessarily began).
		// ev might be undefined if dragging was started manually.
		handleInteractionStart: function(ev) {
			var subjectEl = this.subjectEl;
			var subjectRect;
			var origPoint;
			var point;
	
			this.component.hitsNeeded();
			this.computeScrollBounds(); // for autoscroll
	
			if (ev) {
				origPoint = { left: getEvX(ev), top: getEvY(ev) };
				point = origPoint;
	
				// constrain the point to bounds of the element being dragged
				if (subjectEl) {
					subjectRect = getOuterRect(subjectEl); // used for centering as well
					point = constrainPoint(point, subjectRect);
				}
	
				this.origHit = this.queryHit(point.left, point.top);
	
				// treat the center of the subject as the collision point?
				if (subjectEl && this.options.subjectCenter) {
	
					// only consider the area the subject overlaps the hit. best for large subjects.
					// TODO: skip this if hit didn't supply left/right/top/bottom
					if (this.origHit) {
						subjectRect = intersectRects(this.origHit, subjectRect) ||
							subjectRect; // in case there is no intersection
					}
	
					point = getRectCenter(subjectRect);
				}
	
				this.coordAdjust = diffPoints(point, origPoint); // point - origPoint
			}
			else {
				this.origHit = null;
				this.coordAdjust = null;
			}
	
			// call the super-method. do it after origHit has been computed
			DragListener.prototype.handleInteractionStart.apply(this, arguments);
		},
	
	
		// Called when the actual drag has started
		handleDragStart: function(ev) {
			var hit;
	
			DragListener.prototype.handleDragStart.apply(this, arguments); // call the super-method
	
			// might be different from this.origHit if the min-distance is large
			hit = this.queryHit(getEvX(ev), getEvY(ev));
	
			// report the initial hit the mouse is over
			// especially important if no min-distance and drag starts immediately
			if (hit) {
				this.handleHitOver(hit);
			}
		},
	
	
		// Called when the drag moves
		handleDrag: function(dx, dy, ev) {
			var hit;
	
			DragListener.prototype.handleDrag.apply(this, arguments); // call the super-method
	
			hit = this.queryHit(getEvX(ev), getEvY(ev));
	
			if (!isHitsEqual(hit, this.hit)) { // a different hit than before?
				if (this.hit) {
					this.handleHitOut();
				}
				if (hit) {
					this.handleHitOver(hit);
				}
			}
		},
	
	
		// Called when dragging has been stopped
		handleDragEnd: function() {
			this.handleHitDone();
			DragListener.prototype.handleDragEnd.apply(this, arguments); // call the super-method
		},
	
	
		// Called when a the mouse has just moved over a new hit
		handleHitOver: function(hit) {
			var isOrig = isHitsEqual(hit, this.origHit);
	
			this.hit = hit;
	
			this.trigger('hitOver', this.hit, isOrig, this.origHit);
		},
	
	
		// Called when the mouse has just moved out of a hit
		handleHitOut: function() {
			if (this.hit) {
				this.trigger('hitOut', this.hit);
				this.handleHitDone();
				this.hit = null;
			}
		},
	
	
		// Called after a hitOut. Also called before a dragStop
		handleHitDone: function() {
			if (this.hit) {
				this.trigger('hitDone', this.hit);
			}
		},
	
	
		// Called when the interaction ends, whether there was a real drag or not
		handleInteractionEnd: function() {
			DragListener.prototype.handleInteractionEnd.apply(this, arguments); // call the super-method
	
			this.origHit = null;
			this.hit = null;
	
			this.component.hitsNotNeeded();
		},
	
	
		// Called when scrolling has stopped, whether through auto scroll, or the user scrolling
		handleScrollEnd: function() {
			DragListener.prototype.handleScrollEnd.apply(this, arguments); // call the super-method
	
			// hits' absolute positions will be in new places after a user's scroll.
			// HACK for recomputing.
			if (this.isDragging) {
				this.component.releaseHits();
				this.component.prepareHits();
			}
		},
	
	
		// Gets the hit underneath the coordinates for the given mouse event
		queryHit: function(left, top) {
	
			if (this.coordAdjust) {
				left += this.coordAdjust.left;
				top += this.coordAdjust.top;
			}
	
			return this.component.queryHit(left, top);
		}
	
	});
	
	
	// Returns `true` if the hits are identically equal. `false` otherwise. Must be from the same component.
	// Two null values will be considered equal, as two "out of the component" states are the same.
	function isHitsEqual(hit0, hit1) {
	
		if (!hit0 && !hit1) {
			return true;
		}
	
		if (hit0 && hit1) {
			return hit0.component === hit1.component &&
				isHitPropsWithin(hit0, hit1) &&
				isHitPropsWithin(hit1, hit0); // ensures all props are identical
		}
	
		return false;
	}
	
	
	// Returns true if all of subHit's non-standard properties are within superHit
	function isHitPropsWithin(subHit, superHit) {
		for (var propName in subHit) {
			if (!/^(component|left|right|top|bottom)$/.test(propName)) {
				if (subHit[propName] !== superHit[propName]) {
					return false;
				}
			}
		}
		return true;
	}
	
	;;
	
	/*
	Listens to document and window-level user-interaction events, like touch events and mouse events,
	and fires these events as-is to whoever is observing a GlobalEmitter.
	Best when used as a singleton via GlobalEmitter.get()
	
	Normalizes mouse/touch events. For examples:
	- ignores the the simulated mouse events that happen after a quick tap: mousemove+mousedown+mouseup+click
	- compensates for various buggy scenarios where a touchend does not fire
	*/
	
	FC.touchMouseIgnoreWait = 500;
	
	var GlobalEmitter = Class.extend(ListenerMixin, EmitterMixin, {
	
		isTouching: false,
		mouseIgnoreDepth: 0,
		handleScrollProxy: null,
	
	
		bind: function() {
			var _this = this;
	
			this.listenTo($(document), {
				touchstart: this.handleTouchStart,
				touchcancel: this.handleTouchCancel,
				touchend: this.handleTouchEnd,
				mousedown: this.handleMouseDown,
				mousemove: this.handleMouseMove,
				mouseup: this.handleMouseUp,
				click: this.handleClick,
				selectstart: this.handleSelectStart,
				contextmenu: this.handleContextMenu
			});
	
			// because we need to call preventDefault
			// because https://www.chromestatus.com/features/5093566007214080
			// TODO: investigate performance because this is a global handler
			window.addEventListener(
				'touchmove',
				this.handleTouchMoveProxy = function(ev) {
					_this.handleTouchMove($.Event(ev));
				},
				{ passive: false } // allows preventDefault()
			);
	
			// attach a handler to get called when ANY scroll action happens on the page.
			// this was impossible to do with normal on/off because 'scroll' doesn't bubble.
			// http://stackoverflow.com/a/32954565/96342
			window.addEventListener(
				'scroll',
				this.handleScrollProxy = function(ev) {
					_this.handleScroll($.Event(ev));
				},
				true // useCapture
			);
		},
	
		unbind: function() {
			this.stopListeningTo($(document));
	
			window.removeEventListener(
				'touchmove',
				this.handleTouchMoveProxy
			);
	
			window.removeEventListener(
				'scroll',
				this.handleScrollProxy,
				true // useCapture
			);
		},
	
	
		// Touch Handlers
		// -----------------------------------------------------------------------------------------------------------------
	
		handleTouchStart: function(ev) {
	
			// if a previous touch interaction never ended with a touchend, then implicitly end it,
			// but since a new touch interaction is about to begin, don't start the mouse ignore period.
			this.stopTouch(ev, true); // skipMouseIgnore=true
	
			this.isTouching = true;
			this.trigger('touchstart', ev);
		},
	
		handleTouchMove: function(ev) {
			if (this.isTouching) {
				this.trigger('touchmove', ev);
			}
		},
	
		handleTouchCancel: function(ev) {
			if (this.isTouching) {
				this.trigger('touchcancel', ev);
	
				// Have touchcancel fire an artificial touchend. That way, handlers won't need to listen to both.
				// If touchend fires later, it won't have any effect b/c isTouching will be false.
				this.stopTouch(ev);
			}
		},
	
		handleTouchEnd: function(ev) {
			this.stopTouch(ev);
		},
	
	
		// Mouse Handlers
		// -----------------------------------------------------------------------------------------------------------------
	
		handleMouseDown: function(ev) {
			if (!this.shouldIgnoreMouse()) {
				this.trigger('mousedown', ev);
			}
		},
	
		handleMouseMove: function(ev) {
			if (!this.shouldIgnoreMouse()) {
				this.trigger('mousemove', ev);
			}
		},
	
		handleMouseUp: function(ev) {
			if (!this.shouldIgnoreMouse()) {
				this.trigger('mouseup', ev);
			}
		},
	
		handleClick: function(ev) {
			if (!this.shouldIgnoreMouse()) {
				this.trigger('click', ev);
			}
		},
	
	
		// Misc Handlers
		// -----------------------------------------------------------------------------------------------------------------
	
		handleSelectStart: function(ev) {
			this.trigger('selectstart', ev);
		},
	
		handleContextMenu: function(ev) {
			this.trigger('contextmenu', ev);
		},
	
		handleScroll: function(ev) {
			this.trigger('scroll', ev);
		},
	
	
		// Utils
		// -----------------------------------------------------------------------------------------------------------------
	
		stopTouch: function(ev, skipMouseIgnore) {
			if (this.isTouching) {
				this.isTouching = false;
				this.trigger('touchend', ev);
	
				if (!skipMouseIgnore) {
					this.startTouchMouseIgnore();
				}
			}
		},
	
		startTouchMouseIgnore: function() {
			var _this = this;
			var wait = FC.touchMouseIgnoreWait;
	
			if (wait) {
				this.mouseIgnoreDepth++;
				setTimeout(function() {
					_this.mouseIgnoreDepth--;
				}, wait);
			}
		},
	
		shouldIgnoreMouse: function() {
			return this.isTouching || Boolean(this.mouseIgnoreDepth);
		}
	
	});
	
	
	// Singleton
	// ---------------------------------------------------------------------------------------------------------------------
	
	(function() {
		var globalEmitter = null;
		var neededCount = 0;
	
	
		// gets the singleton
		GlobalEmitter.get = function() {
	
			if (!globalEmitter) {
				globalEmitter = new GlobalEmitter();
				globalEmitter.bind();
			}
	
			return globalEmitter;
		};
	
	
		// called when an object knows it will need a GlobalEmitter in the near future.
		GlobalEmitter.needed = function() {
			GlobalEmitter.get(); // ensures globalEmitter
			neededCount++;
		};
	
	
		// called when the object that originally called needed() doesn't need a GlobalEmitter anymore.
		GlobalEmitter.unneeded = function() {
			neededCount--;
	
			if (!neededCount) { // nobody else needs it
				globalEmitter.unbind();
				globalEmitter = null;
			}
		};
	
	})();
	
	;;
	
	/* Creates a clone of an element and lets it track the mouse as it moves
	----------------------------------------------------------------------------------------------------------------------*/
	
	var MouseFollower = Class.extend(ListenerMixin, {
	
		options: null,
	
		sourceEl: null, // the element that will be cloned and made to look like it is dragging
		el: null, // the clone of `sourceEl` that will track the mouse
		parentEl: null, // the element that `el` (the clone) will be attached to
	
		// the initial position of el, relative to the offset parent. made to match the initial offset of sourceEl
		top0: null,
		left0: null,
	
		// the absolute coordinates of the initiating touch/mouse action
		y0: null,
		x0: null,
	
		// the number of pixels the mouse has moved from its initial position
		topDelta: null,
		leftDelta: null,
	
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
	
				this.y0 = getEvY(ev);
				this.x0 = getEvX(ev);
				this.topDelta = 0;
				this.leftDelta = 0;
	
				if (!this.isHidden) {
					this.updatePosition();
				}
	
				if (getEvIsTouch(ev)) {
					this.listenTo($(document), 'touchmove', this.handleMove);
				}
				else {
					this.listenTo($(document), 'mousemove', this.handleMove);
				}
			}
		},
	
	
		// Causes the element to stop following the mouse. If shouldRevert is true, will animate back to original position.
		// `callback` gets invoked when the animation is complete. If no animation, it is invoked immediately.
		stop: function(shouldRevert, callback) {
			var _this = this;
			var revertDuration = this.options.revertDuration;
	
			function complete() { // might be called by .animate(), which might change `this` context
				_this.isAnimating = false;
				_this.removeElement();
	
				_this.top0 = _this.left0 = null; // reset state for future updatePosition calls
	
				if (callback) {
					callback();
				}
			}
	
			if (this.isFollowing && !this.isAnimating) { // disallow more than one stop animation at a time
				this.isFollowing = false;
	
				this.stopListeningTo($(document));
	
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
				el = this.el = this.sourceEl.clone()
					.addClass(this.options.additionalClass || '')
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
					});
	
				// we don't want long taps or any mouse interaction causing selection/menus.
				// would use preventSelection(), but that prevents selectstart, causing problems.
				el.addClass('fc-unselectable');
	
				el.appendTo(this.parentEl);
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
		handleMove: function(ev) {
			this.topDelta = getEvY(ev) - this.y0;
			this.leftDelta = getEvX(ev) - this.x0;
	
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
	
	var ChronoComponent = Model.extend({
	
		children: null,
	
		el: null, // the view's containing element. set by Calendar(?)
	
		// frequently accessed options
		isRTL: false,
		nextDayThreshold: null,
	
	
		constructor: function() {
			Model.call(this);
	
			this.children = [];
	
			this.nextDayThreshold = moment.duration(this.opt('nextDayThreshold'));
			this.isRTL = this.opt('isRTL');
		},
	
	
		addChild: function(chronoComponent) {
			this.children.push(chronoComponent);
		},
	
	
		// Options
		// -----------------------------------------------------------------------------------------------------------------
	
	
		opt: function(name) {
			// subclasses must implement
		},
	
	
		publiclyTrigger: function(/**/) {
			var calendar = this._getCalendar();
	
			return calendar.publiclyTrigger.apply(calendar, arguments);
		},
	
	
		hasPublicHandlers: function(/**/) {
			var calendar = this._getCalendar();
	
			return calendar.hasPublicHandlers.apply(calendar, arguments);
		},
	
	
		// Element
		// -----------------------------------------------------------------------------------------------------------------
	
	
		// Sets the container element that the view should render inside of, does global DOM-related initializations,
		// and renders all the non-date-related content inside.
		setElement: function(el) {
			this.el = el;
			this.bindGlobalHandlers();
			this.renderSkeleton();
		},
	
	
		// Removes the view's container element from the DOM, clearing any content beforehand.
		// Undoes any other DOM-related attachments.
		removeElement: function() {
			this.unrenderSkeleton();
			this.unbindGlobalHandlers();
	
			this.el.remove();
			// NOTE: don't null-out this.el in case the View was destroyed within an API callback.
			// We don't null-out the View's other jQuery element references upon destroy,
			//  so we shouldn't kill this.el either.
		},
	
	
		bindGlobalHandlers: function() {
		},
	
	
		unbindGlobalHandlers: function() {
		},
	
	
		// Skeleton
		// -----------------------------------------------------------------------------------------------------------------
	
	
		// Renders the basic structure of the view before any content is rendered
		renderSkeleton: function() {
			// subclasses should implement
		},
	
	
		// Unrenders the basic structure of the view
		unrenderSkeleton: function() {
			// subclasses should implement
		},
	
	
		// Date Low-level Rendering
		// -----------------------------------------------------------------------------------------------------------------
	
	
		// date-cell content only
		renderDates: function() {
			// subclasses should implement
		},
	
	
		// date-cell content only
		unrenderDates: function() {
			// subclasses should override
		},
	
	
		// Now-Indicator
		// -----------------------------------------------------------------------------------------------------------------
	
	
		// Returns a string unit, like 'second' or 'minute' that defined how often the current time indicator
		// should be refreshed. If something falsy is returned, no time indicator is rendered at all.
		getNowIndicatorUnit: function() {
			// subclasses should implement
		},
	
	
		// Renders a current time indicator at the given datetime
		renderNowIndicator: function(date) {
			this.callChildren('renderNowIndicator', date);
		},
	
	
		// Undoes the rendering actions from renderNowIndicator
		unrenderNowIndicator: function() {
			this.callChildren('unrenderNowIndicator');
		},
	
	
		// Business Hours
		// ---------------------------------------------------------------------------------------------------------------
	
	
		// Renders business-hours onto the view. Assumes updateSize has already been called.
		renderBusinessHours: function() {
			this.callChildren('renderBusinessHours');
		},
	
	
		// Unrenders previously-rendered business-hours
		unrenderBusinessHours: function() {
			this.callChildren('unrenderBusinessHours');
		},
	
	
		// Event Low-level Rendering
		// -----------------------------------------------------------------------------------------------------------------
	
	
		// Renders the events onto the view.
		// TODO: eventually rename to `renderEvents` once legacy is gone.
		renderEventsPayload: function(eventsPayload) {
			this.callChildren('renderEventsPayload', eventsPayload);
		},
	
	
		// Removes event elements from the view.
		unrenderEvents: function() {
			this.callChildren('unrenderEvents');
	
			// we DON'T need to call updateHeight() because
			// a renderEventsPayload() call always happens after this, which will eventually call updateHeight()
		},
	
	
		// Retrieves all segment objects that are rendered in the view
		getEventSegs: function() {
			var children = this.children;
			var segs = [];
			var i;
	
			for (i = 0; i < children.length; i++) {
				segs.push.apply( // append
					segs,
					children[i].getEventSegs()
				);
			}
	
			return segs;
		},
	
	
		// Drag-n-Drop Rendering (for both events and external elements)
		// ---------------------------------------------------------------------------------------------------------------
	
	
		// Renders a visual indication of a event or external-element drag over the given drop zone.
		// If an external-element, seg will be `null`.
		// Must return elements used for any mock events.
		renderDrag: function(eventFootprints, seg) {
			var dragEls = null;
			var children = this.children;
			var i;
			var childDragEls;
	
			for (i = 0; i < children.length; i++) {
				childDragEls = children[i].renderDrag(eventFootprints, seg);
	
				if (childDragEls) {
					if (!dragEls) {
						dragEls = childDragEls;
					}
					else {
						dragEls = dragEls.add(childDragEls);
					}
				}
			}
	
			return dragEls;
		},
	
	
		// Unrenders a visual indication of an event or external-element being dragged.
		unrenderDrag: function() {
			this.callChildren('unrenderDrag');
		},
	
	
		// Selection
		// ---------------------------------------------------------------------------------------------------------------
	
	
		// Renders a visual indication of the selection
		// TODO: rename to `renderSelection` after legacy is gone
		renderSelectionFootprint: function(componentFootprint) {
			this.callChildren('renderSelectionFootprint', componentFootprint);
		},
	
	
		// Unrenders a visual indication of selection
		unrenderSelection: function() {
			this.callChildren('unrenderSelection');
		},
	
	
		// Hit Areas
		// ---------------------------------------------------------------------------------------------------------------
	
	
		hitsNeeded: function() {
			this.callChildren('hitsNeeded');
		},
	
	
		hitsNotNeeded: function() {
			this.callChildren('hitsNotNeeded');
		},
	
	
		// Called before one or more queryHit calls might happen. Should prepare any cached coordinates for queryHit
		prepareHits: function() {
			this.callChildren('prepareHits');
		},
	
	
		// Called when queryHit calls have subsided. Good place to clear any coordinate caches.
		releaseHits: function() {
			this.callChildren('releaseHits');
		},
	
	
		// Given coordinates from the topleft of the document, return data about the date-related area underneath.
		// Can return an object with arbitrary properties (although top/right/left/bottom are encouraged).
		// Must have a `grid` property, a reference to this current grid. TODO: avoid this
		// The returned object will be processed by getHitFootprint and getHitEl.
		queryHit: function(leftOffset, topOffset) {
			var children = this.children;
			var i;
			var hit;
	
			for (i = 0; i < children.length; i++) {
				hit = children[i].queryHit(leftOffset, topOffset);
	
				if (hit) {
					break;
				}
			}
	
			return hit;
		},
	
	
	
		// Event Drag-n-Drop
		// ---------------------------------------------------------------------------------------------------------------
	
	
		// Computes if the given event is allowed to be dragged by the user
		isEventDefDraggable: function(eventDef) {
			return this.isEventDefStartEditable(eventDef);
		},
	
	
		isEventDefStartEditable: function(eventDef) {
			var isEditable = eventDef.isStartExplicitlyEditable();
	
			if (isEditable == null) {
				isEditable = this.opt('eventStartEditable');
	
				if (isEditable == null) {
					isEditable = this.isEventDefGenerallyEditable(eventDef);
				}
			}
	
			return isEditable;
		},
	
	
		isEventDefGenerallyEditable: function(eventDef) {
			var isEditable = eventDef.isExplicitlyEditable();
	
			if (isEditable == null) {
				isEditable = this.opt('editable');
			}
	
			return isEditable;
		},
	
	
		// Event Resizing
		// ---------------------------------------------------------------------------------------------------------------
	
	
		// Computes if the given event is allowed to be resized from its starting edge
		isEventDefResizableFromStart: function(eventDef) {
			return this.opt('eventResizableFromStart') && this.isEventDefResizable(eventDef);
		},
	
	
		// Computes if the given event is allowed to be resized from its ending edge
		isEventDefResizableFromEnd: function(eventDef) {
			return this.isEventDefResizable(eventDef);
		},
	
	
		// Computes if the given event is allowed to be resized by the user at all
		isEventDefResizable: function(eventDef) {
			var isResizable = eventDef.isDurationExplicitlyEditable();
	
			if (isResizable == null) {
				isResizable = this.opt('eventDurationEditable');
	
				if (isResizable == null) {
					isResizable = this.isEventDefGenerallyEditable(eventDef);
				}
			}
			return isResizable;
		},
	
	
		// Foreground Segment Rendering
		// ---------------------------------------------------------------------------------------------------------------
	
	
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
			var _this = this;
			var hasEventRenderHandlers = this.hasPublicHandlers('eventRender');
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
					var el = $(node);
	
					if (hasEventRenderHandlers) { // optimization
						el = _this.filterEventRenderEl(seg.footprint, el);
					}
	
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
	
	
		// Given an event and the default element used for rendering, returns the element that should actually be used.
		// Basically runs events and elements through the eventRender hook.
		filterEventRenderEl: function(eventFootprint, el) {
			var legacy = eventFootprint.getEventLegacy();
	
			var custom = this.publiclyTrigger('eventRender', {
				context: legacy,
				args: [ legacy, el, this._getView() ]
			});
	
			if (custom === false) { // means don't render at all
				el = null;
			}
			else if (custom && custom !== true) {
				el = $(custom);
			}
	
			return el;
		},
	
	
		// Navigation
		// ----------------------------------------------------------------------------------------------------------------
	
	
		// Generates HTML for an anchor to another view into the calendar.
		// Will either generate an <a> tag or a non-clickable <span> tag, depending on enabled settings.
		// `gotoOptions` can either be a moment input, or an object with the form:
		// { date, type, forceOff }
		// `type` is a view-type like "day" or "week". default value is "day".
		// `attrs` and `innerHtml` are use to generate the rest of the HTML tag.
		buildGotoAnchorHtml: function(gotoOptions, attrs, innerHtml) {
			var date, type, forceOff;
			var finalOptions;
	
			if ($.isPlainObject(gotoOptions)) {
				date = gotoOptions.date;
				type = gotoOptions.type;
				forceOff = gotoOptions.forceOff;
			}
			else {
				date = gotoOptions; // a single moment input
			}
			date = FC.moment(date); // if a string, parse it
	
			finalOptions = { // for serialization into the link
				date: date.format('YYYY-MM-DD'),
				type: type || 'day'
			};
	
			if (typeof attrs === 'string') {
				innerHtml = attrs;
				attrs = null;
			}
	
			attrs = attrs ? ' ' + attrsToStr(attrs) : ''; // will have a leading space
			innerHtml = innerHtml || '';
	
			if (!forceOff && this.opt('navLinks')) {
				return '<a' + attrs +
					' data-goto="' + htmlEscape(JSON.stringify(finalOptions)) + '">' +
					innerHtml +
					'</a>';
			}
			else {
				return '<span' + attrs + '>' +
					innerHtml +
					'</span>';
			}
		},
	
	
		// Date Formatting Utils
		// ---------------------------------------------------------------------------------------------------------------
	
	
		// Utility for formatting a range. Accepts a range object, formatting string, and optional separator.
		// Displays all-day ranges naturally, with an inclusive end. Takes the current isRTL into account.
		// The timezones of the dates within `range` will be respected.
		formatRange: function(range, isAllDay, formatStr, separator) {
			var end = range.end;
	
			if (isAllDay) {
				end = end.clone().subtract(1); // convert to inclusive. last ms of previous day
			}
	
			return formatRange(range.start, end, formatStr, separator, this.isRTL);
		},
	
	
		getAllDayHtml: function() {
			return this.opt('allDayHtml') || htmlEscape(this.opt('allDayText'));
		},
	
	
		// Computes HTML classNames for a single-day element
		getDayClasses: function(date, noThemeHighlight) {
			var view = this._getView();
			var classes = [];
			var today;
	
			if (!view.activeUnzonedRange.containsDate(date)) {
				classes.push('fc-disabled-day'); // TODO: jQuery UI theme?
			}
			else {
				classes.push('fc-' + dayIDs[date.day()]);
	
				if (view.isDateInOtherMonth(date)) { // TODO: use ChronoComponent subclass somehow
					classes.push('fc-other-month');
				}
	
				today = view.calendar.getNow();
	
				if (date.isSame(today, 'day')) {
					classes.push('fc-today');
	
					if (noThemeHighlight !== true) {
						classes.push(view.calendar.theme.getClass('today'));
					}
				}
				else if (date < today) {
					classes.push('fc-past');
				}
				else {
					classes.push('fc-future');
				}
			}
	
			return classes;
		},
	
	
		// Date Utils
		// ---------------------------------------------------------------------------------------------------------------
	
	
		// Returns the date range of the full days the given range visually appears to occupy.
		// Returns a plain object with start/end, NOT an UnzonedRange!
		computeDayRange: function(unzonedRange) {
			var calendar = this._getCalendar();
			var startDay = calendar.msToUtcMoment(unzonedRange.startMs, true); // the beginning of the day the range starts
			var end = calendar.msToUtcMoment(unzonedRange.endMs);
			var endTimeMS = +end.time(); // # of milliseconds into `endDay`
			var endDay = end.clone().stripTime(); // the beginning of the day the range exclusively ends
	
			// If the end time is actually inclusively part of the next day and is equal to or
			// beyond the next day threshold, adjust the end to be the exclusive end of `endDay`.
			// Otherwise, leaving it as inclusive will cause it to exclude `endDay`.
			if (endTimeMS && endTimeMS >= this.nextDayThreshold) {
				endDay.add(1, 'days');
			}
	
			// If end is within `startDay` but not past nextDayThreshold, assign the default duration of one day.
			if (endDay <= startDay) {
				endDay = startDay.clone().add(1, 'days');
			}
	
			return { start: startDay, end: endDay };
		},
	
	
		// Does the given range visually appear to occupy more than one day?
		isMultiDayRange: function(unzonedRange) {
			var dayRange = this.computeDayRange(unzonedRange);
	
			return dayRange.end.diff(dayRange.start, 'days') > 1;
		},
	
	
		// Utils
		// ---------------------------------------------------------------------------------------------------------------
	
	
		callChildren: function(methodName) {
			var args = Array.prototype.slice.call(arguments, 1);
			var children = this.children;
			var i, child;
	
			for (i = 0; i < children.length; i++) {
				child = children[i];
				child[methodName].apply(child, args);
			}
		},
	
	
		_getCalendar: function() { // TODO: strip out. move to generic parent.
			return this.calendar || this.view.calendar;
		},
	
	
		_getView: function() { // TODO: strip out. move to generic parent.
			return this.view;
		}
	
	});
	
	;;
	
	/* An abstract class comprised of a "grid" of areas that each represent a specific datetime
	----------------------------------------------------------------------------------------------------------------------
	Contains:
	- hit system
	- range->footprint->seg pipeline
	- initializing day click
	- initializing selection system
	- initializing mouse/touch handlers for everything
	- initializing event rendering-related options
	*/
	
	var Grid = FC.Grid = ChronoComponent.extend({
	
		// self-config, overridable by subclasses
		hasDayInteractions: true, // can user click/select ranges of time?
	
		view: null, // a View object
		isRTL: null, // shortcut to the view's isRTL option
	
		unzonedRange: null,
	
		hitsNeededDepth: 0, // necessary because multiple callers might need the same hits
	
		dayClickListener: null,
		daySelectListener: null,
		segDragListener: null,
		segResizeListener: null,
		externalDragListener: null,
	
	
		constructor: function(view) {
			this.view = view;
	
			ChronoComponent.call(this);
	
			this.initFillInternals();
	
			this.dayClickListener = this.buildDayClickListener();
			this.daySelectListener = this.buildDaySelectListener();
		},
	
	
		opt: function(name) {
			return this.view.opt(name);
		},
	
	
		/* Dates
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Tells the grid about what period of time to display.
		// Any date-related internal data should be generated.
		setRange: function(unzonedRange) {
			this.unzonedRange = unzonedRange;
	
			this.rangeUpdated();
			this.processRangeOptions();
		},
	
	
		// Called when internal variables that rely on the range should be updated
		rangeUpdated: function() {
		},
	
	
		// Updates values that rely on options and also relate to range
		processRangeOptions: function() {
			var displayEventTime;
			var displayEventEnd;
	
			this.eventTimeFormat = // for Grid.event-rendering.js
				this.opt('eventTimeFormat') ||
				this.opt('timeFormat') || // deprecated
				this.computeEventTimeFormat();
	
			displayEventTime = this.opt('displayEventTime');
			if (displayEventTime == null) {
				displayEventTime = this.computeDisplayEventTime(); // might be based off of range
			}
	
			displayEventEnd = this.opt('displayEventEnd');
			if (displayEventEnd == null) {
				displayEventEnd = this.computeDisplayEventEnd(); // might be based off of range
			}
	
			this.displayEventTime = displayEventTime;
			this.displayEventEnd = displayEventEnd;
		},
	
	
	
		/* Hit Area
		------------------------------------------------------------------------------------------------------------------*/
	
	
		hitsNeeded: function() {
			if (!(this.hitsNeededDepth++)) {
				this.prepareHits();
			}
		},
	
	
		hitsNotNeeded: function() {
			if (this.hitsNeededDepth && !(--this.hitsNeededDepth)) {
				this.releaseHits();
			}
		},
	
	
		getSafeHitFootprint: function(hit) {
			var footprint = this.getHitFootprint(hit);
	
			if (!this.view.activeUnzonedRange.containsRange(footprint.unzonedRange)) {
				return null;
			}
	
			return footprint;
		},
	
	
		getHitFootprint: function(hit) {
		},
	
	
		// Given position-level information about a date-related area within the grid,
		// should return a jQuery element that best represents it. passed to dayClick callback.
		getHitEl: function(hit) {
		},
	
	
		/* Rendering
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Sets the container element that the grid should render inside of.
		// Does other DOM-related initializations.
		setElement: function(el) {
			ChronoComponent.prototype.setElement.apply(this, arguments);
	
			if (this.hasDayInteractions) {
				preventSelection(el);
	
				this.bindDayHandler('touchstart', this.dayTouchStart);
				this.bindDayHandler('mousedown', this.dayMousedown);
			}
	
			// attach event-element-related handlers. in Grid.events
			// same garbage collection note as above.
			this.bindSegHandlers();
		},
	
	
		bindDayHandler: function(name, handler) {
			var _this = this;
	
			// attach a handler to the grid's root element.
			// jQuery will take care of unregistering them when removeElement gets called.
			this.el.on(name, function(ev) {
				if (
					!$(ev.target).is(
						_this.segSelector + ',' + // directly on an event element
						_this.segSelector + ' *,' + // within an event element
						'.fc-more,' + // a "more.." link
						'a[data-goto]' // a clickable nav link
					)
				) {
					return handler.call(_this, ev);
				}
			});
		},
	
	
		// Removes the grid's container element from the DOM. Undoes any other DOM-related attachments.
		// DOES NOT remove any content beforehand (doesn't clear events or call unrenderDates), unlike View
		removeElement: function() {
			ChronoComponent.prototype.removeElement.apply(this, arguments);
	
			this.clearDragListeners();
		},
	
	
		/* Handlers
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Binds DOM handlers to elements that reside outside the grid, such as the document
		bindGlobalHandlers: function() {
			ChronoComponent.prototype.bindGlobalHandlers.apply(this, arguments);
	
			this.listenTo($(document), {
				dragstart: this.externalDragStart, // jqui
				sortstart: this.externalDragStart // jqui
			});
		},
	
	
		// Unbinds DOM handlers from elements that reside outside the grid
		unbindGlobalHandlers: function() {
			ChronoComponent.prototype.unbindGlobalHandlers.apply(this, arguments);
	
			this.stopListeningTo($(document));
		},
	
	
		// Process a mousedown on an element that represents a day. For day clicking and selecting.
		dayMousedown: function(ev) {
	
			// HACK
			// This will still work even though bindDayHandler doesn't use GlobalEmitter.
			if (GlobalEmitter.get().shouldIgnoreMouse()) {
				return;
			}
	
			this.dayClickListener.startInteraction(ev);
	
			if (this.opt('selectable')) {
				this.daySelectListener.startInteraction(ev, {
					distance: this.opt('selectMinDistance')
				});
			}
		},
	
	
		dayTouchStart: function(ev) {
			var view = this.view;
			var selectLongPressDelay;
	
			// On iOS (and Android?) when a new selection is initiated overtop another selection,
			// the touchend never fires because the elements gets removed mid-touch-interaction (my theory).
			// HACK: simply don't allow this to happen.
			// ALSO: prevent selection when an *event* is already raised.
			if (view.isSelected || view.selectedEvent) {
				return;
			}
	
			selectLongPressDelay = this.opt('selectLongPressDelay');
			if (selectLongPressDelay == null) {
				selectLongPressDelay = this.opt('longPressDelay'); // fallback
			}
	
			this.dayClickListener.startInteraction(ev);
	
			if (this.opt('selectable')) {
				this.daySelectListener.startInteraction(ev, {
					delay: selectLongPressDelay
				});
			}
		},
	
	
		// Kills all in-progress dragging.
		// Useful for when public API methods that result in re-rendering are invoked during a drag.
		// Also useful for when touch devices misbehave and don't fire their touchend.
		clearDragListeners: function() {
			this.dayClickListener.endInteraction();
			this.daySelectListener.endInteraction();
	
			if (this.segDragListener) {
				this.segDragListener.endInteraction(); // will clear this.segDragListener
			}
			if (this.segResizeListener) {
				this.segResizeListener.endInteraction(); // will clear this.segResizeListener
			}
			if (this.externalDragListener) {
				this.externalDragListener.endInteraction(); // will clear this.externalDragListener
			}
		},
	
	
		/* Highlight
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders an emphasis on the given date range. Given a span (unzoned start/end and other misc data)
		renderHighlight: function(componentFootprint) {
			this.renderFill('highlight', this.componentFootprintToSegs(componentFootprint));
		},
	
	
		// Unrenders the emphasis on a date range
		unrenderHighlight: function() {
			this.unrenderFill('highlight');
		},
	
	
		/* Converting eventRange -> eventFootprint
		------------------------------------------------------------------------------------------------------------------*/
	
	
		eventRangesToEventFootprints: function(eventRanges) {
			var eventFootprints = [];
			var i;
	
			for (i = 0; i < eventRanges.length; i++) {
				eventFootprints.push.apply(eventFootprints,
					this.eventRangeToEventFootprints(eventRanges[i])
				);
			}
	
			return eventFootprints;
		},
	
	
		// Given an event's unzoned date range, return an array of eventSpan objects.
		// eventSpan - { start, end, isStart, isEnd, otherthings... }
		// Subclasses can override.
		// Subclasses are obligated to forward eventRange.isStart/isEnd to the resulting spans.
		// TODO: somehow more DRY with Calendar::eventRangeToEventFootprints
		eventRangeToEventFootprints: function(eventRange) {
			return [
				new EventFootprint(
					new ComponentFootprint(
						eventRange.unzonedRange,
						eventRange.eventDef.isAllDay()
					),
					eventRange.eventDef,
					eventRange.eventInstance // might not exist
				)
			];
		},
	
	
		/* Converting componentFootprint/eventFootprint -> segs
		------------------------------------------------------------------------------------------------------------------*/
	
	
		eventFootprintsToSegs: function(eventFootprints) {
			var segs = [];
			var i;
	
			for (i = 0; i < eventFootprints.length; i++) {
				segs.push.apply(segs,
					this.eventFootprintToSegs(eventFootprints[i])
				);
			}
	
			return segs;
		},
	
	
		// Given an event's span (unzoned start/end and other misc data), and the event itself,
		// slices into segments and attaches event-derived properties to them.
		// eventSpan - { start, end, isStart, isEnd, otherthings... }
		// constraintRange allow additional clipping. optional. eventually remove this.
		eventFootprintToSegs: function(eventFootprint, constraintRange) {
			var unzonedRange = eventFootprint.componentFootprint.unzonedRange;
			var segs;
			var i, seg;
	
			if (constraintRange) {
				unzonedRange = unzonedRange.intersect(constraintRange);
			}
	
			segs = this.componentFootprintToSegs(eventFootprint.componentFootprint);
	
			for (i = 0; i < segs.length; i++) {
				seg = segs[i];
	
				if (!unzonedRange.isStart) {
					seg.isStart = false;
				}
				if (!unzonedRange.isEnd) {
					seg.isEnd = false;
				}
	
				seg.footprint = eventFootprint;
				// TODO: rename to seg.eventFootprint
			}
	
			return segs;
		},
	
	
		componentFootprintToSegs: function(componentFootprint) {
			// subclasses must implement
		}
	
	});
	
	;;
	
	Grid.mixin({
	
		// Creates a listener that tracks the user's drag across day elements, for day clicking.
		buildDayClickListener: function() {
			var _this = this;
			var dayClickHit; // null if invalid dayClick
	
			var dragListener = new HitDragListener(this, {
				scroll: this.opt('dragScroll'),
				interactionStart: function() {
					dayClickHit = dragListener.origHit;
				},
				hitOver: function(hit, isOrig, origHit) {
					// if user dragged to another cell at any point, it can no longer be a dayClick
					if (!isOrig) {
						dayClickHit = null;
					}
				},
				hitOut: function() { // called before mouse moves to a different hit OR moved out of all hits
					dayClickHit = null;
				},
				interactionEnd: function(ev, isCancelled) {
					var componentFootprint;
	
					if (!isCancelled && dayClickHit) {
						componentFootprint = _this.getSafeHitFootprint(dayClickHit);
	
						if (componentFootprint) {
							_this.view.triggerDayClick(componentFootprint, _this.getHitEl(dayClickHit), ev);
						}
					}
				}
			});
	
			// because dayClickListener won't be called with any time delay, "dragging" will begin immediately,
			// which will kill any touchmoving/scrolling. Prevent this.
			dragListener.shouldCancelTouchScroll = false;
	
			dragListener.scrollAlwaysKills = true;
	
			return dragListener;
		}
	
	});
	
	;;
	
	Grid.mixin({
	
		// Creates a listener that tracks the user's drag across day elements, for day selecting.
		buildDaySelectListener: function() {
			var _this = this;
			var selectionFootprint; // null if invalid selection
	
			var dragListener = new HitDragListener(this, {
				scroll: this.opt('dragScroll'),
				interactionStart: function() {
					selectionFootprint = null;
				},
				dragStart: function() {
					_this.view.unselect(); // since we could be rendering a new selection, we want to clear any old one
				},
				hitOver: function(hit, isOrig, origHit) {
					var origHitFootprint;
					var hitFootprint;
	
					if (origHit) { // click needs to have started on a hit
	
						origHitFootprint = _this.getSafeHitFootprint(origHit);
						hitFootprint = _this.getSafeHitFootprint(hit);
	
						if (origHitFootprint && hitFootprint) {
							selectionFootprint = _this.computeSelection(origHitFootprint, hitFootprint);
						}
						else {
							selectionFootprint = null;
						}
	
						if (selectionFootprint) {
							_this.renderSelectionFootprint(selectionFootprint);
						}
						else if (selectionFootprint === false) {
							disableCursor();
						}
					}
				},
				hitOut: function() { // called before mouse moves to a different hit OR moved out of all hits
					selectionFootprint = null;
					_this.unrenderSelection();
				},
				hitDone: function() { // called after a hitOut OR before a dragEnd
					enableCursor();
				},
				interactionEnd: function(ev, isCancelled) {
					if (!isCancelled && selectionFootprint) {
						// the selection will already have been rendered. just report it
						_this.view.reportSelection(selectionFootprint, ev);
					}
				}
			});
	
			return dragListener;
		},
	
	
		// Renders a visual indication of a selection. Will highlight by default but can be overridden by subclasses.
		// Given a span (unzoned start/end and other misc data)
		renderSelectionFootprint: function(componentFootprint) {
			this.renderHighlight(componentFootprint);
		},
	
	
		// Unrenders any visual indications of a selection. Will unrender a highlight by default.
		unrenderSelection: function() {
			this.unrenderHighlight();
		},
	
	
		// Given the first and last date-spans of a selection, returns another date-span object.
		// Subclasses can override and provide additional data in the span object. Will be passed to renderSelectionFootprint().
		// Will return false if the selection is invalid and this should be indicated to the user.
		// Will return null/undefined if a selection invalid but no error should be reported.
		computeSelection: function(footprint0, footprint1) {
			var wholeFootprint = this.computeSelectionFootprint(footprint0, footprint1);
	
			if (wholeFootprint && !this.isSelectionFootprintAllowed(wholeFootprint)) {
				return false;
			}
	
			return wholeFootprint;
		},
	
	
		// Given two spans, must return the combination of the two.
		// TODO: do this separation of concerns (combining VS validation) for event dnd/resize too.
		// Assumes both footprints are non-open-ended.
		computeSelectionFootprint: function(footprint0, footprint1) {
			var ms = [
				footprint0.unzonedRange.startMs,
				footprint0.unzonedRange.endMs,
				footprint1.unzonedRange.startMs,
				footprint1.unzonedRange.endMs
			];
	
			ms.sort(compareNumbers);
	
			return new ComponentFootprint(
				new UnzonedRange(ms[0], ms[3]),
				footprint0.isAllDay
			);
		},
	
	
		isSelectionFootprintAllowed: function(componentFootprint) {
			return this.view.validUnzonedRange.containsRange(componentFootprint.unzonedRange) &&
				this.view.calendar.isSelectionFootprintAllowed(componentFootprint);
		}
	
	});
	
	;;
	
	Grid.mixin({
	
		// Generates an array of classNames to be used for the rendering business hours overlay. Called by the fill system.
		// Called by fillSegHtml.
		businessHoursSegClasses: function(seg) {
			return [ 'fc-nonbusiness', 'fc-bgevent' ];
		},
	
	
		// Compute business hour segs for the grid's current date range.
		// Caller must ask if whole-day business hours are needed.
		buildBusinessHourSegs: function(wholeDay) {
			return this.eventFootprintsToSegs(
				this.buildBusinessHourEventFootprints(wholeDay)
			);
		},
	
	
		// Compute business hour *events* for the grid's current date range.
		// Caller must ask if whole-day business hours are needed.
		// FOR RENDERING
		buildBusinessHourEventFootprints: function(wholeDay) {
			var calendar = this.view.calendar;
	
			return this._buildBusinessHourEventFootprints(wholeDay, calendar.opt('businessHours'));
		},
	
	
		_buildBusinessHourEventFootprints: function(wholeDay, businessHourDef) {
			var calendar = this.view.calendar;
			var eventInstanceGroup;
			var eventRanges;
	
			eventInstanceGroup = calendar.buildBusinessInstanceGroup(
				wholeDay,
				businessHourDef,
				this.unzonedRange
			);
	
			if (eventInstanceGroup) {
				eventRanges = eventInstanceGroup.sliceRenderRanges(
					this.unzonedRange,
					calendar
				);
			}
			else {
				eventRanges = [];
			}
	
			return this.eventRangesToEventFootprints(eventRanges);
		}
	
	});
	
	;;
	
	Grid.mixin({
	
		segs: null, // the *event* segments currently rendered in the grid. TODO: rename to `eventSegs`
	
		// derived from options
		// TODO: move initialization from Grid.js
		eventTimeFormat: null,
		displayEventTime: null,
		displayEventEnd: null,
	
	
		// Generates the format string used for event time text, if not explicitly defined by 'timeFormat'
		computeEventTimeFormat: function() {
			return this.opt('smallTimeFormat');
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
	
	
		renderEventsPayload: function(eventsPayload) {
			var id, eventInstanceGroup;
			var eventRenderRanges;
			var eventFootprints;
			var eventSegs;
			var bgSegs = [];
			var fgSegs = [];
	
			for (id in eventsPayload) {
				eventInstanceGroup = eventsPayload[id];
	
				eventRenderRanges = eventInstanceGroup.sliceRenderRanges(this.view.activeUnzonedRange);
				eventFootprints = this.eventRangesToEventFootprints(eventRenderRanges);
				eventSegs = this.eventFootprintsToSegs(eventFootprints);
	
				if (eventInstanceGroup.getEventDef().hasBgRendering()) {
					bgSegs.push.apply(bgSegs, // append
						eventSegs
					);
				}
				else {
					fgSegs.push.apply(fgSegs, // append
						eventSegs
					);
				}
			}
	
			this.segs = [].concat( // record all segs
				this.renderBgSegs(bgSegs) || bgSegs,
				this.renderFgSegs(fgSegs) || fgSegs
			);
		},
	
	
		// Unrenders all events currently rendered on the grid
		unrenderEvents: function() {
			this.handleSegMouseout(); // trigger an eventMouseout if user's mouse is over an event
			this.clearDragListeners();
	
			this.unrenderFgSegs();
			this.unrenderBgSegs();
	
			this.segs = null;
		},
	
	
		// Retrieves all rendered segment objects currently rendered on the grid
		getEventSegs: function() {
			return this.segs || [];
		},
	
	
		// Background Segment Rendering
		// ---------------------------------------------------------------------------------------------------------------
		// TODO: move this to ChronoComponent, but without fill
	
	
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
			return this.filterEventRenderEl(seg.footprint, el);
		},
	
	
		// Generates an array of classNames to be used for the default rendering of a background event.
		// Called by fillSegHtml.
		bgEventSegClasses: function(seg) {
			var eventDef = seg.footprint.eventDef;
	
			return [ 'fc-bgevent' ].concat(
				eventDef.className,
				eventDef.source.className
			);
		},
	
	
		// Generates a semicolon-separated CSS string to be used for the default rendering of a background event.
		// Called by fillSegHtml.
		bgEventSegCss: function(seg) {
			return {
				'background-color': this.getSegSkinCss(seg)['background-color']
			};
		},
	
	
		/* Rendering Utils
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Compute the text that should be displayed on an event's element.
		// `range` can be the Event object itself, or something range-like, with at least a `start`.
		// If event times are disabled, or the event has no time, will return a blank string.
		// If not specified, formatStr will default to the eventTimeFormat setting,
		// and displayEnd will default to the displayEventEnd setting.
		getEventTimeText: function(eventFootprint, formatStr, displayEnd) {
			return this._getEventTimeText(
				eventFootprint.eventInstance.dateProfile.start,
				eventFootprint.eventInstance.dateProfile.end,
				eventFootprint.componentFootprint.isAllDay,
				formatStr,
				displayEnd
			);
		},
	
	
		_getEventTimeText: function(start, end, isAllDay, formatStr, displayEnd) {
	
			if (formatStr == null) {
				formatStr = this.eventTimeFormat;
			}
	
			if (displayEnd == null) {
				displayEnd = this.displayEventEnd;
			}
	
			if (this.displayEventTime && !isAllDay) {
				if (displayEnd && end) {
					return this.view.formatRange(
						{ start: start, end: end },
						false, // allDay
						formatStr
					);
				}
				else {
					return start.format(formatStr);
				}
			}
	
			return '';
		},
	
	
		// Generic utility for generating the HTML classNames for an event segment's element
		getSegClasses: function(seg, isDraggable, isResizable) {
			var view = this.view;
			var classes = [
				'fc-event',
				seg.isStart ? 'fc-start' : 'fc-not-start',
				seg.isEnd ? 'fc-end' : 'fc-not-end'
			].concat(this.getSegCustomClasses(seg));
	
			if (isDraggable) {
				classes.push('fc-draggable');
			}
			if (isResizable) {
				classes.push('fc-resizable');
			}
	
			// event is currently selected? attach a className.
			if (view.isEventDefSelected(seg.footprint.eventDef)) {
				classes.push('fc-selected');
			}
	
			return classes;
		},
	
	
		// List of classes that were defined by the caller of the API in some way
		getSegCustomClasses: function(seg) {
			var eventDef = seg.footprint.eventDef;
	
			return [].concat(
				eventDef.className, // guaranteed to be an array
				eventDef.source.className
			);
		},
	
	
		// Utility for generating event skin-related CSS properties
		getSegSkinCss: function(seg) {
			return {
				'background-color': this.getSegBackgroundColor(seg),
				'border-color': this.getSegBorderColor(seg),
				color: this.getSegTextColor(seg)
			};
		},
	
	
		// Queries for caller-specified color, then falls back to default
		getSegBackgroundColor: function(seg) {
			var eventDef = seg.footprint.eventDef;
	
			return eventDef.backgroundColor ||
				eventDef.color ||
				this.getSegDefaultBackgroundColor(seg);
		},
	
	
		getSegDefaultBackgroundColor: function(seg) {
			var source = seg.footprint.eventDef.source;
	
			return source.backgroundColor ||
				source.color ||
				this.opt('eventBackgroundColor') ||
				this.opt('eventColor');
		},
	
	
		// Queries for caller-specified color, then falls back to default
		getSegBorderColor: function(seg) {
			var eventDef = seg.footprint.eventDef;
	
			return eventDef.borderColor ||
				eventDef.color ||
				this.getSegDefaultBorderColor(seg);
		},
	
	
		getSegDefaultBorderColor: function(seg) {
			var source = seg.footprint.eventDef.source;
	
			return source.borderColor ||
				source.color ||
				this.opt('eventBorderColor') ||
				this.opt('eventColor');
		},
	
	
		// Queries for caller-specified color, then falls back to default
		getSegTextColor: function(seg) {
			var eventDef = seg.footprint.eventDef;
	
			return eventDef.textColor ||
				this.getSegDefaultTextColor(seg);
		},
	
	
		getSegDefaultTextColor: function(seg) {
			var source = seg.footprint.eventDef.source;
	
			return source.textColor ||
				this.opt('eventTextColor');
		},
	
	
		sortEventSegs: function(segs) {
			segs.sort(proxy(this, 'compareEventSegs'));
		},
	
	
		// A cmp function for determining which segments should take visual priority
		compareEventSegs: function(seg1, seg2) {
			var f1 = seg1.footprint.componentFootprint;
			var r1 = f1.unzonedRange;
			var f2 = seg2.footprint.componentFootprint;
			var r2 = f2.unzonedRange;
	
			return r1.startMs - r2.startMs || // earlier events go first
				(r2.endMs - r2.startMs) - (r1.endMs - r1.startMs) || // tie? longer events go first
				f2.isAllDay - f1.isAllDay || // tie? put all-day events first (booleans cast to 0/1)
				compareByFieldSpecs(
					seg1.footprint.eventDef,
					seg2.footprint.eventDef,
					this.view.eventOrderSpecs
				);
		}
	
	});
	
	;;
	
	/*
	Contains:
	- event clicking/mouseover/mouseout
	- things that are common to event dragging AND resizing
	- event helper rendering
	*/
	Grid.mixin({
	
		// self-config, overridable by subclasses
		segSelector: '.fc-event-container > *', // what constitutes an event element?
	
		mousedOverSeg: null, // the segment object the user's mouse is over. null if over nothing
	
		// if defined, holds the unit identified (ex: "year" or "month") that determines the level of granularity
		// of the date areas. if not defined, assumes to be day and time granularity.
		// TODO: port isTimeScale into same system?
		largeUnit: null,
	
	
		// Diffs the two dates, returning a duration, based on granularity of the grid
		// TODO: port isTimeScale into this system?
		diffDates: function(a, b) {
			if (this.largeUnit) {
				return diffByUnit(a, b, this.largeUnit);
			}
			else {
				return diffDayTime(a, b);
			}
		},
	
	
		// Attaches event-element-related handlers for *all* rendered event segments of the view.
		bindSegHandlers: function() {
			this.bindSegHandlersToEl(this.el);
		},
	
	
		// Attaches event-element-related handlers to an arbitrary container element. leverages bubbling.
		bindSegHandlersToEl: function(el) {
			this.bindSegHandlerToEl(el, 'touchstart', this.handleSegTouchStart);
			this.bindSegHandlerToEl(el, 'mouseenter', this.handleSegMouseover);
			this.bindSegHandlerToEl(el, 'mouseleave', this.handleSegMouseout);
			this.bindSegHandlerToEl(el, 'mousedown', this.handleSegMousedown);
			this.bindSegHandlerToEl(el, 'click', this.handleSegClick);
		},
	
	
		// Executes a handler for any a user-interaction on a segment.
		// Handler gets called with (seg, ev), and with the `this` context of the Grid
		bindSegHandlerToEl: function(el, name, handler) {
			var _this = this;
	
			el.on(name, this.segSelector, function(ev) {
				var seg = $(this).data('fc-seg'); // grab segment data. put there by View::renderEventsPayload
	
				// only call the handlers if there is not a drag/resize in progress
				if (seg && !_this.isDraggingSeg && !_this.isResizingSeg) {
					return handler.call(_this, seg, ev); // context will be the Grid
				}
			});
		},
	
	
		handleSegClick: function(seg, ev) {
			var res = this.publiclyTrigger('eventClick', { // can return `false` to cancel
				context: seg.el[0],
				args: [ seg.footprint.getEventLegacy(), ev, this.view ]
			});
	
			if (res === false) {
				ev.preventDefault();
			}
		},
	
	
		// Updates internal state and triggers handlers for when an event element is moused over
		handleSegMouseover: function(seg, ev) {
			if (
				!GlobalEmitter.get().shouldIgnoreMouse() &&
				!this.mousedOverSeg
			) {
				this.mousedOverSeg = seg;
	
				if (this.view.isEventDefResizable(seg.footprint.eventDef)) {
					seg.el.addClass('fc-allow-mouse-resize');
				}
	
				this.publiclyTrigger('eventMouseover', {
					context: seg.el[0],
					args: [ seg.footprint.getEventLegacy(), ev, this.view ]
				});
			}
		},
	
	
		// Updates internal state and triggers handlers for when an event element is moused out.
		// Can be given no arguments, in which case it will mouseout the segment that was previously moused over.
		handleSegMouseout: function(seg, ev) {
			ev = ev || {}; // if given no args, make a mock mouse event
	
			if (this.mousedOverSeg) {
				seg = seg || this.mousedOverSeg; // if given no args, use the currently moused-over segment
				this.mousedOverSeg = null;
	
				if (this.view.isEventDefResizable(seg.footprint.eventDef)) {
					seg.el.removeClass('fc-allow-mouse-resize');
				}
	
				this.publiclyTrigger('eventMouseout', {
					context: seg.el[0],
					args: [ seg.footprint.getEventLegacy(), ev, this.view ]
				});
			}
		},
	
	
		handleSegMousedown: function(seg, ev) {
			var isResizing = this.startSegResize(seg, ev, { distance: 5 });
	
			if (!isResizing && this.view.isEventDefDraggable(seg.footprint.eventDef)) {
				this.buildSegDragListener(seg)
					.startInteraction(ev, {
						distance: 5
					});
			}
		},
	
	
		handleSegTouchStart: function(seg, ev) {
			var view = this.view;
			var eventDef = seg.footprint.eventDef;
			var isSelected = view.isEventDefSelected(eventDef);
			var isDraggable = view.isEventDefDraggable(eventDef);
			var isResizable = view.isEventDefResizable(eventDef);
			var isResizing = false;
			var dragListener;
			var eventLongPressDelay;
	
			if (isSelected && isResizable) {
				// only allow resizing of the event is selected
				isResizing = this.startSegResize(seg, ev);
			}
	
			if (!isResizing && (isDraggable || isResizable)) { // allowed to be selected?
	
				eventLongPressDelay = this.opt('eventLongPressDelay');
				if (eventLongPressDelay == null) {
					eventLongPressDelay = this.opt('longPressDelay'); // fallback
				}
	
				dragListener = isDraggable ?
					this.buildSegDragListener(seg) :
					this.buildSegSelectListener(seg); // seg isn't draggable, but still needs to be selected
	
				dragListener.startInteraction(ev, { // won't start if already started
					delay: isSelected ? 0 : eventLongPressDelay // do delay if not already selected
				});
			}
		},
	
	
		// seg isn't draggable, but let's use a generic DragListener
		// simply for the delay, so it can be selected.
		// Has side effect of setting/unsetting `segDragListener`
		buildSegSelectListener: function(seg) {
			var _this = this;
			var view = this.view;
			var eventDef = seg.footprint.eventDef;
			var eventInstance = seg.footprint.eventInstance; // null for inverse-background events
	
			if (this.segDragListener) {
				return this.segDragListener;
			}
	
			var dragListener = this.segDragListener = new DragListener({
				dragStart: function(ev) {
					if (
						dragListener.isTouch &&
						!view.isEventDefSelected(eventDef) &&
						eventInstance
					) {
						// if not previously selected, will fire after a delay. then, select the event
						view.selectEventInstance(eventInstance);
					}
				},
				interactionEnd: function(ev) {
					_this.segDragListener = null;
				}
			});
	
			return dragListener;
		},
	
	
		// is it allowed, in relation to the view's validRange?
		// NOTE: very similar to isExternalInstanceGroupAllowed
		isEventInstanceGroupAllowed: function(eventInstanceGroup) {
			var eventFootprints = this.eventRangesToEventFootprints(eventInstanceGroup.getAllEventRanges());
			var i;
	
			for (i = 0; i < eventFootprints.length; i++) {
				// TODO: just use getAllEventRanges directly
				if (!this.view.validUnzonedRange.containsRange(eventFootprints[i].componentFootprint.unzonedRange)) {
					return false;
				}
			}
	
			return this.view.calendar.isEventInstanceGroupAllowed(eventInstanceGroup);
		},
	
	
		/* Event Helper
		------------------------------------------------------------------------------------------------------------------*/
		// TODO: should probably move this to Grid.events, like we did event dragging / resizing
	
	
		renderHelperEventFootprints: function(eventFootprints, sourceSeg) {
			return this.renderHelperEventFootprintEls(eventFootprints, sourceSeg)
				.addClass('fc-helper');
		},
	
	
		renderHelperEventFootprintEls: function(eventFootprints, sourceSeg) {
			// Subclasses must implement.
			// Must return all mock event elements.
		},
	
	
		// Unrenders a mock event
		// TODO: have this in ChronoComponent
		unrenderHelper: function() {
			// subclasses must implement
		},
	
	
		fabricateEventFootprint: function(componentFootprint) {
			var calendar = this.view.calendar;
			var eventDateProfile = calendar.footprintToDateProfile(componentFootprint);
			var dummyEvent = new SingleEventDef(new EventSource(calendar));
			var dummyInstance;
	
			dummyEvent.dateProfile = eventDateProfile;
			dummyInstance = dummyEvent.buildInstance();
	
			return new EventFootprint(componentFootprint, dummyEvent, dummyInstance);
		}
	
	});
	
	;;
	
	/*
	Wired up via Grid.event-interation.js by calling
	buildSegDragListener
	*/
	Grid.mixin({
	
		isDraggingSeg: false, // is a segment being dragged? boolean
	
	
		// Builds a listener that will track user-dragging on an event segment.
		// Generic enough to work with any type of Grid.
		// Has side effect of setting/unsetting `segDragListener`
		buildSegDragListener: function(seg) {
			var _this = this;
			var view = this.view;
			var calendar = view.calendar;
			var eventManager = calendar.eventManager;
			var el = seg.el;
			var eventDef = seg.footprint.eventDef;
			var eventInstance = seg.footprint.eventInstance; // null for inverse-background events
			var isDragging;
			var mouseFollower; // A clone of the original element that will move with the mouse
			var eventDefMutation;
	
			if (this.segDragListener) {
				return this.segDragListener;
			}
	
			// Tracks mouse movement over the *view's* coordinate map. Allows dragging and dropping between subcomponents
			// of the view.
			var dragListener = this.segDragListener = new HitDragListener(view, {
				scroll: this.opt('dragScroll'),
				subjectEl: el,
				subjectCenter: true,
				interactionStart: function(ev) {
					seg.component = _this; // for renderDrag
					isDragging = false;
					mouseFollower = new MouseFollower(seg.el, {
						additionalClass: 'fc-dragging',
						parentEl: view.el,
						opacity: dragListener.isTouch ? null : _this.opt('dragOpacity'),
						revertDuration: _this.opt('dragRevertDuration'),
						zIndex: 2 // one above the .fc-view
					});
					mouseFollower.hide(); // don't show until we know this is a real drag
					mouseFollower.start(ev);
				},
				dragStart: function(ev) {
					if (
						dragListener.isTouch &&
						!view.isEventDefSelected(eventDef) &&
						eventInstance
					) {
						// if not previously selected, will fire after a delay. then, select the event
						view.selectEventInstance(eventInstance);
					}
					isDragging = true;
					_this.handleSegMouseout(seg, ev); // ensure a mouseout on the manipulated event has been reported
					_this.segDragStart(seg, ev);
					view.hideEventsWithId(eventDef.id); // hide all event segments. our mouseFollower will take over
				},
				hitOver: function(hit, isOrig, origHit) {
					var isAllowed = true;
					var origFootprint;
					var footprint;
					var mutatedEventInstanceGroup;
					var dragHelperEls;
	
					// starting hit could be forced (DayGrid.limit)
					if (seg.hit) {
						origHit = seg.hit;
					}
	
					// hit might not belong to this grid, so query origin grid
					origFootprint = origHit.component.getSafeHitFootprint(origHit);
					footprint = hit.component.getSafeHitFootprint(hit);
	
					if (origFootprint && footprint) {
						eventDefMutation = _this.computeEventDropMutation(origFootprint, footprint, eventDef);
	
						if (eventDefMutation) {
							mutatedEventInstanceGroup = eventManager.buildMutatedEventInstanceGroup(
								eventDef.id,
								eventDefMutation
							);
							isAllowed = _this.isEventInstanceGroupAllowed(mutatedEventInstanceGroup);
						}
						else {
							isAllowed = false;
						}
					}
					else {
						isAllowed = false;
					}
	
					if (!isAllowed) {
						eventDefMutation = null;
						disableCursor();
					}
	
					// if a valid drop location, have the subclass render a visual indication
					if (
						eventDefMutation &&
						(dragHelperEls = view.renderDrag(
							_this.eventRangesToEventFootprints(
								mutatedEventInstanceGroup.sliceRenderRanges(_this.unzonedRange, calendar)
							),
							seg
						))
					) {
						dragHelperEls.addClass('fc-dragging');
						if (!dragListener.isTouch) {
							_this.applyDragOpacity(dragHelperEls);
						}
	
						mouseFollower.hide(); // if the subclass is already using a mock event "helper", hide our own
					}
					else {
						mouseFollower.show(); // otherwise, have the helper follow the mouse (no snapping)
					}
	
					if (isOrig) {
						// needs to have moved hits to be a valid drop
						eventDefMutation = null;
					}
				},
				hitOut: function() { // called before mouse moves to a different hit OR moved out of all hits
					view.unrenderDrag(); // unrender whatever was done in renderDrag
					mouseFollower.show(); // show in case we are moving out of all hits
					eventDefMutation = null;
				},
				hitDone: function() { // Called after a hitOut OR before a dragEnd
					enableCursor();
				},
				interactionEnd: function(ev) {
					delete seg.component; // prevent side effects
	
					// do revert animation if hasn't changed. calls a callback when finished (whether animation or not)
					mouseFollower.stop(!eventDefMutation, function() {
						if (isDragging) {
							view.unrenderDrag();
							_this.segDragStop(seg, ev);
						}
	
						if (eventDefMutation) {
							// no need to re-show original, will rerender all anyways. esp important if eventRenderWait
							view.reportEventDrop(eventInstance, eventDefMutation, el, ev);
						}
						else {
							view.showEventsWithId(eventDef.id);
						}
					});
					_this.segDragListener = null;
				}
			});
	
			return dragListener;
		},
	
	
		// Called before event segment dragging starts
		segDragStart: function(seg, ev) {
			this.isDraggingSeg = true;
			this.publiclyTrigger('eventDragStart', {
				context: seg.el[0],
				args: [
					seg.footprint.getEventLegacy(),
					ev,
					{}, // jqui dummy
					this.view
				]
			});
		},
	
	
		// Called after event segment dragging stops
		segDragStop: function(seg, ev) {
			this.isDraggingSeg = false;
			this.publiclyTrigger('eventDragStop', {
				context: seg.el[0],
				args: [
					seg.footprint.getEventLegacy(),
					ev,
					{}, // jqui dummy
					this.view
				]
			});
		},
	
	
		// DOES NOT consider overlap/constraint
		computeEventDropMutation: function(startFootprint, endFootprint, eventDef) {
			var date0 = startFootprint.unzonedRange.getStart();
			var date1 = endFootprint.unzonedRange.getStart();
			var clearEnd = false;
			var forceTimed = false;
			var forceAllDay = false;
			var dateDelta;
			var dateMutation;
			var eventDefMutation;
	
			if (startFootprint.isAllDay !== endFootprint.isAllDay) {
				clearEnd = true;
	
				if (endFootprint.isAllDay) {
					forceAllDay = true;
					date0.stripTime();
				}
				else {
					forceTimed = true;
				}
			}
	
			dateDelta = this.diffDates(date1, date0);
	
			dateMutation = new EventDefDateMutation();
			dateMutation.clearEnd = clearEnd;
			dateMutation.forceTimed = forceTimed;
			dateMutation.forceAllDay = forceAllDay;
			dateMutation.setDateDelta(dateDelta);
	
			eventDefMutation = new EventDefMutation();
			eventDefMutation.setDateMutation(dateMutation);
	
			return eventDefMutation;
		},
	
	
		// Utility for apply dragOpacity to a jQuery set
		applyDragOpacity: function(els) {
			var opacity = this.opt('dragOpacity');
	
			if (opacity != null) {
				els.css('opacity', opacity);
			}
		}
	
	});
	
	;;
	
	/*
	Wired up via Grid.event-interation.js by calling
	startSegResize
	*/
	Grid.mixin({
	
		isResizingSeg: false, // is a segment being resized? boolean
	
	
		// returns boolean whether resizing actually started or not.
		// assumes the seg allows resizing.
		// `dragOptions` are optional.
		startSegResize: function(seg, ev, dragOptions) {
			if ($(ev.target).is('.fc-resizer')) {
				this.buildSegResizeListener(seg, $(ev.target).is('.fc-start-resizer'))
					.startInteraction(ev, dragOptions);
				return true;
			}
			return false;
		},
	
	
		// Creates a listener that tracks the user as they resize an event segment.
		// Generic enough to work with any type of Grid.
		buildSegResizeListener: function(seg, isStart) {
			var _this = this;
			var view = this.view;
			var calendar = view.calendar;
			var eventManager = calendar.eventManager;
			var el = seg.el;
			var eventDef = seg.footprint.eventDef;
			var eventInstance = seg.footprint.eventInstance;
			var isDragging;
			var resizeMutation; // zoned event date properties. falsy if invalid resize
	
			// Tracks mouse movement over the *grid's* coordinate map
			var dragListener = this.segResizeListener = new HitDragListener(this, {
				scroll: this.opt('dragScroll'),
				subjectEl: el,
				interactionStart: function() {
					isDragging = false;
				},
				dragStart: function(ev) {
					isDragging = true;
					_this.handleSegMouseout(seg, ev); // ensure a mouseout on the manipulated event has been reported
					_this.segResizeStart(seg, ev);
				},
				hitOver: function(hit, isOrig, origHit) {
					var isAllowed = true;
					var origHitFootprint = _this.getSafeHitFootprint(origHit);
					var hitFootprint = _this.getSafeHitFootprint(hit);
					var mutatedEventInstanceGroup;
	
					if (origHitFootprint && hitFootprint) {
						resizeMutation = isStart ?
							_this.computeEventStartResizeMutation(origHitFootprint, hitFootprint, seg.footprint) :
							_this.computeEventEndResizeMutation(origHitFootprint, hitFootprint, seg.footprint);
	
						if (resizeMutation) {
							mutatedEventInstanceGroup = eventManager.buildMutatedEventInstanceGroup(
								eventDef.id,
								resizeMutation
							);
							isAllowed = _this.isEventInstanceGroupAllowed(mutatedEventInstanceGroup);
						}
						else {
							isAllowed = false;
						}
					}
					else {
						isAllowed = false;
					}
	
					if (!isAllowed) {
						resizeMutation = null;
						disableCursor();
					}
					else if (resizeMutation.isEmpty()) {
						// no change. (FYI, event dates might have zones)
						resizeMutation = null;
					}
	
					if (resizeMutation) {
						view.hideEventsWithId(eventDef.id);
	
						_this.renderEventResize(
							_this.eventRangesToEventFootprints(
								mutatedEventInstanceGroup.sliceRenderRanges(_this.unzonedRange, calendar)
							),
							seg
						);
					}
				},
				hitOut: function() { // called before mouse moves to a different hit OR moved out of all hits
					resizeMutation = null;
					view.showEventsWithId(eventDef.id); // for when out-of-bounds. show original
				},
				hitDone: function() { // resets the rendering to show the original event
					_this.unrenderEventResize();
					enableCursor();
				},
				interactionEnd: function(ev) {
					if (isDragging) {
						_this.segResizeStop(seg, ev);
					}
	
					if (resizeMutation) { // valid date to resize to?
						// no need to re-show original, will rerender all anyways. esp important if eventRenderWait
						view.reportEventResize(eventInstance, resizeMutation, el, ev);
					}
					else {
						view.showEventsWithId(eventDef.id);
					}
					_this.segResizeListener = null;
				}
			});
	
			return dragListener;
		},
	
	
		// Called before event segment resizing starts
		segResizeStart: function(seg, ev) {
			this.isResizingSeg = true;
			this.publiclyTrigger('eventResizeStart', {
				context: seg.el[0],
				args: [
					seg.footprint.getEventLegacy(),
					ev,
					{}, // jqui dummy
					this.view
				]
			});
		},
	
	
		// Called after event segment resizing stops
		segResizeStop: function(seg, ev) {
			this.isResizingSeg = false;
			this.publiclyTrigger('eventResizeStop', {
				context: seg.el[0],
				args: [
					seg.footprint.getEventLegacy(),
					ev,
					{}, // jqui dummy
					this.view
				]
			});
		},
	
	
		// Returns new date-information for an event segment being resized from its start
		computeEventStartResizeMutation: function(startFootprint, endFootprint, origEventFootprint) {
			var origRange = origEventFootprint.componentFootprint.unzonedRange;
			var startDelta = this.diffDates(
				endFootprint.unzonedRange.getStart(),
				startFootprint.unzonedRange.getStart()
			);
			var dateMutation;
			var eventDefMutation;
	
			if (origRange.getStart().add(startDelta) < origRange.getEnd()) {
	
				dateMutation = new EventDefDateMutation();
				dateMutation.setStartDelta(startDelta);
	
				eventDefMutation = new EventDefMutation();
				eventDefMutation.setDateMutation(dateMutation);
	
				return eventDefMutation;
			}
	
			return false;
		},
	
	
		// Returns new date-information for an event segment being resized from its end
		computeEventEndResizeMutation: function(startFootprint, endFootprint, origEventFootprint) {
			var origRange = origEventFootprint.componentFootprint.unzonedRange;
			var endDelta = this.diffDates(
				endFootprint.unzonedRange.getEnd(),
				startFootprint.unzonedRange.getEnd()
			);
			var dateMutation;
			var eventDefMutation;
	
			if (origRange.getEnd().add(endDelta) > origRange.getStart()) {
	
				dateMutation = new EventDefDateMutation();
				dateMutation.setEndDelta(endDelta);
	
				eventDefMutation = new EventDefMutation();
				eventDefMutation.setDateMutation(dateMutation);
	
				return eventDefMutation;
			}
	
			return false;
		},
	
	
		// Renders a visual indication of an event being resized.
		// Must return elements used for any mock events.
		renderEventResize: function(eventFootprints, seg) {
			// subclasses must implement
		},
	
	
		// Unrenders a visual indication of an event being resized.
		unrenderEventResize: function() {
			// subclasses must implement
		}
	
	});
	
	;;
	
	/*
	Wired up via Grid.js by calling
	externalDragStart
	*/
	Grid.mixin({
	
		isDraggingExternal: false, // jqui-dragging an external element? boolean
	
	
		// Called when a jQuery UI drag is initiated anywhere in the DOM
		externalDragStart: function(ev, ui) {
			var el;
			var accept;
	
			if (this.opt('droppable')) { // only listen if this setting is on
				el = $((ui ? ui.item : null) || ev.target);
	
				// Test that the dragged element passes the dropAccept selector or filter function.
				// FYI, the default is "*" (matches all)
				accept = this.opt('dropAccept');
				if ($.isFunction(accept) ? accept.call(el[0], el) : el.is(accept)) {
					if (!this.isDraggingExternal) { // prevent double-listening if fired twice
						this.listenToExternalDrag(el, ev, ui);
					}
				}
			}
		},
	
	
		// Called when a jQuery UI drag starts and it needs to be monitored for dropping
		listenToExternalDrag: function(el, ev, ui) {
			var _this = this;
			var view = this.view;
			var meta = getDraggedElMeta(el); // extra data about event drop, including possible event to create
			var singleEventDef; // a null value signals an unsuccessful drag
	
			// listener that tracks mouse movement over date-associated pixel regions
			var dragListener = _this.externalDragListener = new HitDragListener(this, {
				interactionStart: function() {
					_this.isDraggingExternal = true;
				},
				hitOver: function(hit) {
					var isAllowed = true;
					var hitFootprint = hit.component.getSafeHitFootprint(hit); // hit might not belong to this grid
					var mutatedEventInstanceGroup;
	
					if (hitFootprint) {
						singleEventDef = _this.computeExternalDrop(hitFootprint, meta);
	
						if (singleEventDef) {
							mutatedEventInstanceGroup = new EventInstanceGroup(
								singleEventDef.buildInstances()
							);
							isAllowed = meta.eventProps ? // isEvent?
								_this.isEventInstanceGroupAllowed(mutatedEventInstanceGroup) :
								_this.isExternalInstanceGroupAllowed(mutatedEventInstanceGroup);
						}
						else {
							isAllowed = false;
						}
					}
					else {
						isAllowed = false;
					}
	
					if (!isAllowed) {
						singleEventDef = null;
						disableCursor();
					}
	
					if (singleEventDef) {
						_this.renderDrag( // called without a seg parameter
							_this.eventRangesToEventFootprints(
								mutatedEventInstanceGroup.sliceRenderRanges(_this.unzonedRange, view.calendar)
							)
						);
					}
				},
				hitOut: function() {
					singleEventDef = null; // signal unsuccessful
				},
				hitDone: function() { // Called after a hitOut OR before a dragEnd
					enableCursor();
					_this.unrenderDrag();
				},
				interactionEnd: function(ev) {
	
					if (singleEventDef) { // element was dropped on a valid hit
						view.reportExternalDrop(
							singleEventDef,
							Boolean(meta.eventProps), // isEvent
							Boolean(meta.stick), // isSticky
							el, ev, ui
						);
					}
	
					_this.isDraggingExternal = false;
					_this.externalDragListener = null;
				}
			});
	
			dragListener.startDrag(ev); // start listening immediately
		},
	
	
		// Given a hit to be dropped upon, and misc data associated with the jqui drag (guaranteed to be a plain object),
		// returns the zoned start/end dates for the event that would result from the hypothetical drop. end might be null.
		// Returning a null value signals an invalid drop hit.
		// DOES NOT consider overlap/constraint.
		// Assumes both footprints are non-open-ended.
		computeExternalDrop: function(componentFootprint, meta) {
			var calendar = this.view.calendar;
			var start = FC.moment.utc(componentFootprint.unzonedRange.startMs).stripZone();
			var end;
			var eventDef;
	
			if (componentFootprint.isAllDay) {
				// if dropped on an all-day span, and element's metadata specified a time, set it
				if (meta.startTime) {
					start.time(meta.startTime);
				}
				else {
					start.stripTime();
				}
			}
	
			if (meta.duration) {
				end = start.clone().add(meta.duration);
			}
	
			start = calendar.applyTimezone(start);
	
			if (end) {
				end = calendar.applyTimezone(end);
			}
	
			eventDef = SingleEventDef.parse(
				$.extend({}, meta.eventProps, {
					start: start,
					end: end
				}),
				new EventSource(calendar)
			);
	
			return eventDef;
		},
	
	
		// NOTE: very similar to isEventInstanceGroupAllowed
		// when it's a completely anonymous external drag, no event.
		isExternalInstanceGroupAllowed: function(eventInstanceGroup) {
			var calendar = this.view.calendar;
			var eventFootprints = this.eventRangesToEventFootprints(eventInstanceGroup.getAllEventRanges());
			var i;
	
			for (i = 0; i < eventFootprints.length; i++) {
				if (!this.view.validUnzonedRange.containsRange(eventFootprints[i].componentFootprint.unzonedRange)) {
					return false;
				}
			}
	
			for (i = 0; i < eventFootprints.length; i++) {
				// treat it as a selection
				// TODO: pass in eventInstanceGroup instead
				//  because we don't want calendar's constraint system to depend on a component's
				//  determination of footprints.
				if (!calendar.isSelectionFootprintAllowed(eventFootprints[i].componentFootprint)) {
					return false;
				}
			}
	
			return true;
		}
	
	});
	
	
	/* External-Dragging-Element Data
	----------------------------------------------------------------------------------------------------------------------*/
	
	// Require all HTML5 data-* attributes used by FullCalendar to have this prefix.
	// A value of '' will query attributes like data-event. A value of 'fc' will query attributes like data-fc-event.
	FC.dataAttrPrefix = '';
	
	// Given a jQuery element that might represent a dragged FullCalendar event, returns an intermediate data structure
	// to be used for Event Object creation.
	// A defined `.eventProps`, even when empty, indicates that an event should be created.
	function getDraggedElMeta(el) {
		var prefix = FC.dataAttrPrefix;
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
	
	Grid.mixin({
	
		/* Fill System (highlight, background events, business hours)
		--------------------------------------------------------------------------------------------------------------------
		TODO: remove this system. like we did in TimeGrid
		*/
	
	
		elsByFill: null, // a hash of jQuery element sets used for rendering each fill. Keyed by fill name.
	
	
		initFillInternals: function() {
			this.elsByFill = {};
		},
	
	
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
	
	
		// Builds the HTML needed for one fill segment. Generic enough to work with different types.
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
	
	
		// Generates an array of classNames for rendering the highlight. Used by the fill system.
		highlightSegClasses: function() {
			return [ 'fc-highlight' ];
		}
	
	});
	
	;;
	
	/*
	A set of rendering and date-related methods for a visual component comprised of one or more rows of day columns.
	Prerequisite: the object being mixed into needs to be a *Grid*
	*/
	var DayTableMixin = FC.DayTableMixin = {
	
		breakOnWeeks: false, // should create a new row for each week?
		dayDates: null, // whole-day dates for each column. left to right
		dayIndices: null, // for each day from start, the offset
		daysPerRow: null,
		rowCnt: null,
		colCnt: null,
		colHeadFormat: null,
	
	
		// Populates internal variables used for date calculation and rendering
		updateDayTable: function() {
			var view = this.view;
			var calendar = view.calendar;
			var date = calendar.msToUtcMoment(this.unzonedRange.startMs, true);
			var end = calendar.msToUtcMoment(this.unzonedRange.endMs, true);
			var dayIndex = -1;
			var dayIndices = [];
			var dayDates = [];
			var daysPerRow;
			var firstDay;
			var rowCnt;
	
			while (date.isBefore(end)) { // loop each day from start to end
				if (view.isHiddenDay(date)) {
					dayIndices.push(dayIndex + 0.5); // mark that it's between indices
				}
				else {
					dayIndex++;
					dayIndices.push(dayIndex);
					dayDates.push(date.clone());
				}
				date.add(1, 'days');
			}
	
			if (this.breakOnWeeks) {
				// count columns until the day-of-week repeats
				firstDay = dayDates[0].day();
				for (daysPerRow = 1; daysPerRow < dayDates.length; daysPerRow++) {
					if (dayDates[daysPerRow].day() == firstDay) {
						break;
					}
				}
				rowCnt = Math.ceil(dayDates.length / daysPerRow);
			}
			else {
				rowCnt = 1;
				daysPerRow = dayDates.length;
			}
	
			this.dayDates = dayDates;
			this.dayIndices = dayIndices;
			this.daysPerRow = daysPerRow;
			this.rowCnt = rowCnt;
	
			this.updateDayTableCols();
		},
	
	
		// Computes and assigned the colCnt property and updates any options that may be computed from it
		updateDayTableCols: function() {
			this.colCnt = this.computeColCnt();
			this.colHeadFormat = this.opt('columnFormat') || this.computeColHeadFormat();
		},
	
	
		// Determines how many columns there should be in the table
		computeColCnt: function() {
			return this.daysPerRow;
		},
	
	
		// Computes the ambiguously-timed moment for the given cell
		getCellDate: function(row, col) {
			return this.dayDates[
					this.getCellDayIndex(row, col)
				].clone();
		},
	
	
		// Computes the ambiguously-timed date range for the given cell
		getCellRange: function(row, col) {
			var start = this.getCellDate(row, col);
			var end = start.clone().add(1, 'days');
	
			return { start: start, end: end };
		},
	
	
		// Returns the number of day cells, chronologically, from the first of the grid (0-based)
		getCellDayIndex: function(row, col) {
			return row * this.daysPerRow + this.getColDayIndex(col);
		},
	
	
		// Returns the numner of day cells, chronologically, from the first cell in *any given row*
		getColDayIndex: function(col) {
			if (this.isRTL) {
				return this.colCnt - 1 - col;
			}
			else {
				return col;
			}
		},
	
	
		// Given a date, returns its chronolocial cell-index from the first cell of the grid.
		// If the date lies between cells (because of hiddenDays), returns a floating-point value between offsets.
		// If before the first offset, returns a negative number.
		// If after the last offset, returns an offset past the last cell offset.
		// Only works for *start* dates of cells. Will not work for exclusive end dates for cells.
		getDateDayIndex: function(date) {
			var dayIndices = this.dayIndices;
			var dayOffset = date.diff(this.dayDates[0], 'days');
	
			if (dayOffset < 0) {
				return dayIndices[0] - 1;
			}
			else if (dayOffset >= dayIndices.length) {
				return dayIndices[dayIndices.length - 1] + 1;
			}
			else {
				return dayIndices[dayOffset];
			}
		},
	
	
		/* Options
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Computes a default column header formatting string if `colFormat` is not explicitly defined
		computeColHeadFormat: function() {
			// if more than one week row, or if there are a lot of columns with not much space,
			// put just the day numbers will be in each cell
			if (this.rowCnt > 1 || this.colCnt > 10) {
				return 'ddd'; // "Sat"
			}
			// multiple days, so full single date string WON'T be in title text
			else if (this.colCnt > 1) {
				return this.opt('dayOfMonthFormat'); // "Sat 12/10"
			}
			// single day, so full single date string will probably be in title text
			else {
				return 'dddd'; // "Saturday"
			}
		},
	
	
		/* Slicing
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Slices up a date range into a segment for every week-row it intersects with
		sliceRangeByRow: function(unzonedRange) {
			var daysPerRow = this.daysPerRow;
			var normalRange = this.view.computeDayRange(unzonedRange); // make whole-day range, considering nextDayThreshold
			var rangeFirst = this.getDateDayIndex(normalRange.start); // inclusive first index
			var rangeLast = this.getDateDayIndex(normalRange.end.clone().subtract(1, 'days')); // inclusive last index
			var segs = [];
			var row;
			var rowFirst, rowLast; // inclusive day-index range for current row
			var segFirst, segLast; // inclusive day-index range for segment
	
			for (row = 0; row < this.rowCnt; row++) {
				rowFirst = row * daysPerRow;
				rowLast = rowFirst + daysPerRow - 1;
	
				// intersect segment's offset range with the row's
				segFirst = Math.max(rangeFirst, rowFirst);
				segLast = Math.min(rangeLast, rowLast);
	
				// deal with in-between indices
				segFirst = Math.ceil(segFirst); // in-between starts round to next cell
				segLast = Math.floor(segLast); // in-between ends round to prev cell
	
				if (segFirst <= segLast) { // was there any intersection with the current row?
					segs.push({
						row: row,
	
						// normalize to start of row
						firstRowDayIndex: segFirst - rowFirst,
						lastRowDayIndex: segLast - rowFirst,
	
						// must be matching integers to be the segment's start/end
						isStart: segFirst === rangeFirst,
						isEnd: segLast === rangeLast
					});
				}
			}
	
			return segs;
		},
	
	
		// Slices up a date range into a segment for every day-cell it intersects with.
		// TODO: make more DRY with sliceRangeByRow somehow.
		sliceRangeByDay: function(unzonedRange) {
			var daysPerRow = this.daysPerRow;
			var normalRange = this.view.computeDayRange(unzonedRange); // make whole-day range, considering nextDayThreshold
			var rangeFirst = this.getDateDayIndex(normalRange.start); // inclusive first index
			var rangeLast = this.getDateDayIndex(normalRange.end.clone().subtract(1, 'days')); // inclusive last index
			var segs = [];
			var row;
			var rowFirst, rowLast; // inclusive day-index range for current row
			var i;
			var segFirst, segLast; // inclusive day-index range for segment
	
			for (row = 0; row < this.rowCnt; row++) {
				rowFirst = row * daysPerRow;
				rowLast = rowFirst + daysPerRow - 1;
	
				for (i = rowFirst; i <= rowLast; i++) {
	
					// intersect segment's offset range with the row's
					segFirst = Math.max(rangeFirst, i);
					segLast = Math.min(rangeLast, i);
	
					// deal with in-between indices
					segFirst = Math.ceil(segFirst); // in-between starts round to next cell
					segLast = Math.floor(segLast); // in-between ends round to prev cell
	
					if (segFirst <= segLast) { // was there any intersection with the current row?
						segs.push({
							row: row,
	
							// normalize to start of row
							firstRowDayIndex: segFirst - rowFirst,
							lastRowDayIndex: segLast - rowFirst,
	
							// must be matching integers to be the segment's start/end
							isStart: segFirst === rangeFirst,
							isEnd: segLast === rangeLast
						});
					}
				}
			}
	
			return segs;
		},
	
	
		/* Header Rendering
		------------------------------------------------------------------------------------------------------------------*/
	
	
		renderHeadHtml: function() {
			var theme = this.view.calendar.theme;
	
			return '' +
				'<div class="fc-row ' + theme.getClass('headerRow') + '">' +
					'<table class="' + theme.getClass('tableGrid') + '">' +
						'<thead>' +
							this.renderHeadTrHtml() +
						'</thead>' +
					'</table>' +
				'</div>';
		},
	
	
		renderHeadIntroHtml: function() {
			return this.renderIntroHtml(); // fall back to generic
		},
	
	
		renderHeadTrHtml: function() {
			return '' +
				'<tr>' +
					(this.isRTL ? '' : this.renderHeadIntroHtml()) +
					this.renderHeadDateCellsHtml() +
					(this.isRTL ? this.renderHeadIntroHtml() : '') +
				'</tr>';
		},
	
	
		renderHeadDateCellsHtml: function() {
			var htmls = [];
			var col, date;
	
			for (col = 0; col < this.colCnt; col++) {
				date = this.getCellDate(0, col);
				htmls.push(this.renderHeadDateCellHtml(date));
			}
	
			return htmls.join('');
		},
	
	
		// TODO: when internalApiVersion, accept an object for HTML attributes
		// (colspan should be no different)
		renderHeadDateCellHtml: function(date, colspan, otherAttrs) {
			var view = this.view;
			var isDateValid = view.activeUnzonedRange.containsDate(date); // TODO: called too frequently. cache somehow.
			var classNames = [
				'fc-day-header',
				view.calendar.theme.getClass('widgetHeader')
			];
			var innerHtml = htmlEscape(date.format(this.colHeadFormat));
	
			// if only one row of days, the classNames on the header can represent the specific days beneath
			if (this.rowCnt === 1) {
				classNames = classNames.concat(
					// includes the day-of-week class
					// noThemeHighlight=true (don't highlight the header)
					this.getDayClasses(date, true)
				);
			}
			else {
				classNames.push('fc-' + dayIDs[date.day()]); // only add the day-of-week class
			}
	
			return '' +
	            '<th class="' + classNames.join(' ') + '"' +
					((isDateValid && this.rowCnt) === 1 ?
						' data-date="' + date.format('YYYY-MM-DD') + '"' :
						'') +
					(colspan > 1 ?
						' colspan="' + colspan + '"' :
						'') +
					(otherAttrs ?
						' ' + otherAttrs :
						'') +
					'>' +
					(isDateValid ?
						// don't make a link if the heading could represent multiple days, or if there's only one day (forceOff)
						view.buildGotoAnchorHtml(
							{ date: date, forceOff: this.rowCnt > 1 || this.colCnt === 1 },
							innerHtml
						) :
						// if not valid, display text, but no link
						innerHtml
					) +
				'</th>';
		},
	
	
		/* Background Rendering
		------------------------------------------------------------------------------------------------------------------*/
	
	
		renderBgTrHtml: function(row) {
			return '' +
				'<tr>' +
					(this.isRTL ? '' : this.renderBgIntroHtml(row)) +
					this.renderBgCellsHtml(row) +
					(this.isRTL ? this.renderBgIntroHtml(row) : '') +
				'</tr>';
		},
	
	
		renderBgIntroHtml: function(row) {
			return this.renderIntroHtml(); // fall back to generic
		},
	
	
		renderBgCellsHtml: function(row) {
			var htmls = [];
			var col, date;
	
			for (col = 0; col < this.colCnt; col++) {
				date = this.getCellDate(row, col);
				htmls.push(this.renderBgCellHtml(date));
			}
	
			return htmls.join('');
		},
	
	
		renderBgCellHtml: function(date, otherAttrs) {
			var view = this.view;
			var isDateValid = view.activeUnzonedRange.containsDate(date); // TODO: called too frequently. cache somehow.
			var classes = this.getDayClasses(date);
	
			classes.unshift('fc-day', view.calendar.theme.getClass('widgetContent'));
	
			return '<td class="' + classes.join(' ') + '"' +
				(isDateValid ?
					' data-date="' + date.format('YYYY-MM-DD') + '"' : // if date has a time, won't format it
					'') +
				(otherAttrs ?
					' ' + otherAttrs :
					'') +
				'></td>';
		},
	
	
		/* Generic
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Generates the default HTML intro for any row. User classes should override
		renderIntroHtml: function() {
		},
	
	
		// TODO: a generic method for dealing with <tr>, RTL, intro
		// when increment internalApiVersion
		// wrapTr (scheduler)
	
	
		/* Utils
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Applies the generic "intro" and "outro" HTML to the given cells.
		// Intro means the leftmost cell when the calendar is LTR and the rightmost cell when RTL. Vice-versa for outro.
		bookendCells: function(trEl) {
			var introHtml = this.renderIntroHtml();
	
			if (introHtml) {
				if (this.isRTL) {
					trEl.append(introHtml);
				}
				else {
					trEl.prepend(introHtml);
				}
			}
		}
	
	};
	
	;;
	
	/* A component that renders a grid of whole-days that runs horizontally. There can be multiple rows, one per week.
	----------------------------------------------------------------------------------------------------------------------*/
	
	var DayGrid = FC.DayGrid = Grid.extend(DayTableMixin, {
	
		numbersVisible: false, // should render a row for day/week numbers? set by outside view. TODO: make internal
		bottomCoordPadding: 0, // hack for extending the hit area for the last row of the coordinate grid
	
		rowEls: null, // set of fake row elements
		cellEls: null, // set of whole-day elements comprising the row's background
		helperEls: null, // set of cell skeleton elements for rendering the mock event "helper"
	
		rowCoordCache: null,
		colCoordCache: null,
	
	
		// Renders the rows and columns into the component's `this.el`, which should already be assigned.
		// isRigid determins whether the individual rows should ignore the contents and be a constant height.
		// Relies on the view's colCnt and rowCnt. In the future, this component should probably be self-sufficient.
		renderDates: function(isRigid) {
			var view = this.view;
			var rowCnt = this.rowCnt;
			var colCnt = this.colCnt;
			var html = '';
			var row;
			var col;
	
			for (row = 0; row < rowCnt; row++) {
				html += this.renderDayRowHtml(row, isRigid);
			}
			this.el.html(html);
	
			this.rowEls = this.el.find('.fc-row');
			this.cellEls = this.el.find('.fc-day, .fc-disabled-day');
	
			this.rowCoordCache = new CoordCache({
				els: this.rowEls,
				isVertical: true
			});
			this.colCoordCache = new CoordCache({
				els: this.cellEls.slice(0, this.colCnt), // only the first row
				isHorizontal: true
			});
	
			// trigger dayRender with each cell's element
			for (row = 0; row < rowCnt; row++) {
				for (col = 0; col < colCnt; col++) {
					this.publiclyTrigger('dayRender', {
						context: view,
						args: [
							this.getCellDate(row, col),
							this.getCellEl(row, col),
							view
						]
					});
				}
			}
		},
	
	
		unrenderDates: function() {
			this.removeSegPopover();
		},
	
	
		renderBusinessHours: function() {
			var segs = this.buildBusinessHourSegs(true); // wholeDay=true
			this.renderFill('businessHours', segs, 'bgevent');
		},
	
	
		unrenderBusinessHours: function() {
			this.unrenderFill('businessHours');
		},
	
	
		// Generates the HTML for a single row, which is a div that wraps a table.
		// `row` is the row number.
		renderDayRowHtml: function(row, isRigid) {
			var theme = this.view.calendar.theme;
			var classes = [ 'fc-row', 'fc-week', theme.getClass('dayRow') ];
	
			if (isRigid) {
				classes.push('fc-rigid');
			}
	
			return '' +
				'<div class="' + classes.join(' ') + '">' +
					'<div class="fc-bg">' +
						'<table class="' + theme.getClass('tableGrid') + '">' +
							this.renderBgTrHtml(row) +
						'</table>' +
					'</div>' +
					'<div class="fc-content-skeleton">' +
						'<table>' +
							(this.numbersVisible ?
								'<thead>' +
									this.renderNumberTrHtml(row) +
								'</thead>' :
								''
								) +
						'</table>' +
					'</div>' +
				'</div>';
		},
	
	
		/* Grid Number Rendering
		------------------------------------------------------------------------------------------------------------------*/
	
	
		renderNumberTrHtml: function(row) {
			return '' +
				'<tr>' +
					(this.isRTL ? '' : this.renderNumberIntroHtml(row)) +
					this.renderNumberCellsHtml(row) +
					(this.isRTL ? this.renderNumberIntroHtml(row) : '') +
				'</tr>';
		},
	
	
		renderNumberIntroHtml: function(row) {
			return this.renderIntroHtml();
		},
	
	
		renderNumberCellsHtml: function(row) {
			var htmls = [];
			var col, date;
	
			for (col = 0; col < this.colCnt; col++) {
				date = this.getCellDate(row, col);
				htmls.push(this.renderNumberCellHtml(date));
			}
	
			return htmls.join('');
		},
	
	
		// Generates the HTML for the <td>s of the "number" row in the DayGrid's content skeleton.
		// The number row will only exist if either day numbers or week numbers are turned on.
		renderNumberCellHtml: function(date) {
			var view = this.view;
			var html = '';
			var isDateValid = view.activeUnzonedRange.containsDate(date); // TODO: called too frequently. cache somehow.
			var isDayNumberVisible = view.dayNumbersVisible && isDateValid;
			var classes;
			var weekCalcFirstDoW;
	
			if (!isDayNumberVisible && !view.cellWeekNumbersVisible) {
				// no numbers in day cell (week number must be along the side)
				return '<td/>'; //  will create an empty space above events :(
			}
	
			classes = this.getDayClasses(date);
			classes.unshift('fc-day-top');
	
			if (view.cellWeekNumbersVisible) {
				// To determine the day of week number change under ISO, we cannot
				// rely on moment.js methods such as firstDayOfWeek() or weekday(),
				// because they rely on the locale's dow (possibly overridden by
				// our firstDay option), which may not be Monday. We cannot change
				// dow, because that would affect the calendar start day as well.
				if (date._locale._fullCalendar_weekCalc === 'ISO') {
					weekCalcFirstDoW = 1;  // Monday by ISO 8601 definition
				}
				else {
					weekCalcFirstDoW = date._locale.firstDayOfWeek();
				}
			}
	
			html += '<td class="' + classes.join(' ') + '"' +
				(isDateValid ?
					' data-date="' + date.format() + '"' :
					''
					) +
				'>';
	
			if (view.cellWeekNumbersVisible && (date.day() == weekCalcFirstDoW)) {
				html += view.buildGotoAnchorHtml(
					{ date: date, type: 'week' },
					{ 'class': 'fc-week-number' },
					date.format('w') // inner HTML
				);
			}
	
			if (isDayNumberVisible) {
				html += view.buildGotoAnchorHtml(
					date,
					{ 'class': 'fc-day-number' },
					date.date() // inner HTML
				);
			}
	
			html += '</td>';
	
			return html;
		},
	
	
		/* Options
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Computes a default event time formatting string if `timeFormat` is not explicitly defined
		computeEventTimeFormat: function() {
			return this.opt('extraSmallTimeFormat'); // like "6p" or "6:30p"
		},
	
	
		// Computes a default `displayEventEnd` value if one is not expliclty defined
		computeDisplayEventEnd: function() {
			return this.colCnt == 1; // we'll likely have space if there's only one day
		},
	
	
		/* Dates
		------------------------------------------------------------------------------------------------------------------*/
	
	
		rangeUpdated: function() {
			this.updateDayTable();
		},
	
	
		// Slices up the given span (unzoned start/end with other misc data) into an array of segments
		componentFootprintToSegs: function(componentFootprint) {
			var segs = this.sliceRangeByRow(componentFootprint.unzonedRange);
			var i, seg;
	
			for (i = 0; i < segs.length; i++) {
				seg = segs[i];
	
				if (this.isRTL) {
					seg.leftCol = this.daysPerRow - 1 - seg.lastRowDayIndex;
					seg.rightCol = this.daysPerRow - 1 - seg.firstRowDayIndex;
				}
				else {
					seg.leftCol = seg.firstRowDayIndex;
					seg.rightCol = seg.lastRowDayIndex;
				}
			}
	
			return segs;
		},
	
	
		/* Hit System
		------------------------------------------------------------------------------------------------------------------*/
	
	
		prepareHits: function() {
			this.colCoordCache.build();
			this.rowCoordCache.build();
			this.rowCoordCache.bottoms[this.rowCnt - 1] += this.bottomCoordPadding; // hack
		},
	
	
		releaseHits: function() {
			this.colCoordCache.clear();
			this.rowCoordCache.clear();
		},
	
	
		queryHit: function(leftOffset, topOffset) {
			if (this.colCoordCache.isLeftInBounds(leftOffset) && this.rowCoordCache.isTopInBounds(topOffset)) {
				var col = this.colCoordCache.getHorizontalIndex(leftOffset);
				var row = this.rowCoordCache.getVerticalIndex(topOffset);
	
				if (row != null && col != null) {
					return this.getCellHit(row, col);
				}
			}
		},
	
	
		getHitFootprint: function(hit) {
			var range = this.getCellRange(hit.row, hit.col);
	
			return new ComponentFootprint(
				new UnzonedRange(range.start, range.end),
				true // all-day?
			);
		},
	
	
		getHitEl: function(hit) {
			return this.getCellEl(hit.row, hit.col);
		},
	
	
		/* Cell System
		------------------------------------------------------------------------------------------------------------------*/
		// FYI: the first column is the leftmost column, regardless of date
	
	
		getCellHit: function(row, col) {
			return {
				row: row,
				col: col,
				component: this, // needed unfortunately :(
				left: this.colCoordCache.getLeftOffset(col),
				right: this.colCoordCache.getRightOffset(col),
				top: this.rowCoordCache.getTopOffset(row),
				bottom: this.rowCoordCache.getBottomOffset(row)
			};
		},
	
	
		getCellEl: function(row, col) {
			return this.cellEls.eq(row * this.colCnt + col);
		},
	
	
		/* Event Drag Visualization
		------------------------------------------------------------------------------------------------------------------*/
		// TODO: move to DayGrid.event, similar to what we did with Grid's drag methods
	
	
		// Renders a visual indication of an event or external element being dragged.
		// `eventLocation` has zoned start and end (optional)
		renderDrag: function(eventFootprints, seg) {
			var i;
	
			for (i = 0; i < eventFootprints.length; i++) {
				this.renderHighlight(eventFootprints[i].componentFootprint);
			}
	
			// if a segment from the same calendar but another component is being dragged, render a helper event
			if (seg && seg.component !== this) {
				return this.renderHelperEventFootprints(eventFootprints, seg); // returns mock event elements
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
		renderEventResize: function(eventFootprints, seg) {
			var i;
	
			for (i = 0; i < eventFootprints.length; i++) {
				this.renderHighlight(eventFootprints[i].componentFootprint);
			}
	
			return this.renderHelperEventFootprints(eventFootprints, seg); // returns mock event elements
		},
	
	
		// Unrenders a visual indication of an event being resized
		unrenderEventResize: function() {
			this.unrenderHighlight();
			this.unrenderHelper();
		},
	
	
		/* Event Helper
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a mock "helper" event. `sourceSeg` is the associated internal segment object. It can be null.
		renderHelperEventFootprintEls: function(eventFootprints, sourceSeg) {
			var helperNodes = [];
			var segs = this.eventFootprintsToSegs(eventFootprints);
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
	
			return ( // must return the elements rendered
				this.helperEls = $(helperNodes) // array -> jQuery set
			);
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
	
			if (this.elsByFill[type]) {
				this.elsByFill[type] = this.elsByFill[type].add(nodes);
			}
			else {
				this.elsByFill[type] = $(nodes);
			}
	
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
	
			this.bookendCells(trEl);
	
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
				return seg.footprint.componentFootprint.isAllDay;
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
			var eventDef = seg.footprint.eventDef;
			var isAllDay = seg.footprint.componentFootprint.isAllDay;
			var isDraggable = view.isEventDefDraggable(eventDef);
			var isResizableFromStart = !disableResizing && isAllDay &&
				seg.isStart && view.isEventDefResizableFromStart(eventDef);
			var isResizableFromEnd = !disableResizing && isAllDay &&
				seg.isEnd && view.isEventDefResizableFromEnd(eventDef);
			var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd);
			var skinCss = cssToStr(this.getSegSkinCss(seg));
			var timeHtml = '';
			var timeText;
			var titleHtml;
	
			classes.unshift('fc-day-grid-event', 'fc-h-event');
	
			// Only display a timed events time if it is the starting segment
			if (seg.isStart) {
				timeText = this.getEventTimeText(seg.footprint);
				if (timeText) {
					timeHtml = '<span class="fc-time">' + htmlEscape(timeText) + '</span>';
				}
			}
	
			titleHtml =
				'<span class="fc-title">' +
					(htmlEscape(eventDef.title || '') || '&nbsp;') + // we always want one line of height
				'</span>';
			
			return '<a class="' + classes.join(' ') + '"' +
					(eventDef.url ?
						' href="' + htmlEscape(eventDef.url) + '"' :
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
				this.bookendCells(tr);
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
			this.sortEventSegs(segs);
			
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
					segsBelow = _this.getCellSegs(row, col, levelLimit);
					if (segsBelow.length) {
						td = cellMatrix[levelLimit - 1][col];
						moreLink = _this.renderMoreLink(row, col, segsBelow);
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
						segsBelow = this.getCellSegs(row, col, levelLimit);
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
							moreLink = this.renderMoreLink(
								row,
								seg.leftCol + j,
								[ seg ].concat(segsBelow) // count seg as hidden too
							);
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
		renderMoreLink: function(row, col, hiddenSegs) {
			var _this = this;
			var view = this.view;
	
			return $('<a class="fc-more"/>')
				.text(
					this.getMoreLinkText(hiddenSegs.length)
				)
				.on('click', function(ev) {
					var clickOption = _this.opt('eventLimitClick');
					var date = _this.getCellDate(row, col);
					var moreEl = $(this);
					var dayEl = _this.getCellEl(row, col);
					var allSegs = _this.getCellSegs(row, col);
	
					// rescope the segments to be within the cell's date
					var reslicedAllSegs = _this.resliceDaySegs(allSegs, date);
					var reslicedHiddenSegs = _this.resliceDaySegs(hiddenSegs, date);
	
					if (typeof clickOption === 'function') {
						// the returned value can be an atomic option
						clickOption = _this.publiclyTrigger('eventLimitClick', {
							context: view,
							args: [
								{
									date: date.clone(),
									dayEl: dayEl,
									moreEl: moreEl,
									segs: reslicedAllSegs,
									hiddenSegs: reslicedHiddenSegs
								},
								ev,
								view
							]
						});
					}
	
					if (clickOption === 'popover') {
						_this.showSegPopover(row, col, moreEl, reslicedAllSegs);
					}
					else if (typeof clickOption === 'string') { // a view name
						view.calendar.zoomTo(date, clickOption);
					}
				});
		},
	
	
		// Reveals the popover that displays all events within a cell
		showSegPopover: function(row, col, moreLink, segs) {
			var _this = this;
			var view = this.view;
			var moreWrap = moreLink.parent(); // the <div> wrapper around the <a>
			var topEl; // the element we want to match the top coordinate of
			var options;
	
			if (this.rowCnt == 1) {
				topEl = view.el; // will cause the popover to cover any sort of header
			}
			else {
				topEl = this.rowEls.eq(row); // will align with top of row
			}
	
			options = {
				className: 'fc-more-popover ' + view.calendar.theme.getClass('popover'),
				content: this.renderSegPopoverContent(row, col, segs),
				parentEl: view.el, // attach to root of view. guarantees outside of scrollbars.
				top: topEl.offset().top,
				autoHide: true, // when the user clicks elsewhere, hide the popover
				viewportConstrain: this.opt('popoverViewportConstrain'),
				hide: function() {
					// kill everything when the popover is hidden
					// notify events to be removed
					if (_this.popoverSegs) {
						var seg;
						var legacy;
						var i;
	
						for (i = 0; i < _this.popoverSegs.length; ++i) {
							seg = _this.popoverSegs[i];
							legacy = seg.footprint.getEventLegacy();
	
							_this.publiclyTrigger('eventDestroy', {
								context: legacy,
								args: [ legacy, seg.el, view ]
							});
						}
					}
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
	
			// the popover doesn't live within the grid's container element, and thus won't get the event
			// delegated-handlers for free. attach event-related handlers to the popover.
			this.bindSegHandlersToEl(this.segPopover.el);
		},
	
	
		// Builds the inner DOM contents of the segment popover
		renderSegPopoverContent: function(row, col, segs) {
			var view = this.view;
			var theme = view.calendar.theme;
			var title = this.getCellDate(row, col).format(this.opt('dayPopoverFormat'));
			var content = $(
				'<div class="fc-header ' + theme.getClass('popoverHeader') + '">' +
					'<span class="fc-close ' + theme.getIconClass('close') + '"></span>' +
					'<span class="fc-title">' +
						htmlEscape(title) +
					'</span>' +
					'<div class="fc-clear"/>' +
				'</div>' +
				'<div class="fc-body ' + theme.getClass('popoverContent') + '">' +
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
				this.hitsNeeded();
				segs[i].hit = this.getCellHit(row, col);
				this.hitsNotNeeded();
	
				segContainer.append(segs[i].el);
			}
	
			return content;
		},
	
	
		// Given the events within an array of segment objects, reslice them to be in a single day
		resliceDaySegs: function(segs, dayDate) {
			var dayStart = dayDate.clone();
			var dayEnd = dayStart.clone().add(1, 'days');
			var dayRange = new UnzonedRange(dayStart, dayEnd);
			var newSegs = [];
			var i;
	
			for (i = 0; i < segs.length; i++) {
				newSegs.push.apply(newSegs, // append
					this.eventFootprintToSegs(segs[i].footprint, dayRange)
				);
			}
	
			// force an order because eventsToSegs doesn't guarantee one
			// TODO: research if still needed
			this.sortEventSegs(newSegs);
	
			return newSegs;
		},
	
	
		// Generates the text that should be inside a "more" link, given the number of events it represents
		getMoreLinkText: function(num) {
			var opt = this.opt('eventLimitText');
	
			if (typeof opt === 'function') {
				return opt(num);
			}
			else {
				return '+' + num + ' ' + opt;
			}
		},
	
	
		// Returns segments within a given cell.
		// If `startLevel` is specified, returns only events including and below that level. Otherwise returns all segs.
		getCellSegs: function(row, col, startLevel) {
			var segMatrix = this.rowStructs[row].segMatrix;
			var level = startLevel || 0;
			var segs = [];
			var seg;
	
			while (level < segMatrix.length) {
				seg = segMatrix[level][col];
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
	// We mixin DayTable, even though there is only a single row of days
	
	var TimeGrid = FC.TimeGrid = Grid.extend(DayTableMixin, {
	
		dayRanges: null, // UnzonedRange[], of start-end of each day
		slotDuration: null, // duration of a "slot", a distinct time segment on given day, visualized by lines
		snapDuration: null, // granularity of time for dragging and selecting
		snapsPerSlot: null,
		labelFormat: null, // formatting string for times running along vertical axis
		labelInterval: null, // duration of how often a label should be displayed for a slot
	
		colEls: null, // cells elements in the day-row background
		slatContainerEl: null, // div that wraps all the slat rows
		slatEls: null, // elements running horizontally across all columns
		nowIndicatorEls: null,
	
		colCoordCache: null,
		slatCoordCache: null,
	
	
		constructor: function() {
			Grid.apply(this, arguments); // call the super-constructor
	
			this.processOptions();
		},
	
	
		// Renders the time grid into `this.el`, which should already be assigned.
		// Relies on the view's colCnt. In the future, this component should probably be self-sufficient.
		renderDates: function() {
			this.el.html(this.renderHtml());
			this.colEls = this.el.find('.fc-day, .fc-disabled-day');
			this.slatContainerEl = this.el.find('.fc-slats');
			this.slatEls = this.slatContainerEl.find('tr');
	
			this.colCoordCache = new CoordCache({
				els: this.colEls,
				isHorizontal: true
			});
			this.slatCoordCache = new CoordCache({
				els: this.slatEls,
				isVertical: true
			});
	
			this.renderContentSkeleton();
		},
	
	
		// Renders the basic HTML skeleton for the grid
		renderHtml: function() {
			var theme = this.view.calendar.theme;
	
			return '' +
				'<div class="fc-bg">' +
					'<table class="' + theme.getClass('tableGrid') + '">' +
						this.renderBgTrHtml(0) + // row=0
					'</table>' +
				'</div>' +
				'<div class="fc-slats">' +
					'<table class="' + theme.getClass('tableGrid') + '">' +
						this.renderSlatRowHtml() +
					'</table>' +
				'</div>';
		},
	
	
		// Generates the HTML for the horizontal "slats" that run width-wise. Has a time axis on a side. Depends on RTL.
		renderSlatRowHtml: function() {
			var view = this.view;
			var calendar = view.calendar;
			var theme = calendar.theme;
			var isRTL = this.isRTL;
			var html = '';
			var slotTime = moment.duration(+this.view.minTime); // wish there was .clone() for durations
			var slotIterator = moment.duration(0);
			var slotDate; // will be on the view's first day, but we only care about its time
			var isLabeled;
			var axisHtml;
	
			// Calculate the time for each slot
			while (slotTime < view.maxTime) {
				slotDate = calendar.msToUtcMoment(this.unzonedRange.startMs).time(slotTime);
				isLabeled = isInt(divideDurationByDuration(slotIterator, this.labelInterval));
	
				axisHtml =
					'<td class="fc-axis fc-time ' + theme.getClass('widgetContent') + '" ' + view.axisStyleAttr() + '>' +
						(isLabeled ?
							'<span>' + // for matchCellWidths
								htmlEscape(slotDate.format(this.labelFormat)) +
							'</span>' :
							''
							) +
					'</td>';
	
				html +=
					'<tr data-time="' + slotDate.format('HH:mm:ss') + '"' +
						(isLabeled ? '' : ' class="fc-minor"') +
						'>' +
						(!isRTL ? axisHtml : '') +
						'<td class="' + theme.getClass('widgetContent') + '"/>' +
						(isRTL ? axisHtml : '') +
					"</tr>";
	
				slotTime.add(this.slotDuration);
				slotIterator.add(this.slotDuration);
			}
	
			return html;
		},
	
	
		/* Options
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Parses various options into properties of this object
		processOptions: function() {
			var slotDuration = this.opt('slotDuration');
			var snapDuration = this.opt('snapDuration');
			var input;
	
			slotDuration = moment.duration(slotDuration);
			snapDuration = snapDuration ? moment.duration(snapDuration) : slotDuration;
	
			this.slotDuration = slotDuration;
			this.snapDuration = snapDuration;
			this.snapsPerSlot = slotDuration / snapDuration; // TODO: ensure an integer multiple?
	
			// might be an array value (for TimelineView).
			// if so, getting the most granular entry (the last one probably).
			input = this.opt('slotLabelFormat');
			if ($.isArray(input)) {
				input = input[input.length - 1];
			}
	
			this.labelFormat = input ||
				this.opt('smallTimeFormat'); // the computed default
	
			input = this.opt('slotLabelInterval');
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
	
	
		// Computes a default event time formatting string if `timeFormat` is not explicitly defined
		computeEventTimeFormat: function() {
			return this.opt('noMeridiemTimeFormat'); // like "6:30" (no AM/PM)
		},
	
	
		// Computes a default `displayEventEnd` value if one is not expliclty defined
		computeDisplayEventEnd: function() {
			return true;
		},
	
	
		/* Hit System
		------------------------------------------------------------------------------------------------------------------*/
	
	
		prepareHits: function() {
			this.colCoordCache.build();
			this.slatCoordCache.build();
		},
	
	
		releaseHits: function() {
			this.colCoordCache.clear();
			// NOTE: don't clear slatCoordCache because we rely on it for computeTimeTop
		},
	
	
		queryHit: function(leftOffset, topOffset) {
			var snapsPerSlot = this.snapsPerSlot;
			var colCoordCache = this.colCoordCache;
			var slatCoordCache = this.slatCoordCache;
	
			if (colCoordCache.isLeftInBounds(leftOffset) && slatCoordCache.isTopInBounds(topOffset)) {
				var colIndex = colCoordCache.getHorizontalIndex(leftOffset);
				var slatIndex = slatCoordCache.getVerticalIndex(topOffset);
	
				if (colIndex != null && slatIndex != null) {
					var slatTop = slatCoordCache.getTopOffset(slatIndex);
					var slatHeight = slatCoordCache.getHeight(slatIndex);
					var partial = (topOffset - slatTop) / slatHeight; // floating point number between 0 and 1
					var localSnapIndex = Math.floor(partial * snapsPerSlot); // the snap # relative to start of slat
					var snapIndex = slatIndex * snapsPerSlot + localSnapIndex;
					var snapTop = slatTop + (localSnapIndex / snapsPerSlot) * slatHeight;
					var snapBottom = slatTop + ((localSnapIndex + 1) / snapsPerSlot) * slatHeight;
	
					return {
						col: colIndex,
						snap: snapIndex,
						component: this, // needed unfortunately :(
						left: colCoordCache.getLeftOffset(colIndex),
						right: colCoordCache.getRightOffset(colIndex),
						top: snapTop,
						bottom: snapBottom
					};
				}
			}
		},
	
	
		getHitFootprint: function(hit) {
			var start = this.getCellDate(0, hit.col); // row=0
			var time = this.computeSnapTime(hit.snap); // pass in the snap-index
			var end;
	
			start.time(time);
			end = start.clone().add(this.snapDuration);
	
			return new ComponentFootprint(
				new UnzonedRange(start, end),
				false // all-day?
			);
		},
	
	
		getHitEl: function(hit) {
			return this.colEls.eq(hit.col);
		},
	
	
		/* Dates
		------------------------------------------------------------------------------------------------------------------*/
	
	
		rangeUpdated: function() {
			var view = this.view;
	
			this.updateDayTable();
	
			this.dayRanges = this.dayDates.map(function(dayDate) {
				return new UnzonedRange(
					dayDate.clone().add(view.minTime),
					dayDate.clone().add(view.maxTime)
				);
			});
		},
	
	
		// Given a row number of the grid, representing a "snap", returns a time (Duration) from its start-of-day
		computeSnapTime: function(snapIndex) {
			return moment.duration(this.view.minTime + this.snapDuration * snapIndex);
		},
	
	
		// Slices up the given span (unzoned start/end with other misc data) into an array of segments
		componentFootprintToSegs: function(componentFootprint) {
			var segs = this.sliceRangeByTimes(componentFootprint.unzonedRange);
			var i;
	
			for (i = 0; i < segs.length; i++) {
				if (this.isRTL) {
					segs[i].col = this.daysPerRow - 1 - segs[i].dayIndex;
				}
				else {
					segs[i].col = segs[i].dayIndex;
				}
			}
	
			return segs;
		},
	
	
		sliceRangeByTimes: function(unzonedRange) {
			var segs = [];
			var segRange;
			var dayIndex;
	
			for (dayIndex = 0; dayIndex < this.daysPerRow; dayIndex++) {
	
				segRange = unzonedRange.intersect(this.dayRanges[dayIndex]);
	
				if (segRange) {
					segs.push({
						startMs: segRange.startMs,
						endMs: segRange.endMs,
						isStart: segRange.isStart,
						isEnd: segRange.isEnd,
						dayIndex: dayIndex
					});
				}
			}
	
			return segs;
		},
	
	
		/* Coordinates
		------------------------------------------------------------------------------------------------------------------*/
	
	
		updateSize: function(isResize) { // NOT a standard Grid method
			this.slatCoordCache.build();
	
			if (isResize) {
				this.updateSegVerticals(
					[].concat(this.fgSegs || [], this.bgSegs || [], this.businessSegs || [])
				);
			}
		},
	
	
		getTotalSlatHeight: function() {
			return this.slatContainerEl.outerHeight();
		},
	
	
		// Computes the top coordinate, relative to the bounds of the grid, of the given date.
		// `ms` can be a millisecond UTC time OR a UTC moment.
		// A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
		computeDateTop: function(ms, startOfDayDate) {
			return this.computeTimeTop(
				moment.duration(
					ms - startOfDayDate.clone().stripTime()
				)
			);
		},
	
	
		// Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
		computeTimeTop: function(time) {
			var len = this.slatEls.length;
			var slatCoverage = (time - this.view.minTime) / this.slotDuration; // floating-point value of # of slots covered
			var slatIndex;
			var slatRemainder;
	
			// compute a floating-point number for how many slats should be progressed through.
			// from 0 to number of slats (inclusive)
			// constrained because minTime/maxTime might be customized.
			slatCoverage = Math.max(0, slatCoverage);
			slatCoverage = Math.min(len, slatCoverage);
	
			// an integer index of the furthest whole slat
			// from 0 to number slats (*exclusive*, so len-1)
			slatIndex = Math.floor(slatCoverage);
			slatIndex = Math.min(slatIndex, len - 1);
	
			// how much further through the slatIndex slat (from 0.0-1.0) must be covered in addition.
			// could be 1.0 if slatCoverage is covering *all* the slots
			slatRemainder = slatCoverage - slatIndex;
	
			return this.slatCoordCache.getTopPosition(slatIndex) +
				this.slatCoordCache.getHeight(slatIndex) * slatRemainder;
		},
	
	
	
		/* Event Drag Visualization
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a visual indication of an event being dragged over the specified date(s).
		// A returned value of `true` signals that a mock "helper" event has been rendered.
		renderDrag: function(eventFootprints, seg) {
			var i;
	
			if (seg) { // if there is event information for this drag, render a helper event
	
				// returns mock event elements
				// signal that a helper has been rendered
				return this.renderHelperEventFootprints(eventFootprints);
			}
			else { // otherwise, just render a highlight
	
				for (i = 0; i < eventFootprints.length; i++) {
					this.renderHighlight(eventFootprints[i].componentFootprint);
				}
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
		renderEventResize: function(eventFootprints, seg) {
			return this.renderHelperEventFootprints(eventFootprints, seg); // returns mock event elements
		},
	
	
		// Unrenders any visual indication of an event being resized
		unrenderEventResize: function() {
			this.unrenderHelper();
		},
	
	
		/* Event Helper
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a mock "helper" event. `sourceSeg` is the original segment object and might be null (an external drag)
		renderHelperEventFootprintEls: function(eventFootprints, sourceSeg) {
			var segs = this.eventFootprintsToSegs(eventFootprints);
	
			return this.renderHelperSegs( // returns mock event elements
				segs,
				sourceSeg
			);
		},
	
	
		// Unrenders any mock helper event
		unrenderHelper: function() {
			this.unrenderHelperSegs();
		},
	
	
		/* Business Hours
		------------------------------------------------------------------------------------------------------------------*/
	
	
		renderBusinessHours: function() {
			this.renderBusinessSegs(
				this.buildBusinessHourSegs()
			);
		},
	
	
		unrenderBusinessHours: function() {
			this.unrenderBusinessSegs();
		},
	
	
		/* Now Indicator
		------------------------------------------------------------------------------------------------------------------*/
	
	
		getNowIndicatorUnit: function() {
			return 'minute'; // will refresh on the minute
		},
	
	
		renderNowIndicator: function(date) {
			// seg system might be overkill, but it handles scenario where line needs to be rendered
			//  more than once because of columns with the same date (resources columns for example)
			var segs = this.componentFootprintToSegs(
				new ComponentFootprint(
					new UnzonedRange(date, date.valueOf() + 1), // protect against null range
					false // all-day
				)
			);
			var top = this.computeDateTop(date, date);
			var nodes = [];
			var i;
	
			// render lines within the columns
			for (i = 0; i < segs.length; i++) {
				nodes.push($('<div class="fc-now-indicator fc-now-indicator-line"></div>')
					.css('top', top)
					.appendTo(this.colContainerEls.eq(segs[i].col))[0]);
			}
	
			// render an arrow over the axis
			if (segs.length > 0) { // is the current time in view?
				nodes.push($('<div class="fc-now-indicator fc-now-indicator-arrow"></div>')
					.css('top', top)
					.appendTo(this.el.find('.fc-content-skeleton'))[0]);
			}
	
			this.nowIndicatorEls = $(nodes);
		},
	
	
		unrenderNowIndicator: function() {
			if (this.nowIndicatorEls) {
				this.nowIndicatorEls.remove();
				this.nowIndicatorEls = null;
			}
		},
	
	
		/* Selection
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a visual indication of a selection. Overrides the default, which was to simply render a highlight.
		renderSelectionFootprint: function(componentFootprint) {
			if (this.opt('selectHelper')) { // this setting signals that a mock helper event should be rendered
				this.renderHelperEventFootprints([
					this.fabricateEventFootprint(componentFootprint)
				]);
			}
			else {
				this.renderHighlight(componentFootprint);
			}
		},
	
	
		// Unrenders any visual indication of a selection
		unrenderSelection: function() {
			this.unrenderHelper();
			this.unrenderHighlight();
		},
	
	
		/* Highlight
		------------------------------------------------------------------------------------------------------------------*/
	
	
		renderHighlight: function(componentFootprint) {
			this.renderHighlightSegs(
				this.componentFootprintToSegs(componentFootprint)
			);
		},
	
	
		unrenderHighlight: function() {
			this.unrenderHighlightSegs();
		}
	
	});
	
	;;
	
	/* Methods for rendering SEGMENTS, pieces of content that live on the view
	 ( this file is no longer just for events )
	----------------------------------------------------------------------------------------------------------------------*/
	
	TimeGrid.mixin({
	
		colContainerEls: null, // containers for each column
	
		// inner-containers for each column where different types of segs live
		fgContainerEls: null,
		bgContainerEls: null,
		helperContainerEls: null,
		highlightContainerEls: null,
		businessContainerEls: null,
	
		// arrays of different types of displayed segments
		fgSegs: null,
		bgSegs: null,
		helperSegs: null,
		highlightSegs: null,
		businessSegs: null,
	
	
		// Renders the DOM that the view's content will live in
		renderContentSkeleton: function() {
			var cellHtml = '';
			var i;
			var skeletonEl;
	
			for (i = 0; i < this.colCnt; i++) {
				cellHtml +=
					'<td>' +
						'<div class="fc-content-col">' +
							'<div class="fc-event-container fc-helper-container"></div>' +
							'<div class="fc-event-container"></div>' +
							'<div class="fc-highlight-container"></div>' +
							'<div class="fc-bgevent-container"></div>' +
							'<div class="fc-business-container"></div>' +
						'</div>' +
					'</td>';
			}
	
			skeletonEl = $(
				'<div class="fc-content-skeleton">' +
					'<table>' +
						'<tr>' + cellHtml + '</tr>' +
					'</table>' +
				'</div>'
			);
	
			this.colContainerEls = skeletonEl.find('.fc-content-col');
			this.helperContainerEls = skeletonEl.find('.fc-helper-container');
			this.fgContainerEls = skeletonEl.find('.fc-event-container:not(.fc-helper-container)');
			this.bgContainerEls = skeletonEl.find('.fc-bgevent-container');
			this.highlightContainerEls = skeletonEl.find('.fc-highlight-container');
			this.businessContainerEls = skeletonEl.find('.fc-business-container');
	
			this.bookendCells(skeletonEl.find('tr')); // TODO: do this on string level
			this.el.append(skeletonEl);
		},
	
	
		/* Foreground Events
		------------------------------------------------------------------------------------------------------------------*/
	
	
		renderFgSegs: function(segs) {
			segs = this.renderFgSegsIntoContainers(segs, this.fgContainerEls);
			this.fgSegs = segs;
			return segs; // needed for Grid::renderEvents
		},
	
	
		unrenderFgSegs: function() {
			this.unrenderNamedSegs('fgSegs');
		},
	
	
		/* Foreground Helper Events
		------------------------------------------------------------------------------------------------------------------*/
	
	
		renderHelperSegs: function(segs, sourceSeg) {
			var helperEls = [];
			var i, seg;
			var sourceEl;
	
			segs = this.renderFgSegsIntoContainers(segs, this.helperContainerEls);
	
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
				helperEls.push(seg.el[0]);
			}
	
			this.helperSegs = segs;
	
			return $(helperEls); // must return rendered helpers
		},
	
	
		unrenderHelperSegs: function() {
			this.unrenderNamedSegs('helperSegs');
		},
	
	
		/* Background Events
		------------------------------------------------------------------------------------------------------------------*/
	
	
		renderBgSegs: function(segs) {
			segs = this.renderFillSegEls('bgEvent', segs); // TODO: old fill system
			this.updateSegVerticals(segs);
			this.attachSegsByCol(this.groupSegsByCol(segs), this.bgContainerEls);
			this.bgSegs = segs;
			return segs; // needed for Grid::renderEvents
		},
	
	
		unrenderBgSegs: function() {
			this.unrenderNamedSegs('bgSegs');
		},
	
	
		/* Highlight
		------------------------------------------------------------------------------------------------------------------*/
	
	
		renderHighlightSegs: function(segs) {
			segs = this.renderFillSegEls('highlight', segs); // TODO: instead of calling renderFill directly
			this.updateSegVerticals(segs);
			this.attachSegsByCol(this.groupSegsByCol(segs), this.highlightContainerEls);
			this.highlightSegs = segs;
		},
	
	
		unrenderHighlightSegs: function() {
			this.unrenderNamedSegs('highlightSegs');
		},
	
	
		/* Business Hours
		------------------------------------------------------------------------------------------------------------------*/
	
	
		renderBusinessSegs: function(segs) {
			segs = this.renderFillSegEls('businessHours', segs); // TODO: instead of calling renderFill directly
			this.updateSegVerticals(segs);
			this.attachSegsByCol(this.groupSegsByCol(segs), this.businessContainerEls);
			this.businessSegs = segs;
		},
	
	
		unrenderBusinessSegs: function() {
			this.unrenderNamedSegs('businessSegs');
		},
	
	
		/* Seg Rendering Utils
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Given a flat array of segments, return an array of sub-arrays, grouped by each segment's col
		groupSegsByCol: function(segs) {
			var segsByCol = [];
			var i;
	
			for (i = 0; i < this.colCnt; i++) {
				segsByCol.push([]);
			}
	
			for (i = 0; i < segs.length; i++) {
				segsByCol[segs[i].col].push(segs[i]);
			}
	
			return segsByCol;
		},
	
	
		// Given segments grouped by column, insert the segments' elements into a parallel array of container
		// elements, each living within a column.
		attachSegsByCol: function(segsByCol, containerEls) {
			var col;
			var segs;
			var i;
	
			for (col = 0; col < this.colCnt; col++) { // iterate each column grouping
				segs = segsByCol[col];
	
				for (i = 0; i < segs.length; i++) {
					containerEls.eq(col).append(segs[i].el);
				}
			}
		},
	
	
		// Given the name of a property of `this` object, assumed to be an array of segments,
		// loops through each segment and removes from DOM. Will null-out the property afterwards.
		unrenderNamedSegs: function(propName) {
			var segs = this[propName];
			var i;
	
			if (segs) {
				for (i = 0; i < segs.length; i++) {
					segs[i].el.remove();
				}
				this[propName] = null;
			}
		},
	
	
	
		/* Foreground Event Rendering Utils
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Given an array of foreground segments, render a DOM element for each, computes position,
		// and attaches to the column inner-container elements.
		renderFgSegsIntoContainers: function(segs, containerEls) {
			var segsByCol;
			var col;
	
			segs = this.renderFgSegEls(segs); // will call fgSegHtml
			segsByCol = this.groupSegsByCol(segs);
	
			for (col = 0; col < this.colCnt; col++) {
				this.updateFgSegCoords(segsByCol[col]);
			}
	
			this.attachSegsByCol(segsByCol, containerEls);
	
			return segs;
		},
	
	
		// Renders the HTML for a single event segment's default rendering
		fgSegHtml: function(seg, disableResizing) {
			var view = this.view;
			var calendar = view.calendar;
			var componentFootprint = seg.footprint.componentFootprint;
			var isAllDay = componentFootprint.isAllDay;
			var eventDef = seg.footprint.eventDef;
			var isDraggable = view.isEventDefDraggable(eventDef);
			var isResizableFromStart = !disableResizing && seg.isStart && view.isEventDefResizableFromStart(eventDef);
			var isResizableFromEnd = !disableResizing && seg.isEnd && view.isEventDefResizableFromEnd(eventDef);
			var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd);
			var skinCss = cssToStr(this.getSegSkinCss(seg));
			var timeText;
			var fullTimeText; // more verbose time text. for the print stylesheet
			var startTimeText; // just the start time text
	
			classes.unshift('fc-time-grid-event', 'fc-v-event');
	
			// if the event appears to span more than one day...
			if (view.isMultiDayRange(componentFootprint.unzonedRange)) {
				// Don't display time text on segments that run entirely through a day.
				// That would appear as midnight-midnight and would look dumb.
				// Otherwise, display the time text for the *segment's* times (like 6pm-midnight or midnight-10am)
				if (seg.isStart || seg.isEnd) {
					var zonedStart = calendar.msToMoment(seg.startMs);
					var zonedEnd = calendar.msToMoment(seg.endMs);
					timeText = this._getEventTimeText(zonedStart, zonedEnd, isAllDay);
					fullTimeText = this._getEventTimeText(zonedStart, zonedEnd, isAllDay, 'LT');
					startTimeText = this._getEventTimeText(zonedStart, zonedEnd, isAllDay, null, false); // displayEnd=false
				}
			}
			else {
				// Display the normal time text for the *event's* times
				timeText = this.getEventTimeText(seg.footprint);
				fullTimeText = this.getEventTimeText(seg.footprint, 'LT');
				startTimeText = this.getEventTimeText(seg.footprint, null, false); // displayEnd=false
			}
	
			return '<a class="' + classes.join(' ') + '"' +
				(eventDef.url ?
					' href="' + htmlEscape(eventDef.url) + '"' :
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
						(eventDef.title ?
							'<div class="fc-title">' +
								htmlEscape(eventDef.title) +
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
	
	
		/* Seg Position Utils
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Refreshes the CSS top/bottom coordinates for each segment element.
		// Works when called after initial render, after a window resize/zoom for example.
		updateSegVerticals: function(segs) {
			this.computeSegVerticals(segs);
			this.assignSegVerticals(segs);
		},
	
	
		// For each segment in an array, computes and assigns its top and bottom properties
		computeSegVerticals: function(segs) {
			var i, seg;
			var dayDate;
	
			for (i = 0; i < segs.length; i++) {
				seg = segs[i];
				dayDate = this.dayDates[seg.dayIndex];
	
				seg.top = this.computeDateTop(seg.startMs, dayDate);
				seg.bottom = this.computeDateTop(seg.endMs, dayDate);
			}
		},
	
	
		// Given segments that already have their top/bottom properties computed, applies those values to
		// the segments' elements.
		assignSegVerticals: function(segs) {
			var i, seg;
	
			for (i = 0; i < segs.length; i++) {
				seg = segs[i];
				seg.el.css(this.generateSegVerticalCss(seg));
			}
		},
	
	
		// Generates an object with CSS properties for the top/bottom coordinates of a segment element
		generateSegVerticalCss: function(seg) {
			return {
				top: seg.top,
				bottom: -seg.bottom // flipped because needs to be space beyond bottom edge of event container
			};
		},
	
	
		/* Foreground Event Positioning Utils
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Given segments that are assumed to all live in the *same column*,
		// compute their verical/horizontal coordinates and assign to their elements.
		updateFgSegCoords: function(segs) {
			this.computeSegVerticals(segs); // horizontals relies on this
			this.computeFgSegHorizontals(segs); // compute horizontal coordinates, z-index's, and reorder the array
			this.assignSegVerticals(segs);
			this.assignFgSegHorizontals(segs);
		},
	
	
		// Given an array of segments that are all in the same column, sets the backwardCoord and forwardCoord on each.
		// NOTE: Also reorders the given array by date!
		computeFgSegHorizontals: function(segs) {
			var levels;
			var level0;
			var i;
	
			this.sortEventSegs(segs); // order by certain criteria
			levels = buildSlotSegLevels(segs);
			computeForwardSlotSegs(levels);
	
			if ((level0 = levels[0])) {
	
				for (i = 0; i < level0.length; i++) {
					computeSlotSegPressures(level0[i]);
				}
	
				for (i = 0; i < level0.length; i++) {
					this.computeFgSegForwardBack(level0[i], 0, 0);
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
		computeFgSegForwardBack: function(seg, seriesBackwardPressure, seriesBackwardCoord) {
			var forwardSegs = seg.forwardSegs;
			var i;
	
			if (seg.forwardCoord === undefined) { // not already computed
	
				if (!forwardSegs.length) {
	
					// if there are no forward segments, this segment should butt up against the edge
					seg.forwardCoord = 1;
				}
				else {
	
					// sort highest pressure first
					this.sortForwardSegs(forwardSegs);
	
					// this segment's forwardCoord will be calculated from the backwardCoord of the
					// highest-pressure forward segment.
					this.computeFgSegForwardBack(forwardSegs[0], seriesBackwardPressure + 1, seriesBackwardCoord);
					seg.forwardCoord = forwardSegs[0].backwardCoord;
				}
	
				// calculate the backwardCoord from the forwardCoord. consider the series
				seg.backwardCoord = seg.forwardCoord -
					(seg.forwardCoord - seriesBackwardCoord) / // available width for series
					(seriesBackwardPressure + 1); // # of segments in the series
	
				// use this segment's coordinates to computed the coordinates of the less-pressurized
				// forward segments
				for (i=0; i<forwardSegs.length; i++) {
					this.computeFgSegForwardBack(forwardSegs[i], 0, seg.forwardCoord);
				}
			}
		},
	
	
		sortForwardSegs: function(forwardSegs) {
			forwardSegs.sort(proxy(this, 'compareForwardSegs'));
		},
	
	
		// A cmp function for determining which forward segment to rely on more when computing coordinates.
		compareForwardSegs: function(seg1, seg2) {
			// put higher-pressure first
			return seg2.forwardPressure - seg1.forwardPressure ||
				// put segments that are closer to initial edge first (and favor ones with no coords yet)
				(seg1.backwardCoord || 0) - (seg2.backwardCoord || 0) ||
				// do normal sorting...
				this.compareEventSegs(seg1, seg2);
		},
	
	
		// Given foreground event segments that have already had their position coordinates computed,
		// assigns position-related CSS values to their elements.
		assignFgSegHorizontals: function(segs) {
			var i, seg;
	
			for (i = 0; i < segs.length; i++) {
				seg = segs[i];
				seg.el.css(this.generateFgSegHorizontalCss(seg));
	
				// if the height is short, add a className for alternate styling
				if (seg.bottom - seg.top < 30) {
					seg.el.addClass('fc-short');
				}
			}
		},
	
	
		// Generates an object with CSS properties/values that should be applied to an event segment element.
		// Contains important positioning-related properties that should be applied to any event element, customized or not.
		generateFgSegHorizontalCss: function(seg) {
			var shouldOverlap = this.opt('slotEventOverlap');
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
	
	var View = FC.View = ChronoComponent.extend({
	
		type: null, // subclass' view name (string)
		name: null, // deprecated. use `type` instead
		title: null, // the text that will be displayed in the header's title
	
		calendar: null, // owner Calendar object
		viewSpec: null,
		options: null, // hash containing all options. already merged with view-specific-options
	
		renderQueue: null,
		batchRenderDepth: 0,
		isDatesRendered: false,
		isEventsRendered: false,
		isBaseRendered: false, // related to viewRender/viewDestroy triggers
	
		queuedScroll: null,
	
		isSelected: false, // boolean whether a range of time is user-selected or not
		selectedEventInstance: null,
	
		eventOrderSpecs: null, // criteria for ordering events when they have same date/time
	
		// for date utils, computed from options
		isHiddenDayHash: null,
	
		// now indicator
		isNowIndicatorRendered: null,
		initialNowDate: null, // result first getNow call
		initialNowQueriedMs: null, // ms time the getNow was called
		nowIndicatorTimeoutID: null, // for refresh timing of now indicator
		nowIndicatorIntervalID: null, // "
	
	
		constructor: function(calendar, viewSpec) {
			this.calendar = calendar;
			this.viewSpec = viewSpec;
	
			// shortcuts
			this.type = viewSpec.type;
			this.options = viewSpec.options;
	
			// .name is deprecated
			this.name = this.type;
	
			ChronoComponent.call(this);
	
			this.initHiddenDays();
			this.eventOrderSpecs = parseFieldSpecs(this.opt('eventOrder'));
	
			this.renderQueue = this.buildRenderQueue();
			this.initAutoBatchRender();
	
			this.initialize();
		},
	
	
		buildRenderQueue: function() {
			var _this = this;
			var renderQueue = new RenderQueue({
				event: this.opt('eventRenderWait')
			});
	
			renderQueue.on('start', function() {
				_this.freezeHeight();
				_this.addScroll(_this.queryScroll());
			});
	
			renderQueue.on('stop', function() {
				_this.thawHeight();
				_this.popScroll();
			});
	
			return renderQueue;
		},
	
	
		initAutoBatchRender: function() {
			var _this = this;
	
			this.on('before:change', function() {
				_this.startBatchRender();
			});
	
			this.on('change', function() {
				_this.stopBatchRender();
			});
		},
	
	
		startBatchRender: function() {
			if (!(this.batchRenderDepth++)) {
				this.renderQueue.pause();
			}
		},
	
	
		stopBatchRender: function() {
			if (!(--this.batchRenderDepth)) {
				this.renderQueue.resume();
			}
		},
	
	
		// A good place for subclasses to initialize member variables
		initialize: function() {
			// subclasses can implement
		},
	
	
		// Retrieves an option with the given name
		opt: function(name) {
			return this.options[name];
		},
	
	
		/* Title and Date Formatting
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Computes what the title at the top of the calendar should be for this view
		computeTitle: function() {
			var unzonedRange;
	
			// for views that span a large unit of time, show the proper interval, ignoring stray days before and after
			if (/^(year|month)$/.test(this.currentRangeUnit)) {
				unzonedRange = this.currentUnzonedRange;
			}
			else { // for day units or smaller, use the actual day range
				unzonedRange = this.activeUnzonedRange;
			}
	
			return this.formatRange(
				{
					start: this.calendar.msToMoment(unzonedRange.startMs, this.isRangeAllDay),
					end: this.calendar.msToMoment(unzonedRange.endMs, this.isRangeAllDay)
				},
				this.isRangeAllDay,
				this.opt('titleFormat') || this.computeTitleFormat(),
				this.opt('titleRangeSeparator')
			);
		},
	
	
		// Generates the format string that should be used to generate the title for the current date range.
		// Attempts to compute the most appropriate format if not explicitly specified with `titleFormat`.
		computeTitleFormat: function() {
			if (this.currentRangeUnit == 'year') {
				return 'YYYY';
			}
			else if (this.currentRangeUnit == 'month') {
				return this.opt('monthYearFormat'); // like "September 2014"
			}
			else if (this.currentRangeAs('days') > 1) {
				return 'll'; // multi-day range. shorter, like "Sep 9 - 10 2014"
			}
			else {
				return 'LL'; // one day. longer, like "September 9 2014"
			}
		},
	
	
		// Element
		// -----------------------------------------------------------------------------------------------------------------
	
	
		setElement: function(el) {
			ChronoComponent.prototype.setElement.apply(this, arguments);
	
			this.bindBaseRenderHandlers();
		},
	
	
		removeElement: function() {
			this.unsetDate();
			this.unbindBaseRenderHandlers();
	
			ChronoComponent.prototype.removeElement.apply(this, arguments);
		},
	
	
		// Date Setting/Unsetting
		// -----------------------------------------------------------------------------------------------------------------
	
	
		setDate: function(date) {
			var currentDateProfile = this.get('dateProfile');
			var newDateProfile = this.buildDateProfile(date, null, true); // forceToValid=true
	
			if (
				!currentDateProfile ||
				!currentDateProfile.activeUnzonedRange.equals(newDateProfile.activeUnzonedRange)
			) {
				this.set('dateProfile', newDateProfile);
			}
	
			return newDateProfile.date;
		},
	
	
		unsetDate: function() {
			this.unset('dateProfile');
		},
	
	
		// Date Rendering
		// -----------------------------------------------------------------------------------------------------------------
	
	
		requestDateRender: function(dateProfile) {
			var _this = this;
	
			this.renderQueue.queue(function() {
				_this.executeDateRender(dateProfile);
			}, 'date', 'init');
		},
	
	
		requestDateUnrender: function() {
			var _this = this;
	
			this.renderQueue.queue(function() {
				_this.executeDateUnrender();
			}, 'date', 'destroy');
		},
	
	
		// Event Data
		// -----------------------------------------------------------------------------------------------------------------
	
	
		fetchInitialEvents: function(dateProfile) {
			var calendar = this.calendar;
			var forceAllDay = dateProfile.isRangeAllDay && !this.usesMinMaxTime;
	
			return calendar.requestEvents(
				calendar.msToMoment(dateProfile.activeUnzonedRange.startMs, forceAllDay),
				calendar.msToMoment(dateProfile.activeUnzonedRange.endMs, forceAllDay)
			);
		},
	
	
		bindEventChanges: function() {
			this.listenTo(this.calendar, 'eventsReset', this.resetEvents);
		},
	
	
		unbindEventChanges: function() {
			this.stopListeningTo(this.calendar, 'eventsReset');
		},
	
	
		setEvents: function(eventsPayload) {
			this.set('currentEvents', eventsPayload);
			this.set('hasEvents', true);
		},
	
	
		unsetEvents: function() {
			this.unset('currentEvents');
			this.unset('hasEvents');
		},
	
	
		resetEvents: function(eventsPayload) {
			this.startBatchRender();
			this.unsetEvents();
			this.setEvents(eventsPayload);
			this.stopBatchRender();
		},
	
	
		// Event Rendering
		// -----------------------------------------------------------------------------------------------------------------
	
	
		requestEventsRender: function(eventsPayload) {
			var _this = this;
	
			this.renderQueue.queue(function() {
				_this.executeEventsRender(eventsPayload);
			}, 'event', 'init');
		},
	
	
		requestEventsUnrender: function() {
			var _this = this;
	
			this.renderQueue.queue(function() {
				_this.executeEventsUnrender();
			}, 'event', 'destroy');
		},
	
	
		// Date High-level Rendering
		// -----------------------------------------------------------------------------------------------------------------
	
	
		// if dateProfile not specified, uses current
		executeDateRender: function(dateProfile, skipScroll) {
	
			this.setDateProfileForRendering(dateProfile);
	
			if (this.render) {
				this.render(); // TODO: deprecate
			}
	
			this.renderDates();
			this.updateSize();
			this.renderBusinessHours(); // might need coordinates, so should go after updateSize()
			this.startNowIndicator();
	
			if (!skipScroll) {
				this.addScroll(this.computeInitialDateScroll());
			}
	
			this.isDatesRendered = true;
			this.trigger('datesRendered');
		},
	
	
		executeDateUnrender: function() {
	
			this.unselect();
			this.stopNowIndicator();
	
			this.trigger('before:datesUnrendered');
	
			this.unrenderBusinessHours();
			this.unrenderDates();
	
			if (this.destroy) {
				this.destroy(); // TODO: deprecate
			}
	
			this.isDatesRendered = false;
		},
	
	
		// Determing when the "meat" of the view is rendered (aka the base)
		// -----------------------------------------------------------------------------------------------------------------
	
	
		bindBaseRenderHandlers: function() {
			var _this = this;
	
			this.on('datesRendered.baseHandler', function() {
				_this.onBaseRender();
			});
	
			this.on('before:datesUnrendered.baseHandler', function() {
				_this.onBeforeBaseUnrender();
			});
		},
	
	
		unbindBaseRenderHandlers: function() {
			this.off('.baseHandler');
		},
	
	
		onBaseRender: function() {
			this.applyScreenState();
			this.publiclyTrigger('viewRender', {
				context: this,
				args: [ this, this.el ]
			});
		},
	
	
		onBeforeBaseUnrender: function() {
			this.applyScreenState();
			this.publiclyTrigger('viewDestroy', {
				context: this,
				args: [ this, this.el ]
			});
		},
	
	
		// Misc view rendering utils
		// -----------------------------------------------------------------------------------------------------------------
	
	
		// Binds DOM handlers to elements that reside outside the view container, such as the document
		bindGlobalHandlers: function() {
			this.listenTo(GlobalEmitter.get(), {
				touchstart: this.processUnselect,
				mousedown: this.handleDocumentMousedown
			});
		},
	
	
		// Unbinds DOM handlers from elements that reside outside the view container
		unbindGlobalHandlers: function() {
			this.stopListeningTo(GlobalEmitter.get());
		},
	
	
		/* Now Indicator
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Immediately render the current time indicator and begins re-rendering it at an interval,
		// which is defined by this.getNowIndicatorUnit().
		// TODO: somehow do this for the current whole day's background too
		startNowIndicator: function() {
			var _this = this;
			var unit;
			var update;
			var delay; // ms wait value
	
			if (this.opt('nowIndicator')) {
				unit = this.getNowIndicatorUnit();
				if (unit) {
					update = proxy(this, 'updateNowIndicator'); // bind to `this`
	
					this.initialNowDate = this.calendar.getNow();
					this.initialNowQueriedMs = +new Date();
					this.renderNowIndicator(this.initialNowDate);
					this.isNowIndicatorRendered = true;
	
					// wait until the beginning of the next interval
					delay = this.initialNowDate.clone().startOf(unit).add(1, unit) - this.initialNowDate;
					this.nowIndicatorTimeoutID = setTimeout(function() {
						_this.nowIndicatorTimeoutID = null;
						update();
						delay = +moment.duration(1, unit);
						delay = Math.max(100, delay); // prevent too frequent
						_this.nowIndicatorIntervalID = setInterval(update, delay); // update every interval
					}, delay);
				}
			}
		},
	
	
		// rerenders the now indicator, computing the new current time from the amount of time that has passed
		// since the initial getNow call.
		updateNowIndicator: function() {
			if (this.isNowIndicatorRendered) {
				this.unrenderNowIndicator();
				this.renderNowIndicator(
					this.initialNowDate.clone().add(new Date() - this.initialNowQueriedMs) // add ms
				);
			}
		},
	
	
		// Immediately unrenders the view's current time indicator and stops any re-rendering timers.
		// Won't cause side effects if indicator isn't rendered.
		stopNowIndicator: function() {
			if (this.isNowIndicatorRendered) {
	
				if (this.nowIndicatorTimeoutID) {
					clearTimeout(this.nowIndicatorTimeoutID);
					this.nowIndicatorTimeoutID = null;
				}
				if (this.nowIndicatorIntervalID) {
					clearTimeout(this.nowIndicatorIntervalID);
					this.nowIndicatorIntervalID = null;
				}
	
				this.unrenderNowIndicator();
				this.isNowIndicatorRendered = false;
			}
		},
	
	
		/* Dimensions
		------------------------------------------------------------------------------------------------------------------*/
		// TODO: move some of these to ChronoComponent
	
	
		// Refreshes anything dependant upon sizing of the container element of the grid
		updateSize: function(isResize) {
			var scroll;
	
			if (isResize) {
				scroll = this.queryScroll();
			}
	
			this.updateHeight(isResize);
			this.updateWidth(isResize);
			this.updateNowIndicator();
	
			if (isResize) {
				this.applyScroll(scroll);
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
	
	
		addForcedScroll: function(scroll) {
			this.addScroll(
				$.extend(scroll, { isForced: true })
			);
		},
	
	
		addScroll: function(scroll) {
			var queuedScroll = this.queuedScroll || (this.queuedScroll = {});
	
			if (!queuedScroll.isForced) {
				$.extend(queuedScroll, scroll);
			}
		},
	
	
		popScroll: function() {
			this.applyQueuedScroll();
			this.queuedScroll = null;
		},
	
	
		applyQueuedScroll: function() {
			if (this.queuedScroll) {
				this.applyScroll(this.queuedScroll);
			}
		},
	
	
		queryScroll: function() {
			var scroll = {};
	
			if (this.isDatesRendered) {
				$.extend(scroll, this.queryDateScroll());
			}
	
			return scroll;
		},
	
	
		applyScroll: function(scroll) {
			if (this.isDatesRendered) {
				this.applyDateScroll(scroll);
			}
		},
	
	
		computeInitialDateScroll: function() {
			return {}; // subclasses must implement
		},
	
	
		queryDateScroll: function() {
			return {}; // subclasses must implement
		},
	
	
		applyDateScroll: function(scroll) {
			; // subclasses must implement
		},
	
	
		/* Height Freezing
		------------------------------------------------------------------------------------------------------------------*/
	
	
		freezeHeight: function() {
			this.calendar.freezeContentHeight();
		},
	
	
		thawHeight: function() {
			this.calendar.thawContentHeight();
		},
	
	
		// Event High-level Rendering
		// -----------------------------------------------------------------------------------------------------------------
	
	
		executeEventsRender: function(eventsPayload) {
	
			if (this.renderEvents) { // for legacy custom views
				this.renderEvents(convertEventsPayloadToLegacyArray(eventsPayload));
			}
			else {
				this.renderEventsPayload(eventsPayload);
			}
	
			this.isEventsRendered = true;
	
			this.onEventsRender();
		},
	
	
		executeEventsUnrender: function() {
			this.onBeforeEventsUnrender();
	
			if (this.destroyEvents) {
				this.destroyEvents(); // TODO: deprecate
			}
	
			this.unrenderEvents();
			this.isEventsRendered = false;
		},
	
	
		// Event Rendering Triggers
		// -----------------------------------------------------------------------------------------------------------------
	
	
		// Signals that all events have been rendered
		onEventsRender: function() {
			var _this = this;
			var hasSingleHandlers = this.hasPublicHandlers('eventAfterRender');
	
			if (hasSingleHandlers || this.hasPublicHandlers('eventAfterAllRender')) {
				this.applyScreenState();
			}
	
			if (hasSingleHandlers) {
				this.getEventSegs().forEach(function(seg) {
					var legacy;
	
					if (seg.el) { // necessary?
						legacy = seg.footprint.getEventLegacy();
	
						_this.publiclyTrigger('eventAfterRender', {
							context: legacy,
							args: [ legacy, seg.el, _this ]
						});
					}
				});
			}
	
			this.publiclyTrigger('eventAfterAllRender', {
				context: this,
				args: [ this ]
			});
		},
	
	
		// Signals that all event elements are about to be removed
		onBeforeEventsUnrender: function() {
			var _this = this;
	
			if (this.hasPublicHandlers('eventDestroy')) {
	
				this.applyScreenState();
	
				this.getEventSegs().forEach(function(seg) {
					var legacy;
	
					if (seg.el) { // necessary?
						legacy = seg.footprint.getEventLegacy();
	
						_this.publiclyTrigger('eventDestroy', {
							context: legacy,
							args: [ legacy, seg.el, _this ]
						});
					}
				});
			}
		},
	
	
		applyScreenState: function() {
			this.thawHeight();
			this.freezeHeight();
			this.applyQueuedScroll();
		},
	
	
		// Event Rendering Utils
		// -----------------------------------------------------------------------------------------------------------------
		// TODO: move this to ChronoComponent
	
	
		// Hides all rendered event segments linked to the given event
		showEventsWithId: function(eventDefId) {
			this.getEventSegs().forEach(function(seg) {
				if (
					seg.footprint.eventDef.id === eventDefId &&
					seg.el // necessary?
				) {
					seg.el.css('visibility', '');
				}
			});
		},
	
	
		// Shows all rendered event segments linked to the given event
		hideEventsWithId: function(eventDefId) {
			this.getEventSegs().forEach(function(seg) {
				if (
					seg.footprint.eventDef.id === eventDefId &&
					seg.el // necessary?
				) {
					seg.el.css('visibility', 'hidden');
				}
			});
		},
	
	
		/* Event Drag-n-Drop
		------------------------------------------------------------------------------------------------------------------*/
	
	
		reportEventDrop: function(eventInstance, eventMutation, el, ev) {
			var eventManager = this.calendar.eventManager;
			var undoFunc = eventManager.mutateEventsWithId(
				eventInstance.def.id,
				eventMutation,
				this.calendar
			);
			var dateMutation = eventMutation.dateMutation;
	
			// update the EventInstance, for handlers
			if (dateMutation) {
				eventInstance.dateProfile = dateMutation.buildNewDateProfile(
					eventInstance.dateProfile,
					this.calendar
				);
			}
	
			this.triggerEventDrop(
				eventInstance,
				// a drop doesn't necessarily mean a date mutation (ex: resource change)
				(dateMutation && dateMutation.dateDelta) || moment.duration(),
				undoFunc,
				el, ev
			);
		},
	
	
		// Triggers event-drop handlers that have subscribed via the API
		triggerEventDrop: function(eventInstance, dateDelta, undoFunc, el, ev) {
			this.publiclyTrigger('eventDrop', {
				context: el[0],
				args: [
					eventInstance.toLegacy(),
					dateDelta,
					undoFunc,
					ev,
					{}, // {} = jqui dummy
					this
				]
			});
		},
	
	
		/* External Element Drag-n-Drop
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Must be called when an external element, via jQuery UI, has been dropped onto the calendar.
		// `meta` is the parsed data that has been embedded into the dragging event.
		// `dropLocation` is an object that contains the new zoned start/end/allDay values for the event.
		reportExternalDrop: function(singleEventDef, isEvent, isSticky, el, ev, ui) {
	
			if (isEvent) {
				this.calendar.eventManager.addEventDef(singleEventDef, isSticky);
			}
	
			this.triggerExternalDrop(singleEventDef, isEvent, el, ev, ui);
		},
	
	
		// Triggers external-drop handlers that have subscribed via the API
		triggerExternalDrop: function(singleEventDef, isEvent, el, ev, ui) {
	
			// trigger 'drop' regardless of whether element represents an event
			this.publiclyTrigger('drop', {
				context: el[0],
				args: [
					singleEventDef.dateProfile.start.clone(),
					ev,
					ui,
					this
				]
			});
	
			if (isEvent) {
				// signal an external event landed
				this.publiclyTrigger('eventReceive', {
					context: this,
					args: [
						singleEventDef.buildInstance().toLegacy(),
						this
					]
				});
			}
		},
	
	
		/* Event Resizing
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Must be called when an event in the view has been resized to a new length
		reportEventResize: function(eventInstance, eventMutation, el, ev) {
			var eventManager = this.calendar.eventManager;
			var undoFunc = eventManager.mutateEventsWithId(
				eventInstance.def.id,
				eventMutation,
				this.calendar
			);
	
			// update the EventInstance, for handlers
			eventInstance.dateProfile = eventMutation.dateMutation.buildNewDateProfile(
				eventInstance.dateProfile,
				this.calendar
			);
	
			this.triggerEventResize(
				eventInstance,
				eventMutation.dateMutation.endDelta,
				undoFunc,
				el, ev
			);
		},
	
	
		// Triggers event-resize handlers that have subscribed via the API
		triggerEventResize: function(eventInstance, durationDelta, undoFunc, el, ev) {
			this.publiclyTrigger('eventResize', {
				context: el[0],
				args: [
					eventInstance.toLegacy(),
					durationDelta,
					undoFunc,
					ev,
					{}, // {} = jqui dummy
					this
				]
			});
		},
	
	
		/* Selection (time range)
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Selects a date span on the view. `start` and `end` are both Moments.
		// `ev` is the native mouse event that begin the interaction.
		select: function(footprint, ev) {
			this.unselect(ev);
			this.renderSelectionFootprint(footprint);
			this.reportSelection(footprint, ev);
		},
	
	
		renderSelectionFootprint: function(footprint, ev) {
			if (this.renderSelection) { // legacy method in custom view classes
				this.renderSelection(
					footprint.toLegacy(this.calendar)
				);
			}
			else {
				ChronoComponent.prototype.renderSelectionFootprint.apply(this, arguments);
			}
		},
	
	
		// Called when a new selection is made. Updates internal state and triggers handlers.
		reportSelection: function(footprint, ev) {
			this.isSelected = true;
			this.triggerSelect(footprint, ev);
		},
	
	
		// Triggers handlers to 'select'
		triggerSelect: function(footprint, ev) {
			var dateProfile = this.calendar.footprintToDateProfile(footprint); // abuse of "Event"DateProfile?
	
			this.publiclyTrigger('select', {
				context: this,
				args: [
					dateProfile.start,
					dateProfile.end,
					ev,
					this
				]
			});
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
				this.publiclyTrigger('unselect', {
					context: this,
					args: [ ev, this ]
				});
			}
		},
	
	
		/* Event Selection
		------------------------------------------------------------------------------------------------------------------*/
	
	
		selectEventInstance: function(eventInstance) {
			if (
				!this.selectedEventInstance ||
				this.selectedEventInstance !== eventInstance
			) {
				this.unselectEventInstance();
	
				this.getEventSegs().forEach(function(seg) {
					if (
						seg.footprint.eventInstance === eventInstance &&
						seg.el // necessary?
					) {
						seg.el.addClass('fc-selected');
					}
				});
	
				this.selectedEventInstance = eventInstance;
			}
		},
	
	
		unselectEventInstance: function() {
			if (this.selectedEventInstance) {
	
				this.getEventSegs().forEach(function(seg) {
					if (seg.el) { // necessary?
						seg.el.removeClass('fc-selected');
					}
				});
	
				this.selectedEventInstance = null;
			}
		},
	
	
		isEventDefSelected: function(eventDef) {
			// event references might change on refetchEvents(), while selectedEventInstance doesn't,
			// so compare IDs
			return this.selectedEventInstance && this.selectedEventInstance.def.id === eventDef.id;
		},
	
	
		/* Mouse / Touch Unselecting (time range & event unselection)
		------------------------------------------------------------------------------------------------------------------*/
		// TODO: move consistently to down/start or up/end?
		// TODO: don't kill previous selection if touch scrolling
	
	
		handleDocumentMousedown: function(ev) {
			if (isPrimaryMouseButton(ev)) {
				this.processUnselect(ev);
			}
		},
	
	
		processUnselect: function(ev) {
			this.processRangeUnselect(ev);
			this.processEventUnselect(ev);
		},
	
	
		processRangeUnselect: function(ev) {
			var ignore;
	
			// is there a time-range selection?
			if (this.isSelected && this.opt('unselectAuto')) {
				// only unselect if the clicked element is not identical to or inside of an 'unselectCancel' element
				ignore = this.opt('unselectCancel');
				if (!ignore || !$(ev.target).closest(ignore).length) {
					this.unselect(ev);
				}
			}
		},
	
	
		processEventUnselect: function(ev) {
			if (this.selectedEventInstance) {
				if (!$(ev.target).closest('.fc-selected').length) {
					this.unselectEventInstance();
				}
			}
		},
	
	
		/* Day Click
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Triggers handlers to 'dayClick'
		// Span has start/end of the clicked area. Only the start is useful.
		triggerDayClick: function(footprint, dayEl, ev) {
			var dateProfile = this.calendar.footprintToDateProfile(footprint); // abuse of "Event"DateProfile?
	
			this.publiclyTrigger('dayClick', {
				context: dayEl,
				args: [ dateProfile.start, ev, this ]
			});
		}
	
	});
	
	
	View.watch('displayingDates', [ 'dateProfile' ], function(deps) {
		this.requestDateRender(deps.dateProfile);
	}, function() {
		this.requestDateUnrender();
	});
	
	
	View.watch('initialEvents', [ 'dateProfile' ], function(deps) {
		return this.fetchInitialEvents(deps.dateProfile);
	});
	
	
	View.watch('bindingEvents', [ 'initialEvents' ], function(deps) {
		this.setEvents(deps.initialEvents);
		this.bindEventChanges();
	}, function() {
		this.unbindEventChanges();
		this.unsetEvents();
	});
	
	
	View.watch('displayingEvents', [ 'displayingDates', 'hasEvents' ], function() {
		this.requestEventsRender(this.get('currentEvents')); // if there were event mutations after initialEvents
	}, function() {
		this.requestEventsUnrender();
	});
	
	
	function convertEventsPayloadToLegacyArray(eventsPayload) {
		var legacyEvents = [];
		var id;
		var eventInstances;
		var i;
	
		for (id in eventsPayload) {
	
			eventInstances = eventsPayload[id].eventInstances;
	
			for (i = 0; i < eventInstances.length; i++) {
				legacyEvents.push(
					eventInstances[i].toLegacy()
				);
			}
		}
	
		return legacyEvents;
	}
	
	;;
	
	View.mixin({
	
		// range the view is formally responsible for.
		// for example, a month view might have 1st-31st, excluding padded dates
		currentUnzonedRange: null,
		currentRangeUnit: null, // name of largest unit being displayed, like "month" or "week"
	
		isRangeAllDay: false,
	
		// date range with a rendered skeleton
		// includes not-active days that need some sort of DOM
		renderUnzonedRange: null,
	
		// dates that display events and accept drag-n-drop
		activeUnzonedRange: null,
	
		// constraint for where prev/next operations can go and where events can be dragged/resized to.
		// an object with optional start and end properties.
		validUnzonedRange: null,
	
		// how far the current date will move for a prev/next operation
		dateIncrement: null,
	
		minTime: null, // Duration object that denotes the first visible time of any given day
		maxTime: null, // Duration object that denotes the exclusive visible end time of any given day
		usesMinMaxTime: false, // whether minTime/maxTime will affect the activeUnzonedRange. Views must opt-in.
	
		// DEPRECATED
		start: null, // use activeUnzonedRange
		end: null, // use activeUnzonedRange
		intervalStart: null, // use currentUnzonedRange
		intervalEnd: null, // use currentUnzonedRange
	
	
		/* Date Range Computation
		------------------------------------------------------------------------------------------------------------------*/
	
	
		setDateProfileForRendering: function(dateProfile) {
			var calendar = this.calendar;
	
			this.currentUnzonedRange = dateProfile.currentUnzonedRange;
			this.currentRangeUnit = dateProfile.currentRangeUnit;
			this.isRangeAllDay = dateProfile.isRangeAllDay;
			this.renderUnzonedRange = dateProfile.renderUnzonedRange;
			this.activeUnzonedRange = dateProfile.activeUnzonedRange;
			this.validUnzonedRange = dateProfile.validUnzonedRange;
			this.dateIncrement = dateProfile.dateIncrement;
			this.minTime = dateProfile.minTime;
			this.maxTime = dateProfile.maxTime;
	
			// DEPRECATED, but we need to keep it updated...
			this.start = calendar.msToMoment(dateProfile.activeUnzonedRange.startMs, this.isRangeAllDay);
			this.end = calendar.msToMoment(dateProfile.activeUnzonedRange.endMs, this.isRangeAllDay);
			this.intervalStart = calendar.msToMoment(dateProfile.currentUnzonedRange.startMs, this.isRangeAllDay);
			this.intervalEnd = calendar.msToMoment(dateProfile.currentUnzonedRange.endMs, this.isRangeAllDay);
	
			this.title = this.computeTitle();
			this.calendar.reportViewDatesChanged(this, dateProfile);
		},
	
	
		// Builds a structure with info about what the dates/ranges will be for the "prev" view.
		buildPrevDateProfile: function(date) {
			var prevDate = date.clone().startOf(this.currentRangeUnit).subtract(this.dateIncrement);
	
			return this.buildDateProfile(prevDate, -1);
		},
	
	
		// Builds a structure with info about what the dates/ranges will be for the "next" view.
		buildNextDateProfile: function(date) {
			var nextDate = date.clone().startOf(this.currentRangeUnit).add(this.dateIncrement);
	
			return this.buildDateProfile(nextDate, 1);
		},
	
	
		// Builds a structure holding dates/ranges for rendering around the given date.
		// Optional direction param indicates whether the date is being incremented/decremented
		// from its previous value. decremented = -1, incremented = 1 (default).
		buildDateProfile: function(date, direction, forceToValid) {
			var isDateAllDay = !date.hasTime();
			var validUnzonedRange = this.buildValidRange();
			var minTime = null;
			var maxTime = null;
			var currentInfo;
			var renderUnzonedRange;
			var activeUnzonedRange;
			var isValid;
	
			if (forceToValid) {
				date = this.calendar.msToUtcMoment(
					validUnzonedRange.constrainDate(date), // returns MS
					isDateAllDay
				);
			}
	
			currentInfo = this.buildCurrentRangeInfo(date, direction);
			renderUnzonedRange = this.buildRenderRange(currentInfo.unzonedRange, currentInfo.unit);
			activeUnzonedRange = renderUnzonedRange.clone();
	
			if (!this.opt('showNonCurrentDates')) {
				activeUnzonedRange = activeUnzonedRange.intersect(currentInfo.unzonedRange);
			}
	
			minTime = moment.duration(this.opt('minTime'));
			maxTime = moment.duration(this.opt('maxTime'));
			activeUnzonedRange = this.adjustActiveRange(activeUnzonedRange, minTime, maxTime);
	
			activeUnzonedRange = activeUnzonedRange.intersect(validUnzonedRange);
	
			if (activeUnzonedRange) {
				date = this.calendar.msToUtcMoment(
					activeUnzonedRange.constrainDate(date), // returns MS
					isDateAllDay
				);
			}
	
			// it's invalid if the originally requested date is not contained,
			// or if the range is completely outside of the valid range.
			isValid = currentInfo.unzonedRange.intersectsWith(validUnzonedRange);
	
			return {
				validUnzonedRange: validUnzonedRange,
				currentUnzonedRange: currentInfo.unzonedRange,
				currentRangeUnit: currentInfo.unit,
				isRangeAllDay: /^(year|month|week|day)$/.test(currentInfo.unit),
				activeUnzonedRange: activeUnzonedRange,
				renderUnzonedRange: renderUnzonedRange,
				minTime: minTime,
				maxTime: maxTime,
				isValid: isValid,
				date: date,
				dateIncrement: this.buildDateIncrement(currentInfo.duration)
					// pass a fallback (might be null) ^
			};
		},
	
	
		// Builds an object with optional start/end properties.
		// Indicates the minimum/maximum dates to display.
		buildValidRange: function() {
			return this.getUnzonedRangeOption('validRange', this.calendar.getNow()) ||
				new UnzonedRange(); // completely open-ended
		},
	
	
		// Builds a structure with info about the "current" range, the range that is
		// highlighted as being the current month for example.
		// See buildDateProfile for a description of `direction`.
		// Guaranteed to have `range` and `unit` properties. `duration` is optional.
		// TODO: accept a MS-time instead of a moment `date`?
		buildCurrentRangeInfo: function(date, direction) {
			var duration = null;
			var unit = null;
			var unzonedRange = null;
			var dayCount;
	
			if (this.viewSpec.duration) {
				duration = this.viewSpec.duration;
				unit = this.viewSpec.durationUnit;
				unzonedRange = this.buildRangeFromDuration(date, direction, duration, unit);
			}
			else if ((dayCount = this.opt('dayCount'))) {
				unit = 'day';
				unzonedRange = this.buildRangeFromDayCount(date, direction, dayCount);
			}
			else if ((unzonedRange = this.buildCustomVisibleRange(date))) {
				unit = computeGreatestUnit(unzonedRange.getStart(), unzonedRange.getEnd());
			}
			else {
				duration = this.getFallbackDuration();
				unit = computeGreatestUnit(duration);
				unzonedRange = this.buildRangeFromDuration(date, direction, duration, unit);
			}
	
			return { duration: duration, unit: unit, unzonedRange: unzonedRange };
		},
	
	
		getFallbackDuration: function() {
			return moment.duration({ days: 1 });
		},
	
	
		// Returns a new activeUnzonedRange to have time values (un-ambiguate)
		// minTime or maxTime causes the range to expand.
		adjustActiveRange: function(unzonedRange, minTime, maxTime) {
			var start = unzonedRange.getStart();
			var end = unzonedRange.getEnd();
	
			if (this.usesMinMaxTime) {
	
				if (minTime < 0) {
					start.time(0).add(minTime);
				}
	
				if (maxTime > 24 * 60 * 60 * 1000) { // beyond 24 hours?
					end.time(maxTime - (24 * 60 * 60 * 1000));
				}
			}
	
			return new UnzonedRange(start, end);
		},
	
	
		// Builds the "current" range when it is specified as an explicit duration.
		// `unit` is the already-computed computeGreatestUnit value of duration.
		// TODO: accept a MS-time instead of a moment `date`?
		buildRangeFromDuration: function(date, direction, duration, unit) {
			var alignment = this.opt('dateAlignment');
			var start = date.clone();
			var end;
			var dateIncrementInput;
			var dateIncrementDuration;
	
			// if the view displays a single day or smaller
			if (duration.as('days') <= 1) {
				if (this.isHiddenDay(start)) {
					start = this.skipHiddenDays(start, direction);
					start.startOf('day');
				}
			}
	
			// compute what the alignment should be
			if (!alignment) {
				dateIncrementInput = this.opt('dateIncrement');
	
				if (dateIncrementInput) {
					dateIncrementDuration = moment.duration(dateIncrementInput);
	
					// use the smaller of the two units
					if (dateIncrementDuration < duration) {
						alignment = computeDurationGreatestUnit(dateIncrementDuration, dateIncrementInput);
					}
					else {
						alignment = unit;
					}
				}
				else {
					alignment = unit;
				}
			}
	
			start.startOf(alignment);
			end = start.clone().add(duration);
	
			return new UnzonedRange(start, end);
		},
	
	
		// Builds the "current" range when a dayCount is specified.
		// TODO: accept a MS-time instead of a moment `date`?
		buildRangeFromDayCount: function(date, direction, dayCount) {
			var customAlignment = this.opt('dateAlignment');
			var runningCount = 0;
			var start = date.clone();
			var end;
	
			if (customAlignment) {
				start.startOf(customAlignment);
			}
	
			start.startOf('day');
			start = this.skipHiddenDays(start, direction);
	
			end = start.clone();
			do {
				end.add(1, 'day');
				if (!this.isHiddenDay(end)) {
					runningCount++;
				}
			} while (runningCount < dayCount);
	
			return new UnzonedRange(start, end);
		},
	
	
		// Builds a normalized range object for the "visible" range,
		// which is a way to define the currentUnzonedRange and activeUnzonedRange at the same time.
		// TODO: accept a MS-time instead of a moment `date`?
		buildCustomVisibleRange: function(date) {
			var visibleUnzonedRange = this.getUnzonedRangeOption(
				'visibleRange',
				this.calendar.applyTimezone(date) // correct zone. also generates new obj that avoids mutations
			);
	
			if (visibleUnzonedRange && (visibleUnzonedRange.startMs === null || visibleUnzonedRange.endMs === null)) {
				return null;
			}
	
			return visibleUnzonedRange;
		},
	
	
		// Computes the range that will represent the element/cells for *rendering*,
		// but which may have voided days/times.
		buildRenderRange: function(currentUnzonedRange, currentRangeUnit) {
			// cut off days in the currentUnzonedRange that are hidden
			return this.trimHiddenDays(currentUnzonedRange);
		},
	
	
		// Compute the duration value that should be added/substracted to the current date
		// when a prev/next operation happens.
		buildDateIncrement: function(fallback) {
			var dateIncrementInput = this.opt('dateIncrement');
			var customAlignment;
	
			if (dateIncrementInput) {
				return moment.duration(dateIncrementInput);
			}
			else if ((customAlignment = this.opt('dateAlignment'))) {
				return moment.duration(1, customAlignment);
			}
			else if (fallback) {
				return fallback;
			}
			else {
				return moment.duration({ days: 1 });
			}
		},
	
	
		// Remove days from the beginning and end of the range that are computed as hidden.
		trimHiddenDays: function(inputUnzonedRange) {
			var start = inputUnzonedRange.getStart();
			var end = inputUnzonedRange.getEnd();
	
			start = this.skipHiddenDays(start);
			end = this.skipHiddenDays(end, -1, true);
	
			return new UnzonedRange(start, end);
		},
	
	
		// Compute the number of the give units in the "current" range.
		// Will return a floating-point number. Won't round.
		currentRangeAs: function(unit) {
			var currentUnzonedRange = this.currentUnzonedRange;
	
			return moment.utc(currentUnzonedRange.endMs).diff(
				moment.utc(currentUnzonedRange.startMs),
				unit,
				true
			);
		},
	
	
		// For ChronoComponent::getDayClasses
		isDateInOtherMonth: function(date) {
			return false;
		},
	
	
		// Arguments after name will be forwarded to a hypothetical function value
		// WARNING: passed-in arguments will be given to generator functions as-is and can cause side-effects.
		// Always clone your objects if you fear mutation.
		getUnzonedRangeOption: function(name) {
			var val = this.opt(name);
	
			if (typeof val === 'function') {
				val = val.apply(
					null,
					Array.prototype.slice.call(arguments, 1)
				);
			}
	
			if (val) {
				return this.calendar.parseUnzonedRange(val);
			}
		},
	
	
		/* Hidden Days
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
		// DOES NOT CONSIDER validUnzonedRange!
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
		}
	
	});
	
	;;
	
	/*
	Embodies a div that has potential scrollbars
	*/
	var Scroller = FC.Scroller = Class.extend({
	
		el: null, // the guaranteed outer element
		scrollEl: null, // the element with the scrollbars
		overflowX: null,
		overflowY: null,
	
	
		constructor: function(options) {
			options = options || {};
			this.overflowX = options.overflowX || options.overflow || 'auto';
			this.overflowY = options.overflowY || options.overflow || 'auto';
		},
	
	
		render: function() {
			this.el = this.renderEl();
			this.applyOverflow();
		},
	
	
		renderEl: function() {
			return (this.scrollEl = $('<div class="fc-scroller"></div>'));
		},
	
	
		// sets to natural height, unlocks overflow
		clear: function() {
			this.setHeight('auto');
			this.applyOverflow();
		},
	
	
		destroy: function() {
			this.el.remove();
		},
	
	
		// Overflow
		// -----------------------------------------------------------------------------------------------------------------
	
	
		applyOverflow: function() {
			this.scrollEl.css({
				'overflow-x': this.overflowX,
				'overflow-y': this.overflowY
			});
		},
	
	
		// Causes any 'auto' overflow values to resolves to 'scroll' or 'hidden'.
		// Useful for preserving scrollbar widths regardless of future resizes.
		// Can pass in scrollbarWidths for optimization.
		lockOverflow: function(scrollbarWidths) {
			var overflowX = this.overflowX;
			var overflowY = this.overflowY;
	
			scrollbarWidths = scrollbarWidths || this.getScrollbarWidths();
	
			if (overflowX === 'auto') {
				overflowX = (
						scrollbarWidths.top || scrollbarWidths.bottom || // horizontal scrollbars?
						// OR scrolling pane with massless scrollbars?
						this.scrollEl[0].scrollWidth - 1 > this.scrollEl[0].clientWidth
							// subtract 1 because of IE off-by-one issue
					) ? 'scroll' : 'hidden';
			}
	
			if (overflowY === 'auto') {
				overflowY = (
						scrollbarWidths.left || scrollbarWidths.right || // vertical scrollbars?
						// OR scrolling pane with massless scrollbars?
						this.scrollEl[0].scrollHeight - 1 > this.scrollEl[0].clientHeight
							// subtract 1 because of IE off-by-one issue
					) ? 'scroll' : 'hidden';
			}
	
			this.scrollEl.css({ 'overflow-x': overflowX, 'overflow-y': overflowY });
		},
	
	
		// Getters / Setters
		// -----------------------------------------------------------------------------------------------------------------
	
	
		setHeight: function(height) {
			this.scrollEl.height(height);
		},
	
	
		getScrollTop: function() {
			return this.scrollEl.scrollTop();
		},
	
	
		setScrollTop: function(top) {
			this.scrollEl.scrollTop(top);
		},
	
	
		getClientWidth: function() {
			return this.scrollEl[0].clientWidth;
		},
	
	
		getClientHeight: function() {
			return this.scrollEl[0].clientHeight;
		},
	
	
		getScrollbarWidths: function() {
			return getScrollbarWidths(this.scrollEl);
		}
	
	});
	
	;;
	function Iterator(items) {
	    this.items = items || [];
	}
	
	
	/* Calls a method on every item passing the arguments through */
	Iterator.prototype.proxyCall = function(methodName) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    var results = [];
	
	    this.items.forEach(function(item) {
	        results.push(item[methodName].apply(item, args));
	    });
	
	    return results;
	};
	
	;;
	
	/* Toolbar with buttons and title
	----------------------------------------------------------------------------------------------------------------------*/
	
	function Toolbar(calendar, toolbarOptions) {
		var t = this;
	
		// exports
		t.setToolbarOptions = setToolbarOptions;
		t.render = render;
		t.removeElement = removeElement;
		t.updateTitle = updateTitle;
		t.activateButton = activateButton;
		t.deactivateButton = deactivateButton;
		t.disableButton = disableButton;
		t.enableButton = enableButton;
		t.getViewsWithButtons = getViewsWithButtons;
		t.el = null; // mirrors local `el`
	
		// locals
		var el;
		var viewsWithButtons = [];
	
		// method to update toolbar-specific options, not calendar-wide options
		function setToolbarOptions(newToolbarOptions) {
			toolbarOptions = newToolbarOptions;
		}
	
		// can be called repeatedly and will rerender
		function render() {
			var sections = toolbarOptions.layout;
	
			if (sections) {
				if (!el) {
					el = this.el = $("<div class='fc-toolbar "+ toolbarOptions.extraClasses + "'/>");
				}
				else {
					el.empty();
				}
				el.append(renderSection('left'))
					.append(renderSection('right'))
					.append(renderSection('center'))
					.append('<div class="fc-clear"/>');
			}
			else {
				removeElement();
			}
		}
	
	
		function removeElement() {
			if (el) {
				el.remove();
				el = t.el = null;
			}
		}
	
	
		function renderSection(position) {
			var theme = calendar.theme;
			var sectionEl = $('<div class="fc-' + position + '"/>');
			var buttonStr = toolbarOptions.layout[position];
			var calendarCustomButtons = calendar.opt('customButtons') || {};
			var calendarButtonTextOverrides = calendar.overrides.buttonText || {};
			var calendarButtonText = calendar.opt('buttonText') || {};
	
			if (buttonStr) {
				$.each(buttonStr.split(' '), function(i) {
					var groupChildren = $();
					var isOnlyButtons = true;
					var groupEl;
	
					$.each(this.split(','), function(j, buttonName) {
						var customButtonProps;
						var viewSpec;
						var buttonClick;
						var buttonIcon; // only one of these will be set
						var buttonText; // "
						var buttonInnerHtml;
						var buttonClasses;
						var buttonEl;
	
						if (buttonName == 'title') {
							groupChildren = groupChildren.add($('<h2>&nbsp;</h2>')); // we always want it to take up height
							isOnlyButtons = false;
						}
						else {
	
							if ((customButtonProps = calendarCustomButtons[buttonName])) {
								buttonClick = function(ev) {
									if (customButtonProps.click) {
										customButtonProps.click.call(buttonEl[0], ev);
									}
								};
								(buttonIcon = theme.getCustomButtonIconClass(customButtonProps)) ||
								(buttonIcon = theme.getIconClass(buttonName)) ||
								(buttonText = customButtonProps.text); // jshint ignore:line
							}
							else if ((viewSpec = calendar.getViewSpec(buttonName))) {
								viewsWithButtons.push(buttonName);
								buttonClick = function() {
									calendar.changeView(buttonName);
								};
								(buttonText = viewSpec.buttonTextOverride) ||
								(buttonIcon = theme.getIconClass(buttonName)) ||
								(buttonText = viewSpec.buttonTextDefault); // jshint ignore:line
							}
							else if (calendar[buttonName]) { // a calendar method
								buttonClick = function() {
									calendar[buttonName]();
								};
								(buttonText = calendarButtonTextOverrides[buttonName]) ||
								(buttonIcon = theme.getIconClass(buttonName)) ||
								(buttonText = calendarButtonText[buttonName]); // jshint ignore:line
								//            ^ everything else is considered default
							}
	
							if (buttonClick) {
	
								buttonClasses = [
									'fc-' + buttonName + '-button',
									theme.getClass('button'),
									theme.getClass('stateDefault')
								];
	
								if (buttonText) {
									buttonInnerHtml = htmlEscape(buttonText);
								}
								else if (buttonIcon) {
									buttonInnerHtml = "<span class='" + buttonIcon + "'></span>";
								}
	
								buttonEl = $( // type="button" so that it doesn't submit a form
									'<button type="button" class="' + buttonClasses.join(' ') + '">' +
										buttonInnerHtml +
									'</button>'
									)
									.click(function(ev) {
										// don't process clicks for disabled buttons
										if (!buttonEl.hasClass(theme.getClass('stateDisabled'))) {
	
											buttonClick(ev);
	
											// after the click action, if the button becomes the "active" tab, or disabled,
											// it should never have a hover class, so remove it now.
											if (
												buttonEl.hasClass(theme.getClass('stateActive')) ||
												buttonEl.hasClass(theme.getClass('stateDisabled'))
											) {
												buttonEl.removeClass(theme.getClass('stateHover'));
											}
										}
									})
									.mousedown(function() {
										// the *down* effect (mouse pressed in).
										// only on buttons that are not the "active" tab, or disabled
										buttonEl
											.not('.' + theme.getClass('stateActive'))
											.not('.' + theme.getClass('stateDisabled'))
											.addClass(theme.getClass('stateDown'));
									})
									.mouseup(function() {
										// undo the *down* effect
										buttonEl.removeClass(theme.getClass('stateDown'));
									})
									.hover(
										function() {
											// the *hover* effect.
											// only on buttons that are not the "active" tab, or disabled
											buttonEl
												.not('.' + theme.getClass('stateActive'))
												.not('.' + theme.getClass('stateDisabled'))
												.addClass(theme.getClass('stateHover'));
										},
										function() {
											// undo the *hover* effect
											buttonEl
												.removeClass(theme.getClass('stateHover'))
												.removeClass(theme.getClass('stateDown')); // if mouseleave happens before mouseup
										}
									);
	
								groupChildren = groupChildren.add(buttonEl);
							}
						}
					});
	
					if (isOnlyButtons) {
						groupChildren
							.first().addClass(theme.getClass('cornerLeft')).end()
							.last().addClass(theme.getClass('cornerRight')).end();
					}
	
					if (groupChildren.length > 1) {
						groupEl = $('<div/>');
						if (isOnlyButtons) {
							groupEl.addClass(theme.getClass('buttonGroup'));
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
			if (el) {
				el.find('h2').text(text);
			}
		}
	
	
		function activateButton(buttonName) {
			if (el) {
				el.find('.fc-' + buttonName + '-button')
					.addClass(calendar.theme.getClass('stateActive'));
			}
		}
	
	
		function deactivateButton(buttonName) {
			if (el) {
				el.find('.fc-' + buttonName + '-button')
					.removeClass(calendar.theme.getClass('stateActive'));
			}
		}
	
	
		function disableButton(buttonName) {
			if (el) {
				el.find('.fc-' + buttonName + '-button')
					.prop('disabled', true)
					.addClass(calendar.theme.getClass('stateDisabled'));
			}
		}
	
	
		function enableButton(buttonName) {
			if (el) {
				el.find('.fc-' + buttonName + '-button')
					.prop('disabled', false)
					.removeClass(calendar.theme.getClass('stateDisabled'));
			}
		}
	
	
		function getViewsWithButtons() {
			return viewsWithButtons;
		}
	
	}
	
	;;
	
	var Calendar = FC.Calendar = Class.extend(EmitterMixin, {
	
		view: null, // current View object
		viewsByType: null, // holds all instantiated view instances, current or not
		currentDate: null, // unzoned moment. private (public API should use getDate instead)
		theme: null,
		loadingLevel: 0, // number of simultaneous loading tasks
	
	
		constructor: function(el, overrides) {
	
			// declare the current calendar instance relies on GlobalEmitter. needed for garbage collection.
			// unneeded() is called in destroy.
			GlobalEmitter.needed();
	
			this.el = el;
			this.viewsByType = {};
			this.viewSpecCache = {};
	
			this.initOptionsInternals(overrides);
			this.initMomentInternals(); // needs to happen after options hash initialized
			this.initCurrentDate();
			this.initEventManager();
	
			EventManager.call(this); // needs options immediately
			this.initialize();
		},
	
	
		// Subclasses can override this for initialization logic after the constructor has been called
		initialize: function() {
		},
	
	
		// Public API
		// -----------------------------------------------------------------------------------------------------------------
	
	
		getView: function() {
			return this.view;
		},
	
	
		publiclyTrigger: function(name, triggerInfo) {
			var optHandler = this.opt(name);
			var context;
			var args;
	
			if ($.isPlainObject(triggerInfo)) {
				context = triggerInfo.context;
				args = triggerInfo.args;
			}
			else if ($.isArray(triggerInfo)) {
				args = triggerInfo;
			}
	
			if (context == null) {
				context = this.el[0]; // fallback context
			}
	
			if (!args) {
				args = [];
			}
	
			this.triggerWith(name, context, args); // Emitter's method
	
			if (optHandler) {
				return optHandler.apply(context, args);
			}
		},
	
	
		hasPublicHandlers: function(name) {
			return this.hasHandlers(name) ||
				this.opt(name); // handler specified in options
		},
	
	
		// View
		// -----------------------------------------------------------------------------------------------------------------
	
	
		// Given a view name for a custom view or a standard view, creates a ready-to-go View object
		instantiateView: function(viewType) {
			var spec = this.getViewSpec(viewType);
	
			return new spec['class'](this, spec);
		},
	
	
		// Returns a boolean about whether the view is okay to instantiate at some point
		isValidViewType: function(viewType) {
			return Boolean(this.getViewSpec(viewType));
		},
	
	
		changeView: function(viewName, dateOrRange) {
	
			if (dateOrRange) {
	
				if (dateOrRange.start && dateOrRange.end) { // a range
					this.recordOptionOverrides({ // will not rerender
						visibleRange: dateOrRange
					});
				}
				else { // a date
					this.currentDate = this.moment(dateOrRange).stripZone(); // just like gotoDate
				}
			}
	
			this.renderView(viewName);
		},
	
	
		// Forces navigation to a view for the given date.
		// `viewType` can be a specific view name or a generic one like "week" or "day".
		zoomTo: function(newDate, viewType) {
			var spec;
	
			viewType = viewType || 'day'; // day is default zoom
			spec = this.getViewSpec(viewType) || this.getUnitViewSpec(viewType);
	
			this.currentDate = newDate.clone();
			this.renderView(spec ? spec.type : null);
		},
	
	
		// Current Date
		// -----------------------------------------------------------------------------------------------------------------
	
	
		initCurrentDate: function() {
			var defaultDateInput = this.opt('defaultDate');
	
			// compute the initial ambig-timezone date
			if (defaultDateInput != null) {
				this.currentDate = this.moment(defaultDateInput).stripZone();
			}
			else {
				this.currentDate = this.getNow(); // getNow already returns unzoned
			}
		},
	
	
		reportViewDatesChanged: function(view, dateProfile) {
			this.currentDate = dateProfile.date; // might have been constrained by view dates
			this.setToolbarsTitle(view.title);
			this.updateToolbarButtons();
		},
	
	
		prev: function() {
			var prevInfo = this.view.buildPrevDateProfile(this.currentDate);
	
			if (prevInfo.isValid) {
				this.currentDate = prevInfo.date;
				this.renderView();
			}
		},
	
	
		next: function() {
			var nextInfo = this.view.buildNextDateProfile(this.currentDate);
	
			if (nextInfo.isValid) {
				this.currentDate = nextInfo.date;
				this.renderView();
			}
		},
	
	
		prevYear: function() {
			this.currentDate.add(-1, 'years');
			this.renderView();
		},
	
	
		nextYear: function() {
			this.currentDate.add(1, 'years');
			this.renderView();
		},
	
	
		today: function() {
			this.currentDate = this.getNow(); // should deny like prev/next?
			this.renderView();
		},
	
	
		gotoDate: function(zonedDateInput) {
			this.currentDate = this.moment(zonedDateInput).stripZone();
			this.renderView();
		},
	
	
		incrementDate: function(delta) {
			this.currentDate.add(moment.duration(delta));
			this.renderView();
		},
	
	
		// for external API
		getDate: function() {
			return this.applyTimezone(this.currentDate); // infuse the calendar's timezone
		},
	
	
		// Loading Triggering
		// -----------------------------------------------------------------------------------------------------------------
	
	
		// Should be called when any type of async data fetching begins
		pushLoading: function() {
			if (!(this.loadingLevel++)) {
				this.publiclyTrigger('loading', [ true, this.view ]);
			}
		},
	
	
		// Should be called when any type of async data fetching completes
		popLoading: function() {
			if (!(--this.loadingLevel)) {
				this.publiclyTrigger('loading', [ false, this.view ]);
			}
		},
	
	
		// Selection
		// -----------------------------------------------------------------------------------------------------------------
	
	
		// this public method receives start/end dates in any format, with any timezone
		select: function(zonedStartInput, zonedEndInput) {
			this.view.select(
				this.buildSelectFootprint.apply(this, arguments)
			);
		},
	
	
		unselect: function() { // safe to be called before renderView
			if (this.view) {
				this.view.unselect();
			}
		},
	
	
		// Given arguments to the select method in the API, returns a span (unzoned start/end and other info)
		buildSelectFootprint: function(zonedStartInput, zonedEndInput) {
			var start = this.moment(zonedStartInput).stripZone();
			var end;
	
			if (zonedEndInput) {
				end = this.moment(zonedEndInput).stripZone();
			}
			else if (start.hasTime()) {
				end = start.clone().add(this.defaultTimedEventDuration);
			}
			else {
				end = start.clone().add(this.defaultAllDayEventDuration);
			}
	
			return new ComponentFootprint(
				new UnzonedRange(start, end),
				!start.hasTime()
			);
		},
	
	
		// Misc
		// -----------------------------------------------------------------------------------------------------------------
	
	
		// will return `null` if invalid range
		parseUnzonedRange: function(rangeInput) {
			var start = null;
			var end = null;
	
			if (rangeInput.start) {
				start = this.moment(rangeInput.start).stripZone();
			}
	
			if (rangeInput.end) {
				end = this.moment(rangeInput.end).stripZone();
			}
	
			if (!start && !end) {
				return null;
			}
	
			if (start && end && end.isBefore(start)) {
				return null;
			}
	
			return new UnzonedRange(start, end);
		},
	
	
		rerenderEvents: function() { // API method. destroys old events if previously rendered.
			if (this.elementVisible()) {
				this.view.flash('displayingEvents');
			}
		},
	
	
		initEventManager: function() {
			var _this = this;
			var eventManager = new EventManager(this);
			var rawSources = this.opt('eventSources') || [];
			var singleRawSource = this.opt('events');
	
			this.eventManager = eventManager;
	
			if (singleRawSource) {
				rawSources.unshift(singleRawSource);
			}
	
			eventManager.on('release', function(eventsPayload) {
				_this.trigger('eventsReset', eventsPayload);
			});
	
			eventManager.freeze();
	
			rawSources.forEach(function(rawSource) {
				var source = EventSourceParser.parse(rawSource, _this);
	
				if (source) {
					eventManager.addSource(source);
				}
			});
	
			eventManager.thaw();
		},
	
	
		requestEvents: function(start, end) {
			return this.eventManager.requestEvents(
				start,
				end,
				this.opt('timezone'),
				!this.opt('lazyFetching')
			);
		}
	
	});
	
	;;
	/*
	Options binding/triggering system.
	*/
	Calendar.mixin({
	
		dirDefaults: null, // option defaults related to LTR or RTL
		localeDefaults: null, // option defaults related to current locale
		overrides: null, // option overrides given to the fullCalendar constructor
		dynamicOverrides: null, // options set with dynamic setter method. higher precedence than view overrides.
		optionsModel: null, // all defaults combined with overrides
	
	
		initOptionsInternals: function(overrides) {
			this.overrides = $.extend({}, overrides); // make a copy
			this.dynamicOverrides = {};
			this.optionsModel = new Model();
	
			this.populateOptionsHash();
		},
	
	
		// public getter/setter
		option: function(name, value) {
			var newOptionHash;
	
			if (typeof name === 'string') {
				if (value === undefined) { // getter
					return this.optionsModel.get(name);
				}
				else { // setter for individual option
					newOptionHash = {};
					newOptionHash[name] = value;
					this.setOptions(newOptionHash);
				}
			}
			else if (typeof name === 'object') { // compound setter with object input
				this.setOptions(name);
			}
		},
	
	
		// private getter
		opt: function(name) {
			return this.optionsModel.get(name);
		},
	
	
		setOptions: function(newOptionHash) {
			var optionCnt = 0;
			var optionName;
	
			this.recordOptionOverrides(newOptionHash); // will trigger optionsModel watchers
	
			for (optionName in newOptionHash) {
				optionCnt++;
			}
	
			// special-case handling of single option change.
			// if only one option change, `optionName` will be its name.
			if (optionCnt === 1) {
				if (optionName === 'height' || optionName === 'contentHeight' || optionName === 'aspectRatio') {
					this.updateSize(true); // true = allow recalculation of height
					return;
				}
				else if (optionName === 'defaultDate') {
					return; // can't change date this way. use gotoDate instead
				}
				else if (optionName === 'businessHours') {
					if (this.view) {
						this.view.unrenderBusinessHours();
						this.view.renderBusinessHours();
					}
					return;
				}
				else if (optionName === 'timezone') {
					this.view.flash('initialEvents');
					return;
				}
			}
	
			// catch-all. rerender the header and footer and rebuild/rerender the current view
			this.renderHeader();
			this.renderFooter();
	
			// even non-current views will be affected by this option change. do before rerender
			// TODO: detangle
			this.viewsByType = {};
	
			this.reinitView();
		},
	
	
		// Computes the flattened options hash for the calendar and assigns to `this.options`.
		// Assumes this.overrides and this.dynamicOverrides have already been initialized.
		populateOptionsHash: function() {
			var locale, localeDefaults;
			var isRTL, dirDefaults;
			var rawOptions;
	
			locale = firstDefined( // explicit locale option given?
				this.dynamicOverrides.locale,
				this.overrides.locale
			);
			localeDefaults = localeOptionHash[locale];
			if (!localeDefaults) { // explicit locale option not given or invalid?
				locale = Calendar.defaults.locale;
				localeDefaults = localeOptionHash[locale] || {};
			}
	
			isRTL = firstDefined( // based on options computed so far, is direction RTL?
				this.dynamicOverrides.isRTL,
				this.overrides.isRTL,
				localeDefaults.isRTL,
				Calendar.defaults.isRTL
			);
			dirDefaults = isRTL ? Calendar.rtlDefaults : {};
	
			this.dirDefaults = dirDefaults;
			this.localeDefaults = localeDefaults;
	
			rawOptions = mergeOptions([ // merge defaults and overrides. lowest to highest precedence
				Calendar.defaults, // global defaults
				dirDefaults,
				localeDefaults,
				this.overrides,
				this.dynamicOverrides
			]);
			populateInstanceComputableOptions(rawOptions); // fill in gaps with computed options
	
			this.optionsModel.reset(rawOptions);
		},
	
	
		// stores the new options internally, but does not rerender anything.
		recordOptionOverrides: function(newOptionHash) {
			var optionName;
	
			for (optionName in newOptionHash) {
				this.dynamicOverrides[optionName] = newOptionHash[optionName];
			}
	
			this.viewSpecCache = {}; // the dynamic override invalidates the options in this cache, so just clear it
			this.populateOptionsHash(); // this.options needs to be recomputed after the dynamic override
		}
	
	});
	
	;;
	
	Calendar.mixin({
	
		defaultAllDayEventDuration: null,
		defaultTimedEventDuration: null,
		localeData: null,
	
	
		initMomentInternals: function() {
			var _this = this;
	
			this.defaultAllDayEventDuration = moment.duration(this.opt('defaultAllDayEventDuration'));
			this.defaultTimedEventDuration = moment.duration(this.opt('defaultTimedEventDuration'));
	
			// Called immediately, and when any of the options change.
			// Happens before any internal objects rebuild or rerender, because this is very core.
			this.optionsModel.watch('buildingMomentLocale', [
				'?locale', '?monthNames', '?monthNamesShort', '?dayNames', '?dayNamesShort',
				'?firstDay', '?weekNumberCalculation'
			], function(opts) {
				var weekNumberCalculation = opts.weekNumberCalculation;
				var firstDay = opts.firstDay;
				var _week;
	
				// normalize
				if (weekNumberCalculation === 'iso') {
					weekNumberCalculation = 'ISO'; // normalize
				}
	
				var localeData = Object.create( // make a cheap copy
					getMomentLocaleData(opts.locale) // will fall back to en
				);
	
				if (opts.monthNames) {
					localeData._months = opts.monthNames;
				}
				if (opts.monthNamesShort) {
					localeData._monthsShort = opts.monthNamesShort;
				}
				if (opts.dayNames) {
					localeData._weekdays = opts.dayNames;
				}
				if (opts.dayNamesShort) {
					localeData._weekdaysShort = opts.dayNamesShort;
				}
	
				if (firstDay == null && weekNumberCalculation === 'ISO') {
					firstDay = 1;
				}
				if (firstDay != null) {
					_week = Object.create(localeData._week); // _week: { dow: # }
					_week.dow = firstDay;
					localeData._week = _week;
				}
	
				if ( // whitelist certain kinds of input
					weekNumberCalculation === 'ISO' ||
					weekNumberCalculation === 'local' ||
					typeof weekNumberCalculation === 'function'
				) {
					localeData._fullCalendar_weekCalc = weekNumberCalculation; // moment-ext will know what to do with it
				}
	
				_this.localeData = localeData;
	
				// If the internal current date object already exists, move to new locale.
				// We do NOT need to do this technique for event dates, because this happens when converting to "segments".
				if (_this.currentDate) {
					_this.localizeMoment(_this.currentDate); // sets to localeData
				}
			});
		},
	
	
		// Builds a moment using the settings of the current calendar: timezone and locale.
		// Accepts anything the vanilla moment() constructor accepts.
		moment: function() {
			var mom;
	
			if (this.opt('timezone') === 'local') {
				mom = FC.moment.apply(null, arguments);
	
				// Force the moment to be local, because FC.moment doesn't guarantee it.
				if (mom.hasTime()) { // don't give ambiguously-timed moments a local zone
					mom.local();
				}
			}
			else if (this.opt('timezone') === 'UTC') {
				mom = FC.moment.utc.apply(null, arguments); // process as UTC
			}
			else {
				mom = FC.moment.parseZone.apply(null, arguments); // let the input decide the zone
			}
	
			this.localizeMoment(mom); // TODO
	
			return mom;
		},
	
	
		msToMoment: function(ms, forceAllDay) {
			var mom = FC.moment.utc(ms); // TODO: optimize by using Date.UTC
	
			if (forceAllDay) {
				mom.stripTime();
			}
			else {
				mom = this.applyTimezone(mom); // may or may not apply locale
			}
	
			this.localizeMoment(mom);
	
			return mom;
		},
	
	
		msToUtcMoment: function(ms, forceAllDay) {
			var mom = FC.moment.utc(ms); // TODO: optimize by using Date.UTC
	
			if (forceAllDay) {
				mom.stripTime();
			}
	
			this.localizeMoment(mom);
	
			return mom;
		},
	
	
		// Updates the given moment's locale settings to the current calendar locale settings.
		localizeMoment: function(mom) {
			mom._locale = this.localeData;
		},
	
	
		// Returns a boolean about whether or not the calendar knows how to calculate
		// the timezone offset of arbitrary dates in the current timezone.
		getIsAmbigTimezone: function() {
			return this.opt('timezone') !== 'local' && this.opt('timezone') !== 'UTC';
		},
	
	
		// Returns a copy of the given date in the current timezone. Has no effect on dates without times.
		applyTimezone: function(date) {
			if (!date.hasTime()) {
				return date.clone();
			}
	
			var zonedDate = this.moment(date.toArray());
			var timeAdjust = date.time() - zonedDate.time();
			var adjustedZonedDate;
	
			// Safari sometimes has problems with this coersion when near DST. Adjust if necessary. (bug #2396)
			if (timeAdjust) { // is the time result different than expected?
				adjustedZonedDate = zonedDate.clone().add(timeAdjust); // add milliseconds
				if (date.time() - adjustedZonedDate.time() === 0) { // does it match perfectly now?
					zonedDate = adjustedZonedDate;
				}
			}
	
			return zonedDate;
		},
	
	
		/*
		Assumes the footprint is non-open-ended.
		*/
		footprintToDateProfile: function(componentFootprint, ignoreEnd) {
			var start = FC.moment.utc(componentFootprint.unzonedRange.startMs);
			var end;
	
			if (!ignoreEnd) {
				end = FC.moment.utc(componentFootprint.unzonedRange.endMs);
			}
	
			if (componentFootprint.isAllDay) {
				start.stripTime();
	
				if (end) {
					end.stripTime();
				}
			}
			else {
				start = this.applyTimezone(start);
	
				if (end) {
					end = this.applyTimezone(end);
				}
			}
	
			return new EventDateProfile(start, end, this);
		},
	
	
		// Returns a moment for the current date, as defined by the client's computer or from the `now` option.
		// Will return an moment with an ambiguous timezone.
		getNow: function() {
			var now = this.opt('now');
			if (typeof now === 'function') {
				now = now();
			}
			return this.moment(now).stripZone();
		},
	
	
		// Produces a human-readable string for the given duration.
		// Side-effect: changes the locale of the given duration.
		humanizeDuration: function(duration) {
			return duration.locale(this.opt('locale')).humanize();
		},
	
	
	
		// Event-Specific Date Utilities. TODO: move
		// -----------------------------------------------------------------------------------------------------------------
	
	
		// Get an event's normalized end date. If not present, calculate it from the defaults.
		getEventEnd: function(event) {
			if (event.end) {
				return event.end.clone();
			}
			else {
				return this.getDefaultEventEnd(event.allDay, event.start);
			}
		},
	
	
		// Given an event's allDay status and start date, return what its fallback end date should be.
		// TODO: rename to computeDefaultEventEnd
		getDefaultEventEnd: function(allDay, zonedStart) {
			var end = zonedStart.clone();
	
			if (allDay) {
				end.stripTime().add(this.defaultAllDayEventDuration);
			}
			else {
				end.add(this.defaultTimedEventDuration);
			}
	
			if (this.getIsAmbigTimezone()) {
				end.stripZone(); // we don't know what the tzo should be
			}
	
			return end;
		}
	
	});
	
	;;
	
	Calendar.mixin({
	
		viewSpecCache: null, // cache of view definitions (initialized in Calendar.js)
	
	
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
	
			if ($.inArray(unit, unitsDesc) != -1) {
	
				// put views that have buttons first. there will be duplicates, but oh well
				viewTypes = this.header.getViewsWithButtons(); // TODO: include footer as well?
				$.each(FC.views, function(viewType) { // all views
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
			var durationInput;
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
					durationInput = durationInput || spec.duration;
					viewType = viewType || spec.type;
				}
	
				if (overrides) {
					overridesChain.unshift(overrides); // view-specific option hashes have options at zero-level
					durationInput = durationInput || overrides.duration;
					viewType = viewType || overrides.type;
				}
			}
	
			spec = mergeProps(specChain);
			spec.type = requestedViewType;
			if (!spec['class']) {
				return false;
			}
	
			// fall back to top-level `duration` option
			durationInput = durationInput ||
				this.dynamicOverrides.duration ||
				this.overrides.duration;
	
			if (durationInput) {
				duration = moment.duration(durationInput);
	
				if (duration.valueOf()) { // valid?
	
					unit = computeDurationGreatestUnit(duration, durationInput);
	
					spec.duration = duration;
					spec.durationUnit = unit;
	
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
				this.localeDefaults, // locale and dir take precedence over view's defaults!
				this.overrides, // calendar's overrides (options given to constructor)
				spec.overrides, // view's overrides (view-specific options)
				this.dynamicOverrides // dynamically set via setter. highest precedence
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
					// view can decide to look up a certain key
					(spec.buttonTextKey ? buttonText[spec.buttonTextKey] : null) ||
					// a key like "month"
					(spec.singleUnit ? buttonText[spec.singleUnit] : null);
			}
	
			// highest to lowest priority
			spec.buttonTextOverride =
				queryButtonText(this.dynamicOverrides) ||
				queryButtonText(this.overrides) || // constructor-specified buttonText lookup hash takes precedence
				spec.overrides.buttonText; // `buttonText` for view-specific options is a string
	
			// highest to lowest priority. mirrors buildViewSpecOptions
			spec.buttonTextDefault =
				queryButtonText(this.localeDefaults) ||
				queryButtonText(this.dirDefaults) ||
				spec.defaults.buttonText || // a single string. from ViewSubclass.defaults
				queryButtonText(Calendar.defaults) ||
				(spec.duration ? this.humanizeDuration(spec.duration) : null) || // like "3 days"
				requestedViewType; // fall back to given view name
		}
	
	});
	
	;;
	
	Calendar.mixin({
	
		el: null,
		contentEl: null,
		suggestedViewHeight: null,
		windowResizeProxy: null,
		ignoreWindowResize: 0,
	
	
		render: function() {
			if (!this.contentEl) {
				this.initialRender();
			}
			else if (this.elementVisible()) {
				// mainly for the public API
				this.calcSize();
				this.renderView();
			}
		},
	
	
		initialRender: function() {
			var _this = this;
			var el = this.el;
	
			el.addClass('fc');
	
			// event delegation for nav links
			el.on('click.fc', 'a[data-goto]', function(ev) {
				var anchorEl = $(this);
				var gotoOptions = anchorEl.data('goto'); // will automatically parse JSON
				var date = _this.moment(gotoOptions.date);
				var viewType = gotoOptions.type;
	
				// property like "navLinkDayClick". might be a string or a function
				var customAction = _this.view.opt('navLink' + capitaliseFirstLetter(viewType) + 'Click');
	
				if (typeof customAction === 'function') {
					customAction(date, ev);
				}
				else {
					if (typeof customAction === 'string') {
						viewType = customAction;
					}
					_this.zoomTo(date, viewType);
				}
			});
	
			// called immediately, and upon option change
			this.optionsModel.watch('settingTheme', [ '?theme', '?themeSystem' ], function(opts) {
				var themeClass = ThemeRegistry.getThemeClass(opts.themeSystem || opts.theme);
				var theme = new themeClass(_this.optionsModel);
				var widgetClass = theme.getClass('widget');
	
				_this.theme = theme;
	
				if (widgetClass) {
					el.addClass(widgetClass);
				}
			}, function() {
				var widgetClass = _this.theme.getClass('widget');
	
				_this.theme = null;
	
				if (widgetClass) {
					el.removeClass(widgetClass);
				}
			});
	
			// called immediately, and upon option change.
			// HACK: locale often affects isRTL, so we explicitly listen to that too.
			this.optionsModel.watch('applyingDirClasses', [ '?isRTL', '?locale' ], function(opts) {
				el.toggleClass('fc-ltr', !opts.isRTL);
				el.toggleClass('fc-rtl', opts.isRTL);
			});
	
			this.contentEl = $("<div class='fc-view-container'/>").prependTo(el);
	
			this.initToolbars();
			this.renderHeader();
			this.renderFooter();
			this.renderView(this.opt('defaultView'));
	
			if (this.opt('handleWindowResize')) {
				$(window).resize(
					this.windowResizeProxy = debounce( // prevents rapid calls
						this.windowResize.bind(this),
						this.opt('windowResizeDelay')
					)
				);
			}
		},
	
	
		destroy: function() {
	
			if (this.view) {
				this.view.removeElement();
	
				// NOTE: don't null-out this.view in case API methods are called after destroy.
				// It is still the "current" view, just not rendered.
			}
	
			this.toolbarsManager.proxyCall('removeElement');
			this.contentEl.remove();
			this.el.removeClass('fc fc-ltr fc-rtl');
	
			// removes theme-related root className
			this.optionsModel.unwatch('settingTheme');
	
			this.el.off('.fc'); // unbind nav link handlers
	
			if (this.windowResizeProxy) {
				$(window).unbind('resize', this.windowResizeProxy);
				this.windowResizeProxy = null;
			}
	
			GlobalEmitter.unneeded();
		},
	
	
		elementVisible: function() {
			return this.el.is(':visible');
		},
	
	
	
		// View Rendering
		// -----------------------------------------------------------------------------------
	
	
		// Renders a view because of a date change, view-type change, or for the first time.
		// If not given a viewType, keep the current view but render different dates.
		// Accepts an optional scroll state to restore to.
		renderView: function(viewType, forcedScroll) {
	
			this.ignoreWindowResize++;
	
			var needsClearView = this.view && viewType && this.view.type !== viewType;
	
			// if viewType is changing, remove the old view's rendering
			if (needsClearView) {
				this.freezeContentHeight(); // prevent a scroll jump when view element is removed
				this.clearView();
			}
	
			// if viewType changed, or the view was never created, create a fresh view
			if (!this.view && viewType) {
				this.view =
					this.viewsByType[viewType] ||
					(this.viewsByType[viewType] = this.instantiateView(viewType));
	
				this.view.setElement(
					$("<div class='fc-view fc-" + viewType + "-view' />").appendTo(this.contentEl)
				);
				this.toolbarsManager.proxyCall('activateButton', viewType);
			}
	
			if (this.view) {
	
				if (forcedScroll) {
					this.view.addForcedScroll(forcedScroll);
				}
	
				if (this.elementVisible()) {
					this.view.setDate(this.currentDate);
				}
			}
	
			if (needsClearView) {
				this.thawContentHeight();
			}
	
			this.ignoreWindowResize--;
		},
	
	
		// Unrenders the current view and reflects this change in the Header.
		// Unregsiters the `view`, but does not remove from viewByType hash.
		clearView: function() {
			this.toolbarsManager.proxyCall('deactivateButton', this.view.type);
			this.view.removeElement();
			this.view = null;
		},
	
	
		// Destroys the view, including the view object. Then, re-instantiates it and renders it.
		// Maintains the same scroll state.
		// TODO: maintain any other user-manipulated state.
		reinitView: function() {
			this.ignoreWindowResize++;
			this.freezeContentHeight();
	
			var viewType = this.view.type;
			var scrollState = this.view.queryScroll();
			this.clearView();
			this.calcSize();
			this.renderView(viewType, scrollState);
	
			this.thawContentHeight();
			this.ignoreWindowResize--;
		},
	
	
		// Resizing
		// -----------------------------------------------------------------------------------
	
	
		getSuggestedViewHeight: function() {
			if (this.suggestedViewHeight === null) {
				this.calcSize();
			}
			return this.suggestedViewHeight;
		},
	
	
		isHeightAuto: function() {
			return this.opt('contentHeight') === 'auto' || this.opt('height') === 'auto';
		},
	
	
		updateSize: function(shouldRecalc) {
			if (this.elementVisible()) {
	
				if (shouldRecalc) {
					this._calcSize();
				}
	
				this.ignoreWindowResize++;
				this.view.updateSize(true); // isResize=true. will poll getSuggestedViewHeight() and isHeightAuto()
				this.ignoreWindowResize--;
	
				return true; // signal success
			}
		},
	
	
		calcSize: function() {
			if (this.elementVisible()) {
				this._calcSize();
			}
		},
	
	
		_calcSize: function() { // assumes elementVisible
			var contentHeightInput = this.opt('contentHeight');
			var heightInput = this.opt('height');
	
			if (typeof contentHeightInput === 'number') { // exists and not 'auto'
				this.suggestedViewHeight = contentHeightInput;
			}
			else if (typeof contentHeightInput === 'function') { // exists and is a function
				this.suggestedViewHeight = contentHeightInput();
			}
			else if (typeof heightInput === 'number') { // exists and not 'auto'
				this.suggestedViewHeight = heightInput - this.queryToolbarsHeight();
			}
			else if (typeof heightInput === 'function') { // exists and is a function
				this.suggestedViewHeight = heightInput() - this.queryToolbarsHeight();
			}
			else if (heightInput === 'parent') { // set to height of parent element
				this.suggestedViewHeight = this.el.parent().height() - this.queryToolbarsHeight();
			}
			else {
				this.suggestedViewHeight = Math.round(
					this.contentEl.width() /
					Math.max(this.opt('aspectRatio'), .5)
				);
			}
		},
	
	
		windowResize: function(ev) {
			if (
				!this.ignoreWindowResize &&
				ev.target === window && // so we don't process jqui "resize" events that have bubbled up
				this.view.renderUnzonedRange // view has already been rendered
			) {
				if (this.updateSize(true)) {
					this.publiclyTrigger('windowResize', [ this.view ]);
				}
			}
		},
	
	
		/* Height "Freezing"
		-----------------------------------------------------------------------------*/
	
	
		freezeContentHeight: function() {
			this.contentEl.css({
				width: '100%',
				height: this.contentEl.height(),
				overflow: 'hidden'
			});
		},
	
	
		thawContentHeight: function() {
			this.contentEl.css({
				width: '',
				height: '',
				overflow: ''
			});
		}
	
	});
	
	;;
	
	Calendar.mixin({
	
		header: null,
		footer: null,
		toolbarsManager: null,
	
	
		initToolbars: function() {
			this.header = new Toolbar(this, this.computeHeaderOptions());
			this.footer = new Toolbar(this, this.computeFooterOptions());
			this.toolbarsManager = new Iterator([ this.header, this.footer ]);
		},
	
	
		computeHeaderOptions: function() {
			return {
				extraClasses: 'fc-header-toolbar',
				layout: this.opt('header')
			};
		},
	
	
		computeFooterOptions: function() {
			return {
				extraClasses: 'fc-footer-toolbar',
				layout: this.opt('footer')
			};
		},
	
	
		// can be called repeatedly and Header will rerender
		renderHeader: function() {
			var header = this.header;
	
			header.setToolbarOptions(this.computeHeaderOptions());
			header.render();
	
			if (header.el) {
				this.el.prepend(header.el);
			}
		},
	
	
		// can be called repeatedly and Footer will rerender
		renderFooter: function() {
			var footer = this.footer;
	
			footer.setToolbarOptions(this.computeFooterOptions());
			footer.render();
	
			if (footer.el) {
				this.el.append(footer.el);
			}
		},
	
	
		setToolbarsTitle: function(title) {
			this.toolbarsManager.proxyCall('updateTitle', title);
		},
	
	
		updateToolbarButtons: function() {
			var now = this.getNow();
			var view = this.view;
			var todayInfo = view.buildDateProfile(now);
			var prevInfo = view.buildPrevDateProfile(this.currentDate);
			var nextInfo = view.buildNextDateProfile(this.currentDate);
	
			this.toolbarsManager.proxyCall(
				(todayInfo.isValid && !view.currentUnzonedRange.containsDate(now)) ?
					'enableButton' :
					'disableButton',
				'today'
			);
	
			this.toolbarsManager.proxyCall(
				prevInfo.isValid ?
					'enableButton' :
					'disableButton',
				'prev'
			);
	
			this.toolbarsManager.proxyCall(
				nextInfo.isValid ?
					'enableButton' :
					'disableButton',
				'next'
			);
		},
	
	
		queryToolbarsHeight: function() {
			return this.toolbarsManager.items.reduce(function(accumulator, toolbar) {
				var toolbarHeight = toolbar.el ? toolbar.el.outerHeight(true) : 0; // includes margin
				return accumulator + toolbarHeight;
			}, 0);
		}
	
	});
	
	;;
	
	var BUSINESS_HOUR_EVENT_DEFAULTS = {
		start: '09:00',
		end: '17:00',
		dow: [ 1, 2, 3, 4, 5 ], // monday - friday
		rendering: 'inverse-background'
		// classNames are defined in businessHoursSegClasses
	};
	
	
	/*
	returns ComponentFootprint[]
	`businessHourDef` is optional. Use Calendar's setting if omitted.
	*/
	Calendar.prototype.buildCurrentBusinessFootprints = function(wholeDay) {
		return this._buildCurrentBusinessFootprints(wholeDay, this.opt('businessHours'));
	};
	
	
	Calendar.prototype._buildCurrentBusinessFootprints = function(wholeDay, businessDefInput) {
		var eventPeriod = this.eventManager.currentPeriod;
		var businessInstanceGroup;
	
		if (eventPeriod) {
			businessInstanceGroup = this.buildBusinessInstanceGroup(
				wholeDay,
				businessDefInput,
				eventPeriod.unzonedRange
			);
	
			if (businessInstanceGroup) {
				return this.eventInstancesToFootprints( // in Calendar.constraints.js
					businessInstanceGroup.eventInstances
				);
			}
		}
	
		return [];
	};
	
	
	/*
	If there are business hours, and they are within range, returns populated EventInstanceGroup.
	If there are business hours, but they aren't within range, returns a zero-item EventInstanceGroup.
	If there are NOT business hours, returns undefined.
	*/
	Calendar.prototype.buildBusinessInstanceGroup = function(wholeDay, rawComplexDef, unzonedRange) {
		var eventDefs = this.buildBusinessDefs(wholeDay, rawComplexDef);
		var eventInstanceGroup;
	
		if (eventDefs.length) {
			eventInstanceGroup = new EventInstanceGroup(
				eventDefsToEventInstances(eventDefs, unzonedRange)
			);
	
			// so that inverse-background rendering can happen even when no eventRanges in view
			eventInstanceGroup.explicitEventDef = eventDefs[0];
	
			return eventInstanceGroup;
		}
	};
	
	
	Calendar.prototype.buildBusinessDefs = function(wholeDay, rawComplexDef) {
		var rawDefs = [];
		var requireDow = false;
		var i;
		var defs = [];
	
		if (rawComplexDef === true) {
			rawDefs = [ {} ]; // will get BUSINESS_HOUR_EVENT_DEFAULTS verbatim
		}
		else if ($.isPlainObject(rawComplexDef)) {
			rawDefs = [ rawComplexDef ];
		}
		else if ($.isArray(rawComplexDef)) {
			rawDefs = rawComplexDef;
			requireDow = true; // every sub-definition NEEDS a day-of-week
		}
	
		for (i = 0; i < rawDefs.length; i++) {
			if (!requireDow || rawDefs[i].dow) {
				defs.push(
					this.buildBusinessDef(wholeDay, rawDefs[i])
				);
			}
		}
	
		return defs;
	};
	
	
	Calendar.prototype.buildBusinessDef = function(wholeDay, rawDef) {
		var fullRawDef = $.extend({}, BUSINESS_HOUR_EVENT_DEFAULTS, rawDef);
	
		if (wholeDay) {
			fullRawDef.start = null;
			fullRawDef.end = null;
		}
	
		return RecurringEventDef.parse(
			fullRawDef,
			new EventSource(this) // dummy source
		);
	};
	
	;;
	
	/*
	determines if eventInstanceGroup is allowed,
	in relation to other EVENTS and business hours.
	*/
	Calendar.prototype.isEventInstanceGroupAllowed = function(eventInstanceGroup) {
		var eventDef = eventInstanceGroup.getEventDef();
		var eventFootprints = this.eventRangesToEventFootprints(eventInstanceGroup.getAllEventRanges());
		var i;
	
		var peerEventInstances = this.getPeerEventInstances(eventDef);
		var peerEventRanges = eventInstancesToEventRanges(peerEventInstances);
		var peerEventFootprints = this.eventRangesToEventFootprints(peerEventRanges);
	
		var constraintVal = eventDef.getConstraint();
		var overlapVal = eventDef.getOverlap();
	
		var eventAllowFunc = this.opt('eventAllow');
	
		for (i = 0; i < eventFootprints.length; i++) {
			if (
				!this.isFootprintAllowed(
					eventFootprints[i].componentFootprint,
					peerEventFootprints,
					constraintVal,
					overlapVal,
					eventFootprints[i].eventInstance
				)
			) {
				return false;
			}
		}
	
		if (eventAllowFunc) {
			for (i = 0; i < eventFootprints.length; i++) {
				if (
					eventAllowFunc(
						eventFootprints[i].componentFootprint.toLegacy(this),
						eventFootprints[i].getEventLegacy()
					) === false
				) {
					return false;
				}
			}
		}
	
		return true;
	};
	
	
	Calendar.prototype.getPeerEventInstances = function(eventDef) {
		return this.eventManager.getEventInstancesWithoutId(eventDef.id);
	};
	
	
	Calendar.prototype.isSelectionFootprintAllowed = function(componentFootprint) {
		var peerEventInstances = this.eventManager.getEventInstances();
		var peerEventRanges = eventInstancesToEventRanges(peerEventInstances);
		var peerEventFootprints = this.eventRangesToEventFootprints(peerEventRanges);
	
		var selectAllowFunc;
	
		if (
			this.isFootprintAllowed(
				componentFootprint,
				peerEventFootprints,
				this.opt('selectConstraint'),
				this.opt('selectOverlap')
			)
		) {
			selectAllowFunc = this.opt('selectAllow');
	
			if (selectAllowFunc) {
				return selectAllowFunc(componentFootprint.toLegacy(this)) !== false;
			}
			else {
				return true;
			}
		}
	
		return false;
	};
	
	
	Calendar.prototype.isFootprintAllowed = function(
		componentFootprint,
		peerEventFootprints,
		constraintVal,
		overlapVal,
		subjectEventInstance // optional
	) {
		var constraintFootprints; // ComponentFootprint[]
		var overlapEventFootprints; // EventFootprint[]
	
		if (constraintVal != null) {
			constraintFootprints = this.constraintValToFootprints(constraintVal, componentFootprint.isAllDay);
	
			if (!this.isFootprintWithinConstraints(componentFootprint, constraintFootprints)) {
				return false;
			}
		}
	
		overlapEventFootprints = this.collectOverlapEventFootprints(peerEventFootprints, componentFootprint);
	
		if (overlapVal === false) {
			if (overlapEventFootprints.length) {
				return false;
			}
		}
		else if (typeof overlapVal === 'function') {
			if (!isOverlapsAllowedByFunc(overlapEventFootprints, overlapVal, subjectEventInstance)) {
				return false;
			}
		}
	
		if (subjectEventInstance) {
			if (!isOverlapEventInstancesAllowed(overlapEventFootprints, subjectEventInstance)) {
				return false;
			}
		}
	
		return true;
	};
	
	
	// Constraint
	// ------------------------------------------------------------------------------------------------
	
	
	Calendar.prototype.isFootprintWithinConstraints = function(componentFootprint, constraintFootprints) {
		var i;
	
		for (i = 0; i < constraintFootprints.length; i++) {
			if (this.footprintContainsFootprint(constraintFootprints[i], componentFootprint)) {
				return true;
			}
		}
	
		return false;
	};
	
	
	Calendar.prototype.constraintValToFootprints = function(constraintVal, isAllDay) {
		var eventInstances;
	
		if (constraintVal === 'businessHours') {
			return this.buildCurrentBusinessFootprints(isAllDay);
		}
		else if (typeof constraintVal === 'object') {
			eventInstances = this.parseEventDefToInstances(constraintVal); // handles recurring events
	
			if (!eventInstances) { // invalid input. fallback to parsing footprint directly
				return this.parseFootprints(constraintVal);
			}
			else {
				return this.eventInstancesToFootprints(eventInstances);
			}
		}
		else if (constraintVal != null) { // an ID
			eventInstances = this.eventManager.getEventInstancesWithId(constraintVal);
	
			return this.eventInstancesToFootprints(eventInstances);
		}
	};
	
	
	// conversion util
	Calendar.prototype.eventInstancesToFootprints = function(eventInstances) {
		return eventFootprintsToComponentFootprints(
			this.eventRangesToEventFootprints(
				eventInstancesToEventRanges(eventInstances)
			)
		);
	};
	
	
	// Overlap
	// ------------------------------------------------------------------------------------------------
	
	
	Calendar.prototype.collectOverlapEventFootprints = function(peerEventFootprints, targetFootprint) {
		var overlapEventFootprints = [];
		var i;
	
		for (i = 0; i < peerEventFootprints.length; i++) {
			if (
				this.footprintsIntersect(
					targetFootprint,
					peerEventFootprints[i].componentFootprint
				)
			) {
				overlapEventFootprints.push(peerEventFootprints[i]);
			}
		}
	
		return overlapEventFootprints;
	};
	
	
	// optional subjectEventInstance
	function isOverlapsAllowedByFunc(overlapEventFootprints, overlapFunc, subjectEventInstance) {
		var i;
	
		for (i = 0; i < overlapEventFootprints.length; i++) {
			if (
				!overlapFunc(
					overlapEventFootprints[i].eventInstance.toLegacy(),
					subjectEventInstance ? subjectEventInstance.toLegacy() : null
				)
			) {
				return false;
			}
		}
	
		return true;
	}
	
	
	function isOverlapEventInstancesAllowed(overlapEventFootprints, subjectEventInstance) {
		var subjectLegacyInstance = subjectEventInstance.toLegacy();
		var i;
		var overlapEventInstance;
		var overlapEventDef;
		var overlapVal;
	
		for (i = 0; i < overlapEventFootprints.length; i++) {
			overlapEventInstance = overlapEventFootprints[i].eventInstance;
			overlapEventDef = overlapEventInstance.def;
	
			// don't need to pass in calendar, because don't want to consider global eventOverlap property,
			// because we already considered that earlier in the process.
			overlapVal = overlapEventDef.getOverlap();
	
			if (overlapVal === false) {
				return false;
			}
			else if (typeof overlapVal === 'function') {
				if (
					!overlapVal(
						overlapEventInstance.toLegacy(),
						subjectLegacyInstance
					)
				) {
					return false;
				}
			}
		}
	
		return true;
	}
	
	
	// Conversion: eventDefs -> eventInstances -> eventRanges -> eventFootprints -> componentFootprints
	// ------------------------------------------------------------------------------------------------
	// NOTE: this might seem like repetitive code with the Grid class, however, this code is related to
	// constraints whereas the Grid code is related to rendering. Each approach might want to convert
	// eventRanges -> eventFootprints in a different way. Regardless, there are opportunities to make
	// this more DRY.
	
	
	/*
	Returns false on invalid input.
	*/
	Calendar.prototype.parseEventDefToInstances = function(eventInput) {
		var eventPeriod = this.eventManager.currentPeriod;
		var eventDef = EventDefParser.parse(eventInput, new EventSource(this));
	
		if (!eventDef) { // invalid
			return false;
		}
	
		if (eventPeriod) {
			return eventDef.buildInstances(eventPeriod.unzonedRange);
		}
		else {
			return [];
		}
	};
	
	
	Calendar.prototype.eventRangesToEventFootprints = function(eventRanges) {
		var i;
		var eventFootprints = [];
	
		for (i = 0; i < eventRanges.length; i++) {
			eventFootprints.push.apply(eventFootprints, // append
				this.eventRangeToEventFootprints(eventRanges[i])
			);
		}
	
		return eventFootprints;
	};
	
	
	/*
	TODO: somehow more DRY with Grid::eventRangeToEventFootprints
	*/
	Calendar.prototype.eventRangeToEventFootprints = function(eventRange) {
		return [
			new EventFootprint(
				new ComponentFootprint(
					eventRange.unzonedRange,
					eventRange.eventDef.isAllDay()
				),
				eventRange.eventDef,
				eventRange.eventInstance // might not exist
			)
		];
	};
	
	
	/*
	Parses footprints directly.
	Very similar to EventDateProfile::parse :(
	*/
	Calendar.prototype.parseFootprints = function(rawInput) {
		var start, end;
	
		if (rawInput.start) {
			start = this.moment(rawInput.start);
	
			if (!start.isValid()) {
				start = null;
			}
		}
	
		if (rawInput.end) {
			end = this.moment(rawInput.end);
	
			if (!end.isValid()) {
				end = null;
			}
		}
	
		return [
			new ComponentFootprint(
				new UnzonedRange(start, end),
				(start && !start.hasTime()) || (end && !end.hasTime()) // isAllDay
			)
		];
	};
	
	
	// Footprint Utils
	// ----------------------------------------------------------------------------------------
	
	
	Calendar.prototype.footprintContainsFootprint = function(outerFootprint, innerFootprint) {
		return outerFootprint.unzonedRange.containsRange(innerFootprint.unzonedRange);
	};
	
	
	Calendar.prototype.footprintsIntersect = function(footprint0, footprint1) {
		return footprint0.unzonedRange.intersectsWith(footprint1.unzonedRange);
	};
	
	;;
	
	Calendar.mixin({
	
		// Sources
		// ------------------------------------------------------------------------------------
	
	
		getEventSources: function() {
			return this.eventManager.otherSources.slice(); // clone
		},
	
	
		getEventSourceById: function(id) {
			return this.eventManager.getSourceById(
				EventSource.normalizeId(id)
			);
		},
	
	
		addEventSource: function(sourceInput) {
			var source = EventSourceParser.parse(sourceInput, this);
	
			if (source) {
				this.eventManager.addSource(source);
			}
		},
	
	
		removeEventSources: function(sourceMultiQuery) {
			var eventManager = this.eventManager;
			var sources;
			var i;
	
			if (sourceMultiQuery == null) {
				this.eventManager.removeAllSources();
			}
			else {
				sources = eventManager.multiQuerySources(sourceMultiQuery);
	
				eventManager.freeze();
	
				for (i = 0; i < sources.length; i++) {
					eventManager.removeSource(sources[i]);
				}
	
				eventManager.thaw();
			}
		},
	
	
		removeEventSource: function(sourceQuery) {
			var eventManager = this.eventManager;
			var sources = eventManager.querySources(sourceQuery);
			var i;
	
			eventManager.freeze();
	
			for (i = 0; i < sources.length; i++) {
				eventManager.removeSource(sources[i]);
			}
	
			eventManager.thaw();
		},
	
	
		refetchEventSources: function(sourceMultiQuery) {
			var eventManager = this.eventManager;
			var sources = eventManager.multiQuerySources(sourceMultiQuery);
			var i;
	
			eventManager.freeze();
	
			for (i = 0; i < sources.length; i++) {
				eventManager.refetchSource(sources[i]);
			}
	
			eventManager.thaw();
		},
	
	
		// Events
		// ------------------------------------------------------------------------------------
	
	
		refetchEvents: function() {
			this.eventManager.refetchAllSources();
		},
	
	
		renderEvents: function(eventInputs, isSticky) {
			this.eventManager.freeze();
	
			for (var i = 0; i < eventInputs.length; i++) {
				this.renderEvent(eventInputs[i], isSticky);
			}
	
			this.eventManager.thaw();
		},
	
	
		renderEvent: function(eventInput, isSticky) {
			var eventManager = this.eventManager;
			var eventDef = EventDefParser.parse(
				eventInput,
				eventInput.source || eventManager.stickySource
			);
	
			if (eventDef) {
				eventManager.addEventDef(eventDef, isSticky);
			}
		},
	
	
		// legacyQuery operates on legacy event instance objects
		removeEvents: function(legacyQuery) {
			var eventManager = this.eventManager;
			var eventInstances = eventManager.getEventInstances();
			var legacyInstances;
			var idMap = {};
			var eventDef;
			var i;
	
			if (legacyQuery == null) { // shortcut for removing all
				eventManager.removeAllEventDefs();
			}
			else {
				legacyInstances = eventInstances.map(function(eventInstance) {
					return eventInstance.toLegacy();
				});
	
				legacyInstances = filterLegacyEventInstances(legacyInstances, legacyQuery);
	
				// compute unique IDs
				for (i = 0; i < legacyInstances.length; i++) {
					eventDef = this.eventManager.getEventDefByUid(legacyInstances[i]._id);
					idMap[eventDef.id] = true;
				}
	
				eventManager.freeze();
	
				for (i in idMap) { // reuse `i` as an "id"
					eventManager.removeEventDefsById(i);
				}
	
				eventManager.thaw();
			}
		},
	
	
		// legacyQuery operates on legacy event instance objects
		clientEvents: function(legacyQuery) {
			var eventInstances = this.eventManager.getEventInstances();
			var legacyEventInstances = eventInstances.map(function(eventInstance) {
				return eventInstance.toLegacy();
			});
	
			return filterLegacyEventInstances(legacyEventInstances, legacyQuery);
		},
	
	
		updateEvents: function(eventPropsArray) {
			this.eventManager.freeze();
	
			for (var i = 0; i < eventPropsArray.length; i++) {
				this.updateEvent(eventPropsArray[i]);
			}
	
			this.eventManager.thaw();
		},
	
	
		updateEvent: function(eventProps) {
			var eventDef = this.eventManager.getEventDefByUid(eventProps._id);
			var eventInstance;
			var eventDefMutation;
	
			if (eventDef instanceof SingleEventDef) {
				eventInstance = eventDef.buildInstance();
	
				eventDefMutation = EventDefMutation.createFromRawProps(
					eventInstance,
					eventProps, // raw props
					null // largeUnit -- who uses it?
				);
	
				this.eventManager.mutateEventsWithId(eventDef.id, eventDefMutation); // will release
			}
		}
	
	});
	
	
	function filterLegacyEventInstances(legacyEventInstances, legacyQuery) {
		if (legacyQuery == null) {
			return legacyEventInstances;
		}
		else if ($.isFunction(legacyQuery)) {
			return legacyEventInstances.filter(legacyQuery);
		}
		else { // an event ID
			legacyQuery += ''; // normalize to string
	
			return legacyEventInstances.filter(function(legacyEventInstance) {
				// soft comparison because id not be normalized to string
				return legacyEventInstance.id == legacyQuery;
			});
		}
	}
	
	;;
	
	Calendar.defaults = {
	
		titleRangeSeparator: ' \u2013 ', // en dash
		monthYearFormat: 'MMMM YYYY', // required for en. other locales rely on datepicker computable option
	
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
	
		//nowIndicator: false,
	
		scrollTime: '06:00:00',
		minTime: '00:00:00',
		maxTime: '24:00:00',
		showNonCurrentDates: true,
		
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
		//buttonIcons: null,
	
		allDayText: 'all-day',
		
		// jquery-ui theming
		theme: false,
		//themeButtonIcons: null,
	
		//eventResizableFromStart: false,
		dragOpacity: .75,
		dragRevertDuration: 500,
		dragScroll: true,
		
		//selectable: false,
		unselectAuto: true,
		//selectMinDistance: 0,
		
		dropAccept: '*',
	
		eventOrder: 'title',
		//eventRenderWait: null,
	
		eventLimit: false,
		eventLimitText: 'more',
		eventLimitClick: 'popover',
		dayPopoverFormat: 'LL',
		
		handleWindowResize: true,
		windowResizeDelay: 100, // milliseconds before an updateSize happens
	
		longPressDelay: 1000
		
	};
	
	
	Calendar.englishDefaults = { // used by locale.js
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
	
	var localeOptionHash = FC.locales = {}; // initialize and expose
	
	
	// TODO: document the structure and ordering of a FullCalendar locale file
	
	
	// Initialize jQuery UI datepicker translations while using some of the translations
	// Will set this as the default locales for datepicker.
	FC.datepickerLocale = function(localeCode, dpLocaleCode, dpOptions) {
	
		// get the FullCalendar internal option hash for this locale. create if necessary
		var fcOptions = localeOptionHash[localeCode] || (localeOptionHash[localeCode] = {});
	
		// transfer some simple options from datepicker to fc
		fcOptions.isRTL = dpOptions.isRTL;
		fcOptions.weekNumberTitle = dpOptions.weekHeader;
	
		// compute some more complex options from datepicker
		$.each(dpComputableOptions, function(name, func) {
			fcOptions[name] = func(dpOptions);
		});
	
		// is jQuery UI Datepicker is on the page?
		if ($.datepicker) {
	
			// Register the locale data.
			// FullCalendar and MomentJS use locale codes like "pt-br" but Datepicker
			// does it like "pt-BR" or if it doesn't have the locale, maybe just "pt".
			// Make an alias so the locale can be referenced either way.
			$.datepicker.regional[dpLocaleCode] =
				$.datepicker.regional[localeCode] = // alias
					dpOptions;
	
			// Alias 'en' to the default locale data. Do this every time.
			$.datepicker.regional.en = $.datepicker.regional[''];
	
			// Set as Datepicker's global defaults.
			$.datepicker.setDefaults(dpOptions);
		}
	};
	
	
	// Sets FullCalendar-specific translations. Will set the locales as the global default.
	FC.locale = function(localeCode, newFcOptions) {
		var fcOptions;
		var momOptions;
	
		// get the FullCalendar internal option hash for this locale. create if necessary
		fcOptions = localeOptionHash[localeCode] || (localeOptionHash[localeCode] = {});
	
		// provided new options for this locales? merge them in
		if (newFcOptions) {
			fcOptions = localeOptionHash[localeCode] = mergeOptions([ fcOptions, newFcOptions ]);
		}
	
		// compute locale options that weren't defined.
		// always do this. newFcOptions can be undefined when initializing from i18n file,
		// so no way to tell if this is an initialization or a default-setting.
		momOptions = getMomentLocaleData(localeCode); // will fall back to en
		$.each(momComputableOptions, function(name, func) {
			if (fcOptions[name] == null) {
				fcOptions[name] = func(momOptions, fcOptions);
			}
		});
	
		// set it as the default locale for FullCalendar
		Calendar.defaults.locale = localeCode;
	};
	
	
	// NOTE: can't guarantee any of these computations will run because not every locale has datepicker
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
				.replace(/(\Wmm)$/, '($1)') // like above, but for foreign locales
				.replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
		},
	
		// Produces format strings like "h(:mm)t" -> "6p" / "6:30p"
		extraSmallTimeFormat: function(momOptions) {
			return momOptions.longDateFormat('LT')
				.replace(':mm', '(:mm)')
				.replace(/(\Wmm)$/, '($1)') // like above, but for foreign locales
				.replace(/\s*a$/i, 't'); // convert to AM/PM/am/pm to lowercase one-letter. remove any spaces beforehand
		},
	
		// Produces format strings like "ha" / "H" -> "6pm" / "18"
		hourFormat: function(momOptions) {
			return momOptions.longDateFormat('LT')
				.replace(':mm', '')
				.replace(/(\Wmm)$/, '') // like above, but for foreign locales
				.replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
		},
	
		// Produces format strings like "h:mm" -> "6:30" (with no AM/PM)
		noMeridiemTimeFormat: function(momOptions) {
			return momOptions.longDateFormat('LT')
				.replace(/\s*a$/i, ''); // remove trailing AM/PM
		}
	
	};
	
	
	// options that should be computed off live calendar options (considers override options)
	// TODO: best place for this? related to locale?
	// TODO: flipping text based on isRTL is a bad idea because the CSS `direction` might want to handle it
	var instanceComputableOptions = {
	
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
	
	// TODO: make these computable properties in optionsModel
	function populateInstanceComputableOptions(options) {
		$.each(instanceComputableOptions, function(name, func) {
			if (options[name] == null) {
				options[name] = func(options);
			}
		});
	}
	
	
	// Returns moment's internal locale data. If doesn't exist, returns English.
	function getMomentLocaleData(localeCode) {
		return moment.localeData(localeCode) || moment.localeData('en');
	}
	
	
	// Initialize English by forcing computation of moment-derived options.
	// Also, sets it as the default.
	FC.locale('en', Calendar.englishDefaults);
	
	;;
	
	var UnzonedRange = FC.UnzonedRange = Class.extend({
	
		startMs: null, // if null, no start constraint
		endMs: null, // if null, no end constraint
	
		// TODO: move these into footprint.
		// Especially, doesn't make sense for null startMs/endMs.
		isStart: true,
		isEnd: true,
	
		constructor: function(startInput, endInput) {
	
			if (moment.isMoment(startInput)) {
				startInput = startInput.clone().stripZone();
			}
	
			if (moment.isMoment(endInput)) {
				endInput = endInput.clone().stripZone();
			}
	
			if (startInput) {
				this.startMs = startInput.valueOf();
			}
	
			if (endInput) {
				this.endMs = endInput.valueOf();
			}
		},
	
		intersect: function(otherRange) {
			var startMs = this.startMs;
			var endMs = this.endMs;
			var newRange = null;
	
			if (otherRange.startMs !== null) {
				if (startMs === null) {
					startMs = otherRange.startMs;
				}
				else {
					startMs = Math.max(startMs, otherRange.startMs);
				}
			}
	
			if (otherRange.endMs !== null) {
				if (endMs === null) {
					endMs = otherRange.endMs;
				}
				else {
					endMs = Math.min(endMs, otherRange.endMs);
				}
			}
	
			if (startMs === null || endMs === null || startMs < endMs) {
				newRange = new UnzonedRange(startMs, endMs);
				newRange.isStart = this.isStart && startMs === this.startMs;
				newRange.isEnd = this.isEnd && endMs === this.endMs;
			}
	
			return newRange;
		},
	
	
		intersectsWith: function(otherRange) {
			return (this.endMs === null || otherRange.startMs === null || this.endMs > otherRange.startMs) &&
				(this.startMs === null || otherRange.endMs === null || this.startMs < otherRange.endMs);
		},
	
	
		containsRange: function(innerRange) {
			return (this.startMs === null || (innerRange.startMs !== null && innerRange.startMs >= this.startMs)) &&
				(this.endMs === null || (innerRange.endMs !== null && innerRange.endMs <= this.endMs));
		},
	
	
		// `date` can be a moment, a Date, or a millisecond time.
		containsDate: function(date) {
			var ms = date.valueOf();
	
			return (this.startMs === null || ms >= this.startMs) &&
				(this.endMs === null || ms < this.endMs);
		},
	
	
		// If the given date is not within the given range, move it inside.
		// (If it's past the end, make it one millisecond before the end).
		// `date` can be a moment, a Date, or a millisecond time.
		// Returns a MS-time.
		constrainDate: function(date) {
			var ms = date.valueOf();
	
			if (this.startMs !== null && ms < this.startMs) {
				ms = this.startMs;
			}
	
			if (this.endMs !== null && ms >= this.endMs) {
				ms = this.endMs - 1;
			}
	
			return ms;
		},
	
	
		equals: function(otherRange) {
			return this.startMs === otherRange.startMs && this.endMs === otherRange.endMs;
		},
	
	
		clone: function() {
			var range = new UnzonedRange(this.startMs, this.endMs);
	
			range.isStart = this.isStart;
			range.isEnd = this.isEnd;
	
			return range;
		},
	
	
		// Returns an ambig-zoned moment from startMs.
		// BEWARE: returned moment is not localized.
		// Formatting and start-of-week will be default.
		getStart: function() {
			if (this.startMs !== null) {
				return FC.moment.utc(this.startMs).stripZone();
			}
		},
	
		// Returns an ambig-zoned moment from startMs.
		// BEWARE: returned moment is not localized.
		// Formatting and start-of-week will be default.
		getEnd: function() {
			if (this.endMs !== null) {
				return FC.moment.utc(this.endMs).stripZone();
			}
		}
	
	});
	
	
	/*
	SIDEEFFECT: will mutate eventRanges.
	Will return a new array result.
	Only works for non-open-ended ranges.
	*/
	function invertUnzonedRanges(ranges, constraintRange) {
		var invertedRanges = [];
		var startMs = constraintRange.startMs; // the end of the previous range. the start of the new range
		var i;
		var dateRange;
	
		// ranges need to be in order. required for our date-walking algorithm
		ranges.sort(compareUnzonedRanges);
	
		for (i = 0; i < ranges.length; i++) {
			dateRange = ranges[i];
	
			// add the span of time before the event (if there is any)
			if (dateRange.startMs > startMs) { // compare millisecond time (skip any ambig logic)
				invertedRanges.push(
					new UnzonedRange(startMs, dateRange.startMs)
				);
			}
	
			if (dateRange.endMs > startMs) {
				startMs = dateRange.endMs;
			}
		}
	
		// add the span of time after the last event (if there is any)
		if (startMs < constraintRange.endMs) { // compare millisecond time (skip any ambig logic)
			invertedRanges.push(
				new UnzonedRange(startMs, constraintRange.endMs)
			);
		}
	
		return invertedRanges;
	}
	
	
	/*
	Only works for non-open-ended ranges.
	*/
	function compareUnzonedRanges(range1, range2) {
		return range1.startMs - range2.startMs; // earlier ranges go first
	}
	
	;;
	
	/*
	Meant to be immutable
	*/
	var ComponentFootprint = FC.ComponentFootprint = Class.extend({
	
		unzonedRange: null,
		isAllDay: false, // component can choose to ignore this
	
	
		constructor: function(unzonedRange, isAllDay) {
			this.unzonedRange = unzonedRange;
			this.isAllDay = isAllDay;
		},
	
	
		/*
		Only works for non-open-ended ranges.
		*/
		toLegacy: function(calendar) {
			return {
				start: calendar.msToMoment(this.unzonedRange.startMs, this.isAllDay),
				end: calendar.msToMoment(this.unzonedRange.endMs, this.isAllDay)
			};
		}
	
	});
	
	;;
	
	var EventManager = Class.extend(EmitterMixin, ListenerMixin, {
	
		currentPeriod: null,
	
		calendar: null,
		stickySource: null,
		otherSources: null, // does not include sticky source
	
	
		constructor: function(calendar) {
			this.calendar = calendar;
			this.stickySource = new ArrayEventSource(calendar);
			this.otherSources = [];
		},
	
	
		requestEvents: function(start, end, timezone, force) {
			if (
				force ||
				!this.currentPeriod ||
				!this.currentPeriod.isWithinRange(start, end) ||
				timezone !== this.currentPeriod.timezone
			) {
				this.setPeriod( // will change this.currentPeriod
					new EventPeriod(start, end, timezone)
				);
			}
	
			return this.currentPeriod.whenReleased();
		},
	
	
		// Source Adding/Removing
		// -----------------------------------------------------------------------------------------------------------------
	
	
		addSource: function(eventSource) {
			this.otherSources.push(eventSource);
	
			if (this.currentPeriod) {
				this.currentPeriod.requestSource(eventSource); // might release
			}
		},
	
	
		removeSource: function(doomedSource) {
			removeExact(this.otherSources, doomedSource);
	
			if (this.currentPeriod) {
				this.currentPeriod.purgeSource(doomedSource); // might release
			}
		},
	
	
		removeAllSources: function() {
			this.otherSources = [];
	
			if (this.currentPeriod) {
				this.currentPeriod.purgeAllSources(); // might release
			}
		},
	
	
		// Source Refetching
		// -----------------------------------------------------------------------------------------------------------------
	
	
		refetchSource: function(eventSource) {
			var currentPeriod = this.currentPeriod;
	
			if (currentPeriod) {
				currentPeriod.freeze();
				currentPeriod.purgeSource(eventSource);
				currentPeriod.requestSource(eventSource);
				currentPeriod.thaw();
			}
		},
	
	
		refetchAllSources: function() {
			var currentPeriod = this.currentPeriod;
	
			if (currentPeriod) {
				currentPeriod.freeze();
				currentPeriod.purgeAllSources();
				currentPeriod.requestSources(this.getSources());
				currentPeriod.thaw();
			}
		},
	
	
		// Source Querying
		// -----------------------------------------------------------------------------------------------------------------
	
	
		getSources: function() {
			return [ this.stickySource ].concat(this.otherSources);
		},
	
	
		// like querySources, but accepts multple match criteria (like multiple IDs)
		multiQuerySources: function(matchInputs) {
	
			// coerce into an array
			if (!matchInputs) {
				matchInputs = [];
			}
			else if (!$.isArray(matchInputs)) {
				matchInputs = [ matchInputs ];
			}
	
			var matchingSources = [];
			var i;
	
			// resolve raw inputs to real event source objects
			for (i = 0; i < matchInputs.length; i++) {
				matchingSources.push.apply( // append
					matchingSources,
					this.querySources(matchInputs[i])
				);
			}
	
			return matchingSources;
		},
	
	
		// matchInput can either by a real event source object, an ID, or the function/URL for the source.
		// returns an array of matching source objects.
		querySources: function(matchInput) {
			var sources = this.otherSources;
			var i, source;
	
			// given a proper event source object
			for (i = 0; i < sources.length; i++) {
				source = sources[i];
	
				if (source === matchInput) {
					return [ source ];
				}
			}
	
			// an ID match
			source = this.getSourceById(EventSource.normalizeId(matchInput));
			if (source) {
				return [ source ];
			}
	
			// parse as an event source
			matchInput = EventSourceParser.parse(matchInput, this.calendar);
			if (matchInput) {
	
				return $.grep(sources, function(source) {
					return isSourcesEquivalent(matchInput, source);
				});
			}
		},
	
	
		/*
		ID assumed to already be normalized
		*/
		getSourceById: function(id) {
			return $.grep(this.otherSources, function(source) {
				return source.id && source.id === id;
			})[0];
		},
	
	
		// Event-Period
		// -----------------------------------------------------------------------------------------------------------------
	
	
		setPeriod: function(eventPeriod) {
			if (this.currentPeriod) {
				this.unbindPeriod(this.currentPeriod);
				this.currentPeriod = null;
			}
	
			this.currentPeriod = eventPeriod;
			this.bindPeriod(eventPeriod);
	
			eventPeriod.requestSources(this.getSources());
		},
	
	
		bindPeriod: function(eventPeriod) {
			this.listenTo(eventPeriod, 'release', function(eventsPayload) {
				this.trigger('release', eventsPayload);
			});
		},
	
	
		unbindPeriod: function(eventPeriod) {
			this.stopListeningTo(eventPeriod);
		},
	
	
		// Event Getting/Adding/Removing
		// -----------------------------------------------------------------------------------------------------------------
	
	
		getEventDefByUid: function(uid) {
			if (this.currentPeriod) {
				return this.currentPeriod.getEventDefByUid(uid);
			}
		},
	
	
		addEventDef: function(eventDef, isSticky) {
			if (isSticky) {
				this.stickySource.addEventDef(eventDef);
			}
	
			if (this.currentPeriod) {
				this.currentPeriod.addEventDef(eventDef); // might release
			}
		},
	
	
		removeEventDefsById: function(eventId) {
			this.getSources().forEach(function(eventSource) {
				eventSource.removeEventDefsById(eventId);
			});
	
			if (this.currentPeriod) {
				this.currentPeriod.removeEventDefsById(eventId); // might release
			}
		},
	
	
		removeAllEventDefs: function() {
			this.getSources().forEach(function(eventSource) {
				eventSource.removeAllEventDefs();
			});
	
			if (this.currentPeriod) {
				this.currentPeriod.removeAllEventDefs();
			}
		},
	
	
		// Event Mutating
		// -----------------------------------------------------------------------------------------------------------------
	
	
		/*
		Returns an undo function.
		*/
		mutateEventsWithId: function(eventDefId, eventDefMutation) {
			var currentPeriod = this.currentPeriod;
			var eventDefs;
			var undoFuncs = [];
	
			if (currentPeriod) {
	
				currentPeriod.freeze();
	
				eventDefs = currentPeriod.getEventDefsById(eventDefId);
				eventDefs.forEach(function(eventDef) {
					// add/remove esp because id might change
					currentPeriod.removeEventDef(eventDef);
					undoFuncs.push(eventDefMutation.mutateSingle(eventDef));
					currentPeriod.addEventDef(eventDef);
				});
	
				currentPeriod.thaw();
	
				return function() {
					currentPeriod.freeze();
	
					for (var i = 0; i < eventDefs.length; i++) {
						currentPeriod.removeEventDef(eventDefs[i]);
						undoFuncs[i]();
						currentPeriod.addEventDef(eventDefs[i]);
					}
	
					currentPeriod.thaw();
				};
			}
	
			return function() { };
		},
	
	
		/*
		copies and then mutates
		*/
		buildMutatedEventInstanceGroup: function(eventDefId, eventDefMutation) {
			var eventDefs = this.getEventDefsById(eventDefId);
			var i;
			var defCopy;
			var allInstances = [];
	
			for (i = 0; i < eventDefs.length; i++) {
				defCopy = eventDefs[i].clone();
	
				if (defCopy instanceof SingleEventDef) {
					eventDefMutation.mutateSingle(defCopy);
	
					allInstances.push.apply(allInstances, // append
						defCopy.buildInstances()
					);
				}
			}
	
			return new EventInstanceGroup(allInstances);
		},
	
	
		// Freezing
		// -----------------------------------------------------------------------------------------------------------------
	
	
		freeze: function() {
			if (this.currentPeriod) {
				this.currentPeriod.freeze();
			}
		},
	
	
		thaw: function() {
			if (this.currentPeriod) {
				this.currentPeriod.thaw();
			}
		}
	
	});
	
	
	// Methods that straight-up query the current EventPeriod for an array of results.
	[
		'getEventDefsById',
		'getEventInstances',
		'getEventInstancesWithId',
		'getEventInstancesWithoutId'
	].forEach(function(methodName) {
	
		EventManager.prototype[methodName] = function() {
			var currentPeriod = this.currentPeriod;
	
			if (currentPeriod) {
				return currentPeriod[methodName].apply(currentPeriod, arguments);
			}
	
			return [];
		};
	});
	
	
	function isSourcesEquivalent(source0, source1) {
		return source0.getPrimitive() == source1.getPrimitive();
	}
	
	;;
	
	var EventPeriod = Class.extend(EmitterMixin, {
	
		start: null,
		end: null,
		timezone: null,
	
		unzonedRange: null,
	
		requestsByUid: null,
		pendingCnt: 0,
	
		freezeDepth: 0,
		stuntedReleaseCnt: 0,
		releaseCnt: 0,
	
		eventDefsByUid: null,
		eventDefsById: null,
		eventInstanceGroupsById: null,
	
	
		constructor: function(start, end, timezone) {
			this.start = start;
			this.end = end;
			this.timezone = timezone;
	
			this.unzonedRange = new UnzonedRange(
				start.clone().stripZone(),
				end.clone().stripZone()
			);
	
			this.requestsByUid = {};
			this.eventDefsByUid = {};
			this.eventDefsById = {};
			this.eventInstanceGroupsById = {};
		},
	
	
		isWithinRange: function(start, end) {
			// TODO: use a range util function?
			return !start.isBefore(this.start) && !end.isAfter(this.end);
		},
	
	
		// Requesting and Purging
		// -----------------------------------------------------------------------------------------------------------------
	
	
		requestSources: function(sources) {
			this.freeze();
	
			for (var i = 0; i < sources.length; i++) {
				this.requestSource(sources[i]);
			}
	
			this.thaw();
		},
	
	
		requestSource: function(source) {
			var _this = this;
			var request = { source: source, status: 'pending' };
	
			this.requestsByUid[source.uid] = request;
			this.pendingCnt += 1;
	
			source.fetch(this.start, this.end, this.timezone).then(function(eventDefs) {
				if (request.status !== 'cancelled') {
					request.status = 'completed';
					request.eventDefs = eventDefs;
	
					_this.addEventDefs(eventDefs);
					_this.pendingCnt--;
					_this.tryRelease();
				}
			}, function() { // failure
				if (request.status !== 'cancelled') {
					request.status = 'failed';
	
					_this.pendingCnt--;
					_this.tryRelease();
				}
			});
		},
	
	
		purgeSource: function(source) {
			var request = this.requestsByUid[source.uid];
	
			if (request) {
				delete this.requestsByUid[source.uid];
	
				if (request.status === 'pending') {
					request.status = 'cancelled';
					this.pendingCnt--;
					this.tryRelease();
				}
				else if (request.status === 'completed') {
					request.eventDefs.forEach(this.removeEventDef.bind(this));
				}
			}
		},
	
	
		purgeAllSources: function() {
			var requestsByUid = this.requestsByUid;
			var uid, request;
			var completedCnt = 0;
	
			for (uid in requestsByUid) {
				request = requestsByUid[uid];
	
				if (request.status === 'pending') {
					request.status = 'cancelled';
				}
				else if (request.status === 'completed') {
					completedCnt++;
				}
			}
	
			this.requestsByUid = {};
			this.pendingCnt = 0;
	
			if (completedCnt) {
				this.removeAllEventDefs(); // might release
			}
		},
	
	
		// Event Definitions
		// -----------------------------------------------------------------------------------------------------------------
	
	
		getEventDefByUid: function(eventDefUid) {
			return this.eventDefsByUid[eventDefUid];
		},
	
	
		getEventDefsById: function(eventDefId) {
			var a = this.eventDefsById[eventDefId];
	
			if (a) {
				return a.slice(); // clone
			}
	
			return [];
		},
	
	
		addEventDefs: function(eventDefs) {
			for (var i = 0; i < eventDefs.length; i++) {
				this.addEventDef(eventDefs[i]);
			}
		},
	
	
		addEventDef: function(eventDef) {
			var eventDefsById = this.eventDefsById;
			var eventDefId = eventDef.id;
			var eventDefs = eventDefsById[eventDefId] || (eventDefsById[eventDefId] = []);
			var eventInstances = eventDef.buildInstances(this.unzonedRange);
			var i;
	
			eventDefs.push(eventDef);
	
			this.eventDefsByUid[eventDef.uid] = eventDef;
	
			for (i = 0; i < eventInstances.length; i++) {
				this.addEventInstance(eventInstances[i], eventDefId);
			}
		},
	
	
		removeEventDefsById: function(eventDefId) {
			var _this = this;
	
			this.getEventDefsById(eventDefId).forEach(function(eventDef) {
				_this.removeEventDef(eventDef);
			});
		},
	
	
		removeAllEventDefs: function() {
			var isEmpty = $.isEmptyObject(this.eventDefsByUid);
	
			this.eventDefsByUid = {};
			this.eventDefsById = {};
			this.eventInstanceGroupsById = {};
	
			if (!isEmpty) {
				this.tryRelease();
			}
		},
	
	
		removeEventDef: function(eventDef) {
			var eventDefsById = this.eventDefsById;
			var eventDefs = eventDefsById[eventDef.id];
	
			delete this.eventDefsByUid[eventDef.uid];
	
			if (eventDefs) {
				removeExact(eventDefs, eventDef);
	
				if (!eventDefs.length) {
					delete eventDefsById[eventDef.id];
				}
	
				this.removeEventInstancesForDef(eventDef);
			}
		},
	
	
		// Event Instances
		// -----------------------------------------------------------------------------------------------------------------
	
	
		getEventInstances: function() { // TODO: consider iterator
			var eventInstanceGroupsById = this.eventInstanceGroupsById;
			var eventInstances = [];
			var id;
	
			for (id in eventInstanceGroupsById) {
				eventInstances.push.apply(eventInstances, // append
					eventInstanceGroupsById[id].eventInstances
				);
			}
	
			return eventInstances;
		},
	
	
		getEventInstancesWithId: function(eventDefId) {
			var eventInstanceGroup = this.eventInstanceGroupsById[eventDefId];
	
			if (eventInstanceGroup) {
				return eventInstanceGroup.eventInstances.slice(); // clone
			}
	
			return [];
		},
	
	
		getEventInstancesWithoutId: function(eventDefId) { // TODO: consider iterator
			var eventInstanceGroupsById = this.eventInstanceGroupsById;
			var matchingInstances = [];
			var id;
	
			for (id in eventInstanceGroupsById) {
				if (id !== eventDefId) {
					matchingInstances.push.apply(matchingInstances, // append
						eventInstanceGroupsById[id].eventInstances
					);
				}
			}
	
			return matchingInstances;
		},
	
	
		addEventInstance: function(eventInstance, eventDefId) {
			var eventInstanceGroupsById = this.eventInstanceGroupsById;
			var eventInstanceGroup = eventInstanceGroupsById[eventDefId] ||
				(eventInstanceGroupsById[eventDefId] = new EventInstanceGroup());
	
			eventInstanceGroup.eventInstances.push(eventInstance);
	
			this.tryRelease();
		},
	
	
		removeEventInstancesForDef: function(eventDef) {
			var eventInstanceGroupsById = this.eventInstanceGroupsById;
			var eventInstanceGroup = eventInstanceGroupsById[eventDef.id];
			var removeCnt;
	
			if (eventInstanceGroup) {
				removeCnt = removeMatching(eventInstanceGroup.eventInstances, function(currentEventInstance) {
					return currentEventInstance.def === eventDef;
				});
	
				if (!eventInstanceGroup.eventInstances.length) {
					delete eventInstanceGroupsById[eventDef.id];
				}
	
				if (removeCnt) {
					this.tryRelease();
				}
			}
		},
	
	
		// Releasing and Freezing
		// -----------------------------------------------------------------------------------------------------------------
	
	
		tryRelease: function() {
			if (!this.pendingCnt) {
				if (!this.freezeDepth) {
					this.release();
				}
				else {
					this.stuntedReleaseCnt++;
				}
			}
		},
	
	
		release: function() {
			this.releaseCnt++;
			this.trigger('release', this.eventInstanceGroupsById);
		},
	
	
		whenReleased: function() {
			var _this = this;
	
			if (this.releaseCnt) {
				return Promise.resolve(this.eventInstanceGroupsById);
			}
			else {
				return Promise.construct(function(onResolve) {
					_this.one('release', onResolve);
				});
			}
		},
	
	
		freeze: function() {
			if (!(this.freezeDepth++)) {
				this.stuntedReleaseCnt = 0;
			}
		},
	
	
		thaw: function() {
			if (!(--this.freezeDepth) && this.stuntedReleaseCnt && !this.pendingCnt) {
				this.release();
			}
		}
	
	});
	
	;;
	
	var EventDefParser = {
	
		parse: function(eventInput, source) {
			if (
				isTimeString(eventInput.start) || moment.isDuration(eventInput.start) ||
				isTimeString(eventInput.end) || moment.isDuration(eventInput.end)
			) {
				return RecurringEventDef.parse(eventInput, source);
			}
			else {
				return SingleEventDef.parse(eventInput, source);
			}
		}
	
	};
	
	;;
	
	var EventDef = FC.EventDef = Class.extend(ParsableModelMixin, {
	
		source: null, // required
	
		id: null, // normalized supplied ID
		rawId: null, // unnormalized supplied ID
		uid: null, // internal ID. new ID for every definition
	
		// NOTE: eventOrder sorting relies on these
		title: null,
		url: null,
		rendering: null,
		constraint: null,
		overlap: null,
		editable: null,
		startEditable: null,
		durationEditable: null,
		color: null,
		backgroundColor: null,
		borderColor: null,
		textColor: null,
	
		className: null, // an array. TODO: rename to className*s* (API breakage)
		miscProps: null,
	
	
		constructor: function(source) {
			this.source = source;
			this.className = [];
			this.miscProps = {};
		},
	
	
		isAllDay: function() {
			// subclasses must implement
		},
	
	
		buildInstances: function(unzonedRange) {
			// subclasses must implement
		},
	
	
		clone: function() {
			var copy = new this.constructor(this.source);
	
			copy.id = this.id;
			copy.rawId = this.rawId;
			copy.uid = this.uid; // not really unique anymore :(
	
			EventDef.copyVerbatimStandardProps(this, copy);
	
			copy.className = this.className; // should clone?
			copy.miscProps = $.extend({}, this.miscProps);
	
			return copy;
		},
	
	
		hasInverseRendering: function() {
			return this.getRendering() === 'inverse-background';
		},
	
	
		hasBgRendering: function() {
			var rendering = this.getRendering();
	
			return rendering === 'inverse-background' || rendering === 'background';
		},
	
	
		getRendering: function() {
			if (this.rendering != null) {
				return this.rendering;
			}
	
			return this.source.rendering;
		},
	
	
		getConstraint: function() {
			if (this.constraint != null) {
				return this.constraint;
			}
	
			if (this.source.constraint != null) {
				return this.source.constraint;
			}
	
			return this.source.calendar.opt('eventConstraint'); // what about View option?
		},
	
	
		getOverlap: function() {
			if (this.overlap != null) {
				return this.overlap;
			}
	
			if (this.source.overlap != null) {
				return this.source.overlap;
			}
	
			return this.source.calendar.opt('eventOverlap'); // what about View option?
		},
	
	
		isStartExplicitlyEditable: function() {
			if (this.startEditable !== null) {
				return this.startEditable;
			}
	
			return this.source.startEditable;
		},
	
	
		isDurationExplicitlyEditable: function() {
			if (this.durationEditable !== null) {
				return this.durationEditable;
			}
	
			return this.source.durationEditable;
		},
	
	
		isExplicitlyEditable: function() {
			if (this.editable !== null) {
				return this.editable;
			}
	
			return this.source.editable;
		},
	
	
		toLegacy: function() {
			var obj = $.extend({}, this.miscProps);
	
			obj._id = this.uid;
			obj.source = this.source;
			obj.className = this.className; // should clone?
			obj.allDay = this.isAllDay();
	
			if (this.rawId != null) {
				obj.id = this.rawId;
			}
	
			EventDef.copyVerbatimStandardProps(this, obj);
	
			return obj;
		},
	
	
		applyManualRawProps: function(rawProps) {
	
			if (rawProps.id != null) {
				this.id = EventDef.normalizeId((this.rawId = rawProps.id));
			}
			else {
				this.id = EventDef.generateId();
			}
	
			if (rawProps._id != null) { // accept this prop, even tho somewhat internal
				this.uid = String(rawProps._id);
			}
			else {
				this.uid = EventDef.generateId();
			}
	
			// TODO: converge with EventSource
			if ($.isArray(rawProps.className)) {
				this.className = rawProps.className;
			}
			if (typeof rawProps.className === 'string') {
				this.className = rawProps.className.split(/\s+/);
			}
	
			return true;
		},
	
	
		applyOtherRawProps: function(rawProps) {
			this.miscProps = rawProps;
		}
	
	});
	
	// finish initializing the mixin
	EventDef.allowRawProps = ParsableModelMixin_allowRawProps;
	EventDef.copyVerbatimStandardProps = ParsableModelMixin_copyVerbatimStandardProps;
	
	
	// IDs
	// ---------------------------------------------------------------------------------------------------------------------
	// TODO: converge with EventSource
	
	
	EventDef.uuid = 0;
	
	
	EventDef.normalizeId = function(id) {
		return String(id);
	};
	
	
	EventDef.generateId = function() {
		return '_fc' + (EventDef.uuid++);
	};
	
	
	// Parsing
	// ---------------------------------------------------------------------------------------------------------------------
	
	
	EventDef.allowRawProps({
		// not automatically assigned (`false`)
		_id: false,
		id: false,
		className: false,
		source: false, // will ignored
	
		// automatically assigned (`true`)
		title: true,
		url: true,
		rendering: true,
		constraint: true,
		overlap: true,
		editable: true,
		startEditable: true,
		durationEditable: true,
		color: true,
		backgroundColor: true,
		borderColor: true,
		textColor: true
	});
	
	
	EventDef.parse = function(rawInput, source) {
		var def = new this(source);
		var calendarTransform = source.calendar.opt('eventDataTransform');
		var sourceTransform = source.eventDataTransform;
	
		if (calendarTransform) {
			rawInput = calendarTransform(rawInput);
		}
		if (sourceTransform) {
			rawInput = sourceTransform(rawInput);
		}
	
		if (def.applyRawProps(rawInput)) {
			return def;
		}
	
		return false;
	};
	
	;;
	
	var SingleEventDef = EventDef.extend({
	
		dateProfile: null,
	
	
		/*
		Will receive start/end params, but will be ignored.
		*/
		buildInstances: function() {
			return [ this.buildInstance() ];
		},
	
	
		buildInstance: function() {
			return new EventInstance(
				this, // definition
				this.dateProfile
			);
		},
	
	
		isAllDay: function() {
			return this.dateProfile.isAllDay();
		},
	
	
		clone: function() {
			var def = EventDef.prototype.clone.call(this);
	
			def.dateProfile = this.dateProfile;
	
			return def;
		},
	
	
		rezone: function() {
			var calendar = this.source.calendar;
			var dateProfile = this.dateProfile;
	
			this.dateProfile = new EventDateProfile(
				calendar.moment(dateProfile.start),
				dateProfile.end ? calendar.moment(dateProfile.end) : null,
				calendar
			);
		},
	
	
		/*
		NOTE: if super-method fails, should still attempt to apply
		*/
		applyManualRawProps: function(rawProps) {
			var superSuccess = EventDef.prototype.applyManualRawProps.apply(this, arguments);
			var dateProfile = EventDateProfile.parse(rawProps, this.source); // returns null on failure
	
			if (dateProfile) {
				this.dateProfile = dateProfile;
	
				// make sure `date` shows up in the legacy event objects as-is
				if (rawProps.date != null) {
					this.miscProps.date = rawProps.date;
				}
	
				return superSuccess;
			}
			else {
				return false;
			}
		}
	
	});
	
	
	// Parsing
	// ---------------------------------------------------------------------------------------------------------------------
	
	
	SingleEventDef.allowRawProps({ // false = manually process
		start: false,
		date: false, // alias for 'start'
		end: false,
		allDay: false
	});
	
	;;
	
	var RecurringEventDef = EventDef.extend({
	
		startTime: null, // duration
		endTime: null, // duration, or null
		dowHash: null, // object hash, or null
	
	
		isAllDay: function() {
			return !this.startTime && !this.endTime;
		},
	
	
		buildInstances: function(unzonedRange) {
			var calendar = this.source.calendar;
			var unzonedDate = unzonedRange.getStart();
			var unzonedEnd = unzonedRange.getEnd();
			var zonedDayStart;
			var instanceStart, instanceEnd;
			var instances = [];
	
			while (unzonedDate.isBefore(unzonedEnd)) {
	
				// if everyday, or this particular day-of-week
				if (!this.dowHash || this.dowHash[unzonedDate.day()]) {
	
					zonedDayStart = calendar.applyTimezone(unzonedDate);
					instanceStart = zonedDayStart.clone();
					instanceEnd = null;
	
					if (this.startTime) {
						instanceStart.time(this.startTime);
					}
					else {
						instanceStart.stripTime();
					}
	
					if (this.endTime) {
						instanceEnd = zonedDayStart.clone().time(this.endTime);
					}
	
					instances.push(
						new EventInstance(
							this, // definition
							new EventDateProfile(instanceStart, instanceEnd, calendar)
						)
					);
				}
	
				unzonedDate.add(1, 'days');
			}
	
			return instances;
		},
	
	
		setDow: function(dowNumbers) {
	
			if (!this.dowHash) {
				this.dowHash = {};
			}
	
			for (var i = 0; i < dowNumbers.length; i++) {
				this.dowHash[dowNumbers[i]] = true;
			}
		},
	
	
		clone: function() {
			var def = EventDef.prototype.clone.call(this);
	
			if (def.startTime) {
				def.startTime = moment.duration(this.startTime);
			}
	
			if (def.endTime) {
				def.endTime = moment.duration(this.endTime);
			}
	
			if (this.dowHash) {
				def.dowHash = $.extend({}, this.dowHash);
			}
	
			return def;
		},
	
	
		/*
		NOTE: if super-method fails, should still attempt to apply
		*/
		applyRawProps: function(rawProps) {
			var superSuccess = EventDef.prototype.applyRawProps.apply(this, arguments);
	
			if (rawProps.start) {
				this.startTime = moment.duration(rawProps.start);
			}
	
			if (rawProps.end) {
				this.endTime = moment.duration(rawProps.end);
			}
	
			if (rawProps.dow) {
				this.setDow(rawProps.dow);
			}
	
			return superSuccess;
		}
	
	});
	
	
	// Parsing
	// ---------------------------------------------------------------------------------------------------------------------
	
	
	RecurringEventDef.allowRawProps({ // false = manually process
		start: false,
		end: false,
		dow: false
	});
	
	;;
	
	var EventInstance = Class.extend({
	
		def: null, // EventDef
		dateProfile: null, // EventDateProfile
	
	
		constructor: function(def, dateProfile) {
			this.def = def;
			this.dateProfile = dateProfile;
		},
	
	
		toLegacy: function() {
			var dateProfile = this.dateProfile;
			var obj = this.def.toLegacy();
	
			obj.start = dateProfile.start.clone();
			obj.end = dateProfile.end ? dateProfile.end.clone() : null;
	
			return obj;
		}
	
	});
	
	;;
	
	/*
	It's expected that there will be at least one EventInstance,
	OR that an explicitEventDef is assigned.
	*/
	var EventInstanceGroup = Class.extend({
	
		eventInstances: null,
		explicitEventDef: null, // optional
	
	
		constructor: function(eventInstances) {
			this.eventInstances = eventInstances || [];
		},
	
	
		getAllEventRanges: function() {
			return eventInstancesToEventRanges(this.eventInstances);
		},
	
	
		sliceRenderRanges: function(constraintRange) {
			if (this.isInverse()) {
				return this.sliceInverseRenderRanges(constraintRange);
			}
			else {
				return this.sliceNormalRenderRanges(constraintRange);
			}
		},
	
	
		sliceNormalRenderRanges: function(constraintRange) {
			var eventInstances = this.eventInstances;
			var i, eventInstance;
			var slicedRange;
			var slicedEventRanges = [];
	
			for (i = 0; i < eventInstances.length; i++) {
				eventInstance = eventInstances[i];
	
				slicedRange = eventInstance.dateProfile.unzonedRange.intersect(constraintRange);
	
				if (slicedRange) {
					slicedEventRanges.push(
						new EventRange(
							slicedRange,
							eventInstance.def,
							eventInstance
						)
					);
				}
			}
	
			return slicedEventRanges;
		},
	
	
		sliceInverseRenderRanges: function(constraintRange) {
			var unzonedRanges = eventInstancesToUnzonedRanges(this.eventInstances);
			var ownerDef = this.getEventDef();
	
			unzonedRanges = invertUnzonedRanges(unzonedRanges, constraintRange);
	
			return unzonedRanges.map(function(unzonedRange) {
				return new EventRange(unzonedRange, ownerDef); // don't give an EventDef
			});
		},
	
	
		isInverse: function() {
			return this.getEventDef().hasInverseRendering();
		},
	
	
		getEventDef: function() {
			return this.explicitEventDef || this.eventInstances[0].def;
		}
	
	});
	
	;;
	
	/*
	Meant to be immutable
	*/
	var EventDateProfile = Class.extend({
	
		start: null,
		end: null,
		unzonedRange: null,
	
	
		constructor: function(start, end, calendar) {
			this.start = start;
			this.end = end || null;
			this.unzonedRange = this.buildUnzonedRange(calendar);
		},
	
	
		isAllDay: function() {
			return !(this.start.hasTime() || (this.end && this.end.hasTime()));
		},
	
	
		/*
		Needs a Calendar object
		*/
		buildUnzonedRange: function(calendar) {
			var startMs = this.start.clone().stripZone().valueOf();
			var endMs = this.getEnd(calendar).stripZone().valueOf();
	
			return new UnzonedRange(startMs, endMs);
		},
	
	
		/*
		Needs a Calendar object
		*/
		getEnd: function(calendar) {
			return this.end ?
				this.end.clone() :
				// derive the end from the start and allDay. compute allDay if necessary
				calendar.getDefaultEventEnd(
					this.isAllDay(),
					this.start
				);
		}
	
	});
	
	
	/*
	Needs an EventSource object
	*/
	EventDateProfile.parse = function(rawProps, source) {
		var startInput = rawProps.start || rawProps.date;
		var endInput = rawProps.end;
	
		if (!startInput) {
			return false;
		}
	
		var calendar = source.calendar;
		var start = calendar.moment(startInput);
		var end = endInput ? calendar.moment(endInput) : null;
		var forcedAllDay = rawProps.allDay;
		var forceEventDuration = calendar.opt('forceEventDuration');
	
		if (!start.isValid()) {
			return false;
		}
	
		if (end && (!end.isValid() || !end.isAfter(start))) {
			end = null;
		}
	
		if (forcedAllDay == null) {
			forcedAllDay = source.allDayDefault;
			if (forcedAllDay == null) {
				forcedAllDay = calendar.opt('allDayDefault');
			}
		}
	
		if (forcedAllDay === true) {
			start.stripTime();
			if (end) {
				end.stripTime();
			}
		}
		else if (forcedAllDay === false) {
			if (!start.hasTime()) {
				start.time(0);
			}
			if (end && !end.hasTime()) {
				end.time(0);
			}
		}
	
		if (!end && forceEventDuration) {
			end = calendar.getDefaultEventEnd(!start.hasTime(), start);
		}
	
		return new EventDateProfile(start, end, calendar);
	};
	
	;;
	
	var EventRange = Class.extend({
	
		unzonedRange: null,
		eventDef: null,
		eventInstance: null, // optional
	
	
		constructor: function(unzonedRange, eventDef, eventInstance) {
			this.unzonedRange = unzonedRange;
			this.eventDef = eventDef;
	
			if (eventInstance) {
				this.eventInstance = eventInstance;
			}
		}
	
	});
	
	;;
	
	var EventFootprint = FC.EventFootprint = Class.extend({
	
		componentFootprint: null,
		eventDef: null,
		eventInstance: null, // optional
	
	
		constructor: function(componentFootprint, eventDef, eventInstance) {
			this.componentFootprint = componentFootprint;
			this.eventDef = eventDef;
	
			if (eventInstance) {
				this.eventInstance = eventInstance;
			}
		},
	
	
		getEventLegacy: function() {
			return (this.eventInstance || this.eventDef).toLegacy();
		}
	
	});
	
	;;
	
	var EventDefMutation = FC.EventDefMutation = Class.extend({
	
		// won't ever be empty. will be null instead.
		// callers should use setDateMutation for setting.
		dateMutation: null,
	
		// hack to get updateEvent/createFromRawProps to work.
		// not undo-able and not considered in isEmpty.
		rawProps: null, // raw (pre-parse-like)
	
	
		/*
		eventDef assumed to be a SingleEventDef.
		returns an undo function.
		*/
		mutateSingle: function(eventDef) {
			var origDateProfile;
	
			if (this.dateMutation) {
				origDateProfile = eventDef.dateProfile;
	
				eventDef.dateProfile = this.dateMutation.buildNewDateProfile(
					origDateProfile,
					eventDef.source.calendar
				);
			}
	
			// can't undo
			if (this.rawProps) {
				eventDef.applyRawProps(this.rawProps);
			}
	
			if (origDateProfile) {
				return function() {
					eventDef.dateProfile = origDateProfile;
				};
			}
			else {
				return function() { };
			}
		},
	
	
		setDateMutation: function(dateMutation) {
			if (dateMutation && !dateMutation.isEmpty()) {
				this.dateMutation = dateMutation;
			}
			else {
				this.dateMutation = null;
			}
		},
	
	
		isEmpty: function() {
			return !this.dateMutation;
		}
	
	});
	
	
	EventDefMutation.createFromRawProps = function(eventInstance, newRawProps, largeUnit) {
		var eventDef = eventInstance.def;
		var applicableRawProps = {};
		var propName;
		var newDateProfile;
		var dateMutation;
		var defMutation;
	
		for (propName in newRawProps) {
			if (
				// ignore object-type custom properties and any date-related properties,
				// as well as any other internal property
				typeof newRawProps[propName] !== 'object' &&
				propName !== 'start' && propName !== 'end' && propName !== 'allDay' &&
				propName !== 'source' && propName !== '_id'
			) {
				applicableRawProps[propName] = newRawProps[propName];
			}
		}
	
		newDateProfile = EventDateProfile.parse(newRawProps, eventDef.source);
	
		if (newDateProfile) { // no failure?
			dateMutation = EventDefDateMutation.createFromDiff(
				eventInstance.dateProfile,
				newDateProfile,
				largeUnit
			);
		}
	
		defMutation = new EventDefMutation();
		defMutation.rawProps = applicableRawProps;
	
		if (dateMutation) {
			defMutation.dateMutation = dateMutation;
		}
	
		return defMutation;
	};
	
	;;
	
	var EventDefDateMutation = Class.extend({
	
		clearEnd: false,
		forceTimed: false,
		forceAllDay: false,
	
		// Durations. if 0-ms duration, will be null instead.
		// Callers should not set this directly.
		dateDelta: null,
		startDelta: null,
		endDelta: null,
	
	
		/*
		returns an undo function.
		*/
		buildNewDateProfile: function(eventDateProfile, calendar) {
			var start = eventDateProfile.start.clone();
			var end = null;
			var shouldRezone = false;
	
			if (!this.clearEnd && eventDateProfile.end) {
				end = eventDateProfile.end.clone();
			}
	
			if (this.forceTimed) {
				shouldRezone = true;
	
				if (!start.hasTime()) {
					start.time(0);
				}
	
				if (end && !end.hasTime()) {
					end.time(0);
				}
			}
			else if (this.forceAllDay) {
	
				if (start.hasTime()) {
					start.stripTime();
				}
	
				if (end && end.hasTime()) {
					end.stripTime();
				}
			}
	
			if (this.dateDelta) {
				shouldRezone = true;
	
				start.add(this.dateDelta);
	
				if (end) {
					end.add(this.dateDelta);
				}
			}
	
			// do this before adding startDelta to start, so we can work off of start
			if (this.endDelta) {
				shouldRezone = true;
	
				if (!end) {
					end = calendar.getDefaultEventEnd(eventDateProfile.isAllDay(), start);
				}
	
				end.add(this.endDelta);
			}
	
			if (this.startDelta) {
				shouldRezone = true;
	
				start.add(this.startDelta);
			}
	
			if (shouldRezone) {
				start = calendar.applyTimezone(start);
	
				if (end) {
					end = calendar.applyTimezone(end);
				}
			}
	
			// TODO: okay to access calendar option?
			if (!end && calendar.opt('forceEventDuration')) {
				end = calendar.getDefaultEventEnd(eventDateProfile.isAllDay(), start);
			}
	
			return new EventDateProfile(start, end, calendar);
		},
	
	
		setDateDelta: function(dateDelta) {
			if (dateDelta && dateDelta.valueOf()) {
				this.dateDelta = dateDelta;
			}
			else {
				this.dateDelta = null;
			}
		},
	
	
		setStartDelta: function(startDelta) {
			if (startDelta && startDelta.valueOf()) {
				this.startDelta = startDelta;
			}
			else {
				this.startDelta = null;
			}
		},
	
	
		setEndDelta: function(endDelta) {
			if (endDelta && endDelta.valueOf()) {
				this.endDelta = endDelta;
			}
			else {
				this.endDelta = null;
			}
		},
	
	
		isEmpty: function() {
			return !this.clearEnd && !this.forceTimed && !this.forceAllDay &&
				!this.dateDelta && !this.startDelta && !this.endDelta;
		}
	
	});
	
	
	EventDefDateMutation.createFromDiff = function(dateProfile0, dateProfile1, largeUnit) {
		var clearEnd = dateProfile0.end && !dateProfile1.end;
		var forceTimed = dateProfile0.isAllDay() && !dateProfile1.isAllDay();
		var forceAllDay = !dateProfile0.isAllDay() && dateProfile1.isAllDay();
		var dateDelta;
		var endDiff;
		var endDelta;
		var mutation;
	
		// subtracts the dates in the appropriate way, returning a duration
		function subtractDates(date1, date0) { // date1 - date0
			if (largeUnit) {
				return diffByUnit(date1, date0, largeUnit); // poorly named
			}
			else if (dateProfile1.isAllDay()) {
				return diffDay(date1, date0); // poorly named
			}
			else {
				return diffDayTime(date1, date0); // poorly named
			}
		}
	
		dateDelta = subtractDates(dateProfile1.start, dateProfile0.start);
	
		if (dateProfile1.end) {
			// use unzonedRanges because dateProfile0.end might be null
			endDiff = subtractDates(
				dateProfile1.unzonedRange.getEnd(),
				dateProfile0.unzonedRange.getEnd()
			);
			endDelta = endDiff.subtract(dateDelta);
		}
	
		mutation = new EventDefDateMutation();
		mutation.clearEnd = clearEnd;
		mutation.forceTimed = forceTimed;
		mutation.forceAllDay = forceAllDay;
		mutation.setDateDelta(dateDelta);
		mutation.setEndDelta(endDelta);
	
		return mutation;
	};
	
	;;
	
	function eventDefsToEventInstances(eventDefs, unzonedRange) {
		var eventInstances = [];
		var i;
	
		for (i = 0; i < eventDefs.length; i++) {
			eventInstances.push.apply(eventInstances, // append
				eventDefs[i].buildInstances(unzonedRange)
			);
		}
	
		return eventInstances;
	}
	
	
	function eventInstancesToEventRanges(eventInstances) {
		return eventInstances.map(function(eventInstance) {
			return new EventRange(
				eventInstance.dateProfile.unzonedRange,
				eventInstance.def,
				eventInstance
			);
		});
	}
	
	
	function eventInstancesToUnzonedRanges(eventInstances) {
		return eventInstances.map(function(eventInstance) {
			return eventInstance.dateProfile.unzonedRange;
		});
	}
	
	
	function eventFootprintsToComponentFootprints(eventFootprints) {
		return eventFootprints.map(function(eventFootprint) {
			return eventFootprint.componentFootprint;
		});
	}
	
	;;
	
	var EventSource = Class.extend(ParsableModelMixin, {
	
		calendar: null,
	
		id: null, // can stay null
		uid: null,
		color: null,
		backgroundColor: null,
		borderColor: null,
		textColor: null,
		className: null, // array
		editable: null,
		startEditable: null,
		durationEditable: null,
		rendering: null,
		overlap: null,
		constraint: null,
		allDayDefault: null,
		eventDataTransform: null, // optional function
	
	
		constructor: function(calendar) {
			this.calendar = calendar;
			this.className = [];
			this.uid = String(EventSource.uuid++);
		},
	
	
		fetch: function(start, end, timezone) {
			// subclasses must implement. must return a promise.
		},
	
	
		removeEventDefsById: function(eventDefId) {
			// optional for subclasses to implement
		},
	
	
		removeAllEventDefs: function() {
			// optional for subclasses to implement
		},
	
	
		/*
		For compairing/matching
		*/
		getPrimitive: function(otherSource) {
			// subclasses must implement
		},
	
	
		parseEventDefs: function(rawEventDefs) {
			var i;
			var eventDef;
			var eventDefs = [];
	
			for (i = 0; i < rawEventDefs.length; i++) {
				eventDef = EventDefParser.parse(
					rawEventDefs[i],
					this // source
				);
	
				if (eventDef) {
					eventDefs.push(eventDef);
				}
			}
	
			return eventDefs;
		},
	
	
		applyManualRawProps: function(rawProps) {
	
			if (rawProps.id != null) {
				this.id = EventSource.normalizeId(rawProps.id);
			}
	
			// TODO: converge with EventDef
			if ($.isArray(rawProps.className)) {
				this.className = rawProps.className;
			}
			else if (typeof rawProps.className === 'string') {
				this.className = rawProps.className.split(/\s+/);
			}
	
			return true;
		}
	
	});
	
	
	// finish initializing the mixin
	EventSource.allowRawProps = ParsableModelMixin_allowRawProps;
	
	
	// IDs
	// ---------------------------------------------------------------------------------------------------------------------
	// TODO: converge with EventDef
	
	
	EventSource.uuid = 0;
	
	
	EventSource.normalizeId = function(id) {
		if (id) {
			return String(id);
		}
	
		return null;
	};
	
	
	// Parsing
	// ---------------------------------------------------------------------------------------------------------------------
	
	
	EventSource.allowRawProps({
		// manually process...
		id: false,
		className: false,
	
		// automatically transfer...
		color: true,
		backgroundColor: true,
		borderColor: true,
		textColor: true,
		editable: true,
		startEditable: true,
		durationEditable: true,
		rendering: true,
		overlap: true,
		constraint: true,
		allDayDefault: true,
		eventDataTransform: true
	});
	
	
	/*
	rawInput can be any data type!
	*/
	EventSource.parse = function(rawInput, calendar) {
		var source = new this(calendar);
	
		if (typeof rawInput === 'object') {
			if (source.applyRawProps(rawInput)) {
				return source;
			}
		}
	
		return false;
	};
	
	
	FC.EventSource = EventSource;
	
	;;
	
	var EventSourceParser = {
	
		sourceClasses: [],
	
	
		registerClass: function(EventSourceClass) {
			this.sourceClasses.unshift(EventSourceClass); // give highest priority
		},
	
	
		parse: function(rawInput, calendar) {
			var sourceClasses = this.sourceClasses;
			var i;
			var eventSource;
	
			for (i = 0; i < sourceClasses.length; i++) {
				eventSource = sourceClasses[i].parse(rawInput, calendar);
	
				if (eventSource) {
					return eventSource;
				}
			}
		}
	
	};
	
	
	FC.EventSourceParser = EventSourceParser;
	
	;;
	
	var ArrayEventSource = EventSource.extend({
	
		rawEventDefs: null, // unparsed
		eventDefs: null,
		currentTimezone: null,
	
	
		constructor: function(calendar) {
			EventSource.apply(this, arguments); // super-constructor
			this.eventDefs = []; // for if setRawEventDefs is never called
		},
	
	
		setRawEventDefs: function(rawEventDefs) {
			this.rawEventDefs = rawEventDefs;
			this.eventDefs = this.parseEventDefs(rawEventDefs);
		},
	
	
		fetch: function(start, end, timezone) {
			var eventDefs = this.eventDefs;
			var i;
	
			if (
				this.currentTimezone !== null &&
				this.currentTimezone !== timezone
			) {
				for (i = 0; i < eventDefs.length; i++) {
					if (eventDefs[i] instanceof SingleEventDef) {
						eventDefs[i].rezone();
					}
				}
			}
	
			this.currentTimezone = timezone;
	
			return Promise.resolve(eventDefs);
		},
	
	
		addEventDef: function(eventDef) {
			this.eventDefs.push(eventDef);
		},
	
	
		/*
		eventDefId already normalized to a string
		*/
		removeEventDefsById: function(eventDefId) {
			return removeMatching(this.eventDefs, function(eventDef) {
				return eventDef.id === eventDefId;
			});
		},
	
	
		removeAllEventDefs: function() {
			this.eventDefs = [];
		},
	
	
		getPrimitive: function() {
			return this.rawEventDefs;
		},
	
	
		applyManualRawProps: function(rawProps) {
			var superSuccess = EventSource.prototype.applyManualRawProps.apply(this, arguments);
	
			this.setRawEventDefs(rawProps.events);
	
			return superSuccess;
		}
	
	});
	
	
	ArrayEventSource.allowRawProps({
		events: false // don't automatically transfer
	});
	
	
	ArrayEventSource.parse = function(rawInput, calendar) {
		var rawProps;
	
		// normalize raw input
		if ($.isArray(rawInput.events)) { // extended form
			rawProps = rawInput;
		}
		else if ($.isArray(rawInput)) { // short form
			rawProps = { events: rawInput };
		}
	
		if (rawProps) {
			return EventSource.parse.call(this, rawProps, calendar);
		}
	
		return false;
	};
	
	
	EventSourceParser.registerClass(ArrayEventSource);
	
	FC.ArrayEventSource = ArrayEventSource;
	
	;;
	
	var FuncEventSource = EventSource.extend({
	
		func: null,
	
	
		fetch: function(start, end, timezone) {
			var _this = this;
	
			this.calendar.pushLoading();
	
			return Promise.construct(function(onResolve) {
				_this.func.call(
					this.calendar,
					start.clone(),
					end.clone(),
					timezone,
					function(rawEventDefs) {
						_this.calendar.popLoading();
	
						onResolve(_this.parseEventDefs(rawEventDefs));
					}
				);
			});
		},
	
	
		getPrimitive: function() {
			return this.func;
		},
	
	
		applyManualRawProps: function(rawProps) {
			var superSuccess = EventSource.prototype.applyManualRawProps.apply(this, arguments);
	
			this.func = rawProps.events;
	
			return superSuccess;
		}
	
	});
	
	
	FuncEventSource.allowRawProps({
		events: false // don't automatically transfer
	});
	
	
	FuncEventSource.parse = function(rawInput, calendar) {
		var rawProps;
	
		// normalize raw input
		if ($.isFunction(rawInput.events)) { // extended form
			rawProps = rawInput;
		}
		else if ($.isFunction(rawInput)) { // short form
			rawProps = { events: rawInput };
		}
	
		if (rawProps) {
			return EventSource.parse.call(this, rawProps, calendar);
		}
	
		return false;
	};
	
	
	EventSourceParser.registerClass(FuncEventSource);
	
	FC.FuncEventSource = FuncEventSource;
	
	;;
	
	var JsonFeedEventSource = EventSource.extend({
	
		// these props must all be manually set before calling fetch
		startParam: null,
		endParam: null,
		timezoneParam: null,
		ajaxSettings: null,
	
	
		fetch: function(start, end, timezone) {
			var _this = this;
			var ajaxSettings = this.ajaxSettings;
			var onSuccess = ajaxSettings.success;
			var onError = ajaxSettings.error;
			var requestParams = this.buildRequestParams(start, end, timezone);
	
			// todo: eventually handle the promise's then,
			// don't intercept success/error
			// tho will be a breaking API change
	
			this.calendar.pushLoading();
	
			return Promise.construct(function(onResolve, onReject) {
				$.ajax($.extend(
					{}, // avoid mutation
					JsonFeedEventSource.AJAX_DEFAULTS,
					ajaxSettings, // should have a `url`
					{
						data: requestParams,
						success: function(rawEventDefs) {
							var callbackRes;
	
							_this.calendar.popLoading();
	
							if (rawEventDefs) {
								callbackRes = applyAll(onSuccess, this, arguments); // redirect `this`
	
								if ($.isArray(callbackRes)) {
									rawEventDefs = callbackRes;
								}
	
								onResolve(_this.parseEventDefs(rawEventDefs));
							}
							else {
								onReject();
							}
						},
						error: function() {
							_this.calendar.popLoading();
	
							applyAll(onError, this, arguments); // redirect `this`
							onReject();
						}
					}
				));
			});
		},
	
	
		buildRequestParams: function(start, end, timezone) {
			var calendar = this.calendar;
			var ajaxSettings = this.ajaxSettings;
			var startParam, endParam, timezoneParam;
			var customRequestParams;
			var params = {};
	
			startParam = this.startParam;
			if (startParam == null) {
				startParam = calendar.opt('startParam');
			}
	
			endParam = this.endParam;
			if (endParam == null) {
				endParam = calendar.opt('endParam');
			}
	
			timezoneParam = this.timezoneParam;
			if (timezoneParam == null) {
				timezoneParam = calendar.opt('timezoneParam');
			}
	
			// retrieve any outbound GET/POST $.ajax data from the options
			if ($.isFunction(ajaxSettings.data)) {
				// supplied as a function that returns a key/value object
				customRequestParams = ajaxSettings.data();
			}
			else {
				// probably supplied as a straight key/value object
				customRequestParams = ajaxSettings.data || {};
			}
	
			$.extend(params, customRequestParams);
	
			params[startParam] = start.format();
			params[endParam] = end.format();
	
			if (timezone && timezone !== 'local') {
				params[timezoneParam] = timezone;
			}
	
			return params;
		},
	
	
		getPrimitive: function() {
			return this.ajaxSettings.url;
		},
	
	
		applyOtherRawProps: function(rawProps) {
			EventSource.prototype.applyOtherRawProps.apply(this, arguments);
	
			this.ajaxSettings = rawProps;
		}
	
	});
	
	
	JsonFeedEventSource.AJAX_DEFAULTS = {
		dataType: 'json',
		cache: false
	};
	
	
	JsonFeedEventSource.allowRawProps({
		// automatically transfer (true)...
		startParam: true,
		endParam: true,
		timezoneParam: true
	});
	
	
	JsonFeedEventSource.parse = function(rawInput, calendar) {
		var rawProps;
	
		// normalize raw input
		if (typeof rawInput.url === 'string') { // extended form
			rawProps = rawInput;
		}
		else if (typeof rawInput === 'string') { // short form
			rawProps = { url: rawInput }; // will end up in ajaxSettings
		}
	
		if (rawProps) {
			return EventSource.parse.call(this, rawProps, calendar);
		}
	
		return false;
	};
	
	
	EventSourceParser.registerClass(JsonFeedEventSource);
	
	FC.JsonFeedEventSource = JsonFeedEventSource;
	
	;;
	
	var ThemeRegistry = FC.ThemeRegistry = {
	
		themeClassHash: {},
	
	
		register: function(themeName, themeClass) {
			this.themeClassHash[themeName] = themeClass;
		},
	
	
		getThemeClass: function(themeSetting) {
			if (!themeSetting) {
				return StandardTheme;
			}
			else if (themeSetting === true) {
				return JqueryUiTheme;
			}
			else {
				return this.themeClassHash[themeSetting];
			}
		}
	
	};
	
	;;
	
	var Theme = FC.Theme = Class.extend({
	
		classes: {},
		iconClasses: {},
		baseIconClass: '',
		iconOverrideOption: null,
		iconOverrideCustomButtonOption: null,
		iconOverridePrefix: '',
	
	
		constructor: function(optionsModel) {
			this.optionsModel = optionsModel;
			this.processIconOverride();
		},
	
	
		processIconOverride: function() {
			if (this.iconOverrideOption) {
				this.setIconOverride(
					this.optionsModel.get(this.iconOverrideOption)
				);
			}
		},
	
	
		setIconOverride: function(iconOverrideHash) {
			var iconClassesCopy;
			var buttonName;
	
			if ($.isPlainObject(iconOverrideHash)) {
				iconClassesCopy = $.extend({}, this.iconClasses);
	
				for (buttonName in iconOverrideHash) {
					iconClassesCopy[buttonName] = this.applyIconOverridePrefix(
						iconOverrideHash[buttonName]
					);
				}
	
				this.iconClasses = iconClassesCopy;
			}
			else if (iconOverrideHash === false) {
				this.iconClasses = {};
			}
		},
	
	
		applyIconOverridePrefix: function(className) {
			var prefix = this.iconOverridePrefix;
	
			if (prefix && className.indexOf(prefix) !== 0) { // if not already present
				className = prefix + className;
			}
	
			return className;
		},
	
	
		getClass: function(key) {
			return this.classes[key] || '';
		},
	
	
		getIconClass: function(buttonName) {
			var className = this.iconClasses[buttonName];
	
			if (className) {
				return this.baseIconClass + ' ' + className;
			}
	
			return '';
		},
	
	
		getCustomButtonIconClass: function(customButtonProps) {
			var className;
	
			if (this.iconOverrideCustomButtonOption) {
				className = customButtonProps[this.iconOverrideCustomButtonOption];
	
				if (className) {
					return this.baseIconClass + ' ' + this.applyIconOverridePrefix(className);
				}
			}
	
			return '';
		}
	
	});
	
	;;
	
	var StandardTheme = Theme.extend({
	
		classes: {
			widget: 'fc-unthemed',
			widgetHeader: 'fc-widget-header',
			widgetContent: 'fc-widget-content',
	
			buttonGroup: 'fc-button-group',
			button: 'fc-button',
			cornerLeft: 'fc-corner-left',
			cornerRight: 'fc-corner-right',
			stateDefault: 'fc-state-default',
			stateActive: 'fc-state-active',
			stateDisabled: 'fc-state-disabled',
			stateHover: 'fc-state-hover',
			stateDown: 'fc-state-down',
	
			popoverHeader: 'fc-widget-header',
			popoverContent: 'fc-widget-content',
	
			// day grid
			headerRow: 'fc-widget-header',
			dayRow: 'fc-widget-content',
	
			// list view
			listView: 'fc-widget-content'
		},
	
		baseIconClass: 'fc-icon',
		iconClasses: {
			close: 'fc-icon-x',
			prev: 'fc-icon-left-single-arrow',
			next: 'fc-icon-right-single-arrow',
			prevYear: 'fc-icon-left-double-arrow',
			nextYear: 'fc-icon-right-double-arrow'
		},
	
		iconOverrideOption: 'buttonIcons',
		iconOverrideCustomButtonOption: 'icon',
		iconOverridePrefix: 'fc-icon-'
	
	});
	
	ThemeRegistry.register('standard', StandardTheme);
	
	;;
	
	var JqueryUiTheme = Theme.extend({
	
		classes: {
			widget: 'ui-widget',
			widgetHeader: 'ui-widget-header',
			widgetContent: 'ui-widget-content',
	
			buttonGroup: 'fc-button-group',
			button: 'ui-button',
			cornerLeft: 'ui-corner-left',
			cornerRight: 'ui-corner-right',
			stateDefault: 'ui-state-default',
			stateActive: 'ui-state-active',
			stateDisabled: 'ui-state-disabled',
			stateHover: 'ui-state-hover',
			stateDown: 'ui-state-down',
	
			today: 'ui-state-highlight',
	
			popoverHeader: 'ui-widget-header',
			popoverContent: 'ui-widget-content',
	
			// day grid
			headerRow: 'ui-widget-header',
			dayRow: 'ui-widget-content',
	
			// list view
			listView: 'ui-widget-content'
		},
	
		baseIconClass: 'ui-icon',
		iconClasses: {
			close: 'ui-icon-closethick',
			prev: 'ui-icon-circle-triangle-w',
			next: 'ui-icon-circle-triangle-e',
			prevYear: 'ui-icon-seek-prev',
			nextYear: 'ui-icon-seek-next'
		},
	
		iconOverrideOption: 'themeButtonIcons',
		iconOverrideCustomButtonOption: 'themeIcon',
		iconOverridePrefix: 'ui-icon-'
	
	});
	
	ThemeRegistry.register('jquery-ui', JqueryUiTheme);
	
	;;
	
	var BootstrapTheme = Theme.extend({
	
		classes: {
			widget: 'fc-bootstrap3',
	
			tableGrid: 'table-bordered', // avoid `table` class b/c don't want margins. only border color
			tableList: 'table table-striped', // `table` class creates bottom margin but who cares
	
			buttonGroup: 'btn-group',
			button: 'btn btn-default',
			stateActive: 'active',
			stateDisabled: 'disabled',
	
			today: 'alert alert-info', // the plain `info` class requires `.table`, too much to ask
	
			popover: 'panel panel-default',
			popoverHeader: 'panel-heading',
			popoverContent: 'panel-body',
	
			// day grid
			headerRow: 'panel-default', // avoid `panel` class b/c don't want margins/radius. only border color
			dayRow: 'panel-default', // "
	
			// list view
			listView: 'panel panel-default'
		},
	
		baseIconClass: 'glyphicon',
		iconClasses: {
			close: 'glyphicon-remove',
			prev: 'glyphicon-chevron-left',
			next: 'glyphicon-chevron-right',
			prevYear: 'glyphicon-backward',
			nextYear: 'glyphicon-forward'
		},
	
		iconOverrideOption: 'bootstrapGlyphicons',
		iconOverrideCustomButtonOption: 'bootstrapGlyphicon',
		iconOverridePrefix: 'glyphicon-'
	
	});
	
	ThemeRegistry.register('bootstrap3', BootstrapTheme);
	
	;;
	
	/* An abstract class for the "basic" views, as well as month view. Renders one or more rows of day cells.
	----------------------------------------------------------------------------------------------------------------------*/
	// It is a manager for a DayGrid subcomponent, which does most of the heavy lifting.
	// It is responsible for managing width/height.
	
	var BasicView = FC.BasicView = View.extend({
	
		scroller: null,
	
		dayGridClass: DayGrid, // class the dayGrid will be instantiated from (overridable by subclasses)
		dayGrid: null, // the main subcomponent that does most of the heavy lifting
	
		dayNumbersVisible: false, // display day numbers on each day cell?
		colWeekNumbersVisible: false, // display week numbers along the side?
		cellWeekNumbersVisible: false, // display week numbers in day cell?
	
		weekNumberWidth: null, // width of all the week-number cells running down the side
	
		headContainerEl: null, // div that hold's the dayGrid's rendered date header
		headRowEl: null, // the fake row element of the day-of-week header
	
	
		initialize: function() {
			this.dayGrid = this.instantiateDayGrid();
			this.addChild(this.dayGrid);
	
			this.scroller = new Scroller({
				overflowX: 'hidden',
				overflowY: 'auto'
			});
		},
	
	
		// Generates the DayGrid object this view needs. Draws from this.dayGridClass
		instantiateDayGrid: function() {
			// generate a subclass on the fly with BasicView-specific behavior
			// TODO: cache this subclass
			var subclass = this.dayGridClass.extend(basicDayGridMethods);
	
			return new subclass(this);
		},
	
	
		// Computes the date range that will be rendered.
		buildRenderRange: function(currentUnzonedRange, currentRangeUnit) {
			var renderUnzonedRange = View.prototype.buildRenderRange.apply(this, arguments); // an UnzonedRange
			var start = this.calendar.msToUtcMoment(renderUnzonedRange.startMs, this.isRangeAllDay);
			var end = this.calendar.msToUtcMoment(renderUnzonedRange.endMs, this.isRangeAllDay);
	
			// year and month views should be aligned with weeks. this is already done for week
			if (/^(year|month)$/.test(currentRangeUnit)) {
				start.startOf('week');
	
				// make end-of-week if not already
				if (end.weekday()) {
					end.add(1, 'week').startOf('week'); // exclusively move backwards
				}
			}
	
			return this.trimHiddenDays(new UnzonedRange(start, end));
		},
	
	
		// Renders the view into `this.el`, which should already be assigned
		renderDates: function() {
	
			this.dayGrid.breakOnWeeks = /year|month|week/.test(this.currentRangeUnit); // do before Grid::setRange
			this.dayGrid.setRange(this.renderUnzonedRange);
	
			this.dayNumbersVisible = this.dayGrid.rowCnt > 1; // TODO: make grid responsible
			if (this.opt('weekNumbers')) {
				if (this.opt('weekNumbersWithinDays')) {
					this.cellWeekNumbersVisible = true;
					this.colWeekNumbersVisible = false;
				}
				else {
					this.cellWeekNumbersVisible = false;
					this.colWeekNumbersVisible = true;
				};
			}
			this.dayGrid.numbersVisible = this.dayNumbersVisible ||
				this.cellWeekNumbersVisible || this.colWeekNumbersVisible;
	
			this.el.addClass('fc-basic-view').html(this.renderSkeletonHtml());
			this.renderHead();
	
			this.scroller.render();
			var dayGridContainerEl = this.scroller.el.addClass('fc-day-grid-container');
			var dayGridEl = $('<div class="fc-day-grid" />').appendTo(dayGridContainerEl);
			this.el.find('.fc-body > tr > td').append(dayGridContainerEl);
	
			this.dayGrid.setElement(dayGridEl);
			this.dayGrid.renderDates(this.hasRigidRows());
		},
	
	
		// render the day-of-week headers
		renderHead: function() {
			this.headContainerEl =
				this.el.find('.fc-head-container')
					.html(this.dayGrid.renderHeadHtml());
			this.headRowEl = this.headContainerEl.find('.fc-row');
		},
	
	
		// Unrenders the content of the view. Since we haven't separated skeleton rendering from date rendering,
		// always completely kill the dayGrid's rendering.
		unrenderDates: function() {
			this.dayGrid.unrenderDates();
			this.dayGrid.removeElement();
			this.scroller.destroy();
		},
	
	
		// Builds the HTML skeleton for the view.
		// The day-grid component will render inside of a container defined by this HTML.
		renderSkeletonHtml: function() {
			var theme = this.calendar.theme;
	
			return '' +
				'<table class="' + theme.getClass('tableGrid') + '">' +
					'<thead class="fc-head">' +
						'<tr>' +
							'<td class="fc-head-container ' + theme.getClass('widgetHeader') + '"></td>' +
						'</tr>' +
					'</thead>' +
					'<tbody class="fc-body">' +
						'<tr>' +
							'<td class="' + theme.getClass('widgetContent') + '"></td>' +
						'</tr>' +
					'</tbody>' +
				'</table>';
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
			if (this.colWeekNumbersVisible) {
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
			var scrollbarWidths;
	
			// reset all heights to be natural
			this.scroller.clear();
			uncompensateScroll(this.headRowEl);
	
			this.dayGrid.removeSegPopover(); // kill the "more" popover if displayed
	
			// is the event limit a constant level number?
			if (eventLimit && typeof eventLimit === 'number') {
				this.dayGrid.limitRows(eventLimit); // limit the levels first so the height can redistribute after
			}
	
			// distribute the height to the rows
			// (totalHeight is a "recommended" value if isAuto)
			scrollerHeight = this.computeScrollerHeight(totalHeight);
			this.setGridHeight(scrollerHeight, isAuto);
	
			// is the event limit dynamically calculated?
			if (eventLimit && typeof eventLimit !== 'number') {
				this.dayGrid.limitRows(eventLimit); // limit the levels after the grid's row heights have been set
			}
	
			if (!isAuto) { // should we force dimensions of the scroll container?
	
				this.scroller.setHeight(scrollerHeight);
				scrollbarWidths = this.scroller.getScrollbarWidths();
	
				if (scrollbarWidths.left || scrollbarWidths.right) { // using scrollbars?
	
					compensateScroll(this.headRowEl, scrollbarWidths);
	
					// doing the scrollbar compensation might have created text overflow which created more height. redo
					scrollerHeight = this.computeScrollerHeight(totalHeight);
					this.scroller.setHeight(scrollerHeight);
				}
	
				// guarantees the same scrollbar widths
				this.scroller.lockOverflow(scrollbarWidths);
			}
		},
	
	
		// given a desired total height of the view, returns what the height of the scroller should be
		computeScrollerHeight: function(totalHeight) {
			return totalHeight -
				subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
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
	
	
		/* Scroll
		------------------------------------------------------------------------------------------------------------------*/
	
	
		computeInitialDateScroll: function() {
			return { top: 0 };
		},
	
	
		queryDateScroll: function() {
			return { top: this.scroller.getScrollTop() };
		},
	
	
		applyDateScroll: function(scroll) {
			if (scroll.top !== undefined) {
				this.scroller.setScrollTop(scroll.top);
			}
		},
	
	
		/* Events
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders the given events onto the view and populates the segments array
		renderEventsPayload: function(eventsPayload) {
			this.dayGrid.renderEventsPayload(eventsPayload);
	
			// must compensate for events that overflow the row
			// TODO: how will ChronoComponent handle this?
			this.updateHeight();
		}
	
	});
	
	
	// Methods that will customize the rendering behavior of the BasicView's dayGrid
	var basicDayGridMethods = {
	
	
		// Generates the HTML that will go before the day-of week header cells
		renderHeadIntroHtml: function() {
			var view = this.view;
	
			if (view.colWeekNumbersVisible) {
				return '' +
					'<th class="fc-week-number ' + view.calendar.theme.getClass('widgetHeader') + '" ' + view.weekNumberStyleAttr() + '>' +
						'<span>' + // needed for matchCellWidths
							htmlEscape(this.opt('weekNumberTitle')) +
						'</span>' +
					'</th>';
			}
	
			return '';
		},
	
	
		// Generates the HTML that will go before content-skeleton cells that display the day/week numbers
		renderNumberIntroHtml: function(row) {
			var view = this.view;
			var weekStart = this.getCellDate(row, 0);
	
			if (view.colWeekNumbersVisible) {
				return '' +
					'<td class="fc-week-number" ' + view.weekNumberStyleAttr() + '>' +
						view.buildGotoAnchorHtml( // aside from link, important for matchCellWidths
							{ date: weekStart, type: 'week', forceOff: this.colCnt === 1 },
							weekStart.format('w') // inner HTML
						) +
					'</td>';
			}
	
			return '';
		},
	
	
		// Generates the HTML that goes before the day bg cells for each day-row
		renderBgIntroHtml: function() {
			var view = this.view;
	
			if (view.colWeekNumbersVisible) {
				return '<td class="fc-week-number ' + view.calendar.theme.getClass('widgetContent') + '" ' +
					view.weekNumberStyleAttr() + '></td>';
			}
	
			return '';
		},
	
	
		// Generates the HTML that goes before every other type of row generated by DayGrid.
		// Affects helper-skeleton and highlight-skeleton rows.
		renderIntroHtml: function() {
			var view = this.view;
	
			if (view.colWeekNumbersVisible) {
				return '<td class="fc-week-number" ' + view.weekNumberStyleAttr() + '></td>';
			}
	
			return '';
		}
	
	};
	
	;;
	
	/* A month view with day cells running in rows (one-per-week) and columns
	----------------------------------------------------------------------------------------------------------------------*/
	
	var MonthView = FC.MonthView = BasicView.extend({
	
	
		// Computes the date range that will be rendered.
		buildRenderRange: function() {
			var renderUnzonedRange = BasicView.prototype.buildRenderRange.apply(this, arguments);
			var start = this.calendar.msToUtcMoment(renderUnzonedRange.startMs, this.isRangeAllDay);
			var end = this.calendar.msToUtcMoment(renderUnzonedRange.endMs, this.isRangeAllDay);
			var rowCnt;
	
			// ensure 6 weeks
			if (this.isFixedWeeks()) {
				rowCnt = Math.ceil( // could be partial weeks due to hiddenDays
					end.diff(start, 'weeks', true) // dontRound=true
				);
				end.add(6 - rowCnt, 'weeks');
			}
	
			return new UnzonedRange(start, end);
		},
	
	
		// Overrides the default BasicView behavior to have special multi-week auto-height logic
		setGridHeight: function(height, isAuto) {
	
			// if auto, make the height of each row the height that it would be if there were 6 weeks
			if (isAuto) {
				height *= this.rowCnt / 6;
			}
	
			distributeHeight(this.dayGrid.rowEls, height, !isAuto); // if auto, don't compensate for height-hogging rows
		},
	
	
		isFixedWeeks: function() {
			return this.opt('fixedWeekCount');
		},
	
	
		isDateInOtherMonth: function(date) {
			return date.month() !== moment.utc(this.currentUnzonedRange.startMs).month(); // TODO: optimize
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
	
	var AgendaView = FC.AgendaView = View.extend({
	
		scroller: null,
	
		timeGridClass: TimeGrid, // class used to instantiate the timeGrid. subclasses can override
		timeGrid: null, // the main time-grid subcomponent of this view
	
		dayGridClass: DayGrid, // class used to instantiate the dayGrid. subclasses can override
		dayGrid: null, // the "all-day" subcomponent. if all-day is turned off, this will be null
	
		axisWidth: null, // the width of the time axis running down the side
	
		headContainerEl: null, // div that hold's the timeGrid's rendered date header
		noScrollRowEls: null, // set of fake row elements that must compensate when scroller has scrollbars
	
		// when the time-grid isn't tall enough to occupy the given height, we render an <hr> underneath
		bottomRuleEl: null,
	
		// indicates that minTime/maxTime affects rendering
		usesMinMaxTime: true,
	
	
		initialize: function() {
			this.timeGrid = this.instantiateTimeGrid();
			this.addChild(this.timeGrid);
	
			if (this.opt('allDaySlot')) { // should we display the "all-day" area?
				this.dayGrid = this.instantiateDayGrid(); // the all-day subcomponent of this view
				this.addChild(this.dayGrid);
			}
	
			this.scroller = new Scroller({
				overflowX: 'hidden',
				overflowY: 'auto'
			});
		},
	
	
		// Instantiates the TimeGrid object this view needs. Draws from this.timeGridClass
		instantiateTimeGrid: function() {
			var subclass = this.timeGridClass.extend(agendaTimeGridMethods);
	
			return new subclass(this);
		},
	
	
		// Instantiates the DayGrid object this view might need. Draws from this.dayGridClass
		instantiateDayGrid: function() {
			var subclass = this.dayGridClass.extend(agendaDayGridMethods);
	
			return new subclass(this);
		},
	
	
		/* Rendering
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders the view into `this.el`, which has already been assigned
		renderDates: function() {
	
			this.timeGrid.setRange(this.renderUnzonedRange);
	
			if (this.dayGrid) {
				this.dayGrid.setRange(this.renderUnzonedRange);
			}
	
			this.el.addClass('fc-agenda-view').html(this.renderSkeletonHtml());
			this.renderHead();
	
			this.scroller.render();
			var timeGridWrapEl = this.scroller.el.addClass('fc-time-grid-container');
			var timeGridEl = $('<div class="fc-time-grid" />').appendTo(timeGridWrapEl);
			this.el.find('.fc-body > tr > td').append(timeGridWrapEl);
	
			this.timeGrid.setElement(timeGridEl);
			this.timeGrid.renderDates();
	
			// the <hr> that sometimes displays under the time-grid
			this.bottomRuleEl = $('<hr class="fc-divider ' + this.calendar.theme.getClass('widgetHeader') + '"/>')
				.appendTo(this.timeGrid.el); // inject it into the time-grid
	
			if (this.dayGrid) {
				this.dayGrid.setElement(this.el.find('.fc-day-grid'));
				this.dayGrid.renderDates();
	
				// have the day-grid extend it's coordinate area over the <hr> dividing the two grids
				this.dayGrid.bottomCoordPadding = this.dayGrid.el.next('hr').outerHeight();
			}
	
			this.noScrollRowEls = this.el.find('.fc-row:not(.fc-scroller *)'); // fake rows not within the scroller
		},
	
	
		// render the day-of-week headers
		renderHead: function() {
			this.headContainerEl =
				this.el.find('.fc-head-container')
					.html(this.timeGrid.renderHeadHtml());
		},
	
	
		// Unrenders the content of the view. Since we haven't separated skeleton rendering from date rendering,
		// always completely kill each grid's rendering.
		// TODO: move this over to ChronoComponent
		unrenderDates: function() {
			this.timeGrid.unrenderDates();
			this.timeGrid.removeElement();
	
			if (this.dayGrid) {
				this.dayGrid.unrenderDates();
				this.dayGrid.removeElement();
			}
	
			this.scroller.destroy();
		},
	
	
		// Builds the HTML skeleton for the view.
		// The day-grid and time-grid components will render inside containers defined by this HTML.
		renderSkeletonHtml: function() {
			var theme = this.calendar.theme;
	
			return '' +
				'<table class="' + theme.getClass('tableGrid') + '">' +
					'<thead class="fc-head">' +
						'<tr>' +
							'<td class="fc-head-container ' + theme.getClass('widgetHeader') + '"></td>' +
						'</tr>' +
					'</thead>' +
					'<tbody class="fc-body">' +
						'<tr>' +
							'<td class="' + theme.getClass('widgetContent') + '">' +
								(this.dayGrid ?
									'<div class="fc-day-grid"/>' +
									'<hr class="fc-divider ' + theme.getClass('widgetHeader') + '"/>' :
									''
									) +
							'</td>' +
						'</tr>' +
					'</tbody>' +
				'</table>';
		},
	
	
		// Generates an HTML attribute string for setting the width of the axis, if it is known
		axisStyleAttr: function() {
			if (this.axisWidth !== null) {
				 return 'style="width:' + this.axisWidth + 'px"';
			}
			return '';
		},
	
	
		/* Now Indicator
		------------------------------------------------------------------------------------------------------------------*/
	
	
		getNowIndicatorUnit: function() {
			return this.timeGrid.getNowIndicatorUnit();
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
			var scrollbarWidths;
	
			// reset all dimensions back to the original state
			this.bottomRuleEl.hide(); // .show() will be called later if this <hr> is necessary
			this.scroller.clear(); // sets height to 'auto' and clears overflow
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
	
			if (!isAuto) { // should we force dimensions of the scroll container?
	
				scrollerHeight = this.computeScrollerHeight(totalHeight);
				this.scroller.setHeight(scrollerHeight);
				scrollbarWidths = this.scroller.getScrollbarWidths();
	
				if (scrollbarWidths.left || scrollbarWidths.right) { // using scrollbars?
	
					// make the all-day and header rows lines up
					compensateScroll(this.noScrollRowEls, scrollbarWidths);
	
					// the scrollbar compensation might have changed text flow, which might affect height, so recalculate
					// and reapply the desired height to the scroller.
					scrollerHeight = this.computeScrollerHeight(totalHeight);
					this.scroller.setHeight(scrollerHeight);
				}
	
				// guarantees the same scrollbar widths
				this.scroller.lockOverflow(scrollbarWidths);
	
				// if there's any space below the slats, show the horizontal rule.
				// this won't cause any new overflow, because lockOverflow already called.
				if (this.timeGrid.getTotalSlatHeight() < scrollerHeight) {
					this.bottomRuleEl.show();
				}
			}
		},
	
	
		// given a desired total height of the view, returns what the height of the scroller should be
		computeScrollerHeight: function(totalHeight) {
			return totalHeight -
				subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
		},
	
	
		/* Scroll
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Computes the initial pre-configured scroll state prior to allowing the user to change it
		computeInitialDateScroll: function() {
			var scrollTime = moment.duration(this.opt('scrollTime'));
			var top = this.timeGrid.computeTimeTop(scrollTime);
	
			// zoom can give weird floating-point values. rather scroll a little bit further
			top = Math.ceil(top);
	
			if (top) {
				top++; // to overcome top border that slots beyond the first have. looks better
			}
	
			return { top: top };
		},
	
	
		queryDateScroll: function() {
			return { top: this.scroller.getScrollTop() };
		},
	
	
		applyDateScroll: function(scroll) {
			if (scroll.top !== undefined) {
				this.scroller.setScrollTop(scroll.top);
			}
		},
	
	
		/* Hit Areas
		------------------------------------------------------------------------------------------------------------------*/
		// forward all hit-related method calls to the grids (dayGrid might not be defined)
	
	
		getHitFootprint: function(hit) {
			// TODO: hit.component is set as a hack to identify where the hit came from
			return hit.component.getHitFootprint(hit);
		},
	
	
		getHitEl: function(hit) {
			// TODO: hit.component is set as a hack to identify where the hit came from
			return hit.component.getHitEl(hit);
		},
	
	
		/* Events
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders events onto the view and populates the View's segment array
		renderEventsPayload: function(eventsPayload) {
			var dayEventsPayload = {};
			var timedEventsPayload = {};
			var daySegs = [];
			var timedSegs;
			var id, eventInstanceGroup;
	
			// separate the events into all-day and timed
			for (id in eventsPayload) {
				eventInstanceGroup = eventsPayload[id];
	
				if (eventInstanceGroup.getEventDef().isAllDay()) {
					dayEventsPayload[id] = eventInstanceGroup;
				}
				else {
					timedEventsPayload[id] = eventInstanceGroup;
				}
			}
	
			// render the events in the subcomponents
			timedSegs = this.timeGrid.renderEventsPayload(timedEventsPayload);
			if (this.dayGrid) {
				daySegs = this.dayGrid.renderEventsPayload(dayEventsPayload);
			}
	
			// the all-day area is flexible and might have a lot of events, so shift the height
			// TODO: how will ChronoComponent handle this?
			this.updateHeight();
		},
	
	
		/* Dragging (for events and external elements)
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// A returned value of `true` signals that a mock "helper" event has been rendered.
		renderDrag: function(eventFootprints, seg) {
			if (eventFootprints.length) {
				if (!eventFootprints[0].componentFootprint.isAllDay) {
					return this.timeGrid.renderDrag(eventFootprints, seg);
				}
				else if (this.dayGrid) {
					return this.dayGrid.renderDrag(eventFootprints, seg);
				}
			}
		},
	
	
		/* Selection
		------------------------------------------------------------------------------------------------------------------*/
	
	
		// Renders a visual indication of a selection
		renderSelectionFootprint: function(componentFootprint) {
			if (!componentFootprint.isAllDay) {
				this.timeGrid.renderSelectionFootprint(componentFootprint);
			}
			else if (this.dayGrid) {
				this.dayGrid.renderSelectionFootprint(componentFootprint);
			}
		}
	
	});
	
	
	// Methods that will customize the rendering behavior of the AgendaView's timeGrid
	// TODO: move into TimeGrid
	var agendaTimeGridMethods = {
	
	
		// Generates the HTML that will go before the day-of week header cells
		renderHeadIntroHtml: function() {
			var view = this.view;
			var weekStart = view.calendar.msToUtcMoment(this.unzonedRange.startMs, true);
			var weekText;
	
			if (this.opt('weekNumbers')) {
				weekText = weekStart.format(this.opt('smallWeekFormat'));
	
				return '' +
					'<th class="fc-axis fc-week-number ' + view.calendar.theme.getClass('widgetHeader') + '" ' + view.axisStyleAttr() + '>' +
						view.buildGotoAnchorHtml( // aside from link, important for matchCellWidths
							{ date: weekStart, type: 'week', forceOff: this.colCnt > 1 },
							htmlEscape(weekText) // inner HTML
						) +
					'</th>';
			}
			else {
				return '<th class="fc-axis ' + view.calendar.theme.getClass('widgetHeader') + '" ' + view.axisStyleAttr() + '></th>';
			}
		},
	
	
		// Generates the HTML that goes before the bg of the TimeGrid slot area. Long vertical column.
		renderBgIntroHtml: function() {
			var view = this.view;
	
			return '<td class="fc-axis ' + view.calendar.theme.getClass('widgetContent') + '" ' + view.axisStyleAttr() + '></td>';
		},
	
	
		// Generates the HTML that goes before all other types of cells.
		// Affects content-skeleton, helper-skeleton, highlight-skeleton for both the time-grid and day-grid.
		renderIntroHtml: function() {
			var view = this.view;
	
			return '<td class="fc-axis" ' + view.axisStyleAttr() + '></td>';
		}
	
	};
	
	
	// Methods that will customize the rendering behavior of the AgendaView's dayGrid
	var agendaDayGridMethods = {
	
	
		// Generates the HTML that goes before the all-day cells
		renderBgIntroHtml: function() {
			var view = this.view;
	
			return '' +
				'<td class="fc-axis ' + view.calendar.theme.getClass('widgetContent') + '" ' + view.axisStyleAttr() + '>' +
					'<span>' + // needed for matchCellWidths
						view.getAllDayHtml() +
					'</span>' +
				'</td>';
		},
	
	
		// Generates the HTML that goes before all other types of cells.
		// Affects content-skeleton, helper-skeleton, highlight-skeleton for both the time-grid and day-grid.
		renderIntroHtml: function() {
			var view = this.view;
	
			return '<td class="fc-axis" ' + view.axisStyleAttr() + '></td>';
		}
	
	};
	
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
			slotDuration: '00:30:00',
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
	
	/*
	Responsible for the scroller, and forwarding event-related actions into the "grid"
	*/
	var ListView = View.extend({
	
		grid: null,
		scroller: null,
	
		initialize: function() {
			this.grid = new ListViewGrid(this);
			this.addChild(this.grid);
	
			this.scroller = new Scroller({
				overflowX: 'hidden',
				overflowY: 'auto'
			});
		},
	
		renderSkeleton: function() {
			this.el.addClass(
				'fc-list-view ' +
				this.calendar.theme.getClass('listView')
			);
	
			this.scroller.render();
			this.scroller.el.appendTo(this.el);
	
			this.grid.setElement(this.scroller.scrollEl);
		},
	
		unrenderSkeleton: function() {
			this.scroller.destroy(); // will remove the Grid too
		},
	
		setHeight: function(totalHeight, isAuto) {
			this.scroller.setHeight(this.computeScrollerHeight(totalHeight));
		},
	
		computeScrollerHeight: function(totalHeight) {
			return totalHeight -
				subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
		},
	
		renderDates: function() {
			this.grid.setRange(this.renderUnzonedRange); // needs to process range-related options
		},
	
		isEventDefResizable: function(eventDef) {
			return false;
		},
	
		isEventDefDraggable: function(eventDef) {
			return false;
		}
	
	});
	
	/*
	Responsible for event rendering and user-interaction.
	Its "el" is the inner-content of the above view's scroller.
	*/
	var ListViewGrid = Grid.extend({
	
		dayDates: null, // localized ambig-time moment array
		dayRanges: null, // UnzonedRange[], of start-end of each day
		segSelector: '.fc-list-item', // which elements accept event actions
		hasDayInteractions: false, // no day selection or day clicking
	
		rangeUpdated: function() {
			var calendar = this.view.calendar;
			var dayStart = calendar.msToUtcMoment(this.unzonedRange.startMs, true);
			var viewEnd = calendar.msToUtcMoment(this.unzonedRange.endMs, true);
			var dayDates = [];
			var dayRanges = [];
	
			while (dayStart < viewEnd) {
	
				dayDates.push(dayStart.clone());
	
				dayRanges.push(new UnzonedRange(
					dayStart,
					dayStart.clone().add(1, 'day')
				));
	
				dayStart.add(1, 'day');
			}
	
			this.dayDates = dayDates;
			this.dayRanges = dayRanges;
		},
	
		// slices by day
		componentFootprintToSegs: function(footprint) {
			var view = this.view;
			var dayRanges = this.dayRanges;
			var dayIndex;
			var segRange;
			var seg;
			var segs = [];
	
			for (dayIndex = 0; dayIndex < dayRanges.length; dayIndex++) {
				segRange = footprint.unzonedRange.intersect(dayRanges[dayIndex]);
	
				if (segRange) {
					seg = {
						startMs: segRange.startMs,
						endMs: segRange.endMs,
						isStart: segRange.isStart,
						isEnd: segRange.isEnd,
						dayIndex: dayIndex
					};
	
					segs.push(seg);
	
					// detect when footprint won't go fully into the next day,
					// and mutate the latest seg to the be the end.
					if (
						!seg.isEnd && !footprint.isAllDay &&
						footprint.unzonedRange.endMs < dayRanges[dayIndex + 1].startMs + view.nextDayThreshold
					) {
						seg.endMs = footprint.unzonedRange.endMs;
						seg.isEnd = true;
						break;
					}
				}
			}
	
			return segs;
		},
	
		// like "4:00am"
		computeEventTimeFormat: function() {
			return this.opt('mediumTimeFormat');
		},
	
		// for events with a url, the whole <tr> should be clickable,
		// but it's impossible to wrap with an <a> tag. simulate this.
		handleSegClick: function(seg, ev) {
			var url;
	
			Grid.prototype.handleSegClick.apply(this, arguments); // super. might prevent the default action
	
			// not clicking on or within an <a> with an href
			if (!$(ev.target).closest('a[href]').length) {
				url = seg.footprint.eventDef.url;
	
				if (url && !ev.isDefaultPrevented()) { // jsEvent not cancelled in handler
					window.location.href = url; // simulate link click
				}
			}
		},
	
		// returns list of foreground segs that were actually rendered
		renderFgSegs: function(segs) {
			segs = this.renderFgSegEls(segs); // might filter away hidden events
	
			if (!segs.length) {
				this.renderEmptyMessage();
			}
			else {
				this.renderSegList(segs);
			}
	
			return segs;
		},
	
		renderEmptyMessage: function() {
			this.el.html(
				'<div class="fc-list-empty-wrap2">' + // TODO: try less wraps
				'<div class="fc-list-empty-wrap1">' +
				'<div class="fc-list-empty">' +
					htmlEscape(this.opt('noEventsMessage')) +
				'</div>' +
				'</div>' +
				'</div>'
			);
		},
	
		// render the event segments in the view
		renderSegList: function(allSegs) {
			var segsByDay = this.groupSegsByDay(allSegs); // sparse array
			var dayIndex;
			var daySegs;
			var i;
			var tableEl = $('<table class="fc-list-table ' + this.view.calendar.theme.getClass('tableList') + '"><tbody/></table>');
			var tbodyEl = tableEl.find('tbody');
	
			for (dayIndex = 0; dayIndex < segsByDay.length; dayIndex++) {
				daySegs = segsByDay[dayIndex];
	
				if (daySegs) { // sparse array, so might be undefined
	
					// append a day header
					tbodyEl.append(this.dayHeaderHtml(this.dayDates[dayIndex]));
	
					this.sortEventSegs(daySegs);
	
					for (i = 0; i < daySegs.length; i++) {
						tbodyEl.append(daySegs[i].el); // append event row
					}
				}
			}
	
			this.el.empty().append(tableEl);
		},
	
		// Returns a sparse array of arrays, segs grouped by their dayIndex
		groupSegsByDay: function(segs) {
			var segsByDay = []; // sparse array
			var i, seg;
	
			for (i = 0; i < segs.length; i++) {
				seg = segs[i];
				(segsByDay[seg.dayIndex] || (segsByDay[seg.dayIndex] = []))
					.push(seg);
			}
	
			return segsByDay;
		},
	
		// generates the HTML for the day headers that live amongst the event rows
		dayHeaderHtml: function(dayDate) {
			var view = this.view;
			var mainFormat = this.opt('listDayFormat');
			var altFormat = this.opt('listDayAltFormat');
	
			return '<tr class="fc-list-heading" data-date="' + dayDate.format('YYYY-MM-DD') + '">' +
				'<td class="' + view.calendar.theme.getClass('widgetHeader') + '" colspan="3">' +
					(mainFormat ?
						view.buildGotoAnchorHtml(
							dayDate,
							{ 'class': 'fc-list-heading-main' },
							htmlEscape(dayDate.format(mainFormat)) // inner HTML
						) :
						'') +
					(altFormat ?
						view.buildGotoAnchorHtml(
							dayDate,
							{ 'class': 'fc-list-heading-alt' },
							htmlEscape(dayDate.format(altFormat)) // inner HTML
						) :
						'') +
				'</td>' +
			'</tr>';
		},
	
		// generates the HTML for a single event row
		fgSegHtml: function(seg) {
			var view = this.view;
			var calendar = view.calendar;
			var theme = calendar.theme;
			var classes = [ 'fc-list-item' ].concat(this.getSegCustomClasses(seg));
			var bgColor = this.getSegBackgroundColor(seg);
			var eventFootprint = seg.footprint;
			var eventDef = eventFootprint.eventDef;
			var componentFootprint = eventFootprint.componentFootprint;
			var url = eventDef.url;
			var timeHtml;
	
			if (componentFootprint.isAllDay) {
				timeHtml = view.getAllDayHtml();
			}
			// if the event appears to span more than one day
			else if (view.isMultiDayRange(componentFootprint.unzonedRange)) {
				if (seg.isStart || seg.isEnd) { // outer segment that probably lasts part of the day
					timeHtml = htmlEscape(this._getEventTimeText(
						calendar.msToMoment(seg.startMs),
						calendar.msToMoment(seg.endMs),
						componentFootprint.isAllDay
					));
				}
				else { // inner segment that lasts the whole day
					timeHtml = view.getAllDayHtml();
				}
			}
			else {
				// Display the normal time text for the *event's* times
				timeHtml = htmlEscape(this.getEventTimeText(eventFootprint));
			}
	
			if (url) {
				classes.push('fc-has-url');
			}
	
			return '<tr class="' + classes.join(' ') + '">' +
				(this.displayEventTime ?
					'<td class="fc-list-item-time ' + theme.getClass('widgetContent') + '">' +
						(timeHtml || '') +
					'</td>' :
					'') +
				'<td class="fc-list-item-marker ' + theme.getClass('widgetContent') + '">' +
					'<span class="fc-event-dot"' +
					(bgColor ?
						' style="background-color:' + bgColor + '"' :
						'') +
					'></span>' +
				'</td>' +
				'<td class="fc-list-item-title ' + theme.getClass('widgetContent') + '">' +
					'<a' + (url ? ' href="' + htmlEscape(url) + '"' : '') + '>' +
						htmlEscape(eventDef.title || '') +
					'</a>' +
				'</td>' +
			'</tr>';
		}
	
	});
	
	;;
	
	fcViews.list = {
		'class': ListView,
		buttonTextKey: 'list', // what to lookup in locale files
		defaults: {
			buttonText: 'list', // text to display for English
			listDayFormat: 'LL', // like "January 1, 2016"
			noEventsMessage: 'No events to display'
		}
	};
	
	fcViews.listDay = {
		type: 'list',
		duration: { days: 1 },
		defaults: {
			listDayFormat: 'dddd' // day-of-week is all we need. full date is probably in header
		}
	};
	
	fcViews.listWeek = {
		type: 'list',
		duration: { weeks: 1 },
		defaults: {
			listDayFormat: 'dddd', // day-of-week is more important
			listDayAltFormat: 'LL'
		}
	};
	
	fcViews.listMonth = {
		type: 'list',
		duration: { month: 1 },
		defaults: {
			listDayAltFormat: 'dddd' // day-of-week is nice-to-have
		}
	};
	
	fcViews.listYear = {
		type: 'list',
		duration: { year: 1 },
		defaults: {
			listDayAltFormat: 'dddd' // day-of-week is nice-to-have
		}
	};
	
	;;
	
	return FC; // export for Node/CommonJS
	});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
	//! version : 2.18.1
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com
	
	;(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    global.moment = factory()
	}(this, (function () { 'use strict';
	
	var hookCallback;
	
	function hooks () {
	    return hookCallback.apply(null, arguments);
	}
	
	// This is done to register the method called with moment()
	// without creating circular dependencies.
	function setHookCallback (callback) {
	    hookCallback = callback;
	}
	
	function isArray(input) {
	    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
	}
	
	function isObject(input) {
	    // IE8 will treat undefined and null as object if it wasn't for
	    // input != null
	    return input != null && Object.prototype.toString.call(input) === '[object Object]';
	}
	
	function isObjectEmpty(obj) {
	    var k;
	    for (k in obj) {
	        // even if its not own property I'd still call it non-empty
	        return false;
	    }
	    return true;
	}
	
	function isUndefined(input) {
	    return input === void 0;
	}
	
	function isNumber(input) {
	    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
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
	
	function createUTC (input, format, locale, strict) {
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
	        iso             : false,
	        parsedDateParts : [],
	        meridiem        : null,
	        rfc2822         : false,
	        weekdayMismatch : false
	    };
	}
	
	function getParsingFlags(m) {
	    if (m._pf == null) {
	        m._pf = defaultParsingFlags();
	    }
	    return m._pf;
	}
	
	var some;
	if (Array.prototype.some) {
	    some = Array.prototype.some;
	} else {
	    some = function (fun) {
	        var t = Object(this);
	        var len = t.length >>> 0;
	
	        for (var i = 0; i < len; i++) {
	            if (i in t && fun.call(this, t[i], i, t)) {
	                return true;
	            }
	        }
	
	        return false;
	    };
	}
	
	var some$1 = some;
	
	function isValid(m) {
	    if (m._isValid == null) {
	        var flags = getParsingFlags(m);
	        var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
	            return i != null;
	        });
	        var isNowValid = !isNaN(m._d.getTime()) &&
	            flags.overflow < 0 &&
	            !flags.empty &&
	            !flags.invalidMonth &&
	            !flags.invalidWeekday &&
	            !flags.nullInput &&
	            !flags.invalidFormat &&
	            !flags.userInvalidated &&
	            (!flags.meridiem || (flags.meridiem && parsedParts));
	
	        if (m._strict) {
	            isNowValid = isNowValid &&
	                flags.charsLeftOver === 0 &&
	                flags.unusedTokens.length === 0 &&
	                flags.bigHour === undefined;
	        }
	
	        if (Object.isFrozen == null || !Object.isFrozen(m)) {
	            m._isValid = isNowValid;
	        }
	        else {
	            return isNowValid;
	        }
	    }
	    return m._isValid;
	}
	
	function createInvalid (flags) {
	    var m = createUTC(NaN);
	    if (flags != null) {
	        extend(getParsingFlags(m), flags);
	    }
	    else {
	        getParsingFlags(m).userInvalidated = true;
	    }
	
	    return m;
	}
	
	// Plugins that add properties should also add the key here (null value),
	// so we can properly clone ourselves.
	var momentProperties = hooks.momentProperties = [];
	
	function copyConfig(to, from) {
	    var i, prop, val;
	
	    if (!isUndefined(from._isAMomentObject)) {
	        to._isAMomentObject = from._isAMomentObject;
	    }
	    if (!isUndefined(from._i)) {
	        to._i = from._i;
	    }
	    if (!isUndefined(from._f)) {
	        to._f = from._f;
	    }
	    if (!isUndefined(from._l)) {
	        to._l = from._l;
	    }
	    if (!isUndefined(from._strict)) {
	        to._strict = from._strict;
	    }
	    if (!isUndefined(from._tzm)) {
	        to._tzm = from._tzm;
	    }
	    if (!isUndefined(from._isUTC)) {
	        to._isUTC = from._isUTC;
	    }
	    if (!isUndefined(from._offset)) {
	        to._offset = from._offset;
	    }
	    if (!isUndefined(from._pf)) {
	        to._pf = getParsingFlags(from);
	    }
	    if (!isUndefined(from._locale)) {
	        to._locale = from._locale;
	    }
	
	    if (momentProperties.length > 0) {
	        for (i = 0; i < momentProperties.length; i++) {
	            prop = momentProperties[i];
	            val = from[prop];
	            if (!isUndefined(val)) {
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
	    if (!this.isValid()) {
	        this._d = new Date(NaN);
	    }
	    // Prevent infinite loop in case updateOffset creates new moment
	    // objects.
	    if (updateInProgress === false) {
	        updateInProgress = true;
	        hooks.updateOffset(this);
	        updateInProgress = false;
	    }
	}
	
	function isMoment (obj) {
	    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
	}
	
	function absFloor (number) {
	    if (number < 0) {
	        // -0 -> 0
	        return Math.ceil(number) || 0;
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
	
	// compare two arrays, return the number of differences
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
	
	function warn(msg) {
	    if (hooks.suppressDeprecationWarnings === false &&
	            (typeof console !==  'undefined') && console.warn) {
	        console.warn('Deprecation warning: ' + msg);
	    }
	}
	
	function deprecate(msg, fn) {
	    var firstTime = true;
	
	    return extend(function () {
	        if (hooks.deprecationHandler != null) {
	            hooks.deprecationHandler(null, msg);
	        }
	        if (firstTime) {
	            var args = [];
	            var arg;
	            for (var i = 0; i < arguments.length; i++) {
	                arg = '';
	                if (typeof arguments[i] === 'object') {
	                    arg += '\n[' + i + '] ';
	                    for (var key in arguments[0]) {
	                        arg += key + ': ' + arguments[0][key] + ', ';
	                    }
	                    arg = arg.slice(0, -2); // Remove trailing comma and space
	                } else {
	                    arg = arguments[i];
	                }
	                args.push(arg);
	            }
	            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
	            firstTime = false;
	        }
	        return fn.apply(this, arguments);
	    }, fn);
	}
	
	var deprecations = {};
	
	function deprecateSimple(name, msg) {
	    if (hooks.deprecationHandler != null) {
	        hooks.deprecationHandler(name, msg);
	    }
	    if (!deprecations[name]) {
	        warn(msg);
	        deprecations[name] = true;
	    }
	}
	
	hooks.suppressDeprecationWarnings = false;
	hooks.deprecationHandler = null;
	
	function isFunction(input) {
	    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	}
	
	function set (config) {
	    var prop, i;
	    for (i in config) {
	        prop = config[i];
	        if (isFunction(prop)) {
	            this[i] = prop;
	        } else {
	            this['_' + i] = prop;
	        }
	    }
	    this._config = config;
	    // Lenient ordinal parsing accepts just a number in addition to
	    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
	    // TODO: Remove "ordinalParse" fallback in next major release.
	    this._dayOfMonthOrdinalParseLenient = new RegExp(
	        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
	            '|' + (/\d{1,2}/).source);
	}
	
	function mergeConfigs(parentConfig, childConfig) {
	    var res = extend({}, parentConfig), prop;
	    for (prop in childConfig) {
	        if (hasOwnProp(childConfig, prop)) {
	            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
	                res[prop] = {};
	                extend(res[prop], parentConfig[prop]);
	                extend(res[prop], childConfig[prop]);
	            } else if (childConfig[prop] != null) {
	                res[prop] = childConfig[prop];
	            } else {
	                delete res[prop];
	            }
	        }
	    }
	    for (prop in parentConfig) {
	        if (hasOwnProp(parentConfig, prop) &&
	                !hasOwnProp(childConfig, prop) &&
	                isObject(parentConfig[prop])) {
	            // make sure changes to properties don't modify parent config
	            res[prop] = extend({}, res[prop]);
	        }
	    }
	    return res;
	}
	
	function Locale(config) {
	    if (config != null) {
	        this.set(config);
	    }
	}
	
	var keys;
	
	if (Object.keys) {
	    keys = Object.keys;
	} else {
	    keys = function (obj) {
	        var i, res = [];
	        for (i in obj) {
	            if (hasOwnProp(obj, i)) {
	                res.push(i);
	            }
	        }
	        return res;
	    };
	}
	
	var keys$1 = keys;
	
	var defaultCalendar = {
	    sameDay : '[Today at] LT',
	    nextDay : '[Tomorrow at] LT',
	    nextWeek : 'dddd [at] LT',
	    lastDay : '[Yesterday at] LT',
	    lastWeek : '[Last] dddd [at] LT',
	    sameElse : 'L'
	};
	
	function calendar (key, mom, now) {
	    var output = this._calendar[key] || this._calendar['sameElse'];
	    return isFunction(output) ? output.call(mom, now) : output;
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
	var defaultDayOfMonthOrdinalParse = /\d{1,2}/;
	
	function ordinal (number) {
	    return this._ordinal.replace('%d', number);
	}
	
	var defaultRelativeTime = {
	    future : 'in %s',
	    past   : '%s ago',
	    s  : 'a few seconds',
	    ss : '%d seconds',
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
	
	function relativeTime (number, withoutSuffix, string, isFuture) {
	    var output = this._relativeTime[string];
	    return (isFunction(output)) ?
	        output(number, withoutSuffix, string, isFuture) :
	        output.replace(/%d/i, number);
	}
	
	function pastFuture (diff, output) {
	    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
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
	
	var priorities = {};
	
	function addUnitPriority(unit, priority) {
	    priorities[unit] = priority;
	}
	
	function getPrioritizedUnits(unitsObj) {
	    var units = [];
	    for (var u in unitsObj) {
	        units.push({unit: u, priority: priorities[u]});
	    }
	    units.sort(function (a, b) {
	        return a.priority - b.priority;
	    });
	    return units;
	}
	
	function makeGetSet (unit, keepTime) {
	    return function (value) {
	        if (value != null) {
	            set$1(this, unit, value);
	            hooks.updateOffset(this, keepTime);
	            return this;
	        } else {
	            return get(this, unit);
	        }
	    };
	}
	
	function get (mom, unit) {
	    return mom.isValid() ?
	        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
	}
	
	function set$1 (mom, unit, value) {
	    if (mom.isValid()) {
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	    }
	}
	
	// MOMENTS
	
	function stringGet (units) {
	    units = normalizeUnits(units);
	    if (isFunction(this[units])) {
	        return this[units]();
	    }
	    return this;
	}
	
	
	function stringSet (units, value) {
	    if (typeof units === 'object') {
	        units = normalizeObjectUnits(units);
	        var prioritized = getPrioritizedUnits(units);
	        for (var i = 0; i < prioritized.length; i++) {
	            this[prioritized[i].unit](units[prioritized[i].unit]);
	        }
	    } else {
	        units = normalizeUnits(units);
	        if (isFunction(this[units])) {
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
	
	var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
	
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
	        var output = '', i;
	        for (i = 0; i < length; i++) {
	            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
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
	var match3to4      = /\d\d\d\d?/;     //     999 - 9999
	var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
	var match1to3      = /\d{1,3}/;       //       0 - 999
	var match1to4      = /\d{1,4}/;       //       0 - 9999
	var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999
	
	var matchUnsigned  = /\d+/;           //       0 - inf
	var matchSigned    = /[+-]?\d+/;      //    -inf - inf
	
	var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
	var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z
	
	var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
	
	// any word (or two) characters or numbers including two/three word month in arabic.
	// includes scottish gaelic two word and hyphenated months
	var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
	
	
	var regexes = {};
	
	function addRegexToken (token, regex, strictRegex) {
	    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
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
	    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	        return p1 || p2 || p3 || p4;
	    }));
	}
	
	function regexEscape(s) {
	    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}
	
	var tokens = {};
	
	function addParseToken (token, callback) {
	    var i, func = callback;
	    if (typeof token === 'string') {
	        token = [token];
	    }
	    if (isNumber(callback)) {
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
	var WEEK = 7;
	var WEEKDAY = 8;
	
	var indexOf;
	
	if (Array.prototype.indexOf) {
	    indexOf = Array.prototype.indexOf;
	} else {
	    indexOf = function (o) {
	        // I know
	        var i;
	        for (i = 0; i < this.length; ++i) {
	            if (this[i] === o) {
	                return i;
	            }
	        }
	        return -1;
	    };
	}
	
	var indexOf$1 = indexOf;
	
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
	
	// PRIORITY
	
	addUnitPriority('month', 8);
	
	// PARSING
	
	addRegexToken('M',    match1to2);
	addRegexToken('MM',   match1to2, match2);
	addRegexToken('MMM',  function (isStrict, locale) {
	    return locale.monthsShortRegex(isStrict);
	});
	addRegexToken('MMMM', function (isStrict, locale) {
	    return locale.monthsRegex(isStrict);
	});
	
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
	
	var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
	var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	function localeMonths (m, format) {
	    if (!m) {
	        return isArray(this._months) ? this._months :
	            this._months['standalone'];
	    }
	    return isArray(this._months) ? this._months[m.month()] :
	        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
	}
	
	var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	function localeMonthsShort (m, format) {
	    if (!m) {
	        return isArray(this._monthsShort) ? this._monthsShort :
	            this._monthsShort['standalone'];
	    }
	    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
	        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	}
	
	function handleStrictParse(monthName, format, strict) {
	    var i, ii, mom, llc = monthName.toLocaleLowerCase();
	    if (!this._monthsParse) {
	        // this is not used
	        this._monthsParse = [];
	        this._longMonthsParse = [];
	        this._shortMonthsParse = [];
	        for (i = 0; i < 12; ++i) {
	            mom = createUTC([2000, i]);
	            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
	            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
	        }
	    }
	
	    if (strict) {
	        if (format === 'MMM') {
	            ii = indexOf$1.call(this._shortMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._longMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    } else {
	        if (format === 'MMM') {
	            ii = indexOf$1.call(this._shortMonthsParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._longMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._longMonthsParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._shortMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    }
	}
	
	function localeMonthsParse (monthName, format, strict) {
	    var i, mom, regex;
	
	    if (this._monthsParseExact) {
	        return handleStrictParse.call(this, monthName, format, strict);
	    }
	
	    if (!this._monthsParse) {
	        this._monthsParse = [];
	        this._longMonthsParse = [];
	        this._shortMonthsParse = [];
	    }
	
	    // TODO: add sorting
	    // Sorting makes sure if one month (or abbr) is a prefix of another
	    // see sorting in computeMonthsParse
	    for (i = 0; i < 12; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, i]);
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
	
	    if (!mom.isValid()) {
	        // No op
	        return mom;
	    }
	
	    if (typeof value === 'string') {
	        if (/^\d+$/.test(value)) {
	            value = toInt(value);
	        } else {
	            value = mom.localeData().monthsParse(value);
	            // TODO: Another silent failure?
	            if (!isNumber(value)) {
	                return mom;
	            }
	        }
	    }
	
	    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	    return mom;
	}
	
	function getSetMonth (value) {
	    if (value != null) {
	        setMonth(this, value);
	        hooks.updateOffset(this, true);
	        return this;
	    } else {
	        return get(this, 'Month');
	    }
	}
	
	function getDaysInMonth () {
	    return daysInMonth(this.year(), this.month());
	}
	
	var defaultMonthsShortRegex = matchWord;
	function monthsShortRegex (isStrict) {
	    if (this._monthsParseExact) {
	        if (!hasOwnProp(this, '_monthsRegex')) {
	            computeMonthsParse.call(this);
	        }
	        if (isStrict) {
	            return this._monthsShortStrictRegex;
	        } else {
	            return this._monthsShortRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_monthsShortRegex')) {
	            this._monthsShortRegex = defaultMonthsShortRegex;
	        }
	        return this._monthsShortStrictRegex && isStrict ?
	            this._monthsShortStrictRegex : this._monthsShortRegex;
	    }
	}
	
	var defaultMonthsRegex = matchWord;
	function monthsRegex (isStrict) {
	    if (this._monthsParseExact) {
	        if (!hasOwnProp(this, '_monthsRegex')) {
	            computeMonthsParse.call(this);
	        }
	        if (isStrict) {
	            return this._monthsStrictRegex;
	        } else {
	            return this._monthsRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_monthsRegex')) {
	            this._monthsRegex = defaultMonthsRegex;
	        }
	        return this._monthsStrictRegex && isStrict ?
	            this._monthsStrictRegex : this._monthsRegex;
	    }
	}
	
	function computeMonthsParse () {
	    function cmpLenRev(a, b) {
	        return b.length - a.length;
	    }
	
	    var shortPieces = [], longPieces = [], mixedPieces = [],
	        i, mom;
	    for (i = 0; i < 12; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, i]);
	        shortPieces.push(this.monthsShort(mom, ''));
	        longPieces.push(this.months(mom, ''));
	        mixedPieces.push(this.months(mom, ''));
	        mixedPieces.push(this.monthsShort(mom, ''));
	    }
	    // Sorting makes sure if one month (or abbr) is a prefix of another it
	    // will match the longer piece.
	    shortPieces.sort(cmpLenRev);
	    longPieces.sort(cmpLenRev);
	    mixedPieces.sort(cmpLenRev);
	    for (i = 0; i < 12; i++) {
	        shortPieces[i] = regexEscape(shortPieces[i]);
	        longPieces[i] = regexEscape(longPieces[i]);
	    }
	    for (i = 0; i < 24; i++) {
	        mixedPieces[i] = regexEscape(mixedPieces[i]);
	    }
	
	    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	    this._monthsShortRegex = this._monthsRegex;
	    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	}
	
	// FORMATTING
	
	addFormatToken('Y', 0, 0, function () {
	    var y = this.year();
	    return y <= 9999 ? '' + y : '+' + y;
	});
	
	addFormatToken(0, ['YY', 2], 0, function () {
	    return this.year() % 100;
	});
	
	addFormatToken(0, ['YYYY',   4],       0, 'year');
	addFormatToken(0, ['YYYYY',  5],       0, 'year');
	addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');
	
	// ALIASES
	
	addUnitAlias('year', 'y');
	
	// PRIORITIES
	
	addUnitPriority('year', 1);
	
	// PARSING
	
	addRegexToken('Y',      matchSigned);
	addRegexToken('YY',     match1to2, match2);
	addRegexToken('YYYY',   match1to4, match4);
	addRegexToken('YYYYY',  match1to6, match6);
	addRegexToken('YYYYYY', match1to6, match6);
	
	addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	addParseToken('YYYY', function (input, array) {
	    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
	});
	addParseToken('YY', function (input, array) {
	    array[YEAR] = hooks.parseTwoDigitYear(input);
	});
	addParseToken('Y', function (input, array) {
	    array[YEAR] = parseInt(input, 10);
	});
	
	// HELPERS
	
	function daysInYear(year) {
	    return isLeapYear(year) ? 366 : 365;
	}
	
	function isLeapYear(year) {
	    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	}
	
	// HOOKS
	
	hooks.parseTwoDigitYear = function (input) {
	    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	};
	
	// MOMENTS
	
	var getSetYear = makeGetSet('FullYear', true);
	
	function getIsLeapYear () {
	    return isLeapYear(this.year());
	}
	
	function createDate (y, m, d, h, M, s, ms) {
	    // can't just apply() to create a date:
	    // https://stackoverflow.com/q/181348
	    var date = new Date(y, m, d, h, M, s, ms);
	
	    // the date constructor remaps years 0-99 to 1900-1999
	    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
	        date.setFullYear(y);
	    }
	    return date;
	}
	
	function createUTCDate (y) {
	    var date = new Date(Date.UTC.apply(null, arguments));
	
	    // the Date.UTC function remaps years 0-99 to 1900-1999
	    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
	        date.setUTCFullYear(y);
	    }
	    return date;
	}
	
	// start-of-first-week - start-of-year
	function firstWeekOffset(year, dow, doy) {
	    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
	        fwd = 7 + dow - doy,
	        // first-week day local weekday -- which local weekday is fwd
	        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
	
	    return -fwdlw + fwd - 1;
	}
	
	// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
	    var localWeekday = (7 + weekday - dow) % 7,
	        weekOffset = firstWeekOffset(year, dow, doy),
	        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
	        resYear, resDayOfYear;
	
	    if (dayOfYear <= 0) {
	        resYear = year - 1;
	        resDayOfYear = daysInYear(resYear) + dayOfYear;
	    } else if (dayOfYear > daysInYear(year)) {
	        resYear = year + 1;
	        resDayOfYear = dayOfYear - daysInYear(year);
	    } else {
	        resYear = year;
	        resDayOfYear = dayOfYear;
	    }
	
	    return {
	        year: resYear,
	        dayOfYear: resDayOfYear
	    };
	}
	
	function weekOfYear(mom, dow, doy) {
	    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
	        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
	        resWeek, resYear;
	
	    if (week < 1) {
	        resYear = mom.year() - 1;
	        resWeek = week + weeksInYear(resYear, dow, doy);
	    } else if (week > weeksInYear(mom.year(), dow, doy)) {
	        resWeek = week - weeksInYear(mom.year(), dow, doy);
	        resYear = mom.year() + 1;
	    } else {
	        resYear = mom.year();
	        resWeek = week;
	    }
	
	    return {
	        week: resWeek,
	        year: resYear
	    };
	}
	
	function weeksInYear(year, dow, doy) {
	    var weekOffset = firstWeekOffset(year, dow, doy),
	        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
	    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
	}
	
	// FORMATTING
	
	addFormatToken('w', ['ww', 2], 'wo', 'week');
	addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');
	
	// ALIASES
	
	addUnitAlias('week', 'w');
	addUnitAlias('isoWeek', 'W');
	
	// PRIORITIES
	
	addUnitPriority('week', 5);
	addUnitPriority('isoWeek', 5);
	
	// PARSING
	
	addRegexToken('w',  match1to2);
	addRegexToken('ww', match1to2, match2);
	addRegexToken('W',  match1to2);
	addRegexToken('WW', match1to2, match2);
	
	addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	    week[token.substr(0, 1)] = toInt(input);
	});
	
	// HELPERS
	
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
	
	// FORMATTING
	
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
	
	// PRIORITY
	addUnitPriority('day', 11);
	addUnitPriority('weekday', 11);
	addUnitPriority('isoWeekday', 11);
	
	// PARSING
	
	addRegexToken('d',    match1to2);
	addRegexToken('e',    match1to2);
	addRegexToken('E',    match1to2);
	addRegexToken('dd',   function (isStrict, locale) {
	    return locale.weekdaysMinRegex(isStrict);
	});
	addRegexToken('ddd',   function (isStrict, locale) {
	    return locale.weekdaysShortRegex(isStrict);
	});
	addRegexToken('dddd',   function (isStrict, locale) {
	    return locale.weekdaysRegex(isStrict);
	});
	
	addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
	    var weekday = config._locale.weekdaysParse(input, token, config._strict);
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
	
	function parseIsoWeekday(input, locale) {
	    if (typeof input === 'string') {
	        return locale.weekdaysParse(input) % 7 || 7;
	    }
	    return isNaN(input) ? null : input;
	}
	
	// LOCALES
	
	var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	function localeWeekdays (m, format) {
	    if (!m) {
	        return isArray(this._weekdays) ? this._weekdays :
	            this._weekdays['standalone'];
	    }
	    return isArray(this._weekdays) ? this._weekdays[m.day()] :
	        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
	}
	
	var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	function localeWeekdaysShort (m) {
	    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
	}
	
	var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	function localeWeekdaysMin (m) {
	    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
	}
	
	function handleStrictParse$1(weekdayName, format, strict) {
	    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
	    if (!this._weekdaysParse) {
	        this._weekdaysParse = [];
	        this._shortWeekdaysParse = [];
	        this._minWeekdaysParse = [];
	
	        for (i = 0; i < 7; ++i) {
	            mom = createUTC([2000, 1]).day(i);
	            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
	            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
	            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
	        }
	    }
	
	    if (strict) {
	        if (format === 'dddd') {
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else if (format === 'ddd') {
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    } else {
	        if (format === 'dddd') {
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else if (format === 'ddd') {
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    }
	}
	
	function localeWeekdaysParse (weekdayName, format, strict) {
	    var i, mom, regex;
	
	    if (this._weekdaysParseExact) {
	        return handleStrictParse$1.call(this, weekdayName, format, strict);
	    }
	
	    if (!this._weekdaysParse) {
	        this._weekdaysParse = [];
	        this._minWeekdaysParse = [];
	        this._shortWeekdaysParse = [];
	        this._fullWeekdaysParse = [];
	    }
	
	    for (i = 0; i < 7; i++) {
	        // make the regex if we don't have it already
	
	        mom = createUTC([2000, 1]).day(i);
	        if (strict && !this._fullWeekdaysParse[i]) {
	            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
	            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
	            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
	        }
	        if (!this._weekdaysParse[i]) {
	            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	        }
	        // test the regex
	        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
	            return i;
	        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
	            return i;
	        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
	            return i;
	        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
	            return i;
	        }
	    }
	}
	
	// MOMENTS
	
	function getSetDayOfWeek (input) {
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }
	    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	    if (input != null) {
	        input = parseWeekday(input, this.localeData());
	        return this.add(input - day, 'd');
	    } else {
	        return day;
	    }
	}
	
	function getSetLocaleDayOfWeek (input) {
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }
	    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	    return input == null ? weekday : this.add(input - weekday, 'd');
	}
	
	function getSetISODayOfWeek (input) {
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }
	
	    // behaves the same as moment#day except
	    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	    // as a setter, sunday should belong to the previous week.
	
	    if (input != null) {
	        var weekday = parseIsoWeekday(input, this.localeData());
	        return this.day(this.day() % 7 ? weekday : weekday - 7);
	    } else {
	        return this.day() || 7;
	    }
	}
	
	var defaultWeekdaysRegex = matchWord;
	function weekdaysRegex (isStrict) {
	    if (this._weekdaysParseExact) {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            computeWeekdaysParse.call(this);
	        }
	        if (isStrict) {
	            return this._weekdaysStrictRegex;
	        } else {
	            return this._weekdaysRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            this._weekdaysRegex = defaultWeekdaysRegex;
	        }
	        return this._weekdaysStrictRegex && isStrict ?
	            this._weekdaysStrictRegex : this._weekdaysRegex;
	    }
	}
	
	var defaultWeekdaysShortRegex = matchWord;
	function weekdaysShortRegex (isStrict) {
	    if (this._weekdaysParseExact) {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            computeWeekdaysParse.call(this);
	        }
	        if (isStrict) {
	            return this._weekdaysShortStrictRegex;
	        } else {
	            return this._weekdaysShortRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
	            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
	        }
	        return this._weekdaysShortStrictRegex && isStrict ?
	            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
	    }
	}
	
	var defaultWeekdaysMinRegex = matchWord;
	function weekdaysMinRegex (isStrict) {
	    if (this._weekdaysParseExact) {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            computeWeekdaysParse.call(this);
	        }
	        if (isStrict) {
	            return this._weekdaysMinStrictRegex;
	        } else {
	            return this._weekdaysMinRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
	            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
	        }
	        return this._weekdaysMinStrictRegex && isStrict ?
	            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
	    }
	}
	
	
	function computeWeekdaysParse () {
	    function cmpLenRev(a, b) {
	        return b.length - a.length;
	    }
	
	    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
	        i, mom, minp, shortp, longp;
	    for (i = 0; i < 7; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, 1]).day(i);
	        minp = this.weekdaysMin(mom, '');
	        shortp = this.weekdaysShort(mom, '');
	        longp = this.weekdays(mom, '');
	        minPieces.push(minp);
	        shortPieces.push(shortp);
	        longPieces.push(longp);
	        mixedPieces.push(minp);
	        mixedPieces.push(shortp);
	        mixedPieces.push(longp);
	    }
	    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
	    // will match the longer piece.
	    minPieces.sort(cmpLenRev);
	    shortPieces.sort(cmpLenRev);
	    longPieces.sort(cmpLenRev);
	    mixedPieces.sort(cmpLenRev);
	    for (i = 0; i < 7; i++) {
	        shortPieces[i] = regexEscape(shortPieces[i]);
	        longPieces[i] = regexEscape(longPieces[i]);
	        mixedPieces[i] = regexEscape(mixedPieces[i]);
	    }
	
	    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	    this._weekdaysShortRegex = this._weekdaysRegex;
	    this._weekdaysMinRegex = this._weekdaysRegex;
	
	    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
	}
	
	// FORMATTING
	
	function hFormat() {
	    return this.hours() % 12 || 12;
	}
	
	function kFormat() {
	    return this.hours() || 24;
	}
	
	addFormatToken('H', ['HH', 2], 0, 'hour');
	addFormatToken('h', ['hh', 2], 0, hFormat);
	addFormatToken('k', ['kk', 2], 0, kFormat);
	
	addFormatToken('hmm', 0, 0, function () {
	    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
	});
	
	addFormatToken('hmmss', 0, 0, function () {
	    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
	        zeroFill(this.seconds(), 2);
	});
	
	addFormatToken('Hmm', 0, 0, function () {
	    return '' + this.hours() + zeroFill(this.minutes(), 2);
	});
	
	addFormatToken('Hmmss', 0, 0, function () {
	    return '' + this.hours() + zeroFill(this.minutes(), 2) +
	        zeroFill(this.seconds(), 2);
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
	
	// PRIORITY
	addUnitPriority('hour', 13);
	
	// PARSING
	
	function matchMeridiem (isStrict, locale) {
	    return locale._meridiemParse;
	}
	
	addRegexToken('a',  matchMeridiem);
	addRegexToken('A',  matchMeridiem);
	addRegexToken('H',  match1to2);
	addRegexToken('h',  match1to2);
	addRegexToken('k',  match1to2);
	addRegexToken('HH', match1to2, match2);
	addRegexToken('hh', match1to2, match2);
	addRegexToken('kk', match1to2, match2);
	
	addRegexToken('hmm', match3to4);
	addRegexToken('hmmss', match5to6);
	addRegexToken('Hmm', match3to4);
	addRegexToken('Hmmss', match5to6);
	
	addParseToken(['H', 'HH'], HOUR);
	addParseToken(['k', 'kk'], function (input, array, config) {
	    var kInput = toInt(input);
	    array[HOUR] = kInput === 24 ? 0 : kInput;
	});
	addParseToken(['a', 'A'], function (input, array, config) {
	    config._isPm = config._locale.isPM(input);
	    config._meridiem = input;
	});
	addParseToken(['h', 'hh'], function (input, array, config) {
	    array[HOUR] = toInt(input);
	    getParsingFlags(config).bigHour = true;
	});
	addParseToken('hmm', function (input, array, config) {
	    var pos = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos));
	    array[MINUTE] = toInt(input.substr(pos));
	    getParsingFlags(config).bigHour = true;
	});
	addParseToken('hmmss', function (input, array, config) {
	    var pos1 = input.length - 4;
	    var pos2 = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos1));
	    array[MINUTE] = toInt(input.substr(pos1, 2));
	    array[SECOND] = toInt(input.substr(pos2));
	    getParsingFlags(config).bigHour = true;
	});
	addParseToken('Hmm', function (input, array, config) {
	    var pos = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos));
	    array[MINUTE] = toInt(input.substr(pos));
	});
	addParseToken('Hmmss', function (input, array, config) {
	    var pos1 = input.length - 4;
	    var pos2 = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos1));
	    array[MINUTE] = toInt(input.substr(pos1, 2));
	    array[SECOND] = toInt(input.substr(pos2));
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
	
	// months
	// week
	// weekdays
	// meridiem
	var baseConfig = {
	    calendar: defaultCalendar,
	    longDateFormat: defaultLongDateFormat,
	    invalidDate: defaultInvalidDate,
	    ordinal: defaultOrdinal,
	    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
	    relativeTime: defaultRelativeTime,
	
	    months: defaultLocaleMonths,
	    monthsShort: defaultLocaleMonthsShort,
	
	    week: defaultLocaleWeek,
	
	    weekdays: defaultLocaleWeekdays,
	    weekdaysMin: defaultLocaleWeekdaysMin,
	    weekdaysShort: defaultLocaleWeekdaysShort,
	
	    meridiemParse: defaultLocaleMeridiemParse
	};
	
	// internal storage for locale config files
	var locales = {};
	var localeFamilies = {};
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
	    if (!locales[name] && (typeof module !== 'undefined') &&
	            module && module.exports) {
	        try {
	            oldLocale = globalLocale._abbr;
	            __webpack_require__(33)("./" + name);
	            // because defineLocale currently also sets the global locale, we
	            // want to undo that for lazy loaded locales
	            getSetGlobalLocale(oldLocale);
	        } catch (e) { }
	    }
	    return locales[name];
	}
	
	// This function will load locale and then set the global locale.  If
	// no arguments are passed in, it will simply return the current global
	// locale key.
	function getSetGlobalLocale (key, values) {
	    var data;
	    if (key) {
	        if (isUndefined(values)) {
	            data = getLocale(key);
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
	
	function defineLocale (name, config) {
	    if (config !== null) {
	        var parentConfig = baseConfig;
	        config.abbr = name;
	        if (locales[name] != null) {
	            deprecateSimple('defineLocaleOverride',
	                    'use moment.updateLocale(localeName, config) to change ' +
	                    'an existing locale. moment.defineLocale(localeName, ' +
	                    'config) should only be used for creating a new locale ' +
	                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
	            parentConfig = locales[name]._config;
	        } else if (config.parentLocale != null) {
	            if (locales[config.parentLocale] != null) {
	                parentConfig = locales[config.parentLocale]._config;
	            } else {
	                if (!localeFamilies[config.parentLocale]) {
	                    localeFamilies[config.parentLocale] = [];
	                }
	                localeFamilies[config.parentLocale].push({
	                    name: name,
	                    config: config
	                });
	                return null;
	            }
	        }
	        locales[name] = new Locale(mergeConfigs(parentConfig, config));
	
	        if (localeFamilies[name]) {
	            localeFamilies[name].forEach(function (x) {
	                defineLocale(x.name, x.config);
	            });
	        }
	
	        // backwards compat for now: also set the locale
	        // make sure we set the locale AFTER all child locales have been
	        // created, so we won't end up with the child locale set.
	        getSetGlobalLocale(name);
	
	
	        return locales[name];
	    } else {
	        // useful for testing
	        delete locales[name];
	        return null;
	    }
	}
	
	function updateLocale(name, config) {
	    if (config != null) {
	        var locale, parentConfig = baseConfig;
	        // MERGE
	        if (locales[name] != null) {
	            parentConfig = locales[name]._config;
	        }
	        config = mergeConfigs(parentConfig, config);
	        locale = new Locale(config);
	        locale.parentLocale = locales[name];
	        locales[name] = locale;
	
	        // backwards compat for now: also set the locale
	        getSetGlobalLocale(name);
	    } else {
	        // pass null for config to unupdate, useful for tests
	        if (locales[name] != null) {
	            if (locales[name].parentLocale != null) {
	                locales[name] = locales[name].parentLocale;
	            } else if (locales[name] != null) {
	                delete locales[name];
	            }
	        }
	    }
	    return locales[name];
	}
	
	// returns locale data
	function getLocale (key) {
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
	
	function listLocales() {
	    return keys$1(locales);
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
	        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
	            overflow = WEEK;
	        }
	        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
	            overflow = WEEKDAY;
	        }
	
	        getParsingFlags(m).overflow = overflow;
	    }
	
	    return m;
	}
	
	// iso 8601 regex
	// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
	var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
	var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
	
	var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
	
	var isoDates = [
	    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
	    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
	    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
	    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
	    ['YYYY-DDD', /\d{4}-\d{3}/],
	    ['YYYY-MM', /\d{4}-\d\d/, false],
	    ['YYYYYYMMDD', /[+-]\d{10}/],
	    ['YYYYMMDD', /\d{8}/],
	    // YYYYMM is NOT allowed by the standard
	    ['GGGG[W]WWE', /\d{4}W\d{3}/],
	    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
	    ['YYYYDDD', /\d{7}/]
	];
	
	// iso time formats and regexes
	var isoTimes = [
	    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
	    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
	    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
	    ['HH:mm', /\d\d:\d\d/],
	    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
	    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
	    ['HHmmss', /\d\d\d\d\d\d/],
	    ['HHmm', /\d\d\d\d/],
	    ['HH', /\d\d/]
	];
	
	var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
	
	// date from iso format
	function configFromISO(config) {
	    var i, l,
	        string = config._i,
	        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
	        allowTime, dateFormat, timeFormat, tzFormat;
	
	    if (match) {
	        getParsingFlags(config).iso = true;
	
	        for (i = 0, l = isoDates.length; i < l; i++) {
	            if (isoDates[i][1].exec(match[1])) {
	                dateFormat = isoDates[i][0];
	                allowTime = isoDates[i][2] !== false;
	                break;
	            }
	        }
	        if (dateFormat == null) {
	            config._isValid = false;
	            return;
	        }
	        if (match[3]) {
	            for (i = 0, l = isoTimes.length; i < l; i++) {
	                if (isoTimes[i][1].exec(match[3])) {
	                    // match[2] should be 'T' or space
	                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
	                    break;
	                }
	            }
	            if (timeFormat == null) {
	                config._isValid = false;
	                return;
	            }
	        }
	        if (!allowTime && timeFormat != null) {
	            config._isValid = false;
	            return;
	        }
	        if (match[4]) {
	            if (tzRegex.exec(match[4])) {
	                tzFormat = 'Z';
	            } else {
	                config._isValid = false;
	                return;
	            }
	        }
	        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
	        configFromStringAndFormat(config);
	    } else {
	        config._isValid = false;
	    }
	}
	
	// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
	var basicRfcRegex = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;
	
	// date and time from ref 2822 format
	function configFromRFC2822(config) {
	    var string, match, dayFormat,
	        dateFormat, timeFormat, tzFormat;
	    var timezones = {
	        ' GMT': ' +0000',
	        ' EDT': ' -0400',
	        ' EST': ' -0500',
	        ' CDT': ' -0500',
	        ' CST': ' -0600',
	        ' MDT': ' -0600',
	        ' MST': ' -0700',
	        ' PDT': ' -0700',
	        ' PST': ' -0800'
	    };
	    var military = 'YXWVUTSRQPONZABCDEFGHIKLM';
	    var timezone, timezoneIndex;
	
	    string = config._i
	        .replace(/\([^\)]*\)|[\n\t]/g, ' ') // Remove comments and folding whitespace
	        .replace(/(\s\s+)/g, ' ') // Replace multiple-spaces with a single space
	        .replace(/^\s|\s$/g, ''); // Remove leading and trailing spaces
	    match = basicRfcRegex.exec(string);
	
	    if (match) {
	        dayFormat = match[1] ? 'ddd' + ((match[1].length === 5) ? ', ' : ' ') : '';
	        dateFormat = 'D MMM ' + ((match[2].length > 10) ? 'YYYY ' : 'YY ');
	        timeFormat = 'HH:mm' + (match[4] ? ':ss' : '');
	
	        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
	        if (match[1]) { // day of week given
	            var momentDate = new Date(match[2]);
	            var momentDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][momentDate.getDay()];
	
	            if (match[1].substr(0,3) !== momentDay) {
	                getParsingFlags(config).weekdayMismatch = true;
	                config._isValid = false;
	                return;
	            }
	        }
	
	        switch (match[5].length) {
	            case 2: // military
	                if (timezoneIndex === 0) {
	                    timezone = ' +0000';
	                } else {
	                    timezoneIndex = military.indexOf(match[5][1].toUpperCase()) - 12;
	                    timezone = ((timezoneIndex < 0) ? ' -' : ' +') +
	                        (('' + timezoneIndex).replace(/^-?/, '0')).match(/..$/)[0] + '00';
	                }
	                break;
	            case 4: // Zone
	                timezone = timezones[match[5]];
	                break;
	            default: // UT or +/-9999
	                timezone = timezones[' GMT'];
	        }
	        match[5] = timezone;
	        config._i = match.splice(1).join('');
	        tzFormat = ' ZZ';
	        config._f = dayFormat + dateFormat + timeFormat + tzFormat;
	        configFromStringAndFormat(config);
	        getParsingFlags(config).rfc2822 = true;
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
	    } else {
	        return;
	    }
	
	    configFromRFC2822(config);
	    if (config._isValid === false) {
	        delete config._isValid;
	    } else {
	        return;
	    }
	
	    // Final attempt, use Input Fallback
	    hooks.createFromInputFallback(config);
	}
	
	hooks.createFromInputFallback = deprecate(
	    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
	    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
	    'discouraged and will be removed in an upcoming major release. Please refer to ' +
	    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
	    function (config) {
	        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	    }
	);
	
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
	    // hooks is actually the exported moment object
	    var nowValue = new Date(hooks.now());
	    if (config._useUTC) {
	        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
	    }
	    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
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
	    if (config._dayOfYear != null) {
	        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
	
	        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
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
	    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
	
	    w = config._w;
	    if (w.GG != null || w.W != null || w.E != null) {
	        dow = 1;
	        doy = 4;
	
	        // TODO: We need to take the current isoWeekYear, but that depends on
	        // how we interpret now (local, utc, fixed offset). So create
	        // a now version of current config (take local/utc/offset flags, and
	        // create now).
	        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
	        week = defaults(w.W, 1);
	        weekday = defaults(w.E, 1);
	        if (weekday < 1 || weekday > 7) {
	            weekdayOverflow = true;
	        }
	    } else {
	        dow = config._locale._week.dow;
	        doy = config._locale._week.doy;
	
	        var curWeek = weekOfYear(createLocal(), dow, doy);
	
	        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
	
	        // Default to current week.
	        week = defaults(w.w, curWeek.week);
	
	        if (w.d != null) {
	            // weekday -- low day numbers are considered next week
	            weekday = w.d;
	            if (weekday < 0 || weekday > 6) {
	                weekdayOverflow = true;
	            }
	        } else if (w.e != null) {
	            // local weekday -- counting starts from begining of week
	            weekday = w.e + dow;
	            if (w.e < 0 || w.e > 6) {
	                weekdayOverflow = true;
	            }
	        } else {
	            // default to begining of week
	            weekday = dow;
	        }
	    }
	    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
	        getParsingFlags(config)._overflowWeeks = true;
	    } else if (weekdayOverflow != null) {
	        getParsingFlags(config)._overflowWeekday = true;
	    } else {
	        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
	        config._a[YEAR] = temp.year;
	        config._dayOfYear = temp.dayOfYear;
	    }
	}
	
	// constant that refers to the ISO standard
	hooks.ISO_8601 = function () {};
	
	// constant that refers to the RFC 2822 form
	hooks.RFC_2822 = function () {};
	
	// date from string and format string
	function configFromStringAndFormat(config) {
	    // TODO: Move this to another part of the creation flow to prevent circular deps
	    if (config._f === hooks.ISO_8601) {
	        configFromISO(config);
	        return;
	    }
	    if (config._f === hooks.RFC_2822) {
	        configFromRFC2822(config);
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
	        // console.log('token', token, 'parsedInput', parsedInput,
	        //         'regex', getParseRegexForToken(token, config));
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
	    if (config._a[HOUR] <= 12 &&
	        getParsingFlags(config).bigHour === true &&
	        config._a[HOUR] > 0) {
	        getParsingFlags(config).bigHour = undefined;
	    }
	
	    getParsingFlags(config).parsedDateParts = config._a.slice(0);
	    getParsingFlags(config).meridiem = config._meridiem;
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
	
	// date from string and array of format strings
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
	
	        if (!isValid(tempConfig)) {
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
	    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
	        return obj && parseInt(obj, 10);
	    });
	
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
	
	    config._locale = config._locale || getLocale(config._l);
	
	    if (input === null || (format === undefined && input === '')) {
	        return createInvalid({nullInput: true});
	    }
	
	    if (typeof input === 'string') {
	        config._i = input = config._locale.preparse(input);
	    }
	
	    if (isMoment(input)) {
	        return new Moment(checkOverflow(input));
	    } else if (isDate(input)) {
	        config._d = input;
	    } else if (isArray(format)) {
	        configFromStringAndArray(config);
	    } else if (format) {
	        configFromStringAndFormat(config);
	    }  else {
	        configFromInput(config);
	    }
	
	    if (!isValid(config)) {
	        config._d = null;
	    }
	
	    return config;
	}
	
	function configFromInput(config) {
	    var input = config._i;
	    if (isUndefined(input)) {
	        config._d = new Date(hooks.now());
	    } else if (isDate(input)) {
	        config._d = new Date(input.valueOf());
	    } else if (typeof input === 'string') {
	        configFromString(config);
	    } else if (isArray(input)) {
	        config._a = map(input.slice(0), function (obj) {
	            return parseInt(obj, 10);
	        });
	        configFromArray(config);
	    } else if (isObject(input)) {
	        configFromObject(config);
	    } else if (isNumber(input)) {
	        // from milliseconds
	        config._d = new Date(input);
	    } else {
	        hooks.createFromInputFallback(config);
	    }
	}
	
	function createLocalOrUTC (input, format, locale, strict, isUTC) {
	    var c = {};
	
	    if (locale === true || locale === false) {
	        strict = locale;
	        locale = undefined;
	    }
	
	    if ((isObject(input) && isObjectEmpty(input)) ||
	            (isArray(input) && input.length === 0)) {
	        input = undefined;
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
	
	function createLocal (input, format, locale, strict) {
	    return createLocalOrUTC(input, format, locale, strict, false);
	}
	
	var prototypeMin = deprecate(
	    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
	    function () {
	        var other = createLocal.apply(null, arguments);
	        if (this.isValid() && other.isValid()) {
	            return other < this ? this : other;
	        } else {
	            return createInvalid();
	        }
	    }
	);
	
	var prototypeMax = deprecate(
	    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
	    function () {
	        var other = createLocal.apply(null, arguments);
	        if (this.isValid() && other.isValid()) {
	            return other > this ? this : other;
	        } else {
	            return createInvalid();
	        }
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
	        return createLocal();
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
	
	var now = function () {
	    return Date.now ? Date.now() : +(new Date());
	};
	
	var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];
	
	function isDurationValid(m) {
	    for (var key in m) {
	        if (!(ordering.indexOf(key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
	            return false;
	        }
	    }
	
	    var unitHasDecimal = false;
	    for (var i = 0; i < ordering.length; ++i) {
	        if (m[ordering[i]]) {
	            if (unitHasDecimal) {
	                return false; // only allow non-integers for smallest unit
	            }
	            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
	                unitHasDecimal = true;
	            }
	        }
	    }
	
	    return true;
	}
	
	function isValid$1() {
	    return this._isValid;
	}
	
	function createInvalid$1() {
	    return createDuration(NaN);
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
	
	    this._isValid = isDurationValid(normalizedInput);
	
	    // representation for dateAddRemove
	    this._milliseconds = +milliseconds +
	        seconds * 1e3 + // 1000
	        minutes * 6e4 + // 1000 * 60
	        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
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
	
	    this._locale = getLocale();
	
	    this._bubble();
	}
	
	function isDuration (obj) {
	    return obj instanceof Duration;
	}
	
	function absRound (number) {
	    if (number < 0) {
	        return Math.round(-1 * number) * -1;
	    } else {
	        return Math.round(number);
	    }
	}
	
	// FORMATTING
	
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
	
	addRegexToken('Z',  matchShortOffset);
	addRegexToken('ZZ', matchShortOffset);
	addParseToken(['Z', 'ZZ'], function (input, array, config) {
	    config._useUTC = true;
	    config._tzm = offsetFromString(matchShortOffset, input);
	});
	
	// HELPERS
	
	// timezone chunker
	// '+10:00' > ['10',  '00']
	// '-1530'  > ['-15', '30']
	var chunkOffset = /([\+\-]|\d\d)/gi;
	
	function offsetFromString(matcher, string) {
	    var matches = (string || '').match(matcher);
	
	    if (matches === null) {
	        return null;
	    }
	
	    var chunk   = matches[matches.length - 1] || [];
	    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	    var minutes = +(parts[1] * 60) + toInt(parts[2]);
	
	    return minutes === 0 ?
	      0 :
	      parts[0] === '+' ? minutes : -minutes;
	}
	
	// Return a moment from input, that is local/utc/zone equivalent to model.
	function cloneWithOffset(input, model) {
	    var res, diff;
	    if (model._isUTC) {
	        res = model.clone();
	        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
	        // Use low-level api, because this fn is low-level api.
	        res._d.setTime(res._d.valueOf() + diff);
	        hooks.updateOffset(res, false);
	        return res;
	    } else {
	        return createLocal(input).local();
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
	hooks.updateOffset = function () {};
	
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
	function getSetOffset (input, keepLocalTime, keepMinutes) {
	    var offset = this._offset || 0,
	        localAdjust;
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }
	    if (input != null) {
	        if (typeof input === 'string') {
	            input = offsetFromString(matchShortOffset, input);
	            if (input === null) {
	                return this;
	            }
	        } else if (Math.abs(input) < 16 && !keepMinutes) {
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
	                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
	            } else if (!this._changeInProgress) {
	                this._changeInProgress = true;
	                hooks.updateOffset(this, true);
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
	    if (this._tzm != null) {
	        this.utcOffset(this._tzm, false, true);
	    } else if (typeof this._i === 'string') {
	        var tZone = offsetFromString(matchOffset, this._i);
	        if (tZone != null) {
	            this.utcOffset(tZone);
	        }
	        else {
	            this.utcOffset(0, true);
	        }
	    }
	    return this;
	}
	
	function hasAlignedHourOffset (input) {
	    if (!this.isValid()) {
	        return false;
	    }
	    input = input ? createLocal(input).utcOffset() : 0;
	
	    return (this.utcOffset() - input) % 60 === 0;
	}
	
	function isDaylightSavingTime () {
	    return (
	        this.utcOffset() > this.clone().month(0).utcOffset() ||
	        this.utcOffset() > this.clone().month(5).utcOffset()
	    );
	}
	
	function isDaylightSavingTimeShifted () {
	    if (!isUndefined(this._isDSTShifted)) {
	        return this._isDSTShifted;
	    }
	
	    var c = {};
	
	    copyConfig(c, this);
	    c = prepareConfig(c);
	
	    if (c._a) {
	        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
	        this._isDSTShifted = this.isValid() &&
	            compareArrays(c._a, other.toArray()) > 0;
	    } else {
	        this._isDSTShifted = false;
	    }
	
	    return this._isDSTShifted;
	}
	
	function isLocal () {
	    return this.isValid() ? !this._isUTC : false;
	}
	
	function isUtcOffset () {
	    return this.isValid() ? this._isUTC : false;
	}
	
	function isUtc () {
	    return this.isValid() ? this._isUTC && this._offset === 0 : false;
	}
	
	// ASP.NET json date format regex
	var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;
	
	// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	// and further modified to allow for strings containing both week and day
	var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
	
	function createDuration (input, key) {
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
	    } else if (isNumber(input)) {
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
	            d  : toInt(match[DATE])                         * sign,
	            h  : toInt(match[HOUR])                         * sign,
	            m  : toInt(match[MINUTE])                       * sign,
	            s  : toInt(match[SECOND])                       * sign,
	            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
	        };
	    } else if (!!(match = isoRegex.exec(input))) {
	        sign = (match[1] === '-') ? -1 : 1;
	        duration = {
	            y : parseIso(match[2], sign),
	            M : parseIso(match[3], sign),
	            w : parseIso(match[4], sign),
	            d : parseIso(match[5], sign),
	            h : parseIso(match[6], sign),
	            m : parseIso(match[7], sign),
	            s : parseIso(match[8], sign)
	        };
	    } else if (duration == null) {// checks for null or undefined
	        duration = {};
	    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
	
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
	
	createDuration.fn = Duration.prototype;
	createDuration.invalid = createInvalid$1;
	
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
	    if (!(base.isValid() && other.isValid())) {
	        return {milliseconds: 0, months: 0};
	    }
	
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
	
	// TODO: remove 'name' arg after deprecation is removed
	function createAdder(direction, name) {
	    return function (val, period) {
	        var dur, tmp;
	        //invert the arguments, but complain about it
	        if (period !== null && !isNaN(+period)) {
	            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
	            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
	            tmp = val; val = period; period = tmp;
	        }
	
	        val = typeof val === 'string' ? +val : val;
	        dur = createDuration(val, period);
	        addSubtract(this, dur, direction);
	        return this;
	    };
	}
	
	function addSubtract (mom, duration, isAdding, updateOffset) {
	    var milliseconds = duration._milliseconds,
	        days = absRound(duration._days),
	        months = absRound(duration._months);
	
	    if (!mom.isValid()) {
	        // No op
	        return;
	    }
	
	    updateOffset = updateOffset == null ? true : updateOffset;
	
	    if (milliseconds) {
	        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
	    }
	    if (days) {
	        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
	    }
	    if (months) {
	        setMonth(mom, get(mom, 'Month') + months * isAdding);
	    }
	    if (updateOffset) {
	        hooks.updateOffset(mom, days || months);
	    }
	}
	
	var add      = createAdder(1, 'add');
	var subtract = createAdder(-1, 'subtract');
	
	function getCalendarFormat(myMoment, now) {
	    var diff = myMoment.diff(now, 'days', true);
	    return diff < -6 ? 'sameElse' :
	            diff < -1 ? 'lastWeek' :
	            diff < 0 ? 'lastDay' :
	            diff < 1 ? 'sameDay' :
	            diff < 2 ? 'nextDay' :
	            diff < 7 ? 'nextWeek' : 'sameElse';
	}
	
	function calendar$1 (time, formats) {
	    // We want to compare the start of today, vs this.
	    // Getting start-of-today depends on whether we're local/utc/offset or not.
	    var now = time || createLocal(),
	        sod = cloneWithOffset(now, this).startOf('day'),
	        format = hooks.calendarFormat(this, sod) || 'sameElse';
	
	    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
	
	    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
	}
	
	function clone () {
	    return new Moment(this);
	}
	
	function isAfter (input, units) {
	    var localInput = isMoment(input) ? input : createLocal(input);
	    if (!(this.isValid() && localInput.isValid())) {
	        return false;
	    }
	    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	    if (units === 'millisecond') {
	        return this.valueOf() > localInput.valueOf();
	    } else {
	        return localInput.valueOf() < this.clone().startOf(units).valueOf();
	    }
	}
	
	function isBefore (input, units) {
	    var localInput = isMoment(input) ? input : createLocal(input);
	    if (!(this.isValid() && localInput.isValid())) {
	        return false;
	    }
	    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	    if (units === 'millisecond') {
	        return this.valueOf() < localInput.valueOf();
	    } else {
	        return this.clone().endOf(units).valueOf() < localInput.valueOf();
	    }
	}
	
	function isBetween (from, to, units, inclusivity) {
	    inclusivity = inclusivity || '()';
	    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
	        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
	}
	
	function isSame (input, units) {
	    var localInput = isMoment(input) ? input : createLocal(input),
	        inputMs;
	    if (!(this.isValid() && localInput.isValid())) {
	        return false;
	    }
	    units = normalizeUnits(units || 'millisecond');
	    if (units === 'millisecond') {
	        return this.valueOf() === localInput.valueOf();
	    } else {
	        inputMs = localInput.valueOf();
	        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
	    }
	}
	
	function isSameOrAfter (input, units) {
	    return this.isSame(input, units) || this.isAfter(input,units);
	}
	
	function isSameOrBefore (input, units) {
	    return this.isSame(input, units) || this.isBefore(input,units);
	}
	
	function diff (input, units, asFloat) {
	    var that,
	        zoneDelta,
	        delta, output;
	
	    if (!this.isValid()) {
	        return NaN;
	    }
	
	    that = cloneWithOffset(input, this);
	
	    if (!that.isValid()) {
	        return NaN;
	    }
	
	    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
	
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
	
	    //check for negative zero, return zero if negative zero
	    return -(wholeMonthDiff + adjust) || 0;
	}
	
	hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';
	
	function toString () {
	    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	}
	
	function toISOString() {
	    if (!this.isValid()) {
	        return null;
	    }
	    var m = this.clone().utc();
	    if (m.year() < 0 || m.year() > 9999) {
	        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	    }
	    if (isFunction(Date.prototype.toISOString)) {
	        // native implementation is ~50x faster, use it when we can
	        return this.toDate().toISOString();
	    }
	    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	}
	
	/**
	 * Return a human readable representation of a moment that can
	 * also be evaluated to get a new moment which is the same
	 *
	 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
	 */
	function inspect () {
	    if (!this.isValid()) {
	        return 'moment.invalid(/* ' + this._i + ' */)';
	    }
	    var func = 'moment';
	    var zone = '';
	    if (!this.isLocal()) {
	        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
	        zone = 'Z';
	    }
	    var prefix = '[' + func + '("]';
	    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
	    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
	    var suffix = zone + '[")]';
	
	    return this.format(prefix + year + datetime + suffix);
	}
	
	function format (inputString) {
	    if (!inputString) {
	        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
	    }
	    var output = formatMoment(this, inputString);
	    return this.localeData().postformat(output);
	}
	
	function from (time, withoutSuffix) {
	    if (this.isValid() &&
	            ((isMoment(time) && time.isValid()) ||
	             createLocal(time).isValid())) {
	        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	    } else {
	        return this.localeData().invalidDate();
	    }
	}
	
	function fromNow (withoutSuffix) {
	    return this.from(createLocal(), withoutSuffix);
	}
	
	function to (time, withoutSuffix) {
	    if (this.isValid() &&
	            ((isMoment(time) && time.isValid()) ||
	             createLocal(time).isValid())) {
	        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
	    } else {
	        return this.localeData().invalidDate();
	    }
	}
	
	function toNow (withoutSuffix) {
	    return this.to(createLocal(), withoutSuffix);
	}
	
	// If passed a locale key, it will set the locale for this
	// instance.  Otherwise, it will return the locale configuration
	// variables for this instance.
	function locale (key) {
	    var newLocaleData;
	
	    if (key === undefined) {
	        return this._locale._abbr;
	    } else {
	        newLocaleData = getLocale(key);
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
	        case 'date':
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
	
	    // 'date' is an alias for 'day', so it should be considered as such.
	    if (units === 'date') {
	        units = 'day';
	    }
	
	    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	}
	
	function valueOf () {
	    return this._d.valueOf() - ((this._offset || 0) * 60000);
	}
	
	function unix () {
	    return Math.floor(this.valueOf() / 1000);
	}
	
	function toDate () {
	    return new Date(this.valueOf());
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
	
	function toJSON () {
	    // new Date(NaN).toJSON() === null
	    return this.isValid() ? this.toISOString() : null;
	}
	
	function isValid$2 () {
	    return isValid(this);
	}
	
	function parsingFlags () {
	    return extend({}, getParsingFlags(this));
	}
	
	function invalidAt () {
	    return getParsingFlags(this).overflow;
	}
	
	function creationData() {
	    return {
	        input: this._i,
	        format: this._f,
	        locale: this._locale,
	        isUTC: this._isUTC,
	        strict: this._strict
	    };
	}
	
	// FORMATTING
	
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
	
	// PRIORITY
	
	addUnitPriority('weekYear', 1);
	addUnitPriority('isoWeekYear', 1);
	
	
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
	    week[token] = hooks.parseTwoDigitYear(input);
	});
	
	// MOMENTS
	
	function getSetWeekYear (input) {
	    return getSetWeekYearHelper.call(this,
	            input,
	            this.week(),
	            this.weekday(),
	            this.localeData()._week.dow,
	            this.localeData()._week.doy);
	}
	
	function getSetISOWeekYear (input) {
	    return getSetWeekYearHelper.call(this,
	            input, this.isoWeek(), this.isoWeekday(), 1, 4);
	}
	
	function getISOWeeksInYear () {
	    return weeksInYear(this.year(), 1, 4);
	}
	
	function getWeeksInYear () {
	    var weekInfo = this.localeData()._week;
	    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	}
	
	function getSetWeekYearHelper(input, week, weekday, dow, doy) {
	    var weeksTarget;
	    if (input == null) {
	        return weekOfYear(this, dow, doy).year;
	    } else {
	        weeksTarget = weeksInYear(input, dow, doy);
	        if (week > weeksTarget) {
	            week = weeksTarget;
	        }
	        return setWeekAll.call(this, input, week, weekday, dow, doy);
	    }
	}
	
	function setWeekAll(weekYear, week, weekday, dow, doy) {
	    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
	        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
	
	    this.year(date.getUTCFullYear());
	    this.month(date.getUTCMonth());
	    this.date(date.getUTCDate());
	    return this;
	}
	
	// FORMATTING
	
	addFormatToken('Q', 0, 'Qo', 'quarter');
	
	// ALIASES
	
	addUnitAlias('quarter', 'Q');
	
	// PRIORITY
	
	addUnitPriority('quarter', 7);
	
	// PARSING
	
	addRegexToken('Q', match1);
	addParseToken('Q', function (input, array) {
	    array[MONTH] = (toInt(input) - 1) * 3;
	});
	
	// MOMENTS
	
	function getSetQuarter (input) {
	    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	}
	
	// FORMATTING
	
	addFormatToken('D', ['DD', 2], 'Do', 'date');
	
	// ALIASES
	
	addUnitAlias('date', 'D');
	
	// PRIOROITY
	addUnitPriority('date', 9);
	
	// PARSING
	
	addRegexToken('D',  match1to2);
	addRegexToken('DD', match1to2, match2);
	addRegexToken('Do', function (isStrict, locale) {
	    // TODO: Remove "ordinalParse" fallback in next major release.
	    return isStrict ?
	      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
	      locale._dayOfMonthOrdinalParseLenient;
	});
	
	addParseToken(['D', 'DD'], DATE);
	addParseToken('Do', function (input, array) {
	    array[DATE] = toInt(input.match(match1to2)[0], 10);
	});
	
	// MOMENTS
	
	var getSetDayOfMonth = makeGetSet('Date', true);
	
	// FORMATTING
	
	addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');
	
	// ALIASES
	
	addUnitAlias('dayOfYear', 'DDD');
	
	// PRIORITY
	addUnitPriority('dayOfYear', 4);
	
	// PARSING
	
	addRegexToken('DDD',  match1to3);
	addRegexToken('DDDD', match3);
	addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	    config._dayOfYear = toInt(input);
	});
	
	// HELPERS
	
	// MOMENTS
	
	function getSetDayOfYear (input) {
	    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	}
	
	// FORMATTING
	
	addFormatToken('m', ['mm', 2], 0, 'minute');
	
	// ALIASES
	
	addUnitAlias('minute', 'm');
	
	// PRIORITY
	
	addUnitPriority('minute', 14);
	
	// PARSING
	
	addRegexToken('m',  match1to2);
	addRegexToken('mm', match1to2, match2);
	addParseToken(['m', 'mm'], MINUTE);
	
	// MOMENTS
	
	var getSetMinute = makeGetSet('Minutes', false);
	
	// FORMATTING
	
	addFormatToken('s', ['ss', 2], 0, 'second');
	
	// ALIASES
	
	addUnitAlias('second', 's');
	
	// PRIORITY
	
	addUnitPriority('second', 15);
	
	// PARSING
	
	addRegexToken('s',  match1to2);
	addRegexToken('ss', match1to2, match2);
	addParseToken(['s', 'ss'], SECOND);
	
	// MOMENTS
	
	var getSetSecond = makeGetSet('Seconds', false);
	
	// FORMATTING
	
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
	
	// PRIORITY
	
	addUnitPriority('millisecond', 16);
	
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
	
	// FORMATTING
	
	addFormatToken('z',  0, 0, 'zoneAbbr');
	addFormatToken('zz', 0, 0, 'zoneName');
	
	// MOMENTS
	
	function getZoneAbbr () {
	    return this._isUTC ? 'UTC' : '';
	}
	
	function getZoneName () {
	    return this._isUTC ? 'Coordinated Universal Time' : '';
	}
	
	var proto = Moment.prototype;
	
	proto.add               = add;
	proto.calendar          = calendar$1;
	proto.clone             = clone;
	proto.diff              = diff;
	proto.endOf             = endOf;
	proto.format            = format;
	proto.from              = from;
	proto.fromNow           = fromNow;
	proto.to                = to;
	proto.toNow             = toNow;
	proto.get               = stringGet;
	proto.invalidAt         = invalidAt;
	proto.isAfter           = isAfter;
	proto.isBefore          = isBefore;
	proto.isBetween         = isBetween;
	proto.isSame            = isSame;
	proto.isSameOrAfter     = isSameOrAfter;
	proto.isSameOrBefore    = isSameOrBefore;
	proto.isValid           = isValid$2;
	proto.lang              = lang;
	proto.locale            = locale;
	proto.localeData        = localeData;
	proto.max               = prototypeMax;
	proto.min               = prototypeMin;
	proto.parsingFlags      = parsingFlags;
	proto.set               = stringSet;
	proto.startOf           = startOf;
	proto.subtract          = subtract;
	proto.toArray           = toArray;
	proto.toObject          = toObject;
	proto.toDate            = toDate;
	proto.toISOString       = toISOString;
	proto.inspect           = inspect;
	proto.toJSON            = toJSON;
	proto.toString          = toString;
	proto.unix              = unix;
	proto.valueOf           = valueOf;
	proto.creationData      = creationData;
	
	// Year
	proto.year       = getSetYear;
	proto.isLeapYear = getIsLeapYear;
	
	// Week Year
	proto.weekYear    = getSetWeekYear;
	proto.isoWeekYear = getSetISOWeekYear;
	
	// Quarter
	proto.quarter = proto.quarters = getSetQuarter;
	
	// Month
	proto.month       = getSetMonth;
	proto.daysInMonth = getDaysInMonth;
	
	// Week
	proto.week           = proto.weeks        = getSetWeek;
	proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
	proto.weeksInYear    = getWeeksInYear;
	proto.isoWeeksInYear = getISOWeeksInYear;
	
	// Day
	proto.date       = getSetDayOfMonth;
	proto.day        = proto.days             = getSetDayOfWeek;
	proto.weekday    = getSetLocaleDayOfWeek;
	proto.isoWeekday = getSetISODayOfWeek;
	proto.dayOfYear  = getSetDayOfYear;
	
	// Hour
	proto.hour = proto.hours = getSetHour;
	
	// Minute
	proto.minute = proto.minutes = getSetMinute;
	
	// Second
	proto.second = proto.seconds = getSetSecond;
	
	// Millisecond
	proto.millisecond = proto.milliseconds = getSetMillisecond;
	
	// Offset
	proto.utcOffset            = getSetOffset;
	proto.utc                  = setOffsetToUTC;
	proto.local                = setOffsetToLocal;
	proto.parseZone            = setOffsetToParsedOffset;
	proto.hasAlignedHourOffset = hasAlignedHourOffset;
	proto.isDST                = isDaylightSavingTime;
	proto.isLocal              = isLocal;
	proto.isUtcOffset          = isUtcOffset;
	proto.isUtc                = isUtc;
	proto.isUTC                = isUtc;
	
	// Timezone
	proto.zoneAbbr = getZoneAbbr;
	proto.zoneName = getZoneName;
	
	// Deprecations
	proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
	proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);
	
	function createUnix (input) {
	    return createLocal(input * 1000);
	}
	
	function createInZone () {
	    return createLocal.apply(null, arguments).parseZone();
	}
	
	function preParsePostFormat (string) {
	    return string;
	}
	
	var proto$1 = Locale.prototype;
	
	proto$1.calendar        = calendar;
	proto$1.longDateFormat  = longDateFormat;
	proto$1.invalidDate     = invalidDate;
	proto$1.ordinal         = ordinal;
	proto$1.preparse        = preParsePostFormat;
	proto$1.postformat      = preParsePostFormat;
	proto$1.relativeTime    = relativeTime;
	proto$1.pastFuture      = pastFuture;
	proto$1.set             = set;
	
	// Month
	proto$1.months            =        localeMonths;
	proto$1.monthsShort       =        localeMonthsShort;
	proto$1.monthsParse       =        localeMonthsParse;
	proto$1.monthsRegex       = monthsRegex;
	proto$1.monthsShortRegex  = monthsShortRegex;
	
	// Week
	proto$1.week = localeWeek;
	proto$1.firstDayOfYear = localeFirstDayOfYear;
	proto$1.firstDayOfWeek = localeFirstDayOfWeek;
	
	// Day of Week
	proto$1.weekdays       =        localeWeekdays;
	proto$1.weekdaysMin    =        localeWeekdaysMin;
	proto$1.weekdaysShort  =        localeWeekdaysShort;
	proto$1.weekdaysParse  =        localeWeekdaysParse;
	
	proto$1.weekdaysRegex       =        weekdaysRegex;
	proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
	proto$1.weekdaysMinRegex    =        weekdaysMinRegex;
	
	// Hours
	proto$1.isPM = localeIsPM;
	proto$1.meridiem = localeMeridiem;
	
	function get$1 (format, index, field, setter) {
	    var locale = getLocale();
	    var utc = createUTC().set(setter, index);
	    return locale[field](utc, format);
	}
	
	function listMonthsImpl (format, index, field) {
	    if (isNumber(format)) {
	        index = format;
	        format = undefined;
	    }
	
	    format = format || '';
	
	    if (index != null) {
	        return get$1(format, index, field, 'month');
	    }
	
	    var i;
	    var out = [];
	    for (i = 0; i < 12; i++) {
	        out[i] = get$1(format, i, field, 'month');
	    }
	    return out;
	}
	
	// ()
	// (5)
	// (fmt, 5)
	// (fmt)
	// (true)
	// (true, 5)
	// (true, fmt, 5)
	// (true, fmt)
	function listWeekdaysImpl (localeSorted, format, index, field) {
	    if (typeof localeSorted === 'boolean') {
	        if (isNumber(format)) {
	            index = format;
	            format = undefined;
	        }
	
	        format = format || '';
	    } else {
	        format = localeSorted;
	        index = format;
	        localeSorted = false;
	
	        if (isNumber(format)) {
	            index = format;
	            format = undefined;
	        }
	
	        format = format || '';
	    }
	
	    var locale = getLocale(),
	        shift = localeSorted ? locale._week.dow : 0;
	
	    if (index != null) {
	        return get$1(format, (index + shift) % 7, field, 'day');
	    }
	
	    var i;
	    var out = [];
	    for (i = 0; i < 7; i++) {
	        out[i] = get$1(format, (i + shift) % 7, field, 'day');
	    }
	    return out;
	}
	
	function listMonths (format, index) {
	    return listMonthsImpl(format, index, 'months');
	}
	
	function listMonthsShort (format, index) {
	    return listMonthsImpl(format, index, 'monthsShort');
	}
	
	function listWeekdays (localeSorted, format, index) {
	    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
	}
	
	function listWeekdaysShort (localeSorted, format, index) {
	    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
	}
	
	function listWeekdaysMin (localeSorted, format, index) {
	    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
	}
	
	getSetGlobalLocale('en', {
	    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
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
	hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
	hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);
	
	var mathAbs = Math.abs;
	
	function abs () {
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
	
	function addSubtract$1 (duration, input, value, direction) {
	    var other = createDuration(input, value);
	
	    duration._milliseconds += direction * other._milliseconds;
	    duration._days         += direction * other._days;
	    duration._months       += direction * other._months;
	
	    return duration._bubble();
	}
	
	// supports only 2.0-style add(1, 's') or add(duration)
	function add$1 (input, value) {
	    return addSubtract$1(this, input, value, 1);
	}
	
	// supports only 2.0-style subtract(1, 's') or subtract(duration)
	function subtract$1 (input, value) {
	    return addSubtract$1(this, input, value, -1);
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
	    if (!this.isValid()) {
	        return NaN;
	    }
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
	function valueOf$1 () {
	    if (!this.isValid()) {
	        return NaN;
	    }
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
	
	function get$2 (units) {
	    units = normalizeUnits(units);
	    return this.isValid() ? this[units + 's']() : NaN;
	}
	
	function makeGetter(name) {
	    return function () {
	        return this.isValid() ? this._data[name] : NaN;
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
	    ss: 44,         // a few seconds to seconds
	    s : 45,         // seconds to minute
	    m : 45,         // minutes to hour
	    h : 22,         // hours to day
	    d : 26,         // days to month
	    M : 11          // months to year
	};
	
	// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	}
	
	function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
	    var duration = createDuration(posNegDuration).abs();
	    var seconds  = round(duration.as('s'));
	    var minutes  = round(duration.as('m'));
	    var hours    = round(duration.as('h'));
	    var days     = round(duration.as('d'));
	    var months   = round(duration.as('M'));
	    var years    = round(duration.as('y'));
	
	    var a = seconds <= thresholds.ss && ['s', seconds]  ||
	            seconds < thresholds.s   && ['ss', seconds] ||
	            minutes <= 1             && ['m']           ||
	            minutes < thresholds.m   && ['mm', minutes] ||
	            hours   <= 1             && ['h']           ||
	            hours   < thresholds.h   && ['hh', hours]   ||
	            days    <= 1             && ['d']           ||
	            days    < thresholds.d   && ['dd', days]    ||
	            months  <= 1             && ['M']           ||
	            months  < thresholds.M   && ['MM', months]  ||
	            years   <= 1             && ['y']           || ['yy', years];
	
	    a[2] = withoutSuffix;
	    a[3] = +posNegDuration > 0;
	    a[4] = locale;
	    return substituteTimeAgo.apply(null, a);
	}
	
	// This function allows you to set the rounding function for relative time strings
	function getSetRelativeTimeRounding (roundingFunction) {
	    if (roundingFunction === undefined) {
	        return round;
	    }
	    if (typeof(roundingFunction) === 'function') {
	        round = roundingFunction;
	        return true;
	    }
	    return false;
	}
	
	// This function allows you to set a threshold for relative time strings
	function getSetRelativeTimeThreshold (threshold, limit) {
	    if (thresholds[threshold] === undefined) {
	        return false;
	    }
	    if (limit === undefined) {
	        return thresholds[threshold];
	    }
	    thresholds[threshold] = limit;
	    if (threshold === 's') {
	        thresholds.ss = limit - 1;
	    }
	    return true;
	}
	
	function humanize (withSuffix) {
	    if (!this.isValid()) {
	        return this.localeData().invalidDate();
	    }
	
	    var locale = this.localeData();
	    var output = relativeTime$1(this, !withSuffix, locale);
	
	    if (withSuffix) {
	        output = locale.pastFuture(+this, output);
	    }
	
	    return locale.postformat(output);
	}
	
	var abs$1 = Math.abs;
	
	function toISOString$1() {
	    // for ISO strings we do not use the normal bubbling rules:
	    //  * milliseconds bubble up until they become hours
	    //  * days do not bubble at all
	    //  * months bubble up until they become years
	    // This is because there is no context-free conversion between hours and days
	    // (think of clock changes)
	    // and also not between days and months (28-31 days per month)
	    if (!this.isValid()) {
	        return this.localeData().invalidDate();
	    }
	
	    var seconds = abs$1(this._milliseconds) / 1000;
	    var days         = abs$1(this._days);
	    var months       = abs$1(this._months);
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
	
	var proto$2 = Duration.prototype;
	
	proto$2.isValid        = isValid$1;
	proto$2.abs            = abs;
	proto$2.add            = add$1;
	proto$2.subtract       = subtract$1;
	proto$2.as             = as;
	proto$2.asMilliseconds = asMilliseconds;
	proto$2.asSeconds      = asSeconds;
	proto$2.asMinutes      = asMinutes;
	proto$2.asHours        = asHours;
	proto$2.asDays         = asDays;
	proto$2.asWeeks        = asWeeks;
	proto$2.asMonths       = asMonths;
	proto$2.asYears        = asYears;
	proto$2.valueOf        = valueOf$1;
	proto$2._bubble        = bubble;
	proto$2.get            = get$2;
	proto$2.milliseconds   = milliseconds;
	proto$2.seconds        = seconds;
	proto$2.minutes        = minutes;
	proto$2.hours          = hours;
	proto$2.days           = days;
	proto$2.weeks          = weeks;
	proto$2.months         = months;
	proto$2.years          = years;
	proto$2.humanize       = humanize;
	proto$2.toISOString    = toISOString$1;
	proto$2.toString       = toISOString$1;
	proto$2.toJSON         = toISOString$1;
	proto$2.locale         = locale;
	proto$2.localeData     = localeData;
	
	// Deprecations
	proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
	proto$2.lang = lang;
	
	// Side effect imports
	
	// FORMATTING
	
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
	
	
	hooks.version = '2.18.1';
	
	setHookCallback(createLocal);
	
	hooks.fn                    = proto;
	hooks.min                   = min;
	hooks.max                   = max;
	hooks.now                   = now;
	hooks.utc                   = createUTC;
	hooks.unix                  = createUnix;
	hooks.months                = listMonths;
	hooks.isDate                = isDate;
	hooks.locale                = getSetGlobalLocale;
	hooks.invalid               = createInvalid;
	hooks.duration              = createDuration;
	hooks.isMoment              = isMoment;
	hooks.weekdays              = listWeekdays;
	hooks.parseZone             = createInZone;
	hooks.localeData            = getLocale;
	hooks.isDuration            = isDuration;
	hooks.monthsShort           = listMonthsShort;
	hooks.weekdaysMin           = listWeekdaysMin;
	hooks.defineLocale          = defineLocale;
	hooks.updateLocale          = updateLocale;
	hooks.locales               = listLocales;
	hooks.weekdaysShort         = listWeekdaysShort;
	hooks.normalizeUnits        = normalizeUnits;
	hooks.relativeTimeRounding = getSetRelativeTimeRounding;
	hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
	hooks.calendarFormat        = getCalendarFormat;
	hooks.prototype             = proto;
	
	return hooks;
	
	})));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)(module)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./en-gb": 34,
		"./en-gb.js": 34
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
	webpackContext.id = 33;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (United Kingdom) [en-gb]
	//! author : Chris Gedrim : https://github.com/chrisgedrim
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(32)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var enGb = moment.defineLocale('en-gb', {
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
	    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
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
	
	return enGb;
	
	})));


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//! moment-timezone.js
	//! version : 0.5.13
	//! Copyright (c) JS Foundation and other contributors
	//! license : MIT
	//! github.com/moment/moment-timezone
	
	(function (root, factory) {
		"use strict";
	
		/*global define*/
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(32)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));                 // AMD
		} else if (typeof module === 'object' && module.exports) {
			module.exports = factory(require('moment')); // Node
		} else {
			factory(root.moment);                        // Browser
		}
	}(this, function (moment) {
		"use strict";
	
		// Do not load moment-timezone a second time.
		// if (moment.tz !== undefined) {
		// 	logError('Moment Timezone ' + moment.tz.version + ' was already loaded ' + (moment.tz.dataVersion ? 'with data from ' : 'without any data') + moment.tz.dataVersion);
		// 	return moment;
		// }
	
		var VERSION = "0.5.13",
			zones = {},
			links = {},
			names = {},
			guesses = {},
			cachedGuess,
	
			momentVersion = moment.version.split('.'),
			major = +momentVersion[0],
			minor = +momentVersion[1];
	
		// Moment.js version check
		if (major < 2 || (major === 2 && minor < 6)) {
			logError('Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js ' + moment.version + '. See momentjs.com');
		}
	
		/************************************
			Unpacking
		************************************/
	
		function charCodeToInt(charCode) {
			if (charCode > 96) {
				return charCode - 87;
			} else if (charCode > 64) {
				return charCode - 29;
			}
			return charCode - 48;
		}
	
		function unpackBase60(string) {
			var i = 0,
				parts = string.split('.'),
				whole = parts[0],
				fractional = parts[1] || '',
				multiplier = 1,
				num,
				out = 0,
				sign = 1;
	
			// handle negative numbers
			if (string.charCodeAt(0) === 45) {
				i = 1;
				sign = -1;
			}
	
			// handle digits before the decimal
			for (i; i < whole.length; i++) {
				num = charCodeToInt(whole.charCodeAt(i));
				out = 60 * out + num;
			}
	
			// handle digits after the decimal
			for (i = 0; i < fractional.length; i++) {
				multiplier = multiplier / 60;
				num = charCodeToInt(fractional.charCodeAt(i));
				out += num * multiplier;
			}
	
			return out * sign;
		}
	
		function arrayToInt (array) {
			for (var i = 0; i < array.length; i++) {
				array[i] = unpackBase60(array[i]);
			}
		}
	
		function intToUntil (array, length) {
			for (var i = 0; i < length; i++) {
				array[i] = Math.round((array[i - 1] || 0) + (array[i] * 60000)); // minutes to milliseconds
			}
	
			array[length - 1] = Infinity;
		}
	
		function mapIndices (source, indices) {
			var out = [], i;
	
			for (i = 0; i < indices.length; i++) {
				out[i] = source[indices[i]];
			}
	
			return out;
		}
	
		function unpack (string) {
			var data = string.split('|'),
				offsets = data[2].split(' '),
				indices = data[3].split(''),
				untils  = data[4].split(' ');
	
			arrayToInt(offsets);
			arrayToInt(indices);
			arrayToInt(untils);
	
			intToUntil(untils, indices.length);
	
			return {
				name       : data[0],
				abbrs      : mapIndices(data[1].split(' '), indices),
				offsets    : mapIndices(offsets, indices),
				untils     : untils,
				population : data[5] | 0
			};
		}
	
		/************************************
			Zone object
		************************************/
	
		function Zone (packedString) {
			if (packedString) {
				this._set(unpack(packedString));
			}
		}
	
		Zone.prototype = {
			_set : function (unpacked) {
				this.name       = unpacked.name;
				this.abbrs      = unpacked.abbrs;
				this.untils     = unpacked.untils;
				this.offsets    = unpacked.offsets;
				this.population = unpacked.population;
			},
	
			_index : function (timestamp) {
				var target = +timestamp,
					untils = this.untils,
					i;
	
				for (i = 0; i < untils.length; i++) {
					if (target < untils[i]) {
						return i;
					}
				}
			},
	
			parse : function (timestamp) {
				var target  = +timestamp,
					offsets = this.offsets,
					untils  = this.untils,
					max     = untils.length - 1,
					offset, offsetNext, offsetPrev, i;
	
				for (i = 0; i < max; i++) {
					offset     = offsets[i];
					offsetNext = offsets[i + 1];
					offsetPrev = offsets[i ? i - 1 : i];
	
					if (offset < offsetNext && tz.moveAmbiguousForward) {
						offset = offsetNext;
					} else if (offset > offsetPrev && tz.moveInvalidForward) {
						offset = offsetPrev;
					}
	
					if (target < untils[i] - (offset * 60000)) {
						return offsets[i];
					}
				}
	
				return offsets[max];
			},
	
			abbr : function (mom) {
				return this.abbrs[this._index(mom)];
			},
	
			offset : function (mom) {
				return this.offsets[this._index(mom)];
			}
		};
	
		/************************************
			Current Timezone
		************************************/
	
		function OffsetAt(at) {
			var timeString = at.toTimeString();
			var abbr = timeString.match(/\([a-z ]+\)/i);
			if (abbr && abbr[0]) {
				// 17:56:31 GMT-0600 (CST)
				// 17:56:31 GMT-0600 (Central Standard Time)
				abbr = abbr[0].match(/[A-Z]/g);
				abbr = abbr ? abbr.join('') : undefined;
			} else {
				// 17:56:31 CST
				// 17:56:31 GMT+0800 (台北標準時間)
				abbr = timeString.match(/[A-Z]{3,5}/g);
				abbr = abbr ? abbr[0] : undefined;
			}
	
			if (abbr === 'GMT') {
				abbr = undefined;
			}
	
			this.at = +at;
			this.abbr = abbr;
			this.offset = at.getTimezoneOffset();
		}
	
		function ZoneScore(zone) {
			this.zone = zone;
			this.offsetScore = 0;
			this.abbrScore = 0;
		}
	
		ZoneScore.prototype.scoreOffsetAt = function (offsetAt) {
			this.offsetScore += Math.abs(this.zone.offset(offsetAt.at) - offsetAt.offset);
			if (this.zone.abbr(offsetAt.at).replace(/[^A-Z]/g, '') !== offsetAt.abbr) {
				this.abbrScore++;
			}
		};
	
		function findChange(low, high) {
			var mid, diff;
	
			while ((diff = ((high.at - low.at) / 12e4 | 0) * 6e4)) {
				mid = new OffsetAt(new Date(low.at + diff));
				if (mid.offset === low.offset) {
					low = mid;
				} else {
					high = mid;
				}
			}
	
			return low;
		}
	
		function userOffsets() {
			var startYear = new Date().getFullYear() - 2,
				last = new OffsetAt(new Date(startYear, 0, 1)),
				offsets = [last],
				change, next, i;
	
			for (i = 1; i < 48; i++) {
				next = new OffsetAt(new Date(startYear, i, 1));
				if (next.offset !== last.offset) {
					change = findChange(last, next);
					offsets.push(change);
					offsets.push(new OffsetAt(new Date(change.at + 6e4)));
				}
				last = next;
			}
	
			for (i = 0; i < 4; i++) {
				offsets.push(new OffsetAt(new Date(startYear + i, 0, 1)));
				offsets.push(new OffsetAt(new Date(startYear + i, 6, 1)));
			}
	
			return offsets;
		}
	
		function sortZoneScores (a, b) {
			if (a.offsetScore !== b.offsetScore) {
				return a.offsetScore - b.offsetScore;
			}
			if (a.abbrScore !== b.abbrScore) {
				return a.abbrScore - b.abbrScore;
			}
			return b.zone.population - a.zone.population;
		}
	
		function addToGuesses (name, offsets) {
			var i, offset;
			arrayToInt(offsets);
			for (i = 0; i < offsets.length; i++) {
				offset = offsets[i];
				guesses[offset] = guesses[offset] || {};
				guesses[offset][name] = true;
			}
		}
	
		function guessesForUserOffsets (offsets) {
			var offsetsLength = offsets.length,
				filteredGuesses = {},
				out = [],
				i, j, guessesOffset;
	
			for (i = 0; i < offsetsLength; i++) {
				guessesOffset = guesses[offsets[i].offset] || {};
				for (j in guessesOffset) {
					if (guessesOffset.hasOwnProperty(j)) {
						filteredGuesses[j] = true;
					}
				}
			}
	
			for (i in filteredGuesses) {
				if (filteredGuesses.hasOwnProperty(i)) {
					out.push(names[i]);
				}
			}
	
			return out;
		}
	
		function rebuildGuess () {
	
			// use Intl API when available and returning valid time zone
			try {
				var intlName = Intl.DateTimeFormat().resolvedOptions().timeZone;
				if (intlName){
					var name = names[normalizeName(intlName)];
					if (name) {
						return name;
					}
					logError("Moment Timezone found " + intlName + " from the Intl api, but did not have that data loaded.");
				}
			} catch (e) {
				// Intl unavailable, fall back to manual guessing.
			}
	
			var offsets = userOffsets(),
				offsetsLength = offsets.length,
				guesses = guessesForUserOffsets(offsets),
				zoneScores = [],
				zoneScore, i, j;
	
			for (i = 0; i < guesses.length; i++) {
				zoneScore = new ZoneScore(getZone(guesses[i]), offsetsLength);
				for (j = 0; j < offsetsLength; j++) {
					zoneScore.scoreOffsetAt(offsets[j]);
				}
				zoneScores.push(zoneScore);
			}
	
			zoneScores.sort(sortZoneScores);
	
			return zoneScores.length > 0 ? zoneScores[0].zone.name : undefined;
		}
	
		function guess (ignoreCache) {
			if (!cachedGuess || ignoreCache) {
				cachedGuess = rebuildGuess();
			}
			return cachedGuess;
		}
	
		/************************************
			Global Methods
		************************************/
	
		function normalizeName (name) {
			return (name || '').toLowerCase().replace(/\//g, '_');
		}
	
		function addZone (packed) {
			var i, name, split, normalized;
	
			if (typeof packed === "string") {
				packed = [packed];
			}
	
			for (i = 0; i < packed.length; i++) {
				split = packed[i].split('|');
				name = split[0];
				normalized = normalizeName(name);
				zones[normalized] = packed[i];
				names[normalized] = name;
				if (split[5]) {
					addToGuesses(normalized, split[2].split(' '));
				}
			}
		}
	
		function getZone (name, caller) {
			name = normalizeName(name);
	
			var zone = zones[name];
			var link;
	
			if (zone instanceof Zone) {
				return zone;
			}
	
			if (typeof zone === 'string') {
				zone = new Zone(zone);
				zones[name] = zone;
				return zone;
			}
	
			// Pass getZone to prevent recursion more than 1 level deep
			if (links[name] && caller !== getZone && (link = getZone(links[name], getZone))) {
				zone = zones[name] = new Zone();
				zone._set(link);
				zone.name = names[name];
				return zone;
			}
	
			return null;
		}
	
		function getNames () {
			var i, out = [];
	
			for (i in names) {
				if (names.hasOwnProperty(i) && (zones[i] || zones[links[i]]) && names[i]) {
					out.push(names[i]);
				}
			}
	
			return out.sort();
		}
	
		function addLink (aliases) {
			var i, alias, normal0, normal1;
	
			if (typeof aliases === "string") {
				aliases = [aliases];
			}
	
			for (i = 0; i < aliases.length; i++) {
				alias = aliases[i].split('|');
	
				normal0 = normalizeName(alias[0]);
				normal1 = normalizeName(alias[1]);
	
				links[normal0] = normal1;
				names[normal0] = alias[0];
	
				links[normal1] = normal0;
				names[normal1] = alias[1];
			}
		}
	
		function loadData (data) {
			addZone(data.zones);
			addLink(data.links);
			tz.dataVersion = data.version;
		}
	
		function zoneExists (name) {
			if (!zoneExists.didShowError) {
				zoneExists.didShowError = true;
					logError("moment.tz.zoneExists('" + name + "') has been deprecated in favor of !moment.tz.zone('" + name + "')");
			}
			return !!getZone(name);
		}
	
		function needsOffset (m) {
			return !!(m._a && (m._tzm === undefined));
		}
	
		function logError (message) {
			if (typeof console !== 'undefined' && typeof console.error === 'function') {
				console.error(message);
			}
		}
	
		/************************************
			moment.tz namespace
		************************************/
	
		function tz (input) {
			var args = Array.prototype.slice.call(arguments, 0, -1),
				name = arguments[arguments.length - 1],
				zone = getZone(name),
				out  = moment.utc.apply(null, args);
	
			if (zone && !moment.isMoment(input) && needsOffset(out)) {
				out.add(zone.parse(out), 'minutes');
			}
	
			out.tz(name);
	
			return out;
		}
	
		tz.version      = VERSION;
		tz.dataVersion  = '';
		tz._zones       = zones;
		tz._links       = links;
		tz._names       = names;
		tz.add          = addZone;
		tz.link         = addLink;
		tz.load         = loadData;
		tz.zone         = getZone;
		tz.zoneExists   = zoneExists; // deprecated in 0.1.0
		tz.guess        = guess;
		tz.names        = getNames;
		tz.Zone         = Zone;
		tz.unpack       = unpack;
		tz.unpackBase60 = unpackBase60;
		tz.needsOffset  = needsOffset;
		tz.moveInvalidForward   = true;
		tz.moveAmbiguousForward = false;
	
		/************************************
			Interface with Moment.js
		************************************/
	
		var fn = moment.fn;
	
		moment.tz = tz;
	
		moment.defaultZone = null;
	
		moment.updateOffset = function (mom, keepTime) {
			var zone = moment.defaultZone,
				offset;
	
			if (mom._z === undefined) {
				if (zone && needsOffset(mom) && !mom._isUTC) {
					mom._d = moment.utc(mom._a)._d;
					mom.utc().add(zone.parse(mom), 'minutes');
				}
				mom._z = zone;
			}
			if (mom._z) {
				offset = mom._z.offset(mom);
				if (Math.abs(offset) < 16) {
					offset = offset / 60;
				}
				if (mom.utcOffset !== undefined) {
					mom.utcOffset(-offset, keepTime);
				} else {
					mom.zone(offset, keepTime);
				}
			}
		};
	
		fn.tz = function (name) {
			if (name) {
				this._z = getZone(name);
				if (this._z) {
					moment.updateOffset(this);
				} else {
					logError("Moment Timezone has no data for " + name + ". See http://momentjs.com/timezone/docs/#/data-loading/.");
				}
				return this;
			}
			if (this._z) { return this._z.name; }
		};
	
		function abbrWrap (old) {
			return function () {
				if (this._z) { return this._z.abbr(this); }
				return old.call(this);
			};
		}
	
		function resetZoneWrap (old) {
			return function () {
				this._z = null;
				return old.apply(this, arguments);
			};
		}
	
		fn.zoneName = abbrWrap(fn.zoneName);
		fn.zoneAbbr = abbrWrap(fn.zoneAbbr);
		fn.utc      = resetZoneWrap(fn.utc);
	
		moment.tz.setDefault = function(name) {
			if (major < 2 || (major === 2 && minor < 9)) {
				logError('Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js ' + moment.version + '.');
			}
			moment.defaultZone = name ? getZone(name) : null;
			return moment;
		};
	
		// Cloning a moment should include the _z property.
		var momentProperties = moment.momentProperties;
		if (Object.prototype.toString.call(momentProperties) === '[object Array]') {
			// moment 2.8.1+
			momentProperties.push('_z');
			momentProperties.push('_a');
		} else if (momentProperties) {
			// moment 2.7.0
			momentProperties._z = null;
		}
	
		loadData({
			"version": "2017b",
			"zones": [
				"Africa/Abidjan|GMT|0|0||48e5",
				"Africa/Khartoum|EAT|-30|0||51e5",
				"Africa/Algiers|CET|-10|0||26e5",
				"Africa/Lagos|WAT|-10|0||17e6",
				"Africa/Maputo|CAT|-20|0||26e5",
				"Africa/Cairo|EET EEST|-20 -30|01010|1M2m0 gL0 e10 mn0|15e6",
				"Africa/Casablanca|WET WEST|0 -10|0101010101010101010101010101010101010101010|1H3C0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 Rc0 11A0 e00 e00 U00 11A0 8o0 e00 11A0 11A0 5A0 e00 17c0 1fA0 1a00|32e5",
				"Europe/Paris|CET CEST|-10 -20|01010101010101010101010|1GNB0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|11e6",
				"Africa/Johannesburg|SAST|-20|0||84e5",
				"Africa/Tripoli|EET CET CEST|-20 -10 -20|0120|1IlA0 TA0 1o00|11e5",
				"Africa/Windhoek|WAST WAT|-20 -10|01010101010101010101010|1GQo0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0|32e4",
				"America/Adak|HST HDT|a0 90|01010101010101010101010|1GIc0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|326",
				"America/Anchorage|AKST AKDT|90 80|01010101010101010101010|1GIb0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|30e4",
				"America/Santo_Domingo|AST|40|0||29e5",
				"America/Araguaina|-03 -02|30 20|010|1IdD0 Lz0|14e4",
				"America/Fortaleza|-03|30|0||34e5",
				"America/Asuncion|-03 -04|30 40|01010101010101010101010|1GTf0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0|28e5",
				"America/Panama|EST|50|0||15e5",
				"America/Bahia|-02 -03|20 30|01|1GCq0|27e5",
				"America/Mexico_City|CST CDT|60 50|01010101010101010101010|1GQw0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0|20e6",
				"America/Managua|CST|60|0||22e5",
				"America/La_Paz|-04|40|0||19e5",
				"America/Lima|-05|50|0||11e6",
				"America/Denver|MST MDT|70 60|01010101010101010101010|1GI90 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|26e5",
				"America/Campo_Grande|-03 -04|30 40|01010101010101010101010|1GCr0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0|77e4",
				"America/Cancun|CST CDT EST|60 50 50|01010102|1GQw0 1nX0 14p0 1lb0 14p0 1lb0 Dd0|63e4",
				"America/Caracas|-0430 -04|4u 40|01|1QMT0|29e5",
				"America/Chicago|CST CDT|60 50|01010101010101010101010|1GI80 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|92e5",
				"America/Chihuahua|MST MDT|70 60|01010101010101010101010|1GQx0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0|81e4",
				"America/Phoenix|MST|70|0||42e5",
				"America/Los_Angeles|PST PDT|80 70|01010101010101010101010|1GIa0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|15e6",
				"America/New_York|EST EDT|50 40|01010101010101010101010|1GI70 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|21e6",
				"America/Rio_Branco|-04 -05|40 50|01|1KLE0|31e4",
				"America/Fort_Nelson|PST PDT MST|80 70 70|01010102|1GIa0 1zb0 Op0 1zb0 Op0 1zb0 Op0|39e2",
				"America/Halifax|AST ADT|40 30|01010101010101010101010|1GI60 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|39e4",
				"America/Godthab|-03 -02|30 20|01010101010101010101010|1GNB0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|17e3",
				"America/Grand_Turk|EST EDT AST|50 40 40|010101012|1GI70 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e2",
				"America/Havana|CST CDT|50 40|01010101010101010101010|1GQt0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0|21e5",
				"America/Metlakatla|PST AKST AKDT|80 90 80|0121212121212121|1PAa0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|14e2",
				"America/Miquelon|-03 -02|30 20|01010101010101010101010|1GI50 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|61e2",
				"America/Montevideo|-02 -03|20 30|01010101|1GI40 1o10 11z0 1o10 11z0 1o10 11z0|17e5",
				"America/Noronha|-02|20|0||30e2",
				"America/Port-au-Prince|EST EDT|50 40|010101010101010101010|1GI70 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 3iN0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|23e5",
				"Antarctica/Palmer|-03 -04|30 40|010101010|1H3D0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0|40",
				"America/Santiago|-03 -04|30 40|010101010101010101010|1H3D0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Dd0 1Nb0 Ap0|62e5",
				"America/Sao_Paulo|-02 -03|20 30|01010101010101010101010|1GCq0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0|20e6",
				"Atlantic/Azores|-01 +00|10 0|01010101010101010101010|1GNB0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|25e4",
				"America/St_Johns|NST NDT|3u 2u|01010101010101010101010|1GI5u 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|11e4",
				"Antarctica/Casey|+11 +08|-b0 -80|010|1GAF0 blz0|10",
				"Antarctica/Davis|+05 +07|-50 -70|01|1GAI0|70",
				"Pacific/Port_Moresby|+10|-a0|0||25e4",
				"Pacific/Guadalcanal|+11|-b0|0||11e4",
				"Asia/Tashkent|+05|-50|0||23e5",
				"Pacific/Auckland|NZDT NZST|-d0 -c0|01010101010101010101010|1GQe0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00|14e5",
				"Asia/Baghdad|+03|-30|0||66e5",
				"Antarctica/Troll|+00 +02|0 -20|01010101010101010101010|1GNB0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|40",
				"Asia/Dhaka|+06|-60|0||16e6",
				"Asia/Amman|EET EEST|-20 -30|010101010101010101010|1GPy0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00|25e5",
				"Asia/Kamchatka|+12|-c0|0||18e4",
				"Asia/Baku|+04 +05|-40 -50|010101010|1GNA0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00|27e5",
				"Asia/Bangkok|+07|-70|0||15e6",
				"Asia/Barnaul|+07 +06|-70 -60|010|1N7v0 3rd0",
				"Asia/Beirut|EET EEST|-20 -30|01010101010101010101010|1GNy0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0|22e5",
				"Asia/Manila|+08|-80|0||24e6",
				"Asia/Kolkata|IST|-5u|0||15e6",
				"Asia/Chita|+10 +08 +09|-a0 -80 -90|012|1N7s0 3re0|33e4",
				"Asia/Ulaanbaatar|+08 +09|-80 -90|01010|1O8G0 1cJ0 1cP0 1cJ0|12e5",
				"Asia/Shanghai|CST|-80|0||23e6",
				"Asia/Colombo|+0530|-5u|0||22e5",
				"Asia/Damascus|EET EEST|-20 -30|01010101010101010101010|1GPy0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0|26e5",
				"Asia/Dili|+09|-90|0||19e4",
				"Asia/Dubai|+04|-40|0||39e5",
				"Asia/Famagusta|EET EEST +03|-20 -30 -30|01010101012|1GNB0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 15U0",
				"Asia/Gaza|EET EEST|-20 -30|01010101010101010101010|1GPy0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0|18e5",
				"Asia/Hong_Kong|HKT|-80|0||73e5",
				"Asia/Hovd|+07 +08|-70 -80|01010|1O8H0 1cJ0 1cP0 1cJ0|81e3",
				"Asia/Irkutsk|+09 +08|-90 -80|01|1N7t0|60e4",
				"Europe/Istanbul|EET EEST +03|-20 -30 -30|01010101012|1GNB0 1qM0 11A0 1o00 1200 1nA0 11A0 1tA0 U00 15w0|13e6",
				"Asia/Jakarta|WIB|-70|0||31e6",
				"Asia/Jayapura|WIT|-90|0||26e4",
				"Asia/Jerusalem|IST IDT|-20 -30|01010101010101010101010|1GPA0 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0|81e4",
				"Asia/Kabul|+0430|-4u|0||46e5",
				"Asia/Karachi|PKT|-50|0||24e6",
				"Asia/Kathmandu|+0545|-5J|0||12e5",
				"Asia/Yakutsk|+10 +09|-a0 -90|01|1N7s0|28e4",
				"Asia/Krasnoyarsk|+08 +07|-80 -70|01|1N7u0|10e5",
				"Asia/Magadan|+12 +10 +11|-c0 -a0 -b0|012|1N7q0 3Cq0|95e3",
				"Asia/Makassar|WITA|-80|0||15e5",
				"Europe/Athens|EET EEST|-20 -30|01010101010101010101010|1GNB0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|35e5",
				"Asia/Novosibirsk|+07 +06|-70 -60|010|1N7v0 4eN0|15e5",
				"Asia/Omsk|+07 +06|-70 -60|01|1N7v0|12e5",
				"Asia/Pyongyang|KST KST|-90 -8u|01|1P4D0|29e5",
				"Asia/Rangoon|+0630|-6u|0||48e5",
				"Asia/Sakhalin|+11 +10|-b0 -a0|010|1N7r0 3rd0|58e4",
				"Asia/Seoul|KST|-90|0||23e6",
				"Asia/Srednekolymsk|+12 +11|-c0 -b0|01|1N7q0|35e2",
				"Asia/Tehran|+0330 +0430|-3u -4u|01010101010101010101010|1GLUu 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0|14e6",
				"Asia/Tokyo|JST|-90|0||38e6",
				"Asia/Tomsk|+07 +06|-70 -60|010|1N7v0 3Qp0|10e5",
				"Asia/Vladivostok|+11 +10|-b0 -a0|01|1N7r0|60e4",
				"Asia/Yekaterinburg|+06 +05|-60 -50|01|1N7w0|14e5",
				"Europe/Lisbon|WET WEST|0 -10|01010101010101010101010|1GNB0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|27e5",
				"Atlantic/Cape_Verde|-01|10|0||50e4",
				"Australia/Sydney|AEDT AEST|-b0 -a0|01010101010101010101010|1GQg0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0|40e5",
				"Australia/Adelaide|ACDT ACST|-au -9u|01010101010101010101010|1GQgu 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0|11e5",
				"Australia/Brisbane|AEST|-a0|0||20e5",
				"Australia/Darwin|ACST|-9u|0||12e4",
				"Australia/Eucla|+0845|-8J|0||368",
				"Australia/Lord_Howe|+11 +1030|-b0 -au|01010101010101010101010|1GQf0 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu|347",
				"Australia/Perth|AWST|-80|0||18e5",
				"Pacific/Easter|-05 -06|50 60|010101010101010101010|1H3D0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Dd0 1Nb0 Ap0|30e2",
				"Europe/Dublin|GMT IST|0 -10|01010101010101010101010|1GNB0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|12e5",
				"Pacific/Tahiti|-10|a0|0||18e4",
				"Pacific/Niue|-11|b0|0||12e2",
				"Etc/GMT+12|-12|c0|0|",
				"Pacific/Galapagos|-06|60|0||25e3",
				"Etc/GMT+7|-07|70|0|",
				"Pacific/Pitcairn|-08|80|0||56",
				"Pacific/Gambier|-09|90|0||125",
				"Etc/GMT-1|+01|-10|0|",
				"Pacific/Fakaofo|+13|-d0|0||483",
				"Pacific/Kiritimati|+14|-e0|0||51e2",
				"Etc/GMT-2|+02|-20|0|",
				"Etc/UCT|UCT|0|0|",
				"Etc/UTC|UTC|0|0|",
				"Europe/Astrakhan|+04 +03|-40 -30|010|1N7y0 3rd0",
				"Europe/London|GMT BST|0 -10|01010101010101010101010|1GNB0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|10e6",
				"Europe/Chisinau|EET EEST|-20 -30|01010101010101010101010|1GNA0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|67e4",
				"Europe/Kaliningrad|+03 EET|-30 -20|01|1N7z0|44e4",
				"Europe/Volgograd|+04 +03|-40 -30|01|1N7y0|10e5",
				"Europe/Moscow|MSK MSK|-40 -30|01|1N7y0|16e6",
				"Europe/Saratov|+04 +03|-40 -30|010|1N7y0 5810",
				"Europe/Simferopol|EET EEST MSK MSK|-20 -30 -40 -30|0101023|1GNB0 1qM0 11A0 1o00 11z0 1nW0|33e4",
				"Pacific/Honolulu|HST|a0|0||37e4",
				"MET|MET MEST|-10 -20|01010101010101010101010|1GNB0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0",
				"Pacific/Chatham|+1345 +1245|-dJ -cJ|01010101010101010101010|1GQe0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00|600",
				"Pacific/Apia|+14 +13|-e0 -d0|01010101010101010101010|1GQe0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00|37e3",
				"Pacific/Bougainville|+10 +11|-a0 -b0|01|1NwE0|18e4",
				"Pacific/Fiji|+13 +12|-d0 -c0|01010101010101010101010|1Goe0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 uM0 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1VA0 s00 1VA0|88e4",
				"Pacific/Guam|ChST|-a0|0||17e4",
				"Pacific/Marquesas|-0930|9u|0||86e2",
				"Pacific/Pago_Pago|SST|b0|0||37e2",
				"Pacific/Norfolk|+1130 +11|-bu -b0|01|1PoCu|25e4",
				"Pacific/Tongatapu|+13 +14|-d0 -e0|01010101010101|1S4d0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1VA0 s00 1VA0|75e3"
			],
			"links": [
				"Africa/Abidjan|Africa/Accra",
				"Africa/Abidjan|Africa/Bamako",
				"Africa/Abidjan|Africa/Banjul",
				"Africa/Abidjan|Africa/Bissau",
				"Africa/Abidjan|Africa/Conakry",
				"Africa/Abidjan|Africa/Dakar",
				"Africa/Abidjan|Africa/Freetown",
				"Africa/Abidjan|Africa/Lome",
				"Africa/Abidjan|Africa/Monrovia",
				"Africa/Abidjan|Africa/Nouakchott",
				"Africa/Abidjan|Africa/Ouagadougou",
				"Africa/Abidjan|Africa/Sao_Tome",
				"Africa/Abidjan|Africa/Timbuktu",
				"Africa/Abidjan|America/Danmarkshavn",
				"Africa/Abidjan|Atlantic/Reykjavik",
				"Africa/Abidjan|Atlantic/St_Helena",
				"Africa/Abidjan|Etc/GMT",
				"Africa/Abidjan|Etc/GMT+0",
				"Africa/Abidjan|Etc/GMT-0",
				"Africa/Abidjan|Etc/GMT0",
				"Africa/Abidjan|Etc/Greenwich",
				"Africa/Abidjan|GMT",
				"Africa/Abidjan|GMT+0",
				"Africa/Abidjan|GMT-0",
				"Africa/Abidjan|GMT0",
				"Africa/Abidjan|Greenwich",
				"Africa/Abidjan|Iceland",
				"Africa/Algiers|Africa/Tunis",
				"Africa/Cairo|Egypt",
				"Africa/Casablanca|Africa/El_Aaiun",
				"Africa/Johannesburg|Africa/Maseru",
				"Africa/Johannesburg|Africa/Mbabane",
				"Africa/Khartoum|Africa/Addis_Ababa",
				"Africa/Khartoum|Africa/Asmara",
				"Africa/Khartoum|Africa/Asmera",
				"Africa/Khartoum|Africa/Dar_es_Salaam",
				"Africa/Khartoum|Africa/Djibouti",
				"Africa/Khartoum|Africa/Juba",
				"Africa/Khartoum|Africa/Kampala",
				"Africa/Khartoum|Africa/Mogadishu",
				"Africa/Khartoum|Africa/Nairobi",
				"Africa/Khartoum|Indian/Antananarivo",
				"Africa/Khartoum|Indian/Comoro",
				"Africa/Khartoum|Indian/Mayotte",
				"Africa/Lagos|Africa/Bangui",
				"Africa/Lagos|Africa/Brazzaville",
				"Africa/Lagos|Africa/Douala",
				"Africa/Lagos|Africa/Kinshasa",
				"Africa/Lagos|Africa/Libreville",
				"Africa/Lagos|Africa/Luanda",
				"Africa/Lagos|Africa/Malabo",
				"Africa/Lagos|Africa/Ndjamena",
				"Africa/Lagos|Africa/Niamey",
				"Africa/Lagos|Africa/Porto-Novo",
				"Africa/Maputo|Africa/Blantyre",
				"Africa/Maputo|Africa/Bujumbura",
				"Africa/Maputo|Africa/Gaborone",
				"Africa/Maputo|Africa/Harare",
				"Africa/Maputo|Africa/Kigali",
				"Africa/Maputo|Africa/Lubumbashi",
				"Africa/Maputo|Africa/Lusaka",
				"Africa/Tripoli|Libya",
				"America/Adak|America/Atka",
				"America/Adak|US/Aleutian",
				"America/Anchorage|America/Juneau",
				"America/Anchorage|America/Nome",
				"America/Anchorage|America/Sitka",
				"America/Anchorage|America/Yakutat",
				"America/Anchorage|US/Alaska",
				"America/Campo_Grande|America/Cuiaba",
				"America/Chicago|America/Indiana/Knox",
				"America/Chicago|America/Indiana/Tell_City",
				"America/Chicago|America/Knox_IN",
				"America/Chicago|America/Matamoros",
				"America/Chicago|America/Menominee",
				"America/Chicago|America/North_Dakota/Beulah",
				"America/Chicago|America/North_Dakota/Center",
				"America/Chicago|America/North_Dakota/New_Salem",
				"America/Chicago|America/Rainy_River",
				"America/Chicago|America/Rankin_Inlet",
				"America/Chicago|America/Resolute",
				"America/Chicago|America/Winnipeg",
				"America/Chicago|CST6CDT",
				"America/Chicago|Canada/Central",
				"America/Chicago|US/Central",
				"America/Chicago|US/Indiana-Starke",
				"America/Chihuahua|America/Mazatlan",
				"America/Chihuahua|Mexico/BajaSur",
				"America/Denver|America/Boise",
				"America/Denver|America/Cambridge_Bay",
				"America/Denver|America/Edmonton",
				"America/Denver|America/Inuvik",
				"America/Denver|America/Ojinaga",
				"America/Denver|America/Shiprock",
				"America/Denver|America/Yellowknife",
				"America/Denver|Canada/Mountain",
				"America/Denver|MST7MDT",
				"America/Denver|Navajo",
				"America/Denver|US/Mountain",
				"America/Fortaleza|America/Argentina/Buenos_Aires",
				"America/Fortaleza|America/Argentina/Catamarca",
				"America/Fortaleza|America/Argentina/ComodRivadavia",
				"America/Fortaleza|America/Argentina/Cordoba",
				"America/Fortaleza|America/Argentina/Jujuy",
				"America/Fortaleza|America/Argentina/La_Rioja",
				"America/Fortaleza|America/Argentina/Mendoza",
				"America/Fortaleza|America/Argentina/Rio_Gallegos",
				"America/Fortaleza|America/Argentina/Salta",
				"America/Fortaleza|America/Argentina/San_Juan",
				"America/Fortaleza|America/Argentina/San_Luis",
				"America/Fortaleza|America/Argentina/Tucuman",
				"America/Fortaleza|America/Argentina/Ushuaia",
				"America/Fortaleza|America/Belem",
				"America/Fortaleza|America/Buenos_Aires",
				"America/Fortaleza|America/Catamarca",
				"America/Fortaleza|America/Cayenne",
				"America/Fortaleza|America/Cordoba",
				"America/Fortaleza|America/Jujuy",
				"America/Fortaleza|America/Maceio",
				"America/Fortaleza|America/Mendoza",
				"America/Fortaleza|America/Paramaribo",
				"America/Fortaleza|America/Recife",
				"America/Fortaleza|America/Rosario",
				"America/Fortaleza|America/Santarem",
				"America/Fortaleza|Antarctica/Rothera",
				"America/Fortaleza|Atlantic/Stanley",
				"America/Fortaleza|Etc/GMT+3",
				"America/Halifax|America/Glace_Bay",
				"America/Halifax|America/Goose_Bay",
				"America/Halifax|America/Moncton",
				"America/Halifax|America/Thule",
				"America/Halifax|Atlantic/Bermuda",
				"America/Halifax|Canada/Atlantic",
				"America/Havana|Cuba",
				"America/La_Paz|America/Boa_Vista",
				"America/La_Paz|America/Guyana",
				"America/La_Paz|America/Manaus",
				"America/La_Paz|America/Porto_Velho",
				"America/La_Paz|Brazil/West",
				"America/La_Paz|Etc/GMT+4",
				"America/Lima|America/Bogota",
				"America/Lima|America/Guayaquil",
				"America/Lima|Etc/GMT+5",
				"America/Los_Angeles|America/Dawson",
				"America/Los_Angeles|America/Ensenada",
				"America/Los_Angeles|America/Santa_Isabel",
				"America/Los_Angeles|America/Tijuana",
				"America/Los_Angeles|America/Vancouver",
				"America/Los_Angeles|America/Whitehorse",
				"America/Los_Angeles|Canada/Pacific",
				"America/Los_Angeles|Canada/Yukon",
				"America/Los_Angeles|Mexico/BajaNorte",
				"America/Los_Angeles|PST8PDT",
				"America/Los_Angeles|US/Pacific",
				"America/Los_Angeles|US/Pacific-New",
				"America/Managua|America/Belize",
				"America/Managua|America/Costa_Rica",
				"America/Managua|America/El_Salvador",
				"America/Managua|America/Guatemala",
				"America/Managua|America/Regina",
				"America/Managua|America/Swift_Current",
				"America/Managua|America/Tegucigalpa",
				"America/Managua|Canada/East-Saskatchewan",
				"America/Managua|Canada/Saskatchewan",
				"America/Mexico_City|America/Bahia_Banderas",
				"America/Mexico_City|America/Merida",
				"America/Mexico_City|America/Monterrey",
				"America/Mexico_City|Mexico/General",
				"America/New_York|America/Detroit",
				"America/New_York|America/Fort_Wayne",
				"America/New_York|America/Indiana/Indianapolis",
				"America/New_York|America/Indiana/Marengo",
				"America/New_York|America/Indiana/Petersburg",
				"America/New_York|America/Indiana/Vevay",
				"America/New_York|America/Indiana/Vincennes",
				"America/New_York|America/Indiana/Winamac",
				"America/New_York|America/Indianapolis",
				"America/New_York|America/Iqaluit",
				"America/New_York|America/Kentucky/Louisville",
				"America/New_York|America/Kentucky/Monticello",
				"America/New_York|America/Louisville",
				"America/New_York|America/Montreal",
				"America/New_York|America/Nassau",
				"America/New_York|America/Nipigon",
				"America/New_York|America/Pangnirtung",
				"America/New_York|America/Thunder_Bay",
				"America/New_York|America/Toronto",
				"America/New_York|Canada/Eastern",
				"America/New_York|EST5EDT",
				"America/New_York|US/East-Indiana",
				"America/New_York|US/Eastern",
				"America/New_York|US/Michigan",
				"America/Noronha|Atlantic/South_Georgia",
				"America/Noronha|Brazil/DeNoronha",
				"America/Noronha|Etc/GMT+2",
				"America/Panama|America/Atikokan",
				"America/Panama|America/Cayman",
				"America/Panama|America/Coral_Harbour",
				"America/Panama|America/Jamaica",
				"America/Panama|EST",
				"America/Panama|Jamaica",
				"America/Phoenix|America/Creston",
				"America/Phoenix|America/Dawson_Creek",
				"America/Phoenix|America/Hermosillo",
				"America/Phoenix|MST",
				"America/Phoenix|US/Arizona",
				"America/Rio_Branco|America/Eirunepe",
				"America/Rio_Branco|America/Porto_Acre",
				"America/Rio_Branco|Brazil/Acre",
				"America/Santiago|Chile/Continental",
				"America/Santo_Domingo|America/Anguilla",
				"America/Santo_Domingo|America/Antigua",
				"America/Santo_Domingo|America/Aruba",
				"America/Santo_Domingo|America/Barbados",
				"America/Santo_Domingo|America/Blanc-Sablon",
				"America/Santo_Domingo|America/Curacao",
				"America/Santo_Domingo|America/Dominica",
				"America/Santo_Domingo|America/Grenada",
				"America/Santo_Domingo|America/Guadeloupe",
				"America/Santo_Domingo|America/Kralendijk",
				"America/Santo_Domingo|America/Lower_Princes",
				"America/Santo_Domingo|America/Marigot",
				"America/Santo_Domingo|America/Martinique",
				"America/Santo_Domingo|America/Montserrat",
				"America/Santo_Domingo|America/Port_of_Spain",
				"America/Santo_Domingo|America/Puerto_Rico",
				"America/Santo_Domingo|America/St_Barthelemy",
				"America/Santo_Domingo|America/St_Kitts",
				"America/Santo_Domingo|America/St_Lucia",
				"America/Santo_Domingo|America/St_Thomas",
				"America/Santo_Domingo|America/St_Vincent",
				"America/Santo_Domingo|America/Tortola",
				"America/Santo_Domingo|America/Virgin",
				"America/Sao_Paulo|Brazil/East",
				"America/St_Johns|Canada/Newfoundland",
				"Antarctica/Palmer|America/Punta_Arenas",
				"Asia/Baghdad|Antarctica/Syowa",
				"Asia/Baghdad|Asia/Aden",
				"Asia/Baghdad|Asia/Bahrain",
				"Asia/Baghdad|Asia/Kuwait",
				"Asia/Baghdad|Asia/Qatar",
				"Asia/Baghdad|Asia/Riyadh",
				"Asia/Baghdad|Etc/GMT-3",
				"Asia/Baghdad|Europe/Minsk",
				"Asia/Bangkok|Asia/Ho_Chi_Minh",
				"Asia/Bangkok|Asia/Novokuznetsk",
				"Asia/Bangkok|Asia/Phnom_Penh",
				"Asia/Bangkok|Asia/Saigon",
				"Asia/Bangkok|Asia/Vientiane",
				"Asia/Bangkok|Etc/GMT-7",
				"Asia/Bangkok|Indian/Christmas",
				"Asia/Dhaka|Antarctica/Vostok",
				"Asia/Dhaka|Asia/Almaty",
				"Asia/Dhaka|Asia/Bishkek",
				"Asia/Dhaka|Asia/Dacca",
				"Asia/Dhaka|Asia/Kashgar",
				"Asia/Dhaka|Asia/Qyzylorda",
				"Asia/Dhaka|Asia/Thimbu",
				"Asia/Dhaka|Asia/Thimphu",
				"Asia/Dhaka|Asia/Urumqi",
				"Asia/Dhaka|Etc/GMT-6",
				"Asia/Dhaka|Indian/Chagos",
				"Asia/Dili|Etc/GMT-9",
				"Asia/Dili|Pacific/Palau",
				"Asia/Dubai|Asia/Muscat",
				"Asia/Dubai|Asia/Tbilisi",
				"Asia/Dubai|Asia/Yerevan",
				"Asia/Dubai|Etc/GMT-4",
				"Asia/Dubai|Europe/Samara",
				"Asia/Dubai|Indian/Mahe",
				"Asia/Dubai|Indian/Mauritius",
				"Asia/Dubai|Indian/Reunion",
				"Asia/Gaza|Asia/Hebron",
				"Asia/Hong_Kong|Hongkong",
				"Asia/Jakarta|Asia/Pontianak",
				"Asia/Jerusalem|Asia/Tel_Aviv",
				"Asia/Jerusalem|Israel",
				"Asia/Kamchatka|Asia/Anadyr",
				"Asia/Kamchatka|Etc/GMT-12",
				"Asia/Kamchatka|Kwajalein",
				"Asia/Kamchatka|Pacific/Funafuti",
				"Asia/Kamchatka|Pacific/Kwajalein",
				"Asia/Kamchatka|Pacific/Majuro",
				"Asia/Kamchatka|Pacific/Nauru",
				"Asia/Kamchatka|Pacific/Tarawa",
				"Asia/Kamchatka|Pacific/Wake",
				"Asia/Kamchatka|Pacific/Wallis",
				"Asia/Kathmandu|Asia/Katmandu",
				"Asia/Kolkata|Asia/Calcutta",
				"Asia/Makassar|Asia/Ujung_Pandang",
				"Asia/Manila|Asia/Brunei",
				"Asia/Manila|Asia/Kuala_Lumpur",
				"Asia/Manila|Asia/Kuching",
				"Asia/Manila|Asia/Singapore",
				"Asia/Manila|Etc/GMT-8",
				"Asia/Manila|Singapore",
				"Asia/Rangoon|Asia/Yangon",
				"Asia/Rangoon|Indian/Cocos",
				"Asia/Seoul|ROK",
				"Asia/Shanghai|Asia/Chongqing",
				"Asia/Shanghai|Asia/Chungking",
				"Asia/Shanghai|Asia/Harbin",
				"Asia/Shanghai|Asia/Macao",
				"Asia/Shanghai|Asia/Macau",
				"Asia/Shanghai|Asia/Taipei",
				"Asia/Shanghai|PRC",
				"Asia/Shanghai|ROC",
				"Asia/Tashkent|Antarctica/Mawson",
				"Asia/Tashkent|Asia/Aqtau",
				"Asia/Tashkent|Asia/Aqtobe",
				"Asia/Tashkent|Asia/Ashgabat",
				"Asia/Tashkent|Asia/Ashkhabad",
				"Asia/Tashkent|Asia/Atyrau",
				"Asia/Tashkent|Asia/Dushanbe",
				"Asia/Tashkent|Asia/Oral",
				"Asia/Tashkent|Asia/Samarkand",
				"Asia/Tashkent|Etc/GMT-5",
				"Asia/Tashkent|Indian/Kerguelen",
				"Asia/Tashkent|Indian/Maldives",
				"Asia/Tehran|Iran",
				"Asia/Tokyo|Japan",
				"Asia/Ulaanbaatar|Asia/Choibalsan",
				"Asia/Ulaanbaatar|Asia/Ulan_Bator",
				"Asia/Vladivostok|Asia/Ust-Nera",
				"Asia/Yakutsk|Asia/Khandyga",
				"Atlantic/Azores|America/Scoresbysund",
				"Atlantic/Cape_Verde|Etc/GMT+1",
				"Australia/Adelaide|Australia/Broken_Hill",
				"Australia/Adelaide|Australia/South",
				"Australia/Adelaide|Australia/Yancowinna",
				"Australia/Brisbane|Australia/Lindeman",
				"Australia/Brisbane|Australia/Queensland",
				"Australia/Darwin|Australia/North",
				"Australia/Lord_Howe|Australia/LHI",
				"Australia/Perth|Australia/West",
				"Australia/Sydney|Australia/ACT",
				"Australia/Sydney|Australia/Canberra",
				"Australia/Sydney|Australia/Currie",
				"Australia/Sydney|Australia/Hobart",
				"Australia/Sydney|Australia/Melbourne",
				"Australia/Sydney|Australia/NSW",
				"Australia/Sydney|Australia/Tasmania",
				"Australia/Sydney|Australia/Victoria",
				"Etc/UCT|UCT",
				"Etc/UTC|Etc/Universal",
				"Etc/UTC|Etc/Zulu",
				"Etc/UTC|UTC",
				"Etc/UTC|Universal",
				"Etc/UTC|Zulu",
				"Europe/Astrakhan|Europe/Ulyanovsk",
				"Europe/Athens|Asia/Nicosia",
				"Europe/Athens|EET",
				"Europe/Athens|Europe/Bucharest",
				"Europe/Athens|Europe/Helsinki",
				"Europe/Athens|Europe/Kiev",
				"Europe/Athens|Europe/Mariehamn",
				"Europe/Athens|Europe/Nicosia",
				"Europe/Athens|Europe/Riga",
				"Europe/Athens|Europe/Sofia",
				"Europe/Athens|Europe/Tallinn",
				"Europe/Athens|Europe/Uzhgorod",
				"Europe/Athens|Europe/Vilnius",
				"Europe/Athens|Europe/Zaporozhye",
				"Europe/Chisinau|Europe/Tiraspol",
				"Europe/Dublin|Eire",
				"Europe/Istanbul|Asia/Istanbul",
				"Europe/Istanbul|Turkey",
				"Europe/Lisbon|Atlantic/Canary",
				"Europe/Lisbon|Atlantic/Faeroe",
				"Europe/Lisbon|Atlantic/Faroe",
				"Europe/Lisbon|Atlantic/Madeira",
				"Europe/Lisbon|Portugal",
				"Europe/Lisbon|WET",
				"Europe/London|Europe/Belfast",
				"Europe/London|Europe/Guernsey",
				"Europe/London|Europe/Isle_of_Man",
				"Europe/London|Europe/Jersey",
				"Europe/London|GB",
				"Europe/London|GB-Eire",
				"Europe/Moscow|W-SU",
				"Europe/Paris|Africa/Ceuta",
				"Europe/Paris|Arctic/Longyearbyen",
				"Europe/Paris|Atlantic/Jan_Mayen",
				"Europe/Paris|CET",
				"Europe/Paris|Europe/Amsterdam",
				"Europe/Paris|Europe/Andorra",
				"Europe/Paris|Europe/Belgrade",
				"Europe/Paris|Europe/Berlin",
				"Europe/Paris|Europe/Bratislava",
				"Europe/Paris|Europe/Brussels",
				"Europe/Paris|Europe/Budapest",
				"Europe/Paris|Europe/Busingen",
				"Europe/Paris|Europe/Copenhagen",
				"Europe/Paris|Europe/Gibraltar",
				"Europe/Paris|Europe/Ljubljana",
				"Europe/Paris|Europe/Luxembourg",
				"Europe/Paris|Europe/Madrid",
				"Europe/Paris|Europe/Malta",
				"Europe/Paris|Europe/Monaco",
				"Europe/Paris|Europe/Oslo",
				"Europe/Paris|Europe/Podgorica",
				"Europe/Paris|Europe/Prague",
				"Europe/Paris|Europe/Rome",
				"Europe/Paris|Europe/San_Marino",
				"Europe/Paris|Europe/Sarajevo",
				"Europe/Paris|Europe/Skopje",
				"Europe/Paris|Europe/Stockholm",
				"Europe/Paris|Europe/Tirane",
				"Europe/Paris|Europe/Vaduz",
				"Europe/Paris|Europe/Vatican",
				"Europe/Paris|Europe/Vienna",
				"Europe/Paris|Europe/Warsaw",
				"Europe/Paris|Europe/Zagreb",
				"Europe/Paris|Europe/Zurich",
				"Europe/Paris|Poland",
				"Europe/Volgograd|Europe/Kirov",
				"Pacific/Auckland|Antarctica/McMurdo",
				"Pacific/Auckland|Antarctica/South_Pole",
				"Pacific/Auckland|NZ",
				"Pacific/Chatham|NZ-CHAT",
				"Pacific/Easter|Chile/EasterIsland",
				"Pacific/Fakaofo|Etc/GMT-13",
				"Pacific/Fakaofo|Pacific/Enderbury",
				"Pacific/Galapagos|Etc/GMT+6",
				"Pacific/Gambier|Etc/GMT+9",
				"Pacific/Guadalcanal|Antarctica/Macquarie",
				"Pacific/Guadalcanal|Etc/GMT-11",
				"Pacific/Guadalcanal|Pacific/Efate",
				"Pacific/Guadalcanal|Pacific/Kosrae",
				"Pacific/Guadalcanal|Pacific/Noumea",
				"Pacific/Guadalcanal|Pacific/Pohnpei",
				"Pacific/Guadalcanal|Pacific/Ponape",
				"Pacific/Guam|Pacific/Saipan",
				"Pacific/Honolulu|HST",
				"Pacific/Honolulu|Pacific/Johnston",
				"Pacific/Honolulu|US/Hawaii",
				"Pacific/Kiritimati|Etc/GMT-14",
				"Pacific/Niue|Etc/GMT+11",
				"Pacific/Pago_Pago|Pacific/Midway",
				"Pacific/Pago_Pago|Pacific/Samoa",
				"Pacific/Pago_Pago|US/Samoa",
				"Pacific/Pitcairn|Etc/GMT+8",
				"Pacific/Port_Moresby|Antarctica/DumontDUrville",
				"Pacific/Port_Moresby|Etc/GMT-10",
				"Pacific/Port_Moresby|Pacific/Chuuk",
				"Pacific/Port_Moresby|Pacific/Truk",
				"Pacific/Port_Moresby|Pacific/Yap",
				"Pacific/Tahiti|Etc/GMT+10",
				"Pacific/Tahiti|Pacific/Rarotonga"
			]
		});
	
	
		return moment;
	}));


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(37);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(39)(content, {"singleton":true});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../css-loader/index.js?minimize!../../autoprefixer-loader/index.js!./fullcalendar.css", function() {
				var newContent = require("!!../../css-loader/index.js?minimize!../../autoprefixer-loader/index.js!./fullcalendar.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!\n * FullCalendar v3.5.1 Stylesheet\n * Docs & License: https://fullcalendar.io/\n * (c) 2017 Adam Shaw\n */.fc{direction:ltr;text-align:left}.fc-rtl{text-align:right}body .fc{font-size:1em}.fc-highlight{background:#bce8f1;opacity:.3}.fc-bgevent{background:#8fdf82;opacity:.3}.fc-nonbusiness{background:#d7d7d7}.fc button{box-sizing:border-box;margin:0;height:2.1em;padding:0 .6em;font-size:1em;white-space:nowrap;cursor:pointer}.fc button::-moz-focus-inner{margin:0;padding:0}.fc-state-default{border:1px solid}.fc-state-default.fc-corner-left{border-top-left-radius:4px;border-bottom-left-radius:4px}.fc-state-default.fc-corner-right{border-top-right-radius:4px;border-bottom-right-radius:4px}.fc button .fc-icon{position:relative;top:-.05em;margin:0 .2em;vertical-align:middle}.fc-state-default{background-color:#f5f5f5;background-image:linear-gradient(180deg,#fff,#e6e6e6);background-repeat:repeat-x;border-color:#e6e6e6 #e6e6e6 #bfbfbf;border-color:rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);color:#333;text-shadow:0 1px 1px hsla(0,0%,100%,.75);box-shadow:inset 0 1px 0 hsla(0,0%,100%,.2),0 1px 2px rgba(0,0,0,.05)}.fc-state-active,.fc-state-disabled,.fc-state-down,.fc-state-hover{color:#333;background-color:#e6e6e6}.fc-state-hover{color:#333;text-decoration:none;background-position:0 -15px;transition:background-position .1s linear}.fc-state-active,.fc-state-down{background-color:#ccc;background-image:none;box-shadow:inset 0 2px 4px rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.05)}.fc-state-disabled{cursor:default;background-image:none;opacity:.65;box-shadow:none}.fc-button-group{display:inline-block}.fc .fc-button-group>*{float:left;margin:0 0 0 -1px}.fc .fc-button-group>:first-child{margin-left:0}.fc-popover{position:absolute;box-shadow:0 2px 6px rgba(0,0,0,.15)}.fc-popover .fc-header{padding:2px 4px}.fc-popover .fc-header .fc-title{margin:0 2px}.fc-popover .fc-header .fc-close{cursor:pointer}.fc-ltr .fc-popover .fc-header .fc-title,.fc-rtl .fc-popover .fc-header .fc-close{float:left}.fc-ltr .fc-popover .fc-header .fc-close,.fc-rtl .fc-popover .fc-header .fc-title{float:right}.fc-divider{border-style:solid;border-width:1px}hr.fc-divider{height:0;margin:0;padding:0 0 2px;border-width:1px 0}.fc-clear{clear:both}.fc-bg,.fc-bgevent-skeleton,.fc-helper-skeleton,.fc-highlight-skeleton{position:absolute;top:0;left:0;right:0}.fc-bg{bottom:0}.fc-bg table{height:100%}.fc table{width:100%;box-sizing:border-box;table-layout:fixed;border-collapse:collapse;border-spacing:0;font-size:1em}.fc th{text-align:center}.fc td,.fc th{border-style:solid;border-width:1px;padding:0;vertical-align:top}.fc td.fc-today{border-style:double}a[data-goto]{cursor:pointer}a[data-goto]:hover{text-decoration:underline}.fc .fc-row{border-style:solid;border-width:0}.fc-row table{border-left:0 hidden transparent;border-right:0 hidden transparent;border-bottom:0 hidden transparent}.fc-row:first-child table{border-top:0 hidden transparent}.fc-row{position:relative}.fc-row .fc-bg{z-index:1}.fc-row .fc-bgevent-skeleton,.fc-row .fc-highlight-skeleton{bottom:0}.fc-row .fc-bgevent-skeleton table,.fc-row .fc-highlight-skeleton table{height:100%}.fc-row .fc-bgevent-skeleton td,.fc-row .fc-highlight-skeleton td{border-color:transparent}.fc-row .fc-bgevent-skeleton{z-index:2}.fc-row .fc-highlight-skeleton{z-index:3}.fc-row .fc-content-skeleton{position:relative;z-index:4;padding-bottom:2px}.fc-row .fc-helper-skeleton{z-index:5}.fc .fc-row .fc-content-skeleton table,.fc .fc-row .fc-content-skeleton td,.fc .fc-row .fc-helper-skeleton td{background:none;border-color:transparent}.fc-row .fc-content-skeleton td,.fc-row .fc-helper-skeleton td{border-bottom:0}.fc-row .fc-content-skeleton tbody td,.fc-row .fc-helper-skeleton tbody td{border-top:0}.fc-scroller{-webkit-overflow-scrolling:touch}.fc-scroller>.fc-day-grid,.fc-scroller>.fc-time-grid{position:relative;width:100%}.fc-event{position:relative;display:block;font-size:.85em;line-height:1.3;border-radius:3px;border:1px solid #3a87ad}.fc-event,.fc-event-dot{background-color:#3a87ad}.fc-event,.fc-event:hover{color:#fff;text-decoration:none}.fc-event.fc-draggable,.fc-event[href]{cursor:pointer}.fc-not-allowed,.fc-not-allowed .fc-event{cursor:not-allowed}.fc-event .fc-bg{z-index:1;background:#fff;opacity:.25}.fc-event .fc-content{position:relative;z-index:2}.fc-event .fc-resizer{position:absolute;z-index:4;display:none}.fc-event.fc-allow-mouse-resize .fc-resizer,.fc-event.fc-selected .fc-resizer{display:block}.fc-event.fc-selected .fc-resizer:before{content:\"\";position:absolute;z-index:9999;top:50%;left:50%;width:40px;height:40px;margin-left:-20px;margin-top:-20px}.fc-event.fc-selected{z-index:9999!important;box-shadow:0 2px 5px rgba(0,0,0,.2)}.fc-event.fc-selected.fc-dragging{box-shadow:0 2px 7px rgba(0,0,0,.3)}.fc-h-event.fc-selected:before{content:\"\";position:absolute;z-index:3;top:-10px;bottom:-10px;left:0;right:0}.fc-ltr .fc-h-event.fc-not-start,.fc-rtl .fc-h-event.fc-not-end{margin-left:0;border-left-width:0;padding-left:1px;border-top-left-radius:0;border-bottom-left-radius:0}.fc-ltr .fc-h-event.fc-not-end,.fc-rtl .fc-h-event.fc-not-start{margin-right:0;border-right-width:0;padding-right:1px;border-top-right-radius:0;border-bottom-right-radius:0}.fc-ltr .fc-h-event .fc-start-resizer,.fc-rtl .fc-h-event .fc-end-resizer{cursor:w-resize;left:-1px}.fc-ltr .fc-h-event .fc-end-resizer,.fc-rtl .fc-h-event .fc-start-resizer{cursor:e-resize;right:-1px}.fc-h-event.fc-allow-mouse-resize .fc-resizer{width:7px;top:-1px;bottom:-1px}.fc-h-event.fc-selected .fc-resizer{border-radius:4px;border-width:1px;width:6px;height:6px;border-style:solid;border-color:inherit;background:#fff;top:50%;margin-top:-4px}.fc-ltr .fc-h-event.fc-selected .fc-start-resizer,.fc-rtl .fc-h-event.fc-selected .fc-end-resizer{margin-left:-4px}.fc-ltr .fc-h-event.fc-selected .fc-end-resizer,.fc-rtl .fc-h-event.fc-selected .fc-start-resizer{margin-right:-4px}.fc-day-grid-event{margin:1px 2px 0;padding:0 1px}tr:first-child>td>.fc-day-grid-event{margin-top:2px}.fc-day-grid-event.fc-selected:after{content:\"\";position:absolute;z-index:1;top:-1px;right:-1px;bottom:-1px;left:-1px;background:#000;opacity:.25}.fc-day-grid-event .fc-content{white-space:nowrap;overflow:hidden}.fc-day-grid-event .fc-time{font-weight:700}.fc-ltr .fc-day-grid-event.fc-allow-mouse-resize .fc-start-resizer,.fc-rtl .fc-day-grid-event.fc-allow-mouse-resize .fc-end-resizer{margin-left:-2px}.fc-ltr .fc-day-grid-event.fc-allow-mouse-resize .fc-end-resizer,.fc-rtl .fc-day-grid-event.fc-allow-mouse-resize .fc-start-resizer{margin-right:-2px}a.fc-more{margin:1px 3px;font-size:.85em;cursor:pointer;text-decoration:none}a.fc-more:hover{text-decoration:underline}.fc-limited{display:none}.fc-day-grid .fc-row{z-index:1}.fc-more-popover{z-index:2;width:220px}.fc-more-popover .fc-event-container{padding:10px}.fc-now-indicator{position:absolute;border:0 solid red}.fc-unselectable{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.fc-unthemed .fc-content,.fc-unthemed .fc-divider,.fc-unthemed .fc-list-heading td,.fc-unthemed .fc-list-view,.fc-unthemed .fc-popover,.fc-unthemed .fc-row,.fc-unthemed tbody,.fc-unthemed td,.fc-unthemed th,.fc-unthemed thead{border-color:#ddd}.fc-unthemed .fc-popover{background-color:#fff}.fc-unthemed .fc-divider,.fc-unthemed .fc-list-heading td,.fc-unthemed .fc-popover .fc-header{background:#eee}.fc-unthemed .fc-popover .fc-header .fc-close{color:#666}.fc-unthemed td.fc-today{background:#fcf8e3}.fc-unthemed .fc-disabled-day{background:#d7d7d7;opacity:.3}.fc-icon{display:inline-block;height:1em;line-height:1em;font-size:1em;text-align:center;overflow:hidden;font-family:Courier New,Courier,monospace;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.fc-icon:after{position:relative}.fc-icon-left-single-arrow:after{content:\"\\2039\";font-weight:700;font-size:200%;top:-7%}.fc-icon-right-single-arrow:after{content:\"\\203A\";font-weight:700;font-size:200%;top:-7%}.fc-icon-left-double-arrow:after{content:\"\\AB\";font-size:160%;top:-7%}.fc-icon-right-double-arrow:after{content:\"\\BB\";font-size:160%;top:-7%}.fc-icon-left-triangle:after{content:\"\\25C4\";font-size:125%;top:3%}.fc-icon-right-triangle:after{content:\"\\25BA\";font-size:125%;top:3%}.fc-icon-down-triangle:after{content:\"\\25BC\";font-size:125%;top:2%}.fc-icon-x:after{content:\"\\D7\";font-size:200%;top:6%}.fc-unthemed .fc-popover{border-width:1px;border-style:solid}.fc-unthemed .fc-popover .fc-header .fc-close{font-size:.9em;margin-top:2px}.fc-unthemed .fc-list-item:hover td{background-color:#f5f5f5}.ui-widget .fc-disabled-day{background-image:none}.fc-popover>.ui-widget-header+.ui-widget-content{border-top:0}.ui-widget .fc-event{color:#fff;text-decoration:none;font-weight:400}.ui-widget td.fc-axis{font-weight:400}.fc-time-grid .fc-slats .ui-widget-content{background:none}.fc.fc-bootstrap3 a{text-decoration:none}.fc.fc-bootstrap3 a[data-goto]:hover{text-decoration:underline}.fc-bootstrap3 hr.fc-divider{border-color:inherit}.fc-bootstrap3 .fc-today.alert{border-radius:0}.fc-bootstrap3 .fc-popover .panel-body{padding:0}.fc-bootstrap3 .fc-time-grid .fc-slats table{background:none}.fc-toolbar{text-align:center}.fc-toolbar.fc-header-toolbar{margin-bottom:1em}.fc-toolbar.fc-footer-toolbar{margin-top:1em}.fc-toolbar .fc-left{float:left}.fc-toolbar .fc-right{float:right}.fc-toolbar .fc-center{display:inline-block}.fc .fc-toolbar>*>*{float:left;margin-left:.75em}.fc .fc-toolbar>*>:first-child{margin-left:0}.fc-toolbar h2{margin:0}.fc-toolbar button{position:relative}.fc-toolbar .fc-state-hover,.fc-toolbar .ui-state-hover{z-index:2}.fc-toolbar .fc-state-down{z-index:3}.fc-toolbar .fc-state-active,.fc-toolbar .ui-state-active{z-index:4}.fc-toolbar button:focus{z-index:5}.fc-view-container *,.fc-view-container :after,.fc-view-container :before{box-sizing:content-box}.fc-view,.fc-view>table{position:relative;z-index:1}.fc-basicDay-view .fc-content-skeleton,.fc-basicWeek-view .fc-content-skeleton{padding-bottom:1em}.fc-basic-view .fc-body .fc-row{min-height:4em}.fc-row.fc-rigid{overflow:hidden}.fc-row.fc-rigid .fc-content-skeleton{position:absolute;top:0;left:0;right:0}.fc-day-top.fc-other-month{opacity:.3}.fc-basic-view .fc-day-number,.fc-basic-view .fc-week-number{padding:2px}.fc-basic-view th.fc-day-number,.fc-basic-view th.fc-week-number{padding:0 2px}.fc-ltr .fc-basic-view .fc-day-top .fc-day-number{float:right}.fc-rtl .fc-basic-view .fc-day-top .fc-day-number{float:left}.fc-ltr .fc-basic-view .fc-day-top .fc-week-number{float:left;border-radius:0 0 3px 0}.fc-rtl .fc-basic-view .fc-day-top .fc-week-number{float:right;border-radius:0 0 0 3px}.fc-basic-view .fc-day-top .fc-week-number{min-width:1.5em;text-align:center;background-color:#f2f2f2;color:gray}.fc-basic-view td.fc-week-number{text-align:center}.fc-basic-view td.fc-week-number>*{display:inline-block;min-width:1.25em}.fc-agenda-view .fc-day-grid{position:relative;z-index:2}.fc-agenda-view .fc-day-grid .fc-row{min-height:3em}.fc-agenda-view .fc-day-grid .fc-row .fc-content-skeleton{padding-bottom:1em}.fc .fc-axis{vertical-align:middle;padding:0 4px;white-space:nowrap}.fc-ltr .fc-axis{text-align:right}.fc-rtl .fc-axis{text-align:left}.fc-time-grid,.fc-time-grid-container{position:relative;z-index:1}.fc-time-grid{min-height:100%}.fc-time-grid table{border:0 hidden transparent}.fc-time-grid>.fc-bg{z-index:1}.fc-time-grid .fc-slats,.fc-time-grid>hr{position:relative;z-index:2}.fc-time-grid .fc-content-col{position:relative}.fc-time-grid .fc-content-skeleton{position:absolute;z-index:3;top:0;left:0;right:0}.fc-time-grid .fc-business-container{position:relative;z-index:1}.fc-time-grid .fc-bgevent-container{position:relative;z-index:2}.fc-time-grid .fc-highlight-container{z-index:3}.fc-time-grid .fc-event-container{position:relative;z-index:4}.fc-time-grid .fc-now-indicator-line{z-index:5}.fc-time-grid .fc-helper-container{position:relative;z-index:6}.fc-time-grid .fc-slats td{height:1.5em;border-bottom:0}.fc-time-grid .fc-slats .fc-minor td{border-top-style:dotted}.fc-time-grid .fc-highlight-container{position:relative}.fc-time-grid .fc-highlight{position:absolute;left:0;right:0}.fc-ltr .fc-time-grid .fc-event-container{margin:0 2.5% 0 2px}.fc-rtl .fc-time-grid .fc-event-container{margin:0 2px 0 2.5%}.fc-time-grid .fc-bgevent,.fc-time-grid .fc-event{position:absolute;z-index:1}.fc-time-grid .fc-bgevent{left:0;right:0}.fc-v-event.fc-not-start{border-top-width:0;padding-top:1px;border-top-left-radius:0;border-top-right-radius:0}.fc-v-event.fc-not-end{border-bottom-width:0;padding-bottom:1px;border-bottom-left-radius:0;border-bottom-right-radius:0}.fc-time-grid-event{overflow:hidden}.fc-time-grid-event.fc-selected{overflow:visible}.fc-time-grid-event.fc-selected .fc-bg{display:none}.fc-time-grid-event .fc-content{overflow:hidden}.fc-time-grid-event .fc-time,.fc-time-grid-event .fc-title{padding:0 1px}.fc-time-grid-event .fc-time{font-size:.85em;white-space:nowrap}.fc-time-grid-event.fc-short .fc-content{white-space:nowrap}.fc-time-grid-event.fc-short .fc-time,.fc-time-grid-event.fc-short .fc-title{display:inline-block;vertical-align:top}.fc-time-grid-event.fc-short .fc-time span{display:none}.fc-time-grid-event.fc-short .fc-time:before{content:attr(data-start)}.fc-time-grid-event.fc-short .fc-time:after{content:\"\\A0-\\A0\"}.fc-time-grid-event.fc-short .fc-title{font-size:.85em;padding:0}.fc-time-grid-event.fc-allow-mouse-resize .fc-resizer{left:0;right:0;bottom:0;height:8px;overflow:hidden;line-height:8px;font-size:11px;font-family:monospace;text-align:center;cursor:s-resize}.fc-time-grid-event.fc-allow-mouse-resize .fc-resizer:after{content:\"=\"}.fc-time-grid-event.fc-selected .fc-resizer{border-radius:5px;border-width:1px;width:8px;height:8px;border-style:solid;border-color:inherit;background:#fff;left:50%;margin-left:-5px;bottom:-5px}.fc-time-grid .fc-now-indicator-line{border-top-width:1px;left:0;right:0}.fc-time-grid .fc-now-indicator-arrow{margin-top:-5px}.fc-ltr .fc-time-grid .fc-now-indicator-arrow{left:0;border-width:5px 0 5px 6px;border-top-color:transparent;border-bottom-color:transparent}.fc-rtl .fc-time-grid .fc-now-indicator-arrow{right:0;border-width:5px 6px 5px 0;border-top-color:transparent;border-bottom-color:transparent}.fc-event-dot{display:inline-block;width:10px;height:10px;border-radius:5px}.fc-rtl .fc-list-view{direction:rtl}.fc-list-view{border-width:1px;border-style:solid}.fc .fc-list-table{table-layout:auto}.fc-list-table td{border-width:1px 0 0;padding:8px 14px}.fc-list-table tr:first-child td{border-top-width:0}.fc-list-heading{border-bottom-width:1px}.fc-list-heading td{font-weight:700}.fc-ltr .fc-list-heading-main{float:left}.fc-ltr .fc-list-heading-alt,.fc-rtl .fc-list-heading-main{float:right}.fc-rtl .fc-list-heading-alt{float:left}.fc-list-item.fc-has-url{cursor:pointer}.fc-list-item-marker,.fc-list-item-time{white-space:nowrap;width:1px}.fc-ltr .fc-list-item-marker{padding-right:0}.fc-rtl .fc-list-item-marker{padding-left:0}.fc-list-item-title a{text-decoration:none;color:inherit}.fc-list-item-title a[href]:hover{text-decoration:underline}.fc-list-empty-wrap2{position:absolute;top:0;left:0;right:0;bottom:0}.fc-list-empty-wrap1{width:100%;height:100%;display:table}.fc-list-empty{display:table-cell;vertical-align:middle;text-align:center}.fc-unthemed .fc-list-empty{background-color:#eee}", ""]);
	
	// exports


/***/ }),
/* 38 */
/***/ (function(module, exports) {

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


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

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
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
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


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(41);
	
	/*
	 * Utily functions
	 */
	
	module.exports = {
	
	  isFunction: function(object) {
	   return !!(object && object.constructor && object.call && object.apply);
	  },
	
	  isArray: function(object) {
	   return object && object.constructor === Array;
	  },
	
	  doCallback: function(hook, config, arg, deprecated) {
	    if(config.callbacks && this.isFunction(config.callbacks[hook])) {
	      if (deprecated) { this.logDeprecated(hook + ' callback has been replaced, please see docs'); }
	      config.callbacks[hook](arg);
	    }
	    this.logDebug(['Trigger callback "' + hook + '" with arguments:', arg], config);
	  },
	
	  logDebug: function(message, config) {
	    if (config && config.debug) console.log('TimekitBooking Debug: ', message);
	  },
	
	  logError: function(message) {
	    console.warn('TimekitBooking Error: ', message);
	  },
	
	  logDeprecated: function(message) {
	    console.warn('TimekitBooking Deprecated: ', message);
	  }
	
	};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

	// Console-polyfill. MIT license.
	// https://github.com/paulmillr/console-polyfill
	// Make it safe to do console.log() always.
	(function(global) {
	  'use strict';
	  if (!global.console) {
	    global.console = {};
	  }
	  var con = global.console;
	  var prop, method;
	  var dummy = function() {};
	  var properties = ['memory'];
	  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
	     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
	     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
	  while (prop = properties.pop()) if (!con[prop]) con[prop] = {};
	  while (method = methods.pop()) if (typeof con[method] !== 'function') con[method] = dummy;
	  // Using `this` for web workers & supports Browserify / Webpack.
	})(typeof window === 'undefined' ? this : window);


/***/ }),
/* 42 */
/***/ (function(module, exports) {

	'use strict';
	
	/*
	 * Default configuration
	 */
	
	var primary = {
	
	  targetEl: '#bookingjs',
	  name: '',
	  avatar: '',
	  autoload: true,
	  disableRemoteLoad: false,
	  disableConfirmPage: false,
	  showCredits: true,
	  goToFirstEvent: true,
	  bookingGraph: 'instant',
	  debug: false,
	  availabilityView: 'agendaWeek',
	  bookingFields: {
	    name: {
	      placeholder: 'Full name',
	      prefilled: false,
	      locked: false
	    },
	    email: {
	      placeholder: 'E-mail',
	      prefilled: false,
	      locked: false
	    },
	    comment: {
	      enabled: true,
	      placeholder: 'Comment',
	      prefilled: false,
	      required: false,
	      locked: false
	    },
	    phone: {
	      enabled: false,
	      placeholder: 'Phone number',
	      prefilled: false,
	      required: false,
	      locked: false
	    },
	    voip: {
	      enabled: false,
	      placeholder: 'Skype username',
	      prefilled: false,
	      required: false,
	      locked: false
	    },
	    location: {
	      enabled: false,
	      placeholder: 'Location',
	      prefilled: false,
	      required: false,
	      locked: false
	    }
	  },
	  timekitFindTime: {
	    future: '4 weeks',
	    length: '1 hour'
	  },
	  timekitConfig: {},
	  timekitCreateBooking: { },
	  timekitUpdateBooking: { },
	  fullCalendar: {
	    views: {
	      agenda: {
	        displayEventEnd: false
	      },
	      listing: {
	        type: 'list',
	        duration: { days: 365 / 2 },
	        listDayAltFormat: 'dddd',
	        noEventsMessage: 'No timeslots available'
	      }
	    },
	    allDaySlot: false,
	    scrollTime: '08:00:00',
	    timezone: 'local',
	    nowIndicator: true
	  },
	  localization: {
	    showTimezoneHelper: true,
	    timeDateFormat: '12h-mdy-sun',
	    strings: {
	      submitText: 'Book it',
	      successMessageTitle: 'Thanks!',
	      timezoneHelperLoading: 'Loading..',
	      timezoneHelperDifferent: 'Your timezone is %s hours %s %s (calendar shown in your local time)',
	      timezoneHelperSame: 'You are in the same timezone as %s'
	    }
	  },
	  callbacks: {}
	
	};
	
	// Preset: bookingGraph = 'instant'
	var bookingInstant = {
	
	  timekitCreateBooking: {
	    graph: 'instant',
	    action: 'confirm',
	    event: {
	      invite: true,
	      my_rsvp: 'accepted',
	      sync_provider: true
	    }
	  },
	  localization: {
	    strings: {
	      successMessageBody: 'An invitation has been sent to: <br /> %s <br /><br /> Please accept the invitation to confirm the booking.'
	    }
	  }
	
	};
	
	// Preset: bookingGraph = 'instant_payment'
	var bookingInstantPayment = {
	
	  timekitCreateBooking: {
	    graph: 'instant_payment',
	    action: 'tentative',
	    event: {
	      invite: true,
	      my_rsvp: 'accepted',
	      sync_provider: true
	    }
	  },
	  localization: {
	    strings: {
	      successMessageBody: "We have received your payment and reserved your timeslot.<br /><br />Have a great day!"
	    }
	  }
	
	};
	
	// Preset: bookingGraph = 'confirm_decline'
	var bookingConfirmDecline = {
	
	  timekitCreateBooking: {
	    graph: 'confirm_decline',
	    action: 'create',
	    event: {
	      invite: true,
	      my_rsvp: 'accepted',
	      sync_provider: true
	    }
	  },
	  localization: {
	    strings: {
	      successMessageBody: "We have received your request and we'll be in touch when we have reviewed it. <br /><br />Have a great day!"
	    }
	  }
	
	};
	
	// Preset: bookingGraph = 'group_customer'
	var bookingGroupCustomer = {
	
	  timekitCreateBooking: {
	    graph: 'group_customer',
	    action: 'create',
	  },
	  localization: {
	    strings: {
	      successMessageBody: "Your seat has been reserved and we've sent you a confirmation by email. <br /><br />Have a great day!"
	    }
	  }
	
	};
	
	// Preset: bookingGraph = 'group_customer_payment'
	var bookingGroupCustomerPayment = {
	
	  timekitCreateBooking: {
	    graph: 'group_customer_payment',
	    action: 'create',
	  },
	  localization: {
	    strings: {
	      successMessageBody: "We have received your payment and reserved a seat for you.<br /><br />Have a great day!"
	    }
	  }
	
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
	        columnFormat: 'ddd D/M',
	        slotLabelFormat: 'HH:mm'
	      }
	    }
	  },
	  localization: {
	    bookingDateFormat: 'D. MMMM YYYY',
	    bookingTimeFormat: 'HH:mm',
	    emailTimeFormat: 'H:i'
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
	        columnFormat: 'ddd M/D',
	        slotLabelFormat: 'h:mma'
	      }
	    },
	  },
	  localization: {
	    bookingDateFormat: 'MMMM D, YYYY',
	    bookingTimeFormat: 'h:mma',
	    emailTimeFormat: 'h:ia'
	  }
	
	};
	
	// Preset: availabilityView = 'agendaWeek'
	var availabilityViewAgendaWeek = {
	
	  fullCalendar: {
	    header: {
	      left: '',
	      center: '',
	      right: 'today, prev, next'
	    },
	    defaultView: 'agendaWeek'
	  }
	
	}
	
	// Preset: availabilityView = 'listing'
	var availabilityViewListing = {
	
	  fullCalendar: {
	    header: {
	      left: '',
	      center: '',
	      right: ''
	    },
	    defaultView: 'listing'
	  }
	
	}
	
	// Export objects
	module.exports = {
	  primary: primary,
	  presets: {
	    timeDateFormat: {
	      '24h-dmy-mon': timeDateFormat24hdmymon,
	      '12h-mdy-sun': timeDateFormat12hmdysun
	    },
	    bookingGraph: {
	      'instant': bookingInstant,
	      'instant_payment': bookingInstantPayment,
	      'confirm_decline': bookingConfirmDecline,
	      'group_customer': bookingGroupCustomer,
	      'group_customer_payment': bookingGroupCustomerPayment
	    },
	    availabilityView: {
	      'agendaWeek': availabilityViewAgendaWeek,
	      'listing': availabilityViewListing
	    }
	  }
	};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(44);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(39)(content, {"singleton":true});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js?minimize!../../node_modules/autoprefixer-loader/index.js!../../node_modules/sass-loader/index.js!./fullcalendar.scss", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js?minimize!../../node_modules/autoprefixer-loader/index.js!../../node_modules/sass-loader/index.js!./fullcalendar.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600);", ""]);
	
	// module
	exports.push([module.id, ".fc-view-container{background-color:#fbfbfb;color:#333}.fc-row.fc-widget-header{border-bottom:1px solid #ececec}.fc-row.fc-widget-header .fc-day-header{font-size:12px;font-weight:600;color:#acacac}.fc-axis{color:#acacac;font-size:.9em}.fc-state-default{text-shadow:none;box-shadow:none;background-image:none;background-color:#fff;border-color:#fff}.fc-button{text-transform:uppercase;font-weight:600;font-size:1.1em;border:0;outline:none}.fc-button:active,.fc-button:focus,.fc-button:hover,.fc-button:visited{outline:none;border:0;background-color:transparent}.fc-content-skeleton{border-top:1px solid #ddd}.fc .fc-toolbar{padding:0;margin-bottom:0;border-bottom:1px solid #ececec;min-height:48px}.fc .fc-toolbar>*>button{padding:15px 17px;height:auto;outline:0;margin-left:0;transition:opacity .2s ease;opacity:.3}.fc .fc-toolbar>*>button:hover{opacity:1}.fc .fc-toolbar>*>button.fc-state-disabled{transition:opacity 0s;opacity:0}.fc .fc-toolbar>*>button.fc-prev-button{padding-right:8px}.fc .fc-toolbar>*>button.fc-next-button{padding-left:8px}.fc .fc-toolbar>*>button .fc-icon{font-size:1.1em}.fc .fc-toolbar>.fc-right>button.fc-today-button{padding:15px 5px}.fc .fc-toolbar>.fc-right h2{font-size:13px;padding:15px 0 15px 20px;color:#333;font-weight:600}.fc-unthemed td.fc-today{background:#fff}.fc-body>tr>.fc-widget-content,.fc-head>tr>.fc-widget-header{border:0!important}.fc th{border-color:#fff;padding:5px}.fc-unthemed .fc-divider,.fc-unthemed .fc-popover .fc-header{background-color:transparent}.empty-calendar .fc-event{opacity:0}.fc-event{transition:color .2s ease,border-color .2s ease,opacity .6s ease,box-shadow .2s ease;border:none;border-left:2px solid #939393;padding:3px;background-color:#fff;border-radius:3px;color:#333;margin:1px 0;box-shadow:0 1px 2px rgba(0,0,0,.07);cursor:pointer;margin-bottom:2px;opacity:1}.fc-event-clicked,.fc-event:hover{box-shadow:0 2px 4px rgba(0,0,0,.12);border-left:3px solid #2e5bec;color:#2e5bec;font-weight:600;padding-left:2px}.fc-event .fc-content{-webkit-transform:translateX(0);transform:translateX(0);transition:-webkit-transform .2s ease;transition:transform .2s ease;transition:transform .2s ease,-webkit-transform .2s ease}.fc-event:hover .fc-content{-webkit-transform:translateX(2px);transform:translateX(2px)}.fc-event .fc-bg{opacity:0}.fc-day-grid-event{padding:13px 15px;margin:1px 0 3px}.fc-day-grid-event-clicked,.fc-day-grid-event:hover{padding-left:14px}.fc-day-grid-event .fc-time,.fc-day-grid-event .fc-title{font-size:12px;font-weight:500}.fc-day-grid-event .fc-title{padding:0 5px 5px}.fc-day-grid-event-clicked .fc-time,.fc-day-grid-event-clicked .fc-title,.fc-day-grid-event:hover .fc-time,.fc-day-grid-event:hover .fc-title{font-weight:600}.fc-time-grid .fc-slats .fc-minor td{border-top-style:none}.fc-time-grid .fc-slats td{border-top-color:#fbfbfb}.fc-time-grid .fc-slats td.fc-axis{border-top-color:#ececec}.fc-time-grid-event.fc-short .fc-content{font-size:.7em;line-height:.2em}.fc-time-grid-event.fc-short .fc-time:after{content:\"\"}.fc-time-grid-event .fc-time{font-size:1.1em;padding:5px}.fc-time-grid-event .fc-title{padding:0 5px 5px;font-weight:700}.fc-unthemed .fc-divider,.fc-unthemed .fc-popover,.fc-unthemed .fc-row,.fc-unthemed tbody,.fc-unthemed td,.fc-unthemed th,.fc-unthemed thead{border-color:#ececec}.fc-agendaMonthly-view .fc-event{color:#fff}.fc-now-indicator{border-color:rgba(255,0,0,.5)}.fc-unthemed .fc-basic-view .fc-scroller{padding:5px 15px}.fc-unthemed .fc-basic-view .fc-content-skeleton{border-top:0}.fc-unthemed .fc-list-view .fc-scroller{padding:0 15px}.fc-list-view{border-width:0}.fc-list-table{width:80%;max-width:400px;margin:0 auto 30px}.fc-unthemed .fc-list-heading td{background:transparent;border-color:transparent;font-size:1.3em;line-height:1em;padding:20px 19px 15px;font-weight:500;color:#2e5bec}.fc-unthemed .fc-list-heading td .fc-list-heading-alt{color:#acacac}.is-small .fc-unthemed .fc-list-heading td{font-size:1.1em}.fc-list-item{display:block;transition:color .2s ease,border-color .2s ease,opacity .6s ease,box-shadow .2s ease;border:none;border-left:2px solid #939393;padding:3px;background-color:#fff;border-radius:3px;color:#333;margin:1px 0;box-shadow:0 1px 2px rgba(0,0,0,.07);cursor:pointer;margin-bottom:3px;font-weight:500;font-size:12px}.fc-list-item:hover{box-shadow:0 2px 4px rgba(0,0,0,.12);border-left:3px solid #2e5bec;color:#2e5bec;font-weight:600;padding-left:2px}.fc-list-item td{background:transparent;border-color:transparent;-webkit-transform:translateX(0);transform:translateX(0);transition:-webkit-transform .2s ease;transition:transform .2s ease;transition:transform .2s ease,-webkit-transform .2s ease}.fc-list-item:hover td{background:transparent;-webkit-transform:translateX(2px);transform:translateX(2px)}.fc-list-item .fc-list-item-marker{display:none}.fc-list-item .fc-list-item-time{padding-right:0;min-width:110px}.fc-list-item .fc-list-item-title a{font-weight:600}.fc-unthemed .fc-list-empty{background-color:transparent}", ""]);
	
	// exports


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(46);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(39)(content, {"singleton":true});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js?minimize!../../node_modules/autoprefixer-loader/index.js!../../node_modules/sass-loader/index.js!./utils.scss", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js?minimize!../../node_modules/autoprefixer-loader/index.js!../../node_modules/sass-loader/index.js!./utils.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports
	
	
	// module
	exports.push([module.id, "@-webkit-keyframes spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes shake{0%{-webkit-transform:translateX(0);transform:translateX(0)}25%{-webkit-transform:translateX(5px);transform:translateX(5px)}50%{-webkit-transform:translateX(-5px);transform:translateX(-5px)}75%{-webkit-transform:translateX(5px);transform:translateX(5px)}to{-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes shake{0%{-webkit-transform:translateX(0);transform:translateX(0)}25%{-webkit-transform:translateX(5px);transform:translateX(5px)}50%{-webkit-transform:translateX(-5px);transform:translateX(-5px)}75%{-webkit-transform:translateX(5px);transform:translateX(5px)}to{-webkit-transform:translateX(0);transform:translateX(0)}}", ""]);
	
	// exports


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(48);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(39)(content, {"singleton":true});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js?minimize!../../node_modules/autoprefixer-loader/index.js!../../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js?minimize!../../node_modules/autoprefixer-loader/index.js!../../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600);", ""]);
	
	// module
	exports.push([module.id, "/*!\n * Booking.js\n * http://timekit.io\n * (c) 2015 Timekit Inc.\n */.bookingjs{position:relative;font-family:Open Sans,Helvetica,Tahoma,Arial,sans-serif;font-size:13px;border-radius:4px;background-color:#fff;box-shadow:0 3px 40px 0 rgba(0,0,0,.15);margin:20px auto;z-index:10;opacity:1;color:#333;border-top:1px solid #ececec;min-height:200px}.bookingjs.has-avatar{margin-top:60px}.is-small.has-avatar.has-displayname .bookingjs-calendar .fc-toolbar{padding-bottom:24px}.is-small .bookingjs-calendar .fc-toolbar>.fc-right>button.fc-today-button{position:absolute;left:15px}.is-small.has-avatar .bookingjs-calendar .fc-toolbar .fc-right h2{display:none}.bookingjs-timezonehelper{color:#aeaeae;text-align:center;padding:7px 10px;background-color:#fbfbfb;border-top:1px solid #ececec;min-height:15px;z-index:20;border-radius:0 0 4px 4px}.bookingjs-timezoneicon{width:10px;margin-right:5px}.bookingjs-avatar{position:absolute;top:-50px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);border-radius:150px;border:3px solid #fff;box-shadow:0 1px 3px 0 rgba(0,0,0,.13);overflow:hidden;z-index:40;background-color:#fff}.is-small .bookingjs-avatar{top:-40px}.bookingjs-avatar img{max-width:100%;vertical-align:middle;display:inline-block;width:80px;height:80px}.is-small .bookingjs-avatar img{width:70px;height:70px}.bookingjs-displayname{position:absolute;top:0;left:0;padding:15px 20px;color:#333;font-weight:600}.is-small.has-avatar .bookingjs-displayname{top:44px;padding:0 20px;text-align:center;left:0;right:0;box-sizing:border-box}.bookingjs-bookpage{position:absolute;height:100%;width:100%;top:0;left:0;background-color:#fbfbfb;z-index:30;opacity:0;transition:opacity .2s ease;border-radius:4px}.bookingjs-bookpage.show{opacity:1}.bookingjs-bookpage-close{position:absolute;top:0;right:0;padding:18px;transition:opacity .2s ease;opacity:.3}.bookingjs-bookpage-close:hover{opacity:1}.bookingjs-bookpage-date,.bookingjs-bookpage h2{text-align:center;font-size:34px;font-weight:400;margin-top:70px;margin-bottom:10px}.is-small .bookingjs-bookpage-date,.is-small .bookingjs-bookpage h2{font-size:27px;margin-top:60px}.bookingjs-bookpage-time,.bookingjs-bookpage h3{text-align:center;font-size:17px;font-weight:400;margin-bottom:50px;margin-top:10px}.is-small .bookingjs-bookpage-time,.is-small .bookingjs-bookpage h3{font-size:15px;margin-bottom:35px}.bookingjs-closeicon{height:15px;width:15px}.bookingjs-form{width:350px;position:relative;margin:0 auto;text-align:center}.is-small .bookingjs-form{width:90%}.bookingjs-form-box{position:relative;box-shadow:0 1px 3px 0 rgba(0,0,0,.1);overflow:hidden;background-color:#fff;line-height:0}.bookingjs-form-success-message{position:absolute;top:-999px;left:0;right:0;padding:30px;z-index:10;background-color:#fff;opacity:0;transition:opacity .3s ease;line-height:normal}.is-small .bookingjs-form-success-message{padding:22px 10px}.bookingjs-form-success-message .title{font-size:20px;display:block;margin-bottom:25px}.bookingjs-form-success-message .body{display:block}.bookingjs-form-success-message .body .booked-email{color:#aeaeae}.bookingjs-form.success .bookingjs-form-success-message{opacity:1;top:0;bottom:0}.bookingjs-form-field{position:relative}.bookingjs-form-field--dirty .bookingjs-form-label{opacity:1;top:20px;font-size:11px;color:#2e5bec}.bookingjs-form-field--dirty .bookingjs-form-input{padding:25px 25px 5px}.bookingjs-form-field--dirty .bookingjs-form-input--textarea{padding:30px 25px 10px}.bookingjs-form-label{position:absolute;top:30px;left:25px;color:#333;opacity:0;font-size:12px;transition:opacity .2s ease,font-size .2s ease,color .2s ease,top .2s ease}.bookingjs-form-input,.bookingjs-form input,.bookingjs-form input:invalid textarea,.bookingjs-form textarea:invalid{transition:box-shadow .2s ease;width:100%;padding:15px 25px;margin:0;border:0 solid #ececec;font-size:1em;box-shadow:inset 0 0 1px 1px hsla(0,0%,100%,0);text-align:left;box-sizing:border-box;line-height:1.5em;font-family:Open Sans,Helvetica,Tahoma,Arial,sans-serif;color:#333;overflow:auto;border-bottom:1px solid #ececec}.bookingjs-form-input:focus,.bookingjs-form input:focus,.bookingjs-form input:invalid textarea:focus,.bookingjs-form textarea:invalid:focus{outline:0;box-shadow:inset 0 0 1px 1px #2e5bec}.bookingjs-form-input.hidden,.bookingjs-form input.hidden,.bookingjs-form input:invalid textarea.hidden,.bookingjs-form textarea:invalid.hidden{display:none}.bookingjs-form-input:-moz-read-only,.bookingjs-form input:-moz-read-only,.bookingjs-form input:invalid textarea:-moz-read-only,.bookingjs-form textarea:invalid:-moz-read-only{cursor:not-allowed;font-style:italic}.bookingjs-form-input:read-only,.bookingjs-form input:invalid textarea:read-only,.bookingjs-form input:read-only,.bookingjs-form textarea:invalid:read-only{cursor:not-allowed;font-style:italic}.bookingjs-form-input:-moz-read-only:focus,.bookingjs-form input:-moz-read-only:focus,.bookingjs-form input:invalid textarea:-moz-read-only:focus,.bookingjs-form textarea:invalid:-moz-read-only:focus{box-shadow:inset 0 0 1px 1px #d8d8d8}.bookingjs-form-input:read-only:focus,.bookingjs-form input:invalid textarea:read-only:focus,.bookingjs-form input:read-only:focus,.bookingjs-form textarea:invalid:read-only:focus{box-shadow:inset 0 0 1px 1px #d8d8d8}.bookingjs-form-input--textarea{padding:15px 25px 25px;overflow:auto}.bookingjs-form-button{position:relative;transition:background-color .2s,max-width .3s;display:inline-block;padding:13px 25px;background-color:#2e5bec;text-transform:uppercase;box-shadow:0 1px 3px 0 rgba(0,0,0,.15);color:#fff;border:0;border-radius:3px;font-size:1.1em;font-weight:600;margin-top:30px;cursor:pointer;height:44px;outline:0;text-align:center;max-width:200px}.bookingjs-form-button .error-text,.bookingjs-form-button .loading-text,.bookingjs-form-button .success-text{transition:opacity .3s ease;position:absolute;top:13px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);opacity:0}.bookingjs-form-button .inactive-text{white-space:nowrap;opacity:1}.bookingjs-form-button .loading-text svg{height:19px;width:19px;-webkit-animation:spin .6s infinite linear;animation:spin .6s infinite linear}.bookingjs-form-button .error-text svg{height:15px;width:15px;margin-top:2px}.bookingjs-form-button .success-text svg{height:15px;margin-top:2px;-webkit-transform:scale(0);transform:scale(0);transition:-webkit-transform .6s ease;transition:transform .6s ease;transition:transform .6s ease,-webkit-transform .6s ease}.bookingjs-form-button:focus,.bookingjs-form-button:hover{background-color:#1341d4}.bookingjs-form-button.button-shake{-webkit-animation:shake .5s 1 ease;animation:shake .5s 1 ease}.bookingjs-form.loading .bookingjs-form-button,.bookingjs-form.loading .bookingjs-form-button:hover{max-width:80px;background-color:#b1b1b1;cursor:not-allowed}.bookingjs-form.loading .bookingjs-form-button .inactive-text,.bookingjs-form.loading .bookingjs-form-button:hover .inactive-text{opacity:0}.bookingjs-form.loading .bookingjs-form-button .loading-text,.bookingjs-form.loading .bookingjs-form-button:hover .loading-text{opacity:1}.bookingjs-form.error .bookingjs-form-button,.bookingjs-form.error .bookingjs-form-button:hover{max-width:80px;background-color:#d83b46;cursor:not-allowed}.bookingjs-form.error .bookingjs-form-button .inactive-text,.bookingjs-form.error .bookingjs-form-button:hover .inactive-text{opacity:0}.bookingjs-form.error .bookingjs-form-button .error-text,.bookingjs-form.error .bookingjs-form-button:hover .error-text{opacity:1}.bookingjs-form.success .bookingjs-form-button,.bookingjs-form.success .bookingjs-form-button:hover{max-width:80px;background-color:#5baf56;cursor:pointer}.bookingjs-form.success .bookingjs-form-button .inactive-text,.bookingjs-form.success .bookingjs-form-button:hover .inactive-text{opacity:0}.bookingjs-form.success .bookingjs-form-button .success-text,.bookingjs-form.success .bookingjs-form-button:hover .success-text{opacity:1}.bookingjs-form.success .bookingjs-form-button .success-text svg,.bookingjs-form.success .bookingjs-form-button:hover .success-text svg{-webkit-transform:scale(1);transform:scale(1)}.bookingjs-poweredby{position:absolute;bottom:0;left:0;right:0;text-align:center;padding:7px 10px}.bookingjs-poweredby a{transition:color .2s ease;color:#aeaeae;text-decoration:none}.bookingjs-poweredby a svg path{transition:fill .2s ease;fill:#aeaeae}.bookingjs-poweredby a:hover{color:#333}.bookingjs-poweredby a:hover svg path{fill:#333}.bookingjs-timekitlogo{width:15px;height:15px;margin-right:5px;vertical-align:sub}.bookingjs-loading{position:absolute;height:100%;width:100%;top:0;left:0;background-color:#fbfbfb;z-index:30;opacity:0;transition:opacity .5s ease;border-radius:4px}.bookingjs-loading.show{opacity:1}.bookingjs-loading-icon{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.bookingjs-loading-icon svg{height:30px;width:30px;-webkit-animation:spin .6s infinite linear;animation:spin .6s infinite linear}.bookingjs-loading-icon svg path{fill:#2e5bec}.bookingjs-error{position:absolute;height:100%;width:100%;top:0;left:0;background-color:#fbfbfb;z-index:31;opacity:0;transition:opacity .5s ease;border-radius:4px}.bookingjs-error.show{opacity:1}.bookingjs-error-inner{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);text-align:center;overflow:scroll;max-height:100%;padding:30px;box-sizing:border-box;width:100%}.bookingjs-error-icon svg{height:30px;width:30px}.bookingjs-error-icon svg g{fill:#d83b46}.bookingjs-error-heading{color:#d83b46;font-size:15px;margin:15px 0}.bookingjs-error-text{font-size:12px;color:#aeaeae;word-break:break-word;overflow:scroll}.bookingjs-error-text-context,.bookingjs-error-text-messag{display:block}", ""]);
	
	// exports


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(50);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(39)(content, {"singleton":true});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js?minimize!../../node_modules/autoprefixer-loader/index.js!../../node_modules/sass-loader/index.js!./testmoderibbon.scss", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js?minimize!../../node_modules/autoprefixer-loader/index.js!../../node_modules/sass-loader/index.js!./testmoderibbon.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600);", ""]);
	
	// module
	exports.push([module.id, ".bookingjs-ribbon-wrapper{height:140px;width:35px;bottom:-34px;right:19px;z-index:32;-webkit-backface-visibility:hidden}.bookingjs-ribbon-wrapper,.bookingjs-ribbon-wrapper .bookingjs-ribbon-container{background:transparent;position:absolute;-webkit-transform:rotate(45deg);transform:rotate(45deg);overflow:hidden}.bookingjs-ribbon-wrapper .bookingjs-ribbon-container{height:110px;width:110px;left:-54px;top:15px}.bookingjs-ribbon-wrapper .bookingjs-ribbon-container:before{content:\"\";display:block;position:absolute;right:94px;top:0;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #ff8c22}.bookingjs-ribbon-wrapper .bookingjs-ribbon-container:after{content:\"\";display:block;position:absolute;right:0;top:92px;width:0;height:0;border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:6px solid #ff8c22}.bookingjs-ribbon-wrapper .bookingjs-ribbon-container .bookingjs-ribbon{width:140px;height:21px;position:relative;top:32px;right:3px;z-index:1;overflow:hidden;-webkit-transform:rotate(45deg);transform:rotate(45deg);background:#ffb46e}.bookingjs-ribbon-wrapper .bookingjs-ribbon-container .bookingjs-ribbon>span{text-align:center;display:block;position:relative;bottom:-6px;-webkit-transform:rotate(180deg);transform:rotate(180deg);font-size:10px;color:#fbfbfb;text-transform:uppercase;font-weight:400;letter-spacing:1px;line-height:1}", ""]);
	
	// exports


/***/ }),
/* 51 */
/***/ (function(module, exports) {

	module.exports = "<svg class=\"bookingjs-timezoneicon\" viewBox=\"0 0 98 98\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"><title>Shape</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\"><g id=\"timezone-icon\" sketch:type=\"MSLayerGroup\" fill=\"#AEAEAE\"><path d=\"M37.656,1.387 L39.381,2.516 L46.176,3.475 L49.313,2.778 L55.186,3.495 L56.364,5.065 L52.274,4.52 L48.092,6.262 L49.293,9.385 L53.613,11.348 L54.189,7.395 L58.285,7.133 L64.121,12.707 L65.775,14.887 L66.56,16.28 L62.029,18.067 L55.185,21.169 L54.624,24.206 L50.095,28.476 L50.271,32.572 L48.9,32.559 L48.353,29.086 L45.757,28.238 L38.294,28.631 L35.286,34.137 L37.901,37.274 L42.221,34.917 L42.516,38.755 L44.172,40.062 L47.131,43.46 L46.985,47.751 L52.448,49.034 L56.454,46.159 L58.284,46.768 L65.003,49.45 L74.433,52.985 L76.396,57.698 L83.111,60.968 L84.644,66.732 L80.062,71.857 L74.66,77.519 L68.933,80.482 L63.04,84.408 L55.185,89.515 L50.835,93.941 L49.292,92.263 L52.782,83.419 L53.663,73.167 L46.15,66.34 L46.199,60.596 L48.164,58.239 L50.471,51.415 L45.809,48.811 L42.664,43.706 L37.75,41.817 L30.047,37.667 L26.904,29.024 L25.334,33.344 L22.977,26.276 L23.762,15.671 L27.69,12.136 L26.512,9.779 L29.26,5.459 L23.905,6.99 C9.611,15.545 0.01,31.135 0.01,49.006 C0.01,76.062 21.945,98 49.006,98 C76.062,98 98,76.062 98,49.006 C98,21.947 76.062,0.012 49.006,0.012 C45.092,0.012 41.305,0.52 37.656,1.387 Z\" id=\"Shape\" sketch:type=\"MSShapeGroup\"></path></g></g></svg>"

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	var H = __webpack_require__(53);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bookingjs-timezonehelper\">");t.b("\n");t.b("\n" + i);t.b("  ");t.b(t.t(t.f("timezoneIcon",c,p,0)));t.b("\n");t.b("\n" + i);if(t.s(t.f("loading",c,p,1),c,p,0,79,117,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <span>");t.b(t.v(t.f("loadingText",c,p,0)));t.b("</span>");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(!t.s(t.f("loading",c,p,1),c,p,1,0,0,"")){if(t.s(t.f("timezoneDifference",c,p,1),c,p,0,179,227,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <span>");t.b(t.v(t.f("timezoneDifferent",c,p,0)));t.b("</span>");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(!t.s(t.f("timezoneDifference",c,p,1),c,p,1,0,0,"")){t.b("      <span>");t.b(t.v(t.f("timezoneSame",c,p,0)));t.b("</span>");t.b("\n" + i);};};t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"bookingjs-timezonehelper\">\n\n  {{& timezoneIcon }}\n\n  {{# loading }}\n    <span>{{ loadingText }}</span>\n  {{/ loading }}\n\n  {{^ loading }}\n    {{# timezoneDifference }}\n      <span>{{ timezoneDifferent }}</span>\n    {{/ timezoneDifference }}\n\n    {{^ timezoneDifference }}\n      <span>{{ timezoneSame }}</span>\n    {{/ timezoneDifference }}\n  {{/ loading }}\n\n</div>\n", H);return T; }();

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

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
	
	var Hogan = __webpack_require__(54);
	Hogan.Template = __webpack_require__(55).Template;
	Hogan.template = Hogan.Template;
	module.exports = Hogan;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var H = __webpack_require__(53);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bookingjs-ribbon-wrapper\">");t.b("\n" + i);t.b("  <div class=\"bookingjs-ribbon-container\">");t.b("\n" + i);t.b("    <div class=\"bookingjs-ribbon\">");t.b("\n" + i);t.b("      <span>");t.b("\n" + i);t.b("        ");t.b(t.v(t.f("ribbonText",c,p,0)));t.b("\n" + i);t.b("      </span>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"bookingjs-ribbon-wrapper\">\n  <div class=\"bookingjs-ribbon-container\">\n    <div class=\"bookingjs-ribbon\">\n      <span>\n        {{ ribbonText }}\n      </span>\n    </div>\n  </div>\n</div>\n", H);return T; }();

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var H = __webpack_require__(53);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bookingjs-avatar\">");t.b("\n" + i);t.b("  <img src=\"");t.b(t.t(t.f("image",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"bookingjs-avatar\">\n  <img src=\"{{& image }}\" />\n</div>\n", H);return T; }();

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var H = __webpack_require__(53);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bookingjs-displayname\">");t.b("\n" + i);t.b("  <span>");t.b(t.v(t.f("name",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"bookingjs-displayname\">\n  <span>{{ name }}</span>\n</div>\n", H);return T; }();

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	var H = __webpack_require__(53);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bookingjs-loading show\">");t.b("\n" + i);t.b("  <div class=\"bookingjs-loading-icon\">");t.b("\n" + i);t.b("    ");t.b(t.t(t.f("loadingIcon",c,p,0)));t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"bookingjs-loading show\">\n  <div class=\"bookingjs-loading-icon\">\n    {{& loadingIcon }}\n  </div>\n</div>\n", H);return T; }();

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	module.exports = "<svg version=\"1.1\" id=\"loader-1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 38 38\" xml:space=\"preserve\"><path fill=\"#fff\" d=\"M38,19 C38,8.50658975 29.4934102,0 19,0 C8.50658975,0 0,8.50658975 0,19 L5,19 C5,11.2680135 11.2680135,5 19,5 C26.7319865,5 33,11.2680135 33,19 L38,19 Z\" id=\"Oval-1\" sketch:type=\"MSShapeGroup\"></path></path></svg>"

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	var H = __webpack_require__(53);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bookingjs-error show\">");t.b("\n" + i);t.b("  <div class=\"bookingjs-error-inner\">");t.b("\n" + i);t.b("    <div class=\"bookingjs-error-icon\">");t.b("\n" + i);t.b("      ");t.b(t.t(t.f("errorWarningIcon",c,p,0)));t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"bookingjs-error-heading\">");t.b("\n" + i);t.b("      Ouch, we've encountered a problem");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"bookingjs-error-text\">");t.b("\n" + i);t.b("      <span class=\"bookingjs-error-text-message\">");t.b(t.t(t.f("message",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("      <span class=\"bookingjs-error-text-context\">");t.b(t.t(t.f("context",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"bookingjs-error show\">\n  <div class=\"bookingjs-error-inner\">\n    <div class=\"bookingjs-error-icon\">\n      {{& errorWarningIcon }}\n    </div>\n    <div class=\"bookingjs-error-heading\">\n      Ouch, we've encountered a problem\n    </div>\n    <div class=\"bookingjs-error-text\">\n      <span class=\"bookingjs-error-text-message\">{{& message }}</span>\n      <span class=\"bookingjs-error-text-context\">{{& context }}</span>\n    </div>\n  </div>\n</div>\n", H);return T; }();

/***/ }),
/* 62 */
/***/ (function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 62 55\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><title>error-warning-icon</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><g id=\"error-warning-icon\" fill-rule=\"nonzero\" fill=\"#D83B46\"><path d=\"M60.2,41.5 L38.7,5.3 C37.1,2.5 34.2,0.9 31,0.9 C27.8,0.9 24.9,2.5 23.3,5.3 L1.8,41.5 C0.1,44.3 0.1,47.7 1.7,50.5 C3.3,53.3 6.2,55 9.5,55 L52.4,55 C55.7,55 58.6,53.3 60.2,50.5 C61.9,47.7 61.9,44.3 60.2,41.5 Z M55.1,47.6 C54.8,48.1 54.1,49.1 52.5,49.1 L9.5,49.1 C7.9,49.1 7.2,48 6.9,47.6 C6.6,47.1 6.1,45.9 6.9,44.6 L28.4,8.4 C29.2,7.1 30.5,6.9 31,6.9 C31.5,6.9 32.8,7 33.6,8.4 L55.1,44.6 C55.9,45.9 55.3,47.1 55.1,47.6 Z\" id=\"Shape\"></path><path d=\"M31,15.2 C29.3,15.2 28,16.5 28,18.2 L28,34.2 C28,35.9 29.3,37.2 31,37.2 C32.7,37.2 34,35.9 34,34.2 L34,18.2 C34,16.6 32.7,15.2 31,15.2 Z\" id=\"Shape\"></path><path d=\"M31,38.8 C29.3,38.8 28,40.1 28,41.8 L28,42.8 C28,44.5 29.3,45.8 31,45.8 C32.7,45.8 34,44.5 34,42.8 L34,41.8 C34,40.1 32.7,38.8 31,38.8 Z\" id=\"Shape\"></path></g></g></svg>"

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	var H = __webpack_require__(53);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bookingjs-form-field\">");t.b("\n" + i);t.b("  <label");t.b("\n" + i);t.b("    for=\"input-name\"");t.b("\n" + i);t.b("    class=\"bookingjs-form-label label-name\">");t.b("\n" + i);t.b("    ");t.b(t.v(t.d("fields.name.placeholder",c,p,0)));t.b("\n" + i);t.b("  </label>");t.b("\n" + i);t.b("  <input");t.b("\n" + i);t.b("    id=\"input-name\"");t.b("\n" + i);t.b("    class=\"bookingjs-form-input input-name\"");t.b("\n" + i);t.b("    type=\"text\"");t.b("\n" + i);t.b("    name=\"name\"");t.b("\n" + i);t.b("    placeholder=\"");t.b(t.v(t.d("fields.name.placeholder",c,p,0)));t.b("\"");t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.name.prefilled",c,p,1),c,p,0,340,377,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" value=\"");t.b(t.v(t.d("fields.name.prefilled",c,p,0)));t.b("\" ");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.name.locked",c,p,1),c,p,0,435,445,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" readonly ");});c.pop();}t.b("\n" + i);t.b("    required");t.b("\n" + i);t.b("  />");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"bookingjs-form-field\">");t.b("\n" + i);t.b("  <label");t.b("\n" + i);t.b("    for=\"input-email\"");t.b("\n" + i);t.b("    class=\"bookingjs-form-label label-email\">");t.b("\n" + i);t.b("    ");t.b(t.v(t.d("fields.email.placeholder",c,p,0)));t.b("\n" + i);t.b("  </label>");t.b("\n" + i);t.b("  <input");t.b("\n" + i);t.b("    id=\"input-email\"");t.b("\n" + i);t.b("    class=\"bookingjs-form-input input-email\"");t.b("\n" + i);t.b("    type=\"email\"");t.b("\n" + i);t.b("    name=\"email\"");t.b("\n" + i);t.b("    placeholder=\"");t.b(t.v(t.d("fields.email.placeholder",c,p,0)));t.b("\"");t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.email.prefilled",c,p,1),c,p,0,846,884,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" value=\"");t.b(t.v(t.d("fields.email.prefilled",c,p,0)));t.b("\" ");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.email.locked",c,p,1),c,p,0,944,954,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" readonly ");});c.pop();}t.b("\n" + i);t.b("    required");t.b("\n" + i);t.b("  />");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);if(t.s(t.d("fields.phone.enabled",c,p,1),c,p,0,1034,1600,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"bookingjs-form-field\">");t.b("\n" + i);t.b("  <label");t.b("\n" + i);t.b("    for=\"input-phone\"");t.b("\n" + i);t.b("    class=\"bookingjs-form-label label-phone\">");t.b("\n" + i);t.b("    ");t.b(t.v(t.d("fields.phone.placeholder",c,p,0)));t.b("\n" + i);t.b("  </label>");t.b("\n" + i);t.b("  <input");t.b("\n" + i);t.b("    id=\"input-phone\"");t.b("\n" + i);t.b("    class=\"bookingjs-form-input input-phone\"");t.b("\n" + i);t.b("    type=\"tel\"");t.b("\n" + i);t.b("    name=\"phone\"");t.b("\n" + i);t.b("    placeholder=\"");t.b(t.v(t.d("fields.phone.placeholder",c,p,0)));t.b("\"");t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.phone.prefilled",c,p,1),c,p,0,1382,1420,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" value=\"");t.b(t.v(t.d("fields.phone.prefilled",c,p,0)));t.b("\" ");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.phone.required",c,p,1),c,p,0,1482,1492,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" required ");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.phone.locked",c,p,1),c,p,0,1551,1561,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" readonly ");});c.pop();}t.b("\n" + i);t.b("  />");t.b("\n" + i);t.b("</div>");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(t.s(t.d("fields.voip.enabled",c,p,1),c,p,0,1655,2208,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"bookingjs-form-field\">");t.b("\n" + i);t.b("  <label");t.b("\n" + i);t.b("    for=\"input-voip\"");t.b("\n" + i);t.b("    class=\"bookingjs-form-label label-voip\">");t.b("\n" + i);t.b("    ");t.b(t.v(t.d("fields.voip.placeholder",c,p,0)));t.b("\n" + i);t.b("  </label>");t.b("\n" + i);t.b("  <input");t.b("\n" + i);t.b("    id=\"input-voip\"");t.b("\n" + i);t.b("    class=\"bookingjs-form-input input-voip\"");t.b("\n" + i);t.b("    type=\"text\"");t.b("\n" + i);t.b("    name=\"voip\"");t.b("\n" + i);t.b("    placeholder=\"");t.b(t.v(t.d("fields.voip.placeholder",c,p,0)));t.b("\"");t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.voip.prefilled",c,p,1),c,p,0,1996,2033,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" value=\"");t.b(t.v(t.d("fields.voip.prefilled",c,p,0)));t.b("\" ");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.voip.required",c,p,1),c,p,0,2093,2103,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" required ");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.voip.locked",c,p,1),c,p,0,2160,2170,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" readonly ");});c.pop();}t.b("\n" + i);t.b("  />");t.b("\n" + i);t.b("</div>");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(t.s(t.d("fields.location.enabled",c,p,1),c,p,0,2266,2875,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"bookingjs-form-field\">");t.b("\n" + i);t.b("  <label");t.b("\n" + i);t.b("    for=\"input-location\"");t.b("\n" + i);t.b("    class=\"bookingjs-form-label label-location\">");t.b("\n" + i);t.b("    ");t.b(t.v(t.d("fields.location.placeholder",c,p,0)));t.b("\n" + i);t.b("  </label>");t.b("\n" + i);t.b("  <input");t.b("\n" + i);t.b("    id=\"input-location\"");t.b("\n" + i);t.b("    class=\"bookingjs-form-input input-location\"");t.b("\n" + i);t.b("    type=\"text\"");t.b("\n" + i);t.b("    name=\"location\"");t.b("\n" + i);t.b("    placeholder=\"");t.b(t.v(t.d("fields.location.placeholder",c,p,0)));t.b("\"");t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.location.prefilled",c,p,1),c,p,0,2639,2680,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" value=\"");t.b(t.v(t.d("fields.location.prefilled",c,p,0)));t.b("\" ");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.location.required",c,p,1),c,p,0,2748,2758,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" required ");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.location.locked",c,p,1),c,p,0,2823,2833,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" readonly ");});c.pop();}t.b("\n" + i);t.b("  />");t.b("\n" + i);t.b("</div>");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(t.s(t.d("fields.comment.enabled",c,p,1),c,p,0,2936,3554,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"bookingjs-form-field\">");t.b("\n" + i);t.b("  <label");t.b("\n" + i);t.b("    for=\"input-comment\"");t.b("\n" + i);t.b("    class=\"bookingjs-form-label label-comment\">");t.b("\n" + i);t.b("    ");t.b(t.v(t.d("fields.comment.placeholder",c,p,0)));t.b("\n" + i);t.b("  </label>");t.b("\n" + i);t.b("  <textarea");t.b("\n" + i);t.b("    id=\"input-comment\"");t.b("\n" + i);t.b("    class=\"bookingjs-form-input bookingjs-form-input--textarea input-comment\"");t.b("\n" + i);t.b("    rows=\"3\"");t.b("\n" + i);t.b("    name=\"comment\"");t.b("\n" + i);t.b("    placeholder=\"");t.b(t.v(t.d("fields.comment.placeholder",c,p,0)));t.b("\"");t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.comment.required",c,p,1),c,p,0,3331,3341,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" required ");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.d("fields.comment.locked",c,p,1),c,p,0,3404,3414,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" readonly ");});c.pop();}t.b(">");if(t.s(t.d("fields.comment.prefilled",c,p,1),c,p,0,3474,3504,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.v(t.d("fields.comment.prefilled",c,p,0)));});c.pop();}t.b("</textarea>");t.b("\n" + i);t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "<div class=\"bookingjs-form-field\">\n  <label\n    for=\"input-name\"\n    class=\"bookingjs-form-label label-name\">\n    {{ fields.name.placeholder }}\n  </label>\n  <input\n    id=\"input-name\"\n    class=\"bookingjs-form-input input-name\"\n    type=\"text\"\n    name=\"name\"\n    placeholder=\"{{ fields.name.placeholder }}\"\n    {{# fields.name.prefilled }} value=\"{{ fields.name.prefilled }}\" {{/ fields.name.prefilled }}\n    {{# fields.name.locked }} readonly {{/ fields.name.locked }}\n    required\n  />\n</div>\n\n<div class=\"bookingjs-form-field\">\n  <label\n    for=\"input-email\"\n    class=\"bookingjs-form-label label-email\">\n    {{ fields.email.placeholder }}\n  </label>\n  <input\n    id=\"input-email\"\n    class=\"bookingjs-form-input input-email\"\n    type=\"email\"\n    name=\"email\"\n    placeholder=\"{{ fields.email.placeholder }}\"\n    {{# fields.email.prefilled }} value=\"{{ fields.email.prefilled }}\" {{/ fields.email.prefilled }}\n    {{# fields.email.locked }} readonly {{/ fields.email.locked }}\n    required\n  />\n</div>\n\n{{# fields.phone.enabled }}\n<div class=\"bookingjs-form-field\">\n  <label\n    for=\"input-phone\"\n    class=\"bookingjs-form-label label-phone\">\n    {{ fields.phone.placeholder }}\n  </label>\n  <input\n    id=\"input-phone\"\n    class=\"bookingjs-form-input input-phone\"\n    type=\"tel\"\n    name=\"phone\"\n    placeholder=\"{{ fields.phone.placeholder }}\"\n    {{# fields.phone.prefilled }} value=\"{{ fields.phone.prefilled }}\" {{/ fields.phone.prefilled }}\n    {{# fields.phone.required }} required {{/ fields.phone.required }}\n    {{# fields.phone.locked }} readonly {{/ fields.phone.locked }}\n  />\n</div>\n{{/ fields.phone.enabled }}\n\n{{# fields.voip.enabled }}\n<div class=\"bookingjs-form-field\">\n  <label\n    for=\"input-voip\"\n    class=\"bookingjs-form-label label-voip\">\n    {{ fields.voip.placeholder }}\n  </label>\n  <input\n    id=\"input-voip\"\n    class=\"bookingjs-form-input input-voip\"\n    type=\"text\"\n    name=\"voip\"\n    placeholder=\"{{ fields.voip.placeholder }}\"\n    {{# fields.voip.prefilled }} value=\"{{ fields.voip.prefilled }}\" {{/ fields.voip.prefilled }}\n    {{# fields.voip.required }} required {{/ fields.voip.required }}\n    {{# fields.voip.locked }} readonly {{/ fields.voip.locked }}\n  />\n</div>\n{{/ fields.voip.enabled }}\n\n{{# fields.location.enabled }}\n<div class=\"bookingjs-form-field\">\n  <label\n    for=\"input-location\"\n    class=\"bookingjs-form-label label-location\">\n    {{ fields.location.placeholder }}\n  </label>\n  <input\n    id=\"input-location\"\n    class=\"bookingjs-form-input input-location\"\n    type=\"text\"\n    name=\"location\"\n    placeholder=\"{{ fields.location.placeholder }}\"\n    {{# fields.location.prefilled }} value=\"{{ fields.location.prefilled }}\" {{/ fields.location.prefilled }}\n    {{# fields.location.required }} required {{/ fields.location.required }}\n    {{# fields.location.locked }} readonly {{/ fields.location.locked }}\n  />\n</div>\n{{/ fields.location.enabled }}\n\n{{# fields.comment.enabled }}\n<div class=\"bookingjs-form-field\">\n  <label\n    for=\"input-comment\"\n    class=\"bookingjs-form-label label-comment\">\n    {{ fields.comment.placeholder }}\n  </label>\n  <textarea\n    id=\"input-comment\"\n    class=\"bookingjs-form-input bookingjs-form-input--textarea input-comment\"\n    rows=\"3\"\n    name=\"comment\"\n    placeholder=\"{{ fields.comment.placeholder }}\"\n    {{# fields.comment.required }} required {{/ fields.comment.required }}\n    {{# fields.comment.locked }} readonly {{/ fields.comment.locked }}>{{# fields.comment.prefilled }}{{ fields.comment.prefilled }}{{/ fields.comment.prefilled }}</textarea>\n</div>\n{{/ fields.comment.enabled }}\n", H);return T; }();

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	var H = __webpack_require__(53);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bookingjs-bookpage\">");t.b("\n" + i);t.b("  <a class=\"bookingjs-bookpage-close\" href=\"#\">");t.b(t.t(t.f("closeIcon",c,p,0)));t.b("</a>");t.b("\n" + i);t.b("  <h2 class=\"bookingjs-bookpage-date\">");t.b(t.v(t.f("chosenDate",c,p,0)));t.b("</h2>");t.b("\n" + i);t.b("  <h3 class=\"bookingjs-bookpage-time\">");t.b(t.v(t.f("chosenTime",c,p,0)));t.b("</h3>");t.b("\n" + i);t.b("  <form class=\"bookingjs-form\" action=\"#\">");t.b("\n" + i);t.b("    <div class=\"bookingjs-form-box\">");t.b("\n" + i);t.b("      <div class=\"bookingjs-form-success-message\">");t.b("\n" + i);t.b("        <div class=\"title\">");t.b(t.v(t.f("successMessageTitle",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("        <div class=\"body\">");t.b(t.t(t.f("successMessageBody",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <div class=\"bookingjs-form-fields\">");t.b("\n" + i);t.b(t.rp("<formFields0",c,p,"        "));t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <button class=\"bookingjs-form-button\" type=\"submit\">");t.b("\n" + i);t.b("      <span class=\"inactive-text\">");t.b(t.v(t.f("submitText",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("      <span class=\"loading-text\">");t.b(t.t(t.f("loadingIcon",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("      <span class=\"error-text\">");t.b(t.t(t.f("errorIcon",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("      <span class=\"success-text\">");t.b(t.t(t.f("checkmarkIcon",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("    </button>");t.b("\n" + i);t.b("  </form>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<formFields0":{name:"formFields", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"bookingjs-bookpage\">\n  <a class=\"bookingjs-bookpage-close\" href=\"#\">{{& closeIcon }}</a>\n  <h2 class=\"bookingjs-bookpage-date\">{{ chosenDate }}</h2>\n  <h3 class=\"bookingjs-bookpage-time\">{{ chosenTime }}</h3>\n  <form class=\"bookingjs-form\" action=\"#\">\n    <div class=\"bookingjs-form-box\">\n      <div class=\"bookingjs-form-success-message\">\n        <div class=\"title\">{{ successMessageTitle }}</div>\n        <div class=\"body\">{{& successMessageBody }}</div>\n      </div>\n      <div class=\"bookingjs-form-fields\">\n        {{> formFields }}\n      </div>\n    </div>\n    <button class=\"bookingjs-form-button\" type=\"submit\">\n      <span class=\"inactive-text\">{{ submitText }}</span>\n      <span class=\"loading-text\">{{& loadingIcon }}</span>\n      <span class=\"error-text\">{{& errorIcon }}</span>\n      <span class=\"success-text\">{{& checkmarkIcon }}</span>\n    </button>\n  </form>\n</div>\n", H);return T; }();

/***/ }),
/* 65 */
/***/ (function(module, exports) {

	module.exports = "<svg class=\"bookingjs-closeicon\" viewBox=\"0 0 90 90\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"><title>close-icon</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\"><g id=\"close-icon\" sketch:type=\"MSLayerGroup\" fill=\"#000000\"><path d=\"M58,45 L87.2,15.8 C90.9,12.1 90.9,6.3 87.3,2.7 C83.7,-0.9 77.8,-0.8 74.2,2.8 L45,32 L15.8,2.8 C12.1,-0.9 6.3,-0.9 2.7,2.7 C-0.9,6.3 -0.8,12.2 2.8,15.8 L32,45 L2.8,74.2 C-0.9,77.9 -0.9,83.7 2.7,87.3 C6.3,90.9 12.2,90.8 15.8,87.2 L45,58 L74.2,87.2 C77.9,90.9 83.7,90.9 87.3,87.3 C90.9,83.7 90.8,77.8 87.2,74.2 L58,45 L58,45 Z\" id=\"Shape\" sketch:type=\"MSShapeGroup\"></path></g></g></svg>"

/***/ }),
/* 66 */
/***/ (function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 38 26\" x=\"0px\" y=\"0px\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"><path fill=\"#fff\" d=\"M4.59255916,9.14153015 L4.59255916,9.14153015 L4.59255917,9.14153016 C3.61060488,8.15335155 2.0152224,8.15314806 1.03260582,9.1419932 L0.737322592,9.43914816 C-0.245558943,10.4282599 -0.245836003,12.0327396 0.736862454,13.0216671 L12.8967481,25.2586313 C13.4826504,25.8482474 14.3060779,26.1023412 15.1093609,25.9623831 L15.1946218,25.9520176 C15.7962843,25.9101633 16.3621851,25.6553951 16.7974015,25.21742 L37.2642739,4.6208133 C38.2456495,3.63321696 38.2453889,2.02851586 37.2626092,1.03950653 L36.967326,0.742351578 C35.9843771,-0.246827998 34.390543,-0.247513927 33.4085772,0.740676315 L15.4197831,18.8434968 L14.826599,19.4404409 L14.2334149,18.8434968 L4.59255916,9.14153015 Z\" id=\"Path\"></path></svg>"

/***/ }),
/* 67 */
/***/ (function(module, exports) {

	module.exports = "<svg class=\"bookingjs-closeicon\" viewBox=\"0 0 90 90\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"><title>error-icon</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\"><g id=\"error-icon\" sketch:type=\"MSLayerGroup\" fill=\"#FFFFFF\"><path d=\"M58,45 L87.2,15.8 C90.9,12.1 90.9,6.3 87.3,2.7 C83.7,-0.9 77.8,-0.8 74.2,2.8 L45,32 L15.8,2.8 C12.1,-0.9 6.3,-0.9 2.7,2.7 C-0.9,6.3 -0.8,12.2 2.8,15.8 L32,45 L2.8,74.2 C-0.9,77.9 -0.9,83.7 2.7,87.3 C6.3,90.9 12.2,90.8 15.8,87.2 L45,58 L74.2,87.2 C77.9,90.9 83.7,90.9 87.3,87.3 C90.9,83.7 90.8,77.8 87.2,74.2 L58,45 L58,45 Z\" id=\"Shape\" sketch:type=\"MSShapeGroup\"></path></g></g></svg>"

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	var H = __webpack_require__(53);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bookingjs-poweredby\">");t.b("\n" + i);t.b("  <a href=\"http://timekit.io?utm_medium=link&utm_source=");t.b(t.v(t.f("campaignSource",c,p,0)));t.b("&utm_campaign=");t.b(t.v(t.f("campaignName",c,p,0)));t.b("&utm_content=powered-by\" target=\"_blank\">");t.b("\n" + i);t.b("    ");t.b(t.t(t.f("timekitLogo",c,p,0)));t.b("\n" + i);t.b("    <span>Powered by Timekit</span>");t.b("\n" + i);t.b("  </a>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"bookingjs-poweredby\">\n  <a href=\"http://timekit.io?utm_medium=link&utm_source={{ campaignSource }}&utm_campaign={{ campaignName }}&utm_content=powered-by\" target=\"_blank\">\n    {{& timekitLogo }}\n    <span>Powered by Timekit</span>\n  </a>\n</div>\n", H);return T; }();

/***/ }),
/* 69 */
/***/ (function(module, exports) {

	module.exports = "<svg class=\"bookingjs-timekitlogo\" viewBox=\"0 0 513 548\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><title>timekit-logo</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><g id=\"timekit-logo\" transform=\"translate(9.000000, 9.000000)\" fill=\"#AEAEAE\"><path d=\"M55.2163313,275.621588 L198.50357,163.134257 C227.693194,140.219007 274.527519,140.836287 303.106573,164.516436 L439.222777,277.300154 L294.687237,386.088734 C265.004826,408.430003 217.635083,407.547293 188.834846,384.15411 L55.2163313,275.621588 Z M29.1450782,296.088768 L22.5453033,301.269906 C-6.64628574,324.186699 -6.96035256,361.73094 21.8567615,385.137832 L188.814783,520.750588 C217.626101,544.152772 265.020127,545.031261 294.666324,522.71725 L471.933566,389.292269 C501.58244,366.976243 502.456142,329.694313 473.870647,306.008826 L465.168534,298.798395 L304.79022,419.511467 C268.948833,446.488455 213.042282,445.460488 178.242802,417.194379 L29.1450782,296.088768 Z\" id=\"Base-layer\"></path><path d=\"M303.106573,18.9036609 L473.870647,160.396052 C502.470886,184.093754 501.573077,221.370515 471.912654,243.695235 L294.687237,377.088734 C265.004826,399.430003 217.635083,398.547293 188.834846,375.15411 L21.8366979,239.50876 C-6.94564818,216.130109 -6.64628574,178.573924 22.5453033,155.657132 L198.50357,17.5214821 C227.708304,-5.40562963 274.527519,-4.77648801 303.106573,18.9036609 Z M292.387775,31.8399435 C269.89295,13.2010897 231.857075,12.6958644 208.877526,30.7359084 L32.9192595,168.871558 C12.2117199,185.127966 12.006219,209.880161 32.4287426,226.468491 L199.426891,362.113841 C222.242635,380.64608 261.076006,381.360119 284.584254,363.666001 L461.809671,230.272501 C482.810002,214.466035 483.387128,190.098964 463.151849,173.332334 L292.387775,31.8399435 Z\" id=\"Middle-layer\" stroke=\"#AEAEAE\" stroke-width=\"18\"></path></g></g></svg>"

/***/ })
/******/ ])
});
;
//# sourceMappingURL=booking.js.map