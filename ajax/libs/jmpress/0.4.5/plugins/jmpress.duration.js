/*!
 * plugin for jmpress.js v0.4.5
 *
 * Copyright 2014 Kyle Robinson Young @shama & Tobias Koppers @sokra
 * Licensed MIT
 * http://www.opensource.org/licenses/mit-license.php
 *//*
 * jmpress.duration plugin
 * For auto advancing steps after a given duration and optionally displaying a
 * progress bar.
 */
(function( $, document, window, undefined ) {
	'use strict';

	$.jmpress("defaults").duration = {
		defaultValue: -1
		,defaultAction: "next"
		,barSelector: undefined
		,barProperty: "width"
		,barPropertyStart: "0"
		,barPropertyEnd: "100%"
	};
	$.jmpress("initStep", function( step, eventData ) {
		eventData.stepData.duration = eventData.data.duration && parseInt(eventData.data.duration, 10);
		eventData.stepData.durationAction = eventData.data.durationAction;
	});
	$.jmpress("setInactive", function( step, eventData ) {
		var settings = eventData.settings,
			durationSettings = settings.duration,
			current = eventData.current;
		var dur = eventData.stepData.duration || durationSettings.defaultValue;
		if( current.durationTimeout ) {
			if( durationSettings.barSelector ) {
				var css = {
					transitionProperty: durationSettings.barProperty
					,transitionDuration: '0'
					,transitionDelay: '0'
					,transitionTimingFunction: 'linear'
				};
				css[durationSettings.barProperty] = durationSettings.barPropertyStart;
				var bars = $(durationSettings.barSelector);
				$.jmpress("css", bars, css);
				bars.each(function(idx, element) {
					var next = $(element).next();
					var parent = $(element).parent();
					$(element).detach();
					if(next.length) {
						next.insertBefore(element);
					} else {
						parent.append(element);
					}
				});
			}
			clearTimeout(current.durationTimeout);
			delete current.durationTimeout;
		}
	});
	$.jmpress("setActive", function( step, eventData ) {
		var settings = eventData.settings,
			durationSettings = settings.duration,
			current = eventData.current;
		var dur = eventData.stepData.duration || durationSettings.defaultValue;
		if( dur && dur > 0 ) {
			if( durationSettings.barSelector ) {
				var css = {
					transitionProperty: durationSettings.barProperty
					,transitionDuration: (dur-settings.transitionDuration*2/3-100)+"ms"
					,transitionDelay: (settings.transitionDuration*2/3)+'ms'
					,transitionTimingFunction: 'linear'
				};
				css[durationSettings.barProperty] = durationSettings.barPropertyEnd;
				$.jmpress("css", $(durationSettings.barSelector), css);
			}
			var jmpress = this;
			if(current.durationTimeout) {
				clearTimeout(current.durationTimeout);
				current.durationTimeout = undefined;
			}
			current.durationTimeout = setTimeout(function() {
				var action = eventData.stepData.durationAction || durationSettings.defaultAction;
				$(jmpress).jmpress(action);
			}, dur);
		}
	});
}(jQuery, document, window));
