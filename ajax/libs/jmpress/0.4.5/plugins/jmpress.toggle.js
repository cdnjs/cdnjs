/*!
 * plugin for jmpress.js v0.4.5
 *
 * Copyright 2014 Kyle Robinson Young @shama & Tobias Koppers @sokra
 * Licensed MIT
 * http://www.opensource.org/licenses/mit-license.php
 *//*
 * jmpress.toggle plugin
 * For binding a key to toggle de/initialization of jmpress.js.
 */
(function( $, document, window, undefined ) {
	'use strict';
	$.jmpress("register", "toggle", function( key, config, initial ) {
		var jmpress = this;
		$(document).bind("keydown", function( event ) {
			if ( event.keyCode === key ) {
				if ($(jmpress).jmpress("initialized")) {
					$(jmpress).jmpress("deinit");
				} else {
					$(jmpress).jmpress(config);
				}
			}
		});
		if ( initial ) {
			$(jmpress).jmpress(config);
		}
	});
}(jQuery, document, window));
