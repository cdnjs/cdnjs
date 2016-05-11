/*!
 * datepair.js v0.2.2 - A javascript plugin for intelligently selecting date and time ranges inspired by Google Calendar.
 * Copyright (c) 2014 Jon Thornton - http://jonthornton.github.com/Datepair.js
 * License: MIT
 */

(function(window, document) {

    'use strict';

    var _ONE_DAY = 86400000;
    var jq = window.Zepto || window.jQuery

    function simpleExtend(obj1, obj2) {
    	var out = obj2 || {};

    	for (var i in obj1) {
    		if (!(i in out)) {
    			out[i] = obj1[i]
    		}
    	}

    	return out;
    }

    // IE's custom event support is totally borked.
    // Use jQuery if possible
    function triggerSimpleCustomEvent(el, eventName) {
    	if (jq) {
    		jq(el).trigger(eventName);
    	} else {
    		var event = document.createEvent('CustomEvent');
    		event.initCustomEvent(eventName, true, true, {});
    		el.dispatchEvent(event);
    	}
    }

    // el.classList not supported by < IE10
    // use jQuery if available
    function hasClass(el, className) {
    	if (jq) {
    		return jq(el).hasClass(className);
    	} else {
    		return el.classList.contains(className);
    	}
    }

    function Datepair(container, options) {
    	this.dateDelta = null;
    	this.timeDelta = null;
    	this._defaults =	{
    		startClass: 'start',
    		endClass: 'end',
    		timeClass: 'time',
    		dateClass: 'date',
    		defaultDateDelta: 0,
    		defaultTimeDelta: 3600000,

    		// defaults for jquery-timepicker; override when using other input widgets
    		parseTime: function(input){
    			return jq(input).timepicker('getTime');
    		},
    		updateTime: function(input, dateObj){
    			jq(input).timepicker('setTime', dateObj);
    		},
    		setMinTime: function(input, dateObj){
    			jq(input).timepicker('option', 'minTime', dateObj);
    		},

    		// defaults for bootstrap datepicker; override when using other input widgets
    		parseDate: function(input){
    			return jq(input).datepicker('getDate');
    		},
    		updateDate: function(input, dateObj){
    			jq(input).datepicker('update', dateObj);
    		}
    	};

    	this.container = container;
    	this.settings = simpleExtend(this._defaults, options);

    	this.startDateInput = this.container.querySelector('.'+this.settings.startClass+'.'+this.settings.dateClass);
    	this.endDateInput = this.container.querySelector('.'+this.settings.endClass+'.'+this.settings.dateClass);
    	this.startTimeInput = this.container.querySelector('.'+this.settings.startClass+'.'+this.settings.timeClass);
    	this.endTimeInput = this.container.querySelector('.'+this.settings.endClass+'.'+this.settings.timeClass);

    	// initialize date and time deltas
    	if (this.startDateInput && this.startDateInput.value && this.startDateInput && this.endDateInput.value) {
    		var startDate = this.settings.parseDate(this.startDateInput);
    		var endDate = this.settings.parseDate(this.endDateInput);
    		this.dateDelta = endDate.getTime() - startDate.getTime();
    	}
    	if (this.startTimeInput && this.startTimeInput.value && this.endTimeInput && this.endTimeInput.value) {
    		var startTime = this.settings.parseTime(this.startTimeInput);
    		var endTime = this.settings.parseTime(this.endTimeInput);
    		this.timeDelta = endTime.getTime() - startTime.getTime();
    	}

    	// init starts here
    	this._bindChangeHandler();
    }

    Datepair.prototype = {
    	constructor: Datepair,

    	_bindChangeHandler: function(){
    		// addEventListener doesn't work with synthetic "change" events
    		// fired by jQuery's trigger() functioin. If jQuery is present,
    		// use that for event binding
    		if (jq) {
    			jq(this.container).on('change.datepair', jq.proxy(this.handleEvent, this));
    		} else {
    			this.container.addEventListener('change', this, false);
    		}
    	},

    	_unbindChangeHandler: function(){
    		if (jq) {
    			jq(this.container).off('change.datepair');
    		} else {
    			this.container.removeEventListener('change', this, false);
    		}
    	},

    	// This function will be called when passing 'this' to addEventListener
    	handleEvent: function(e){
    		// temporarily unbind the change handler to prevent triggering this
    		// if we update other inputs
    		this._unbindChangeHandler();

    		if (hasClass(e.target, this.settings.dateClass)) {
    			if (e.target.value != '') {
    				this._dateChanged(e.target);
    			} else {
    				this.dateDelta = null;
    			}

    		} else if (hasClass(e.target, this.settings.timeClass)) {
    			if (e.target.value != '') {
    				this._timeChanged(e.target);
    			} else {
    				this.timeDelta = null;
    			}
    		}

    		this._validateRanges();
    		this._updateEndMintime()
    		this._bindChangeHandler();
    	},

    	_dateChanged: function(target){
    		if (!this.startDateInput || !this.endDateInput) {
    			return
    		}

    		if (!this.startDateInput.value || !this.endDateInput.value) {
    			if (this.settings.defaultDateDelta !== null) {
    				if (this.startDateInput.value) {
    					var startDate = this.settings.parseDate(this.startDateInput);
    					var newEnd = new Date(startDate.getTime() + this.settings.defaultDateDelta * _ONE_DAY);
    					this.settings.updateDate(this.endDateInput, newEnd);

    				} else if (this.endDateInput.value) {
    					var endDate = this.settings.parseDate($endDateInput);
    					var newStart = new Date(endDate.getTime() - this.settings.defaultDateDelta * _ONE_DAY);
    					this.settings.updateDate(this.startDateInput, newStart);
    				}

    				this.dateDelta = this.settings.defaultDateDelta * _ONE_DAY;
    			} else {
    				this.dateDelta = null;
    			}

    			return;
    		}

    		var startDate = this.settings.parseDate(this.startDateInput);
    		var endDate = this.settings.parseDate(this.endDateInput);

    		if (hasClass(target, this.settings.startClass)) {
    			var newEndDate = new Date(startDate.getTime() + this.dateDelta);
    			this.settings.updateDate(this.endDateInput, newEndDate);
    		} else if (hasClass(target, this.settings.endClass)) {
    			if (endDate < startDate) {
    				this.dateDelta = 0;
    				this.settings.updateDate(this.startDateInput, endDate);
    			} else {
    				this.dateDelta = endDate.getTime() - startDate.getTime();
    			}
    		}
    	},

    	_timeChanged: function(target){
    		if (!this.startTimeInput || !this.endTimeInput) {
    			return
    		}

    		if (!this.startTimeInput.value || !this.endTimeInput.value) {
    			if (this.settings.defaultTimeDelta !== null) {
    				if (this.startTimeInput.value) {
    					var startTime = this.settings.parseTime(this.startTimeInput);
    					var newEnd = new Date(startTime.getTime() + this.settings.defaultTimeDelta);
    					this.settings.updateTime(this.endTimeInput, newEnd);
    				} else if (this.endTimeInput.value) {
    					var endTime = this.settings.parseTime(this.endTimeInput);
    					var newStart = new Date(endTime.getTime() - this.settings.defaultTimeDelta);
    					this.settings.updateTime(this.startTimeInput, newStart);
    				}

    				this.timeDelta = this.settings.defaultTimeDelta;
    			} else {
    				this.timeDelta = null;
    			}

    			return;
    		}

    		var startTime = this.settings.parseTime(this.startTimeInput);
    		var endTime = this.settings.parseTime(this.endTimeInput);

    		if (hasClass(target, this.settings.startClass)) {
    			var newEndTime = new Date(startTime.getTime() + this.timeDelta);
    			this.settings.updateTime(this.endTimeInput, newEndTime);
    			endTime = this.settings.parseTime(this.endTimeInput);
    		}

    		if (this.endDateInput && this.endDateInput.value && this.dateDelta + this.timeDelta < _ONE_DAY && (endTime.getTime() - startTime.getTime()) * this.timeDelta < 0) {
    			var offset = (endTime < startTime) ? _ONE_DAY : -1 * _ONE_DAY;
    			var endDate = this.settings.parseDate(this.endDateInput);
    			this.settings.updateDate(this.endDateInput, new Date(endDate.getTime() + offset));
    			this._dateChanged(this.endDateInput);
    		}

    		this.timeDelta = endTime.getTime() - startTime.getTime();
    	},

    	_updateEndMintime: function(){
    		if (typeof this.settings.setMinTime != 'function') return;

    		var startTime = null;
    		if (!this.dateDelta || this.dateDelta < _ONE_DAY || (this.timeDelta && this.dateDelta + this.timeDelta < _ONE_DAY)) {
    			startTime = this.settings.parseTime(this.startTimeInput);
    		}

    		this.settings.setMinTime(this.endTimeInput, startTime);
    	},

    	_validateRanges: function(){
    		if (this.startTimeInput && this.endTimeInput && this.timeDelta === null) {
    			triggerSimpleCustomEvent(this.container, 'rangeIncomplete');
    			return;
    		}

    		if (this.startDateInput && this.endDateInput && this.dateDelta === null) {
    			triggerSimpleCustomEvent(this.container, 'rangeIncomplete');
    			return;
    		}

    		if (this.dateDelta + this.timeDelta >= 0) {
    			triggerSimpleCustomEvent(this.container, 'rangeSelected');
    		} else {
    			triggerSimpleCustomEvent(this.container, 'rangeError');
    		}
    	}
    }

    window.Datepair = Datepair;

}(window, document));
