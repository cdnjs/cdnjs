/**
 * Ventus
 * Copyright © 2012-2013 Ramón Lamana
 * https://github.com/rlamana
 */
define(function(require) {
	'use strict';

	return {
		version: '0.2',
		browser: {
			animationEventName: function(){
				var style = document.body.style;
				var event = null;

				if(style.animation === '') {
					event = 'animationend';
				} else if(style.MozAnimation === '') {
					event = 'mozAnimationEnd';
				} else if(style.webkitAnimation === '') {
					event = 'webkitAnimationEnd';
				}

				return event;
			}
		},

		WindowManager: require('ventus/wm/windowmanager'),
		Window: require('ventus/wm/window')
	};
});
